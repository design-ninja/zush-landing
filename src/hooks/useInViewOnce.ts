import { type RefObject, useEffect, useRef, useState } from 'react';

interface UseInViewOnceOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

interface UseInViewOnceResult<T extends Element> {
  isInView: boolean;
  ref: RefObject<T | null>;
}

export const useInViewOnce = <T extends Element>({
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: UseInViewOnceOptions = {}): UseInViewOnceResult<T> => {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isInView, root, rootMargin, threshold]);

  return { isInView, ref };
};
