import { motion } from "framer-motion";
import { Check, Radio } from "lucide-react";
import { AnimatedCounter } from "@/components/our-impact";
import bannerBW from "@/assets/banner-bw.svg";
import {
  CONSULTATION_URL,
  PLANS,
  PRICING_ANCHOR,
  bodyFont,
  goldGradientText,
} from "./constants";
import { CtaButton, Highlight } from "./shared";

const stats = [
  { value: 14, label: "Years of Expertise" },
  { value: 5, label: "Certifications" },
  { value: 25, label: "Sessions Conducted" },
  { value: 100, label: "Professionals Trained" },
];

// Offer facts taken from the FAQs and pricing details.
const offerFacts = [
  "Live Workshop",
  "Certificate provided",
  "Free 1-1 consultation with Anne",
];

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

// Banner and "We in Numbers".
const PoshHero = () => {
  return (
    <>
      <section className="bg-primary text-primary-foreground overflow-hidden">
        <div className="container-width px-4 md:px-8 lg:px-12 py-14 md:py-20 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.p
              className="inline-flex items-center gap-2 border border-white/20 px-3 py-1.5 text-xs md:text-sm font-medium uppercase tracking-[0.15em] text-white/85"
              style={bodyFont}
              {...reveal(0)}
            >
              <Radio className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
              Live Masterclass · 120 Minutes
            </motion.p>

            <motion.h1
              className="mt-6 text-[2rem] md:text-5xl lg:text-[3.25rem]"
              style={{ ...bodyFont, fontWeight: 700, lineHeight: 1.15 }}
              {...reveal(0.1)}
            >
              <span className="block text-white">
                POSH ISN’T JUST AN HR MATTER.
              </span>
              <span className="block pb-2" style={goldGradientText}>
                It’s a Leadership Responsibility.
              </span>
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-lg md:text-xl text-white/80 leading-relaxed"
              style={bodyFont}
              {...reveal(0.2)}
            >
              Master the essentials of POSH compliance, IC processes, legal
              exposure & leadership safeguards in{" "}
              <Highlight>120 minutes</Highlight>.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3"
              {...reveal(0.3)}
            >
              <CtaButton href={PRICING_ANCHOR} variant="gold">
                Secure your Seat · {PLANS[0].price}
              </CtaButton>
              <CtaButton
                href={CONSULTATION_URL}
                variant="outline-light"
                showArrow={false}
              >
                Book Free Consultation
              </CtaButton>
            </motion.div>

            <motion.ul
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm md:text-base text-white/80"
              style={bodyFont}
              {...reveal(0.4)}
            >
              {offerFacts.map((fact) => (
                <li key={fact} className="inline-flex items-center gap-2">
                  <Check
                    className="w-4 h-4 text-[#D4AF37]"
                    aria-hidden="true"
                  />
                  {fact}
                </li>
              ))}
              <li className="inline-flex items-center gap-2 font-semibold text-[#D4AF37]">
                <span
                  className="w-2 h-2 rounded-full bg-[#D4AF37]"
                  aria-hidden="true"
                />
                Limited Seats Available
              </li>
            </motion.ul>
          </div>

          {/* Portrait - desktop only, so the offer stays above the fold on phones */}
          <motion.div
            className="hidden lg:block lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="absolute -bottom-4 -left-4 w-full h-full border border-[#D4AF37]/60"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={bannerBW}
                alt="Anne Anshumathi Raj, POSH facilitator"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "72% 30%" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* We in Numbers */}
      <section
        aria-labelledby="numbers-heading"
        className="bg-white border-b border-border"
      >
        <div className="container-width px-4 md:px-8 lg:px-12 py-8 md:py-10 grid lg:grid-cols-12 gap-6 items-center">
          <h2
            id="numbers-heading"
            className="lg:col-span-2 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#8B6914]"
            style={bodyFont}
          >
            We in Numbers
          </h2>
          <dl className="lg:col-span-10 grid grid-cols-2 md:grid-cols-4 gap-y-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col-reverse px-4 md:px-6 ${
                  index > 0 ? "md:border-l border-border" : ""
                } ${index % 2 === 1 ? "border-l md:border-l" : ""}`}
              >
                <dt
                  className="mt-1 text-sm md:text-base text-slate-600"
                  style={bodyFont}
                >
                  {stat.label}
                </dt>
                <dd className="flex items-baseline">
                  <AnimatedCounter
                    target={stat.value}
                    className="text-foreground md:text-5xl"
                  />
                  <span className="text-4xl md:text-5xl font-bold ml-1 text-[#D4AF37]">
                    +
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
};

export default PoshHero;
