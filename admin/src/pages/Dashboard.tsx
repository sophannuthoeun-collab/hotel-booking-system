import { useState, useEffect } from 'react';
import { adminAPI } from '../api';
import { Stats, Booking } from '../types';
import {
  TrendingUp, BedDouble, CalendarCheck, Users, DollarSign,
  Clock, CheckCircle, XCircle, ArrowUpRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([adminAPI.stats(), adminAPI.bookings()])
      .then(([sRes, bRes]) => {
        setStats(sRes.data);
        setBookings(bRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Build revenue chart data (last 7 days)
  const revenueData = (() => {
    const days: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days[d.toLocaleDateString('en', { weekday: 'short' })] = 0;
    }
    bookings.filter(b => b.status !== 'cancelled').forEach(b => {
      const date = new Date(b.created_at);
      const label = date.toLocaleDateString('en', { weekday: 'short' });
      if (label in days) days[label] += b.total_price;
    });
    return Object.entries(days).map(([day, revenue]) => ({ day, revenue: Math.round(revenue) }));
  })();

  // Booking status breakdown
  const statusData = stats ? [
    { name: 'Confirmed', value: stats.confirmed_bookings },
    { name: 'Pending', value: stats.pending_bookings },
    { name: 'Other', value: Math.max(0, stats.total_bookings - stats.confirmed_bookings - stats.pending_bookings) },
  ].filter(d => d.value > 0) : [];

  const recentBookings = bookings.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500 text-sm animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Welcome back — here's your hotel overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Revenue',
            value: `$${(stats?.total_revenue || 0).toLocaleString()}`,
            icon: DollarSign,
            color: 'text-emerald-400',
            bg: 'bg-emerald-900/30',
            sub: 'All time',
          },
          {
            label: 'Total Bookings',
            value: stats?.total_bookings || 0,
            icon: CalendarCheck,
            color: 'text-brand-400',
            bg: 'bg-brand-900/30',
            sub: `${stats?.pending_bookings} pending`,
          },
          {
            label: 'Total Rooms',
            value: stats?.total_rooms || 0,
            icon: BedDouble,
            color: 'text-amber-400',
            bg: 'bg-amber-900/30',
            sub: `${stats?.available_rooms} available`,
          },
          {
            label: 'Total Guests',
            value: stats?.total_users || 0,
            icon: Users,
            color: 'text-purple-400',
            bg: 'bg-purple-900/30',
            sub: 'Registered users',
          },
        ].map(({ label, value, icon: Icon, color, bg, sub }) => (
          <div key={label} className="stat-card">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon size={18} className={color} />
              </div>
              <ArrowUpRight size={14} className="text-slate-600" />
            </div>
            <div className="text-2xl font-bold text-slate-100 mb-1">{value}</div>
            <div className="text-xs text-slate-400 font-medium">{label}</div>
            <div className="text-[11px] text-slate-500 mt-1">{sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue area chart */}
        <div className="lg:col-span-2 stat-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-slate-200 font-medium text-sm">Revenue (Last 7 Days)</h3>
              <p className="text-slate-500 text-xs mt-0.5">Daily booking revenue</p>
            </div>
            <TrendingUp size={16} className="text-brand-400" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                labelStyle={{ color: '#94a3b8' }}
                itemStyle={{ color: '#818cf8' }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Booking status pie */}
        <div className="stat-card">
          <div className="mb-6">
            <h3 className="text-slate-200 font-medium text-sm">Booking Status</h3>
            <p className="text-slate-500 text-xs mt-0.5">Distribution overview</p>
          </div>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="45%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Legend
                  formatter={(value) => <span style={{ color: '#94a3b8', fontSize: '11px' }}>{value}</span>}
                />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#94a3b8' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48 text-slate-600 text-sm">No bookings yet</div>
          )}
        </div>
      </div>

      {/* Recent bookings */}
      <div className="stat-card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-slate-200 font-medium text-sm">Recent Bookings</h3>
          <a href="/bookings" className="text-brand-400 hover:text-brand-300 text-xs transition-colors">View all →</a>
        </div>

        {recentBookings.length === 0 ? (
          <div className="text-center py-10 text-slate-600 text-sm">No bookings yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => (
                  <tr key={b.id}>
                    <td>
                      <div className="font-medium text-slate-200">{b.user_name}</div>
                      <div className="text-xs text-slate-500">{b.user_email}</div>
                    </td>
                    <td>
                      <div>{b.room_name}</div>
                      <div className="text-xs text-slate-500 capitalize">{b.room_type}</div>
                    </td>
                    <td>{b.check_in}</td>
                    <td>{b.check_out}</td>
                    <td className="font-medium text-emerald-400">${b.total_price.toLocaleString()}</td>
                    <td>
                      <span className={`badge-${b.status}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
