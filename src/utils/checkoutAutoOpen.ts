// fallow-ignore-file unused-file
import {
  PRO_MONTHLY_STRIPE_PRICE_ID,
  PRO_ONE_TIME_STRIPE_PRICE_ID,
} from '@/constants/pricing';
import { getCheckoutParam } from '@/utils/checkoutParams';

let hasOpenedCheckout = false;

type CheckoutPlan = 'monthly' | 'one-time';
type CheckoutTarget = { priceId: string; plan: CheckoutPlan };

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
      await openStripeCheckout(deviceId, checkoutTarget.priceId, {
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
      return PRO_MONTHLY_STRIPE_PRICE_ID
        ? { priceId: PRO_MONTHLY_STRIPE_PRICE_ID, plan: 'monthly' }
        : null;
    case 'one-time':
    case 'onetime':
    case 'lifetime':
    case 'pro':
      return PRO_ONE_TIME_STRIPE_PRICE_ID
        ? { priceId: PRO_ONE_TIME_STRIPE_PRICE_ID, plan: 'one-time' }
        : null;
    default:
      return null;
  }
}
