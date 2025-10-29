import { Button } from "@/components/ui/button";
import { Quote, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import anne1 from "@/assets/anne.svg";

const About = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="about"
      className="section-padding bg-gradient-to-b from-[hsl(40_25%_96%)] to-[hsl(45_35%_88%)] w-full"
      ref={ref}
    >
      <div className="container-width">
        {/* Title Section - Always on top */}
        <motion.h2
          className="text-2xl sm:text-[2.5rem] font-normal mb-12 text-center leading-tight tracking-wider"
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
          The{" "}
          <span
            className="text-gradient"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: "800",
            }}
          >
            MpowHR
          </span>{" "}
          Story
        </motion.h2>

        <div className="grid lg:grid-cols-2 grid-spacing items-start">
          {/* Left Column - Content */}
          <div className="content-spacing order-2 lg:order-1">
            <div>
              <div className="space-y-6">
                <p
                  className="text-lg text-gray-600 leading-relaxed"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  MpowHR was founded by Anne Anshumathi Raj with a vision that
                  everyone deserves a safe space to pause, unlearn, learn,
                  realign, and rise. She is an Internationally Certified Life
                  Coach and Soft-skills Trainer with over 15 years of hands-on
                  experience.
                </p>

                <div className="space-y-4">
                  <p
                    className="text-lg text-gray-600 leading-relaxed"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    With her experience as:
                  </p>

                  <ul className="space-y-3 text-lg text-gray-600 leading-relaxed ml-4">
                    <li
                      className="flex items-start gap-3"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      <span className="text-primary mt-1">●</span>
                      <span>
                        A Senior People Manager, she bridges the evident gap in
                        Personal and Organisational Behavioural Skills.
                      </span>
                    </li>

                    <li
                      className="flex items-start gap-3"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      <span className="text-primary mt-1">●</span>
                      <span>
                        An Entrepreneur & Leader, she champions the belief that
                        empowered people build powerful businesses.
                      </span>
                    </li>

                    <li
                      className="flex items-start gap-3"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      <span className="text-primary mt-1">●</span>
                      <span>
                        A mother of three, Anne is passionate about working with
                        tender pre-teens and teenagers.
                      </span>
                    </li>
                  </ul>
                </div>

                <p
                  className="text-lg text-gray-600 leading-relaxed"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Anne's expertise lies in facilitating individuals, leaders and
                  teams by identifying the problem, providing the necessary
                  skillset to rise and take decisive action within deadlines
                  independently with clarity and confidence.
                </p>
              </div>
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
          <div className="relative order-1 lg:order-2">
            <div className="relative">
              {/* Main Image */}
              <div className="overflow-hidden shadow-[0_8px_32px_hsl(75_35%_25%/_0.15)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_hsl(75_35%_25%/_0.12)]">
                <img
                  src={anne1}
                  alt="Life coaching session in progress"
                  className="w-full h-[600px] object-cover object-top"
                />
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
