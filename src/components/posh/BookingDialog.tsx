import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { payWithRazorpay } from "@/lib/razorpay";
import { PLANS, bodyFont, headingFont } from "./constants";

// Navy primary of the theme-corporate palette, used to tint the Razorpay window.
const CHECKOUT_THEME_COLOR = "#0F3257";

type Step = "details" | "paying" | "paid";

// Collects attendee details, then hands over to Razorpay Checkout. The dialog
// closes while Razorpay is open, since its focus trap would block the payment
// window, and reopens to confirm a successful booking.
const BookingDialog = ({
  seats,
  open,
  onOpenChange,
}: {
  seats: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState({ name: "", email: "", phone: "" });
  const [paymentId, setPaymentId] = useState("");
  const plan = PLANS.find((p) => p.seats === seats) ?? PLANS[0];
  const seatLabel = seats === 1 ? "1 seat" : `${seats} seats`;

  const handleOpenChange = (next: boolean) => {
    if (!next && step === "paid") setStep("details");
    onOpenChange(next);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStep("paying");
    try {
      const result = await payWithRazorpay(
        { seats, ...details },
        {
          name: "MpowHR",
          description: `POSH Workshop, ${seatLabel}`,
          themeColor: CHECKOUT_THEME_COLOR,
          onOpen: () => onOpenChange(false),
        },
      );
      if (result.status === "paid") {
        setPaymentId(result.paymentId);
        setStep("paid");
        onOpenChange(true);
      } else {
        setStep("details");
        onOpenChange(true);
      }
    } catch (error) {
      setStep("details");
      onOpenChange(true);
      toast.error(
        error instanceof Error ? error.message : "Payment could not be completed.",
      );
    }
  };

  const update =
    (field: keyof typeof details) => (event: React.ChangeEvent<HTMLInputElement>) =>
      setDetails((current) => ({ ...current, [field]: event.target.value }));

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* The dialog renders in a portal, so it needs the page theme re-applied */}
      <DialogContent
        className="theme-corporate bg-white text-foreground border-t-4 border-t-[#D4AF37] max-w-[calc(100%-2rem)] sm:max-w-md"
        style={bodyFont}
      >
        {step === "paying" ? (
          <div
            className="relative overflow-hidden py-8 text-center"
            role="status"
            aria-live="polite"
          >
            <div
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
              aria-hidden="true"
            />
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#0F3257]/5"
              aria-hidden="true"
            >
              <Loader2 className="h-7 w-7 animate-spin text-[#0F3257] motion-reduce:animate-none" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#0F3257]">
              Secure checkout
            </p>
            <DialogTitle className="mt-2 text-2xl font-bold" style={headingFont}>
              Opening Razorpay
            </DialogTitle>
            <DialogDescription className="mx-auto mt-3 max-w-xs text-base leading-relaxed text-slate-600">
              Creating your order and connecting you to the secure payment window.
            </DialogDescription>
          </div>
        ) : step === "paid" ? (
          <div className="text-center py-4">
            <CheckCircle2
              className="w-14 h-14 mx-auto text-[#D4AF37]"
              aria-hidden="true"
            />
            <DialogTitle
              className="mt-4 text-2xl font-bold"
              style={headingFont}
            >
              You’re booked!
            </DialogTitle>
            <DialogDescription className="mt-3 text-base text-slate-600">
              Your {seatLabel} for the POSH workshop {seats === 1 ? "is" : "are"}{" "}
              confirmed. We’ll share the workshop details with you separately.
            </DialogDescription>
            <p className="mt-4 text-xs text-slate-500">
              Payment ID: {paymentId}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold" style={headingFont}>
                Secure your Seat
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                POSH Workshop, {seatLabel} · {plan.price}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              <Label htmlFor="booking-name">Full name</Label>
              <Input
                id="booking-name"
                autoComplete="name"
                required
                maxLength={100}
                value={details.name}
                onChange={update("name")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-email">Email</Label>
              <Input
                id="booking-email"
                type="email"
                autoComplete="email"
                required
                maxLength={100}
                value={details.email}
                onChange={update("email")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-phone">Phone</Label>
              <Input
                id="booking-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                required
                pattern="^\+?[0-9 \-]{10,15}$"
                title="Enter a valid phone number"
                value={details.phone}
                onChange={update("phone")}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full min-h-[48px] text-base bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Lock className="w-4 h-4" aria-hidden="true" />
              Pay {plan.price}
            </Button>
            <p className="text-center text-xs text-slate-500">
              Secure payment via Razorpay: UPI, cards, net banking and wallets.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
