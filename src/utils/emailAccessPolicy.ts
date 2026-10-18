import { SUPABASE_URL } from '@/utils/supabase';
import { trackAnalyticsEvent } from '@/utils/analytics';

// Delegated listeners also cover client-rendered recovery, account and review
// forms. Paddle's cross-origin frame is handled by its documented events.
export function bindEmailAccessPolicy(): void {
  if (document.documentElement.dataset.emailAccessPolicyBound) return;
  document.documentElement.dataset.emailAccessPolicyBound = 'true';
  const observed = new WeakMap<HTMLInputElement, string>();

  function observe(input: HTMLInputElement): void {
    if (!input.value.trim() || !input.validity.valid) return;
    const form = input.form;
    const countryField = form?.querySelector<HTMLSelectElement | HTMLInputElement>(
      '[name="country_code"], [name="country"], [autocomplete="country"]',
    );
    const email = input.value.trim();
    const country = countryField?.value;
    const key = JSON.stringify([email, country]);
    if (observed.get(input) === key) return;
    observed.set(input, key);
    void fetch(`${SUPABASE_URL}/functions/v1/check-access`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({ email, country_code: country }),
    }).then(async response => {
      const result = await response.json();
      trackAnalyticsEvent('email_access_checked', {
        source: 'landing_form',
        result: result.allowed === true ? 'allowed' : (result.code ?? 'unavailable'),
      });
      if (!response.ok && response.status !== 403) observed.delete(input);
    }).catch(() => {
      observed.delete(input);
      trackAnalyticsEvent('email_access_checked', { source: 'landing_form', result: 'unavailable' });
    });
  }

  document.addEventListener('focusout', event => {
    if (event.target instanceof HTMLInputElement && event.target.type === 'email') observe(event.target);
  });
  document.addEventListener('change', event => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
    if (target instanceof HTMLInputElement && target.type === 'email') observe(target);
    else target.form?.querySelectorAll<HTMLInputElement>('input[type="email"]').forEach(observe);
  });
  document.addEventListener('submit', event => {
    if (event.target instanceof HTMLFormElement) {
      event.target.querySelectorAll<HTMLInputElement>('input[type="email"]').forEach(observe);
    }
  }, true);
}
