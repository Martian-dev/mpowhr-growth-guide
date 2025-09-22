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
            What We <span className="text-gradient">Provide</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Comprehensive life coaching and HR consulting services designed to unlock your potential 
            and drive sustainable growth in both personal and professional spheres.
          </p>
        </div>

        {/* Main Services - Horizontal List */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch lg:overflow-x-auto lg:pb-4 pt-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`relative glass-card p-6 hover-lift flex-shrink-0 w-full lg:w-80 lg:min-w-80 ${
                    service.popular ? "ring-2 ring-primary/20" : ""
                  }`}
                >
                {service.popular && (
                  <div className="absolute -top-3 left-6 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-6 ml-16">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full"></div>
                      <span className="text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>

                  <Button variant={service.popular ? "default" : "outline"} size="sm" className="w-full">
                    Learn More
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-accent-gradient p-8 md:p-12">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose MpowHR?</h3>
          
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