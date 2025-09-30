import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ disableAnimation = false, forceShowButton = false }: { disableAnimation?: boolean, forceShowButton?: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Check for skipAnimations param
  const params = new URLSearchParams(location.search);
  const skipAnimations = params.get('skipAnimations') === '1';
  const effectiveDisableAnimation = disableAnimation || skipAnimations;

  const [borderVisible, setBorderVisible] = useState(effectiveDisableAnimation);
  const [logoVisible, setLogoVisible] = useState(effectiveDisableAnimation);
  const [showScrollButton, setShowScrollButton] = useState(forceShowButton || effectiveDisableAnimation);
  const [jiggle, setJiggle] = useState(false);
  const jiggleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (effectiveDisableAnimation) {
      setBorderVisible(true);
      setLogoVisible(true);
      return;
    }
    // Delay border animation by 3400ms
    const borderTimeout = setTimeout(() => {
      setBorderVisible(true);
      // Show logo after border animation
      setTimeout(() => setLogoVisible(true), 300);
    }, 2200);
    return () => clearTimeout(borderTimeout);
  }, [effectiveDisableAnimation]);

  useEffect(() => {
    // Find the Hero section on mount
    heroRef.current = document.querySelector('.hero-section');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let show = false;
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const heroMiddle = rect.top + rect.height / 2;
        show = window.scrollY > heroMiddle;
      }
      setShowScrollButton(show);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jiggle logic
  useEffect(() => {
    if (effectiveDisableAnimation) return;
    if (showScrollButton) {
      // Wait for fade-in before first jiggle
      const fadeTimeout = setTimeout(() => {
        setJiggle(true);
        const jiggleTimeout = setTimeout(() => {
          setJiggle(false);
          jiggleIntervalRef.current = setInterval(() => {
            setJiggle(true);
            setTimeout(() => setJiggle(false), 700); // match jiggle duration
          }, 3000);
        }, 700); // match jiggle duration
        // Clean up both timeouts
        return () => {
          clearTimeout(jiggleTimeout);
        };
      }, 300); // match fade-in duration
      return () => {
        clearTimeout(fadeTimeout);
        if (jiggleIntervalRef.current) clearInterval(jiggleIntervalRef.current);
      };
    } else {
      if (jiggleIntervalRef.current) clearInterval(jiggleIntervalRef.current);
      setJiggle(false);
    }
  }, [showScrollButton, effectiveDisableAnimation]);

  // Logo click handler
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/?skipAnimations=1');
    }
  };

  return (
    <nav className="w-full bg-offwhite h-16 flex items-center justify-between px-6 z-20 relative overflow-hidden sticky top-0">
      {/* Left side (empty for now, can add nav links here) */}
      <div className="w-1/3 flex items-center justify-start">
        {/* Optionally add nav links here in the future */}
      </div>
      {/* Center: Logo */}
      <div className="w-1/3 flex items-center justify-center">
        <a href="/" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img
            src="/oxa-logo.svg"
            alt="OXA Logo"
            className={`h-10 w-auto transition-opacity duration-700 z-20 ${
              logoVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: borderVisible ? '700ms' : '0ms' }}
          />
        </a>
      </div>
      {/* Right: Scroll Button */}
      <div className="w-1/3 flex items-center justify-end">
        <div className="w-[150px] flex justify-end">
          <Button 
            variant="outline" 
            className={`border-charcoal transition-opacity duration-300${jiggle ? ' animate-jiggle' : ''} ${
              showScrollButton
                ? 'opacity-100 pointer-events-auto visible'
                : 'opacity-0 pointer-events-none invisible'
            }`}
            onClick={() => navigate('/free-automation')}
          >
            Free Automation
          </Button>
        </div>
      </div>
      {/* Animated border */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[2px] pointer-events-none z-10 flex justify-center`}
      >
        <div
          className={`h-full bg-charcoal transition-[width,opacity] duration-700 ease-out mx-auto ${
            borderVisible ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`}
          style={{ transitionProperty: 'width, opacity' }}
        />
      </div>
    </nav>
  );
};

export default Navbar; 