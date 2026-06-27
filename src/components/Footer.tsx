"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Car, MapPin, Phone, Mail, Instagram, Twitter, Facebook, Youtube, Smartphone } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
  ],
  Carpool: [
    { label: 'Find a Ride', href: '/find-a-ride' },
    { label: 'Share a Ride', href: '/share-a-ride' },
    { label: 'Price Guide', href: '/price-guide' },
    { label: 'Popular Routes', href: '/#find-a-ride' },
    { label: 'Ride Alerts', href: '#' },
  ],
  Support: [
    { label: 'Help Centre', href: '/help-center' },
    { label: 'Safety Tips', href: '/safety-tips' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Community Guidelines', href: '/community-guidelines' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Use', href: '/terms-of-use' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
};

const cities = [
  'Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai',
  'Pune', 'Chandigarh', 'Jaipur', 'Kolkata', 'Ahmedabad',
];

export default function Footer() {
  const [downloadOpen, setDownloadOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDownloadOpen(false);
      }
    };

    if (downloadOpen) {
      window.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [downloadOpen]);

  return (
    <>
      <footer className="bg-black text-gray-400">
      {/* Top CTA strip */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white mb-1">Never miss a carpool!</h3>
              <p className="text-sm text-gray-400">Set ride alerts and get notified the moment your route is available.</p>
            </div>
            <button
              type="button"
              onClick={() => setDownloadOpen(true)}
              className="flex-shrink-0 btn-blue px-8 py-3.5 text-white font-bold rounded-xl text-sm"
            >
              Set Ride Alert
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 text-center lg:text-left">
            <Link href="/" className="flex items-center justify-center lg:justify-start mb-5 cursor-pointer">
              <img
                src="/logo4.png"
                alt="HIcars logo"
                className="h-16 w-auto object-contain transform scale-125"
              />
            </Link>
            <p className="mx-auto lg:mx-0 text-sm leading-relaxed text-gray-500 mb-6 max-w-xs">
              India's most trusted carpooling platform. Connecting millions of travellers across the country — safely, affordably, and sustainably.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-sky-500 hover:text-white text-gray-400 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-bold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.label === 'Ride Alerts' ? (
                      <button
                        type="button"
                        onClick={() => setDownloadOpen(true)}
                        className="text-sm text-gray-500 hover:text-sky-300 transition-colors duration-200 text-left"
                      >
                        {link.label}
                      </button>
                    ) : link.href.startsWith('/') ? (
                      <Link href={link.href} className="text-sm text-gray-500 hover:text-sky-300 transition-colors duration-200">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-sm text-gray-500 hover:text-sky-300 transition-colors duration-200">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
                {section === 'Company' && (
                  <>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Popular Cities */}
        <div className="border-t border-gray-800 mt-14 pt-10">
          <h4 className="text-white font-bold text-sm mb-4">Popular Carpool Cities</h4>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city}
                href={`/find-a-ride?from=${encodeURIComponent(city)}`}
                className="inline-flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-sky-300 text-xs px-3 py-1.5 rounded-lg transition-all duration-200"
              >
                <MapPin size={10} />
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact + Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
            <a href="tel:+918001234567" className="flex items-center gap-2 hover:text-sky-300 transition-colors">
              <Phone size={14} />
              +91 800 123 4567
            </a>
            <a href="mailto:hello@hicars.in" className="flex items-center gap-2 hover:text-sky-300 transition-colors">
              <Mail size={14} />
              hello@hicars.in
            </a>
          </div>
          <p className="text-xs text-gray-600 text-center">
            &copy; {new Date().getFullYear()} HIcars Technologies Pvt. Ltd. · Made with care in India
          </p>
        </div>
      </div>
      </footer>

      {downloadOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-8"
          onClick={() => setDownloadOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-gray-950 text-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute -top-24 right-[-4rem] h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />
            <div className="absolute -bottom-24 left-[-4rem] h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 mb-3">
                  <Smartphone size={12} />
                  Download the HIcars app
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">Scan to install on Android or iPhone</h3>
                <p className="mt-2 max-w-2xl text-sm sm:text-base text-gray-300">
                  Use the QR codes below to get the HIcars app on your device and stay ready for ride alerts, bookings, and trip updates.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDownloadOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close download popup"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative grid gap-4 p-6 sm:p-8 md:grid-cols-2">
              <DownloadCard
                title="Android"
                description="Google Play download"
                qrUrl={makeQrUrl('https://play.google.com/store/apps/details?id=com.hicars.app')}
                storeLabel="Get it on Google Play"
                storeHref="https://play.google.com/store/apps/details?id=com.hicars.app"
              />
              <DownloadCard
                title="iPhone"
                description="App Store download"
                qrUrl={makeQrUrl('https://apps.apple.com/app/id0000000000')}
                storeLabel="Download on the App Store"
                storeHref="https://apps.apple.com/app/id0000000000"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function makeQrUrl(data: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(data)}`;
}

function DownloadCard({ title, description, qrUrl, storeLabel, storeHref }: { title: string; description: string; qrUrl: string; storeLabel: string; storeHref: string; }) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 sm:p-6 transition-transform duration-300 hover:-translate-y-1 hover:bg-white/10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="text-lg font-black text-white">{title}</div>
          <div className="text-sm text-gray-300">{description}</div>
        </div>
        <div className="rounded-2xl bg-sky-400/15 p-3 text-sky-300">
          <Smartphone size={22} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[160px_1fr] sm:items-center">
        <div className="mx-auto w-fit rounded-3xl bg-white p-3 shadow-lg">
          <img src={qrUrl} alt={`${title} QR code`} className="h-36 w-36 rounded-2xl object-cover" />
        </div>
        <div className="space-y-3 text-sm text-gray-300">
          <p>
            Open your camera or QR scanner and point it at this code to start the download flow on {title.toLowerCase()}.
          </p>
          <a
            href={storeHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 font-bold text-gray-900 transition-colors hover:bg-amber-50"
          >
            {storeLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
