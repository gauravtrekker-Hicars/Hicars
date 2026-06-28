import { useRef } from 'react';
import PublishRide from '../components/PublishRide';
import { useSectionReveal } from '../hooks/useSectionReveal';

export default function ShareARide() {
  const ref = useRef<HTMLElement | null>(null);
  useSectionReveal(ref);

  return (
    <main ref={ref} className="section-reveal page-fade-in min-h-screen bg-black">
      <PublishRide />
    </main>
  );
}
