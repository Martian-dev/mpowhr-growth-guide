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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Begin Your <span className="text-gradient">Transformation?</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Take the first step towards unlocking your potential. Book a complimentary 
            discovery call to explore how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Schedule Your Discovery Call</h3>
              <p className="text-muted-foreground mb-8">
                Let's discuss your goals and explore how coaching can accelerate your journey.
              </p>
            </div>

            <Card className="p-8 shadow-soft">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <Input placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <Input placeholder="Your last name" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input type="tel" placeholder="+1 (555) 123-4567" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">What brings you here?</label>
                  <Textarea 
                    placeholder="Tell me about your current challenges or goals..." 
                    rows={5}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Session Type</label>
                  <select className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
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
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
              <p className="text-muted-foreground mb-8">
                I'm here to support your journey. Reach out through any of these channels.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <Card className="p-6 hover-lift glass-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted-foreground">sarah@mpowhr.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift glass-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift glass-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-muted-foreground">San Francisco Bay Area<br />Virtual sessions worldwide</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-lift glass-card">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Availability</h4>
                    <p className="text-muted-foreground">Mon-Fri: 9AM-7PM PST<br />Weekends by appointment</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="bg-accent-gradient rounded-2xl p-8 text-center">
              <h4 className="text-xl font-bold mb-4">Ready to Start Today?</h4>
              <p className="text-foreground/80 mb-6 text-sm">
                Join our community newsletter for weekly insights and exclusive resources.
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