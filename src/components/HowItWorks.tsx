"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, CreditCard, Car, CheckCircle } from 'lucide-react';

const passengerSteps = [
  { icon: Search, step: '01', title: 'Search Your Route', desc: 'Enter your from & to city, travel date and number of seats needed.' },
  { icon: CheckCircle, step: '02', title: 'Pick Your Ride', desc: 'Browse verified drivers, read reviews, and choose the ride that suits you.' },
  { icon: CreditCard, step: '03', title: 'Book (Pay After Ride)', desc: 'Confirm your seat — payment is collected after the ride is completed.' },
  { icon: Car, step: '04', title: 'Enjoy the Journey', desc: 'Meet your driver at the pickup point and enjoy a comfortable, shared ride.' },
];

const driverSteps = [
  { icon: Car, step: '01', title: 'Publish Your Ride', desc: 'Enter your route, departure time, available seats, and price per seat.' },
  { icon: CheckCircle, step: '02', title: 'Accept Passengers', desc: 'Review passenger profiles and choose auto-accept or manual approval.' },
  { icon: CreditCard, step: '03', title: 'Travel Together', desc: 'Pick up your passengers and split fuel & toll costs comfortably.' },
  { icon: Search, step: '04', title: 'Get Paid', desc: 'Earnings land in your account after the ride is completed. Simple!' },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16 section-reveal">
          <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            How <span className="gradient-text">HIcars</span> Works
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
            Whether you&apos;re a passenger or a driver, getting started takes less than 2 minutes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Passenger */}
          <div className="section-reveal">
            <div className="bg-gray-50 rounded-2xl p-8 border border-sky-200 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center">
                  <Search size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">For Passengers</h3>
                  <p className="text-xs text-gray-400">Find and book a ride</p>
                </div>
              </div>
              <div className="space-y-6">
                {passengerSteps.map((s, i) => (
                  <div key={s.step} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 border-2 border-sky-300 flex items-center justify-center">
                        <span className="text-xs font-black text-sky-600">{s.step}</span>
                      </div>
                      {i < passengerSteps.length - 1 && (
                        <div className="w-0.5 h-8 bg-sky-200 mt-1" />
                      )}
                    </div>
                    <div className="pt-1.5">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{s.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/find-a-ride" className="btn-blue mt-8 w-full py-3.5 text-white font-bold rounded-xl inline-flex items-center justify-center">
                Find a Ride Now
              </Link>
              <p className="text-xs text-gray-400 mt-3">Payment is collected after the ride is completed.</p>
            </div>
          </div>

          {/* Driver */}
          <div className="section-reveal" style={{ transitionDelay: '150ms' }}>
            <div className="bg-gray-50 rounded-2xl p-8 border border-sky-200 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center">
                  <Car size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">For Drivers</h3>
                  <p className="text-xs text-gray-400">Share your ride & earn</p>
                </div>
              </div>
              <div className="space-y-6">
                {driverSteps.map((s, i) => (
                  <div key={s.step} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 border-2 border-sky-300 flex items-center justify-center">
                        <span className="text-xs font-black text-sky-600">{s.step}</span>
                      </div>
                      {i < driverSteps.length - 1 && (
                        <div className="w-0.5 h-8 bg-sky-200 mt-1" />
                      )}
                    </div>
                    <div className="pt-1.5">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{s.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/share-a-ride" className="btn-blue mt-8 w-full py-3.5 text-white font-bold rounded-xl inline-flex items-center justify-center">
                Publish a Ride
              </Link>
              <p className="text-xs text-gray-400 mt-6">Drivers receive earnings after the ride is completed.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
