import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function NotFound() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen pt-36 pb-24 px-6 flex items-center justify-center transition-colors duration-500 overflow-x-hidden ${
      isLight ? 'bg-[#f7f5f0] text-[#1c1917]' : 'bg-[#090a0b] text-[#f5f2eb]'
    }`}>
      <div className="max-w-xl text-center space-y-6">
        <div className={`w-16 h-16 mx-auto rounded-full border flex items-center justify-center ${
          isLight ? 'bg-[#c5a880]/15 border-[#c5a880]/40 text-[#8f6a35]' : 'bg-[#c5a880]/10 border-[#c5a880]/30 text-[#c5a880]'
        }`}>
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '20s' }} />
        </div>

        <span className={`text-xs font-mono uppercase tracking-[0.4em] block ${
          isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
        }`}>
          ERROR 404 • UNCHARTED PATH
        </span>

        <h1 className={`font-serif text-3xl sm:text-5xl md:text-6xl font-light ${
          isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
        }`}>
          Sanctuary Not Found.
        </h1>

        <p className={`text-sm sm:text-base font-light leading-relaxed max-w-md mx-auto ${
          isLight ? 'text-[#575249]' : 'text-[#ada79b]'
        }`}>
          The horizon you are seeking does not exist or has been secluded for private retreat. Allow our navigation to guide you home.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="luxury-btn text-xs w-full sm:w-auto">
            <span>Return to Sanctuary</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/contact" className="luxury-btn-outline text-xs w-full sm:w-auto">
            Inquire with Concierge
          </Link>
        </div>
      </div>
    </div>
  );
}
