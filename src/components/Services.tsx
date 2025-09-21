import { Button } from "@/components/ui/button";
import { Users, Target, Heart, TrendingUp, Clock, Award } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Personal Life Coaching",
      description: "One-on-one sessions focused on personal growth, goal setting, and overcoming challenges.",
      features: ["Career Transition Support", "Work-Life Balance", "Confidence Building", "Stress Management"],
      popular: true,
    },
    {
      icon: Users,
      title: "HR Consulting",
      description: "Strategic human resources solutions for growing organizations and teams.",
      features: ["Talent Acquisition", "Performance Management", "Employee Relations", "Compliance"],
    },
    {
      icon: Target,
      title: "Leadership Development",
      description: "Develop effective leadership skills and build high-performing teams.",
      features: ["Executive Coaching", "Team Building", "Communication Skills", "Strategic Planning"],
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "95% of clients report significant improvement within 3 months",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Evening and weekend sessions available to fit your lifestyle",
    },
    {
      icon: Award,
      title: "Certified Excellence",
      description: "ICF certified coach with advanced HR credentials",
    },
  ];

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Comprehensive coaching and HR solutions designed to unlock your potential 
            and drive meaningful change in your personal and professional life.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`relative glass-card p-8 hover-lift ${
                  service.popular ? "ring-2 ring-primary/20" : ""
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={service.popular ? "default" : "outline"} className="w-full">
                  Learn More
                </Button>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-accent-gradient rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose mpowHR?</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{benefit.title}</h4>
                  <p className="text-foreground/80 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;