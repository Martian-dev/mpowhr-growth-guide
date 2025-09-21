import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-width section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                mpow<span className="text-accent">HR</span>
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed max-w-md">
                Empowering individuals and organizations to unlock their full potential through 
                expert life coaching and strategic HR management.
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button variant="glass" size="icon">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="glass" size="icon">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="glass" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-primary-foreground/80 hover:text-white transition-colors">Life Coaching</a></li>
              <li><a href="#services" className="text-primary-foreground/80 hover:text-white transition-colors">HR Consulting</a></li>
              <li><a href="#services" className="text-primary-foreground/80 hover:text-white transition-colors">Leadership Development</a></li>
              <li><a href="#services" className="text-primary-foreground/80 hover:text-white transition-colors">Team Building</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">sarah@mpowhr.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/80 text-sm">San Francisco Bay Area</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 mpowHR. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-primary-foreground/60 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-primary-foreground/60 hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookies" className="text-primary-foreground/60 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;