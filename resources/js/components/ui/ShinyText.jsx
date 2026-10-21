import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * ShinyText
 * Inspired by React Bits ShinyText.
 * Renders high-end metallic gold light reflections sweeping across typography.
 * In dark theme: crisp gold and bright white shimmer (100% preserved).
 * In light theme: rich bronze and charcoal gold shimmer for high contrast.
 */
export default function ShinyText({
  children,
  className = '',
  shimmerWidth = 100,
  speed = 4,
  inverted = false,
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light' && !inverted;

  return (
    <span
      className={`inline-block bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer-text ${className}`}
      style={{
        animationDuration: `${speed}s`,
        backgroundImage: isLight
          ? 'linear-gradient(90deg, #634720 0%, #1c1917 25%, #8f6a35 50%, #1c1917 75%, #634720 100%)'
          : 'linear-gradient(90deg, #c5a880 0%, #ffffff 25%, #e5cb9f 50%, #c5a880 75%, #ffffff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </span>
  );
}
