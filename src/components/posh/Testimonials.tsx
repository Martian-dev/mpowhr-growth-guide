import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { bodyFont, fadeInUp } from "./constants";
import { SectionHeader } from "./shared";

interface Testimonial {
  quote: string;
  name: string;
  designation?: string;
}

// Written testimonials from workshop participants. The section stays hidden
// until at least one entry is added here.
const testimonials: Testimonial[] = [];

const Testimonials = () => {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section-padding bg-background w-full">
      <div className="container-width">
        <SectionHeader title="Testimonials" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              className="bg-white border border-primary/10 p-6 md:p-8 flex flex-col"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Quote
                className="w-8 h-8 text-primary/30 mb-4"
                aria-hidden="true"
              />
              <blockquote
                className="text-gray-700 text-lg leading-relaxed flex-grow"
                style={bodyFont}
              >
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-6" style={bodyFont}>
                <span className="block font-semibold text-primary">
                  {testimonial.name}
                </span>
                {testimonial.designation && (
                  <span className="block text-sm text-gray-600">
                    {testimonial.designation}
                  </span>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
