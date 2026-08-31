import { Sparkles, LucideIcon } from 'lucide-react';
import {
  PRO_MONTHLY_PADDLE_PRICE_ID,
  PRO_ONE_TIME_PADDLE_PRICE_ID,
  PRO_PRICING,
} from '@/constants/pricing';

interface Feature {
  title: string;
  desc: string;
  icon: LucideIcon;
  tone: 'orange' | 'green' | 'blue' | 'purple' | 'pink' | 'teal';
}

interface Plan {
  id: 'monthly' | 'one-time';
  titleSuffix: 'Monthly' | 'One-Time';
  description: string;
  buttonText: string;
  price: string;
  billing: string;
  priceNote?: string;
  paddlePriceId?: string;
}

export const PRO_FEATURES: Feature[] = [
  {
    title: 'Unlimited AI Renames',
    desc: 'Remove the 50-rename limit across Zush Cloud, BYOK, LM Studio, and Ollama',
    icon: Sparkles,
    tone: 'orange',
  },
];

export const PRICING_PLANS: Plan[] = [
  {
    id: 'monthly',
    titleSuffix: 'Monthly',
    description: 'Flexible monthly plan',
    buttonText: 'Start PRO Monthly',
    price: PRO_PRICING.monthly.label,
    billing: '/month',
    paddlePriceId: PRO_MONTHLY_PADDLE_PRICE_ID,
  },
  {
    id: 'one-time',
    titleSuffix: 'One-Time',
    description: 'Pay once for lifetime access',
    buttonText: 'Buy PRO One-Time',
    price: PRO_PRICING.oneTime.label,
    billing: 'one-time',
    priceNote: 'Pays off in ~5 months',
    paddlePriceId: PRO_ONE_TIME_PADDLE_PRICE_ID,
  },
];

export { type Feature, type Plan };
