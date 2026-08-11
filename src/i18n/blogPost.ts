import type { BlogLocale } from '@/data/blogSchema';

/**
 * Chrome strings for the blog post page. Nav and footer are already localized
 * through `getCopy(locale)`; these are the post-specific labels that live in the
 * route template rather than in the MDX body.
 */
export interface BlogPostCopy {
  breadcrumbHome: string;
  breadcrumbBlog: string;
  tldrLabel: string;
  jumpToSection: string;
  onThisPage: string;
  reviewedPrefix: string;
  relatedArticles: string;
  readingTime: (minutes: number) => string;
  dateLocale: string;
}

const BLOG_POST_COPY: Record<BlogLocale, BlogPostCopy> = {
  en: {
    breadcrumbHome: 'Home',
    breadcrumbBlog: 'Blog',
    tldrLabel: 'TL;DR:',
    jumpToSection: 'Jump to section',
    onThisPage: 'On this page',
    reviewedPrefix: 'Reviewed',
    relatedArticles: 'Related Articles',
    readingTime: (minutes) => `${minutes} min read`,
    dateLocale: 'en-US',
  },
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbBlog: 'Blog',
    tldrLabel: 'Kurz gesagt:',
    jumpToSection: 'Zum Abschnitt springen',
    onThisPage: 'Auf dieser Seite',
    reviewedPrefix: 'Geprüft am',
    relatedArticles: 'Weitere Artikel',
    readingTime: (minutes) => `${minutes} Min. Lesezeit`,
    dateLocale: 'de-DE',
  },
  fr: {
    breadcrumbHome: 'Accueil',
    breadcrumbBlog: 'Blog',
    tldrLabel: 'En bref :',
    jumpToSection: 'Aller à la section',
    onThisPage: 'Sur cette page',
    reviewedPrefix: 'Vérifié le',
    relatedArticles: 'Articles associés',
    readingTime: (minutes) => `${minutes} min de lecture`,
    dateLocale: 'fr-FR',
  },
  es: {
    breadcrumbHome: 'Inicio',
    breadcrumbBlog: 'Blog',
    tldrLabel: 'En resumen:',
    jumpToSection: 'Ir a la sección',
    onThisPage: 'En esta página',
    reviewedPrefix: 'Revisado el',
    relatedArticles: 'Artículos relacionados',
    readingTime: (minutes) => `${minutes} min de lectura`,
    dateLocale: 'es-ES',
  },
  'pt-br': {
    breadcrumbHome: 'Início',
    breadcrumbBlog: 'Blog',
    tldrLabel: 'Resumo:',
    jumpToSection: 'Ir para a seção',
    onThisPage: 'Nesta página',
    reviewedPrefix: 'Revisado em',
    relatedArticles: 'Artigos relacionados',
    readingTime: (minutes) => `${minutes} min de leitura`,
    dateLocale: 'pt-BR',
  },
  it: {
    breadcrumbHome: 'Home',
    breadcrumbBlog: 'Blog',
    tldrLabel: 'In breve:',
    jumpToSection: 'Vai alla sezione',
    onThisPage: 'In questa pagina',
    reviewedPrefix: 'Revisionato il',
    relatedArticles: 'Articoli correlati',
    readingTime: (minutes) => `${minutes} min di lettura`,
    dateLocale: 'it-IT',
  },
  nl: {
    breadcrumbHome: 'Home',
    breadcrumbBlog: 'Blog',
    tldrLabel: 'Kort gezegd:',
    jumpToSection: 'Ga naar sectie',
    onThisPage: 'Op deze pagina',
    reviewedPrefix: 'Gecontroleerd op',
    relatedArticles: 'Gerelateerde artikelen',
    readingTime: (minutes) => `${minutes} min leestijd`,
    dateLocale: 'nl-NL',
  },
  tr: {
    breadcrumbHome: 'Ana Sayfa',
    breadcrumbBlog: 'Blog',
    tldrLabel: 'Kısaca:',
    jumpToSection: 'Bölüme git',
    onThisPage: 'Bu sayfada',
    reviewedPrefix: 'İncelenme tarihi',
    relatedArticles: 'İlgili Yazılar',
    readingTime: (minutes) => `${minutes} dk okuma`,
    dateLocale: 'tr-TR',
  },
  ja: {
    breadcrumbHome: 'ホーム',
    breadcrumbBlog: 'ブログ',
    tldrLabel: '要約：',
    jumpToSection: 'セクションへ移動',
    onThisPage: 'このページの内容',
    reviewedPrefix: '確認日',
    relatedArticles: '関連記事',
    readingTime: (minutes) => `読了時間：${minutes}分`,
    dateLocale: 'ja-JP',
  },
  ko: {
    breadcrumbHome: '홈',
    breadcrumbBlog: '블로그',
    tldrLabel: '요약:',
    jumpToSection: '섹션으로 이동',
    onThisPage: '이 페이지의 내용',
    reviewedPrefix: '검토일',
    relatedArticles: '관련 글',
    readingTime: (minutes) => `${minutes}분 소요`,
    dateLocale: 'ko-KR',
  },
  'zh-cn': {
    breadcrumbHome: '首页',
    breadcrumbBlog: '博客',
    tldrLabel: '简要说明：',
    jumpToSection: '跳转到章节',
    onThisPage: '本页内容',
    reviewedPrefix: '审核日期',
    relatedArticles: '相关文章',
    readingTime: (minutes) => `阅读需 ${minutes} 分钟`,
    dateLocale: 'zh-CN',
  },
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbBlog: 'المدونة',
    tldrLabel: 'الخلاصة:',
    jumpToSection: 'انتقل إلى القسم',
    onThisPage: 'في هذه الصفحة',
    reviewedPrefix: 'تاريخ المراجعة',
    relatedArticles: 'مقالات ذات صلة',
    readingTime: (minutes) => `${minutes} دقائق للقراءة`,
    dateLocale: 'ar-SA',
  },
};

export function getBlogPostCopy(locale: BlogLocale): BlogPostCopy {
  return BLOG_POST_COPY[locale] ?? BLOG_POST_COPY.en;
}

/**
 * Label for the visible link to a post's counterpart, written in the language of
 * the page being linked *to* — a German reader landing on the English article
 * should recognise the invitation without reading English first.
 */
export const TRANSLATION_LINK_LABEL: Record<BlogLocale, string> = {
  en: 'Read in English',
  de: 'Auf Deutsch lesen',
  fr: 'Lire en français',
  es: 'Leer en español',
  'pt-br': 'Ler em português',
  it: 'Leggi in italiano',
  nl: 'Lees in het Nederlands',
  tr: 'Türkçe oku',
  ja: '日本語で読む',
  ko: '한국어로 읽기',
  'zh-cn': '阅读中文版',
  ar: 'اقرأ بالعربية',
};
