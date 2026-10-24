# POSH registration, payments and Google Sheets

The application runs as a Vite SPA with Vercel functions and Neon Postgres.
Neon owns registration and payment state; Google Sheets is a one-way reporting copy.

## Registration flow

Every workshop booking CTA opens one dialog:

1. Save name, email and phone to Neon before continuing.
2. Save one classification: Top management, Corporate professionals, Business owners, Team leaders or Students.
3. Select one or two people. For two, collect the second attendee's contact details and classification.
4. Save the selection, create a server-priced Razorpay order, and open Checkout.
5. Verify a captured payment on the server, then redirect to `/posh/thank-you`.

The thank-you page independently loads server state, including after refresh.
It shows success only for `paid`; pending payments are polled for one minute and
can be checked again manually. Refunds and payments needing review show their own messages.
The WhatsApp **Join community** button is disabled until its invite is configured.

Prices and input validation live in `shared/posh.ts`: **79,900 paise for one person**,
**149,900 paise for two**, INR. `/api/razorpay/order` accepts only an empty JSON
object. It loads contact details and price from the session's stored selection.

## Local setup

```bash
bun install
# Add actual values to ignored .env.local using .env.example as the reference.
bun run db:migrate
bun run dev
```

Open `http://localhost:8080/posh`. `bun run dev` starts Vercel's runtime for both
the frontend and `/api/*` functions, loading `.env.local`. `bun run dev:vercel`
is an equivalent command. `bun run dev:frontend` serves only the frontend for
isolated UI work; registration and payments require the full runtime. Vercel's
explicit `devCommand` starts Vite internally without recursively running `dev`.

`db:migrate` applies numbered SQL migrations in a transaction and records each
filename in `posh_schema_migrations`. Migration 002 preserves existing registration
records and backfills orders and known primary attendees. Historical registrations
cannot supply second-attendee details or classifications that were never collected.
Do not edit a migration after deployment: introduce a new numbered migration.

## Server environment

Configure these separately for Vercel Development, Preview and Production as needed:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` or `POSTGRES_URL` | Neon connection string |
| `POSH_WORKSHOP_CAPACITY` | Positive integer seat capacity |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Matching provider credentials; test keys outside Production |
| `RAZORPAY_WEBHOOK_SECRET` | Matches the secret configured on the Razorpay webhook |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Spreadsheet ID from its URL |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | Complete service-account JSON as one string |
| `CRON_SECRET` | Long random secret protecting scheduled maintenance |
| `POSH_ORDER_RATE_LIMIT` | Optional order attempts per IP per ten minutes; defaults to 5 |
| `POSH_COMMUNITY_URL` | Optional `https://chat.whatsapp.com/...` invite |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | Optional purchaser confirmation email; verified sending domain required |

In `.env.local`, wrap the single-line service-account JSON in single quotes.
In Vercel's environment-variable UI, paste the JSON itself without shell quotes.
Keep all credentials server-only, with no `VITE_` prefix. The original JSON key
must remain outside the tracked repository. Credentials configured locally do not
automatically configure a deployed Vercel project.

Use separate Neon branches and Sheets for testing and Production. The current
local Razorpay configuration uses test keys. No real charge is needed for automated tests.

## Google Sheets setup and operation

1. Enable Google Sheets API in the service account's Google Cloud project.
2. Share the target spreadsheet with the service-account email as **Editor**.
3. Configure the two Google environment variables above.
4. Run `bun run sheets:sync` to initialize tabs and flush pending records.

The initial integration target is spreadsheet
`1sUsSHvow3NKHOEuSmcwzhbRT_iYU31LVVVFOx6hfy10`.
The worker creates **Bookings** and **Attendees**, leaving other tabs intact.

**Bookings** columns: Booking ID, Name, Email, Phone, Classification, Seats,
Booking amount (INR), Status, Payment ID, Registered at, Paid at, Refunded amount (INR), Updated at.

**Attendees** columns: Attendee ID, Booking ID, Name, Email, Phone, Classification,
Booking status, Active.

A two-person purchase produces one booking amount of ₹1,499 and two attendee rows.
Draft and unpaid bookings also appear. Revenue calculations should filter paid
bookings and account for refunds. Timestamps represent the database's UTC time.
Legacy paid records may lack a paid-at timestamp.

The backend owns those columns, headers, and row positions. **Use filter views**
or a separate analysis tab; do not insert, delete or sort managed rows. Add internal
notes in columns after the managed columns or a separate tab. The writer refuses
to overwrite another record when row identifiers no longer match. Restore row
order before retrying a job that reports this error.

Each registration/attendee change increments a durable outbox version in the same
database transaction. A leased worker writes fixed row slots with `RAW` input,
preserving phone prefixes and preventing user text from becoming spreadsheet formulas.
Retries write the same slots, including after an uncertain Google response.
Newer versions remain pending if a registration changes during synchronization.

