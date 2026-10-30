const STORAGE_KEY = 'zush_store_campaign_v1';
const SESSION_MS = 30 * 60 * 1000;
const CAMPAIGN_ID = '525101967';
const CAMPAIGN_NAME = 'Search_Windows_AI-Renamer_EN_US-GB';
const ALLOWED_IDS = new Set(['msads_search', `msads_${CAMPAIGN_ID}`]);
const isAllowedId = (value: unknown): value is string => typeof value === 'string'
  && (ALLOWED_IDS.has(value) || /^msads_525101967_[a-f0-9]{32}$/.test(value));
let resolvedClick: string | null = null;
let resolvedCid: string | null = null;
let preparing: Promise<string | null> | null = null;

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
  const current = paid ? (knownCampaign ? (resolvedClick === params.get('msclkid') && resolvedCid ? resolvedCid : `msads_${CAMPAIGN_ID}`) : 'msads_search') : null;

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
    return stored && isAllowedId(stored.id) && stored.expires > Date.now() ? stored.id : null;
  } catch {
    // Browsers can disable storage; the current ad URL still carries attribution.
    return current;
  }
}

export function withMicrosoftStoreCampaign(url: string, campaignId: string | null): string {
  if (!campaignId || !isAllowedId(campaignId)) return url;
  const target = new URL(url);
  const isZushWeb = target.protocol === 'https:' && target.hostname === 'apps.microsoft.com'
    && target.pathname.toLowerCase() === '/detail/9nd4wvzsdq3x';
  const isZushProtocol = target.protocol === 'ms-windows-store:' && target.hostname === 'pdp'
    && target.searchParams.get('ProductId')?.toUpperCase() === '9ND4WVZSDQ3X';
  if (!isZushWeb && !isZushProtocol) return url;
  target.searchParams.set('cid', campaignId);
  return target.href;
}

// Prepares a per-click opaque CID without adding cookies or persisting msclkid
// in browser storage. Navigation still works with the campaign CID if blocked.
export function prepareMicrosoftStoreCampaign(): Promise<string | null> {
  const campaign = getMicrosoftStoreCampaignId();
  if (!campaign || typeof window === 'undefined') return Promise.resolve(campaign);
  const click = new URL(window.location.href).searchParams.get('msclkid');
  if (!click || !/^[a-f0-9]{32}$/i.test(click) || !campaign.startsWith('msads_525101967')) return Promise.resolve(campaign);
  if (resolvedClick === click) return Promise.resolve(resolvedCid);
  if (preparing) return preparing;
  preparing = (async () => {
    try {
      const response = await fetch('/api/microsoft-ads-referral', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaign_id: CAMPAIGN_ID, microsoft_click_id: click }),
        signal: AbortSignal.timeout(1500),
      });
      if (!response.ok) return campaign;
      const body = await response.json();
      if (typeof body.cid !== 'string' || !/^msads_525101967_[a-f0-9]{32}$/.test(body.cid)) return campaign;
      resolvedClick = click;
      resolvedCid = body.cid;
      return getMicrosoftStoreCampaignId();
    } catch {
      // Content blockers and unavailable advertising endpoints must not block Store access.
      return campaign;
    } finally { preparing = null; }
  })();
  return preparing;
}
