'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBlogImage, loadStoredBlogPosts, slugifyBlogTitle, type BlogPostItem } from '../../src/data/blog';
import { subscribeLiveUpdate } from '../../src/lib/liveUpdates';

const blogIntro = 'Practical stories, carpooling tips, and updates from across the HIcars community.';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);

  useEffect(() => {
    const loadPosts = () => {
      setPosts(loadStoredBlogPosts());
    };

    loadPosts();

    const unsubscribe = subscribeLiveUpdate(
      { eventName: 'hicars:blog-updated', storageKey: 'hicars:blog-posts:v2' },
      loadPosts,
    );

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-white pt-24 pb-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-sky-100 border border-sky-200 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700 mb-4">
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">HIcars Blog</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">{blogIntro}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 auto-rows-fr">
          {posts.map((post) => (
            <Link
              key={post.title}
              href={`/blog/${slugifyBlogTitle(post.title)}`}
              className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white p-6 text-gray-900 shadow-sm border border-sky-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 overflow-hidden rounded-2xl">
                <img src={getBlogImage(post)} alt={post.title} className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="flex items-center justify-between mb-4 text-xs font-bold uppercase tracking-widest text-sky-600">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>
              <div className="flex flex-1 flex-col">
                <h2 className="min-h-[4.5rem] text-2xl font-black mb-3 group-hover:text-sky-700 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="min-h-[4.5rem] text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-5">
                  <span className="inline-flex items-center justify-center btn-blue px-5 py-3 text-white font-semibold rounded-xl text-sm">
                    Read More
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
