import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
};

export const roomsAPI = {
  list: (params?: Record<string, string | number>) => api.get('/rooms', { params }),
  get: (id: number) => api.get(`/rooms/${id}`),
};

export const bookingsAPI = {
  list: () => api.get('/bookings'),
  create: (data: {
    room_id: number;
    check_in: string;
    check_out: string;
    guests: number;
    special_requests?: string;
  }) => api.post('/bookings', data),
  cancel: (id: number) => api.delete(`/bookings/${id}`),
};

export default api;
