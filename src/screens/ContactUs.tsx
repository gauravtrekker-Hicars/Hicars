"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Mail, MapPinned, Phone, Send, ShieldCheck, Clock3, MessageSquareMore } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';

const contactMethods = [
  {
    icon: Phone,
    label: 'Phone support',
    value: '+91 800 123 4567',
    href: 'tel:+918001234567',
    description: 'Call us for urgent booking, ride, or account questions.',
  },
  {
    icon: Mail,
    label: 'Email support',
    value: 'hello@hicars.in',
    href: 'mailto:hello@hicars.in',
    description: 'Send your detailed questions and we will reply as quickly as possible.',
  },
  {
    icon: MapPinned,
    label: 'Head office',
    value: 'New Delhi, India',
    href: '#office-details',
    description: 'Our support and operations team is based in India and works with riders nationwide.',
  },
];

const responsePoints = [
  'Support hours: 24/7 for booking help and trip safety issues.',
  'General queries are typically answered within one business day.',
  'For partnership requests, include your company name and use case.',
];

export default function ContactUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main ref={sectionRef} className="section-reveal page-fade-in min-h-screen bg-white pt-24 pb-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <section className="section-reveal grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="space-y-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 bg-sky-100 border border-sky-200 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700">
              <MessageSquareMore size={12} />
              Contact HIcars
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Reach our team with one simple message.
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                Whether you need help with a booking, want to report an issue, or are exploring a partnership, our support team is ready to help.
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
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50 opacity-75" />
            <div className="relative space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-200/60 transition-transform duration-300 group-hover:scale-105">
                  <ShieldCheck size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-sky-600 font-bold">Support center</div>
                  <div className="text-lg font-black text-gray-900">Fast, friendly, and focused</div>
                </div>
              </div>

              <div className="grid gap-4">
                {contactMethods.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-2xl bg-white/90 border border-sky-100 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
                        <item.icon size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{item.label}</div>
                        <div className="mt-1 text-base font-black text-gray-900">{item.value}</div>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-reveal grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div id="office-details" className="group bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-sky-100 transition-all duration-300 card-hover">
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              <Clock3 size={12} />
              Response guide
            </span>
            <h2 className="text-3xl font-black mb-4">What to include in your message</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              A few details help us get to the right answer faster and keep the conversation moving.
            </p>
            <div className="space-y-3">
              {responsePoints.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl bg-sky-50 border border-sky-100 p-4 text-sm text-gray-700">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400 flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <form className="group bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-sky-100 transition-all duration-300 card-hover space-y-4">
            <span className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
              <Send size={12} />
              Send a message
            </span>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Your name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-gray-200 bg-sky-50/40 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-sky-400 focus:bg-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-gray-200 bg-sky-50/40 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-sky-400 focus:bg-white"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="What is this about?"
                className="w-full rounded-2xl border border-gray-200 bg-sky-50/40 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-sky-400 focus:bg-white"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us how we can help"
                className="w-full rounded-2xl border border-gray-200 bg-sky-50/40 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-sky-400 focus:bg-white"
              />
            </div>
            <button type="button" className="btn-blue w-full px-6 py-3.5 text-white font-bold rounded-xl text-sm">
              Submit inquiry
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}