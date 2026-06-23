import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ disableAnimation = false }: { disableAnimation?: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const skipAnimations = params.get('skipAnimations') === '1';
  const effectiveDisableAnimation = disableAnimation || skipAnimations;

  const [borderVisible, setBorderVisible] = useState(effectiveDisableAnimation);
  const [logoVisible, setLogoVisible] = useState(effectiveDisableAnimation);

  useEffect(() => {
    if (effectiveDisableAnimation) {
      setBorderVisible(true);
      setLogoVisible(true);
      return;
    }
    const borderTimeout = setTimeout(() => {
      setBorderVisible(true);
      setTimeout(() => setLogoVisible(true), 300);
    }, 2200);
    return () => clearTimeout(borderTimeout);
  }, [effectiveDisableAnimation]);

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
      <div className="w-1/3 flex items-center justify-start" />
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
      <div className="w-1/3 flex items-center justify-end" />
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
