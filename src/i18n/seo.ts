import { getSeoForPath, type SeoMeta } from '@/seo/config';
import { DEFAULT_LOCALE, LOCALIZATION_PAUSED, getLocalizedPath, isSeoExcludedLocalizedRoute, type Locale, type LocalizedRoute } from '@/i18n/config';
import { getCopy } from '@/i18n/copy';

const PLATFORM_SEO: Partial<Record<Locale, Partial<Record<'/mac' | '/windows', { title: string; description: string }>>>> = {
  de: {
    '/mac': {
      title: 'KI-Dateiumbenenner für Mac | Zush',
      description:
        'Dateiumbenenner für Mac, der Dateien mit KI nach Inhalt stapelweise umbenennt. Screenshots, PDFs, Fotos, Videos, Audio, Design- und Office-Dateien.',
    },
    '/windows': {
      title: 'KI-Dateiumbenenner für Windows | Zush',
      description:
        'Benenne Dateien unter Windows 11 und 10 mit KI stapelweise um: Screenshots, PDFs, Fotos, Videos, Audio, Design- und Office-Dateien mit Vorschau und Undo.',
    },
  },
  fr: {
    '/mac': {
      title: 'Renommeur de fichiers IA pour Mac | Zush',
      description:
        'Renommeur de fichiers pour Mac qui renomme les fichiers par lot selon leur contenu avec l’IA : screenshots, PDF, photos, vidéos, audio, design et documents.',
    },
    '/windows': {
      title: 'Renommeur de fichiers IA Windows | Zush',
      description:
        'Renommez par lot sur Windows 11 et 10 avec l’IA : screenshots, PDF, photos, vidéos, audio, design et documents Office avec aperçu et annulation.',
    },
  },
  'pt-br': {
    '/mac': {
      title: 'Renomeador de arquivos com IA para Mac | Zush',
      description:
        'Renomeador de arquivos para Mac que renomeia arquivos em lote pelo conteúdo com IA: screenshots, PDFs, fotos, vídeos, áudio, design e documentos.',
    },
    '/windows': {
      title: 'Renomeador de arquivos com IA Windows | Zush',
      description:
        'Renomeie arquivos em lote no Windows 11 e 10 com IA: screenshots, PDFs, fotos, vídeos, áudio, design e documentos Office com prévia e desfazer.',
    },
  },
  es: {
    '/mac': {
      title: 'Renombrador de archivos con IA para Mac | Zush',
      description:
        'Renombrador de archivos para Mac que renombra por lotes según el contenido con IA: capturas, PDFs, fotos, videos, audio, diseño y documentos.',
    },
    '/windows': {
      title: 'Renombrador de archivos con IA Windows | Zush',
      description:
        'Renombra archivos por lotes en Windows 11 y 10 con IA: capturas, PDFs, fotos, videos, audio, diseño y documentos Office con vista previa y deshacer.',
    },
  },
  nl: {
    '/mac': {
      title: 'AI-bestandshernoemer voor Mac | Zush',
      description:
        'Bestandshernoemer voor Mac die bestanden batchgewijs op inhoud hernoemt met AI: screenshots, PDFs, foto’s, video’s, audio, design en documenten.',
    },
    '/windows': {
      title: 'AI-bestandshernoemer voor Windows | Zush',
      description:
        'Hernoem bestanden batchgewijs op Windows 11 en 10 met AI: screenshots, PDFs, foto’s, video’s, audio, design en documenten met preview en undo.',
    },
  },
  it: {
    '/mac': {
      title: 'Rinomina file con IA per Mac | Zush',
      description:
        'Rinomina file per Mac che rinomina in batch in base al contenuto con l’IA: screenshot, PDF, foto, video, audio, design e documenti, con anteprima.',
    },
    '/windows': {
      title: 'Rinomina file con IA per Windows | Zush',
      description:
        'Rinomina file in batch su Windows 11 e 10 con l’IA: screenshot, PDF, foto, video, audio, design e documenti Office con anteprima e annulla.',
    },
  },
  ja: {
    '/mac': {
      title: 'Mac向けファイルリネーム: AIでファイルを一括リネーム | Zush',
      description:
        'Mac向けファイルリネーム。AIで内容に基づいてスクリーンショット、PDF、写真、動画、音声、デザインファイル、文書を一括リネームします。',
    },
    '/windows': {
      title: 'Windows向けAIファイルリネーム: 一括・大量リネーム | Zush',
      description:
        'Windows 11/10でAI一括リネーム。スクリーンショット、PDF、写真、動画、音声、デザインファイル、Office文書をプレビューとUndo付きで整理します。',
    },
  },
  ko: {
    '/mac': {
      title: 'Mac용 파일 이름 변경 도구: AI로 일괄 이름 변경 | Zush',
      description:
        'Mac용 파일 이름 변경 도구. AI로 내용을 기준으로 스크린샷, PDF, 사진, 비디오, 오디오, 디자인 파일, 문서를 일괄 이름 변경합니다.',
    },
    '/windows': {
      title: 'Windows용 AI 파일 이름 변경: 일괄 및 대량 변경 | Zush',
      description:
        'Windows 11 및 10에서 AI로 파일을 일괄 변경하세요. 스크린샷, PDF, 사진, 비디오, 오디오, 디자인 파일, Office 문서, 미리보기와 되돌리기 지원.',
    },
  },
  'zh-cn': {
    '/mac': {
      title: 'Mac 文件重命名工具：用 AI 批量重命名文件 | Zush',
      description: 'Mac 文件重命名工具。用 AI 根据内容批量重命名截图、PDF、照片、视频、音频、设计文件和文档。',
    },
    '/windows': {
      title: 'Windows AI 文件重命名工具：批量和大量重命名 | Zush',
      description: '在 Windows 11 和 10 上用 AI 批量重命名截图、PDF、照片、视频、音频、设计文件和 Office 文档，并支持预览和撤销。',
    },
  },
  tr: {
    '/mac': {
      title: 'Mac için Yapay Zekâ Dosya Adlandırıcı | Zush',
      description:
        'Mac için dosyaları içeriklerine göre yapay zekâyla toplu yeniden adlandırın: ekran görüntüleri, PDF’ler, fotoğraflar, videolar, sesler ve belgeler.',
    },
    '/windows': {
      title: 'Windows için Yapay Zekâ Dosya Adlandırıcı | Zush',
      description:
        'Windows 11 ve 10’da dosyaları yapay zekâyla toplu yeniden adlandırın: ekran görüntüleri, PDF’ler, videolar ve Office belgeleri; önizleme ve geri alma dâhil.',
    },
  },
  ar: {
    '/mac': {
      title: 'إعادة تسمية ملفات Mac بالذكاء الاصطناعي | Zush',
      description:
        'أداة إعادة تسمية ملفات لنظام Mac تعيد تسمية الملفات بالدفعات حسب المحتوى باستخدام الذكاء الاصطناعي: لقطات الشاشة وPDF والصور والفيديو والمستندات.',
    },
    '/windows': {
      title: 'إعادة تسمية ملفات Windows بالذكاء الاصطناعي | Zush',
      description:
        'أعد تسمية ملفات Windows 11 و10 بالدفعات باستخدام الذكاء الاصطناعي: لقطات شاشة وPDF وصور وفيديو وصوت وتصميم ومستندات Office مع معاينة وتراجع.',
    },
  },
};

