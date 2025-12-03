import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function Tagline() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.div
      id="tagline-section"
      ref={ref}
      className="bg-primary text-primary-foreground w-full min-h-[65vh] flex items-center justify-center text-center text-3xl px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="max-w-6xl">
        <motion.span
          className="px-2 py-1 rounded-lg"
          style={{
            background: "linear-gradient(135deg, #8B6914 0%, #D4AF37 25%, #FFD700 50%, #D4AF37 75%, #8B6914 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          The destination for those ready to realign, take action and rise.
        </motion.span>
      </div>
    </motion.div>
  );
}
