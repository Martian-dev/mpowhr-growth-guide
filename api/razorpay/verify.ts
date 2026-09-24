import { createHmac, timingSafeEqual } from "node:crypto";
import { applyProcessedRefunds, findRegistrationByOrder, markPaid } from "./db";
import { isConfirmationEmailConfigured, sendConfirmation } from "./email";

const PLAN_AMOUNTS = new Set([70000, 149900]);

type RazorpayPayment = {
  order_id?: unknown;
  status?: unknown;
  currency?: unknown;
  amount?: unknown;
};

type RazorpayOrder = {
  id?: unknown;
  currency?: unknown;
  amount?: unknown;
  notes?: { product?: unknown; registration_id?: unknown };
};

// Vercel function: confirms a Checkout response by checking its signature and
// then confirming the matching Razorpay order and captured payment.

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return Response.json(
      { error: "Payments are not configured yet." },
      { status: 500 },
    );
  }
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    return Response.json(
      { error: "Registration storage is not configured yet." },
      { status: 500 },
    );
  }

  const raw = await request.text().catch(() => "");
  if (raw.length > 10_000) {
    return Response.json({ verified: false }, { status: 400 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw) as unknown;
  } catch {
    return Response.json({ verified: false }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ verified: false }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const orderId = payload.razorpay_order_id;
  const paymentId = payload.razorpay_payment_id;
  const signature = payload.razorpay_signature;

  if (
    typeof orderId !== "string" ||
    typeof paymentId !== "string" ||
    typeof signature !== "string"
  ) {
    return Response.json({ verified: false }, { status: 400 });
  }

  const expected = createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const verified =
    expected.length === signature.length &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(signature));

  if (!verified) {
    return Response.json({ verified: false }, { status: 400 });
  }

  const authorization = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString(
    "base64",
  )}`;
  let paymentResponse: Response;
  let orderResponse: Response;
  try {
    [paymentResponse, orderResponse] = await Promise.all([
      fetch(
        `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`,
        { headers: { Authorization: authorization } },
      ),
      fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}`, {
        headers: { Authorization: authorization },
      }),
    ]);
  } catch {
    return Response.json(
      { verified: false, error: "Payment status could not be confirmed." },
      { status: 502 },
    );
  }

  if (!paymentResponse.ok || !orderResponse.ok) {
    return Response.json(
      { verified: false, error: "Payment status could not be confirmed." },
      { status: 502 },
    );
  }

  let payment: RazorpayPayment;
  let order: RazorpayOrder;
  try {
    [payment, order] = await Promise.all([
      paymentResponse.json(),
      orderResponse.json(),
    ]);
  } catch {
    return Response.json(
      { verified: false, error: "Payment status could not be confirmed." },
      { status: 502 },
    );
  }
  const capturedPayment =
    payment?.order_id === orderId &&
    payment?.status === "captured" &&
    payment?.currency === "INR" &&
    typeof payment?.amount === "number" &&
    PLAN_AMOUNTS.has(payment?.amount);
  const expectedOrder =
    order?.id === orderId &&
    order?.currency === "INR" &&
    typeof order?.amount === "number" &&
    PLAN_AMOUNTS.has(order?.amount) &&
    order?.notes?.product === "POSH Workshop";

  if (!capturedPayment || !expectedOrder || payment.amount !== order.amount) {
    return Response.json(
      { verified: false, error: "Payment status could not be confirmed." },
      { status: 400 },
    );
  }
  const paymentAmount = payment.amount as number;
  const paymentCurrency = payment.currency as string;

  let registration;
  try {
    registration = await findRegistrationByOrder(orderId);
  } catch (error) {
    console.error("Could not load POSH registration", error);
    return Response.json(
      { verified: false, error: "Registration could not be confirmed." },
      { status: 502 },
    );
  }
  if (
    !registration ||
    registration.expected_amount !== paymentAmount ||
    registration.currency !== paymentCurrency ||
    order.notes?.registration_id !== registration.id
  ) {
    return Response.json(
      { verified: false, error: "Registration could not be confirmed." },
      { status: 400 },
    );
  }

  let paidRegistration = await markPaid({
    orderId,
    paymentId,
    amount: paymentAmount,
    currency: paymentCurrency,
  });
  if (!paidRegistration) {
    return Response.json(
      { verified: false, error: "Registration could not be confirmed." },
      { status: 409 },
    );
  }
  paidRegistration = (await applyProcessedRefunds(paymentId)) ?? paidRegistration;
  if (paidRegistration.status === "paid" && isConfirmationEmailConfigured()) {
    await sendConfirmation(paidRegistration);
  }

  return Response.json({ verified: true, paymentId });
}
