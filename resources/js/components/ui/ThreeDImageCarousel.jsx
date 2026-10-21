import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Eye, Maximize2, Sparkles } from 'lucide-react';

/**
 * ThreeDImageCarousel
 * Inspired by Lightswind UI 3D Image Carousel / Cascade Slider.
 * Provides a 3D depth perspective slider with central active focus,
 * flanking 3D-angled cards, drag/touch gestures, autoplay, and luxury gold styling.
 */
export default function ThreeDImageCarousel({
  items = [],
  autoplay = true,
  autoplayDelay = 4500,
  pauseOnHover = true,
  onImageClick,
  className = '',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);

  const length = items.length;

  const handleNext = useCallback(() => {
    if (length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % length);
  }, [length]);

  const handlePrev = useCallback(() => {
    if (length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  }, [length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Autoplay timer
  useEffect(() => {
    if (!autoplay || length <= 1 || (pauseOnHover && isHovered)) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, pauseOnHover, isHovered, length, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      className={`relative w-full select-none py-6 overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDragging.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 3D Perspective Stage */}
      <div
        className="relative mx-auto h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] max-w-6xl w-full flex items-center justify-center"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {items.map((item, index) => {
          // Calculate modular distance from current active slide
          let diff = (index - currentIndex + length) % length;
          if (diff > length / 2) diff -= length;

          const isCenter = diff === 0;
          const isNext = diff === 1;
          const isPrev = diff === -1;
          const isOuterNext = diff === 2;
          const isOuterPrev = diff === -2;

          let transform = 'translate(-50%, -50%) scale(0.3)';
          let opacity = 0;
          let zIndex = 1;
          let pointerEvents = 'none';

          if (isCenter) {
            transform = 'translate(-50%, -50%) translateZ(80px) scale(1) rotateY(0deg)';
            opacity = 1;
            zIndex = 30;
            pointerEvents = 'auto';
          } else if (isNext) {
            transform = 'translate(10%, -50%) translateZ(-40px) scale(0.82) rotateY(-18deg)';
            opacity = 0.75;
            zIndex = 20;
            pointerEvents = 'auto';
          } else if (isPrev) {
            transform = 'translate(-110%, -50%) translateZ(-40px) scale(0.82) rotateY(18deg)';
            opacity = 0.75;
            zIndex = 20;
            pointerEvents = 'auto';
          } else if (isOuterNext) {
            transform = 'translate(75%, -50%) translateZ(-140px) scale(0.66) rotateY(-28deg)';
            opacity = 0.35;
            zIndex = 10;
            pointerEvents = 'auto';
          } else if (isOuterPrev) {
            transform = 'translate(-175%, -50%) translateZ(-140px) scale(0.66) rotateY(28deg)';
            opacity = 0.35;
            zIndex = 10;
            pointerEvents = 'auto';
          }

          return (
            <div
              key={item.id || index}
              onClick={() => {
                if (isCenter) {
                  if (onImageClick) onImageClick(item, index);
                } else {
                  goToSlide(index);
                }
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform,
                opacity,
                zIndex,
                pointerEvents,
                transition: 'all 0.75s cubic-bezier(0.22, 1, 0.36, 1)',
                transformOrigin: 'center center',
              }}
              className="w-[78%] sm:w-[62%] md:w-[52%] lg:w-[46%] aspect-[16/10] sm:aspect-[16/10.5] rounded-3xl overflow-hidden cursor-pointer shadow-[0_30px_70px_rgba(0,0,0,0.85)] border border-white/10 group will-change-transform"
            >
              {/* Photo Platter */}
              <img
                src={item.media_url || item.image || item.src}
                alt={item.title || 'Aurelia Plate'}
                className="w-full h-full object-cover filter brightness-[0.92] group-hover:brightness-100 transition-all duration-700"
                loading="lazy"
                draggable={false}
              />

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

              {/* Gold Ambient Border on Active Center Slide */}
              {isCenter && (
                <div className="absolute inset-0 rounded-3xl border-2 border-[#c5a880]/60 pointer-events-none shadow-[inset_0_0_24px_rgba(197,168,128,0.2)]" />
              )}

              {/* Top Tags */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#faf6ed] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                  {item.category ? item.category.toUpperCase() : 'SANCTUARY'}
                </span>

                {isCenter && (
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-[#c5a880] px-2.5 py-1 rounded-full bg-[#c5a880]/15 backdrop-blur-md border border-[#c5a880]/40">
                    <Sparkles className="w-2.5 h-2.5" />
                    Featured Plate
                  </span>
                )}
              </div>

              {/* Center Slide Caption Details */}
              <div className={`carousel-image-caption absolute bottom-0 left-0 right-0 p-5 sm:p-7 transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-80'}`}>
                <h3
                  className="font-serif text-lg sm:text-2xl md:text-3xl text-[#faf6ed] leading-snug tracking-tight drop-shadow-md"
                  style={{ color: '#faf6ed', textShadow: '0 2px 12px rgba(0, 0, 0, 0.95)' }}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p
                    className="text-xs sm:text-sm text-[#ada79b] font-light mt-1.5 line-clamp-2 leading-relaxed hidden sm:block"
                    style={{ color: '#e8e2d5', textShadow: '0 1px 8px rgba(0, 0, 0, 0.95)' }}
                  >
                    {item.description}
                  </p>
                )}

                {isCenter && (
                  <div className="mt-3.5 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onImageClick) onImageClick(item, index);
                      }}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a880] text-[#090a0b] text-[11px] font-semibold tracking-wider uppercase hover:bg-[#d8be96] transition-all active:scale-95 shadow-md"
                    >
                      <Maximize2 className="w-3 h-3" />
                      Inspect Full Frame
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-8 right-3 sm:right-8 flex items-center justify-between pointer-events-none z-40">
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="pointer-events-auto p-3 sm:p-3.5 rounded-full bg-black/70 hover:bg-[#c5a880] text-[#e5cb9f] hover:text-[#090a0b] border border-[#c5a880]/30 hover:border-[#c5a880] backdrop-blur-xl transition-all duration-300 shadow-xl active:scale-90"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="pointer-events-auto p-3 sm:p-3.5 rounded-full bg-black/70 hover:bg-[#c5a880] text-[#e5cb9f] hover:text-[#090a0b] border border-[#c5a880]/30 hover:border-[#c5a880] backdrop-blur-xl transition-all duration-300 shadow-xl active:scale-90"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Slide Indicators & Counter */}
      <div className="mt-6 flex flex-col items-center gap-2.5 z-30 relative">
        <div className="flex items-center gap-2">
          {items.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => goToSlide(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                dotIdx === currentIndex
                  ? 'w-8 bg-[#c5a880] shadow-[0_0_10px_rgba(197,168,128,0.7)]'
                  : 'w-2 bg-white/20 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a857b]">
          PLATE 0{currentIndex + 1} / 0{length} • SWIPE OR DRAG TO ROTATE
        </span>
      </div>
    </div>
  );
}
