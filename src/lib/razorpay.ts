// Thin wrapper around Razorpay Checkout. Orders are created and payments are
// verified by the Vercel functions in /api/razorpay.

const CHECKOUT_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayInstance = { open: () => void };

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayInstance;
  }
}

let scriptPromise: Promise<void> | null = null;

const loadCheckout = () => {
  if (window.Razorpay) return Promise.resolve();
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CHECKOUT_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      script.remove();
      reject(new Error("Could not load the payment window. Check your connection and try again."));
    };
    document.body.appendChild(script);
  });
  return scriptPromise;
};

const postJson = async (url: string, payload: unknown) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, data };
};

export type CheckoutDetails = {
  seats: number;
  name: string;
  email: string;
  phone: string;
};

export type CheckoutResult =
  | { status: "paid"; paymentId: string }
  | { status: "dismissed" };

// Resolves once the visitor pays (and the payment is verified) or closes the
// window; rejects with a readable message on any failure.
export const payWithRazorpay = async (
  details: CheckoutDetails,
  checkoutOptions: {
    name: string;
    description: string;
    themeColor: string;
    onOpen?: () => void;
  },
): Promise<CheckoutResult> => {
  const [, order] = await Promise.all([
    loadCheckout(),
    postJson("/api/razorpay/order", details),
  ]);
  if (!order.ok || !window.Razorpay) {
    throw new Error(order.data.error ?? "Could not start the payment. Please try again.");
  }

  return new Promise<CheckoutResult>((resolve, reject) => {
    const checkout = new window.Razorpay!({
      key: order.data.keyId,
      order_id: order.data.orderId,
      amount: order.data.amount,
      currency: order.data.currency,
      name: checkoutOptions.name,
      description: checkoutOptions.description,
      prefill: { name: details.name, email: details.email, contact: details.phone },
      notes: { seats: String(details.seats) },
      theme: { color: checkoutOptions.themeColor },
      modal: { ondismiss: () => resolve({ status: "dismissed" }) },
      handler: async (response: RazorpaySuccess) => {
        const verification = await postJson("/api/razorpay/verify", response).catch(
          () => null,
        );
        if (verification?.ok && verification.data.verified) {
          resolve({ status: "paid", paymentId: response.razorpay_payment_id });
        } else {
          reject(
            new Error(
              `We couldn't confirm your payment (ID ${response.razorpay_payment_id}). If money was deducted, contact us with this ID.`,
            ),
          );
        }
      },
    });
    // Failed attempts are retried inside the Razorpay window itself, so the
    // promise only settles on a verified payment or when the window is closed.
    checkout.open();
    checkoutOptions.onOpen?.();
  });
};
