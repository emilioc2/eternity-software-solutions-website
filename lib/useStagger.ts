'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook that observes a container element and adds the 'is-visible' class
 * when it enters the viewport. Used with the `.stagger-children` CSS class
 * to create staggered fade-up animations on child elements.
 *
 * @returns A ref to attach to the container element
 */
export function useStagger<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      element.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}
