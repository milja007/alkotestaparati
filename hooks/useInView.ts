import { useEffect, useRef, useState, useCallback } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  debounceMs?: number;
}

export function useInView(options: UseInViewOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    debounceMs = 100,
  } = options;

  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedSetInView = useCallback(
    (inView: boolean) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsInView(inView);

        if (inView && !hasBeenInView) {
          setHasBeenInView(true);
        }
      }, debounceMs);
    },
    [hasBeenInView, debounceMs]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;

        // Koristi requestAnimationFrame + debouncing
        requestAnimationFrame(() => {
          debouncedSetInView(inView);
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, rootMargin, debouncedSetInView]);

  return {
    ref,
    isInView: triggerOnce ? hasBeenInView : isInView,
  };
}
