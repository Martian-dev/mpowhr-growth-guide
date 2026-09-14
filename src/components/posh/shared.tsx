import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fadeInUp } from "./constants";

export const CtaButton = ({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) => {
  const isExternal = href.startsWith("http");

  return (
    <Button
      asChild
      size="lg"
      className={cn(
        "text-base px-8 py-4 h-auto min-h-[48px] whitespace-normal text-center",
        "bg-primary hover:bg-primary/90 text-primary-foreground",
        className,
      )}
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <a
        href={href}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {children}
        <ArrowRight className="w-5 h-5" aria-hidden="true" />
      </a>
    </Button>
  );
};

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
      style={{
        fontFamily: "Vinila, Inter, sans-serif",
        letterSpacing: "0.01em",
      }}
    >
      {title}
    </h2>
    {children && <div className="mt-5">{children}</div>}
  </motion.div>
);
