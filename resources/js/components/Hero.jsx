import React, { useRef, useEffect, useState, useCallback } from 'react';

const TOTAL_FRAMES = 300;
const getFramePath = (idx) => `/hotel-frames-webp/frame_${String(idx).padStart(4, '0')}.webp`;

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const rafIdRef = useRef(null);

  // Precision target & current frame tracking
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const lastDrawnFrameRef = useRef(1);

  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeStage, setActiveStage] = useState('ENTRANCE & RESIDENCE GATES');

  // Draw image on canvas with 'object-fit: cover' behavior
  const drawImageCover = useCallback((ctx, canvas, img) => {
    if (!ctx || !canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const ratio = Math.max(cw / iw, ch / ih);
    const nw = iw * ratio;
    const nh = ih * ratio;
    const offsetX = (cw - nw) / 2;
    const offsetY = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, nw, nh);
  }, []);

  // Bulletproof frame renderer: draws requested frame or nearest loaded frame
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const clamped = Math.min(Math.max(frameIdx, 1), TOTAL_FRAMES);

    // 1. Direct hit if target frame is loaded
    const exactImg = imagesRef.current[clamped];
    if (exactImg && exactImg.complete && exactImg.naturalWidth > 0) {
      drawImageCover(ctx, canvas, exactImg);
      lastDrawnFrameRef.current = clamped;
      return;
    }

    // 2. If exact frame is still loading, find nearest loaded frame so the screen NEVER freezes
    for (let offset = 1; offset <= TOTAL_FRAMES; offset++) {
      const prev = clamped - offset;
      const next = clamped + offset;

      if (prev >= 1) {
        const prevImg = imagesRef.current[prev];
        if (prevImg && prevImg.complete && prevImg.naturalWidth > 0) {
          drawImageCover(ctx, canvas, prevImg);
          lastDrawnFrameRef.current = prev;
          return;
        }
      }

      if (next <= TOTAL_FRAMES) {
        const nextImg = imagesRef.current[next];
        if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
          drawImageCover(ctx, canvas, nextImg);
          lastDrawnFrameRef.current = next;
          return;
        }
      }
    }
  }, [drawImageCover]);

  // Preload frames cleanly: only 1 Image instance per frame
  useEffect(() => {
    let isMounted = true;
    const images = [];

    // Preload frame 1 immediately
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      if (!isMounted) return;
      drawFrame(1);
    };
    images[1] = firstImg;

    // Progressive preloader for all 300 frames
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (!isMounted) return;
        // If this newly loaded frame is close to our current target, immediately draw it
        const curTarget = Math.round(targetFrameRef.current);
        if (Math.abs(curTarget - i) <= 3 || i === TOTAL_FRAMES) {
          drawFrame(curTarget);
        }
      };
      images[i] = img;
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, [drawFrame]);

  // Handle window resizing to keep canvas razor sharp (HiDPI)
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(lastDrawnFrameRef.current);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, [drawFrame]);

  // Main scroll listener: maps scroll distance directly across 300 detailed frames
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      const percent = Math.round(progress * 100);

      setScrollPercent(percent);

      // Compute frame index (1 to 300)
      const frameIndex = Math.min(
        Math.max(Math.round(progress * (TOTAL_FRAMES - 1)) + 1, 1),
        TOTAL_FRAMES
      );

      targetFrameRef.current = frameIndex;

      // Update room stage HUD
      if (percent < 15) {
        setActiveStage('ENTRANCE & RESIDENCE GATES');
      } else if (percent < 38) {
        setActiveStage('GRAND CHANDELIER FOYER & LOBBY');
      } else if (percent < 60) {
        setActiveStage('PRIVATE MARBLE LOUNGE & BAR');
      } else if (percent < 82) {
        setActiveStage('EXECUTIVE MASTER SUITE');
      } else {
        setActiveStage('OCEAN VIEW TERRACE & INFINITY SANCTUARY');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 60FPS RAF interpolation loop with smooth cinematic glide
  useEffect(() => {
    let active = true;

    const renderLoop = () => {
      if (!active) return;

      const delta = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += delta * 0.28;

      const rounded = Math.round(currentFrameRef.current);
      if (rounded !== lastDrawnFrameRef.current) {
        drawFrame(rounded);
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame]);

  // Quick button helper: smoothly stroll into the hotel walkthrough
  const handleStepInside = (e) => {
    e.preventDefault();
    if (!containerRef.current) return;
    const targetScroll = window.scrollY + window.innerHeight * 2.0;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Text fades out gently as user starts scrolling
  const titleOpacity = Math.max(0, 1 - (scrollPercent / 12));
  const titleTranslateY = (scrollPercent / 12) * -35;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="hero-scroll-container relative w-full"
      style={{ height: '700vh' }}
    >
      {/* Sticky Stage: pinned to viewport as user scrolls through the 700vh track */}
      <div className="hero-sticky-stage sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black">
        {/* High-Performance Canvas: Renders full 300 frames from entrance to infinity pool */}
        <canvas
          ref={canvasRef}
          className="hero-video absolute inset-0 w-full h-full object-cover"
        />

        {/* Cinematic atmospheric vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0b] via-black/15 to-black/45 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/55 pointer-events-none" />

        {/* Initial Hero Welcome Content: Fades away as user starts scrolling inside */}
        <div
          className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center transition-all duration-200 ease-out flex flex-col items-center"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
            pointerEvents: titleOpacity < 0.1 ? 'none' : 'auto',
          }}
        >
          {/* Small text / Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#c5a880]/70" />
            <p className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-[#dfc298] font-medium">
              A NEW STANDARD OF HOSPITALITY
            </p>
            <span className="w-8 h-[1px] bg-[#c5a880]/70" />
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#faf7f0] font-light leading-[1.1] mb-6">
            Stay Somewhere <br className="hidden sm:inline" />
            <span className="italic font-normal gold-gradient-text">Extraordinary.</span>
          </h1>

          {/* Description */}
          <p
            className="text-base sm:text-lg md:text-xl text-[#d4cfc5] font-light max-w-2xl leading-relaxed mb-8 sm:mb-10 text-balance px-2"
            style={{ color: '#d4cfc5' }}
          >
            An unforgettable stay designed around comfort, elegance and exceptional experiences.
          </p>

          {/* Minimal CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a href="#highlights" className="luxury-btn">
              <span>Explore Rooms</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
            <button
              onClick={handleStepInside}
              className="luxury-btn-outline cursor-pointer"
            >
              <span>Scroll / Step Inside ↓</span>
            </button>
          </div>
        </div>

        {/* HUD Overlay during Walkthrough: Shows current room/depth as user scrolls inside */}
        <div
          className="absolute top-24 left-6 md:left-12 z-20 pointer-events-none transition-all duration-300"
          style={{
            opacity: scrollPercent > 3 ? 0.95 : 0,
            transform: `translateY(${scrollPercent > 3 ? 0 : 10}px)`,
          }}
        >
          <div
            className="hero-hud-pill px-4 py-2 rounded-full flex items-center gap-3 border border-[#c5a880]/40 bg-black/75 backdrop-blur-md shadow-2xl"
            style={{ backgroundColor: 'rgba(10, 11, 13, 0.85)', borderColor: 'rgba(197, 168, 128, 0.45)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
            <span
              className="text-xs font-mono uppercase tracking-[0.22em] text-[#faf6ed]"
              style={{ color: '#faf6ed' }}
            >
              {activeStage}
            </span>
          </div>
        </div>

        {/* Scroll Progress & Bottom Interactive Controls */}
        <div
          className="absolute bottom-8 left-0 right-0 z-20 px-6 md:px-12 flex items-center justify-between pointer-events-none"
        >
          {/* Scrubber Telemetry */}
          <div
            className="flex items-center gap-3 text-xs font-mono tracking-wider text-[#a8a296]/90"
            style={{ color: '#a8a296' }}
          >
            <span className="text-[#c5a880] font-semibold" style={{ color: '#c5a880' }}>
              {scrollPercent < 10 ? `0${scrollPercent}` : scrollPercent}%
            </span>
            <div className="w-24 sm:w-44 h-[3px] bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#c5a880] to-[#dfc298] transition-all duration-75"
                style={{ width: `${scrollPercent}%` }}
              />
            </div>
            <span className="text-[10px] text-[#8a857b] uppercase tracking-widest hidden sm:inline" style={{ color: '#8a857b' }}>
              Full Walkthrough
            </span>
          </div>

          {/* Center Dynamic Scroll Guidance */}
          <div className="flex flex-col items-center gap-2 pointer-events-auto">
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-[#f4efe4] font-medium drop-shadow-md text-center"
              style={{ color: '#f4efe4' }}
            >
              {scrollPercent === 0
                ? 'Scroll down to enter hotel'
                : scrollPercent >= 95
                  ? 'Sunset Sanctuary Reached'
                  : 'Scroll to explore deeper inside'}
            </span>
            <div className="w-5 h-9 rounded-full border border-[#c5a880]/70 flex items-start justify-center p-1 bg-black/40 backdrop-blur-sm">
              <div
                className="w-1 h-2.5 rounded-full bg-[#c5a880] animate-scroll-pulse"
                style={{
                  transform: `translateY(${Math.min(scrollPercent / 12, 12)}px)`,
                }}
              />
            </div>
          </div>

          {/* Interactive Navigation Hint */}
          <div
            className="hidden sm:flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-[#a8a296]/80 uppercase"
            style={{ color: '#a8a296' }}
          >
            <span>[SCROLL] 300 FRAMES WALKTHROUGH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
