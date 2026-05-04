export const DEFAULT_LOCALE = 'en';

export const LOCALES = [
  'en',
  'fr',
  'de',
  'es',
  'pt-br',
  'it',
  'nl',
  'hi',
  'ja',
  'ko',
  'zh-cn',
  'ar',
] as const;

export type Locale = (typeof LOCALES)[number];

export interface LocaleMeta {
  locale: Locale;
  slug: string;
  lang: string;
  ogLocale: string;
  label: string;
  nativeLabel: string;
  flag: string;
  dir?: 'ltr' | 'rtl';
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: {
    locale: 'en',
    slug: '',
    lang: 'en',
    ogLocale: 'en_US',
    label: 'English',
    nativeLabel: 'English',
    flag: '🌐',
  },
  de: {
    locale: 'de',
    slug: 'de',
    lang: 'de',
    ogLocale: 'de_DE',
    label: 'German',
    nativeLabel: 'Deutsch',
    flag: '🇩🇪',
  },
  fr: {
    locale: 'fr',
    slug: 'fr',
    lang: 'fr',
    ogLocale: 'fr_FR',
    label: 'French',
    nativeLabel: 'Français',
    flag: '🇫🇷',
  },
  'pt-br': {
    locale: 'pt-br',
    slug: 'pt-br',
    lang: 'pt-BR',
    ogLocale: 'pt_BR',
    label: 'Portuguese',
    nativeLabel: 'Português',
    flag: '🇧🇷',
  },
  es: {
    locale: 'es',
    slug: 'es',
    lang: 'es',
    ogLocale: 'es_ES',
    label: 'Spanish',
    nativeLabel: 'Español',
    flag: '🇪🇸',
  },
  nl: {
    locale: 'nl',
    slug: 'nl',
    lang: 'nl',
    ogLocale: 'nl_NL',
    label: 'Dutch',
    nativeLabel: 'Nederlands',
    flag: '🇳🇱',
  },
  it: {
    locale: 'it',
    slug: 'it',
    lang: 'it',
    ogLocale: 'it_IT',
    label: 'Italian',
    nativeLabel: 'Italiano',
    flag: '🇮🇹',
  },
  ja: {
    locale: 'ja',
    slug: 'ja',
    lang: 'ja',
    ogLocale: 'ja_JP',
    label: 'Japanese',
    nativeLabel: '日本語',
    flag: '🇯🇵',
  },
  ko: {
    locale: 'ko',
    slug: 'ko',
    lang: 'ko',
    ogLocale: 'ko_KR',
    label: 'Korean',
    nativeLabel: '한국어',
    flag: '🇰🇷',
  },
  'zh-cn': {
    locale: 'zh-cn',
    slug: 'zh-cn',
    lang: 'zh-CN',
    ogLocale: 'zh_CN',
    label: 'Chinese',
    nativeLabel: '中文',
    flag: '🇨🇳',
  },
  hi: {
    locale: 'hi',
    slug: 'hi',
    lang: 'hi',
    ogLocale: 'hi_IN',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    flag: '🇮🇳',
  },
  ar: {
    locale: 'ar',
    slug: 'ar',
    lang: 'ar',
    ogLocale: 'ar_SA',
    label: 'Arabic',
    nativeLabel: 'العربية',
    flag: '🇸🇦',
    dir: 'rtl',
  },
};

export const INDEXABLE_LOCALIZED_ROUTES = [
  '/',
  '/ai-file-renamer',
  '/auto-rename-files',
  '/batch-rename-files',
  '/ai-image-renamer',
  '/rename-documents-with-ai',
  '/rename-pdf-with-ai',
  '/rename-screenshots-with-ai',
  '/rename-photos-with-ai',
  '/mac',
  '/windows',
  '/methodology',
  '/byok-setup',
  '/ollama-setup',
  '/privacy-policy',
  '/terms-of-service',
  '/refund-policy',
] as const;

export const PRIVATE_LOCALIZED_ROUTES = [
  '/activate',
  '/recover',
  '/thank-you',
  '/manage-subscription',
  '/manage-subscription/confirm',
  '/404',
] as const;

export const LOCALIZED_ROUTES = [
  ...INDEXABLE_LOCALIZED_ROUTES,
  ...PRIVATE_LOCALIZED_ROUTES,
] as const;

export type LocalizedRoute = (typeof LOCALIZED_ROUTES)[number];

const LANDING_LOCALIZED_ROUTES = [
  '/',
  '/ai-file-renamer',
  '/auto-rename-files',
  '/batch-rename-files',
  '/ai-image-renamer',
  '/rename-documents-with-ai',
  '/rename-pdf-with-ai',
  '/rename-screenshots-with-ai',
  '/rename-photos-with-ai',
  '/mac',
  '/windows',
] as const;

const LIMITED_LOCALE_ROUTES: Partial<Record<Locale, readonly LocalizedRoute[]>> = {
  ar: LANDING_LOCALIZED_ROUTES,
  hi: LANDING_LOCALIZED_ROUTES,
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && (LOCALES as readonly string[]).includes(value));
}

export function isLocalizedRoute(value: string): value is LocalizedRoute {
  return (LOCALIZED_ROUTES as readonly string[]).includes(value);
}

export function normalizeRoute(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  return path;
}

export function getLocalizedPath(route: string, locale: Locale = DEFAULT_LOCALE): string {
  const normalizedRoute = normalizeRoute(route);
  if (locale === DEFAULT_LOCALE) return normalizedRoute;

  const prefix = `/${LOCALE_META[locale].slug}`;
  return normalizedRoute === '/' ? prefix : `${prefix}${normalizedRoute}`;
}

export function stripLocaleFromPath(pathname: string): { locale: Locale; route: string } {
  const normalizedPath = normalizeRoute(pathname);
  const [, maybeLocale, ...rest] = normalizedPath.split('/');

  if (isLocale(maybeLocale)) {
    const route = rest.length > 0 ? `/${rest.join('/')}` : '/';
    return { locale: maybeLocale, route: normalizeRoute(route) };
  }

  return { locale: DEFAULT_LOCALE, route: normalizedPath };
}

export function getLocaleBasePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '/' : `/${LOCALE_META[locale].slug}`;
}

export function getAlternatePaths(route: string): Partial<Record<Locale, string>> {
  return Object.fromEntries(
    getLocalesForRoute(route).map((locale) => [locale, getLocalizedPath(route, locale)]),
  ) as Partial<Record<Locale, string>>;
}

export function getLocalesForRoute(route: string): readonly Locale[] {
  const normalizedRoute = normalizeRoute(route);

  return LOCALES.filter((locale) => {
    const limitedRoutes = LIMITED_LOCALE_ROUTES[locale];
    return !limitedRoutes || (limitedRoutes as readonly string[]).includes(normalizedRoute);
  });
}
