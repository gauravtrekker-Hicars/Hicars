'use client';

import { useEffect, useMemo, useState } from 'react';
import { Pencil, Trash2, Upload, Star, Save } from 'lucide-react';
import { defaultTestimonials, loadStoredTestimonials, saveStoredTestimonials, type TestimonialItem } from '../data/testimonials';
import { publishLiveUpdate } from '../lib/liveUpdates';

const emptyForm = {
  name: '',
  city: '',
  avatar: '',
  rating: '5',
  route: '',
  text: '',
};

export default function AdminTestimonials() {
  const [form, setForm] = useState(emptyForm);
  const [savedTestimonials, setSavedTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTestimonials = async () => {
      const items = await loadStoredTestimonials();

      if (isMounted) {
        setSavedTestimonials(items);
      }
    };

    void loadTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  const preview = useMemo<TestimonialItem>(() => ({
    name: form.name || 'Preview Name',
    city: form.city || 'City',
    avatar: form.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: Number(form.rating) || 5,
    route: form.route || 'Route Preview',
    text: form.text || 'Your testimonial preview will appear here.',
  }), [form]);

  const persistTestimonials = async (items: TestimonialItem[]) => {
    setSavedTestimonials(items);
    await saveStoredTestimonials(items);
    publishLiveUpdate({ eventName: 'hicars:testimonials-updated', storageKey: 'hicars:testimonials:v2' });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim() || !form.city.trim() || !form.route.trim() || !form.text.trim()) {
      return;
    }

    const nextItem: TestimonialItem = {
      name: form.name.trim(),
      city: form.city.trim(),
      avatar: form.avatar.trim() || preview.avatar,
      rating: Math.min(5, Math.max(1, Number(form.rating) || 5)),
      route: form.route.trim(),
      text: form.text.trim(),
    };

    const nextTestimonials = [...savedTestimonials];

    if (editingIndex !== null) {
      nextTestimonials[editingIndex] = nextItem;
    } else {
      nextTestimonials.unshift(nextItem);
    }

    void persistTestimonials(nextTestimonials);
    setForm(emptyForm);
    setEditingIndex(null);
  };

  const handleEdit = (index: number) => {
    const testimonial = savedTestimonials[index];

    if (!testimonial) {
      return;
    }

    setForm({
      name: testimonial.name,
      city: testimonial.city,
      avatar: testimonial.avatar,
      rating: String(testimonial.rating),
      route: testimonial.route,
      text: testimonial.text,
    });
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const nextItems = savedTestimonials.filter((_, itemIndex) => itemIndex !== index);
    void persistTestimonials(nextItems);

    if (editingIndex === index) {
      setForm(emptyForm);
      setEditingIndex(null);
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingIndex(null);
  };

  return (
    <main className="min-h-screen bg-amber-50 pt-24 pb-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 mb-4">
            <Upload size={12} />
            Admin Panel
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Manage Homepage Testimonials</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Edit and delete the testimonials that appear on the homepage. Changes are stored locally in the browser for now.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <form onSubmit={handleSubmit} className="bg-white text-gray-900 rounded-[2rem] p-6 sm:p-8 shadow-sm border border-amber-100 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} placeholder="Customer name" />
              <Field label="City" value={form.city} onChange={(value) => setForm({ ...form, city: value })} placeholder="Delhi" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Route" value={form.route} onChange={(value) => setForm({ ...form, route: value })} placeholder="Delhi → Manali" />
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Rating</label>
                <select
                  value={form.rating}
                  onChange={(event) => setForm({ ...form, rating: event.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm bg-white"
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>{value} Star{value > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <Field label="Avatar URL" value={form.avatar} onChange={(value) => setForm({ ...form, avatar: value })} placeholder="https://..." />

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Testimonial</label>
              <textarea
                value={form.text}
                onChange={(event) => setForm({ ...form, text: event.target.value })}
                rows={5}
                placeholder="Write the customer testimonial..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button type="submit" className="btn-blue flex-1 py-4 text-white font-bold rounded-2xl flex items-center justify-center gap-2">
                {editingIndex === null ? <Upload size={18} /> : <Save size={18} />}
                {editingIndex === null ? 'Save Testimonial' : 'Update Testimonial'}
              </button>
              {editingIndex !== null && (
                <button type="button" onClick={resetForm} className="flex-1 py-4 rounded-2xl border border-amber-200 text-amber-700 font-bold hover:bg-amber-50 transition-colors">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="space-y-6">
            <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-sm border border-amber-100">
              <h2 className="text-2xl font-black mb-5">Preview</h2>
              <div className="testimonial-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: preview.rating }).map((_, index) => (
                      <Star key={index} size={13} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-amber-700">{preview.city}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-5 italic">&ldquo;{preview.text}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-amber-100 pt-4">
                  <img src={preview.avatar} alt={preview.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-200" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">{preview.name}</div>
                    <div className="text-xs text-amber-600 font-medium">{preview.route}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-sm border border-amber-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-black">Homepage Testimonials</h2>
                  <span className="text-xs font-semibold text-gray-500">{savedTestimonials.length} total</span>
              </div>

              {savedTestimonials.length > 0 ? (
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {savedTestimonials.map((testimonial, index) => (
                    <div key={`${testimonial.name}-${index}`} className="rounded-2xl border border-gray-200 p-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex gap-0.5 mb-2">
                          {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                            <Star key={starIndex} size={12} className="text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-xs text-gray-500 mb-1">{testimonial.city}</div>
                        <div className="text-xs text-amber-700 font-medium mb-2">{testimonial.route}</div>
                        <p className="text-sm text-gray-600 line-clamp-3">{testimonial.text}</p>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleEdit(index)}
                          className="p-2 rounded-xl border border-gray-200 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                          aria-label={`Edit ${testimonial.name}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          className="p-2 rounded-xl border border-gray-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                          aria-label={`Delete ${testimonial.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No testimonials available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
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