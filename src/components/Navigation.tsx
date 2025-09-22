import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import mpowhrLogo from "@/assets/mpowhr-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container-width px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={mpowhrLogo}
              alt="MpowHR - People Brilliance"
              className="h-12 md:h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-white hover:text-yellow-400 transition-colors font-medium"
            >
              What We Provide
            </a>
            <a
              href="#about"
              className="text-white hover:text-yellow-400 transition-colors font-medium"
            >
              About
            </a>
            <a
              href="#approach"
              className="text-white hover:text-yellow-400 transition-colors font-medium"
            >
              Approach
            </a>
            <a
              href="#community"
              className="text-white hover:text-yellow-400 transition-colors font-medium"
            >
              Community
            </a>
            <a
              href="#contact"
              className="text-white hover:text-yellow-400 transition-colors font-medium"
            >
              Contact
            </a>
            <Button
              variant="navbar"
              size="lg"
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400 hover:bg-white/10"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className="md:hidden border-t border-white/10"
            style={{ backgroundColor: "#003319" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#services"
                className="block px-3 py-2 text-white hover:text-yellow-400 font-medium"
              >
                What We Provide
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-white hover:text-yellow-400 font-medium"
              >
                About
              </a>
              <a
                href="#approach"
                className="block px-3 py-2 text-white hover:text-yellow-400 font-medium"
              >
                Approach
              </a>
              <a
                href="#community"
                className="block px-3 py-2 text-white hover:text-yellow-400 font-medium"
              >
                Community
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-white hover:text-yellow-400 font-medium"
              >
                Contact
              </a>
              <div className="px-3 py-2">
                <Button variant="navbar" className="w-full">
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
