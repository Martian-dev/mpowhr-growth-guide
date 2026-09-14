import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";
import { PLANS, bodyFont, registrationUrl } from "./constants";
import { CtaButton } from "./shared";

// What every seat includes, as stated in the modules and FAQs.
const included = ["Live Workshop", "120 minutes", "Certificate"];

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="section-padding bg-background w-full"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center section-header-spacing"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="pricing-heading"
            className="text-2xl sm:text-[2.5rem] font-bold leading-tight"
            style={{ fontFamily: "Vinila, Inter, sans-serif" }}
          >
            Secure your Seat
          </h2>
          <p
            className="mt-5 inline-flex items-center justify-center gap-3 text-lg md:text-xl font-medium text-primary"
            style={bodyFont}
          >
            <Gift className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
            Free Consultation from Anne After workshop
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.seats}
              className="bg-white border border-primary/10 p-6 md:p-8 flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              style={bodyFont}
            >
              <p className="flex items-baseline gap-3">
                <span className="text-5xl md:text-6xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-xl text-gray-600">{plan.label}</span>
              </p>

              <ul className="mt-6 mb-8 space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check
                      className="w-5 h-5 text-primary flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <CtaButton
                href={registrationUrl(plan.seats)}
                className="mt-auto w-full"
              >
                Secure your Seat
              </CtaButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
