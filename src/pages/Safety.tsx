"use client";

import { useRef } from 'react';
import { ShieldCheck, Users, MapPin, Smartphone } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';

const points = [
  { icon: ShieldCheck, title: 'Verified Drivers', description: 'Every driver passes identity and vehicle checks before listing rides.' },
  { icon: Users, title: 'Trusted Community', description: 'Ride with verified passengers and view reviews before you travel.' },
  { icon: MapPin, title: 'GPS Tracking', description: 'Live route tracking keeps both riders and drivers safe during the journey.' },
  { icon: Smartphone, title: '24/7 Support', description: 'Our support team is ready to help you at any time, day or night.' },
];

export default function Safety() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <main ref={ref} className="min-h-screen bg-white py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-reveal text-center mb-16">
          <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Safety First
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            The safest way to ride together with <span className="gradient-text">HIcars</span>.
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Our platform is built for safe shared travel through verified drivers, peer reviews, and real-time trip monitoring.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <article
                key={point.title}
                className="section-reveal rounded-3xl p-8 bg-white border border-sky-100 shadow-sm transition-all duration-300"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-50 text-sky-600 mb-5">
                  <Icon size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{point.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{point.description}</p>
              </article>
            );
          })}
        </div>

        <div className="section-reveal mt-16 rounded-[2rem] bg-gradient-to-r from-sky-600 to-cyan-500 p-10 text-white shadow-xl" style={{ transitionDelay: '350ms' }}>
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-black mb-4">Travel confidently every time</h2>
              <p className="text-gray-100 max-w-xl leading-relaxed">
                Every ride on HIcars is protected by our safety-first policies, verified community, and responsive support team.
              </p>
            </div>
            <button className="inline-flex items-center justify-center rounded-3xl border border-white/60 bg-white px-8 py-4 text-sm font-semibold text-sky-700 w-full lg:w-auto">
              Learn More About Safety
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
