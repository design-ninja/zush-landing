import type { Locale } from './config';

export interface AiModesBeltCopy {
  eyebrow: string;
  title: string;
  description: string;
  offlineBadge: string;
  offlineTitle: string;
  offlineDescription: string;
  offlinePrivacy: string;
  offlineLink: string;
  cloudBadge: string;
  cloudTitle: string;
  cloudDescription: string;
  managedTitle: string;
  managedDescription: string;
  byokTitle: string;
  byokDescription: string;
  byokLink: string;
  languagesTitle: string;
  languagesDescription: string;
}

export interface CompactFormatsCopy {
  eyebrow: string;
  description: string;
  extensionsLabel: string;
  revealLabel: string;
}

interface HomeBeltsCopy {
  aiModes: AiModesBeltCopy;
  compactFormats: CompactFormatsCopy;
}

const en: HomeBeltsCopy = {
  aiModes: {
    eyebrow: 'Choose how AI runs',
    title: 'Your AI provider. Your privacy choice.',
    description: 'Choose Zush Cloud, BYOK, LM Studio or Ollama — the same review-first Zush workflow in every mode.',
    offlineBadge: 'On-device',
    offlineTitle: 'Three private Local AI options',
    offlineDescription: 'Use LM Studio or Ollama on Mac or Windows — supported analysis content stays on your device.',
    offlinePrivacy: 'Local model · no cloud analysis',
    offlineLink: 'Compare Local AI options',
    cloudBadge: 'Cloud options',
    cloudTitle: 'Use cloud AI when you want it',
    cloudDescription: 'Start with Zush Cloud or connect your own provider in BYOK mode.',
    managedTitle: 'Zush Cloud',
    managedDescription: 'Built in · no API setup',
    byokTitle: 'Bring Your Own Key',
    byokDescription: 'Gemini, Groq, OpenAI, or Claude',
    byokLink: 'Explore BYOK providers',
    languagesTitle: '60+ filename languages',
    languagesDescription: 'Searchable filenames in the language and date format of each folder or team.',
  },
  compactFormats: {
    eyebrow: 'One workflow for mixed folders',
    description: 'Zush analyzes images, RAW photos, design files, PDFs, Office and iWork documents, subtitles, video, and audio — even when they are mixed in one batch.',
    extensionsLabel: 'file extensions',
    revealLabel: 'View every supported extension',
  },
};

