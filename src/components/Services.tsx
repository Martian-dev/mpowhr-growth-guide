import { Button } from "@/components/ui/button";
import { Users, Target, Heart, TrendingUp, Clock, Award } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Life Coaching- Empowered Life Coaching",
      description:
        "Individual, one-on-one sessions focused on navigating life's most meaningful and often stressful transitions. This is your safe space to Pause, Realign, and Rise, empowering you with courage and clear personal choice.",
      features: [
        "Relationship Reimagined",
        "Burnout & Stress Recovery",
        "Decisive Confidence",
        "Purpose & Fulfillment Mapping",
      ],
      popular: true,
    },
    {
      icon: Users,
      title: "Corporate Training Strategy",
      description:
        "Customized programs that develop essential leadership skills and build high-impact teams. We focus on transforming organizational challenges into collective focus and sustained performance",
      features: [
        "Executive & Leadership Coaching",
        "Team Resilience Workshops",
        "Organizational Strategy Alignment",
        "High-Impact Communication",
      ],
    },
    {
      icon: Target,
      title: "Dedicated Growth Programes",
      description:
        "Short-term, high-intensity formats designed to deliver rapid progress and immediate, actionable takeaways for specific individual or group goals.",
      features: [
        "The Pause. Realign. Rise. Intensive",
        "Workshops for Team Alignment",
        "Personal Branding for Leaders",
        "Group Coaching for Professionals",
      ],
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Proven Results",
      description:
        "95% of clients report significant improvement within 3 months",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description:
        "Evening and weekend sessions available to fit your lifestyle",
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            What We <span className="text-gradient">Provide</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Strategic coaching and development services designed to foster
            personal clarity and fulfillment while cultivating high-performing,
            resilient teams in the professional sphere.
          </p>
        </div>

        {/* Main Services - Horizontal List */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch lg:overflow-x-auto lg:pb-4 pt-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`relative glass-card p-4 hover-lift flex-shrink-0 w-full lg:w-72 lg:min-w-72 ${service.popular ? "ring-2 ring-primary/20" : ""
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
                      <h3 className="text-lg font-bold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
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

                  <Button
                    variant={service.popular ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    Learn More
                  </Button>
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
