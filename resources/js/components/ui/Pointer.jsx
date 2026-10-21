import React, { useState, useRef } from 'react';

/**
 * Pointer
 * Inspired by Magic UI Pointer.
 * Tracks mouse position within its container and renders a floating custom cursor/badge.
 */
export default function Pointer({
  children,
  badge = 'Explore',
  className = '',
  contentClassName = '',
  icon,
}) {
  const [isInside, setIsInside] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
    >
      {children}

      {/* Floating Pointer / Cursor Badge */}
      {isInside && (
        <div
          style={{
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          }}
          className={`pointer-events-none absolute top-0 left-0 z-40 flex items-center gap-2 rounded-full px-3.5 py-1.5 shadow-xl transition-transform duration-75 ease-out backdrop-blur-md bg-[#090a0b]/85 border border-[#c5a880]/50 text-[#f5f2eb] ${contentClassName}`}
        >
          {icon ? (
            icon
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-[#c5a880] animate-pulse" />
          )}
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium whitespace-nowrap">
            {badge}
          </span>
        </div>
      )}
    </div>
  );
}
