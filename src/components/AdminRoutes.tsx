'use client';

import { useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, Save, Trash2, TrendingUp } from 'lucide-react';
import { loadStoredPopularRoutes, saveStoredPopularRoutes, type PopularRouteItem } from '../data/routes';
import { publishLiveUpdate } from '../lib/liveUpdates';

const emptyForm = {
  from: '',
  to: '',
  price: '',
  time: '',
  seats: '2',
};

export default function AdminRoutes() {
  const [form, setForm] = useState(emptyForm);
  const [savedRoutes, setSavedRoutes] = useState<PopularRouteItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const loadRoutes = () => {
    setSavedRoutes(loadStoredPopularRoutes());
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  const preview = useMemo<PopularRouteItem>(() => ({
    from: form.from || 'From city',
    to: form.to || 'To city',
    price: form.price || '₹0',
    time: form.time || '0 hrs',
    seats: Number(form.seats) || 2,
  }), [form]);

  const persistRoutes = (items: PopularRouteItem[]) => {
    saveStoredPopularRoutes(items);
    publishLiveUpdate({ eventName: 'hicars:routes-updated', storageKey: 'hicars:popular-routes' });
    setSavedRoutes(items);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingIndex(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.from.trim() || !form.to.trim() || !form.price.trim() || !form.time.trim()) {
      return;
    }

    const nextRoute: PopularRouteItem = {
      from: form.from.trim(),
      to: form.to.trim(),
      price: form.price.trim(),
      time: form.time.trim(),
      seats: Math.min(6, Math.max(1, Number(form.seats) || 2)),
    };

    const nextRoutes = [...savedRoutes];

    if (editingIndex !== null) {
      nextRoutes[editingIndex] = nextRoute;
    } else {
      nextRoutes.unshift(nextRoute);
    }

    persistRoutes(nextRoutes);
    resetForm();
  };

  const handleEdit = (index: number) => {
    const route = savedRoutes[index];
    if (!route) {
      return;
    }

    setForm({
      from: route.from,
      to: route.to,
      price: route.price,
      time: route.time,
      seats: String(route.seats),
    });
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const nextRoutes = savedRoutes.filter((_, itemIndex) => itemIndex !== index);
    persistRoutes(nextRoutes);

    if (editingIndex === index) {
      resetForm();
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  return (
    <section className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="bg-white text-gray-900 rounded-[2rem] p-6 sm:p-8 shadow-sm border border-amber-100 space-y-5">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
            <TrendingUp size={18} />
          </span>
          <div>
            <h2 className="text-2xl font-black">Popular Routes</h2>
            <p className="text-sm text-gray-500">Create, edit, and delete the routes shown on the homepage.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="From" value={form.from} onChange={(value) => setForm({ ...form, from: value })} placeholder="Delhi" />
            <Field label="To" value={form.to} onChange={(value) => setForm({ ...form, to: value })} placeholder="Manali" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Price" value={form.price} onChange={(value) => setForm({ ...form, price: value })} placeholder="₹850" />
            <Field label="Time" value={form.time} onChange={(value) => setForm({ ...form, time: value })} placeholder="13 hrs" />
            <Field label="Seats" value={form.seats} onChange={(value) => setForm({ ...form, seats: value })} placeholder="2" />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button type="submit" className="btn-blue flex-1 py-4 text-white font-bold rounded-2xl flex items-center justify-center gap-2">
              {editingIndex === null ? <Plus size={18} /> : <Save size={18} />}
              {editingIndex === null ? 'Save Route' : 'Update Route'}
            </button>
            {editingIndex !== null && (
              <button type="button" onClick={resetForm} className="flex-1 py-4 rounded-2xl border border-amber-200 text-amber-700 font-bold hover:bg-amber-50 transition-colors">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="space-y-6">
        <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-sm border border-amber-100">
          <h2 className="text-2xl font-black mb-5">Preview</h2>
          <div className="rounded-2xl border border-amber-100 p-5 bg-amber-50/70">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-bold text-gray-900 text-sm truncate">{preview.from}</span>
                <span className="text-gray-300">→</span>
                <span className="font-bold text-gray-900 text-sm truncate">{preview.to}</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Popular</span>
            </div>
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-xl font-black text-blue-600">{preview.price}</div>
                <div className="text-xs text-gray-500 mt-0.5">{preview.time} • {preview.seats} seat{preview.seats > 1 ? 's' : ''}</div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100">
                <TrendingUp size={15} className="text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-sm border border-amber-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black">Saved Routes</h2>
            <span className="text-xs font-semibold text-gray-500">{savedRoutes.length} saved</span>
          </div>

          {savedRoutes.length > 0 ? (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {savedRoutes.map((route, index) => (
                <div key={`${route.from}-${route.to}-${index}`} className="rounded-2xl border border-gray-200 p-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2 min-w-0">
                      <span className="truncate">{route.from}</span>
                      <span className="text-gray-300 flex-shrink-0">→</span>
                      <span className="truncate">{route.to}</span>
                    </div>
                    <div className="text-xl font-black text-blue-600 mb-1">{route.price}</div>
                    <p className="text-sm text-gray-600">{route.time} • {route.seats} seat{route.seats > 1 ? 's' : ''}</p>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(index)}
                      className="p-2 rounded-xl border border-gray-200 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                      aria-label={`Edit ${route.from} to ${route.to}`}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="p-2 rounded-xl border border-gray-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                      aria-label={`Delete ${route.from} to ${route.to}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No routes saved yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-2">{label}</label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm"
      />
    </div>
  );
}