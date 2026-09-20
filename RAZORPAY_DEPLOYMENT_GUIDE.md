# POSH Workshop payments: deployment checklist

This is the production checklist for the POSH workshop registration flow at
`/posh`.

## What is implemented

- Razorpay Standard Checkout in the browser.
- Server-side Razorpay order creation. The browser sends a seat count; it never
  controls the amount.
- Neon/Postgres registration records, linked to the Razorpay order and payment.
- Transactional seat reservation using `POSH_WORKSHOP_CAPACITY`.
- Server-side signature, order, amount, currency, and captured-status checks.
- Razorpay webhook at `POST /api/razorpay/webhook`.
- Webhook signature validation against the raw request body.
- Duplicate webhook protection using `x-razorpay-event-id`.
- Resend confirmation email after a payment is recorded as captured.
- Failed and fully processed refunded payment statuses.
- Neon-backed rate limiting for the public order endpoint.
- Vercel SPA rewrites that leave `/api/*` routes available.

The two-seat plan currently reserves two seats for one purchaser. The flow does
not collect a second attendee name. Change that before launch if group buyers
must provide named attendees.

## Why Resend is here

Razorpay confirms and moves money. Resend delivers email. After the server has
confirmed a captured payment and written the registration to Neon, Resend sends
the purchaser a confirmation containing their name, seat count, and payment ID.
This keeps the promise on the success screen backed by a real server-side
workflow. If Resend is unavailable, the payment remains recorded and the email
can be retried through the webhook delivery.

## Files

| File | Responsibility |
| --- | --- |
| `src/components/posh/BookingDialog.tsx` | Collects attendee details and starts Checkout |
| `src/lib/razorpay.ts` | Loads Checkout and calls the API functions |
| `api/razorpay/order.ts` | Reserves seats and creates the Razorpay order |
| `api/razorpay/verify.ts` | Verifies Checkout, confirms capture, writes paid status |
| `api/razorpay/webhook.ts` | Handles captured, failed, and processed refund events |
| `api/razorpay/db.ts` | Neon registration and webhook-event operations |
| `api/razorpay/email.ts` | Resend confirmation email |
| `db/001_posh_registrations.sql` | Neon schema migration |
| `.env.example` | Required environment variable names |

## Your setup steps

### 1. Push the code

```bash
git push origin main
```

The production Vercel project must deploy this commit and use the repository
root as its root directory. Configure Vercel to use Bun for installation and
use `bun run build` as the build command so it matches the repository workflow.

### 2. Run the Neon migration

Open the Neon SQL editor for the production database and run:

```text
db/001_posh_registrations.sql
```

The migration creates `posh_registrations` and
`razorpay_webhook_events`. Run it once per database branch. If Vercel Preview
uses separate Neon branches, run it on each branch where you test.

### 3. Add Vercel environment variables

Use **Test Mode Razorpay values** in Preview and Development. Use **Live Mode
values only** in Production.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RAZORPAY_KEY_ID` | Yes | Razorpay API key ID for that environment |
| `RAZORPAY_KEY_SECRET` | Yes | Matching Razorpay API secret |
| `RAZORPAY_WEBHOOK_SECRET` | Yes | Separate secret created for the Razorpay webhook |
| `DATABASE_URL` | Yes | Neon connection string; `POSTGRES_URL` is also supported |
| `POSH_WORKSHOP_CAPACITY` | Yes | Maximum seats for this workshop, for example `50` |
| `POSH_ORDER_RATE_LIMIT` | No | Order attempts per IP in ten minutes; defaults to `5` |
| `RESEND_API_KEY` | Yes | Resend server-side API key |
| `RESEND_FROM_EMAIL` | Yes | Sender on a verified Resend domain, for example `MpowHR <workshops@example.com>` |

Never use `VITE_` for any of these values. Never commit a real value. Vercel
requires a new deployment after environment variables change.

### 4. Configure Resend

In Resend, add and verify the sending domain you will use in
`RESEND_FROM_EMAIL`, then create an API key with permission to send mail. Use
the same sender address in Preview and Production only if the domain is
verified for both environments.

### 5. Configure the Razorpay webhook

Create one webhook for Test Mode and one for Live Mode:

```text
https://YOUR_PREVIEW_OR_PRODUCTION_DOMAIN/api/razorpay/webhook
```

Point the Test Mode webhook at the Preview URL you are testing and the Live
Mode webhook at the production URL. Use the matching secret as that
environment's `RAZORPAY_WEBHOOK_SECRET`. Subscribe to:

- `payment.captured`
- `payment.failed`
- `refund.processed`

Razorpay signs the raw body with HMAC-SHA256 and sends a unique
`x-razorpay-event-id`; the endpoint validates both. Razorpay documents that
webhooks can arrive more than once or out of order, so the event table and
status updates are idempotent.

### 6. Redeploy and test Preview

After adding Test Mode, Neon, and Resend Preview values:

1. Deploy a Vercel Preview.
2. Open `/posh`.
3. Confirm `POST /api/razorpay/order` is a function response, not `index.html`.
4. Complete a Test Mode payment.
5. Confirm the payment is captured in Razorpay.
6. Confirm one `paid` row exists in Neon with the matching order and payment IDs.
7. Confirm the Resend email arrives.
8. In Razorpay webhook logs, resend the same event and confirm the row and email
   are not duplicated.

## Production launch

1. Confirm the production Neon database has the migration.
2. Confirm the real workshop capacity in `POSH_WORKSHOP_CAPACITY`.
3. Add Live Mode Razorpay keys to **Production** only.
4. Add the Live webhook URL and Live webhook secret in Razorpay.
5. Redeploy production.
6. Make one controlled real payment.
7. Confirm the paid Neon row, captured status, and Resend email.
8. Refund that controlled payment if it was only a smoke test.

## Operational behavior

- A registration is created before the Razorpay order is requested.
- A failed order request cancels that registration.
- Created and failed reservations count toward capacity for 30 minutes; paid
  reservations count permanently. Set the capacity to the real event limit.
- A browser payment callback alone is not enough. The server checks Razorpay's
  payment and order APIs, and the webhook remains the recovery path if the
  browser closes.
- A failed payment attempt does not prevent a later successful attempt on the
  same order from being recorded.
- A fully processed refund changes a paid registration to `refunded`.
- Partial processed refunds are accumulated; the registration becomes
  `refunded` when the accumulated amount reaches the expected amount.
- Resend confirmations use a per-registration idempotency key and a retry-safe
  claim in Neon.

## Privacy and retention decision

The flow stores attendee name, email, phone, Razorpay order/payment IDs, and
status in Neon, and attendee contact details are also sent to Razorpay as order
notes. Before launch, document who can access the Razorpay and Neon dashboards,
how long attendee records are retained, and when the final attendee export and
payment records are deleted or archived. This is an owner decision; the code
does not delete event records automatically.

## Verification commands

```bash
bun install
bun run typecheck
bun run build
bun run lint
git diff --check
```

Lint currently has seven existing Fast Refresh warnings in shadcn UI files and
no errors.

## References

- [Razorpay webhook validation and idempotency](https://razorpay.com/docs/webhooks/validate-test/?preferred-country=SG)
- [Razorpay payment webhooks](https://razorpay.com/docs/payments/payment-button/subscription-buttons/subscribe-to-webhooks/?preferred-country=US)
- [Razorpay processed refunds](https://razorpay.com/docs/payments/refunds/faqs/?preferred-country=SG)
- [Neon serverless driver](https://neon.com/blog/serverless-driver-for-postgres/)
- [Resend Node.js integration](https://resend.com/nodejs)
