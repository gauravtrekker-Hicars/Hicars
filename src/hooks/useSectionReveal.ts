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

    const elements = [root, ...Array.from(root.querySelectorAll<HTMLElement>('.section-reveal'))];
    elements.forEach((el) => el.classList.add('visible'));

    return undefined;
  }, [ref]);
}
