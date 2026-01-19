import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useCheckoutAutoOpen = () => {
  const location = useLocation();
  const hasScrolled = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const checkout = params.get('checkout');

    if (checkout !== 'pro' || hasScrolled.current) {
      return;
    }

    hasScrolled.current = true;

    setTimeout(() => {
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }, [location.search]);
};
