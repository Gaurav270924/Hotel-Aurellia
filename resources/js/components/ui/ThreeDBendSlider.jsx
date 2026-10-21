import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Anchor, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * ThreeDBendSlider
 * Inspired by Lightswind UI 3D Bend Carousel / Perspective Slider.
 * Showcases maritime fleet and offshore experiences in a 3D curved arc
 * with touch/drag support, smooth perspective transitions, and fleet specifications.
 */
export default function ThreeDBendSlider({
  items = [],
  className = '',
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const length = items.length;

  const handleNext = useCallback(() => {
    if (length === 0) return;
    setActiveIndex((prev) => (prev + 1) % length);
  }, [length]);

  const handlePrev = useCallback(() => {
    if (length === 0) return;
    setActiveIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  // Touch and drag handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const endX = e.changedTouches[0].clientX;
    const diff = startXRef.current - endX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = startXRef.current - e.clientX;
    if (diff > 60) handleNext();
    else if (diff < -60) handlePrev();
  };

  if (!items || length === 0) return null;

  return (
    <div
      className={`relative w-full py-4 select-none ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* 3D Curved Perspective Stage */}
      <div
        className="relative mx-auto h-[420px] sm:h-[450px] w-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
      >
        {items.map((item, index) => {
          let diff = (index - activeIndex + length) % length;
          if (diff > length / 2) diff -= length;

          const isCenter = diff === 0;
          const isLeft = diff === -1;
          const isRight = diff === 1;

          let transform = 'translateX(-50%) translateY(-50%) scale(0.4)';
          let opacity = 0;
          let zIndex = 1;
          let pointerEvents = 'none';

          if (isCenter) {
            transform = 'translateX(-50%) translateY(-50%) translateZ(40px) scale(1) rotateY(0deg)';
            opacity = 1;
            zIndex = 30;
            pointerEvents = 'auto';
          } else if (isLeft) {
            transform = 'translateX(-115%) translateY(-50%) translateZ(-60px) scale(0.82) rotateY(16deg)';
            opacity = 0.65;
            zIndex = 20;
            pointerEvents = 'auto';
          } else if (isRight) {
            transform = 'translateX(15%) translateY(-50%) translateZ(-60px) scale(0.82) rotateY(-16deg)';
            opacity = 0.65;
            zIndex = 20;
            pointerEvents = 'auto';
          }

          return (
            <div
              key={item.id || index}
              onClick={() => {
                if (!isCenter) setActiveIndex(index);
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform,
                opacity,
                zIndex,
                pointerEvents,
                transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className={`w-[85%] sm:w-[68%] md:w-[62%] h-[380px] sm:h-[410px] rounded-2xl overflow-hidden bg-[#13151a] border transition-all duration-300 group ${
                isCenter
                  ? 'border-[#c5a880]/60 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(197,168,128,0.15)]'
                  : 'border-white/10 shadow-xl'
              }`}
            >
              {/* Image Platter */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover filter brightness-[0.92] group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13151a] via-transparent to-black/60" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#faf6ed] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                    {item.vessel || 'FLEET'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-[#c5a880] px-2.5 py-1 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/30 backdrop-blur-md">
                    <Anchor className="w-2.5 h-2.5" />
                    {item.speed || 'MARITIME LUXURY'}
                  </span>
                </div>
              </div>

              {/* Specs & Description */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#c5a880] block mb-1">
                    {item.category || 'EXPEDITION VOYAGE'}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#faf6ed] group-hover:text-[#e5cb9f] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#ada79b] font-light mt-1.5 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#8a857b]">
                  <span className="font-mono">{item.capacity || 'Up to 8 Guests'}</span>
                  <span className="text-[#c5a880] font-mono font-medium">{item.duration || 'Private Half-Day & Full-Day'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="mt-4 flex items-center justify-between max-w-sm mx-auto px-4">
        <button
          onClick={handlePrev}
          aria-label="Previous Vessel"
          className={`p-2.5 rounded-full transition-all cursor-pointer ${
            isLight
              ? 'bg-white hover:bg-[#8f6a35] text-[#1c1917] hover:text-white border border-[#c5a880]/30 shadow-md'
              : 'bg-black/60 hover:bg-[#c5a880] text-[#ada79b] hover:text-[#090a0b] border border-white/10 hover:border-[#c5a880]'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              aria-label={`Go to vessel ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === activeIndex
                  ? isLight
                    ? 'w-7 bg-[#8f6a35] shadow-md shadow-[#8f6a35]/40'
                    : 'w-6 bg-[#c5a880] shadow-[0_0_8px_rgba(197,168,128,0.7)]'
                  : isLight
                  ? 'w-2 bg-[#8f6a35]/40 hover:bg-[#8f6a35]/80 border border-[#8f6a35]/30'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next Vessel"
          className={`p-2.5 rounded-full transition-all cursor-pointer ${
            isLight
              ? 'bg-white hover:bg-[#8f6a35] text-[#1c1917] hover:text-white border border-[#c5a880]/30 shadow-md'
              : 'bg-black/60 hover:bg-[#c5a880] text-[#ada79b] hover:text-[#090a0b] border border-white/10 hover:border-[#c5a880]'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
