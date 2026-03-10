import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar     from './components/Navbar';
import Home       from './pages/Home';
import Rooms      from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Bookings   from './pages/Bookings';
import Auth       from './pages/Auth';
import About      from './pages/About';
import Contact    from './pages/Contact';
import Dining     from './pages/Dining';
import Spa        from './pages/Spa';
import Events     from './pages/Events';
import Gallery    from './pages/Gallery';
import Privacy    from './pages/Privacy';
import Terms      from './pages/Terms';
import Cookies    from './pages/Cookies';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/"          element={<Home />} />
                <Route path="/rooms"     element={<Rooms />} />
                <Route path="/rooms/:id" element={<RoomDetail />} />
                <Route path="/bookings"  element={<Bookings />} />
                <Route path="/about"     element={<About />} />
                <Route path="/contact"   element={<Contact />} />
                <Route path="/dining"    element={<Dining />} />
                <Route path="/spa"       element={<Spa />} />
                <Route path="/events"    element={<Events />} />
                <Route path="/gallery"   element={<Gallery />} />
                <Route path="/privacy"   element={<Privacy />} />
                <Route path="/terms"     element={<Terms />} />
                <Route path="/cookies"   element={<Cookies />} />
              </Routes>
            </>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}