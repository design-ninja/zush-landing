import { getSeoForPath, type SeoMeta } from '@/seo/config';
import { DEFAULT_LOCALE, LOCALIZATION_PAUSED, getLocalizedPath, isSeoExcludedLocalizedRoute, type Locale, type LocalizedRoute } from '@/i18n/config';
import { getCopy } from '@/i18n/copy';

const PLATFORM_SEO: Partial<Record<Locale, Partial<Record<'/mac' | '/windows', { title: string; description: string }>>>> = {
  de: {
    '/mac': {
      title: 'KI-Dateiumbenenner für Mac mit eigenen Regeln | Zush',
      description:
        'KI-Dateiumbenenner für Mac. Lege eigene Namensregeln fest, prüfe jede Änderung, nutze Ein-Klick-Undo oder lokale KI mit Ollama auf deinem Gerät.',
    },
    '/windows': {
      title: 'KI-Dateiumbenenner für Windows mit eigenen Regeln | Zush',
      description:
        'KI-Dateiumbenenner für Windows. Lege eigene Namensregeln fest, prüfe jede Änderung, nutze Ein-Klick-Undo oder lokale KI mit Ollama auf deinem Gerät.',
    },
  },
  fr: {
    '/mac': {
      title: 'Renommeur de fichiers IA pour Mac avec règles | Zush',
      description:
        'Renommeur de fichiers IA pour Mac. Définissez vos règles, prévisualisez chaque changement, annulez un lot ou gardez l’analyse compatible sur votre appareil.',
    },
    '/windows': {
      title: 'Renommeur de fichiers IA Windows avec règles | Zush',
      description:
        'Renommeur de fichiers IA pour Windows. Définissez vos règles, prévisualisez chaque changement, annulez un lot ou gardez l’analyse compatible sur votre appareil.',
    },
  },
  'pt-br': {
    '/mac': {
      title: 'Renomeador de arquivos com IA para Mac e regras | Zush',
      description:
        'Renomeador de arquivos com IA para Mac. Crie regras próprias, veja cada alteração, desfaça qualquer lote ou mantenha análises compatíveis no dispositivo.',
    },
    '/windows': {
      title: 'Renomeador de arquivos com IA Windows e regras | Zush',
      description:
        'Renomeador de arquivos com IA para Windows. Crie regras próprias, veja cada alteração, desfaça qualquer lote ou mantenha análises compatíveis no dispositivo.',
    },
  },
  es: {
    '/mac': {
      title: 'Renombrador de archivos con IA para Mac y reglas | Zush',
      description:
        'Renombrador de archivos con IA para Mac. Crea reglas propias, previsualiza cada cambio, deshaz cualquier lote o usa análisis compatibles en el dispositivo.',
    },
    '/windows': {
      title: 'Renombrador de archivos con IA Windows y reglas | Zush',
      description:
        'Renombrador de archivos con IA para Windows. Crea reglas propias, previsualiza cada cambio, deshaz cualquier lote o usa análisis compatibles en el dispositivo.',
    },
  },
  nl: {
    '/mac': {
      title: 'AI-bestandshernoemer voor Mac met eigen regels | Zush',
      description:
        'AI-bestandshernoemer voor Mac. Stel eigen naamregels in, bekijk elke wijziging, herstel elke batch of houd ondersteunde analyse op je apparaat.',
    },
    '/windows': {
      title: 'AI-bestandshernoemer voor Windows met eigen regels | Zush',
      description:
        'AI-bestandshernoemer voor Windows. Stel eigen naamregels in, bekijk elke wijziging, herstel elke batch of houd ondersteunde analyse op je apparaat.',
    },
  },
  it: {
    '/mac': {
      title: 'Rinomina file con IA per Mac e regole personalizzate | Zush',
      description:
        'Rinomina file con IA per Mac. Imposta regole personalizzate, visualizza ogni modifica, annulla qualsiasi batch o usa analisi supportate sul dispositivo.',
    },
    '/windows': {
      title: 'Rinomina file con IA Windows e regole personalizzate | Zush',
      description:
        'Rinomina file con IA per Windows. Imposta regole personalizzate, visualizza ogni modifica, annulla qualsiasi batch o usa analisi supportate sul dispositivo.',
    },
  },
  ja: {
    '/mac': {
      title: 'Mac向けAIファイルリネーム・カスタム命名ルール | Zush',
      description:
        'Mac向けAIファイルリネーム。独自の命名ルールを設定し、すべての変更をプレビュー。バッチのUndoと対応オンデバイス分析も利用できます。',
    },
    '/windows': {
      title: 'Windows向けAIファイルリネーム・カスタム命名ルール | Zush',
      description:
        'Windows向けAIファイルリネーム。独自の命名ルールを設定し、すべての変更をプレビュー。バッチのUndoと対応オンデバイス分析も利用できます。',
    },
  },
  ko: {
    '/mac': {
      title: 'Mac용 AI 파일 이름 변경 및 사용자 규칙 | Zush',
      description:
        'Mac용 AI 파일 이름 변경 도구. 사용자 규칙을 설정하고 모든 변경을 미리 보며, 일괄 작업을 되돌리거나 지원되는 기기 내 분석을 사용하세요.',
    },
    '/windows': {
      title: 'Windows용 AI 파일 이름 변경 및 사용자 규칙 | Zush',
      description:
        'Windows용 AI 파일 이름 변경 도구. 사용자 규칙을 설정하고 모든 변경을 미리 보며, 일괄 작업을 되돌리거나 지원되는 기기 내 분석을 사용하세요.',
    },
  },
  'zh-cn': {
    '/mac': {
      title: 'Mac AI 文件重命名工具与自定义规则 | Zush',
      description: '适用于 Mac 的 AI 文件重命名工具。设置自定义命名规则，预览每项更改，撤销任意批次，或使用通过 Ollama 运行的本地 AI。',
    },
    '/windows': {
      title: 'Windows AI 文件重命名工具与自定义规则 | Zush',
      description: '适用于 Windows 的 AI 文件重命名工具。设置自定义命名规则，预览每项更改，撤销任意批次，或使用通过 Ollama 运行的本地 AI。',
    },
  },
  tr: {
    '/mac': {
      title: 'Mac için Özel Kurallı AI Dosya Adlandırıcı | Zush',
      description:
        'Mac için AI dosya adlandırıcı. Özel kurallar belirleyin, her değişikliği önizleyin, toplu işlemleri geri alın veya desteklenen cihaz içi analizi kullanın.',
    },
    '/windows': {
      title: 'Windows için Özel Kurallı AI Dosya Adlandırıcı | Zush',
      description:
        'Windows için AI dosya adlandırıcı. Özel kurallar belirleyin, her değişikliği önizleyin, toplu işlemleri geri alın veya desteklenen cihaz içi analizi kullanın.',
    },
  },
  ar: {
    '/mac': {
      title: 'إعادة تسمية ملفات Mac بقواعد مخصصة وذكاء اصطناعي | Zush',
      description:
        'أداة إعادة تسمية ملفات بالذكاء الاصطناعي لنظام Mac. أنشئ قواعد مخصصة وعاين كل تغيير وتراجع عن أي دفعة أو استخدم التحليل المدعوم على الجهاز.',
    },
    '/windows': {
      title: 'إعادة تسمية ملفات Windows بقواعد مخصصة وذكاء اصطناعي | Zush',
      description:
        'أداة إعادة تسمية ملفات بالذكاء الاصطناعي لنظام Windows. أنشئ قواعد مخصصة وعاين كل تغيير وتراجع عن أي دفعة أو استخدم التحليل المدعوم على الجهاز.',
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
      'Mac・Windows向けAIファイルリネーム。RAW写真、PDF、動画、音声、デザインファイルを含む104形式を内容に基づいてリネーム。すべてのバッチでプレビューと取り消しが可能です。クラウドAI、BYOK、OllamaのローカルAI、フォルダ監視、テンプレートにも対応し、安全で統一された名前に整理できます。',
    '/windows':
      'Windows向けAIファイルリネーム。内容、メタデータ、日付、カスタム指示を組み合わせて独自の命名ルールを作成できます。すべての候補を適用前にプレビューし、バッチをUndo可能。Zush Cloud、BYOK、OllamaのローカルAIから実行場所を選べます。フォルダ監視と再利用可能なテンプレートにも対応します。',
    '/rename-pdf-with-ai':
      'AI PDF リネームツール。Zush が請求書、契約書、スキャン、領収書、レポートを読み取り、PDF ファイルを内容に基づいて検索しやすい名前にリネームします。MacとWindowsで複数のPDFを一括処理し、取引先、日付、文書種類を含む候補を適用前に確認できます。履歴から元の名前へ戻すことも可能です。',
    '/rename-videos-with-ai':
      'AI 動画リネームツール。Zush が MP4、MOV、M4V、MPEG、MTS、VOB、字幕、サンプリングしたフレームを読み取り、動画を内容に基づいてリネームします。MacとWindowsで画面収録や動画クリップを一括処理し、候補を適用前にプレビューできます。履歴から元の名前へ戻すことも可能です。',
    '/rename-photos-with-ai':
      'AI 写真リネームツール。Zush が HEIC、RAW、AVIF、JPG、SVG、TIFF などの画像を読み取り、被写体・シーン・文脈に基づいて写真をリネームします。MacとWindowsで写真を移動せず一括処理し、検索しやすい候補を適用前にプレビューできます。履歴から元の名前へ戻すことも可能です。',
    '/rename-screenshots-with-ai':
      '表示内容に基づいてスクリーンショットを自動リネーム。既存の画像を一括処理するか、Mac・Windowsで新しい画像の保存先を監視できます。Zush はアプリ、ページ、エラー、グラフ、会話を読み取り、検索しやすい名前を提案します。適用前にすべての候補をプレビューでき、変更後も履歴から元の名前に戻せます。',
  },
  ko: {
    '/':
      'Mac 및 Windows용 AI 파일 이름 변경 도구입니다. RAW 사진, PDF, 비디오, 오디오, 디자인 파일을 포함한 104개 형식을 내용에 따라 변경하고 모든 배치를 미리 보고 되돌릴 수 있습니다. 클라우드 AI, BYOK, 로컬 AI와 폴더 모니터링 및 템플릿도 지원합니다.',
    '/mac':
      'Mac용 AI 파일 이름 변경 도구입니다. 내용, 메타데이터, 날짜와 사용자 지침으로 나만의 이름 규칙을 만드세요. 모든 제안을 적용 전에 미리 보고 일괄 작업을 되돌릴 수 있으며, Zush Cloud, BYOK 또는 Ollama 로컬 AI 중 실행 위치를 선택할 수 있습니다.',
    '/windows':
      'Windows용 AI 파일 이름 변경 도구입니다. 내용, 메타데이터, 날짜와 사용자 지침으로 나만의 이름 규칙을 만드세요. 모든 제안을 적용 전에 미리 보고 일괄 작업을 되돌릴 수 있으며, Zush Cloud, BYOK 또는 Ollama 로컬 AI 중 실행 위치를 선택할 수 있습니다.',
    '/rename-photos-with-ai':
      'AI 사진 이름 변경 도구. Zush가 HEIC, RAW, AVIF, JPG, SVG, TIFF 등 이미지를 읽고 피사체와 장면, 맥락을 기준으로 사진 이름을 변경합니다. 사진을 이동하지 않고 일괄 처리하며, 적용 전에 제안을 미리 보고 기록에서 원래 이름으로 되돌릴 수 있습니다.',
    '/rename-screenshots-with-ai':
      '화면 내용을 기준으로 스크린샷 이름을 자동으로 바꾸세요. 기존 캡처를 일괄 처리하거나 Mac과 Windows에서 새 캡처 폴더를 모니터링할 수 있습니다. Zush는 앱, 페이지, 오류, 차트와 대화를 읽어 검색하기 쉬운 이름을 제안합니다. 적용 전에 모든 이름을 미리 보고 변경 후에도 기록에서 원래 이름으로 되돌릴 수 있습니다.',
    '/rename-videos-with-ai':
      'AI 동영상 이름 변경 도구. Zush가 MP4, MOV, M4V, MPEG, MTS, VOB, 자막과 샘플 프레임을 읽고 동영상 이름을 내용 기준으로 변경합니다. Mac과 Windows에서 클립을 일괄 처리하며, 적용 전에 제안을 미리 보고 기록에서 원래 이름으로 되돌릴 수 있습니다.',
    '/rename-pdf-with-ai':
      'AI PDF 이름 변경 도구. Zush가 청구서, 계약서, 스캔 문서, 영수증, 보고서를 읽고 PDF 파일을 내용 기준으로 검색하기 쉬운 이름으로 변경합니다. Mac과 Windows에서 여러 PDF를 일괄 처리하고 적용 전에 제안을 미리 보고 기록에서 원래 이름으로 되돌릴 수 있습니다.',
    '/rename-documents-with-ai':
      'AI 문서 이름 변경 도구. Zush가 Office, iWork, 텍스트, CSV, XML, YAML, 이메일, 자막 파일을 읽고 실제 내용을 기준으로 문서 이름을 변경합니다. 여러 문서를 일괄 처리하며, 적용 전에 제안을 미리 보고 기록에서 원래 이름으로 되돌릴 수 있습니다.',
  },
  'zh-cn': {
    '/':
      '适用于 Mac 和 Windows 的 AI 文件重命名工具。按内容重命名 104 种格式，包括 RAW 照片、PDF、视频、音频和设计文件；每个批次均可预览和撤销。支持云端 AI、BYOK、通过 Ollama 运行的本地 AI，以及文件夹监控和可重复使用的命名模板，让日常整理更安全、更统一、更容易搜索。',
    '/mac':
      '适用于 Mac 的 AI 文件重命名工具。组合内容、元数据、日期和自定义指令，建立自己的命名规则。应用前预览所有建议，可撤销任意批次，并可在 Zush Cloud、BYOK 与通过 Ollama 运行的本地 AI 之间选择分析位置。支持文件夹监控和可重复使用的模板，方便长期整理照片、文档和下载文件。',
    '/windows':
      '适用于 Windows 的 AI 文件重命名工具。组合内容、元数据、日期和自定义指令，建立自己的命名规则。应用前预览所有建议，可撤销任意批次，并可在 Zush Cloud、BYOK 与通过 Ollama 运行的本地 AI 之间选择分析位置。',
    '/rename-photos-with-ai':
      'AI 照片重命名工具。Zush 读取 HEIC、RAW、AVIF、JPG、SVG、TIFF 等图片，按主体、场景和上下文为照片生成可搜索的名称。在 Mac 和 Windows 上无需移动照片即可批量处理，应用前可预览全部建议，修改后能从历史记录恢复原名，还可用模板统一整个图库的命名方式和日期格式，安全整理整个图库。',
    '/rename-screenshots-with-ai':
      '按画面内容自动重命名截图。可批量处理已有截图，也可以在 Mac 和 Windows 上监控文件夹并自动处理新截图。Zush 会识别应用、页面、错误、图表和对话，生成清晰且便于搜索的名称；应用前可预览全部建议，修改后还能从历史记录恢复原名，安全整理日常截图并保持命名统一。',
    '/rename-documents-with-ai':
      'AI 文档重命名工具。Zush 读取 DOCX、XLSX、PPTX、Pages、Numbers、Keynote、TXT、CSV、邮件和字幕，按实际内容生成清晰名称。在 Mac 和 Windows 上批量处理，结合标题、客户和日期建立统一规则。应用前预览建议，可撤销更改，并能选择 BYOK 或 Ollama 本地 AI。',
  },
  ar: {
    '/rename-screenshots-with-ai':
      'أعد تسمية لقطات الشاشة تلقائيًا حسب محتواها الظاهر. عالج الأرشيف دفعة واحدة أو راقب مجلد اللقطات الجديدة على Mac وWindows. يتعرف Zush على التطبيق والصفحة والخطأ والرسم البياني والمحادثة، ويقترح أسماء واضحة قابلة للبحث يمكنك معاينتها قبل التطبيق والتراجع عنها من السجل.',
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
    keywords: isNonDefaultLocale ? undefined : seo.keywords,
  };
}
