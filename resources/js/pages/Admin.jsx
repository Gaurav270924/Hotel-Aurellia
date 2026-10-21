import React, { useState, useEffect } from 'react';
import {
  Shield, Lock, LogOut, CheckCircle, Trash2, Edit, Plus,
  Search, Filter, Eye, RefreshCw, Calendar, Users, Mail, Phone,
  Sparkles, Check, AlertCircle, Image as ImageIcon
} from 'lucide-react';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('aurelia_admin_token') || '');
  const [user, setUser] = useState(null);

  // Login form
  const [loginEmail, setLoginEmail] = useState('admin@aureliahotel.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState('overview'); // overview, contact, events, services, hotelEvents, gallery, settings

  // Stats
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  // Inquiries lists
  const [contactInquiries, setContactInquiries] = useState([]);
  const [eventInquiries, setEventInquiries] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [galleryList, setGalleryList] = useState([]);
  const [settings, setSettings] = useState({});

  // Filter/search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals & Forms
  const [activeInquiryModal, setActiveInquiryModal] = useState(null);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddGallery, setShowAddGallery] = useState(false);

  // New Service Form
  const [newService, setNewService] = useState({
    title: '',
    subtitle: '',
    short_description: '',
    full_description: '',
    image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    category: 'Suites',
    price_indicative: 'From €1,500 / night',
    features: ['Ocean Horizon View', 'Private Butler Service', 'Plunge Pool'],
    is_published: true,
  });

  // New Event Form
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    full_details: '',
    event_type: 'Weddings & Celebrations',
    capacity: 'Up to 150 Guests',
    venue_area: 'The Cliff Amphitheater',
    cover_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    status: 'upcoming',
    is_featured: true,
  });

  // New Gallery Form
  const [newGallery, setNewGallery] = useState({
    title: '',
    description: '',
    media_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    media_type: 'image',
    category: 'suites',
    alt_text: 'Aurelia luxury view',
  });

  const authHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  // Verify authentication on mount
  useEffect(() => {
    if (token) {
      fetchAdminProfile();
      fetchStats();
    }
  }, [token]);

  const fetchAdminProfile = async () => {
    try {
      const res = await fetch('/api/admin/me', { headers: authHeaders });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        handleLogout();
      }
    } catch {
      handleLogout();
    }
  };

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const res = await fetch('/api/admin/stats', { headers: authHeaders });
      const data = await res.json();
      if (res.ok) setStats(data.stats);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('aurelia_admin_token', data.token);
        setToken(data.token);
        setUser(data.user);
      } else {
        setLoginError(data.message || 'Invalid administrator credentials.');
      }
    } catch {
      setLoginError('Could not reach backend authentication service.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST', headers: authHeaders });
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('aurelia_admin_token');
    setToken('');
    setUser(null);
  };

  // Load section data when tab changes
  useEffect(() => {
    if (!token) return;
    if (activeTab === 'contact') fetchContactInquiries();
    if (activeTab === 'events') fetchEventInquiries();
    if (activeTab === 'services') fetchServices();
    if (activeTab === 'hotelEvents') fetchHotelEvents();
    if (activeTab === 'gallery') fetchGallery();
    if (activeTab === 'settings') fetchSettings();
  }, [activeTab, token]);

  // Contact Inquiries
  const fetchContactInquiries = async () => {
    const res = await fetch('/api/admin/contact-inquiries', { headers: authHeaders });
    const data = await res.json();
    if (res.ok) setContactInquiries(data.data.data || []);
  };

  const updateContactStatus = async (id, status) => {
    await fetch(`/api/admin/contact-inquiries/${id}`, {
      method: 'PATCH',
      headers: authHeaders,
      body: JSON.stringify({ status }),
    });
    fetchContactInquiries();
    fetchStats();
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this contact inquiry permanently?')) return;
    await fetch(`/api/admin/contact-inquiries/${id}`, { method: 'DELETE', headers: authHeaders });
    fetchContactInquiries();
    fetchStats();
  };

  // Event Inquiries
  const fetchEventInquiries = async () => {
    const res = await fetch('/api/admin/event-inquiries', { headers: authHeaders });
    const data = await res.json();
    if (res.ok) setEventInquiries(data.data.data || []);
  };

  const updateEventStatus = async (id, status) => {
    await fetch(`/api/admin/event-inquiries/${id}`, {
      method: 'PATCH',
      headers: authHeaders,
      body: JSON.stringify({ status }),
    });
    fetchEventInquiries();
    fetchStats();
  };

  const deleteEventInquiry = async (id) => {
    if (!window.confirm('Delete this event inquiry permanently?')) return;
    await fetch(`/api/admin/event-inquiries/${id}`, { method: 'DELETE', headers: authHeaders });
    fetchEventInquiries();
    fetchStats();
  };

  // Services
  const fetchServices = async () => {
    const res = await fetch('/api/admin/services', { headers: authHeaders });
    const data = await res.json();
    if (res.ok) setServicesList(data.data || []);
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/services', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(newService),
    });
    setShowAddService(false);
    fetchServices();
    fetchStats();
  };

  const deleteService = async (id) => {
    if (!window.confirm('Delete this service/suite listing?')) return;
    await fetch(`/api/admin/services/${id}`, { method: 'DELETE', headers: authHeaders });
    fetchServices();
    fetchStats();
  };

  // Events
  const fetchHotelEvents = async () => {
    const res = await fetch('/api/admin/events', { headers: authHeaders });
    const data = await res.json();
    if (res.ok) setEventsList(data.data || []);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/events', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(newEvent),
    });
    setShowAddEvent(false);
    fetchHotelEvents();
    fetchStats();
  };

  const deleteHotelEvent = async (id) => {
    if (!window.confirm('Delete this event listing?')) return;
    await fetch(`/api/admin/events/${id}`, { method: 'DELETE', headers: authHeaders });
    fetchHotelEvents();
    fetchStats();
  };

  // Gallery
  const fetchGallery = async () => {
    const res = await fetch('/api/admin/gallery', { headers: authHeaders });
    const data = await res.json();
    if (res.ok) setGalleryList(data.data || []);
  };

  const handleCreateGallery = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/gallery', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(newGallery),
    });
    setShowAddGallery(false);
    fetchGallery();
    fetchStats();
  };

  const deleteGalleryItem = async (id) => {
    if (!window.confirm('Delete this gallery item?')) return;
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE', headers: authHeaders });
    fetchGallery();
    fetchStats();
  };

  // Settings
  const fetchSettings = async () => {
    const res = await fetch('/api/admin/settings', { headers: authHeaders });
    const data = await res.json();
    if (res.ok) {
      const map = {};
      (data.data || []).forEach(item => { map[item.setting_key] = item.setting_value; });
      setSettings(map);
    }
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ settings }),
    });
    alert('Site settings updated successfully.');
  };

  // ----------------------------------------------------
  // UN-AUTHENTICATED VIEW (LOGIN CARD)
  // ----------------------------------------------------
  if (!token || !user) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-[#090a0b] text-[#f5f2eb]">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-[#121316] border border-[#c5a880]/30 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <span className="font-serif text-3xl text-[#faf6ed] block">AURELIA</span>
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#c5a880]">
              ADMINISTRATIVE SANCTUARY PORTAL
            </span>
          </div>

          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#9e988c] mb-2">
                Administrator Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-3 text-xs text-[#faf6ed] focus:outline-none focus:border-[#c5a880]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#9e988c] mb-2">
                Master Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-3 text-xs text-[#faf6ed] focus:outline-none focus:border-[#c5a880]"
              />
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full luxury-btn text-xs justify-center"
            >
              {loginLoading ? 'Authenticating...' : 'Authenticate & Enter Dashboard'}
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-[#736e65]">
            Default Master Access: <code className="text-[#c5a880]">admin@aureliahotel.com</code> / <code className="text-[#c5a880]">admin123</code>
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="pt-28 md:pt-32 min-h-screen bg-[#090a0b] text-[#f5f2eb]">
      {/* Top Admin Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-serif text-2xl text-[#faf6ed]">
              Sanctuary Concierge Console
            </h1>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8a857b]">
              Connected as {user.name} ({user.email})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { fetchStats(); }}
            className="p-2.5 rounded-full bg-[#14161b] hover:bg-[#1a1c22] border border-white/10 text-[#c5a880] transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full border border-red-500/30 text-red-300 hover:bg-red-950/40 text-xs uppercase tracking-wider font-medium flex items-center gap-2 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminate Session</span>
          </button>
        </div>
      </div>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-white/10 mb-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'contact', label: `Contact Inquiries (${stats?.new_contact_inquiries ?? 0})` },
            { id: 'events', label: `Event Requests (${stats?.pending_event_inquiries ?? 0})` },
            { id: 'services', label: `Services & Suites (${stats?.total_services ?? 0})` },
            { id: 'hotelEvents', label: `Events Showcase (${stats?.total_events ?? 0})` },
            { id: 'gallery', label: `Media Gallery (${stats?.total_gallery_items ?? 0})` },
            { id: 'settings', label: 'Site Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#c5a880] text-[#090a0b] font-semibold shadow-lg shadow-[#c5a880]/20'
                  : 'bg-[#14161b] text-[#8e897e] hover:text-[#faf6ed] border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ---------------- OVERVIEW TAB ---------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-10 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#121418] border border-white/10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8a857b] block mb-2">
                  NEW CONTACT INQUIRIES
                </span>
                <span className="font-serif text-4xl text-[#faf6ed] block">
                  {stats?.new_contact_inquiries ?? 0}
                </span>
                <span className="text-xs text-[#8e897e] mt-1 block">
                  Total logged: {stats?.total_contact_inquiries ?? 0}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#121418] border border-white/10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8a857b] block mb-2">
                  PENDING EVENT REQUESTS
                </span>
                <span className="font-serif text-4xl text-[#c5a880] block">
                  {stats?.pending_event_inquiries ?? 0}
                </span>
                <span className="text-xs text-[#8e897e] mt-1 block">
                  Total bookings: {stats?.total_event_inquiries ?? 0}
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#121418] border border-white/10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8a857b] block mb-2">
                  SERVICES & SUITES
                </span>
                <span className="font-serif text-4xl text-[#faf6ed] block">
                  {stats?.total_services ?? 0}
                </span>
                <span className="text-xs text-[#8e897e] mt-1 block">
                  Active listings
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#121418] border border-white/10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8a857b] block mb-2">
                  GALLERY PLATES
                </span>
                <span className="font-serif text-4xl text-[#faf6ed] block">
                  {stats?.total_gallery_items ?? 0}
                </span>
                <span className="text-xs text-[#8e897e] mt-1 block">
                  Visuals in database
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-8 rounded-2xl bg-[#121418] border border-white/10 space-y-4">
              <h3 className="font-serif text-2xl text-[#faf6ed]">
                Quick Management Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab('contact')}
                  className="px-5 py-2.5 rounded-full bg-[#1c1e24] hover:bg-[#252830] text-xs uppercase tracking-wider text-[#faf6ed] border border-white/10 transition-colors"
                >
                  Review Inquiries ({stats?.new_contact_inquiries ?? 0} Unread)
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className="px-5 py-2.5 rounded-full bg-[#1c1e24] hover:bg-[#252830] text-xs uppercase tracking-wider text-[#faf6ed] border border-white/10 transition-colors"
                >
                  Review Event Bookings ({stats?.pending_event_inquiries ?? 0} Pending)
                </button>
                <button
                  onClick={() => { setActiveTab('services'); setShowAddService(true); }}
                  className="px-5 py-2.5 rounded-full bg-[#c5a880] text-[#090a0b] text-xs uppercase tracking-wider font-semibold hover:bg-[#dfc298] transition-colors"
                >
                  + Add New Suite / Service
                </button>
                <button
                  onClick={() => { setActiveTab('gallery'); setShowAddGallery(true); }}
                  className="px-5 py-2.5 rounded-full bg-[#c5a880] text-[#090a0b] text-xs uppercase tracking-wider font-semibold hover:bg-[#dfc298] transition-colors"
                >
                  + Add Gallery Photo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- CONTACT INQUIRIES TAB ---------------- */}
        {activeTab === 'contact' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl text-[#faf6ed]">Contact Inquiries</h2>
              <span className="text-xs text-[#8e897e]">{contactInquiries.length} Inquiries recorded</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121418] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#171920] border-b border-white/10 uppercase tracking-widest text-[#8a857b]">
                    <tr>
                      <th className="p-4">Sender</th>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Message Snippet</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#ada79b]">
                    {contactInquiries.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-[#736e65]">
                          No contact inquiries found.
                        </td>
                      </tr>
                    ) : (
                      contactInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-white/[0.02]">
                          <td className="p-4">
                            <strong className="text-[#faf6ed] block font-medium">{inq.name}</strong>
                            <span className="text-[11px] text-[#736e65] block">{inq.email}</span>
                            {inq.phone && <span className="text-[10px] text-[#c5a880]">{inq.phone}</span>}
                          </td>
                          <td className="p-4 text-[#faf6ed] font-medium">{inq.subject}</td>
                          <td className="p-4 max-w-xs truncate text-[#8e897e]">{inq.message}</td>
                          <td className="p-4">
                            <select
                              value={inq.status}
                              onChange={(e) => updateContactStatus(inq.id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-[10px] uppercase font-mono border focus:outline-none ${
                                inq.status === 'new'
                                  ? 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                                  : inq.status === 'replied'
                                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                                  : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="read">Read</option>
                              <option value="replied">Replied</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td className="p-4 text-[11px] text-[#736e65]">
                            {new Date(inq.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => deleteContact(inq.id)}
                              className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/50 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- EVENT INQUIRIES TAB ---------------- */}
        {activeTab === 'events' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl text-[#faf6ed]">Event Booking Requests</h2>
              <span className="text-xs text-[#8e897e]">{eventInquiries.length} Requests recorded</span>
            </div>

            <div className="space-y-4">
              {eventInquiries.length === 0 ? (
                <div className="p-12 text-center text-[#736e65] rounded-2xl bg-[#121418] border border-white/10">
                  No event inquiries logged yet.
                </div>
              ) : (
                eventInquiries.map((evInq) => (
                  <div
                    key={evInq.id}
                    className="p-6 rounded-2xl bg-[#121418] border border-white/10 hover:border-[#c5a880]/30 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                      <div>
                        <span className="text-[10px] font-mono text-[#c5a880] uppercase tracking-widest block">
                          REF: AUR-EVT-{String(evInq.id).padStart(5, '0')}
                        </span>
                        <h3 className="font-serif text-2xl text-[#faf6ed]">
                          {evInq.event_type}
                        </h3>
                        <span className="text-xs text-[#8e897e]">
                          Organizer: <strong className="text-[#faf6ed]">{evInq.name}</strong> • {evInq.email} • {evInq.phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={evInq.status}
                          onChange={(e) => updateEventStatus(evInq.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-full text-xs uppercase font-mono border focus:outline-none ${
                            evInq.status === 'pending'
                              ? 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                              : evInq.status === 'confirmed'
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                              : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="declined">Declined</option>
                        </select>
                        <button
                          onClick={() => deleteEventInquiry(evInq.id)}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-950/50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-[#736e65] block">Preferred Date</span>
                        <span className="text-[#faf6ed] font-medium">{evInq.preferred_date || 'Flexible'}</span>
                      </div>
                      <div>
                        <span className="text-[#736e65] block">Guest Count</span>
                        <span className="text-[#faf6ed] font-medium">{evInq.guest_count ? `${evInq.guest_count} Guests` : 'Unspecified'}</span>
                      </div>
                      <div>
                        <span className="text-[#736e65] block">Location / Venue</span>
                        <span className="text-[#faf6ed] font-medium">{evInq.location}</span>
                      </div>
                      <div>
                        <span className="text-[#736e65] block">Budget Range</span>
                        <span className="text-[#c5a880] font-mono">{evInq.budget_range}</span>
                      </div>
                    </div>

                    {evInq.requirements && (
                      <div className="p-4 rounded-xl bg-[#171920] border border-white/5 text-xs text-[#ada79b]">
                        <strong className="text-[#faf6ed] block mb-1">Organizer Requirements:</strong>
                        {evInq.requirements}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ---------------- SERVICES TAB ---------------- */}
        {activeTab === 'services' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl text-[#faf6ed]">Services & Suites Management</h2>
              <button
                onClick={() => setShowAddService(!showAddService)}
                className="luxury-btn text-xs"
              >
                {showAddService ? 'Cancel' : '+ Add New Service'}
              </button>
            </div>

            {/* Add Service Modal/Drawer */}
            {showAddService && (
              <form onSubmit={handleCreateService} className="p-6 rounded-2xl bg-[#14161b] border border-[#c5a880]/30 space-y-4">
                <h3 className="font-serif text-xl text-[#faf6ed]">New Suite / Service Form</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Title (e.g. Royal Orchid Villa)"
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    className="bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                  />
                  <input
                    type="text"
                    placeholder="Subtitle (e.g. CLIFFSIDE SANCTUARY)"
                    value={newService.subtitle}
                    onChange={(e) => setNewService({ ...newService, subtitle: e.target.value })}
                    className="bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                    className="bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                  >
                    <option value="Suites">Suites</option>
                    <option value="Dining">Dining</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Experiences">Experiences</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Indicative Price (e.g. From €2,000 / night)"
                    value={newService.price_indicative}
                    onChange={(e) => setNewService({ ...newService, price_indicative: e.target.value })}
                    className="bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                  />
                  <input
                    type="url"
                    required
                    placeholder="Image URL"
                    value={newService.image_url}
                    onChange={(e) => setNewService({ ...newService, image_url: e.target.value })}
                    className="bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                  />
                </div>
                <textarea
                  rows="2"
                  required
                  placeholder="Short Description..."
                  value={newService.short_description}
                  onChange={(e) => setNewService({ ...newService, short_description: e.target.value })}
                  className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                />
                <button type="submit" className="luxury-btn text-xs">
                  Save Service
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesList.map((srv) => (
                <div key={srv.id} className="rounded-2xl overflow-hidden bg-[#121418] border border-white/10 flex flex-col justify-between">
                  <div className="h-48 overflow-hidden relative">
                    <img src={srv.image_url} alt={srv.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-black/70 text-[#f5f2eb]">
                      {srv.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-xl text-[#faf6ed]">{srv.title}</h4>
                      <p className="text-xs text-[#8e897e] line-clamp-2">{srv.short_description}</p>
                      <span className="text-xs font-mono text-[#c5a880] block mt-2">{srv.price_indicative}</span>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-400">Published</span>
                      <button
                        onClick={() => deleteService(srv.id)}
                        className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- HOTEL EVENTS TAB ---------------- */}
        {activeTab === 'hotelEvents' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl text-[#faf6ed]">Events Portfolio Management</h2>
              <button
                onClick={() => setShowAddEvent(!showAddEvent)}
                className="luxury-btn text-xs"
              >
                {showAddEvent ? 'Cancel' : '+ Add New Event Showcase'}
              </button>
            </div>

            {showAddEvent && (
              <form onSubmit={handleCreateEvent} className="p-6 rounded-2xl bg-[#14161b] border border-[#c5a880]/30 space-y-4">
                <h3 className="font-serif text-xl text-[#faf6ed]">New Event Showcase</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g. Weddings & Celebrations)"
                    value={newEvent.event_type}
                    onChange={(e) => setNewEvent({ ...newEvent, event_type: e.target.value })}
                    className="bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Capacity (e.g. Up to 150 Guests)"
                    value={newEvent.capacity}
                    onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
                    className="bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                  />
                  <input
                    type="text"
                    placeholder="Venue Area"
                    value={newEvent.venue_area}
                    onChange={(e) => setNewEvent({ ...newEvent, venue_area: e.target.value })}
                    className="bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                  />
                  <input
                    type="url"
                    required
                    placeholder="Cover Image URL"
                    value={newEvent.cover_image}
                    onChange={(e) => setNewEvent({ ...newEvent, cover_image: e.target.value })}
                    className="bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                  />
                </div>
                <textarea
                  rows="3"
                  required
                  placeholder="Event Description..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                />
                <button type="submit" className="luxury-btn text-xs">
                  Save Event
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {eventsList.map((ev) => (
                <div key={ev.id} className="rounded-2xl overflow-hidden bg-[#121418] border border-white/10 p-5 flex flex-col justify-between">
                  <div className="flex gap-4">
                    <img src={ev.cover_image} alt={ev.title} className="w-24 h-24 object-cover rounded-xl" />
                    <div>
                      <span className="text-[10px] font-mono text-[#c5a880] uppercase tracking-wider block">{ev.event_type}</span>
                      <h4 className="font-serif text-xl text-[#faf6ed]">{ev.title}</h4>
                      <p className="text-xs text-[#8e897e] line-clamp-2 mt-1">{ev.description}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/10 mt-4 flex items-center justify-between text-xs">
                    <span className="text-[#8e897e]">{ev.capacity}</span>
                    <button
                      onClick={() => deleteHotelEvent(ev.id)}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- GALLERY TAB ---------------- */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-3xl text-[#faf6ed]">Media Gallery Management</h2>
              <button
                onClick={() => setShowAddGallery(!showAddGallery)}
                className="luxury-btn text-xs"
              >
                {showAddGallery ? 'Cancel' : '+ Add Photo / Visual'}
              </button>
            </div>

            {showAddGallery && (
              <form onSubmit={handleCreateGallery} className="p-6 rounded-2xl bg-[#14161b] border border-[#c5a880]/30 space-y-4">
                <h3 className="font-serif text-xl text-[#faf6ed]">Add New Visual Plate</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Title / Plate Caption"
                    value={newGallery.title}
                    onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                    className="bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                  />
                  <select
                    value={newGallery.category}
                    onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                    className="bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                  >
                    <option value="suites">Suites & Villas</option>
                    <option value="dining">Gastronomy</option>
                    <option value="wellness">Thermal Spa</option>
                    <option value="events">Events & Galas</option>
                    <option value="grounds">Resort Grounds</option>
                  </select>
                  <input
                    type="url"
                    required
                    placeholder="Image URL"
                    value={newGallery.media_url}
                    onChange={(e) => setNewGallery({ ...newGallery, media_url: e.target.value })}
                    className="bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                  />
                </div>
                <textarea
                  rows="2"
                  placeholder="Optional Description..."
                  value={newGallery.description}
                  onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
                  className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#faf6ed]"
                />
                <button type="submit" className="luxury-btn text-xs">
                  Upload Visual
                </button>
              </form>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryList.map((item) => (
                <div key={item.id} className="relative group rounded-xl overflow-hidden bg-[#121418] border border-white/10 h-56">
                  <img src={item.media_url} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-mono text-[#c5a880] tracking-widest">{item.category}</span>
                      <h5 className="font-serif text-sm text-[#faf6ed] mt-1">{item.title}</h5>
                    </div>
                    <button
                      onClick={() => deleteGalleryItem(item.id)}
                      className="self-end p-2 rounded-lg bg-red-950/60 text-red-300 hover:bg-red-900 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- SETTINGS TAB ---------------- */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6 animate-fadeIn">
            <h2 className="font-serif text-3xl text-[#faf6ed]">Sanctuary Settings</h2>
            <form onSubmit={saveSettings} className="p-8 rounded-2xl bg-[#121418] border border-white/10 space-y-4 text-xs">
              <div>
                <label className="block text-[#9e988c] uppercase tracking-wider mb-2">Hotel Brand Name</label>
                <input
                  type="text"
                  value={settings.hotel_name || ''}
                  onChange={(e) => setSettings({ ...settings, hotel_name: e.target.value })}
                  className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-[#faf6ed]"
                />
              </div>
              <div>
                <label className="block text-[#9e988c] uppercase tracking-wider mb-2">Concierge Phone</label>
                <input
                  type="text"
                  value={settings.phone || ''}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-[#faf6ed]"
                />
              </div>
              <div>
                <label className="block text-[#9e988c] uppercase tracking-wider mb-2">Concierge Email</label>
                <input
                  type="email"
                  value={settings.email || ''}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-[#faf6ed]"
                />
              </div>
              <div>
                <label className="block text-[#9e988c] uppercase tracking-wider mb-2">Sanctuary Address</label>
                <input
                  type="text"
                  value={settings.address || ''}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-[#faf6ed]"
                />
              </div>
              <div>
                <label className="block text-[#9e988c] uppercase tracking-wider mb-2">Concierge Operating Hours</label>
                <input
                  type="text"
                  value={settings.business_hours || ''}
                  onChange={(e) => setSettings({ ...settings, business_hours: e.target.value })}
                  className="w-full bg-[#171920] border border-white/10 rounded-xl px-4 py-2.5 text-[#faf6ed]"
                />
              </div>
              <button type="submit" className="luxury-btn text-xs mt-4">
                Update Settings
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
