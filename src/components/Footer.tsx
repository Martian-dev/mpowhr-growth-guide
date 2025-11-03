import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";

// WhatsApp SVG Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.406 3.488" />
  </svg>
);

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
                }}
              >
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #8B6914 0%, #D4AF37 25%, #FFD700 50%, #D4AF37 75%, #8B6914 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  MpowHR
                </span>
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                You were built for More Power. We don't just coach—we install
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
                <WhatsAppIcon className="w-4 h-4 text-gradient" />
                <span className="text-primary-foreground/80 text-sm">
                  +91 76038 92152 / +91 98410 56444 (Alt)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gradient" />
                <span className="text-primary-foreground/80 text-sm">
                  East Coast Road, Injambakkam, Chennai - 600115
                </span>
              </li>
            </ul>

            {/* Map Section */}
            <div className="mt-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3888.493926926849!2d80.25052237507587!3d12.940214887372269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDU2JzI0LjgiTiA4MMKwMTUnMTEuMiJF!5e0!3m2!1sen!2sin!4v1762181402625!5m2!1sen!2sin"
                  width="100%"
                  height="200"
                  className="border-0 rounded-lg"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MpowHR Location Map"
                />
              </div>
            </div>

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
                  href="https://drive.google.com/file/d/1y0L0CPJ2tNnlVU04JrDCvrvRiJmuOQB3/view?usp=sharing"
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
