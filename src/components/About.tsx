import { Button } from "@/components/ui/button";
import { Quote, Calendar } from "lucide-react";
import coachingSession from "@/assets/coaching-session.jpg";

const About = () => {
  return (
    <section id="about" className="section-padding bg-section-gradient">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                About <span className="text-gradient">Anne Anshumathi Raj</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Let's be real: life doesn't come with a roadmap, and sometimes
                you just need a safe space to hit the pause button. That's
                exactly what MpowHR is. It’s the place you come to when you need
                to pause, realign, and rise
                <br />
                Hi! I’m Anne, an internationally certified Life Coach and a
                Corporate Trainer. But more than the titles, I see my job as
                being your dedicated guide, helping you find your way through
                the messy, exhilarating, or downright tough transitions that
                life throws at you.
                <br />
                For the last 10+ years, I’ve been coaching individuals and teams
                through everything from massive career shifts and relationship
                reboots to finding clarity after a major life change. I'm
                equipped with 5+ certifications and a decade of hands-on
                experience, but the true measure of my work is watching people
                like you restart with clarity, courage, and choice.
                <br />
                You are the expert of your own life. I’m here to provide the
                framework, the tools, and the unwavering support to help you cut
                through the noise and figure out what you truly want. Whether
                you're feeling lost, ready to pivot, or simply need to build a
                better strategy for your team, I'm here to ensure you rise again
                on your terms.
              </p>
            </div>

            {/* Quote */}
            {/* <div className="glass-card p-6 relative"> */}
            {/*   <Quote className="w-8 h-8 text-primary/30 absolute top-4 left-4" /> */}
            {/*   <blockquote className="italic text-base text-foreground/90 pl-8"> */}
            {/*     "My journey from HR management to life coaching has shown me */}
            {/*     that true organizational success begins with empowered */}
            {/*     individuals. I believe every person has the potential to create */}
            {/*     meaningful change in their life and work." */}
            {/*   </blockquote> */}
            {/*   <cite className="block text-right mt-4 text-sm text-muted-foreground"> */}
            {/*     - Anne Anshumathi Raj, Founder */}
            {/*   </cite> */}
            {/* </div> */}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg">
                <Calendar className="w-4 h-4" />
                Book a Free Consultation
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
            </div>

            {/* Background Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>

        {/* Philosophy Section */}
        {/* <div className="mt-20 text-center max-w-4xl mx-auto"> */}
        {/*   <h3 className="text-3xl font-bold mb-8">My Philosophy</h3> */}
        {/*   <div className="grid md:grid-cols-3 gap-8"> */}
        {/*     <div className="space-y-4"> */}
        {/*       <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto"> */}
        {/*         <div className="w-8 h-8 bg-primary rounded-full"></div> */}
        {/*       </div> */}
        {/*       <h4 className="text-xl font-semibold">Authentic Growth</h4> */}
        {/*       <p className="text-muted-foreground text-sm leading-relaxed"> */}
        {/*         True transformation happens when we align our actions with our */}
        {/*         authentic values and vision. */}
        {/*       </p> */}
        {/*     </div> */}
        {/**/}
        {/*     <div className="space-y-4"> */}
        {/*       <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto"> */}
        {/*         <div className="w-8 h-8 bg-accent rounded-full"></div> */}
        {/*       </div> */}
        {/*       <h4 className="text-xl font-semibold"> */}
        {/*         Collaborative Partnership */}
        {/*       </h4> */}
        {/*       <p className="text-muted-foreground text-sm leading-relaxed"> */}
        {/*         The best outcomes emerge from a partnership where client */}
        {/*         expertise meets professional guidance. */}
        {/*       </p> */}
        {/*     </div> */}
        {/**/}
        {/*     <div className="space-y-4"> */}
        {/*       <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto"> */}
        {/*         <div className="w-8 h-8 bg-primary rounded-full"></div> */}
        {/*       </div> */}
        {/*       <h4 className="text-xl font-semibold">Sustainable Change</h4> */}
        {/*       <p className="text-muted-foreground text-sm leading-relaxed"> */}
        {/*         Lasting transformation requires building systems and habits that */}
        {/*         support long-term success. */}
        {/*       </p> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default About;
