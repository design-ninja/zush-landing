import type { Locale } from '@/i18n/config';
import { PRO_PRICING } from '@/constants/pricing';

export interface EvidenceSignalsCopy {
  title: string;
  description: string;
  freeTitle: string;
  freeDescription: string;
  blocksTitle: string;
  blocksDescription: string;
  languagesTitle: string;
  languagesDescription: string;
  formatsTitle: string;
  formatsDescription: string;
  sourcesTitle: string;
  links: {
    home: string;
    mac: string;
    windows: string;
    batchRename: string;
    organizer: string;
    methodology: string;
    about: string;
    author: string;
    pricing: string;
    changelog: string;
    privacy: string;
  };
}

const EN: EvidenceSignalsCopy = {
  title: 'What is Zush AI File Renamer?',
  description:
    'Zush is an AI file renamer for Mac and Windows. It reads files across {count} supported formats and builds each filename from the content, metadata, dates, and rules you choose. Review every suggestion, rename a batch when you are ready, or undo it later. Templates and folder monitoring handle repeat work, while Cloud AI or Local AI let you choose where analysis runs.',
  freeTitle: 'Free to try',
  freeDescription: `{limit} free AI renames — no signup, no credit card. PRO from ${PRO_PRICING.oneTime.label} one-time or ${PRO_PRICING.monthly.label}/month.`,
  blocksTitle: '145+ Naming Blocks',
  blocksDescription:
    'Build filenames from dates, metadata, audio details, finance fields, clients, travel, legal, and AI-detected context.',
  languagesTitle: '60+ filename languages',
  languagesDescription:
    'Generate searchable names in the language and date format that fits each folder or team.',
  formatsTitle: '{count} supported formats',
  formatsDescription:
    'Images, RAW photos, design files, PDFs, Office and iWork files, subtitles, audio, and videos can live in one rename workflow.',
  sourcesTitle: 'Sources',
  links: {
    home: 'AI file renamer',
    mac: 'Mac AI file renamer',
    windows: 'Windows AI file renamer',
    batchRename: 'Batch rename files',
    organizer: 'AI file organizer',
    methodology: 'Methodology',
    about: 'About Zush',
    author: 'Author',
    pricing: 'Pricing facts',
    changelog: 'Changelog',
    privacy: 'Privacy',
  },
};

