import { motion } from "framer-motion";
import {
  Compass,
  HeartHandshake,
  Presentation,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import anne from "@/assets/anne.svg";
import { bodyFont, fadeInUp } from "./constants";

const credentials = [
  "Certified POSH & POCSO Coach",
  "Leadership Coach",
  "Soft-Skills Trainer",
];

const expertise = [
  {
    icon: ShieldCheck,
    title: "POSH Compliance & Workplace Safety",
    description:
      "Building awareness of statutory requirements, organisational responsibilities and appropriate workplace processes.",
  },
  {
    icon: UsersRound,
    title: "Internal Committee Awareness",
    description:
      "Helping organisations understand the importance of effective IC structure, roles and responsibilities.",
  },
  {
    icon: Compass,
    title: "Leadership & People Management",
    description:
      "Enabling leaders to navigate workplace situations with clarity, fairness and accountability.",
  },
  {
    icon: HeartHandshake,
    title: "POCSO Awareness",
    description:
      "Supporting organisations and institutions in understanding their responsibilities towards child safety and protection.",
  },
  {
    icon: Presentation,
    title: "Corporate Training & Facilitation",
    description:
      "Delivering structured, practical learning experiences for leaders, professionals and teams.",
  },
];

const paragraphClasses = "text-lg text-gray-600 leading-relaxed";

const Facilitator = () => {
  return (
    <section id="facilitator" className="section-padding bg-background w-full">
      <div className="container-width grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Photo - space reserved with aspect ratio so the page doesn't jump */}
        <motion.div
          className="lg:col-span-5 lg:sticky lg:top-24"
          {...fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-[4/5] max-h-[560px] lg:max-h-none w-full overflow-hidden border border-primary/10">
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
          {...fadeInUp}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <h2
            className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-primary/80"
            style={bodyFont}
          >
            Meet Your Facilitator
          </h2>
          <h3
            className="mt-3 text-3xl md:text-[2.5rem] font-bold text-primary leading-tight"
            style={{ fontFamily: "Vinila, Inter, sans-serif" }}
          >
            Anne Anshumathi Raj
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Credentials">
            {credentials.map((credential) => (
              <li
                key={credential}
                className="bg-white border border-primary/20 text-primary px-3 py-1.5 text-sm font-medium"
                style={bodyFont}
              >
                {credential}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-5 max-w-prose" style={bodyFont}>
            <p className={paragraphClasses}>
              Anne Anshumathi Raj is the Founder of MpowHR, with over 15 years
              of professional experience across people management, leadership
              development, behavioural skills and corporate training.
            </p>
            <p className={paragraphClasses}>
              A Certified POSH and POCSO Coach, Anne specialises in helping
              organisations and leaders develop a clear understanding of
              workplace safety, statutory responsibilities and responsible
              organisational practices.
            </p>
            <p className={paragraphClasses}>
              Her experience as a Senior People Manager and Entrepreneur gives
              her a practical perspective on the intersection of people, policy
              and business. She brings this perspective into her POSH sessions,
              simplifying complex requirements and translating them into
              practical insights that leaders can apply within their
              organisations.
            </p>
          </div>

          <div className="mt-10 bg-white border border-primary/10 p-6 md:p-8">
            <h4
              className="text-xl font-bold text-primary mb-6"
              style={{ fontFamily: "Vinila, Inter, sans-serif" }}
            >
              Areas of Expertise
            </h4>
            <ul className="space-y-6" style={bodyFont}>
              {expertise.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="w-11 h-11 rounded-2xl border border-primary/15 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="mt-1 text-gray-600 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 space-y-5 max-w-prose" style={bodyFont}>
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
        </motion.div>
      </div>
    </section>
  );
};

export default Facilitator;
