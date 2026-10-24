import type { BookingView } from "../../shared/posh";
type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
type Order = {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  seats: number;
  prefill: { name: string; email: string; contact: string };
};
declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}
let scriptPromise: Promise<void> | null = null;
const loadCheckout = () => {
  if (window.Razorpay) return Promise.resolve();
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    const timer = window.setTimeout(() => fail(), 15000);
    const fail = () => {
      clearTimeout(timer);
      scriptPromise = null;
      script.remove();
      reject(
        new Error(
          "Could not load Razorpay. Check your connection and try again.",
        ),
      );
    };
    script.onload = () => {
      clearTimeout(timer);
      if (window.Razorpay) resolve();
      else fail();
    };
    script.onerror = fail;
    document.body.appendChild(script);
  });
  return scriptPromise;
};
export const bookingRequest = async <T>(
  path: string,
  method = "GET",
  body?: unknown,
  signal?: AbortSignal,
): Promise<T> => {
  const response = await fetch(path, {
    method,
    credentials: "same-origin",
    cache: "no-store",
    signal: signal ?? AbortSignal.timeout(20000),
    ...(body !== undefined
      ? {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      : {}),
  });
  const data = await response.json().catch(() => null);
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(
      import.meta.env.DEV
        ? "Registration isn’t available on this server. Open http://localhost:8080/posh after starting bun run dev."
        : "Registration is temporarily unavailable. Please try again later.",
    );
  }
  if (!response.ok)
    throw new Error(
      data.error ?? "The request couldn’t be completed. Please try again.",
    );
  return data as T;
};
export const getBooking = (signal?: AbortSignal) =>
  bookingRequest<{ booking: BookingView | null }>(
    "/api/posh/registration",
    "GET",
    undefined,
    signal,
  );
export type CheckoutResult = { status: "paid" | "pending" | "dismissed" };
export const payWithRazorpay = async (
  onOpen: () => void,
): Promise<CheckoutResult> => {
  await loadCheckout();
  const order = await bookingRequest<Order>("/api/razorpay/order", "POST", {});
  return new Promise((resolve, reject) => {
    let verifying = false;
    const checkout = new window.Razorpay!({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: "MpowHR",
      description: `POSH Workshop · ${order.seats} ${order.seats === 1 ? "person" : "people"}`,
      prefill: order.prefill,
      theme: { color: "#0F3257" },
      timeout: 900,
      modal: {
        ondismiss: () => {
          if (!verifying) resolve({ status: "dismissed" });
        },
      },
      handler: async (response: RazorpaySuccess) => {
        verifying = true;
        try {
          const result = await bookingRequest<{ verified: boolean }>(
            "/api/razorpay/verify",
            "POST",
            response,
          );
          resolve({ status: result.verified ? "paid" : "pending" });
        } catch {
          resolve({ status: "pending" });
        }
      },
    });
    try {
      checkout.open();
      onOpen();
    } catch (error) {
      reject(error);
    }
  });
};
