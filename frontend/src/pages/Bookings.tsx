import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bookingsAPI } from '../api';
import { Booking } from '../types';
import { useAuth } from '../context/AuthContext';
import { Calendar, Users, X, ArrowRight, BedDouble } from 'lucide-react';

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  confirmed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  cancelled: 'bg-stone-100 text-stone-500 border border-stone-200',
  completed: 'bg-blue-50 text-blue-700 border border-blue-200',
};

export default function MyBookings() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<number | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading]);

  useEffect(() => {
    if (!user) return;
    bookingsAPI.list()
      .then(res => setBookings(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const handleCancel = async (id: number) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    setCancelling(id);
    try {
      await bookingsAPI.cancel(id);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b));
    } catch (e) {
      alert('Failed to cancel booking');
    } finally {
      setCancelling(null);
    }
  };

  const nights = (b: Booking) =>
    Math.ceil((new Date(b.check_out).getTime() - new Date(b.check_in).getTime()) / 86400000);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-stone-400 text-sm tracking-widest uppercase animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-stone-50">
      {/* Header */}
      <div className="bg-stone-950 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold-400 text-[11px] tracking-[0.4em] uppercase mb-3">Your Account</p>
          <h1 className="font-display text-4xl text-white font-light">My Reservations</h1>
          <p className="text-stone-400 mt-2">Welcome back, {user?.name}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {bookings.length === 0 ? (
          <div className="bg-white border border-stone-200 p-16 text-center">
            <BedDouble size={40} className="text-stone-300 mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-stone-700 mb-3">No Reservations Yet</h2>
            <p className="text-stone-500 text-sm mb-8">
              You haven't made any bookings yet. Explore our rooms and plan your perfect stay.
            </p>
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-gold-500 text-white hover:text-stone-900 px-8 py-3.5 text-sm tracking-[0.15em] uppercase transition-all duration-200"
            >
              Browse Rooms
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-stone-500 text-sm">
                <span className="font-medium text-stone-900">{bookings.length}</span> total reservations
              </p>
            </div>

            {bookings.map((b) => {
              const n = nights(b);
              const img = b.room_images?.[0];
              return (
                <div key={b.id} className="bg-white border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    {img && (
                      <div className="w-full md:w-48 h-40 md:h-auto flex-shrink-0 overflow-hidden">
                        <img
                          src={img}
                          alt={b.room_name}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-serif text-xl text-stone-900">{b.room_name}</h3>
                            <span className={`text-[10px] px-2 py-0.5 tracking-[0.1em] uppercase ${STATUS_STYLES[b.status] || STATUS_STYLES.pending}`}>
                              {b.status}
                            </span>
                          </div>
                          <p className="text-stone-400 text-xs uppercase tracking-wider mb-4">{b.room_type}</p>

                          <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2 text-sm text-stone-600">
                              <Calendar size={14} className="text-gold-500" />
                              <span>{b.check_in}</span>
                              <span className="text-stone-300">→</span>
                              <span>{b.check_out}</span>
                              <span className="text-stone-400">({n} night{n > 1 ? 's' : ''})</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-stone-600">
                              <Users size={14} className="text-gold-500" />
                              {b.guests} guest{b.guests > 1 ? 's' : ''}
                            </div>
                          </div>

                          {b.special_requests && (
                            <p className="mt-3 text-xs text-stone-400 italic">
                              "{b.special_requests}"
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-3 flex-shrink-0">
                          <div className="text-right">
                            <div className="font-display text-2xl text-stone-900">${b.total_price.toLocaleString()}</div>
                            <div className="text-xs text-stone-400">total</div>
                          </div>

                          {b.status === 'pending' && (
                            <button
                              onClick={() => handleCancel(b.id)}
                              disabled={cancelling === b.id}
                              className="flex items-center gap-1.5 text-red-500 hover:text-red-700 text-xs tracking-wide transition-colors disabled:opacity-50"
                            >
                              <X size={12} />
                              {cancelling === b.id ? 'Cancelling...' : 'Cancel Booking'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-6 text-center">
              <Link
                to="/rooms"
                className="inline-flex items-center gap-2 text-stone-500 hover:text-gold-600 text-sm transition-colors"
              >
                <ArrowRight size={14} />
                Book another stay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
