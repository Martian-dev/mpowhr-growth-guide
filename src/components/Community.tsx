import { Button } from "@/components/ui/button";
import { Users, Clock, Heart, Star } from "lucide-react";

const Community = () => {
  return (
    <section id="community" className="section-padding bg-accent-gradient">
      <div className="container-width">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our <span className="text-gradient">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collaborative space bringing together professionals from multiple domains to connect, 
            meet, and work on meaningful projects together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Features */}
          <div className="space-y-8 fade-in-up">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cross-Domain Networking</h3>
                  <p className="text-muted-foreground">
                    Connect with professionals from diverse industries and backgrounds, fostering innovation 
                    through collaboration.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Meaningful Projects</h3>
                  <p className="text-muted-foreground">
                    Work together on projects that matter, combining different expertise to create 
                    impactful solutions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Supportive Environment</h3>
                  <p className="text-muted-foreground">
                    A space designed for growth, learning, and mutual support where everyone's 
                    contribution is valued.
                  </p>
                </div>
              </div>
            </div>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold text-lg">Coming Soon</span>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative slide-in-right">
            <div className="glass-card p-8 md:p-12 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">MpowHR Community</h3>
                  <p className="text-muted-foreground mb-6">
                    Be among the first to know when our collaborative community space launches. 
                    Join the waitlist to get exclusive early access.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background/50">
                    <span className="text-sm font-medium">Expected Launch</span>
                    <span className="text-sm text-primary font-semibold">Q2 2025</span>
                  </div>
                  
                  <Button variant="outline" className="w-full" size="lg">
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;