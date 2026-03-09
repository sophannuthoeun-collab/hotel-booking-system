import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { roomsAPI, bookingsAPI } from '../api';
import { Room } from '../types';
import { useAuth } from '../context/AuthContext';
import { Users, Check, ArrowLeft, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function RoomDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgIdx, setImgIdx] = useState(0);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(1);
  const [specialReqs, setSpecialReqs] = useState('');
  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    roomsAPI.get(parseInt(id))
      .then(res => setRoom(res.data))
      .catch(() => navigate('/rooms'))
      .finally(() => setLoading(false));
  }, [id]);

  const nights = room
    ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 0;

  const totalPrice = room ? nights * room.price_per_night : 0;

  const handleBook = async () => {
    if (!user) return navigate('/auth');
    if (!room) return;
    if (nights <= 0) return setError('Check-out must be after check-in');
    if (guests > room.capacity) return setError(`Max ${room.capacity} guests for this room`);

    setBooking(true);
    setError('');
    try {
      await bookingsAPI.create({
        room_id: room.id,
        check_in: checkIn,
        check_out: checkOut,
        guests,
        special_requests: specialReqs,
      });
      setSuccess(true);
    } catch (e: any) {
      setError(e.response?.data?.detail || 'Booking failed. Please try again.');
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-stone-400 text-sm tracking-widest uppercase animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!room) return null;

  const images = room.images?.length ? room.images : ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'];

  return (
    <div className="min-h-screen pt-20">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <Link to="/rooms" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 text-sm transition-colors">
          <ArrowLeft size={16} />
          Back to Rooms
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Images + Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image gallery */}
            <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
              <img
                src={images[imgIdx]}
                alt={room.name}
                className="w-full h-full object-cover transition-opacity duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800';
                }}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx(p => (p - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setImgIdx(p => (p + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIdx ? 'bg-white' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
              {images.length > 1 && (
                <div className="flex gap-2 mt-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`w-20 h-14 overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        i === imgIdx ? 'border-gold-500' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-gold-600 text-[10px] tracking-[0.3em] uppercase font-medium">{room.type}</span>
                  <h1 className="font-serif text-4xl text-stone-900 mt-1">{room.name}</h1>
                </div>
                <div className="text-right">
                  <div className="font-display text-4xl text-stone-900">${room.price_per_night.toLocaleString()}</div>
                  <div className="text-stone-400 text-sm">per night</div>
                </div>
              </div>

              <div className="flex items-center gap-6 py-4 border-y border-stone-200 mb-6">
                <div className="flex items-center gap-2 text-stone-600 text-sm">
                  <Users size={15} className="text-gold-500" />
                  Up to {room.capacity} guests
                </div>
                <div className={`text-xs tracking-[0.1em] uppercase px-3 py-1 ${
                  room.is_available
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-600'
                }`}>
                  {room.is_available ? 'Available' : 'Unavailable'}
                </div>
              </div>

              <p className="text-stone-600 leading-relaxed mb-8">{room.description}</p>

              {/* Amenities */}
              <div>
                <h3 className="font-serif text-xl text-stone-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {room.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-100">
                      <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-gold-100">
                        <Check size={11} className="text-gold-600" />
                      </div>
                      <span className="text-stone-700 text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-stone-200 shadow-lg">
              {success ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-emerald-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-stone-900 mb-2">Booking Confirmed!</h3>
                  <p className="text-stone-500 text-sm mb-6">
                    Your reservation at {room.name} has been received and is pending confirmation.
                  </p>
                  <div className="bg-stone-50 p-4 mb-6 text-left">
                    <div className="text-xs text-stone-400 uppercase tracking-wider mb-3">Booking Summary</div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-stone-500">Check-in</span>
                      <span className="font-medium">{checkIn}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-stone-500">Check-out</span>
                      <span className="font-medium">{checkOut}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium border-t border-stone-200 pt-2 mt-2">
                      <span>Total</span>
                      <span className="text-gold-600">${totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link to="/bookings" className="block w-full text-center bg-stone-900 text-white py-3 text-sm tracking-widest uppercase">
                    View My Bookings
                  </Link>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-stone-100">
                    <Calendar size={16} className="text-gold-500" />
                    <h3 className="font-serif text-xl text-stone-900">Reserve This Room</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-stone-500 tracking-[0.1em] uppercase block mb-1.5">Check-in</label>
                        <input
                          type="date"
                          value={checkIn}
                          min={today}
                          onChange={e => setCheckIn(e.target.value)}
                          className="w-full border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-stone-500 tracking-[0.1em] uppercase block mb-1.5">Check-out</label>
                        <input
                          type="date"
                          value={checkOut}
                          min={checkIn}
                          onChange={e => setCheckOut(e.target.value)}
                          className="w-full border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-stone-500 tracking-[0.1em] uppercase block mb-1.5">
                        Guests (max {room.capacity})
                      </label>
                      <select
                        value={guests}
                        onChange={e => setGuests(parseInt(e.target.value))}
                        className="w-full border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:border-gold-500 transition-colors bg-white"
                      >
                        {Array.from({ length: room.capacity }, (_, i) => i + 1).map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-stone-500 tracking-[0.1em] uppercase block mb-1.5">
                        Special Requests
                      </label>
                      <textarea
                        value={specialReqs}
                        onChange={e => setSpecialReqs(e.target.value)}
                        rows={3}
                        placeholder="e.g. Late check-in, anniversary setup..."
                        className="w-full border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Price summary */}
                  {nights > 0 && (
                    <div className="mt-4 bg-stone-50 p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-500">${room.price_per_night.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''}</span>
                        <span>${(room.price_per_night * nights).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-stone-500">Taxes & fees</span>
                        <span>${Math.round(totalPrice * 0.12).toLocaleString()}</span>
                      </div>
                      <div className="border-t border-stone-200 pt-2 flex justify-between font-medium">
                        <span>Total</span>
                        <span className="text-gold-600">${Math.round(totalPrice * 1.12).toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="mt-3 bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleBook}
                    disabled={booking || !room.is_available || nights <= 0}
                    className="mt-4 w-full bg-stone-900 hover:bg-gold-500 disabled:bg-stone-300 text-white hover:text-stone-900 disabled:text-stone-400 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-200"
                  >
                    {booking ? 'Processing...' : user ? 'Reserve Now' : 'Sign In to Book'}
                  </button>

                  {!user && (
                    <p className="text-center text-xs text-stone-400 mt-3">
                      <Link to="/auth" className="text-gold-600 hover:underline">Sign in</Link> or{' '}
                      <Link to="/auth?mode=register" className="text-gold-600 hover:underline">create an account</Link> to book
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
