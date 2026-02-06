import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { PRO_PADDLE_PRICE_ID } from '@/constants/pricing';

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
    let isCancelled = false;

    // Open Paddle checkout modal directly instead of scrolling to pricing.
    const timeoutId = window.setTimeout(async () => {
      if (isCancelled) {
        return;
      }

      try {
        const { openPaddleCheckout } = await import('@/utils/paddle');
        await openPaddleCheckout(deviceId, PRO_PADDLE_PRICE_ID);
      } catch (error) {
        console.error('[CheckoutAutoOpen] Failed to open checkout:', error);
      }
    }, 300);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [location.search]);
};
