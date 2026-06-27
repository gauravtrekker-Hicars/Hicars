export interface BlogPostItem {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
}

const LEGACY_BLOG_STORAGE_KEY = 'hicars:blog-posts';
const BLOG_IMAGE_BY_CATEGORY: Record<string, string> = {
  tips: '/blog-tips.svg',
  safety: '/blog-safety.svg',
  routes: '/blog-routes.svg',
};

export function slugifyBlogTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getBlogImage(post: BlogPostItem) {
  return post.image || BLOG_IMAGE_BY_CATEGORY[post.category.toLowerCase()] || '/blog-default.svg';
}

function dedupeBlogPosts(items: BlogPostItem[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = slugifyBlogTitle(item.title);
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export const defaultBlogPosts: BlogPostItem[] = [
  {
    title: 'How to save more on daily commutes',
    excerpt: 'A practical guide to lowering fuel costs and choosing the right shared rides for your routine.',
    category: 'Tips',
    date: 'June 21, 2026',
    image: '/blog-tips.svg',
  },
  {
    title: 'Why verified carpooling is safer',
    excerpt: 'See how profile checks, ratings, and route transparency make shared travel more dependable.',
    category: 'Safety',
    date: 'June 18, 2026',
    image: '/blog-safety.svg',
  },
  {
    title: 'Popular routes across India this month',
    excerpt: 'A quick look at the most active intercity carpool routes travelers are booking right now.',
    category: 'Routes',
    date: 'June 15, 2026',
    image: '/blog-routes.svg',
  },
];

export const BLOG_STORAGE_KEY = 'hicars:blog-posts:v2';

export function loadStoredBlogPosts() {
  if (typeof window === 'undefined') {
    return defaultBlogPosts;
  }

  try {
    const saved = window.localStorage.getItem(BLOG_STORAGE_KEY);
    if (saved !== null) {
      const parsed = JSON.parse(saved) as BlogPostItem[];
      return Array.isArray(parsed) ? parsed : [];
    }

    const legacySaved = window.localStorage.getItem(LEGACY_BLOG_STORAGE_KEY);
    if (legacySaved !== null) {
      const parsed = JSON.parse(legacySaved) as BlogPostItem[];
      const merged = Array.isArray(parsed) && parsed.length > 0
        ? dedupeBlogPosts([...defaultBlogPosts, ...parsed])
        : [...defaultBlogPosts];

      window.localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }

    window.localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(defaultBlogPosts));
    return defaultBlogPosts;
  } catch {
    return defaultBlogPosts;
  }
}

export function saveStoredBlogPosts(items: BlogPostItem[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(items));
}