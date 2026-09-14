import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/our-impact";
import { SectionTitle } from "./shared";

const stats = [
  { value: 14, label: "Years of Expertise" },
  { value: 5, label: "Certifications" },
  { value: 25, label: "Sessions Conducted" },
  { value: 100, label: "Professionals Trained" },
];

const PoshNumbers = () => {
  return (
    <section className="section-padding bg-background overflow-hidden w-full">
      <div className="container-width text-center">
        <SectionTitle>We in Numbers</SectionTitle>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 max-w-5xl mx-auto text-xl font-semibold">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center space-y-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-baseline justify-center">
                <AnimatedCounter target={stat.value} />
                <span className="text-4xl font-bold text-gray-700 ml-1">+</span>
              </div>
              <div className="text-gray-600 font-medium text-base sm:text-xl">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoshNumbers;
