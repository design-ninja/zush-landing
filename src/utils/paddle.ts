const PADDLE_PRICE_ID = import.meta.env.VITE_PADDLE_PRICE_ID;

interface PaddleCheckoutOptions {
  items: { priceId: string; quantity: number }[];
  customData?: {
    device_id?: string;
  };
}

declare global {
  interface Window {
    Paddle?: {
      Checkout: {
        open: (options: PaddleCheckoutOptions) => void;
      };
    };
  }
}

/**
 * Opens Paddle checkout overlay with optional device_id for auto-activation
 */
export function openPaddleCheckout(deviceId?: string | null): boolean {
  if (!window.Paddle) {
    console.error('Paddle.js not loaded');
    return false;
  }

  const checkoutOptions: PaddleCheckoutOptions = {
    items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }],
  };

  if (deviceId) {
    checkoutOptions.customData = {
      device_id: deviceId,
    };
  }

  window.Paddle.Checkout.open(checkoutOptions);
  return true;
}
