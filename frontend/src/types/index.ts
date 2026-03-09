export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  created_at?: string;
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
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  special_requests?: string;
  created_at: string;
  room_name?: string;
  room_type?: string;
  room_images?: string[];
  price_per_night?: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}
