import { motion } from "framer-motion";
import { PRICING_ANCHOR, fadeInUp } from "./constants";
import { CtaButton, SectionTitle } from "./shared";

const ProgramOverview = () => {
  return (
    <section
      id="overview"
      className="section-padding bg-gradient-to-b from-[hsl(40_25%_96%)] to-[hsl(45_35%_88%)] w-full"
    >
      <div className="container-width">
        <SectionTitle>Program Overview</SectionTitle>

        <div className="grid lg:grid-cols-5 grid-spacing items-start max-w-6xl mx-auto">
          {/* Lead statement */}
          <motion.div
            className="lg:col-span-2 border-l-4 border-[#D4AF37] pl-6"
            {...fadeInUp}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p
              className="text-2xl md:text-3xl font-bold text-primary leading-snug"
              style={{ fontFamily: "Vinila, Inter, sans-serif" }}
            >
              Cut through the HR jargon and get a clear, practical understanding
              of the POSH Act and its impact on business leadership.
            </p>
          </motion.div>

          {/* Details */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            {...fadeInUp}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p
              className="text-lg text-gray-600 leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              This is not another generic awareness session. This live
              masterclass gives CEOs, Founders, Managing Directors and Promoters
              a clear understanding of their legal responsibilities, key
              timelines, Internal Committee requirements, risk areas and the
              right procedures to follow.
            </p>
            <p
              className="text-lg text-gray-600 leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Walk away with the knowledge to identify compliance gaps, reduce
              organisational risk and respond to POSH matters with greater
              clarity and confidence — while protecting both your people and
              your organisation.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <CtaButton href={PRICING_ANCHOR}>Join the Workshop Now</CtaButton>
              <span
                className="inline-flex items-center gap-2 text-sm font-medium text-primary"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                Limited Seats Available
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgramOverview;
