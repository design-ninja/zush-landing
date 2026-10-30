const STORAGE_KEY = 'zush_store_campaign_v1';
const SESSION_MS = 30 * 60 * 1000;
const CAMPAIGN_ID = '525101967';
const CAMPAIGN_NAME = 'Search_Windows_AI-Renamer_EN_US-GB';
const ALLOWED_IDS = new Set(['msads_search', `msads_${CAMPAIGN_ID}`]);

// Store CIDs can appear in other publishers' reports. Only send fixed cohort
// labels; never copy click IDs, PostHog IDs or arbitrary URL values into them.
export function getMicrosoftStoreCampaignId(): string | null {
  if (typeof window === 'undefined') return null;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (nav.globalPrivacyControl || nav.doNotTrack === '1' || (window as Window & { doNotTrack?: string }).doNotTrack === '1') return null;

  const params = new URL(window.location.href).searchParams;
  const source = (params.get('utm_source') ?? '').toLowerCase();
  const medium = (params.get('utm_medium') ?? '').toLowerCase();
  const microsoftSource = /^(bing|bing_ads|microsoft|microsoft_ads|msads)$/.test(source);
  const paid = Boolean(params.get('msclkid')) || (microsoftSource && /^(cpc|ppc|paid|paidsearch|paid_search)$/.test(medium));
  const knownCampaign = params.get('utm_id') === CAMPAIGN_ID
    || [CAMPAIGN_ID, CAMPAIGN_NAME].includes(params.get('utm_campaign') ?? '');
  const current = paid ? (knownCampaign ? `msads_${CAMPAIGN_ID}` : 'msads_search') : null;

  try {
    if (current) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ id: current, expires: Date.now() + SESSION_MS }));
      return current;
    }
    // A new tagged acquisition from another source supersedes the prior ad visit.
    if (source || params.has('gclid') || params.has('gbraid') || params.has('wbraid')) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    const stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? 'null');
    return stored && ALLOWED_IDS.has(stored.id) && stored.expires > Date.now() ? stored.id : null;
  } catch {
    // Browsers can disable storage; the current ad URL still carries attribution.
    return current;
  }
}

export function withMicrosoftStoreCampaign(url: string, campaignId: string | null): string {
  if (!campaignId || !ALLOWED_IDS.has(campaignId)) return url;
  const target = new URL(url);
  const isZushWeb = target.protocol === 'https:' && target.hostname === 'apps.microsoft.com'
    && target.pathname.toLowerCase() === '/detail/9nd4wvzsdq3x';
  const isZushProtocol = target.protocol === 'ms-windows-store:' && target.hostname === 'pdp'
    && target.searchParams.get('ProductId')?.toUpperCase() === '9ND4WVZSDQ3X';
  if (!isZushWeb && !isZushProtocol) return url;
  target.searchParams.set('cid', campaignId);
  return target.href;
}
