import { useState, useEffect } from 'react';
import { roomsAPI } from '../api';
import { Room } from '../types';
import RoomCard from '../components/RoomCard';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import Footer from '../components/home/Footer';

const TYPES = ['all', 'single', 'double', 'suite', 'villa', 'penthouse'];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: 99999 },
  { label: 'Under $200', min: 0, max: 199 },
  { label: '$200 – $500', min: 200, max: 500 },
  { label: '$500 – $1000', min: 500, max: 1000 },
  { label: 'Over $1000', min: 1001, max: 99999 },
];

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filtered, setFiltered] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [priceRange, setPriceRange] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    roomsAPI.list()
      .then(res => {
        setRooms(res.data);
        setFiltered(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...rooms];
    if (search) {
      result = result.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (type !== 'all') {
      result = result.filter(r => r.type === type);
    }
    const range = PRICE_RANGES[priceRange];
    result = result.filter(r => r.price_per_night >= range.min && r.price_per_night <= range.max);
    if (capacity > 0) {
      result = result.filter(r => r.capacity >= capacity);
    }
    setFiltered(result);
  }, [rooms, search, type, priceRange, capacity]);

  const clearFilters = () => {
    setSearch('');
    setType('all');
    setPriceRange(0);
    setCapacity(0);
  };

  const hasFilters = search || type !== 'all' || priceRange !== 0 || capacity > 0;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-stone-950 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase mb-4">Our Collection</p>
          <h1 className="font-display text-5xl md:text-6xl text-white font-light mb-4">
            Rooms & Suites
          </h1>
          <p className="text-stone-400 max-w-xl mx-auto font-light">
            Discover your perfect sanctuary from our curated selection of luxury accommodations
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Search + Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-stone-300 bg-white focus:outline-none focus:border-gold-500 text-sm transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-3 border text-sm tracking-wide transition-colors ${
              showFilters || hasFilters
                ? 'border-gold-500 bg-gold-500 text-stone-900'
                : 'border-stone-300 text-stone-600 hover:border-stone-500'
            }`}
          >
            <SlidersHorizontal size={16} />
            Filters {hasFilters && '•'}
          </button>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-3 text-stone-500 hover:text-stone-900 text-sm transition-colors"
            >
              <X size={16} />
              Clear
            </button>
          )}
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="bg-white border border-stone-200 p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Room type */}
            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-stone-500 font-medium mb-3 block">
                Room Type
              </label>
              <div className="flex flex-wrap gap-2">
                {TYPES.map(t => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`px-3 py-1.5 text-xs tracking-wide uppercase transition-colors ${
                      type === t
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {t === 'all' ? 'All Types' : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-stone-500 font-medium mb-3 block">
                Price Range
              </label>
              <div className="flex flex-col gap-2">
                {PRICE_RANGES.map((range, i) => (
                  <button
                    key={i}
                    onClick={() => setPriceRange(i)}
                    className={`text-left text-sm py-1 transition-colors ${
                      priceRange === i ? 'text-gold-600 font-medium' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guests */}
            <div>
              <label className="text-xs tracking-[0.15em] uppercase text-stone-500 font-medium mb-3 block">
                Min. Guests
              </label>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setCapacity(n)}
                    className={`w-9 h-9 text-sm transition-colors ${
                      capacity === n
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {n === 0 ? 'Any' : n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-stone-500 text-sm">
            <span className="font-medium text-stone-900">{filtered.length}</span> rooms available
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-stone-100 animate-pulse h-96" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-stone-300 mb-4">No rooms found</p>
            <p className="text-stone-500 text-sm mb-6">Try adjusting your filters</p>
            <button onClick={clearFilters} className="btn-gold text-sm">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((room, i) => (
              <RoomCard key={room.id} room={room} index={i} />
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
    
  );
}
