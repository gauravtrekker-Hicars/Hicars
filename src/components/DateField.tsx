"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { getEndOfYearInputDate, getTodayInputDate } from '../lib/date';

interface DateFieldProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  max?: string;
  error?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  autoFocus?: boolean;
}

export default function DateField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  error,
  wrapperClassName = '',
  inputClassName = '',
  autoFocus = false,
}: DateFieldProps) {
  const generatedId = useId();
  const fieldId = id || `date-field-${generatedId}`;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [range, setRange] = useState({ min: '', max: '' });

  useEffect(() => {
    setRange({ min: getTodayInputDate(), max: getEndOfYearInputDate() });
  }, []);

  const openDatePicker = () => {
    const input = inputRef.current;
    if (!input) return;

    if (typeof input.showPicker === 'function') {
      try {
        input.showPicker();
        return;
      } catch {
        // Some browsers block showPicker() unless it is triggered by a direct user gesture.
      }
    }

    input.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDatePicker();
    }
  };

  const minDate = min || range.min;
  const maxDate = max || range.max;

  return (
    <div className={`min-w-0 ${wrapperClassName}`}>
      <label htmlFor={fieldId} className="block text-xs font-semibold text-blue-600 mb-2">
        {label}
      </label>
      <div
        role="button"
        tabIndex={0}
        onClick={openDatePicker}
        onMouseDown={openDatePicker}
        onKeyDown={handleKeyDown}
        className={`w-full rounded-2xl border border-gray-300 bg-white transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 cursor-pointer ${error ? 'ring-2 ring-red-500' : ''}`}
      >
        <input
          id={fieldId}
          ref={inputRef}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={minDate || undefined}
          max={maxDate || undefined}
          autoFocus={autoFocus}
          className={`w-full bg-transparent px-4 py-3 text-sm text-gray-900 outline-none cursor-pointer ${inputClassName}`}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
