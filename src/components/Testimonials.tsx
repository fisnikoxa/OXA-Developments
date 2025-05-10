import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    quote: "They were great to work with.Quick replies, intelligent suggestions, overall great experience.",
    name: "Ben Gavin",
    position: "Account Executive, Fieldwire"
  },
  {
    quote: "We're delighted with the results. They demonstrated a deep understanding of our needs. Communication was excellent. A solution that exceeds our expectations.",
    name: "Sergio Afonso",
    position: "Director, Absolute Translations"
  },
  {
    quote: "Great comms, great work, great responsiveness, quick turnaround, and very reasonable rates, so very good value-for-money.",
    name: "Matthew Stellar",
    position: "Co-Founder, Mbay Mobility"
  }
];

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="py-24 bg-offwhite">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-cal mb-16 text-center">Testimonials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={cn(
                "bg-offwhite border border-charcoal rounded-lg p-8 pb-20 flex flex-col items-center text-center relative transition-all duration-700 min-h-[350px]",
                isVisible ? "opacity-100" : "opacity-0 translate-y-8",
                isVisible && `delay-${index * 200}`
              )}
            >
              <div className="w-16 h-16 rounded-full bg-charcoal mb-6 flex items-center justify-center">
                <span className="text-offwhite text-xl font-cal">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              
              <p className="font-inter mb-6 leading-relaxed">"{testimonial.quote}"</p>
              
              <div className="absolute bottom-8 left-0 w-full flex flex-col items-center">
                <p className="font-inter font-medium">{testimonial.name}</p>
                <p className="font-inter text-sm font-normal">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
