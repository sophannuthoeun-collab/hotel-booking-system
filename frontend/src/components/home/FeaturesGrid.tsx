import { Star, Shield, Clock, Sparkles } from 'lucide-react';

const FEATURES = [
  { icon: Star,     title: 'Five-Star Service',    desc: 'Dedicated concierge available around the clock to fulfill every wish.' },
  { icon: Shield,   title: 'Privacy & Security',   desc: 'Your peace of mind is our priority with discreet, world-class security.' },
  { icon: Clock,    title: '24/7 Availability',    desc: 'Round-the-clock room service and support for all your needs.' },
  { icon: Sparkles, title: 'Bespoke Experiences',  desc: 'Curated personal experiences tailored to your unique preferences.' },
];

export default function FeaturesGrid() {
  return (
    <section className="bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="group p-8 bg-white card-shadow hover:shadow-xl transition-shadow duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
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
  );
}