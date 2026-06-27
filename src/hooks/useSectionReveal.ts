import { useEffect, RefObject } from 'react';

export function useSectionReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const root = ref.current;
    if (!root) {
      return undefined;
    }

    let observer: IntersectionObserver | undefined;
    const timeoutId = window.setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.target.classList.toggle('visible', entry.isIntersecting)),
        { threshold: 0.1 }
      );

      const elements = [root, ...Array.from(root.querySelectorAll<HTMLElement>('.section-reveal'))];
      elements.forEach((el) => observer?.observe(el));
    }, 150);

    return () => {
      window.clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, [ref]);
}
