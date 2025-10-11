import { Button } from "@/components/ui/button";
import { Users, Clock, Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Community = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section
      id="community"
      className="section-padding bg-gradient-to-br from-[hsl(75_20%_85%)] to-[hsl(45_35%_90%)]"
      ref={ref}
    >
      <div className="container-width">
        <div className="text-center section-header-spacing animate-[fadeInUp_0.6s_ease-out_forwards]">
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
            Join Our{" "}
            <span
              className="text-gradient"
              style={{
                fontFamily: "Vinila, Inter, sans-serif",
                fontWeight: "700",
              }}
            >
              Community
            </span>
          </motion.h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            A collaborative space bringing together professionals from multiple
            domains to connect, meet, and work on meaningful projects together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 grid-spacing items-center">
          {/* Left Column - Features */}
          <div className="content-spacing animate-[fadeInUp_0.6s_ease-out_forwards]">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                  >
                    Cross-Domain Networking
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Connect with professionals from diverse industries and
                    backgrounds, fostering innovation through collaboration.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                  >
                    Meaningful Projects
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Work together on projects that matter, combining different
                    expertise to create impactful solutions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                  >
                    Supportive Environment
                  </h3>
                  <p
                    className="text-gray-600"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    A space designed for growth, learning, and mutual support
                    where everyone's contribution is valued.
                  </p>
                </div>
              </div>
            </div>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-50 border border-orange-200">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className="text-orange-600 font-semibold text-lg">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-[slideInRight_0.8s_ease-out_forwards]">
            <div className="bg-[hsl(40_25%_96%/0.9)] backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_hsl(75_35%_25%/_0.15)] p-8 md:p-12 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-10 h-10 text-orange-600" />
                </div>

                <div>
                  <h3
                    className="text-2xl font-bold mb-4 text-orange-700"
                    style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                  >
                    MpowHR Community
                  </h3>
                  <p
                    className="text-gray-600 mb-6"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Be among the first to know when our collaborative community
                    space launches. Join the waitlist to get exclusive early
                    access.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background/50">
                    <span className="text-sm font-medium">Expected Launch</span>
                    <span className="text-sm text-orange-600 font-semibold">
                      Q2 2025
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full bg-gradient-to-r from-orange-200 to-pink-200 hover:from-orange-300 hover:to-pink-300 border-orange-300 text-orange-800 font-semibold transition-all duration-300"
                    size="lg"
                  >
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-200/40 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-pink-200/40 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
