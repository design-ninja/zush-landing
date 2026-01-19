import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { openPaddleCheckout } from '../utils/paddle';
import { CREDIT_PACKS, CreditPack } from '../constants';

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

    const getDefaultPack = (items: CreditPack[]) => {
      const monthly = items.filter((item) => item.period === 'monthly');
      const source = monthly.length > 0 ? monthly : items;
      return source.sort((a, b) => a.credits - b.credits)[0] || null;
    };

    const defaultPack = getDefaultPack(CREDIT_PACKS);
    if (!defaultPack?.price_id) {
      return;
    }

    hasOpened.current = true;
    setTimeout(() => {
      openPaddleCheckout(deviceId, defaultPack.price_id);
    }, 500);
  }, [location.search]);
};
