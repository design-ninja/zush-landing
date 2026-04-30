// fallow-ignore-file unused-file
import { PRO_PADDLE_PRICE_ID } from '@/constants/pricing';
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

  if (checkout !== 'pro') {
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
      await openPaddleCheckout(deviceId, PRO_PADDLE_PRICE_ID);
    } catch (error) {
      console.error('[CheckoutAutoOpen] Failed to open checkout:', error);
    }
  }, 300);
}
