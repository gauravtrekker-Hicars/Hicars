'use client';

import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { defaultTestimonials, loadStoredTestimonials, type TestimonialItem } from '../data/testimonials';
import { subscribeLiveUpdate } from '../lib/liveUpdates';

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const visibleCount = 2;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );

    const revealTargets = ref.current
      ? [ref.current, ...Array.from(ref.current.querySelectorAll<HTMLElement>('.section-reveal'))]
      : [];

    revealTargets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadTestimonials = async () => {
      const items = await loadStoredTestimonials();

      if (isMounted) {
        setTestimonials(items);
      }
    };

    void loadTestimonials();

    const unsubscribe = subscribeLiveUpdate(
      { eventName: 'hicars:testimonials-updated', storageKey: 'hicars:testimonials:v2' },
      () => {
        void loadTestimonials();
      },
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
    setIsTransitionEnabled(true);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= visibleCount) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => current + 1);
    }, 8000);

    return () => window.clearInterval(intervalId);
  }, [testimonials.length]);

  const carouselTestimonials =
    testimonials.length > visibleCount
      ? [...testimonials, ...testimonials.slice(0, visibleCount)]
      : testimonials;

  const trackTranslate = `translateX(calc(-${activeIndex * 50}% - ${activeIndex * 20}px))`;

  const handleTrackTransitionEnd = () => {
    if (testimonials.length > visibleCount && activeIndex >= testimonials.length) {
      setIsTransitionEnabled(false);
      setActiveIndex(0);
      requestAnimationFrame(() => setIsTransitionEnabled(true));
    }
  };

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16 section-reveal">
          <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            Real Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Only on <span className="gradient-text">HIcars...</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
            Millions of Indians trust HIcars for their everyday journeys and extraordinary adventures.
          </p>
        </div>

        <div className="overflow-hidden">
          <div
            className={`flex gap-6 ${isTransitionEnabled ? 'transition-transform duration-500 ease-out' : ''}`}
            style={{ transform: trackTranslate }}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {carouselTestimonials.map((t, index) => (
            <div
              key={`${t.name}-${t.route}-${index}`}
                className="testimonial-card card-hover rounded-2xl p-6 shrink-0 basis-full sm:basis-[calc((100%-0.5rem)/2)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={13} className="text-sky-400 fill-sky-400" />
                    ))}
                  </div>
                  <Quote size={18} className="text-sky-300" />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-sky-100 pt-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-200"
                  />
                  <div>
                    <div className="text-sm font-bold text-gray-900">{t.name}</div>
                    <div className="text-xs text-sky-600 font-medium">{t.route}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
