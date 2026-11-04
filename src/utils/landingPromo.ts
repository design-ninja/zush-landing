import { SUPABASE_URL } from '@/utils/supabase';

// The backend `config` Edge Function serves `landing_promo_enabled` from
// app_config. It is separate from `pro_promo_enabled`, which drives the app's
// own PRO modal, so the landing promo can be switched without touching the app.
const CACHE_KEY = 'zush_landing_promo';
const CACHE_TTL_MS = 10 * 60 * 1000;

let promoRequest: Promise<boolean> | null = null;

function readCachedPromo(): boolean | null {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null') as
      { enabled?: unknown; at?: unknown } | null;
    if (
      typeof cached?.enabled !== 'boolean' ||
      typeof cached.at !== 'number' ||
      Date.now() - cached.at > CACHE_TTL_MS
    ) {
      return null;
    }
    return cached.enabled;
  } catch {
    return null;
  }
}

function writeCachedPromo(enabled: boolean): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ enabled, at: Date.now() }));
  } catch {}
}

async function fetchLandingPromoEnabled(): Promise<boolean> {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/config`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return false;
    const config = (await response.json()) as { landing_promo_enabled?: unknown };
    const enabled = config.landing_promo_enabled === true;
    writeCachedPromo(enabled);
    return enabled;
  } catch {
    // An unreadable flag hides the promo rather than advertising a discount
    // that may no longer exist.
    return false;
  }
}

function applyLandingPromo(enabled: boolean): void {
  document.querySelectorAll<HTMLElement>('[data-landing-promo]').forEach((section) => {
    section.dataset.landingPromo = enabled ? 'on' : 'off';
    section.querySelectorAll<HTMLElement>('[data-pro-plan-price]').forEach((button) => {
      const price = enabled ? button.dataset.promoPlanPrice : button.dataset.regularPlanPrice;
      if (price) button.dataset.proPlanPrice = price;
    });
  });
}

export function bindLandingPromo(): void {
  if (!document.querySelector('[data-landing-promo]')) return;

  const cached = readCachedPromo();
  if (cached !== null) {
    applyLandingPromo(cached);
    return;
  }

  promoRequest ??= fetchLandingPromoEnabled().finally(() => {
    promoRequest = null;
  });
  void promoRequest.then(applyLandingPromo);
}
