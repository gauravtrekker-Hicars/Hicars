"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';

type InfoCard = {
  title: string;
  text: string;
};

type InfoPageProps = {
  badge: string;
  title: string;
  description: string;
  cards: InfoCard[];
  ctaHref?: string;
  ctaLabel?: string;
  extraContent?: React.ReactNode;
};

export default function InfoPage({ badge, title, description, cards, ctaHref, ctaLabel, extraContent }: InfoPageProps) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <main ref={ref} className="section-reveal page-fade-in min-h-screen bg-white pt-24 pb-16 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <section className="section-reveal text-center space-y-6">
          <span className="inline-flex items-center gap-2 bg-sky-100 border border-sky-200 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700">
            {badge}
          </span>
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">{title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
          </div>
          {ctaHref && ctaLabel && (
            <div>
              <Link href={ctaHref} className="btn-blue inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold rounded-xl text-sm">
                {ctaLabel}
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className="section-reveal bg-white rounded-[1.75rem] p-6 shadow-sm border border-sky-100 card-hover"
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <h2 className="text-xl font-black text-gray-900 mb-3">{card.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{card.text}</p>
            </article>
          ))}
        </section>

        {extraContent}
      </div>
    </main>
  );
}