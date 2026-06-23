import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeroAnimation from "./HeroAnimation";

const Hero = () => {
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [subheadlineVisible, setSubheadlineVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(false);
  const location = useLocation();

  const skipAnimations =
    new URLSearchParams(location.search).get("skipAnimations") === "1";

  useEffect(() => {
    if (skipAnimations) {
      setHeadlineVisible(true);
      setSubheadlineVisible(true);
      setCtaVisible(true);
      setAnimationVisible(true);
      return;
    }
    const timeouts: NodeJS.Timeout[] = [];

    timeouts.push(setTimeout(() => setHeadlineVisible(true), 700));
    timeouts.push(setTimeout(() => setSubheadlineVisible(true), 1200));
    timeouts.push(setTimeout(() => setCtaVisible(true), 1700));
    // Windows appear AFTER the header, subheader, and button have loaded
    timeouts.push(setTimeout(() => setAnimationVisible(true), 2400));

    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, [skipAnimations]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hero-section h-screen flex flex-col bg-offwhite relative overflow-hidden">
      {/* Floating windows + cursors layer (gated on animationVisible) */}
      <HeroAnimation visible={animationVisible} skip={skipAnimations} />

      {/* Centered text — sits above the floating layer */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="text-center px-4">
          <h1
            className={`font-outfit text-5xl font-bold md:text-7xl mb-8 transition-opacity duration-700 ${
              headlineVisible ? "opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            Automate Your Workflow
          </h1>

          <h2
            className={`font-inter font-light text-xl md:text-2xl mb-12 transition-all duration-700 delay-300 ${
              subheadlineVisible ? "opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            One Task At a Time
          </h2>

          <button
            onClick={scrollToContact}
            className={`bg-charcoal text-offwhite font-inter px-8 py-3 rounded lift-on-hover transition-all duration-700 delay-500 ${
              ctaVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Let's Talk
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
