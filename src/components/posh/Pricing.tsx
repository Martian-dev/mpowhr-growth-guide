import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PLANS, bodyFont, headingFont, registrationUrl } from "./constants";
import { Highlight } from "./shared";
import BookingDialog from "./BookingDialog";

// Everything a seat includes, as described in the modules, Before/After section
// and FAQs.
const included = [
  "120-minute Live Workshop",
  "All 6 modules, including Live Q&A",
  "IC Setup Checklist",
  "Executive Assessment & Certificate",
  "Free 1-1 Consultation with Anne after the workshop",
];

const Pricing = () => {
  const [seats, setSeats] = useState(PLANS[0].seats);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section
      id="pricing"
      data-nav-contrast
      className="section-padding bg-primary text-primary-foreground w-full"
      aria-labelledby="pricing-heading"
      style={bodyFont}
    >
      <div className="container-width grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Offer */}
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            <span
              className="w-2 h-2 rounded-full bg-[#D4AF37]"
              aria-hidden="true"
            />
            Limited Seats Available
          </p>
          <h2
            id="pricing-heading"
            className="mt-4 text-3xl sm:text-5xl font-bold leading-tight"
            style={headingFont}
          >
            Secure your Seat
          </h2>
          <p className="mt-4 flex items-start gap-3 text-lg md:text-xl text-white/85">
            <Gift
              className="w-6 h-6 mt-0.5 flex-shrink-0 text-[#D4AF37]"
              aria-hidden="true"
            />
            <span>
              <Highlight>Free Consultation from Anne</Highlight> After workshop
            </span>
          </p>

          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            What’s included
          </p>
          <ul className="mt-4 space-y-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/90">
                <Check
                  className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#D4AF37]"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Seat selection */}
        <motion.div
          className="lg:col-span-6 bg-white text-foreground border-t-4 border-[#D4AF37] p-6 md:p-10 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Choose your seats
            </legend>
            <div className="mt-5 space-y-3">
              {PLANS.map((plan) => {
                const isSelected = seats === plan.seats;
                return (
                  <label
                    key={plan.seats}
                    className={cn(
                      "flex items-center gap-4 border p-4 md:p-5 cursor-pointer transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
                      isSelected
                        ? "border-primary bg-secondary"
                        : "border-border hover:border-slate-400",
                    )}
                  >
                    <input
                      type="radio"
                      name="seats"
                      value={plan.seats}
                      checked={isSelected}
                      onChange={() => setSeats(plan.seats)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        isSelected ? "border-primary" : "border-slate-300",
                      )}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </span>
                    <span className="flex-1 text-lg font-medium capitalize">
                      {plan.label}
                    </span>
                    <span
                      className="text-3xl md:text-4xl font-bold"
                      style={headingFont}
                    >
                      {plan.price}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <Button
            type="button"
            size="lg"
            onClick={() => setIsBookingOpen(true)}
            className="mt-6 w-full text-lg px-8 py-4 h-auto min-h-[48px] whitespace-normal bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Secure your Seat
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Button>
          <p className="mt-3 text-center text-sm text-slate-500">
            Pay securely online with Razorpay, or{" "}
            <a
              href={registrationUrl(seats)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline decoration-[#D4AF37] underline-offset-4 hover:decoration-[#8B6914]"
            >
              book on WhatsApp
            </a>
            .
          </p>
          <BookingDialog
            seats={seats}
            open={isBookingOpen}
            onOpenChange={setIsBookingOpen}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
