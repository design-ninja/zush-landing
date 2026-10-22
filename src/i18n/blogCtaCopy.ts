import type { Locale } from '@/i18n/config';
import de from './blogCtaCopy/de.json';
import fr from './blogCtaCopy/fr.json';
import es from './blogCtaCopy/es.json';
import ptBr from './blogCtaCopy/pt-br.json';
import it from './blogCtaCopy/it.json';
import nl from './blogCtaCopy/nl.json';
import tr from './blogCtaCopy/tr.json';
import ja from './blogCtaCopy/ja.json';
import ko from './blogCtaCopy/ko.json';
import zhCn from './blogCtaCopy/zh-cn.json';

interface BlogCtaCopy {
  titles: Record<'early' | 'inline' | 'footer', string>;
  descriptions: Record<'early' | 'inline' | 'footer', string>;
  hint: string;
  homepage: string;
}

const COPY: Record<Exclude<Locale, 'en'>, BlogCtaCopy> = {
  de, fr, es, 'pt-br': ptBr, it, nl, tr, ja, ko, 'zh-cn': zhCn,
};

export function getBlogCtaCopy(locale: Locale): BlogCtaCopy | undefined {
  return locale === 'en' ? undefined : COPY[locale];
}
