import { createHmac } from "node:crypto";
import { z } from "zod";
import {
  applyProcessedRefunds,
  completeWebhookEvent,
  recordFailure,
  recordProcessedRefund,
  recordWebhookEvent,
  getDatabase,
  attachOrder,
} from "../../server/posh/db";
import {
  errorResponse,
  HttpError,
  json,
  signaturesMatch,
} from "../../server/posh/http";
import { confirmProviderPayment, razorpay } from "../../server/posh/payments";
import {
  scheduleSync,
  scheduleConfirmation,
} from "../../server/posh/maintenance";
const paymentSchema = z.object({
  id: z.string(),
  order_id: z.string(),
  amount: z.number().int().positive(),
  currency: z.literal("INR"),
  status: z.string(),
});
const refundSchema = z.object({
  id: z.string(),
  payment_id: z.string(),
  amount: z.number().int().positive(),
});
export async function POST(request: Request) {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) throw new HttpError(503, "Webhook is not configured.");
    const raw = await request.text();
    if (raw.length > 1000000) throw new HttpError(413, "Webhook is too large.");
    const signature = request.headers.get("x-razorpay-signature") ?? "";
    const eventId = request.headers.get("x-razorpay-event-id");
    if (
      !eventId ||
      !signaturesMatch(
        createHmac("sha256", secret).update(raw).digest("hex"),
        signature,
      )
    )
      throw new HttpError(400, "Invalid webhook signature.");
    const parsed = z
      .object({ event: z.string(), payload: z.record(z.unknown()) })
      .safeParse(JSON.parse(raw));
    if (!parsed.success) throw new HttpError(400, "Invalid webhook data.");
    if (await recordWebhookEvent(eventId, parsed.data.event))
      return json({ received: true });
    const { event, payload } = parsed.data;
    if (event === "payment.captured") {
      const payment = paymentSchema.parse(
        (payload.payment as { entity: unknown })?.entity,
      );
      const known =
        await getDatabase()`SELECT id FROM posh_payment_orders WHERE razorpay_order_id=${payment.order_id}`;
      if (!known.length) {
        const order = await razorpay<{
          receipt: string;
          notes: { registration_id: string };
          amount: number;
          currency: string;
        }>(`orders/${encodeURIComponent(payment.order_id)}`);
        const candidates =
          await getDatabase()`SELECT id FROM posh_payment_orders WHERE id=${order.receipt} AND registration_id=${order.notes?.registration_id} AND amount=${order.amount} AND currency=${order.currency}`;
        if (!candidates.length) {
          await completeWebhookEvent(eventId);
          return json({ received: true });
        }
        await attachOrder(order.receipt, payment.order_id);
      }
      const booking = await confirmProviderPayment({
        ...payment,
        status: "captured",
      });
      if (booking) scheduleConfirmation(booking);
    } else if (event === "payment.failed") {
      const p = z
        .object({ order_id: z.string() })
        .parse((payload.payment as { entity: unknown })?.entity);
      await recordFailure(p.order_id);
    } else if (event === "refund.processed") {
      const r = refundSchema.parse(
        (payload.refund as { entity: unknown })?.entity,
      );
      await recordProcessedRefund({
        refundId: r.id,
        paymentId: r.payment_id,
        amount: r.amount,
      });
      await applyProcessedRefunds(r.payment_id);
    }
    await completeWebhookEvent(eventId);
    scheduleSync();
    return json({ received: true });
  } catch (error) {
    return errorResponse(error);
  }
}
