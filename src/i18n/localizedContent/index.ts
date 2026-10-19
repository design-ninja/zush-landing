import { ORGANIZATION_FEATURES } from '@/i18n/organizationFeatures';
import { LOCALIZED_TOUR_EXTRAS } from '@/i18n/tourItems';
import type { Locale } from '@/i18n/config';
import type { HomeCopy } from '@/i18n/copy';
import type { ProfessionLocaleCopy } from '@/i18n/professions/types';

type LocalizedContentModule = {
  home: HomeCopy;
  professions: ProfessionLocaleCopy;
};

const modules = import.meta.glob<LocalizedContentModule>(
  './{de,fr,es,pt-br,it,nl,tr,ja,ko,zh-cn}.ts',
  { eager: true },
);

export function getLocalizedContent(
  locale: Exclude<Locale, 'en'>,
): LocalizedContentModule {
  const content = modules[`./${locale}.ts`];

  if (!content?.home || !content?.professions) {
    throw new Error(
      `Missing complete locale-owned homepage/profession content for "${locale}".`,
    );
  }

  const organization = ORGANIZATION_FEATURES[locale];
  return {
    ...content,
    home: {
      ...content.home,
      // The locale-owned showcase copy predates these tabs; share the same
      // localized captions the platform pages use instead of the English ones.
      showcase: {
        ...content.home.showcase,
        items: {
          ...content.home.showcase.items,
          ...LOCALIZED_TOUR_EXTRAS[locale],
          'offline-mode': { title: organization.offlineTitle, description: organization.offlineDescription, alt: organization.offlineDescription },
          'folder-sorting': { title: organization.sortingTab, description: organization.sortingCaption, alt: organization.sortingTitle },
          'template-transfer': { title: organization.transferTab, description: organization.transferCaption, alt: organization.transferTitle },
        },
      },
      faqItems: [
        { question: organization.sortingQuestion, answer: organization.sortingAnswer },
        { question: organization.bestSorterQuestion, answer: organization.bestSorterAnswer },
        ...content.home.faqItems,
      ],
    },
  };
}
