import { neon } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";
import type {
  BookingStatus,
  ContactDetails,
  Selection,
  AttendeeDetails,
} from "../../shared/posh";
import { PLANS } from "../../shared/posh";
import { HttpError, tokenHash } from "./http";

export type Registration = ContactDetails & {
  id: string;
  audience: AttendeeDetails["audience"] | null;
  seats: 1 | 2 | null;
  expected_amount: number | null;
  currency: string;
  status: BookingStatus;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  refunded_amount: number;
  paid_at: string | null;
  created_at: string;
  confirmation_sent_at: string | null;
  sheet_row: number;
};
export type Attendee = ContactDetails & {
  id: string;
  audience: AttendeeDetails["audience"] | null;
  position: number;
  active: boolean;
  sheet_row: number;
};
export type PaymentOrder = {
  id: string;
  registration_id: string;
  seats: number;
  amount: number;
  currency: string;
  status:
    "creating" | "unknown" | "created" | "paid" | "refunded" | "cancelled";
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  snapshot: ContactDetails & { attendees: AttendeeDetails[] };
  created_at: string;
  expires_at: string;
};
export const getDatabase = () => {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) throw new HttpError(503, "Registration storage is not configured.");
  return neon(url);
};
export const capacity = () => {
  const n = Number(process.env.POSH_WORKSHOP_CAPACITY);
  if (!Number.isInteger(n) || n < 1)
    throw new HttpError(503, "Workshop capacity is not configured.");
  return n;
};
export const findSession = async (token: string | null) => {
  if (!token) return null;
  const rows =
    await getDatabase()`SELECT * FROM posh_registrations WHERE session_hash=${tokenHash(token)} AND created_at>now()-interval '30 days'`;
  return (rows[0] as Registration | undefined) ?? null;
};
export const requireSession = async (token: string | null) => {
  const booking = await findSession(token);
  if (!booking)
    throw new HttpError(
      401,
      "Your booking session has expired. Please start again.",
    );
  return booking;
};
export const attendeesFor = async (id: string, includeInactive = false) =>
  (await getDatabase()`SELECT * FROM posh_attendees WHERE registration_id=${id} AND (active OR ${includeInactive}) ORDER BY position`) as Attendee[];
export const ordersFor = async (id: string) =>
  (await getDatabase()`SELECT * FROM posh_payment_orders WHERE registration_id=${id} ORDER BY created_at DESC`) as PaymentOrder[];
export const allowRequest = async (
  request: Request,
  purpose: string,
  limit = 30,
) => {
  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const start = Math.floor(Date.now() / 600000) * 600000;
  const key = tokenHash(`${purpose}:${address}:${start}`);
  const sql = getDatabase();
  const [, rows] = await sql.transaction([
    sql`DELETE FROM posh_order_rate_limits WHERE expires_at < now()`,
    sql`INSERT INTO posh_order_rate_limits(key_hash,request_count,expires_at) VALUES(${key},1,${new Date(start + 600000).toISOString()})
      ON CONFLICT(key_hash) DO UPDATE SET request_count=posh_order_rate_limits.request_count+1 RETURNING request_count`,
  ]);
  if (Number(rows[0]?.request_count) > limit)
    throw new HttpError(
      429,
      "Too many attempts. Please wait a few minutes and try again.",
    );
};

