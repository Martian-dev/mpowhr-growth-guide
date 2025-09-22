import { Button } from "@/components/ui/button";
import { Quote, CheckCircle, Calendar } from "lucide-react";
import coachingSession from "@/assets/coaching-session.jpg";

const About = () => {
  const achievements = [
    "Senior Manager - People at Introlligent",
    "8+ Years HR Leadership Experience",
    "Strategic Business Partner Expertise",
    "Life Coaching Certification",
    "Organizational Development Specialist",
    "Employee Relations Expert",
  ];

  return (
    <section id="about" className="section-padding bg-section-gradient">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-gradient">Anne Anshumathi Raj</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                With over 8 years of experience in HR as a strategic business
                partner, Anne has mastered the art of organizational development
                and human resources management. As a Senior Manager - People at
                Introlligent, she now combines her HR expertise with her passion
                for life coaching to help individuals and organizations unlock
                their full potential.
              </p>
            </div>

            {/* Quote */}
            <div className="glass-card p-6 relative">
              <Quote className="w-8 h-8 text-primary/30 absolute top-4 left-4" />
              <blockquote className="italic text-lg text-foreground/90 pl-8">
                "My journey from HR management to life coaching has shown me
                that true organizational success begins with empowered
                individuals. I believe every person has the potential to create
                meaningful change in their life and work."
              </blockquote>
              <cite className="block text-right mt-4 text-sm text-muted-foreground">
                - Anne Anshumathi Raj, Founder
              </cite>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Credentials & Experience
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg">
                <Calendar className="w-4 h-4" />
                Book a Discovery Call
              </Button>
              <Button variant="outline" size="lg">
                Download My Story
              </Button>
            </div>
          </div>

          {/* Right Column - Image & Stats */}
          <div className="relative">
            <div className="relative">
              {/* Main Image */}
              <div className="overflow-hidden shadow-glass hover-lift">
                <img
                  src={coachingSession}
                  alt="Life coaching session in progress"
                  className="w-full h-[600px] object-cover"
                />

                {/* Overlay Cards */}
                <div className="absolute top-6 right-6 glass-card p-4">
                  <div className="text-sm font-medium text-primary">
                    Currently Accepting
                  </div>
                  <div className="text-xs text-muted-foreground">
                    New Clients
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 glass-card p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">150+</div>
                <div className="text-xs text-muted-foreground">
                  Lives Transformed
                </div>
              </div>

              <div className="absolute -top-6 -left-6 glass-card p-4 text-center">
                <div className="text-xl font-bold text-primary mb-1">8+</div>
                <div className="text-xs text-muted-foreground">
                  Years Experience
                </div>
              </div>
            </div>

            {/* Background Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8">My Philosophy</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h4 className="text-xl font-semibold">Authentic Growth</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                True transformation happens when we align our actions with our
                authentic values and vision.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-accent rounded-full"></div>
              </div>
              <h4 className="text-xl font-semibold">
                Collaborative Partnership
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The best outcomes emerge from a partnership where client
                expertise meets professional guidance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h4 className="text-xl font-semibold">Sustainable Change</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Lasting transformation requires building systems and habits that
                support long-term success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
