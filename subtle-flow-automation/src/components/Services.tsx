import React, { useEffect, useRef, useState } from 'react';
import { services } from '../lib/services';

const Services = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = services.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => [...prev, index]);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      if (cardsRef.current[index]) {
        observer.observe(cardsRef.current[index]!);
      }

      return observer;
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <div className="py-24 bg-offwhite">
      <div className="container max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-cal mb-16 text-center">Services</h2>
        
        <div className="flex flex-col gap-6">
          {services.map((service, index) => (
            <div
              ref={el => cardsRef.current[index] = el}
              key={index}
              className={`bg-offwhite border border-charcoal rounded-lg p-8 lift-on-hover transition-all duration-500 ${
                visibleCards.includes(index) ? 'opacity-100' : 'opacity-0 translate-y-10'
              }`}
            >
              <h3 className="font-cal text-xl mb-2 font-bold">{service.title}</h3>
              <p className="font-inter">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