// Edits stop while an active checkout exists. Its snapshot remains immutable.
export const saveContact = async (token: string, details: ContactDetails) => {
  const sql = getDatabase();
  const [, rows] = await sql.transaction([
    sql`SELECT pg_advisory_xact_lock(29481723)`,
    sql`WITH changed AS (
      INSERT INTO posh_registrations(id,name,email,phone,status,session_hash)
      VALUES(${randomUUID()},${details.name},${details.email},${details.phone},'draft',${tokenHash(token)})
      ON CONFLICT(session_hash) DO UPDATE SET name=EXCLUDED.name,email=EXCLUDED.email,phone=EXCLUDED.phone,updated_at=now()
      WHERE posh_registrations.status IN ('draft','awaiting_payment','created','failed')
        AND NOT EXISTS(SELECT 1 FROM posh_payment_orders WHERE registration_id=posh_registrations.id
          AND status IN ('creating','unknown','created') AND expires_at>now())
      RETURNING *
    ), people AS (
      INSERT INTO posh_attendees(id,registration_id,position,name,email,phone)
      SELECT id || ':1',id,1,name,email,phone FROM changed
      ON CONFLICT(registration_id,position) DO UPDATE SET name=EXCLUDED.name,email=EXCLUDED.email,phone=EXCLUDED.phone
    ) SELECT * FROM changed`,
  ]);
  if (!rows[0])
    throw new HttpError(
      409,
      "A payment is in progress or this registration is already complete. Check your booking status.",
    );
  return rows[0] as Registration;
};
export const saveAudience = async (
  id: string,
  audience: AttendeeDetails["audience"],
) => {
  const sql = getDatabase();
  const [, rows] = await sql.transaction([
    sql`SELECT pg_advisory_xact_lock(29481723)`,
    sql`WITH changed AS (
      UPDATE posh_registrations SET audience=${audience},updated_at=now() WHERE id=${id}
      AND status IN ('draft','awaiting_payment','created','failed')
      AND NOT EXISTS(SELECT 1 FROM posh_payment_orders WHERE registration_id=${id}
        AND status IN ('creating','unknown','created') AND expires_at>now()) RETURNING *
    ), people AS (UPDATE posh_attendees SET audience=${audience} WHERE registration_id IN(SELECT id FROM changed) AND position=1)
    SELECT * FROM changed`,
  ]);
  if (!rows[0])
    throw new HttpError(
      409,
      "Your payment is in progress. Check your booking status before making changes.",
    );
  return rows[0] as Registration;
};
export const saveSelection = async (id: string, selection: Selection) => {
  const sql = getDatabase();
  const other = selection.secondAttendee;
  const amount = PLANS.find((p) => p.seats === selection.seats)!.amount;
  const [, rows] = await sql.transaction([
    sql`SELECT pg_advisory_xact_lock(29481723)`,
    sql`WITH changed AS (
      UPDATE posh_registrations SET seats=${selection.seats},expected_amount=${amount},updated_at=now()
      WHERE id=${id} AND audience IS NOT NULL AND status IN ('draft','awaiting_payment','created','failed')
      AND NOT EXISTS(SELECT 1 FROM posh_payment_orders WHERE registration_id=${id}
        AND status IN ('creating','unknown','created') AND expires_at>now()) RETURNING *
    ), second AS (
      INSERT INTO posh_attendees(id,registration_id,position,name,email,phone,audience,active)
      SELECT id || ':2',id,2,${other?.name ?? ""},${other?.email ?? ""},${other?.phone ?? ""},${other?.audience ?? null},true
      FROM changed WHERE ${selection.seats}=2
      ON CONFLICT(registration_id,position) DO UPDATE SET name=EXCLUDED.name,email=EXCLUDED.email,phone=EXCLUDED.phone,audience=EXCLUDED.audience,active=true
    ), removed AS (UPDATE posh_attendees SET active=false WHERE registration_id IN(SELECT id FROM changed) AND position=2 AND ${selection.seats}=1)
    SELECT * FROM changed`,
  ]);
  if (!rows[0])
    throw new HttpError(
      409,
      "Complete your classification first, or check the payment already in progress.",
    );
  return rows[0] as Registration;
};
export const claimCheckout = async (id: string, candidateId: string) => {
  try {
    const rows =
      await getDatabase()`SELECT * FROM posh_claim_checkout(${id},${candidateId},${capacity()})`;
    return rows[0] as PaymentOrder;
  } catch (error) {
    if (
      error instanceof Error &&
      /Complete|no longer available/.test(error.message)
    )
      throw new HttpError(409, error.message);
    throw error;
  }
};
export const attachOrder = async (id: string, providerId: string) => {
  const rows =
    await getDatabase()`UPDATE posh_payment_orders SET razorpay_order_id=${providerId},status='created'
    WHERE id=${id} AND status IN ('creating','unknown','created') AND (razorpay_order_id IS NULL OR razorpay_order_id=${providerId}) RETURNING *`;
  return rows[0] as PaymentOrder | undefined;
};
export const markPaid = async (input: {
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
}) => {
  const rows =
    await getDatabase()`SELECT * FROM posh_confirm_payment(${input.orderId},${input.paymentId},${input.amount},${input.currency},${capacity()})`;
  return (rows[0] as Registration | undefined) ?? null;
};
export const recordProcessedRefund = async (input: {
  refundId: string;
  paymentId: string;
  amount: number;
}) => {
  if (!Number.isInteger(input.amount) || input.amount <= 0)
    throw new HttpError(400, "Invalid refund amount.");
  await getDatabase()`INSERT INTO razorpay_processed_refunds(refund_id,payment_id,amount) VALUES(${input.refundId},${input.paymentId},${input.amount}) ON CONFLICT DO NOTHING`;
};
export const applyProcessedRefunds = async (paymentId: string) => {
  const sql = getDatabase();
  const [, , rows] = await sql.transaction([
    sql`SELECT pg_advisory_xact_lock(29481723)`,
    sql`UPDATE posh_payment_orders SET refunded_amount=(SELECT COALESCE(SUM(amount),0) FROM razorpay_processed_refunds WHERE payment_id=${paymentId}),
      status=CASE WHEN (SELECT COALESCE(SUM(amount),0) FROM razorpay_processed_refunds WHERE payment_id=${paymentId})>=amount THEN 'refunded' ELSE status END
      WHERE razorpay_payment_id=${paymentId}`,
    sql`UPDATE posh_registrations SET refunded_amount=o.refunded_amount,
      status=CASE WHEN o.refunded_amount>=o.amount AND posh_registrations.status<>'payment_review' THEN 'refunded' ELSE posh_registrations.status END,updated_at=now()
      FROM posh_payment_orders o WHERE posh_registrations.razorpay_payment_id=${paymentId} AND o.razorpay_payment_id=${paymentId} RETURNING posh_registrations.*`,
  ]);
  return (rows[0] as Registration | undefined) ?? null;
};
export const recordFailure = async (orderId: string) => {
  await getDatabase()`UPDATE posh_payment_orders SET last_failure_at=now() WHERE razorpay_order_id=${orderId}`;
};
export const recordWebhookEvent = async (id: string, type: string) => {
  const rows =
    await getDatabase()`INSERT INTO razorpay_webhook_events(event_id,event_type) VALUES(${id},${type})
    ON CONFLICT(event_id) DO UPDATE SET event_type=EXCLUDED.event_type RETURNING processed_at`;
  return Boolean(rows[0]?.processed_at);
};
export const completeWebhookEvent = async (id: string) => {
  await getDatabase()`UPDATE razorpay_webhook_events SET processed_at=now() WHERE event_id=${id}`;
};
export const claimConfirmation = async (id: string) => {
  const rows =
    await getDatabase()`UPDATE posh_registrations SET confirmation_claimed_at=now() WHERE id=${id} AND status='paid' AND confirmation_sent_at IS NULL
    AND (confirmation_claimed_at IS NULL OR confirmation_claimed_at<now()-interval '10 minutes') RETURNING id`;
  return rows.length === 1;
};
export const markConfirmationSent = async (id: string) => {
  await getDatabase()`UPDATE posh_registrations SET confirmation_sent_at=now() WHERE id=${id}`;
};
export const releaseConfirmationClaim = async (id: string) => {
  await getDatabase()`UPDATE posh_registrations SET confirmation_claimed_at=NULL WHERE id=${id} AND confirmation_sent_at IS NULL`;
};
