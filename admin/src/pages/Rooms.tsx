import { useState, useEffect } from 'react';
import { roomsAPI } from '../api';
import { Room } from '../types';
import { Plus, Pencil, Trash2, Check, X, BedDouble, AlertTriangle } from 'lucide-react';

const EMPTY_ROOM = {
  name: '',
  description: '',
  type: 'double',
  price_per_night: 200,
  capacity: 2,
  amenities: [] as string[],
  images: [] as string[],
  is_available: true,
};

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Room | null>(null);
  const [form, setForm] = useState({ ...EMPTY_ROOM });
  const [amenityInput, setAmenityInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = () => {
    roomsAPI.list()
      .then(res => setRooms(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const openCreate = () => {
    setEditing(null);
    setForm({ ...EMPTY_ROOM });
    setAmenityInput('');
    setImageInput('');
    setShowForm(true);
  };

  const openEdit = (room: Room) => {
    setEditing(room);
    setForm({
      name: room.name,
      description: room.description,
      type: room.type,
      price_per_night: room.price_per_night,
      capacity: room.capacity,
      amenities: [...room.amenities],
      images: [...room.images],
      is_available: room.is_available,
    });
    setAmenityInput('');
    setImageInput('');
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editing) {
        await roomsAPI.update(editing.id, form);
      } else {
        await roomsAPI.create(form);
      }
      loadRooms();
      setShowForm(false);
    } catch (e: any) {
      alert(e.response?.data?.detail || 'Failed to save room');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await roomsAPI.delete(id);
      setRooms(prev => prev.filter(r => r.id !== id));
      setDeleteId(null);
    } catch {
      alert('Failed to delete room');
    }
  };

  const addAmenity = () => {
    if (amenityInput.trim() && !form.amenities.includes(amenityInput.trim())) {
      setForm(f => ({ ...f, amenities: [...f.amenities, amenityInput.trim()] }));
      setAmenityInput('');
    }
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setForm(f => ({ ...f, images: [...f.images, imageInput.trim()] }));
      setImageInput('');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Rooms</h1>
          <p className="text-slate-400 text-sm mt-1">{rooms.length} rooms total</p>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2">
          <Plus size={16} />
          Add Room
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="stat-card h-48 flex items-center justify-center">
          <div className="text-slate-500 text-sm animate-pulse">Loading rooms...</div>
        </div>
      ) : (
        <div className="stat-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Type</th>
                  <th>Price / Night</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map(room => (
                  <tr key={room.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        {room.images?.[0] ? (
                          <img
                            src={room.images[0]}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                            <BedDouble size={14} className="text-slate-500" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-slate-200 text-sm">{room.name}</div>
                          <div className="text-xs text-slate-500 line-clamp-1 max-w-xs">{room.description}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-xs bg-slate-700/60 text-slate-300 px-2 py-1 rounded capitalize">
                        {room.type}
                      </span>
                    </td>
                    <td className="font-medium text-emerald-400">${room.price_per_night.toLocaleString()}</td>
                    <td>{room.capacity} guests</td>
                    <td>
                      <span className={room.is_available ? 'badge-confirmed' : 'badge-cancelled'}>
                        {room.is_available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(room)}
                          className="text-slate-400 hover:text-brand-400 transition-colors p-1.5 rounded hover:bg-brand-900/20"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteId(room.id)}
                          className="text-slate-400 hover:text-red-400 transition-colors p-1.5 rounded hover:bg-red-900/20"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-sm w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-900/40 rounded-full flex items-center justify-center">
                <AlertTriangle size={18} className="text-red-400" />
              </div>
              <h3 className="text-slate-100 font-medium">Delete Room?</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              This action cannot be undone. All bookings for this room may be affected.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-slate-400 hover:text-slate-200 text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Room Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 overflow-y-auto py-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-2xl mx-4">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h3 className="text-slate-100 font-semibold">
                {editing ? 'Edit Room' : 'Add New Room'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Form body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Room Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Deluxe Ocean Suite"
                    className="input-dark w-full"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className="input-dark w-full"
                  >
                    {['single', 'double', 'suite', 'villa', 'penthouse'].map(t => (
                      <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Price / Night ($)</label>
                  <input
                    type="number"
                    value={form.price_per_night}
                    onChange={e => setForm(f => ({ ...f, price_per_night: parseFloat(e.target.value) }))}
                    className="input-dark w-full"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Capacity (guests)</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={form.capacity}
                    onChange={e => setForm(f => ({ ...f, capacity: parseInt(e.target.value) }))}
                    className="input-dark w-full"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-xs text-slate-400 uppercase tracking-wider">Available</label>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, is_available: !f.is_available }))}
                    className={`relative w-10 h-5 rounded-full transition-colors ${form.is_available ? 'bg-emerald-600' : 'bg-slate-600'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${form.is_available ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={3}
                    placeholder="Room description..."
                    className="input-dark w-full resize-none"
                  />
                </div>

                {/* Amenities */}
                <div className="col-span-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Amenities</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={amenityInput}
                      onChange={e => setAmenityInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                      placeholder="e.g. WiFi, Jacuzzi..."
                      className="input-dark flex-1"
                    />
                    <button onClick={addAmenity} className="btn-primary px-3">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.amenities.map(a => (
                      <span key={a} className="flex items-center gap-1.5 bg-slate-700/60 text-slate-300 text-xs px-2.5 py-1 rounded">
                        {a}
                        <button
                          onClick={() => setForm(f => ({ ...f, amenities: f.amenities.filter(x => x !== a) }))}
                          className="text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Images */}
                <div className="col-span-2">
                  <label className="text-xs text-slate-400 uppercase tracking-wider block mb-1.5">Image URLs</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={imageInput}
                      onChange={e => setImageInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImage())}
                      placeholder="https://..."
                      className="input-dark flex-1"
                    />
                    <button onClick={addImage} className="btn-primary px-3">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative group">
                        <img src={img} alt="" className="w-20 h-14 object-cover rounded" />
                        <button
                          onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                          className="absolute top-0.5 right-0.5 bg-red-600/80 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={8} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700">
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-200 text-sm px-4 py-2 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Check size={15} />
                )}
                {editing ? 'Update Room' : 'Create Room'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
