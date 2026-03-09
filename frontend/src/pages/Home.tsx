import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { roomsAPI } from '../api';
import { Room } from '../types';
import RoomCard from '../components/RoomCard';
import { ChevronDown, Star, Shield, Clock, Sparkles, Phone, MapPin, Mail } from 'lucide-react';

export default function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    roomsAPI.list()
      .then(res => setRooms(res.data.slice(0, 3)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[680px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=85"
            alt="Aurum Hotel"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase font-light mb-6 animate-fade-up">
              Welcome to Aurum Hotel
            </p>
            <h1 className="font-display text-6xl md:text-8xl text-white font-light leading-none mb-8 animate-fade-up stagger-1">
              Where Every<br />
              <em className="text-gold-300">Moment</em><br />
              Is Crafted
            </h1>
            <p className="text-stone-300 text-lg font-light leading-relaxed max-w-xl mb-10 animate-fade-up stagger-2">
              Immerse yourself in unparalleled luxury, where timeless elegance
              meets thoughtful modern comfort in every detail.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up stagger-3">
              <Link
                to="/rooms"
                className="bg-gold-500 hover:bg-gold-400 text-stone-900 px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-200"
              >
                Explore Rooms
              </Link>
              <a
                href="#features"
                className="border border-white/40 hover:border-white text-white px-8 py-4 text-sm tracking-[0.15em] uppercase font-light transition-colors duration-200"
              >
                Discover More
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown size={16} className="text-white/50" />
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────── */}
      <section className="bg-stone-950 py-8" id="features">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '25+', label: 'Years of Excellence' },
              { value: '120', label: 'Luxury Rooms' },
              { value: '4.9★', label: 'Guest Rating' },
              { value: '18', label: 'Awards Won' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-3xl text-gold-400 mb-1">{value}</div>
                <div className="text-stone-500 text-xs tracking-[0.15em] uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Rooms ───────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold-600 text-[11px] tracking-[0.4em] uppercase mb-4">Our Collection</p>
          <h2 className="font-display text-5xl text-stone-900 font-light mb-4">
            Exceptional Accommodations
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto leading-relaxed">
            Each room is a sanctuary of comfort, designed with meticulous attention
            to every detail for your ultimate stay.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-stone-100 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/rooms"
            className="inline-flex items-center gap-3 border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-200"
          >
            View All Rooms
          </Link>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section className="bg-stone-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Star, title: 'Five-Star Service', desc: 'Dedicated concierge available around the clock to fulfill every wish.' },
              { icon: Shield, title: 'Privacy & Security', desc: 'Your peace of mind is our priority with discreet, world-class security.' },
              { icon: Clock, title: '24/7 Availability', desc: 'Round-the-clock room service and support for all your needs.' },
              { icon: Sparkles, title: 'Bespoke Experiences', desc: 'Curated personal experiences tailored to your unique preferences.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="group p-8 bg-white card-shadow hover:shadow-xl transition-shadow duration-300 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 flex items-center justify-center mb-6 border border-gold-400 group-hover:bg-gold-500 transition-colors duration-300">
                  <Icon size={20} className="text-gold-500 group-hover:text-stone-900 transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-lg text-stone-900 mb-3">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/70" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase mb-4">Special Offer</p>
          <h2 className="font-display text-5xl md:text-6xl text-white font-light mb-6">
            Begin Your Story<br />at Aurum
          </h2>
          <p className="text-stone-300 text-lg font-light mb-10 leading-relaxed">
            Book directly with us for exclusive rates and complimentary upgrades.
          </p>
          <Link
            to="/rooms"
            className="inline-block bg-gold-500 hover:bg-gold-400 text-stone-900 px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-colors duration-200"
          >
            Reserve Your Room
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="bg-stone-950 text-stone-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="font-display text-3xl text-white font-light tracking-[0.2em] mb-1">AURUM</div>
              <div className="text-gold-500 text-[10px] tracking-[0.35em] uppercase mb-6">LUXURY HOTEL</div>
              <p className="text-sm leading-relaxed max-w-xs">
                A sanctuary of refined luxury nestled in the heart of the city,
                where impeccable service meets timeless elegance.
              </p>
            </div>
            <div>
              <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Quick Links</h4>
              <div className="flex flex-col gap-3">
                {['Rooms & Suites', 'Dining', 'Spa & Wellness', 'Events', 'Gallery'].map(l => (
                  <a key={l} href="#" className="text-sm hover:text-gold-400 transition-colors">{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Contact</h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={14} className="text-gold-500 flex-shrink-0" />
                  123 Luxury Avenue, Grand City
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={14} className="text-gold-500 flex-shrink-0" />
                  +1 (800) AURUM-01
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={14} className="text-gold-500 flex-shrink-0" />
                  hello@aurum-hotel.com
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs tracking-wide">© 2025 Aurum Hotel. All rights reserved.</p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <a key={l} href="#" className="text-xs hover:text-gold-400 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
