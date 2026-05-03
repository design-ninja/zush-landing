// fallow-ignore-file unused-file
import { getCheckoutParam } from '@/utils/checkoutParams';
import { trackProClick } from '@/utils/download';

let isPricingCheckoutBound = false;
let paddleModulePromise: Promise<typeof import('@/utils/paddle')> | null = null;

const CHECKOUT_LOADING_RESET_EVENTS = new Set([
  'checkout.loaded',
  'checkout.closed',
  'checkout.completed',
  'checkout.error',
]);

function getPaddleModule() {
  paddleModulePromise ??= import('@/utils/paddle');
  return paddleModulePromise;
}

function getCheckoutButton(target: EventTarget | null): HTMLButtonElement | null {
  return target instanceof Element
    ? target.closest<HTMLButtonElement>('[data-paddle-checkout]')
    : null;
}

function preloadCheckout(target: EventTarget | null): void {
  const checkoutButton = getCheckoutButton(target);
  if (!checkoutButton || checkoutButton.disabled) return;

  void getPaddleModule()
    .then(({ preloadPaddleCheckout }) => preloadPaddleCheckout())
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
    checkoutButton.dataset.paddleLoading = 'true';
    checkoutButton.setAttribute('aria-busy', 'true');
    return;
  }

  delete checkoutButton.dataset.paddleLoading;
  checkoutButton.removeAttribute('aria-busy');
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

    const priceId = checkoutButton.dataset.paddlePriceId;
    if (!priceId) {
      console.warn('[Pricing] Price ID is missing for PRO checkout');
      return;
    }

    event.preventDefault();
    trackProClick({ source: 'pricing' });

    setCheckoutButtonLoading(checkoutButton, true);

    let unsubscribeFromPaddleEvents: (() => void) | undefined;
    const resetCheckoutButton = () => {
      setCheckoutButtonLoading(checkoutButton, false);
      unsubscribeFromPaddleEvents?.();
      unsubscribeFromPaddleEvents = undefined;
    };

    try {
      const deviceId = getCheckoutParam('device_id');
      const { onPaddleCheckoutEvent, openPaddleCheckout } = await getPaddleModule();
      unsubscribeFromPaddleEvents = onPaddleCheckoutEvent((paddleEvent) => {
        if (CHECKOUT_LOADING_RESET_EVENTS.has(paddleEvent.name)) {
          resetCheckoutButton();
        }
      });
      await openPaddleCheckout(deviceId, priceId, {
        onCheckoutOpen: resetCheckoutButton,
      });
    } catch (error) {
      console.error('[Pricing] Failed to open checkout:', error);
    } finally {
      resetCheckoutButton();
    }
  });
}
