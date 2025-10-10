"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedTitle2Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function AnimatedTitle2({
  children,
  className = "",
  style = {},
  delay = 0,
}: AnimatedTitle2Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.h2
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, x: -100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.h2>
  );
}
