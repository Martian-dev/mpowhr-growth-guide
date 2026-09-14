import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { REGISTRATION_URL, fadeInUp, goldGradientText } from "./constants";
import { CtaButton } from "./shared";

const plans = [
  { price: "₹700", seats: "for 1" },
  { price: "₹1,499", seats: "for 2" },
];

const Pricing = () => {
  return (
    <section
      id="pricing"
      data-nav-contrast
      className="section-padding bg-primary text-primary-foreground w-full"
    >
      <motion.div
        className="max-w-3xl mx-auto text-center"
        {...fadeInUp}
        transition={{ duration: 0.8 }}
      >
        <div className="grid sm:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.seats}
              className="border border-[#D4AF37]/40 bg-white/5 backdrop-blur-sm px-6 py-8"
            >
              <div
                className="text-5xl md:text-6xl font-bold pb-1"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  ...goldGradientText,
                }}
              >
                {plan.price}
              </div>
              <div
                className="text-xl text-primary-foreground/90 mt-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {plan.seats}
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-8 inline-flex items-center justify-center gap-3 text-lg md:text-xl font-medium"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <Gift className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
          Free Consultation from Anne After workshop
        </p>

        <div className="mt-8">
          <CtaButton href={REGISTRATION_URL} variant="gold" className="text-lg">
            Secure your Seat
          </CtaButton>
        </div>
      </motion.div>
    </section>
  );
};

export default Pricing;
