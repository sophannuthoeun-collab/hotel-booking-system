import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
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

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} className="text-white/50" />
      </div>
    </section>
  );
}