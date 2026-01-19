import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { openPaddleCheckout } from '../utils/paddle';
import { useRemoteConfig, CreditPack } from './useRemoteConfig';

export const useCheckoutAutoOpen = () => {
  const location = useLocation();
  const { config, loading } = useRemoteConfig();
  const hasOpened = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const checkout = params.get('checkout');
    const deviceId = params.get('device_id');

    console.log('[useCheckoutAutoOpen] URL params:', { 
      search: location.search, 
      checkout, 
      deviceId 
    });

    if (loading || checkout !== 'pro' || hasOpened.current) {
      return;
    }

    const packs = config.credit_packs || [];
    const getDefaultPack = (items: CreditPack[]) => {
      const monthly = items.filter((item) => item.period === 'monthly');
      const source = monthly.length > 0 ? monthly : items;
      return source.sort((a, b) => a.credits - b.credits)[0] || null;
    };

    const defaultPack = getDefaultPack(packs);
    if (!defaultPack?.price_id) {
      console.warn('[useCheckoutAutoOpen] No default pack price ID found');
      return;
    }

    if (checkout === 'pro') {
      console.log('[useCheckoutAutoOpen] Auto-opening checkout with deviceId:', deviceId);
      // Small delay to ensure Paddle.js is loaded
      hasOpened.current = true;
      setTimeout(() => {
        openPaddleCheckout(deviceId, defaultPack.price_id);
      }, 500);
    }
  }, [location.search, config.credit_packs, loading]);
};
