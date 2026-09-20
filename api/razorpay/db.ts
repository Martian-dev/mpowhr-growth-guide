import { neon } from "@neondatabase/serverless";
import { createHash, randomUUID } from "node:crypto";

export type Registration = {
  id: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  seats: number;
  expected_amount: number;
  currency: string;
  name: string;
  email: string;
  phone: string;
  status: "created" | "paid" | "failed" | "refunded" | "cancelled";
  refunded_amount: number;
  confirmation_sent_at: string | null;
  confirmation_claimed_at: string | null;
};

export const getDatabase = () => {
  const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!connectionString) return null;
  return neon(connectionString);
};

export const isRegistrationStoreConfigured = () => {
  const value = Number(process.env.POSH_WORKSHOP_CAPACITY);
  return Boolean(process.env.DATABASE_URL ?? process.env.POSTGRES_URL) &&
    Number.isInteger(value) &&
    value > 0;
};

const capacity = () => {
  const value = Number(process.env.POSH_WORKSHOP_CAPACITY);
  return Number.isInteger(value) && value > 0 ? value : null;
};

export const reserveRegistration = async (details: {
  seats: number;
  amount: number;
  name: string;
  email: string;
  phone: string;
}) => {
  const sql = getDatabase();
  const workshopCapacity = capacity();
  if (!sql || !workshopCapacity) return null;

  const id = randomUUID();
  const [, result] = await sql.transaction([
    sql`SELECT pg_advisory_xact_lock(29481723)`,
    sql`
      INSERT INTO posh_registrations
        (id, seats, expected_amount, currency, name, email, phone)
      SELECT ${id}, ${details.seats}, ${details.amount}, 'INR',
        ${details.name}, ${details.email}, ${details.phone}
      WHERE ${details.seats} + COALESCE((
        SELECT SUM(seats)
        FROM posh_registrations
        WHERE status IN ('paid', 'created', 'failed')
          AND (status = 'paid' OR created_at > now() - interval '30 minutes')
      ), 0) <= ${workshopCapacity}
      RETURNING id, seats, expected_amount, currency, name, email, phone, status
    `,
  ]);

  return (result as Registration[])[0] ?? null;
};

export const allowOrderRequest = async (request: Request) => {
  const sql = getDatabase();
  if (!sql) return false;

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const address = forwardedFor || realIp || "unknown";
  const windowMs = 10 * 60 * 1000;
  const windowStart = Math.floor(Date.now() / windowMs) * windowMs;
  const keyHash = createHash("sha256")
    .update(`${address}:${windowStart}`)
    .digest("hex");
  const configuredLimit = Number(process.env.POSH_ORDER_RATE_LIMIT);
  const limit = Number.isInteger(configuredLimit) && configuredLimit > 0
    ? configuredLimit
    : 5;

  const [, rows] = await sql.transaction([
    sql`DELETE FROM posh_order_rate_limits WHERE expires_at < now()`,
    sql`
      INSERT INTO posh_order_rate_limits (key_hash, request_count, expires_at)
      VALUES (${keyHash}, 1, ${new Date(windowStart + windowMs).toISOString()})
      ON CONFLICT (key_hash) DO UPDATE
        SET request_count = posh_order_rate_limits.request_count + 1
      RETURNING request_count
    `,
  ]);
  return Number(rows[0]?.request_count) <= limit;
};

export const attachOrder = async (registrationId: string, orderId: string) => {
  const sql = getDatabase();
  if (!sql) return false;
  const rows = await sql`
    UPDATE posh_registrations
    SET razorpay_order_id = ${orderId}, updated_at = now()
    WHERE id = ${registrationId} AND status = 'created'
    RETURNING id
  `;
  return rows.length === 1;
};

export const cancelRegistration = async (registrationId: string) => {
  const sql = getDatabase();
  if (!sql) return;
  await sql`
    UPDATE posh_registrations
    SET status = 'cancelled', updated_at = now()
    WHERE id = ${registrationId} AND status = 'created'
  `;
};

export const findRegistrationByOrder = async (orderId: string) => {
  const sql = getDatabase();
  if (!sql) return null;
  const rows = await sql`
    SELECT id, razorpay_order_id, razorpay_payment_id, seats, expected_amount,
      currency, name, email, phone, status, refunded_amount, confirmation_sent_at,
      confirmation_claimed_at
    FROM posh_registrations
    WHERE razorpay_order_id = ${orderId}
    LIMIT 1
  `;
  return (rows as Registration[])[0] ?? null;
};

