import { Cpu, KeyRound, Sparkles, LucideIcon } from 'lucide-react';
import {
  PRO_MONTHLY_PADDLE_PRICE_ID,
  PRO_ONE_TIME_PADDLE_PRICE_ID,
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
    title: 'Unlimited PRO renames',
    desc: 'Remove the cloud rename limit',
    icon: Sparkles,
    tone: 'orange',
  },
  {
    title: 'Bring Your Own Key',
    desc: 'Unlimited cloud renames with your key',
    icon: KeyRound,
    tone: 'green',
  },
  {
    title: 'Offline AI mode',
    desc: 'Private local models via Ollama',
    icon: Cpu,
    tone: 'blue',
  },
];

export const PRICING_PLANS: Plan[] = [
  {
    id: 'monthly',
    titleSuffix: 'Monthly',
    description: 'Flexible monthly plan',
    buttonText: 'Start PRO Monthly',
    price: '$8',
    billing: '/month',
    paddlePriceId: PRO_MONTHLY_PADDLE_PRICE_ID,
  },
  {
    id: 'one-time',
    titleSuffix: 'One-Time',
    description: 'Pay once for lifetime access',
    buttonText: 'Buy PRO One-Time',
    price: '$38',
    billing: 'one-time',
    priceNote: 'Pays off in ~5 months',
    paddlePriceId: PRO_ONE_TIME_PADDLE_PRICE_ID,
  },
];

export { type Feature, type Plan };
