import { useState, useEffect } from 'react';
import { SUPABASE_URL } from '../utils/supabase';

type BillingPeriod = 'monthly' | 'annual';

export interface CreditPack {
  price_id: string;
  credits: number;
  period: BillingPeriod;
}

interface RemoteConfig {
  free_tier_limit: number;
  pro_daily_limit: number;
  credit_packs: CreditPack[];
  image_extensions: string[];
  ai_provider: string;
  ai_model: string;
  refund_period_days: number;
  min_macos_version: string;
  min_macos_name: string;
}

const DEFAULTS: RemoteConfig = {
  free_tier_limit: 30,
  pro_daily_limit: 5000,
  credit_packs: [],
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

const normalizeCreditPacks = (value: unknown): CreditPack[] => {
  const raw = Array.isArray(value) ? value : [];
  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }
      const record = item as Record<string, unknown>;
      const priceId = typeof record.price_id === 'string' ? record.price_id : null;
      const credits =
        typeof record.credits === 'number'
          ? record.credits
          : parseInt(String(record.credits), 10);
      const period = record.period;
      if (
        !priceId ||
        !Number.isFinite(credits) ||
        (period !== 'monthly' && period !== 'annual')
      ) {
        return null;
      }
      return {
        price_id: priceId,
        credits,
        period,
      } as CreditPack;
    })
    .filter((pack): pack is CreditPack => Boolean(pack));
};

export const useRemoteConfig = () => {
  const [config, setConfig] = useState<RemoteConfig>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SUPABASE_URL}/functions/v1/config`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const creditPacks = normalizeCreditPacks(data.credit_packs);
        setConfig({
          free_tier_limit: data.free_tier_limit ?? DEFAULTS.free_tier_limit,
          pro_daily_limit: data.pro_daily_limit ?? DEFAULTS.pro_daily_limit,
          credit_packs: creditPacks.length > 0 ? creditPacks : DEFAULTS.credit_packs,
          image_extensions: Array.isArray(data.image_extensions)
            ? data.image_extensions
            : DEFAULTS.image_extensions,
          ai_provider: data.ai_provider ?? DEFAULTS.ai_provider,
          ai_model: data.ai_model ?? DEFAULTS.ai_model,
          refund_period_days:
            data.refund_period_days ?? DEFAULTS.refund_period_days,
          min_macos_version:
            data.min_macos_version ?? DEFAULTS.min_macos_version,
          min_macos_name: data.min_macos_name ?? DEFAULTS.min_macos_name,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch config:', error);
        setConfig(DEFAULTS);
        setLoading(false);
      });
  }, []);

  return { config, loading };
};
