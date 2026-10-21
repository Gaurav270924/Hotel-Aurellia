import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Check, Compass, Shield, Filter, Users, Maximize, Eye } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Services() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeRoomType, setActiveRoomType] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, [activeCategory]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const url = activeCategory === 'all'
        ? '/api/services'
        : `/api/services?category=${encodeURIComponent(activeCategory)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && data.success) {
        setServices(data.data);
      } else {
        setError('Unable to load suites at this moment.');
      }
    } catch {
      setError('Connection error while fetching suites.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All Sanctuaries' },
    { id: 'Suites', label: 'Suites & Villas' },
    { id: 'Dining', label: '3★ Gastronomy' },
    { id: 'Wellness', label: 'Thermal Spa' },
    { id: 'Experiences', label: 'Private Charters' },
  ];

  const roomTypeFilters = [
    { id: 'all', label: 'All Layouts' },
    { id: 'Villa', label: 'Private Villas' },
    { id: 'Penthouse', label: 'Penthouses' },
    { id: 'Suite', label: 'Luxury Suites' },
    { id: 'Estate', label: 'Historic Estates' },
  ];

  const filteredServices = services.filter((item) => {
    if (activeRoomType === 'all') return true;
    return item.room_type === activeRoomType;
  });

  return (
    <div className={`transition-colors duration-500 overflow-x-hidden ${isLight ? 'bg-[#f7f5f0] text-[#1c1917]' : 'bg-[#090a0b] text-[#f5f2eb]'}`}>
      {/* 1. TOP CINEMATIC IMAGE BANNER FIRST */}
      <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={
            isLight
              ? 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2000&q=85'
              : 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=85'
          }
          alt="Suites and Villas Sanctuary"
          className="w-full h-full object-cover filter brightness-[0.88]"
        />
        <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-[#f7f5f0] via-transparent to-black/40' : 'bg-gradient-to-t from-[#090a0b] via-transparent to-black/60'}`} />
        <div className="absolute top-28 sm:top-32 left-4 sm:left-6 md:left-12">
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.3em] sm:tracking-[0.4em] text-[#c5a880] px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            PRIVATE RESIDENCES & SANCTUARIES
          </span>
        </div>
      </section>

      {/* 2. TITLE & EYEBROW AFTER IMAGE (NO NEGATIVE MARGIN OVERFLOW) */}
      <section className="relative px-6 md:px-12 pt-10 sm:pt-14 pb-10 max-w-7xl mx-auto z-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-[#c5a880]" />
          <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
            ACCOMMODATIONS & SERVICES
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/10 dark:border-white/10">
          <div>
            <h1 className={`font-serif text-3xl sm:text-5xl md:text-7xl font-light leading-tight tracking-tight ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
              Curated <span className="italic font-normal gold-gradient-text">Sanctuaries.</span>
            </h1>
            <p className={`text-base font-light max-w-2xl mt-3 leading-relaxed ${isLight ? 'text-[#575249]' : 'text-[#ada79b]'}`}>
              Every suite and villa is individually tailored with floor-to-ceiling panoramic glass, natural stone finishes, private infinity pools, and dedicated 24-hour butler coordination.
            </p>
          </div>

          <span className={`text-xs font-mono uppercase tracking-widest self-start lg:self-auto ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
            All Tariffs in Indian Rupees (₹)
          </span>
        </div>

        {/* Filters */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Main Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-[#c5a880] mr-1" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setActiveRoomType('all'); }}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#c5a880] text-[#090a0b] font-semibold shadow-lg shadow-[#c5a880]/20'
                    : 'bg-[#14161b] text-[#8e897e] hover:text-[#faf6ed] border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sub Layout Filter (when Suites selected or All) */}
          {(activeCategory === 'all' || activeCategory === 'Suites') && (
            <div className="flex flex-wrap items-center gap-1.5">
              {roomTypeFilters.map((rt) => (
                <button
                  key={rt.id}
                  onClick={() => setActiveRoomType(rt.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all ${
                    activeRoomType === rt.id
                      ? 'bg-white/15 text-[#faf6ed] border border-[#c5a880]/40'
                      : 'text-[#736e65] hover:text-[#ada79b]'
                  }`}
                >
                  {rt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services & Room Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-28">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-[#121418] animate-pulse border border-white/5" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-[#a39e93] text-sm">
            <p>{error}</p>
            <button onClick={fetchServices} className="luxury-btn-outline text-xs mt-4">
              Try Again
            </button>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-20 text-[#8e897e] text-sm">
            No sanctuaries found matching your selected criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((item) => (
              <Link
                key={item.id}
                to={`/suites/${item.slug}`}
                className="group rounded-2xl overflow-hidden bg-[#121316] border border-white/10 hover:border-[#c5a880]/60 transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:shadow-black hover:-translate-y-1.5 no-underline"
              >
                {/* Image Frame */}
                <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black/50">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-108 filter brightness-[0.88] group-hover:brightness-95"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#f5f2eb] px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
                      {item.room_type || item.category}
                    </span>
                  </div>

                  {item.room_size && (
                    <span className="absolute top-4 right-4 text-[10px] font-mono text-[#ada79b] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md">
                      {item.room_size}
                    </span>
                  )}

                  {/* Bottom Image Price Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between text-xs">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#ada79b]">RATES FROM</span>
                    <span className="font-serif text-2xl text-[#c5a880] font-light">
                      ₹{(item.price_per_night || 215000).toLocaleString('en-IN')} <span className="text-xs text-[#8a857b]">/ night</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between space-y-4">
                  <div>
                    {item.subtitle && (
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] font-medium block mb-1.5">
                        {item.subtitle}
                      </span>
                    )}
                    <h3 className="font-serif text-2xl text-[#faf6ed] group-hover:text-[#e5cb9f] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#ada79b] font-light line-clamp-2 mt-2 leading-relaxed">
                      {item.short_description}
                    </p>
                  </div>

                  {/* Features pills */}
                  {item.features && item.features.length > 0 && (
                    <div className="pt-3 border-t border-white/5">
                      <div className="flex flex-wrap gap-1.5">
                        {item.features.slice(0, 3).map((feat, fIdx) => (
                          <span
                            key={fIdx}
                            className="text-[10px] text-[#8e897e] bg-[#171920] px-2.5 py-1 rounded-full border border-white/5"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Click CTA */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs uppercase tracking-widest font-medium text-[#c5a880] group-hover:text-[#faf6ed] transition-colors">
                    <span className="inline-flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Suite & Book</span>
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
