// WhatsApp number listed in the site footer. Swap REGISTRATION_URL for a
// payment/registration link once one is available.
const WHATSAPP_NUMBER = "917603892152";

const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const CONSULTATION_URL = whatsappLink(
  "Hi Anne, I'd like to book a free POSH consultation.",
);

export const REGISTRATION_URL = whatsappLink(
  "Hi Anne, I'd like to secure my seat for the 120-minute POSH workshop.",
);

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
