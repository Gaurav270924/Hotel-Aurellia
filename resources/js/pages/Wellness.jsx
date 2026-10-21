import React from 'react';
import { Sparkles, Waves, Sun, Heart, Clock, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useReservation } from '../components/Layout';
import { useTheme } from '../context/ThemeContext';

function RevealCard({
  image,
  eyebrow,
  metric,
  title,
  description,
  badgeNote,
  actionLabel = 'MORE',
  subAction = 'RESERVE',
  onAction,
  isLight,
}) {
  return (
    <div
      onClick={onAction}
      className={`spa-reveal-card relative h-[430px] rounded-2xl overflow-hidden group cursor-pointer select-none border transition-all duration-500 hover:shadow-2xl ${
        isLight
          ? 'border-black/15 shadow-md hover:border-[#c5a880]/60'
          : 'border-white/10 shadow-xl hover:border-[#c5a880]/50'
      }`}
    >
      {/* 1. IDLE LAYER (High-res photography, Title overlay, smooth fade out on hover) */}
      <div className="absolute inset-0 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none z-10">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Deep contrast gradient overlay for flawless readability in both themes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25" />

        {/* Idle Card Metadata */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
          <div className="flex items-center justify-between gap-2">
            <span className="reveal-metric text-[10px] uppercase font-mono tracking-[0.25em] px-3 py-1 rounded-full border shadow-sm">
              {eyebrow}
            </span>
            <span className="reveal-metric text-[11px] font-mono px-2.5 py-1 rounded-full border shadow-sm">
              {metric}
            </span>
          </div>

          <div>
            {badgeNote && (
              <span className="reveal-eyebrow text-[9px] uppercase font-mono tracking-[0.3em] block mb-1.5 font-medium">
                {badgeNote}
              </span>
            )}
            <h3 className="reveal-title font-serif text-2xl leading-snug drop-shadow-md">
              {title}
            </h3>
            <div className="reveal-hint flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase mt-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfc298] animate-ping" />
              <span>Hover to reveal</span>
              <span className="text-xs">↗</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. REVEALED LAYER (Matches user's reference image: Top dark info box + Bottom-left thumbnail + Bottom-right action) */}
      <div className="absolute inset-0 p-2.5 sm:p-3 flex flex-col justify-between bg-[#08090c] transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 z-20">
        {/* TOP BOX: Dark High-Contrast Specification Box */}
        <div className="reveal-top-box h-[58%] rounded-xl p-5 sm:p-6 flex flex-col justify-between border shadow-inner">
          <div className="flex items-center justify-between gap-2">
            <span className="reveal-eyebrow text-[10px] uppercase font-mono tracking-[0.25em]">
              {eyebrow}
            </span>
            <span className="reveal-metric text-[11px] font-mono px-2.5 py-0.5 rounded-full border">
              {metric}
            </span>
          </div>

          <div>
            <h3 className="reveal-title font-serif text-xl sm:text-2xl leading-tight mb-2 font-light">
              {title}
            </h3>
            <p className="reveal-desc text-xs font-light leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {badgeNote && (
            <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest">
              <span className="w-1 h-1 rounded-full bg-[#dfc298]" />
              <span className="reveal-eyebrow">{badgeNote}</span>
            </div>
          )}
        </div>

        {/* BOTTOM ROW: 50/50 Split (Thumbnail on left, Action on right) */}
        <div className="h-[38%] grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* Bottom Left: Architectural Photo Thumbnail */}
          <div className="rounded-xl overflow-hidden relative border border-white/10 bg-black">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          {/* Bottom Right: High-Contrast Action Box with Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAction();
            }}
            className="reveal-action-box rounded-xl flex flex-col items-center justify-center p-3 text-center border transition-colors duration-300 group/btn shadow-md cursor-pointer"
          >
            <span className="text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-1">
              <span>{actionLabel}</span>
              <span className="text-base leading-none transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                ↗
              </span>
            </span>
            <span className="text-[9px] uppercase font-mono tracking-widest opacity-70 mt-1">
              {subAction}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Wellness({ onOpenReservation }) {
  const { openReservation } = useReservation();
  const handleReserve = onOpenReservation || openReservation;
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const circuits = [
    {
      step: '01',
      name: 'Tepidarium Warmed Lounge',
      temp: '36°C / 96°F',
      desc: 'Ergonomic heated marble lounges designed to gently dilate capillaries and release spinal tension.',
    },
    {
      step: '02',
      name: 'Geothermal Caldarium Spring',
      temp: '40°C / 104°F',
      desc: 'Natural mineral waters rich in magnesium, silica, and potassium to detoxify musculoskeletal pathways.',
    },
    {
      step: '03',
      name: 'Alpine Frigidarium Plunge',
      temp: '12°C / 54°F',
      desc: 'Instant biological reset stimulating norepinephrine release, immune vitality, and mental clarity.',
    },
    {
      step: '04',
      name: 'Eucalyptus Herb Grotto',
      temp: '48°C / 100% Humidity',
      desc: 'Infused with wild botanical extracts harvested from our coastal gardens to clear respiratory channels.',
    },
  ];

  const signatureTreatments = [
    {
      title: 'Somatic Soundscape & Cranial Restoration',
      duration: '90 Minutes',
      price: '₹22,500',
      badgeNote: 'ACOUSTIC CRANIAL THERAPY',
      desc: 'Tibetan singing bowls and bespoke acoustic frequencies paired with deep acupressure release along the spine and neck.',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80',
      actionLabel: 'BOOK',
      subAction: 'TREATMENT',
    },
    {
      title: 'Mediterranean Marine Algae Body Wrap',
      duration: '120 Minutes',
      price: '₹28,000',
      badgeNote: 'CAP D’ANTIBES MARINE RESERVE',
      desc: 'Wild sea kelp freshly harvested from the Cap d’Antibes marine reserve, combined with rosemary sea salt exfoliation.',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
      actionLabel: 'BOOK',
      subAction: 'TREATMENT',
    },
    {
      title: 'Warm Basalt Stone & Neroli Massage',
      duration: '75 Minutes',
      price: '₹19,500',
      badgeNote: 'VOLCANIC BASALT & NEROLI',
      desc: 'Volcanic basalt heated in thermal spring water combined with cold-pressed orange blossom essential oils.',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80',
      actionLabel: 'BOOK',
      subAction: 'TREATMENT',
    },
    {
      title: 'Sunrise Cliffside Somatic Yoga Session',
      duration: '60 Minutes',
      price: '₹9,500',
      badgeNote: 'PRIVATE DAWN MOVEMENT',
      desc: 'Private dawn movement practice overlooking the quiet sea, followed by restorative organic herbal elixir infusions.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
      actionLabel: 'BOOK',
      subAction: 'TREATMENT',
    },
  ];

  return (
    <div className={`transition-colors duration-500 ${isLight ? 'bg-[#f7f5f0] text-[#1c1917]' : 'bg-[#090a0b] text-[#f5f2eb]'}`}>
      {/* 1. TOP CINEMATIC IMAGE FIRST */}
      <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={
            isLight
              ? 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=85'
              : 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85'
          }
          alt="Thermal Bathhouse Mineral Springs"
          className="w-full h-full object-cover filter brightness-[0.88]"
        />
        <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-[#f7f5f0] via-transparent to-black/40' : 'bg-gradient-to-t from-[#090a0b] via-transparent to-black/60'}`} />
        <div className="absolute top-32 left-6 md:left-12">
          <span className="text-[10px] uppercase font-mono tracking-[0.4em] text-[#c5a880] px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            SUBTERRANEAN HYDROTHERAPY
          </span>
        </div>
      </section>

      {/* 2. TITLE & EYEBROW AFTER IMAGE (NO NEGATIVE MARGIN OVERFLOW) */}
      <section className="relative px-6 md:px-12 pt-10 sm:pt-14 pb-12 max-w-7xl mx-auto z-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-[#c5a880]" />
          <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
            THE THERMAL BATHHOUSE & HOLISTICS
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-black/10 dark:border-white/10">
          <div>
            <h1 className={`font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight tracking-tight ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
              Ancient <span className="italic font-normal gold-gradient-text">Water Healing.</span>
            </h1>
            <p className={`text-base font-light max-w-2xl mt-4 leading-relaxed ${isLight ? 'text-[#575249]' : 'text-[#ada79b]'}`}>
              Subterranean thermal springs, sequential hydrotherapy circuits, and somatic practices designed to dissolve chronic fatigue and restore profound neurological peace.
            </p>
          </div>

          <button
            onClick={() => handleReserve('Spa Inquiry: Thermal Bathhouse Pass')}
            className="luxury-btn text-xs self-start lg:self-auto"
          >
            Reserve Spa Circuit
          </button>
        </div>
      </section>

      {/* Sequential Hydrotherapy Circuit */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold block mb-3 ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
            THE SEQUENTIAL RITUAL
          </span>
          <h2 className={`font-serif text-4xl sm:text-5xl font-light mb-4 ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
            The 4-Stage Contrast Circuit.
          </h2>
          <p className={`text-sm font-light ${isLight ? 'text-[#575249]' : 'text-[#ada79b]'}`}>
            Rooted in Roman balneology and Nordic cold-water science, this 90-minute self-guided circuit lowers systemic cortisol by up to 40%.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {circuits.map((c) => (
            <div
              key={c.step}
              className={`p-8 rounded-2xl border transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between ${
                isLight
                  ? 'bg-white border-black/10 shadow-sm hover:border-[#c5a880]/50'
                  : 'bg-[#121418] border-white/5 hover:border-[#c5a880]/30'
              }`}
            >
              <div>
                <span className="font-mono text-xs text-[#c5a880] tracking-widest block mb-4">
                  STAGE {c.step}
                </span>
                <h3 className={`font-serif text-2xl mb-2 ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
                  {c.name}
                </h3>
                <span className={`inline-block text-[11px] font-mono px-3 py-1 rounded-full mb-4 border ${
                  isLight
                    ? 'bg-[#f4efe6] text-[#8f6a35] border-black/5'
                    : 'bg-[#1a1c22] text-[#c5a880] border-white/5'
                }`}>
                  {c.temp}
                </span>
                <p className={`text-xs font-light leading-relaxed ${isLight ? 'text-[#666]' : 'text-[#9e988c]'}`}>
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signature Holistic Treatments in INR */}
      <section className={`py-24 border-y transition-colors duration-500 ${isLight ? 'bg-[#eeebe3] border-black/5' : 'bg-[#0c0d10] border-white/5'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-10">
            <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold block mb-3 ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
              INDIVIDUAL THERAPIES
            </span>
            <h2 className={`font-serif text-4xl sm:text-5xl font-light mb-4 ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
              Signature Somatic Menu.
            </h2>
            <p className={`text-sm font-light ${isLight ? 'text-[#575249]' : 'text-[#ada79b]'}`}>
              Individual somatic therapies orchestrated by dedicated master practitioners using wild coastal botanicals and thermal waters.
            </p>
          </div>

          {/* Hover Hint matching user reference */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse" />
            <span className={`text-xs uppercase tracking-[0.25em] font-mono font-medium ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
              Hover a card to inspect therapy formulations
            </span>
          </div>

          {/* REVEAL CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureTreatments.map((item, idx) => (
              <RevealCard
                key={idx}
                image={item.image}
                eyebrow={item.duration}
                metric={item.price}
                title={item.title}
                badgeNote={item.badgeNote}
                description={item.desc}
                actionLabel={item.actionLabel}
                subAction={item.subAction}
                onAction={() => handleReserve(`Spa Treatment: ${item.title}`)}
                isLight={isLight}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => handleReserve('Full Wellness Retreat Inquiry')}
              className="luxury-btn text-xs mx-auto"
            >
              Inquire About Multi-Day Wellness Retreat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
