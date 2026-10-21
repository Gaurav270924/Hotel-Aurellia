import React, { useState } from 'react';
import { Wine, ChevronRight, ChevronLeft, Sparkles, Utensils } from 'lucide-react';

/**
 * ThreeDCardStack
 * Inspired by Lightswind UI Card Stack / 3D Perspective Stack.
 * Renders an interactive 3D stacked deck of culinary tasting plates that
 * users can swipe, click through, or navigate with directional controls.
 */
export default function ThreeDCardStack({
  items = [],
  className = '',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = React.useRef(0);

  const length = items.length;

  const handleNext = () => {
    if (length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const handlePrev = () => {
    if (length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  // Drag handlers
  const onMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - startXRef.current);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 70) handlePrev();
    else if (dragOffset < -70) handleNext();
    setDragOffset(0);
  };

  // Touch handlers
  const onTouchStart = (e) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.touches[0].clientX - startXRef.current);
  };

  const onTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 60) handlePrev();
    else if (dragOffset < -60) handleNext();
    setDragOffset(0);
  };

  if (!items || length === 0) return null;

  return (
    <div className={`relative w-full select-none ${className}`}>
      {/* 3D Perspective Card Stage */}
      <div
        className="relative mx-auto h-[440px] sm:h-[480px] w-full max-w-md flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ perspective: '1000px' }}
      >
        {items.map((item, index) => {
          // Modular offset from current top card
          const position = (index - currentIndex + length) % length;

          // Only render top 3 cards in the stack for performance & clean depth
          if (position > 2 && position < length - 1) return null;

          const isTop = position === 0;
          const isSecond = position === 1;
          const isThird = position === 2;

          let translateY = position * 18;
          let scale = 1 - position * 0.06;
          let opacity = 1 - position * 0.18;
          let zIndex = 30 - position * 10;
          let rotateZ = position === 1 ? 2.5 : position === 2 ? -2.5 : 0;
          let translateX = 0;

          if (isTop && isDragging) {
            translateX = dragOffset;
            rotateZ = dragOffset * 0.05;
          }

          return (
            <div
              key={item.id || index}
              onClick={() => {
                if (!isTop) handleNext();
              }}
              style={{
                transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotateZ(${rotateZ}deg)`,
                opacity,
                zIndex,
                transition: isDragging && isTop ? 'none' : 'all 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
              className="absolute inset-0 rounded-2xl overflow-hidden bg-[#14161b] border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between group hover:border-[#c5a880]/50"
            >
              {/* Dish Visual Header */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-black/60">
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover filter brightness-[0.92] group-hover:brightness-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14161b] via-transparent to-black/60" />

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#faf6ed] px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
                    {item.course}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-[#c5a880] px-2.5 py-1 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/30 backdrop-blur-md">
                    <Sparkles className="w-2.5 h-2.5" />
                    {item.tag || 'MICHELIN 3★'}
                  </span>
                </div>
              </div>

              {/* Dish Content Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#faf6ed] group-hover:text-[#e5cb9f] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#ada79b] font-light mt-2 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Sommelier Pairing Highlight Bar */}
                {item.pairing && (
                  <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center flex-shrink-0">
                        <Wine className="w-3.5 h-3.5 text-[#c5a880]" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[8px] uppercase font-mono tracking-widest text-[#8a857b] block">
                          GRAND CRU CELLAR PAIRING
                        </span>
                        <span className="font-serif text-xs text-[#faf6ed] italic truncate block">
                          {item.pairing}
                        </span>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex-shrink-0">
                      Paired
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stack Controls & Progress */}
      <div className="mt-5 flex items-center justify-between max-w-md mx-auto px-2">
        <div className="flex items-center gap-1.5">
          {items.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to course ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === currentIndex
                  ? 'w-6 bg-[#c5a880] shadow-[0_0_8px_rgba(197,168,128,0.7)]'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            aria-label="Previous Course"
            className="p-2 rounded-full bg-[#181a20] hover:bg-[#c5a880] text-[#ada79b] hover:text-[#090a0b] border border-white/10 hover:border-[#c5a880] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-[10px] text-[#c5a880] uppercase tracking-widest">
            {currentIndex + 1} / {length}
          </span>
          <button
            onClick={handleNext}
            aria-label="Next Course"
            className="p-2 rounded-full bg-[#181a20] hover:bg-[#c5a880] text-[#ada79b] hover:text-[#090a0b] border border-white/10 hover:border-[#c5a880] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
