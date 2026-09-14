import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { bodyFont, fadeInUp } from "./constants";
import { SectionHeader } from "./shared";

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
    <section id="faqs" className="section-padding bg-background w-full">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title="FAQs" />

        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <Accordion
            type="multiple"
            defaultValue={["item-0"]}
            className="space-y-3"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="bg-white border border-primary/10 px-5 md:px-6"
              >
                <AccordionTrigger
                  className="min-h-[56px] text-left text-lg font-bold text-primary hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-base text-gray-600 leading-relaxed pb-5"
                  style={bodyFont}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default PoshFaqs;
