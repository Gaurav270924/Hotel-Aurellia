import React, { useState, useEffect, useCallback } from 'react';
import { Filter, X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Eye, Compass } from 'lucide-react';
import Pointer from '../components/ui/Pointer';
import ShinyText from '../components/ui/ShinyText';
import ThreeDImageCarousel from '../components/ui/ThreeDImageCarousel';
import { useTheme } from '../context/ThemeContext';

export default function Gallery() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [items, setItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([
    {
      id: 1,
      title: 'Cliffside Villa Infinity Edge',
      description: 'Natural limestone pool blending seamlessly with the Mediterranean horizon at sunset.',
      media_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      category: 'suites',
    },
    {
      id: 2,
      title: 'Master Bedroom Sanctuary',
      description: 'Linen draping, floor-to-ceiling panoramic glass, and handcrafted teak furnishings.',
      media_url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      category: 'suites',
    },
    {
      id: 3,
      title: 'L’Horizon Michelin Degustation',
      description: 'Artisanal coastal harvest presented with delicate edible botanicals and heirloom glaze.',
      media_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      category: 'dining',
    },
    {
      id: 5,
      title: 'Thermal Bathhouse Hot Mineral Springs',
      description: 'Steaming basalt pools illuminated by ambient golden lanterns and natural acoustics.',
      media_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      category: 'wellness',
    },
    {
      id: 7,
      title: 'Sunset Wedding Gala on the Terrace',
      description: 'Candlelit long tables dressed in white florals beneath the twilight sky.',
      media_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      category: 'events',
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, [activeCategory]);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const url = activeCategory === 'all'
        ? '/api/gallery'
        : `/api/gallery?category=${encodeURIComponent(activeCategory)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && data.success) {
        setItems(data.data);
        if (activeCategory === 'all' && data.data.length > 0) {
          setFeaturedItems(data.data);
        }
      }
    } catch {
      // Keep silent fallback
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All Visuals' },
    { id: 'suites', label: 'Suites & Villas' },
    { id: 'dining', label: 'Gastronomy' },
    { id: 'wellness', label: 'Thermal Spa' },
    { id: 'events', label: 'Events & Galas' },
    { id: 'grounds', label: 'Resort Grounds' },
  ];

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    }
  }, [lightboxIndex, items.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    }
  }, [lightboxIndex, items.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  const activeItem = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <div className={`transition-colors duration-500 overflow-x-hidden ${isLight ? 'bg-[#f7f5f0] text-[#1c1917]' : 'bg-[#090a0b] text-[#f5f2eb]'}`}>
      {/* 1. TOP CINEMATIC IMAGE FIRST */}
      <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={
            isLight
              ? 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=2000&q=85'
              : 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85'
          }
          alt="Aurelia In Frames"
          className="w-full h-full object-cover filter brightness-[0.88]"
        />
        <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-[#f7f5f0] via-transparent to-black/40' : 'bg-gradient-to-t from-[#090a0b] via-transparent to-black/60'}`} />
        <div className="absolute top-28 sm:top-32 left-4 sm:left-6 md:left-12">
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.3em] sm:tracking-[0.4em] text-[#c5a880] px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            VISUAL CHRONICLES • CAP D’ANTIBES
          </span>
        </div>
      </section>

      {/* 2. TITLE & EYEBROW AFTER IMAGE (NO NEGATIVE MARGIN OVERFLOW) */}
      <section className="relative px-6 md:px-12 pt-10 sm:pt-14 pb-10 max-w-7xl mx-auto z-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-[#c5a880]" />
          <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
            MEDIA PORTFOLIO
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/10 dark:border-white/10">
          <div>
            <h1 className={`font-serif text-3xl sm:text-5xl md:text-7xl font-light leading-tight tracking-tight ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
              Aurelia{' '}
              <span className="italic font-normal">
                <ShinyText speed={5}>In Frames.</ShinyText>
              </span>
            </h1>
            <p className={`text-base font-light max-w-xl mt-3 leading-relaxed ${isLight ? 'text-[#575249]' : 'text-[#ada79b]'}`}>
              Explore the tactile textures of honed limestone, quiet twilight over the Cap d'Antibes, and culinary art captured in natural light.
            </p>
          </div>
        </div>

        {/* 3. FEATURED 3D IMAGE CAROUSEL (SPATIAL 3D PERSPECTIVE EXHIBITION) */}
        <div className="pt-10 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#c5a880]" />
              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#c5a880] font-medium">
                CINEMATIC 3D PERSPECTIVE EXHIBITION
              </span>
            </div>
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-[#8a857b]">
              Drag • Touch Swipe • Auto-Cycle
            </span>
          </div>

          <ThreeDImageCarousel
            items={featuredItems}
            autoplay={true}
            autoplayDelay={5000}
            pauseOnHover={true}
            onImageClick={(item) => {
              const idx = items.findIndex((i) => i.id === item.id);
              if (idx !== -1) {
                setLightboxIndex(idx);
              } else {
                setActiveCategory('all');
                setLightboxIndex(0);
              }
            }}
          />
        </div>

        {/* Filter Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#8a857b]">
              FILTER ARCHIVES BY WING
            </span>
            <span className="text-xs font-mono text-[#c5a880]">
              {items.length} Curated Media Plates
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-[#c5a880] mr-2" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#c5a880] text-[#090a0b] font-semibold shadow-lg shadow-[#c5a880]/20'
                    : 'bg-[#14161b] text-[#8e897e] hover:text-[#faf6ed] border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-[#121418] animate-pulse border border-white/5" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 text-sm text-[#8e897e]">
            No visuals found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
              <Pointer
                key={item.id}
                badge="Inspect View"
                icon={<Eye className="w-3.5 h-3.5 text-[#c5a880]" />}
                className="rounded-2xl"
              >
                <div
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#121418] border border-white/10 hover:border-[#c5a880]/50 cursor-pointer transition-all duration-700 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black"
                >
                  <img
                    src={item.media_url}
                    alt={item.alt_text || item.title}
                    className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-108 filter brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                  {/* Top Category Badge */}
                  <span className="absolute top-4 left-4 text-[10px] uppercase font-mono tracking-widest text-[#f5f2eb] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                    {item.category}
                  </span>

                  {/* Expand Icon */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="gallery-caption-overlay absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3
                      className="font-serif text-xl sm:text-2xl text-[#faf6ed] mb-1"
                      style={{ color: '#faf6ed', textShadow: '0 2px 8px rgba(0, 0, 0, 0.95)' }}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p
                        className="text-xs text-[#b8b3a7] font-light line-clamp-2"
                        style={{ color: '#e8e2d5', textShadow: '0 1px 6px rgba(0, 0, 0, 0.95)' }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </Pointer>
            ))}
          </div>
        )}
      </section>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && activeItem && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fadeIn">
          {/* Top Controls */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
            <div className="text-xs font-mono text-[#c5a880]">
              {lightboxIndex + 1} / {items.length} • {activeItem.category.toUpperCase()}
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#faf6ed] transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white z-20 transition-all hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div className="max-w-5xl max-h-[85vh] p-4 flex flex-col items-center justify-center z-10">
            <img
              src={activeItem.media_url}
              alt={activeItem.title}
              className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <div className="lightbox-caption text-center mt-6 max-w-xl">
              <h3
                className="font-serif text-2xl sm:text-3xl text-[#faf6ed] mb-2"
                style={{ color: '#faf6ed' }}
              >
                {activeItem.title}
              </h3>
              {activeItem.description && (
                <p
                  className="text-sm text-[#ada79b] font-light"
                  style={{ color: '#dfcaa7' }}
                >
                  {activeItem.description}
                </p>
              )}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white z-20 transition-all hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
