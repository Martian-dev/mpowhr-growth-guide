import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import bannerBW from "@/assets/banner-bw.svg";
import mobileImage from "@/assets/mobile.svg";
import { CONSULTATION_URL, goldGradientText } from "./constants";

const PoshHero = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden">
      {/* Mobile Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-no-repeat md:hidden"
        style={{
          backgroundImage: `url(${mobileImage})`,
          backgroundPosition: "center 20px",
        }}
      />

      {/* Desktop Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-right bg-fixed bg-no-repeat hidden md:block"
        style={{
          backgroundImage: `url(${bannerBW})`,
          backgroundPosition: "right top 40px",
        }}
      />

      {/* Dark overlay - slightly stronger than the home hero for the longer copy */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-950/40 via-black/50 to-black/40 z-10" />

      {/* Content Overlay */}
      <div className="relative z-20 min-h-screen flex items-center px-6 md:px-8 lg:px-12">
        <div className="text-left max-w-4xl 2xl:pl-20">
          <div className="space-y-6">
            <motion.h1
              className="text-3xl md:text-[2.5rem] lg:text-5xl"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                lineHeight: "1.25",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="block text-white">
                POSH ISN’T JUST AN HR MATTER.
              </span>
              <motion.span
                className="block pb-2"
                style={goldGradientText}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 1, delay: 0.5 }}
              >
                It’s a Leadership Responsibility.
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-base md:text-xl text-white/90 leading-relaxed max-w-2xl"
              style={{ fontFamily: "Poppins, sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Master the essentials of POSH compliance, IC processes, legal
              exposure & leadership safeguards in 120 minutes.
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <a
              href={CONSULTATION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 h-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300"
              >
                Book Free Consultation
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PoshHero;
