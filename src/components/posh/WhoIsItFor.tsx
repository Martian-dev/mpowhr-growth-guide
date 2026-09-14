import { motion } from "framer-motion";
import { Briefcase, Building2, Crown, Rocket } from "lucide-react";
import { PRICING_ANCHOR, fadeInUp, goldGradientText } from "./constants";
import { CtaButton, SectionTitle } from "./shared";

const audiences = [
  {
    icon: Briefcase,
    role: "Managing Director",
    description:
      "Responsible for organisational governance and business continuity.",
  },
  {
    icon: Crown,
    role: "CEO",
    description:
      "Looking to understand the legal and leadership implications of workplace compliance.",
  },
  {
    icon: Rocket,
    role: "Founder / Promoter",
    description:
      "Building or scaling an organisation and wanting the right compliance framework from the start.",
  },
  {
    icon: Building2,
    role: "Business Owner",
    description:
      "Wanting to understand personal and organisational exposure under the POSH framework.",
  },
];

const WhoIsItFor = () => {
  return (
    <section
      id="audience"
      data-nav-contrast
      className="section-padding bg-primary text-primary-foreground w-full"
    >
      <div className="container-width">
        <SectionTitle light>
          This Masterclass Is For You{" "}
          <span style={goldGradientText}>If You Are A...</span>
        </SectionTitle>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <motion.div
                key={audience.role}
                className="bg-white/5 backdrop-blur-sm border border-white/15 p-6 lg:p-8 text-center transition-all duration-300 hover:bg-white/10 hover:-translate-y-2"
                {...fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-[#D4AF37]/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3
                  className="text-xl font-bold mb-3 text-[#D4AF37]"
                  style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                >
                  {audience.role}
                </h3>
                <p
                  className="text-primary-foreground/80 leading-relaxed"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {audience.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-12 flex flex-col items-center gap-3 text-center"
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CtaButton href={PRICING_ANCHOR} variant="gold">
            Become a POSH Expert
          </CtaButton>
          <p
            className="text-primary-foreground/80 text-sm"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Get Free Consultation after Workshop
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoIsItFor;
