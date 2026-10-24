import { createHmac, randomUUID } from "node:crypto";
import {
  attachOrder,
  getDatabase,
  markPaid,
  applyProcessedRefunds,
  ordersFor,
  claimCheckout,
  type PaymentOrder,
  type Registration,
} from "./db";
import { HttpError, signaturesMatch } from "./http";

type ProviderOrder = {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  notes?: { registration_id?: string };
  status: string;
};
type ProviderPayment = {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
};
class ProviderRequestError extends HttpError {
  constructor(public providerStatus: number) {
    super(
      502,
      "Razorpay is temporarily unavailable. Please check your booking status before retrying.",
    );
  }
}
export const razorpay = async <T>(path: string, body?: unknown): Promise<T> => {
  const { RAZORPAY_KEY_ID: key, RAZORPAY_KEY_SECRET: secret } = process.env;
  if (!key || !secret)
    throw new HttpError(503, "Payments are not configured yet.");
  const response = await fetch(`https://api.razorpay.com/v1/${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new ProviderRequestError(response.status);
  return (await response.json()) as T;
};
export const recoverOrder = async (order: PaymentOrder) => {
  if (order.razorpay_order_id) return order;
  const response = await razorpay<{ items: ProviderOrder[] }>(
    `orders?receipt=${encodeURIComponent(order.id)}&count=100`,
  );
  const match = response.items.find(
    (o) =>
      o.receipt === order.id &&
      o.notes?.registration_id === order.registration_id &&
      o.amount === order.amount &&
      o.currency === order.currency,
  );
  return match ? ((await attachOrder(order.id, match.id)) ?? order) : order;
};
export const createCheckout = async (registrationId: string) => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET)
    throw new HttpError(503, "Payments are not configured yet.");
  const candidateId = randomUUID();
  let order = await claimCheckout(registrationId, candidateId);
  if (order.id === candidateId) {
    try {
      const created = await razorpay<ProviderOrder>("orders", {
        amount: order.amount,
        currency: order.currency,
        receipt: order.id,
        notes: {
          product: "POSH Workshop",
          registration_id: registrationId,
          seats: String(order.seats),
        },
      });
      if (
        typeof created.id !== "string" ||
        created.amount !== order.amount ||
        created.currency !== order.currency
      )
        throw new Error("Unexpected provider order");
      order = (await attachOrder(order.id, created.id)) ?? order;
    } catch (error) {
      const rejected =
        error instanceof ProviderRequestError &&
        [400, 401, 403, 404, 422].includes(error.providerStatus);
      await getDatabase()`UPDATE posh_payment_orders SET status=${rejected ? "cancelled" : "unknown"} WHERE id=${order.id} AND status='creating'`;
      throw new HttpError(
        503,
        rejected
          ? "The payment order could not be started. Please try again shortly."
          : "We’re checking your payment order. Please retry in a moment; your details are saved.",
      );
    }
  } else if (!order.razorpay_order_id) order = await recoverOrder(order);
  if (!order.razorpay_order_id)
    throw new HttpError(
      409,
      "Your payment order is still being checked. Please try again shortly.",
    );
  return {
    keyId: process.env.RAZORPAY_KEY_ID,
    orderId: order.razorpay_order_id,
    amount: order.amount,
    currency: order.currency,
    seats: order.seats,
    prefill: {
      name: order.snapshot.name,
      email: order.snapshot.email,
      contact: order.snapshot.phone,
    },
  };
};
export const confirmProviderPayment = async (payment: ProviderPayment) => {
  if (payment.status !== "captured") return null;
  const booking = await markPaid({
    orderId: payment.order_id,
    paymentId: payment.id,
    amount: payment.amount,
    currency: payment.currency,
  });
  if (!booking)
    throw new HttpError(
      409,
      "The payment could not be matched to your registration.",
    );
  return (await applyProcessedRefunds(payment.id)) ?? booking;
};
export const verifyCheckout = async (
  booking: Registration,
  payload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  },
) => {
  const order = (await ordersFor(booking.id)).find(
    (o) => o.razorpay_order_id === payload.razorpay_order_id,
  );
  if (!order)
    throw new HttpError(400, "Payment does not belong to this registration.");
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) throw new HttpError(503, "Payments are not configured.");
  const expected = createHmac("sha256", secret)
    .update(`${order.razorpay_order_id}|${payload.razorpay_payment_id}`)
    .digest("hex");
  if (!signaturesMatch(expected, payload.razorpay_signature))
    throw new HttpError(400, "Invalid payment signature.");
  const payment = await razorpay<ProviderPayment>(
    `payments/${encodeURIComponent(payload.razorpay_payment_id)}`,
  );
  if (
    payment.order_id !== order.razorpay_order_id ||
    payment.amount !== order.amount ||
    payment.currency !== order.currency
  )
    throw new HttpError(400, "Payment details do not match your order.");
  return await confirmProviderPayment(payment);
};
export const reconcileOrder = async (original: PaymentOrder) => {
  const order = await recoverOrder(original);
  if (!order.razorpay_order_id) {
    await getDatabase()`UPDATE posh_payment_orders SET checked_at=now(),status='unknown' WHERE id=${order.id} AND status IN ('creating','unknown')`;
    return;
  }
  const payments = await razorpay<{ items: ProviderPayment[] }>(
    `orders/${encodeURIComponent(order.razorpay_order_id)}/payments`,
  );
  for (const payment of payments.items)
    if (payment.status === "captured") await confirmProviderPayment(payment);
  await getDatabase()`UPDATE posh_payment_orders SET checked_at=now(),expires_at=CASE WHEN ${payments.items.some((p) => p.status === "authorized")}
    THEN GREATEST(expires_at,now()+interval '30 minutes') ELSE expires_at END WHERE id=${order.id}`;
};
export const reconcileBooking = async (id: string) => {
  const rows =
    await getDatabase()`UPDATE posh_payment_orders SET checked_at=now() WHERE registration_id=${id}
    AND status IN ('creating','unknown','created') AND (checked_at IS NULL OR checked_at<now()-interval '10 seconds') RETURNING *`;
  for (const order of rows as PaymentOrder[]) await reconcileOrder(order);
};
