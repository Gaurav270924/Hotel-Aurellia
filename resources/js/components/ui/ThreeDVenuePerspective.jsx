import React, { useState, useRef } from 'react';
import { Users, Sparkles, MapPin, Calendar, ArrowRight } from 'lucide-react';

/**
 * ThreeDVenuePerspective
 * Inspired by Lightswind UI 3D Perspective Card with dynamic glare and venue tabs.
 * Allows guests to switch between grand resort venues with real-time 3D tilt perspective.
 */
export default function ThreeDVenuePerspective({
  venues = [],
  className = '',
}) {
  const [activeVenueIndex, setActiveVenueIndex] = useState(0);
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const activeVenue = venues[activeVenueIndex] || venues[0];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10; // max 10 deg tilt
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  if (!venues || venues.length === 0) return null;

  return (
    <div className={`w-full flex flex-col gap-6 ${className}`}>
      {/* Venue Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {venues.map((venue, idx) => (
          <button
            key={venue.id || idx}
            onClick={() => setActiveVenueIndex(idx)}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
              idx === activeVenueIndex
                ? 'bg-[#c5a880] text-[#090a0b] font-semibold shadow-lg shadow-[#c5a880]/20'
                : 'bg-[#14161b] text-[#8e897e] hover:text-[#faf6ed] border border-white/5'
            }`}
          >
            {venue.shortName || venue.name}
          </button>
        ))}
      </div>

      {/* 3D Perspective Card Stage */}
      <div
        style={{ perspective: '1200px' }}
        className="w-full flex items-center justify-center"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.15s ease-out',
          }}
          className="relative w-full h-[430px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/10 hover:border-[#c5a880]/60 shadow-[0_30px_70px_rgba(0,0,0,0.9)] bg-[#121418] cursor-pointer group will-change-transform"
        >
          {/* Main Visual */}
          <img
            src={activeVenue.image}
            alt={activeVenue.name}
            className="w-full h-full object-cover filter brightness-[0.92] group-hover:brightness-100 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />

          {/* Interactive Dynamic Glare Effect */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(197, 168, 128, ${glarePos.opacity}) 0%, transparent 60%)`,
            }}
          />

          {/* Top Badges */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#faf6ed] px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15">
              {activeVenue.category || 'RESORT VENUE'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#c5a880] px-3 py-1.5 rounded-full bg-[#c5a880]/20 backdrop-blur-md border border-[#c5a880]/40">
              <Users className="w-3 h-3" />
              {activeVenue.capacity}
            </span>
          </div>

          {/* Bottom Venue Dossier */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 transform translate-z-[30px] dark-card-content">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880] block mb-1">
              {activeVenue.subheading || 'PRIVATE RESORT SPACES'}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#faf6ed] group-hover:text-[#e5cb9f] transition-colors leading-tight">
              {activeVenue.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#ada79b] font-light mt-2 line-clamp-2 leading-relaxed">
              {activeVenue.desc}
            </p>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#8a857b]">
              <span className="font-mono text-[10px] text-[#c5a880] uppercase tracking-wider">
                {activeVenue.highlight || 'Custom Production & Sommelier Service'}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#faf6ed] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Inspect Floorplan →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
