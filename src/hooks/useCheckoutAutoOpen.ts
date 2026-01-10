import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { openPaddleCheckout } from '../utils/paddle';

export const useCheckoutAutoOpen = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const checkout = params.get('checkout');
    const deviceId = params.get('device_id');

    if (checkout === 'pro') {
      // Small delay to ensure Paddle.js is loaded
      setTimeout(() => {
        openPaddleCheckout(deviceId);
      }, 500);
    }
  }, [location.search]);
};
