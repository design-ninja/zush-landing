import { getSeoForPath, type SeoMeta } from '@/seo/config';
import { getLocalizedPath, type Locale, type LocalizedRoute } from '@/i18n/config';
import { getCopy } from '@/i18n/copy';

export function getLocalizedSeoForRoute(route: LocalizedRoute, locale: Locale): SeoMeta {
  const seo = getSeoForPath(route);
  const copy = getCopy(locale);
  const localizedSeo = copy.seo[route];
  const featureSeo = copy.featurePages[route];

  return {
    ...seo,
    title: localizedSeo?.title ?? (featureSeo ? `${featureSeo.h1} · Zush` : seo.title),
    description: localizedSeo?.description ?? featureSeo?.definitionText ?? seo.description,
    canonicalPath: getLocalizedPath(route, locale),
  };
}
