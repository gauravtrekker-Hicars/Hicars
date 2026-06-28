"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const pathname = usePathname();

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // trigger hero animation replay on home
      try { document.dispatchEvent(new CustomEvent('play-hero-animation')); } catch {}
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-md py-2 sm:py-1.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2 group min-w-0">
            <img
              src="/logo4.png"
              alt="HIcars logo"
              className="h-12 w-auto object-contain flex-shrink-0 sm:h-16 sm:scale-140"
            />
          </Link>

          {/* Desktop Nav + Auth grouped to the right */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-8">
              {[
                { label: 'Find a Ride', path: '/find-a-ride' },
                { label: 'Share a Ride', path: '/share-a-ride' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  className="nav-link text-sm font-semibold text-white hover:text-sky-300 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthOpen(true);
                }}
                className="px-4 py-1.5 text-sm font-semibold text-white hover:text-sky-300 rounded-lg transition-all duration-300"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setAuthOpen(true);
                }}
                className="btn-blue px-4 py-1.5 text-sm font-semibold text-white rounded-lg"
              >
                Sign up
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-white transition-colors active:scale-95"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-2xl shadow-xl p-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {[
                { label: 'Find a Ride', path: '/find-a-ride' },
                { label: 'Share a Ride', path: '/share-a-ride' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 font-medium hover:bg-sky-50 hover:text-sky-700 rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setAuthOpen(true);
                    setMenuOpen(false);
                  }}
                  className="px-4 py-2.5 text-gray-700 font-semibold hover:bg-gray-50 rounded-xl"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setAuthOpen(true);
                    setMenuOpen(false);
                  }}
                  className="btn-blue px-4 py-2.5 text-white font-semibold rounded-xl"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} mode={authMode} onClose={() => setAuthOpen(false)} />
    </nav>
  );
}
