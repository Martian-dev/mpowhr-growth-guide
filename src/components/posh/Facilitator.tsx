import { motion } from "framer-motion";
import anne from "@/assets/anne.svg";
import { fadeInUp } from "./constants";
import { SectionTitle } from "./shared";

const expertise = [
  {
    title: "POSH Compliance & Workplace Safety",
    description:
      "Building awareness of statutory requirements, organisational responsibilities and appropriate workplace processes.",
  },
  {
    title: "Internal Committee Awareness",
    description:
      "Helping organisations understand the importance of effective IC structure, roles and responsibilities.",
  },
  {
    title: "Leadership & People Management",
    description:
      "Enabling leaders to navigate workplace situations with clarity, fairness and accountability.",
  },
  {
    title: "POCSO Awareness",
    description:
      "Supporting organisations and institutions in understanding their responsibilities towards child safety and protection.",
  },
  {
    title: "Corporate Training & Facilitation",
    description:
      "Delivering structured, practical learning experiences for leaders, professionals and teams.",
  },
];

const paragraphClasses = "text-lg text-gray-600 leading-relaxed";
const bodyFont = { fontFamily: "Poppins, sans-serif" };

const Facilitator = () => {
  return (
    <section
      id="facilitator"
      className="section-padding bg-gradient-to-b from-[hsl(40_25%_96%)] to-[hsl(45_35%_88%)] w-full"
    >
      <div className="container-width">
        <SectionTitle>Meet Your Facilitator</SectionTitle>

        <div className="grid lg:grid-cols-5 grid-spacing items-start">
          {/* Image */}
          <motion.div
            className="lg:col-span-2 lg:sticky lg:top-24 relative"
            {...fadeInUp}
            transition={{ duration: 0.8 }}
          >
            <div className="overflow-hidden shadow-[0_8px_32px_hsl(75_35%_25%/_0.15)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_hsl(75_35%_25%/_0.12)]">
              <img
                src={anne}
                alt="Anne Anshumathi Raj, Founder of MpowHR"
                loading="lazy"
                className="w-full h-[480px] lg:h-[640px] object-cover object-top"
              />
            </div>

            {/* Background Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            {...fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h3
                className="text-3xl md:text-4xl font-bold text-primary mb-2"
                style={{ fontFamily: "Vinila, Inter, sans-serif" }}
              >
                Anne Anshumathi Raj
              </h3>
              <p
                className="text-base md:text-lg font-medium text-[#8B6914]"
                style={bodyFont}
              >
                Certified POSH & POCSO Coach | Leadership Coach | Soft-Skills
                Trainer
              </p>
            </div>

            <p className={paragraphClasses} style={bodyFont}>
              Anne Anshumathi Raj is the Founder of MpowHR, with over 15 years
              of professional experience across people management, leadership
              development, behavioural skills and corporate training.
            </p>
            <p className={paragraphClasses} style={bodyFont}>
              A Certified POSH and POCSO Coach, Anne specialises in helping
              organisations and leaders develop a clear understanding of
              workplace safety, statutory responsibilities and responsible
              organisational practices.
            </p>
            <p className={paragraphClasses} style={bodyFont}>
              Her experience as a Senior People Manager and Entrepreneur gives
              her a practical perspective on the intersection of people, policy
              and business. She brings this perspective into her POSH sessions,
              simplifying complex requirements and translating them into
              practical insights that leaders can apply within their
              organisations.
            </p>

            <div className="bg-white/60 border border-primary/10 p-6 lg:p-8">
              <h4
                className="text-xl font-bold text-primary mb-5"
                style={{ fontFamily: "Vinila, Inter, sans-serif" }}
              >
                Areas of Expertise
              </h4>
              <ul className="space-y-4">
                {expertise.map((area) => (
                  <li
                    key={area.title}
                    className="flex items-start gap-3 text-gray-600 leading-relaxed"
                    style={bodyFont}
                  >
                    <span className="text-primary flex-shrink-0">●</span>
                    <span>
                      <span className="font-semibold text-gray-800">
                        {area.title}
                      </span>{" "}
                      – {area.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className={paragraphClasses} style={bodyFont}>
              Anne's approach combines industry experience, structured learning
              and practical application, enabling participants to understand not
              only what the law requires, but also how responsible leadership
              can translate those requirements into action.
            </p>
            <p className={paragraphClasses} style={bodyFont}>
              Through her work, she continues to help organisations strengthen
              their people practices, build awareness and foster workplaces
              founded on safety, dignity, accountability and trust.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Facilitator;
