from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import sqlite3
import hashlib
import hmac
import secrets
import json
import os

app = FastAPI(title="Hotel Booking API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = os.getenv("SECRET_KEY", "hotel-secret-key-change-in-production")
DB_PATH = "hotel.db"
security = HTTPBearer(auto_error=False)

# ─── Database ────────────────────────────────────────────────────────────────

def get_db():
    # FIXED: Added check_same_thread=False to prevent SQLite threading errors in FastAPI
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    c = conn.cursor()
    c.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            is_admin INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            type TEXT NOT NULL,
            price_per_night REAL NOT NULL,
            capacity INTEGER NOT NULL,
            amenities TEXT DEFAULT '[]',
            images TEXT DEFAULT '[]',
            is_available INTEGER DEFAULT 1,
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            room_id INTEGER NOT NULL,
            check_in TEXT NOT NULL,
            check_out TEXT NOT NULL,
            guests INTEGER NOT NULL,
            total_price REAL NOT NULL,
            status TEXT DEFAULT 'pending',
            special_requests TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (room_id) REFERENCES rooms(id)
        );
    """)
    conn.commit()

    # Seed admin user
    admin_hash = hash_password("admin123")
    c.execute("INSERT OR IGNORE INTO users (name, email, password_hash, is_admin) VALUES (?, ?, ?, 1)",
              ("Admin User", "admin@hotel.com", admin_hash))

    # FIXED: Check if rooms exist before seeding to avoid duplicates or errors
    c.execute("SELECT COUNT(*) FROM rooms")
    if c.fetchone()[0] == 0:
        rooms_data = [
            ("Deluxe Ocean Suite", "Breathtaking panoramic ocean views with a private balcony and luxury furnishings.", "suite",
             450.0, 2, '["King Bed","Ocean View","Private Balcony","Mini Bar","Jacuzzi","WiFi","Room Service"]',
             '["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800","https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"]', 1),
            ("Classic Double Room", "Elegant and comfortable room with modern amenities and city views.", "double",
             180.0, 2, '["Queen Bed","City View","WiFi","Air Conditioning","Flat Screen TV","Coffee Maker"]',
             '["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800","https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800"]', 1),
            ("Presidential Penthouse", "The ultimate luxury experience spanning the entire top floor with private pool.", "penthouse",
             1200.0, 4, '["2 King Beds","360° Views","Private Pool","Butler Service","Home Theater","Gourmet Kitchen","WiFi"]',
             '["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800","https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800"]', 1),
            ("Garden Villa", "Serene private villa surrounded by tropical gardens with personal plunge pool.", "villa",
             680.0, 3, '["King Bed","Garden View","Private Plunge Pool","Outdoor Shower","Kitchenette","WiFi","Bicycle"]',
             '["https://images.unsplash.com/photo-1540541338537-1220059bfcba?w=800","https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"]', 1),
            ("Standard Single Room", "Cozy and well-appointed room perfect for solo travelers.", "single",
             120.0, 1, '["Single Bed","WiFi","Air Conditioning","Private Bathroom","Work Desk"]',
             '["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800","https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"]', 1),
            ("Family Suite", "Spacious suite designed for families with connecting rooms and kid-friendly amenities.", "suite",
             520.0, 5, '["2 Queen Beds","Kids Play Area","Large Bathroom","Living Room","Kitchenette","WiFi","Room Service"]',
             '["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800","https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"]', 1),
        ]
        c.executemany(
            "INSERT OR IGNORE INTO rooms (name, description, type, price_per_night, capacity, amenities, images, is_available) VALUES (?,?,?,?,?,?,?,?)",
            rooms_data
        )
    conn.commit()
    conn.close()

# ─── Auth ─────────────────────────────────────────────────────────────────────

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def create_token(user_id: int, is_admin: bool) -> str:
    payload = f"{user_id}:{is_admin}:{secrets.token_hex(16)}"
    sig = hmac.new(SECRET_KEY.encode(), payload.encode(), hashlib.sha256).hexdigest()
    return f"{payload}:{sig}"

def verify_token(token: str):
    try:
        parts = token.split(":")
        if len(parts) != 4:
            return None
        payload = ":".join(parts[:3])
        sig = parts[3]
        expected = hmac.new(SECRET_KEY.encode(), payload.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(sig, expected):
            return None
        user_id, is_admin, _ = parts[:3]
        return {"user_id": int(user_id), "is_admin": is_admin == "True"}
    except Exception:
        return None

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    data = verify_token(credentials.credentials)
    if not data:
        raise HTTPException(status_code=401, detail="Invalid token")
    return data

def get_admin_user(user=Depends(get_current_user)):
    if not user["is_admin"]:
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

# ─── Schemas ──────────────────────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class RoomCreate(BaseModel):
    name: str
    description: Optional[str] = ""
    type: str
    price_per_night: float
    capacity: int
    amenities: List[str] = []
    images: List[str] = []
    is_available: bool = True

class RoomUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    type: Optional[str] = None
    price_per_night: Optional[float] = None
    capacity: Optional[int] = None
    amenities: Optional[List[str]] = None
    images: Optional[List[str]] = None
    is_available: Optional[bool] = None

class BookingCreate(BaseModel):
    room_id: int
    check_in: str
    check_out: str
    guests: int
    special_requests: Optional[str] = ""

class BookingStatusUpdate(BaseModel):
    status: str

# ─── Auth Routes ──────────────────────────────────────────────────────────────

# FIXED: Added Root route to stop 404 errors when visiting the base URL
@app.get("/")
def read_root():
    return {"status": "online", "service": "Hotel Booking API", "docs": "/docs"}

@app.post("/auth/register")
def register(req: RegisterRequest):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT id FROM users WHERE email = ?", (req.email,))
    if c.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    c.execute("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
              (req.name, req.email, hash_password(req.password)))
    user_id = c.lastrowid
    conn.commit()
    conn.close()
    token = create_token(user_id, False)
    return {"token": token, "user": {"id": user_id, "name": req.name, "email": req.email, "is_admin": False}}

@app.post("/auth/login")
def login(req: LoginRequest):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE email = ?", (req.email,))
    user = c.fetchone()
    conn.close()
    if not user or user["password_hash"] != hash_password(req.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(user["id"], bool(user["is_admin"]))
    return {"token": token, "user": {"id": user["id"], "name": user["name"], "email": user["email"], "is_admin": bool(user["is_admin"])}}

@app.get("/auth/me")
def get_me(user=Depends(get_current_user)):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT id, name, email, is_admin, created_at FROM users WHERE id = ?", (user["user_id"],))
    row = c.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    return dict(row)

# ─── Room Routes ──────────────────────────────────────────────────────────────

def room_to_dict(row):
    d = dict(row)
    d["amenities"] = json.loads(d.get("amenities") or "[]")
    d["images"] = json.loads(d.get("images") or "[]")
    d["is_available"] = bool(d["is_available"])
    return d

@app.get("/rooms")
def list_rooms(type: Optional[str] = None, min_price: Optional[float] = None,
                max_price: Optional[float] = None, capacity: Optional[int] = None):
    conn = get_db()
    c = conn.cursor()
    query = "SELECT * FROM rooms WHERE 1=1"
    params = []
    if type:
        query += " AND type = ?"
        params.append(type)
    if min_price is not None:
        query += " AND price_per_night >= ?"
        params.append(min_price)
    if max_price is not None:
        query += " AND price_per_night <= ?"
        params.append(max_price)
    if capacity:
        query += " AND capacity >= ?"
        params.append(capacity)
    c.execute(query, params)
    rows = c.fetchall()
    conn.close()
    return [room_to_dict(r) for r in rows]

@app.get("/rooms/{room_id}")
def get_room(room_id: int):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM rooms WHERE id = ?", (room_id,))
    row = c.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Room not found")
    return room_to_dict(row)

@app.post("/rooms")
def create_room(room: RoomCreate, _=Depends(get_admin_user)):
    conn = get_db()
    c = conn.cursor()
    c.execute(
        "INSERT INTO rooms (name, description, type, price_per_night, capacity, amenities, images, is_available) VALUES (?,?,?,?,?,?,?,?)",
        (room.name, room.description, room.type, room.price_per_night, room.capacity,
         json.dumps(room.amenities), json.dumps(room.images), int(room.is_available))
    )
    room_id = c.lastrowid
    conn.commit()
    conn.close()
    return get_room(room_id)

@app.put("/rooms/{room_id}")
def update_room(room_id: int, room: RoomUpdate, _=Depends(get_admin_user)):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM rooms WHERE id = ?", (room_id,))
    existing = c.fetchone()
    if not existing:
        conn.close()
        raise HTTPException(status_code=404, detail="Room not found")
    updates = {}
    if room.name is not None: updates["name"] = room.name
    if room.description is not None: updates["description"] = room.description
    if room.type is not None: updates["type"] = room.type
    if room.price_per_night is not None: updates["price_per_night"] = room.price_per_night
    if room.capacity is not None: updates["capacity"] = room.capacity
    if room.amenities is not None: updates["amenities"] = json.dumps(room.amenities)
    if room.images is not None: updates["images"] = json.dumps(room.images)
    if room.is_available is not None: updates["is_available"] = int(room.is_available)
    if updates:
        set_clause = ", ".join(f"{k} = ?" for k in updates)
        c.execute(f"UPDATE rooms SET {set_clause} WHERE id = ?", [*updates.values(), room_id])
        conn.commit()
    conn.close()
    return get_room(room_id)

@app.delete("/rooms/{room_id}")
def delete_room(room_id: int, _=Depends(get_admin_user)):
    conn = get_db()
    c = conn.cursor()
    c.execute("DELETE FROM rooms WHERE id = ?", (room_id,))
    conn.commit()
    conn.close()
    return {"message": "Room deleted"}

# ─── Booking Routes ───────────────────────────────────────────────────────────

@app.get("/bookings")
def get_my_bookings(user=Depends(get_current_user)):
    conn = get_db()
    c = conn.cursor()
    c.execute("""
        SELECT b.*, r.name as room_name, r.type as room_type, r.price_per_night,
               r.images as room_images
        FROM bookings b
        JOIN rooms r ON b.room_id = r.id
        WHERE b.user_id = ?
        ORDER BY b.created_at DESC
    """, (user["user_id"],))
    rows = c.fetchall()
    conn.close()
    result = []
    for row in rows:
        d = dict(row)
        d["room_images"] = json.loads(d.get("room_images") or "[]")
        result.append(d)
    return result

@app.post("/bookings")
def create_booking(booking: BookingCreate, user=Depends(get_current_user)):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM rooms WHERE id = ? AND is_available = 1", (booking.room_id,))
    room = c.fetchone()
    if not room:
        conn.close()
        raise HTTPException(status_code=404, detail="Room not found or unavailable")

    c.execute("""
        SELECT id FROM bookings
        WHERE room_id = ? AND status != 'cancelled'
        AND NOT (check_out <= ? OR check_in >= ?)
    """, (booking.room_id, booking.check_in, booking.check_out))
    if c.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Room is already booked for these dates")

    check_in = datetime.strptime(booking.check_in, "%Y-%m-%d").date()
    check_out = datetime.strptime(booking.check_out, "%Y-%m-%d").date()
    nights = (check_out - check_in).days
    if nights <= 0:
        conn.close()
        raise HTTPException(status_code=400, detail="Check-out must be after check-in")
    total = nights * room["price_per_night"]

    c.execute("""
        INSERT INTO bookings (user_id, room_id, check_in, check_out, guests, total_price, special_requests)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (user["user_id"], booking.room_id, booking.check_in, booking.check_out,
          booking.guests, total, booking.special_requests))
    booking_id = c.lastrowid
    conn.commit()
    conn.close()
    return {"id": booking_id, "total_price": total, "status": "pending", "message": "Booking created successfully"}

