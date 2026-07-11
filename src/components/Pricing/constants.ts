import {
  CalendarClock,
  Cpu,
  Gift,
  Infinity as InfinityIcon,
  KeyRound,
  RefreshCw,
  Sparkles,
  TrendingDown,
  LucideIcon,
} from 'lucide-react';
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

interface Differentiator {
  title: string;
  icon: LucideIcon;
}

interface Plan {
  id: 'monthly' | 'one-time';
  titleSuffix: 'Monthly' | 'One-Time';
  description: string;
  differentiators: Differentiator[];
  buttonText: string;
  price: string;
  billing: string;
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
    desc: 'Unlimited cloud renames with your AI API key',
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

const MONTHLY_DIFFERENTIATORS: Differentiator[] = [
  { title: 'Cancel anytime', icon: CalendarClock },
  { title: 'Lowest entry price', icon: TrendingDown },
  { title: 'No long-term commitment', icon: RefreshCw },
];

const ONE_TIME_DIFFERENTIATORS: Differentiator[] = [
  { title: 'Pay once, use forever', icon: InfinityIcon },
  { title: 'All future updates included', icon: Gift },
  { title: 'Pays off in ~5 months', icon: TrendingDown },
];

export const PRICING_PLANS: Plan[] = [
  {
    id: 'monthly',
    titleSuffix: 'Monthly',
    description: 'Flexible monthly plan',
    differentiators: MONTHLY_DIFFERENTIATORS,
    buttonText: 'Start PRO Monthly',
    price: '$8',
    billing: '/month',
    paddlePriceId: PRO_MONTHLY_PADDLE_PRICE_ID,
  },
  {
    id: 'one-time',
    titleSuffix: 'One-Time',
    description: 'Pay once for lifetime access',
    differentiators: ONE_TIME_DIFFERENTIATORS,
    buttonText: 'Buy PRO One-Time',
    price: '$38',
    billing: 'one-time',
    paddlePriceId: PRO_ONE_TIME_PADDLE_PRICE_ID,
  },
];

export { type Differentiator, type Feature, type Plan };
