"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'How do I book a carpool ride on HIcars?',
    a: 'Booking is simple! Search for your route on our app or website, pick a date, choose a ride that suits you, and confirm your seat with a secure payment. Some rides are instantly bookable, while others need driver approval — either way, it\'s fast and straightforward.',
  },
  {
    q: 'How do I publish a ride as a driver?',
    a: 'To offer a carpool, go to "Share a Ride," enter your departure city, destination, date, available seats, and price per seat. Choose whether to auto-accept passengers or approve manually, then publish your ride. Done in under 2 minutes!',
  },
  {
    q: 'What if I need to cancel my booked ride?',
    a: 'You can cancel from the "Your Rides" section anytime. Cancelling more than 24 hours before departure gives you a full refund (minus the service fee). The sooner you cancel, the better — it helps your driver find a new passenger.',
  },
  {
    q: 'Is carpooling safe on HIcars?',
    a: 'Absolutely. All members go through profile verification, ID checks, and build up reviews from past trips. Our 24/7 support team and in-app safety features ensure every journey is as secure as possible.',
  },
  {
    q: 'How is the ride price determined?',
    a: 'Drivers set their own price per seat based on the route, fuel costs, and tolls. HIcars provides a recommended price range so costs stay fair for both parties. You can filter rides by price when searching.',
  },
  {
    q: 'How do I start carpooling if I\'m new?',
    a: 'It\'s free to sign up! Create your account, complete your profile, and start searching or publishing rides immediately. No subscription required — just sign up and go.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white" id="safety">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 section-reveal">
          <span className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <HelpCircle size={12} />
            Help Centre
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-gray-500">
            Everything you need to know before your first HIcars ride.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="section-reveal faq-item bg-white rounded-2xl border border-sky-200 overflow-hidden shadow-sm"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-sky-50 transition-colors"
              >
                <span className="text-sm font-bold text-gray-900 pr-4">{faq.q}</span>
                <div className="flex-shrink-0">
                  {open === i
                    ? <ChevronUp size={18} className="text-sky-600" />
                    : <ChevronDown size={18} className="text-gray-400" />
                  }
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-5 animate-fade-in">
                  <div className="border-t border-sky-50 pt-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="section-reveal mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">Still have questions?</p>
          <button
            type="button"
            onClick={() => router.push('/help-center')}
            className="btn-blue inline-flex px-8 py-3.5 text-white font-semibold rounded-xl text-sm"
          >
            Visit Help Centre
          </button>
        </div>
      </div>
    </section>
  );
}
