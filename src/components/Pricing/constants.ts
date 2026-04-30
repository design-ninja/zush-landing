import {
  FolderPlus,
  Zap,
  Globe,
  Command,
  Key,
  Bot,
  Tags,
  MessageSquareText,
  LucideIcon,
} from 'lucide-react';
import { PRO_PADDLE_PRICE_ID } from '@/constants/pricing';

interface Feature {
  title: string;
  desc: string;
  icon: LucideIcon;
  groupBreakBefore?: boolean;
}

interface Plan {
  name: string;
  description: string;
  features: Feature[];
  buttonText: string;
  isPro: boolean;
  price?: string;
  billing?: string;
  paddlePriceId?: string;
  highlight?: boolean;
}

export const PRO_PLAN: Plan = {
  name: 'Zush PRO 🌟',
  description: 'One-time purchase • Lifetime access',
  features: [
    {
      title: '10,000 Credits',
      desc: 'Process up to 10,000 files, then use BYOK or Offline AI mode',
      icon: Zap,
    },
    {
      title: 'BYOK - Bring Your Own Key',
      desc: 'Use your provider key for unlimited cloud renames',
      icon: Key,
    },
    {
      title: 'Offline AI mode',
      desc: 'Private local models via Ollama',
      icon: Bot,
    },
    {
      title: 'Folders Monitor',
      desc: 'Auto-rename new files as they land in watched folders',
      icon: FolderPlus,
      groupBreakBefore: true,
    },
    {
      title: 'Smart Naming & Metadata',
      desc: 'Customize naming patterns and auto-tag files with Finder metadata',
      icon: Tags,
    },
    {
      title: 'Custom AI Prompts',
      desc: 'Personalize AI behavior with your own rename and tagging instructions',
      icon: MessageSquareText,
    },
    {
      title: 'Localization (60+ languages)',
      desc: 'File names in any language with custom date format',
      icon: Globe,
    },
    {
      title: 'Quick Rename Shortcut',
      desc: 'Rename selected files in Finder with a keyboard shortcut',
      icon: Command,
    },
  ],
  buttonText: 'Buy Zush PRO 🌟',
  isPro: true,
  price: '$10',
  billing: 'one-time',
  paddlePriceId: PRO_PADDLE_PRICE_ID,
  highlight: true,
};

export { type Feature, type Plan };
