import { motion } from "framer-motion";
import { CheckCircle2, HelpCircle } from "lucide-react";
import { PRICING_ANCHOR, bodyFont, fadeInUp } from "./constants";
import { CtaButton, SectionHeader } from "./shared";

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

const labelClasses =
  "flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]";

const BeforeLabel = ({ className = "" }: { className?: string }) => (
  <span className={`${labelClasses} text-gray-500 ${className}`}>
    <HelpCircle className="w-4 h-4" aria-hidden="true" />
    Before
  </span>
);

const AfterLabel = ({ className = "" }: { className?: string }) => (
  <span className={`${labelClasses} text-primary ${className}`}>
    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
    After
  </span>
);

// A two-column comparison on desktop; each row stacks into a single card on
// phones with its own Before/After labels.
const BeforeAfter = () => {
  return (
    <section id="before-after" className="section-padding bg-background w-full">
      <div className="container-width">
        <SectionHeader title="Still Confused? Here’s what changes after 120 Minutes?" />

        <motion.div
          className="max-w-5xl mx-auto space-y-4 md:space-y-0 md:bg-white md:border md:border-primary/10"
          style={bodyFont}
          {...fadeInUp}
          transition={{ duration: 0.6 }}
        >
          {/* Desktop column headings */}
          <div
            className="hidden md:grid grid-cols-2 border-b border-primary/10"
            aria-hidden="true"
          >
            <div className="px-8 py-4">
              <BeforeLabel />
            </div>
            <div className="px-8 py-4 border-l border-primary/10">
              <AfterLabel />
            </div>
          </div>

          {comparisons.map(({ before, after }) => (
            <div
              key={before.quote}
              className="grid md:grid-cols-2 bg-white md:bg-transparent border border-primary/10 md:border-0 md:border-b md:last:border-b-0"
            >
              <div className="p-5 md:px-8 md:py-6">
                <BeforeLabel className="mb-2 md:hidden" />
                <p className="font-semibold text-gray-800">{before.quote}</p>
                <p className="mt-1 text-gray-600 leading-relaxed">
                  {before.text}
                </p>
              </div>
              <div className="p-5 md:px-8 md:py-6 border-t md:border-t-0 md:border-l border-primary/10">
                <AfterLabel className="mb-2 md:hidden" />
                <p className="font-semibold text-primary">{after.quote}</p>
                <p className="mt-1 text-gray-700 leading-relaxed">
                  {after.text}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <CtaButton href={PRICING_ANCHOR}>I’m Ready to Learn</CtaButton>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
