import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import FlipCard from '../components/ui/FlipCard';
import InteractiveHoverButton from '../components/ui/InteractiveHoverButton';
import ShinyText from '../components/ui/ShinyText';
import Text3DFlip from '../components/ui/Text3DFlip';
import ThreeDImageRing from '../components/ui/ThreeDImageRing';
import ThreeDCardStack from '../components/ui/ThreeDCardStack';
import ThreeDBendSlider from '../components/ui/ThreeDBendSlider';
import ThreeDVenuePerspective from '../components/ui/ThreeDVenuePerspective';
import {
  Sparkles, ArrowRight, Award, Compass, Heart, Calendar,
  Waves, Utensils, Shield, MapPin, Eye, Check, ChevronRight, Anchor,
  Sun, Moon, Clock, Sliders, Volume2, VolumeX, Wind, Thermometer,
  Gauge, Activity, Play, Pause, Layers, Wine, Coffee, Flame, CheckCircle2, BedDouble, Bath, Wifi,
  Navigation, Star, Quote, Droplets, Gem
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  // 1. Interactive 24-Hour Solar Journey State
  const [activeHourIndex, setActiveHourIndex] = useState(2); // 14:00 High-sea speedboat
  const [isSolarAutoPlaying, setIsSolarAutoPlaying] = useState(true);

  // 2. Interactive Stay Experience Composer State
  const [selectedComposerMood, setSelectedComposerMood] = useState('romance');

  // 3. Interactive Craftsmanship Atelier State
  const [activeAtelierTab, setActiveAtelierTab] = useState('travertine');

  // 4. Live Ambient Coastal Sound Generator (Web Audio API)
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  // 5. Live Sunset Countdown State
  const [timeUntilSunset, setTimeUntilSunset] = useState({ hours: 4, minutes: 28, seconds: 12 });

  // 6. Interactive Resort Topography Zone State
  const [activeResortZone, setActiveResortZone] = useState('villas');

  // Safe fallback image handler
  const handleImageError = (e, fallbackUrl) => {
    e.target.src = fallbackUrl || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80';
  };

  // Live Sunset Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilSunset((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 45, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 24-Hour Solar Journey Auto Progression
  useEffect(() => {
    if (!isSolarAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveHourIndex((prev) => (prev + 1) % solarMoments.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isSolarAutoPlaying]);

  // Synthetic Mediterranean Ambient Surf Audio Generator (Web Audio API)
  const toggleAmbientSound = () => {
    if (isSoundPlaying) {
      if (audioContextRef.current) {
        audioContextRef.current.suspend();
      }
      setIsSoundPlaying(false);
    } else {
      try {
        if (!audioContextRef.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          const ctx = new AudioContext();
          audioContextRef.current = ctx;

          // Generate synthetic pink noise buffer for realistic ocean surf
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
            b6 = white * 0.115926;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          // Lowpass filter simulating deep underwater swell
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(320, ctx.currentTime);

          // LFO to create rhythmic coastal ocean wave surges
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 sec ocean swell period
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(180, ctx.currentTime);
          lfo.connect(lfoGain);
          lfoGain.connect(filter.frequency);
          lfo.start();

          // Master Gain
          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(0.35, ctx.currentTime);

          whiteNoise.connect(filter);
          filter.connect(masterGain);
          masterGain.connect(ctx.destination);

          whiteNoise.start();
          noiseNodeRef.current = whiteNoise;
          gainNodeRef.current = masterGain;
        } else {
          audioContextRef.current.resume();
        }
        setIsSoundPlaying(true);
      } catch (e) {
        console.error('Audio initialization:', e);
      }
    }
  };

  // Featured Suites Data in INR (100% verified 200 OK images)
  const featuredSuites = [
    {
      slug: 'cliffside-infinity-villa',
      title: 'Cliffside Infinity Villa',
      subtitle: 'ULTRA-EXCLUSIVE PRIVATE HAVEN',
      desc: 'Suspended over turquoise waters with private heated limestone plunge pool, dedicated butler, and outdoor sunken firepit.',
      price: '₹2,15,000 / night',
      size: '220 m²',
      view: 'Oceanfront Sunset',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    },
    {
      slug: 'azure-ocean-penthouse',
      title: 'Azure Ocean Penthouse',
      subtitle: 'TOP-FLOOR PANORAMIC SKY HAVEN',
      desc: 'Unrivaled 360-degree panorama of the coastline with wrap-around cantilevered glass terrace and starlit hot tub.',
      price: '₹2,80,000 / night',
      size: '185 m²',
      view: '360° Coastline',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    },
    {
      slug: 'royal-olive-sanctuary',
      title: 'The Royal Olive Sanctuary',
      subtitle: 'HISTORIC BOTANICAL PRIVATE ESTATE',
      desc: 'Nestled within a 300-year-old secluded olive orchard with private walled courtyards and fragrant citrus gardens.',
      price: '₹1,65,000 / night',
      size: '160 m²',
      view: 'Botanical Grove',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  // 24-Hour Solar Journey Data (100% verified 200 OK images)
  const solarMoments = [
    {
      time: '06:30',
      phase: 'DAWN AWAKENING',
      title: 'Pranayama & Cantilever Sunrise Meditation',
      desc: 'First golden light refracts across calm turquoise waters. Gentle breathwork guided by our Ayurvedic master on the cliff edge as the mist clears over the Esterel.',
      quote: '“The quietest breath of the Mediterranean belongs to dawn.”',
      ambience: 'Gentle morning seabreeze • Wild thyme aromatics',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
      icon: Sun,
      color: 'from-amber-500/20 to-orange-500/10',
    },
    {
      time: '09:30',
      phase: 'CLIFFSIDE BOULANGERIE',
      title: 'Artisanal Breakfast in the Pergola',
      desc: 'Flaky warm croissants, hand-pressed wild lavender honey, fresh Mediterranean figs, and single-origin roasts prepared tableside overlooking the private cove.',
      quote: '“Every morning begins with warm porcelain and untamed views.”',
      ambience: 'Warm espresso • Coastal floral blossoms',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=85',
      icon: Coffee,
      color: 'from-yellow-500/20 to-amber-500/10',
    },
    {
      time: '14:00',
      phase: 'HIGH-SEA EXPEDITION',
      title: 'Riva 48ft Speedboat Voyage to Secret Coves',
      desc: 'Board directly from our private sheltered jetty. Glide across sapphire water with a master skipper, anchor in secluded limestone lagoons, and dive into crystal clarity.',
      quote: '“True luxury is having the entire azure horizon to yourself.”',
      ambience: 'Sea spray • Mahogany varnish • Chilled Dom Pérignon',
      // Verified 200 OK Luxury Boat on Azure Waters
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1400&q=85',
      icon: Anchor,
      color: 'from-cyan-500/20 to-blue-600/10',
    },
    {
      time: '17:30',
      phase: 'SUBTERRANEAN CALDARIUM',
      title: 'Geothermal Mineral Bath & Contrast Circuit',
      desc: 'Descend into subterranean granite grottos. Alternate between 40°C mineral-rich thermal springs and a 12°C glacier plunge pool to lower cortisol and renew vitality.',
      quote: '“Water heated by deep earth restores the soul.”',
      ambience: 'Eucalyptus steam • Heated Rapolano travertine',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85',
      icon: Waves,
      color: 'from-teal-500/20 to-emerald-500/10',
    },
    {
      time: '20:00',
      phase: 'MICHELIN 3★ ODYSSEY',
      title: 'Terra & Mare Starlit Degustation',
      desc: 'Chef Marc Évrard orchestrates an 8-course gastronomic poetry honoring wild Provencal terroir, accompanied by historic vintages retrieved from our vaulted cellar.',
      quote: '“Gastronomy that mirrors the poetry of the sea.”',
      ambience: 'Candlelight • Crystal stemware • 1996 Grand Cru Burgundy',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=85',
      icon: Utensils,
      color: 'from-purple-500/20 to-pink-500/10',
    },
    {
      time: '23:00',
      phase: 'MIDNIGHT CELESTIAL CANOPY',
      title: 'Cliffside Firepit & Rare Cognac Nocturne',
      desc: 'Gather around sunken limestone firepits under zero light pollution. Sip rare 1945 Bas-Armagnac as constellations reflect upon the undisturbed Mediterranean water.',
      quote: '“Where the infinite stars touch the tranquil sea.”',
      ambience: 'Crackle of cedar wood • Distant surf lullaby',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85',
      icon: Flame,
      color: 'from-indigo-600/25 to-black/40',
    },
  ];

  // Bespoke Stay Itinerary Composer Data (100% verified 200 OK images)
  const composerMoods = [
    {
      id: 'romance',
      title: 'Riviera High-Sea Romance',
      tag: 'INTIMATE ESCAPE',
      badge: 'FOR COUPLES & HONEYMOONS',
      totalPrice: '₹5,80,000',
      duration: '3 Nights / 4 Days',
      suiteSlug: 'cliffside-infinity-villa',
      suiteName: 'Cliffside Infinity Villa',
      highlights: [
        'Private Riva 48ft sunset charter with Oscietra caviar & champagne',
        'In-villa candlelit degustation prepared by Michelin 3★ chef',
        'Couples hot-stone obsidian massage in private grotto',
        'Daily breakfast served on private heated infinity plunge pool deck',
      ],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'wellness',
      title: 'Restorative Cellular Longevity',
      tag: 'VITALITY & BIO-HARMONY',
      badge: 'DEEP RESTORATION',
      totalPrice: '₹4,90,000',
      duration: '4 Nights / 5 Days',
      suiteSlug: 'royal-olive-sanctuary',
      suiteName: 'The Royal Olive Sanctuary',
      highlights: [
        'Daily diagnostic thermal circuit (Caldarium, Frigidarium, Herbarium)',
        'Personalized circadian sleep ritual with custom botanical terpene oils',
        'Private Ayurvedic breathwork and cliffside sunrise yoga every morning',
        'Organic plant-forward culinary menu curated with resort nutritionist',
      ],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'epicurean',
      title: 'Grand Terroir Oenological Odyssey',
      tag: 'GASTRONOMY & VINTAGES',
      badge: 'CONNOISSEUR CURATION',
      totalPrice: '₹6,40,000',
      duration: '3 Nights / 4 Days',
      suiteSlug: 'azure-ocean-penthouse',
      suiteName: 'Azure Ocean Penthouse',
      highlights: [
        'Subterranean vaulted cellar masterclass with Head Sommelier',
        'Rare 8-vintage vertical pairing featuring Domaine de la Romanée-Conti',
        'Private helicopter flight to historic Bandol & Cassis organic vineyards',
        'Hands-on culinary atelier in Chef Marc Évrard’s private test kitchen',
      ],
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Thermal Bathhouse Sequential Circuit Data (for 3D Image Ring)
  const bathhouseCircuit = [
    {
      id: 1,
      stage: 'STAGE 01',
      title: 'Tepidarium Travertine Lounge',
      desc: '36°C heated Rapolano stone loungers with Mediterranean herbal eucalyptus vapor.',
      temp: '36°C HEATED STONE',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      stage: 'STAGE 02',
      title: 'Caldarium Geothermal Springs',
      desc: '40°C volcanic mineral water rich in sulfur and magnesium carved from granite bedrock.',
      temp: '40°C GEOTHERMAL',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      stage: 'STAGE 03',
      title: 'Frigidarium Glacier Plunge',
      desc: '12°C pure Alpine snow-melt immersion pool designed to trigger instant cellular renewal.',
      temp: '12°C GLACIER PLUNGE',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      stage: 'STAGE 04',
      title: 'Himalayan Salt Steam Grotto',
      desc: 'Micro-ionized saline aerosol infusion to detoxify lungs and soothe the nervous system.',
      temp: '45°C SALINE MIST',
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      stage: 'STAGE 05',
      title: 'Subterranean Acoustic Floatation',
      desc: 'Zero-gravity saline floatation bath accompanied by somatic underwater sound waves.',
      temp: '35°C ZERO GRAVITY',
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // 3D Gastronomy Tasting Stack Data
  const tastingStackItems = [
    {
      id: 1,
      course: 'COURSE 02 • ENTRÉE',
      tag: 'MICHELIN 3★',
      title: 'Carpaccio of Mediterranean Langoustine',
      desc: 'Caviar de Sologne, elderflower vinaigrette, pickled green alpine strawberries, coastal sea purslane.',
      pairing: "Chablis Grand Cru 'Les Clos' 2019",
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      course: 'COURSE 04 • POISSON',
      tag: 'MORNING CATCH',
      title: 'Line-Caught Turbot in Fig Leaf',
      desc: 'Charred leek velouté, samphire sea grass, golden Oscietra caviar, natural wood-fired reduction.',
      pairing: "Meursault 1er Cru 'Charmes' 2018",
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      course: 'COURSE 05 • VIANDE',
      tag: 'HAUTE-PROVENCE',
      title: 'Sisteron Lamb Loin in Wild Thyme',
      desc: 'Smoked aubergine purée, confit Provencal shallot, 72-hour natural lamb reduction jus.',
      pairing: 'Château Margaux 1er Grand Cru Classé 2010',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      course: 'COURSE 07 • DESSERT',
      tag: 'GRAND FINALE',
      title: 'Single-Origin Chuao Chocolate',
      desc: 'Caramelized hazelnut sable, Bourbon vanilla bean glace, edible 24k gold leaf foil.',
      pairing: "Taylor's Vintage Port 1994",
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // 3D Maritime Fleet Data
  const maritimeFleetItems = [
    {
      id: 1,
      vessel: 'RIVA DOLCERIVA 48',
      speed: '38 KNOTS CRUISING',
      category: 'FLAGSHIP SPEEDBOAT',
      title: 'Riva 48ft Dolceriva Private Charter',
      desc: 'Mahogany open-deck masterpiece with master skipper, dedicated sommelier, and sheltered cabin.',
      capacity: 'Up to 8 Guests',
      duration: 'Half-Day & Full-Day Charters',
      image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 2,
      vessel: 'SEABOB F5S FLEET',
      speed: 'UNDERWATER THRUST',
      category: 'SUB-SURFACE ADVENTURE',
      title: 'Seabob Lagoon Exploration Scooters',
      desc: 'Zero-emission electric underwater scooters to glide weightlessly alongside vibrant coastal marine life.',
      capacity: 'Individual Pilot Controls',
      duration: 'Private Lagoon Sessions',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 3,
      vessel: 'TWILIGHT RIVA CRUISE',
      speed: 'GOLDEN HOUR DRIFT',
      category: 'ROMANCE & SUNSET',
      title: 'Esterel Sunset Champagne Voyage',
      desc: 'Anchor off red volcanic sea stacks with vintage Dom Pérignon and chilled Oscietra caviar as twilight descends.',
      capacity: 'Up to 6 Guests',
      duration: '3-Hour Sunset Odyssey',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 4,
      vessel: 'AIRBUS ACH130',
      speed: 'DIRECT FLIGHT',
      category: 'AERIAL TRANSFERS',
      title: 'Offshore Helipad Coastal Express',
      desc: 'Private helicopter transfers direct from resort cliff helipad to Monaco Heliport, Saint-Tropez, or Nice Airport.',
      capacity: 'Up to 6 Passengers',
      duration: '12-Minute Flight Time',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  // 3D Venue Showcase Data
  const venueShowcaseItems = [
    {
      id: 1,
      name: 'The Cliff Amphitheater',
      shortName: 'Amphitheater',
      category: 'COASTAL OPEN-AIR',
      capacity: 'Up to 200 Guests',
      subheading: 'UNINTERRUPTED SEA HORIZON',
      desc: 'Chiseled limestone tiered seating suspended over crashing waves. Perfect for starlit wedding ceremonies and evening philharmonic performances.',
      highlight: 'Acoustic shell • Candlelit limestone pathways',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 2,
      name: 'The Glass Orangerie Pavilion',
      shortName: 'Glass Orangerie',
      category: 'BOTANICAL BANQUET',
      capacity: 'Up to 160 Guests',
      subheading: 'PANORAMIC CONSERVATORY',
      desc: 'Floor-to-ceiling ironwork glass pavilion surrounded by heritage citrus groves and fragrant jasmine. Temperature controlled for year-round galas.',
      highlight: 'Motorized skylight roof • Michelin banquet kitchen',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 3,
      name: 'The Ancient Olive Grove Terrace',
      shortName: 'Olive Grove',
      category: 'HISTORIC GARDEN',
      capacity: 'Up to 120 Guests',
      subheading: 'CENTURIES-OLD GROVE',
      desc: 'Gather beneath 300-year-old gnarled olive trees illuminated by fairy lanterns and rustic fireside hearths for intimate sunset soirees.',
      highlight: 'Hand-hewn teak tables • Open flame rotisserie',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 4,
      name: 'The Vaulted Granite Salon',
      shortName: 'Granite Salon',
      category: 'EXECUTIVE & PRIVATE',
      capacity: 'Up to 50 Guests',
      subheading: 'SUBTERRANEAN BEDROCK',
      desc: 'Deep subterranean sanctuary carved into native bedrock. High-security acoustics for board symposiums, confidential summits, and private collector tastings.',
      highlight: 'Direct cellar vault access • Seismic dampening',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  // Craftsmanship Atelier Data (100% verified 200 OK images)
  const atelierItems = [
    {
      id: 'travertine',
      title: 'Rapolano Tuscan Travertine',
      subtitle: 'HAND-CHISELED LIVING STONE',
      craftBadge: 'STONE ARTISAN GUILD',
      metricLabel: 'THERMAL INERTIA',
      metricValue: '99.4%',
      icon: Layers,
      specs: 'Density: 2,480 kg/m³ • Thermal Inertia: High • Origin: Siena, Italy',
      desc: 'Cut from a single Tuscan quarry basin active since antiquity, our travertine was hand-honed by third-generation Italian stonemasons. The stone breathes, remaining naturally cool under 38°C summer sunshine while retaining gentle solar warmth well into starlit nights.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      detail1: 'Chiseled with 0.5mm tolerances for seamless indoor-outdoor transitions.',
      detail2: 'Naturally non-slip honed finish resistant to saltwater ocean spray.',
    },
    {
      id: 'mahogany',
      title: 'Riva Nautical Mahogany Joinery',
      subtitle: '24 COATS OF MIRROR-FINISH MARINE VARNISH',
      craftBadge: 'SARNICO SHIPWRIGHTS',
      metricLabel: 'VARNISH DEPTH',
      metricValue: '24 COATS',
      icon: Sparkles,
      specs: 'Curing Period: 90 Days • Hand-Polished • Sarnico Heritage',
      desc: 'Every interior architectural panel and custom headboard is crafted from book-matched Honduran mahogany cured with twenty-four individual coats of marine varnish. The deep amber grain echoes the golden age of Mediterranean yachting along Cap d’Antibes.',
      // Verified 200 OK Luxury Wood & Interior Architecture
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      detail1: 'Finished by Master Shipwrights using centuries-old Italian maritime techniques.',
      detail2: 'Solid brushed brass inlays hand-patinated with natural sea salt brine.',
    },
    {
      id: 'scent',
      title: 'Botanical Olfactory No. 7',
      subtitle: 'DISTILLED IN GRASSE BY MASTER PERFUMERS',
      craftBadge: 'GRASSE PARFUMERIE',
      metricLabel: 'ORGANIC PURITY',
      metricValue: '100% WILD',
      icon: Droplets,
      specs: 'Maceration: 6 Months • 100% Wild Organic Harvest • 0% Synthetic',
      desc: 'Formulated exclusively for Aurelia in nearby Grasse, the perfume capital of the world. Blended from wild immortelle harvested on our coastal cliffs, distilled Mediterranean sea salt, crushed maritime pine needles, and solar bergamot.',
      image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1000&q=80',
      detail1: 'Diffused continuously through hidden micro-misting stone vents.',
      detail2: 'Scientifically calibrated to induce parasympathetic relaxation within 4 minutes.',
    },
    {
      id: 'cellar',
      title: 'Vaulted Granite Subterranean Vault',
      subtitle: 'NATURALLY HYGROMETRIC 4,500-BOTTLE CAVE',
      craftBadge: 'GEOTHERMAL CELLAR',
      metricLabel: 'BEDROCK STABILITY',
      metricValue: '12.8°C',
      icon: Shield,
      specs: 'Constant Temp: 12.8°C • Humidity: 78% • 14-Meter Deep Bedrock',
      desc: 'Carved directly into the subterranean bedrock below sea level, our wine vault relies entirely on passive geothermal physics. Without mechanical refrigeration, the ancient granite maintains an unyielding 12.8°C temperature and 78% humidity year-round.',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
      detail1: 'Houses pre-phylloxera vintages and unbroken verticals of Bordeaux Premier Crus.',
      detail2: 'Monitored by subterranean seismic dampening to eliminate micro-vibrations.',
    },
  ];

  // Topography Zones (100% verified 200 OK images)
  const resortZones = [
    {
      id: 'villas',
      title: 'The Cliff Sanctuaries',
      desc: 'Twenty-four private residence villas etched into living granite, commanding unbroken marine horizons.',
      tag: 'ZONE 01 • PRIVATE HABITATS',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'dining',
      title: 'L’Horizon Pavilion & Cellar',
      desc: 'Three-Star Michelin cliffside dining atelier and 4,500-vintage subterranean vaulted stone wine cellar.',
      tag: 'ZONE 02 • GASTRONOMY',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'bathhouse',
      title: 'Subterranean Thermal Bathhouse',
      desc: 'Geothermal mineral springs, cold glacier plunges, and eucalyptus grottos carved into native granite.',
      tag: 'ZONE 03 • HYDROTHERAPY',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'marina',
      title: 'Private Riva Marina Pier',
      desc: 'Sheltered deep-water jetty for private superyachts and custom Riva 48ft mahogany speedboat transfers.',
      tag: 'ZONE 04 • NAUTICAL ATELIER',
      // Verified 200 OK Superyacht in Turquoise Mediterranean
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const accolades = [
    {
      source: 'CONDÉ NAST TRAVELER',
      quote: 'The most sublime Mediterranean retreat of the decade. A sanctuary where haste ceases to exist.',
      year: 'Gold List',
      badge: 'TOP 10 WORLDWIDE',
      type: 'gold-list',
      icon: Award,
    },
    {
      source: 'ARCHITECTURAL DIGEST',
      quote: 'An uncompromising masterpiece of cliffside brutalism, pure limestone, and silent serenity.',
      year: 'Design Laureate',
      badge: 'GLOBAL MASTERPIECE',
      type: 'architectural',
      icon: Gem,
    },
    {
      source: 'MICHELIN GUIDE',
      quote: 'L’Horizon commands 3 Stars for peerless culinary poetry honoring wild Provencal terroir.',
      year: 'Three Stars',
      badge: 'GASTRONOMY HIGHEST HONOR',
      type: 'michelin',
      icon: Sparkles,
      stars: 3,
    },
    {
      source: 'FORBES TRAVEL GUIDE',
      quote: 'Unscripted intuitive service that sets the global benchmark for ultra-luxury hospitality.',
      year: '5-Star Award',
      badge: 'VERIFIED 5-STAR LUXURY',
      type: 'forbes',
      icon: Star,
      stars: 5,
    },
  ];

  const currentSolarMoment = solarMoments[activeHourIndex];
  const currentComposer = composerMoods.find(c => c.id === selectedComposerMood) || composerMoods[0];
  const currentAtelier = atelierItems.find(a => a.id === activeAtelierTab) || atelierItems[0];

  return (
    <div className={`transition-colors duration-500 ${isLight ? 'bg-[#f7f5f0] text-[#1c1917]' : 'bg-[#090a0b] text-[#f5f2eb]'}`}>
      {/* 1. SCROLL-CONTROLLED CANVAS HERO (Strictly Preserved) */}
      <Hero />

      {/* 2. SECTION: PHILOSOPHY & PILLARS */}
      <IntroSection />

      {/* =========================================================================
          BRAND NEW EXTRA SECTION 1:
          LIVE MEDITERRANEAN COASTAL TELEMETRY & CELESTIAL ATMOSPHERIC HUB
          ========================================================================= */}
      <section className={`relative py-12 md:py-14 transition-all duration-700 overflow-hidden border-y ${
        isLight
          ? 'bg-coastal-mesh-light border-[#c5a880]/35 shadow-[inset_0_1px_3px_rgba(197,168,128,0.15)]'
          : 'bg-coastal-mesh-dark border-[#c5a880]/20 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]'
      }`}>
        {/* Animated Horizon Shimmer Beam running across the top border */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden pointer-events-none z-20">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#8f6a35]/60 dark:via-[#c5a880] to-transparent animate-horizon-shimmer" />
        </div>

        {/* Ambient atmospheric drifting glows */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none opacity-40 blur-3xl transition-opacity duration-700 bg-gradient-to-tr from-[#c5a880]/30 to-amber-200/20" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none opacity-30 blur-3xl transition-opacity duration-700 bg-gradient-to-bl from-sky-400/20 to-teal-300/10" />

        {/* Fine luxury measurement coordinate grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Live Station Header & Rotating Compass */}
            <div className="flex items-center gap-5 w-full lg:w-auto">
              {/* Animated Observatory Dial */}
              <div className={`relative w-16 h-16 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 group ${
                isLight
                  ? 'border-[#8f6a35]/35 bg-white/95 shadow-[0_4px_16px_rgba(197,168,128,0.2)]'
                  : 'border-[#c5a880]/30 bg-black/60 shadow-[0_4px_20px_rgba(0,0,0,0.6)]'
              }`}>
                {/* Rotating Outer Dashed Dial Ring */}
                <div className={`absolute inset-1 rounded-full border border-dashed animate-spin-reverse-slow ${
                  isLight ? 'border-[#8f6a35]/25' : 'border-[#c5a880]/20'
                }`} />

                {/* Sweeping Radar Scanner Line */}
                <div className="absolute inset-2 rounded-full overflow-hidden pointer-events-none">
                  <div className={`w-full h-full animate-radar-sweep origin-center ${
                    isLight 
                      ? 'bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(143,106,53,0.18)_360deg)]' 
                      : 'bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(197,168,128,0.25)_360deg)]'
                  }`} />
                </div>

                {/* Centered Compass Icon */}
                <Compass className={`w-7 h-7 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45 ${
                  isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                }`} />

                {/* Triple Concentric Live Satellite Radar Ping */}
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500/30 animate-radar-ping pointer-events-none" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping pointer-events-none" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </div>

              {/* Station Titles & Telemetry Coordinates */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span className={`text-[10px] uppercase font-mono tracking-[0.22em] font-bold flex items-center gap-1.5 ${
                    isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE RIVIERA TELEMETRY
                  </span>
                  <span className="relative overflow-hidden px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 font-semibold">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent animate-horizon-shimmer pointer-events-none" />
                    REALTIME • 43°34'N 7°07'E
                  </span>
                </div>
                <h3 className={`font-serif text-xl sm:text-2xl font-normal tracking-wide ${
                  isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
                }`}>
                  Cap d’Antibes Marine Station
                </h3>
                <p className={`text-[11px] font-sans tracking-wider hidden sm:block ${
                  isLight ? 'text-[#6b6255]' : 'text-[#a39c90]'
                }`}>
                  Autonomous Mediterranean Sea & Coastal Microclimate Observatory
                </p>
              </div>
            </div>

            {/* Live Telemetry Sensors Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 w-full lg:w-auto">
              
              {/* Sensor 1: Water Temp with live wave ripple */}
              <div className={`p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden flex flex-col justify-between ${
                isLight
                  ? 'bg-white/95 backdrop-blur-md border-[#c5a880]/40 shadow-[0_4px_16px_rgba(197,168,128,0.12)] hover:shadow-[0_10px_25px_rgba(197,168,128,0.25)] hover:border-[#8f6a35]/60'
                  : 'bg-[#121418]/90 backdrop-blur-md border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_25px_rgba(197,168,128,0.15)] hover:border-[#c5a880]/40'
              }`}>
                {/* Top Subtle Hover Shimmer Hairline */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8f6a35]/50 dark:via-[#c5a880]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                    isLight ? 'bg-sky-50 text-sky-700 border border-sky-200/60' : 'bg-sky-950/40 text-sky-400 border border-sky-800/40'
                  }`}>
                    <Thermometer className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="overflow-hidden">
                    <span className={`text-[9px] uppercase font-mono tracking-widest font-semibold block ${
                      isLight ? 'text-[#6b6255]' : 'text-[#9c9589]'
                    }`}>MEDITERRANEAN SEA</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className={`font-mono text-base sm:text-lg font-bold tracking-tight ${
                        isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
                      }`}>22.8°C</span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Pristine
                      </span>
                    </div>
                  </div>
                </div>

                {/* Animated undulating ocean wave line at bottom */}
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-sky-100 dark:bg-sky-950/50 relative">
                  <div className="absolute inset-y-0 left-0 w-[200%] flex animate-wave-undulate opacity-70">
                    <div className="w-1/2 h-full bg-gradient-to-r from-sky-400 via-teal-400 to-sky-400" />
                    <div className="w-1/2 h-full bg-gradient-to-r from-sky-400 via-teal-400 to-sky-400" />
                  </div>
                </div>
              </div>

              {/* Sensor 2: Wind Velocity with dynamic breeze drift */}
              <div className={`p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden flex flex-col justify-between ${
                isLight
                  ? 'bg-white/95 backdrop-blur-md border-[#c5a880]/40 shadow-[0_4px_16px_rgba(197,168,128,0.12)] hover:shadow-[0_10px_25px_rgba(197,168,128,0.25)] hover:border-[#8f6a35]/60'
                  : 'bg-[#121418]/90 backdrop-blur-md border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_25px_rgba(197,168,128,0.15)] hover:border-[#c5a880]/40'
              }`}>
                {/* Top Subtle Hover Shimmer Hairline */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8f6a35]/50 dark:via-[#c5a880]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                    isLight ? 'bg-amber-50 text-amber-700 border border-amber-200/60' : 'bg-amber-950/40 text-amber-400 border border-amber-800/40'
                  }`}>
                    <Wind className="w-5 h-5 animate-wind-gust" />
                  </div>
                  <div className="overflow-hidden">
                    <span className={`text-[9px] uppercase font-mono tracking-widest font-semibold block ${
                      isLight ? 'text-[#6b6255]' : 'text-[#9c9589]'
                    }`}>MISTRAL BREEZE</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className={`font-mono text-base sm:text-lg font-bold tracking-tight ${
                        isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
                      }`}>6.4 kts</span>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold ${
                        isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                      }`}>
                        <Navigation className="w-2.5 h-2.5 transform rotate-[112deg] animate-wind-gust inline-block" />
                        ESE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Animated drifting wind stream lines */}
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-amber-100 dark:bg-amber-950/40 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent animate-wind-stream" />
                </div>
              </div>

              {/* Sensor 3: Sunset Countdown Clock with celestial rotation */}
              <div className={`p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden flex flex-col justify-between ${
                isLight
                  ? 'bg-white/95 backdrop-blur-md border-[#8f6a35]/45 shadow-[0_4px_16px_rgba(197,168,128,0.15)] hover:shadow-[0_10px_25px_rgba(197,168,128,0.28)]'
                  : 'bg-[#121418]/90 backdrop-blur-md border-[#c5a880]/35 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_25px_rgba(197,168,128,0.2)]'
              }`}>
                {/* Top Subtle Hover Shimmer Hairline */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8f6a35]/60 dark:via-[#c5a880]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 relative ${
                    isLight ? 'bg-orange-50 text-orange-700 border border-orange-200/60' : 'bg-orange-950/40 text-orange-400 border border-orange-800/40'
                  }`}>
                    <Sun className="w-5 h-5 animate-sun-corona" />
                    <span className="absolute inset-0 rounded-xl bg-orange-400/20 blur-sm animate-pulse pointer-events-none" />
                  </div>
                  <div className="overflow-hidden">
                    <span className={`text-[9px] uppercase font-mono tracking-widest font-bold block flex items-center gap-1 ${
                      isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      GOLDEN HOUR IN
                    </span>
                    <div className="mt-0.5">
                      <span className={`font-mono text-base sm:text-lg font-bold tracking-wider ${
                        isLight ? 'text-[#8f6a35]' : 'text-[#e5cb9f]'
                      }`}>
                        {String(timeUntilSunset.hours).padStart(2, '0')}:
                        {String(timeUntilSunset.minutes).padStart(2, '0')}:
                        <span className="text-amber-600 dark:text-amber-400 animate-pulse">
                          {String(timeUntilSunset.seconds).padStart(2, '0')}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Solar arc status line */}
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-orange-100 dark:bg-orange-950/40 relative">
                  <div className="w-[68%] h-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-full" />
                </div>
              </div>

              {/* Sensor 4: Ambient Coastal Wave Audio Generator Button */}
              <button
                onClick={toggleAmbientSound}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isLight
                    ? isSoundPlaying
                      ? 'bg-white border-[#8f6a35] shadow-[0_8px_25px_rgba(143,106,53,0.22)] ring-2 ring-[#8f6a35]/30'
                      : 'bg-white/95 backdrop-blur-md border-[#c5a880]/40 hover:border-[#8f6a35] shadow-[0_4px_16px_rgba(197,168,128,0.12)] hover:shadow-[0_10px_25px_rgba(197,168,128,0.25)]'
                    : isSoundPlaying
                    ? 'bg-[#181a20] border-[#c5a880] shadow-[0_8px_25px_rgba(197,168,128,0.25)] ring-2 ring-[#c5a880]/30'
                    : 'bg-[#121418]/90 backdrop-blur-md border-white/10 hover:border-[#c5a880]/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_25px_rgba(197,168,128,0.15)]'
                }`}
                title="Toggle Live Mediterranean Wave Audio"
              >
                {/* Top Subtle Hover Shimmer Hairline */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8f6a35]/60 dark:via-[#c5a880]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                    isSoundPlaying
                      ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                      : isLight 
                      ? 'bg-[#f4efe6] text-[#8f6a35] border border-[#c5a880]/35 group-hover:bg-[#8f6a35] group-hover:text-white' 
                      : 'bg-white/5 text-[#c5a880] border border-white/10 group-hover:bg-[#c5a880] group-hover:text-black'
                  }`}>
                    {isSoundPlaying ? (
                      <Volume2 className="w-5 h-5 animate-bounce" />
                    ) : (
                      <Waves className="w-5 h-5 group-hover:animate-pulse" />
                    )}
                  </div>

                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] uppercase font-mono tracking-widest font-bold block ${
                        isSoundPlaying 
                          ? 'text-emerald-600 dark:text-emerald-400' 
                          : isLight ? 'text-[#6b6255]' : 'text-[#9c9589]'
                      }`}>
                        {isSoundPlaying ? 'SURF LIVE • 432Hz' : 'COASTAL AUDIO'}
                      </span>
                      {isSoundPlaying && (
                        <span className="flex gap-0.5 items-end h-3 ml-1">
                          <span className="w-0.5 bg-emerald-500 audio-bar-1 rounded-full" />
                          <span className="w-0.5 bg-emerald-500 audio-bar-2 rounded-full" />
                          <span className="w-0.5 bg-emerald-500 audio-bar-3 rounded-full" />
                          <span className="w-0.5 bg-emerald-500 audio-bar-4 rounded-full" />
                          <span className="w-0.5 bg-emerald-500 audio-bar-5 rounded-full" />
                        </span>
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm font-semibold block truncate mt-0.5 ${
                      isSoundPlaying 
                        ? isLight ? 'text-emerald-800' : 'text-emerald-300'
                        : isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
                    }`}>
                      {isSoundPlaying ? 'Ocean Swell Active' : 'Listen Waves'}
                    </span>
                  </div>
                </div>

                {/* Animated status equalizer or prompt at bottom */}
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-950/40 relative">
                  {isSoundPlaying ? (
                    <div className="w-full h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 animate-wave-undulate" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="w-8 h-full bg-[#8f6a35]/40 dark:bg-[#c5a880]/40 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BRAND NEW EXTRA SECTION 2:
          THE 24-HOUR SOLAR JOURNEY: A DAY AT AURELIA (INTERACTIVE TIME SCRUBBER)
          ========================================================================= */}
      <section className="relative py-28 md:py-36 bg-[#090a0b] overflow-hidden border-t border-white/5">
        
        {/* Ambient Glow Orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#c5a880]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="w-6 h-[1px] bg-[#c5a880]" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold">
                  CHRONICLES OF SERENITY
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#faf6ed] font-light tracking-tight">
                A Day at <span className="italic font-normal gold-gradient-text">Aurelia.</span>
              </h2>
              <p className="text-sm text-[#ada79b] mt-3 max-w-xl font-light">
                Every hour on the peninsula possesses its own celestial rhythm. Select an hour or let the solar chronometer reveal the unfolding magic.
              </p>
            </div>

            {/* Auto Play / Pause Toggle Button */}
            <button
              onClick={() => setIsSolarAutoPlaying(!isSolarAutoPlaying)}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-[#121418] text-xs font-mono tracking-widest text-[#faf6ed] hover:border-[#c5a880]/50 transition-all self-start md:self-auto cursor-pointer"
            >
              {isSolarAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>SOLAR CYCLE: AUTOPLAYING</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-ping" />
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>RESUME SOLAR CYCLE</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Hour Scrubber Navigation Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-white/5">
            {solarMoments.map((moment, idx) => {
              const active = idx === activeHourIndex;
              const Icon = moment.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveHourIndex(idx);
                    setIsSolarAutoPlaying(false);
                  }}
                  className={`flex-1 min-w-[150px] p-4 rounded-xl border text-left transition-all duration-300 relative cursor-pointer ${
                    active
                      ? 'border-[#c5a880] bg-[#14161d] shadow-xl shadow-black/60'
                      : 'border-white/5 bg-[#0e1013] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-[#faf6ed]">{moment.time}</span>
                    <Icon className={`w-4 h-4 ${active ? 'text-[#c5a880]' : 'text-[#8a857b]'}`} />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase block text-[#8a857b] truncate">
                    {moment.phase}
                  </span>
                  {active && (
                    <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Moment Visual & Narrative Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-3xl overflow-hidden border border-white/10 bg-[#0e1014] p-6 sm:p-10 shadow-2xl relative">
            
            {/* Visual Image with Ken Burns Zoom & Safe Fallback */}
            <div className="lg:col-span-7 relative h-[380px] sm:h-[460px] rounded-2xl overflow-hidden group bg-black/40">
              <img
                key={currentSolarMoment.image}
                src={currentSolarMoment.image}
                alt={currentSolarMoment.title}
                onError={(e) => handleImageError(e, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80')}
                className="w-full h-full object-cover filter brightness-90 animate-[kenBurnsZoom_12s_ease-out_forwards]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              
              {/* Moment Floating Badge */}
              <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
                <span className="font-mono text-xs text-[#faf6ed] font-semibold">{currentSolarMoment.time}</span>
                <span className="text-[#8a857b] text-xs">• {currentSolarMoment.phase}</span>
              </div>

              {/* Ambience Tag at Bottom */}
              <div className="absolute bottom-5 left-5 right-5 text-xs font-mono text-[#e5cb9f] bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#c5a880] flex-shrink-0" />
                <span className="truncate">{currentSolarMoment.ambience}</span>
              </div>
            </div>

            {/* Narrative & Quote */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#c5a880] font-semibold block mb-2">
                  THE SOLAR CHRONOLOGY
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#faf6ed] font-light leading-tight">
                  {currentSolarMoment.title}
                </h3>
              </div>

              <blockquote className="border-l-2 border-[#c5a880] pl-4 italic text-sm text-[#e5cb9f] font-serif">
                {currentSolarMoment.quote}
              </blockquote>

              <p className="text-sm text-[#ada79b] font-light leading-relaxed">
                {currentSolarMoment.desc}
              </p>

              <div className="pt-4 flex items-center gap-4 border-t border-white/5">
                <Link to="/experience" className="luxury-btn text-xs">
                  <span>Explore Full 24-Hr Experience</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3:
          CURATED SUITES & VILLAS SHOWCASE (WITH DIRECT LINK TO DEDICATED ROOM DETAIL PAGES)
          ========================================================================= */}
      <section className="relative py-28 md:py-36 bg-[#0c0d10] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="w-6 h-[1px] bg-[#c5a880]" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold">
                  PRIVATE RESIDENCES • INTERACTIVE 3D PREVIEW
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#faf6ed] font-light tracking-tight">
                <Text3DFlip staggerDuration={0.03}>Sanctuary</Text3DFlip>{' '}
                <span className="italic font-normal">
                  <ShinyText speed={5}>Suites & Villas.</ShinyText>
                </span>
              </h2>
              <p className="text-xs text-[#a39e93] font-light mt-2">
                Click or hover any card to inspect full architectural inclusions and private butler amenities.
              </p>
            </div>
            <Link to="/services" className="self-start md:self-auto no-underline">
              <InteractiveHoverButton variant="glass" className="py-2.5 px-5 text-xs">
                View All 24 Sanctuaries
              </InteractiveHoverButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredSuites.map((suite, idx) => (
              <FlipCard
                key={suite.slug}
                axis="y"
                flipOnClick={true}
                tilt={true}
                tiltMax={10}
                glare={true}
                glareOpacity={0.22}
                radius={24}
                className="h-[520px]"
                front={
                  <div className={`group relative flex flex-col justify-between h-full w-full rounded-3xl overflow-hidden transition-all shadow-xl ${
                    isLight
                      ? 'bg-white border border-[#c5a880]/30 hover:border-[#8f6a35]'
                      : 'bg-[#131418] border border-white/10 hover:border-[#c5a880]/50'
                  }`}>
                    {/* Top Image */}
                    <div className="relative h-64 w-full overflow-hidden bg-black/40">
                      <img
                        src={suite.image}
                        alt={suite.title}
                        onError={(e) => handleImageError(e, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80')}
                        className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.9]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#f5f2eb] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 absolute top-4 left-4">
                        {suite.size} • {suite.view}
                      </span>
                      <span className="absolute top-4 right-4 text-[11px] font-mono text-[#c5a880] px-2.5 py-0.5 rounded-full bg-black/50 border border-white/10">
                        0{idx + 1}
                      </span>
                      <div className="absolute bottom-3 left-4 right-4 flex justify-between items-baseline">
                        <span className="text-[10px] font-mono text-[#dfcaa7]">RATES FROM</span>
                        <span className="font-serif text-2xl text-[#e5cb9f] font-light">{suite.price}</span>
                      </div>
                    </div>

                    {/* Front Body */}
                    <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                      <div>
                        <span className={`text-[10px] uppercase tracking-[0.3em] font-medium block mb-1 ${
                          isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                        }`}>
                          {suite.subtitle}
                        </span>
                        <h3 className={`font-serif text-2xl transition-colors ${
                          isLight ? 'text-[#1c1917] group-hover:text-[#8f6a35]' : 'text-[#faf6ed] group-hover:text-[#e5cb9f]'
                        }`}>
                          {suite.title}
                        </h3>
                        <p className={`text-xs font-light line-clamp-3 mt-2 leading-relaxed ${
                          isLight ? 'text-[#575249]' : 'text-[#9c968a]'
                        }`}>
                          {suite.desc}
                        </p>
                      </div>

                      {/* Flip Hint */}
                      <div className={`pt-3 border-t flex items-center justify-between text-xs uppercase tracking-widest font-medium ${
                        isLight ? 'border-[#c5a880]/20 text-[#8f6a35]' : 'border-white/5 text-[#c5a880]'
                      }`}>
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Tap / Click to Flip Card</span>
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                }
                back={
                  <div className={`relative flex flex-col justify-between h-full w-full rounded-3xl overflow-hidden p-7 text-left shadow-2xl transition-all ${
                    isLight
                      ? 'bg-gradient-to-br from-[#ffffff] via-[#faf7f2] to-[#f4ede2] border-2 border-[#b38e5b]/40 text-[#1c1917]'
                      : 'bg-gradient-to-br from-[#181a20] via-[#121316] to-[#0a0b0d] border border-[#c5a880]/40 text-[#f5f2eb]'
                  }`}>
                    {/* Decorative Header */}
                    <div>
                      <div className={`flex items-center justify-between pb-3 border-b ${
                        isLight ? 'border-[#b38e5b]/25' : 'border-white/10'
                      }`}>
                        <div>
                          <span className={`text-[10px] font-mono uppercase tracking-[0.25em] block ${
                            isLight ? 'text-[#8f6a35] font-semibold' : 'text-[#c5a880]'
                          }`}>
                            ARCHITECTURAL PRIVILEGES
                          </span>
                          <h4 className={`font-serif text-2xl mt-0.5 ${
                            isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
                          }`}>
                            {suite.title}
                          </h4>
                        </div>
                        <span className={`text-xs font-mono font-semibold ${
                          isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                        }`}>{suite.size}</span>
                      </div>

                      {/* Amenity Checklist */}
                      <div className="mt-5 space-y-3">
                        <div className={`flex items-center gap-3 text-xs ${
                          isLight ? 'text-[#2c2824] font-medium' : 'text-[#f5f2eb]'
                        }`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isLight ? 'bg-[#b38e5b]/15 border border-[#b38e5b]/30 text-[#8f6a35]' : 'bg-[#c5a880]/15 border border-[#c5a880]/30 text-[#c5a880]'
                          }`}>
                            <Waves className="w-3.5 h-3.5" />
                          </div>
                          <span>Heated limestone infinity plunge pool & sunbed deck</span>
                        </div>
                        <div className={`flex items-center gap-3 text-xs ${
                          isLight ? 'text-[#2c2824] font-medium' : 'text-[#f5f2eb]'
                        }`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isLight ? 'bg-[#b38e5b]/15 border border-[#b38e5b]/30 text-[#8f6a35]' : 'bg-[#c5a880]/15 border border-[#c5a880]/30 text-[#c5a880]'
                          }`}>
                            <Shield className="w-3.5 h-3.5" />
                          </div>
                          <span>24/7 dedicated personal butler & private packing service</span>
                        </div>
                        <div className={`flex items-center gap-3 text-xs ${
                          isLight ? 'text-[#2c2824] font-medium' : 'text-[#f5f2eb]'
                        }`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isLight ? 'bg-[#b38e5b]/15 border border-[#b38e5b]/30 text-[#8f6a35]' : 'bg-[#c5a880]/15 border border-[#c5a880]/30 text-[#c5a880]'
                          }`}>
                            <Wine className="w-3.5 h-3.5" />
                          </div>
                          <span>Complimentary Grand Cru arrival bottle & sommelier tasting</span>
                        </div>
                        <div className={`flex items-center gap-3 text-xs ${
                          isLight ? 'text-[#2c2824] font-medium' : 'text-[#f5f2eb]'
                        }`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isLight ? 'bg-[#b38e5b]/15 border border-[#b38e5b]/30 text-[#8f6a35]' : 'bg-[#c5a880]/15 border border-[#c5a880]/30 text-[#c5a880]'
                          }`}>
                            <Anchor className="w-3.5 h-3.5" />
                          </div>
                          <span>Direct deep-water Riva speedboat tender pickup from cove</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] font-mono text-[#8a857b]">STARTING RATE</span>
                        <span className="font-serif text-xl text-[#c5a880] font-light">{suite.price}</span>
                      </div>
                      <Link
                        to={`/suites/${suite.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="no-underline w-full block"
                      >
                        <InteractiveHoverButton
                          variant="gold"
                          className="w-full py-3 text-xs tracking-[0.2em]"
                        >
                          Explore Sanctuary Details
                        </InteractiveHoverButton>
                      </Link>
                    </div>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BRAND NEW EXTRA SECTION 3:
          BESPOKE STAY JOURNEY COMPOSER (INTERACTIVE CONFIGURATOR)
          ========================================================================= */}
      <section className="relative py-28 md:py-36 bg-[#090a0b] border-t border-white/5 overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute -top-40 right-10 w-[500px] h-[500px] bg-[#c5a880]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold block mb-3">
              TAILORED ESCAPES
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#faf6ed] font-light">
              Compose Your <span className="italic font-normal gold-gradient-text">Journey.</span>
            </h2>
            <p className="text-sm text-[#ada79b] mt-3 font-light leading-relaxed">
              Every guest approaches our sanctuary with an individualized yearning. Choose your intended state of being below to preview a bespoke itinerary.
            </p>
          </div>

          {/* Mood Pill Selector */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {composerMoods.map((mood) => {
              const active = mood.id === selectedComposerMood;
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedComposerMood(mood.id)}
                  className={`px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest transition-all cursor-pointer ${
                    active
                      ? 'bg-[#c5a880] text-[#090a0b] font-bold shadow-lg shadow-[#c5a880]/20 scale-105'
                      : 'bg-[#121418] text-[#ada79b] border border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {mood.title}
                </button>
              );
            })}
          </div>

          {/* Dynamic Itinerary Preview Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl bg-[#101217] border border-white/10 p-6 sm:p-12 shadow-2xl relative">
            
            {/* Left Column: Itinerary Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30 text-[10px] font-mono tracking-widest uppercase">
                  {currentComposer.tag}
                </span>
                <span className="text-xs font-mono text-[#8a857b]">
                  {currentComposer.duration}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#faf6ed]">
                {currentComposer.title}
              </h3>

              {/* Highlights List */}
              <div className="space-y-3 pt-2">
                {currentComposer.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#d1cbc0] font-light">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a880] flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tariff & Action */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#8a857b] block">ESTIMATED SANCTUARY TARIFF</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl text-[#c5a880]">{currentComposer.totalPrice}</span>
                    <span className="text-xs text-[#8a857b] font-mono">inclusive of taxes</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/suites/${currentComposer.suiteSlug}`}
                    className="luxury-btn text-xs"
                  >
                    <span>Reserve Curated Journey</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Right Column: Matched Suite Image Frame */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/10 shadow-xl group bg-black/40">
              <img
                src={currentComposer.image}
                alt={currentComposer.suiteName}
                onError={(e) => handleImageError(e, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80')}
                className="w-full h-80 sm:h-96 object-cover transform transition-transform duration-1000 group-hover:scale-105 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880] block mb-1">
                  RECOMMENDED RESIDENCE
                </span>
                <p className="font-serif text-xl text-[#faf6ed]">
                  {currentComposer.suiteName}
                </p>
                <Link
                  to={`/suites/${currentComposer.suiteSlug}`}
                  className="text-xs text-[#c5a880] underline underline-offset-4 hover:text-white mt-1 inline-block"
                >
                  View Suite Specifications & Gallery →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          BRAND NEW EXTRA SECTION 4:
          HAUTE CRAFTSMANSHIP & TERROIR ATELIER (3D PERSPECTIVE MATERIAL SHOWCASE)
          ========================================================================= */}
      <section className={`relative py-28 md:py-36 overflow-hidden transition-colors duration-500 border-t ${
        isLight
          ? 'bg-gradient-to-b from-[#f9f6f0] via-[#f1ebe0] to-[#f7f3ea] border-[#c5a880]/30'
          : 'bg-[#0c0d10] border-white/5'
      }`}>
        {/* Subtle Architectural Blueprint Grid in Background */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Floating Ambient Atmosphere Orbs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full pointer-events-none opacity-30 blur-3xl bg-gradient-to-tr from-[#c5a880]/30 to-amber-200/10" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full pointer-events-none opacity-25 blur-3xl bg-gradient-to-bl from-[#8f6a35]/25 to-sky-300/10" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="w-6 h-[1.5px] bg-[#c5a880]" />
                <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold flex items-center gap-2 ${
                  isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  ARCHITECTURAL SOUL
                </span>
              </div>
              <h2 className={`font-serif text-4xl sm:text-5xl md:text-6xl font-light ${
                isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
              }`}>
                Haute <span className="italic font-normal gold-gradient-text">Craftsmanship.</span>
              </h2>
            </div>
            <p className={`text-sm max-w-md font-light leading-relaxed ${
              isLight ? 'text-[#575249]' : 'text-[#ada79b]'
            }`}>
              Every curve, texture, and fragrance within Aurelia was forged by master artisans whose lineages date back centuries.
            </p>
          </div>

          {/* 4 Materials Tabs with Animated Living Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-10">
            {atelierItems.map((item) => {
              const active = item.id === activeAtelierTab;
              const ItemIcon = item.icon || Layers;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveAtelierTab(item.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    active
                      ? isLight
                        ? 'border-[#8f6a35] bg-white shadow-[0_8px_25px_rgba(143,106,53,0.18)] -translate-y-1'
                        : 'border-[#c5a880] bg-[#171a22] shadow-[0_8px_25px_rgba(197,168,128,0.2)] -translate-y-1'
                      : isLight
                      ? 'border-[#c5a880]/30 bg-white/70 hover:bg-white hover:border-[#8f6a35]/60 hover:-translate-y-0.5 shadow-sm'
                      : 'border-white/5 bg-[#101216] hover:border-white/20 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Active animated bottom gold laser hairline */}
                  {active && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] animate-border-trace" />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[9px] uppercase font-mono tracking-widest font-bold flex items-center gap-1.5 ${
                      active ? (isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]') : (isLight ? 'text-[#8a8479]' : 'text-[#6b6760]')
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-500 animate-pulse' : 'bg-[#c5a880]/40'}`} />
                      {item.craftBadge || 'MATERIAL ATELIER'}
                    </span>
                    <ItemIcon className={`w-4 h-4 transition-transform duration-300 ${
                      active 
                        ? (isLight ? 'text-[#8f6a35] scale-110' : 'text-[#c5a880] scale-110') 
                        : (isLight ? 'text-[#a8a194]' : 'text-white/30')
                    }`} />
                  </div>

                  <span className={`font-serif text-base block truncate font-medium ${
                    active 
                      ? (isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]') 
                      : (isLight ? 'text-[#3d3831]' : 'text-[#ada79b]')
                  }`}>
                    {item.title}
                  </span>

                  {/* Telemetry Micro Metric */}
                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono border-t pt-1.5 border-black/5 dark:border-white/5">
                    <span className={isLight ? 'text-[#7d776c]' : 'text-[#858076]'}>{item.metricLabel}</span>
                    <span className={`font-bold ${isLight ? 'text-[#8f6a35]' : 'text-[#e5cb9f]'}`}>{item.metricValue}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Material Showcase Panel with Architectural HUD and Specular Sheen */}
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-3xl border p-6 sm:p-10 transition-all duration-500 ${
            isLight
              ? 'bg-white/90 backdrop-blur-md border-[#c5a880]/40 shadow-[0_16px_40px_rgba(197,168,128,0.18)]'
              : 'bg-[#111317] border-white/10 shadow-2xl'
          }`}>
            
            {/* Visual Frame with Crosshairs and Specular Light Sweep */}
            <div className="lg:col-span-6 relative h-[380px] sm:h-[440px] rounded-2xl overflow-hidden group bg-black/40">
              {/* Corner Architectural Crosshairs */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#c5a880] z-20 pointer-events-none" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#c5a880] z-20 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#c5a880] z-20 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#c5a880] z-20 pointer-events-none" />

              {/* Inspection Grade Badge */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#c5a880]/40 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#faf6ed] font-semibold">
                  ARTISAN INSPECTED • 100% AUTHENTIC
                </span>
              </div>

              {/* Material Image with Hover Scale */}
              <img
                src={currentAtelier.image}
                alt={currentAtelier.title}
                onError={(e) => handleImageError(e, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80')}
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-108 filter brightness-95"
              />

              {/* Specular Light Sheen Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 dark:via-[#c5a880]/20 to-transparent animate-specular-shimmer pointer-events-none" />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              
              {/* Specification HUD Badge */}
              <div className="absolute bottom-5 left-5 right-5 z-20 p-3.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a880] font-bold flex items-center gap-1.5">
                    <Activity className="w-3 h-3 animate-pulse text-[#c5a880]" />
                    SPECIFICATION RECORD
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#c5a880]/20 text-[#e5cb9f] font-semibold">
                    CRAFT REF: {currentAtelier.id.toUpperCase()}-2026
                  </span>
                </div>
                <p className="text-xs font-mono text-[#e5e0d8]">
                  {currentAtelier.specs}
                </p>
              </div>
            </div>

            {/* Material Details & Interactive Checklist */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className={`text-[10px] uppercase font-mono tracking-[0.3em] font-bold block mb-2 ${
                  isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                }`}>
                  {currentAtelier.subtitle}
                </span>
                <h3 className={`font-serif text-3xl sm:text-4xl ${
                  isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
                }`}>
                  {currentAtelier.title}
                </h3>
              </div>

              {/* Animated Craftsmanship Metric Bar */}
              <div className={`p-4 rounded-xl border ${
                isLight ? 'bg-[#f8f5ee] border-[#c5a880]/30' : 'bg-[#16181f] border-white/5'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono uppercase tracking-wider font-semibold ${
                    isLight ? 'text-[#575249]' : 'text-[#d1cbc0]'
                  }`}>
                    {currentAtelier.metricLabel} COEFFICIENT
                  </span>
                  <span className={`font-mono text-sm font-bold ${
                    isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                  }`}>
                    {currentAtelier.metricValue}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden bg-black/10 dark:bg-white/10 relative">
                  <div className="h-full bg-gradient-to-r from-[#8f6a35] via-[#c5a880] to-[#e5cb9f] rounded-full w-[88%] animate-pulse" />
                </div>
              </div>

              <p className={`text-sm font-light leading-relaxed ${
                isLight ? 'text-[#575249]' : 'text-[#ada79b]'
              }`}>
                {currentAtelier.desc}
              </p>

              <div className="space-y-3 pt-1">
                <div className={`p-3.5 rounded-xl border transition-all duration-300 hover:translate-x-1 flex items-center gap-3 ${
                  isLight ? 'bg-white border-[#c5a880]/30 text-[#1c1917]' : 'bg-[#181a20] border-white/5 text-[#faf6ed]'
                }`}>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 animate-pulse" />
                  <span className="text-xs">{currentAtelier.detail1}</span>
                </div>
                <div className={`p-3.5 rounded-xl border transition-all duration-300 hover:translate-x-1 flex items-center gap-3 ${
                  isLight ? 'bg-white border-[#c5a880]/30 text-[#1c1917]' : 'bg-[#181a20] border-white/5 text-[#faf6ed]'
                }`}>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 animate-pulse" />
                  <span className="text-xs">{currentAtelier.detail2}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/about" className="luxury-btn text-xs inline-flex items-center gap-2">
                  <span>Read Architectural Manifesto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5:
          THREE-STAR MICHELIN GASTRONOMY ATELIER
          ========================================================================= */}
      <section className="relative py-28 md:py-36 bg-[#090a0b] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <ThreeDCardStack items={tastingStackItems} />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="w-6 h-[1px] bg-[#c5a880]" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold">
                  GASTRONOMIC ARTISTRY
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#faf6ed] font-light leading-tight">
                Three Stars under <span className="italic font-normal gold-gradient-text">the Riviera stars.</span>
              </h2>
              <p className="text-base text-[#ada79b] font-light leading-relaxed">
                Led by Chef Marc Évrard, L’Horizon presents seasonal 8-course and 12-course tasting odysseys that honor the soil and sea of the Côte d’Azur, accompanied by over 4,500 historic grand crus in our vaulted granite cellar.
              </p>

              <div className="p-4 rounded-xl bg-[#121418] border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#faf6ed] font-medium block">Terra & Mare Degustation</span>
                  <span className="text-[#8e897e]">7 Courses with Sommelier Pairings</span>
                </div>
                <span className="font-mono text-[#c5a880] text-sm font-semibold">₹24,500 / guest</span>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link to="/dining" className="inline-block">
                  <InteractiveHoverButton variant="gold" className="px-6 py-3 text-xs">
                    Explore Tasting Menus
                  </InteractiveHoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6:
          SUBTERRANEAN THERMAL BATHHOUSE
          ========================================================================= */}
      <section className="relative py-28 md:py-36 bg-[#0c0d10] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left 5 Cols: Narrative, Stage details & CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="w-6 h-[1px] bg-[#c5a880]" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold">
                  HYDROTHERAPY & HOLISTICS
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#faf6ed] font-light leading-tight">
                Ancient springs, <span className="italic font-normal gold-gradient-text">modern stillness.</span>
              </h2>
              <p className="text-base text-[#ada79b] font-light leading-relaxed">
                Carved into native coastal granite, the Thermal Bathhouse utilizes geothermal mineral waters and sequential contrast therapy to lower systemic cortisol and restore biological equilibrium.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className={`p-3.5 rounded-xl ${
                  isLight
                    ? 'bg-white border border-[#c5a880]/30 shadow-md'
                    : 'bg-[#14161b] border border-white/5'
                }`}>
                  <span className={`font-mono block text-[10px] ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
                    STAGE 02 • CALDARIUM
                  </span>
                  <span className={`font-medium mt-1 block ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
                    40°C Geothermal Springs
                  </span>
                </div>
                <div className={`p-3.5 rounded-xl ${
                  isLight
                    ? 'bg-white border border-[#c5a880]/30 shadow-md'
                    : 'bg-[#14161b] border border-white/5'
                }`}>
                  <span className={`font-mono block text-[10px] ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
                    STAGE 03 • FRIGIDARIUM
                  </span>
                  <span className={`font-medium mt-1 block ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
                    12°C Glacier Plunge
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/wellness" className="inline-block">
                  <InteractiveHoverButton variant="gold" className="px-6 py-3 text-xs">
                    Discover Thermal Bathhouse
                  </InteractiveHoverButton>
                </Link>
              </div>
            </div>

            {/* Right 7 Cols: 3D Image Ring Component */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
              <ThreeDImageRing
                items={bathhouseCircuit}
                radius={240}
                autoRotate={true}
                autoRotateSpeed={0.25}
                pauseOnHover={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7:
          PRIVATE RIVA YACHT & COASTAL CHARTERS (100% VERIFIED WORKING IMAGES)
          ========================================================================= */}
      <section className="relative py-28 md:py-36 bg-[#090a0b] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <ThreeDBendSlider items={maritimeFleetItems} />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="w-6 h-[1px] bg-[#c5a880]" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold">
                  PRIVATE MARITIME EXPEDITIONS
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#faf6ed] font-light leading-tight">
                Glide across <span className="italic font-normal gold-gradient-text">azure horizons.</span>
              </h2>
              <p className="text-base text-[#ada79b] font-light leading-relaxed">
                Step directly from our private sheltered jetty onto our custom 48ft Riva yacht. Glide to secret snorkeling coves, anchor off Saint-Tropez for lunch, or enjoy champagne at sunset framed by the red porphyry cliffs of the Esterel.
              </p>

              <div className="space-y-2 text-xs text-[#d8d3c7]">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a880]" />
                  <span>Licensed Master Skipper & Personal Onboard Sommelier</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a880]" />
                  <span>Champagne Cuvée, Oscietra Caviar, & Seabob underwater scooters</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#c5a880]" />
                  <span>Private Helipad to Marina direct transfers</span>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/services" className="inline-block">
                  <InteractiveHoverButton variant="gold" className="px-6 py-3 text-xs">
                    Charter Details & Itineraries
                  </InteractiveHoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8:
          GRAND OCCASIONS & WEDDING BUYOUTS
          ========================================================================= */}
      <section className="relative py-28 md:py-36 bg-[#0c0d10] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="w-6 h-[1px] bg-[#c5a880]" />
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold">
                  EVENTS & OCCASIONS
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#faf6ed] font-light leading-tight">
                Celebrate where time <span className="italic font-normal gold-gradient-text">stands still.</span>
              </h2>
              <p className="text-base text-[#ada79b] font-light leading-relaxed">
                From full coastal resort buyouts and candlelit amphitheater weddings to high-security executive retreats, our master production team and 3-star culinary atelier transform moments into history.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link to="/events" className="inline-block">
                  <InteractiveHoverButton variant="gold" className="px-6 py-3 text-xs">
                    Explore Event Facilities
                  </InteractiveHoverButton>
                </Link>
                <Link to="/events#plan-event" className="luxury-btn-outline text-xs">
                  Plan Your Event
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <ThreeDVenuePerspective venues={venueShowcaseItems} />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9:
          INTERACTIVE RESORT GROUNDS & DOMAIN TOUR
          ========================================================================= */}
      <section className="py-24 bg-[#090a0b] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold block mb-3">
              THE SANCTUARY DOMAIN
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#faf6ed] font-light">
              Explore Our Topography.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Zone Selector Buttons */}
            <div className="lg:col-span-5 space-y-3">
              {resortZones.map((zone) => {
                const active = activeResortZone === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setActiveResortZone(zone.id)}
                    className={`w-full p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                      active
                        ? 'border-[#c5a880] bg-[#14161b] shadow-xl'
                        : 'border-white/5 bg-[#0e1013] hover:border-white/15'
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a880] block mb-1">
                      {zone.tag}
                    </span>
                    <h4 className="font-serif text-xl text-[#faf6ed] mb-1">
                      {zone.title}
                    </h4>
                    <p className="text-xs text-[#8e897e] font-light leading-relaxed">
                      {zone.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Zone Image Preview Frame */}
            <div className="lg:col-span-7">
              {resortZones.map((zone) => {
                if (zone.id !== activeResortZone) return null;
                return (
                  <div key={zone.id} className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-[440px] animate-fadeIn bg-black/40">
                    <img
                      src={zone.image}
                      alt={zone.title}
                      onError={(e) => handleImageError(e, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80')}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880] block">
                          CAP D’ANTIBES PENINSULA
                        </span>
                        <h3 className="font-serif text-2xl text-[#faf6ed]">{zone.title}</h3>
                      </div>
                      <Link to="/gallery" className="luxury-btn-outline text-xs">
                        View in Gallery
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10:
          PRESS ACCOLADES & CRITICAL HONORS
          ========================================================================= */}
      <section className={`relative py-28 md:py-32 overflow-hidden transition-colors duration-500 border-t ${
        isLight
          ? 'bg-gradient-to-b from-[#f8f5ee] via-[#ede7db] to-[#f6f2e8] border-[#c5a880]/30'
          : 'bg-[#0c0d10] border-white/5'
      }`}>
        {/* Animated Horizon Shimmer Beam on Top Border */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden pointer-events-none z-20">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#8f6a35]/60 dark:via-[#c5a880] to-transparent animate-horizon-shimmer" />
        </div>

        {/* Ambient atmospheric drifting glows */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none opacity-25 blur-3xl bg-gradient-to-tr from-[#c5a880]/30 to-amber-200/10" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl bg-gradient-to-bl from-amber-400/20 to-teal-300/10" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center p-2 rounded-full mb-3 bg-[#c5a880]/15 border border-[#c5a880]/30 animate-float-gentle">
              <Award className={`w-4 h-4 ${isLight ? 'text-[#8f6a35]' : 'text-[#e5cb9f]'}`} />
            </div>
            <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold block mb-2 flex items-center justify-center gap-2 ${
              isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              RECOGNITION & HONORS
            </span>
            <h2 className={`font-serif text-3xl sm:text-5xl font-light tracking-wide ${
              isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
            }`}>
              Critically <span className="italic font-normal gold-gradient-text">Acclaimed.</span>
            </h2>
          </div>

          {/* Accolades Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accolades.map((acc, i) => {
              const AccIcon = acc.icon || Award;
              return (
                <div
                  key={i}
                  className={`p-7 sm:p-8 rounded-3xl border flex flex-col justify-between transition-all duration-500 group relative overflow-hidden ${
                    isLight
                      ? 'bg-white/95 backdrop-blur-md border-[#c5a880]/35 shadow-[0_6px_22px_rgba(197,168,128,0.12)] hover:shadow-[0_20px_45px_rgba(197,168,128,0.26)] hover:border-[#8f6a35]/70 hover:-translate-y-2.5'
                      : 'bg-[#121418]/90 backdrop-blur-md border-white/10 shadow-2xl hover:shadow-[0_20px_45px_rgba(197,168,128,0.18)] hover:border-[#c5a880]/50 hover:-translate-y-2.5'
                  }`}
                >
                  {/* Top Glowing Laser Hairline on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#8f6a35] dark:via-[#c5a880] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Shimmer sweep effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 dark:via-white/5 to-transparent animate-accolade-shimmer pointer-events-none" />

                  {/* Decorative Watermark Quote */}
                  <Quote className={`absolute -bottom-2 -right-2 w-24 h-24 transform rotate-12 pointer-events-none transition-all duration-500 group-hover:scale-115 ${
                    isLight 
                      ? 'text-[#8f6a35]/10 group-hover:text-[#8f6a35]/18' 
                      : 'text-[#c5a880]/10 group-hover:text-[#c5a880]/20'
                  }`} />

                  {/* Card Content */}
                  <div className="relative z-10">
                    
                    {/* Header Insignia & Rating Stars */}
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-6 ${
                        isLight 
                          ? 'bg-[#f7f2ea] text-[#8f6a35] border border-[#c5a880]/40' 
                          : 'bg-white/5 text-[#e5cb9f] border border-white/10'
                      }`}>
                        <AccIcon className="w-5 h-5" />
                      </div>

                      {/* Michelin 3 Stars or Forbes 5 Stars or Custom Badge */}
                      {acc.stars ? (
                        <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/25">
                          {[...Array(acc.stars)].map((_, sIdx) => (
                            <Star
                              key={sIdx}
                              className="w-3.5 h-3.5 fill-amber-400 text-amber-500 animate-star-twinkle"
                              style={{ animationDelay: `${sIdx * 0.28}s` }}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase bg-[#c5a880]/15 text-[#8f6a35] dark:text-[#e5cb9f] border border-[#c5a880]/30 font-bold">
                          {acc.badge}
                        </span>
                      )}
                    </div>

                    {/* Publication & Honors Header */}
                    <div className="mb-4">
                      <span className={`text-[10px] font-mono tracking-widest uppercase font-bold block ${
                        isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                      }`}>
                        {acc.source}
                      </span>
                      <span className={`text-[11px] font-sans font-semibold tracking-wider block mt-0.5 ${
                        isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
                      }`}>
                        {acc.year}
                      </span>
                    </div>

                    {/* Editorial Quote */}
                    <p className={`font-serif text-[15px] sm:text-base italic leading-relaxed font-light ${
                      isLight ? 'text-[#2c2824]' : 'text-[#d6d0c4]'
                    }`}>
                      "{acc.quote}"
                    </p>
                  </div>

                  {/* Card Bottom Verification Hairline */}
                  <div className="mt-6 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between relative z-10 text-[9px] font-mono">
                    <span className={`flex items-center gap-1 font-semibold ${
                      isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
                    }`}>
                      <Check className="w-3 h-3 text-emerald-500" />
                      CRITICALLY ACCREDITED
                    </span>
                    <span className={isLight ? 'text-[#8a8479]' : 'text-[#7d776c]'}>
                      EST. 2026
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 11:
          FINAL CONCIERGE INVITATION CTA
          ========================================================================= */}
      <section className={`py-28 text-center px-6 transition-colors duration-500 border-t ${
        isLight
          ? 'bg-[#eae5db] border-[#c5a880]/30'
          : 'bg-[#090a0b] border-white/5'
      }`}>
        <div className="max-w-3xl mx-auto space-y-6">
          <span className={`text-[11px] uppercase tracking-[0.4em] font-semibold block ${
            isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'
          }`}>
            THE SANCTUARY AWAITS
          </span>
          <h2 className={`font-serif text-4xl sm:text-6xl font-light ${
            isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'
          }`}>
            Your Private Key is Ready.
          </h2>
          <p className={`text-base font-light max-w-xl mx-auto leading-relaxed ${
            isLight ? 'text-[#575249]' : 'text-[#ada79b]'
          }`}>
            Twenty-four private suites. Undivided personal attention. Unrivaled serenity on the French Riviera.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/services" className="luxury-btn text-xs">
              Explore All Suites
            </Link>
            <Link to="/contact" className={isLight ? 'luxury-btn-outline !text-[#1c1917] !border-[#1c1917]/30 hover:!bg-[#1c1917] hover:!text-white text-xs' : 'luxury-btn-outline text-xs'}>
              Inquire with Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
