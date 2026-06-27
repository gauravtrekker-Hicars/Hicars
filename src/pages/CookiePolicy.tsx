"use client";

import { Cookie, SlidersHorizontal, ShieldCheck, Eye, Database, Smartphone } from 'lucide-react';
import InfoPage from '../components/InfoPage';

const cards = [
  {
    title: 'Why cookies help',
    text: 'Cookies help us keep you signed in, remember preferences, and understand how people use the site.',
  },
  {
    title: 'Types we may use',
    text: 'We may use essential cookies, analytics cookies, and preference cookies to improve the experience.',
  },
  {
    title: 'Control your choices',
    text: 'You can manage or clear cookies in your browser settings if you want to change how they are used.',
  },
];

const highlights = [
  { icon: Cookie, title: 'Essential cookies', text: 'Used for core site features such as navigation and session handling.' },
  { icon: SlidersHorizontal, title: 'Preferences', text: 'Remember your choices so the site feels more consistent on return visits.' },
  { icon: Database, title: 'Analytics', text: 'Help us understand which areas of the site are most useful.' },
  { icon: ShieldCheck, title: 'Security', text: 'Support basic fraud prevention and secure interactions.' },
  { icon: Eye, title: 'Your browser controls', text: 'You can manage cookie settings from the browser you use.' },
  { icon: Smartphone, title: 'Mobile devices', text: 'Cookies may also be used when you browse from a phone or tablet.' },
];

export default function CookiePolicy() {
  return (
    <InfoPage
      badge="Cookie Policy"
      title="How HIcars uses cookies and similar tools."
      description="This page explains the kinds of cookies we may use and how you can control them in your browser."
      cards={cards}
      ctaHref="/contact-us"
      ctaLabel="Contact Us"
      extraContent={
        <section className="section-reveal grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="bg-white rounded-[1.75rem] p-6 shadow-sm border border-sky-100 card-hover" style={{ transitionDelay: `${index * 60}ms` }}>
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-black mb-3">{item.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </article>
            );
          })}
        </section>
      }
    />
  );
}