export const HOME_BELTS_COPY: Record<Locale, HomeBeltsCopy> = {
  en,
  de: {
    aiModes: {
      eyebrow: 'Wähle, wie die KI arbeitet',
      title: 'Dein KI-Anbieter. Deine Wahl beim Datenschutz.',
      description: 'Benenne Dateien mit Cloud-KI, eigenem Anbieter-Schlüssel oder einem privaten lokalen Modell um — im selben Zush-Workflow.',
      offlineBadge: 'Auf dem Gerät',
      offlineTitle: 'Private Offline-KI mit Ollama',
      offlineDescription: 'Analysiere Dateien mit einem lokalen Modell auf Mac oder Windows-PC — Inhalte bleiben auf deinem Gerät.',
      offlinePrivacy: 'Lokales Modell · keine Cloud-Analyse',
      offlineLink: 'Offline-KI einrichten',
      cloudBadge: 'Cloud-Optionen',
      cloudTitle: 'Cloud-KI, wenn du sie brauchst',
      cloudDescription: 'Starte mit Zush Cloud oder verbinde im BYOK-Modus deinen eigenen Anbieter.',
      managedTitle: 'Zush Cloud',
      managedDescription: 'Integriert · keine API-Einrichtung',
      byokTitle: 'Eigener API-Schlüssel (BYOK)',
      byokDescription: 'Gemini, Groq, OpenAI oder Claude',
      byokLink: 'BYOK-Anbieter ansehen',
      languagesTitle: '60+ Sprachen für Dateinamen',
      languagesDescription: 'Durchsuchbare Dateinamen in Sprache und Datumsformat deines Ordners oder Teams.',
    },
    compactFormats: {
      eyebrow: 'Ein Workflow für gemischte Ordner',
      description: 'Zush analysiert Bilder, RAW-Fotos, Designdateien, PDFs, Office- und iWork-Dokumente, Untertitel, Video und Audio — auch gemeinsam in einem Stapel.',
      extensionsLabel: 'Dateiendungen',
      revealLabel: 'Alle unterstützten Endungen anzeigen',
    },
  },
  fr: {
    aiModes: {
      eyebrow: 'Choisissez le mode d’IA',
      title: 'Votre fournisseur d’IA. Votre choix de confidentialité.',
      description: 'Renommez vos fichiers avec l’IA cloud, votre propre clé ou un modèle local privé — même workflow Zush.',
      offlineBadge: 'Sur l’appareil',
      offlineTitle: 'IA hors ligne privée avec Ollama',
      offlineDescription: 'Analysez vos fichiers avec un modèle local sur Mac ou Windows — le contenu reste sur votre appareil.',
      offlinePrivacy: 'Modèle local · aucune analyse cloud',
      offlineLink: 'Configurer l’IA hors ligne',
      cloudBadge: 'Options cloud',
      cloudTitle: 'Utilisez l’IA cloud quand vous le souhaitez',
      cloudDescription: 'Commencez avec Zush Cloud ou connectez votre fournisseur en mode BYOK.',
      managedTitle: 'Zush Cloud',
      managedDescription: 'Intégré · aucune API à configurer',
      byokTitle: 'Votre propre clé (BYOK)',
      byokDescription: 'Gemini, Groq, OpenAI ou Claude',
      byokLink: 'Découvrir les fournisseurs BYOK',
      languagesTitle: '60+ langues de noms de fichiers',
      languagesDescription: 'Des noms recherchables dans la langue et le format de date de chaque dossier.',
    },
    compactFormats: {
      eyebrow: 'Un workflow pour les dossiers mixtes',
      description: 'Zush analyse images, photos RAW, fichiers design, PDF, documents Office et iWork, sous-titres, vidéos et audio — même dans un seul lot.',
      extensionsLabel: 'extensions de fichier',
      revealLabel: 'Voir toutes les extensions compatibles',
    },
  },
  es: {
    aiModes: {
      eyebrow: 'Elige cómo funciona la IA',
      title: 'Tu proveedor de IA. Tu elección de privacidad.',
      description: 'Renombra archivos con IA en la nube, tu propia clave o un modelo local privado — mismo flujo de Zush.',
      offlineBadge: 'En tu dispositivo',
      offlineTitle: 'IA offline privada con Ollama',
      offlineDescription: 'Analiza archivos con un modelo local en Mac o Windows — el contenido no sale de tu dispositivo.',
      offlinePrivacy: 'Modelo local · sin análisis en la nube',
      offlineLink: 'Configurar IA offline',
      cloudBadge: 'Opciones cloud',
      cloudTitle: 'Usa IA en la nube cuando quieras',
      cloudDescription: 'Empieza con Zush Cloud o conecta tu proveedor en modo BYOK.',
      managedTitle: 'Zush Cloud',
      managedDescription: 'Integrado · sin configurar API',
      byokTitle: 'Tu propia clave (BYOK)',
      byokDescription: 'Gemini, Groq, OpenAI o Claude',
      byokLink: 'Explorar proveedores BYOK',
      languagesTitle: '60+ idiomas para nombres',
      languagesDescription: 'Nombres fáciles de buscar en el idioma y formato de fecha de cada carpeta.',
    },
    compactFormats: {
      eyebrow: 'Un flujo para carpetas mixtas',
      description: 'Zush analiza imágenes, fotos RAW, archivos de diseño, PDF, documentos Office e iWork, subtítulos, video y audio, incluso en un mismo lote.',
      extensionsLabel: 'extensiones de archivo',
      revealLabel: 'Ver todas las extensiones compatibles',
    },
  },
  'pt-br': {
    aiModes: {
      eyebrow: 'Escolha como a IA funciona',
      title: 'Seu provedor de IA. Sua escolha de privacidade.',
      description: 'Renomeie arquivos com IA na nuvem, sua própria chave ou um modelo local privado — mesmo fluxo do Zush.',
      offlineBadge: 'No dispositivo',
      offlineTitle: 'IA offline privada com Ollama',
      offlineDescription: 'Analise arquivos com um modelo local no Mac ou Windows — o conteúdo não sai do seu dispositivo.',
      offlinePrivacy: 'Modelo local · sem análise na nuvem',
      offlineLink: 'Configurar IA offline',
      cloudBadge: 'Opções de nuvem',
      cloudTitle: 'Use IA na nuvem quando quiser',
      cloudDescription: 'Comece com o Zush Cloud ou conecte seu provedor no modo BYOK.',
      managedTitle: 'Zush Cloud',
      managedDescription: 'Integrado · sem configurar API',
      byokTitle: 'Sua própria chave (BYOK)',
      byokDescription: 'Gemini, Groq, OpenAI ou Claude',
      byokLink: 'Explorar provedores BYOK',
      languagesTitle: '60+ idiomas para nomes',
      languagesDescription: 'Nomes pesquisáveis no idioma e formato de data de cada pasta.',
    },
    compactFormats: {
      eyebrow: 'Um fluxo para pastas mistas',
      description: 'O Zush analisa imagens, fotos RAW, arquivos de design, PDFs, documentos Office e iWork, legendas, vídeo e áudio, mesmo no mesmo lote.',
      extensionsLabel: 'extensões de arquivo',
      revealLabel: 'Ver todas as extensões compatíveis',
    },
  },
  it: {
    aiModes: {
      eyebrow: 'Scegli come lavora l’IA',
      title: 'Il tuo provider IA. La tua scelta di privacy.',
      description: 'Rinomina i file con IA cloud, la tua chiave o un modello locale privato — stesso workflow Zush.',
      offlineBadge: 'Sul dispositivo',
      offlineTitle: 'IA offline privata con Ollama',
      offlineDescription: 'Analizza i file con un modello locale su Mac o Windows — i contenuti restano sul dispositivo.',
      offlinePrivacy: 'Modello locale · nessuna analisi cloud',
      offlineLink: 'Configura IA offline',
      cloudBadge: 'Opzioni cloud',
      cloudTitle: 'Usa l’IA cloud quando vuoi',
      cloudDescription: 'Inizia con Zush Cloud o collega il tuo provider in modalità BYOK.',
      managedTitle: 'Zush Cloud',
      managedDescription: 'Integrato · nessuna API da configurare',
      byokTitle: 'La tua chiave (BYOK)',
      byokDescription: 'Gemini, Groq, OpenAI o Claude',
      byokLink: 'Scopri i provider BYOK',
      languagesTitle: '60+ lingue per i nomi file',
      languagesDescription: 'Nomi ricercabili nella lingua e nel formato data di ogni cartella.',
    },
    compactFormats: {
      eyebrow: 'Un workflow per cartelle miste',
      description: 'Zush analizza immagini, foto RAW, file di design, PDF, documenti Office e iWork, sottotitoli, video e audio, anche nello stesso batch.',
      extensionsLabel: 'estensioni file',
      revealLabel: 'Mostra tutte le estensioni supportate',
    },
  },
  nl: {
    aiModes: {
      eyebrow: 'Kies hoe AI werkt',
      title: 'Jouw AI-provider. Jouw privacykeuze.',
      description: 'Hernoem bestanden met cloud-AI, je eigen sleutel of een privé lokaal model — dezelfde Zush-workflow.',
      offlineBadge: 'Op je apparaat',
      offlineTitle: 'Private offline AI met Ollama',
      offlineDescription: 'Analyseer bestanden met een lokaal model op Mac of Windows — inhoud blijft op je apparaat.',
      offlinePrivacy: 'Lokaal model · geen cloudanalyse',
      offlineLink: 'Offline AI instellen',
      cloudBadge: 'Cloudopties',
      cloudTitle: 'Gebruik cloud-AI wanneer je wilt',
      cloudDescription: 'Start met Zush Cloud of verbind je provider in BYOK-modus.',
      managedTitle: 'Zush Cloud',
      managedDescription: 'Ingebouwd · geen API-configuratie',
      byokTitle: 'Je eigen sleutel (BYOK)',
      byokDescription: 'Gemini, Groq, OpenAI of Claude',
      byokLink: 'Bekijk BYOK-providers',
      languagesTitle: '60+ talen voor bestandsnamen',
      languagesDescription: 'Vindbare bestandsnamen in de taal en datumnotatie van elke map.',
    },
    compactFormats: {
      eyebrow: 'Eén workflow voor gemengde mappen',
      description: 'Zush analyseert afbeeldingen, RAW-foto’s, designbestanden, PDF’s, Office- en iWork-documenten, ondertitels, video en audio, ook in één batch.',
      extensionsLabel: 'bestandsextensies',
      revealLabel: 'Alle ondersteunde extensies bekijken',
    },
  },
  tr: {
    aiModes: {
      eyebrow: 'Yapay zekânın çalışma şeklini seçin',
      title: 'Yapay zekâ sağlayıcınız. Gizlilik seçiminiz.',
      description: 'Dosyaları bulut yapay zekâsı, kendi anahtarınız veya özel yerel bir modelle yeniden adlandırın — aynı Zush akışı.',
      offlineBadge: 'Cihaz üzerinde',
      offlineTitle: 'Ollama ile özel Offline AI',
      offlineDescription: 'Dosyaları Mac veya Windows’ta yerel bir modelle analiz edin — içerik cihazınızdan çıkmaz.',
      offlinePrivacy: 'Yerel model · bulut analizi yok',
      offlineLink: 'Offline AI’ı kurun',
      cloudBadge: 'Bulut seçenekleri',
      cloudTitle: 'İstediğinizde bulut yapay zekâsı',
      cloudDescription: 'Zush Cloud ile başlayın veya BYOK modunda kendi sağlayıcınızı bağlayın.',
      managedTitle: 'Zush Cloud',
      managedDescription: 'Hazır · API kurulumu yok',
      byokTitle: 'Kendi Anahtarınızı Getirin',
      byokDescription: 'Gemini, Groq, OpenAI veya Claude',
      byokLink: 'BYOK sağlayıcılarını inceleyin',
      languagesTitle: '60+ dosya adı dili',
      languagesDescription: 'Her klasöre uygun dil ve tarih biçiminde aranabilir dosya adları.',
    },
    compactFormats: {
      eyebrow: 'Karma klasörler için tek akış',
      description: 'Zush görselleri, RAW fotoğrafları, tasarım dosyalarını, PDF’leri, Office ve iWork belgelerini, altyazıları, video ve sesi aynı toplu işlemde analiz eder.',
      extensionsLabel: 'dosya uzantısı',
      revealLabel: 'Desteklenen tüm uzantıları görün',
    },
  },
  ja: {
    aiModes: {
      eyebrow: 'AI の実行方法を選択',
      title: 'AI プロバイダーも、プライバシーも選べます。',
      description: 'クラウド AI、自分のプロバイダーキー、またはプライベートなローカルモデルでファイル名を変更 — 操作は同じです。',
      offlineBadge: 'デバイス上',
      offlineTitle: 'Ollama によるプライベートなオフライン AI',
      offlineDescription: 'Mac または Windows のローカルモデルでファイルを分析。内容はデバイスの外に出ません。',
      offlinePrivacy: 'ローカルモデル · クラウド分析なし',
      offlineLink: 'オフライン AI を設定',
      cloudBadge: 'クラウドの選択肢',
      cloudTitle: '必要なときはクラウド AI',
      cloudDescription: 'Zush Cloud をそのまま使うか、BYOK モードで自分のプロバイダーを接続できます。',
      managedTitle: 'Zush Cloud',
      managedDescription: '組み込み · API 設定不要',
      byokTitle: '自分のキーを使用 (BYOK)',
      byokDescription: 'Gemini、Groq、OpenAI、Claude',
      byokLink: 'BYOK プロバイダーを見る',
      languagesTitle: '60以上のファイル名言語',
      languagesDescription: 'フォルダーに合う言語と日付形式で、検索しやすいファイル名を生成。',
    },
    compactFormats: {
      eyebrow: '混在フォルダーを1つのワークフローで',
      description: '画像、RAW写真、デザインファイル、PDF、Office・iWork文書、字幕、動画、音声を、同じバッチ内でも分析できます。',
      extensionsLabel: 'ファイル拡張子',
      revealLabel: '対応するすべての拡張子を表示',
    },
  },
  ko: {
    aiModes: {
      eyebrow: 'AI 실행 방식을 선택하세요',
      title: 'AI 제공자도, 개인정보 보호 방식도 직접 선택하세요.',
      description: '클라우드 AI, 자체 키 또는 비공개 로컬 모델로 파일 이름 변경 — 워크플로는 동일합니다.',
      offlineBadge: '기기 내 실행',
      offlineTitle: 'Ollama를 이용한 비공개 오프라인 AI',
      offlineDescription: 'Mac 또는 Windows의 로컬 모델로 파일을 분석합니다 — 내용은 기기 밖으로 나가지 않습니다.',
      offlinePrivacy: '로컬 모델 · 클라우드 분석 없음',
      offlineLink: '오프라인 AI 설정',
      cloudBadge: '클라우드 옵션',
      cloudTitle: '원할 때 클라우드 AI 사용',
      cloudDescription: 'Zush Cloud로 시작하거나 BYOK 모드에서 자체 제공자를 연결하세요.',
      managedTitle: 'Zush Cloud',
      managedDescription: '기본 제공 · API 설정 불필요',
      byokTitle: '자체 키 사용 (BYOK)',
      byokDescription: 'Gemini, Groq, OpenAI 또는 Claude',
      byokLink: 'BYOK 제공자 살펴보기',
      languagesTitle: '60개 이상의 파일명 언어',
      languagesDescription: '폴더에 맞는 언어와 날짜 형식의 검색하기 쉬운 파일명.',
    },
    compactFormats: {
      eyebrow: '혼합 폴더도 하나의 워크플로로',
      description: '이미지, RAW 사진, 디자인 파일, PDF, Office 및 iWork 문서, 자막, 비디오와 오디오를 한 번에 분석합니다.',
      extensionsLabel: '파일 확장자',
      revealLabel: '지원되는 모든 확장자 보기',
    },
  },
  'zh-cn': {
    aiModes: {
      eyebrow: '选择 AI 的运行方式',
      title: 'AI 提供商与隐私方式，由你选择。',
      description: '用云端 AI、自有密钥或私有本地模型重命名文件——工作流不变。',
      offlineBadge: '设备端',
      offlineTitle: '通过 Ollama 使用私有离线 AI',
      offlineDescription: '在 Mac 或 Windows 上用本地模型分析文件，内容不会离开你的设备。',
      offlinePrivacy: '本地模型 · 无云端分析',
      offlineLink: '设置离线 AI',
      cloudBadge: '云端选项',
      cloudTitle: '需要时使用云端 AI',
      cloudDescription: '直接使用 Zush Cloud，或在 BYOK 模式中连接自己的提供商。',
      managedTitle: 'Zush Cloud',
      managedDescription: '内置 · 无需配置 API',
      byokTitle: '使用自己的密钥 (BYOK)',
      byokDescription: 'Gemini、Groq、OpenAI 或 Claude',
      byokLink: '查看 BYOK 提供商',
      languagesTitle: '支持 60+ 种文件名语言',
      languagesDescription: '按每个文件夹的语言和日期格式生成易搜索的文件名。',
    },
    compactFormats: {
      eyebrow: '混合文件夹也只需一个工作流',
      description: 'Zush 可在同一批次中分析图片、RAW 照片、设计文件、PDF、Office 与 iWork 文档、字幕、视频和音频。',
      extensionsLabel: '种文件扩展名',
      revealLabel: '查看所有支持的扩展名',
    },
  },
  ar: {
    aiModes: {
      eyebrow: 'اختر طريقة تشغيل الذكاء الاصطناعي',
      title: 'مزود الذكاء الاصطناعي وخصوصيتك باختيارك.',
      description: 'أعد تسمية الملفات عبر الذكاء الاصطناعي السحابي أو مفتاحك الخاص أو نموذج محلي خاص — بنفس سير العمل.',
      offlineBadge: 'على الجهاز',
      offlineTitle: 'ذكاء اصطناعي خاص دون اتصال عبر Ollama',
      offlineDescription: 'حلل الملفات بنموذج محلي على Mac أو Windows — يبقى المحتوى على جهازك.',
      offlinePrivacy: 'نموذج محلي · بلا تحليل سحابي',
      offlineLink: 'إعداد الذكاء الاصطناعي دون اتصال',
      cloudBadge: 'خيارات السحابة',
      cloudTitle: 'استخدم الذكاء الاصطناعي السحابي عند الحاجة',
      cloudDescription: 'ابدأ مع Zush Cloud أو اربط مزودك في وضع BYOK.',
      managedTitle: 'Zush Cloud',
      managedDescription: 'مدمج · بلا إعداد API',
      byokTitle: 'استخدم مفتاحك (BYOK)',
      byokDescription: 'Gemini أو Groq أو OpenAI أو Claude',
      byokLink: 'استكشف مزودي BYOK',
      languagesTitle: 'أكثر من 60 لغة لأسماء الملفات',
      languagesDescription: 'أسماء ملفات سهلة البحث بلغة كل مجلد وتنسيق تاريخه.',
    },
    compactFormats: {
      eyebrow: 'سير عمل واحد للمجلدات المختلطة',
      description: 'يحلل Zush الصور وRAW وملفات التصميم وPDF ومستندات Office وiWork والترجمات والفيديو والصوت حتى ضمن دفعة واحدة.',
      extensionsLabel: 'امتداد ملف',
      revealLabel: 'عرض كل الامتدادات المدعومة',
    },
  },
};
