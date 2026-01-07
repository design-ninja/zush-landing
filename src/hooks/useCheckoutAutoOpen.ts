import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PADDLE_PRICE_ID = import.meta.env.VITE_PADDLE_PRICE_ID;

export const useCheckoutAutoOpen = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const checkout = params.get('checkout');
    const deviceId = params.get('device_id');

    if (checkout === 'pro') {
      if (window.Paddle) {
        setTimeout(() => {
          const checkoutOptions: any = {
            items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }],
          };
          
          // Add device_id to custom data if provided
          if (deviceId) {
            checkoutOptions.customData = {
              device_id: deviceId,
            };
          }
          
          window.Paddle.Checkout.open(checkoutOptions);
        }, 500);
      } else {
        console.error('Paddle.js not loaded');
      }
    }
  }, [location.search]);
};
