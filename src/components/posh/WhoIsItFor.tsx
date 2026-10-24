import { motion } from "framer-motion";
import { PRICING_ANCHOR, bodyFont, fadeInUp, headingFont } from "./constants";
import { CtaButton, Highlight, SectionHeader } from "./shared";

const roles = ["Managing Director", "CEO", "Founder", "Promoter", "Business Owner"];

const WhoIsItFor = () => {
  return (
    <section id="audience" className="section-padding bg-background w-full">
      <div className="container-width">
        <SectionHeader title={<>This masterclass is for you <Highlight>if…</Highlight></>} />

        <motion.div
          className="max-w-4xl mx-auto border border-primary/10 bg-white p-6 md:p-10 text-center"
          style={bodyFont}
          {...fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg text-slate-600">You are a</p>
          <ul
            className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xl md:text-2xl font-bold text-foreground"
            style={headingFont}
            aria-label="Who this masterclass is for"
          >
            {roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            You are responsible for organisational governance and business
            continuity, building or scaling an organisation, or looking to
            understand the legal and leadership implications of workplace
            compliance. This masterclass helps you understand your personal and
            organisational exposure under the POSH framework and put the right
            compliance practices in place.
          </p>
        </motion.div>

        <div className="mt-12 text-center" style={bodyFont}>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground" style={headingFont}>
            Become a POSH expert
          </h3>
          <p className="mt-3 text-slate-600">
            Get <Highlight>Free Consultation</Highlight> after Workshop
          </p>
          <div className="mt-6 flex justify-center">
            <CtaButton href={PRICING_ANCHOR}>Secure your seat now</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIsItFor;
