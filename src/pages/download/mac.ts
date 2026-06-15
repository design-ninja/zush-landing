import type { APIRoute } from 'astro';
import { MAC_INSTALLER_URL } from '@/constants';

export const prerender = false;

const REDIRECT_TIMEOUT_MS = 1200;
const POSTHOG_PROXY_PATH = '/e';
const LEGACY_POSTHOG_PROXY_HOST = 'https://e.zushapp.com';

const attributionParams = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_device',
  'utm_matchtype',
  'utm_id',
] as const;

type AttributionParam = (typeof attributionParams)[number];
type DownloadAttribution = Partial<Record<AttributionParam, string>> & {
  event_id: string;
  referrer?: string;
  request_path: string;
  request_url: string;
  user_agent?: string;
};

const getEnv = (name: string): string | undefined => {
  const value = (import.meta.env as Record<string, string | undefined>)[name];
  return value && value.trim() ? value.trim() : undefined;
};

const getPostHogHost = (requestUrl: URL): string => {
  const configuredHost = getEnv('PUBLIC_POSTHOG_HOST');
  const host = !configuredHost || configuredHost === LEGACY_POSTHOG_PROXY_HOST
    ? POSTHOG_PROXY_PATH
    : configuredHost;

  return host.startsWith('/')
    ? new URL(host, requestUrl.origin).href
    : host;
};

const getRequestHeaders = (request: Request) => ({
  referrer: request.headers.get('referer') || undefined,
  userAgent: request.headers.get('user-agent') || undefined,
});

const copyAttributionParams = (
  target: Partial<Record<AttributionParam, string>>,
  source: URLSearchParams,
) => {
  attributionParams.forEach((param) => {
    const value = source.get(param);
    if (value) target[param] = value;
  });
};

const collectAttribution = (request: Request, eventId: string): DownloadAttribution => {
  const requestUrl = new URL(request.url);
  const { referrer, userAgent } = getRequestHeaders(request);
  const attribution: Partial<Record<AttributionParam, string>> = {};

  if (referrer) {
    try {
      copyAttributionParams(attribution, new URL(referrer).searchParams);
    } catch {
      // Referrer can be origin-only or malformed; request params remain the source of truth.
    }
  }

  copyAttributionParams(attribution, requestUrl.searchParams);

  return {
    ...attribution,
    event_id: eventId,
    referrer,
    request_path: `${requestUrl.pathname}${requestUrl.search}`,
    request_url: requestUrl.href,
    user_agent: userAgent,
  };
};

const getClickId = (attribution: DownloadAttribution) => {
  if (attribution.gclid) return { field: 'gclid', value: attribution.gclid };
  if (attribution.gbraid) return { field: 'gbraid', value: attribution.gbraid };
  if (attribution.wbraid) return { field: 'wbraid', value: attribution.wbraid };
  return null;
};

const fetchWithTimeout = async (
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
};

const capturePostHogDownload = async (
  attribution: DownloadAttribution,
  requestUrl: URL,
): Promise<void> => {
  const apiKey = getEnv('PUBLIC_POSTHOG_KEY');
  if (!apiKey) return;

  const host = getPostHogHost(requestUrl);
  const clickId = getClickId(attribution);

  const response = await fetchWithTimeout(`${host.replace(/\/$/, '')}/capture/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      api_key: apiKey,
      event: 'server_download_click',
      distinct_id: clickId ? `ads:${clickId.value}` : `download:${attribution.event_id}`,
      properties: {
        ...attribution,
        os: 'mac',
        channel: 'direct',
        installer_url: MAC_INSTALLER_URL,
      },
    }),
  }, REDIRECT_TIMEOUT_MS);

  if (!response.ok) {
    console.warn('PostHog download capture failed', response.status);
  }
};

const runBestEffortTracking = async (
  request: Request,
  eventId: string,
): Promise<void> => {
  const url = new URL(request.url);
  if (url.searchParams.get('dry_run') === '1') return;

  const attribution = collectAttribution(request, eventId);

  await Promise.race([
    capturePostHogDownload(attribution, url),
    new Promise((resolve) => setTimeout(resolve, REDIRECT_TIMEOUT_MS)),
  ]);
};

export const GET: APIRoute = async ({ request }) => {
  const eventId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

  try {
    await runBestEffortTracking(request, eventId);
  } catch (error) {
    console.warn('Download tracking failed', error instanceof Error ? error.message : 'unknown');
  }

  return new Response(null, {
    status: 302,
    headers: {
      location: MAC_INSTALLER_URL,
      'cache-control': 'no-store',
    },
  });
};
