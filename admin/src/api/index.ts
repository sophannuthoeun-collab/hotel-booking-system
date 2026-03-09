import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
};

export const roomsAPI = {
  list: () => api.get('/rooms'),
  create: (data: any) => api.post('/rooms', data),
  update: (id: number, data: any) => api.put(`/rooms/${id}`, data),
  delete: (id: number) => api.delete(`/rooms/${id}`),
};

export const adminAPI = {
  stats: () => api.get('/admin/stats'),
  bookings: () => api.get('/admin/bookings'),
  updateBooking: (id: number, status: string) => api.put(`/admin/bookings/${id}`, { status }),
  deleteBooking: (id: number) => api.delete(`/admin/bookings/${id}`),
  users: () => api.get('/admin/users'),
};

export default api;
