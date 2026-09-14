import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Scale,
  ShieldCheck,
  Timer,
  UsersRound,
} from "lucide-react";
import { fadeInUp } from "./constants";
import { SectionTitle } from "./shared";

const modules = [
  {
    icon: Scale,
    title: "The Business Owner's Legal Exposure",
    detail: "Statutory Mandate & Fines",
  },
  {
    icon: BookOpen,
    title: "Complete Gist of the POSH Act",
    detail: "Scope, Definitions & Extended Workplace",
  },
  {
    icon: UsersRound,
    title: "IC Setup, Mandatory Compliances & Role of the External Member",
  },
  {
    icon: Timer,
    title: "Inquiry Procedures, Timelines, Filing Windows & Conciliation",
  },
  {
    icon: ShieldCheck,
    title: "De-risking Leadership",
    detail: "Section 14 & False Allegation Shields",
  },
  {
    icon: Award,
    title: "Executive Assessment, Live Q&A, Certification",
  },
];

const WorkshopModules = () => {
  return (
    <section id="modules" className="section-padding bg-background w-full">
      <div className="container-width">
        <SectionTitle>What will you learn in this Workshop?</SectionTitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.title}
                className="bg-[hsl(40_25%_96%/0.9)] backdrop-blur-lg border border-primary/10 shadow-[0_8px_32px_hsl(75_35%_25%/_0.15)] p-6 lg:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_hsl(75_35%_25%/_0.12)] flex flex-col"
                {...fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <span
                    className="text-sm font-medium text-primary tracking-wider"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    MODULE {index + 1}
                  </span>
                </div>

                <h3
                  className="text-lg lg:text-xl font-bold leading-snug"
                  style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                >
                  {module.title}
                </h3>
                {module.detail && (
                  <p
                    className="text-gray-600 text-sm mt-2 leading-relaxed"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    ({module.detail})
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkshopModules;
