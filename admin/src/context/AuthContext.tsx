import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../api';
import { User } from '../types';

interface AdminAuthCtx {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const Ctx = createContext<AdminAuthCtx | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      authAPI.me()
        .then(res => {
          if (res.data.is_admin) setUser(res.data);
          else {
            localStorage.removeItem('admin_token');
          }
        })
        .catch(() => localStorage.removeItem('admin_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authAPI.login(email, password);
    const { token, user: u } = res.data;
    if (!u.is_admin) throw new Error('Admin access required');
    localStorage.setItem('admin_token', token);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  return <Ctx.Provider value={{ user, login, logout, loading }}>{children}</Ctx.Provider>;
}

export const useAdminAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
};
