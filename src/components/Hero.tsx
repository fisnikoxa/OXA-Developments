import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Hero = () => {
  const [logoVisible, setLogoVisible] = useState(false);
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [subheadlineVisible, setSubheadlineVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const skipAnimations = params.get('skipAnimations') === '1';
    if (skipAnimations) {
      setHeadlineVisible(true);
      setSubheadlineVisible(true);
      setCtaVisible(true);
      return;
    }
    const timeouts: NodeJS.Timeout[] = [];
    
    // timeouts.push(setTimeout(() => setLogoVisible(true), 3400));
    timeouts.push(setTimeout(() => setHeadlineVisible(true), 700));
    timeouts.push(setTimeout(() => setSubheadlineVisible(true), 1200));
    timeouts.push(setTimeout(() => setCtaVisible(true), 1700));
    
    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, [location.search]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero-section h-screen flex flex-col bg-offwhite relative">
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center px-4">
          <h1 
            className={`font-outfit text-5xl font-bold md:text-7xl mb-8 transition-opacity duration-700 ${
              headlineVisible ? 'opacity-100' : 'opacity-0 translate-y-6'
            }`}
          >
            Automate Your Workflow
          </h1>
          
          
          <h2 
            className={`font-inter font-light text-xl md:text-2xl mb-12 transition-all duration-700 delay-300 ${
              subheadlineVisible ? 'opacity-100' : 'opacity-0 translate-y-6'
            }`}
          >
            One Task At a Time
          </h2>
          
          <button
            onClick={scrollToContact}
            className={`bg-charcoal text-offwhite font-inter px-8 py-3 rounded lift-on-hover transition-all duration-700 delay-500 ${
              ctaVisible ? 'opacity-100' : 'opacity-0'
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
