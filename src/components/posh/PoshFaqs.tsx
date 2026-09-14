import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fadeInUp } from "./constants";
import { SectionTitle } from "./shared";

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
        <SectionTitle>FAQs</SectionTitle>

        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="bg-white/60 border border-primary/10 px-6 shadow-[0_4px_20px_hsl(75_35%_25%/_0.08)]"
              >
                <AccordionTrigger
                  className="text-left text-lg font-bold text-primary hover:no-underline py-5"
                  style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-base text-gray-600 leading-relaxed pb-5"
                  style={{ fontFamily: "Poppins, sans-serif" }}
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
