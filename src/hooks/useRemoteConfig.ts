import { useState, useEffect } from 'react';
import { SUPABASE_URL } from '../utils/supabase';

interface RemoteConfig {
  free_tier_limit: number;
  pro_monthly_limit: number;
}

const DEFAULTS: RemoteConfig = {
  free_tier_limit: 50,
  pro_monthly_limit: 10000,
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
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch config:', error);
        setLoading(false);
      });
  }, []);

  return { config, loading };
};
