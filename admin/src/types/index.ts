export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
}

export interface Room {
  id: number;
  name: string;
  description: string;
  type: string;
  price_per_night: number;
  capacity: number;
  amenities: string[];
  images: string[];
  is_available: boolean;
  created_at?: string;
}

export interface Booking {
  id: number;
  user_id: number;
  room_id: number;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  status: string;
  special_requests?: string;
  created_at: string;
  user_name?: string;
  user_email?: string;
  room_name?: string;
  room_type?: string;
}

export interface Stats {
  total_bookings: number;
  confirmed_bookings: number;
  pending_bookings: number;
  total_revenue: number;
  total_rooms: number;
  available_rooms: number;
  total_users: number;
}
