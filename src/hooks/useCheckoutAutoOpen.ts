import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { openPaddleCheckout } from '@/utils/paddle';
import { PRO_PLAN } from '@/components/Pricing/constants';

export const useCheckoutAutoOpen = () => {
  const location = useLocation();
  const hasOpened = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const checkout = params.get('checkout');
    const deviceId = params.get('device_id');

    if (checkout !== 'pro' || hasOpened.current) {
      return;
    }

    hasOpened.current = true;

    // Open Paddle checkout modal directly instead of scrolling to pricing
    setTimeout(() => {
      const priceId = PRO_PLAN.paddlePriceId;
      if (priceId) {
        openPaddleCheckout(deviceId, priceId);
      }
    }, 300);
  }, [location.search]);
};
