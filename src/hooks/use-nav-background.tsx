import { useState, useEffect } from "react";

export const useNavBackground = () => {
  const [isInImagineSection, setIsInImagineSection] = useState(false);
  const [isInTaglineSection, setIsInTaglineSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const imagineSection = document.getElementById("imagine-section");
      const taglineSection = document.getElementById("tagline-section");
      const navHeight = 80; // Approximate navigation height

      // Check if in imagine section
      if (imagineSection) {
        const rect = imagineSection.getBoundingClientRect();
        const isVisible = rect.top <= navHeight && rect.bottom >= navHeight;
        setIsInImagineSection(isVisible);
      }

      // Check if currently in tagline section (not past it)
      if (taglineSection) {
        const rect = taglineSection.getBoundingClientRect();
        // We're in tagline if the top has passed nav but bottom hasn't passed nav yet
        const isInSection = rect.top <= navHeight && rect.bottom >= navHeight;
        setIsInTaglineSection(isInSection);
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Check initial state
    handleScroll();

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isInImagineSection, isInTaglineSection };
};
