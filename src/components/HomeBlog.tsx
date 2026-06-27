'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Newspaper } from 'lucide-react';
import { getBlogImage, loadStoredBlogPosts, slugifyBlogTitle, type BlogPostItem, defaultBlogPosts } from '../data/blog';
import { subscribeLiveUpdate } from '../lib/liveUpdates';

export default function HomeBlog() {
  const [posts, setPosts] = useState<BlogPostItem[]>(defaultBlogPosts);

  useEffect(() => {
    const loadPosts = () => {
      const storedPosts = loadStoredBlogPosts();
      setPosts(storedPosts.length > 0 ? storedPosts : defaultBlogPosts);
    };

    loadPosts();

    const unsubscribe = subscribeLiveUpdate(
      { eventName: 'hicars:blog-updated', storageKey: 'hicars:blog-posts:v2' },
      loadPosts,
    );

    return () => unsubscribe();
  }, []);

  const featuredPosts = posts.slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
              <Newspaper size={12} />
              Latest Updates
            </span>
            <h2 className="text-4xl font-black text-gray-900">
              Fresh stories from the <span className="gradient-text">HIcars</span> blog
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl">
              New posts created in the admin panel appear here automatically, so the homepage always reflects the latest updates.
            </p>
          </div>

          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 hover:text-sky-800 transition-colors">
            View all posts
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <Link
              key={`${post.title}-${index}`}
              href={`/blog/${slugifyBlogTitle(post.title)}`}
              className="group overflow-hidden rounded-[2rem] bg-white border border-sky-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="overflow-hidden bg-sky-50">
                <img
                  src={getBlogImage(post)}
                  alt={post.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-sky-600">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-sky-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}