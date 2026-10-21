import React from 'react';

/**
 * AnimatedHamburgerButton
 * Fluid micro-animated hamburger button that morphs into a close 'X' icon.
 * Tailored for Aurelia's luxury gold and obsidian mobile navigation.
 */
export default function AnimatedHamburgerButton({
  active = false,
  onClick,
  className = '',
  color = '#e5cb9f',
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? 'Close navigation menu' : 'Open navigation menu'}
      className={`relative h-11 w-11 rounded-full p-2 transition-all duration-300 focus:outline-none flex items-center justify-center hover:bg-white/5 active:scale-95 ${className}`}
    >
      <div className="relative w-6 h-5 flex flex-col justify-between items-center pointer-events-none">
        {/* Top Bar */}
        <span
          style={{ backgroundColor: color }}
          className={`h-[1.5px] w-6 rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
            active
              ? 'translate-y-[9.25px] rotate-45 bg-[#c5a880]'
              : 'translate-y-0 rotate-0'
          }`}
        />

        {/* Middle Bar */}
        <span
          style={{ backgroundColor: color }}
          className={`h-[1.5px] w-6 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active
              ? 'opacity-0 scale-x-0'
              : 'opacity-100 scale-x-100'
          }`}
        />

        {/* Bottom Bar */}
        <span
          style={{ backgroundColor: color }}
          className={`h-[1.5px] w-6 rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
            active
              ? '-translate-y-[9.25px] -rotate-45 bg-[#c5a880]'
              : 'translate-y-0 rotate-0'
          }`}
        />
      </div>
    </button>
  );
}
