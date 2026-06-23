import React, { useEffect, useRef, useState } from "react";
import { services } from "../lib/services";

const Services = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = services.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...prev, index]);
            observer.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );

      if (cardsRef.current[index]) {
        observer.observe(cardsRef.current[index]!);
      }

      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <section id="services" className="py-24 bg-offwhite">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block font-inter text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-4">
            What we do
          </span>
          <h2 className="font-outfit text-4xl md:text-5xl font-bold text-charcoal">
            Services
          </h2>
          <p className="font-inter text-charcoal/70 mt-4 max-w-xl mx-auto">
            End-to-end development and automation — from first line of code to
            leads landing in your inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                key={index}
                className={`group bg-offwhite border border-charcoal rounded-2xl p-8 lift-on-hover transition-all duration-500 hover:border-charcoal/30 hover:shadow-[0_12px_40px_-12px_rgba(51,53,51,0.25)] ${
                  visibleCards.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-charcoal text-offwhite flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    <Icon className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-outfit text-2xl font-bold text-charcoal mb-2">
                      {service.title}
                    </h3>
                    <p className="font-inter text-charcoal/70 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-2.5 border-t border-charcoal/10 pt-6">
                  {service.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-3 font-inter text-sm text-charcoal/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-charcoal/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
