import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  Award,
  Shield,
  Star,
  CheckCircle,
} from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container-width section-padding">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Mpow<span className="text-gradient">HR</span>
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Empowering individuals and organizations to unlock their full
                potential through expert life coaching and strategic HR
                management.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gradient" />
                <span className="text-primary-foreground/80 text-sm">
                  anne@mpowhrglobal.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gradient" />
                <span className="text-primary-foreground/80 text-sm">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gradient" />
                <span className="text-primary-foreground/80 text-sm">
                  India
                </span>
              </li>
            </ul>
          </div>

          {/* Certificate Badges */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Certifications</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                <Award className="w-8 h-8 text-accent mb-2" />
                <span className="text-xs text-primary-foreground/80">
                  Certified Life Coach
                </span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                <Shield className="w-8 h-8 text-accent mb-2" />
                <span className="text-xs text-primary-foreground/80">
                  HR Professional
                </span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                <Star className="w-8 h-8 text-accent mb-2" />
                <span className="text-xs text-primary-foreground/80">
                  Leadership Expert
                </span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                <CheckCircle className="w-8 h-8 text-accent mb-2" />
                <span className="text-xs text-primary-foreground/80">
                  Certified Coach
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2025 MpowHR. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="/privacy"
              className="text-primary-foreground/60 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-primary-foreground/60 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/cookies"
              className="text-primary-foreground/60 hover:text-white transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
