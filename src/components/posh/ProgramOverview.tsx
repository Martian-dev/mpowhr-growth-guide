import { motion } from "framer-motion";
import { PRICING_ANCHOR, bodyFont, fadeInUp, headingFont } from "./constants";
import { CtaButton, Eyebrow, Highlight } from "./shared";

const ProgramOverview = () => {
  return (
    <section id="overview" className="section-padding bg-background w-full">
      <div className="container-width grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        <motion.div
          className="lg:col-span-5"
          {...fadeInUp}
          transition={{ duration: 0.7 }}
        >
          <Eyebrow>Program Overview</Eyebrow>
          <h2
            className="mt-4 text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-foreground leading-snug md:leading-snug"
            style={headingFont}
          >
            Cut through the HR jargon and get a{" "}
            <Highlight>clear, practical understanding</Highlight> of the POSH
            Act and its impact on business leadership.
          </h2>
        </motion.div>

        <motion.div
          className="lg:col-span-7 lg:pt-10"
          style={bodyFont}
          {...fadeInUp}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="text-xl font-semibold text-foreground">
            This is not another generic awareness session.
          </p>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed max-w-prose">
            This live masterclass gives CEOs, Founders, Managing Directors and
            Promoters a clear understanding of their legal responsibilities, key
            timelines, Internal Committee requirements, risk areas and the right
            procedures to follow.
          </p>

          <p className="mt-8 border-l-2 border-[#D4AF37] pl-6 text-lg text-slate-700 leading-relaxed max-w-prose">
            Walk away with the knowledge to identify compliance gaps, reduce
            organisational risk and respond to POSH matters with greater clarity
            and confidence — while protecting both your people and your
            organisation.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <CtaButton href={PRICING_ANCHOR}>Join the Workshop Now</CtaButton>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B6914]">
              <span
                className="w-2 h-2 rounded-full bg-[#D4AF37]"
                aria-hidden="true"
              />
              Limited Seats Available
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramOverview;
