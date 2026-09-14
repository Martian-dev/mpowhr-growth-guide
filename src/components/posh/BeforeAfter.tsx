import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";
import { PRICING_ANCHOR, fadeInUp } from "./constants";
import { CtaButton, SectionTitle } from "./shared";

const comparisons = [
  {
    before: {
      quote: "“Are we really POSH compliant?”",
      text: "You have a policy, but you’re not sure if everything is in place.",
    },
    after: {
      quote: "“Now I know where we stand.”",
      text: "Understand what your organisation must have in place and use the IC Setup Checklist to spot gaps.",
    },
  },
  {
    before: {
      quote: "“What do we do if someone files a complaint?”",
      text: "The process can feel confusing and risky.",
    },
    after: {
      quote: "“I know exactly how the process works.”",
      text: "Understand the complaint, inquiry, conciliation and resolution process.",
    },
  },
  {
    before: {
      quote: "“Who should be on our Internal Committee?”",
      text: "You know you need an IC, but may not know how to set it up correctly.",
    },
    after: {
      quote: "“I know how to set up the right IC.”",
      text: "Understand the IC structure, responsibilities and the role of the External Member.",
    },
  },
  {
    before: {
      quote: "“What if a complaint is deliberately false?”",
      text: "Leaders often worry about misuse of the process.",
    },
    after: {
      quote: "“I understand the safeguards.”",
      text: "Learn what the law says about malicious complaints and false evidence — and why due process matters.",
    },
  },
  {
    before: {
      quote: "“What are the deadlines?”",
      text: "Missing an important timeline can create unnecessary risk.",
    },
    after: {
      quote: "“I know the critical timelines.”",
      text: "Understand key timelines, including the 3-month complaint window and 90-day inquiry period.",
    },
  },
  {
    before: {
      quote: "“Could non-compliance put my business at risk?”",
      text: "Legal and regulatory requirements can be easy to overlook.",
    },
    after: {
      quote: "“I know the risks before they become problems.”",
      text: "Understand your key responsibilities and the consequences of non-compliance.",
    },
  },
];

const ColumnLabel = ({
  children,
  active = false,
}: {
  children: string;
  active?: boolean;
}) => (
  <span
    className={`text-sm font-semibold tracking-[0.2em] ${
      active ? "text-primary" : "text-gray-500"
    }`}
    style={{ fontFamily: "Poppins, sans-serif" }}
  >
    {children}
  </span>
);

const BeforeAfter = () => {
  return (
    <section id="before-after" className="section-padding bg-background w-full">
      <div className="max-w-6xl mx-auto w-full">
        <SectionTitle>
          Still Confused? Here’s what changes after 120 Minutes?
        </SectionTitle>

        {/* Desktop column headers */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-6 mb-4 text-center">
          <ColumnLabel>BEFORE</ColumnLabel>
          <span className="w-8" />
          <ColumnLabel active>AFTER</ColumnLabel>
        </div>

        <div className="space-y-6 md:space-y-4">
          {comparisons.map(({ before, after }, index) => (
            <motion.div
              key={before.quote}
              className="grid md:grid-cols-[1fr_auto_1fr] items-stretch gap-2 md:gap-4 lg:gap-6"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              {/* Before */}
              <div className="bg-white/60 border border-primary/10 p-5 lg:p-6 flex gap-4">
                <HelpCircle className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" />
                <div style={{ fontFamily: "Poppins, sans-serif" }}>
                  <div className="md:hidden mb-1">
                    <ColumnLabel>BEFORE</ColumnLabel>
                  </div>
                  <p className="font-semibold text-gray-800 mb-1">
                    {before.quote}
                  </p>
                  <p className="text-gray-600 leading-relaxed">{before.text}</p>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-[#D4AF37] rotate-90 md:rotate-0" />
              </div>

              {/* After */}
              <div className="bg-primary text-primary-foreground p-5 lg:p-6 flex gap-4 shadow-[0_8px_32px_hsl(75_35%_25%/_0.15)]">
                <CheckCircle2 className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div style={{ fontFamily: "Poppins, sans-serif" }}>
                  <div className="md:hidden mb-1">
                    <span className="text-sm font-semibold tracking-[0.2em] text-[#D4AF37]">
                      AFTER
                    </span>
                  </div>
                  <p className="font-semibold text-[#D4AF37] mb-1">
                    {after.quote}
                  </p>
                  <p className="text-primary-foreground/85 leading-relaxed">
                    {after.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          {...fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <CtaButton href={PRICING_ANCHOR}>I’m Ready to Learn</CtaButton>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfter;
