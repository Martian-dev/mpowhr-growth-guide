// WhatsApp number listed in the site footer. Seats are paid for through
// Razorpay (see BookingDialog); WhatsApp stays as an alternative way to book.
const WHATSAPP_NUMBER = "917603892152";

const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const CONSULTATION_URL = whatsappLink(
  "Hi Anne, I'd like to book a free POSH consultation.",
);

export const registrationUrl = (seats: number) =>
  whatsappLink(
    `Hi Anne, I'd like to secure ${seats === 1 ? "1 seat" : `${seats} seats`} for the 120-minute POSH workshop.`,
  );

// Prices charged are set server-side in api/razorpay/order.ts; keep them in sync.
export const PLANS = [
  { seats: 1, price: "₹700", label: "for 1" },
  { seats: 2, price: "₹1,499", label: "for 2" },
];

// Anchor of the pricing section that the in-page enrolment CTAs scroll to.
export const PRICING_ANCHOR = "#pricing";

export const goldGradientText = {
  background:
    "linear-gradient(135deg, #8B6914 0%, #D4AF37 25%, #FFD700 50%, #D4AF37 75%, #8B6914 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

export const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

export const bodyFont = { fontFamily: "Poppins, sans-serif" };

export const headingFont = {
  fontFamily: "Vinila, Inter, sans-serif",
  letterSpacing: "0.01em",
};
