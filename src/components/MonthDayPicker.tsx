"use client";

import { useEffect, useRef, useState } from 'react';

interface MonthDayPickerProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  placeholder?: string;
  label?: string;
}

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const parsePlainDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

const pad = (value: number) => String(value).padStart(2, '0');

const normalizeIso = (value: string) => {
  const date = parsePlainDate(value);
  if (!date) return '';
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

export default function MonthDayPicker({ value, onChange, min, max, placeholder = 'Select date', label }: MonthDayPickerProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    const selected = parsePlainDate(value);
    return selected || new Date();
  });

  useEffect(() => {
    const selected = parsePlainDate(value);
    if (selected) {
      setViewDate(selected);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedDate = parsePlainDate(value);
  const today = new Date();
  const viewYear = viewDate.getFullYear();
  const minDate = parsePlainDate(min || `${viewYear}-01-01`) || new Date(viewYear, 0, 1);
  const maxDate = parsePlainDate(max || `${viewYear}-12-31`) || new Date(viewYear, 11, 31);

  const monthStart = new Date(viewYear, viewDate.getMonth(), 1);
  const monthName = monthStart.toLocaleString('en-GB', { month: 'long' });

  const daysInMonth = new Date(viewYear, viewDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = monthStart.getDay();

  const monthBefore = new Date(viewYear, viewDate.getMonth() - 1, 1);
  const monthAfter = new Date(viewYear, viewDate.getMonth() + 1, 1);

  const canGoBack = monthBefore >= new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const canGoForward = monthAfter <= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

  const isDateValid = (day: number) => {
    const candidate = new Date(viewYear, viewDate.getMonth(), day);
    return candidate >= minDate && candidate <= maxDate;
  };

  const handleDaySelect = (day: number) => {
    const iso = `${viewYear}-${pad(viewDate.getMonth() + 1)}-${pad(day)}`;
    onChange(iso);
    setOpen(false);
  };

  const displayValue = selectedDate
    ? selectedDate.getDate() === today.getDate() && selectedDate.getMonth() === today.getMonth()
      ? 'Today'
      : `${selectedDate.getDate()} ${selectedDate.toLocaleString('en-GB', { month: 'short' })}`
    : placeholder;

  return (
    <div className="relative inline-block text-left" ref={wrapperRef}>
      {label && <label className="block text-xs font-semibold text-gray-700 mb-2">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="w-full text-left rounded-2xl border border-gray-300 bg-white px-4 py-3 shadow-sm text-sm text-gray-800 transition-colors hover:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <span className={selectedDate ? 'text-gray-900' : 'text-gray-400'}>{displayValue}</span>
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-2 w-[320px] rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => canGoBack && setViewDate(new Date(viewYear, viewDate.getMonth() - 1, 1))}
              disabled={!canGoBack}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ‹
            </button>
            <div className="text-center text-lg font-bold text-slate-900">{monthName}</div>
            <button
              type="button"
              onClick={() => canGoForward && setViewDate(new Date(viewYear, viewDate.getMonth() + 1, 1))}
              disabled={!canGoForward}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ›
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-[11px] font-semibold uppercase text-slate-500 mb-2">
            {WEEK_DAYS.map((day) => (
              <div key={day} className="text-center">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDayIndex }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1;
              const iso = `${viewYear}-${pad(viewDate.getMonth() + 1)}-${pad(day)}`;
              const selected = selectedDate?.toISOString().slice(0, 10) === iso;
              const valid = isDateValid(day);

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={!valid}
                  onClick={() => handleDaySelect(day)}
                  className={`h-10 rounded-2xl text-sm font-semibold transition ${
                    selected
                      ? 'bg-sky-600 text-white'
                      : valid
                      ? 'bg-slate-50 text-slate-900 hover:bg-slate-100'
                      : 'bg-transparent text-slate-300 cursor-not-allowed'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
