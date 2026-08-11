import type { Locale } from '@/i18n/config';
import type { HomeCopy } from '@/i18n/copy';
import type { ProfessionLocaleCopy } from '@/i18n/professions/types';

type LocalizedContentModule = {
  home: HomeCopy;
  professions: ProfessionLocaleCopy;
};

const modules = import.meta.glob<LocalizedContentModule>(
  './{de,fr,es,pt-br,it,nl,tr,ja,ko,zh-cn,ar}.ts',
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

  return content;
}
