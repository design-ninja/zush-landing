import {
  PRO_MONTHLY_PADDLE_PRICE_ID,
  PRO_ONE_TIME_PADDLE_PRICE_ID,
} from '@/constants/pricing';
import {
  getCheckoutParam,
  isCheckoutSessionToken,
  isPaddleTransactionId,
} from '@/utils/checkoutParams';

let hasOpenedCheckout = false;

export function bindCheckoutAutoOpen(): void {
  if (
    typeof window === 'undefined'
    || hasOpenedCheckout
    || (window as Window & { __zushLocaleRedirecting?: boolean }).__zushLocaleRedirecting
  ) {
    return;
  }

  const transactionId = getCheckoutParam('_ptxn');
  if (isPaddleTransactionId(transactionId)) {
    const checkoutSession = getCheckoutParam('checkout_session');
    openTransactionCheckout(
      transactionId,
      isCheckoutSessionToken(checkoutSession) ? checkoutSession : null,
    );
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

// A Paddle payment link (`_ptxn`) from the app's browser checkout names a transaction the app
// already prepared for this device, so it opens as is rather than through a new session. Newer
// apps also pass that transaction's `checkout_session`, which lets the thank-you page send the
// buyer back to the app.
function openTransactionCheckout(transactionId: string, checkoutSession: string | null): void {
  hasOpenedCheckout = true;

  void import('@/utils/paddle')
    .then(({ openPaddleTransactionCheckout }) =>
      openPaddleTransactionCheckout(transactionId, checkoutSession))
    .catch((error) => {
      console.error('[CheckoutAutoOpen] Failed to open the app checkout:', error);
    });
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
