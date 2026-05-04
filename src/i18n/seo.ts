import { getSeoForPath, type SeoMeta } from '@/seo/config';
import { getLocalizedPath, type Locale, type LocalizedRoute } from '@/i18n/config';
import { getCopy } from '@/i18n/copy';

const PLATFORM_SEO: Partial<Record<Locale, Partial<Record<'/mac' | '/windows', { title: string; description: string }>>>> = {
  de: {
    '/mac': {
      title: 'Zush für Mac — KI-Dateiumbenenner für macOS',
      description:
        'Benenne Screenshots, PDFs, Fotos und Dokumente auf dem Mac mit KI um. Unterstützt Apple Silicon, Intel, BYOK und Offline-KI über Ollama.',
    },
    '/windows': {
      title: 'Zush für Windows — KI-Dateiumbenenner für Windows',
      description:
        'Benenne Screenshots, PDFs, Fotos und Dokumente unter Windows mit KI um. Installation über den Microsoft Store, automatische Updates und kostenloser Test.',
    },
  },
  fr: {
    '/mac': {
      title: 'Zush pour Mac — Renommeur de fichiers IA pour macOS',
      description:
        'Renommez screenshots, PDF, photos et documents sur Mac avec l’IA. Compatible Apple Silicon, Intel, BYOK et mode IA hors ligne via Ollama.',
    },
    '/windows': {
      title: 'Zush pour Windows — Renommeur de fichiers IA',
      description:
        'Renommez screenshots, PDF, photos et documents sur Windows avec l’IA. Installation via Microsoft Store, mises à jour automatiques et essai gratuit.',
    },
  },
  'pt-br': {
    '/mac': {
      title: 'Zush para Mac — Renomeador de arquivos com IA para macOS',
      description:
        'Renomeie screenshots, PDFs, fotos e documentos no Mac com IA. Compatível com Apple Silicon, Intel, BYOK e modo IA offline via Ollama.',
    },
    '/windows': {
      title: 'Zush para Windows — Renomeador de arquivos com IA',
      description:
        'Renomeie screenshots, PDFs, fotos e documentos no Windows com IA. Instalação pela Microsoft Store, atualizações automáticas e teste grátis.',
    },
  },
  es: {
    '/mac': {
      title: 'Zush para Mac — Renombrador de archivos con IA para macOS',
      description:
        'Renombra capturas, PDFs, fotos y documentos en Mac con IA. Compatible con Apple Silicon, Intel, BYOK y modo IA offline mediante Ollama.',
    },
    '/windows': {
      title: 'Zush para Windows — Renombrador de archivos con IA',
      description:
        'Renombra capturas, PDFs, fotos y documentos en Windows con IA. Instalación desde Microsoft Store, actualizaciones automáticas y prueba gratis.',
    },
  },
  nl: {
    '/mac': {
      title: 'Zush voor Mac — AI-bestandshernoemer voor macOS',
      description:
        'Hernoem screenshots, PDFs, foto’s en documenten op Mac met AI. Ondersteunt Apple Silicon, Intel, BYOK en Offline AI via Ollama.',
    },
    '/windows': {
      title: 'Zush voor Windows — AI-bestandshernoemer',
      description:
        'Hernoem screenshots, PDFs, foto’s en documenten op Windows met AI. Installatie via Microsoft Store, automatische updates en gratis proberen.',
    },
  },
  it: {
    '/mac': {
      title: 'Zush per Mac — Rinomina file con IA per macOS',
      description:
        'Rinomina screenshot, PDF, foto e documenti su Mac con l’IA. Supporta Apple Silicon, Intel, BYOK e modalità IA offline tramite Ollama.',
    },
    '/windows': {
      title: 'Zush per Windows — Rinomina file con IA',
      description:
        'Rinomina screenshot, PDF, foto e documenti su Windows con l’IA. Installazione dal Microsoft Store, aggiornamenti automatici e prova gratuita.',
    },
  },
  ja: {
    '/mac': {
      title: 'Zush for Mac — macOS 向け AI ファイルリネーム',
      description:
        'Mac でスクリーンショット、PDF、写真、文書を AI でリネーム。Apple Silicon、Intel、BYOK、Ollama によるオフライン AI に対応。',
    },
    '/windows': {
      title: 'Zush for Windows — Windows 向け AI ファイルリネーム',
      description:
        'Windows でスクリーンショット、PDF、写真、文書を AI でリネーム。Microsoft Store からインストールでき、自動更新と無料体験に対応。',
    },
  },
  ko: {
    '/mac': {
      title: 'Mac용 Zush — macOS용 AI 파일 이름 변경',
      description:
        'Mac에서 스크린샷, PDF, 사진, 문서를 AI로 이름 변경하세요. Apple Silicon, Intel, BYOK, Ollama 오프라인 AI를 지원합니다.',
    },
    '/windows': {
      title: 'Windows용 Zush — Windows용 AI 파일 이름 변경',
      description:
        'Windows에서 스크린샷, PDF, 사진, 문서를 AI로 이름 변경하세요. Microsoft Store 설치, 자동 업데이트, 무료 체험을 지원합니다.',
    },
  },
  'zh-cn': {
    '/mac': {
      title: 'Zush for Mac — macOS AI 文件重命名工具',
      description: '在 Mac 上用 AI 重命名截图、PDF、照片和文档。支持 Apple Silicon、Intel、BYOK 和 Ollama 离线 AI。',
    },
    '/windows': {
      title: 'Zush for Windows — Windows AI 文件重命名工具',
      description: '在 Windows 上用 AI 重命名截图、PDF、照片和文档。通过 Microsoft Store 安装，可免费试用。',
    },
  },
  hi: {
    '/mac': {
      title: 'Mac के लिए Zush — macOS AI फ़ाइल नाम-बदलाव टूल',
      description:
        'Mac पर स्क्रीनशॉट, PDF, फ़ोटो और दस्तावेज़ों के नाम AI से बदलें। Apple Silicon, Intel, BYOK और Ollama Offline AI सपोर्ट।',
    },
    '/windows': {
      title: 'Windows के लिए Zush — AI फ़ाइल नाम-बदलाव टूल',
      description:
        'Windows पर स्क्रीनशॉट, PDF, फ़ोटो और दस्तावेज़ों के नाम AI से बदलें। Microsoft Store इंस्टॉल, अपने-आप अपडेट और मुफ़्त ट्रायल।',
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
  };
}
