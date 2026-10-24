-- Preserve existing paid registrations while introducing draft registration sessions.
ALTER TABLE posh_registrations DROP CONSTRAINT IF EXISTS posh_registrations_status_check;
ALTER TABLE posh_registrations ADD CONSTRAINT posh_registrations_status_check
  CHECK (status IN ('draft','awaiting_payment','created','paid','failed','refunded','cancelled','payment_review'));
ALTER TABLE posh_registrations ALTER COLUMN seats DROP NOT NULL;
ALTER TABLE posh_registrations ALTER COLUMN expected_amount DROP NOT NULL;
ALTER TABLE posh_registrations ADD COLUMN IF NOT EXISTS audience text;
ALTER TABLE posh_registrations ADD COLUMN IF NOT EXISTS session_hash text UNIQUE;
ALTER TABLE posh_registrations ADD COLUMN IF NOT EXISTS paid_at timestamptz;
CREATE SEQUENCE IF NOT EXISTS posh_booking_sheet_rows START 2;
CREATE SEQUENCE IF NOT EXISTS posh_attendee_sheet_rows START 2;
ALTER TABLE posh_registrations ADD COLUMN IF NOT EXISTS sheet_row bigint NOT NULL DEFAULT nextval('posh_booking_sheet_rows');
CREATE UNIQUE INDEX IF NOT EXISTS posh_booking_sheet_row_idx ON posh_registrations(sheet_row);

CREATE TABLE IF NOT EXISTS posh_attendees (
  id text PRIMARY KEY,
  registration_id text NOT NULL REFERENCES posh_registrations(id),
  position integer NOT NULL CHECK (position IN (1,2)),
  name text NOT NULL, email text NOT NULL, phone text NOT NULL, audience text,
  active boolean NOT NULL DEFAULT true,
  sheet_row bigint NOT NULL UNIQUE DEFAULT nextval('posh_attendee_sheet_rows'),
  UNIQUE(registration_id, position)
);
CREATE TABLE IF NOT EXISTS posh_payment_orders (
  id text PRIMARY KEY,
  registration_id text NOT NULL REFERENCES posh_registrations(id),
  seats integer NOT NULL CHECK (seats IN (1,2)),
  amount integer NOT NULL CHECK (amount > 0), currency text NOT NULL DEFAULT 'INR',
  snapshot jsonb NOT NULL,
  razorpay_order_id text UNIQUE, razorpay_payment_id text UNIQUE,
  status text NOT NULL CHECK (status IN ('creating','unknown','created','paid','refunded','cancelled')),
  refunded_amount integer NOT NULL DEFAULT 0,
  last_failure_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  checked_at timestamptz,
  expires_at timestamptz NOT NULL DEFAULT now() + interval '30 minutes'
);
CREATE INDEX IF NOT EXISTS posh_payment_orders_registration_idx ON posh_payment_orders(registration_id, created_at);
CREATE TABLE IF NOT EXISTS posh_sheet_jobs (
  registration_id text PRIMARY KEY REFERENCES posh_registrations(id),
  version bigint NOT NULL DEFAULT 1,
  synced_version bigint NOT NULL DEFAULT 0,
  attempts integer NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  last_error text, synced_at timestamptz
);
CREATE TABLE IF NOT EXISTS posh_worker_leases (
  name text PRIMARY KEY, token text NOT NULL, expires_at timestamptz NOT NULL
);

-- The transactional outbox is populated even when the process dies after commit.
CREATE OR REPLACE FUNCTION posh_queue_sheet_sync() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE booking_id text;
BEGIN
  IF TG_TABLE_NAME = 'posh_registrations' THEN booking_id := NEW.id;
  ELSE booking_id := NEW.registration_id;
  END IF;
  INSERT INTO posh_sheet_jobs(registration_id)
  VALUES (booking_id)
  ON CONFLICT (registration_id) DO UPDATE SET version = posh_sheet_jobs.version + 1,
    next_attempt_at = now(), attempts = 0;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS posh_registration_sync ON posh_registrations;
CREATE TRIGGER posh_registration_sync AFTER INSERT OR UPDATE ON posh_registrations
  FOR EACH ROW EXECUTE FUNCTION posh_queue_sheet_sync();
DROP TRIGGER IF EXISTS posh_attendee_sync ON posh_attendees;
CREATE TRIGGER posh_attendee_sync AFTER INSERT OR UPDATE ON posh_attendees
  FOR EACH ROW EXECUTE FUNCTION posh_queue_sheet_sync();

INSERT INTO posh_attendees(id,registration_id,position,name,email,phone,audience)
  SELECT id || ':1',id,1,name,email,phone,audience FROM posh_registrations
  ON CONFLICT (registration_id,position) DO NOTHING;
INSERT INTO posh_payment_orders(id,registration_id,seats,amount,currency,snapshot,razorpay_order_id,razorpay_payment_id,status,refunded_amount,created_at)
  SELECT id,id,seats,expected_amount,currency,
    jsonb_build_object('name',name,'email',email,'phone',phone,'audience',audience,'attendees',
      jsonb_build_array(jsonb_build_object('name',name,'email',email,'phone',phone,'audience',audience))),
    razorpay_order_id,razorpay_payment_id,
    CASE WHEN status IN ('paid','refunded') THEN status ELSE 'created' END,
    refunded_amount,created_at
  FROM posh_registrations WHERE razorpay_order_id IS NOT NULL
  ON CONFLICT DO NOTHING;
INSERT INTO posh_sheet_jobs(registration_id) SELECT id FROM posh_registrations ON CONFLICT DO NOTHING;

