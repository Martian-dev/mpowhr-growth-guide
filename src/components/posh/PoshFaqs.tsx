import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CONSULTATION_URL,
  bodyFont,
  fadeInUp,
  headingFont,
} from "./constants";

const faqs = [
  {
    question: "Is it a Live Workshop?",
    answer: "Yes, it's a Live Workshop.",
  },
  {
    question: "Is the Consultation Free?",
    answer: "Yes, you can have a 1-1 consultation with Anne for free.",
  },
  {
    question: "Will I get a Certificate?",
    answer: "Yes, a Certificate will be provided.",
  },
];

const PoshFaqs = () => {
  return (
    <section
      id="faqs"
      className="section-padding bg-background w-full"
      style={bodyFont}
    >
      <div className="container-width">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          <motion.div
            className="lg:col-span-4"
            {...fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl sm:text-[2.5rem] font-bold text-foreground leading-tight"
              style={headingFont}
            >
              FAQs
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Still have a question?
            </p>
            <a
              href={CONSULTATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 min-h-[44px] font-semibold text-foreground underline decoration-[#D4AF37] decoration-2 underline-offset-4 hover:decoration-[#8B6914] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              Book Free Consultation
            </a>
          </motion.div>

          <motion.div
            className="lg:col-span-8"
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Accordion
              type="multiple"
              defaultValue={["item-0"]}
              className="border-t border-border"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger
                    className="min-h-[64px] text-left text-lg md:text-xl font-semibold text-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    style={headingFont}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg text-slate-600 leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PoshFaqs;
