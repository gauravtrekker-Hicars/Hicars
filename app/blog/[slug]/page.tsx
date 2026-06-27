'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BLOG_STORAGE_KEY, defaultBlogPosts, type BlogPostItem } from '../../../src/data/blog';
import { getBlogImage, slugifyBlogTitle } from '../../../src/data/blog';
import { subscribeLiveUpdate } from '../../../src/lib/liveUpdates';

export default function BlogDetailPage() {
  const params = useParams<{ slug?: string | string[] }>() ?? {};
  const router = useRouter();
  const slugValue = params.slug;
  const slug = Array.isArray(slugValue) ? slugValue[0] : slugValue ?? '';
  const [posts, setPosts] = useState<BlogPostItem[]>(defaultBlogPosts);

  useEffect(() => {
    const loadPosts = () => {
      try {
        const raw = window.localStorage.getItem(BLOG_STORAGE_KEY);
        const parsed = raw ? (JSON.parse(raw) as BlogPostItem[]) : [];
        setPosts(Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultBlogPosts);
      } catch {
        setPosts(defaultBlogPosts);
      }
    };

    loadPosts();

    const unsubscribe = subscribeLiveUpdate(
      { eventName: 'hicars:blog-updated', storageKey: BLOG_STORAGE_KEY },
      loadPosts,
    );

    return () => unsubscribe();
  }, []);

  const post = useMemo(
    () => posts.find((item) => slugifyBlogTitle(item.title) === slug),
    [posts, slug],
  );

  const handleBackToBlog = () => {
    router.push('/blog');
  };

  if (!post) {
    return (
      <main className="min-h-screen bg-amber-50 pt-24 pb-16 text-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black mb-4">Blog post not found</h1>
          <p className="text-gray-600 mb-8">The article you opened may have been removed or renamed.</p>
          <button type="button" onClick={handleBackToBlog} className="btn-blue inline-flex px-6 py-3 text-white font-bold rounded-xl">
            Back to Blog
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-amber-50 pt-24 pb-16 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={handleBackToBlog} className="inline-flex mb-8 text-sm font-semibold text-amber-700 hover:text-amber-800">
          Back to Blog
        </button>

        <article className="overflow-hidden rounded-[2rem] bg-white border border-amber-100 shadow-sm">
          <div className="min-h-[320px] bg-amber-50">
            <img src={getBlogImage(post)} alt={post.title} className="h-full w-full object-cover" />
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 mb-5">
              {post.category}
            </div>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">{post.title}</h1>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gray-500 mb-6">{post.date}</p>
            <p className="text-lg text-gray-600 leading-relaxed">{post.excerpt}</p>
            <p className="mt-6 text-sm text-gray-500 leading-relaxed">
              This article page gives each blog post its own shareable destination. The image and summary update automatically from the blog data.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}