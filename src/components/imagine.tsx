import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

export default function Imagine() {
  const { ref, isInView } = useScrollAnimation();

  const items = [
    "Forge Inner Certainty",
    "Achieve Without Compromise",
    "Establish Ironclad Boundaries",
    "Engineer Your Fresh Start",
    "Prioritize with Precision",
    "Install New Habits",
    "Own Your Mornings",
    "Reclaim Your Joy",
    "Clarify Your Trajectory",
    "Lead with Resilience",
  ];

  const leftItems = items.slice(0, 5);
  const rightItems = items.slice(5, 10);

  return (
    <motion.div
      id="imagine-section"
      ref={ref}
      className="bg-primary text-primary-foreground w-full min-h-[85vh] flex flex-col items-center justify-center px-4 py-16"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Start Living the{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #B8941F 0%, #8B7A1A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Upgraded You
          </span>
          .
        </h2>
        <p className="text-lg md:text-xl font-medium text-primary-foreground/90">
          You will Anchor a new, powerful identity and begin to:
        </p>
      </motion.div>

      {/* Main Content Layout */}
      <motion.div
        className="w-full max-w-7xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between gap-8 lg:gap-16">
          {/* Left Points */}
          <div className="flex-1 flex flex-col justify-center gap-4 lg:gap-6">
            {leftItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 lg:gap-4 group"
                initial={{ opacity: 0, x: -50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.1,
                }}
              >
                <div className="text-right flex-1">
                  <p className="text-base md:text-lg lg:text-xl font-medium text-primary-foreground group-hover:text-[#D4AF37] transition-colors duration-300">
                    {item}
                  </p>
                </div>
                {/* Arrow pointing right */}
                <motion.div
                  className="flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 400,
                  }}
                >
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8 text-[#D4AF37]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Center Logo */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
            }
            transition={{
              duration: 0.8,
              delay: 0.8,
              type: "spring",
              stiffness: 100,
            }}
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl"></div>
              {/* Logo container with glass effect */}
              <div className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center">
                <img
                  src={logoIcon}
                  alt="MpowHR Phoenix Logo"
                  className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain filter brightness-110"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Points */}
          <div className="flex-1 flex flex-col justify-center gap-4 lg:gap-6">
            {rightItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 lg:gap-4 group"
                initial={{ opacity: 0, x: 50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.1,
                }}
              >
                {/* Arrow pointing left */}
                <motion.div
                  className="flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 400,
                  }}
                >
                  <svg
                    className="w-6 h-6 lg:w-8 lg:h-8 text-[#D4AF37]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.div>
                <div className="flex-1">
                  <p className="text-base md:text-lg lg:text-xl font-medium text-primary-foreground group-hover:text-[#D4AF37] transition-colors duration-300">
                    {item}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center gap-8">
          {/* Mobile Logo */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
            }
            transition={{
              duration: 0.8,
              delay: 0.8,
              type: "spring",
              stiffness: 100,
            }}
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg"></div>
              {/* Logo container with glass effect */}
              <div className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center">
                <img
                  src={logoIcon}
                  alt="MpowHR Phoenix Logo"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain filter brightness-110"
                />
              </div>
            </div>
          </motion.div>

          {/* Mobile Items List */}
          <div className="w-full max-w-md space-y-3">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center gap-3 group"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.4,
                  delay: 0.6 + index * 0.05,
                }}
              >
                <motion.span
                  className="text-[#D4AF37] font-bold text-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: 0.7 + index * 0.05,
                    type: "spring",
                    stiffness: 400,
                  }}
                >
                  •
                </motion.span>
                <p className="text-base md:text-lg font-medium text-primary-foreground group-hover:text-[#D4AF37] transition-colors duration-300 text-center">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Footer Message */}
      <motion.div
        className="text-center mt-12 lg:mt-16"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 30, scale: 0.9 }
        }
        transition={{
          duration: 0.6,
          delay: 1.6,
          type: "spring",
          stiffness: 100,
        }}
      >
        <h3
          className="text-2xl md:text-3xl lg:text-4xl font-bold"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800,
            background: "linear-gradient(135deg, #B8941F 0%, #8B7A1A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: "1.2",
          }}
        >
          This can be your life.
        </h3>
      </motion.div>
    </motion.div>
  );
}
