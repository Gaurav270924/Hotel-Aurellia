import React, { useState, useRef } from 'react';

/**
 * FlipCard
 * Inspired by React Bits FlipCard:
 * - 3D Card Flip (on click or hover)
 * - Interactive Mouse Tilt & Perspective
 * - Dynamic Glare Light Reflection
 */
export default function FlipCard({
  front,
  back,
  axis = 'y',
  flipOnClick = true,
  flipOnHover = false,
  tilt = true,
  tiltMax = 12,
  glare = true,
  glareOpacity = 0.25,
  className = '',
  radius = 20,
  onFlipChange,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleToggle = () => {
    if (!flipOnClick) return;
    const nextState = !isFlipped;
    setIsFlipped(nextState);
    if (onFlipChange) onFlipChange(nextState);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (flipOnHover) {
      setIsFlipped(true);
      if (onFlipChange) onFlipChange(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    if (flipOnHover) {
      setIsFlipped(false);
      if (onFlipChange) onFlipChange(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -tiltMax;
    const rY = ((x - centerX) / centerX) * tiltMax;

    setRotateX(rX);
    setRotateY(rY);

    if (glare) {
      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    }
  };

  const rotationTransform = axis === 'y'
    ? `rotateY(${isFlipped ? 180 : 0}deg)`
    : `rotateX(${isFlipped ? 180 : 0}deg)`;

  const tiltTransform = isHovered
    ? `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    : 'perspective(1100px) rotateX(0deg) rotateY(0deg)';

  return (
    <div
      ref={cardRef}
      onClick={handleToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        borderRadius: `${radius}px`,
        transform: tiltTransform,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative cursor-pointer select-none [perspective:1100px] ${className}`}
    >
      {/* 3D Inner Container */}
      <div
        style={{
          transform: rotationTransform,
          borderRadius: `${radius}px`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.75s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="relative w-full h-full shadow-2xl"
      >
        {/* Front Face */}
        <div
          style={{
            borderRadius: `${radius}px`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className="relative w-full h-full overflow-hidden"
        >
          {front}

          {/* Dynamic Glare Reflection */}
          {glare && isHovered && !isFlipped && (
            <div
              style={{
                background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glareOpacity}), transparent 70%)`,
              }}
              className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
            />
          )}
        </div>

        {/* Back Face */}
        <div
          style={{
            borderRadius: `${radius}px`,
            transform: axis === 'y' ? 'rotateY(180deg)' : 'rotateX(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          {back}

          {/* Dynamic Glare Reflection for Back */}
          {glare && isHovered && isFlipped && (
            <div
              style={{
                background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glareOpacity}), transparent 70%)`,
              }}
              className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
            />
          )}
        </div>
      </div>
    </div>
  );
}
