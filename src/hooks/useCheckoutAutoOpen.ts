import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PADDLE_PRICE_ID = 'pri_01ke0vfdqxpf0tfx0cy5bhk7qv';

export const useCheckoutAutoOpen = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const checkout = params.get('checkout');

    if (checkout === 'pro') {
      if (window.Paddle) {
        setTimeout(() => {
          window.Paddle.Checkout.open({
            items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }],
          });
        }, 500);
      } else {
        console.error('Paddle.js not loaded');
      }
    }
  }, [location.search]);
};
