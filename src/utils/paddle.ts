import { SUPABASE_URL } from './supabase';

const PADDLE_PRICE_ID = import.meta.env.VITE_PADDLE_PRICE_ID;

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
      `${SUPABASE_URL}/functions/v1/get-price?price_id=${encodeURIComponent(priceId)}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch price:', response.status, response.statusText);
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
export function openPaddleCheckout(deviceId?: string | null, priceId?: string | null): boolean {
  if (!window.Paddle) {
    console.error('Paddle.js not loaded');
    return false;
  }

  const finalPriceId = priceId || PADDLE_PRICE_ID;
  if (!finalPriceId) {
    console.error('Price ID not provided');
    return false;
  }

  const checkoutOptions: PaddleCheckoutOptions = {
    items: [{ priceId: finalPriceId, quantity: 1 }],
  };

  if (deviceId) {
    checkoutOptions.customData = {
      device_id: deviceId,
    };
  }

  window.Paddle.Checkout.open(checkoutOptions);
  return true;
}
