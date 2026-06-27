"use client";

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';
import AuthModal from './AuthModal';
import { getTodayInputDate } from '../lib/date';

const indianCities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Kolkata', 'Chennai', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Indore', 'Vadodara', 'Visakhapatnam', 'Kochi', 'Surat', 'Nagpur', 'Bhopal', 'Guwahati', 'Gurgaon',
  'Manali', 'Shimla', 'Mysuru', 'Cochin', 'Goa', 'Nainital', 'Udaipur', 'Pushkar', 'Varanasi',
];

export default function PublishRide() {
  const ref = useRef<HTMLElement>(null);
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState('1');
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [errors, setErrors] = useState<{ from?: string; to?: string; date?: string }>({});

  const fromContainerRef = useRef<HTMLDivElement | null>(null);
  const toContainerRef = useRef<HTMLDivElement | null>(null);

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

  useSectionReveal(ref);

  const openDatePicker = () => {
    const input = dateInputRef.current;
    if (!input) return;

    if (typeof input.showPicker === 'function') {
      input.showPicker();
      return;
    }

    input.focus();
  };

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

  const handlePublish = () => {
    const nextErrors: { from?: string; to?: string; date?: string } = {};
    if (!from.trim()) nextErrors.from = 'Select departure city';
    if (!to.trim()) nextErrors.to = 'Select destination city';
    if (!date) nextErrors.date = 'Select travel date';
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setAuthOpen(true);
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-black py-20 sm:py-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="section-reveal text-center mb-12">
          <span className="inline-block bg-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-white/10 backdrop-blur-sm">
            Share a Ride
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Publish your ride and earn with <span className="text-white">HI</span><span className="text-sky-400">cars</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            Add your route, set your seats, and connect with verified passengers across India.
          </p>
        </div>

        <div className="mx-auto max-w-5xl section-reveal rounded-[2rem] bg-white p-6 sm:p-8 shadow-2xl border border-white/10">
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            <div className="relative" ref={fromContainerRef}>
              <label className="block text-xs font-semibold text-gray-700 mb-2">From</label>
              <input
                type="text"
                placeholder="Departure city"
                value={from}
                onChange={(e) => handleFromChange(e.target.value)}
                onFocus={() => from && setShowFromSuggestions(true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm"
              />
              {showFromSuggestions && fromSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
                  {fromSuggestions.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setFrom(city);
                        setShowFromSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-amber-50 text-sm text-gray-700 font-medium transition-colors border-b border-gray-100 last:border-0"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
              {errors.from && <p className="text-xs text-red-500 mt-1">{errors.from}</p>}
            </div>

            <div className="relative" ref={toContainerRef}>
              <label className="block text-xs font-semibold text-gray-700 mb-2">To</label>
              <input
                type="text"
                placeholder="Destination city"
                value={to}
                onChange={(e) => handleToChange(e.target.value)}
                onFocus={() => to && setShowToSuggestions(true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm"
              />
              {showToSuggestions && toSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-48 overflow-y-auto">
                  {toSuggestions.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setTo(city);
                        setShowToSuggestions(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-amber-50 text-sm text-gray-700 font-medium transition-colors border-b border-gray-100 last:border-0"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
              {errors.to && <p className="text-xs text-red-500 mt-1">{errors.to}</p>}
            </div>

            <div
              role="button"
              tabIndex={0}
              onMouseDown={openDatePicker}
              onClick={openDatePicker}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openDatePicker();
                }
              }}
              className="cursor-pointer"
            >
              <label htmlFor="publish-ride-date" className="block text-xs font-semibold text-gray-700 mb-2">
                Date
              </label>
              <input
                ref={dateInputRef}
                id="publish-ride-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={getTodayInputDate()}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm cursor-pointer"
              />
              {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Seats</label>
              <select
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm bg-white"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} Seat{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                onClick={handlePublish}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-2 transition-all duration-300"
              >
                Publish Ride
                <ArrowRight size={16} />
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                💡 Tip: Sign in to publish your ride and manage passenger bookings.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AuthModal isOpen={authOpen} mode="login" onClose={() => setAuthOpen(false)} />
    </section>
  );
}

