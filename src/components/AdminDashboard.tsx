'use client';

import { useEffect, useMemo, useState } from 'react';
import { Newspaper, Pencil, Plus, Save, Star, Trash2, Upload } from 'lucide-react';
import { loadStoredBlogPosts, saveStoredBlogPosts, type BlogPostItem } from '../data/blog';
import AdminRoutes from './AdminRoutes';
import { defaultTestimonials, loadStoredTestimonials, saveStoredTestimonials, type TestimonialItem } from '../data/testimonials';
import { publishLiveUpdate } from '../lib/liveUpdates';

const testimonialEmptyForm = {
  name: '',
  city: '',
  avatar: '',
  rating: '5',
  route: '',
  text: '',
};

const blogEmptyForm = {
  title: '',
  excerpt: '',
  category: '',
  date: '',
  image: '',
};

export default function AdminDashboard() {
  const [testimonialForm, setTestimonialForm] = useState(testimonialEmptyForm);
  const [savedTestimonials, setSavedTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);
  const [testimonialEditingIndex, setTestimonialEditingIndex] = useState<number | null>(null);

  const [blogForm, setBlogForm] = useState(blogEmptyForm);
  const [savedBlogPosts, setSavedBlogPosts] = useState<BlogPostItem[]>([]);
  const [blogEditingIndex, setBlogEditingIndex] = useState<number | null>(null);

  const loadBlogPosts = () => {
    setSavedBlogPosts(loadStoredBlogPosts());
  };

  useEffect(() => {
    let isMounted = true;

    const loadTestimonials = async () => {
      const items = await loadStoredTestimonials();

      if (isMounted) {
        setSavedTestimonials(items);
      }
    };

    void loadTestimonials();
    loadBlogPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const testimonialPreview = useMemo<TestimonialItem>(() => ({
    name: testimonialForm.name || 'Preview Name',
    city: testimonialForm.city || 'City',
    avatar: testimonialForm.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    rating: Number(testimonialForm.rating) || 5,
    route: testimonialForm.route || 'Route Preview',
    text: testimonialForm.text || 'Your testimonial preview will appear here.',
  }), [testimonialForm]);

  const blogPreview = useMemo<BlogPostItem>(() => ({
    title: blogForm.title || 'Preview title',
    excerpt: blogForm.excerpt || 'Your blog preview will appear here.',
    category: blogForm.category || 'Category',
    date: blogForm.date || 'Today',
    image: blogForm.image || '',
  }), [blogForm]);

  const persistTestimonials = async (items: TestimonialItem[]) => {
    setSavedTestimonials(items);
    await saveStoredTestimonials(items);
    publishLiveUpdate({ eventName: 'hicars:testimonials-updated', storageKey: 'hicars:testimonials:v2' });
  };

  const persistBlogPosts = (items: BlogPostItem[]) => {
    saveStoredBlogPosts(items);
    publishLiveUpdate({ eventName: 'hicars:blog-updated', storageKey: 'hicars:blog-posts:v2' });
    setSavedBlogPosts(items);
  };

  const readImageFile = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Unable to read image file'));
    reader.readAsDataURL(file);
  });

  const handleTestimonialSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!testimonialForm.name.trim() || !testimonialForm.city.trim() || !testimonialForm.route.trim() || !testimonialForm.text.trim()) {
      return;
    }

    const nextItem: TestimonialItem = {
      name: testimonialForm.name.trim(),
      city: testimonialForm.city.trim(),
      avatar: testimonialForm.avatar.trim() || testimonialPreview.avatar,
      rating: Math.min(5, Math.max(1, Number(testimonialForm.rating) || 5)),
      route: testimonialForm.route.trim(),
      text: testimonialForm.text.trim(),
    };

    const nextItems = [...savedTestimonials];

    if (testimonialEditingIndex !== null) {
      nextItems[testimonialEditingIndex] = nextItem;
    } else {
      nextItems.unshift(nextItem);
    }

    void persistTestimonials(nextItems);
    setTestimonialForm(testimonialEmptyForm);
    setTestimonialEditingIndex(null);
  };

  const handleTestimonialEdit = (index: number) => {
    const testimonial = savedTestimonials[index];
    if (!testimonial) {
      return;
    }

    setTestimonialForm({
      name: testimonial.name,
      city: testimonial.city,
      avatar: testimonial.avatar,
      rating: String(testimonial.rating),
      route: testimonial.route,
      text: testimonial.text,
    });
    setTestimonialEditingIndex(index);
  };

  const handleTestimonialDelete = (index: number) => {
    const nextItems = savedTestimonials.filter((_, itemIndex) => itemIndex !== index);
    void persistTestimonials(nextItems);

    if (testimonialEditingIndex === index) {
      setTestimonialForm(testimonialEmptyForm);
      setTestimonialEditingIndex(null);
    } else if (testimonialEditingIndex !== null && testimonialEditingIndex > index) {
      setTestimonialEditingIndex(testimonialEditingIndex - 1);
    }
  };

  const handleBlogSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!blogForm.title.trim() || !blogForm.excerpt.trim() || !blogForm.category.trim() || !blogForm.date.trim()) {
      return;
    }

    const nextPost: BlogPostItem = {
      title: blogForm.title.trim(),
      excerpt: blogForm.excerpt.trim(),
      category: blogForm.category.trim(),
      date: blogForm.date.trim(),
      image: blogForm.image.trim() || undefined,
    };

    const nextPosts = [...savedBlogPosts];

    if (blogEditingIndex !== null) {
      nextPosts[blogEditingIndex] = nextPost;
    } else {
      nextPosts.unshift(nextPost);
    }

    persistBlogPosts(nextPosts);
    setBlogForm(blogEmptyForm);
    setBlogEditingIndex(null);
  };

  const handleBlogEdit = (index: number) => {
    const blogPost = savedBlogPosts[index];
    if (!blogPost) {
      return;
    }

    setBlogForm({
      title: blogPost.title,
      excerpt: blogPost.excerpt,
      category: blogPost.category,
      date: blogPost.date,
      image: blogPost.image || '',
    });
    setBlogEditingIndex(index);
  };

  const handleBlogDelete = (index: number) => {
    const nextPosts = savedBlogPosts.filter((_, itemIndex) => itemIndex !== index);
    persistBlogPosts(nextPosts);

    if (blogEditingIndex === index) {
      setBlogForm(blogEmptyForm);
      setBlogEditingIndex(null);
    } else if (blogEditingIndex !== null && blogEditingIndex > index) {
      setBlogEditingIndex(blogEditingIndex - 1);
    }
  };

  const testimonialTotal = savedTestimonials.length;
  const blogTotal = savedBlogPosts.length;

  const handleBlogImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    try {
      const imageDataUrl = await readImageFile(file);
      setBlogForm((current) => ({ ...current, image: imageDataUrl }));
    } catch {
      setBlogForm((current) => ({ ...current, image: '' }));
    }
  };

  const handleTestimonialImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    try {
      const imageDataUrl = await readImageFile(file);
      setTestimonialForm((current) => ({ ...current, avatar: imageDataUrl }));
    } catch {
      setTestimonialForm((current) => ({ ...current, avatar: '' }));
    }
  };

  return (
    <main className="min-h-screen bg-amber-50 pt-24 pb-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 mb-4">
            <Upload size={12} />
            Admin Dashboard
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">Manage Blog and Testimonials</h1>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Upload, edit, and delete testimonials and blog posts from one place. All entries are stored locally in the browser and reflected on the public site.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Testimonials" value={String(testimonialTotal)} helper="Saved entries" />
          <StatCard label="Blog Posts" value={String(blogTotal)} helper="Saved + default posts" />
          <StatCard label="Popular Routes" value="12" helper="Homepage route cards" />
          <StatCard label="Admin Tools" value="3" helper="Blog, routes, testimonials" />
        </div>

        <section className="grid gap-8 xl:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-white text-gray-900 rounded-[2rem] p-6 sm:p-8 shadow-sm border border-amber-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <Upload size={18} />
                </span>
                <div>
                  <h2 className="text-2xl font-black">Testimonials</h2>
                  <p className="text-sm text-gray-500">Create, edit, and delete homepage testimonials.</p>
                </div>
              </div>

              <form onSubmit={handleTestimonialSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Name" value={testimonialForm.name} onChange={(value) => setTestimonialForm({ ...testimonialForm, name: value })} placeholder="Customer name" />
                  <Field label="City" value={testimonialForm.city} onChange={(value) => setTestimonialForm({ ...testimonialForm, city: value })} placeholder="Delhi" />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Route" value={testimonialForm.route} onChange={(value) => setTestimonialForm({ ...testimonialForm, route: value })} placeholder="Delhi → Manali" />
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Rating</label>
                    <select
                      value={testimonialForm.rating}
                      onChange={(event) => setTestimonialForm({ ...testimonialForm, rating: event.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm bg-white"
                    >
                      {[5, 4, 3, 2, 1].map((value) => (
                        <option key={value} value={value}>{value} Star{value > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Avatar Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleTestimonialImageChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-amber-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-amber-700 hover:file:bg-amber-200"
                  />
                  <p className="mt-2 text-xs text-gray-500">Upload an image or paste a URL below for the testimonial avatar.</p>
                  {testimonialForm.avatar && (
                    <div className="mt-3 overflow-hidden rounded-2xl border border-amber-100 bg-amber-50">
                      <img src={testimonialForm.avatar} alt="Testimonial upload preview" className="h-44 w-full object-cover" />
                    </div>
                  )}
                </div>

                <Field label="Avatar URL" value={testimonialForm.avatar} onChange={(value) => setTestimonialForm({ ...testimonialForm, avatar: value })} placeholder="https://..." />

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Testimonial</label>
                  <textarea
                    value={testimonialForm.text}
                    onChange={(event) => setTestimonialForm({ ...testimonialForm, text: event.target.value })}
                    rows={5}
                    placeholder="Write the customer testimonial..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button type="submit" className="btn-blue flex-1 py-4 text-white font-bold rounded-2xl flex items-center justify-center gap-2">
                    {testimonialEditingIndex === null ? <Plus size={18} /> : <Save size={18} />}
                    {testimonialEditingIndex === null ? 'Save Testimonial' : 'Update Testimonial'}
                  </button>
                  {testimonialEditingIndex !== null && (
                    <button type="button" onClick={() => { setTestimonialForm(testimonialEmptyForm); setTestimonialEditingIndex(null); }} className="flex-1 py-4 rounded-2xl border border-amber-200 text-amber-700 font-bold hover:bg-amber-50 transition-colors">
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-sm border border-amber-100">
              <h2 className="text-2xl font-black mb-5">Preview</h2>
              <div className="testimonial-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonialPreview.rating }).map((_, index) => (
                      <Star key={index} size={13} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-amber-700">{testimonialPreview.city}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-5 italic">&ldquo;{testimonialPreview.text}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-amber-100 pt-4">
                  <img src={testimonialPreview.avatar} alt={testimonialPreview.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-200" />
                  <div>
                    <div className="text-sm font-bold text-gray-900">{testimonialPreview.name}</div>
                    <div className="text-xs text-amber-600 font-medium">{testimonialPreview.route}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-sm border border-amber-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-black">Saved Testimonials</h2>
                <span className="text-xs font-semibold text-gray-500">{savedTestimonials.length} saved</span>
              </div>

              {savedTestimonials.length > 0 ? (
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {savedTestimonials.map((testimonial, index) => (
                    <div key={`${testimonial.name}-${index}`} className="rounded-2xl border border-gray-200 p-4 flex items-start justify-between gap-4">
                      <div>
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-xs text-gray-500 mb-2">{testimonial.route}</div>
                        <p className="text-sm text-gray-600 line-clamp-3">{testimonial.text}</p>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleTestimonialEdit(index)}
                          className="p-2 rounded-xl border border-gray-200 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                          aria-label={`Edit ${testimonial.name}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTestimonialDelete(index)}
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
                <p className="text-sm text-gray-500">No uploaded testimonials yet.</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white text-gray-900 rounded-[2rem] p-6 sm:p-8 shadow-sm border border-amber-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <Newspaper size={18} />
                </span>
                <div>
                  <h2 className="text-2xl font-black">Blog Posts</h2>
                  <p className="text-sm text-gray-500">Create, edit, and delete public blog entries.</p>
                </div>
              </div>

              <form onSubmit={handleBlogSubmit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Title" value={blogForm.title} onChange={(value) => setBlogForm({ ...blogForm, title: value })} placeholder="Blog post title" />
                  <Field label="Category" value={blogForm.category} onChange={(value) => setBlogForm({ ...blogForm, category: value })} placeholder="Tips" />
                </div>

                <Field label="Date" value={blogForm.date} onChange={(value) => setBlogForm({ ...blogForm, date: value })} placeholder="June 21, 2026" />

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Blog Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBlogImageChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-amber-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-amber-700 hover:file:bg-amber-200"
                  />
                  <p className="mt-2 text-xs text-gray-500">Upload an image to show on the public blog card.</p>
                  {blogForm.image && (
                    <div className="mt-3 overflow-hidden rounded-2xl border border-amber-100 bg-amber-50">
                      <img src={blogForm.image} alt="Blog upload preview" className="h-44 w-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Excerpt</label>
                  <textarea
                    value={blogForm.excerpt}
                    onChange={(event) => setBlogForm({ ...blogForm, excerpt: event.target.value })}
                    rows={6}
                    placeholder="Write a short summary for the blog post..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button type="submit" className="btn-blue flex-1 py-4 text-white font-bold rounded-2xl flex items-center justify-center gap-2">
                    {blogEditingIndex === null ? <Plus size={18} /> : <Save size={18} />}
                    {blogEditingIndex === null ? 'Save Blog Post' : 'Update Blog Post'}
                  </button>
                  {blogEditingIndex !== null && (
                    <button type="button" onClick={() => { setBlogForm(blogEmptyForm); setBlogEditingIndex(null); }} className="flex-1 py-4 rounded-2xl border border-amber-200 text-amber-700 font-bold hover:bg-amber-50 transition-colors">
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-sm border border-amber-100">
              <h2 className="text-2xl font-black mb-5">Preview</h2>
              <div className="rounded-2xl border border-amber-100 p-5 bg-amber-50/70">
                {blogPreview.image ? (
                  <div className="mb-4 overflow-hidden rounded-2xl">
                    <img src={blogPreview.image} alt={blogPreview.title} className="h-44 w-full object-cover" />
                  </div>
                ) : (
                  <div className="mb-4 h-44 rounded-2xl bg-gradient-to-br from-amber-100 via-amber-50 to-white" />
                )}
                <div className="flex items-center justify-between mb-4 text-xs font-bold uppercase tracking-widest text-amber-600">
                  <span>{blogPreview.category}</span>
                  <span>{blogPreview.date}</span>
                </div>
                <h3 className="text-xl font-black mb-3">{blogPreview.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{blogPreview.excerpt}</p>
              </div>
            </div>

            <div className="bg-white text-gray-900 rounded-[2rem] p-6 shadow-sm border border-amber-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-black">Saved Blog Posts</h2>
                <span className="text-xs font-semibold text-gray-500">{savedBlogPosts.length} saved</span>
              </div>

              {savedBlogPosts.length > 0 ? (
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  {savedBlogPosts.map((post, index) => (
                    <div key={`${post.title}-${index}`} className="rounded-2xl border border-gray-200 p-4 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        {post.image ? (
                          <img src={post.image} alt={post.title} className="h-16 w-16 flex-shrink-0 rounded-xl object-cover" />
                        ) : (
                          <div className="h-16 w-16 flex-shrink-0 rounded-xl bg-amber-50 border border-amber-100" />
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
                            <span>{post.category}</span>
                            <span>{post.date}</span>
                          </div>
                          <div className="font-bold text-gray-900 mb-1">{post.title}</div>
                          <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleBlogEdit(index)}
                          className="p-2 rounded-xl border border-gray-200 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                          aria-label={`Edit ${post.title}`}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBlogDelete(index)}
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
        </section>

        <AdminRoutes />
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-[1.75rem] bg-white border border-amber-100 shadow-sm p-5">
      <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">{label}</div>
      <div className="text-3xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{helper}</div>
    </div>
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