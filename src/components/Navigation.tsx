import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Linkedin, Instagram, Twitter } from "lucide-react";
import Logo from "@/components/Logo";
import { useNavBackground } from "@/hooks/use-nav-background";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isInImagineSection, isInTaglineSection } = useNavBackground();

  // Dynamic classes based on section - prioritize imagine section, then tagline
  const navClasses = isInImagineSection
    ? "bg-background/95 border-primary/20"
    : isInTaglineSection
    ? "bg-background/95 border-primary/20"
    : "bg-primary/95 border-white/20";

  const textClasses = isInImagineSection
    ? "text-foreground hover:text-primary"
    : isInTaglineSection
    ? "text-foreground hover:text-primary"
    : "text-white hover:text-nav-hover";

  const mobileMenuClasses = isInImagineSection
    ? "bg-background/90 border-primary/10"
    : isInTaglineSection
    ? "bg-background/90 border-primary/10"
    : "bg-primary/90 border-white/10";

  const mobileButtonClasses = isInImagineSection
    ? "text-foreground hover:text-primary hover:bg-primary/10"
    : isInTaglineSection
    ? "text-foreground hover:text-primary hover:bg-primary/10"
    : "text-white hover:text-nav-hover hover:bg-white/10";

  return (
    <nav
      className={`top-0 left-0 right-0 z-50 backdrop-blur-md border-b sticky transition-all duration-300 ${navClasses}`}
    >
      <div className="w-full px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo - Anchored to left edge */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation & Social Icons - Anchored to right edge */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              <a
                href="#about"
                className={`${textClasses} transition-colors font-medium text-md`}
              >
                About
              </a>
              <a
                href="#services"
                className={`${textClasses} transition-colors font-medium text-md`}
              >
                Services
              </a>
              <a
                href="#approach"
                className={`${textClasses} transition-colors font-medium text-md`}
              >
                Approach
              </a>
              <a
                href="#contact"
                className={`${textClasses} transition-colors font-medium text-md`}
              >
                Contact
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:text-[#B8941F] transition-colors p-2"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:text-[#B8941F] transition-colors p-2"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className={mobileButtonClasses}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden border-t ${mobileMenuClasses}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#services"
                className={`block px-3 py-2 ${textClasses} font-medium text-lg`}
              >
                What We Provide
              </a>
              <a
                href="#about"
                className={`block px-3 py-2 ${textClasses} font-medium text-lg`}
              >
                About
              </a>
              <a
                href="#approach"
                className={`block px-3 py-2 ${textClasses} font-medium text-lg`}
              >
                Approach
              </a>
              <a
                href="#contact"
                className={`block px-3 py-2 ${textClasses} font-medium text-lg`}
              >
                Contact
              </a>
              {/* Mobile Social Icons */}
              <div className="flex items-center justify-center space-x-6 pt-4 pb-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:text-[#B8941F] transition-colors p-2"
                >
                  <Linkedin className="w-8 h-8" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:text-[#B8941F] transition-colors p-2"
                >
                  <Instagram className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