const COPY: Record<Locale, EvidenceSignalsCopy> = {
  en: EN,
  de: {
    title: 'Was ist Zush AI File Renamer?',
    description:
      'Zush ist ein KI-Dateiumbenenner für Mac und Windows. Er liest Dateien in {count} unterstützten Formaten und erstellt jeden Dateinamen aus Inhalt, Metadaten, Datumsangaben und den von Ihnen gewählten Regeln. Prüfen Sie jeden Vorschlag, benennen Sie den Stapel um, wenn alles passt, oder machen Sie den Vorgang später rückgängig. Templates und Ordnerüberwachung automatisieren wiederkehrende Aufgaben; mit Cloud AI oder Local AI bestimmen Sie, wo die Analyse stattfindet.',
    freeTitle: 'Kostenlos testen',
    freeDescription: `{limit} kostenlose KI-Umbenennungen — ohne Registrierung und Kreditkarte. PRO ab ${PRO_PRICING.oneTime.usd} $ einmalig oder ${PRO_PRICING.monthly.usd} $/Monat.`,
    blocksTitle: '145+ Namensbausteine',
    blocksDescription:
      'Baue Dateinamen aus Datum, Metadaten, Audiodetails, Finanzfeldern, Kunden, Reisen, Recht und KI-erkanntem Kontext.',
    languagesTitle: '60+ Sprachen für Dateinamen',
    languagesDescription:
      'Erzeuge durchsuchbare Namen in der Sprache und im Datumsformat, das zu jedem Ordner oder Team passt.',
    formatsTitle: '{count} unterstützte Formate',
    formatsDescription:
      'Bilder, RAW-Fotos, Designdateien, PDFs, Office- und iWork-Dateien, Untertitel, Audio und Videos in einem Umbenennungs-Workflow.',
    sourcesTitle: 'Quellen',
    links: {
      home: 'KI-Datei-Umbenenner',
      mac: 'KI-Datei-Umbenenner für Mac',
      windows: 'KI-Datei-Umbenenner für Windows',
      batchRename: 'Dateien stapelweise umbenennen',
      organizer: 'KI-Dateiorganizer',
      methodology: 'Methodik',
      about: 'Über Zush',
      author: 'Autor',
      pricing: 'Preisfakten',
      changelog: 'Änderungsprotokoll',
      privacy: 'Datenschutz',
    },
  },
  fr: {
    title: 'Qu’est-ce que Zush AI File Renamer ?',
    description:
      'Zush est un renommeur de fichiers par IA pour Mac et Windows. Il lit les fichiers dans {count} formats pris en charge et compose chaque nom à partir du contenu, des métadonnées, des dates et des règles que vous choisissez. Vérifiez chaque suggestion, renommez le lot quand vous êtes prêt ou annulez plus tard. Les modèles et la surveillance de dossiers automatisent les tâches répétitives, tandis que Cloud AI et Local AI vous permettent de choisir où l’analyse s’exécute.',
    freeTitle: 'Essai gratuit',
    freeDescription: `{limit} renommages par IA gratuits — sans inscription ni carte bancaire. PRO dès ${PRO_PRICING.oneTime.usd} $ en achat unique ou ${PRO_PRICING.monthly.usd} $/mois.`,
    blocksTitle: '145+ blocs de nommage',
    blocksDescription:
      'Composez vos noms de fichiers à partir de dates, métadonnées, détails audio, champs financiers, clients, voyages, mentions légales et contexte détecté par l’IA.',
    languagesTitle: '60+ langues de nommage',
    languagesDescription:
      'Générez des noms consultables dans la langue et le format de date adaptés à chaque dossier ou équipe.',
    formatsTitle: '{count} formats pris en charge',
    formatsDescription:
      'Images, photos RAW, fichiers de design, PDF, fichiers Office et iWork, sous-titres, audio et vidéos dans un seul flux de renommage.',
    sourcesTitle: 'Sources',
    links: {
      home: 'Renommeur de fichiers par IA',
      mac: 'Renommeur de fichiers IA pour Mac',
      windows: 'Renommeur de fichiers IA pour Windows',
      batchRename: 'Renommer des fichiers par lot',
      organizer: 'Organisateur de fichiers par IA',
      methodology: 'Méthodologie',
      about: 'À propos de Zush',
      author: 'Auteur',
      pricing: 'Détails tarifaires',
      changelog: 'Journal des modifications',
      privacy: 'Confidentialité',
    },
  },
  es: {
    title: '¿Qué es Zush AI File Renamer?',
    description:
      'Zush es un renombrador de archivos con IA para Mac y Windows. Lee archivos en {count} formatos compatibles y crea cada nombre a partir del contenido, los metadatos, las fechas y las reglas que elijas. Revisa cada sugerencia, renombra el lote cuando esté listo o deshazlo más tarde. Las plantillas y la monitorización de carpetas automatizan el trabajo repetitivo, mientras que Cloud AI y Local AI te permiten elegir dónde se realiza el análisis.',
    freeTitle: 'Prueba gratuita',
    freeDescription: `{limit} renombrados con IA gratis — sin registro ni tarjeta de crédito. PRO desde ${PRO_PRICING.oneTime.usd} $ en pago único u ${PRO_PRICING.monthly.usd} $/mes.`,
    blocksTitle: '145+ bloques de nombrado',
    blocksDescription:
      'Crea nombres de archivo a partir de fechas, metadatos, detalles de audio, campos financieros, clientes, viajes, datos legales y contexto detectado por la IA.',
    languagesTitle: '60+ idiomas para nombres',
    languagesDescription:
      'Genera nombres fáciles de buscar en el idioma y el formato de fecha que encaje con cada carpeta o equipo.',
    formatsTitle: '{count} formatos compatibles',
    formatsDescription:
      'Imágenes, fotos RAW, archivos de diseño, PDF, archivos de Office e iWork, subtítulos, audio y vídeos en un mismo flujo de renombrado.',
    sourcesTitle: 'Fuentes',
    links: {
      home: 'Renombrador de archivos con IA',
      mac: 'Renombrador de archivos con IA para Mac',
      windows: 'Renombrador de archivos con IA para Windows',
      batchRename: 'Renombrar archivos por lotes',
      organizer: 'Organizador de archivos con IA',
      methodology: 'Metodología',
      about: 'Sobre Zush',
      author: 'Autor',
      pricing: 'Datos de precios',
      changelog: 'Registro de cambios',
      privacy: 'Privacidad',
    },
  },
  'pt-br': {
    title: 'O que é o Zush AI File Renamer?',
    description:
      'O Zush é um renomeador de arquivos com IA para Mac e Windows. Ele lê arquivos em {count} formatos compatíveis e cria cada nome com base no conteúdo, nos metadados, nas datas e nas regras escolhidas. Revise cada sugestão, renomeie o lote quando estiver pronto ou desfaça depois. Templates e monitoramento de pastas automatizam tarefas recorrentes, enquanto Cloud AI e Local AI permitem escolher onde a análise será executada.',
    freeTitle: 'Teste grátis',
    freeDescription: `{limit} renomeações com IA grátis — sem cadastro nem cartão de crédito. PRO a partir de US$ ${PRO_PRICING.oneTime.usd} (pagamento único) ou US$ ${PRO_PRICING.monthly.usd}/mês.`,
    blocksTitle: '145+ blocos de nomeação',
    blocksDescription:
      'Monte nomes de arquivo com datas, metadados, detalhes de áudio, campos financeiros, clientes, viagens, dados jurídicos e contexto detectado pela IA.',
    languagesTitle: '60+ idiomas para nomes',
    languagesDescription:
      'Gere nomes fáceis de buscar no idioma e no formato de data que combinam com cada pasta ou equipe.',
    formatsTitle: '{count} formatos compatíveis',
    formatsDescription:
      'Imagens, fotos RAW, arquivos de design, PDFs, arquivos do Office e iWork, legendas, áudio e vídeos em um único fluxo de renomeação.',
    sourcesTitle: 'Fontes',
    links: {
      home: 'Renomeador de arquivos com IA',
      mac: 'Renomeador de arquivos com IA para Mac',
      windows: 'Renomeador de arquivos com IA para Windows',
      batchRename: 'Renomear arquivos em lote',
      organizer: 'Organizador de arquivos com IA',
      methodology: 'Metodologia',
      about: 'Sobre o Zush',
      author: 'Autor',
      pricing: 'Dados de preços',
      changelog: 'Registro de alterações',
      privacy: 'Privacidade',
    },
  },
  it: {
    title: 'Che cos’è Zush AI File Renamer?',
    description:
      'Zush è un rinominatore di file con IA per Mac e Windows. Legge file in {count} formati supportati e crea ogni nome dal contenuto, dai metadati, dalle date e dalle regole scelte. Controlla ogni suggerimento, rinomina il batch quando è pronto oppure annullalo in seguito. Templates e monitoraggio delle cartelle automatizzano le attività ricorrenti, mentre Cloud AI e Local AI permettono di scegliere dove eseguire l’analisi.',
    freeTitle: 'Prova gratuita',
    freeDescription: `{limit} rinomine con IA gratuite — senza registrazione né carta di credito. PRO da ${PRO_PRICING.oneTime.usd} $ una tantum o ${PRO_PRICING.monthly.usd} $/mese.`,
    blocksTitle: '145+ blocchi di denominazione',
    blocksDescription:
      'Costruisci i nomi dei file da date, metadati, dettagli audio, campi finanziari, clienti, viaggi, dati legali e contesto rilevato dall’IA.',
    languagesTitle: '60+ lingue per i nomi',
    languagesDescription:
      'Genera nomi facili da cercare nella lingua e nel formato data adatti a ogni cartella o team.',
    formatsTitle: '{count} formati supportati',
    formatsDescription:
      'Immagini, foto RAW, file di design, PDF, file Office e iWork, sottotitoli, audio e video in un unico flusso di rinomina.',
    sourcesTitle: 'Fonti',
    links: {
      home: 'Rinominatore di file con IA',
      mac: 'Rinominatore di file con IA per Mac',
      windows: 'Rinominatore di file con IA per Windows',
      batchRename: 'Rinominare file in blocco',
      organizer: 'Organizzatore di file con IA',
      methodology: 'Metodologia',
      about: 'Informazioni su Zush',
      author: 'Autore',
      pricing: 'Dati sui prezzi',
      changelog: 'Registro delle modifiche',
      privacy: 'Privacy',
    },
  },
  nl: {
    title: 'Wat is Zush AI File Renamer?',
    description:
      'Zush is een AI-bestandshernoemer voor Mac en Windows. Het leest bestanden in {count} ondersteunde formaten en stelt elke bestandsnaam samen uit inhoud, metadata, datums en de regels die u kiest. Controleer elke suggestie, hernoem de batch wanneer u klaar bent of maak deze later ongedaan. Templates en mapbewaking automatiseren terugkerend werk, terwijl u met Cloud AI of Local AI kiest waar de analyse plaatsvindt.',
    freeTitle: 'Gratis proberen',
    freeDescription: `{limit} gratis AI-hernoemingen — zonder registratie of creditcard. PRO vanaf $ ${PRO_PRICING.oneTime.usd} eenmalig of $ ${PRO_PRICING.monthly.usd}/maand.`,
    blocksTitle: '145+ naamblokken',
    blocksDescription:
      'Stel bestandsnamen samen uit datums, metadata, audiodetails, financiële velden, klanten, reizen, juridische gegevens en door AI herkende context.',
    languagesTitle: '60+ talen voor bestandsnamen',
    languagesDescription:
      'Genereer doorzoekbare namen in de taal en datumnotatie die bij elke map of elk team passen.',
    formatsTitle: '{count} ondersteunde formaten',
    formatsDescription:
      'Afbeeldingen, RAW-foto’s, ontwerpbestanden, pdf’s, Office- en iWork-bestanden, ondertitels, audio en video in één hernoemworkflow.',
    sourcesTitle: 'Bronnen',
    links: {
      home: 'AI-bestandshernoemer',
      mac: 'AI-bestandshernoemer voor Mac',
      windows: 'AI-bestandshernoemer voor Windows',
      batchRename: 'Bestanden bulksgewijs hernoemen',
      organizer: 'AI-bestandsorganizer',
      methodology: 'Methodologie',
      about: 'Over Zush',
      author: 'Auteur',
      pricing: 'Prijsgegevens',
      changelog: 'Wijzigingslog',
      privacy: 'Privacy',
    },
  },
  tr: {
    title: 'Zush AI File Renamer nedir?',
    description:
      'Zush, Mac ve Windows için yapay zekâ destekli bir dosya yeniden adlandırıcıdır. {count} desteklenen biçimdeki dosyaları okur ve her dosya adını içerik, meta veriler, tarihler ve seçtiğiniz kurallardan oluşturur. Her öneriyi inceleyin, hazır olduğunuzda toplu işlemi uygulayın veya daha sonra geri alın. Templates ve klasör izleme tekrarlanan işleri otomatikleştirirken Cloud AI ya da Local AI analizin nerede çalışacağını seçmenizi sağlar.',
    freeTitle: 'Ücretsiz deneyin',
    freeDescription: `{limit} ücretsiz yapay zekâ yeniden adlandırma — kayıt veya kredi kartı gerekmez. PRO tek seferlik ${PRO_PRICING.oneTime.usd} $ veya ayda ${PRO_PRICING.monthly.usd} $.`,
    blocksTitle: '145+ adlandırma bloğu',
    blocksDescription:
      'Dosya adlarını tarihlerden, meta verilerden, ses ayrıntılarından, finans alanlarından, müşterilerden, seyahat ve hukuk verilerinden ve yapay zekânın algıladığı bağlamdan oluşturun.',
    languagesTitle: '60+ dosya adı dili',
    languagesDescription:
      'Her klasöre veya ekibe uyan dilde ve tarih biçiminde aranabilir adlar oluşturun.',
    formatsTitle: '{count} desteklenen biçim',
    formatsDescription:
      'Görseller, RAW fotoğraflar, tasarım dosyaları, PDF’ler, Office ve iWork dosyaları, altyazılar, ses ve videolar tek bir yeniden adlandırma akışında.',
    sourcesTitle: 'Kaynaklar',
    links: {
      home: 'Yapay zekâ dosya yeniden adlandırıcı',
      mac: 'Mac için yapay zekâ dosya yeniden adlandırıcı',
      windows: 'Windows için yapay zekâ dosya yeniden adlandırıcı',
      batchRename: 'Dosyaları toplu yeniden adlandırma',
      organizer: 'Yapay zekâ dosya düzenleyici',
      methodology: 'Metodoloji',
      about: 'Zush hakkında',
      author: 'Yazar',
      pricing: 'Fiyat bilgileri',
      changelog: 'Değişiklik günlüğü',
      privacy: 'Gizlilik',
    },
  },
  ja: {
    title: 'Zush AI File Renamer とは？',
    description:
      'Zush は Mac と Windows 向けの AI ファイルリネームツールです。{count} 種類の対応形式を読み取り、内容、メタデータ、日付、選択したルールから各ファイル名を作成します。すべての候補を確認してから一括で適用でき、後から元に戻すこともできます。Templates とフォルダ監視で繰り返し作業を自動化し、Cloud AI または Local AI で解析場所を選べます。',
    freeTitle: '無料で試せる',
    freeDescription: `無料で {limit} 件の AI リネームが可能 — 登録もクレジットカードも不要。PRO は買い切り ${PRO_PRICING.oneTime.label} または月額 ${PRO_PRICING.monthly.label} から。`,
    blocksTitle: '145 以上のネーミングブロック',
    blocksDescription:
      '日付、メタデータ、音声情報、金融項目、クライアント、旅行、法務、AI が検出した文脈からファイル名を組み立てられます。',
    languagesTitle: '60 以上のファイル名言語',
    languagesDescription:
      'フォルダやチームに合った言語と日付形式で、検索しやすい名前を生成します。',
    formatsTitle: '対応形式 {count} 種類',
    formatsDescription:
      '画像、RAW 写真、デザインファイル、PDF、Office と iWork のファイル、字幕、音声、動画を一つのリネームワークフローで扱えます。',
    sourcesTitle: '参考リンク',
    links: {
      home: 'AI ファイルリネーマー',
      mac: 'Mac 用 AI ファイルリネーマー',
      windows: 'Windows 用 AI ファイルリネーマー',
      batchRename: 'ファイルの一括リネーム',
      organizer: 'AI ファイル整理ツール',
      methodology: '方法論',
      about: 'Zush について',
      author: '著者',
      pricing: '料金の詳細',
      changelog: '変更履歴',
      privacy: 'プライバシー',
    },
  },
  ko: {
    title: 'Zush AI File Renamer란?',
    description:
      'Zush는 Mac과 Windows용 AI 파일 이름 변경 도구입니다. {count}개 지원 형식의 파일을 읽고 콘텐츠, 메타데이터, 날짜와 사용자가 선택한 규칙으로 각 파일 이름을 만듭니다. 모든 제안을 검토한 뒤 배치를 적용하고 나중에 되돌릴 수 있습니다. Templates와 폴더 모니터링은 반복 작업을 자동화하며, Cloud AI 또는 Local AI로 분석 위치를 선택할 수 있습니다.',
    freeTitle: '무료로 사용해 보기',
    freeDescription: `무료 AI 이름 변경 {limit}회 — 가입이나 신용카드가 필요 없습니다. PRO는 일시불 ${PRO_PRICING.oneTime.label} 또는 월 ${PRO_PRICING.monthly.label}부터.`,
    blocksTitle: '145개 이상의 네이밍 블록',
    blocksDescription:
      '날짜, 메타데이터, 오디오 정보, 금융 항목, 고객, 여행, 법률 정보와 AI가 인식한 맥락으로 파일 이름을 구성하세요.',
    languagesTitle: '60개 이상의 파일 이름 언어',
    languagesDescription:
      '폴더나 팀에 맞는 언어와 날짜 형식으로 검색하기 쉬운 이름을 생성합니다.',
    formatsTitle: '지원 형식 {count}종',
    formatsDescription:
      '이미지, RAW 사진, 디자인 파일, PDF, Office 및 iWork 파일, 자막, 오디오, 동영상을 하나의 이름 변경 워크플로에서 처리합니다.',
    sourcesTitle: '참고 자료',
    links: {
      home: 'AI 파일 이름 변경 도구',
      mac: 'Mac용 AI 파일 이름 변경 도구',
      windows: 'Windows용 AI 파일 이름 변경 도구',
      batchRename: '파일 일괄 이름 변경',
      organizer: 'AI 파일 정리 도구',
      methodology: '방법론',
      about: 'Zush 소개',
      author: '작성자',
      pricing: '가격 정보',
      changelog: '변경 내역',
      privacy: '개인정보 처리방침',
    },
  },
  'zh-cn': {
    title: 'Zush AI File Renamer 是什么？',
    description:
      'Zush 是一款面向 Mac 和 Windows 的 AI 文件重命名工具。它可读取 {count} 种支持格式，并根据内容、元数据、日期和您选择的规则生成每个文件名。您可以逐一检查建议，确认后批量重命名，也可以稍后撤销。Templates 和文件夹监控可处理重复任务，Cloud AI 与 Local AI 则让您选择分析运行的位置。',
    freeTitle: '免费试用',
    freeDescription: `免费 {limit} 次 AI 重命名 — 无需注册或信用卡。PRO 版一次性购买 ${PRO_PRICING.oneTime.usd} 美元起，或每月 ${PRO_PRICING.monthly.usd} 美元。`,
    blocksTitle: '145+ 命名模块',
    blocksDescription:
      '可用日期、元数据、音频信息、财务字段、客户、差旅、法务以及 AI 识别的上下文来拼装文件名。',
    languagesTitle: '60+ 种文件名语言',
    languagesDescription:
      '按每个文件夹或团队合适的语言和日期格式，生成便于检索的文件名。',
    formatsTitle: '支持 {count} 种格式',
    formatsDescription:
      '图片、RAW 照片、设计文件、PDF、Office 与 iWork 文件、字幕、音频和视频，都能在同一个重命名流程中处理。',
    sourcesTitle: '参考来源',
    links: {
      home: 'AI 文件重命名工具',
      mac: 'Mac 版 AI 文件重命名工具',
      windows: 'Windows 版 AI 文件重命名工具',
      batchRename: '批量重命名文件',
      organizer: 'AI 文件整理工具',
      methodology: '方法论',
      about: '关于 Zush',
      author: '作者',
      pricing: '价格说明',
      changelog: '更新日志',
      privacy: '隐私政策',
    },
  },
  ar: {
    title: 'ما هو Zush AI File Renamer؟',
    description:
      'Zush هو أداة لإعادة تسمية الملفات بالذكاء الاصطناعي على Mac وWindows. يقرأ الملفات ضمن {count} صيغة مدعومة وينشئ اسم كل ملف من المحتوى والبيانات الوصفية والتواريخ والقواعد التي تختارها. راجع كل اقتراح، ثم أعد تسمية الدفعة عندما تصبح جاهزة أو تراجع عنها لاحقًا. تعمل Templates ومراقبة المجلدات على أتمتة المهام المتكررة، بينما يتيح لك Cloud AI أو Local AI اختيار مكان إجراء التحليل.',
    freeTitle: 'جرّبه مجانًا',
    freeDescription: `{limit} عملية إعادة تسمية مجانية بالذكاء الاصطناعي — دون تسجيل أو بطاقة ائتمان. النسخة PRO تبدأ من ${PRO_PRICING.oneTime.usd} دولارًا دفعة واحدة أو ${PRO_PRICING.monthly.usd} دولارات شهريًا.`,
    blocksTitle: 'أكثر من 145 وحدة تسمية',
    blocksDescription:
      'كوّن أسماء الملفات من التواريخ والبيانات الوصفية وتفاصيل الصوت والحقول المالية والعملاء والسفر والبيانات القانونية والسياق الذي يكتشفه الذكاء الاصطناعي.',
    languagesTitle: 'أكثر من 60 لغة لأسماء الملفات',
    languagesDescription:
      'أنشئ أسماء قابلة للبحث باللغة وتنسيق التاريخ المناسبين لكل مجلد أو فريق.',
    formatsTitle: '{count} صيغة مدعومة',
    formatsDescription:
      'الصور وصور RAW وملفات التصميم وملفات PDF وملفات Office وiWork والترجمات والصوت والفيديو، كلها في مسار إعادة تسمية واحد.',
    sourcesTitle: 'المصادر',
    links: {
      home: 'أداة إعادة تسمية الملفات بالذكاء الاصطناعي',
      mac: 'إعادة تسمية الملفات بالذكاء الاصطناعي لنظام Mac',
      windows: 'إعادة تسمية الملفات بالذكاء الاصطناعي لنظام Windows',
      batchRename: 'إعادة تسمية الملفات دفعة واحدة',
      organizer: 'منظّم الملفات بالذكاء الاصطناعي',
      methodology: 'المنهجية',
      about: 'عن Zush',
      author: 'المؤلف',
      pricing: 'تفاصيل الأسعار',
      changelog: 'سجل التغييرات',
      privacy: 'الخصوصية',
    },
  },
};

export function getEvidenceSignalsCopy(locale: Locale): EvidenceSignalsCopy {
  return COPY[locale] ?? EN;
}
