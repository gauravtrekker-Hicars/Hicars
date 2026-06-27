"use client";

import Link from 'next/link';
import { ArrowRight, Compass, MapPinned, ShieldCheck, Briefcase, FileText } from 'lucide-react';
import { useRef } from 'react';
import { useSectionReveal } from '../hooks/useSectionReveal';

const sitemapSections = [
  {
    title: 'Home and ride discovery',
    icon: Compass,
    links: [
      { label: 'Homepage', href: '/' },
      { label: 'Find a Ride', href: '/find-a-ride' },
      { label: 'Share a Ride', href: '/share-a-ride' },
      { label: 'Search Rides', href: '/search-rides' },
      { label: 'Popular Routes', href: '/#find-a-ride' },
    ],
  },
  {
    title: 'Support and safety',
    icon: ShieldCheck,
    links: [
      { label: 'Help Centre', href: '/help-center' },
      { label: 'Safety Tips', href: '/safety-tips' },
      { label: 'Community Guidelines', href: '/community-guidelines' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
  {
    title: 'Company and policies',
    icon: Briefcase,
    links: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Careers', href: '/careers' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Use', href: '/terms-of-use' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
    ],
  },
  {
    title: 'Other useful pages',
    icon: MapPinned,
    links: [
      { label: 'Contact Us', href: '/contact-us' },
      { label: 'Blog', href: '/blog' },
      { label: 'Price Guide', href: '/price-guide' },
      { label: 'Sitemap', href: '/sitemap' },
    ],
  },
];

export default function Sitemap() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <main ref={ref} className="min-h-screen bg-white pt-24 pb-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <section className="section-reveal text-center space-y-6">
          <span className="inline-flex items-center gap-2 bg-sky-100 border border-sky-200 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700 mx-auto">
            <FileText size={12} />
            Sitemap
          </span>
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">Find every important HIcars page in one place.</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Use this sitemap to jump to the main sections of the platform, including ride discovery, support, company pages, and policy pages.
            </p>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {sitemapSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <article key={section.title} className="section-reveal bg-white rounded-[1.75rem] p-6 shadow-sm border border-sky-100 card-hover" style={{ transitionDelay: `${index * 70}ms` }}>
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
                  <Icon size={22} />
                </div>
                <h2 className="text-xl font-black mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-sky-600 transition-colors">
                        <ArrowRight size={14} />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}