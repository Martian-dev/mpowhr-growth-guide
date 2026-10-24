import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { bookingRequest, getBooking, payWithRazorpay } from "@/lib/razorpay";
import {
  audienceSchema,
  contactSchema,
  selectionSchema,
  PLANS,
  type ContactDetails,
} from "../../../shared/posh";
import AttendeeFields, { AudienceField } from "./AttendeeFields";
import { bodyFont, headingFont } from "./constants";

type Step = "details" | "audience" | "seats";
const empty: ContactDetails = { name: "", email: "", phone: "" };
const BookingDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const navigate = useNavigate();
  const active = useRef(false);
  const skipRestore = useRef(false);
  const [step, setStep] = useState<Step>("details");
  const [details, setDetails] = useState(empty);
  const [audience, setAudience] = useState("");
  const [seats, setSeats] = useState<1 | 2>(1);
  const [second, setSecond] = useState(empty);
  const [secondAudience, setSecondAudience] = useState("");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [locked, setLocked] = useState(false);
  const [error, setError] = useState("");
  const plan = PLANS.find((p) => p.seats === seats)!;
  const stepIndex = ["details", "audience", "seats"].indexOf(step);

  useEffect(() => {
    if (open && skipRestore.current) {
      skipRestore.current = false;
      return;
    }
    if (!open || active.current) return;
    const abort = new AbortController();
    setLoading(true);
    setError("");
    getBooking(abort.signal)
      .then(({ booking: b }) => {
        if (!b) return;
        if (["paid", "refunded", "payment_review"].includes(b.status)) {
          navigate("/posh/thank-you");
          return;
        }
        setDetails({ name: b.name, email: b.email, phone: b.phone });
        setAudience(b.audience ?? "");
        setSeats(b.seats ?? 1);
        setLocked(b.hasPendingOrder);
        const other = b.attendees[1];
        if (other) {
          setSecond(other);
          setSecondAudience(other.audience ?? "");
        }
        setStep(b.audience ? "seats" : "audience");
      })
      .catch((e) => {
        if (!abort.signal.aborted) setError(e.message);
      })
      .finally(() => {
        if (!abort.signal.aborted) setLoading(false);
      });
    return () => abort.abort();
  }, [open, navigate]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (active.current) return;
    active.current = true;
    setBusy(true);
    setError("");
    try {
      if (step === "details") {
        const parsed = contactSchema.safeParse(details);
        if (!parsed.success) throw new Error(parsed.error.issues[0].message);
        await bookingRequest("/api/posh/registration", "POST", parsed.data);
        setDetails(parsed.data);
        setStep("audience");
      } else if (step === "audience") {
        const parsed = audienceSchema.safeParse(audience);
        if (!parsed.success)
          throw new Error("Please select your classification.");
        await bookingRequest("/api/posh/registration", "PATCH", {
          step: "audience",
          audience: parsed.data,
        });
        setStep("seats");
      } else {
        if (!locked) {
          const parsed = selectionSchema.safeParse({
            seats,
            ...(seats === 2
              ? { secondAttendee: { ...second, audience: secondAudience } }
              : {}),
          });
          if (!parsed.success) throw new Error(parsed.error.issues[0].message);
          await bookingRequest("/api/posh/registration", "PATCH", {
            step: "selection",
            selection: parsed.data,
          });
        }
        const result = await payWithRazorpay(() => onOpenChange(false));
        if (result.status === "dismissed") {
          setLocked(true);
          skipRestore.current = true;
          onOpenChange(true);
          setError(
            "Payment window closed. Your details are saved. You can resume the same payment below.",
          );
        } else {
          if (result.status === "paid")
            toast.success("Your registration is confirmed.");
          navigate("/posh/thank-you");
        }
      }
    } catch (e) {
      if (step === "seats") {
        const saved = await getBooking().catch(() => null);
        if (saved?.booking?.status === "paid") {
          navigate("/posh/thank-you");
          return;
        }
        if (saved?.booking) setLocked(saved.booking.hasPendingOrder);
      }
      setError(e instanceof Error ? e.message : "Please try again.");
      onOpenChange(true);
    } finally {
      active.current = false;
      setBusy(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!busy) onOpenChange(next);
      }}
    >
      <DialogContent
        className="theme-corporate max-h-[90dvh] max-w-[calc(100%-2rem)] overflow-y-auto border-t-4 border-t-[#D4AF37] bg-white text-foreground sm:max-w-lg"
        style={bodyFont}
        onInteractOutside={(e) => {
          if (busy) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (busy) e.preventDefault();
        }}
      >
        <DialogHeader>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6914]">
            POSH live workshop
          </p>
          <DialogTitle className="text-2xl font-bold" style={headingFont}>
            Secure your seat
          </DialogTitle>
          <DialogDescription>
            {step === "details"
              ? "Start with your contact details."
              : step === "audience"
                ? "Help us understand your professional background."
                : "Choose who’s joining the workshop."}
          </DialogDescription>
        </DialogHeader>
        <ol
          aria-label="Registration progress"
          className="grid grid-cols-3 gap-2 text-xs"
        >
          {["Your details", "Classification", "Booking"].map((label, i) => (
            <li
              key={label}
              aria-current={i === stepIndex ? "step" : undefined}
              className={`border-t-2 pt-2 ${i <= stepIndex ? "border-[#D4AF37] font-semibold text-primary" : "border-slate-200 text-slate-500"}`}
            >
              {i + 1}. {label}
            </li>
          ))}
        </ol>
        {loading ? (
          <p
            role="status"
            className="flex items-center justify-center gap-3 py-12"
          >
            <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" />
            Loading your booking…
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            {step === "details" && (
              <AttendeeFields
                prefix="primary"
                value={details}
                onChange={setDetails}
                disabled={busy}
              />
            )}
            {step === "audience" && (
              <AudienceField
                prefix="primary"
                value={audience}
                onChange={setAudience}
                disabled={busy}
              />
            )}
            {step === "seats" && (
              <>
                <fieldset disabled={busy || locked}>
                  <legend className="mb-3 text-sm font-medium">
                    How many people are joining?
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {PLANS.map((p) => (
                      <label
                        key={p.seats}
                        className={`cursor-pointer border p-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary ${seats === p.seats ? "border-primary bg-primary/5" : "border-slate-200"}`}
                      >
                        <input
                          type="radio"
                          name="booking-seats"
                          checked={seats === p.seats}
                          onChange={() => setSeats(p.seats)}
                          className="mr-2 accent-[#0F3257]"
                        />
                        <span className="text-sm">
                          {p.seats === 1 ? "One person" : "Two people"}
                        </span>
                        <span className="mt-2 block text-2xl font-bold">
                          {p.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {seats === 2 && (
                  <div className="space-y-4 border-t border-slate-200 pt-5">
                    <h3 className="font-semibold">Second attendee</h3>
                    <AttendeeFields
                      prefix="second"
                      value={second}
                      onChange={setSecond}
                      disabled={busy || locked}
                    />
                    <AudienceField
                      prefix="second"
                      value={secondAudience}
                      onChange={setSecondAudience}
                      disabled={busy || locked}
                    />
                  </div>
                )}
                <div className="flex justify-between border-y border-slate-200 py-4">
                  <span>
                    Total for {seats} {seats === 1 ? "person" : "people"}
                  </span>
                  <strong>{plan.price}</strong>
                </div>
                {locked && (
                  <p className="text-sm text-slate-600">
                    Your checkout has started with these details. Resume it
                    below, or check your payment status.
                  </p>
                )}
              </>
            )}
            {error && (
              <p
                role="alert"
                className="border-l-2 border-red-600 bg-red-50 p-3 text-sm text-red-800"
              >
                {error}
              </p>
            )}
            <div className="flex gap-3">
              {step !== "details" && !locked && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={busy}
                  onClick={() => {
                    setStep(step === "seats" ? "audience" : "details");
                    setError("");
                  }}
                  className="min-h-12"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              <Button
                type="submit"
                disabled={busy}
                className="min-h-12 flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" />
                ) : step === "seats" ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
                {busy
                  ? "Please wait…"
                  : step === "seats"
                    ? `${locked ? "Resume payment ·" : "Pay"} ${plan.price}`
                    : "Save and continue"}
              </Button>
            </div>
            {locked && (
              <Button
                type="button"
                variant="link"
                className="w-full"
                onClick={() => navigate("/posh/thank-you")}
              >
                Check payment status
              </Button>
            )}
            <p className="text-center text-xs leading-relaxed text-slate-500">
              {step === "seats"
                ? "Secure payment via Razorpay. UPI, cards, net banking and wallets."
                : "We’ll use these details for your registration and workshop updates."}
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default BookingDialog;
