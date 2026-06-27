'use client';

import { useRef } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import PopularRoutes from '../components/PopularRoutes';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import AppDownload from '../components/AppDownload';
import FAQ from '../components/FAQ';
import { useSectionReveal } from '../hooks/useSectionReveal';

export default function Home() {
  const homeRef = useRef<HTMLElement | null>(null);
  useSectionReveal(homeRef);

  return (
    <main ref={homeRef} className="overflow-x-hidden">
      <div className="section-reveal">
        <Hero />
      </div>
      <div className="section-reveal">
        <Features />
      </div>
      <div className="section-reveal">
        <PopularRoutes />
      </div>
      <div className="section-reveal">
        <HowItWorks />
      </div>
      <div className="section-reveal">
        <Testimonials />
      </div>
      <div className="section-reveal">
        <AppDownload />
      </div>
      <div className="section-reveal">
        <FAQ />
      </div>
    </main>
  );
}
