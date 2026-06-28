'use client';

import { useRef } from 'react';
import ShareARide from '../../src/screens/ShareARide';
import { useSectionReveal } from '../../src/hooks/useSectionReveal';

export default function Page() {
  const ref = useRef<HTMLDivElement | null>(null);
  useSectionReveal(ref);

  return (
    <div ref={ref} className="section-reveal min-h-screen bg-black">
      <ShareARide />
    </div>
  );
}
