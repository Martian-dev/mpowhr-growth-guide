import { Button } from "@/components/ui/button";
import { Users, Target, Heart } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useRef } from "react";
import coachingSessionImg from "@/assets/coaching-session.png";
import hrMeetingImg from "@/assets/hr-meeting.png";
import heroCoachImg from "@/assets/hero-coach.png";

const Services = () => {
  const { ref, isInView } = useScrollAnimation();
  const buttonRef = useRef(null);
  const isButtonInView = useInView(buttonRef);

  const services = [
    {
      icon: Heart,
      title: "Empowered Life Coaching",
      description:
        "Individual, one-on-one sessions focused on navigating life's most meaningful and often stressful transitions. This is your safe space to Pause, Realign, and Rise, empowering you with courage and clear personal choice.",
      highlights: [
        "Relationship Reimagined",
        "Burnout & Stress Recovery",
        "Decisive Confidence",
        "Purpose & Fulfillment Mapping",
      ],
      image: coachingSessionImg,
      popular: true,
    },
    {
      icon: Target,
      title: "Corporate Training Strategy",
      description:
        "Customized programs that develop essential leadership skills and build high-impact teams. We focus on transforming organizational challenges into collective focus and sustained performance.",
      highlights: [
        "Executive & Leadership Coaching",
        "Team Resilience Workshops",
        "Organizational Strategy Alignment",
        "High-Impact Communication",
      ],
      image: hrMeetingImg,
    },
    {
      icon: Users,
      title: "Dedicated Inclusivity & Compliance Programs:",
      description:
        "Short-term, high-intensity formats designed to deliver rapid progress and immediate, actionable takeaways for specific individual or group goals.",
      highlights: [
        "Prevention of Sexual Harrassment (POSH)",
        "Protection of Children from Sexual Offences (POCSO)",
        "Diversity, Equity, and Inclusion (DEI)",
      ],
      image: heroCoachImg,
    },
  ];

  return (
    <section id="services" className="section-padding bg-background" ref={ref}>
      <div className="container-width">
        {/* Section Header */}
        <div className="max-w-5xl mx-auto section-header-spacing">
          <motion.h2
            className="text-2xl sm:text-[2.5rem] font-normal mb-12 text-center leading-none tracking-wider"
            style={{
              fontFamily: "Vinila, Inter, sans-serif",
              fontStyle: "normal",
              letterSpacing: "0.01em",
              fontWeight: "700",
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Catalyst for Change:{" "}
            <span
              className="text-gradient"
              style={{
                fontFamily: "Vinila, Inter, sans-serif",
                fontWeight: "700",
              }}
            >
              Our Signature Services
            </span>
          </motion.h2>
          <p
            className="text-lg text-gray-600 leading-relaxed text-center"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Strategic coaching and development services designed to foster
            personal clarity and fulfillment while cultivating high-performing,
            resilient teams in the professional sphere.
          </p>
        </div>

        {/* Services with Alternating Layout */}
        <div className="space-y-16 lg:space-y-24 max-w-5xl mx-auto px-4 lg:px-8">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content Side */}
                <div className="flex-1 max-w-lg order-2 lg:order-none">
                  {service.popular && (
                    <div className="inline-block bg-secondary text-secondary-foreground px-4 py-1 text-sm font-medium rounded-full mb-4">
                      Most Popular
                    </div>
                  )}

                  <h3
                    className="text-3xl lg:text-4xl font-bold mb-4 text-primary"
                    style={{
                      fontFamily: "Vinila, Inter, sans-serif",
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="text-gray-600 text-lg leading-relaxed mb-8"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {service.description}
                  </p>

                  <div className="space-y-4">
                    {service.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-gray-700 leading-relaxed"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        <span className="text-primary font-bold text-xl leading-none mt-1">
                          •
                        </span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Show button only for the last service */}
                  {index === services.length - 1 && (
                    <motion.div
                      className="mt-8"
                      ref={buttonRef}
                      animate={
                        isButtonInView
                          ? {
                              x: [0, -2, 2, -2, 2, 0],
                              transition: {
                                duration: 0.5,
                                delay: 0.3,
                                ease: "easeInOut",
                              },
                            }
                          : {}
                      }
                    >
                      <Button
                        onClick={() =>
                          window.open(
                            "https://drive.google.com/file/d/1lpPvI3eqIa6EVJzLvEg3X7hU3SW2f9lz/view?usp=drive_link",
                            "_blank"
                          )
                        }
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-base font-medium shadow-md hover:shadow-lg transition-all duration-300"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        Know More
                      </Button>
                    </motion.div>
                  )}
                </div>

                {/* Image Side */}
                <div className="flex-1 flex justify-center lg:justify-center max-w-sm order-1 lg:order-none">
                  <div className="relative">
                    {/* Circular Image Container */}
                    <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-2xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/30 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
