import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import hrMeeting from "@/assets/hr-meeting.jpg";

const Approach = () => {
  const { ref, isInView } = useScrollAnimation();
  const steps = [
    {
      icon: Lightbulb,
      title: "Discovery & Assessment",
      description:
        "We begin with a comprehensive assessment of your current situation, challenges, and aspirations.",
      details: [
        "Initial consultation",
        "Goal clarification",
        "Strengths assessment",
        "Challenge identification",
      ],
    },
    {
      icon: Target,
      title: "Strategic Planning",
      description:
        "Together, we create a personalized roadmap with clear milestones and actionable steps.",
      details: [
        "Goal setting",
        "Action planning",
        "Timeline creation",
        "Resource identification",
      ],
    },
    {
      icon: TrendingUp,
      title: "Implementation & Growth",
      description:
        "Regular sessions focused on progress, skill development, and overcoming obstacles.",
      details: [
        "Weekly sessions",
        "Skill building",
        "Progress tracking",
        "Continuous adjustment",
      ],
    },
    {
      icon: Users,
      title: "Integration & Mastery",
      description:
        "Ensuring sustainable change through integration of new habits and ongoing support.",
      details: [
        "Habit formation",
        "Integration support",
        "Maintenance planning",
        "Ongoing check-ins",
      ],
    },
  ];

  const principles = [
    "Wake up energized after a sound night's sleep, ready for the day.",
    "Rediscover the joy in exercise, hobbies, and 'me time'",
    "Feel total confidence in your personal direction and life choices.",
    "Easily set and hold clear boundaries without guilt or obligation.",
    "Fully commit to a fresh start after a difficult transition, leaving the past behind.",
    "Know what to prioritize every morning, eliminating the feeling of being overwhelmed.",
  ];

  return (
    <section
      id="approach"
      className="section-padding bg-gradient-to-b from-[hsl(40_25%_96%)] to-[hsl(45_35%_88%)]"
      ref={ref}
    >
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
            My{" "}
            <span
              className="text-gradient"
              style={{
                fontFamily: "Vinila, Inter, sans-serif",
                fontWeight: "700",
              }}
            >
              Approach
            </span>
          </motion.h2>
          <p
            className="text-lg text-gray-600 leading-relaxed"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            A structured yet flexible methodology designed to create lasting
            transformation through personalized coaching and strategic support.
          </p>
        </div>

        {/* Process Steps */}
        <div className="section-subtitle-spacing">
          <h3
            className="text-2xl font-bold text-center content-spacing mb-8"
            style={{ fontFamily: "Vinila, Inter, sans-serif" }}
          >
            The Transformation Journey
          </h3>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 grid-spacing">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden xl:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-primary to-accent z-0"></div>
                  )}

                  <div className="bg-[hsl(40_25%_96%/0.9)] backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_hsl(75_35%_25%/_0.15)] p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_hsl(75_35%_25%/_0.12)] relative z-10 h-full min-h-[320px] flex flex-col">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-primary mb-2">
                        STEP {index + 1}
                      </div>
                      <h4
                        className="text-lg font-bold"
                        style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                      >
                        {step.title}
                      </h4>
                    </div>

                    <p
                      className="text-gray-600 text-sm mb-4 leading-relaxed flex-grow"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {step.description}
                    </p>

                    <ul className="space-y-2 mt-auto">
                      {step.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-xs"
                        >
                          <div className="w-1 h-1 bg-primary"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
