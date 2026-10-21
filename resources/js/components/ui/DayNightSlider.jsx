import React, { useState, useRef, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * DayNightSlider
 * Interactive Before / After Image Comparison Slider
 * Lets guests compare Daytime Sunlit View vs Night Starlight View.
 */
export default function DayNightSlider({
  dayImage = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
  nightImage = 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80',
  dayLabel = 'Daylight Horizon',
  nightLabel = 'Twilight Radiance',
  className = '',
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative select-none overflow-hidden rounded-3xl border border-[#c5a880]/30 shadow-2xl ${className}`}
    >
      {/* Background (Night Image) */}
      <img
        src={nightImage}
        alt={nightLabel}
        className="h-full w-full object-cover select-none pointer-events-none"
      />
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full bg-black/75 backdrop-blur-md px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#e5cb9f] border border-[#c5a880]/35 shadow-lg">
        <Moon className="w-3.5 h-3.5 text-blue-300" />
        <span style={{ color: '#e5cb9f' }}>{nightLabel}</span>
      </div>

      {/* Foreground (Day Image) clipped by slider percentage */}
      <div
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        className="absolute inset-0 h-full w-full overflow-hidden select-none pointer-events-none"
      >
        <img
          src={dayImage}
          alt={dayLabel}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full bg-black/75 backdrop-blur-md px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#faf6ed] border border-[#c5a880]/35 shadow-lg">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span style={{ color: '#faf6ed' }}>{dayLabel}</span>
        </div>
      </div>

      {/* Vertical Divider Line */}
      <div
        style={{ left: `${sliderPosition}%` }}
        className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#c5a880] to-transparent z-30 cursor-ew-resize -translate-x-1/2"
      >
        {/* Handle Knob */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 h-10 w-10 rounded-full bg-[#121316] border-2 border-[#c5a880] flex items-center justify-center shadow-xl cursor-ew-resize hover:scale-110 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-1">
            <span className="w-0.5 h-3 bg-[#c5a880] rounded-full" />
            <span className="w-0.5 h-3 bg-[#c5a880] rounded-full" />
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/70 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          Drag to compare day & night ambiance
        </span>
      </div>
    </div>
  );
}
