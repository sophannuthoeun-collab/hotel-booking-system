import { Shield, Star, Users, Award, Heart, Globe } from 'lucide-react';
import Footer from '../components/home/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end pb-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=85"
            alt="Aurum Hotel Lobby"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase font-light mb-3">
            Our Story
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-white font-light leading-none">
            A Legacy of<br />
            <em className="text-gold-300">Exceptional</em> Hospitality
          </h1>
        </div>
      </section>

      {/* ── Story ──────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold-600 text-[11px] tracking-[0.4em] uppercase mb-4">Est. 1999</p>
              <h2 className="font-display text-4xl text-stone-900 font-light mb-6 leading-snug">
                Where Timeless Elegance Meets Modern Luxury
              </h2>
              <p className="text-stone-500 leading-relaxed mb-5">
                Founded over two decades ago, Aurum Hotel was born from a singular vision — to create
                a sanctuary where every guest feels genuinely celebrated. From the moment you arrive,
                our team is devoted to crafting a stay that exceeds every expectation.
              </p>
              <p className="text-stone-500 leading-relaxed mb-5">
                Our name, derived from the Latin word for gold, reflects our unwavering commitment
                to the highest standard in everything we do — from the thread count of our linens to
                the provenance of ingredients in our kitchen.
              </p>
              <p className="text-stone-500 leading-relaxed">
                Today, Aurum stands as one of the city's most celebrated addresses, having welcomed
                heads of state, celebrated artists, and discerning travellers who return year after year.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
                alt="Aurum Hotel suite"
                className="w-full h-[500px] object-cover shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-stone-950 p-6 shadow-xl">
                <div className="font-display text-4xl text-gold-400">25+</div>
                <div className="text-stone-400 text-xs tracking-[0.2em] uppercase mt-1">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────── */}
      <section className="bg-stone-950 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '120', label: 'Luxury Rooms & Suites' },
              { value: '18', label: 'International Awards' },
              { value: '4.9★', label: 'Average Guest Rating' },
              { value: '50k+', label: 'Happy Guests Hosted' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-display text-4xl text-gold-400 mb-2">{value}</div>
                <div className="text-stone-500 text-xs tracking-[0.15em] uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-600 text-[11px] tracking-[0.4em] uppercase mb-4">What Drives Us</p>
            <h2 className="font-display text-4xl text-stone-900 font-light">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: 'Genuine Warmth', desc: 'Every interaction is guided by sincere care for our guests\' well-being and happiness.' },
              { icon: Star, title: 'Uncompromising Quality', desc: 'We set and exceed the highest standards in every detail, from service to amenities.' },
              { icon: Shield, title: 'Absolute Discretion', desc: 'Your privacy and comfort are paramount. We safeguard both with the utmost professionalism.' },
              { icon: Globe, title: 'Global Perspective', desc: 'Our team brings diverse cultural insight to create truly personalized experiences.' },
              { icon: Users, title: 'Community & Culture', desc: 'We invest in our people and the communities around us, because hospitality begins at home.' },
              { icon: Award, title: 'Legacy of Excellence', desc: 'Over 25 years of awards and recognition reflect our enduring commitment to the craft.' },
            ].map(({ icon: Icon, title, desc }) => (
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

      {/* ── Team ───────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-600 text-[11px] tracking-[0.4em] uppercase mb-4">The People Behind the Magic</p>
            <h2 className="font-display text-4xl text-stone-900 font-light">Meet Our Leadership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: 'Peter Pan',
                role: 'General Manager',
                img: 'https://www.talent-developer.com/wp-content/uploads/2020/11/talent-developer-directeur-d-hotel.jpg',
                bio: 'With 20 years in luxury hospitality across Paris, Dubai, and New York, Peter leads EliteStay with grace and precision.',
              },
              {
                name: 'Marcus Chen',
                role: 'Head of Culinary Arts',
                img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80',
                bio: 'A Michelin-trained chef, Marcus curates dining experiences that transform every meal into a cherished memory.',
              },
              {
                name: 'Sofia Reyes',
                role: 'Director of Guest Experience',
                img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
                bio: 'Sofia\'s warmth and intuition have redefined what personalised hospitality means at EliteStay.',
              },
            ].map(({ name, role, img, bio }) => (
              <div key={name} className="text-center group">
                <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors duration-300" />
                </div>
                <div className="text-gold-500 text-[10px] tracking-[0.3em] uppercase mb-1">{role}</div>
                <h3 className="font-display text-xl text-stone-900 font-light mb-3">{name}</h3>
                <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
        <Footer/>
    </div>
  );
}