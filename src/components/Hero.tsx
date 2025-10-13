import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import mpowhrBanner from "@/assets/Mpowhr- Banner.svg";

const Hero = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-cover bg-right bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `url(${mpowhrBanner})`,
        backgroundPosition: "right -12px",
      }}
    >
      {/* Dark Overlay with Subtle Green Tint for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black/40 to-black/50" />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-8 lg:px-12">
        <div className="text-left max-w-4xl">
          {/* Main Heading */}
          <div className="space-y-6">
            <motion.h1
              className="text-4xl md:text-5xl font-bold leading-tight text-nav-hover"
              style={{ fontFamily: "Vinila, Inter, sans-serif" }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Time to Restart.
              <motion.span
                className="block text-nav-hover"
                style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 1, delay: 0.5 }}
              >
                with Clarity & Courage.
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl"
              style={{ fontFamily: "Poppins, sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              From leadership pivots to personal breakthroughs, unlock your
              potential.
              <br />
              Get 10+ years of expert coaching and strategic insights to build
              resilience and lasting success.
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <a href="#contact">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 h-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              >
                Book free consultation
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
