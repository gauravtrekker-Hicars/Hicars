"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Briefcase, Building2, FileUp, GraduationCap, HeartHandshake, Mail, Sparkles, Users } from 'lucide-react';
import { useSectionReveal } from '../hooks/useSectionReveal';

const departments = [
  'All Departments',
  'Engineering',
  'Product',
  'Operations',
  'Marketing',
  'Support',
];

const departmentCards = [
  {
    department: 'Engineering',
    title: 'Build the ride discovery experience',
    text: 'Work on search, routing, reliability, and the systems that help riders and drivers connect faster.',
  },
  {
    department: 'Product',
    title: 'Shape the next HIcars journeys',
    text: 'Turn customer insight into simple, trustworthy product improvements across the app and website.',
  },
  {
    department: 'Operations',
    title: 'Keep every trip running smoothly',
    text: 'Support the community, route quality, and day-to-day experience across the network.',
  },
  {
    department: 'Marketing',
    title: 'Tell the HIcars story',
    text: 'Help more people discover carpooling through campaigns, content, and brand storytelling.',
  },
  {
    department: 'Support',
    title: 'Care for riders and drivers',
    text: 'Create calm, clear support experiences for people who need help before, during, or after a ride.',
  },
];

const reasons = [
  { icon: Users, title: 'People first culture', text: 'We care about teamwork, trust, and solving real problems for everyday travellers.' },
  { icon: Briefcase, title: 'Meaningful work', text: 'Every role contributes to a product that helps India travel together more efficiently.' },
  { icon: GraduationCap, title: 'Grow with the product', text: 'As HIcars grows, you get to learn, ship, and shape the platform from an early stage.' },
  { icon: HeartHandshake, title: 'Build with purpose', text: 'We believe shared travel should be safer, simpler, and more affordable for everyone.' },
];

