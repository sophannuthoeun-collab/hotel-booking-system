import { Link } from 'react-router-dom';
import { Users, Star, Calendar, ChevronRight } from 'lucide-react';
import Footer from '../components/home/Footer';

const VENUES = [
  {
    name: 'The Grand Ballroom',
    capacity: 'Up to 350 guests',
    area: '850 m²',
    desc: 'Our crown jewel venue — a breathtaking space with 9-metre ceilings, crystal chandeliers, and floor-to-ceiling windows overlooking the city skyline. Perfect for galas, weddings, and landmark celebrations.',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&q=80',
    tags: ['Weddings', 'Galas', 'Award Ceremonies'],
  },
  {
    name: 'The EliteStay Suite',
    capacity: 'Up to 80 guests',
    area: '220 m²',
    desc: 'An intimate yet opulent space ideal for corporate dinners, private celebrations, and cocktail receptions. Fully equipped with AV technology and direct access to a private terrace.',
    img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&q=80',
    tags: ['Corporate Dinners', 'Private Parties', 'Cocktail Receptions'],
  },
  {
    name: 'Boardroom One & Two',
    capacity: 'Up to 24 guests each',
    area: '65 m² each',
    desc: 'Refined, distraction-free environments for executive meetings, strategy sessions, and intimate workshops — equipped with state-of-the-art conferencing technology.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    tags: ['Meetings', 'Workshops', 'Presentations'],
  },
];

const SERVICES = [
  { icon: Star, title: 'Bespoke Catering', desc: 'Our culinary team creates custom menus tailored to your theme, dietary requirements, and preferences.' },
  { icon: Calendar, title: 'Event Planning', desc: 'A dedicated event manager oversees every detail from initial concept through to flawless execution.' },
  { icon: Users, title: 'Guest Accommodation', desc: 'Preferential room rates for your guests, with dedicated check-in services and welcome amenities.' },
  { icon: ChevronRight, title: 'AV & Production', desc: 'Full in-house audio-visual production, lighting design, and live-streaming capabilities.' },
];

export default function Events() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[440px] flex items-end pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1478147427282-58a87a433049?w=1920&q=85"
            alt="EliteStay Events"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase font-light mb-3">Events & Celebrations</p>
          <h1 className="font-display text-5xl md:text-7xl text-white font-light leading-none">
            Unforgettable<br /><em className="text-gold-300">Occasions, Crafted</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 max-w-3xl mx-auto px-6 text-center">
        <p className="text-gold-600 text-[11px] tracking-[0.4em] uppercase mb-4">Why EliteStay</p>
        <h2 className="font-display text-4xl text-stone-900 font-light mb-6">Every Detail, Perfectly Considered</h2>
        <p className="text-stone-500 leading-relaxed">
          From intimate anniversaries to landmark corporate galas, EliteStay's event spaces and dedicated planning
          team transform your vision into an immaculate reality. We don't host events — we craft experiences
          that live in the memory of every guest.
        </p>
      </section>

      {/* Venues */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-600 text-[11px] tracking-[0.4em] uppercase mb-4">Our Spaces</p>
            <h2 className="font-display text-4xl text-stone-900 font-light">Venue Collection</h2>
          </div>
          <div className="space-y-20">
            {VENUES.map(({ name, capacity, area, desc, img, tags }, i) => (
              <div
                key={name}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                <div className={`relative overflow-hidden ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <img src={img} alt={name} className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <h3 className="font-display text-4xl text-stone-900 font-light mb-2">{name}</h3>
                  <div className="flex gap-6 mb-5">
                    <span className="text-xs tracking-[0.15em] uppercase text-gold-500">{capacity}</span>
                    <span className="text-xs tracking-[0.15em] uppercase text-stone-400">{area}</span>
                  </div>
                  <p className="text-stone-500 leading-relaxed mb-5">{desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map(t => (
                      <span key={t} className="border border-stone-200 text-stone-500 text-xs tracking-[0.1em] px-3 py-1">{t}</span>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white px-6 py-3 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-200"
                  >
                    Enquire About This Venue <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-stone-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-600 text-[11px] tracking-[0.4em] uppercase mb-4">Full Service</p>
            <h2 className="font-display text-4xl text-stone-900 font-light">Everything Taken Care Of</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map(({ icon: Icon, title, desc }) => (
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

      {/* CTA */}
      <section className="relative py-28">
        <img
          src="https://holidayinnsuva.com.fj/wp-content/uploads/2025/02/Meetigs-Incentive-Conferences-Events-022.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-stone-950/72" />
        <div className="relative z-10 text-center px-6">
          <p className="text-yellow-100 text-[11px] tracking-[0.4em] uppercase mb-4">Start Planning</p>
          <h2 className="font-display text-5xl text-white font-light mb-6">Let's Create Something Extraordinary</h2>
          <p className="text-stone-300 mb-10 max-w-lg mx-auto">
            Our events team is ready to bring your vision to life. Reach out for a personalised proposal.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gold-500 hover:bg-gold-400 text-stone-900 px-10 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-colors duration-200"
          >
            Contact Our Events Team
          </Link>
        </div>
      </section>
        <Footer/>
    </div>
  );
}