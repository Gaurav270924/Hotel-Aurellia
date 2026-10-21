import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubscribed(true);
        setMsg(data.message || 'Thank you for joining our private dispatch.');
        setEmail('');
      } else {
        setMsg(data.message || 'Subscription unsuccessful.');
      }
    } catch {
      setMsg('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-[#08090a] border-t border-white/10 pt-20 pb-12 text-[#9a9488] overflow-hidden">
      {/* Grand Typographic Architectural Background Watermark */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0"
      >
        <span 
          className="font-serif text-[18vw] leading-none tracking-[0.18em] font-light uppercase whitespace-nowrap animate-glow-pulse will-change-transform"
        >
          AURELIA
        </span>
      </div>

      {/* Ambient Top Glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 pointer-events-none blur-2xl z-0 ${
        isLight
          ? 'bg-gradient-to-b from-[#8f6a35]/[0.03] to-transparent'
          : 'bg-gradient-to-b from-[#c5a880]/[0.05] to-transparent'
      }`} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-3xl tracking-[0.25em] text-[#faf6ed] group-hover:text-[#c5a880] transition-colors block">
                AURELIA
              </span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-[#a39e93] block -mt-0.5">
                Resort & Sanctuary
              </span>
            </Link>
            <p className="text-sm font-light leading-relaxed max-w-sm text-[#ada79b]">
              A sanctuary of architectural purity and Mediterranean stillness on the Cap d'Antibes peninsula. An invitation to unhurried living.
            </p>
            <div className="pt-2 text-xs font-mono tracking-widest text-[#c5a880]">
              COASTAL SANCTUARY • EST. 1928 • FRANCE
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#f5f2eb] font-semibold mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li><Link to="/about" className="hover:text-[#c5a880] transition-colors">The Experience</Link></li>
              <li><Link to="/services" className="hover:text-[#c5a880] transition-colors">Suites & Villas</Link></li>
              <li><Link to="/dining" className="hover:text-[#c5a880] transition-colors">3★ Gastronomy</Link></li>
              <li><Link to="/wellness" className="hover:text-[#c5a880] transition-colors">Thermal Bathhouse</Link></li>
              <li><Link to="/events" className="hover:text-[#c5a880] transition-colors">Events & Galas</Link></li>
              <li><Link to="/gallery" className="hover:text-[#c5a880] transition-colors">Media Gallery</Link></li>
            </ul>
          </div>

          {/* Location & Inquiries */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#f5f2eb] font-semibold mb-4">
              Concierge Desk
            </h4>
            <p className="text-sm font-light leading-relaxed text-[#8f897e]">
              Cap d'Antibes Peninsula<br />
              06600 Antibes, Côte d'Azur<br />
              France
            </p>
            <p className="text-sm text-[#c5a880] font-light pt-1">
              concierge@aureliahotel.com<br />
              +33 (0)4 93 61 00 00
            </p>
            <div className="pt-1">
              <Link to="/contact" className="text-xs uppercase tracking-widest text-[#f5f2eb] underline hover:text-[#c5a880]">
                Directions & Inquiries →
              </Link>
            </div>
          </div>

          {/* Newsletter / Private dispatch */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#f5f2eb] font-semibold">
              The Private Dispatch
            </h4>
            <p className="text-sm font-light text-[#8f897e]">
              Receive seasonal culinary chronicles, private retreat invitations, and vintage cellar releases.
            </p>
            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-[#14161b] border border-[#c5a880]/30 text-xs text-[#c5a880] flex items-center gap-2">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span>{msg}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#121316] border border-white/10 px-4 py-3 rounded-full text-xs text-[#f5f2eb] placeholder-[#6d675e] focus:outline-none focus:border-[#c5a880]"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-3 rounded-full bg-[#c5a880] text-[#090a0b] text-xs uppercase tracking-widest font-semibold hover:bg-[#dfc298] transition-colors whitespace-nowrap"
                  >
                    {loading ? '...' : 'Join'}
                  </button>
                </div>
                {msg && <p className="text-[11px] text-red-400">{msg}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6e685f] gap-4">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} Aurelia Resort & Sanctuary. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 sm:gap-x-6 gap-y-2 text-center">
            <Link to="/about" className="hover:text-[#c5a880] transition-colors">Philosophy</Link>
            <span className="text-white/20">•</span>
            <Link to="/services" className="hover:text-[#c5a880] transition-colors">Suites & Villas</Link>
            <span className="text-white/20">•</span>
            <Link to="/contact" className="hover:text-[#c5a880] transition-colors">Sanctuary Inquiries</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
