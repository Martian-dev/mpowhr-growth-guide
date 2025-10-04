import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import mpowhrLogo from "@/assets/mpowhr-logo-noBG.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-white/20 sticky">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center overflow-hidden h-12 m:h-16 w-40">
            <img
              src={mpowhrLogo}
              alt="MpowHR - People Brilliance"
              className="h-28 m:h-36 object-fit w-full"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-white hover:text-nav-hover transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#services"
              className="text-white hover:text-nav-hover transition-colors font-medium"
            >
              Services
            </a>
            <a
              href="#approach"
              className="text-white hover:text-nav-hover transition-colors font-medium"
            >
              Approach
            </a>
            <a
              href="#community"
              className="text-white hover:text-nav-hover transition-colors font-medium"
            >
              Community
            </a>
            <a href="#contact">
              <Button variant="navbar" size="lg" className="rounded-xl">
                Book Consultation
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-nav-hover hover:bg-white/10"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10 bg-primary/90">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#services"
                className="block px-3 py-2 text-white hover:text-nav-hover font-medium"
              >
                What We Provide
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-white hover:text-nav-hover font-medium"
              >
                About
              </a>
              <a
                href="#approach"
                className="block px-3 py-2 text-white hover:text-nav-hover font-medium"
              >
                Approach
              </a>
              <a
                href="#community"
                className="block px-3 py-2 text-white hover:text-nav-hover font-medium"
              >
                Community
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-white hover:text-nav-hover font-medium"
              >
                Contact
              </a>
              <div className="px-3 py-2 rounded-xl">
                <Button variant="navbar" className="w-full rounded-xl">
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
