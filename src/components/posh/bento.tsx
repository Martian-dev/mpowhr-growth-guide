import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { bodyFont } from "./constants";

// Grid is 2 columns on phones, 6 on tablets and 12 on desktop. Tiles span the
// full width on phones by default; pass md:/lg: col-span classes to place them.
export const BentoGrid = ({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) => (
  <section
    id={id}
    className={cn("container-width px-4 md:px-8 lg:px-12 pb-4", className)}
  >
    <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-4">
      {children}
    </div>
  </section>
);

export type TileVariant = "light" | "bare";

const tileVariants: Record<TileVariant, string> = {
  light: "bg-white border border-primary/10 text-foreground",
  bare: "",
};

export const Tile = ({
  variant = "light",
  index = 0,
  className,
  children,
}: {
  variant?: TileVariant;
  // Position within its grid, used to stagger the reveal animation
  index?: number;
  className?: string;
  children: ReactNode;
}) => (
  <motion.div
    className={cn(
      "relative overflow-hidden col-span-2 p-6 lg:p-8",
      tileVariants[variant],
      className,
    )}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.6, delay: index * 0.06 }}
  >
    {children}
  </motion.div>
);

export const TileEyebrow = ({
  as: Component = "p",
  className,
  children,
}: {
  as?: "p" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}) => (
  <Component
    className={cn(
      "text-xs md:text-sm font-semibold uppercase tracking-[0.2em]",
      className,
    )}
    style={bodyFont}
  >
    {children}
  </Component>
);

export const TileHeading = ({
  as: Component = "h2",
  className,
  children,
}: {
  as?: "h2" | "h3";
  className?: string;
  children: ReactNode;
}) => (
  <Component
    className={cn(
      "text-2xl md:text-3xl lg:text-4xl font-bold leading-tight",
      className,
    )}
    style={{ fontFamily: "Vinila, Inter, sans-serif", letterSpacing: "0.01em" }}
  >
    {children}
  </Component>
);
