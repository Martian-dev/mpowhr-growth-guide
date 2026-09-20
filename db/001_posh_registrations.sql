-- Run this once in the Neon SQL editor before enabling paid registrations.

CREATE TABLE IF NOT EXISTS posh_registrations (
  id text PRIMARY KEY,
  razorpay_order_id text UNIQUE,
  razorpay_payment_id text UNIQUE,
  seats integer NOT NULL CHECK (seats IN (1, 2)),
  expected_amount integer NOT NULL,
  currency text NOT NULL DEFAULT 'INR',
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  status text NOT NULL DEFAULT 'created'
    CHECK (status IN ('created', 'paid', 'failed', 'refunded', 'cancelled')),
  refunded_amount integer NOT NULL DEFAULT 0 CHECK (refunded_amount >= 0),
  confirmation_sent_at timestamptz,
  confirmation_claimed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS posh_registrations_status_created_idx
  ON posh_registrations (status, created_at);

CREATE TABLE IF NOT EXISTS razorpay_webhook_events (
  event_id text PRIMARY KEY,
  event_type text NOT NULL,
  processed_at timestamptz,
  received_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS razorpay_processed_refunds (
  refund_id text PRIMARY KEY,
  payment_id text NOT NULL,
  amount integer NOT NULL CHECK (amount > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS razorpay_processed_refunds_payment_idx
  ON razorpay_processed_refunds (payment_id);

CREATE TABLE IF NOT EXISTS posh_order_rate_limits (
  key_hash text PRIMARY KEY,
  request_count integer NOT NULL DEFAULT 1,
  expires_at timestamptz NOT NULL
);

-- Keeps this migration safe to rerun after an earlier draft of the schema.
ALTER TABLE posh_registrations
  ADD COLUMN IF NOT EXISTS refunded_amount integer NOT NULL DEFAULT 0;
