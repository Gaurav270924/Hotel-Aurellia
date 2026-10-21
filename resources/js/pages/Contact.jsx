import React, { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle,
  Sparkles, Compass, MessageSquare, ChevronDown
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Contact() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Concierge Inquiry');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [formError, setFormError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setConfirmation(data.reference_id || 'AUR-CNT-RECEIVED');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setFormError(data.message || 'Unable to submit your inquiry. Please verify the information and try again.');
      }
    } catch {
      setFormError('A connection error occurred. Please check your network connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'What is the closest international airport and transfer time?',
      a: 'Nice Côte d’Azur International Airport (NCE) is 25 minutes by chauffeured limousine or 8 minutes via our private helicopter partner arriving directly onto our resort seaside helipad.',
    },
    {
      q: 'Are all tariffs displayed in Indian Rupees (INR)?',
      a: 'Yes, all tariffs, suite rates, degustation tasting menus, and bespoke charter packages are quoted in Indian Rupees (₹ / INR). We accept all international cards and direct bank wires.',
    },
    {
      q: 'Can guests arrive via private yacht?',
      a: 'Yes. Aurelia features a deep-water sheltered jetty capable of accommodating vessels up to 55 meters. Our marina tender is at your disposal 24/7.',
    },
    {
      q: 'What are the check-in and check-out formalities?',
      a: 'Check-in is from 15:00 and check-out is at 12:00. Direct in-villa check-in is conducted with your assigned private butler without front-desk waiting.',
    },
  ];

  return (
    <div className={`transition-colors duration-500 overflow-x-hidden ${isLight ? 'bg-[#f7f5f0] text-[#1c1917]' : 'bg-[#090a0b] text-[#f5f2eb]'}`}>
      {/* 1. TOP CINEMATIC IMAGE FIRST */}
      <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={
            isLight
              ? 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=2000&q=85'
              : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85'
          }
          alt="Aurelia Sanctuary Concierge Desk"
          className="w-full h-full object-cover filter brightness-[0.88]"
        />
        <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-t from-[#f7f5f0] via-transparent to-black/40' : 'bg-gradient-to-t from-[#090a0b] via-transparent to-black/60'}`} />
        <div className="absolute top-28 sm:top-32 left-4 sm:left-6 md:left-12">
          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[0.3em] sm:tracking-[0.4em] text-[#c5a880] px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            CONCIERGE & DESPATCH • 24/7
          </span>
        </div>
      </section>

      {/* 2. TITLE & EYEBROW AFTER IMAGE (NO NEGATIVE MARGIN OVERFLOW) */}
      <section className="relative px-6 md:px-12 pt-10 sm:pt-14 pb-10 max-w-7xl mx-auto z-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-[#c5a880]" />
          <span className={`text-[11px] uppercase tracking-[0.35em] font-semibold ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
            CONCIERGE & CORRESPONDENCE
          </span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-black/10 dark:border-white/10">
          <div>
            <h1 className={`font-serif text-3xl sm:text-5xl md:text-7xl font-light leading-tight tracking-tight ${isLight ? 'text-[#1c1917]' : 'text-[#faf6ed]'}`}>
              Contact <span className="italic font-normal gold-gradient-text">Our Concierge.</span>
            </h1>
            <p className={`text-base font-light max-w-xl mt-3 leading-relaxed ${isLight ? 'text-[#575249]' : 'text-[#ada79b]'}`}>
              Whether arranging private aviation transfers, bespoke dietary preferences, or secluded estate buyouts, our team is at your continuous service.
            </p>
          </div>
          <span className={`text-xs font-mono uppercase tracking-widest self-start lg:self-auto ${isLight ? 'text-[#8f6a35]' : 'text-[#c5a880]'}`}>
            Guaranteed Response Within 2 Hours
          </span>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-[#121418] border border-white/10 space-y-6">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-semibold block">
                SANCTUARY ADDRESS
              </span>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#c5a880] flex-shrink-0 mt-1" />
                <div className="text-sm font-light text-[#ada79b] leading-relaxed">
                  <strong className="text-[#faf6ed] block font-normal">Aurelia Resort & Sanctuary</strong>
                  Cap d'Antibes Peninsula<br />
                  06600 Antibes, Côte d'Azur<br />
                  France
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#c5a880] flex-shrink-0 mt-1" />
                <div className="text-sm font-light text-[#ada79b] leading-relaxed">
                  <strong className="text-[#faf6ed] block font-normal">Telephone Inquiries</strong>
                  +33 (0)4 93 61 00 00<br />
                  Direct WhatsApp: +33 6 12 34 56 00
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#c5a880] flex-shrink-0 mt-1" />
                <div className="text-sm font-light text-[#ada79b] leading-relaxed">
                  <strong className="text-[#faf6ed] block font-normal">Electronic Dispatch</strong>
                  concierge@aureliahotel.com<br />
                  reservations@aureliahotel.com
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#c5a880] flex-shrink-0 mt-1" />
                <div className="text-sm font-light text-[#ada79b] leading-relaxed">
                  <strong className="text-[#faf6ed] block font-normal">Concierge Operating Hours</strong>
                  Available 24 Hours Daily, 365 Days
                </div>
              </div>
            </div>

            {/* Map Preview Card */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#121418] relative shadow-2xl">
              <iframe
                title="Aurelia Hotel Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46210.82420953406!2d7.087796796347915!3d43.55172421383377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdd5848bb2fb8f%3A0x6b093126f5d4750a!2sCap%20d&#39;Antibes%2C%2006160%20Antibes%2C%20France!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="260"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(85%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#121418] border border-[#c5a880]/30 p-8 sm:p-12 shadow-2xl">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-semibold block mb-2">
                ELECTRONIC INQUIRY FORM
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#faf6ed] font-light mb-6">
                Send a Message.
              </h2>

              {confirmation ? (
                <div className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#faf6ed]">
                    Message Transmitted
                  </h3>
                  <p className="text-sm text-[#ada79b] leading-relaxed max-w-md mx-auto">
                    Your inquiry has been cataloged under reference <strong className="font-mono text-[#c5a880]">{confirmation}</strong>. Our Head Concierge will reply promptly.
                  </p>
                  <button
                    onClick={() => setConfirmation(null)}
                    className="luxury-btn text-xs mx-auto"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {formError && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9e988c] mb-2">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-3 text-xs text-[#faf6ed] placeholder-[#6b665c] focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9e988c] mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="email@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-3 text-xs text-[#faf6ed] placeholder-[#6b665c] focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9e988c] mb-2">Phone (Optional)</label>
                      <input
                        type="tel"
                        placeholder="+91 or international format"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-3 text-xs text-[#faf6ed] placeholder-[#6b665c] focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#9e988c] mb-2">Nature of Inquiry</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-3 text-xs text-[#faf6ed] focus:outline-none focus:border-[#c5a880]"
                      >
                        <option value="General Concierge Inquiry">General Concierge Inquiry</option>
                        <option value="Suite & Villa Reservation">Suite & Villa Reservation</option>
                        <option value="Dining & Chef Table Inquiry">Dining & Chef’s Table Inquiry</option>
                        <option value="Wellness & Spa Booking">Wellness & Spa Booking</option>
                        <option value="Private Riva Yacht Charter">Private Riva Yacht Charter</option>
                        <option value="Press & Media Relations">Press & Media Relations</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#9e988c] mb-2">Your Message *</label>
                    <textarea
                      rows="5"
                      required
                      placeholder="Please let us know how our concierge may assist you..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-3 text-xs text-[#faf6ed] placeholder-[#6b665c] focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-[11px] text-[#736e65]">
                      <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                      <span>Encrypted transmission • No data shared with third parties</span>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto luxury-btn text-xs"
                    >
                      {submitting ? 'Transmitting...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Inquiries Accordion */}
      <section className="py-24 bg-[#0c0d10] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.35em] text-[#c5a880] font-semibold block mb-3">
              GUEST ASSISTANCE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#faf6ed] font-light">
              Common Questions.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#121418] border border-white/5 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:text-[#c5a880] transition-colors"
                  >
                    <span className="font-serif text-lg sm:text-xl text-[#faf6ed]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#c5a880] transform transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-[#ada79b] leading-relaxed font-light border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
