import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroCoach from "@/assets/hero-coach.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-section-gradient pt-16 md:pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="container-width relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8 fade-in-up">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 text-sm font-medium text-primary">
              <Star className="w-4 h-4 fill-current" />
              Founded by Anne Anshumathi Raj - Senior HR Manager & Life Coach
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Empower Your
                <span className="text-gradient block">Potential</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Transform your career and organization with expert life coaching and strategic HR management. 
                Unlock growth, build resilience, and achieve lasting success.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                Explore Services
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Clients Transformed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary">8+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center lg:text-left col-span-2 md:col-span-1">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative slide-in-right">
            <div className="relative">
              {/* Glass Card Effect */}
              <div className="absolute inset-4 glass-card"></div>
              
              {/* Main Image */}
              <div className="relative z-10 overflow-hidden shadow-glass hover-lift">
                <img
                  src={heroCoach}
                  alt="Professional life coach and HR consultant"
                  className="w-full h-[600px] object-cover"
                />
                
                {/* Overlay Elements */}
                <div className="absolute top-6 left-6 glass-card p-4">
                  <div className="text-sm font-medium text-primary">Available for Consultation</div>
                  <div className="text-xs text-muted-foreground">Remote & In-Person Sessions</div>
                </div>
                
                <div className="absolute bottom-6 right-6 glass-card p-4 text-center">
                  <div className="text-lg font-bold text-primary">4.9/5</div>
                  <div className="text-xs text-muted-foreground">Client Rating</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full flex items-center justify-center shadow-glass float-animation">
                <Star className="w-8 h-8 text-primary fill-current" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;