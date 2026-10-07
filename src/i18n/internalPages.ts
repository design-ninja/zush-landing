import type { Locale } from '@/i18n/config';
import { getLocalizedPath } from '@/i18n/config';
import { getLegalMarkdown, type LegalRoute } from '@/i18n/legalPages';
import { getStaticPageCopy, type StaticLocalizedRoute } from '@/i18n/staticPages';

type InternalLocale = Exclude<Locale, 'en'>;
type LegalType = 'privacy' | 'tos' | 'refund';

const backToHome: Partial<Record<InternalLocale, string>> = {
  de: 'Zurück zur Startseite',
  fr: 'Retour à l’accueil',
  'pt-br': 'Voltar ao início',
  es: 'Volver al inicio',
  nl: 'Terug naar home',
  it: 'Torna alla home',
  ja: 'ホームに戻る',
  ko: '홈으로 돌아가기',
  'zh-cn': '返回首页',
};

export function getLegalPageCopy(locale: InternalLocale, route: LegalRoute): {
  type: LegalType;
  title: string;
  updated?: string;
  content: string;
  backToHomeLabel: string;
  homeHref: string;
} {
  const staticCopy = getStaticPageCopy(locale, route as StaticLocalizedRoute);
  const type: Record<LegalRoute, LegalType> = {
    '/privacy-policy': 'privacy',
    '/terms-of-service': 'tos',
    '/refund-policy': 'refund',
  };
  return {
    type: type[route],
    title: staticCopy.title,
    updated: staticCopy.updated,
    content: getLegalMarkdown(locale, route),
    backToHomeLabel: backToHome[locale] ?? backToHome.de!,
    homeHref: getLocalizedPath('/', locale),
  };
}
