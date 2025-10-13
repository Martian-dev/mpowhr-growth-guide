import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function Imagine() {
  const { ref, isInView } = useScrollAnimation();

  const items = [
    "Wake up energized after a sound night's sleep, ready for the day.",
    "Rediscover the joy in exercise, hobbies, and 'me time'",
    "Feel total confidence in your personal direction and life choices.",
    "Easily set and hold clear boundaries without guilt or obligation.",
    "Fully commit to a fresh start after a difficult transition, leaving the past behind.",
    "Know what to prioritize every morning, eliminating the feeling of being overwhelmed.",
    "Break destructive habits and replace them with purposeful action.",
    "Lead with resilience, treating every setback as a learning opportunity.",
    'Achieve success without compromise or the need to constantly "people please."',
    "Feel confident in your professional trajectory and future growth.",
  ];

  return (
    <motion.div
      ref={ref}
      className="bg-primary text-primary-foreground w-full min-h-[85vh] flex flex-col items-center justify-center px-4 py-16"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center mb-8 text-3xl md:text-4xl font-semibold"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Imagine if you could
      </motion.div>

      <motion.div
        className="max-w-4xl w-full text-left space-y-3 my-12 text-xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="flex"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{
              duration: 0.4,
              delay: 0.4 + index * 0.05,
            }}
          >
            <motion.span
              className="mr-3"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
              }
              transition={{
                duration: 0.3,
                delay: 0.45 + index * 0.05,
                type: "spring",
                stiffness: 400,
              }}
            >
              -
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.5 + index * 0.05,
              }}
            >
              {item}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 30, scale: 0.9 }
        }
        transition={{
          duration: 0.6,
          delay: 1.0,
          type: "spring",
          stiffness: 100,
        }}
      >
        <motion.span
          className="inline-block text-3xl md:text-4xl font-semibold"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          This can be your life.
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
