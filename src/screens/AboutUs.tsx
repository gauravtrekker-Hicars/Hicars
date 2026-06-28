"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { Car, Clock3, ShieldCheck, Sparkles, Users, MapPinned } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';

const highlights = [
  { value: '2026', label: 'Built for India today' },
  { value: '10K+', label: 'Community journeys enabled' },
  { value: '24/7', label: 'Ride discovery and support' },
  { value: '100%', label: 'Focused on shared mobility' },
];

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust first',
    text: 'We design every feature around verified profiles, clear ride details, and safer trip coordination.',
  },
  {
    icon: Users,
    title: 'People over platform',
    text: 'HIcars is built to help commuters, drivers, and communities share the road with confidence.',
  },
  {
    icon: MapPinned,
    title: 'India-wide reach',
    text: 'From metro commutes to highway trips, we focus on routes that matter to everyday travellers.',
  },
  {
    icon: Sparkles,
    title: 'Simple by design',
    text: 'We keep the experience clean, fast, and straightforward so anyone can start sharing rides quickly.',
  },
];

const milestones = [
  {
    year: '2026',
    title: 'Company focus',
    text: 'HIcars is positioned in 2026 as a modern Indian carpooling brand for passengers and drivers.',
  },
  {
    year: 'Now',
    title: 'Community growth',
    text: 'We are expanding route coverage, improving matching, and making shared travel feel more natural every day.',
  },
  {
    year: 'Next',
    title: 'Smarter travel',
    text: 'We are building toward better route discovery, stronger safety signals, and richer trip planning tools.',
  },
];

const leaders = [
  {
    name: 'Gaurav Singh',
    role: 'CEO and Co-founder',
    bio: 'Gaurav Singh is helping shape HIcars into a trusted shared-mobility brand focused on safer journeys, smoother ride discovery, and a better travel experience across India.',
    image: '/gaurav-singh.jpg',
    alt: 'Gaurav Singh',
    isImage: true,
    imagePosition: 'center top',
  },
  {
    name: 'Suneel',
    role: 'CTO and Co-founder',
    bio: 'Suneel is leading the technical vision at HIcars, focusing on product reliability, platform performance, and the systems that keep shared travel running smoothly.',
    image: '/suneel.jpg',
    alt: 'Suneel',
    isImage: true,
    imagePosition: 'center 15%',
  },
  {
    name: 'Pooja Jyala',
    role: 'COO and Co-founder',
    bio: 'Pooja Jyala is guiding HIcars operations with a focus on execution, customer experience, and building a dependable carpooling journey for every rider.',
    image: '/pooja-jyala.jpg',
    alt: 'Pooja Jyala',
    initials: 'PJ',
    isImage: true,
    imagePosition: 'center 8%',
  },
];

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef);

  return (
    <main ref={sectionRef} className="section-reveal page-fade-in min-h-screen bg-white pt-24 pb-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <section className="section-reveal grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 bg-sky-100 border border-sky-200 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700">
              <Car size={12} />
              About HIcars
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Shared mobility for India, built in 2026.
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                HIcars is a 2026 company focused on making carpooling feel easy, trustworthy, and useful for daily commuters and longer road trips.
                We connect people who want to travel better, spend less, and share the road with more confidence.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/find-a-ride" className="btn-blue px-6 py-3.5 text-white font-bold rounded-xl text-sm text-center">
                Find a Ride
              </Link>
              <Link href="/share-a-ride" className="inline-flex items-center justify-center rounded-xl border border-sky-200 bg-sky-50 px-6 py-3.5 text-sm font-bold text-sky-700 transition-colors hover:bg-sky-100">
                Share a Ride
              </Link>
            </div>
          </div>

          <div className="group bg-white rounded-[2rem] border border-sky-100 shadow-sm p-6 sm:p-8 relative overflow-hidden transition-all duration-300 card-hover animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50 opacity-70" />
            <div className="relative space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src="/logo4.png"
                  alt="HIcars logo"
                  className="w-12 h-12 rounded-full object-contain shadow-lg shadow-sky-200/60 transition-transform duration-300 group-hover:scale-105"
                />
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-sky-600 font-bold">HIcars Technologies Pvt. Ltd.</div>
                  <div className="text-lg font-black text-gray-900">India-first carpooling</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/90 border border-sky-100 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="text-2xl font-black text-gray-900 mb-1">{item.value}</div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-gray-950 text-white p-5">
                <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-widest mb-3">
                  <Clock3 size={12} />
                  Company statement
                </div>
                <p className="text-sm leading-relaxed text-gray-300">
                  In 2026, HIcars is building a modern ride-sharing experience that helps more people travel together safely, affordably, and sustainably across India.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-reveal">
          <div className="bg-white rounded-[2rem] border border-sky-100 shadow-sm p-6 sm:p-8 card-hover">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <span className="inline-flex items-center gap-2 bg-sky-100 border border-sky-200 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700 mb-4">
                <Car size={12} />
                Meet the Minds behind HIcars
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                Leadership that is building HIcars for 2026 and beyond.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
              {leaders.map((leader) => (
                <div key={leader.name} className="group w-full rounded-[2rem] bg-gradient-to-br from-sky-50 via-white to-blue-50 border border-sky-100 p-6 sm:p-8 transition-all duration-300 card-hover">
                  <div className="mx-auto mb-5 h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-xl ring-4 ring-sky-100 transition-transform duration-300 group-hover:scale-105 relative bg-white flex items-center justify-center">
                    {leader.isImage ? (
                      <img
                        src={leader.image}
                        alt={leader.alt}
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ objectPosition: leader.imagePosition }}
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-sky-500 via-sky-400 to-cyan-400 flex items-center justify-center text-5xl font-black text-white">
                        {leader.initials}
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-gray-900">{leader.name}</h3>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                      {leader.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-gray-600">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-reveal grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {values.map((item) => (
            <article key={item.title} className="group bg-white rounded-[2rem] p-6 shadow-sm border border-sky-100 transition-all duration-300 card-hover" style={{ transitionDelay: '0ms' }}>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <item.icon size={22} />
              </div>
              <h2 className="text-xl font-black mb-3">{item.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="section-reveal grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="group bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-sky-100 transition-all duration-300 card-hover">
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              <Sparkles size={12} />
              Our story
            </span>
            <h2 className="text-3xl font-black mb-4">Why HIcars exists</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Shared travel works best when it is dependable, easy to understand, and designed for the realities of Indian roads.
              HIcars brings those pieces together in one place, so travelers can search, share, and move with less friction.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We care about reducing empty seats, lowering travel cost, and making everyday mobility feel more connected in 2026 and beyond.
            </p>
          </div>

          <div className="space-y-4">
            {milestones.map((item, index) => (
              <div key={item.title} className="group bg-white rounded-[1.75rem] p-5 shadow-sm border border-sky-100 flex gap-4 transition-all duration-300 card-hover">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-black transition-transform duration-300 group-hover:scale-105">
                  {index + 1}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-sky-600 mb-1">{item.year}</div>
                  <h3 className="text-lg font-black mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}