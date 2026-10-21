import React, { useState } from 'react';
import { Sparkles, Utensils, Award, Clock, ArrowRight, Wine, ChefHat } from 'lucide-react';
import { useReservation } from '../components/Layout';
import { useTheme } from '../context/ThemeContext';
import InteractiveHoverButton from '../components/ui/InteractiveHoverButton';
import ShinyText from '../components/ui/ShinyText';

export default function Dining({ onOpenReservation }) {
  const { openReservation } = useReservation();
  const handleReserve = onOpenReservation || openReservation;
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [activeMenu, setActiveMenu] = useState('terra');

  const terraCourses = [
    {
      course: 'I. Amuse-Bouche',
      title: 'Sea Urchin & Wild Fennel Brioche',
      desc: 'Antibes diver sea urchin, preserved citrus zest, sea water emulsion, toasted sea kelp powder.',
      pairing: 'Domaine Tempier Bandol Blanc 2021',
      tag: 'DIVED COASTAL HARVEST',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
    {
      course: 'II. Entrée',
      title: 'Carpaccio of Mediterranean Langoustine',
      desc: 'Caviar de Sologne, elderflower vinaigrette, pickled green alpine strawberries, coastal sea purslane.',
      pairing: "Chablis Grand Cru 'Les Clos' 2019",
      tag: 'COLD-WATER EXTRACTION',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    },
    {
      course: 'III. Harvest',
      title: 'Heirloom Baby Artichokes Barigoule',
      desc: 'Black winter truffle broth, 24-month aged parmesan crisps, hand-crushed hillside herb olive oil.',
      pairing: 'Château Simone Palette Blanc 2020',
      tag: 'ESTATE BOTANICAL GARDEN',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    },
    {
      course: 'IV. Poisson',
      title: 'Line-Caught Turbot in Fig Leaf',
      desc: 'Charred leek velouté, samphire sea grass, golden Oscietra caviar, wood-fired reduction.',
      pairing: "Meursault 1er Cru 'Charmes' 2018",
      tag: 'MORNING FISHERMAN LANDING',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    },
    {
      course: 'V. Viande',
      title: 'Sisteron Lamb Loin roasted in Wild Thyme',
      desc: 'Smoked aubergine purée, confit Provencal shallot, 72-hour natural lamb reduction jus.',
      pairing: 'Château Margaux 1er Grand Cru Classé 2010',
      tag: 'HAUTE-PROVENCE PASTURE',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    },
    {
      course: 'VI. Pré-Dessert',
      title: 'Sorbet of Green Apple & Chartreuse',
      desc: 'Crisp meringue shard, coastal mint granite, freeze-dried lemon verbena blossom.',
      pairing: 'Chartreuse V.E.P. Verte Herbal Elixir',
      tag: 'PALATE PURIFICATION',
      image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=800&q=80',
    },
    {
      course: 'VII. Dessert',
      title: 'Single-Origin Chuao Chocolate & Smoked Salt',
      desc: 'Caramelized hazelnut sable, Bourbon vanilla bean glace, edible 24k gold leaf foil.',
      pairing: "Taylor's Vintage Port 1994",
      tag: 'GRAND FINAL FINALE',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const grandCourses = [
    {
      course: 'I. Prelude',
      title: 'Oyster Perle Noire in Champagne Gelée',
      desc: 'Finger lime pearls, coastal borage blossoms, sea urchin dust, crystalline seawater foam.',
      pairing: 'Dom Pérignon Vintage Champagne 2013',
      tag: 'COLD BRINE PRELUDE',
      image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80',
    },
    {
      course: 'II. Amuse',
      title: 'Tartare of Red Prawn from Sanremo',
      desc: 'Truffled emulsion, cold-pressed estate smoked olive oil, micro sea purslane.',
      pairing: 'Gaja Gaia & Rey Langhe Chardonnay 2020',
      tag: 'LIGURIAN SAPPHIRE CATCH',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    },
    {
      course: 'III. First Service',
      title: 'Foie Gras Poached in Spiced Sauternes',
      desc: 'Warm brioche feuilletée, caramelized heirloom mission figs, wild thyme blossom honey.',
      pairing: "Château d'Yquem 1er Cru Supérieur 2011",
      tag: 'ARTISANAL DE LUXE',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    },
    {
      course: 'IV. Coastal Catch',
      title: 'Mediterranean Blue Lobster Tail',
      desc: 'Roasted shell bisque reduction, baby courgette blossoms, Sorrento lemon emulsion.',
      pairing: 'Corton-Charlemagne Grand Cru 2017',
      tag: 'DEEP COVE BLUE HARVEST',
      image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80',
    },
    {
      course: 'V. Intermezzo',
      title: 'Geothermal Mineral Consommé',
      desc: 'Infused with fragrant maritime pine needles, wild cepes, and Alba winter white truffles.',
      pairing: 'Domaine de la Romanée-Conti Marc de Bourgogne',
      tag: 'GEOTHERMAL INFUSION',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    },
    {
      course: 'VI. Meat Course',
      title: 'Wagyu A5 Striploin over Olive Charcoal',
      desc: 'Bone marrow natural glaze, pomme soufflée, heirloom baby carrots glazed in lavender.',
      pairing: 'Château Cheval Blanc Premier Grand Cru 2005',
      tag: 'WOOD-FIRED EMBERS',
      image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    },
    {
      course: 'VII. Fromage',
      title: 'Affiné Cheeses from Haute-Provence',
      desc: 'Aged raw sheep and goat tommes, wild lavender honeycomb, toasted walnut sourdough.',
      pairing: 'Hermitage Blanc Jean-Louis Chave 2016',
      tag: 'PROVENCAL TERROIR VAULT',
      image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=80',
    },
    {
      course: 'VIII. Final Grandeur',
      title: 'Golden Soufflé with Grand Marnier Cuvée',
      desc: 'Tahitian vanilla bean crème anglaise poured tableside with candied orange blossoms.',
      pairing: 'Château Coutet 1er Cru Barsac 2009',
      tag: 'CÉLESTE ÉTOILÉE',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className={`transition-colors duration-500 overflow-x-hidden ${isLight ? 'bg-[#f7f5f0] text-[#1c1917]' : 'bg-[#090a0b] text-[#f5f2eb]'}`}>
      {/* 1. TOP CINEMATIC IMAGE FIRST */}
      <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={
            isLight
              ? 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85'
              : 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85'
          }
          alt="L'Horizon Culinary Art"
          className="w-full h-full object-cover filter brightness-[0.88]"
        />
        <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-[#f7f5f0] via-transparent to-black/40' : 'bg-gradient-to-t from-[#090a0b] via-transparent to-black/60'}`} />
        <div className="absolute top-28 sm:top-32 left-4 sm:left-6 md:left-12">
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.3em] sm:tracking-[0.4em] text-[#c5a880] px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            THREE MICHELIN STARS • 2026
          </span>
        </div>
      </section>

      {/* 2. TITLE & EYEBROW AFTER IMAGE (NO NEGATIVE MARGIN OVERFLOW) */}
      <section className="relative px-6 md:px-12 pt-10 sm:pt-14 pb-12 max-w-7xl mx-auto z-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-[#c5a880]" />
          <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
            MICHELIN-STARRED GASTRONOMY
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-black/10 dark:border-white/10">
          <div>
            <h1 className={`font-serif text-3xl sm:text-5xl md:text-7xl font-light leading-tight tracking-tight ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
              L’Horizon{' '}
              <span className="italic font-normal">
                <ShinyText speed={5}>Restaurant.</ShinyText>
              </span>
            </h1>
            <p className={`text-base font-light max-w-2xl mt-4 leading-relaxed ${isLight ? 'text-[#575249]' : 'text-[#ada79b]'}`}>
              Three-Star Michelin craft suspended over the cliffs. A quiet devotion to wild marine harvests, rare heirloom produce from our hillside garden, and biodynamic terroir.
            </p>
          </div>

          <InteractiveHoverButton
            onClick={() => handleReserve("Dining Reservation: L’Horizon Table")}
            variant="gold"
            className="self-start lg:self-auto py-3 px-6 text-xs w-full sm:w-auto text-center"
          >
            Reserve Table Experience
          </InteractiveHoverButton>
        </div>
      </section>

      {/* Chef Profile & Philosophy */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
                alt="Chef Marc Évrard"
                className="w-full h-[480px] object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-serif text-2xl text-[#faf6ed] block">Chef Marc Évrard</span>
                <span className="text-xs uppercase tracking-widest text-[#c5a880]">Chef de Cuisine • 3 Michelin Stars</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-semibold block">
              THE CULINARY MANIFESTO
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#faf6ed] font-light leading-tight">
              "We do not manipulate nature; we <span className="italic font-normal gold-gradient-text">amplify its purity.</span>"
            </h2>
            <div className="space-y-4 text-base text-[#ada79b] font-light leading-relaxed">
              <p>
                Each morning begins at 5:00 AM with the return of local Antibes fishing smacks to our private harbor. Whatever the sea yields determines the nuance of that evening's degustation.
              </p>
              <p>
                Our 4-acre organic hillside garden supplies heirloom tomatoes, wild capers, fragrant citrus, and thyme picked mere hours before service. Nothing arrives frozen; nothing is mass-manufactured.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="font-serif text-3xl text-[#faf6ed]">3★</span>
                <span className="text-[10px] uppercase tracking-widest text-[#8a857b] block mt-1">Michelin Guide</span>
              </div>
              <div>
                <span className="font-serif text-3xl text-[#faf6ed]">4,500</span>
                <span className="text-[10px] uppercase tracking-widest text-[#8a857b] block mt-1">Vintage Cellar</span>
              </div>
              <div>
                <span className="font-serif text-3xl text-[#faf6ed]">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-[#8a857b] block mt-1">Zero-KM Organics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Degustation Menus Showcase (INR PRICING) */}
      <section className={`py-24 border-y transition-colors duration-500 ${isLight ? 'bg-[#eeebe3] border-black/5' : 'bg-[#0c0d10] border-white/5'}`}>
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold block mb-3 ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
              SEASONAL DEGUSTATION
            </span>
            <h2 className={`font-serif text-3xl sm:text-5xl font-light mb-6 ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
              The Evening Tasting Odysseys.
            </h2>
            <div className={`inline-flex flex-col sm:flex-row p-1.5 rounded-2xl sm:rounded-full border max-w-full gap-1.5 sm:gap-0 ${
              isLight
                ? 'bg-[#ede8df] border-[#c5a880]/30'
                : 'bg-[#14161b] border border-white/10'
            }`}>
              <button
                onClick={() => setActiveMenu('terra')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-xs uppercase tracking-widest font-medium transition-all text-center ${
                  activeMenu === 'terra'
                    ? isLight
                      ? 'bg-[#8f6a35] text-white font-semibold shadow-md'
                      : 'bg-[#c5a880] text-[#090a0b] font-semibold shadow-md'
                    : isLight
                    ? 'text-[#575249] hover:text-[#1c1917]'
                    : 'text-[#8e897e] hover:text-[#faf6ed]'
                }`}
              >
                Terra & Mare (7 Courses • ₹24,500)
              </button>
              <button
                onClick={() => setActiveMenu('grand')}
                className={`px-4 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-xs uppercase tracking-widest font-medium transition-all text-center ${
                  activeMenu === 'grand'
                    ? isLight
                      ? 'bg-[#8f6a35] text-white font-semibold shadow-md'
                      : 'bg-[#c5a880] text-[#090a0b] font-semibold shadow-md'
                    : isLight
                    ? 'text-[#575249] hover:text-[#1c1917]'
                    : 'text-[#8e897e] hover:text-[#faf6ed]'
                }`}
              >
                Grand Degustation (8 Courses • ₹32,000)
              </button>
            </div>
          </div>

          {/* Sticky Stacking Scroll Menu Cards (50% Width Split Layout) */}
          <div className="relative pb-16">
            {(activeMenu === 'terra' ? terraCourses : grandCourses).map((item, idx, arr) => (
              <div
                key={`${activeMenu}-${idx}`}
                style={{
                  top: `calc(96px + ${idx * 26}px)`,
                  zIndex: idx + 10,
                }}
                className={`sticky rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-2xl transition-all duration-300 mb-8 group ${
                  isLight
                    ? 'bg-white border border-[#c5a880]/35 shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-[#8f6a35]/60'
                    : 'bg-gradient-to-br from-[#191b22] via-[#131418] to-[#0c0d10] border border-[#c5a880]/30 hover:border-[#c5a880]/70 shadow-[0_25px_60px_rgba(0,0,0,0.9)]'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                  {/* Left 50% Width: Course Designation & Grand Dish Name */}
                  <div className={`w-full md:w-1/2 flex flex-col justify-between pr-0 md:pr-8 border-b md:border-b-0 md:border-r pb-6 md:pb-0 min-h-[220px] ${
                    isLight ? 'border-[#c5a880]/20' : 'border-white/10'
                  }`}>
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2.5 mb-3">
                        <span className={`text-[11px] font-mono uppercase tracking-[0.25em] font-semibold px-3 py-1 rounded-full ${
                          isLight
                            ? 'bg-[#c5a880]/15 border border-[#c5a880]/35 text-[#8f6a35]'
                            : 'bg-[#c5a880]/10 border border-[#c5a880]/25 text-[#c5a880]'
                        }`}>
                          {item.course}
                        </span>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#8a857b]">
                          {item.tag}
                        </span>
                      </div>

                      {/* Prominent Dish Name across 50% width */}
                      <h4 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.12] tracking-tight transition-colors mt-2 ${
                        isLight
                          ? 'text-[#1c1917] group-hover:text-[#8f6a35]'
                          : 'text-[#faf6ed] group-hover:text-[#e5cb9f]'
                      }`}>
                        {item.title}
                      </h4>
                    </div>

                    {/* Bottom Course Counter Indicator */}
                    <div className="pt-6 hidden md:flex items-center gap-3">
                      <span className={`w-8 h-[1px] ${isLight ? 'bg-[#c5a880]/40' : 'bg-[#c5a880]/50'}`} />
                      <span className={`font-mono text-xs uppercase tracking-widest ${
                        isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]/70'
                      }`}>
                        COURSE 0{idx + 1} / 0{arr.length}
                      </span>
                    </div>
                  </div>

                  {/* Right 50% Width: Culinary Description, Dish Photo & Sommelier Pairing (No Gaps) */}
                  <div className="w-full md:w-1/2 flex flex-col space-y-4 pl-0 md:pl-2">
                    {/* Narrative Description */}
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#8a857b] block mb-1">
                        CULINARY NARRATIVE & INGREDIENTS
                      </span>
                      <p className={`text-sm font-light leading-relaxed ${
                        isLight ? 'text-[#575249]' : 'text-[#ada79b]'
                      }`}>
                        {item.desc}
                      </p>
                    </div>

                    {/* Culinary Dish Plate Photograph */}
                    {item.image && (
                      <div className={`relative h-40 sm:h-44 w-full rounded-2xl overflow-hidden shadow-lg group/img ${
                        isLight ? 'border border-[#c5a880]/20' : 'border border-white/10'
                      }`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.92] group-hover:brightness-100"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute bottom-2.5 left-3 text-[9px] font-mono uppercase tracking-widest text-[#f5f2eb] px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                          Plated Tableside
                        </span>
                      </div>
                    )}

                    {/* Sommelier Pairing Highlight Drawer */}
                    <div className={`p-3.5 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                      isLight
                        ? 'bg-[#f7f5f0] border border-[#c5a880]/30 group-hover:border-[#8f6a35]/50'
                        : 'bg-[#0a0b0d]/80 border border-white/10 group-hover:border-[#c5a880]/30'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isLight
                            ? 'bg-[#c5a880]/20 border border-[#c5a880]/40'
                            : 'bg-[#c5a880]/15 border border-[#c5a880]/30'
                        }`}>
                          <Wine className={`w-3.5 h-3.5 ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`} />
                        </div>
                        <div>
                          <span className="text-[8px] uppercase font-mono tracking-widest text-[#8a857b] block">
                            SOMMELIER GRAND CRU PAIRING
                          </span>
                          <span className={`font-serif text-sm sm:text-base italic font-light ${
                            isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
                          }`}>
                            {item.pairing}
                          </span>
                        </div>
                      </div>

                      <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full self-start sm:self-auto whitespace-nowrap">
                        Pairing Included
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reserve Menu CTA */}
          <div className="mt-16 text-center relative z-40">
            <InteractiveHoverButton
              onClick={() => handleReserve(`Dining Degustation: ${activeMenu === 'terra' ? 'Terra & Mare' : 'Grand Degustation'}`)}
              variant="gold"
              className="py-3.5 px-8 text-xs tracking-[0.22em]"
            >
              Reserve This Tasting Menu
            </InteractiveHoverButton>
          </div>
        </div>
      </section>

      {/* The Sommelier Cellar */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold block">
              THE SUBTERRANEAN WINE CELLAR
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#faf6ed] font-light">
              Rare Terroir. Historic Vintages.
            </h2>
            <p className="text-base text-[#ada79b] font-light leading-relaxed">
              Carved four meters beneath the cliff into natural granite, our temperature-stabilized vaulted cellar protects over 4,500 historic bottles. Head Sommelier Éléonore Vasseur guides private tastings of rare Burgundy Premier Crus, Bordeaux first growths, and biodynamic Provencal gems.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleReserve('Private Cellar Tasting Session')}
                className="luxury-btn-outline text-xs"
              >
                Request Private Sommelier Tasting
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80"
                alt="Aurelia Wine Cellar"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
