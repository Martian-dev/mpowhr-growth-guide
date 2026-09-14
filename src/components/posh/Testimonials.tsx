import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { fadeInUp } from "./constants";
import { SectionTitle } from "./shared";

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
        <SectionTitle>Testimonials</SectionTitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              className="relative bg-[hsl(40_25%_96%/0.9)] border border-primary/10 shadow-[0_8px_32px_hsl(75_35%_25%/_0.15)] p-6 lg:p-8 flex flex-col"
              {...fadeInUp}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Quote className="w-8 h-8 text-[#D4AF37] mb-4" />
              <blockquote
                className="text-gray-700 leading-relaxed flex-grow"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-6">
                <div
                  className="font-bold text-primary"
                  style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                >
                  {testimonial.name}
                </div>
                {testimonial.designation && (
                  <div className="text-sm text-gray-600">
                    {testimonial.designation}
                  </div>
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
