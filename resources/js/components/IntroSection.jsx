import React from 'react';
import Text3DFlip from './ui/Text3DFlip';
import ShinyText from './ui/ShinyText';
import { useTheme } from '../context/ThemeContext';

export default function IntroSection() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const pillars = [
    {
      number: '01',
      title: 'Architectural Harmony',
      desc: 'Seamlessly woven into the dramatic coastal topography, designed by master artisans to blur indoors with nature.',
    },
    {
      number: '02',
      title: 'Tailored Tranquility',
      desc: 'With only twenty-four private suites, our hosts anticipate every desire while honoring absolute privacy.',
    },
    {
      number: '03',
      title: 'Timeless Provenance',
      desc: 'A legacy of Mediterranean warmth, modern sustainability, and uncompromising culinary mastery.',
    },
  ];

  return (
    <section id="experience" className="relative py-28 md:py-40 bg-[#090a0b] overflow-hidden">
      {/* Decorative ambient subtle warmth */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c5a880]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#dfc298]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editorial Eyebrow & Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-6 h-[1px] bg-[#c5a880]" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold">
                  THE EXPERIENCE
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#faf6ed] font-light leading-[1.12] tracking-tight">
                <Text3DFlip staggerDuration={0.03}>Where luxury feels</Text3DFlip>{' '}
                <span className="italic font-normal">
                  <ShinyText speed={5}>effortless.</ShinyText>
                </span>
              </h2>
            </div>

            <div className="hidden lg:block mt-16 pt-8 border-t border-white/10">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#8c867a] mb-2">
                SANCTUARY PHILOSOPHY
              </p>
              <p className="text-sm text-[#b8b3a7] font-light italic">
                "True elegance does not demand attention; it commands presence through quiet perfection."
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 lg:pl-6">
            <p className="text-lg sm:text-xl md:text-2xl text-[#d4cfc5] font-light leading-relaxed">
              Nestled between azure sea cliffs and ancient olive groves, Aurelia offers an enclave of timeless serenity designed for travelers seeking respite from the noise of modernity.
            </p>
            <p className="text-base text-[#9e988c] font-light leading-relaxed">
              Every detail—from the tactile warmth of honed travertine and linen draping to the quiet whisper of evening coastal breezes—has been composed to invoke deep restorative peace. Here, days unfold in leisurely cadence, marked only by the gentle rhythm of the tides and unhurried gastronomic indulgence.
            </p>

            {/* Quick Metrics / Accolades */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#c5a880]/20">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#faf6ed] font-light block">24</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#8e897e] mt-1 block">Private Sanctuaries</span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#faf6ed] font-light block">3★</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#8e897e] mt-1 block">Michelin Dining</span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-[#faf6ed] font-light block">100%</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#8e897e] mt-1 block">Organic Sourced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Three Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className={`p-8 sm:p-10 rounded-2xl transition-all duration-500 hover:-translate-y-1.5 group ${
                isLight
                  ? 'bg-white border border-[#c5a880]/30 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:border-[#c5a880] hover:shadow-[0_20px_50px_rgba(197,168,128,0.15)]'
                  : 'bg-[#121316]/70 border border-[#c5a880]/15 hover:border-[#c5a880]/40'
              }`}
            >
              <span className={`font-mono text-xs tracking-widest block mb-6 ${
                isLight ? 'text-[#8f6a35] font-semibold' : 'text-[#c5a880]'
              }`}>
                {pillar.number}
              </span>
              <h3 className={`font-serif text-2xl mb-4 transition-colors duration-300 ${
                isLight ? 'text-[#1c1917] group-hover:text-[#8f6a35]' : 'text-[#f5f2eb] group-hover:text-[#e5cb9f]'
              }`}>
                {pillar.title}
              </h3>
              <p className={`text-sm leading-relaxed font-light ${
                isLight ? 'text-[#575249]' : 'text-[#a39e93]'
              }`}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
