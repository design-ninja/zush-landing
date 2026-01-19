import { APP_CONFIG, CREDIT_PACKS, CreditPack, BillingPeriod } from '../constants';

export type { CreditPack, BillingPeriod };

interface AppConfig {
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

const config: AppConfig = {
  ...APP_CONFIG,
  credit_packs: CREDIT_PACKS,
};

export const useRemoteConfig = () => {
  return { config, loading: false };
};
