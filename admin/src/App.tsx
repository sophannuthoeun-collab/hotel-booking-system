import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import AdminBookings from './pages/Bookings';
import Users from './pages/Users';

function ProtectedLayout() {
  const { user, loading } = useAdminAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-500 text-sm animate-pulse">Loading...</div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/bookings" element={<AdminBookings />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginGuard />} />
          <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

function LoginGuard() {
  const { user, loading } = useAdminAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return <Login />;
}
