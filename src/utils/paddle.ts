import { PADDLE_PRICE_ID } from '../constants';

export const openPaddleCheckout = () => {
  if (window.Paddle) {
    window.Paddle.Checkout.open({
      items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }],
    });
  } else {
    // Fallback to hosted checkout if Paddle.js is not loaded
    const hostedUrl = `https://sandbox-buy.paddle.com/checkout?items[0][price_id]=${PADDLE_PRICE_ID}&items[0][quantity]=1`;
    window.open(hostedUrl, '_blank');
  }
};
