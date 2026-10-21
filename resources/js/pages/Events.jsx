import React, { useState, useEffect } from 'react';
import {
  Calendar, Users, MapPin, Sparkles, CheckCircle, ArrowRight,
  ShieldCheck, Wine, Heart, Briefcase, Award, Clock
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Events() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // Event Inquiry Form State (INR)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Weddings & Celebrations');
  const [preferredDate, setPreferredDate] = useState('');
  const [location, setLocation] = useState('The Cliff Amphitheater & Lower Terraces');
  const [guestCount, setGuestCount] = useState('');
  const [budgetRange, setBudgetRange] = useState('₹45,00,000 - ₹85,00,000');
  const [requirements, setRequirements] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      if (res.ok && data.success) {
        setEvents(data.data);
      }
    } catch {
      // Keep silent fallback
    } finally {
      setLoadingEvents(false);
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      const payload = {
        name,
        email,
        phone,
        event_type: eventType,
        preferred_date: preferredDate || null,
        location,
        guest_count: guestCount ? parseInt(guestCount) : null,
        budget_range: budgetRange,
        requirements,
      };

      const res = await fetch('/api/event-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setConfirmation(data.reference_id || 'AUR-EVT-CONFIRMED');
        setName('');
        setEmail('');
        setPhone('');
        setPreferredDate('');
        setGuestCount('');
        setRequirements('');
      } else {
        setFormError(data.message || 'Unable to submit your event inquiry. Please check the fields and try again.');
      }
    } catch {
      setFormError('A network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const eventServices = [
    {
      index: '01',
      icon: Heart,
      title: 'Full Resort Buyouts & Weddings',
      tag: 'TOTAL RESORT SOVEREIGNTY',
      capacity: 'Up to 240 Guests',
      desc: 'Exclusive reign over all 24 suites, infinity pools, private beach coves, and 3-star culinary team for milestone nuptials.',
      feature: '24 Private suites • Complete privacy',
    },
    {
      index: '02',
      icon: Briefcase,
      title: 'Executive Summits & Family Offices',
      tag: 'CONFIDENTIAL FORUMS',
      capacity: 'Up to 50 Executives',
      desc: 'Encrypted audiovisuals, discreet high-security protocols, and private dining pavilions for confidential strategic meetings.',
      feature: 'Bespoke security • Private helipad',
    },
    {
      index: '03',
      icon: Wine,
      title: 'Curated Galas & Wine Auctions',
      tag: 'EPICUREAN PATRONAGE',
      capacity: 'Up to 180 Guests',
      desc: 'Sommelier-led harvest galas, starlit candlelit banquets, and symphonic quartet performances on the cliff terraces.',
      feature: '4,500-vintage cellar access',
    },
    {
      index: '04',
      icon: Sparkles,
      title: 'Bespoke Private Villa Soirées',
      tag: 'INTIMATE OCCASIONS',
      capacity: 'Up to 70 Guests',
      desc: 'Intimate anniversaries, yacht regatta cocktail receptions, and custom offshore fireworks displays.',
      feature: 'Dedicated butler • Yacht berth',
    },
  ];

  const workflowSteps = [
    { step: '01', title: 'Vision & Concept Alignment', desc: 'Our Director of Private Events conducts an initial confidential consultation to define your aesthetic, culinary ambitions, and guest requirements.' },
    { step: '02', title: 'Bespoke Proposal & Tasting', desc: 'We present a detailed itinerary, architectural venue layout, and an invitation for an exclusive chef tasting with Sommelier Éléonore Vasseur.' },
    { step: '03', title: 'Full-Spectrum Coordination', desc: 'Floral architecture, bespoke acoustic staging, private helicopter transfers, and 24/7 security handled under a single master production team.' },
    { step: '04', title: 'Flawless Execution', desc: 'On event day, over 60 dedicated hospitality and culinary professionals ensure effortless perfection so you remain entirely in the moment.' },
  ];

  const venues = [
    {
      name: 'The Cliff Amphitheater & Terraces',
      capacity: 'Up to 200 Guests',
      area: '1,200 m² Outdoors',
      setting: 'Cascading Limestone Cliff',
      orientation: 'Sunset Panoramic View',
      desc: 'Cascading limestone amphitheater framing unbroken Mediterranean sunsets. Tiered stone benches carved directly into the bedrock provide flawless natural acoustics.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'The Horizon Glass Pavilion',
      capacity: 'Up to 90 Guests',
      area: '340 m² Indoors',
      setting: 'Acoustic Glass Salon',
      orientation: '360° Marine Horizon',
      desc: 'Floor-to-ceiling glass salon with climate-controlled acoustical perfection. An airy architectural jewel that floats above the Mediterranean shoreline.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Ancient Olive Grove Courtyard',
      capacity: 'Up to 140 Guests',
      area: '650 m² Outdoors',
      setting: 'Historic Botanical Terrace',
      orientation: 'Canopy Festoon Lighting',
      desc: 'Surrounded by 300-year-old gnarled olive trees illuminated by golden festoon lanterns. Natural crushed travertine gravel and Mediterranean jasmine aromas.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    },
    {
      name: 'Private Riva Marina Pier',
      capacity: 'Up to 60 Guests',
      area: '200 m² Waterfront',
      setting: 'Nautical Teak Jetty',
      orientation: 'Direct Sea-Level Platform',
      desc: 'Direct coastal jetty ideal for sunset champagne cocktail receptions. Accommodates direct yacht tender arrivals and features teak decking with polished marine brass.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <div className={`transition-colors duration-500 overflow-x-hidden ${isLight ? 'bg-[#f7f5f0] text-[#1c1917]' : 'bg-[#090a0b] text-[#f5f2eb]'}`}>
      {/* 1. TOP CINEMATIC IMAGE BANNER FIRST */}
      <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={
            isLight
              ? 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=85'
              : 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85'
          }
          alt="Luxury Wedding Gala at Aurelia"
          className="w-full h-full object-cover filter brightness-[0.88]"
        />
        <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-[#f7f5f0] via-transparent to-black/40' : 'bg-gradient-to-t from-[#090a0b] via-transparent to-black/60'}`} />
        <div className="absolute top-28 sm:top-32 left-4 sm:left-6 md:left-12">
          <span className="text-[10px] uppercase font-mono tracking-[0.3em] sm:tracking-[0.4em] text-[#c5a880] px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            PRIVATE VENUES & CELEBRATIONS
          </span>
        </div>
      </section>

      {/* 2. TITLE & EYEBROW AFTER IMAGE (NO NEGATIVE MARGIN OVERFLOW) */}
      <section className="relative px-6 md:px-12 pt-8 sm:pt-14 pb-8 max-w-7xl mx-auto z-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-[#c5a880]" />
          <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
            EVENTS & EVENT ORGANIZATION FACILITIES
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/10 dark:border-white/10">
          <div>
            <h1 className={`font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
              Extraordinary <span className="italic font-normal gold-gradient-text">Gatherings.</span>
            </h1>
            <p className={`text-sm sm:text-base font-light max-w-2xl mt-3 leading-relaxed ${isLight ? 'text-[#575249]' : 'text-[#ada79b]'}`}>
              From exclusive cliffside weddings and symphonic galas to confidential executive retreats, Aurelia provides comprehensive event planning, 3-star culinary orchestration, and private venue buyouts.
            </p>
          </div>

          <a href="#plan-event" className="luxury-btn text-xs self-start lg:self-auto">
            Plan Your Event
          </a>
        </div>
      </section>

      {/* Event Services Grid - Ultra-Premium Architectural Disciplines */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold block mb-3 ${
            isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
          }`}>
            COMPLETE EVENT ORGANIZATION
          </span>
          <h2 className={`font-serif text-4xl sm:text-5xl font-light ${
            isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
          }`}>
            Our Event Disciplines.
          </h2>
          <p className={`text-sm mt-3 font-light max-w-lg mx-auto ${
            isLight ? 'text-[#575249]' : 'text-[#a39e93]'
          }`}>
            Four bespoke hospitality pillars orchestrating uncompromised private sovereignty along the Riviera.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group ${
                  isLight
                    ? 'bg-white border-[#c5a880]/30 shadow-[0_4px_18px_rgba(0,0,0,0.03)] hover:border-[#8f6a35] hover:shadow-[0_12px_30px_rgba(143,106,53,0.12)]'
                    : 'bg-[#121417] border-white/10 hover:border-[#c5a880]/45 shadow-xl hover:shadow-2xl'
                }`}
              >
                <div>
                  {/* Top Bar: Monogram Index & Tailored Icon */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5 dark:border-white/5">
                    <span className={`text-xs font-mono font-bold tracking-widest ${
                      isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                    }`}>
                      {srv.index}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                      isLight
                        ? 'border-[#c5a880]/35 bg-[#faf7f2] text-[#8f6a35] group-hover:border-[#8f6a35]'
                        : 'border-white/10 bg-white/5 text-[#c5a880] group-hover:border-[#c5a880]/50'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Discipline Category Tag */}
                  <span className={`text-[9px] uppercase font-mono tracking-[0.22em] font-semibold block mb-2 ${
                    isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                  }`}>
                    {srv.tag}
                  </span>

                  {/* Discipline Title */}
                  <h3 className={`font-serif text-2xl font-normal leading-snug mb-3 ${
                    isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
                  }`}>
                    {srv.title}
                  </h3>

                  {/* Narrative Body */}
                  <p className={`text-xs font-light leading-relaxed ${
                    isLight ? 'text-[#575249]' : 'text-[#9c968a]'
                  }`}>
                    {srv.desc}
                  </p>
                </div>

                {/* Card Footer: Capacity & Curated Feature */}
                <div className="pt-6 mt-6 border-t border-black/5 dark:border-white/5 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={isLight ? 'text-[#7a7469]' : 'text-[#858076]'}>Capacity</span>
                    <span className={`font-semibold ${isLight ? 'text-[#1c1917]' : 'text-[#e5cb9f]'}`}>{srv.capacity}</span>
                  </div>
                  <span className={`text-[11px] font-sans ${isLight ? 'text-[#8a8479]' : 'text-[#706c64]'}`}>
                    {srv.feature}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Venues - Architectural Portfolio Cards */}
      <section className={`py-24 transition-colors duration-500 border-y ${
        isLight
          ? 'bg-[#f4efe6] border-[#c5a880]/30'
          : 'bg-[#0c0d10] border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold block mb-2 ${
                isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
              }`}>
                SANCTUARY VENUE PORTFOLIO
              </span>
              <h2 className={`font-serif text-4xl sm:text-5xl font-light ${
                isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
              }`}>
                Distinctive Event Spaces.
              </h2>
            </div>
            <p className={`text-sm font-light max-w-md ${
              isLight ? 'text-[#575249]' : 'text-[#ada79b]'
            }`}>
              Each venue offers distinct topography, natural light orientation, and seamless service pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {venues.map((v, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border overflow-hidden flex flex-col sm:flex-row transition-all duration-400 group ${
                  isLight
                    ? 'bg-white border-[#c5a880]/30 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#8f6a35] hover:shadow-[0_12px_32px_rgba(143,106,53,0.1)]'
                    : 'bg-[#121418] border-white/10 hover:border-[#c5a880]/40 shadow-xl'
                }`}
              >
                {/* Architectural Photo Frame */}
                <div className="sm:w-5/12 relative h-56 sm:h-auto overflow-hidden bg-black/40 flex-shrink-0">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />
                  <span className="absolute top-3.5 left-3.5 text-[9px] uppercase font-mono tracking-widest px-2.5 py-1 rounded bg-black/75 text-[#f5f2eb] border border-white/10 font-semibold backdrop-blur-sm">
                    {v.setting}
                  </span>
                </div>

                {/* Architectural Specs & Content */}
                <div className="sm:w-7/12 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className={`font-serif text-xl sm:text-2xl font-normal leading-tight ${
                        isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
                      }`}>
                        {v.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex-shrink-0 ${
                        isLight 
                          ? 'bg-[#f7f4ee] text-[#8f6a35] border border-[#c5a880]/35' 
                          : 'bg-white/5 text-[#c5a880] border border-white/10'
                      }`}>
                        {v.capacity}
                      </span>
                    </div>

                    <p className={`text-xs font-light leading-relaxed my-3 line-clamp-3 ${
                      isLight ? 'text-[#575249]' : 'text-[#9c968a]'
                    }`}>
                      {v.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono mt-2">
                      <span className={`px-2 py-0.5 rounded ${
                        isLight ? 'bg-[#f4efe6] text-[#575249]' : 'bg-[#181a20] text-[#a19b8f]'
                      }`}>
                        {v.area}
                      </span>
                      <span className={`px-2 py-0.5 rounded ${
                        isLight ? 'bg-[#f4efe6] text-[#575249]' : 'bg-[#181a20] text-[#a19b8f]'
                      }`}>
                        {v.orientation}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                    <a
                      href="#plan-event"
                      className={`text-xs uppercase font-mono tracking-wider font-semibold transition-colors flex items-center gap-1.5 ${
                        isLight
                          ? 'text-[#8f6a35] hover:text-[#1c1917]'
                          : 'text-[#c5a880] hover:text-white'
                      }`}
                    >
                      <span>Inquire Availability</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Database Events / Past Highlights */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold block mb-3 ${
            isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
          }`}>
            CURATED CELEBRATIONS
          </span>
          <h2 className={`font-serif text-4xl sm:text-5xl font-light ${
            isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
          }`}>
            Featured Occasions.
          </h2>
        </div>

        {loadingEvents ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className={`h-96 rounded-2xl animate-pulse ${isLight ? 'bg-black/5' : 'bg-[#121418]'}`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((ev) => (
              <div
                key={ev.id}
                className={`group rounded-2xl overflow-hidden border transition-all duration-400 ${
                  isLight
                    ? 'bg-white border-[#c5a880]/30 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-[#8f6a35]'
                    : 'bg-[#121316] border-white/10 hover:border-[#c5a880]/40'
                }`}
              >
                <div className="relative h-72 w-full overflow-hidden bg-black/40">
                  <img
                    src={ev.cover_image}
                    alt={ev.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-104 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <span className="absolute top-4 left-4 text-[10px] uppercase font-mono tracking-widest text-[#f5f2eb] px-3.5 py-1.5 rounded bg-black/75 border border-white/10 font-semibold backdrop-blur-sm">
                    {ev.event_type}
                  </span>
                  {ev.capacity && (
                    <span className="absolute top-4 right-4 text-[10px] uppercase font-mono tracking-widest text-[#c5a880] px-3.5 py-1.5 rounded bg-black/75 border border-white/10 font-semibold backdrop-blur-sm">
                      {ev.capacity}
                    </span>
                  )}
                </div>

                <div className="p-8">
                  <h3 className={`font-serif text-2xl sm:text-3xl mb-3 transition-colors ${
                    isLight ? 'text-[#1c1917] group-hover:text-[#8f6a35]' : 'text-[#faf6ed] group-hover:text-[#e5cb9f]'
                  }`}>
                    {ev.title}
                  </h3>
                  <p className={`text-sm font-light leading-relaxed mb-4 ${
                    isLight ? 'text-[#575249]' : 'text-[#ada79b]'
                  }`}>
                    {ev.description}
                  </p>
                  {ev.full_details && (
                    <p className={`text-xs font-light leading-relaxed mb-6 ${
                      isLight ? 'text-[#7a7469]' : 'text-[#8a857b]'
                    }`}>
                      {ev.full_details}
                    </p>
                  )}
                  <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className={isLight ? 'text-[#7a7469]' : 'text-[#8e897e]'}>
                      {ev.venue_area || 'Cap d’Antibes Grounds'}
                    </span>
                    <a
                      href="#plan-event"
                      className={`uppercase tracking-wider font-semibold flex items-center gap-1 ${
                        isLight ? 'text-[#8f6a35] hover:text-[#1c1917]' : 'text-[#c5a880] hover:text-white'
                      }`}
                    >
                      <span>Request Similar Event</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Coordination Workflow */}
      <section className={`py-24 transition-colors duration-500 border-t ${
        isLight ? 'bg-[#f4efe6] border-[#c5a880]/30' : 'bg-[#0c0d10] border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold block mb-3 ${
              isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
            }`}>
              THE PRODUCTION JOURNEY
            </span>
            <h2 className={`font-serif text-4xl sm:text-5xl font-light ${
              isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
            }`}>
              How We Create Perfection.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((wf) => (
              <div
                key={wf.step}
                className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 relative flex flex-col justify-between ${
                  isLight
                    ? 'bg-white border-[#c5a880]/30 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-[#8f6a35]'
                    : 'bg-[#121417] border-white/10 hover:border-[#c5a880]/40'
                }`}
              >
                <div>
                  <span className={`font-mono text-2xl font-light block mb-4 ${
                    isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                  }`}>
                    {wf.step}
                  </span>
                  <h3 className={`font-serif text-xl mb-2 ${
                    isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
                  }`}>
                    {wf.title}
                  </h3>
                  <p className={`text-xs font-light leading-relaxed ${
                    isLight ? 'text-[#575249]' : 'text-[#8e897e]'
                  }`}>
                    {wf.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENT INQUIRY & BOOKING REQUEST FORM (INR BUDGETS) */}
      <section id="plan-event" className="py-24 max-w-5xl mx-auto px-6 md:px-12">
        <div className={`rounded-3xl border p-8 sm:p-14 shadow-2xl relative overflow-hidden transition-colors duration-500 ${
          isLight
            ? 'bg-white border-[#c5a880]/40 shadow-[0_16px_45px_rgba(143,106,53,0.08)]'
            : 'bg-[#121316] border-[#c5a880]/30'
        }`}>
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className={`inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase mb-2 ${
              isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
            }`}>
              <Sparkles className="w-4 h-4" />
              <span>PRIVATE EVENT REQUEST</span>
            </div>
            <h2 className={`font-serif text-3xl sm:text-5xl font-light mb-3 ${
              isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
            }`}>
              Discuss Your Event.
            </h2>
            <p className={`text-xs sm:text-sm font-light ${
              isLight ? 'text-[#575249]' : 'text-[#ada79b]'
            }`}>
              Please submit your gathering parameters. Our Private Events Director will prepare an initial bespoke proposal.
            </p>
          </div>

          {confirmation ? (
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-[#faf6ed]">
                Inquiry Logged in Sanctuary Database
              </h3>
              <p className="text-sm text-[#ada79b] max-w-md mx-auto leading-relaxed">
                Your event inquiry reference is <strong className="text-[#c5a880] font-mono">{confirmation}</strong>. Our Private Events Director will contact you within 24 business hours to arrange your conceptual review.
              </p>
              <button
                onClick={() => setConfirmation(null)}
                className="luxury-btn text-xs mx-auto"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-6">
              {formError && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs">
                  {formError}
                </div>
              )}

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-xs uppercase tracking-wider mb-2 font-medium ${isLight ? 'text-[#575249]' : 'text-[#9e988c]'}`}>Organizer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Helena Vanderbilt"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                      isLight 
                        ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] placeholder-[#8a8479] focus:border-[#8f6a35]' 
                        : 'bg-[#171920] border border-white/10 text-[#faf6ed] placeholder-[#6b665c] focus:border-[#c5a880]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs uppercase tracking-wider mb-2 font-medium ${isLight ? 'text-[#575249]' : 'text-[#9e988c]'}`}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="organizer@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                      isLight 
                        ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] placeholder-[#8a8479] focus:border-[#8f6a35]' 
                        : 'bg-[#171920] border border-white/10 text-[#faf6ed] placeholder-[#6b665c] focus:border-[#c5a880]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs uppercase tracking-wider mb-2 font-medium ${isLight ? 'text-[#575249]' : 'text-[#9e988c]'}`}>Telephone / Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 or international format"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                      isLight 
                        ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] placeholder-[#8a8479] focus:border-[#8f6a35]' 
                        : 'bg-[#171920] border border-white/10 text-[#faf6ed] placeholder-[#6b665c] focus:border-[#c5a880]'
                    }`}
                  />
                </div>
              </div>

              {/* Event Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-xs uppercase tracking-wider mb-2 font-medium ${isLight ? 'text-[#575249]' : 'text-[#9e988c]'}`}>Event Category *</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                      isLight 
                        ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] focus:border-[#8f6a35]' 
                        : 'bg-[#171920] border border-white/10 text-[#faf6ed] focus:border-[#c5a880]'
                    }`}
                  >
                    <option value="Weddings & Celebrations">Weddings & Celebrations</option>
                    <option value="Curated Galas">Curated Galas & Dinners</option>
                    <option value="Executive Summits">Executive Strategic Summits</option>
                    <option value="Private Villa Soirée">Private Villa Soirée</option>
                    <option value="Full Resort Buyout">Full Resort Buyout</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-xs uppercase tracking-wider mb-2 font-medium ${isLight ? 'text-[#575249]' : 'text-[#9e988c]'}`}>Preferred Event Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                      isLight 
                        ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] focus:border-[#8f6a35]' 
                        : 'bg-[#171920] border border-white/10 text-[#faf6ed] focus:border-[#c5a880]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs uppercase tracking-wider mb-2 font-medium ${isLight ? 'text-[#575249]' : 'text-[#9e988c]'}`}>Estimated Guest Count</label>
                  <input
                    type="number"
                    min="5"
                    max="300"
                    placeholder="e.g. 80"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                      isLight 
                        ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] placeholder-[#8a8479] focus:border-[#8f6a35]' 
                        : 'bg-[#171920] border border-white/10 text-[#faf6ed] placeholder-[#6b665c] focus:border-[#c5a880]'
                    }`}
                  />
                </div>
              </div>

              {/* Venue & Budget in INR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs uppercase tracking-wider mb-2 font-medium ${isLight ? 'text-[#575249]' : 'text-[#9e988c]'}`}>Preferred Venue Space</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                      isLight 
                        ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] focus:border-[#8f6a35]' 
                        : 'bg-[#171920] border border-white/10 text-[#faf6ed] focus:border-[#c5a880]'
                    }`}
                  >
                    <option value="The Cliff Amphitheater & Lower Terraces">The Cliff Amphitheater & Lower Terraces</option>
                    <option value="The Horizon Glass Pavilion">The Horizon Glass Pavilion</option>
                    <option value="Ancient Olive Grove Courtyard">Ancient Olive Grove Courtyard</option>
                    <option value="Private Riva Marina Pier">Private Riva Marina Pier</option>
                    <option value="Full Estate Buyout (All Venues)">Full Estate Buyout (All Venues)</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-xs uppercase tracking-wider mb-2 font-medium ${isLight ? 'text-[#575249]' : 'text-[#9e988c]'}`}>Target Budget Range (INR)</label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                      isLight 
                        ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] focus:border-[#8f6a35]' 
                        : 'bg-[#171920] border border-white/10 text-[#faf6ed] focus:border-[#c5a880]'
                    }`}
                  >
                    <option value="₹25,00,000 - ₹50,00,000">₹25,00,000 - ₹50,00,000</option>
                    <option value="₹50,00,000 - ₹1,00,00,000">₹50,00,000 - ₹1,00,00,000</option>
                    <option value="₹1,00,00,000 - ₹2,50,00,000">₹1,00,00,000 - ₹2,50,00,000</option>
                    <option value="₹2,50,00,000+ (Grand Estate Buyout)">₹2,50,00,000+ (Grand Estate Buyout)</option>
                  </select>
                </div>
              </div>

              {/* Additional Requirements */}
              <div>
                <label className={`block text-xs uppercase tracking-wider mb-2 font-medium ${isLight ? 'text-[#575249]' : 'text-[#9e988c]'}`}>
                  Culinary, Production, & Accommodations Vision
                </label>
                <textarea
                  rows="4"
                  placeholder="Detail your desired musical staging, Michelin culinary preferences, suite block requirements, or VIP security..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className={`w-full rounded-xl px-4 py-3 text-xs focus:outline-none transition-colors ${
                    isLight 
                      ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] placeholder-[#8a8479] focus:border-[#8f6a35]' 
                      : 'bg-[#171920] border border-white/10 text-[#faf6ed] placeholder-[#6b665c] focus:border-[#c5a880]'
                  }`}
                />
              </div>

              {/* Submit CTA & Disclaimers */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/10 dark:border-white/10">
                <div className={`flex items-center gap-2 text-[11px] ${isLight ? 'text-[#706a5e]' : 'text-[#736e65]'}`}>
                  <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`} />
                  <span>Inquiry submission initiates bespoke proposal. Not a binding event contract.</span>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto luxury-btn text-xs"
                >
                  {submitting ? 'Transmitting Proposal Request...' : 'Transmit Event Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