export const markPaid = async (input: {
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
}) => {
  const sql = getDatabase();
  if (!sql) return null;
  const rows = await sql`
    UPDATE posh_registrations
    SET status = 'paid', razorpay_payment_id = ${input.paymentId}, updated_at = now()
    WHERE razorpay_order_id = ${input.orderId}
      AND expected_amount = ${input.amount}
      AND currency = ${input.currency}
      AND status IN ('created', 'failed', 'paid')
      AND (razorpay_payment_id IS NULL OR razorpay_payment_id = ${input.paymentId})
    RETURNING id, razorpay_order_id, razorpay_payment_id, seats, expected_amount,
      currency, name, email, phone, status, refunded_amount, confirmation_sent_at,
      confirmation_claimed_at
  `;
  return (rows as Registration[])[0] ?? null;
};

export const updateWebhookRegistration = async (input: {
  orderId: string;
  paymentId: string | null;
  status: "failed";
}) => {
  const sql = getDatabase();
  if (!sql) return null;
  const rows = await sql`
    UPDATE posh_registrations
    SET status = 'failed', updated_at = now()
    WHERE razorpay_order_id = ${input.orderId}
      AND status = 'created'
      AND (razorpay_payment_id IS NULL OR razorpay_payment_id = ${input.paymentId})
    RETURNING id, razorpay_order_id, razorpay_payment_id, seats, expected_amount,
      currency, name, email, phone, status, refunded_amount, confirmation_sent_at,
      confirmation_claimed_at
  `;
  return (rows as Registration[])[0] ?? null;
};

export const recordProcessedRefund = async (input: {
  refundId: string;
  paymentId: string;
  amount: number;
}) => {
  const sql = getDatabase();
  if (!sql) return false;
  await sql`
    INSERT INTO razorpay_processed_refunds (refund_id, payment_id, amount)
    VALUES (${input.refundId}, ${input.paymentId}, ${input.amount})
    ON CONFLICT (refund_id) DO NOTHING
  `;
  return true;
};

export const applyProcessedRefunds = async (paymentId: string) => {
  const sql = getDatabase();
  if (!sql) return null;
  const rows = await sql`
    UPDATE posh_registrations AS registration
    SET
      refunded_amount = refunds.total,
      status = CASE
        WHEN refunds.total >= registration.expected_amount THEN 'refunded'
        ELSE registration.status
      END,
      updated_at = now()
    FROM (
      SELECT COALESCE(SUM(amount), 0)::integer AS total
      FROM razorpay_processed_refunds
      WHERE payment_id = ${paymentId}
    ) AS refunds
    WHERE registration.razorpay_payment_id = ${paymentId}
      AND registration.status IN ('paid', 'refunded')
    RETURNING registration.id, registration.razorpay_order_id,
      registration.razorpay_payment_id, registration.seats,
      registration.expected_amount, registration.currency, registration.name,
      registration.email, registration.phone, registration.status,
      registration.refunded_amount, registration.confirmation_sent_at,
      registration.confirmation_claimed_at
  `;
  return (rows as Registration[])[0] ?? null;
};

export const recordWebhookEvent = async (eventId: string, eventType: string) => {
  const sql = getDatabase();
  if (!sql) return { recorded: false, alreadyProcessed: false };
  const rows = await sql`
    INSERT INTO razorpay_webhook_events (event_id, event_type)
    VALUES (${eventId}, ${eventType})
    ON CONFLICT (event_id) DO NOTHING
    RETURNING event_id
  `;
  if (rows.length === 0) {
    const existing = await sql`
      SELECT processed_at FROM razorpay_webhook_events WHERE event_id = ${eventId}
    `;
    return { recorded: true, alreadyProcessed: Boolean(existing[0]?.processed_at) };
  }
  return { recorded: true, alreadyProcessed: false };
};

export const completeWebhookEvent = async (eventId: string) => {
  const sql = getDatabase();
  if (!sql) return;
  await sql`
    UPDATE razorpay_webhook_events
    SET processed_at = now()
    WHERE event_id = ${eventId}
  `;
};

export const claimConfirmation = async (registrationId: string) => {
  const sql = getDatabase();
  if (!sql) return false;
  const rows = await sql`
    UPDATE posh_registrations
    SET confirmation_claimed_at = now(), updated_at = now()
    WHERE id = ${registrationId}
      AND status = 'paid'
      AND confirmation_sent_at IS NULL
      AND (
        confirmation_claimed_at IS NULL
        OR confirmation_claimed_at < now() - interval '10 minutes'
      )
    RETURNING id
  `;
  return rows.length === 1;
};

export const markConfirmationSent = async (registrationId: string) => {
  const sql = getDatabase();
  if (!sql) return;
  await sql`
    UPDATE posh_registrations
    SET confirmation_sent_at = now(), updated_at = now()
    WHERE id = ${registrationId}
  `;
};

export const releaseConfirmationClaim = async (registrationId: string) => {
  const sql = getDatabase();
  if (!sql) return;
  await sql`
    UPDATE posh_registrations
    SET confirmation_claimed_at = NULL, updated_at = now()
    WHERE id = ${registrationId} AND confirmation_sent_at IS NULL
  `;
};
