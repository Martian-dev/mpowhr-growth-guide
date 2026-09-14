import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANS, PRICING_ANCHOR, bodyFont } from "./constants";

// Phone-only booking bar. Appears once the banner is scrolled past and hides
// while the pricing section itself is on screen.
const MobileStickyCta = () => {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isPricingVisible, setIsPricingVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      setIsPastHero(window.scrollY > window.innerHeight * 0.6);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const pricing = document.getElementById(PRICING_ANCHOR.slice(1));
    const observer = new IntersectionObserver(([entry]) =>
      setIsPricingVisible(entry.isIntersecting),
    );
    if (pricing) observer.observe(pricing);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const isVisible = isPastHero && !isPricingVisible;

  return (
    <div
      className={cn(
        "md:hidden fixed inset-x-0 bottom-0 z-50 bg-white border-t border-primary/10 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] transition-transform duration-300 motion-reduce:transition-none",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!isVisible}
    >
      <div className="flex items-center justify-between gap-3" style={bodyFont}>
        <p className="text-sm leading-tight text-gray-600">
          {PLANS.map((plan) => (
            <span key={plan.seats} className="block">
              <span className="font-bold text-foreground">{plan.price}</span>{" "}
              {plan.label}
            </span>
          ))}
        </p>
        <a
          href={PRICING_ANCHOR}
          tabIndex={isVisible ? 0 : -1}
          className="inline-flex items-center gap-2 min-h-[44px] px-5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Secure your Seat
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default MobileStickyCta;
