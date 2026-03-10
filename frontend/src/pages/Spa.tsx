import { Link } from 'react-router-dom';
import { Clock, Droplets, Leaf, Sun, ChevronRight } from 'lucide-react';
import Footer from '../components/home/Footer';

const TREATMENTS = [
  {
    category: 'Signature Massages',
    items: [
      { name: 'EliteStay Gold Ritual', duration: '90 min', desc: 'A full-body massage using warm gold-infused oils to deeply relax muscles and restore radiance.' },
      { name: 'Hot Stone Fusion', duration: '75 min', desc: 'Volcanic basalt stones combined with aromatherapy oils melt tension and improve circulation.' },
      { name: 'Couples Harmony', duration: '90 min', desc: 'A shared experience designed for two, featuring synchronised massage and private relaxation.' },
    ],
  },
  {
    category: 'Facial Treatments',
    items: [
      { name: 'Lumière Glow Facial', duration: '60 min', desc: 'Advanced brightening treatment using vitamin C serums and LED therapy for luminous skin.' },
      { name: 'Caviar Rejuvenation', duration: '75 min', desc: 'Ultra-luxurious anti-ageing facial with caviar extract and 24k gold leaf application.' },
      { name: 'Deep Cleanse Ritual', duration: '45 min', desc: 'A thorough purifying treatment to decongest and rebalance all skin types.' },
    ],
  },
  {
    category: 'Body Rituals',
    items: [
      { name: 'Hammam Ceremony', duration: '60 min', desc: 'Traditional Turkish steam ritual with black soap, kessa exfoliation, and rhassoul clay mask.' },
      { name: 'Salt & Honey Scrub', duration: '45 min', desc: 'Nourishing full-body exfoliation blending Dead Sea salt with raw organic honey.' },
      { name: 'Serenity Wrap', duration: '60 min', desc: 'Detoxifying body wrap using marine algae and essential oils, finished with hydrating lotion.' },
    ],
  },
];

const FACILITIES = [
  { icon: Droplets, title: 'Thermal Pool', desc: 'A 20-metre heated pool with hydrotherapy jets set to a constant 34°C.' },
  { icon: Leaf, title: 'Relaxation Garden', desc: 'An indoor botanical sanctuary for quiet reflection before or after treatments.' },
  { icon: Sun, title: 'Infrared Sauna', desc: 'Private infrared cabins that promote deep detox and muscle recovery.' },
  { icon: Clock, title: 'Meditation Studio', desc: 'Daily guided meditation and breathwork sessions led by resident experts.' },
];

export default function Spa() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[440px] flex items-end pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=85"
            alt="EliteStay Spa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase font-light mb-3">Spa & Wellness</p>
          <h1 className="font-display text-5xl md:text-7xl text-white font-light leading-none">
            Restore.<br /><em className="text-gold-300">Renew. Rejoice.</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 max-w-3xl mx-auto px-6 text-center">
        <p className="text-gold-600 text-[11px] tracking-[0.4em] uppercase mb-4">The EliteStay Spa</p>
        <h2 className="font-display text-4xl text-stone-900 font-light mb-6">A Sanctuary for the Senses</h2>
        <p className="text-stone-500 leading-relaxed">
          Spread across 2,000 square metres, the EliteStay Spa is a world unto itself. Drawing on ancient wellness
          traditions from across the globe and the latest in aesthetic science, our therapists craft each treatment
          to your unique needs — leaving you profoundly restored.
        </p>
      </section>

      {/* Facilities */}
      <section className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-600 text-[11px] tracking-[0.4em] uppercase mb-4">Included With Every Visit</p>
            <h2 className="font-display text-4xl text-stone-900 font-light">Thermal Facilities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FACILITIES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-8 bg-white hover:shadow-xl transition-shadow duration-300">
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

      {/* Treatments */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-600 text-[11px] tracking-[0.4em] uppercase mb-4">Our Menu</p>
            <h2 className="font-display text-4xl text-stone-900 font-light">Signature Treatments</h2>
          </div>
          <div className="space-y-16">
            {TREATMENTS.map(({ category, items }) => (
              <div key={category}>
                <h3 className="font-display text-2xl text-stone-800 font-light mb-8 pb-4 border-b border-stone-100">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {items.map(({ name, duration, desc }) => (
                    <div key={name} className="group p-6 border border-stone-100 hover:border-gold-300 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-serif text-stone-900 text-lg">{name}</h4>
                        <span className="text-gold-500 text-xs tracking-[0.1em] ml-4 flex-shrink-0">{duration}</span>
                      </div>
                      <p className="text-stone-500 text-sm leading-relaxed mb-5">{desc}</p>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1 text-xs tracking-[0.1em] uppercase text-stone-400 hover:text-gold-500 transition-colors"
                      >
                        Book Treatment <ChevronRight size={12} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/70" />
        <div className="relative z-10 text-center px-6">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase mb-4">Ready to Unwind?</p>
          <h2 className="font-display text-5xl text-white font-light mb-6">Begin Your Wellness Journey</h2>
          <p className="text-stone-300 mb-10 max-w-xl mx-auto">
            Our spa concierge will help you design the perfect programme — from a single treatment to a full day of restoration.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gold-500 hover:bg-gold-400 text-stone-900 px-10 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-200"
          >
            Reserve Your Experience
          </Link>
        </div>
      </section>
        <Footer/>
    </div>
  );
}