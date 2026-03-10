import { Link } from 'react-router-dom';
import { Clock, Star, ChevronRight } from 'lucide-react';
import Footer from '../components/home/Footer';

const RESTAURANTS = [
  {
    name: 'EliteStay Restaurant',
    tag: 'Fine Dining',
    desc: 'Our flagship restaurant redefines modern cuisine with a seasonally driven menu curated by our Michelin-trained chef. Each dish is a composition of local ingredients and global inspiration.',
    hours: 'Dinner: 6:00 PM – 11:00 PM',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
    dress: 'Smart Elegant',
  },
  {
    name: 'The Gilded Lounge',
    tag: 'Cocktail Bar & Light Bites',
    desc: 'An intimate setting for handcrafted cocktails, rare whiskeys, and an expertly curated selection of small plates. The perfect prelude to an evening at EliteStay.',
    hours: 'Daily: 4:00 PM – 1:00 AM',
    img: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=900&q=80',
    dress: 'Smart Casual',
  },
  {
    name: 'Soleil Terrace',
    tag: 'Alfresco Breakfast & Brunch',
    desc: 'Begin your morning with panoramic city views, freshly baked pastries, and artisan coffee crafted from single-origin beans. A sensory awakening before your day begins.',
    hours: 'Daily: 7:00 AM – 2:00 PM',
    img: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=900&q=80',
    dress: 'Casual',
  },
];

const HIGHLIGHTS = [
  { value: '3', label: 'Dining Venues' },
  { value: '1★', label: 'Michelin Star' },
  { value: '400+', label: 'Wine Labels' },
  { value: 'Daily', label: 'Fresh Market Sourcing' },
];

export default function Dining() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[440px] flex items-end pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&q=85"
            alt="EliteStay Dining"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase font-light mb-3">Culinary Arts</p>
          <h1 className="font-display text-5xl md:text-7xl text-white font-light leading-none">
            A Journey of<br /><em className="text-gold-300">Taste & Pleasure</em>
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-stone-950 py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {HIGHLIGHTS.map(({ value, label }) => (
              <div key={label}>
                <div className="font-display text-3xl text-gold-400 mb-1">{value}</div>
                <div className="text-stone-500 text-xs tracking-[0.15em] uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 max-w-3xl mx-auto px-6 text-center">
        <p className="text-gold-600 text-[11px] tracking-[0.4em] uppercase mb-4">Our Philosophy</p>
        <h2 className="font-display text-4xl text-stone-900 font-light mb-6">Where Every Meal Becomes a Memory</h2>
        <p className="text-stone-500 leading-relaxed">
          At EliteStay, dining is not merely sustenance — it is ceremony. Our culinary team sources the finest seasonal
          ingredients, partnering with local farmers and artisans to craft menus that celebrate provenance, technique,
          and beauty in equal measure.
        </p>
      </section>

      {/* Restaurants */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20">
          {RESTAURANTS.map(({ name, tag, desc, hours, img, dress }, i) => (
            <div
              key={name}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
            >
              <div className={`relative overflow-hidden ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <img src={img} alt={name} className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-sm px-3 py-1.5">
                  <span className="text-gold-400 text-[10px] tracking-[0.25em] uppercase">{tag}</span>
                </div>
              </div>
              <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <h3 className="font-display text-4xl text-stone-900 font-light mb-4">{name}</h3>
                <p className="text-stone-500 leading-relaxed mb-6">{desc}</p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-stone-600">
                    <Clock size={14} className="text-gold-500" />
                    {hours}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-stone-600">
                    <Star size={14} className="text-gold-500" />
                    Dress code: {dress}
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white px-6 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-200"
                >
                  Reserve a Table <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wine */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&q=80"
          alt="Wine cellar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/75" />
        <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase mb-4">The Cellar</p>
          <h2 className="font-display text-5xl text-white font-light mb-6">A World-Class Wine Program</h2>
          <p className="text-stone-300 leading-relaxed mb-10">
            Our sommelier team has curated over 400 labels spanning six continents. From celebrated Burgundies
            to rare natural wines, each pairing is selected to elevate your dining experience.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gold-500 hover:bg-gold-400 text-stone-900 px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-200"
          >
            Enquire About Private Dining
          </Link>
        </div>
      </section>
        <Footer/>
    </div>
  );
}