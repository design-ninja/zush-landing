import { getSeoForPath, type SeoMeta } from '@/seo/config';
import { DEFAULT_LOCALE, LOCALIZATION_PAUSED, getLocalizedPath, type Locale, type LocalizedRoute } from '@/i18n/config';
import { getCopy } from '@/i18n/copy';

const PLATFORM_SEO: Partial<Record<Locale, Partial<Record<'/mac' | '/windows', { title: string; description: string }>>>> = {
  de: {
    '/mac': {
      title: 'Zush für Mac — KI-Dateiumbenenner & Stapel-Umbenennung für macOS',
      description:
        'Benenne Screenshots, Audio, Videos, PDFs, Fotos und Dokumente auf dem Mac mit KI stapelweise um. Unterstützt Apple Silicon, Intel, BYOK und Offline-KI über Ollama.',
    },
    '/windows': {
      title: 'Zush für Windows — KI-Dateiumbenenner & Stapel-Umbenennung',
      description:
        'Benenne Screenshots, Audio, Videos, PDFs, Fotos und Dokumente unter Windows mit KI stapelweise um. Installation über den Microsoft Store, automatische Updates und kostenloser Test.',
    },
  },
  fr: {
    '/mac': {
      title: 'Zush pour Mac — Renommeur IA & outil de renommage par lot',
      description:
        'Renommez screenshots, audio, vidéos, PDF, photos et documents par lot sur Mac avec l’IA. Compatible Apple Silicon, Intel, BYOK et mode IA hors ligne via Ollama.',
    },
    '/windows': {
      title: 'Zush pour Windows — Renommeur IA & outil de renommage par lot',
      description:
        'Renommez screenshots, audio, vidéos, PDF, photos et documents par lot sur Windows avec l’IA. Installation via Microsoft Store, mises à jour automatiques et essai gratuit.',
    },
  },
  'pt-br': {
    '/mac': {
      title: 'Zush para Mac — Renomeador com IA e renomeação em lote',
      description:
        'Renomeie screenshots, áudio, vídeos, PDFs, fotos e documentos em lote no Mac com IA. Compatível com Apple Silicon, Intel, BYOK e modo IA offline via Ollama.',
    },
    '/windows': {
      title: 'Zush para Windows — Renomeador com IA e renomeação em lote',
      description:
        'Renomeie screenshots, áudio, vídeos, PDFs, fotos e documentos em lote no Windows com IA. Instalação pela Microsoft Store, atualizações automáticas e teste grátis.',
    },
  },
  es: {
    '/mac': {
      title: 'Zush para Mac — Renombrador IA y renombrado por lotes',
      description:
        'Renombra capturas, audio, videos, PDFs, fotos y documentos por lotes en Mac con IA. Compatible con Apple Silicon, Intel, BYOK y modo IA offline mediante Ollama.',
    },
    '/windows': {
      title: 'Zush para Windows — Renombrador IA y renombrado por lotes',
      description:
        'Renombra capturas, audio, videos, PDFs, fotos y documentos por lotes en Windows con IA. Instalación desde Microsoft Store, actualizaciones automáticas y prueba gratis.',
    },
  },
  nl: {
    '/mac': {
      title: 'Zush voor Mac — AI-bestandshernoemer & bulk-hernoemtool',
      description:
        'Hernoem screenshots, audio, video’s, PDFs, foto’s en documenten in bulk op Mac met AI. Ondersteunt Apple Silicon, Intel, BYOK en Offline AI via Ollama.',
    },
    '/windows': {
      title: 'Zush voor Windows — AI-bestandshernoemer & bulk-hernoemtool',
      description:
        'Hernoem screenshots, audio, video’s, PDFs, foto’s en documenten in bulk op Windows met AI. Installatie via Microsoft Store, automatische updates en gratis proberen.',
    },
  },
  it: {
    '/mac': {
      title: 'Zush per Mac — Rinomina file IA e strumento batch',
      description:
        'Rinomina screenshot, audio, video, PDF, foto e documenti in batch su Mac con l’IA. Supporta Apple Silicon, Intel, BYOK e modalità IA offline tramite Ollama.',
    },
    '/windows': {
      title: 'Zush per Windows — Rinomina file IA e strumento batch',
      description:
        'Rinomina screenshot, audio, video, PDF, foto e documenti in batch su Windows con l’IA. Installazione dal Microsoft Store, aggiornamenti automatici e prova gratuita.',
    },
  },
  ja: {
    '/mac': {
      title: 'Zush for Mac — AIファイルリネーム & 一括リネームツール',
      description:
        'Mac でスクリーンショット、音声、動画、PDF、写真、文書を AI で一括リネーム。Apple Silicon、Intel、BYOK、Ollama によるオフライン AI に対応。',
    },
    '/windows': {
      title: 'Zush for Windows — AIファイルリネーム & 一括リネームツール',
      description:
        'Windows でスクリーンショット、音声、動画、PDF、写真、文書を AI で一括リネーム。Microsoft Store からインストールでき、自動更新と無料体験に対応。',
    },
  },
  ko: {
    '/mac': {
      title: 'Mac용 Zush — AI 파일 이름 변경 및 일괄 이름 변경 도구',
      description:
        'Mac에서 스크린샷, 오디오, 비디오, PDF, 사진, 문서를 AI로 일괄 이름 변경하세요. Apple Silicon, Intel, BYOK, Ollama 오프라인 AI를 지원합니다.',
    },
    '/windows': {
      title: 'Windows용 Zush — AI 파일 이름 변경 및 일괄 이름 변경 도구',
      description:
        'Windows에서 스크린샷, 오디오, 비디오, PDF, 사진, 문서를 AI로 일괄 이름 변경하세요. Microsoft Store 설치, 자동 업데이트, 무료 체험을 지원합니다.',
    },
  },
  'zh-cn': {
    '/mac': {
      title: 'Zush for Mac — macOS AI 文件重命名与批量重命名工具',
      description: '在 Mac 上用 AI 批量重命名截图、音频、视频、PDF、照片和文档。支持 Apple Silicon、Intel、BYOK 和 Ollama 离线 AI。',
    },
    '/windows': {
      title: 'Zush for Windows — Windows AI 文件重命名与批量重命名工具',
      description: '在 Windows 上用 AI 批量重命名截图、音频、视频、PDF、照片和文档。通过 Microsoft Store 安装，可免费试用。',
    },
  },
  hi: {
    '/mac': {
      title: 'Mac के लिए Zush — AI file renamer और batch rename tool',
      description:
        'Mac पर screenshots, audio, videos, PDFs, photos और documents को AI से batch rename करें। Apple Silicon, Intel, BYOK और Ollama Offline AI support।',
    },
    '/windows': {
      title: 'Windows के लिए Zush — AI file renamer और batch rename tool',
      description:
        'Windows पर screenshots, audio, videos, PDFs, photos और documents को AI से batch rename करें। Microsoft Store install, auto-updates और free trial।',
    },
  },
  ar: {
    '/mac': {
      title: 'Zush لنظام Mac — أداة إعادة تسمية ملفات بالذكاء الاصطناعي وبالدفعات',
      description:
        'أعد تسمية لقطات الشاشة والصوت والفيديو وملفات PDF والصور والمستندات على Mac بالدفعات عبر الذكاء الاصطناعي. يدعم Apple Silicon وIntel وBYOK ووضع Ollama دون اتصال.',
    },
    '/windows': {
      title: 'Zush لنظام Windows — أداة إعادة تسمية ملفات بالذكاء الاصطناعي وبالدفعات',
      description:
        'أعد تسمية لقطات الشاشة والصوت والفيديو وملفات PDF والصور والمستندات على Windows بالدفعات عبر الذكاء الاصطناعي. تثبيت من Microsoft Store وتحديثات تلقائية وتجربة مجانية.',
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
