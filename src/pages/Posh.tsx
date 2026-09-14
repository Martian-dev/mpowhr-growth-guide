import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Navigation, { type NavLink } from "@/components/Navigation";
import Footer from "@/components/Footer";
import PoshHero from "@/components/posh/PoshHero";
import ProgramOverview from "@/components/posh/ProgramOverview";
import WorkshopModules from "@/components/posh/WorkshopModules";
import WhoIsItFor from "@/components/posh/WhoIsItFor";
import Testimonials from "@/components/posh/Testimonials";
import KeyOutcomes from "@/components/posh/KeyOutcomes";
import BeforeAfter from "@/components/posh/BeforeAfter";
import Facilitator from "@/components/posh/Facilitator";
import Pricing from "@/components/posh/Pricing";
import PoshFaqs from "@/components/posh/PoshFaqs";
import MobileStickyCta from "@/components/posh/MobileStickyCta";
import { PRICING_ANCHOR } from "@/components/posh/constants";

const poshLinks: NavLink[] = [
  { label: "Overview", href: "#overview" },
  { label: "Modules", href: "#modules" },
  { label: "Facilitator", href: "#facilitator" },
  { label: "FAQs", href: "#faqs" },
];

const Posh = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "POSH Workshop for Business Leaders | MpowHR";

    // Smooth in-page anchor scrolling, unless the visitor prefers reduced motion
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.scrollBehavior = "smooth";
    }

    return () => {
      document.title = previousTitle;
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {/* theme-corporate swaps the brand colour variables for this page only */}
      <div className="theme-corporate min-h-screen w-full overflow-x-hidden bg-background text-foreground">
        <Navigation
          links={poshLinks}
          cta={{ label: "Secure your Seat", href: PRICING_ANCHOR }}
        />
        {/* scroll-mt keeps anchored sections clear of the fixed navigation */}
        <main className="pt-14 md:pt-16 bg-background [&_section]:scroll-mt-20 md:[&_section]:scroll-mt-24">
          {/* Banner + We in Numbers */}
          <PoshHero />
          <ProgramOverview />
          <WorkshopModules />
          <WhoIsItFor />
          <Testimonials />
          <KeyOutcomes />
          <BeforeAfter />
          <Facilitator />
          <Pricing />
          <PoshFaqs />
        </main>
        <Footer />
        {/* Room for the phone booking bar so it never covers the footer */}
        <div className="h-20 bg-primary md:hidden" aria-hidden="true" />
        <MobileStickyCta />
      </div>
    </MotionConfig>
  );
};

export default Posh;
