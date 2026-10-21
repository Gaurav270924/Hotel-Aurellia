import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DayNightSlider from '../components/ui/DayNightSlider';
import Confetti from '../components/ui/Confetti';
import InteractiveHoverButton from '../components/ui/InteractiveHoverButton';
import { useTheme } from '../context/ThemeContext';
import {
  Calendar, Users, MapPin, Sparkles, Check, CheckCircle, ShieldCheck,
  ArrowLeft, ArrowRight, Clock, Star, BedDouble, Maximize, Compass, Waves,
  ChevronLeft, ChevronRight, Pause, Play, Moon, Sun
} from 'lucide-react';

export default function RoomDetail() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const { slug } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Booking Card State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const [bookingError, setBookingError] = useState('');

  // Auto-slide image carousel
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveImageIndex((prev) => {
        // Will be modulo-divided by total available images
        return prev + 1;
      });
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    fetchRoom();
  }, [slug]);

  const fetchRoom = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/services/${slug}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setRoom(data.data);
      } else {
        setError('The requested suite was not found.');
      }
    } catch {
      setError('Connection error loading suite details.');
    } finally {
      setLoading(false);
    }
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const basePricePerNight = room?.price_per_night || 215000;

  const addonsList = [
    { id: 'yacht', label: 'Private Riva 48ft Sunset Charter', price: 120000, priceFormatted: '₹1,20,000' },
    { id: 'sommelier', label: 'Grand Cru Sommelier Tasting Pairing', price: 25000, priceFormatted: '₹25,000 / guest' },
    { id: 'heli', label: 'Helicopter Transfer (Nice Airport to Helipad)', price: 65000, priceFormatted: '₹65,000' },
    { id: 'chef', label: 'In-Villa Private Chef 3★ Degustation', price: 35000, priceFormatted: '₹35,000' },
  ];

  const toggleAddon = (id) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const calculateAddonsTotal = () => {
    return selectedAddons.reduce((sum, id) => {
      const item = addonsList.find(a => a.id === id);
      return sum + (item ? item.price : 0);
    }, 0);
  };

  const totalAmount = (basePricePerNight * nights) + calculateAddonsTotal();

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingError('');
    setBookingLoading(true);

    try {
      const payload = {
        name: guestName,
        email: guestEmail,
        phone: guestPhone,
        event_type: `Suite Stay: ${room.title}`,
        preferred_date: checkIn || null,
        location: room.title,
        guest_count: parseInt(guests) || 2,
        budget_range: `₹${totalAmount.toLocaleString('en-IN')}`,
        requirements: `Check-in: ${checkIn || 'TBD'}, Check-out: ${checkOut || 'TBD'}, Nights: ${nights}. Add-ons: ${selectedAddons.join(', ') || 'None'}. Requests: ${specialRequests || 'None'}`,
      };

      const res = await fetch('/api/event-inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBookingConfirmation(data.reference_id || 'AUR-RES-001');
      } else {
        setBookingError(data.message || 'Unable to log booking inquiry. Please check details.');
      }
    } catch {
      setBookingError('Connection error. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-40 px-6 max-w-7xl mx-auto text-center">
        <div className="w-12 h-12 mx-auto rounded-full border-2 border-[#c5a880] border-t-transparent animate-spin mb-4" />
        <p className="text-xs font-mono tracking-widest text-[#8a857b] uppercase">Loading Sanctuary Suite...</p>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen pt-40 px-6 max-w-xl mx-auto text-center space-y-6">
        <h2 className="font-serif text-3xl text-[#faf6ed]">Suite Not Found</h2>
        <p className="text-sm text-[#ada79b]">{error || 'This suite does not exist in our catalog.'}</p>
        <Link to="/services" className="luxury-btn text-xs inline-flex">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Return to All Suites</span>
        </Link>
      </div>
    );
  }

  // Suite image gallery with guaranteed multi-image luxury showcase
  const fallbackSuiteImages = [
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1400&q=85',
  ];

  const rawImages = (room.gallery_images && Array.isArray(room.gallery_images) && room.gallery_images.length > 0)
    ? room.gallery_images
    : (room.image_url ? [room.image_url, ...fallbackSuiteImages.slice(1)] : fallbackSuiteImages);

  const images = rawImages.length >= 2 ? rawImages : [...rawImages, ...fallbackSuiteImages.slice(0, 4)];
  const currentIdx = ((activeImageIndex % images.length) + images.length) % images.length;

  return (
    <div className={`transition-colors duration-500 overflow-x-hidden ${isLight ? 'bg-[#f7f5f0] text-[#1c1917]' : 'bg-[#090a0b] text-[#f5f2eb]'}`}>
      {/* 1. TOP CINEMATIC AUTO-CHANGING IMAGE CAROUSEL FIRST */}
      <section
        className="relative w-full h-[68vh] md:h-[82vh] overflow-hidden bg-black select-none group"
      >
        {/* Render stacked images with smooth cinematic crossfade & slow zoom */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-out transform ${
              currentIdx === idx
                ? 'opacity-100 scale-100 z-10'
                : 'opacity-0 scale-105 pointer-events-none z-0'
            }`}
          >
            <img
              src={img}
              alt={`${room.title} view ${idx + 1}`}
              className="w-full h-full object-cover filter brightness-[0.88]"
            />
          </div>
        ))}

        {/* Ambient Dark Gradient Vignette */}
        <div className={`absolute inset-0 z-20 pointer-events-none ${
          isLight
            ? 'bg-gradient-to-t from-[#f7f5f0] via-black/20 to-black/50'
            : 'bg-gradient-to-t from-[#090a0b] via-transparent to-black/60'
        }`} />

        {/* Animated Slide Progress Bar */}
        {!isPaused && (
          <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10 z-30">
            <div
              key={currentIdx}
              className="h-full bg-gradient-to-r from-[#c5a880] to-[#e5cb9f]"
              style={{
                animation: 'carouselProgress 3.2s linear forwards',
              }}
            />
          </div>
        )}

        {/* Back Link */}
        <div className="absolute top-24 sm:top-28 left-4 sm:left-6 md:left-12 z-30">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs text-[#faf6ed] hover:text-[#c5a880] hover:border-[#c5a880]/50 transition-all shadow-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">All Suites & Villas</span>
            <span className="xs:hidden">All Suites</span>
          </Link>
        </div>

        {/* Autoplay Status, Play/Pause Toggle & Slide Counter Badge */}
        <div className="absolute top-24 sm:top-28 right-4 sm:right-6 md:right-12 z-30 flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-[10px] uppercase font-mono tracking-widest text-[#faf6ed] px-3 sm:px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center gap-1.5 sm:gap-2 hover:border-[#c5a880]/50 transition-all shadow-xl cursor-pointer"
            title={isPaused ? 'Resume Auto-Rotate' : 'Pause Auto-Rotate'}
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 text-[#c5a880]" />
                <span className="text-[#8a857b]">Paused</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-ping" />
                <span className="hidden sm:inline">Auto-Rotating</span>
              </>
            )}
            <span className="text-[#c5a880] font-bold">0{currentIdx + 1}/0{images.length}</span>
          </button>
        </div>

        {/* Prev / Next Navigation Arrows */}
        <button
          onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
          className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-[#faf6ed] hover:text-[#c5a880] z-30 transition-all hover:scale-110 shadow-2xl opacity-80 group-hover:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={() => setActiveImageIndex((prev) => prev + 1)}
          className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-[#faf6ed] hover:text-[#c5a880] z-30 transition-all hover:scale-110 shadow-2xl opacity-80 group-hover:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Room Category & Nightly Price Badge */}
        <div className="absolute bottom-10 right-6 md:right-12 z-30 hidden sm:block">
          <div className="p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-right shadow-2xl">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#8a857b] block">NIGHTLY SANCTUARY TARIFF</span>
            <span className="font-serif text-3xl text-[#c5a880] font-light">
              ₹{(room.price_per_night || 215000).toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-[#ada79b] block mt-0.5">Plus luxury taxes & service</span>
          </div>
        </div>

        {/* Image Gallery Switcher Thumbs Overlay */}
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 md:left-12 flex gap-2 sm:gap-2.5 z-30 overflow-x-auto max-w-[calc(100vw-2rem)] sm:max-w-[80vw] pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`w-12 h-9 sm:w-16 sm:h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 relative ${
                currentIdx === idx
                  ? 'border-[#c5a880] scale-105 shadow-2xl ring-2 ring-[#c5a880]/40 opacity-100'
                  : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
              {currentIdx === idx && (
                <div className="absolute inset-0 bg-[#c5a880]/20" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 2. TITLE & EYEBROW AFTER IMAGE (NO NEGATIVE MARGIN OVERFLOW) */}
      <section className="relative px-6 md:px-12 pt-8 pb-10 max-w-7xl mx-auto z-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-[#c5a880]" />
          <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
            {room.subtitle || 'SANCTUARY RESIDENCE'}
          </span>
        </div>
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b ${isLight ? 'border-black/10' : 'border-white/10'}`}>
          <div>
            <h1 className={`font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
              {room.title}
            </h1>
            <p className={`text-sm sm:text-base font-light max-w-2xl mt-3 leading-relaxed ${isLight ? 'text-[#575249]' : 'text-[#ada79b]'}`}>
              {room.short_description}
            </p>
          </div>

          <div className="sm:hidden">
            <span className={`text-xs uppercase font-mono block ${isLight ? 'text-[#7a7469]' : 'text-[#8a857b]'}`}>From</span>
            <span className="font-serif text-3xl text-[#c5a880]">₹{(room.price_per_night || 215000).toLocaleString('en-IN')}</span>
            <span className={`text-xs ${isLight ? 'text-[#7a7469]' : 'text-[#8a857b]'}`}> / night</span>
          </div>
        </div>

        {/* Specs Ribbon */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b text-xs ${isLight ? 'border-black/10' : 'border-white/10'}`}>
          <div className="flex items-center gap-3">
            <Maximize className="w-5 h-5 text-[#c5a880] flex-shrink-0" />
            <div>
              <span className={`block ${isLight ? 'text-[#7a7469]' : 'text-[#8a857b]'}`}>Total Living Area</span>
              <span className={`font-medium ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>{room.room_size || '220 m² / 2,368 sq ft'}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-[#c5a880] flex-shrink-0" />
            <div>
              <span className={`block ${isLight ? 'text-[#7a7469]' : 'text-[#8a857b]'}`}>Horizon Orientation</span>
              <span className={`font-medium ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>{room.view_type || 'Panoramic Oceanfront'}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BedDouble className="w-5 h-5 text-[#c5a880] flex-shrink-0" />
            <div>
              <span className={`block ${isLight ? 'text-[#7a7469]' : 'text-[#8a857b]'}`}>Bedding Luxury</span>
              <span className={`font-medium ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>{room.bed_type || 'Custom Master King'}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#c5a880] flex-shrink-0" />
            <div>
              <span className={`block ${isLight ? 'text-[#7a7469]' : 'text-[#8a857b]'}`}>Guest Capacity</span>
              <span className={`font-medium ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>Up to {room.max_guests || 2} Guests</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Left Details vs Right Sticky Booking Form */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Details Column (7 cols) */}
          <div className="lg:col-span-7 space-y-10 sm:space-y-12">
            {/* Overview Narrative */}
            <div>
              <h3 className={`font-serif text-2xl sm:text-3xl mb-4 ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
                The Sanctuary Experience
              </h3>
              <p className={`text-base font-light leading-relaxed mb-6 ${isLight ? 'text-[#575249]' : 'text-[#ada79b]'}`}>
                {room.full_description || room.short_description}
              </p>
              <p className={`text-sm font-light leading-relaxed ${isLight ? 'text-[#706a5e]' : 'text-[#8e897e]'}`}>
                Carved into the Mediterranean cliffs, every facet of this residence dissolves the boundary between indoors and the sea. Natural honed limestone keeps cool in the afternoon sun, while floor-to-ceiling glass folds open completely to welcome coastal breezes.
              </p>
            </div>

            {/* Interactive Day vs Twilight Lighting Comparison (DayNightSlider) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-[10px] uppercase font-mono tracking-[0.3em] block ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
                    INTERACTIVE LIGHTING CHRONOLOGY
                  </span>
                  <h3 className={`font-serif text-2xl mt-1 ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
                    Daylight Horizon vs Twilight Radiance
                  </h3>
                </div>
                <span className={`hidden sm:inline-block text-[10px] font-mono ${isLight ? 'text-[#7a7469]' : 'text-[#8a857b]'}`}>
                  DRAG SLIDER TO COMPARE
                </span>
              </div>
              <DayNightSlider
                dayImage={room.image_url || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80'}
                nightImage="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80"
                dayLabel="Sunlit Mediterranean"
                nightLabel="Starlit Villa Radiance"
                className="h-64 sm:h-80 md:h-96 w-full"
              />
            </div>

            {/* Room Facilities & Architecture */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-colors space-y-6 ${
              isLight ? 'bg-white border-[#c5a880]/30 shadow-[0_4px_20px_rgba(0,0,0,0.03)]' : 'bg-[#121418] border-white/10'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#c5a880]" />
                <h3 className={`font-serif text-2xl ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
                  Suite Architecture & Facilities
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(room.facilities && room.facilities.length > 0 ? room.facilities : [
                  'Private heated mineral plunge pool (32°C)',
                  'Freestanding solid chiseled limestone soaking tub',
                  'Custom Italian Rivolta Carmignani linen bedding',
                  'Acoustically tuned Bang & Olufsen sound monitors',
                  'Double travertine vanity & chromotherapy rain shower',
                  'Dyson Supersonic styling bar & Acqua di Parma amenities',
                  'Bespoke temperature sommelier wine display',
                  'Motorized blackout drapes & solar terrace shading'
                ]).map((fac, idx) => (
                  <div key={idx} className={`flex items-start gap-2.5 text-xs ${isLight ? 'text-[#44403c]' : 'text-[#d4cebf]'}`}>
                    <Check className="w-4 h-4 text-[#c5a880] flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bespoke In-Suite Services Provided */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-colors space-y-6 ${
              isLight ? 'bg-[#f4efe6] border-[#c5a880]/35' : 'bg-[#14161b] border-[#c5a880]/20'
            }`}>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#c5a880]" />
                <h3 className={`font-serif text-2xl ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
                  Services Provided in This Sanctuary
                </h3>
              </div>
              <p className={`text-xs font-light leading-relaxed ${isLight ? 'text-[#575249]' : 'text-[#8e897e]'}`}>
                Our hospitality is intuitive, anticipatory, and discreet. The following bespoke services are included exclusively with your suite reservation:
              </p>
              <div className="space-y-3">
                {(room.services_provided && room.services_provided.length > 0 ? room.services_provided : [
                  '24/7 dedicated personal royal butler anticipating all desires',
                  'Complimentary unpack & repack garment care service',
                  'Daily in-suite Michelin-starred private breakfast on the terrace',
                  'VIP Nice airport chauffeured limousine or Riva boat arrival transfer',
                  'Evening artisanal cocktail mixology ritual prepared in-villa',
                  'Priority access at L’Horizon 3★ and Thermal Bathhouse hydrotherapy',
                  'Private morning somatic yoga session on the villa sun deck'
                ]).map((srv, sIdx) => (
                  <div key={sIdx} className={`flex items-start gap-3 text-xs ${isLight ? 'text-[#292524]' : 'text-[#d8d3c7]'}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880] mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{srv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Date Picker & Booking Card (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className={`rounded-2xl border p-6 sm:p-8 shadow-2xl space-y-6 transition-colors ${
              isLight ? 'bg-white border-[#c5a880]/40 shadow-[0_16px_40px_rgba(143,106,53,0.08)]' : 'bg-[#121418] border-[#c5a880]/35'
            }`}>
              <div className={`flex items-baseline justify-between pb-4 border-b ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                <div>
                  <span className={`text-[10px] uppercase font-mono tracking-widest ${isLight ? 'text-[#7a7469]' : 'text-[#8a857b]'}`}>RATES FROM</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className={`font-serif text-3xl sm:text-4xl ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
                      ₹{basePricePerNight.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-xs ${isLight ? 'text-[#7a7469]' : 'text-[#8e897e]'}`}>/ night</span>
                  </div>
                </div>
                <span className={`text-[10px] font-mono px-2.5 py-1 rounded border ${
                  isLight 
                    ? 'text-[#8f6a35] bg-[#c5a880]/15 border-[#c5a880]/35' 
                    : 'text-[#c5a880] bg-[#c5a880]/10 border-[#c5a880]/20'
                }`}>
                  INR TARIFF
                </span>
              </div>

              {bookingConfirmation ? (
                <div className="relative p-4 sm:p-6 text-center space-y-5 overflow-hidden">
                  {/* Celebratory Luxury Confetti */}
                  <Confetti active={true} duration={4500} />

                  <div className="w-14 h-14 mx-auto rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] shadow-[0_0_20px_rgba(197,168,128,0.3)] animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <span className={`text-[10px] font-mono uppercase tracking-widest block mb-1 ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
                      RESERVATION LOGGED IN DATABASE
                    </span>
                    <h4 className={`font-serif text-2xl ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
                      Namaste, {guestName}
                    </h4>
                    <p className={`text-xs mt-2 leading-relaxed ${isLight ? 'text-[#575249]' : 'text-[#ada79b]'}`}>
                      Your stay request for the <strong className={isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}>{room.title}</strong> has been transmitted directly to our Chief Concierge.
                    </p>
                  </div>

                  <div className={`p-4 rounded-xl border text-left text-xs space-y-2 ${
                    isLight ? 'bg-[#faf7f2] border-[#c5a880]/30' : 'bg-[#171920] border-[#c5a880]/20'
                  }`}>
                    <div className="flex justify-between">
                      <span className={isLight ? 'text-[#7a7469]' : 'text-[#8e897e]'}>Reference ID</span>
                      <span className={`font-mono font-bold ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>{bookingConfirmation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isLight ? 'text-[#7a7469]' : 'text-[#8e897e]'}>Nights</span>
                      <span className={isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}>{nights} Nights ({checkIn} → {checkOut})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={isLight ? 'text-[#7a7469]' : 'text-[#8e897e]'}>Estimated Total</span>
                      <span className={`font-mono font-semibold ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <InteractiveHoverButton
                      onClick={() => setBookingConfirmation(null)}
                      variant="gold"
                      className="py-2.5 px-6 text-xs"
                    >
                      Book Another Date
                    </InteractiveHoverButton>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  {bookingError && (
                    <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs">
                      {bookingError}
                    </div>
                  )}

                  {/* Dates Picker */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-[10px] uppercase tracking-wider mb-1.5 ${isLight ? 'text-[#575249]' : 'text-[#9e988c]'}`}>
                        Check-In Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className={`w-full rounded-xl px-3 py-2.5 text-xs focus:outline-none transition-colors ${
                          isLight 
                            ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] focus:border-[#8f6a35]' 
                            : 'bg-[#171920] border border-white/10 text-[#faf6ed] focus:border-[#c5a880]'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-[10px] uppercase tracking-wider mb-1.5 ${isLight ? 'text-[#575249]' : 'text-[#9e988c]'}`}>
                        Check-Out Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className={`w-full rounded-xl px-3 py-2.5 text-xs focus:outline-none transition-colors ${
                          isLight 
                            ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] focus:border-[#8f6a35]' 
                            : 'bg-[#171920] border border-white/10 text-[#faf6ed] focus:border-[#c5a880]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className={`block text-[10px] uppercase tracking-wider mb-1.5 ${isLight ? 'text-[#575249]' : 'text-[#9e988c]'}`}>
                      Guests Count
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors ${
                        isLight 
                          ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] focus:border-[#8f6a35]' 
                          : 'bg-[#171920] border border-white/10 text-[#faf6ed] focus:border-[#c5a880]'
                      }`}
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ Guests</option>
                    </select>
                  </div>

                  {/* Optional Add-ons in INR */}
                  <div>
                    <label className={`block text-[10px] uppercase tracking-wider mb-2 font-medium ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
                      Add-on Experiences (Optional)
                    </label>
                    <div className="space-y-1.5">
                      {addonsList.map((addon) => {
                        const active = selectedAddons.includes(addon.id);
                        return (
                          <button
                            type="button"
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                              active
                                ? isLight
                                  ? 'border-[#8f6a35] bg-[#c5a880]/20 text-[#1c1917]'
                                  : 'border-[#c5a880] bg-[#c5a880]/15 text-[#faf6ed]'
                                : isLight
                                  ? 'border-[#c5a880]/20 bg-[#faf7f2] text-[#575249] hover:border-[#8f6a35]'
                                  : 'border-white/5 bg-[#171920] text-[#8e897e] hover:border-white/15'
                            }`}
                          >
                            <span className="text-[11px] font-light truncate mr-2">{addon.label}</span>
                            <span className={`font-mono text-[11px] whitespace-nowrap font-semibold ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>{addon.priceFormatted}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Guest Information */}
                  <div className={`pt-2 border-t space-y-3 ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors ${
                        isLight 
                          ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] placeholder-[#8a8479] focus:border-[#8f6a35]' 
                          : 'bg-[#171920] border border-white/10 text-[#faf6ed] placeholder-[#6b665c] focus:border-[#c5a880]'
                      }`}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="email"
                        required
                        placeholder="Email Address *"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className={`w-full rounded-xl px-3 py-2.5 text-xs focus:outline-none transition-colors ${
                          isLight 
                            ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] placeholder-[#8a8479] focus:border-[#8f6a35]' 
                            : 'bg-[#171920] border border-white/10 text-[#faf6ed] placeholder-[#6b665c] focus:border-[#c5a880]'
                        }`}
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Phone / WhatsApp *"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className={`w-full rounded-xl px-3 py-2.5 text-xs focus:outline-none transition-colors ${
                          isLight 
                            ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] placeholder-[#8a8479] focus:border-[#8f6a35]' 
                            : 'bg-[#171920] border border-white/10 text-[#faf6ed] placeholder-[#6b665c] focus:border-[#c5a880]'
                        }`}
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Special Requests or Arrival Notes"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors ${
                        isLight 
                          ? 'bg-[#faf7f2] border border-[#c5a880]/35 text-[#1c1917] placeholder-[#8a8479] focus:border-[#8f6a35]' 
                          : 'bg-[#171920] border border-white/10 text-[#faf6ed] placeholder-[#6b665c] focus:border-[#c5a880]'
                      }`}
                    />
                  </div>

                  {/* Total Pricing Breakdown in INR */}
                  <div className={`p-3.5 rounded-xl border space-y-2 text-xs ${
                    isLight ? 'bg-[#faf7f2] border-[#c5a880]/25' : 'bg-[#171920] border-white/5'
                  }`}>
                    <div className={`flex justify-between ${isLight ? 'text-[#7a7469]' : 'text-[#8e897e]'}`}>
                      <span>₹{basePricePerNight.toLocaleString('en-IN')} × {nights} {nights === 1 ? 'Night' : 'Nights'}</span>
                      <span className={`font-mono ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>₹{(basePricePerNight * nights).toLocaleString('en-IN')}</span>
                    </div>
                    {calculateAddonsTotal() > 0 && (
                      <div className={`flex justify-between ${isLight ? 'text-[#7a7469]' : 'text-[#8e897e]'}`}>
                        <span>Add-on Experiences</span>
                        <span className={`font-mono ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>₹{calculateAddonsTotal().toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className={`pt-2 border-t flex justify-between font-medium ${isLight ? 'border-black/10' : 'border-white/10'}`}>
                      <span className={isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}>Total Investment</span>
                      <span className={`font-serif text-lg ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <InteractiveHoverButton
                    type="submit"
                    disabled={bookingLoading}
                    variant="gold"
                    className="w-full py-3.5 text-xs tracking-[0.2em]"
                  >
                    {bookingLoading ? 'Reserving...' : `Book ${room.title}`}
                  </InteractiveHoverButton>

                  <div className={`flex items-center justify-center gap-2 text-[10px] ${isLight ? 'text-[#7a7469]' : 'text-[#736e65]'}`}>
                    <ShieldCheck className={`w-3.5 h-3.5 ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`} />
                    <span>Direct Concierge Reservation • Real Database Logged</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
