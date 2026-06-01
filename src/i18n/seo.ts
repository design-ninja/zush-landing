import { getSeoForPath, type SeoMeta } from '@/seo/config';
import { DEFAULT_LOCALE, LOCALIZATION_PAUSED, getLocalizedPath, type Locale, type LocalizedRoute } from '@/i18n/config';
import { getCopy } from '@/i18n/copy';

const PLATFORM_SEO: Partial<Record<Locale, Partial<Record<'/mac' | '/windows', { title: string; description: string }>>>> = {
  de: {
    '/mac': {
      title: 'Dateiumbenenner für Mac: Dateien mit KI stapelweise umbenennen | Zush',
      description:
        'Dateiumbenenner für Mac, der Dateien mit KI nach Inhalt stapelweise umbenennt. Screenshots, PDFs, Fotos, Videos, Audio, Design- und Office-Dateien.',
    },
    '/windows': {
      title: 'Dateiumbenenner für Windows: Dateien mit KI in bulk umbenennen | Zush',
      description:
        'Dateiumbenenner für Windows 11 und 10, der Dateien mit KI in bulk umbenennt. Screenshots, PDFs, Fotos, Videos, Audio, Design- und Office-Dateien.',
    },
  },
  fr: {
    '/mac': {
      title: 'Renommeur de fichiers pour Mac : renommer par lot avec l’IA | Zush',
      description:
        'Renommeur de fichiers pour Mac qui renomme les fichiers par lot selon leur contenu avec l’IA : screenshots, PDF, photos, vidéos, audio, design et documents.',
    },
    '/windows': {
      title: 'Renommeur de fichiers pour Windows : renommage en masse avec l’IA | Zush',
      description:
        'Renommeur de fichiers pour Windows 11 et 10 qui renomme en masse avec l’IA : screenshots, PDF, photos, vidéos, audio, design et documents Office.',
    },
  },
  'pt-br': {
    '/mac': {
      title: 'Renomeador de arquivos para Mac: renomear em lote com IA | Zush',
      description:
        'Renomeador de arquivos para Mac que renomeia arquivos em lote pelo conteúdo com IA: screenshots, PDFs, fotos, vídeos, áudio, design e documentos.',
    },
    '/windows': {
      title: 'Renomeador de arquivos para Windows: renomear em massa com IA | Zush',
      description:
        'Renomeador de arquivos para Windows 11 e 10 que renomeia em massa com IA: screenshots, PDFs, fotos, vídeos, áudio, design e documentos Office.',
    },
  },
  es: {
    '/mac': {
      title: 'Renombrador de archivos para Mac: renombrar por lotes con IA | Zush',
      description:
        'Renombrador de archivos para Mac que renombra por lotes según el contenido con IA: capturas, PDFs, fotos, videos, audio, diseño y documentos.',
    },
    '/windows': {
      title: 'Renombrador de archivos para Windows: renombrado masivo con IA | Zush',
      description:
        'Renombrador de archivos para Windows 11 y 10 que renombra en masa con IA: capturas, PDFs, fotos, videos, audio, diseño y documentos Office.',
    },
  },
  nl: {
    '/mac': {
      title: 'Bestandshernoemer voor Mac: bestanden batchgewijs hernoemen met AI | Zush',
      description:
        'Bestandshernoemer voor Mac die bestanden batchgewijs op inhoud hernoemt met AI: screenshots, PDFs, foto’s, video’s, audio, design en documenten.',
    },
    '/windows': {
      title: 'Bestandshernoemer voor Windows: bestanden in bulk hernoemen met AI | Zush',
      description:
        'Bestandshernoemer voor Windows 11 en 10 die bestanden in bulk hernoemt met AI: screenshots, PDFs, foto’s, video’s, audio, design en documenten.',
    },
  },
  it: {
    '/mac': {
      title: 'Rinomina file per Mac: rinominare in batch con IA | Zush',
      description:
        'Rinomina file per Mac che rinomina in batch in base al contenuto con l’IA: screenshot, PDF, foto, video, audio, design e documenti.',
    },
    '/windows': {
      title: 'Rinomina file per Windows: rinomina in massa con IA | Zush',
      description:
        'Rinomina file per Windows 11 e 10 che rinomina in massa con l’IA: screenshot, PDF, foto, video, audio, design e documenti Office.',
    },
  },
  ja: {
    '/mac': {
      title: 'Mac向けファイルリネーム: AIでファイルを一括リネーム | Zush',
      description:
        'Mac向けファイルリネーム。AIで内容に基づいてスクリーンショット、PDF、写真、動画、音声、デザインファイル、文書を一括リネームします。',
    },
    '/windows': {
      title: 'Windows向けファイルリネーム: AIで大量リネーム | Zush',
      description:
        'Windows 11/10向けファイルリネーム。AIでスクリーンショット、PDF、写真、動画、音声、デザインファイル、Office文書を大量リネームします。',
    },
  },
  ko: {
    '/mac': {
      title: 'Mac용 파일 이름 변경 도구: AI로 일괄 이름 변경 | Zush',
      description:
        'Mac용 파일 이름 변경 도구. AI로 내용을 기준으로 스크린샷, PDF, 사진, 비디오, 오디오, 디자인 파일, 문서를 일괄 이름 변경합니다.',
    },
    '/windows': {
      title: 'Windows용 파일 이름 변경 도구: AI로 대량 이름 변경 | Zush',
      description:
        'Windows 11 및 10용 파일 이름 변경 도구. AI로 스크린샷, PDF, 사진, 비디오, 오디오, 디자인 파일, Office 문서를 대량 이름 변경합니다.',
    },
  },
  'zh-cn': {
    '/mac': {
      title: 'Mac 文件重命名工具：用 AI 批量重命名文件 | Zush',
      description: 'Mac 文件重命名工具。用 AI 根据内容批量重命名截图、PDF、照片、视频、音频、设计文件和文档。',
    },
    '/windows': {
      title: 'Windows 文件重命名工具：用 AI 大量重命名文件 | Zush',
      description: 'Windows 11 和 10 文件重命名工具。用 AI 大量重命名截图、PDF、照片、视频、音频、设计文件和 Office 文档。',
    },
  },
  hi: {
    '/mac': {
      title: 'Mac के लिए File Renamer: AI से Batch Rename Files | Zush',
      description:
        'Mac file renamer जो AI से content के आधार पर files batch rename करता है: screenshots, PDFs, photos, videos, audio, design files और documents.',
    },
    '/windows': {
      title: 'Windows के लिए File Renamer: AI से Bulk Rename Files | Zush',
      description:
        'Windows 11 और 10 file renamer जो AI से files bulk rename करता है: screenshots, PDFs, photos, videos, audio, design files और Office docs.',
    },
  },
  ar: {
    '/mac': {
      title: 'أداة إعادة تسمية الملفات لنظام Mac: إعادة تسمية بالدفعات بالذكاء الاصطناعي | Zush',
      description:
        'أداة إعادة تسمية ملفات لنظام Mac تعيد تسمية الملفات بالدفعات حسب المحتوى باستخدام الذكاء الاصطناعي: لقطات الشاشة وPDF والصور والفيديو والصوت والتصميم والمستندات.',
    },
    '/windows': {
      title: 'أداة إعادة تسمية الملفات لنظام Windows: إعادة تسمية جماعية بالذكاء الاصطناعي | Zush',
      description:
        'أداة إعادة تسمية ملفات لنظامي Windows 11 و10 تعيد تسمية الملفات بكميات كبيرة بالذكاء الاصطناعي: لقطات الشاشة وPDF والصور والفيديو والصوت والتصميم ومستندات Office.',
    },
  },
};

