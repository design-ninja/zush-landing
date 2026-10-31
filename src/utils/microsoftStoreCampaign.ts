import { getMicrosoftAdsTagId } from '@/utils/microsoftAds';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/utils/supabase';

const STORAGE_KEY = 'zush_store_campaign_v1';
const SESSION_MS = 30 * 60 * 1000;
const CAMPAIGN_ID = '525101967';
const CAMPAIGN_LABEL = `msads_${CAMPAIGN_ID}`;
const CAMPAIGN_NAME = 'Search_Windows_AI-Renamer_EN_US-GB';
const ALLOWED_IDS = new Set(['msads_search', CAMPAIGN_LABEL]);
// Opaque per-click referral issued by the ad-acquisition-referral function.
const REFERRAL_ID = new RegExp(`^${CAMPAIGN_LABEL}_[a-f0-9]{32}$`);
const CLICK_ID = /^[a-f0-9]{32}$/i;
// Covers the CORS preflight plus an Edge Function cold start and its queries.
const REFERRAL_TIMEOUT_MS = 4000;
const MAX_REFERRAL_ATTEMPTS = 2;
const isReferralId = (value: unknown): value is string => typeof value === 'string' && REFERRAL_ID.test(value);
const isAllowedId = (value: unknown): value is string => typeof value === 'string'
  && (ALLOWED_IDS.has(value) || REFERRAL_ID.test(value));
// Final outcome for the current click: an opaque CID, or null when declined.
let settledClick: string | null = null;
let resolvedCid: string | null = null;
let referralAttempts = 0;
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
  const current = paid ? (knownCampaign ? (settledClick === params.get('msclkid') && resolvedCid ? resolvedCid : CAMPAIGN_LABEL) : 'msads_search') : null;

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
  if (!click || !CLICK_ID.test(click) || !campaign.startsWith(CAMPAIGN_LABEL)) return Promise.resolve(campaign);
  if (settledClick === click || referralAttempts >= MAX_REFERRAL_ATTEMPTS || !SUPABASE_ANON_KEY) {
    return Promise.resolve(campaign);
  }
  if (preparing) return preparing;
  referralAttempts += 1;
  preparing = (async () => {
    try {
      // Reuse the server's US/GPC/DNT decision so other visitors' click IDs
      // never leave the browser. Supabase sees the visitor's own IP, which
      // keeps its per-IP referral quota per visitor.
      if (!await getMicrosoftAdsTagId()) {
        settledClick = click;
        return campaign;
      }
      const response = await fetch(`${SUPABASE_URL}/functions/v1/ad-acquisition-referral`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ campaign_id: CAMPAIGN_ID, microsoft_click_id: click }),
        signal: AbortSignal.timeout(REFERRAL_TIMEOUT_MS),
      });
      // Server errors are transient; any other answer is final for this click.
      if (response.status >= 500) return campaign;
      const body = response.ok ? await response.json() : null;
      settledClick = click;
      resolvedCid = isReferralId(body?.cid) ? body.cid : null;
      return getMicrosoftStoreCampaignId();
    } catch {
      // Content blockers and unavailable advertising endpoints must not block Store access.
      return campaign;
    } finally { preparing = null; }
  })();
  return preparing;
}

// Lets a Store click wait briefly for a referral that is already in flight.
export function pendingMicrosoftStoreCampaign(): Promise<string | null> | null {
  return preparing;
}
