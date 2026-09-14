import { useState, useEffect } from "react";

// Sections marked with `data-nav-contrast` have a dark green background, so the
// navigation switches to its light variant while scrolling over them.
export const useNavBackground = () => {
  const [isOverContrastSection, setIsOverContrastSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navHeight = 80; // Approximate navigation height
      const sections = document.querySelectorAll("[data-nav-contrast]");

      const isOver = Array.from(sections).some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= navHeight && rect.bottom >= navHeight;
      });
      setIsOverContrastSection(isOver);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Check initial state
    handleScroll();

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isOverContrastSection };
};
