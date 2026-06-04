// fallow-ignore-file unused-file
import { getCheckoutParam } from '@/utils/checkoutParams';
import { trackProClick } from '@/utils/download';
import { SUPABASE_URL } from '@/utils/supabase';

let isPricingCheckoutBound = false;
let stripeModulePromise: Promise<typeof import('@/utils/stripeCheckout')> | null = null;
let pricingConfigPromise: Promise<void> | null = null;

type StripeCheckoutPlan = 'monthly' | 'one-time';
type StripePricePlan = {
  price_id?: unknown;
  period?: unknown;
  display_price?: unknown;
  recurring_interval?: unknown;
};

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

function normalizeStripePlan(value: unknown): StripeCheckoutPlan | null {
  return value === 'monthly' || value === 'one-time' ? value : null;
}

function isStripePricePlan(value: unknown): value is StripePricePlan {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function getPlanPriceId(plan: StripePricePlan): string | null {
  return typeof plan.price_id === 'string' && plan.price_id.startsWith('price_')
    ? plan.price_id
    : null;
}

function getPlanDisplayPrice(plan: StripePricePlan): string | null {
  return typeof plan.display_price === 'string' && plan.display_price.trim()
    ? plan.display_price.trim()
    : null;
}

function getPlanBilling(planName: StripeCheckoutPlan, plan: StripePricePlan): string {
  if (planName === 'one-time') return 'one-time';
  return plan.recurring_interval === 'year' ? '/year' : '/month';
}

function applyStripePricePlan(planName: StripeCheckoutPlan, plan: StripePricePlan): void {
  const priceId = getPlanPriceId(plan);
  const displayPrice = getPlanDisplayPrice(plan);

  if (priceId) {
    for (const button of document.querySelectorAll<HTMLButtonElement>(
      `[data-stripe-checkout][data-stripe-plan="${planName}"]`,
    )) {
      button.dataset.stripePriceId = priceId;
    }
  }

  if (displayPrice) {
    for (const value of document.querySelectorAll<HTMLElement>(
      `[data-stripe-price-value="${planName}"]`,
    )) {
      value.textContent = displayPrice;
    }
  }

  for (const period of document.querySelectorAll<HTMLElement>(
    `[data-stripe-price-period="${planName}"]`,
  )) {
    period.textContent = getPlanBilling(planName, plan);
  }
}

async function syncPricingFromConfig(): Promise<void> {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/config`);
    if (!response.ok) return;

    const config = (await response.json()) as { stripe_price_plans?: unknown };
    const plans = Array.isArray(config.stripe_price_plans) ? config.stripe_price_plans : [];

    for (const plan of plans) {
      if (!isStripePricePlan(plan)) continue;
      const planName = normalizeStripePlan(plan.period);
      if (!planName) continue;
      applyStripePricePlan(planName, plan);
    }
  } catch (error) {
    console.warn('[Pricing] Failed to sync Stripe pricing:', error);
  }
}

function startPricingConfigSync(): void {
  pricingConfigPromise ??= syncPricingFromConfig();
  void pricingConfigPromise;
}

export function bindPricingCheckout(): void {
  if (typeof document === 'undefined' || isPricingCheckoutBound) {
    return;
  }

  isPricingCheckoutBound = true;
  startPricingConfigSync();

  document.addEventListener('pointerenter', (event) => preloadCheckout(event.target), { capture: true });
  document.addEventListener('focusin', (event) => preloadCheckout(event.target));

  document.addEventListener('click', async (event) => {
    const checkoutButton = getCheckoutButton(event.target);

    if (!checkoutButton || checkoutButton.disabled) {
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
      const priceId = checkoutButton.dataset.stripePriceId || null;
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
