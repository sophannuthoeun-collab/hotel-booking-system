# 🏨 Aurum Hotel Booking System

A full-stack hotel booking system with a luxury user frontend and a dark admin dashboard.

## Stack
- **Backend**: FastAPI + SQLite (Python)
- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Admin**: React 18 + TypeScript + Tailwind CSS + Recharts + Vite

---

## 🚀 Quick Start

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
# → API running at http://localhost:8000
# → Docs at http://localhost:8000/docs
```

The SQLite database (`hotel.db`) is auto-created on first run with 6 sample rooms and a default admin account.

**Default admin credentials:**
- Email: `admin@hotel.com`
- Password: `admin123`

---

### 2. Frontend (User App)

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

**Features:**
- Luxury hotel landing page with hero, room highlights, features
- Browse & filter rooms by type, price, capacity
- Room detail with image gallery + booking widget
- My Bookings — view and cancel reservations
- Auth: register, login, logout

---

### 3. Admin Dashboard

```bash
cd admin
npm install
npm run dev
# → http://localhost:5174
```

**Features:**
- Login with admin credentials (admin-only access enforced)
- Dashboard with stats cards + revenue area chart + booking status pie chart
- Rooms management: create, edit, delete rooms with images + amenities
- Bookings management: view all, change status, delete
- Guests/Users list

---

## 📁 Project Structure

```
hotel-booking-system/
├── backend/
│   ├── main.py          # FastAPI app + SQLite + all routes
│   └── requirements.txt
├── frontend/            # User-facing app (port 5173)
│   ├── src/
│   │   ├── pages/       # Home, Rooms, RoomDetail, Bookings, Auth
│   │   ├── components/  # Navbar, RoomCard
│   │   ├── context/     # AuthContext
│   │   ├── api/         # Axios client
│   │   └── types/       # TypeScript interfaces
│   └── ...
└── admin/               # Admin dashboard (port 5174)
    ├── src/
    │   ├── pages/       # Dashboard, Rooms, Bookings, Users, Login
    │   ├── components/  # Sidebar
    │   ├── context/     # AdminAuthContext
    │   ├── api/         # Admin API client
    │   └── types/       # TypeScript interfaces
    └── ...
```

---

## 🔑 API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | — | Register |
| POST | `/auth/login` | — | Login |
| GET | `/auth/me` | User | Current user |
| GET | `/rooms` | — | List rooms (filterable) |
| GET | `/rooms/:id` | — | Get room |
| POST | `/rooms` | Admin | Create room |
| PUT | `/rooms/:id` | Admin | Update room |
| DELETE | `/rooms/:id` | Admin | Delete room |
| GET | `/bookings` | User | My bookings |
| POST | `/bookings` | User | Create booking |
| DELETE | `/bookings/:id` | User | Cancel booking |
| GET | `/admin/bookings` | Admin | All bookings |
| PUT | `/admin/bookings/:id` | Admin | Update status |
| DELETE | `/admin/bookings/:id` | Admin | Delete booking |
| GET | `/admin/users` | Admin | All users |
| GET | `/admin/stats` | Admin | Dashboard stats |

---

## 🎨 Design

**Frontend**: Luxury hotel aesthetic — warm ivory/stone tones, gold accents, Cormorant Garamond + DM Sans typography, hero parallax, animated cards.

**Admin**: Dark slate theme — indigo brand color, Inter font, data tables, Recharts visualizations.
