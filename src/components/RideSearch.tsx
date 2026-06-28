"use client";

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSectionReveal } from '../hooks/useSectionReveal';
import DateField from './DateField';
import { getTodayInputDate } from '../lib/date';
const indianCities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune',
  'Kolkata', 'Chennai', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Indore', 'Vadodara', 'Visakhapatnam', 'Kochi',
  'Surat', 'Nagpur', 'Bhopal', 'Guwahati', 'Gurgaon',
  'Manali', 'Shimla', 'Mysuru', 'Cochin', 'Goa',
  'Nainital', 'Udaipur', 'Pushkar', 'Varanasi',
];

interface CityInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function CityInput({ label, placeholder, value, onChange }: CityInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (text: string) => {
    onChange(text);
    if (text.length > 0) {
      const filtered = indianCities.filter((city) =>
        city.toLowerCase().startsWith(text.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (city: string) => {
    onChange(city);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative flex-1 min-w-0">
      <label className="block text-xs font-semibold text-gray-700 mb-2">{label}</label>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => value && setShowSuggestions(true)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm text-gray-900 placeholder:text-gray-400"
        aria-label={label}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
          {suggestions.map((city) => (
            <button
              key={city}
              onClick={() => handleSelectSuggestion(city)}
              className="w-full text-left px-4 py-3 hover:bg-amber-50 text-sm text-gray-700 font-medium transition-colors border-b border-gray-100 last:border-0"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RideSearch() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  useSectionReveal(ref);

  useEffect(() => {
    setDate(getTodayInputDate());
  }, []);

  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState('1');
  const [errors, setErrors] = useState<{ from?: string; to?: string; date?: string }>(() => ({}));

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { from?: string; to?: string; date?: string } = {};
    if (!fromCity) newErrors.from = 'Select departure city';
    if (!toCity) newErrors.to = 'Select destination city';
    if (!date) newErrors.date = 'Select travel date';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const searchParams = new URLSearchParams();
      searchParams.set('from', fromCity);
      searchParams.set('to', toCity);
      searchParams.set('date', date);
      searchParams.set('seats', seats);
      router.push(`/search-rides?${searchParams.toString()}`);
    }
  };

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ from?: string; to?: string; date?: string; seats?: string }>;
      if (custom?.detail) {
        if (custom.detail.from) setFromCity(custom.detail.from);
        if (custom.detail.to) setToCity(custom.detail.to);
        if (custom.detail.date) setDate(custom.detail.date);
        if (custom.detail.seats) setSeats(custom.detail.seats);
      }
    };

    window.addEventListener('prefill-search', handler as EventListener);
    return () => window.removeEventListener('prefill-search', handler as EventListener);
  }, []);

  useEffect(() => {
    if (!searchParams) {
      return;
    }

    const from = searchParams.get('from') || '';
    const to = searchParams.get('to') || '';
    const dateParam = searchParams.get('date') || '';
    const seatsParam = searchParams.get('seats') || '1';

    if (from) setFromCity(from);
    if (to) setToCity(to);
    if (dateParam) setDate(dateParam);
    if (seatsParam) setSeats(seatsParam);
  }, [searchParams]);

  return (
    <section id="ride-search" ref={ref} className="bg-gradient-to-b from-black to-gray-900 py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="section-reveal text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Find Your Perfect <span className="gradient-text">Ride</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Search from thousands of verified rides across India
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="section-reveal bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8"
          style={{ transitionDelay: '100ms' }}
        >
          <div className="grid gap-4 sm:gap-5 md:gap-6">
            {/* Row 1: From & To */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <CityInput
                  label="From"
                  placeholder="Departure city"
                  value={fromCity}
                  onChange={setFromCity}
                />
                {errors.from && <p className="text-xs text-red-500 mt-1">{errors.from}</p>}
              </div>
              <div>
                <CityInput
                  label="To"
                  placeholder="Destination city"
                  value={toCity}
                  onChange={setToCity}
                />
                {errors.to && <p className="text-xs text-red-500 mt-1">{errors.to}</p>}
              </div>
            </div>

            {/* Row 2: Date & Seats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
              <DateField
                label="Date"
                value={date}
                onChange={setDate}
                error={errors.date}
                wrapperClassName="w-full min-w-0"
                inputClassName="w-full min-w-0 bg-transparent outline-none text-sm text-gray-800 cursor-pointer"
              />

              <div className="w-full min-w-0">
                <label className="block text-xs font-semibold text-gray-700 mb-2">Passengers</label>
                <select
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  className="w-full min-w-0 px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm bg-white"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} passenger{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="btn-blue col-span-full w-full py-3.5 sm:py-4 text-white font-bold text-base sm:text-lg rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              Search Rides
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            💡 Tip: You can search for upcoming rides up to 60 days in advance
          </p>
        </form>
      </div>
    </section>
  );
}
