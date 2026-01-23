import {
  FolderPlus,
  Zap,
  FileCode,
  Folder,
  Tag,
  FileText,
  Globe,
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
  highlight?: boolean;
}

export const FREE_PLAN: Plan = {
  name: 'Zush Free',
  description: 'Basic organization for casual users',
  features: [
    {
      title: 'Single Folder',
      desc: 'Monitor one folder at a time',
      icon: Folder,
    },
    {
      title: 'Manual Metadata',
      desc: 'Add Finder tags manually',
      icon: Tag,
    },
    {
      title: 'Default Naming Pattern',
      desc: 'Use standard naming variables',
      icon: FileText,
    },
    {
      title: 'English only',
      desc: 'English file names with the default date format',
      icon: Globe,
    },
  ],
  buttonText: 'Download Free',
  isPro: false,
};

export const PRO_PLAN: Plan = {
  name: 'Zush 🌟 PRO',
  description: 'Flexible credit packs for power users',
  features: [
    {
      title: 'Multiple Folders',
      desc: 'Monitor multiple folders simultaneously',
      icon: FolderPlus,
    },
    {
      title: 'Smart Metadata',
      desc: 'Automatically add Finder tags and Spotlight metadata',
      icon: Zap,
    },
    {
      title: 'Custom Naming Pattern',
      desc: 'Create your own file naming pattern with variables',
      icon: FileCode,
    },
    {
      title: 'Localization',
      desc: 'File names in 60+ languages and custom date format',
      icon: Globe,
    },
  ],
  buttonText: 'Buy PRO Now 🌟',
  isPro: true,
  highlight: true,
};

export { type Feature, type Plan };
