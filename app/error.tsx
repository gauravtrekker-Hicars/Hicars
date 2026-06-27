'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose-600">Error</p>
      <h1 className="text-3xl font-semibold text-slate-900">Something went wrong</h1>
      <p className="mt-3 max-w-xl text-base text-slate-600">
        We hit an unexpected issue while loading this page.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 rounded-full bg-sky-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
      >
        Try again
      </button>
    </main>
  );
}
