import React, { useState } from 'react';

/**
 * Text3DFlip
 * Inspired by Magic UI text-3d-flip.
 * Staggered 3D character flip animation on hover or entry.
 */
export default function Text3DFlip({
  children,
  className = '',
  flipText,
  staggerDuration = 0.035,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const text = typeof children === 'string' ? children : '';
  const altText = flipText || text;

  const characters = text.split('');

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex flex-wrap cursor-pointer perspective-[1000px] ${className}`}
    >
      {characters.map((char, index) => {
        const altChar = altText[index] || char;
        const delay = `${index * staggerDuration}s`;

        return (
          <span
            key={index}
            className="relative inline-block overflow-hidden [transform-style:preserve-3d]"
          >
            {/* Primary Character */}
            <span
              style={{
                transitionDelay: delay,
                transform: isHovered ? 'rotateX(90deg) translateY(-50%)' : 'rotateX(0deg) translateY(0)',
              }}
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              {char === ' ' ? '\u00A0' : char}
            </span>

            {/* Flipped Secondary Character */}
            <span
              style={{
                transitionDelay: delay,
                transform: isHovered ? 'rotateX(0deg) translateY(0)' : 'rotateX(-90deg) translateY(50%)',
              }}
              className="absolute inset-0 inline-block text-[#e5cb9f] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              {altChar === ' ' ? '\u00A0' : altChar}
            </span>
          </span>
        );
      })}
    </span>
  );
}
