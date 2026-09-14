import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeInUp } from "./constants";
import { SectionTitle } from "./shared";

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
    <section
      id="outcomes"
      className="section-padding bg-gradient-to-b from-[hsl(40_25%_96%)] to-[hsl(45_35%_88%)] w-full"
    >
      <div className="container-width">
        <SectionTitle>Key Outcomes & Benefits</SectionTitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome}
              className="flex items-start gap-4 bg-white/60 border-l-4 border-primary shadow-[0_4px_20px_hsl(75_35%_25%/_0.08)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_hsl(75_35%_25%/_0.12)]"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CheckCircle2 className="w-7 h-7 text-primary flex-shrink-0 mt-0.5" />
              <p
                className="text-gray-800 text-lg font-medium leading-snug"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {outcome}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyOutcomes;
