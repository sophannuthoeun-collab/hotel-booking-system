import { Link } from 'react-router-dom';
import { Users, Star, ArrowRight } from 'lucide-react';
import { Room } from '../types';

interface Props {
  room: Room;
  index?: number;
}

const TYPE_LABELS: Record<string, string> = {
  single: 'Single Room',
  double: 'Double Room',
  suite: 'Suite',
  villa: 'Private Villa',
  penthouse: 'Penthouse',
};

export default function RoomCard({ room, index = 0 }: Props) {
  const delay = `${0.1 + index * 0.1}s`;
  const image = room.images?.[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800';

  return (
    <div
      className="group bg-white card-shadow animate-fade-up overflow-hidden"
      style={{ animationDelay: delay, opacity: 0 }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Type badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-stone-900/80 backdrop-blur-sm text-gold-400 text-[10px] tracking-[0.2em] uppercase font-medium px-3 py-1.5">
            {TYPE_LABELS[room.type] || room.type}
          </span>
        </div>

        {!room.is_available && (
          <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center">
            <span className="text-white text-sm tracking-[0.15em] uppercase font-medium border border-white/40 px-4 py-2">
              Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-serif text-xl text-stone-900 leading-tight">{room.name}</h3>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <Star size={13} className="text-gold-500 fill-gold-500" />
            <span className="text-xs text-stone-500">5.0</span>
          </div>
        </div>

        <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">{room.description}</p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {room.amenities.slice(0, 3).map((a) => (
            <span key={a} className="bg-stone-100 text-stone-600 text-[10px] tracking-wider uppercase px-2.5 py-1">
              {a}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="bg-stone-100 text-stone-400 text-[10px] tracking-wider uppercase px-2.5 py-1">
              +{room.amenities.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl text-stone-900">${room.price_per_night.toLocaleString()}</span>
              <span className="text-stone-400 text-xs">/night</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Users size={11} className="text-stone-400" />
              <span className="text-xs text-stone-400">Up to {room.capacity} guests</span>
            </div>
          </div>

          {room.is_available ? (
            <Link
              to={`/rooms/${room.id}`}
              className="flex items-center gap-2 bg-stone-900 hover:bg-gold-500 text-white hover:text-stone-900 px-4 py-2.5 text-xs tracking-[0.12em] uppercase font-medium transition-all duration-200 group/btn"
            >
              View Details
              <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          ) : (
            <span className="text-stone-400 text-xs tracking-[0.1em] uppercase">Not Available</span>
          )}
        </div>
      </div>
    </div>
  );
}