/**
 * Bing reports descriptions shorter than 150 characters as an SEO/GEO issue,
 * including CJK pages where the copy is already visually dense. Keep the
 * affected high-value localized routes explicit so their search snippets stay
 * useful instead of padding every localized page with a generic suffix.
 */
const SEARCH_DESCRIPTION_OVERRIDES: Partial<Record<Locale, Partial<Record<LocalizedRoute, string>>>> = {
  de: {
    '/rename-videos-with-ai':
      'KI-Video-Umbenenner. Zush liest MP4, MOV, M4V, MPEG, MTS, VOB, Untertitel und abgetastete Frames und benennt Videos nach ihrem Inhalt um. Mit Vorschau und Undo.',
  },
  ja: {
    '/':
      'Mac・Windows向けAIファイルリネーム。RAW写真、PDF、動画、音声、デザインファイルを含む104形式を内容に基づいてリネーム。すべてのバッチでプレビューと取り消しが可能です。クラウドAI、BYOK、OllamaのオフラインAI、フォルダ監視、テンプレートにも対応し、安全で統一された名前に整理できます。',
    '/windows':
      'Windows 11/10でAI一括リネーム。スクリーンショット、PDF、写真、動画、音声、デザインファイル、Office文書をプレビューとUndo付きで整理します。Microsoft Storeから導入でき、フォルダ監視、テンプレート、BYOK、オフラインAIにも対応。内容に合う名前を適用前に確認できます。',
    '/rename-pdf-with-ai':
      'AI PDF リネームツール。Zush が請求書、契約書、スキャン、領収書、レポートを読み取り、PDF ファイルを内容に基づいて検索しやすい名前にリネームします。MacとWindowsで複数のPDFを一括処理し、取引先、日付、文書種類を含む候補を適用前に確認できます。履歴から元の名前へ戻すことも可能です。',
    '/rename-videos-with-ai':
      'AI 動画リネームツール。Zush が MP4、MOV、M4V、MPEG、MTS、VOB、字幕、サンプリングしたフレームを読み取り、動画を内容に基づいてリネームします。MacとWindowsで画面収録や動画クリップを一括処理し、候補を適用前にプレビューできます。履歴から元の名前へ戻すことも可能です。',
    '/rename-photos-with-ai':
      'AI 写真リネームツール。Zush が HEIC、RAW、AVIF、JPG、SVG、TIFF などの画像を読み取り、被写体・シーン・文脈に基づいて写真をリネームします。MacとWindowsで写真を移動せず一括処理し、検索しやすい候補を適用前にプレビューできます。履歴から元の名前へ戻すことも可能です。',
    '/rename-screenshots-with-ai':
      '「スクリーンショット 2026-07-12」はもう不要。Zush が内容に基づいてスクリーンショットを自動リネーム。プレビューと取り消しに対応し、50 件まで無料です。MacとWindowsで複数の画像を一括処理し、アプリ名や画面内容が分かる検索しやすい候補をすべて確認してから安心して適用できます。',
  },
  ko: {
    '/':
      'Mac 및 Windows용 AI 파일 이름 변경 도구입니다. RAW 사진, PDF, 비디오, 오디오, 디자인 파일을 포함한 104개 형식을 내용에 따라 변경하고 모든 배치를 미리 보고 되돌릴 수 있습니다. 클라우드 AI, BYOK, 오프라인 AI와 폴더 모니터링 및 템플릿도 지원합니다.',
    '/mac':
      'Mac용 파일 이름 변경 도구. AI로 내용을 기준으로 스크린샷, PDF, 사진, 비디오, 오디오, 디자인 파일, 문서를 일괄 이름 변경합니다. 적용 전에 모든 이름을 미리 보고 기록에서 되돌릴 수 있습니다. 폴더 모니터링, BYOK 및 오프라인 AI를 모두 지원합니다.',
    '/windows':
      'Windows 11 및 10에서 AI로 파일을 일괄 변경하세요. 스크린샷, PDF, 사진, 비디오, 오디오, 디자인 파일, Office 문서, 미리보기와 되돌리기 지원. Microsoft Store로 설치하고 폴더 모니터링, 템플릿, BYOK 및 오프라인 AI를 사용할 수 있습니다.',
    '/rename-photos-with-ai':
      'AI 사진 이름 변경 도구. Zush가 HEIC, RAW, AVIF, JPG, SVG, TIFF 등 이미지를 읽고 피사체와 장면, 맥락을 기준으로 사진 이름을 변경합니다. 사진을 이동하지 않고 일괄 처리하며, 적용 전에 제안을 미리 보고 기록에서 원래 이름으로 되돌릴 수 있습니다.',
    '/rename-screenshots-with-ai':
      '「스크린샷 2026-07-12」은 그만. Zush가 내용을 기준으로 스크린샷 이름을 자동으로 변경하며, 미리보기와 되돌리기를 지원합니다. 50회까지 무료입니다. Mac과 Windows에서 여러 이미지를 일괄 처리하고 앱과 화면 내용을 설명하는 이름을 확인한 뒤 적용할 수 있습니다.',
    '/rename-videos-with-ai':
      'AI 동영상 이름 변경 도구. Zush가 MP4, MOV, M4V, MPEG, MTS, VOB, 자막과 샘플 프레임을 읽고 동영상 이름을 내용 기준으로 변경합니다. Mac과 Windows에서 클립을 일괄 처리하며, 적용 전에 제안을 미리 보고 기록에서 원래 이름으로 되돌릴 수 있습니다.',
    '/rename-pdf-with-ai':
      'AI PDF 이름 변경 도구. Zush가 청구서, 계약서, 스캔 문서, 영수증, 보고서를 읽고 PDF 파일을 내용 기준으로 검색하기 쉬운 이름으로 변경합니다. Mac과 Windows에서 여러 PDF를 일괄 처리하고 적용 전에 제안을 미리 보고 기록에서 원래 이름으로 되돌릴 수 있습니다.',
    '/rename-documents-with-ai':
      'AI 문서 이름 변경 도구. Zush가 Office, iWork, 텍스트, CSV, XML, YAML, 이메일, 자막 파일을 읽고 실제 내용을 기준으로 문서 이름을 변경합니다. 여러 문서를 일괄 처리하며, 적용 전에 제안을 미리 보고 기록에서 원래 이름으로 되돌릴 수 있습니다.',
  },
  'zh-cn': {
    '/':
      '适用于 Mac 和 Windows 的 AI 文件重命名工具。按内容重命名 104 种格式，包括 RAW 照片、PDF、视频、音频和设计文件；每个批次均可预览和撤销。支持云端 AI、BYOK、通过 Ollama 运行的离线 AI，以及文件夹监控和可重复使用的命名模板，让日常整理更安全、更统一、更容易搜索。',
    '/mac':
      '适用于 Mac 的 AI 文件重命名工具。根据实际内容批量重命名截图、PDF、照片、视频、音频、设计文件以及 iWork 和 Office 文档。应用前可预览全部建议，并能从历史记录中恢复原名。原生支持 Apple Silicon 和 Intel，还提供文件夹监控、BYOK 及通过 Ollama 运行的离线 AI。',
    '/windows':
      '适用于 Windows 11 和 10 的 AI 文件重命名工具。根据内容批量整理截图、PDF、照片、视频、音频、设计文件和 Office 文档。应用前可预览全部名称，并能从历史记录中恢复原名。支持 Microsoft Store 安装、文件夹监控、BYOK，以及通过 Ollama 运行的离线 AI。',
    '/rename-photos-with-ai':
      'AI 照片重命名工具。Zush 读取 HEIC、RAW、AVIF、JPG、SVG、TIFF 等图片，按主体、场景和上下文为照片生成可搜索的名称。在 Mac 和 Windows 上无需移动照片即可批量处理，应用前可预览全部建议，修改后能从历史记录恢复原名，还可用模板统一整个图库的命名方式和日期格式，安全整理整个图库。',
    '/rename-screenshots-with-ai':
      '告别「截屏 2026-07-12」。Zush 按截图内容自动重命名，支持预览和一键撤销，免费额度 50 次，Mac 和 Windows 均可使用。可批量识别应用、界面和上下文，生成清晰、可搜索的文件名；应用前查看全部建议，修改后还能从历史记录恢复原名，安全整理日常截图并保持命名统一、清晰且便于查找。',
  },
  ar: {
    '/rename-screenshots-with-ai':
      'لا مزيد من «لقطة الشاشة 2026-07-12». يعيد Zush تسمية لقطات الشاشة تلقائيًا حسب محتواها، مع معاينة وتراجع. 50 عملية إعادة تسمية مجانية. وتعمل على Mac وWindows.',
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
  const robots = isNonDefaultLocale
    && (LOCALIZATION_PAUSED || isSeoExcludedLocalizedRoute(route))
    ? 'noindex, nofollow'
    : seo.robots;

  return {
    ...seo,
    title: localizedPlatformSeo?.title
      ?? localizedSeo?.title
      ?? (featureSeo ? `${featureSeo.h1} · Zush` : undefined)
      ?? (platformSeo ? `${platformSeo.softwareName} — ${platformSeo.heroTitle}` : undefined)
      ?? seo.title,
    description: SEARCH_DESCRIPTION_OVERRIDES[locale]?.[route]
      ?? localizedPlatformSeo?.description
      ?? localizedSeo?.description
      ?? featureSeo?.definitionText
      ?? platformSeo?.heroSubtitle
      ?? seo.description,
    canonicalPath: getLocalizedPath(route, locale),
    robots,
  };
}
