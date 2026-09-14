import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { bodyFont, fadeInUp, headingFont } from "./constants";

// Brand-gold marker underline for the page's key phrases. The text keeps its own
// colour so it stays readable; the gold sits underneath as an accent.
export const Highlight = ({ children }: { children: ReactNode }) => (
  <mark
    className="bg-transparent text-inherit bg-no-repeat [background-position:0_90%] [background-size:100%_0.32em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
    style={{
      backgroundImage:
        "linear-gradient(90deg, rgba(212,175,55,0.65), rgba(255,215,0,0.65) 50%, rgba(212,175,55,0.65))",
    }}
  >
    {children}
  </mark>
);

type CtaVariant = "primary" | "gold" | "outline-light";

const ctaVariants: Record<CtaVariant, string> = {
  primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
  // For dark sections, where the gold call to action needs to stand out
  gold: "bg-[#D4AF37] hover:bg-[#C9A42F] text-[#0B1B33] focus-visible:ring-[#D4AF37] focus-visible:ring-offset-primary",
  "outline-light":
    "bg-transparent border border-white/40 text-white hover:bg-white/10 hover:border-white/60 focus-visible:ring-white focus-visible:ring-offset-primary",
};

export const CtaButton = ({
  href,
  children,
  variant = "primary",
  showArrow = true,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: CtaVariant;
  showArrow?: boolean;
  className?: string;
}) => {
  const isExternal = href.startsWith("http");

  return (
    <Button
      asChild
      size="lg"
      className={cn(
        "text-base px-8 py-4 h-auto min-h-[48px] whitespace-normal text-center",
        ctaVariants[variant],
        className,
      )}
      style={bodyFont}
    >
      <a
        href={href}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
        {showArrow && <ArrowRight className="w-5 h-5" aria-hidden="true" />}
      </a>
    </Button>
  );
};

// Small uppercase label above a section heading.
export const Eyebrow = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <p
    className={cn(
      "text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#8B6914]",
      className,
    )}
    style={bodyFont}
  >
    {children}
  </p>
);

// Centered section heading used by the reading-focused (non-bento) sections,
// matching the home page section titles.
export const SectionHeader = ({
  title,
  children,
}: {
  title: ReactNode;
  children?: ReactNode;
}) => (
  <motion.div
    className="text-center max-w-3xl mx-auto section-header-spacing"
    {...fadeInUp}
    transition={{ duration: 0.6 }}
  >
    <h2
      className="text-2xl sm:text-[2.5rem] font-bold leading-tight text-foreground"
      style={headingFont}
    >
      {title}
    </h2>
    {children && <div className="mt-5">{children}</div>}
  </motion.div>
);
