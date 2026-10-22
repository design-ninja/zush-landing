import type { Locale } from '@/i18n/config';
import type { FeatureCopy } from '@/i18n/copy';
import type { LandingWorkflow } from '@/data/landingWorkflows';
import de from './aiFileOrganizer/de.json';
import fr from './aiFileOrganizer/fr.json';
import es from './aiFileOrganizer/es.json';
import ptBr from './aiFileOrganizer/pt-br.json';
import it from './aiFileOrganizer/it.json';
import nl from './aiFileOrganizer/nl.json';
import tr from './aiFileOrganizer/tr.json';
import ja from './aiFileOrganizer/ja.json';
import ko from './aiFileOrganizer/ko.json';
import zhCn from './aiFileOrganizer/zh-cn.json';

export interface AiFileOrganizerLocaleCopy extends FeatureCopy {
  seo: { title: string; description: string };
  workflow: LandingWorkflow;
  relatedPages: Array<{ title: string; href: string }>;
  relatedBlogPosts: Array<{ title: string; href: string }>;
  contextualGuideLink: { before: string; label: string; href: string; after: string };
  howTo: {
    name: string;
    description: string;
    step: Array<{ name: string; text: string }>;
  };
}

export const AI_FILE_ORGANIZER_LOCALIZED: Record<Exclude<Locale, 'en'>, AiFileOrganizerLocaleCopy> = {
  de, fr, es, 'pt-br': ptBr, it, nl, tr, ja, ko, 'zh-cn': zhCn,
};
