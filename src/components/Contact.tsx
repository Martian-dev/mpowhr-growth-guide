import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto section-header-spacing">
          <h2
            className="text-2xl sm:text-[2.5rem] font-normal mb-12 text-center leading-none tracking-wider"
            style={{
              fontFamily: "Vinila, Inter, sans-serif",
              fontStyle: "normal",
              letterSpacing: "0.01em",
              fontWeight: "700",
            }}
          >
            Ready to Begin Your{" "}
            <span
              className="text-gradient"
              style={{
                fontFamily: "Vinila, Inter, sans-serif",
                fontWeight: "700",
              }}
            >
              Transformation?
            </span>
          </h2>
          <p
            className="text-lg text-gray-600 leading-relaxed"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Take the first step towards unlocking your potential. Book a
            complimentary discovery call to explore how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 grid-spacing">
          {/* Contact Form */}
          <div className="content-spacing">
            <div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "Vinila, Inter, sans-serif" }}
              >
                Schedule Your Discovery Call
              </h3>
              <p
                className="text-gray-600 mb-6"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Let's discuss your goals and explore how coaching can accelerate
                your journey.
              </p>
            </div>

            <Card className="card-spacing shadow-[0_4px_20px_hsl(75_35%_25%/_0.08)]">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <Input placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Your last name" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input type="tel" placeholder="+1 (555) 123-4567" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    What brings you here?
                  </label>
                  <Textarea
                    placeholder="Tell me about your current challenges or goals..."
                    rows={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Preferred Session Type
                  </label>
                  <select className="w-full px-3 py-2 bg-background border border-input focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>In-Person Coaching</option>
                    <option>Virtual Coaching</option>
                    <option>HR Consulting</option>
                    <option>Group/Team Sessions</option>
                  </select>
                </div>

                <Button variant="default" size="lg" className="w-full">
                  <Calendar className="w-4 h-4" />
                  Book Your Free Discovery Call
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="content-spacing">
            <div>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "Vinila, Inter, sans-serif" }}
              >
                Get In Touch
              </h3>
              <p
                className="text-gray-600 mb-8"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                I'm here to support your journey. Reach out through any of these
                channels.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <Card className="card-spacing transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_hsl(75_35%_25%/_0.12)] bg-[hsl(40_25%_96%/0.9)] backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_hsl(75_35%_25%/_0.15)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4
                      className="font-semibold"
                      style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                    >
                      Email
                    </h4>
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      sarah@mpowhr.com
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="card-spacing transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_hsl(75_35%_25%/_0.12)] bg-[hsl(40_25%_96%/0.9)] backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_hsl(75_35%_25%/_0.15)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4
                      className="font-semibold"
                      style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                    >
                      Phone
                    </h4>
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="card-spacing transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_hsl(75_35%_25%/_0.12)] bg-[hsl(40_25%_96%/0.9)] backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_hsl(75_35%_25%/_0.15)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4
                      className="font-semibold"
                      style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                    >
                      Location
                    </h4>
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      San Francisco Bay Area
                      <br />
                      Virtual sessions worldwide
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="card-spacing transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_hsl(75_35%_25%/_0.12)] bg-[hsl(40_25%_96%/0.9)] backdrop-blur-lg border border-white/30 shadow-[0_8px_32px_hsl(75_35%_25%/_0.15)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4
                      className="font-semibold"
                      style={{ fontFamily: "Vinila, Inter, sans-serif" }}
                    >
                      Availability
                    </h4>
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Mon-Fri: 9AM-7PM PST
                      <br />
                      Weekends by appointment
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-[hsl(75_20%_85%)] to-[hsl(45_35%_90%)] p-8 text-center">
              <h4
                className="text-xl font-bold mb-4"
                style={{ fontFamily: "Vinila, Inter, sans-serif" }}
              >
                Ready to Start Today?
              </h4>
              <p className="text-foreground/80 mb-6 text-sm">
                Join our community newsletter for weekly insights and exclusive
                resources.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button variant="default">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
