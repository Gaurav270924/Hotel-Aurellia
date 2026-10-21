import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * InteractiveHoverButton
 * Inspired by Magic UI interactive-hover-button, tailored to Aurelia's Gold & Obsidian luxury theme.
 */
export default function InteractiveHoverButton({
  children,
  className = '',
  onClick,
  type = 'button',
  icon = <ArrowRight className="w-4 h-4" />,
  variant = 'gold', // 'gold' | 'glass' | 'light'
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const isGold = variant === 'gold';
  const isGlass = variant === 'glass';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`group relative inline-flex flex-shrink-0 whitespace-nowrap cursor-pointer items-center justify-center overflow-hidden rounded-full border px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-500 ease-out shadow-md ${
        isLight
          ? isGlass
            ? 'border-[#8f6a35]/30 bg-white/80 backdrop-blur-md text-[#1c1917] hover:border-[#8f6a35]'
            : 'border-[#b38e5b] bg-[#ffffff] text-[#1c1917] shadow-sm hover:border-[#8f6a35]'
          : isGold
          ? 'border-[#c5a880] bg-[#1a1c22] text-[#faf6ed] hover:border-[#e5cb9f] hover:text-[#090a0b]'
          : 'border-white/30 bg-black/60 text-[#faf6ed] hover:border-white/60 hover:text-[#090a0b]'
      } ${className}`}
    >
      {/* Background fill expansion effect */}
      <span
        className={`absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-out group-hover:translate-y-0 ${
          isGold ? 'bg-gradient-to-r from-[#c5a880] to-[#e5cb9f]' : 'bg-[#f4eee2]'
        }`}
      />

      {/* Default text with left dot */}
      <span className="relative z-10 flex items-center gap-2 transition-transform duration-500 group-hover:-translate-y-8">
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            isLight ? (isGold ? 'bg-[#8f6a35]' : 'bg-[#1c1917]') : (isGold ? 'bg-[#c5a880]' : 'bg-white')
          }`}
        />
        <span
          className={`interactive-btn-label font-medium ${
            isLight ? 'text-[#1c1917] font-semibold' : 'text-[#faf6ed]'
          }`}
          style={{ color: isLight ? '#1c1917' : '#faf6ed' }}
        >
          {children}
        </span>
      </span>

      {/* Hover text + arrow gliding in from below */}
      <span className="absolute z-10 flex items-center gap-2 translate-y-8 transition-transform duration-500 group-hover:translate-y-0 font-semibold tracking-[0.22em] text-[#090a0b]">
        <span>{children}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      </span>
    </button>
  );
}
