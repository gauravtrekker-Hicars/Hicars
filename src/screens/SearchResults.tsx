"use client";

import { useRef, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MapPin, Calendar, Users, X } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';
import { RideCard, getRidesBySearch } from '../components/RideCard';
import FilterSidebar, { FilterState } from '../components/FilterSidebar';
import DateField from '../components/DateField';
import { getTodayInputDate } from '../lib/date';

export default function SearchResults() {
  const ref = useRef<HTMLDivElement>(null);
  useSectionReveal(ref);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editFrom, setEditFrom] = useState(searchParams?.get('from') || '');
  const [editTo, setEditTo] = useState(searchParams?.get('to') || '');
  const [editDate, setEditDate] = useState(searchParams?.get('date') || getTodayInputDate());
  const [editSeats, setEditSeats] = useState(searchParams?.get('seats') || '1');

  const [filters, setFilters] = useState<FilterState>({
    departureTimes: [],
    sortBy: 'earliest',
    safetyRating: null,
  });

  const from = searchParams?.get('from') || '';
  const to = searchParams?.get('to') || '';
  const date = searchParams?.get('date') || '';
  const seats = parseInt(searchParams?.get('seats') || '1', 10);

  const allRides = useMemo(() => getRidesBySearch(from, to, date, seats), [from, to, date, seats]);

  const handleShowRides = () => {
    if (editFrom && editTo && editDate) {
      const params = new URLSearchParams();
      params.set('from', editFrom);
      params.set('to', editTo);
      params.set('date', editDate);
      params.set('seats', editSeats);
      router.replace(`/search-rides?${params.toString()}`);
      setEditingField(null);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    if (field === 'from') setEditFrom(value);
    else if (field === 'to') setEditTo(value);
    else if (field === 'date') setEditDate(value);
    else if (field === 'seats') setEditSeats(value);
  };

  // Apply filters
  const filteredRides = useMemo(() => {
    let result = [...allRides];

    // Filter by departure time
    if (filters.departureTimes.length > 0) {
      result = result.filter((ride) => {
        const hour = parseInt(ride.departureTime.split(':')[0], 10);
        const isPM = ride.departureTime.includes('PM');
        const militaryHour = isPM && hour !== 12 ? hour + 12 : hour;

        if (filters.departureTimes.includes('early') && militaryHour < 6) return true;
        if (filters.departureTimes.includes('morning') && militaryHour >= 6 && militaryHour < 12) return true;
        if (filters.departureTimes.includes('afternoon') && militaryHour >= 12 && militaryHour < 18) return true;
        if (filters.departureTimes.includes('evening') && militaryHour >= 18) return true;
        return false;
      });
    }

    // Filter by safety rating
    if (filters.safetyRating !== null) {
      result = result.filter((ride) => ride.rating >= filters.safetyRating!);
    }

    // Sort rides
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.pricePerSeat - b.pricePerSeat);
        break;
      case 'price-high':
        result.sort((a, b) => b.pricePerSeat - a.pricePerSeat);
        break;
      case 'latest': {
        result.sort((a, b) => {
          const timeA = parseInt(a.departureTime.split(':')[0], 10);
          const timeB = parseInt(b.departureTime.split(':')[0], 10);
          return timeB - timeA;
        });
        break;
      }
      case 'shortest': {
        result.sort((a, b) => {
          const durationA = parseInt(a.duration.split('h')[0], 10);
          const durationB = parseInt(b.duration.split('h')[0], 10);
          return durationA - durationB;
        });
        break;
      }
      case 'earliest':
      default: {
        result.sort((a, b) => {
          const timeA = parseInt(a.departureTime.split(':')[0], 10);
          const timeB = parseInt(b.departureTime.split(':')[0], 10);
          return timeA - timeB;
        });
        break;
      }
    }

    return result;
  }, [allRides, filters]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${Number(day)} ${new Date(`${year}-${month}-${day}`).toLocaleString('en-IN', { month: 'short' })}`;
  };

  return (
    <main ref={ref} className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="section-reveal mb-8">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[repeat(5,_minmax(0,1fr))] gap-3">
              {/* From */}
              {editingField === 'from' ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    value={editFrom}
                    onChange={(e) => handleFieldChange('from', e.target.value)}
                    autoFocus
                    className="w-full px-4 py-3 border border-blue-500 rounded-2xl focus:outline-none text-sm font-semibold"
                    placeholder="Search city"
                  />
                  <button
                    onClick={() => setEditingField(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={16} className="text-gray-600" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditFrom(from);
                    setEditingField('from');
                  }}
                  className="flex flex-col items-start gap-1 p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors group min-w-0 w-full"
                >
                  <span className="text-xs text-gray-600 group-hover:text-gray-700">From</span>
                  <span className="text-sm text-gray-900 truncate">{from || 'Select departure city'}</span>
                </button>
              )}

              {/* To */}
              {editingField === 'to' ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    value={editTo}
                    onChange={(e) => handleFieldChange('to', e.target.value)}
                    autoFocus
                    className="w-full px-4 py-3 border border-blue-500 rounded-2xl focus:outline-none text-sm font-semibold"
                    placeholder="Search city"
                  />
                  <button
                    onClick={() => setEditingField(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={16} className="text-gray-600" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditTo(to);
                    setEditingField('to');
                  }}
                  className="flex flex-col items-start gap-1 p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors group min-w-0 w-full"
                >
                  <span className="text-xs text-gray-600 group-hover:text-gray-700">To</span>
                  <span className="text-sm text-gray-900 truncate">{to || 'Select destination city'}</span>
                </button>
              )}

              {/* Date */}
              {editingField === 'date' ? (
                <div className="flex items-center gap-2 w-full">
                  <DateField
                    label="Date"
                    value={editDate}
                    onChange={(value) => handleFieldChange('date', value)}
                    wrapperClassName="flex-1"
                    inputClassName="w-full px-4 py-3 border border-blue-500 rounded-2xl focus:outline-none text-sm font-semibold cursor-pointer"
                    autoFocus
                  />
                  <button
                    onClick={() => setEditingField(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={16} className="text-gray-600" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditDate(date);
                    setEditingField('date');
                  }}
                  className="flex flex-col items-start gap-1 p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors group min-w-0 w-full"
                >
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-blue-600" />
                    <span className="text-xs text-gray-600 group-hover:text-gray-700">Date</span>
                  </div>
                  <span className="text-sm text-gray-900 truncate">{date ? formatDate(date) : 'Select travel date'}</span>
                </button>
              )}

              {/* Passengers */}
              {editingField === 'seats' ? (
                <div className="flex items-center gap-2 w-full">
                  <select
                    value={editSeats}
                    onChange={(e) => handleFieldChange('seats', e.target.value)}
                    autoFocus
                    className="w-full px-4 py-3 border border-blue-500 rounded-2xl focus:outline-none text-sm font-semibold bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setEditingField(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={16} className="text-gray-600" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditSeats(String(seats));
                    setEditingField('seats');
                  }}
                  className="flex flex-col items-start gap-1 p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors group min-w-0 w-full"
                >
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-blue-600" />
                    <span className="text-xs text-gray-600 group-hover:text-gray-700">Passengers</span>
                  </div>
                  <span className="text-sm text-gray-900 truncate">{seats} {seats === 1 ? 'passenger' : 'passengers'}</span>
                </button>
              )}

              {/* Show Rides Button */}
              <button
                onClick={handleShowRides}
                className="btn-blue px-6 py-4 text-white font-bold rounded-2xl whitespace-nowrap w-full xl:w-auto"
              >
                Show Rides
              </button>
            </div>
          </div>
        </div>

        {/* Results Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar filters={filters} onFilterChange={setFilters} resultCount={filteredRides.length} />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {filteredRides.length > 0 ? (
              <div>
                <div className="section-reveal mb-6" style={{ transitionDelay: '100ms' }}>
                  <p className="text-sm text-gray-600">
                    Found <span className="font-bold text-gray-900">{filteredRides.length}</span> available rides
                  </p>
                </div>

                <div className="space-y-4">
                  {filteredRides.map((ride, index) => (
                    <div key={ride.id} style={{ transitionDelay: `${(index + 2) * 80}ms` }}>
                      <RideCard ride={ride} selectedSeats={seats} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="section-reveal text-center py-16 bg-white rounded-2xl border border-gray-200">
                <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-black text-gray-900 mb-2">No rides found</h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  Sorry, there are no available rides matching your filters. Try adjusting your search criteria.
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      departureTimes: [],
                      sortBy: 'earliest',
                      safetyRating: null,
                    });
                  }}
                  className="btn-blue px-8 py-3 text-white font-semibold rounded-xl inline-block"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