export function getLocalizedSeoForRoute(route: LocalizedRoute, locale: Locale): SeoMeta {
  const seo = getSeoForPath(route);
  const copy = getCopy(locale);
  const localizedSeo = copy.seo[route];
  const featureSeo = copy.featurePages[route];
  const localizedPlatformSeo = route === '/mac' || route === '/windows'
    ? PLATFORM_SEO[locale]?.[route]
    : null;
  const platformSeo = route === '/mac'
    ? copy.platforms.mac
    : route === '/windows'
      ? copy.platforms.windows
      : null;

  const isNonDefaultLocale = locale !== DEFAULT_LOCALE;
  const robots = LOCALIZATION_PAUSED && isNonDefaultLocale
    ? 'noindex, nofollow'
    : seo.robots;

  return {
    ...seo,
    title: localizedPlatformSeo?.title
      ?? localizedSeo?.title
      ?? (featureSeo ? `${featureSeo.h1} · Zush` : undefined)
      ?? (platformSeo ? `${platformSeo.softwareName} — ${platformSeo.heroTitle}` : undefined)
      ?? seo.title,
    description: localizedPlatformSeo?.description
      ?? localizedSeo?.description
      ?? featureSeo?.definitionText
      ?? platformSeo?.heroSubtitle
      ?? seo.description,
    canonicalPath: getLocalizedPath(route, locale),
    robots,
  };
}
