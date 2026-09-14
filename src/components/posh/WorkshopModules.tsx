import { motion } from "framer-motion";
import { Award, Clock, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { bodyFont } from "./constants";
import { SectionHeader } from "./shared";

const modules = [
  {
    title: "The Business Owner's Legal Exposure",
    detail: "Statutory Mandate & Fines",
  },
  {
    title: "Complete Gist of the POSH Act",
    detail: "Scope, Definitions & Extended Workplace",
  },
  {
    title: "IC Setup, Mandatory Compliances & Role of the External Member",
  },
  {
    title: "Inquiry Procedures, Timelines, Filing Windows & Conciliation",
  },
  {
    title: "De-risking Leadership",
    detail: "Section 14 & False Allegation Shields",
  },
  {
    title: "Executive Assessment, Live Q&A, Certification",
  },
];

// Quick facts drawn from the workshop details elsewhere on the page.
const facts = [
  { icon: Clock, label: "120 minutes" },
  { icon: Radio, label: "Live Workshop" },
  { icon: Award, label: "Certificate" },
];

// On desktop the list flows down two columns (1–3, then 4–6).
const COLUMN_BREAK = 2;

const WorkshopModules = () => {
  return (
    <section id="modules" className="section-padding bg-background w-full">
      <div className="container-width">
        <SectionHeader title="What will you learn in this Workshop?">
          <ul
            className="flex flex-wrap justify-center gap-3"
            aria-label="Workshop format"
          >
            {facts.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 bg-white border border-primary/15 text-gray-700 px-4 py-2 text-sm font-medium"
                style={bodyFont}
              >
                <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </SectionHeader>

        <ol className="max-w-5xl mx-auto bg-white border border-primary/10 p-6 md:p-10 grid lg:grid-cols-2 lg:grid-rows-3 lg:grid-flow-col gap-x-14">
          {modules.map((module, index) => {
            const isLast = index === modules.length - 1;
            const endsColumn = index === COLUMN_BREAK;

            return (
              <motion.li
                key={module.title}
                className={cn(
                  "relative pl-16",
                  isLast ? "pb-0" : "pb-8",
                  endsColumn && "lg:pb-0",
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                {/* Timeline connector */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-[1.375rem] top-12 bottom-1 w-px bg-primary/15",
                      endsColumn && "lg:hidden",
                    )}
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 w-11 h-11 rounded-full bg-white border border-primary/25 text-primary flex items-center justify-center text-lg font-semibold"
                  style={bodyFont}
                >
                  {index + 1}
                </span>

                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70 pt-0.5"
                  style={bodyFont}
                >
                  Module {index + 1}
                </p>
                <h3
                  className="mt-1 text-lg md:text-xl font-bold text-foreground leading-snug"
                  style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                >
                  {module.title}
                </h3>
                {module.detail && (
                  <p className="mt-1 text-base text-gray-600" style={bodyFont}>
                    {module.detail}
                  </p>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default WorkshopModules;
