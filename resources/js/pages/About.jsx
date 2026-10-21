import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Feather, Shield, Award, ArrowRight } from 'lucide-react';
import { useReservation } from '../components/Layout';
import { useTheme } from '../context/ThemeContext';
import TextParallaxContent from '../components/ui/TextParallaxContent';
import InteractiveHoverButton from '../components/ui/InteractiveHoverButton';
import ShinyText from '../components/ui/ShinyText';

export default function About({ onOpenReservation }) {
  const { openReservation } = useReservation();
  const handleReserve = onOpenReservation || openReservation;
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const heritagePillars = [
    {
      year: '1928',
      title: 'The Origin of Stillness',
      desc: 'Founded as a secluded private coastal estate for European intellectuals and artists seeking uninterrupted creative refuge.',
    },
    {
      year: '1974',
      title: 'Architectural Reimagining',
      desc: 'Master architect Jean-Claude Vaneau etched the minimalist travertine pavilions directly into the granite cliffside.',
    },
    {
      year: 'Present',
      title: 'A Modern Sanctuary',
      desc: 'Twenty-four private sanctuaries combining heritage stone masonry, zero-carbon solar stewardship, and 3-star culinary devotion.',
    },
  ];

  const values = [
    {
      icon: Feather,
      title: 'Radical Simplicity',
      desc: 'Stripping away decorative excess to reveal honest materials, natural light, and space for mindful breathing.',
    },
    {
      icon: Sparkles,
      title: 'Unscripted Hospitality',
      desc: 'No rigid protocols. Our hosts cultivate intuitive awareness, fulfilling unspoken desires with quiet discretion.',
    },
    {
      icon: Shield,
      title: 'Environmental Stewardship',
      desc: '100% renewable solar microgrid, zero single-use plastics, and complete regenerative sourcing from local terroir.',
    },
    {
      icon: Award,
      title: 'Craftsmanship Heritage',
      desc: 'Every piece of limestone was chiseled by fifth-generation regional stonemasons, complemented by bespoke Milanese furnishings.',
    },
  ];

  return (
    <div className={`transition-colors duration-500 overflow-x-hidden ${isLight ? 'bg-[#f7f5f0] text-[#1c1917]' : 'bg-[#090a0b] text-[#f5f2eb]'}`}>
      {/* 1. TOP CINEMATIC IMAGE FIRST */}
      <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={
            isLight
              ? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85'
              : 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85'
          }
          alt="Aurelia Sanctuary Estate Panoramic"
          className="w-full h-full object-cover filter brightness-[0.88]"
        />
        <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-[#f7f5f0] via-transparent to-black/40' : 'bg-gradient-to-t from-[#090a0b] via-transparent to-black/60'}`} />
        <div className="absolute top-28 sm:top-32 left-4 sm:left-6 md:left-12">
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.3em] sm:tracking-[0.4em] text-[#c5a880] px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            HERITAGE & PHILOSOPHY • EST. 1928
          </span>
        </div>
      </section>

      {/* 2. TITLE & EYEBROW AFTER IMAGE (PROPER SPACING, ZERO OVERFLOW) */}
      <section className="relative px-6 md:px-12 pt-10 sm:pt-14 pb-12 max-w-7xl mx-auto z-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-[#c5a880]" />
          <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
            THE EXPERIENCE & HERITAGE
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-black/10 dark:border-white/10">
          <div>
            <h1 className={`font-serif text-3xl sm:text-5xl md:text-7xl font-light leading-[1.12] tracking-tight max-w-4xl mb-4 ${
              isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
            }`}>
              Crafted for those who understand that{' '}
              <span className="italic font-normal">
                <ShinyText speed={5}>quiet</ShinyText>
              </span>{' '}
              is the ultimate luxury.
            </h1>
            <p className={`text-base sm:text-lg font-light max-w-2xl leading-relaxed ${
              isLight ? 'text-[#575249]' : 'text-[#b8b3a7]'
            }`}>
              Aurelia was born from a solitary conviction: that true restoration cannot occur amidst noise. Here on the secluded cliffs of Cap d'Antibes, time ceases to rush.
            </p>
          </div>

          <InteractiveHoverButton
            onClick={() => handleReserve()}
            variant="gold"
            className="self-start lg:self-auto py-3 px-6 text-xs w-full sm:w-auto text-center"
          >
            Check Stay Availability
          </InteractiveHoverButton>
        </div>
      </section>

      {/* CHAPTER 1: THE STORY & ARCHITECTURAL VISION (TEXT PARALLAX) */}
      <TextParallaxContent
        imgUrl={
          isLight
            ? 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2200&q=85'
            : 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=85'
        }
        eyebrow="CHAPTER I • ARCHITECTURAL TOPOGRAPHY"
        subheading="RAW LIMESTONE & MEDITERRANEAN TIDES"
        heading="An Intimate Dialogue Between Stone & Sea."
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-8">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-semibold block">
                OUR ARCHITECTURAL ETHOS
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#faf6ed] font-light leading-tight">
                Chiseled directly into the contours of the Côte d’Azur promontory.
              </h3>
              <div className="space-y-6 text-[#ada79b] text-base leading-relaxed font-light">
                <p>
                  Rather than imposing artificial grandeur upon the landscape, Aurelia was chiseled directly into the bedrock. Raw limestone blocks, weathered cedar, and brushed bronze speak softly against the azure backdrop.
                </p>
                <p>
                  Each sanctuary suite is positioned according to solar angles and prevailing breezes, allowing natural ventilation, natural acoustics, and unfiltered connection to the Mediterranean horizon.
                </p>
              </div>

              <div className="pt-4 flex items-center gap-6 border-t border-white/10">
                <div>
                  <span className="font-serif text-3xl text-[#faf6ed] block">100%</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#8a857b]">Solar Powered</span>
                </div>
                <div className="w-[1px] h-10 bg-white/10" />
                <div>
                  <span className="font-serif text-3xl text-[#faf6ed] block">24</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#8a857b]">Private Keys</span>
                </div>
                <div className="w-[1px] h-10 bg-white/10" />
                <div>
                  <span className="font-serif text-3xl text-[#faf6ed] block">1:3</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#8a857b]">Staff Ratio</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Minimalist Architecture"
                className="w-full h-80 object-cover rounded-2xl border border-white/10 shadow-2xl"
              />
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
                alt="Mediterranean Courtyard"
                className="w-full h-80 object-cover rounded-2xl border border-white/10 mt-8 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </TextParallaxContent>

      {/* CHAPTER 2: HERITAGE TIMELINE (TEXT PARALLAX) */}
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
        eyebrow="CHAPTER II • HERITAGE TIMELINE"
        subheading="ESTABLISHED 1928"
        heading="Nearly a Century of Sanctuary."
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {heritagePillars.map((item, i) => (
              <div
                key={i}
                className={`p-8 sm:p-10 rounded-2xl relative overflow-hidden group transition-all duration-500 shadow-2xl ${
                  isLight
                    ? 'bg-white border border-[#c5a880]/30 hover:border-[#8f6a35]/60'
                    : 'bg-[#121418] border border-white/10 hover:border-[#c5a880]/40'
                }`}
              >
                <span className={`font-serif text-5xl font-light block mb-4 transition-colors ${
                  isLight ? 'text-[#8f6a35]/40 group-hover:text-[#8f6a35]' : 'text-[#c5a880]/30 group-hover:text-[#c5a880]'
                }`}>
                  {item.year}
                </span>
                <h3 className={`font-serif text-2xl mb-3 ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed font-light ${isLight ? 'text-[#575249]' : 'text-[#ada79b]'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </TextParallaxContent>

      {/* CHAPTER 3: GUIDING PRINCIPLES (TEXT PARALLAX) */}
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=85"
        eyebrow="CHAPTER III • PHILOSOPHY"
        subheading="THE SANCTUARY PROMISE"
        heading="The Aurelia Code."
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className={`p-8 rounded-2xl transition-all duration-500 hover:-translate-y-1.5 shadow-2xl backdrop-blur-md ${
                    isLight
                      ? 'bg-white border border-[#c5a880]/30 shadow-xl'
                      : 'bg-[#121418]/80 border border-white/5 hover:border-[#c5a880]/30'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                    isLight
                      ? 'bg-[#c5a880]/15 border border-[#c5a880]/30 text-[#8f6a35]'
                      : 'bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880]'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`font-serif text-xl mb-3 ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
                    {v.title}
                  </h3>
                  <p className={`text-xs leading-relaxed font-light ${isLight ? 'text-[#575249]' : 'text-[#9c968a]'}`}>
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </TextParallaxContent>

      {/* Bottom CTA Banner */}
      <section className={`py-24 border-t px-6 text-center ${
        isLight
          ? 'bg-[#ede8df] border-[#c5a880]/25'
          : 'bg-gradient-to-b from-[#0c0d10] to-[#08090a] border-white/5'
      }`}>
        <div className="max-w-3xl mx-auto space-y-8">
          <span className={`text-[11px] uppercase tracking-[0.4em] font-semibold block ${
            isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
          }`}>
            AN INVITATION TO RESTORATION
          </span>
          <h2 className={`font-serif text-4xl sm:text-6xl font-light ${
            isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
          }`}>
            Begin Your Unhurried Journey.
          </h2>
          <p className={`text-base font-light max-w-xl mx-auto ${
            isLight ? 'text-[#575249]' : 'text-[#ada79b]'
          }`}>
            Explore our curated sanctuaries or connect with our private concierge team for bespoke itinerary styling.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/services" className="no-underline">
              <InteractiveHoverButton variant="gold" className="py-3 px-7 text-xs">
                Explore Suites & Villas
              </InteractiveHoverButton>
            </Link>
            <Link
              to="/contact"
              className={`text-xs inline-flex items-center gap-3 px-8 py-3.5 rounded-full border transition-all duration-300 font-medium uppercase tracking-[0.2em] ${
                isLight
                  ? 'border-[#8f6a35]/45 text-[#1c1917] hover:border-[#8f6a35] hover:text-[#8f6a35] hover:bg-[#8f6a35]/10'
                  : 'luxury-btn-outline'
              }`}
            >
              Contact Concierge Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
