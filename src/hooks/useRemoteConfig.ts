import { APP_CONFIG } from '../constants';

interface AppConfig {
  free_tier_limit: number;
  pro_limit: number;
  image_extensions: string[];
  ai_provider: string;
  refund_period_days: number;
  min_macos_version: string;
  min_macos_name: string;
}

const config: AppConfig = {
  ...APP_CONFIG,
};

export const useRemoteConfig = () => {
  return { config, loading: false };
};
