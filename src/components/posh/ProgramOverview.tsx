import { motion } from "framer-motion";
import { PRICING_ANCHOR, bodyFont, fadeInUp, headingFont } from "./constants";
import { CtaButton, Eyebrow, Highlight } from "./shared";

const ProgramOverview = () => {
  return (
    <section id="overview" className="section-padding bg-background w-full">
      <div className="container-width">
        <motion.div
          className="max-w-4xl mx-auto"
          {...fadeInUp}
          transition={{ duration: 0.7 }}
        >
          <Eyebrow className="text-center">Program Overview</Eyebrow>
          <h2
            className="mt-4 text-center text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-foreground leading-snug md:leading-snug"
            style={headingFont}
          >
            Cut through the HR jargon and get a{" "}
            <Highlight>clear, practical understanding</Highlight> of the POSH
            Act and its impact on business leadership.
          </h2>
          <p className="mt-8 text-lg text-slate-600 leading-relaxed" style={bodyFont}>
            <strong className="font-semibold text-foreground">
              This is not another generic awareness session.
            </strong>{" "}
            This live masterclass gives CEOs, Founders, Managing Directors and
            Promoters a clear understanding of their legal responsibilities, key
            timelines, Internal Committee requirements, risk areas and the right
            procedures to follow.{" "}
            Walk away with the knowledge to identify compliance gaps, reduce
            organisational risk and respond to POSH matters with greater clarity
            and confidence — while protecting both your people and your
            organisation.
          </p>

          <div className="mt-12 md:mt-14 flex flex-col items-center gap-4" style={bodyFont}>
            <CtaButton href={PRICING_ANCHOR} attention>Secure your seat now</CtaButton>
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
