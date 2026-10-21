import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, RotateCw, Hand, Eye } from 'lucide-react';

/**
 * ThreeDImageRing
 * Inspired by Lightswind UI 3D Image Ring component.
 * Arranges image cards in an interactive 3D circular ring with continuous auto-rotation,
 * drag/touch gestures, depth lighting, and click-to-focus capabilities.
 */
export default function ThreeDImageRing({
  items = [],
  radius = 260,
  autoRotate = true,
  autoRotateSpeed = 0.25,
  pauseOnHover = true,
  className = '',
  onItemClick,
}) {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [effectiveRadius, setEffectiveRadius] = useState(radius);

  const angleRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);
  const animFrameRef = useRef(null);
  const containerRef = useRef(null);

  // Responsive radius calculation for flawless mobile rendering
  useEffect(() => {
    const updateRadius = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 480) {
          setEffectiveRadius(Math.min(radius, 155));
        } else if (window.innerWidth < 768) {
          setEffectiveRadius(Math.min(radius, 195));
        } else {
          setEffectiveRadius(radius);
        }
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, [radius]);

  const total = items.length;
  const anglePerItem = total > 0 ? 360 / total : 0;

  // Sync angleRef with state
  useEffect(() => {
    angleRef.current = currentAngle;
  }, [currentAngle]);

  // Determine which card is currently closest to the front
  useEffect(() => {
    if (total === 0) return;
    const normalized = ((-currentAngle % 360) + 360) % 360;
    const closestIdx = Math.round(normalized / anglePerItem) % total;
    setActiveCardIndex(closestIdx);
  }, [currentAngle, anglePerItem, total]);

  // Continuous Auto-rotation loop
  useEffect(() => {
    if (!autoRotate) return;

    let lastTime = performance.now();

    const loop = (time) => {
      const delta = (time - lastTime) / 16.67; // Normalize to ~60fps
      lastTime = time;

      if (!isDraggingRef.current && (!pauseOnHover || !isHovered)) {
        angleRef.current = (angleRef.current + autoRotateSpeed * delta) % 360;
        setCurrentAngle(angleRef.current);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [autoRotate, autoRotateSpeed, pauseOnHover, isHovered]);

  // Drag Handlers (Desktop Mouse)
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = angleRef.current;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    const sensitivity = 0.35;
    const nextAngle = (dragStartAngleRef.current + deltaX * sensitivity) % 360;
    angleRef.current = nextAngle;
    setCurrentAngle(nextAngle);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch Handlers (Mobile / Tablet)
  const handleTouchStart = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartAngleRef.current = angleRef.current;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.touches[0].clientX - dragStartXRef.current;
    const sensitivity = 0.45;
    const nextAngle = (dragStartAngleRef.current + deltaX * sensitivity) % 360;
    angleRef.current = nextAngle;
    setCurrentAngle(nextAngle);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  // Click on a card rotates it to the front (0 deg)
  const handleCardClick = (index) => {
    const targetAngle = -index * anglePerItem;
    // Animate smoothly to target angle
    const startAngle = angleRef.current;
    // Calculate shortest angular difference
    let diff = (targetAngle - startAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    const startTime = performance.now();
    const duration = 650;

    const animateRotation = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startAngle + diff * ease;

      angleRef.current = current;
      setCurrentAngle(current);

      if (progress < 1) {
        requestAnimationFrame(animateRotation);
      }
    };

    requestAnimationFrame(animateRotation);

    if (onItemClick) {
      onItemClick(items[index], index);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-8 select-none flex flex-col items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDraggingRef.current = false;
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Perspective Stage Container */}
      <div
        className="relative w-full h-[380px] sm:h-[420px] md:h-[460px] flex items-center justify-center"
        style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
      >
        {/* Revolving 3D Ring Axis */}
        <div
          className="relative w-0 h-0 flex items-center justify-center"
          style={{
            transform: `rotateY(${currentAngle}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDraggingRef.current ? 'none' : 'transform 0.05s linear',
          }}
        >
          {items.map((item, index) => {
            const cardAngle = index * anglePerItem;
            // Calculate how close this card is to the camera (theta = 0 is facing front)
            const rad = (((cardAngle + currentAngle) % 360) * Math.PI) / 180;
            const cos = Math.cos(rad); // 1 = front, -1 = back
            const isFront = cos > 0.65;
            const isBack = cos < -0.2;

            return (
              <div
                key={item.id || index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(index);
                }}
                style={{
                  position: 'absolute',
                  transform: `rotateY(${cardAngle}deg) translateZ(${effectiveRadius}px)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'visible',
                }}
                className={`w-[145px] sm:w-[200px] md:w-[240px] aspect-[9/13] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isFront
                    ? 'border-2 border-[#c5a880]/70 shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(197,168,128,0.25)]'
                    : 'border border-white/10 shadow-xl'
                }`}
              >
                {/* Image Plate */}
                <img
                  src={item.image || item.media_url}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover filter transition-all duration-500"
                  style={{
                    filter: isFront
                      ? 'brightness(1) contrast(1.05)'
                      : isBack
                      ? 'brightness(0.38) blur(1px)'
                      : 'brightness(0.65)',
                  }}
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/20 transition-opacity"
                  style={{ opacity: isBack ? 0.75 : 0.6 }}
                />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span
                    className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#faf6ed] px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20"
                    style={{ color: '#faf6ed', backgroundColor: 'rgba(0,0,0,0.75)' }}
                  >
                    {item.stage || `0${index + 1}`}
                  </span>
                  {isFront && (
                    <span
                      className="text-[8px] font-mono uppercase tracking-widest text-[#dfc298] px-2 py-0.5 rounded-full bg-black/75 border border-[#c5a880]/50 backdrop-blur-md"
                      style={{ color: '#dfc298', backgroundColor: 'rgba(0,0,0,0.75)' }}
                    >
                      ACTIVE
                    </span>
                  )}
                </div>

                {/* Bottom Caption Overlay */}
                <div className="image-ring-caption absolute bottom-0 left-0 right-0 p-3.5 sm:p-4 text-left">
                  <span
                    className="text-[8px] uppercase font-mono tracking-widest text-[#dfc298] block mb-0.5"
                    style={{ color: '#dfc298', textShadow: '0 1px 4px rgba(0, 0, 0, 0.95)' }}
                  >
                    {item.temp || item.tag || 'THERMAL CIRCUIT'}
                  </span>
                  <h4
                    className="font-serif text-sm sm:text-base text-[#faf6ed] leading-snug line-clamp-2"
                    style={{ color: '#faf6ed', textShadow: '0 2px 8px rgba(0, 0, 0, 0.95)' }}
                  >
                    {item.title}
                  </h4>
                  {isFront && item.desc && (
                    <p
                      className="text-[10px] text-[#e8e2d5] font-light mt-1 line-clamp-2 hidden sm:block"
                      style={{ color: '#e8e2d5', textShadow: '0 1px 6px rgba(0, 0, 0, 0.95)' }}
                    >
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Hint & Interactive Navigation Bar */}
      <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 text-xs text-[#8a857b]">
        <div className="flex items-center gap-2">
          <RotateCw className="w-3.5 h-3.5 text-[#c5a880] animate-[spin_8s_linear_infinite]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#c5a880]">
            DRAG TO REVOLVE 3D RING • CLICK ANY CARD TO FOCUS
          </span>
        </div>

        {/* Indicator dots */}
        <div className="flex items-center gap-1.5 ml-0 sm:ml-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => handleCardClick(i)}
              aria-label={`Focus card ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeCardIndex
                  ? 'w-6 bg-[#c5a880] shadow-[0_0_8px_rgba(197,168,128,0.6)]'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
