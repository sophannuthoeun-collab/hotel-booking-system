import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AuthContext';
import { Shield, Eye, EyeOff, Hotel } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('admin@hotel.com');
  const [password, setPassword] = useState('admin123');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (e: any) {
      setError(e.response?.data?.detail || e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-900/50">
            <Hotel size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-100">Aurum Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Hotel Management System</p>
        </div>

        {/* Card */}
        <div className="bg-slate-800/80 backdrop-blur border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Shield size={15} className="text-brand-400" />
            <span className="text-slate-400 text-sm">Admin Access Only</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="input-dark w-full"
                placeholder="admin@hotel.com"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="input-dark w-full pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-800/50 text-red-400 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-600 hover:bg-brand-500 disabled:bg-slate-700 text-white py-3 rounded-lg text-sm font-medium transition-colors mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : null}
              {loading ? 'Signing in...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <p className="text-xs text-slate-500 text-center">
              Default: admin@hotel.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
