import { Link } from 'react-router-dom';

export default function CtaBanner() {
  return (
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
  );
}