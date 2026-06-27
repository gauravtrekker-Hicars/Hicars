'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { loadStoredPopularRoutes, type PopularRouteItem } from '../data/routes';
import { subscribeLiveUpdate } from '../lib/liveUpdates';

export default function PopularRoutes() {
  const ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [routes, setRoutes] = useState<PopularRouteItem[]>(() => loadStoredPopularRoutes());
  const [showAllRoutes, setShowAllRoutes] = useState(false);
  const [columnCount, setColumnCount] = useState(1);
  const [collapsedMaxHeight, setCollapsedMaxHeight] = useState<string>('0px');

  const getToday = () => new Date().toISOString().split('T')[0];

  const openRouteSearch = (from: string, to: string, seats: number) => {
    const params = new URLSearchParams();
    params.set('from', from);
    params.set('to', to);
    params.set('date', getToday());
    params.set('seats', String(seats));
    router.push(`/search-rides?${params.toString()}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );

    const handleUpdate = () => setRoutes(loadStoredPopularRoutes());
    const unsubscribe = subscribeLiveUpdate(
      { eventName: 'hicars:routes-updated', storageKey: 'hicars:popular-routes' },
      handleUpdate,
    );

    const revealTargets = ref.current
      ? [ref.current, ...Array.from(ref.current.querySelectorAll<HTMLElement>('.section-reveal'))]
      : [];

    revealTargets.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, []);

  useLayoutEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;

      if (width >= 768) {
        setColumnCount(2);
        return;
      }

      if (width >= 640) {
        setColumnCount(2);
        return;
      }

      setColumnCount(1);
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);

    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    const firstCard = firstCardRef.current;

    if (!grid || !firstCard) {
      return;
    }

    const updateCollapsedHeight = () => {
      const rowGap = Number.parseFloat(window.getComputedStyle(grid).rowGap || '0') || 0;
      const cardHeight = firstCard.getBoundingClientRect().height;
      setCollapsedMaxHeight(`${(cardHeight * 3) + (rowGap * 2)}px`);
    };

    updateCollapsedHeight();

    const observer = new ResizeObserver(updateCollapsedHeight);
    observer.observe(grid);
    observer.observe(firstCard);

    window.addEventListener('resize', updateCollapsedHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateCollapsedHeight);
    };
  }, [routes.length, columnCount]);

  const showToggle = routes.length > columnCount * 3;

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-white" id="find-a-ride">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 section-reveal">
          <div className="relative w-full">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-sky-50 flex items-center justify-center shadow-sm">
                <TrendingUp size={20} className="text-sky-600" />
              </div>
              <h2 className="text-4xl font-black text-gray-900">
                Top Carpool Routes
              </h2>
            </div>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 overflow-hidden transition-[max-height] duration-300 ease-out"
          style={{ maxHeight: showAllRoutes ? 'none' : collapsedMaxHeight }}
        >
          {routes.map((r, i) => (
            <button
              ref={i === 0 ? firstCardRef : undefined}
              key={`${r.from}-${r.to}`}
              type="button"
              onClick={() => openRouteSearch(r.from, r.to, r.seats)}
              className="section-reveal card-hover bg-white border border-gray-100 rounded-2xl p-5 cursor-pointer group shadow-sm hover:border-sky-300 text-left min-h-[156px]"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-bold text-gray-900 text-sm truncate">{r.from}</span>
                  <div className="flex-shrink-0 text-gray-300">
                    <ArrowRight size={13} className="group-hover:text-sky-500 transition-colors" />
                  </div>
                  <span className="font-bold text-gray-900 text-sm truncate">{r.to}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-black text-sky-600">{r.price}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{r.time} • {r.seats} seat{r.seats > 1 ? 's' : ''}</div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                  <ArrowRight size={15} className="text-sky-600" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {showToggle && (
          <div className="mt-8 flex justify-center section-reveal">
            <button
              type="button"
              onClick={() => setShowAllRoutes((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-5 py-3 text-sm font-bold text-sky-700 transition-colors hover:bg-sky-100"
            >
              {showAllRoutes ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
