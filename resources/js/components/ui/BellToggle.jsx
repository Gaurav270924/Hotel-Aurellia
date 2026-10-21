import React, { useState } from 'react';
import { Bell, Sparkles, Check, X, Calendar, Wine, Gift } from 'lucide-react';

/**
 * BellToggle
 * Inspired by React Bits BellToggle with physics-based swing animation,
 * ripple wave rings, notification badge, and a luxury concierge preview drawer.
 */
export default function BellToggle({
  unreadCount = 2,
  onToggle,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Sunset Champagne Cruise',
      desc: 'Complimentary private Riva boat tour included for Villa & Penthouse reservations this week.',
      time: 'Today 18:30',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />,
    },
    {
      id: 2,
      title: 'Grand Sommelier Tasting',
      desc: 'Rare Tuscan & Bordeaux vintage cellar degustation tonight at L’Orangerie.',
      time: 'Tonight 20:00',
      icon: <Wine className="w-3.5 h-3.5 text-[#c5a880]" />,
    },
  ]);

  const handleRing = () => {
    setIsRinging(true);
    setIsOpen(!isOpen);
    setTimeout(() => setIsRinging(false), 900);
    if (onToggle) onToggle(!isOpen);
  };

  const dismiss = (id, e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Bell Button */}
      <button
        onClick={handleRing}
        aria-label="Concierge Notifications"
        className="relative group p-2.5 rounded-full bg-white/5 hover:bg-[#c5a880]/15 border border-white/10 hover:border-[#c5a880]/50 transition-all duration-300 text-[#e5cb9f] hover:text-white focus:outline-none"
      >
        {/* Animated Ripple Waves when ringing */}
        {isRinging && (
          <span className="absolute inset-0 rounded-full border border-[#c5a880] animate-ping opacity-75" />
        )}

        {/* Bell Icon with Swing Animation */}
        <span
          className={`inline-block transition-transform duration-300 ${
            isRinging ? 'animate-[bellSwing_0.85s_ease-in-out]' : 'group-hover:rotate-12'
          }`}
          style={{ transformOrigin: 'top center' }}
        >
          <Bell className="w-4 h-4 md:w-4.5 md:h-4.5 stroke-[1.75]" />
        </span>

        {/* Notification Badge */}
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a880] text-[9px] font-bold text-[#090a0b] shadow-[0_0_8px_rgba(197,168,128,0.7)]">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 sm:hidden"
        />
      )}

      {/* Concierge Dropdown Drawer */}
      {isOpen && (
        <div className="fixed left-3 right-3 top-[72px] sm:left-auto sm:right-0 sm:top-full sm:mt-3 w-auto sm:w-96 max-w-sm sm:max-w-none mx-auto sm:mx-0 rounded-2xl bg-[#12141a]/98 dark:bg-[#12141a]/98 border border-[#c5a880]/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-4 z-50 animate-fadeIn backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#c5a880]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#faf6ed]">
                Concierge Curations
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#a39e93] hover:text-white p-1 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 mt-2 max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-6 text-center text-xs text-[#a39e93]">
                No new alerts. Your stay is perfectly arranged.
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className="relative p-3 pl-3.5 rounded-xl border border-white/5 hover:border-[#c5a880]/50 bg-white/[0.03] hover:bg-[#c5a880]/10 hover:shadow-[0_4px_20px_rgba(197,168,128,0.15)] transition-all duration-200 cursor-pointer group/item flex items-start gap-3 before:absolute before:left-0 before:top-2.5 before:bottom-2.5 before:w-[3px] before:rounded-r before:bg-transparent hover:before:bg-[#c5a880] before:transition-all"
                >
                  <div className="p-2 rounded-lg bg-[#c5a880]/10 group-hover/item:bg-[#c5a880]/25 border border-[#c5a880]/20 group-hover/item:border-[#c5a880]/60 mt-0.5 transition-all duration-200 group-hover/item:scale-105 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-serif font-medium text-[#faf6ed] group-hover/item:text-[#e5cb9f] transition-colors truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-[#c5a880] group-hover/item:text-[#dfcaa7] font-medium whitespace-nowrap transition-colors">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a39e93] group-hover/item:text-[#ece7dd] mt-1 line-clamp-2 leading-relaxed transition-colors">
                      {item.desc}
                    </p>
                  </div>
                  <button
                    onClick={(e) => dismiss(item.id, e)}
                    className="opacity-0 group-hover/item:opacity-100 text-white/40 hover:text-white transition-opacity p-1 rounded hover:bg-white/10"
                    title="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="pt-3 mt-1 border-t border-white/10 text-center">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#a39e93]">
              Aurelia 24/7 Guest Services
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
