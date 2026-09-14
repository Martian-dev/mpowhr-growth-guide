import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Linkedin, Instagram } from "lucide-react";
import Logo from "@/components/Logo";
import { useNavBackground } from "@/hooks/use-nav-background";

export interface NavLink {
  label: string;
  href: string;
}

const defaultLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

const Navigation = ({ links = defaultLinks }: { links?: NavLink[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isOverContrastSection } = useNavBackground();

  // Dynamic classes based on whether the nav is over a dark green section
  const navClasses = isOverContrastSection
    ? "bg-background/95 border-primary/20"
    : "bg-primary/95 border-white/20";

  const textClasses = isOverContrastSection
    ? "text-foreground hover:text-primary"
    : "text-white hover:text-nav-hover";

  const mobileMenuClasses = isOverContrastSection
    ? "bg-background/90 border-primary/10"
    : "bg-primary/90 border-white/10";

  const mobileButtonClasses = isOverContrastSection
    ? "text-foreground hover:text-primary hover:bg-primary/10"
    : "text-white hover:text-nav-hover hover:bg-white/10";

  return (
    <nav
      className={`nav-always-visible nav-backdrop border-b transition-all duration-300 w-full ${navClasses}`}
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="w-full px-4 md:px-6 max-w-none">
        <div className="flex items-center justify-between h-14 md:h-16 min-h-[3.5rem] md:min-h-[4rem]">
          {/* Logo - Anchored to left edge */}
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation & Social Icons - Anchored to right edge */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`${textClasses} transition-colors font-medium text-md`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/in/anne-anshumathi-raj-b9b90848/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:text-[#B8941F] transition-colors p-2"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/mpowhr_restart"
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
          <div
            className={`md:hidden border-t ${mobileMenuClasses} absolute top-full left-0 right-0 w-full max-h-[calc(100vh-3.5rem)] overflow-y-auto`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 ${textClasses} font-medium text-lg`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
