import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BellToggle from './ui/BellToggle';
import ThemeToggle from './ui/ThemeToggle';
import InteractiveHoverButton from './ui/InteractiveHoverButton';
import ShinyText from './ui/ShinyText';
import AnimatedHamburgerButton from './ui/AnimatedHamburgerButton';
import { useTheme } from '../context/ThemeContext';

export default function Header({ onOpenReservation }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'The Experience', path: '/about' },
    { label: 'Suites & Services', path: '/services' },
    { label: 'Gastronomy', path: '/dining' },
    { label: 'Wellness Spa', path: '/wellness' },
    { label: 'Events & Galas', path: '/events' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'header-scrolled' : 'header-top'
      } ${
        scrolled
          ? isLight
            ? 'bg-[#f7f5f0]/95 border-b border-[#c5a880]/30 py-3.5 shadow-lg shadow-black/5 backdrop-blur-xl'
            : 'glass-nav py-3.5 shadow-2xl shadow-black/80'
          : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent py-5 md:py-6'
      }`}
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-6 xl:px-8 2xl:px-10 flex items-center justify-between">
        {/* Brand / Logo (Anchored to Left Corner) */}
        <Link to="/" className="group flex flex-col items-start select-none no-underline flex-shrink-0">
          <span className={`font-serif text-2xl md:text-3xl tracking-[0.22em] transition-colors duration-300 ${
            scrolled && isLight ? 'text-[#1c1917] group-hover:text-[#8f6a35]' : 'text-[#faf6ed] group-hover:text-[#e5cb9f]'
          }`}>
            <ShinyText speed={5} inverted={!scrolled}>AURELIA</ShinyText>
          </span>
          <span className={`header-brand-sub text-[9px] tracking-[0.38em] uppercase font-semibold pl-[2px] -mt-1 transition-colors duration-300 ${
            scrolled && isLight ? 'text-[#1c1917] group-hover:text-[#8f6a35]' : 'text-[#e5cb9f] group-hover:text-[#ffffff]'
          }`}>
            Resort & Sanctuary
          </span>
        </Link>

        {/* Desktop Navigation with Comfortable Breathing Room */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-6 mx-2 xl:mx-4 flex-shrink min-w-0">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative whitespace-nowrap text-[10px] xl:text-[11px] 2xl:text-[11.5px] uppercase tracking-[0.12em] xl:tracking-[0.16em] transition-all duration-300 font-medium py-1 px-1 header-tab-link ${
                  active
                    ? 'text-[#c5a880] font-semibold'
                    : scrolled && isLight
                    ? 'text-[#1c1917] hover:text-[#8f6a35]'
                    : 'text-[#f5f2eb] hover:text-[#e5cb9f]'
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#c5a880] shadow-[0_0_8px_rgba(197,168,128,0.7)] animate-fadeIn" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions: Theme Toggle, Concierge Bell & Interactive Reserve Button */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 flex-shrink-0 ml-auto lg:ml-2 xl:ml-4">
          <ThemeToggle className="!p-2" />
          <BellToggle />
          {onOpenReservation && (
            <InteractiveHoverButton
              onClick={onOpenReservation}
              variant="gold"
              className="py-1.5 px-3.5 xl:py-2 xl:px-4 text-[9px] xl:text-[9.5px] tracking-[0.14em] shadow-md ml-1"
            >
              Reserve Stay
            </InteractiveHoverButton>
          )}
        </div>

        {/* Mobile Actions & Menu Trigger */}
        <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <BellToggle />
          <AnimatedHamburgerButton
            active={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t mt-3 px-6 py-8 flex flex-col gap-4 text-center animate-fadeIn shadow-2xl max-h-[80vh] overflow-y-auto backdrop-blur-2xl ${
          isLight
            ? 'bg-[#f7f5f0]/98 border-[#c5a880]/30 text-[#1c1917]'
            : 'bg-[#090a0b]/95 border-white/10 text-[#faf6ed]'
        }`}>
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-xs uppercase tracking-[0.25em] py-1.5 transition-colors font-medium ${
                isActive(item.path)
                  ? isLight ? 'text-[#8f6a35] font-bold' : 'text-[#c5a880] font-bold'
                  : isLight ? 'text-[#1c1917] hover:text-[#8f6a35]' : 'text-[#f5f2eb] hover:text-[#c5a880]'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {onOpenReservation && (
            <div className="pt-3 flex justify-center">
              <InteractiveHoverButton
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                variant="gold"
                className="w-full py-3 text-xs tracking-widest uppercase font-semibold"
              >
                Reserve Stay
              </InteractiveHoverButton>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
