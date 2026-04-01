import { useState, useEffect } from 'react';

// Should match $breakpoint-md in _breakpoints.scss
export const BREAKPOINT_MD = 768;

export const useIsMobile = (): boolean => {
  // Keep initial value deterministic between SSR and hydration.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${BREAKPOINT_MD}px)`);
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();

    mediaQuery.addEventListener('change', updateIsMobile);
    return () => mediaQuery.removeEventListener('change', updateIsMobile);
  }, []);

  return isMobile;
};
