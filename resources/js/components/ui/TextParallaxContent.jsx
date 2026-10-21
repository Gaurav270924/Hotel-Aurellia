import React, { useRef, useState, useEffect } from 'react';
import ShinyText from './ShinyText';

/**
 * TextParallaxContent
 * Editorial sticky parallax content block.
 * As the user scrolls, the background image stays sticky while editorial copy
 * floats across with depth, followed by narrative editorial content.
 */
export default function TextParallaxContent({
  imgUrl,
  subheading,
  heading,
  eyebrow = '',
  imgPadding = 16,
  children,
}) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 0 when section enters bottom, 1 when section leaves top
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax transformations
  // Scale down subtly as user scrolls through the 140vh container
  const scale = 1 - Math.max(0, scrollProgress - 0.5) * 0.22;
  const overlayOpacity = Math.min(0.85, 0.4 + scrollProgress * 0.45);
  // Copy translates upward through the sticky stage
  const copyTranslateY = (0.5 - scrollProgress) * 220;
  // Fade in in the middle, fade out at edges
  const copyOpacity = scrollProgress < 0.2
    ? scrollProgress / 0.2
    : scrollProgress > 0.8
    ? (1 - scrollProgress) / 0.2
    : 1;

  return (
    <div
      ref={containerRef}
      style={{
        paddingLeft: `${imgPadding}px`,
        paddingRight: `${imgPadding}px`,
      }}
      className="relative mb-16"
    >
      {/* Sticky Parallax Stage */}
      <div className="relative h-[140vh]">
        {/* Sticky Background Image */}
        <div
          style={{
            height: `calc(100vh - ${imgPadding * 2}px)`,
            top: `${imgPadding}px`,
            transform: `scale(${scale}) translateZ(0)`,
            transition: 'transform 0.1s ease-out',
          }}
          className="sticky z-0 overflow-hidden rounded-3xl shadow-2xl border border-white/10"
        >
          <img
            src={imgUrl}
            alt={typeof heading === 'string' ? heading : 'Sanctuary Scene'}
            className="h-full w-full object-cover select-none filter brightness-95"
            loading="lazy"
          />

          {/* Dynamic Dark Vignette Overlay: Keeps photo cinematic so white/gold copy always pops */}
          <div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/35 transition-opacity duration-200"
          />
        </div>

        {/* Floating Parallax Editorial Copy */}
        <div
          style={{
            transform: `translate3d(0, ${copyTranslateY}px, 0)`,
            opacity: Math.max(0, copyOpacity),
            transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
          }}
          className="parallax-editorial-copy pointer-events-none sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6 text-center z-10 -mt-[calc(100vh-32px)]"
        >
          {eyebrow && (
            <span
              className="parallax-eyebrow text-[10px] uppercase font-mono tracking-[0.4em] text-[#dfc298] px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#c5a880]/35 mb-4 shadow-2xl"
              style={{
                color: '#dfc298',
                backgroundColor: 'rgba(10, 11, 13, 0.85)',
                borderColor: 'rgba(197, 168, 128, 0.4)',
              }}
            >
              {eyebrow}
            </span>
          )}

          {subheading && (
            <p
              className="mb-2 font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-[#dfc298] drop-shadow-md"
              style={{ color: '#dfc298', textShadow: '0 1px 8px rgba(0, 0, 0, 0.85)' }}
            >
              {subheading}
            </p>
          )}

          <h2
            className="font-serif text-3xl sm:text-5xl md:text-7xl font-light text-[#faf6ed] max-w-4xl tracking-tight leading-tight drop-shadow-2xl"
            style={{ color: '#faf6ed', textShadow: '0 2px 16px rgba(0, 0, 0, 0.85)' }}
          >
            {heading}
          </h2>
        </div>
      </div>

      {/* Narrative Children Content Following the Sticky Stage */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
