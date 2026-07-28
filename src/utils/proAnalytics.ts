import {
  PRO_MONTHLY_PADDLE_PRICE_ID,
  PRO_ONE_TIME_PADDLE_PRICE_ID,
  PRO_PRICING,
} from '@/constants/pricing';

export type ProPlanId = 'monthly' | 'one-time';

export interface ProPlanAnalytics {
  plan: ProPlanId;
  price_usd: number;
  price_label: string;
  billing: 'monthly' | 'one-time';
  paddle_price_id: string;
}

const PRO_PLAN_ANALYTICS: Record<ProPlanId, ProPlanAnalytics> = {
  monthly: {
    plan: 'monthly',
    price_usd: PRO_PRICING.monthly.usd,
    price_label: PRO_PRICING.monthly.label,
    billing: 'monthly',
    paddle_price_id: PRO_MONTHLY_PADDLE_PRICE_ID,
  },
  'one-time': {
    plan: 'one-time',
    price_usd: PRO_PRICING.oneTime.usd,
    price_label: PRO_PRICING.oneTime.label,
    billing: 'one-time',
    paddle_price_id: PRO_ONE_TIME_PADDLE_PRICE_ID,
  },
};

export function getProPlanAnalyticsFromPriceId(
  priceId: string | null | undefined,
): ProPlanAnalytics | null {
  if (!priceId) return null;

  return Object.values(PRO_PLAN_ANALYTICS).find(
    (plan) => plan.paddle_price_id === priceId,
  ) ?? null;
}
