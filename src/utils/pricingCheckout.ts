// fallow-ignore-file unused-file
import { getCheckoutParam } from '@/utils/checkoutParams';
import { trackProClick } from '@/utils/download';

let isPricingCheckoutBound = false;
let stripeModulePromise: Promise<typeof import('@/utils/stripeCheckout')> | null = null;

type StripeCheckoutPlan = 'monthly' | 'one-time';

function getStripeModule() {
  stripeModulePromise ??= import('@/utils/stripeCheckout');
  return stripeModulePromise;
}

function getCheckoutButton(target: EventTarget | null): HTMLButtonElement | null {
  return target instanceof Element
    ? target.closest<HTMLButtonElement>('[data-stripe-checkout]')
    : null;
}

function preloadCheckout(target: EventTarget | null): void {
  const checkoutButton = getCheckoutButton(target);
  if (!checkoutButton || checkoutButton.disabled) return;

  void getStripeModule()
    .then(({ preloadStripeCheckout }) => preloadStripeCheckout())
    .catch((error) => {
      console.warn('[Pricing] Failed to preload checkout:', error);
    });
}

function setCheckoutButtonLoading(
  checkoutButton: HTMLButtonElement,
  isLoading: boolean,
): void {
  checkoutButton.disabled = isLoading;

  if (isLoading) {
    checkoutButton.dataset.stripeLoading = 'true';
    checkoutButton.setAttribute('aria-busy', 'true');
    return;
  }

  delete checkoutButton.dataset.stripeLoading;
  checkoutButton.removeAttribute('aria-busy');
}

function normalizeStripePlan(value: string | undefined): StripeCheckoutPlan | null {
  return value === 'monthly' || value === 'one-time' ? value : null;
}

export function bindPricingCheckout(): void {
  if (typeof document === 'undefined' || isPricingCheckoutBound) {
    return;
  }

  isPricingCheckoutBound = true;

  document.addEventListener('pointerenter', (event) => preloadCheckout(event.target), { capture: true });
  document.addEventListener('focusin', (event) => preloadCheckout(event.target));

  document.addEventListener('click', async (event) => {
    const checkoutButton = getCheckoutButton(event.target);

    if (!checkoutButton || checkoutButton.disabled) {
      return;
    }

    const priceId = checkoutButton.dataset.stripePriceId;
    if (!priceId) {
      console.warn('[Pricing] Price ID is missing for PRO checkout');
      return;
    }

    const plan = normalizeStripePlan(checkoutButton.dataset.stripePlan);
    if (!plan) {
      console.warn('[Pricing] Stripe plan is missing for PRO checkout');
      return;
    }

    event.preventDefault();
    trackProClick({ source: 'pricing' });

    setCheckoutButtonLoading(checkoutButton, true);

    let checkoutOpened = false;
    const resetCheckoutButton = () => {
      setCheckoutButtonLoading(checkoutButton, false);
    };

    try {
      const deviceId = getCheckoutParam('device_id');
      const { openStripeCheckout } = await getStripeModule();
      checkoutOpened = await openStripeCheckout(deviceId, priceId, {
        plan,
        onCheckoutOpen: resetCheckoutButton,
      });
    } catch (error) {
      console.error('[Pricing] Failed to open checkout:', error);
    } finally {
      if (!checkoutOpened) resetCheckoutButton();
    }
  });
}
