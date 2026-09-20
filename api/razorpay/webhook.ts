import { createHmac, timingSafeEqual } from "node:crypto";
import {
  applyProcessedRefunds,
  completeWebhookEvent,
  getDatabase,
  markPaid,
  recordProcessedRefund,
  recordWebhookEvent,
  updateWebhookRegistration,
  type Registration,
} from "./db";
import { sendConfirmation } from "./email";

type WebhookPayload = {
  event?: unknown;
  payload?: {
    payment?: { entity?: Record<string, unknown> };
    refund?: { entity?: Record<string, unknown> };
  };
};

const signatureMatches = (raw: string, signature: string, secret: string) => {
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  return (
    expected.length === signature.length &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  );
};

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !getDatabase()) {
    return Response.json({ error: "Webhook is not configured yet." }, { status: 500 });
  }

  const raw = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";
  const eventId = request.headers.get("x-razorpay-event-id") ?? "";
  if (!eventId || !signature || !signatureMatches(raw, signature, secret)) {
    return Response.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  if (raw.length > 1_000_000) {
    return Response.json({ error: "Webhook payload is too large." }, { status: 413 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(raw) as WebhookPayload;
  } catch {
    return Response.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  const eventType = typeof payload?.event === "string" ? payload.event : "unknown";
  const event = await recordWebhookEvent(eventId, eventType);
  if (event.alreadyProcessed) return Response.json({ received: true });

  try {
    const payment = payload?.payload?.payment?.entity;
    const refund = payload?.payload?.refund?.entity;
    let registration: Registration | null = null;

    if (
      eventType === "payment.captured" &&
      typeof payment?.order_id === "string" &&
      typeof payment?.id === "string" &&
      typeof payment?.amount === "number" &&
      payment?.currency === "INR"
    ) {
      registration = await markPaid({
        orderId: payment.order_id,
        paymentId: payment.id,
        amount: payment.amount,
        currency: payment.currency,
      });
      if (registration) {
        registration = (await applyProcessedRefunds(payment.id)) ?? registration;
      }
    } else if (
      eventType === "payment.failed" &&
      typeof payment?.order_id === "string" &&
      typeof payment?.id === "string"
    ) {
      registration = await updateWebhookRegistration({
        orderId: payment.order_id,
        paymentId: payment.id,
        status: "failed",
      });
    } else if (
      eventType === "refund.processed" &&
      typeof refund?.id === "string" &&
      typeof refund?.payment_id === "string" &&
      typeof refund?.amount === "number"
    ) {
      await recordProcessedRefund({
        refundId: refund.id,
        paymentId: refund.payment_id,
        amount: refund.amount,
      });
      registration = await applyProcessedRefunds(refund.payment_id);
    }

    if (registration?.status === "paid") {
      const sent = await sendConfirmation(registration);
      if (!sent) throw new Error("Confirmation email was not sent");
    }
    await completeWebhookEvent(eventId);
    return Response.json({ received: true });
  } catch (error) {
    console.error("Razorpay webhook processing failed", error);
    return Response.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}
