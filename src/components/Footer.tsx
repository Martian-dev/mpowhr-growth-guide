import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";

// Import footer banner image
import footerBanner from "@/assets/footerbanner.png";

// Import certificate images (original versions with backgrounds)
import gecCert from "@/assets/mpowhr_certificates/GECCert.png";
import cpdCert from "@/assets/mpowhr_certificates/cpdCert.png";
import isoCert from "@/assets/mpowhr_certificates/isoCert.png";
import proTouchCert from "@/assets/mpowhr_certificates/proTouchCert.png";
import shrmCert from "@/assets/mpowhr_certificates/shrmCert.png";
import hrciCert from "@/assets/mpowhr_certificates/hrciCert.png";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="relative bg-primary text-primary-foreground w-full"
      style={{
        backgroundImage: `url(${footerBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Translucent overlay to maintain current colors while showing background image */}
      <div className="absolute inset-0 bg-primary/85 backdrop-blur-[1px]"></div>

      {/* Content with relative positioning to appear above overlay */}
      <div className="relative z-10 max-w-full mx-auto section-padding px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3
                className="text-3xl font-bold mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background:
                    "linear-gradient(135deg, #B8941F 0%, #8B7A1A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                MpowHR
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                You were built for more power. We don't just coach—we install
                the mental operating system of a high-performer. By dissolving
                limiting beliefs and structuring crystal-clear individual and
                organizational goals, we ensure you effortlessly operate at the
                level of success you deserve.
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
                  +91 76038 92152{" "}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gradient" />
                <span className="text-primary-foreground/80 text-sm text-gray-400">
                  +91 98410 56444 (Alternative Number)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gradient" />
                <span className="text-primary-foreground/80 text-sm">
                  East Coast Road, Injambakkam, Chennai - 600115
                </span>
              </li>
            </ul>

            {/* Social Icons - Mobile Only */}
            <div className="lg:hidden mt-6">
              <h5 className="text-lg font-semibold mb-4">Follow Us</h5>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/anne-anshumathi-raj-b9b90848/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:text-[#B8941F] transition-colors p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/mpowhr_restart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:text-[#B8941F] transition-colors p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Certificate Badges */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Certifications</h4>
            <div className="space-y-4">
              {/* Main certificates grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 max-w-md">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 hover:bg-white/20 transition-all duration-300">
                  <img
                    src={gecCert}
                    alt="GEC Certification"
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 hover:bg-white/20 transition-all duration-300">
                  <img
                    src={cpdCert}
                    alt="CPD Certification"
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 hover:bg-white/20 transition-all duration-300">
                  <img
                    src={isoCert}
                    alt="ISO Certification"
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 hover:bg-white/20 transition-all duration-300">
                  <img
                    src={proTouchCert}
                    alt="ProTouch Certification"
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 hover:bg-white/20 transition-all duration-300">
                  <img
                    src={shrmCert}
                    alt="SHRM Certification"
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 hover:bg-white/20 transition-all duration-300">
                  <img
                    src={hrciCert}
                    alt="HRCI Certification"
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
              </div>

              {/* View more certificates link */}
              <div className="mt-3 flex justify-end pb-2 max-w-md">
                <a
                  href="https://drive.google.com/file/d/1XDdTDGoSp40j4k3Y8uFJ7jCxzZIZqNFo/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-white transition-colors text-sm underline underline-offset-2"
                >
                  View more Certificates
                </a>
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

        {/* Credits */}
        <div className="flex justify-center md:justify-end pt-4">
          <p className="text-primary-foreground/50 text-xs">
            Designed and Developed by{" "}
            <a
              href="https://theeagleseye.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/70 hover:text-white transition-colors underline"
            >
              The Eagle Eye
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