@app.delete("/bookings/{booking_id}")
def cancel_booking(booking_id: int, user=Depends(get_current_user)):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT * FROM bookings WHERE id = ? AND user_id = ?", (booking_id, user["user_id"]))
    booking = c.fetchone()
    if not booking:
        conn.close()
        raise HTTPException(status_code=404, detail="Booking not found")
    c.execute("UPDATE bookings SET status = 'cancelled' WHERE id = ?", (booking_id,))
    conn.commit()
    conn.close()
    return {"message": "Booking cancelled"}

# ─── Admin Routes ─────────────────────────────────────────────────────────────

@app.get("/admin/bookings")
def admin_get_bookings(_=Depends(get_admin_user)):
    conn = get_db()
    c = conn.cursor()
    c.execute("""
        SELECT b.*, u.name as user_name, u.email as user_email,
               r.name as room_name, r.type as room_type
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN rooms r ON b.room_id = r.id
        ORDER BY b.created_at DESC
    """)
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.put("/admin/bookings/{booking_id}")
def admin_update_booking(booking_id: int, update: BookingStatusUpdate, _=Depends(get_admin_user)):
    conn = get_db()
    c = conn.cursor()
    c.execute("UPDATE bookings SET status = ? WHERE id = ?", (update.status, booking_id))
    conn.commit()
    conn.close()
    return {"message": "Booking updated"}

@app.get("/admin/users")
def admin_get_users(_=Depends(get_admin_user)):
    conn = get_db()
    c = conn.cursor()
    c.execute("SELECT id, name, email, is_admin, created_at FROM users ORDER BY created_at DESC")
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.get("/admin/stats")
def admin_get_stats(_=Depends(get_admin_user)):
    conn = get_db()
    c = conn.cursor()
    def one(q): return c.execute(q).fetchone()[0]
    stats = {
        "total_bookings": one("SELECT COUNT(*) FROM bookings"),
        "total_revenue": one("SELECT COALESCE(SUM(total_price), 0) FROM bookings WHERE status != 'cancelled'"),
        "total_rooms": one("SELECT COUNT(*) FROM rooms"),
        "total_users": one("SELECT COUNT(*) FROM users WHERE is_admin = 0")
    }
    conn.close()
    return stats

# ─── Run ──────────────────────────────────────────────────────────────────────

init_db()

if __name__ == "__main__":
    import uvicorn
    # FIXED: Direct app object is more reliable for local development
    uvicorn.run(app, host="0.0.0.0", port=8000) 