-- Checkout claims are serialized with capacity checks and selection edits.
CREATE OR REPLACE FUNCTION posh_claim_checkout(booking_id text, order_id text, workshop_capacity integer)
RETURNS SETOF posh_payment_orders LANGUAGE plpgsql AS $$
DECLARE booking posh_registrations; existing posh_payment_orders; used integer; people jsonb;
BEGIN
  PERFORM pg_advisory_xact_lock(29481723);
  SELECT * INTO booking FROM posh_registrations WHERE id = booking_id FOR UPDATE;
  IF booking.status NOT IN ('draft','awaiting_payment','created','failed') OR booking.audience IS NULL OR booking.seats IS NULL THEN
    RAISE EXCEPTION 'Complete your registration before paying';
  END IF;
  SELECT * INTO existing FROM posh_payment_orders WHERE registration_id = booking_id
    AND status IN ('creating','unknown','created') AND expires_at > now() ORDER BY created_at DESC LIMIT 1;
  IF FOUND THEN RETURN NEXT existing; RETURN; END IF;
  SELECT COALESCE(SUM(r.seats),0) INTO used FROM posh_registrations r WHERE r.id <> booking_id AND
    (r.status IN ('paid','payment_review') OR EXISTS (SELECT 1 FROM posh_payment_orders o
      WHERE o.registration_id = r.id AND o.status IN ('creating','unknown','created') AND o.expires_at > now()));
  IF used + booking.seats > workshop_capacity THEN RAISE EXCEPTION 'Those seats are no longer available'; END IF;
  SELECT jsonb_agg(jsonb_build_object('name',name,'email',email,'phone',phone,'audience',audience) ORDER BY position)
    INTO people FROM posh_attendees WHERE registration_id = booking_id AND active;
  IF jsonb_array_length(people) <> booking.seats THEN RAISE EXCEPTION 'Complete all attendee details'; END IF;
  INSERT INTO posh_payment_orders(id,registration_id,seats,amount,snapshot,status)
    VALUES(order_id,booking_id,booking.seats,booking.expected_amount,
      jsonb_build_object('name',booking.name,'email',booking.email,'phone',booking.phone,'audience',booking.audience,'attendees',people),'creating')
    RETURNING * INTO existing;
  UPDATE posh_registrations SET status = 'awaiting_payment',updated_at = now() WHERE id = booking_id;
  RETURN NEXT existing;
END;
$$;

-- Both callbacks and webhooks cross this seam. A second capture is recorded for review.
CREATE OR REPLACE FUNCTION posh_confirm_payment(provider_order text, payment text, paid_amount integer, paid_currency text, workshop_capacity integer)
RETURNS SETOF posh_registrations LANGUAGE plpgsql AS $$
DECLARE o posh_payment_orders; b posh_registrations; person jsonb; n integer := 0; used integer; refund_total integer; target_status text;
BEGIN
  PERFORM pg_advisory_xact_lock(29481723);
  SELECT * INTO o FROM posh_payment_orders WHERE razorpay_order_id = provider_order FOR UPDATE;
  IF NOT FOUND OR o.amount <> paid_amount OR o.currency <> paid_currency OR
     (o.razorpay_payment_id IS NOT NULL AND o.razorpay_payment_id <> payment) THEN RETURN; END IF;
  SELECT * INTO b FROM posh_registrations WHERE id = o.registration_id FOR UPDATE;
  SELECT COALESCE(SUM(amount),0)::integer INTO refund_total FROM razorpay_processed_refunds WHERE payment_id = payment;
  UPDATE posh_payment_orders SET razorpay_payment_id = payment,
    status = CASE WHEN refund_total >= amount THEN 'refunded' ELSE 'paid' END,
    refunded_amount = refund_total, checked_at = now() WHERE id = o.id;
  IF b.razorpay_payment_id IS NOT NULL AND b.razorpay_payment_id <> payment THEN
    UPDATE posh_registrations SET status = 'payment_review', updated_at = now() WHERE id = b.id RETURNING * INTO b;
    RETURN NEXT b; RETURN;
  END IF;
  IF b.razorpay_payment_id = payment THEN RETURN NEXT b; RETURN; END IF;
  SELECT COALESCE(SUM(r.seats),0) INTO used FROM posh_registrations r WHERE r.id <> b.id AND
    (r.status IN ('paid','payment_review') OR EXISTS (SELECT 1 FROM posh_payment_orders p
      WHERE p.registration_id = r.id AND p.status IN ('creating','unknown','created') AND p.expires_at > now()));
  target_status := CASE WHEN refund_total >= o.amount THEN 'refunded'
    WHEN used + o.seats > workshop_capacity THEN 'payment_review' ELSE 'paid' END;
  UPDATE posh_registrations SET name=o.snapshot->>'name',email=o.snapshot->>'email',phone=o.snapshot->>'phone',
    audience=o.snapshot->>'audience',seats=o.seats,expected_amount=o.amount,
    razorpay_order_id=provider_order,razorpay_payment_id=payment,status=target_status,
    paid_at=now(),refunded_amount=refund_total,updated_at=now() WHERE id=b.id;
  UPDATE posh_attendees SET active=false WHERE registration_id=b.id;
  FOR person IN SELECT * FROM jsonb_array_elements(o.snapshot->'attendees') LOOP
    n := n + 1;
    INSERT INTO posh_attendees(id,registration_id,position,name,email,phone,audience)
      VALUES(b.id || ':' || n,b.id,n,person->>'name',person->>'email',person->>'phone',person->>'audience')
      ON CONFLICT(registration_id,position) DO UPDATE SET name=EXCLUDED.name,email=EXCLUDED.email,
        phone=EXCLUDED.phone,audience=EXCLUDED.audience,active=true;
  END LOOP;
  RETURN QUERY SELECT * FROM posh_registrations WHERE id=b.id;
END;
$$;
