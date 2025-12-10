import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import logoIcon from "@/assets/imagine_section.png";

export default function Imagine() {
  const { ref, isInView } = useScrollAnimation();

  const goldStyle = {
    background:
      "linear-gradient(135deg, #8B6914 0%, #D4AF37 25%, #FFD700 50%, #D4AF37 75%, #8B6914 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    display: "inline",
    fontWeight: "inherit",
  };

  const items = [
    <span>
      Forge Inner <span style={goldStyle}>Certainty</span>
    </span>,
    <span>
      Achieve <span style={goldStyle}>Without Compromise</span>
    </span>,
    <span>
      Establish Ironclad <span style={goldStyle}>Boundaries</span>
    </span>,
    <span>
      Engineer Your <span style={goldStyle}>Fresh Start</span>
    </span>,
    <span>
      Prioritize with <span style={goldStyle}>Precision</span>
    </span>,
    <span>
      Install New <span style={goldStyle}>Habits</span>
    </span>,
    <span>
      Own Your <span style={goldStyle}>Mornings</span>
    </span>,
    <span>
      Reclaim Your <span style={goldStyle}>Joy</span>
    </span>,
    <span>
      Clarify Your <span style={goldStyle}>Trajectory</span>
    </span>,
    <span>
      Lead with <span style={goldStyle}>Resilience</span>
    </span>,
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
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
          This can be{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #8B6914 0%, #D4AF37 25%, #FFD700 50%, #D4AF37 75%, #8B6914 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline",
              fontWeight: "inherit",
            }}
          >
            Your Life
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
        <div className="hidden lg:flex items-center justify-between">
          {/* Left Points */}
          <div className="flex-[1.2] flex flex-col justify-center gap-4 lg:gap-6">
            {leftItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center group"
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
            <div className="relative w-80 h-80 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] flex items-center justify-center">
              {/* Subtle glow effect */}
              {/* <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl"></div> */}
              {/* Logo container with glass effect */}
              <div className="relative w-full h-full  backdrop-blur-sm rounded-full flex items-center justify-center">
                <img
                  src={logoIcon}
                  alt="MpowHR Phoenix Logo"
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Points */}
          <div className="flex-[1.2] flex flex-col justify-center gap-4 lg:gap-6">
            {rightItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center group"
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
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[30rem] md:h-[30rem] flex items-center justify-center">
              <img
                src={logoIcon}
                alt="MpowHR Phoenix Logo"
                className="w-full h-full object-contain filter brightness-110"
              />
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
                  className="text-[#D4AF37] font-bold text-lg flex-shrink-0"
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
    </motion.div>
  );
}
