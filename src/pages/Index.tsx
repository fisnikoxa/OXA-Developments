import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ClientLogos from '@/components/ClientLogos';
import Testimonials from '@/components/Testimonials';
import Services from '@/components/Services';
import Contact from '@/components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-offwhite text-charcoal">
      <Navbar />
      <main>
        <Hero />
        <ClientLogos />
        <Testimonials />
        <Services />
        <Contact />
      </main>
      <footer className="py-8 text-center text-sm font-inter">
        <p>© {new Date().getFullYear()} OXA. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
