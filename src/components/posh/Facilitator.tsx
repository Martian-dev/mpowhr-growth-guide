import { motion } from "framer-motion";
import anne from "@/assets/anne.svg";
import posh from "@/assets/mpowhr_certificates/proTouch.jpeg";
import cpd from "@/assets/mpowhr_certificates/cpdCert.png";
import coaches from "@/assets/mpowhr_certificates/coachesCert.png";
import hrci from "@/assets/mpowhr_certificates/hrciCert.png";
import shrm from "@/assets/mpowhr_certificates/shrmCert.png";
import { bodyFont, fadeInUp, headingFont } from "./constants";
import { Eyebrow, Highlight } from "./shared";

// Quick proof points, each stated in Anne's bio below.
const proofPoints = [
  { value: "15+ years", label: "Professional experience" },
  { value: "POSH & POCSO", label: "Certified Coach" },
  { value: "Founder", label: "MpowHR" },
];

const certifications = [
  { src: posh, alt: "Certified POSH Trainer" },
  { src: cpd, alt: "CPD Accredited" },
  { src: hrci, alt: "HRCI Approved Provider" },
  { src: shrm, alt: "SHRM Recertification Provider" },
  { src: coaches, alt: "International Coaches Register" },
];

const paragraphClasses = "text-lg text-slate-600 leading-relaxed";

const Facilitator = () => {
  return (
    <section
      id="facilitator"
      className="section-padding bg-white border-y border-border w-full"
    >
      <div className="container-width grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Photo - space reserved with aspect ratio so the page doesn't jump */}
        <motion.div
          className="lg:col-span-5 lg:sticky lg:top-24 relative max-w-md mx-auto lg:max-w-none w-full"
          {...fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <div
            className="absolute -bottom-4 -right-4 w-full h-full border border-[#D4AF37]/60"
            aria-hidden="true"
          />
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img
              src={anne}
              alt="Anne Anshumathi Raj, Founder of MpowHR"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-7"
          style={bodyFont}
          {...fadeInUp}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Eyebrow>Meet Your Facilitator</Eyebrow>
          <h2
            className="mt-3 text-3xl md:text-[2.75rem] font-bold text-foreground leading-tight"
            style={headingFont}
          >
            Anne Anshumathi Raj
          </h2>
          <p className="mt-3 text-base md:text-lg text-slate-600">
            Certified POSH & POCSO Coach | Leadership Coach | Soft-Skills
            Trainer
          </p>

          <dl className="mt-8 grid grid-cols-3 border-y border-border">
            {proofPoints.map((point, index) => (
              <div
                key={point.label}
                className={`py-5 flex flex-col-reverse ${
                  index > 0 ? "pl-4 md:pl-6 border-l border-border" : "pr-4"
                }`}
              >
                <dt className="mt-1 text-xs md:text-sm text-slate-500">
                  {point.label}
                </dt>
                <dd
                  className="text-lg md:text-2xl font-bold text-foreground"
                  style={headingFont}
                >
                  {point.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 space-y-5 max-w-prose">
            <p className={paragraphClasses}>
              Anne Anshumathi Raj is the Founder of MpowHR, with{" "}
              <Highlight>over 15 years of professional experience</Highlight>{" "}
              across people management, leadership development, behavioural
              skills and corporate training.
            </p>
            <p className={paragraphClasses}>
              A <Highlight>Certified POSH and POCSO Coach</Highlight>, Anne
              specialises in helping organisations and leaders develop a clear
              understanding of workplace safety, statutory responsibilities and
              responsible organisational practices.
            </p>
            <p className={paragraphClasses}>
              Her experience as a Senior People Manager and Entrepreneur gives
              her a practical perspective on the intersection of people, policy
              and business. She brings this perspective into her POSH sessions,
              simplifying complex requirements and translating them into
              practical insights that leaders can apply within their
              organisations.
            </p>
            <p className={paragraphClasses}>
              Anne's approach combines industry experience, structured learning
              and practical application, enabling participants to understand not
              only what the law requires, but also how responsible leadership
              can translate those requirements into action.
            </p>
            <p className={paragraphClasses}>
              Through her work, she continues to help organisations strengthen
              their people practices, build awareness and foster workplaces
              founded on safety, dignity, accountability and trust.
            </p>
          </div>

          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Certifications
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {certifications.map((cert) => (
                <li
                  key={cert.alt}
                  className="w-20 h-20 md:w-24 md:h-24 bg-white border border-border p-2 flex items-center justify-center"
                >
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    title={cert.alt}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Facilitator;
