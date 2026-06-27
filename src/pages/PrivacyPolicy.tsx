"use client";

import { ShieldCheck, Lock, FileText, Eye, Database, Mail } from 'lucide-react';
import InfoPage from '../components/InfoPage';

const cards = [
  {
    title: 'Information we collect',
    text: 'We collect the details you share when you create an account, search for rides, submit forms, or contact support.',
  },
  {
    title: 'How we use data',
    text: 'We use information to run the platform, match rides, improve safety, and respond to support requests.',
  },
  {
    title: 'How we protect it',
    text: 'We use access controls, security reviews, and internal processes to protect data from unauthorized access.',
  },
];

const highlights = [
  { icon: ShieldCheck, title: 'User trust', text: 'We keep privacy practices focused on transparency and responsible handling.' },
  { icon: Lock, title: 'Secure handling', text: 'Sensitive information is handled with safeguards appropriate to the service.' },
  { icon: Database, title: 'Data retention', text: 'We retain information only as long as needed for operations, support, and compliance.' },
  { icon: Eye, title: 'Your choices', text: 'You can contact us to ask about access, correction, or deletion requests where applicable.' },
  { icon: Mail, title: 'Questions', text: 'Write to hello@hicars.in if you have questions about how your information is used.' },
  { icon: FileText, title: 'Policy updates', text: 'We may update this policy from time to time and post the latest version here.' },
];

export default function PrivacyPolicy() {
  return (
    <InfoPage
      badge="Privacy Policy"
      title="How HIcars handles your information."
      description="This page explains what we collect, how we use it, and the basic steps we take to protect your data on HIcars."
      cards={cards}
      ctaHref="/contact-us"
      ctaLabel="Contact Privacy Support"
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