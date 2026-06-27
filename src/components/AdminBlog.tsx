'use client';

import { useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, Save, Trash2, Newspaper } from 'lucide-react';
import { loadStoredBlogPosts, saveStoredBlogPosts, type BlogPostItem } from '../data/blog';
import { publishLiveUpdate } from '../lib/liveUpdates';

const emptyForm = {
  title: '',
  excerpt: '',
  category: '',
  date: '',
};

export default function AdminBlog() {
  const [form, setForm] = useState(emptyForm);
  const [savedPosts, setSavedPosts] = useState<BlogPostItem[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const loadPosts = () => {
    setSavedPosts(loadStoredBlogPosts());
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const preview = useMemo<BlogPostItem>(() => ({
    title: form.title || 'Preview title',
    excerpt: form.excerpt || 'Your blog preview will appear here.',
    category: form.category || 'Category',
    date: form.date || 'Today',
  }), [form]);

  const persistPosts = (items: BlogPostItem[]) => {
    saveStoredBlogPosts(items);
    publishLiveUpdate({ eventName: 'hicars:blog-updated', storageKey: 'hicars:blog-posts:v2' });
    setSavedPosts(items);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingIndex(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.title.trim() || !form.excerpt.trim() || !form.category.trim() || !form.date.trim()) {
      return;
    }

    const nextPost: BlogPostItem = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      category: form.category.trim(),
      date: form.date.trim(),
    };

    const nextPosts = [...savedPosts];

    if (editingIndex !== null) {
      nextPosts[editingIndex] = nextPost;
    } else {
      nextPosts.unshift(nextPost);
    }

    persistPosts(nextPosts);
    resetForm();
  };

  const handleEdit = (index: number) => {
    const post = savedPosts[index];
    if (!post) {
      return;
    }

    setForm(post);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const nextPosts = savedPosts.filter((_, itemIndex) => itemIndex !== index);
    persistPosts(nextPosts);

    if (editingIndex === index) {
      resetForm();
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  const totalSaved = savedPosts.length;

  return (
    <main className="min-h-screen bg-amber-50 pt-24 pb-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 mb-4">
            <Newspaper size={12} />
            Admin Panel
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Manage Blog Posts</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Add, edit, and delete blog posts that appear on the public blog page. Entries are stored locally in the browser for now.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <form onSubmit={handleSubmit} className="bg-white text-gray-900 rounded-[2rem] p-6 sm:p-8 shadow-sm border border-amber-100 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Title" value={form.title} onChange={(value) => setForm({ ...form, title: value })} placeholder="Blog post title" />
              <Field label="Category" value={form.category} onChange={(value) => setForm({ ...form, category: value })} placeholder="Tips" />
            </div>

            <Field label="Date" value={form.date} onChange={(value) => setForm({ ...form, date: value })} placeholder="June 21, 2026" />

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(event) => setForm({ ...form, excerpt: event.target.value })}
                rows={6}
                placeholder="Write a short summary for the blog post..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button type="submit" className="btn-blue flex-1 py-4 text-white font-bold rounded-2xl flex items-center justify-center gap-2">
                {editingIndex === null ? <Plus size={18} /> : <Save size={18} />}
                {editingIndex === null ? 'Save Blog Post' : 'Update Blog Post'}
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
              <div className="rounded-2xl border border-amber-100 p-5 bg-amber-50/70">
                <div className="flex items-center justify-between mb-4 text-xs font-bold uppercase tracking-widest text-amber-600">
                  <span>{preview.category}</span>
                  <span>{preview.date}</span>
                </div>
                <h3 className="text-xl font-black mb-3">{preview.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{preview.excerpt}</p>
              </div>
            </div>

            <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-sm border border-amber-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-black">Saved Blog Posts</h2>
                <span className="text-xs font-semibold text-gray-500">{totalSaved} total</span>
              </div>

              {savedPosts.length > 0 ? (
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {savedPosts.map((post, index) => (
                    <div key={`${post.title}-${index}`} className="rounded-2xl border border-gray-200 p-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
                          <span>{post.category}</span>
                          <span>{post.date}</span>
                        </div>
                        <div className="font-bold text-gray-900 mb-1">{post.title}</div>
                        <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleEdit(index)}
                          className="p-2 rounded-xl border border-gray-200 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                          aria-label={`Edit ${post.title}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          className="p-2 rounded-xl border border-gray-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                          aria-label={`Delete ${post.title}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No uploaded blog posts yet.</p>
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