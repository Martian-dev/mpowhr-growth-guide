import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Users, Target, Lightbulb, TrendingUp } from "lucide-react";
import hrMeeting from "@/assets/hr-meeting.jpg";

const Approach = () => {
  const steps = [
    {
      icon: Lightbulb,
      title: "Discovery & Assessment",
      description: "We begin with a comprehensive assessment of your current situation, challenges, and aspirations.",
      details: ["Initial consultation", "Goal clarification", "Strengths assessment", "Challenge identification"],
    },
    {
      icon: Target,
      title: "Strategic Planning",
      description: "Together, we create a personalized roadmap with clear milestones and actionable steps.",
      details: ["Goal setting", "Action planning", "Timeline creation", "Resource identification"],
    },
    {
      icon: TrendingUp,
      title: "Implementation & Growth",
      description: "Regular sessions focused on progress, skill development, and overcoming obstacles.",
      details: ["Weekly sessions", "Skill building", "Progress tracking", "Continuous adjustment"],
    },
    {
      icon: Users,
      title: "Integration & Mastery",
      description: "Ensuring sustainable change through integration of new habits and ongoing support.",
      details: ["Habit formation", "Integration support", "Maintenance planning", "Ongoing check-ins"],
    },
  ];

  const principles = [
    "Client-centered approach tailored to your unique needs",
    "Evidence-based coaching methods and frameworks",
    "Confidential and judgment-free environment",
    "Flexible scheduling to accommodate your lifestyle",
    "Ongoing support between sessions via email",
    "Resources and tools for continued growth",
  ];

  return (
    <section id="approach" className="section-padding bg-section-gradient">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-gradient">Approach</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A structured yet flexible methodology designed to create lasting transformation 
            through personalized coaching and strategic support.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">The Transformation Journey</h3>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden xl:block absolute top-8 left-full w-8 h-0.5 bg-gradient-to-r from-primary to-accent z-0"></div>
                  )}
                  
                  <div className="glass-card p-6 hover-lift relative z-10">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-sm font-medium text-primary mb-2">STEP {index + 1}</div>
                      <h4 className="text-xl font-bold">{step.title}</h4>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{step.description}</p>
                    
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs">
                          <div className="w-1 h-1 bg-primary rounded-full"></div>
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

        {/* Principles & Image Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Principles */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-6">Core Principles</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                My coaching philosophy is built on proven principles that ensure 
                effective, respectful, and sustainable transformation.
              </p>
            </div>

            <div className="space-y-4">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{principle}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="default" size="lg">
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg">
                Download Framework Guide
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-glass hover-lift">
                <img
                  src={hrMeeting}
                  alt="Professional team meeting and collaboration"
                  className="w-full h-[500px] object-cover"
                />
                
                {/* Overlay Elements */}
                <div className="absolute top-6 right-6 glass-card p-4 text-center">
                  <div className="text-lg font-bold text-primary">95%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
                
                <div className="absolute bottom-6 left-6 glass-card p-4">
                  <div className="text-sm font-medium text-primary">Proven Process</div>
                  <div className="text-xs text-muted-foreground">8+ Years Refined</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;