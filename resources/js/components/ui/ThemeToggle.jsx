import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * ThemeToggle
 * Inspired by Lightswind UI theme toggle.
 * Switches between Luxury Noir (Dark) and Mediterranean Alabaster (Light) themes.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      className={`relative p-2.5 rounded-full transition-all duration-300 focus:outline-none group ${
        isDark
          ? 'bg-white/5 hover:bg-[#c5a880]/15 border border-white/10 hover:border-[#c5a880]/50 text-[#e5cb9f] hover:text-white'
          : 'bg-[#18191c]/5 hover:bg-[#c5a880]/20 border border-[#c5a880]/30 hover:border-[#c5a880] text-[#8c7352] hover:text-[#1c1917]'
      } ${className}`}
    >
      <div className="relative w-4.5 h-4.5 flex items-center justify-center">
        {/* Sun Icon (shown when dark to switch to light) */}
        <Sun
          className={`w-4 h-4 md:w-4.5 md:h-4.5 transition-all duration-500 transform ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : 'rotate-90 scale-0 opacity-0 absolute'
          }`}
        />

        {/* Moon Icon (shown when light to switch to dark) */}
        <Moon
          className={`w-4 h-4 md:w-4.5 md:h-4.5 transition-all duration-500 transform ${
            !isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0 absolute'
          }`}
        />
      </div>
    </button>
  );
}
