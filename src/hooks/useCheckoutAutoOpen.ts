import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PADDLE_PRICE_ID = import.meta.env.VITE_PADDLE_PRICE_ID;

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
            settings: {
              successUrl: 'https://zushapp.com/thank-you?email={customer_email}',
            },
          });
        }, 500);
      } else {
        console.error('Paddle.js not loaded');
      }
    }
  }, [location.search]);
};
