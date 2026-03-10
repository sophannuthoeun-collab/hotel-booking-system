const STATS = [
  { value: '25+', label: 'Years of Excellence' },
  { value: '120', label: 'Luxury Rooms' },
  { value: '4.9★', label: 'Guest Rating' },
  { value: '18', label: 'Awards Won' },
];

export default function StatsBar() {
  return (
    <section className="bg-stone-950 py-8" id="features">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-3xl text-gold-400 mb-1">{value}</div>
              <div className="text-stone-500 text-xs tracking-[0.15em] uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}