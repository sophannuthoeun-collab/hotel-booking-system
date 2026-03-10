import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import Footer from '../components/home/Footer';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with your actual form submission logic
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=85"
            alt="Aurum Hotel exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase font-light mb-3">
            We'd Love to Hear From You
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-white font-light leading-none">
            Get in <em className="text-gold-300">Touch</em>
          </h1>
        </div>
      </section>

      {/* ── Contact Info + Form ─────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <p className="text-gold-600 text-[11px] tracking-[0.4em] uppercase mb-4">Find Us</p>
                <h2 className="font-display text-3xl text-stone-900 font-light mb-8">
                  Contact Information
                </h2>
              </div>

              {[
                {
                  icon: MapPin,
                  title: 'Address',
                  lines: ['123 EliteStay Luxury ', 'Phnom Penh City, GC 10001'],
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  lines: ['+855 (097) 123-4567', '+855 (088) 287-8601'],
                },
                {
                  icon: Mail,
                  title: 'Email',
                  lines: ['hello@elitestay-hotel.com', 'reservations@elitestay-hotel.com'],
                },
                {
                  icon: Clock,
                  title: 'Concierge Hours',
                  lines: ['24 hours a day', '7 days a week'],
                },
              ].map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex gap-5">
                  <div className="w-10 h-10 border border-gold-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon size={16} className="text-gold-500" />
                  </div>
                  <div>
                    <h3 className="text-stone-900 text-xs tracking-[0.2em] uppercase font-medium mb-1">{title}</h3>
                    {lines.map(l => (
                      <p key={l} className="text-stone-500 text-sm">{l}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Divider */}
              <div className="border-t border-stone-100 pt-8">
                <h3 className="text-stone-900 text-xs tracking-[0.2em] uppercase font-medium mb-4">Departments</h3>
                {[
                  { label: 'Reservations', value: 'reservations@elitestay-hotel.com' },
                  { label: 'Events & Weddings', value: 'events@elitestay-hotel.com' },
                  { label: 'Press & PR', value: 'press@elitestay-hotel.com' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-stone-100 group cursor-pointer">
                    <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">{label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-stone-400 group-hover:text-gold-500 transition-colors">{value}</span>
                      <ChevronRight size={12} className="text-stone-300 group-hover:text-gold-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3 bg-stone-50 p-10">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 border border-gold-400 flex items-center justify-center mb-6">
                    <Mail size={24} className="text-gold-500" />
                  </div>
                  <h3 className="font-display text-3xl text-stone-900 font-light mb-3">Thank You</h3>
                  <p className="text-stone-500 max-w-sm leading-relaxed">
                    Your message has been received. A member of our team will be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-gold-600 text-[11px] tracking-[0.4em] uppercase mb-2">Send a Message</p>
                  <h2 className="font-display text-2xl text-stone-900 font-light mb-8">How Can We Help?</h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase text-stone-500 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full bg-white border border-stone-200 px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-gold-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase text-stone-500 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full bg-white border border-stone-200 px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-gold-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase text-stone-500 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+1 (000) 000-0000"
                          className="w-full bg-white border border-stone-200 px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-gold-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs tracking-[0.15em] uppercase text-stone-500 mb-2">Subject *</label>
                        <select
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full bg-white border border-stone-200 px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-gold-400 transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select a topic</option>
                          <option>Room Reservation</option>
                          <option>Special Occasion</option>
                          <option>Events & Weddings</option>
                          <option>Dining Enquiry</option>
                          <option>Spa & Wellness</option>
                          <option>General Enquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs tracking-[0.15em] uppercase text-stone-500 mb-2">Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can assist you..."
                        className="w-full bg-white border border-stone-200 px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gold-500 hover:bg-gold-400 text-stone-900 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-200"
                    >
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Map placeholder ─────────────────────────────────────────── */}
      <section className="h-80 bg-stone-100 relative overflow-hidden">
        <img
          src="https://static.ips-cambodia.com/wp-content/uploads/2025/09/DBG-Koh-Pich-01.jpg"
          alt="Map view"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-stone-950 text-white px-8 py-5 text-center shadow-2xl">
            <div className="text-gold-400 text-[10px] tracking-[0.3em] uppercase mb-1">Location</div>
            <div className="font-display text-xl font-light">123 EliteStay Luxury , Phnom Penh City</div>
          </div>
        </div>
      </section>
        <Footer/>
    </div>
  );
}