import { useState, useEffect } from 'react';
import { adminAPI } from '../api';
import { Booking } from '../types';
import { Search, ChevronDown, Trash2, RefreshCw } from 'lucide-react';

const STATUS_OPTIONS = ['all', 'pending', 'confirmed', 'cancelled', 'completed'];

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    setLoading(true);
    adminAPI.bookings()
      .then(res => setBookings(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleStatusChange = async (id: number, status: string) => {
    setUpdating(id);
    try {
      await adminAPI.updateBooking(id, status);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    } catch {
      alert('Failed to update booking');
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this booking permanently?')) return;
    try {
      await adminAPI.deleteBooking(id);
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch {
      alert('Failed to delete booking');
    }
  };

  const filtered = bookings.filter(b => {
    const matchSearch = !search ||
      b.user_name?.toLowerCase().includes(search.toLowerCase()) ||
      b.user_email?.toLowerCase().includes(search.toLowerCase()) ||
      b.room_name?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const nights = (b: Booking) =>
    Math.ceil((new Date(b.check_out).getTime() - new Date(b.check_in).getTime()) / 86400000);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Bookings</h1>
          <p className="text-slate-400 text-sm mt-1">{bookings.length} total reservations</p>
        </div>
        <button onClick={loadBookings} className="flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm transition-colors">
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by guest, room..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-dark w-full pl-9"
          />
        </div>
        <div className="flex gap-2">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                statusFilter === s
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="stat-card overflow-hidden">
        {loading ? (
          <div className="h-48 flex items-center justify-center text-slate-500 text-sm animate-pulse">
            Loading bookings...
          </div>
        ) : filtered.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-slate-600 text-sm">
            No bookings found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Dates</th>
                  <th>Guests</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id}>
                    <td>
                      <span className="font-mono text-xs text-slate-500">#{b.id}</span>
                    </td>
                    <td>
                      <div className="font-medium text-slate-200 text-sm">{b.user_name}</div>
                      <div className="text-xs text-slate-500">{b.user_email}</div>
                    </td>
                    <td>
                      <div className="text-sm">{b.room_name}</div>
                      <div className="text-xs text-slate-500 capitalize">{b.room_type}</div>
                    </td>
                    <td>
                      <div className="text-sm text-slate-300">{b.check_in}</div>
                      <div className="text-xs text-slate-500">{b.check_out} · {nights(b)}n</div>
                    </td>
                    <td>{b.guests}</td>
                    <td>
                      <span className="font-medium text-emerald-400">${b.total_price.toLocaleString()}</span>
                    </td>
                    <td>
                      <div className="relative">
                        <select
                          value={b.status}
                          onChange={e => handleStatusChange(b.id, e.target.value)}
                          disabled={updating === b.id}
                          className="appearance-none bg-slate-700/50 border border-slate-600/50 text-slate-300 text-xs px-2 py-1.5 pr-6 rounded focus:outline-none focus:border-brand-500 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {['pending', 'confirmed', 'cancelled', 'completed'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="text-slate-500 hover:text-red-400 transition-colors p-1.5 rounded hover:bg-red-900/20"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATUS_OPTIONS.filter(s => s !== 'all').map(s => {
            const count = bookings.filter(b => b.status === s).length;
            return (
              <div key={s} className="bg-slate-800/40 border border-slate-700/30 rounded-lg p-4">
                <div className="text-xl font-bold text-slate-100">{count}</div>
                <div className="text-xs text-slate-500 capitalize mt-0.5">{s}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
