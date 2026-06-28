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

    const revealElements = [root, ...Array.from(root.querySelectorAll<HTMLElement>('.section-reveal'))];

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -20% 0px',
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [ref]);
}
