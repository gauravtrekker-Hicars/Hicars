"use client";

import { useEffect, useRef } from 'react';

const stats = [
  { value: '30M+', label: 'Active Members' },
  { value: '20+', label: 'Years of Trust' },
  { value: '500+', label: 'Cities Covered' },
  { value: '₹1.2B+', label: 'Saved by Riders' },
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.2 }
    );
    ref.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="stats-bar py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="section-reveal text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl font-black text-sky-300 mb-1">{s.value}</div>
              <div className="text-sm text-white font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
