import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Bookings from './pages/Bookings';
import Auth from './pages/Auth';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/:id" element={<RoomDetail />} />
                <Route path="/bookings" element={<Bookings />} />
              </Routes>
            </>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
