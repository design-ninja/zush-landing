import {
  PRO_MONTHLY_PADDLE_PRICE_ID,
  PRO_ONE_TIME_PADDLE_PRICE_ID,
} from '@/constants/pricing';

export type ProPlanId = 'monthly' | 'one-time';

export interface ProPlanAnalytics {
  plan: ProPlanId;
  price_usd: number;
  price_label: '$8' | '$38';
  billing: 'monthly' | 'one-time';
  paddle_price_id: string;
}

const PRO_PLAN_ANALYTICS: Record<ProPlanId, ProPlanAnalytics> = {
  monthly: {
    plan: 'monthly',
    price_usd: 8,
    price_label: '$8',
    billing: 'monthly',
    paddle_price_id: PRO_MONTHLY_PADDLE_PRICE_ID,
  },
  'one-time': {
    plan: 'one-time',
    price_usd: 38,
    price_label: '$38',
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

