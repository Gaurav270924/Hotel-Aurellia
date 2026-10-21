import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HotelHighlights() {
  const [activeCard, setActiveCard] = useState(null);

  const highlights = [
    {
      id: 'rooms',
      title: 'Luxury Rooms',
      subtitle: 'SANCTUARY SUITES & VILLAS',
      description: 'Thoughtfully designed rooms and suites.',
      extended: 'Floor-to-ceiling panoramic glass, hand-chiseled limestone bathrooms, private infinity plunge pools, and custom Italian linens designed for total restoration.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      tag: 'From 85 m² / Ocean View',
      features: ['Private Plunge Pool', 'Dedicated Butler Service', 'Artisanal Bar'],
      link: '/services',
    },
    {
      id: 'dining',
      title: 'Fine Dining',
      subtitle: 'GASTRONOMY AT L’HORIZON',
      description: 'Exceptional cuisine and unforgettable dining experiences.',
      extended: 'Three-star culinary craft honoring wild coastal harvests, accompanied by our sommelier’s cellar of rare biodynamic vintage reserves.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      tag: 'Tasting Menus / Wine Cellar',
      features: ['Al Fresco Cliff Terrace', 'Chef’s Table Experience', 'Curated Cellar'],
      link: '/dining',
    },
    {
      id: 'wellness',
      title: 'Wellness & Spa',
      subtitle: 'THE THERMAL BATHHOUSE',
      description: 'Relax, recharge and reconnect.',
      extended: 'Ancient hydrotherapy circuits, eucalyptus steam chambers, and tailored soundscapes guided by master somatic practitioners.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      tag: 'Hydrotherapy & Holistics',
      features: ['Heated Mineral Springs', 'Aromatherapeutic Saunas', 'Private Cabanas'],
      link: '/wellness',
    },
  ];

  return (
    <section id="highlights" className="relative py-28 md:py-36 bg-[#0c0d0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-[#c5a880]" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold">
                CURATED OFFERINGS
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#faf6ed] font-light tracking-tight">
              Hotel <span className="italic font-normal gold-gradient-text">Highlights.</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#9e988c] max-w-md font-light leading-relaxed">
            Every encounter is intentionally crafted to dissolve haste and awaken the senses with understated perfection.
          </p>
        </div>

        {/* 3 Minimal Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <Link
              key={item.id}
              to={item.link}
              onMouseEnter={() => setActiveCard(item.id)}
              onMouseLeave={() => setActiveCard(null)}
              className="group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-[#131418] border border-white/10 hover:border-[#c5a880]/50 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/70 no-underline"
            >
              {/* Image Frame with slow zoom */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-108 filter brightness-[0.88] group-hover:brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131418] via-transparent to-black/30" />

                {/* Badge Tag */}
                <span className="absolute top-5 left-5 text-[10px] uppercase font-mono tracking-widest text-[#f5f2eb] px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                  {item.tag}
                </span>

                <span className="absolute top-5 right-5 text-[11px] font-mono text-[#c5a880] opacity-80">
                  0{idx + 1}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a880] font-medium block mb-2">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-3xl text-[#faf6ed] mb-3 group-hover:text-[#e5cb9f] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-base text-[#d8d3c7] font-normal mb-3">
                    {item.description}
                  </p>
                  <p className="text-sm text-[#948f83] font-light leading-relaxed mb-6">
                    {item.extended}
                  </p>
                </div>

                {/* Features pill list */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[11px] text-[#b8b3a7] bg-[#1a1c22] px-3 py-1 rounded-full border border-white/5"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Minimal Link */}
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] font-medium text-[#c5a880] group-hover:text-[#faf6ed] transition-colors duration-300">
                    <span>Discover More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA to View All Services */}
        <div className="mt-16 text-center">
          <Link to="/services" className="luxury-btn-outline inline-flex text-xs">
            <span>Explore All Suites & Experiences</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