export default function Careers() {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeSubmitted, setResumeSubmitted] = useState(false);
  const [resumeForm, setResumeForm] = useState({
    name: '',
    email: '',
    message: '',
    resumeFile: null as File | null,
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setResumeOpen(false);
      }
    };

    if (resumeOpen) {
      window.addEventListener('keydown', onKeyDown);
      const previousBodyOverflow = document.body.style.overflow;
      const previousHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', onKeyDown);
        document.body.style.overflow = previousBodyOverflow;
        document.documentElement.style.overflow = previousHtmlOverflow;
      };
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [resumeOpen]);

  const visibleCards = useMemo(() => {
    if (selectedDepartment === 'All Departments') {
      return departmentCards;
    }

    return departmentCards.filter((card) => card.department === selectedDepartment);
  }, [selectedDepartment]);

  const openResumePopup = () => {
    setResumeSubmitted(false);
    setResumeOpen(true);
  };

  const closeResumePopup = () => {
    setResumeOpen(false);
    setResumeSubmitted(false);
  };

  const handleResumeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isResumeFormComplete) {
      return;
    }
    setResumeSubmitted(true);
  };

  const isResumeFormComplete =
    resumeForm.name.trim().length > 0 &&
    resumeForm.email.trim().length > 0 &&
    resumeForm.message.trim().length > 0 &&
    Boolean(resumeForm.resumeFile);

  return (
    <main ref={ref} className="min-h-screen bg-white pt-24 pb-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <section className="section-reveal grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div className="space-y-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 bg-sky-100 border border-sky-200 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700">
              <Sparkles size={12} />
              Careers at HIcars
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Join HIcars and help shape the future of shared travel.
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                Browse roles by department, see the current hiring status, and send us your resume if you do not see the role you are searching for.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="#departments" className="btn-blue px-6 py-3.5 text-white font-bold rounded-xl text-sm text-center">
                View Departments
              </Link>
              <button type="button" onClick={openResumePopup} className="inline-flex items-center justify-center rounded-xl border border-sky-200 bg-sky-50 px-6 py-3.5 text-sm font-bold text-sky-700 transition-colors hover:bg-sky-100">
                Submit Your Resume
              </button>
            </div>
          </div>

          <div className="group bg-white rounded-[2rem] border border-sky-100 shadow-sm p-6 sm:p-8 relative overflow-hidden transition-all duration-300 card-hover animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50 opacity-70" />
            <div className="relative space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-200/60 transition-transform duration-300 group-hover:scale-105">
                  <Building2 size={22} className="text-white" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-sky-600 font-bold">Current status</div>
                  <div className="text-lg font-black text-gray-900">Currently no hiring</div>
                </div>
              </div>

              <div className="rounded-2xl bg-gray-950 text-white p-5">
                <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-widest mb-3">
                  <FileUp size={12} />
                  Exceptional talent welcome
                </div>
                <p className="text-sm leading-relaxed text-gray-300">
                  If you cannot see the role you are searching for, we are always interested in exceptional talent. Submit your resume and tell us how you could contribute to HIcars.
                </p>
                <div className="mt-4">
                  <button type="button" onClick={openResumePopup} className="inline-flex items-center gap-2 rounded-xl bg-white text-gray-900 px-4 py-2.5 text-sm font-bold hover:bg-sky-100 transition-colors">
                    <Mail size={14} />
                    Submit Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-reveal" id="departments">
          <div className="bg-white rounded-[2rem] border border-sky-100 shadow-sm p-6 sm:p-8 card-hover">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6">
              <div>
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                  <Briefcase size={12} />
                  Department wise view
                </span>
                <h2 className="text-3xl font-black text-gray-900">See hiring status by department</h2>
                <p className="mt-2 text-sm text-gray-600 max-w-2xl">
                  Use the department tabs below to explore where HIcars is hiring. Right now every department is closed, so the page will show the current no-hiring status clearly.
                </p>
              </div>
              <div className="rounded-2xl bg-sky-50 border border-sky-100 px-4 py-3 text-sm font-semibold text-sky-800">
                Currently no hiring in {selectedDepartment === 'All Departments' ? 'any department' : selectedDepartment}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {departments.map((department) => (
                <button
                  key={department}
                  type="button"
                  onClick={() => setSelectedDepartment(department)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    selectedDepartment === department
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {department}
                </button>
              ))}
            </div>

            {visibleCards.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {visibleCards.map((role, index) => (
                  <article key={role.title} className="section-reveal rounded-[1.75rem] border border-sky-100 bg-sky-50/60 p-5 card-hover" style={{ transitionDelay: `${index * 70}ms` }}>
                    <div className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-sky-700 mb-4">
                      {role.department}
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-3">{role.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{role.text}</p>
                    <div className="mt-5 rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm font-semibold text-sky-700">
                      Currently no hiring
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-dashed border-sky-200 bg-sky-50 px-6 py-10 text-center">
                <p className="text-lg font-black text-gray-900 mb-2">Currently no hiring in this department</p>
                <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  We are not actively hiring for {selectedDepartment.toLowerCase()} right now, but we would still love to keep your resume on file for future opportunities.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="section-reveal grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="bg-white rounded-[1.75rem] p-6 shadow-sm border border-sky-100 card-hover" style={{ transitionDelay: `${index * 60}ms` }}>
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-black mb-3">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
              </article>
            );
          })}
        </section>
      </div>

      {resumeOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/90 px-3 py-4 sm:items-center sm:px-6" onClick={closeResumePopup}>
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950 text-white shadow-2xl sm:max-w-2xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] flex min-h-0 flex-col" onClick={(event) => event.stopPropagation()}>
            <div className="hidden md:block absolute -top-24 right-[-4rem] h-56 w-56 rounded-full bg-amber-400/15 blur-3xl" />
            <div className="hidden md:block absolute -bottom-24 left-[-4rem] h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

            <button
              type="button"
              onClick={closeResumePopup}
              className="absolute top-3 right-3 z-20 rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white sm:top-4 sm:right-4"
              aria-label="Close resume popup"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <div className="relative flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-2">
                  <FileUp size={12} />
                  Submit your resume
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">Tell us about yourself and attach your resume</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-300">
                  Cannot see the role you are searching for? Share your details below and our HR team will review your profile for future opportunities.
                </p>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-4 sm:p-5">
              {resumeSubmitted ? (
                <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-6 text-center">
                  <p className="text-lg font-black text-white mb-2">Resume submitted</p>
                  <p className="text-sm sm:text-base text-gray-300">
                    Thanks for reaching out. Our HR team will review your resume and contact you if there is a suitable opportunity.
                  </p>
                  <button type="button" onClick={closeResumePopup} className="btn-blue mt-6 px-5 sm:px-6 py-3 text-white font-bold rounded-xl text-sm sm:text-base">
                    Close
                  </button>
                </div>
              ) : (
                <form id="resume-form" onSubmit={handleResumeSubmit} className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="resume-name" className="block text-sm sm:text-base font-semibold text-gray-200 mb-2">Name</label>
                      <input
                        id="resume-name"
                        type="text"
                        required
                        value={resumeForm.name}
                        onChange={(event) => setResumeForm((current) => ({ ...current, name: event.target.value }))}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm sm:text-base text-white outline-none transition-colors focus:border-amber-400"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="resume-email" className="block text-sm sm:text-base font-semibold text-gray-200 mb-2">Mail ID</label>
                      <input
                        id="resume-email"
                        type="email"
                        required
                        value={resumeForm.email}
                        onChange={(event) => setResumeForm((current) => ({ ...current, email: event.target.value }))}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm sm:text-base text-white outline-none transition-colors focus:border-amber-400"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="resume-file" className="block text-sm sm:text-base font-semibold text-gray-200 mb-2">Attach resume</label>
                    <input
                      id="resume-file"
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(event) => setResumeForm((current) => ({ ...current, resumeFile: event.target.files?.[0] || null }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm sm:text-base text-gray-200 file:mr-4 file:rounded-xl file:border-0 file:bg-amber-400 file:px-4 file:py-2 file:text-sm file:font-bold file:text-gray-900"
                    />
                    <p className="mt-2 text-xs sm:text-sm text-gray-400">Accepted formats: PDF, DOC, DOCX.</p>
                  </div>

                  <div>
                    <label htmlFor="resume-message" className="block text-sm sm:text-base font-semibold text-gray-200 mb-2">Message for HR</label>
                    <textarea
                      id="resume-message"
                      rows={5}
                      required
                      value={resumeForm.message}
                      onChange={(event) => setResumeForm((current) => ({ ...current, message: event.target.value }))}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm sm:text-base text-white outline-none transition-colors focus:border-amber-400"
                      placeholder="Share a brief note about the role or skills you are interested in."
                    />
                  </div>
                </form>
              )}
            </div>

            {!resumeSubmitted && (
              <div className="border-t border-white/10 bg-slate-950/95 p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <p className="text-xs sm:text-sm text-gray-400">Your details help our HR team review your profile for future openings.</p>
                  <button
                    type="submit"
                    form="resume-form"
                    disabled={!isResumeFormComplete}
                    className="btn-yellow px-5 sm:px-6 py-3.5 text-sm sm:text-base text-gray-900 font-bold rounded-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:transform-none"
                  >
                    Submit Resume
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}