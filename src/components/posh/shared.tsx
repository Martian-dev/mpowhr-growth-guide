import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeInUp } from "./constants";

export const SectionTitle = ({
  children,
  className,
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) => (
  <motion.h2
    className={cn(
      "text-2xl sm:text-[2.5rem] font-normal section-header-spacing text-center leading-tight tracking-wider",
      light && "text-primary-foreground",
      className,
    )}
    style={{
      fontFamily: "Vinila, Inter, sans-serif",
      letterSpacing: "0.01em",
      fontWeight: "700",
    }}
    {...fadeInUp}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.h2>
);

type CtaVariant = "primary" | "gold";

const ctaVariants: Record<CtaVariant, string> = {
  primary:
    "bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg",
  gold: "bg-[#D4AF37] hover:bg-[#B8941F] text-primary shadow-md hover:shadow-lg",
};

export const CtaButton = ({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: CtaVariant;
  className?: string;
}) => {
  const isExternal = href.startsWith("http");

  return (
    <Button
      asChild
      size="lg"
      className={cn(
        "text-base px-8 py-4 h-auto whitespace-normal text-center",
        ctaVariants[variant],
        className,
      )}
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <a
        href={href}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
        <ArrowRight className="w-5 h-5" />
      </a>
    </Button>
  );
};
