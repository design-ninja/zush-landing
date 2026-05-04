import { SUPABASE_URL } from '@/utils/supabase';
import type { Locale } from '@/i18n/config';

const WEB_PREVIEW_DEV_BYPASS_TOKEN = import.meta.env.DEV
  ? import.meta.env.PUBLIC_WEB_PREVIEW_DEV_BYPASS_TOKEN?.trim()
  : undefined;

export type WebPreviewEventType =
  | 'analysis_completed'
  | 'analysis_failed'
  | 'client_prepare_failed'
  | 'client_request_failed'
  | 'download_after_demo';

export interface WebPreviewFileSummary {
  extension: string;
  mime_type: string;
  content_kind: 'image' | 'text' | 'document';
  page_count?: number | null;
  preview_pages?: number;
  has_text?: boolean;
  image_count?: number;
  size_bytes?: number | null;
}

export interface WebPreviewEventPayload {
  event_type: WebPreviewEventType;
  visitor_id: string;
  run_id?: string | null;
  locale?: Locale;
  files?: WebPreviewFileSummary[];
  file_count?: number;
  success_count?: number;
  error_count?: number;
  duration_ms?: number | null;
  provider?: string | null;
  model?: string | null;
  fallback_provider?: string | null;
  fallback_model?: string | null;
  error_message?: string | null;
  error_details?: Record<string, unknown> | null;
}

export function sendWebPreviewEvent(payload: WebPreviewEventPayload, options: { beacon?: boolean } = {}) {
  const body = JSON.stringify(payload);
  const url = `${SUPABASE_URL}/functions/v1/web-preview-event`;

  if (
    options.beacon &&
    !WEB_PREVIEW_DEV_BYPASS_TOKEN &&
    typeof navigator !== 'undefined' &&
    navigator.sendBeacon
  ) {
    const didQueue = navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
    if (didQueue) return;
  }

  void fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(WEB_PREVIEW_DEV_BYPASS_TOKEN
        ? { 'x-zush-demo-dev-bypass': WEB_PREVIEW_DEV_BYPASS_TOKEN }
        : {}),
    },
    body,
    keepalive: options.beacon,
  }).catch((error) => {
    console.warn('[WebPreview] Failed to send event:', error);
  });
}
