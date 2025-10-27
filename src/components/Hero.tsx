import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import bannerBW from "@/assets/banner-bw.svg";
import mobileImage from "@/assets/mobile.svg";

const Hero = () => {
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
      {/* Dark Overlay with Subtle Green Tint for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black/40 to-black/50 z-10" />

      {/* Content Overlay */}
      <div className="relative z-20 min-h-screen flex items-center px-6 md:px-8 lg:px-12">
        <div className="text-left max-w-4xl 2xl:pl-20 4xl:pl-48 5xl:pl-72">
          {/* Main Heading */}
          <div className="space-y-6">
            <div className="drop-shadow-5xl">
              <motion.h1
                className="text-3xl md:text-[2.5rem] leading-tight bg-gradient-to-tr from-[#D4AF37] via-[#B8941F] to-[#8B7A1A] bg-clip-text text-transparent pb-2"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  lineHeight: "1.25",
                  paddingBottom: "8px",
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 1, delay: 0.2 }}
              >
                Time to Restart,
                <motion.span
                  className="block text-3xl md:text-[2.5rem] bg-gradient-to-tr from-[#D4AF37] via-[#B8941F] to-[#8B7A1A] bg-clip-text text-transparent pb-2"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    lineHeight: "1.25",
                    paddingBottom: "3px",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  with Clarity & Courage.
                </motion.span>
              </motion.h1>
            </div>
            <motion.p
              className="text-base md:text-xl text-white/90 leading-relaxed max-w-3xl"
              style={{ fontFamily: "Poppins, sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Get 15+ years of expert coaching and strategic insights to build{" "}
              <br className="hidden md:block" />
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
