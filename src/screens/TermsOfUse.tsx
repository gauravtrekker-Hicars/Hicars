"use client";

import { FileCheck2, ShieldAlert, MessageSquare, Scale, Users, Clock3 } from 'lucide-react';
import InfoPage from '../components/InfoPage';

const cards = [
  {
    title: 'Use the service responsibly',
    text: 'Keep your account information accurate, follow local laws, and use HIcars in a respectful and lawful way.',
  },
  {
    title: 'Ride and booking rules',
    text: 'Bookings are subject to ride availability, driver confirmation, and the details shown on the platform.',
  },
  {
    title: 'Service changes',
    text: 'We may update features, routes, pricing, or availability to improve the experience and support the platform.',
  },
];

const highlights = [
  { icon: FileCheck2, title: 'Eligibility', text: 'You must provide truthful information when using the platform.' },
  { icon: Users, title: 'Community conduct', text: 'Treat other riders, drivers, and support teams with respect.' },
  { icon: ShieldAlert, title: 'Limits', text: 'We may suspend or restrict access if the terms are violated or misuse is detected.' },
  { icon: Clock3, title: 'Availability', text: 'We work to keep the service reliable but do not guarantee uninterrupted access at all times.' },
  { icon: Scale, title: 'Disputes', text: 'If a dispute arises, contact support first so we can help resolve it.' },
  { icon: MessageSquare, title: 'Need help?', text: 'Questions about these terms can be sent to hello@hicars.in.' },
];

export default function TermsOfUse() {
  return (
    <InfoPage
      badge="Terms of Use"
      title="The rules for using HIcars."
      description="These terms describe how the HIcars platform works and the expectations for riders, drivers, and visitors."
      cards={cards}
      ctaHref="/contact-us"
      ctaLabel="Contact Support"
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