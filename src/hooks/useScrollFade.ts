import { useEffect, useRef, useState } from "react";

interface UseScrollFadeOptions {
  threshold?: number;
}

export function useScrollFade<T extends HTMLElement>(
  options: UseScrollFadeOptions = {},
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold]);

  return [ref as React.RefObject<T>, isVisible];
}
