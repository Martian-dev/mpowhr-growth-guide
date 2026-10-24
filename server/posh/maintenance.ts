import { randomUUID } from "node:crypto";
import { waitUntil } from "@vercel/functions";
import { getDatabase, type Registration, type PaymentOrder } from "./db";
import { initializeSheets, sheetsConfigured, syncRegistration } from "./sheets";
import { reconcileOrder } from "./payments";
import { isConfirmationEmailConfigured, sendConfirmation } from "./email";

export const runSheetSync = async (force = false) => {
  if (!sheetsConfigured()) return { configured: false, synced: 0 };
  const sql = getDatabase();
  const token = randomUUID();
  const lease =
    await sql`INSERT INTO posh_worker_leases(name,token,expires_at) VALUES('sheets',${token},now()+interval '2 minutes')
    ON CONFLICT(name) DO UPDATE SET token=EXCLUDED.token,expires_at=EXCLUDED.expires_at WHERE posh_worker_leases.expires_at<now() RETURNING name`;
  if (!lease.length) return { configured: true, busy: true, synced: 0 };
  let synced = 0;
  let failed = 0;
  const failedIds: string[] = [];
  const deadline = Date.now() + 45000;
  try {
    const pending =
      await sql`SELECT registration_id FROM posh_sheet_jobs WHERE version>synced_version AND (${force} OR next_attempt_at<=now()) LIMIT 1`;
    if (!pending.length) return { configured: true, synced };
    let metadata: Awaited<ReturnType<typeof initializeSheets>>;
    try {
      metadata = await initializeSheets();
    } catch {
      await sql`UPDATE posh_sheet_jobs SET attempts=attempts+1,last_error='Google Sheets initialization failed. Check sharing, credentials, and headers.',
        next_attempt_at=now()+interval '5 minutes' WHERE version>synced_version`;
      return {
        configured: true,
        synced,
        error:
          "Google Sheets initialization failed. Check sharing, credentials, and headers.",
      };
    }
    // Drain new work arriving during this invocation, within the runtime and API quotas.
    while (synced + failed < 50 && Date.now() < deadline) {
      const [job] =
        await sql`SELECT * FROM posh_sheet_jobs WHERE version>synced_version
        AND (${force} OR next_attempt_at<=now()) AND NOT(registration_id=ANY(${failedIds}::text[]))
        ORDER BY next_attempt_at LIMIT 1`;
      if (!job) break;
      try {
        const [booking] =
          await sql`SELECT * FROM posh_registrations WHERE id=${job.registration_id}`;
        await syncRegistration(booking as Registration, metadata);
        await sql`UPDATE posh_sheet_jobs SET synced_version=${job.version},synced_at=now(),last_error=NULL,attempts=0 WHERE registration_id=${job.registration_id}`;
        synced++;
      } catch {
        failed++;
        failedIds.push(job.registration_id as string);
        await sql`UPDATE posh_sheet_jobs SET attempts=attempts+1,last_error='Sheet write failed. Check access and managed row order.',
          next_attempt_at=now()+make_interval(secs=>LEAST(3600,POWER(2,LEAST(attempts+1,11)))::integer)
          WHERE registration_id=${job.registration_id}`;
      }
    }
    const [remaining] =
      await sql`SELECT count(*)::integer AS count FROM posh_sheet_jobs WHERE version>synced_version`;
    return {
      configured: true,
      synced,
      failed,
      pending: remaining.count as number,
    };
  } finally {
    await sql`DELETE FROM posh_worker_leases WHERE name='sheets' AND token=${token}`;
  }
};
export const runMaintenance = async () => {
  const sql = getDatabase();
  let reconciled = 0;
  const orders =
    await sql`UPDATE posh_payment_orders SET checked_at=now() WHERE id IN(
    SELECT id FROM posh_payment_orders WHERE status IN ('creating','unknown','created')
      AND (checked_at IS NULL OR checked_at<now()-interval '5 minutes') ORDER BY checked_at NULLS FIRST LIMIT 5
  ) RETURNING *`;
  for (const order of orders as PaymentOrder[]) {
    try {
      await reconcileOrder(order);
      reconciled++;
    } catch {
      console.error("Payment reconciliation deferred");
    }
  }
  if (isConfirmationEmailConfigured()) {
    const bookings =
      await sql`SELECT * FROM posh_registrations WHERE status='paid' AND confirmation_sent_at IS NULL LIMIT 5`;
    for (const booking of bookings)
      await sendConfirmation(booking as Registration);
  }
  return { reconciled, sheets: await runSheetSync() };
};
export const scheduleSync = () => {
  // The outbox survives process termination; cron retries work that waitUntil cannot finish.
  waitUntil(
    runSheetSync().catch(() => {
      console.error("Sheet sync deferred to maintenance");
    }),
  );
};
export const scheduleConfirmation = (booking: Registration) => {
  if (booking.status === "paid" && isConfirmationEmailConfigured()) {
    waitUntil(
      sendConfirmation(booking).catch(() => {
        console.error("Confirmation email deferred");
      }),
    );
  }
};
