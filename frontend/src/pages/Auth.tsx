import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function Auth() {
  const [params] = useSearchParams();
  const [mode, setMode] = useState<'login' | 'register'>(
    params.get('mode') === 'register' ? 'register' : 'login'
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        if (!name.trim()) throw new Error('Name is required');
        await register(name, email, password);
      }
      navigate('/');
    } catch (e: any) {
      setError(e.response?.data?.detail || e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Image */}
      <div className="hidden lg:flex flex-1 relative">
        <img
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/50" />
        <div className="absolute inset-0 flex flex-col justify-end p-16">
          <Link to="/" className="flex flex-col leading-none mb-auto mt-8">
            <span className="font-display text-3xl font-light tracking-[0.2em] text-white">EliteStay</span>
            <span className="text-gold-400 text-[10px] tracking-[0.35em] uppercase">LUXURY HOTEL</span>
          </Link>
          <blockquote>
            <p className="font-display text-3xl text-white font-light italic leading-relaxed mb-4">
              "Every stay should be<br />an unforgettable story"
            </p>
            <cite className="text-stone-300 text-sm not-italic">— EliteStay Hotel Promise</cite>
          </blockquote>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 lg:max-w-md flex flex-col justify-center px-8 md:px-16 py-20 bg-stone-50">
        <Link to="/" className="lg:hidden flex flex-col leading-none mb-12">
          <span className="font-display text-2xl font-light tracking-[0.2em] text-stone-900">EliteStay</span>
          <span className="text-gold-600 text-[10px] tracking-[0.35em] uppercase">LUXURY HOTEL</span>
        </Link>

        <div className="mb-10">
          <h1 className="font-display text-4xl text-stone-900 font-light mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-stone-500 text-sm">
            {mode === 'login'
              ? 'Sign in to manage your reservations'
              : 'Join us for exclusive benefits and easy booking'}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-white border border-stone-200 mb-8 p-1">
          {(['login', 'register'] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              className={`flex-1 py-2.5 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-200 ${
                mode === m
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <div>
              <label className="text-xs text-stone-500 tracking-[0.12em] uppercase block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Peter son"
                required
                className="w-full border border-stone-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-xs text-stone-500 tracking-[0.12em] uppercase block mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="peter@example.com"
              required
              className="w-full border border-stone-300 bg-white px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-stone-500 tracking-[0.12em] uppercase block mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-stone-300 bg-white px-4 py-3 pr-11 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 hover:bg-gold-500 disabled:bg-stone-300 text-white hover:text-stone-900 disabled:text-stone-400 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-200 mt-2"
          >
            {loading
              ? 'Please wait...'
              : mode === 'login' ? 'Sign In' : 'Create Account'
            }
          </button>
        </form>

        {mode === 'login' && (
          <div className="mt-6 p-4 bg-stone-100 border border-stone-200">
            <p className="text-xs text-stone-500 mb-2 font-medium uppercase tracking-wider">Demo Credentials</p>
            <p className="text-xs text-stone-600">Admin: admin@hotel.com / admin123</p>
          </div>
        )}

        <p className="text-center text-xs text-stone-400 mt-8">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            className="text-gold-600 hover:underline"
          >
            {mode === 'login' ? 'Register here' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
