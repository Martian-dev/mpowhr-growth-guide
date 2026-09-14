import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { bodyFont, fadeInUp } from "./constants";
import { SectionHeader } from "./shared";

const outcomes = [
  "Protect your Business License & Eliminate Statutory Risk",
  "Preserve Internal Jurisdiction & Avoid External Escalations",
  "Deploy the Section 14 Shield Against False & Retaliatory Claims",
  "Master Mandatory Timelines, IC Roles & External Member Rules",
  "Secure Enterprise Contracts & Vendor Empanels",
  "Immediate Executive & Deliverables Included",
];

const KeyOutcomes = () => {
  return (
    <section id="outcomes" className="section-padding bg-background w-full">
      <div className="container-width">
        <SectionHeader title="Key Outcomes & Benefits" />

        <motion.ul
          className="max-w-5xl mx-auto bg-white border border-primary/10 p-6 md:p-10 grid md:grid-cols-2 gap-x-12 gap-y-6"
          {...fadeInUp}
          transition={{ duration: 0.6 }}
        >
          {outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-4">
              <CheckCircle2
                className="w-6 h-6 text-primary flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span
                className="text-lg font-medium text-gray-800 leading-snug"
                style={bodyFont}
              >
                {outcome}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default KeyOutcomes;
