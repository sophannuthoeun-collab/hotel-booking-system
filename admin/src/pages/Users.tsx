import { useState, useEffect } from 'react';
import { adminAPI } from '../api';
import { User } from '../types';
import { Search, Shield, User as UserIcon } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    adminAPI.users()
      .then(res => setUsers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(u =>
    !search ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Guests</h1>
          <p className="text-slate-400 text-sm mt-1">{users.filter(u => !u.is_admin).length} registered guests</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search guests..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-dark w-full pl-9"
        />
      </div>

      <div className="stat-card overflow-hidden">
        {loading ? (
          <div className="h-48 flex items-center justify-center text-slate-500 text-sm animate-pulse">
            Loading users...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          u.is_admin
                            ? 'bg-brand-600/40 text-brand-300'
                            : 'bg-slate-700 text-slate-300'
                        }`}>
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-200 text-sm">{u.name}</span>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      {u.is_admin ? (
                        <span className="flex items-center gap-1.5 text-brand-400 text-xs">
                          <Shield size={12} />
                          Admin
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <UserIcon size={12} />
                          Guest
                        </span>
                      )}
                    </td>
                    <td className="text-slate-500 text-xs">
                      {new Date(u.created_at).toLocaleDateString('en', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
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
