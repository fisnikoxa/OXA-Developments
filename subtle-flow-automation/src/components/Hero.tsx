import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [logoVisible, setLogoVisible] = useState(false);
  const [headlineVisible, setHeadlineVisible] = useState(false);
  const [subheadlineVisible, setSubheadlineVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    timeouts.push(setTimeout(() => setLogoVisible(true), 4000));
    timeouts.push(setTimeout(() => setHeadlineVisible(true), 700));
    timeouts.push(setTimeout(() => setSubheadlineVisible(true), 1500));
    timeouts.push(setTimeout(() => setCtaVisible(true), 2300));
    
    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-screen flex flex-col bg-offwhite relative">
      <div className="w-full py-5 flex justify-center items-center bg-transparent absolute top-0 left-0 z-10">
        <img src="/OXA logo vector.svg" alt="OXA Logo" className={`h-12 w-auto transition-opacity duration-700 ${logoVisible ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center px-4">
          <h1 
            className={`font-cal text-5xl font-bold md:text-7xl mb-8 transition-opacity duration-700 ${
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
