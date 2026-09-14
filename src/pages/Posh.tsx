import { useEffect } from "react";
import Navigation, { type NavLink } from "@/components/Navigation";
import Footer from "@/components/Footer";
import PoshHero from "@/components/posh/PoshHero";
import PoshNumbers from "@/components/posh/PoshNumbers";
import ProgramOverview from "@/components/posh/ProgramOverview";
import WorkshopModules from "@/components/posh/WorkshopModules";
import WhoIsItFor from "@/components/posh/WhoIsItFor";
import Testimonials from "@/components/posh/Testimonials";
import KeyOutcomes from "@/components/posh/KeyOutcomes";
import BeforeAfter from "@/components/posh/BeforeAfter";
import Facilitator from "@/components/posh/Facilitator";
import Pricing from "@/components/posh/Pricing";
import PoshFaqs from "@/components/posh/PoshFaqs";

const poshLinks: NavLink[] = [
  { label: "Overview", href: "#overview" },
  { label: "Modules", href: "#modules" },
  { label: "Facilitator", href: "#facilitator" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
];

const Posh = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "POSH Workshop for Business Leaders | MpowHR";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navigation links={poshLinks} />
      {/* scroll-mt keeps anchored sections clear of the fixed navigation */}
      <div className="pt-14 md:pt-16 [&_section]:scroll-mt-14 md:[&_section]:scroll-mt-16">
        <PoshHero />
        <PoshNumbers />
        <ProgramOverview />
        <WorkshopModules />
        <WhoIsItFor />
        <Testimonials />
        <KeyOutcomes />
        <BeforeAfter />
        <Facilitator />
        <Pricing />
        <PoshFaqs />
        <Footer />
      </div>
    </div>
  );
};

export default Posh;
