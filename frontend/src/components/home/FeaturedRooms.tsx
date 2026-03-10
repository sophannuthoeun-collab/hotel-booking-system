import { Link } from 'react-router-dom';
import { Room } from '../../types';
import RoomCard from '../RoomCard';

interface Props {
  rooms: Room[];
  loading: boolean;
}

export default function FeaturedRooms({ rooms, loading }: Props) {
  return (
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
  );
}