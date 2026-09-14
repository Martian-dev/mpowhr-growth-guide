import { motion } from "framer-motion";
import {
  FileCheck2,
  Handshake,
  Scale,
  ShieldCheck,
  ShieldHalf,
  Timer,
} from "lucide-react";
import { bodyFont } from "./constants";
import { SectionHeader } from "./shared";

const outcomes = [
  {
    icon: ShieldCheck,
    text: "Protect your Business License & Eliminate Statutory Risk",
  },
  {
    icon: Scale,
    text: "Preserve Internal Jurisdiction & Avoid External Escalations",
  },
  {
    icon: ShieldHalf,
    text: "Deploy the Section 14 Shield Against False & Retaliatory Claims",
  },
  {
    icon: Timer,
    text: "Master Mandatory Timelines, IC Roles & External Member Rules",
  },
  { icon: Handshake, text: "Secure Enterprise Contracts & Vendor Empanels" },
  { icon: FileCheck2, text: "Immediate Executive & Deliverables Included" },
];

const KeyOutcomes = () => {
  return (
    <section
      id="outcomes"
      className="section-padding bg-white border-y border-border w-full"
    >
      <div className="container-width">
        <SectionHeader title="Key Outcomes & Benefits" />

        {/* Hairline grid: the 1px gaps show the border colour behind the cells */}
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {outcomes.map(({ icon: Icon, text }, index) => (
            <motion.li
              key={text}
              className="bg-white p-6 md:p-8 flex flex-col gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#D4AF37]" aria-hidden="true" />
                </span>
                <span
                  className="text-sm font-semibold text-slate-400"
                  style={bodyFont}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p
                className="text-lg font-semibold text-foreground leading-snug"
                style={bodyFont}
              >
                {text}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default KeyOutcomes;
