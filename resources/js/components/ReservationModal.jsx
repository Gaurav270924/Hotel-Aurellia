import React, { useState } from 'react';
import { X, Calendar, Users, Sparkles, CheckCircle, ShieldCheck, Clock } from 'lucide-react';
import Confetti from './ui/Confetti';
import InteractiveHoverButton from './ui/InteractiveHoverButton';

export default function ReservationModal({ isOpen, onClose, preselectedSuite = '' }) {
  const [suite, setSuite] = useState(preselectedSuite || 'Cliffside Infinity Villa');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const suitesList = [
    { name: 'Cliffside Infinity Villa', price: '₹2,15,000 / night', tag: '220 m² • Oceanfront' },
    { name: 'Azure Ocean Penthouse', price: '₹2,80,000 / night', tag: '185 m² • Sky Deck' },
    { name: 'The Royal Olive Sanctuary', price: '₹1,65,000 / night', tag: '160 m² • Orchard Grove' },
    { name: 'Deluxe Mediterranean Horizon Suite', price: '₹1,10,000 / night', tag: '95 m² • Sea Horizon' },
  ];

  const addonsList = [
    { id: 'yacht', label: 'Private Riva 48ft Sunset Charter', price: '₹1,20,000' },
    { id: 'sommelier', label: 'Grand Cru Sommelier Degustation Pairing', price: '₹25,000 / guest' },
    { id: 'spa', label: 'Thermal Hydrotherapy Immersion Circuit', price: '₹18,500 / guest' },
    { id: 'heli', label: 'Helicopter Transfer (Nice Airport to Helipad)', price: '₹65,000' },
  ];

  const toggleAddon = (id) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const payload = {
        name,
        email,
        phone,
        event_type: `Stay Reservation: ${suite}`,
        preferred_date: checkIn || null,
        location: suite,
        guest_count: parseInt(guests) || 2,
        budget_range: suitesList.find(s => s.name === suite)?.price || 'Custom Stay',
        requirements: `Check-in: ${checkIn || 'TBD'}, Check-out: ${checkOut || 'TBD'}. Add-ons: ${selectedAddons.join(', ') || 'None'}. Special Requests: ${specialRequests || 'None'}`,
      };

      const res = await fetch('/api/event-inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setConfirmation(data.reference_id || 'AUR-RES-001');
      } else {
        setError(data.message || 'Unable to process reservation request. Please try again.');
      }
    } catch (err) {
      setError('A network error occurred. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0e1013] border border-[#c5a880]/30 rounded-2xl shadow-2xl shadow-black overflow-hidden z-10 my-8 animate-fadeIn">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#121418]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
            <span className="font-serif text-xl sm:text-2xl text-[#faf6ed] tracking-wide">
              Reserve Your Sanctuary
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#9e988c] hover:text-[#faf6ed] hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmation ? (
          <div className="relative p-8 sm:p-12 text-center space-y-6 overflow-hidden">
            {/* Celebratory Luxury Gold Confetti */}
            <Confetti active={true} duration={4500} />

            <div className="w-16 h-16 mx-auto rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] shadow-[0_0_30px_rgba(197,168,128,0.3)] animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-semibold block mb-2">
                RESERVATION REQUEST RECEIVED
              </span>
              <h3 className="font-serif text-3xl text-[#faf6ed] mb-3">
                Thank You, {name}
              </h3>
              <p className="text-sm text-[#ada79b] max-w-md mx-auto leading-relaxed">
                Your reservation request for the <strong className="text-[#f5f2eb]">{suite}</strong> has been assigned to our Private Concierge.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#14161b] border border-[#c5a880]/20 max-w-sm mx-auto text-left space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#8e897e]">Reference Code</span>
                <span className="font-mono text-[#c5a880] font-bold">{confirmation}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#8e897e]">Assigned Suite</span>
                <span className="text-[#f5f2eb]">{suite}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#8e897e]">Guests</span>
                <span className="text-[#f5f2eb]">{guests} Guests</span>
              </div>
            </div>

            <p className="text-xs text-[#736e65]">
              A member of our reservation team will contact you at {email} within 2 hours with availability confirmation and itinerary styling.
            </p>

            <div className="pt-2 flex justify-center">
              <InteractiveHoverButton
                onClick={() => { setConfirmation(null); onClose(); }}
                variant="gold"
              >
                Return to Sanctuary
              </InteractiveHoverButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {error && (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs">
                {error}
              </div>
            )}

            {/* Suite Selection */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-3">
                Select Suite or Sanctuary Villa
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suitesList.map((s) => (
                  <button
                    type="button"
                    key={s.name}
                    onClick={() => setSuite(s.name)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      suite === s.name
                        ? 'border-[#c5a880] bg-[#c5a880]/10 text-[#faf6ed]'
                        : 'border-white/10 bg-[#14161b] text-[#a39e93] hover:border-white/20'
                    }`}
                  >
                    <div>
                      <span className="font-serif text-base block text-[#faf6ed]">{s.name}</span>
                      <span className="text-[10px] text-[#8e897e]">{s.tag}</span>
                    </div>
                    <span className="text-xs font-mono text-[#c5a880] mt-2 block">{s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dates & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9e988c] mb-2">Check-In Date</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#faf6ed] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9e988c] mb-2">Check-Out Date</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#faf6ed] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#9e988c] mb-2">Number of Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-[#14161b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#faf6ed] focus:outline-none focus:border-[#c5a880]"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5+">5+ Guests (Requires Villa)</option>
                </select>
              </div>
            </div>

            {/* Curated Experiences / Add-ons */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-3">
                Curated Sanctuary Add-ons (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {addonsList.map((addon) => {
                  const active = selectedAddons.includes(addon.id);
                  return (
                    <button
                      type="button"
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                        active
                          ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#faf6ed]'
                          : 'border-white/5 bg-[#121418] text-[#8e897e] hover:border-white/15'
                      }`}
                    >
                      <span className="font-light">{addon.label}</span>
                      <span className="font-mono text-[#c5a880] pl-2 whitespace-nowrap">{addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guest Details */}
            <div className="pt-2 border-t border-white/10 space-y-4">
              <span className="block text-[11px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
                Guest Information
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed] placeholder-[#6b665c] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed] placeholder-[#6b665c] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Telephone / WhatsApp *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed] placeholder-[#6b665c] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Dietary or Itinerary Preferences (Optional)"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-[#14161b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed] placeholder-[#6b665c] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>
            </div>

            {/* Security Notice & Submit */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-[11px] text-[#736e65]">
                <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                <span>Zero obligation inquiry • Concierge guaranteed response</span>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto luxury-btn text-xs"
              >
                {submitting ? 'Transmitting Request...' : 'Submit Reservation Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
