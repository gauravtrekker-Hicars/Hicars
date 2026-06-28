'use client';

import Hero from '../components/Hero';
import Features from '../components/Features';
import PopularRoutes from '../components/PopularRoutes';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import AppDownload from '../components/AppDownload';
import FAQ from '../components/FAQ';

export default function Home() {
  return (
    <main className="overflow-x-hidden page-fade-in home-glow">
      <Hero />
      <Features />
      <PopularRoutes />
      <HowItWorks />
      <Testimonials />
      <AppDownload />
      <FAQ />
    </main>
  );
}
