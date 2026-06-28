"use client";

import { Suspense, useRef } from 'react';
import { Search, MapPin, Clock4, ShieldCheck } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';
import RideSearch from '../components/RideSearch';

const steps = [
  { icon: Search, title: 'Search & Compare', description: 'Type your route, travel date, and budget. Compare verified rides instantly.' },
  { icon: MapPin, title: 'Choose Your Pickup', description: 'Select the most convenient pickup and drop-off points near you.' },
  { icon: Clock4, title: 'Confirm in Seconds', description: 'Book a seat securely and get instant trip confirmation from the driver.' },
  { icon: ShieldCheck, title: 'Travel with Confidence', description: 'Ride with verified drivers, GPS tracking, and in-app support.' },
];

export default function FindARide() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  const handleSearchCTA = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main ref={ref} className="section-reveal min-h-screen bg-white">
      <Suspense fallback={null}>
        <RideSearch />
      </Suspense>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="section-reveal text-center mb-16">
          <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Find a Ride
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Search routes, compare drivers, and book a safe shared ride with <span className="gradient-text">HIcars</span>.
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Choose from verified drivers, affordable seat prices, and flexible boarding points for every journey across India.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="section-reveal bg-white rounded-3xl p-8 shadow-sm border border-sky-100 transition-all duration-300"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-50 text-sky-600 mb-5">
                  <Icon size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </article>
            );
          })}
        </div>

        <div className="section-reveal mt-16 rounded-[2rem] bg-gradient-to-r from-sky-600 to-blue-600 p-10 text-white shadow-xl" style={{ transitionDelay: '350ms' }}>
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-black mb-4">Ready to book your next ride?</h2>
              <p className="text-gray-100 max-w-xl leading-relaxed">
                Start your search now and let HIcars connect you with the best shared rides for your route, schedule, and comfort.
              </p>
            </div>
            <button
              type="button"
              onClick={handleSearchCTA}
              className="btn-blue w-full lg:w-auto px-8 py-4 text-white text-sm font-semibold rounded-3xl"
            >
              Search Available Rides
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
