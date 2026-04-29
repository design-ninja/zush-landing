import { PRO_PADDLE_PRICE_ID } from '@/constants/pricing';
import { getCheckoutParam } from '@/utils/checkoutParams';

let hasOpenedCheckout = false;

export function bindCheckoutAutoOpen(): void {
  if (typeof window === 'undefined' || hasOpenedCheckout) {
    return;
  }

  const checkout = getCheckoutParam('checkout');
  const deviceId = getCheckoutParam('device_id');

  if (checkout !== 'pro') {
    return;
  }

  hasOpenedCheckout = true;

  window.setTimeout(async () => {
    try {
      const { openPaddleCheckout } = await import('@/utils/paddle');
      await openPaddleCheckout(deviceId, PRO_PADDLE_PRICE_ID);
    } catch (error) {
      console.error('[CheckoutAutoOpen] Failed to open checkout:', error);
    }
  }, 300);
}
