"use client";

import { useEffect, useRef } from 'react';
import { MapPin, Shield, Leaf, Smartphone } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Travel Everywhere',
    desc: 'Explore India end-to-end — from the Himalayan foothills to coastal beaches — with thousands of daily carpool routes.',
    color: 'bg-sky-50 text-sky-600',
    border: 'border-sky-200',
  },
  {
    icon: Shield,
    title: 'Ride with Confidence',
    desc: 'Every member has a verified profile with reviews, ratings, and ID checks — so you always know who you\'re riding with.',
    color: 'bg-sky-50 text-sky-600',
    border: 'border-sky-200',
  },
  {
    icon: Leaf,
    title: 'Prices Like Nowhere',
    desc: 'Share fuel and toll costs to save significantly over trains and buses. Great value for both passengers and drivers.',
    color: 'bg-sky-50 text-sky-600',
    border: 'border-sky-200',
  },
  {
    icon: Smartphone,
    title: 'Instant Booking',
    desc: 'Book in seconds via app or web. Real-time notifications keep you updated every step of your journey.',
    color: 'bg-sky-50 text-sky-600',
    border: 'border-sky-200',
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-sky-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16 section-reveal">
          <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Why HIcars
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Only on <span className="gradient-text">HIcars...</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
            We've built the most trusted carpooling network across India, so every ride feels safe, fair, and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`section-reveal card-hover bg-white rounded-2xl p-7 border ${f.border} flex flex-col gap-4`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.color}`}>
                <f.icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
