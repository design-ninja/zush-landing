// fallow-ignore-file unused-file
import { getCheckoutParam } from '@/utils/checkoutParams';

let hasOpenedCheckout = false;

type CheckoutPlan = 'monthly' | 'one-time';
type CheckoutTarget = { plan: CheckoutPlan };

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

  const checkoutTarget = getCheckoutTarget(checkout);
  if (!checkoutTarget) {
    return;
  }

  hasOpenedCheckout = true;

  const stripeModulePromise = import('@/utils/stripeCheckout');
  void stripeModulePromise
    .then(({ preloadStripeCheckout }) => preloadStripeCheckout())
    .catch((error) => {
      console.warn('[CheckoutAutoOpen] Failed to preload checkout:', error);
    });

  window.setTimeout(async () => {
    try {
      const { openStripeCheckout } = await stripeModulePromise;
      await openStripeCheckout(deviceId, null, {
        plan: checkoutTarget.plan,
      });
    } catch (error) {
      console.error('[CheckoutAutoOpen] Failed to open checkout:', error);
    }
  }, 300);
}

function getCheckoutTarget(checkout: string | null): CheckoutTarget | null {
  switch (checkout) {
    case 'monthly':
    case 'pro-monthly':
      return { plan: 'monthly' };
    case 'one-time':
    case 'onetime':
    case 'lifetime':
    case 'pro':
      return { plan: 'one-time' };
    default:
      return null;
  }
}
