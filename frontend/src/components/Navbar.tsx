import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const navClass = isHome && !scrolled
    ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-300'
    : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-stone-950/95 backdrop-blur-md shadow-lg';

  const textClass = isHome && !scrolled ? 'text-white' : 'text-stone-100';

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className={`font-display text-2xl font-light tracking-[0.2em] ${textClass}`}>EliteStay</span>
            <span className={`text-[10px] tracking-[0.35em] font-sans font-light uppercase ${isHome && !scrolled ? 'text-gold-300' : 'text-gold-400'}`}>
              LUXURY HOTEL
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Rooms', to: '/rooms' },
              { label: 'About', to: '/about' },
              { label: 'Contact', to: '/contact' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm tracking-[0.12em] font-light uppercase transition-colors hover:text-gold-400 ${textClass}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center gap-2 text-sm tracking-wide transition-colors hover:text-gold-400 ${textClass}`}
                >
                  <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-stone-900 font-medium text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-light">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-stone-950 border border-stone-800 shadow-2xl py-2">
                    <Link
                      to="/bookings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-stone-300 hover:text-gold-400 hover:bg-stone-900 text-sm transition-colors"
                    >
                      <User size={15} />
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-stone-300 hover:text-gold-400 hover:bg-stone-900 w-full text-left text-sm transition-colors"
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/auth"
                  className={`text-sm tracking-[0.08em] font-light uppercase transition-colors hover:text-gold-400 ${textClass}`}
                >
                  Sign In
                </Link>
                <Link
                  to="/rooms"
                  className="bg-gold-500 hover:bg-gold-400 text-stone-900 px-5 py-2.5 text-sm tracking-[0.1em] font-medium uppercase transition-colors duration-200"
                >
                  Book Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden ${textClass}`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-stone-950 border-t border-stone-800">
          <div className="px-6 py-6 flex flex-col gap-5">
            {[
              { label: 'Rooms', to: '/rooms' },
              { label: 'About', to: '/about' },
              { label: 'Contact', to: '/contact' },
            ].map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="text-stone-300 text-sm tracking-[0.15em] uppercase font-light hover:text-gold-400 transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="border-t border-stone-800 pt-5">
              {user ? (
                <>
                  <Link
                    to="/bookings"
                    onClick={() => setMobileOpen(false)}
                    className="block text-stone-300 text-sm tracking-[0.15em] uppercase font-light hover:text-gold-400 mb-4 transition-colors"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-stone-400 text-sm tracking-[0.15em] uppercase font-light hover:text-gold-400 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-gold-500 text-stone-900 text-center py-3 text-sm tracking-[0.12em] uppercase font-medium"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
