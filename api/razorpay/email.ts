import { Resend } from "resend";
import {
  claimConfirmation,
  markConfirmationSent,
  releaseConfirmationClaim,
  type Registration,
} from "./db";

export const sendConfirmation = async (registration: Registration) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return false;

  try {
    if (!(await claimConfirmation(registration.id))) return true;
    const resend = new Resend(apiKey);
    const result = await resend.emails.send(
      {
        from,
        to: registration.email,
        subject: "Your MpowHR POSH workshop registration is confirmed",
        text: [
          `Hi ${registration.name},`,
          "",
          "Your POSH workshop registration is confirmed.",
          `Seats: ${registration.seats}`,
          `Payment ID: ${registration.razorpay_payment_id ?? "Confirmed"}`,
          "",
          "We will share the workshop access and schedule details with you separately.",
          "",
          "MpowHR",
        ].join("\n"),
      },
      { idempotencyKey: `posh-confirmation/${registration.id}` },
    );
    if (result.error) throw new Error(result.error.message);
    await markConfirmationSent(registration.id);
    return true;
  } catch (error) {
    console.error("Confirmation email failed", error);
    await releaseConfirmationClaim(registration.id);
    return false;
  }
};
