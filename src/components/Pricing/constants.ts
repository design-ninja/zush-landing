import {
  FolderPlus,
  Zap,
  FileCode,
  Globe,
  Command,
  Key,
  Infinity,
  Tags,
  LucideIcon,
} from 'lucide-react';

interface Feature {
  title: string;
  desc: string;
  icon: LucideIcon;
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

export const FREE_PLAN: Plan = {
  name: 'Zush Free',
  description: '30 credits + All PRO features',
  features: [
    {
      title: 'Multiple Folders',
      desc: 'Monitor multiple folders simultaneously',
      icon: FolderPlus,
    },
    {
      title: 'Smart Metadata Tags',
      desc: 'Automatically add Finder tags and Spotlight metadata',
      icon: Tags,
    },
    {
      title: 'Custom Naming Patterns',
      desc: 'Create your own file naming pattern with variables',
      icon: FileCode,
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
  buttonText: 'Download Free',
  isPro: false,
  price: '$0',
};

export const PRO_PLAN: Plan = {
  name: 'Zush PRO 🌟',
  description: 'One-time purchase • Lifetime access',
  features: [
    {
      title: '10,000 Credits',
      desc: 'Process up to 10,000 images, then use BYOK for unlimited',
      icon: Zap,
    },
    {
      title: 'BYOK - Bring Your Own Key',
      desc: 'Use your API key for unlimited processing',
      icon: Key,
    },
    {
      title: 'Folders Monitor',
      desc: 'Auto-rename new images as they land in watched folders',
      icon: FolderPlus,
    },
    {
      title: 'Smart Metadata Tags',
      desc: 'Automatically add Finder tags and Spotlight metadata',
      icon: Tags,
    },
    {
      title: 'Custom Naming Patterns',
      desc: 'Create your own file naming pattern with variables',
      icon: FileCode,
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
  paddlePriceId: 'pri_01ke0rya71hzwhy8y1wdt76v1y',
  highlight: true,
};

export { type Feature, type Plan };
