import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">404</p>
      <h1 className="text-3xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-3 max-w-xl text-base text-slate-600">
        The page you are looking for doesn’t exist or may have moved.
      </p>
      <Link href="/" className="mt-8 rounded-full bg-sky-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-700">
        Return home
      </Link>
    </main>
  );
}
