"use client";

import { useEffect, useRef } from 'react';
import { Bell, Star, ArrowRight } from 'lucide-react';

export default function AppDownload() {
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
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-sky-700 via-sky-600 to-sky-500 rounded-3xl overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-sky-400 opacity-10 translate-x-1/3 -translate-y-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-sky-400 opacity-10 -translate-x-1/4 translate-y-1/4 blur-2xl" />

          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-12 items-center p-8 sm:p-10 lg:p-16">
            {/* Text */}
            <div className="section-reveal text-white">
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Bell size={13} className="text-sky-200" />
                <span>Available on iOS & Android</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-5">
                All Your Rides<br />
                <span className="text-sky-200">In One App</span>
              </h2>
              <p className="text-white text-base leading-relaxed mb-8 max-w-md">
                Book rides, track your driver in real-time, chat securely, and get exclusive mobile-only deals — all from the HIcars app.
              </p>

              {/* App Badges */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center gap-3 bg-white text-gray-900 rounded-xl px-5 py-3.5 hover:bg-sky-50 transition-colors shadow-lg group">
                  <div className="text-2xl">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </button>

                <button className="flex items-center gap-3 bg-white text-gray-900 rounded-xl px-5 py-3.5 hover:bg-sky-50 transition-colors shadow-lg group">
                  <div className="text-2xl">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.18 23.76A1.52 1.52 0 0 1 2 22.29V1.71A1.53 1.53 0 0 1 3.18.24l12 11.76-12 11.76zM19.56 13.95l-2.88 1.69-2.91-2.85 2.91-2.85 2.9 1.68a1.49 1.49 0 0 1 0 2.33zM6.49 22.95l9.86-5.76-2.79-2.74-7.07 8.5zM6.49 1.05l7.07 8.5 2.79-2.74-9.86-5.76z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-sky-300 fill-sky-300" />
                  ))}
                </div>
                <span className="text-white text-sm">4.8/5 from 120,000+ reviews</span>
              </div>
            </div>

            {/* Phone Mock */}
            <div className="section-reveal flex justify-center lg:justify-end" style={{ transitionDelay: '150ms' }}>
              <div className="relative animate-float">
                <div className="w-56 h-[420px] bg-gray-900 rounded-[2.5rem] border-4 border-white/20 shadow-2xl flex flex-col overflow-hidden">
                  {/* Screen */}
                  <div className="bg-sky-600 h-32 flex items-end pb-4 px-5">
                    <div>
                      <div className="text-white font-black text-base">HIcars</div>
                      <div className="text-sky-100 text-xs">Delhi → Manali</div>
                    </div>
                  </div>
                  <div className="bg-white flex-1 p-4 space-y-3">
                    {[
                      { from: 'Delhi', to: 'Shimla', price: '₹620', seats: 2 },
                      { from: 'Delhi', to: 'Manali', price: '₹850', seats: 1 },
                      { from: 'Chandigarh', to: 'Manali', price: '₹480', seats: 3 },
                    ].map((r, i) => (
                      <div key={i} className="bg-sky-50 rounded-xl p-3 border border-sky-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-xs font-bold text-gray-800">{r.from} → {r.to}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{r.seats} seat{r.seats > 1 ? 's' : ''}</div>
                          </div>
                          <div className="text-sm font-black text-sky-600">{r.price}</div>
                        </div>
                      </div>
                    ))}
                    <button className="w-full btn-blue py-3 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5">
                      Book Now <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
                {/* Glow */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-sky-400 opacity-20 blur-2xl -z-10 scale-110" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
