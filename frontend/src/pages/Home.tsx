import { useState, useEffect } from 'react';
import { roomsAPI } from '../api';
import { Room } from '../types';

import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import FeaturedRooms from '../components/home/FeaturedRooms';
import FeaturesGrid from '../components/home/FeaturesGrid';
import CtaBanner from '../components/home/CtaBanner';
import Footer from '../components/home/Footer';

export default function Home() {
  const [rooms, setRooms]     = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    roomsAPI.list()
      .then(res => setRooms(res.data.slice(0, 3)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsBar />
      <FeaturedRooms rooms={rooms} loading={loading} />
      <FeaturesGrid />
      <CtaBanner />
      <Footer />
    </div>
  );
}