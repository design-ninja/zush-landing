// fallow-ignore-file unused-file
import { SUPABASE_URL } from '@/utils/supabase';

type StripeCheckoutPlan = 'monthly' | 'annual' | 'one-time';

interface OpenStripeCheckoutOptions {
  plan?: StripeCheckoutPlan;
  onCheckoutOpen?: () => Promise<void> | void;
}

interface CheckoutSessionResponse {
  success: boolean;
  checkout_session: string;
  stripe_checkout_session_id: string;
  checkout_url: string;
}

async function waitForBrowserPaint(): Promise<void> {
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function getPrefillEmail(): string | undefined {
  const email = new URLSearchParams(window.location.search).get('email')?.trim();
  return email || undefined;
}

async function createCheckoutSession(
  deviceId: string | null | undefined,
  priceId: string,
  plan: StripeCheckoutPlan,
): Promise<CheckoutSessionResponse | null> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/create-stripe-checkout-session`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price_id: priceId,
          plan,
          device_id: deviceId || undefined,
          source: deviceId ? 'app' : 'landing',
          email: getPrefillEmail(),
        }),
      },
    );

    if (!response.ok) {
      console.error('[Stripe] Checkout session failed:', await response.text());
      return null;
    }

    const data = (await response.json()) as CheckoutSessionResponse;
    return data.success && data.checkout_session && data.checkout_url
      ? data
      : null;
  } catch (error) {
    console.error('[Stripe] Failed to create checkout session:', error);
    return null;
  }
}

function persistCheckoutSession(
  checkoutSession: CheckoutSessionResponse,
  deviceId: string | null | undefined,
): void {
  sessionStorage.setItem('zush_checkout_session', checkoutSession.checkout_session);

  if (deviceId) {
    sessionStorage.setItem('zush_checkout_device_id', deviceId);
  } else {
    sessionStorage.removeItem('zush_checkout_device_id');
  }
}

async function beforeCheckoutOpen(
  options?: OpenStripeCheckoutOptions,
): Promise<void> {
  if (!options?.onCheckoutOpen) return;

  await options.onCheckoutOpen();
  await waitForBrowserPaint();
}

export function preloadStripeCheckout(): Promise<boolean> {
  return Promise.resolve(true);
}

export async function openStripeCheckout(
  deviceId?: string | null,
  priceId?: string | null,
  options?: OpenStripeCheckoutOptions,
): Promise<boolean> {
  if (!priceId) {
    console.error('[Stripe] Price ID not provided');
    return false;
  }

  const plan = options?.plan ?? 'one-time';
  const checkoutSession = await createCheckoutSession(deviceId, priceId, plan);

  if (!checkoutSession) {
    console.error('[Stripe] Checkout session was not created');
    return false;
  }

  persistCheckoutSession(checkoutSession, deviceId);
  await beforeCheckoutOpen(options);
  window.location.href = checkoutSession.checkout_url;
  return true;
}
