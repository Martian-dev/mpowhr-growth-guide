// Vercel function: creates a Razorpay order for the POSH workshop.
// The amount is decided here from the seat count, never taken from the browser.
// Needs RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in the Vercel project env.

import { randomUUID } from "node:crypto";
import {
  allowOrderRequest,
  attachOrder,
  cancelRegistration,
  isRegistrationStoreConfigured,
  reserveRegistration,
} from "./db";

// Amounts in paise. Keep in sync with PLANS in src/components/posh/constants.ts.
const PLAN_AMOUNTS: Record<number, number> = {
  1: 80000, // ₹800
  2: 149900, // ₹1,499
};

type RazorpayOrder = {
  id?: unknown;
  amount?: unknown;
  currency?: unknown;
};

const clean = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const normalizeEmail = (value: unknown) => {
  const email = clean(value, 100).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
};

const normalizePhone = (value: unknown) => {
  const phone = clean(value, 20).replace(/[\s-]/g, "");
  return /^\+?[1-9]\d{9,14}$/.test(phone) ? phone : "";
};

const parseBody = async (request: Request) => {
  const raw = await request.text();
  if (raw.length > 10_000) return null;

  const parsed = JSON.parse(raw) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;

  const keys = Object.keys(parsed);
  if (keys.some((key) => !["seats", "name", "email", "phone"].includes(key))) {
    return null;
  }

  return parsed as Record<string, unknown>;
};

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return Response.json(
      { error: "Payments are not configured yet." },
      { status: 500 },
    );
  }

  const body = await parseBody(request).catch(() => null);
  const seats = Number(body?.seats);
  const amount = PLAN_AMOUNTS[seats];
  const name = clean(body?.name, 100);
  const email = normalizeEmail(body?.email);
  const phone = normalizePhone(body?.phone);

  if (!Number.isInteger(seats) || !amount || !name || !email || !phone) {
    return Response.json(
      { error: "Please provide a valid name, email, phone and seat count." },
      { status: 400 },
    );
  }

  if (!isRegistrationStoreConfigured()) {
    return Response.json(
      { error: "Registration storage is not configured yet." },
      { status: 500 },
    );
  }

  if (!(await allowOrderRequest(request))) {
    return Response.json(
      { error: "Too many payment attempts. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let registration: Awaited<ReturnType<typeof reserveRegistration>>;
  try {
    registration = await reserveRegistration({ seats, amount, name, email, phone });
  } catch (error) {
    console.error("Could not reserve POSH workshop seats", error);
    return Response.json(
      { error: "Could not reserve your seats. Please try again." },
      { status: 502 },
    );
  }
  if (!registration) {
    return Response.json(
      { error: "Those seats are no longer available. Please try another option." },
      { status: 409 },
    );
  }

  let response: Response;
  try {
    response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      },
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: `posh_${Date.now()}_${randomUUID().slice(0, 8)}`,
        // Notes show up against the payment in the Razorpay dashboard
        notes: {
          product: "POSH Workshop",
          registration_id: registration.id,
          seats: String(seats),
          name,
          email,
          phone,
        },
      }),
    });
  } catch {
    await cancelRegistration(registration.id);
    return Response.json(
      { error: "Could not start the payment. Please try again." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    await cancelRegistration(registration.id);
    console.error("Razorpay order creation failed", await response.text());
    return Response.json(
      { error: "Could not start the payment. Please try again." },
      { status: 502 },
    );
  }

  let order: RazorpayOrder;
  try {
    order = await response.json();
  } catch {
    await cancelRegistration(registration.id);
    return Response.json(
      { error: "Could not start the payment. Please try again." },
      { status: 502 },
    );
  }
  if (
    typeof order?.id !== "string" ||
    order.amount !== amount ||
    order.currency !== "INR"
  ) {
    await cancelRegistration(registration.id);
    console.error("Razorpay returned an unexpected order response");
    return Response.json(
      { error: "Could not start the payment. Please try again." },
      { status: 502 },
    );
  }

  try {
    if (!(await attachOrder(registration.id, order.id))) {
      await cancelRegistration(registration.id);
      return Response.json(
        { error: "Could not start the payment. Please try again." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Could not attach Razorpay order to registration", error);
    await cancelRegistration(registration.id);
    return Response.json(
      { error: "Could not start the payment. Please try again." },
      { status: 502 },
    );
  }

  return Response.json({
    keyId,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
  });
}
