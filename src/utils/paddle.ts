const PADDLE_PRICE_ID = import.meta.env.VITE_PADDLE_PRICE_ID;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://sjzrgmvinyxjzvshfvjy.supabase.co';

interface PaddleCheckoutOptions {
  items: { priceId: string; quantity: number }[];
  customData?: {
    device_id?: string;
  };
}

interface PaddlePrice {
  amount: number;
  currency_code: string;
  formatted: string;
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
 * Fetches price information from Paddle API via Supabase function
 */
export async function getPaddlePrice(priceId: string): Promise<PaddlePrice | null> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/get-price?price_id=${encodeURIComponent(priceId)}`
    );

    if (!response.ok) {
      console.error('Failed to fetch price:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching price:', error);
    return null;
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
