// App URLs
export const DOWNLOAD_URL = 'https://zushapp.com/releases/Zush.dmg';
export const SUPPORT_EMAIL = 'support@zushapp.com';

// System requirements
export const MIN_MACOS_VERSION = 'Ventura and newer';

// Pricing
export type BillingPeriod = 'monthly' | 'annual';

export interface CreditPack {
  price_id: string;
  credits: number;
  period: BillingPeriod;
  price: number;
}

export const CREDIT_PACKS: CreditPack[] = [
  // Monthly
  { price_id: 'pri_01kfaj92syw1ffebs0h6cvt9tn', credits: 500, period: 'monthly', price: 5 },
  { price_id: 'pri_01kfaj9y15jpjzyrk849py96mf', credits: 2000, period: 'monthly', price: 10 },
  { price_id: 'pri_01kfajar4pr9cy5nnag11rfan9', credits: 5000, period: 'monthly', price: 20 },
  { price_id: 'pri_01kfajbkxw8syb1ezm6v9tq7f1', credits: 10000, period: 'monthly', price: 35 },
  // Annual
  { price_id: 'pri_01kfajczsq5r5yr8ma4p95w6km', credits: 500, period: 'annual', price: 50 },
  { price_id: 'pri_01kfaje2p2wzx2q2yw2hjsetq6', credits: 2000, period: 'annual', price: 80 },
  { price_id: 'pri_01kfajf11twd2pv9dpw16pr4y8', credits: 5000, period: 'annual', price: 130 },
  { price_id: 'pri_01kfajfwchd4hvbnq6yqcz4rvm', credits: 10000, period: 'annual', price: 200 },
];

// Config
export const APP_CONFIG = {
  free_tier_limit: 30,
  pro_daily_limit: 5000,
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
  min_macos_version: '13.0',
  min_macos_name: 'Ventura',
};
