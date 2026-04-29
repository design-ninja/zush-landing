import { getCheckoutParam } from '@/utils/checkoutParams';

let isPricingCheckoutBound = false;

export function bindPricingCheckout(): void {
  if (typeof document === 'undefined' || isPricingCheckoutBound) {
    return;
  }

  isPricingCheckoutBound = true;

  document.addEventListener('click', async (event) => {
    const checkoutButton =
      event.target instanceof Element
        ? event.target.closest<HTMLButtonElement>('[data-paddle-checkout]')
        : null;

    if (!checkoutButton || checkoutButton.disabled) {
      return;
    }

    const priceId = checkoutButton.dataset.paddlePriceId;
    if (!priceId) {
      console.warn('[Pricing] Price ID is missing for PRO checkout');
      return;
    }

    event.preventDefault();

    try {
      const deviceId = getCheckoutParam('device_id');
      const { openPaddleCheckout } = await import('@/utils/paddle');
      await openPaddleCheckout(deviceId, priceId);
    } catch (error) {
      console.error('[Pricing] Failed to open checkout:', error);
    }
  });
}
