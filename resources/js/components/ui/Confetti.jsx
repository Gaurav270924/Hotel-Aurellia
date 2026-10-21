import React, { useEffect, useRef } from 'react';

/**
 * High-performance Canvas Confetti component with luxury gold, champagne, and warm pearl colors.
 * Zero external dependencies.
 */
export default function Confetti({ active = false, duration = 3500, onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.offsetHeight || window.innerHeight);

    // Luxury palette: Imperial gold, Champagne, Pearl white, Rose gold, Warm amber
    const colors = ['#c5a880', '#e5cb9f', '#f9f6f0', '#edd8b7', '#dfb15b', '#ffffff'];

    const particleCount = 140;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: width * 0.5 + (Math.random() * 200 - 100),
        y: height * 0.4 + (Math.random() * 80 - 40),
        radius: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 30 - 15,
        tiltAngle: 0,
        tiltAngleIncremental: Math.random() * 0.08 + 0.04,
        vx: (Math.random() - 0.5) * 16,
        vy: -(Math.random() * 14 + 10),
        gravity: 0.38,
        friction: 0.985,
        opacity: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
      });
    }

    const startTime = Date.now();

    const render = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.vx *= p.friction;
        p.vy += p.gravity;
        p.vy *= p.friction;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.tiltAngle += p.tiltAngleIncremental;
        p.tilt = Math.sin(p.tiltAngle) * 15;

        if (elapsed > duration * 0.65) {
          p.opacity = Math.max(0, 1 - (elapsed - duration * 0.65) / (duration * 0.35));
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        // Draw confetti rectangle or circle
        ctx.beginPath();
        ctx.rect(-p.radius, -p.radius / 2, p.radius * 2, p.radius);
        ctx.fill();
        ctx.restore();
      });

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        if (onComplete) onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, duration, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-50 h-full w-full"
    />
  );
}
