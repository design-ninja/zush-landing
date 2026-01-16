import { useState, useEffect } from 'react';
import { SUPABASE_URL } from '../utils/supabase';

interface RemoteConfig {
  free_tier_limit: number;
  pro_monthly_limit: number;
  pro_monthly_limit_monthly: number;
  pro_monthly_limit_annual: number;
  pro_monthly_limit_one_time: number;
  pro_daily_limit: number;
  image_extensions: string[];
  ai_provider: string;
  ai_model: string;
  refund_period_days: number;
  min_macos_version: string;
  min_macos_name: string;
}

const DEFAULTS: RemoteConfig = {
  free_tier_limit: 30,
  pro_monthly_limit: 10000,
  pro_monthly_limit_monthly: 1000,
  pro_monthly_limit_annual: 5000,
  pro_monthly_limit_one_time: 10000,
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
        setConfig({
          free_tier_limit: data.free_tier_limit ?? DEFAULTS.free_tier_limit,
          pro_monthly_limit:
            data.pro_monthly_limit ?? DEFAULTS.pro_monthly_limit,
          pro_monthly_limit_monthly:
            data.pro_monthly_limit_monthly ??
            DEFAULTS.pro_monthly_limit_monthly,
          pro_monthly_limit_annual:
            data.pro_monthly_limit_annual ?? DEFAULTS.pro_monthly_limit_annual,
          pro_monthly_limit_one_time:
            data.pro_monthly_limit_one_time ??
            DEFAULTS.pro_monthly_limit_one_time,
          pro_daily_limit: data.pro_daily_limit ?? DEFAULTS.pro_daily_limit,
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