Requests kick off the worker with Vercel `waitUntil`; the payment response does not
wait for Google. The worker drains up to 50 updates within a 45-second budget.
Failed writes remain queued with backoff. A failed sync does not invalidate a booking.
`bun run sheets:sync` forces another attempt and reports remaining work; repeat it
for larger backlogs, and inspect failed jobs if it returns errors.

```sql
SELECT registration_id, version, synced_version, attempts, next_attempt_at, last_error
FROM posh_sheet_jobs
WHERE version > synced_version
ORDER BY next_attempt_at;
```

## Payment reliability and recovery

The browser callback verifies its HMAC using the **stored** order ID, fetches
the payment from Razorpay, and checks the captured state, exact amount, currency
and order membership. Signed webhooks and reconciliation use the same transactional
confirmation function. Only one payment fulfils a registration.

Checkout creation and seat-capacity checks are serialized in Postgres. Active
orders reserve seats for 30 minutes; Razorpay's Checkout timeout is 15 minutes.
During a reservation, contact details and selection are locked. Closing Checkout
offers the same order again. After expiration the selection can be edited; a late
capture restores its original immutable attendee/price snapshot.

Unknown order-creation results are recovered using the unique provider receipt.
The server does not blindly retry an ambiguous creation request. Failed payment
attempts remain retryable and cannot regress a paid/refunded registration.
Captured payments reaching a second order for an already-paid registration, or
late captures exceeding available capacity, are recorded as `payment_review`.
They are never silently discarded or shown as successful fulfilment.

Review those records in Neon and Razorpay before deciding on fulfilment or refunds:

```sql
SELECT id, status, seats, razorpay_payment_id
FROM posh_registrations WHERE status = 'payment_review';

SELECT registration_id, razorpay_order_id, razorpay_payment_id, amount, status, refunded_amount
FROM posh_payment_orders WHERE registration_id = 'BOOKING_ID';
```

Processed refunds are deduplicated by refund ID. Partial amounts accumulate;
full refunds update the registration. Refunds arriving before capture are applied
when capture is recorded. No automatic refund is issued by this application.

## Webhook and maintenance configuration

Before taking real payments, configure a publicly reachable Razorpay webhook:

```text
POST https://YOUR_DOMAIN/api/razorpay/webhook
```

Subscribe to **payment.captured**, **payment.failed**, and **refund.processed**.
Set the same secret in `RAZORPAY_WEBHOOK_SECRET`. Enable automatic payment capture
in Razorpay. Configure Test and Live webhooks against their corresponding environments.
Localhost cannot receive provider webhooks directly; use a public test deployment.

`vercel.json` schedules `GET /api/posh/maintenance` daily at 03:00 UTC as a fallback.
Vercel sends `Authorization: Bearer <CRON_SECRET>`. Cron runs on Production deployments.
The endpoint also reconciles pending orders and retries purchaser confirmation
emails. Payment and Sheet requests provide the usual immediate path; daily cron
is the recovery cadence when no further traffic arrives. Bounded batches may need
multiple invocations for a large backlog.

For faster unattended recovery, use a plan supporting a more frequent Vercel cron
(for example `*/5 * * * *`), or an external scheduler calling the same protected
endpoint. Vercel Hobby permits only daily cron; changing the expression without
checking the plan can prevent deployment.

## Validation and rollout

```bash
bun run test
bun run typecheck
bun run lint
bun run build
bunx playwright install --with-deps chromium
bun run test:e2e
bun run test:runtime
```

Backend tests use an isolated PostgreSQL engine (PGlite) with fake provider and
Sheets adapters. Browser tests cover both desktop and mobile, using fake Checkout
and HTTP responses. They do not send email, touch the configured Neon/Sheet, or charge money.

`test:runtime` additionally loads the real Vercel development server, verifies the
workshop renders, and opens the registration dialog without submitting it. It
catches routing failures that frontend-only tests cannot detect. Keep `shared/`
out of the SPA catch-all rewrite so Vite can serve the registration module imports.

Before Production rollout, migrate the target database, configure its environment
variables, deploy the code, register the webhook, and verify both payment plans
in Razorpay Test Mode. Confirm the registration survives a thank-you-page refresh,
the webhook completes payment without a browser callback, and the booking/attendee
rows reach the intended spreadsheet. Then select the correct live credentials
and webhook for the live environment.

References: [Razorpay Checkout integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/),
[Razorpay webhook validation](https://razorpay.com/docs/webhooks/validate-test/),
[Google service accounts](https://developers.google.com/workspace/guides/create-credentials),
[Google Sheets quotas](https://developers.google.com/workspace/sheets/api/limits),
[Vercel cron operation](https://vercel.com/docs/cron-jobs/manage-cron-jobs).
