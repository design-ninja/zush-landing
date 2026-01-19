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

export function openPaddleCheckout(deviceId?: string | null, priceId?: string | null): boolean {
  console.log('[Paddle] openPaddleCheckout called:', { deviceId, priceId });
  
  if (!window.Paddle) {
    console.error('[Paddle] Paddle.js not loaded');
    return false;
  }

  if (!priceId) {
    console.error('[Paddle] Price ID not provided');
    return false;
  }

  const checkoutOptions: PaddleCheckoutOptions = {
    items: [{ priceId, quantity: 1 }],
  };

  if (deviceId) {
    checkoutOptions.customData = {
      device_id: deviceId,
    };
    // Store device_id for ThankYou page to know if auto-activation happened
    sessionStorage.setItem('zush_checkout_device_id', deviceId);
  } else {
    sessionStorage.removeItem('zush_checkout_device_id');
  }

  console.log('[Paddle] Opening checkout with options:', checkoutOptions);
  window.Paddle.Checkout.open(checkoutOptions);
  return true;
}
