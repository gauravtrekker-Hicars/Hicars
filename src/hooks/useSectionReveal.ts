import { useEffect, RefObject } from 'react';

export function useSectionReveal(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('visible', entry.isIntersecting)),
      { threshold: 0.1 }
    );

    const root = ref.current;
    const elements = root ? [root, ...root.querySelectorAll<HTMLElement>('.section-reveal')] : [];

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [ref]);
}
