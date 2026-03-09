import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BedDouble, CalendarCheck, Users, LogOut, Settings,
  ChevronRight, Hotel
} from 'lucide-react';
import { useAdminAuth } from '../context/AuthContext';

const NAV = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/rooms', icon: BedDouble, label: 'Rooms' },
  { to: '/bookings', icon: CalendarCheck, label: 'Bookings' },
  { to: '/users', icon: Users, label: 'Guests' },
];

export default function Sidebar() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-700/50 flex flex-col fixed top-0 left-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center">
            <Hotel size={18} className="text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm tracking-wide">AURUM</div>
            <div className="text-slate-400 text-[10px] tracking-widest">ADMIN PANEL</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-brand-600/20 text-brand-300 border border-brand-700/40'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={13} className="text-brand-500" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-slate-200 text-xs font-medium truncate">{user?.name}</div>
            <div className="text-slate-500 text-[10px] truncate">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-900/20 text-xs transition-colors"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
