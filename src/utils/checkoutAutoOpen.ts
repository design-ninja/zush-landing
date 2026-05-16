// fallow-ignore-file unused-file
import {
  PRO_MONTHLY_PADDLE_PRICE_ID,
  PRO_ONE_TIME_PADDLE_PRICE_ID,
} from '@/constants/pricing';
import { getCheckoutParam } from '@/utils/checkoutParams';

let hasOpenedCheckout = false;

export function bindCheckoutAutoOpen(): void {
  if (
    typeof window === 'undefined'
    || hasOpenedCheckout
    || (window as Window & { __zushLocaleRedirecting?: boolean }).__zushLocaleRedirecting
  ) {
    return;
  }

  const checkout = getCheckoutParam('checkout');
  const deviceId = getCheckoutParam('device_id');

  const priceId = getCheckoutPriceId(checkout);
  if (!priceId) {
    return;
  }

  hasOpenedCheckout = true;

  const paddleModulePromise = import('@/utils/paddle');
  void paddleModulePromise
    .then(({ preloadPaddleCheckout }) => preloadPaddleCheckout())
    .catch((error) => {
      console.warn('[CheckoutAutoOpen] Failed to preload checkout:', error);
    });

  window.setTimeout(async () => {
    try {
      const { openPaddleCheckout } = await paddleModulePromise;
      await openPaddleCheckout(deviceId, priceId);
    } catch (error) {
      console.error('[CheckoutAutoOpen] Failed to open checkout:', error);
    }
  }, 300);
}

function getCheckoutPriceId(checkout: string | null): string | null {
  switch (checkout) {
    case 'monthly':
    case 'pro-monthly':
      return PRO_MONTHLY_PADDLE_PRICE_ID || null;
    case 'one-time':
    case 'onetime':
    case 'lifetime':
    case 'pro':
      return PRO_ONE_TIME_PADDLE_PRICE_ID || null;
    default:
      return null;
  }
}
