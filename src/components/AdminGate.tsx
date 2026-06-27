'use client';

import { useEffect, useState } from 'react';
import { Lock, LogIn, ShieldCheck } from 'lucide-react';

const ADMIN_SESSION_KEY = 'hicars:admin-auth';
export const ADMIN_ACCESS_NAME = 'HicarsAdmin';
export const ADMIN_ACCESS_PASSWORD = 'Hicars@Admin2026!';

export default function AdminGate({ children, title }: { children: React.ReactNode; title?: string; }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
      setIsAuthenticated(saved === 'true');
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (adminName.trim() === ADMIN_ACCESS_NAME && password === ADMIN_ACCESS_PASSWORD) {
      try {
        window.sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } catch {
        // Session storage is optional; if it fails, fall back to the in-memory state.
      }

      setError('');
      setIsAuthenticated(true);
      return;
    }

    setError('Invalid admin name or password.');
  };

  const handleLogout = () => {
    try {
      window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch {
      // Ignore storage errors on logout.
    }

    setIsAuthenticated(false);
    setAdminName('');
    setPassword('');
  };

  if (isAuthenticated) {
    return (
      <>
        <div className="fixed right-4 top-4 z-50 rounded-2xl border border-amber-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-700">Protected Admin</div>
              <button type="button" onClick={handleLogout} className="text-sm font-semibold text-gray-700 hover:text-red-600 transition-colors">
                Log out
              </button>
            </div>
          </div>
        </div>
        {children}
      </>
    );
  }

  return (
    <main className="min-h-screen bg-amber-50 pt-24 pb-16 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700">
              <Lock size={12} />
              Admin Access
            </span>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight">Protected dashboard for HIcars admins.</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Sign in to manage blog posts, testimonials, and dashboard content.
            </p>
          </div>

          <div className="rounded-[2rem] border border-amber-100 bg-white p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 mb-4">
                <ShieldCheck size={12} />
                {title || 'Admin Dashboard'}
              </div>
              <h2 className="text-2xl font-black text-gray-900">Sign in to continue</h2>
              <p className="mt-2 text-sm text-gray-500">Use your admin credentials to unlock this area for the current browser session.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Admin ID" value={adminName} onChange={setAdminName} placeholder="Enter admin id" />
              <Field label="Password" value={password} onChange={setPassword} placeholder="Enter password" type="password" />

              {error && <p className="text-sm font-medium text-red-600">{error}</p>}

              <button type="submit" className="btn-blue w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2">
                <LogIn size={18} />
                Unlock Admin
              </button>
            </form>
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
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm"
      />
    </div>
  );
}