"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from './AuthModal';
import DateField from './DateField';
import { getTodayInputDate } from '../lib/date';

const indianCities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Kolkata', 'Chennai', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Indore', 'Vadodara', 'Visakhapatnam', 'Kochi', 'Surat', 'Nagpur', 'Bhopal', 'Guwahati', 'Gurgaon',
  'Manali', 'Shimla', 'Mysuru', 'Cochin', 'Goa', 'Nainital', 'Udaipur', 'Pushkar', 'Varanasi',
];

export default function Hero() {
  const router = useRouter();
  const [tripType, setTripType] = useState<'find' | 'share'>('find');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState('1');
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [errors, setErrors] = useState<{ from?: string; to?: string; date?: string }>({});
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const fromContainerRef = useRef<HTMLDivElement | null>(null);
  const toContainerRef = useRef<HTMLDivElement | null>(null);
  const heroSearchRef = useRef<HTMLDivElement | null>(null);
  const heroRootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromContainerRef.current && !fromContainerRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toContainerRef.current && !toContainerRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setDate(getTodayInputDate());
  }, []);

  // Replay hero animations on demand (e.g., logo click) and on first mount for mobile
  useEffect(() => {
    const root = heroRootRef.current;
    if (!root) return;

    const replay = () => {
      const els = Array.from(root.querySelectorAll<HTMLElement>('.animate-fade-in-up, .animate-fade-in, .animate-slide-in-left, .animate-slide-in-right'));
      els.forEach((el) => {
        const animClasses = Array.from(el.classList).filter((c) => c.startsWith('animate-'));
        if (animClasses.length === 0) return;
        animClasses.forEach((c) => el.classList.remove(c));
        // force reflow
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        el.getBoundingClientRect();
        animClasses.forEach((c) => el.classList.add(c));
      });
    };

    // Play on mount (helps mobile when CSS may otherwise be suppressed)
    replay();

    const handler = () => replay();
    document.addEventListener('play-hero-animation', handler as EventListener);
    return () => document.removeEventListener('play-hero-animation', handler as EventListener);
  }, []);

  const updateSuggestions = (value: string, setter: (items: string[]) => void) => {
    if (!value.trim()) {
      setter([]);
      return;
    }

    setter(indianCities.filter((city) => city.toLowerCase().startsWith(value.toLowerCase())));
  };

  const handleFromChange = (value: string) => {
    setFrom(value);
    updateSuggestions(value, setFromSuggestions);
    setShowFromSuggestions(Boolean(value.trim()));
  };

  const handleToChange = (value: string) => {
    setTo(value);
    updateSuggestions(value, setToSuggestions);
    setShowToSuggestions(Boolean(value.trim()));
  };

  const handleCTAClick = () => {
    const nextErrors: { from?: string; to?: string; date?: string } = {};
    if (!from.trim()) nextErrors.from = 'Select departure city';
    if (!to.trim()) nextErrors.to = 'Select destination city';
    if (!date) nextErrors.date = 'Select travel date';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      if (tripType === 'share') {
        setAuthMode('login');
        setAuthOpen(true);
        return;
      }

      const params = new URLSearchParams();
      params.set('from', from.trim());
      params.set('to', to.trim());
      params.set('date', date);
      params.set('seats', seats);
      router.push(`/search-rides?${params.toString()}`);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTypeSelect = (type: 'find' | 'share') => {
    setTripType(type);
    if (heroSearchRef.current) {
      heroSearchRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      scrollToSection('find-a-ride');
    }
  };

  return (
    <section ref={heroRootRef} className="bg-white py-8 sm:py-12 lg:py-20 pt-24 sm:pt-28 lg:pt-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8 lg:mb-12">
          <div className="text-center lg:text-left">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-3 lg:mb-4 leading-tight animate-fade-in-up"
              style={{ animationDelay: '100ms' }}
            >
              Share <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">Rides.</span> Save<br />
              <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">Money.</span> Travel<br />
              <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent">Smarter.</span>
            </h1>
            <p
              className="text-base sm:text-lg text-gray-600 mb-6 lg:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              Making travel affordable, sustainable, and social by sharing rides with people already heading your way
            </p>
          </div>

          <div className="flex justify-center items-center mt-2 lg:mt-8 animate-slide-in-right" style={{ animationDelay: '250ms' }}>
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_24px_90px_rgba(15,23,42,0.24)] h-72 sm:h-80 lg:h-96 w-full max-w-2xl border border-white/20 hero-shell">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/20 via-slate-900/10 to-blue-500/20 z-10" />
              <img
                src="/Banner-image.jpg.png"
                alt="Hero banner"
                className="absolute inset-0 w-full h-full object-cover hero-image active"
              />
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-center sm:justify-start gap-3 sm:gap-4 mb-8 lg:mb-12 animate-fade-in"
          style={{ animationDelay: '300ms' }}
        >
          {(['find', 'share'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeSelect(type)}
              className={`py-3 sm:py-4 px-6 sm:px-8 text-sm sm:text-base font-bold rounded-xl transition-all whitespace-nowrap ${
                tripType === type
                  ? 'bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white shadow-[0_12px_35px_rgba(37,99,235,0.25)] hover:shadow-[0_16px_45px_rgba(37,99,235,0.3)]'
                  : 'text-gray-700 bg-slate-100 hover:bg-slate-200'
              }`}
            >
              {type === 'find' ? 'Find a Ride' : 'Share a Ride'}
            </button>
          ))}
        </div>

        <div
          ref={heroSearchRef}
          className="bg-white rounded-lg sm:rounded-2xl border-2 border-sky-500 p-4 sm:p-6 shadow-lg animate-fade-in"
          style={{ animationDelay: '350ms' }}
        >
          <div className="flex flex-col sm:flex-col md:flex-row gap-3 sm:gap-4 items-end min-w-0">
            <div className="w-full sm:flex-1 relative" ref={fromContainerRef}>
              <label className="block text-xs font-semibold text-blue-600 mb-2">From</label>
              <input
                type="text"
                placeholder="City, station, place"
                value={from}
                onChange={(e) => handleFromChange(e.target.value)}
                onFocus={() => from && setShowFromSuggestions(true)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg z-30 overflow-y-auto max-h-48 border border-gray-200">
                  {fromSuggestions.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setFrom(city);
                        setShowFromSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 font-medium border-b border-gray-100 last:border-b-0"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
              {errors.from && <p className="text-xs text-red-500 mt-1">{errors.from}</p>}
            </div>

            <div className="w-full sm:flex-1 relative" ref={toContainerRef}>
              <label className="block text-xs font-semibold text-blue-600 mb-2">To</label>
              <input
                type="text"
                placeholder="City, station, place"
                value={to}
                onChange={(e) => handleToChange(e.target.value)}
                onFocus={() => to && setShowToSuggestions(true)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
              {showToSuggestions && toSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg z-30 overflow-y-auto max-h-48 border border-gray-200">
                  {toSuggestions.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setTo(city);
                        setShowToSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 font-medium border-b border-gray-100 last:border-b-0"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
              {errors.to && <p className="text-xs text-red-500 mt-1">{errors.to}</p>}
            </div>

            <DateField
              label="Date"
              value={date}
              onChange={setDate}
              error={errors.date}
              wrapperClassName="w-full sm:flex-1 min-w-0"
              inputClassName="px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm text-gray-800"
            />


            <div className="w-full sm:flex-1 relative">
              <label className="block text-xs font-semibold text-blue-600 mb-2">Passengers</label>
              <select
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all appearance-none bg-white"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} passenger{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleCTAClick}
              className="w-full md:w-auto btn-blue text-white font-bold text-sm sm:text-base py-2 sm:py-3 px-6 sm:px-8 rounded-lg transition-all whitespace-nowrap md:h-12 flex items-center justify-center"
            >
              {tripType === 'find' ? 'Search Rides' : 'Publish Ride'}
            </button>
          </div>
        </div>
      </div>
      <AuthModal isOpen={authOpen} mode={authMode} onClose={() => setAuthOpen(false)} />
    </section>
  );
}
