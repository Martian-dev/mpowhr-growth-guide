import { Button } from "@/components/ui/button";
import { Users, Target, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import coachingSessionImg from "@/assets/coaching-session.jpg";
import hrMeetingImg from "@/assets/hr-meeting.jpg";
import heroCoachImg from "@/assets/hero-coach.jpg";

const Services = () => {
  const { ref, isInView } = useScrollAnimation();
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
      title: "Dedicated Growth Programes",
      description:
        "Short-term, high-intensity formats designed to deliver rapid progress and immediate, actionable takeaways for specific individual or group goals.",
      highlights: [
        "The Pause. Realign. Rise. Intensive",
        "Workshops for Team Alignment",
        "Personal Branding for Leaders",
        "Group Coaching for Professionals",
      ],
      image: heroCoachImg,
    },
  ];

  return (
    <section id="services" className="section-padding bg-background" ref={ref}>
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto section-header-spacing">
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
            What We{" "}
            <span
              className="text-gradient"
              style={{
                fontFamily: "Vinila, Inter, sans-serif",
                fontWeight: "700",
              }}
            >
              Provide
            </span>
          </motion.h2>
          <p
            className="text-lg text-gray-600 leading-relaxed"
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
                      <p
                        key={idx}
                        className="text-gray-700 leading-relaxed"
                        style={{ fontFamily: "Poppins, sans-serif" }}
                      >
                        {highlight}
                      </p>
                    ))}
                  </div>
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
