// App URLs
export const DOWNLOAD_URL = 'https://zushapp.com/releases/Zush.dmg';
export const SUPPORT_EMAIL = 'support@zushapp.com';

// System requirements
export const MIN_MACOS_VERSION = 'Sonoma and newer';

// Pricing (simplified model: one-time purchase only)
// Note: Legacy types kept for backwards compatibility with existing code
export type BillingPeriod = 'monthly' | 'annual';

export interface CreditPack {
  price_id: string;
  credits: number;
  period: BillingPeriod;
  price: number;
}

// Legacy credit packs array - kept for backwards compatibility
// New pricing model uses single one-time purchase from PRO_PLAN.paddlePriceId
export const CREDIT_PACKS: CreditPack[] = [];

// Config
export const APP_CONFIG = {
  free_tier_limit: 30,
  pro_limit: 10000,
  image_extensions: [
    'png',
    'jpg',
    'jpeg',
    'webp',
    'gif',
    'bmp',
    'tiff',
    'tif',
    'heic',
    'heif',
    'svg',
    'pdf',
  ],
  ai_provider: 'Groq',
  ai_model: 'Llama 4 Scout 17B',
  refund_period_days: 14,
  min_macos_version: '14.0',
  min_macos_name: 'Sonoma',
};
