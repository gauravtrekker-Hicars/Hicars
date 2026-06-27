"use client";

import { useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';

export interface FilterState {
  departureTimes: string[];
  sortBy: 'price-low' | 'price-high' | 'earliest' | 'latest' | 'shortest';
  safetyRating: number | null;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  resultCount: number;
}

const departureTimeRanges = [
  { id: 'early', label: 'Before 6:00 AM', value: 'early' },
  { id: 'morning', label: '6:00 AM - 12:00 PM', value: 'morning' },
  { id: 'afternoon', label: '12:00 PM - 6:00 PM', value: 'afternoon' },
  { id: 'evening', label: 'After 6:00 PM', value: 'evening' },
];

const sortOptions = [
  { id: 'price-low', label: 'Lowest Price', icon: '₹' },
  { id: 'earliest', label: 'Earliest Departure', icon: '🕐' },
  { id: 'shortest', label: 'Shortest Duration', icon: '⏱️' },
  { id: 'latest', label: 'Latest Departure', icon: '🌙' },
];

const safetyRatings = [
  { id: 4.5, label: '4.5+ Rated', count: 15 },
  { id: 4.7, label: '4.7+ Rated', count: 10 },
  { id: 4.8, label: '4.8+ Rated', count: 6 },
  { id: 5.0, label: '5.0 Rated', count: 2 },
];

export default function FilterSidebar({ filters, onFilterChange, resultCount }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    sort: true,
    departure: true,
    safety: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleDepartureTimeChange = (value: string) => {
    const updated = filters.departureTimes.includes(value)
      ? filters.departureTimes.filter((t) => t !== value)
      : [...filters.departureTimes, value];
    onFilterChange({ ...filters, departureTimes: updated });
  };

  const handleSortChange = (sortOption: FilterState['sortBy']) => {
    onFilterChange({ ...filters, sortBy: sortOption });
  };

  const handleSafetyChange = (rating: number | null) => {
    onFilterChange({ ...filters, safetyRating: filters.safetyRating === rating ? null : rating });
  };

  const handleClearFilters = () => {
    onFilterChange({
      departureTimes: [],
      sortBy: 'earliest',
      safetyRating: null,
    });
  };

  return (
    <div className="w-full md:w-72 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-black text-gray-900">Filters</h3>
        <button
          onClick={handleClearFilters}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Sort By */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('sort')}
          className="flex items-center justify-between w-full mb-4 group"
        >
          <h4 className="font-bold text-gray-900 text-sm">Sort By</h4>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform ${expandedSections.sort ? 'rotate-180' : ''}`}
          />
        </button>

        {expandedSections.sort && (
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="sort"
                  value={option.id}
                  checked={filters.sortBy === option.id}
                  onChange={(e) => handleSortChange(e.target.value as FilterState['sortBy'])}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{option.icon} {option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Departure Time */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <button
          onClick={() => toggleSection('departure')}
          className="flex items-center justify-between w-full mb-4 group"
        >
          <h4 className="font-bold text-gray-900 text-sm">Departure Time</h4>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform ${expandedSections.departure ? 'rotate-180' : ''}`}
          />
        </button>

        {expandedSections.departure && (
          <div className="space-y-2">
            {departureTimeRanges.map((range) => (
              <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.departureTimes.includes(range.value)}
                  onChange={() => handleDepartureTimeChange(range.value)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Safety & Ratings */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('safety')}
          className="flex items-center justify-between w-full mb-4 group"
        >
          <h4 className="font-bold text-gray-900 text-sm">Driver Rating</h4>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform ${expandedSections.safety ? 'rotate-180' : ''}`}
          />
        </button>

        {expandedSections.safety && (
          <div className="space-y-2">
            {safetyRatings.map((rating) => (
              <label key={rating.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.safetyRating === rating.id}
                  onChange={() => handleSafetyChange(rating.id as number)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <div className="flex items-center gap-1 flex-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < Math.floor(rating.id as number) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-700 ml-1">{rating.label}</span>
                </div>
                <span className="text-xs text-gray-500">{rating.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-600">
          Found <span className="font-bold text-gray-900">{resultCount}</span> rides
        </p>
      </div>
    </div>
  );
}
