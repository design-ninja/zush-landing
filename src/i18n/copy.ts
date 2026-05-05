import type { Locale, LocalizedRoute } from '@/i18n/config';
import { HOME_FAQ_DATA } from '@/data/homeFaq';
import type { Slide } from '@/components/FileShowcase';

export interface FAQCopyItem {
  question: string;
  answer: string;
}

export interface HeaderCopy {
  features: string;
  pricing: string;
  faq: string;
  blog: string;
  buyPro: string;
  download: string;
  toggleTheme: string;
  language: string;
  homeAria?: string;
  skipToContent?: string;
}

export interface DownloadMenuCopy {
  downloadForMac: string;
  windowsTitle: string;
  macDirectHint: string;
  windowsHint: string;
  appStoreTitle: string;
  appStoreHint: string;
  showOptions: string;
}

export interface FooterCopy {
  description: string;
  product: string;
  byFileType: string;
  resources: string;
  support: string;
  pricing: string;
  blog: string;
  changelog: string;
  methodology: string;
  byokSetup: string;
  ollamaSetup: string;
  contactSupport: string;
  feedback: string;
  terms: string;
  privacy: string;
  refund: string;
  appStoreKicker: string;
  appStoreLabel: string;
  appStoreAria: string;
  microsoftStoreKicker: string;
  microsoftStoreLabel: string;
  microsoftStoreAria: string;
  followX: string;
  followYouTube: string;
  productHunt: string;
  designedBy: string;
  designedWith: string;
  productLinks: Record<string, string>;
}

export interface FeatureCardsCopy {
  aiAnalysis: { title: string; description: string };
  foldersMonitoring: { title: string; description: string };
  batchRename: { title: string; description: string };
  customPatterns: { title: string; description: string };
  smartMetadata: { title: string; description: string };
  renameHistory: { title: string; description: string };
  customPrompts: { title: string; description: string };
  byok: { title: string; description: string };
  offlineAi: { title: string; description: string };
  addFolder: string;
  promptRules: string;
  customBadge: string;
  apiKeyConnected: string;
  terminal: string;
  localModelReady: string;
  today: string;
  undo: string;
  analysisNewName: string;
  batchNewNames: string[];
  metadataFileName: string;
  metadataTags: string[];
  historyNewNames: string[];
  promptExample: string;
}

export const DEFAULT_FEATURE_CARDS_COPY: FeatureCardsCopy = {
  aiAnalysis: {
    title: 'AI Analysis',
    description: 'Advanced AI analyzes images and supported documents, including PDFs, to generate meaningful, descriptive filenames automatically.',
  },
  foldersMonitoring: {
    title: 'Folders Monitoring',
    description: 'Watch one or multiple folders. Zush runs in the background and processes new files automatically.',
  },
  batchRename: {
    title: 'Batch Rename',
    description: 'Drag and drop multiple files at once. Zush will analyze and rename them all in seconds.',
  },
  customPatterns: {
    title: 'Custom Patterns',
    description: 'Set your own file naming pattern with variables like {title}, {original}, {date}, {time}, or {category}.',
  },
  smartMetadata: {
    title: 'Smart Metadata',
    description: 'Automatically add Finder tags and Spotlight metadata. Find files instantly with natural search queries.',
  },
  renameHistory: {
    title: 'Rename History',
    description: 'Keep track of every change. Made a mistake? Rollback to the original filename with one click.',
  },
  customPrompts: {
    title: 'Custom AI Prompts',
    description: 'Set rename, tagging, and metadata rules so AI output follows your style and workflow.',
  },
  byok: {
    title: 'Bring Your Own Key',
    description: 'Connect your own API key from Gemini, Groq, OpenAI, or Claude for unlimited cloud renames. Keys are stored locally in secure platform storage.',
  },
  offlineAi: {
    title: 'Offline AI mode',
    description: 'Private local models via Ollama. Process supported files offline without sending analysis content to Zush cloud or AI providers.',
  },
  addFolder: 'Add Folder',
  promptRules: 'Prompt rules',
  customBadge: 'Custom',
  apiKeyConnected: 'API key connected',
  terminal: 'Terminal',
  localModelReady: 'Local model ready',
  today: 'Today',
  undo: 'Undo',
  analysisNewName: 'Bali_Sunset_Beach.png',
  batchNewNames: ['Kanban Board UI.png', 'Hiring Plan Notes.docx', 'Investor Update Deck.pptx'],
  metadataFileName: 'Cyberpunk_Art.png',
  metadataTags: ['glitch art', 'vaporwave', 'statue', 'cyberpunk', 'digital art', 'palm tree'],
  historyNewNames: ['Dashboard Review Notes.docx', 'Q1 Revenue Report.xlsx'],
  promptExample: 'Keep names short, put the subject first, and add matching Finder tags.',
};

export interface VideosCopy {
  title: string;
  titleAccent: string;
  description: string;
  playDemo: string;
  switchTo: string;
  items: Record<string, { title: string; description: string; alt?: string }>;
}

export interface SpeedComparisonCopy {
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  zushLabel: string;
  zushCaption: string;
  zushBadge: string;
  rivalLabel: string;
  rivalCaption: string;
  rivalStatus: string;
  rivalDoneLabel: string;
  rivalPlaceholderHint: string;
  runningLabel: string;
  replayLabel: string;
  skipToEndLabel: string;
  disclaimer: string;
}

export interface WhyZushCopy {
  title: string;
  titlePlatform: string;
  description: string;
  descriptionPlatform: string;
  nativeEyebrow: string;
  nativeEyebrowPlatform: string;
  nativeTitle: string;
  nativeDescription: string;
  nativeDescriptionPlatform: string;
  pricingTrustItems: string[];
  priceEyebrow: string;
  priceTitle: string;
  priceDescription: string;
  priceLabel: string;
  speedEyebrow: string;
  speedTitle: string;
  speedDescription: string;
  formatsEyebrow: string;
  formatsTitle: string;
  formatsDescription: string;
  controlEyebrow: string;
  controlTitle: string;
  controlDescription: string;
  workflowSteps: string[];
}

export interface UseCasesCopy {
  items: Array<{ title: string; description: string }>;
}

export interface RenameDemoCopy {
  eyebrow: string;
  title: string;
  emptyTitle: string;
  emptySubtitle: string;
  selectFiles: string;
  supportedFormatsLabel: string;
  privacyHint: string;
  progressLabel: string;
  previewOnlyLabel: string;
  startOver: string;
  downloadCta: string;
  status: {
    queued: string;
    preparing: string;
    analyzing: string;
    done: string;
    error: string;
  };
  errors: {
    unsupportedType: string;
    fileTooLarge: string;
    emptyPreview: string;
    processingFailed: string;
    tooManyFiles: string;
  };
  cta: {
    title: string;
    features: {
      batchRename: string;
      foldersMonitor: string;
      smartNaming: string;
      customAIPrompts: string;
      languages: string;
      quickRenameShortcut: string;
      byok: string;
      offlineAI: string;
    };
  };
}

export interface HomeCopy {
  heroTitle: string;
  heroAccent: string;
  heroSubtitle: string;
  buyPro: string;
  trustSignals: string[];
  featuresTitle: string;
  featuresDescription: string;
  supportedFormats: string;
  images: string;
  documents: string;
  downloadTitle: string;
  downloadSubtitle: string;
  downloadHintPrefix: string;
  useCasesTitle: string;
  useCasesDescription: string;
  faqTitle: string;
  faqTitleAccent: string;
  faqDescription: string;
  featureCards: FeatureCardsCopy;
  videos: VideosCopy;
  speedComparison: SpeedComparisonCopy;
  whyZush: WhyZushCopy;
  useCases: UseCasesCopy;
  renameDemo: RenameDemoCopy;
  faqItems: FAQCopyItem[];
  showcaseSlides: Slide[];
}

export interface PricingCopy {
  title: string;
  description: string;
  planName: string;
  planDescription: string;
  billing: string;
  buttonText: string;
  buttonHint: string;
  features: Array<{ title: string; desc: string }>;
}

export interface PlatformCopy {
  breadcrumbLabel: string;
  softwareName: string;
  softwareDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  faqDescription: string;
  features: string[];
  faqs: FAQCopyItem[];
}

export interface FeatureCopy {
  h1: string;
  accent: string;
  definitionText: string;
  faqItems: FAQCopyItem[];
  relatedToolsTitle: string;
  relatedGuidesTitle: string;
  faqTitle: string;
  showcaseSlides?: Slide[];
}

export interface LocaleCopy {
  header: HeaderCopy;
  downloadMenu: DownloadMenuCopy;
  footer: FooterCopy;
  home: HomeCopy;
  pricing: PricingCopy;
  platforms: {
    mac: PlatformCopy;
    windows: PlatformCopy;
  };
  featurePages: Partial<Record<LocalizedRoute, FeatureCopy>>;
  seo: Partial<Record<LocalizedRoute, { title: string; description: string }>>;
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<U>
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

const pricingFeatureIcons = [
  'credits',
  'byok',
  'offline',
  'monitor',
  'metadata',
  'prompts',
  'localization',
  'shortcut',
] as const;

const homeShowcaseSlides = (afterNames: string[]): Slide[] => [
  {
    files: [
      { before: 'IMG_0842.JPG', after: afterNames[0], img: '/images/examples/pug.jpg', type: 'image' },
      { before: 'meeting_notes_v7_final.docx', after: afterNames[1], type: 'doc' },
      { before: 'budget_export_copy(2).xlsx', after: afterNames[2], type: 'sheet' },
      { before: 'deck_v12_really-final.pptx', after: afterNames[3], type: 'slides' },
      { before: 'client-brief-scan.pdf', after: afterNames[4], type: 'pdf' },
      { before: 'Screenshot 2024-08-08 at 09.14.25.png', after: afterNames[5], img: '/images/examples/dashboard.jpg', type: 'image' },
    ],
  },
  {
    files: [
      { before: 'notes_from_call_FINAL.docx', after: afterNames[6], type: 'doc' },
      { before: 'forecast_2026-03-18_export.xlsx', after: afterNames[7], type: 'sheet' },
      { before: 'sales-kickoff-new(3).pptx', after: afterNames[8], type: 'slides' },
      { before: 'IMG_20240812_143052.jpg', after: afterNames[9], img: '/images/examples/dog.jpg', type: 'image' },
      { before: 'proposal_draft_approved.pdf', after: afterNames[10], type: 'pdf' },
      { before: 'received_1847362910.jpeg', after: afterNames[11], img: '/images/examples/food.jpg', type: 'image' },
    ],
  },
  {
    files: [
      { before: 'contract_notes_clean.docx', after: afterNames[12], type: 'doc' },
      { before: 'pipeline_export_march.xlsx', after: afterNames[13], type: 'sheet' },
      { before: 'marketing-review-v5.pptx', after: afterNames[14], type: 'slides' },
      { before: 'scan_2026_03_19.pdf', after: afterNames[15], type: 'pdf' },
      { before: 'PXL_20240720_091234.jpg', after: afterNames[16], img: '/images/examples/flowers.jpg', type: 'image' },
      { before: 'CAM00847.jpg', after: afterNames[17], img: '/images/examples/car.jpg', type: 'image' },
    ],
  },
];

const EN_HOME_SHOWCASE_SLIDES = homeShowcaseSlides([
  'Pug In Yellow Beanie.jpg',
  'Q1 Planning Notes.docx',
  'Product Launch Budget.xlsx',
  'Investor Update Deck.pptx',
  'Client Creative Brief.pdf',
  'Technical Dashboard.png',
  'Hiring Plan Notes.docx',
  'Revenue Forecast.xlsx',
  'Sales Kickoff Slides.pptx',
  'HappyDogOnBeach.jpg',
  'Website Proposal.pdf',
  'Delicious Asian Style Beef.jpeg',
  'Vendor Contract Notes.docx',
  'Sales Pipeline March.xlsx',
  'Campaign Review Slides.pptx',
  'Signed Service Agreement.pdf',
  'Vibrant Yellow Flowers.jpg',
  'Black Ford Mustang.jpg',
]);

const localizedFileExamples: Record<Exclude<Locale, 'en'>, { featureCards: Partial<FeatureCardsCopy>; showcaseSlides: Slide[] }> = {
  de: {
    featureCards: {
      analysisNewName: 'Bali_Sonnenuntergang_Strand.png',
      batchNewNames: ['Kanban_Board_UI.png', 'Einstellungsplan_Notizen.docx', 'Investoren_Update_Deck.pptx'],
      metadataFileName: 'Cyberpunk_Kunst.png',
      metadataTags: ['Glitch-Art', 'Vaporwave', 'Statue', 'Cyberpunk', 'digitale Kunst', 'Palme'],
      historyNewNames: ['Dashboard_Review_Notizen.docx', 'Q1_Umsatzbericht.xlsx'],
      promptExample: 'Namen kurz halten, Motiv zuerst nennen und passende Finder-Tags hinzufügen.',
    },
    showcaseSlides: homeShowcaseSlides([
      'Mops_mit_gelber_Muetze.jpg',
      'Q1_Planungsnotizen.docx',
      'Produktlaunch_Budget.xlsx',
      'Investoren_Update_Deck.pptx',
      'Kunden_Kreativbriefing.pdf',
      'Technisches_Dashboard.png',
      'Einstellungsplan_Notizen.docx',
      'Umsatzprognose.xlsx',
      'Sales_Kickoff_Folien.pptx',
      'Gluecklicher_Hund_am_Strand.jpg',
      'Website_Angebot.pdf',
      'Asiatisches_Rindfleisch.jpeg',
      'Lieferantenvertrag_Notizen.docx',
      'Sales_Pipeline_Maerz.xlsx',
      'Kampagnenreview_Folien.pptx',
      'Unterzeichneter_Servicevertrag.pdf',
      'Leuchtend_gelbe_Blumen.jpg',
      'Schwarzer_Ford_Mustang.jpg',
    ]),
  },
  fr: {
    featureCards: {
      analysisNewName: 'Coucher_de_soleil_Bali.png',
      batchNewNames: ['Interface_Kanban.png', 'Notes_plan_recrutement.docx', 'Deck_mise_a_jour_investisseurs.pptx'],
      metadataFileName: 'Art_cyberpunk.png',
      metadataTags: ['glitch art', 'vaporwave', 'statue', 'cyberpunk', 'art numerique', 'palmier'],
      historyNewNames: ['Notes_revue_dashboard.docx', 'Rapport_revenus_Q1.xlsx'],
      promptExample: 'Gardez les noms courts, placez le sujet en premier et ajoutez les tags Finder pertinents.',
    },
    showcaseSlides: homeShowcaseSlides([
      'Carlin_au_bonnet_jaune.jpg',
      'Notes_planification_Q1.docx',
      'Budget_lancement_produit.xlsx',
      'Deck_mise_a_jour_investisseurs.pptx',
      'Brief_creatif_client.pdf',
      'Tableau_de_bord_technique.png',
      'Notes_plan_recrutement.docx',
      'Prevision_revenus.xlsx',
      'Slides_lancement_commercial.pptx',
      'Chien_heureux_sur_la_plage.jpg',
      'Proposition_site_web.pdf',
      'Boeuf_style_asiatique.jpeg',
      'Notes_contrat_fournisseur.docx',
      'Pipeline_ventes_mars.xlsx',
      'Slides_revue_campagne.pptx',
      'Contrat_service_signe.pdf',
      'Fleurs_jaunes_vives.jpg',
      'Ford_Mustang_noire.jpg',
    ]),
  },
  'pt-br': {
    featureCards: {
      analysisNewName: 'Por_do_sol_Bali_Praia.png',
      batchNewNames: ['Interface_Kanban.png', 'Notas_plano_contratacao.docx', 'Deck_atualizacao_investidores.pptx'],
      metadataFileName: 'Arte_cyberpunk.png',
      metadataTags: ['glitch art', 'vaporwave', 'estatua', 'cyberpunk', 'arte digital', 'palmeira'],
      historyNewNames: ['Notas_revisao_dashboard.docx', 'Relatorio_receita_Q1.xlsx'],
      promptExample: 'Mantenha nomes curtos, coloque o assunto primeiro e adicione tags do Finder relevantes.',
    },
    showcaseSlides: homeShowcaseSlides([
      'Pug_com_gorro_amarelo.jpg',
      'Notas_planejamento_Q1.docx',
      'Orcamento_lancamento_produto.xlsx',
      'Deck_atualizacao_investidores.pptx',
      'Briefing_criativo_cliente.pdf',
      'Dashboard_tecnico.png',
      'Notas_plano_contratacao.docx',
      'Previsao_receita.xlsx',
      'Slides_kickoff_vendas.pptx',
      'Cachorro_feliz_na_praia.jpg',
      'Proposta_site.pdf',
      'Carne_estilo_asiatico.jpeg',
      'Notas_contrato_fornecedor.docx',
      'Pipeline_vendas_marco.xlsx',
      'Slides_revisao_campanha.pptx',
      'Contrato_servico_assinado.pdf',
      'Flores_amarelas_vibrantes.jpg',
      'Ford_Mustang_preto.jpg',
    ]),
  },
  es: {
    featureCards: {
      analysisNewName: 'Atardecer_Bali_Playa.png',
      batchNewNames: ['Interfaz_Kanban.png', 'Notas_plan_contratacion.docx', 'Deck_actualizacion_inversores.pptx'],
      metadataFileName: 'Arte_cyberpunk.png',
      metadataTags: ['glitch art', 'vaporwave', 'estatua', 'cyberpunk', 'arte digital', 'palmera'],
      historyNewNames: ['Notas_revision_dashboard.docx', 'Informe_ingresos_Q1.xlsx'],
      promptExample: 'Mantén nombres cortos, pon el tema primero y agrega etiquetas Finder relevantes.',
    },
    showcaseSlides: homeShowcaseSlides([
      'Pug_con_gorro_amarillo.jpg',
      'Notas_planificacion_Q1.docx',
      'Presupuesto_lanzamiento_producto.xlsx',
      'Deck_actualizacion_inversores.pptx',
      'Brief_creativo_cliente.pdf',
      'Panel_tecnico.png',
      'Notas_plan_contratacion.docx',
      'Prevision_ingresos.xlsx',
      'Slides_inicio_ventas.pptx',
      'Perro_feliz_en_la_playa.jpg',
      'Propuesta_sitio_web.pdf',
      'Carne_estilo_asiatico.jpeg',
      'Notas_contrato_proveedor.docx',
      'Pipeline_ventas_marzo.xlsx',
      'Slides_revision_campana.pptx',
      'Acuerdo_servicio_firmado.pdf',
      'Flores_amarillas_vibrantes.jpg',
      'Ford_Mustang_negro.jpg',
    ]),
  },
  nl: {
    featureCards: {
      analysisNewName: 'Bali_Zonsondergang_Strand.png',
      batchNewNames: ['Kanban_Board_UI.png', 'Notities_wervingsplan.docx', 'Investeerders_update_deck.pptx'],
      metadataFileName: 'Cyberpunk_kunst.png',
      metadataTags: ['glitch art', 'vaporwave', 'standbeeld', 'cyberpunk', 'digitale kunst', 'palmboom'],
      historyNewNames: ['Dashboard_review_notities.docx', 'Q1_omzetrapport.xlsx'],
      promptExample: 'Houd namen kort, zet het onderwerp eerst en voeg passende Finder-tags toe.',
    },
    showcaseSlides: homeShowcaseSlides([
      'Mopshond_met_gele_muts.jpg',
      'Q1_planningsnotities.docx',
      'Budget_productlancering.xlsx',
      'Investeerders_update_deck.pptx',
      'Creatieve_briefing_klant.pdf',
      'Technisch_dashboard.png',
      'Notities_wervingsplan.docx',
      'Omzetprognose.xlsx',
      'Sales_kickoff_slides.pptx',
      'Blije_hond_op_strand.jpg',
      'Website_voorstel.pdf',
      'Aziatisch_rundvlees.jpeg',
      'Notities_leverancierscontract.docx',
      'Sales_pipeline_maart.xlsx',
      'Campagne_review_slides.pptx',
      'Ondertekende_serviceovereenkomst.pdf',
      'Felgele_bloemen.jpg',
      'Zwarte_Ford_Mustang.jpg',
    ]),
  },
  it: {
    featureCards: {
      analysisNewName: 'Tramonto_Bali_Spiaggia.png',
      batchNewNames: ['Interfaccia_Kanban.png', 'Note_piano_assunzioni.docx', 'Deck_aggiornamento_investitori.pptx'],
      metadataFileName: 'Arte_cyberpunk.png',
      metadataTags: ['glitch art', 'vaporwave', 'statua', 'cyberpunk', 'arte digitale', 'palma'],
      historyNewNames: ['Note_revisione_dashboard.docx', 'Report_ricavi_Q1.xlsx'],
      promptExample: 'Mantieni nomi brevi, metti il soggetto per primo e aggiungi tag Finder pertinenti.',
    },
    showcaseSlides: homeShowcaseSlides([
      'Carlino_con_berretto_giallo.jpg',
      'Note_pianificazione_Q1.docx',
      'Budget_lancio_prodotto.xlsx',
      'Deck_aggiornamento_investitori.pptx',
      'Brief_creativo_cliente.pdf',
      'Dashboard_tecnica.png',
      'Note_piano_assunzioni.docx',
      'Previsione_ricavi.xlsx',
      'Slide_kickoff_vendite.pptx',
      'Cane_felice_sulla_spiaggia.jpg',
      'Proposta_sito_web.pdf',
      'Manzo_stile_asiatico.jpeg',
      'Note_contratto_fornitore.docx',
      'Pipeline_vendite_marzo.xlsx',
      'Slide_revisione_campagna.pptx',
      'Contratto_servizio_firmato.pdf',
      'Fiori_gialli_vivaci.jpg',
      'Ford_Mustang_nera.jpg',
    ]),
  },
  ja: {
    featureCards: {
      analysisNewName: 'バリ島_夕日_ビーチ.png',
      batchNewNames: ['カンバンUI.png', '採用計画メモ.docx', '投資家向けアップデート資料.pptx'],
      metadataFileName: 'サイバーパンクアート.png',
      metadataTags: ['グリッチアート', 'ヴェイパーウェーブ', '彫像', 'サイバーパンク', 'デジタルアート', 'ヤシの木'],
      historyNewNames: ['ダッシュボードレビュー_メモ.docx', 'Q1_売上レポート.xlsx'],
      promptExample: '名前は短く、主題を先頭に置き、関連する Finder タグを追加します。',
    },
    showcaseSlides: homeShowcaseSlides([
      '黄色い帽子のパグ.jpg',
      'Q1_計画メモ.docx',
      '製品ローンチ予算.xlsx',
      '投資家向けアップデート資料.pptx',
      'クライアント_クリエイティブブリーフ.pdf',
      '技術ダッシュボード.png',
      '採用計画メモ.docx',
      '売上予測.xlsx',
      '営業キックオフ資料.pptx',
      'ビーチの楽しそうな犬.jpg',
      'Webサイト提案書.pdf',
      'アジア風ビーフ.jpeg',
      'ベンダー契約メモ.docx',
      '3月_営業パイプライン.xlsx',
      'キャンペーンレビュー資料.pptx',
      '署名済みサービス契約.pdf',
      '鮮やかな黄色い花.jpg',
      '黒いフォード_マスタング.jpg',
    ]),
  },
  ko: {
    featureCards: {
      analysisNewName: '발리_석양_해변.png',
      batchNewNames: ['칸반_UI.png', '채용_계획_노트.docx', '투자자_업데이트_덱.pptx'],
      metadataFileName: '사이버펑크_아트.png',
      metadataTags: ['글리치 아트', '베이퍼웨이브', '조각상', '사이버펑크', '디지털 아트', '야자수'],
      historyNewNames: ['대시보드_리뷰_노트.docx', 'Q1_매출_보고서.xlsx'],
      promptExample: '이름은 짧게 유지하고 주제를 먼저 두며 관련 Finder 태그를 추가합니다.',
    },
    showcaseSlides: homeShowcaseSlides([
      '노란_비니를_쓴_퍼그.jpg',
      'Q1_계획_노트.docx',
      '제품_출시_예산.xlsx',
      '투자자_업데이트_덱.pptx',
      '고객_크리에이티브_브리프.pdf',
      '기술_대시보드.png',
      '채용_계획_노트.docx',
      '매출_전망.xlsx',
      '영업_킥오프_슬라이드.pptx',
      '해변의_행복한_강아지.jpg',
      '웹사이트_제안서.pdf',
      '아시아식_소고기.jpeg',
      '공급업체_계약_노트.docx',
      '3월_영업_파이프라인.xlsx',
      '캠페인_리뷰_슬라이드.pptx',
      '서명된_서비스_계약.pdf',
      '선명한_노란_꽃.jpg',
      '검은_포드_머스탱.jpg',
    ]),
  },
  'zh-cn': {
    featureCards: {
      analysisNewName: '巴厘岛_日落_海滩.png',
      batchNewNames: ['看板界面.png', '招聘计划笔记.docx', '投资人更新演示.pptx'],
      metadataFileName: '赛博朋克_数字艺术.png',
      metadataTags: ['故障艺术', '蒸汽波', '雕像', '赛博朋克', '数字艺术', '棕榈树'],
      historyNewNames: ['仪表盘评审笔记.docx', 'Q1_收入报告.xlsx'],
      promptExample: '文件名保持简短，把主体放在最前，并添加匹配的 Finder 标签。',
    },
    showcaseSlides: homeShowcaseSlides([
      '戴黄帽的小狗.jpg',
      'Q1_规划笔记.docx',
      '产品发布预算.xlsx',
      '投资人更新演示.pptx',
      '客户创意简报.pdf',
      '技术仪表盘.png',
      '招聘计划笔记.docx',
      '收入预测.xlsx',
      '销售启动演示.pptx',
      '海滩上的快乐小狗.jpg',
      '网站提案.pdf',
      '亚洲风味牛肉.jpeg',
      '供应商合同笔记.docx',
      '三月销售管线.xlsx',
      '营销活动评审演示.pptx',
      '已签署服务协议.pdf',
      '明亮黄色花朵.jpg',
      '黑色福特野马.jpg',
    ]),
  },
  hi: {
    featureCards: {
      analysisNewName: 'बाली_सूर्यास्त_समुद्रतट.png',
      batchNewNames: ['कानबन_बोर्ड_UI.png', 'भर्ती_योजना_नोट्स.docx', 'निवेशक_अपडेट_डेक.pptx'],
      metadataFileName: 'साइबरपंक_कला.png',
      metadataTags: ['ग्लिच आर्ट', 'वेपरवेव', 'मूर्ति', 'साइबरपंक', 'डिजिटल कला', 'ताड़ का पेड़'],
      historyNewNames: ['डैशबोर्ड_समीक्षा_नोट्स.docx', 'Q1_राजस्व_रिपोर्ट.xlsx'],
      promptExample: 'नाम छोटे रखें, विषय को पहले रखें और मेल खाते Finder टैग जोड़ें।',
    },
    showcaseSlides: homeShowcaseSlides([
      'पीली_टोपी_वाला_पग.jpg',
      'Q1_योजना_नोट्स.docx',
      'उत्पाद_लॉन्च_बजट.xlsx',
      'निवेशक_अपडेट_डेक.pptx',
      'क्लाइंट_क्रिएटिव_ब्रिफ.pdf',
      'तकनीकी_डैशबोर्ड.png',
      'भर्ती_योजना_नोट्स.docx',
      'राजस्व_पूर्वानुमान.xlsx',
      'सेल्स_किकऑफ_स्लाइड्स.pptx',
      'समुद्रतट_पर_खुश_कुत्ता.jpg',
      'वेबसाइट_प्रस्ताव.pdf',
      'एशियाई_शैली_बीफ.jpeg',
      'विक्रेता_अनुबंध_नोट्स.docx',
      'मार्च_सेल्स_पाइपलाइन.xlsx',
      'कैंपेन_समीक्षा_स्लाइड्स.pptx',
      'हस्ताक्षरित_सेवा_समझौता.pdf',
      'चमकीले_पीले_फूल.jpg',
      'काली_फोर्ड_मस्टैंग.jpg',
    ]),
  },
  ar: {
    featureCards: {
      analysisNewName: 'شاطئ_غروب_بالي.png',
      batchNewNames: ['واجهة_لوحة_كانبان.png', 'ملاحظات_خطة_التوظيف.docx', 'عرض_تحديث_المستثمرين.pptx'],
      metadataFileName: 'فن_سيبراني.png',
      metadataTags: ['فن glitch', 'vaporwave', 'تمثال', 'سيبراني', 'فن رقمي', 'نخلة'],
      historyNewNames: ['ملاحظات_مراجعة_لوحة_البيانات.docx', 'تقرير_إيرادات_Q1.xlsx'],
      promptExample: 'اجعل الأسماء قصيرة، ضع الموضوع أولا، وأضف وسوم Finder المناسبة.',
    },
    showcaseSlides: homeShowcaseSlides([
      'كلب_بقبعة_صفراء.jpg',
      'ملاحظات_تخطيط_Q1.docx',
      'ميزانية_إطلاق_المنتج.xlsx',
      'عرض_تحديث_المستثمرين.pptx',
      'موجز_إبداعي_للعميل.pdf',
      'لوحة_بيانات_تقنية.png',
      'ملاحظات_خطة_التوظيف.docx',
      'توقعات_الإيرادات.xlsx',
      'شرائح_انطلاق_المبيعات.pptx',
      'كلب_سعيد_على_الشاطئ.jpg',
      'مقترح_الموقع.pdf',
      'لحم_بقري_آسيوي.jpeg',
      'ملاحظات_عقد_المورد.docx',
      'مسار_المبيعات_مارس.xlsx',
      'شرائح_مراجعة_الحملة.pptx',
      'اتفاقية_خدمة_موقعة.pdf',
      'زهور_صفراء_زاهية.jpg',
      'فورد_موستانج_سوداء.jpg',
    ]),
  },
};

const localizedFullHomeFaqItems: Record<Exclude<Locale, 'en' | 'zh-cn'>, FAQCopyItem[]> = {
  de: [
    { question: 'Was ist Zush?', answer: 'Zush ist eine intelligente Desktop-App für Mac und Windows, die Dateien mit KI automatisch umbenennt. Sie analysiert Bilder und unterstützte Dokumente, inklusive PDFs, und erzeugt aussagekräftige Dateinamen und Metadaten.' },
    { question: 'Welche Dateiformate werden unterstützt?', answer: 'Zush unterstützt Bilder, Screenshots, PDFs, Dokumente, Tabellen, Präsentationen, Textdateien, CSV, SVG und weitere Alltagsformate.' },
    { question: 'Wie funktioniert Zush AI Rename?', answer: 'Ziehe mehrere Dateien in Zush. Die App analysiert den Inhalt, schlägt neue Namen vor und lässt dich einzelne Ergebnisse vor dem Anwenden prüfen oder neu generieren.' },
    { question: 'Wie funktioniert die Ordnerüberwachung?', answer: 'Zush überwacht ausgewählte Ordner im Hintergrund. Neue unterstützte Dateien werden online automatisch analysiert und in Echtzeit umbenannt.' },
    { question: 'Kann ich einen KI-Dateinamen neu generieren?', answer: 'Ja. Wähle die Datei im AI-Rename-Bereich aus und klicke auf Neu generieren, um einen neuen Vorschlag zu erhalten.' },
    { question: 'Kann ich den KI-Prompt für Namen und Tags anpassen?', answer: 'Ja. Du kannst eigene Regeln für Dateinamen und Metadaten-Tags schreiben, zum Beispiel kurze Namen, Motiv zuerst oder nur bestimmte Tags.' },
    { question: 'Sind meine Daten sicher?', answer: 'Deine Originaldateien bleiben auf deinem Computer. Im Cloud-Modus wird nur der nötige Analyseinhalt an den gewählten KI-Anbieter gesendet. Im Offline-KI-Modus verarbeitet Ollama unterstützte Dateien lokal.' },
    { question: 'Kann ich Änderungen rückgängig machen?', answer: 'Ja. Im Aktivitätsbereich kannst du Umbenennungen auf den ursprünglichen Dateinamen zurücksetzen.' },
    { question: 'Unterstützt Zush mehrere Sprachen und Datumsformate?', answer: 'Ja. Zush kann KI-Dateinamen in über 60 Sprachen erzeugen und dein bevorzugtes Datumsformat verwenden.' },
    { question: 'Wie funktioniert der Preis?', answer: 'Zush PRO ist ein Einmalkauf für 10 US-Dollar mit 10.000 Credits und Zugriff auf BYOK und Offline-KI. Danach kannst du BYOK oder Offline-KI weiter nutzen.' },
    { question: 'Was ist BYOK (Bring Your Own Key)?', answer: 'BYOK erlaubt PRO-Nutzern, eigene API-Schlüssel von Gemini, Groq, OpenAI oder Claude für unbegrenzte Cloud-Umbenennungen zu verbinden. Der Schlüssel wird lokal sicher gespeichert.' },
    { question: 'Warum Einmalkauf statt Abo?', answer: 'Wir setzen auf transparente Preise: einmal zahlen, dauerhaft nutzen, ohne monatliche Gebühren oder Abo-Stress.' },
    { question: 'Welche Betriebssysteme werden unterstützt?', answer: 'Zush läuft auf macOS 14 Sonoma und neuer sowie Windows 10 / 11. Mac gibt es als signierte dmg und im Mac App Store, Windows im Microsoft Store.' },
    { question: 'Welches KI-Modell nutzt die App?', answer: 'Zush verwendet moderne multimodale KI-Modelle für schnelle und genaue Analyse von Bildern und unterstützten Dokumenten. Das konkrete Modell kann sich durch Optimierungen ändern.' },
    { question: 'Funktioniert die App offline?', answer: 'Cloud-Verarbeitung benötigt Internet. PRO-Nutzer können nach Installation von Ollama und einem kompatiblen Modell Offline-KI aktivieren.' },
    { question: 'Unterstützt ihr Audio- oder Videodateien?', answer: 'Noch nicht. Zush konzentriert sich derzeit auf Bilder und unterstützte Dokumente, inklusive PDFs. Audio und Video sind auf der Roadmap.' },
    { question: 'Bekomme ich eine Rückerstattung, wenn es nicht passt?', answer: 'Ja. Zush bietet eine 14-Tage-Geld-zurück-Garantie. Details stehen in der Rückerstattungsrichtlinie.' },
  ],
  fr: [
    { question: 'Qu’est-ce que Zush ?', answer: 'Zush est une application desktop intelligente pour Mac et Windows qui renomme automatiquement les fichiers avec l’IA. Elle analyse les images et documents pris en charge, y compris les PDF, pour créer des noms et métadonnées utiles.' },
    { question: 'Quels formats sont pris en charge ?', answer: 'Zush prend en charge images, captures, PDF, documents, feuilles de calcul, présentations, texte, CSV, SVG et d’autres formats courants.' },
    { question: 'Comment fonctionne Zush AI Rename ?', answer: 'Déposez plusieurs fichiers dans Zush. L’app analyse leur contenu, propose des noms et vous permet de vérifier ou régénérer chaque résultat avant application.' },
    { question: 'Comment fonctionne la surveillance des dossiers ?', answer: 'Zush surveille les dossiers choisis en arrière-plan. Les nouveaux fichiers pris en charge sont analysés et renommés automatiquement lorsque vous êtes en ligne.' },
    { question: 'Puis-je régénérer un nom généré par l’IA ?', answer: 'Oui. Sélectionnez le fichier dans AI Rename et cliquez sur régénérer pour obtenir une nouvelle proposition.' },
    { question: 'Puis-je personnaliser le prompt de renommage et de tags ?', answer: 'Oui. Vous pouvez écrire vos propres règles pour guider les noms et tags, par exemple noms courts, sujet principal d’abord ou tags imposés.' },
    { question: 'Mes données sont-elles sécurisées ?', answer: 'Vos fichiers originaux restent sur votre ordinateur. En mode cloud, seul le contenu nécessaire à l’analyse est envoyé au fournisseur IA choisi. En mode hors ligne, Ollama traite les fichiers localement.' },
    { question: 'Puis-je annuler les changements ?', answer: 'Oui. L’historique d’activité permet de restaurer les noms d’origine.' },
    { question: 'Zush prend-il en charge plusieurs langues et formats de date ?', answer: 'Oui. Zush peut générer des noms dans plus de 60 langues et utiliser votre format de date préféré.' },
    { question: 'Comment fonctionne le prix ?', answer: 'Zush PRO est un achat unique de 10 $ avec 10 000 crédits et l’accès à BYOK et au mode IA hors ligne. Ensuite, vous pouvez utiliser BYOK ou l’IA hors ligne.' },
    { question: 'Qu’est-ce que BYOK (Bring Your Own Key) ?', answer: 'BYOK permet aux utilisateurs PRO de connecter leur clé Gemini, Groq, OpenAI ou Claude pour des renommages cloud illimités. La clé est stockée localement de façon sécurisée.' },
    { question: 'Pourquoi un achat unique plutôt qu’un abonnement ?', answer: 'Nous privilégions un prix clair: payez une fois, utilisez durablement, sans mensualités ni fatigue d’abonnement.' },
    { question: 'Quels systèmes d’exploitation sont pris en charge ?', answer: 'Zush fonctionne sur macOS 14 Sonoma et versions récentes, ainsi que Windows 10 / 11. Mac est disponible en dmg signé et sur le Mac App Store, Windows via Microsoft Store.' },
    { question: 'Quel modèle IA utilise l’app ?', answer: 'Zush utilise des modèles IA multimodaux modernes pour analyser rapidement et précisément les images et documents pris en charge. Le modèle exact peut évoluer.' },
    { question: 'L’app fonctionne-t-elle hors ligne ?', answer: 'Le cloud nécessite internet. Les utilisateurs PRO peuvent activer l’IA hors ligne après installation d’Ollama et d’un modèle compatible.' },
    { question: 'Prenez-vous en charge l’audio ou la vidéo ?', answer: 'Pas encore. Zush se concentre actuellement sur les images et documents pris en charge, y compris les PDF. Audio et vidéo sont sur la roadmap.' },
    { question: 'Puis-je être remboursé si cela ne me convient pas ?', answer: 'Oui. Zush propose une garantie de remboursement de 14 jours. Les détails sont dans la politique de remboursement.' },
  ],
  'pt-br': [
    { question: 'O que é o Zush?', answer: 'Zush é um app desktop inteligente para Mac e Windows que renomeia arquivos automaticamente com IA. Ele analisa imagens e documentos compatíveis, incluindo PDFs, para criar nomes e metadados úteis.' },
    { question: 'Quais formatos são compatíveis?', answer: 'Zush suporta imagens, screenshots, PDFs, documentos, planilhas, apresentações, texto, CSV, SVG e outros formatos comuns.' },
    { question: 'Como funciona o Zush AI Rename?', answer: 'Arraste vários arquivos para o Zush. O app analisa o conteúdo, sugere nomes e permite revisar ou regenerar cada resultado antes de aplicar.' },
    { question: 'Como funciona o monitoramento de pastas?', answer: 'Zush monitora pastas escolhidas em segundo plano. Novos arquivos compatíveis são analisados e renomeados automaticamente quando você está online.' },
    { question: 'Posso regenerar um nome gerado pela IA?', answer: 'Sim. Selecione o arquivo na área AI Rename e clique em regenerar para receber uma nova sugestão.' },
    { question: 'Posso personalizar o prompt de nomes e tags?', answer: 'Sim. Você pode escrever regras próprias para nomes e tags, como nomes curtos, assunto primeiro ou apenas tags específicas.' },
    { question: 'Meus dados estão seguros?', answer: 'Os arquivos originais ficam no seu computador. No modo cloud, só o conteúdo necessário para análise é enviado ao provedor de IA escolhido. No modo offline, o Ollama processa localmente.' },
    { question: 'Posso desfazer alterações?', answer: 'Sim. No histórico de atividade você pode restaurar os nomes originais.' },
    { question: 'O Zush suporta vários idiomas e formatos de data?', answer: 'Sim. O Zush pode gerar nomes em mais de 60 idiomas e usar seu formato de data preferido.' },
    { question: 'Como funciona o preço?', answer: 'Zush PRO é uma compra única de US$ 10 com 10.000 créditos e acesso a BYOK e IA offline. Depois disso, você pode usar BYOK ou IA offline.' },
    { question: 'O que é BYOK (Bring Your Own Key)?', answer: 'BYOK permite conectar sua própria chave Gemini, Groq, OpenAI ou Claude para renomeações cloud ilimitadas. A chave fica armazenada localmente com segurança.' },
    { question: 'Por que compra única em vez de assinatura?', answer: 'Preferimos preço claro: pague uma vez, use por muito tempo, sem mensalidades nem estresse de assinatura.' },
    { question: 'Quais sistemas operacionais são suportados?', answer: 'Zush funciona no macOS 14 Sonoma ou mais recente e no Windows 10 / 11. Mac tem dmg assinado e Mac App Store; Windows vem pela Microsoft Store.' },
    { question: 'Qual modelo de IA o app usa?', answer: 'Zush usa modelos multimodais modernos para analisar imagens e documentos com rapidez e precisão. O modelo exato pode mudar com otimizações.' },
    { question: 'O app funciona offline?', answer: 'O modo cloud requer internet. Usuários PRO podem ativar IA offline depois de instalar Ollama e um modelo compatível.' },
    { question: 'Vocês suportam áudio ou vídeo?', answer: 'Ainda não. Hoje o Zush foca em imagens e documentos compatíveis, incluindo PDFs. Áudio e vídeo estão no roadmap.' },
    { question: 'Posso pedir reembolso se não servir para mim?', answer: 'Sim. O Zush oferece garantia de reembolso de 14 dias. Os detalhes estão na política de reembolso.' },
  ],
  es: [
    { question: '¿Qué es Zush?', answer: 'Zush es una app de escritorio inteligente para Mac y Windows que renombra archivos automáticamente con IA. Analiza imágenes y documentos compatibles, incluidos PDFs, para crear nombres y metadatos útiles.' },
    { question: '¿Qué formatos son compatibles?', answer: 'Zush admite imágenes, capturas, PDFs, documentos, hojas de cálculo, presentaciones, texto, CSV, SVG y otros formatos habituales.' },
    { question: '¿Cómo funciona Zush AI Rename?', answer: 'Arrastra varios archivos a Zush. La app analiza el contenido, propone nombres y permite revisar o regenerar cada resultado antes de aplicarlo.' },
    { question: '¿Cómo funciona el monitoreo de carpetas?', answer: 'Zush vigila las carpetas seleccionadas en segundo plano. Los nuevos archivos compatibles se analizan y renombran automáticamente cuando estás online.' },
    { question: '¿Puedo regenerar un nombre generado por IA?', answer: 'Sí. Selecciona el archivo en AI Rename y pulsa regenerar para obtener una nueva sugerencia.' },
    { question: '¿Puedo personalizar el prompt de nombres y etiquetas?', answer: 'Sí. Puedes escribir reglas propias para nombres y etiquetas, por ejemplo nombres cortos, tema principal primero o solo ciertas etiquetas.' },
    { question: '¿Mis datos están seguros?', answer: 'Tus archivos originales permanecen en tu ordenador. En modo cloud, solo se envía al proveedor elegido el contenido necesario para el análisis. En modo offline, Ollama procesa localmente.' },
    { question: '¿Puedo deshacer cambios?', answer: 'Sí. En el historial de actividad puedes restaurar los nombres originales.' },
    { question: '¿Zush admite varios idiomas y formatos de fecha?', answer: 'Sí. Zush puede generar nombres en más de 60 idiomas y usar tu formato de fecha preferido.' },
    { question: '¿Cómo funciona el precio?', answer: 'Zush PRO es una compra única de 10 US$ con 10.000 créditos y acceso a BYOK e IA offline. Después puedes seguir usando BYOK o IA offline.' },
    { question: '¿Qué es BYOK (Bring Your Own Key)?', answer: 'BYOK permite conectar tu propia clave de Gemini, Groq, OpenAI o Claude para renombrados cloud ilimitados. La clave se guarda localmente de forma segura.' },
    { question: '¿Por qué compra única y no suscripción?', answer: 'Preferimos un precio claro: pagas una vez y usas la app sin cuotas mensuales ni cansancio de suscripciones.' },
    { question: '¿Qué sistemas operativos son compatibles?', answer: 'Zush funciona en macOS 14 Sonoma o posterior y Windows 10 / 11. Mac tiene dmg firmado y Mac App Store; Windows está en Microsoft Store.' },
    { question: '¿Qué modelo de IA usa la app?', answer: 'Zush usa modelos multimodales modernos para analizar imágenes y documentos con rapidez y precisión. El modelo concreto puede cambiar con optimizaciones.' },
    { question: '¿La app funciona sin conexión?', answer: 'El modo cloud requiere internet. Los usuarios PRO pueden activar IA offline tras instalar Ollama y un modelo compatible.' },
    { question: '¿Soportan audio o video?', answer: 'Todavía no. Zush se centra en imágenes y documentos compatibles, incluidos PDFs. Audio y video están en la roadmap.' },
    { question: '¿Puedo pedir un reembolso si no me sirve?', answer: 'Sí. Zush ofrece garantía de reembolso de 14 días. Los detalles están en la política de reembolso.' },
  ],
  nl: [
    { question: 'Wat is Zush?', answer: 'Zush is een slimme desktopapp voor Mac en Windows die bestanden automatisch met AI hernoemt. De app analyseert afbeeldingen en ondersteunde documenten, inclusief PDFs, en maakt bruikbare namen en metadata.' },
    { question: 'Welke bestandsformaten worden ondersteund?', answer: 'Zush ondersteunt afbeeldingen, screenshots, PDFs, documenten, spreadsheets, presentaties, tekst, CSV, SVG en andere gangbare formaten.' },
    { question: 'Hoe werkt Zush AI Rename?', answer: 'Sleep meerdere bestanden naar Zush. De app analyseert de inhoud, stelt namen voor en laat je elk resultaat controleren of opnieuw genereren voordat je toepast.' },
    { question: 'Hoe werkt mapbewaking?', answer: 'Zush bewaakt gekozen mappen op de achtergrond. Nieuwe ondersteunde bestanden worden online automatisch geanalyseerd en hernoemd.' },
    { question: 'Kan ik een AI-bestandsnaam opnieuw genereren?', answer: 'Ja. Selecteer het bestand in AI Rename en klik op opnieuw genereren voor een nieuwe suggestie.' },
    { question: 'Kan ik de AI-prompt voor namen en tags aanpassen?', answer: 'Ja. Je kunt eigen regels schrijven voor namen en metadata-tags, zoals korte namen, onderwerp eerst of alleen bepaalde tags.' },
    { question: 'Zijn mijn gegevens veilig?', answer: 'Je originele bestanden blijven op je computer. In cloudmodus wordt alleen de benodigde analyse-inhoud naar de gekozen AI-provider gestuurd. Offline verwerkt Ollama lokaal.' },
    { question: 'Kan ik wijzigingen ongedaan maken?', answer: 'Ja. Via de activiteitengeschiedenis kun je originele bestandsnamen herstellen.' },
    { question: 'Ondersteunt Zush meerdere talen en datumformaten?', answer: 'Ja. Zush kan namen in meer dan 60 talen genereren en je favoriete datumformaat gebruiken.' },
    { question: 'Hoe werkt de prijs?', answer: 'Zush PRO is een eenmalige aankoop van $10 met 10.000 credits en toegang tot BYOK en offline AI. Daarna kun je BYOK of offline AI blijven gebruiken.' },
    { question: 'Wat is BYOK (Bring Your Own Key)?', answer: 'BYOK laat PRO-gebruikers hun eigen Gemini-, Groq-, OpenAI- of Claude-sleutel koppelen voor onbeperkt cloudhernoemen. De sleutel wordt lokaal veilig opgeslagen.' },
    { question: 'Waarom eenmalig kopen in plaats van een abonnement?', answer: 'We kiezen voor duidelijke prijzen: één keer betalen en blijven gebruiken, zonder maandkosten of abonnementsstress.' },
    { question: 'Welke besturingssystemen worden ondersteund?', answer: 'Zush werkt op macOS 14 Sonoma en nieuwer en Windows 10 / 11. Mac is er als ondertekende dmg en via de Mac App Store; Windows via Microsoft Store.' },
    { question: 'Welk AI-model gebruikt de app?', answer: 'Zush gebruikt moderne multimodale AI-modellen voor snelle en nauwkeurige analyse van afbeeldingen en documenten. Het exacte model kan veranderen door optimalisaties.' },
    { question: 'Werkt de app offline?', answer: 'Cloudverwerking vereist internet. PRO-gebruikers kunnen offline AI activeren na installatie van Ollama en een compatibel model.' },
    { question: 'Ondersteunen jullie audio of video?', answer: 'Nog niet. Zush richt zich nu op afbeeldingen en ondersteunde documenten, inclusief PDFs. Audio en video staan op de roadmap.' },
    { question: 'Kan ik geld terugkrijgen als het niet past?', answer: 'Ja. Zush biedt een geld-terug-garantie van 14 dagen. Details staan in het terugbetalingsbeleid.' },
  ],
  it: [
    { question: 'Che cos’è Zush?', answer: 'Zush è un’app desktop intelligente per Mac e Windows che rinomina automaticamente i file con l’IA. Analizza immagini e documenti supportati, inclusi PDF, per creare nomi e metadati utili.' },
    { question: 'Quali formati sono supportati?', answer: 'Zush supporta immagini, screenshot, PDF, documenti, fogli di calcolo, presentazioni, testo, CSV, SVG e altri formati comuni.' },
    { question: 'Come funziona Zush AI Rename?', answer: 'Trascina più file in Zush. L’app analizza il contenuto, propone nomi e ti permette di controllare o rigenerare ogni risultato prima di applicarlo.' },
    { question: 'Come funziona il monitoraggio cartelle?', answer: 'Zush monitora le cartelle scelte in background. I nuovi file supportati vengono analizzati e rinominati automaticamente quando sei online.' },
    { question: 'Posso rigenerare un nome generato dall’IA?', answer: 'Sì. Seleziona il file in AI Rename e clicca su rigenera per ottenere una nuova proposta.' },
    { question: 'Posso personalizzare il prompt per nomi e tag?', answer: 'Sì. Puoi scrivere regole personalizzate per nomi e tag, ad esempio nomi brevi, soggetto prima o solo certi tag.' },
    { question: 'I miei dati sono al sicuro?', answer: 'I file originali restano sul computer. In modalità cloud viene inviato solo il contenuto necessario all’analisi. In modalità offline, Ollama elabora localmente.' },
    { question: 'Posso annullare le modifiche?', answer: 'Sì. Dalla cronologia attività puoi ripristinare i nomi originali.' },
    { question: 'Zush supporta più lingue e formati data?', answer: 'Sì. Zush può generare nomi in oltre 60 lingue e usare il tuo formato data preferito.' },
    { question: 'Come funziona il prezzo?', answer: 'Zush PRO è un acquisto unico da 10 $ con 10.000 crediti e accesso a BYOK e IA offline. Dopo puoi continuare con BYOK o IA offline.' },
    { question: 'Cos’è BYOK (Bring Your Own Key)?', answer: 'BYOK consente agli utenti PRO di collegare una chiave Gemini, Groq, OpenAI o Claude per rinomine cloud illimitate. La chiave è salvata localmente in modo sicuro.' },
    { question: 'Perché acquisto unico invece di abbonamento?', answer: 'Preferiamo prezzi trasparenti: paghi una volta e continui a usare l’app, senza costi mensili o stress da abbonamento.' },
    { question: 'Quali sistemi operativi sono supportati?', answer: 'Zush funziona su macOS 14 Sonoma e versioni successive e su Windows 10 / 11. Mac è disponibile come dmg firmato e su Mac App Store, Windows su Microsoft Store.' },
    { question: 'Quale modello IA usa l’app?', answer: 'Zush usa modelli multimodali moderni per analizzare immagini e documenti in modo rapido e accurato. Il modello specifico può cambiare con le ottimizzazioni.' },
    { question: 'L’app funziona offline?', answer: 'La modalità cloud richiede internet. Gli utenti PRO possono attivare IA offline dopo aver installato Ollama e un modello compatibile.' },
    { question: 'Supportate file audio o video?', answer: 'Non ancora. Zush si concentra su immagini e documenti supportati, inclusi PDF. Audio e video sono nella roadmap.' },
    { question: 'Posso ricevere un rimborso se non fa per me?', answer: 'Sì. Zush offre una garanzia di rimborso di 14 giorni. I dettagli sono nella policy di rimborso.' },
  ],
  ja: [
    { question: 'Zush とは？', answer: 'Zush は Mac と Windows 向けのスマートなデスクトップアプリで、AI によりファイル名を自動変更します。画像や PDF を含む対応文書を分析し、分かりやすい名前とメタデータを生成します。' },
    { question: '対応しているファイル形式は？', answer: '画像、スクリーンショット、PDF、文書、表計算、プレゼン、テキスト、CSV、SVG などの一般的な形式に対応しています。' },
    { question: 'Zush AI Rename はどう動きますか？', answer: '複数ファイルを Zush にドロップすると、内容を分析して名前を提案します。適用前に個別に確認したり再生成したりできます。' },
    { question: 'フォルダ監視はどう動きますか？', answer: '選択したフォルダをバックグラウンドで監視します。新しい対応ファイルが追加されると、オンライン時に自動分析して名前を変更します。' },
    { question: 'AI が生成した名前を再生成できますか？', answer: 'はい。AI Rename でファイルを選び、再生成をクリックすると新しい候補を取得できます。' },
    { question: '名前やタグ用の AI プロンプトをカスタマイズできますか？', answer: 'はい。短い名前、主題を先頭にする、特定タグだけ使うなど、独自ルールを書けます。' },
    { question: 'データは安全ですか？', answer: '元ファイルはコンピュータ上に残ります。クラウドモードでは分析に必要な内容だけを選択した AI プロバイダーへ送信します。オフラインでは Ollama がローカル処理します。' },
    { question: '変更を元に戻せますか？', answer: 'はい。アクティビティ履歴から元のファイル名を復元できます。' },
    { question: '複数言語と日付形式に対応していますか？', answer: 'はい。Zush は 60 以上の言語で名前を生成でき、好みの日付形式も使えます。' },
    { question: '料金はどうなっていますか？', answer: 'Zush PRO は 10 ドルの買い切りで、10,000 クレジットと BYOK、オフライン AI を利用できます。その後は BYOK またはオフライン AI を使えます。' },
    { question: 'BYOK（Bring Your Own Key）とは？', answer: 'PRO ユーザーが Gemini、Groq、OpenAI、Claude の自分の API キーを接続し、クラウドリネームを無制限に使える機能です。キーはローカルに安全に保存されます。' },
    { question: 'なぜサブスクではなく買い切りですか？', answer: '分かりやすい価格にしたいからです。一度支払えば継続して使え、月額料金や解約の心配はありません。' },
    { question: '対応 OS は？', answer: 'macOS 14 Sonoma 以降と Windows 10 / 11 に対応しています。Mac は署名済み dmg と Mac App Store、Windows は Microsoft Store で提供されます。' },
    { question: 'アプリはどの AI モデルを使いますか？', answer: '画像と対応文書を高速かつ正確に分析するため、最新のマルチモーダル AI モデルを使います。具体的なモデルは最適化により変わる場合があります。' },
    { question: 'オフラインで使えますか？', answer: 'クラウド処理にはインターネットが必要です。PRO ユーザーは Ollama と対応モデルを入れるとオフライン AI を有効化できます。' },
    { question: '音声や動画ファイルに対応していますか？', answer: 'まだ対応していません。現在は画像と PDF を含む対応文書に集中しています。音声と動画はロードマップにあります。' },
    { question: '合わなかった場合は返金できますか？', answer: 'はい。Zush は 14 日間の返金保証を提供しています。詳細は返金ポリシーをご確認ください。' },
  ],
  ko: [
    { question: 'Zush란 무엇인가요?', answer: 'Zush는 Mac과 Windows용 지능형 데스크톱 앱으로, AI를 사용해 파일 이름을 자동 변경합니다. 이미지와 PDF를 포함한 지원 문서를 분석해 의미 있는 이름과 메타데이터를 만듭니다.' },
    { question: '어떤 파일 형식을 지원하나요?', answer: '이미지, 스크린샷, PDF, 문서, 스프레드시트, 프레젠테이션, 텍스트, CSV, SVG 등 일반적인 형식을 지원합니다.' },
    { question: 'Zush AI Rename은 어떻게 작동하나요?', answer: '여러 파일을 Zush에 끌어다 놓으면 내용을 분석해 이름을 제안합니다. 적용 전 개별 결과를 확인하거나 다시 생성할 수 있습니다.' },
    { question: '폴더 모니터링은 어떻게 작동하나요?', answer: '선택한 폴더를 백그라운드에서 감시합니다. 새 지원 파일이 추가되면 온라인 상태에서 자동 분석하고 이름을 변경합니다.' },
    { question: 'AI가 생성한 파일명을 다시 만들 수 있나요?', answer: '예. AI Rename에서 파일을 선택하고 다시 생성을 클릭하면 새 제안을 받을 수 있습니다.' },
    { question: '이름 및 태그용 AI 프롬프트를 사용자 지정할 수 있나요?', answer: '예. 짧은 이름, 주제 먼저, 특정 태그만 사용 같은 사용자 규칙을 작성할 수 있습니다.' },
    { question: '데이터는 안전한가요?', answer: '원본 파일은 컴퓨터에 남아 있습니다. 클라우드 모드에서는 분석에 필요한 내용만 선택한 AI 제공자에게 전송됩니다. 오프라인 모드에서는 Ollama가 로컬에서 처리합니다.' },
    { question: '변경을 되돌릴 수 있나요?', answer: '예. 활동 기록에서 원래 파일 이름을 복원할 수 있습니다.' },
    { question: 'Zush는 여러 언어와 날짜 형식을 지원하나요?', answer: '예. Zush는 60개 이상 언어로 이름을 생성하고 원하는 날짜 형식을 사용할 수 있습니다.' },
    { question: '가격은 어떻게 되나요?', answer: 'Zush PRO는 10달러 일회성 구매이며 10,000 크레딧, BYOK, 오프라인 AI를 제공합니다. 이후 BYOK 또는 오프라인 AI를 사용할 수 있습니다.' },
    { question: 'BYOK(Bring Your Own Key)이란 무엇인가요?', answer: 'PRO 사용자가 Gemini, Groq, OpenAI, Claude API 키를 연결해 무제한 클라우드 이름 변경을 사용하는 기능입니다. 키는 로컬에 안전하게 저장됩니다.' },
    { question: '왜 구독이 아니라 일회성 구매인가요?', answer: '명확한 가격을 원하기 때문입니다. 한 번 결제하면 계속 사용할 수 있고 월 요금이나 구독 피로가 없습니다.' },
    { question: '지원 운영체제는 무엇인가요?', answer: 'macOS 14 Sonoma 이상과 Windows 10 / 11을 지원합니다. Mac은 서명된 dmg와 Mac App Store, Windows는 Microsoft Store에서 제공됩니다.' },
    { question: '앱은 어떤 AI 모델을 사용하나요?', answer: '이미지와 지원 문서를 빠르고 정확하게 분석하기 위해 최신 멀티모달 AI 모델을 사용합니다. 구체적인 모델은 최적화에 따라 바뀔 수 있습니다.' },
    { question: '오프라인으로 사용할 수 있나요?', answer: '클라우드 처리는 인터넷이 필요합니다. PRO 사용자는 Ollama와 호환 모델을 설치한 뒤 오프라인 AI를 활성화할 수 있습니다.' },
    { question: '오디오나 비디오 파일도 지원하나요?', answer: '아직은 아닙니다. 현재 Zush는 이미지와 PDF를 포함한 지원 문서에 집중합니다. 오디오와 비디오는 로드맵에 있습니다.' },
    { question: '필요에 맞지 않으면 환불받을 수 있나요?', answer: '예. Zush는 14일 환불 보장을 제공합니다. 자세한 내용은 환불 정책에서 확인할 수 있습니다.' },
  ],
  hi: [
    { question: 'Zush क्या है?', answer: 'Zush Mac और Windows के लिए एक स्मार्ट डेस्कटॉप ऐप है, जो AI की मदद से फ़ाइलों के नाम अपने-आप बदलता है। यह इमेज और PDF सहित समर्थित दस्तावेज़ों का विश्लेषण करके उपयोगी नाम और मेटाडेटा बनाता है।' },
    { question: 'कौन से फ़ाइल फ़ॉर्मैट समर्थित हैं?', answer: 'Zush इमेज, स्क्रीनशॉट, PDF, दस्तावेज़, स्प्रेडशीट, प्रेज़ेंटेशन, टेक्स्ट फ़ाइल, CSV, SVG और कई रोज़मर्रा के फ़ॉर्मैट को सपोर्ट करता है।' },
    { question: 'Zush AI Rename कैसे काम करता है?', answer: 'कई फ़ाइलों को Zush में छोड़ें। ऐप उनके कॉन्टेंट का विश्लेषण करता है, नए नाम सुझाता है और लागू करने से पहले हर नतीजे को देखने या फिर से बनाने देता है।' },
    { question: 'फ़ोल्डर निगरानी कैसे काम करती है?', answer: 'Zush आपके चुने हुए फ़ोल्डरों को बैकग्राउंड में देखता रहता है। ऑनलाइन होने पर नई समर्थित फ़ाइलों का अपने-आप विश्लेषण होता है और उनके नाम तुरंत बदल जाते हैं।' },
    { question: 'क्या मैं AI से बना फ़ाइल नाम दोबारा बना सकता हूँ?', answer: 'हाँ। AI Rename सेक्शन में फ़ाइल चुनें और नया सुझाव पाने के लिए दोबारा बनाएँ पर क्लिक करें।' },
    { question: 'क्या मैं नाम और टैग के लिए AI प्रॉम्प्ट बदल सकता हूँ?', answer: 'हाँ। आप फ़ाइल नामों और मेटाडेटा टैग के लिए अपने नियम लिख सकते हैं, जैसे छोटे नाम, मुख्य विषय पहले, या सिर्फ़ खास टैग।' },
    { question: 'क्या मेरा डेटा सुरक्षित है?', answer: 'आपकी मूल फ़ाइलें आपके कंप्यूटर पर रहती हैं। क्लाउड मोड में विश्लेषण के लिए ज़रूरी कॉन्टेंट ही चुने हुए AI प्रदाता को भेजा जाता है। Offline AI मोड में Ollama समर्थित फ़ाइलों को स्थानीय रूप से प्रोसेस करता है।' },
    { question: 'क्या मैं बदलाव वापस कर सकता हूँ?', answer: 'हाँ। Activity history से आप फ़ाइलों को एक क्लिक में उनके मूल नामों पर वापस ला सकते हैं।' },
    { question: 'क्या Zush कई भाषाएँ और तारीख़ फ़ॉर्मैट सपोर्ट करता है?', answer: 'हाँ। Zush 60 से ज़्यादा भाषाओं में फ़ाइल नाम बना सकता है और आपकी पसंद का तारीख़ फ़ॉर्मैट इस्तेमाल कर सकता है।' },
    { question: 'कीमत कैसे काम करती है?', answer: 'Zush PRO $10 की एक बार की खरीद है, जिसमें 10,000 क्रेडिट और BYOK व Offline AI का एक्सेस मिलता है। उसके बाद आप BYOK या Offline AI इस्तेमाल करते रह सकते हैं।' },
    { question: 'BYOK (Bring Your Own Key) क्या है?', answer: 'BYOK से PRO यूज़र Gemini, Groq, OpenAI या Claude की अपनी API कुंजी जोड़कर असीमित क्लाउड नाम-बदलाव कर सकते हैं। कुंजी स्थानीय सुरक्षित स्टोरेज में सेव रहती है।' },
    { question: 'सब्सक्रिप्शन के बजाय एक बार की खरीद क्यों?', answer: 'हम साफ़ कीमत रखना चाहते हैं: एक बार भुगतान करें, लंबे समय तक इस्तेमाल करें, बिना मासिक शुल्क या सब्सक्रिप्शन थकान के।' },
    { question: 'कौन से ऑपरेटिंग सिस्टम समर्थित हैं?', answer: 'Zush macOS 14 Sonoma और नए संस्करणों, साथ ही Windows 10 / 11 पर चलता है। Mac के लिए signed dmg और Mac App Store, Windows के लिए Microsoft Store उपलब्ध है।' },
    { question: 'ऐप कौन सा AI मॉडल इस्तेमाल करता है?', answer: 'Zush इमेज और समर्थित दस्तावेज़ों के तेज़ और सटीक विश्लेषण के लिए आधुनिक multimodal AI मॉडल इस्तेमाल करता है। ऑप्टिमाइज़ेशन के साथ मॉडल बदल सकता है।' },
    { question: 'क्या ऐप ऑफ़लाइन काम करता है?', answer: 'क्लाउड प्रोसेसिंग के लिए इंटरनेट चाहिए। PRO यूज़र Ollama और compatible मॉडल इंस्टॉल करने के बाद Offline AI चालू कर सकते हैं।' },
    { question: 'क्या ऑडियो या वीडियो फ़ाइलें समर्थित हैं?', answer: 'अभी नहीं। Zush फ़िलहाल इमेज और PDF सहित समर्थित दस्तावेज़ों पर केंद्रित है। ऑडियो और वीडियो रोडमैप में हैं।' },
    { question: 'अगर ऐप मेरे लिए सही न हो तो रिफंड मिलेगा?', answer: 'हाँ। Zush 14 दिन की money-back guarantee देता है। जानकारी refund policy में है।' },
  ],
  ar: [
    { question: 'ما هو Zush؟', answer: 'Zush هو تطبيق سطح مكتب ذكي لنظامي Mac وWindows يعيد تسمية الملفات تلقائيا باستخدام الذكاء الاصطناعي. يحلل الصور والمستندات المدعومة، بما في ذلك ملفات PDF، لإنشاء أسماء وبيانات وصفية مفيدة.' },
    { question: 'ما صيغ الملفات المدعومة؟', answer: 'يدعم Zush الصور ولقطات الشاشة وملفات PDF والمستندات والجداول والعروض التقديمية والنصوص وCSV وSVG وغيرها من الصيغ الشائعة.' },
    { question: 'كيف تعمل ميزة Zush AI Rename؟', answer: 'اسحب عدة ملفات إلى Zush. يحلل التطبيق المحتوى، يقترح أسماء جديدة، ويتيح لك مراجعة كل نتيجة أو توليدها من جديد قبل التطبيق.' },
    { question: 'كيف تعمل مراقبة المجلدات؟', answer: 'يراقب Zush المجلدات التي تختارها في الخلفية. عند ظهور ملفات مدعومة جديدة، يتم تحليلها وإعادة تسميتها تلقائيا عندما تكون متصلا بالإنترنت.' },
    { question: 'هل يمكنني إعادة توليد اسم ملف من الذكاء الاصطناعي؟', answer: 'نعم. اختر الملف داخل AI Rename واضغط إعادة التوليد للحصول على اقتراح جديد.' },
    { question: 'هل يمكنني تخصيص تعليمات الأسماء والوسوم؟', answer: 'نعم. يمكنك كتابة قواعدك الخاصة للأسماء ووسوم البيانات الوصفية، مثل أسماء قصيرة، الموضوع أولا، أو وسوم محددة فقط.' },
    { question: 'هل بياناتي آمنة؟', answer: 'تبقى ملفاتك الأصلية على جهازك. في وضع السحابة، يرسل Zush فقط محتوى التحليل الضروري إلى مزود الذكاء الاصطناعي المختار. في وضع Offline AI يعالج Ollama الملفات المدعومة محليا.' },
    { question: 'هل يمكنني التراجع عن التغييرات؟', answer: 'نعم. من سجل النشاط يمكنك استعادة أسماء الملفات الأصلية بنقرة واحدة.' },
    { question: 'هل يدعم Zush عدة لغات وتنسيقات تاريخ؟', answer: 'نعم. يمكن لـ Zush إنشاء أسماء ملفات بأكثر من 60 لغة واستخدام تنسيق التاريخ الذي تفضله.' },
    { question: 'كيف يعمل السعر؟', answer: 'Zush PRO هو شراء لمرة واحدة بقيمة 10 دولارات، يتضمن 10,000 رصيد والوصول إلى BYOK وOffline AI. بعد ذلك يمكنك متابعة الاستخدام عبر BYOK أو Offline AI.' },
    { question: 'ما هو BYOK (Bring Your Own Key)؟', answer: 'يتيح BYOK لمستخدمي PRO ربط مفاتيح Gemini أو Groq أو OpenAI أو Claude الخاصة بهم لإعادة تسمية غير محدودة عبر السحابة. يتم تخزين المفتاح محليا وبشكل آمن.' },
    { question: 'لماذا شراء لمرة واحدة بدلا من اشتراك؟', answer: 'نفضل تسعيرا واضحا: تدفع مرة واحدة وتستمر في الاستخدام بدون رسوم شهرية أو عبء الاشتراكات.' },
    { question: 'ما أنظمة التشغيل المدعومة؟', answer: 'يعمل Zush على macOS 14 Sonoma والإصدارات الأحدث، وعلى Windows 10 / 11. يتوفر Mac كملف dmg موقّع وعلى Mac App Store، ويتوفر Windows عبر Microsoft Store.' },
    { question: 'ما نموذج الذكاء الاصطناعي الذي يستخدمه التطبيق؟', answer: 'يستخدم Zush نماذج ذكاء اصطناعي متعددة الوسائط حديثة لتحليل الصور والمستندات المدعومة بسرعة ودقة. قد يتغير النموذج المحدد مع التحسينات.' },
    { question: 'هل يعمل التطبيق دون اتصال؟', answer: 'تتطلب المعالجة السحابية اتصالا بالإنترنت. يمكن لمستخدمي PRO تفعيل Offline AI بعد تثبيت Ollama ونموذج متوافق.' },
    { question: 'هل تدعمون ملفات الصوت أو الفيديو؟', answer: 'ليس بعد. يركز Zush حاليا على الصور والمستندات المدعومة، بما في ذلك ملفات PDF. دعم الصوت والفيديو ضمن خارطة الطريق.' },
    { question: 'هل يمكنني استرداد المال إذا لم يناسبني؟', answer: 'نعم. يوفر Zush ضمان استرداد لمدة 14 يوما. التفاصيل موجودة في سياسة الاسترداد.' },
  ],
};

const EN_COPY: LocaleCopy = {
  header: {
    features: 'Features',
    pricing: 'Pricing',
    faq: 'FAQ',
    blog: 'Blog',
    buyPro: 'Buy 🌟 PRO',
    download: 'Download',
    toggleTheme: 'Toggle theme',
    language: 'Language',
    homeAria: 'Go to homepage',
    skipToContent: 'Skip to content',
  },
  downloadMenu: {
    downloadForMac: 'Download for Mac',
    windowsTitle: 'Windows (x64/arm64)',
    macDirectHint: 'Direct .dmg download',
    windowsHint: 'Microsoft Store',
    appStoreTitle: 'Mac App Store',
    appStoreHint: 'Install via App Store',
    showOptions: 'Show download options for {os}',
  },
  footer: {
    description: 'AI file renamer for Mac and Windows — rename files with AI, automatically',
    product: 'Product',
    byFileType: 'By File Type',
    resources: 'Resources',
    support: 'Support',
    pricing: 'Pricing',
    blog: 'Blog',
    changelog: 'Changelog',
    methodology: 'Methodology',
    byokSetup: 'BYOK Setup Guide',
    ollamaSetup: 'Ollama Setup Guide',
    contactSupport: 'Contact Support',
    feedback: 'Features & Bug Reports',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    refund: 'Refund Policy',
    appStoreKicker: 'Download on the',
    appStoreLabel: 'Mac App Store',
    appStoreAria: 'Download Zush on the Mac App Store',
    microsoftStoreKicker: 'Download from the',
    microsoftStoreLabel: 'Microsoft Store',
    microsoftStoreAria: 'Get Zush from the Microsoft Store',
    followX: 'Follow us on X',
    followYouTube: 'Follow us on YouTube',
    productHunt: 'Zush on Product Hunt',
    designedBy: 'Designed by',
    designedWith: 'with',
    productLinks: {
      mac: 'Zush for Mac',
      windows: 'Zush for Windows',
      pdf: 'Rename PDFs',
      photos: 'Rename Photos',
      screenshots: 'Rename Screenshots',
      documents: 'Rename Documents',
    },
  },
  home: {
    heroTitle: 'Rename Files with AI. Automatically.',
    heroAccent: 'Automatically.',
    heroSubtitle:
      'Blazing fast AI file renamer for Mac and Windows. Auto-rename screenshots, PDFs, and documents with meaningful names — folder watching, BYOK, and offline AI built in.',
    buyPro: 'Buy 🌟 PRO',
    trustSignals: ['✨ Free to try', '💳 No credit card', '🚫 No subscription'],
    featuresTitle: 'How Zush AI Renames Your Files',
    featuresDescription: 'Powerful features packed into a simple, elegant interface',
    supportedFormats: 'Supported File Formats',
    images: 'Images',
    documents: 'Documents',
    downloadTitle: 'Try Zush free',
    downloadSubtitle: 'AI-powered file renaming with custom prompts, folder monitoring, and one-click revert.',
    downloadHintPrefix: 'Free · No credit card required',
    useCasesTitle: 'Who Uses AI File Renaming',
    useCasesDescription: 'Click the role closest to your workflow. Each card goes to the Zush page built for that type of file chaos.',
    faqTitle: 'Frequently Asked Questions',
    faqTitleAccent: 'Questions',
    faqDescription: 'Everything you need to know about Zush in one place',
    featureCards: DEFAULT_FEATURE_CARDS_COPY,
    videos: {
      title: 'See Zush in Action',
      titleAccent: 'Zush',
      description: 'See how Zush handles real file organization workflows with these core features',
      playDemo: 'Play demo',
      switchTo: 'Switch to',
      items: {
        'batch-rename': { title: 'Batch Rename', description: 'Rename multiple files at once with AI' },
        monitor: { title: 'Folder Monitoring', description: 'Automatically rename new files as they appear' },
        tags: { title: 'Smart Tags', description: 'Generate smart tags for faster file search' },
        naming: { title: 'Naming Patterns', description: 'Create reusable naming patterns with flexible variables' },
        multilanguage: { title: 'Multilanguage', description: 'Generate filenames in more than 60 languages' },
        'custom-prompts': { title: 'Custom Prompts', description: 'Guide filename generation with your own instructions' },
        byok: { title: 'BYOK', description: 'Connect your own AI provider for unlimited renaming' },
        'offline-ai': { title: 'Offline AI mode', description: 'Process supported files offline with private local models via Ollama' },
        activity: { title: 'Activity History', description: 'Review recent renames and undo changes when needed' },
      },
    },
    speedComparison: {
      eyebrow: 'Speed test',
      title: 'Faster work. Sharper names.',
      titleAccent: 'Sharper names.',
      description: 'Same 10 files, same goal: rename by content. One purpose-built tool, one general AI agent — head to head.',
      zushLabel: 'Zush',
      zushBadge: 'Done',
      zushCaption: 'Made for files. Drop them in, get clean names, done.',
      rivalLabel: 'Claude Cowork',
      rivalStatus: 'Still working',
      rivalDoneLabel: 'Finally done',
      rivalCaption: 'Smart at many things, but slow with everyday file work.',
      rivalPlaceholderHint: 'Comparison capture coming',
      runningLabel: 'Running',
      replayLabel: 'Replay',
      skipToEndLabel: 'Skip to end',
      disclaimer: 'Claude and Claude Cowork are trademarks of Anthropic PBC. Zush is not affiliated with or endorsed by Anthropic.',
    },
    whyZush: {
      title: 'Why Zush Fits Real Desktop Work',
      titlePlatform: 'Why Zush Wins on {os}',
      description: 'One-time pricing, desktop-native feel, fast renaming, and fewer annoying decisions',
      descriptionPlatform: 'Native desktop feel, fast renaming, one-time pricing, and fewer annoying decisions on {os}',
      nativeEyebrow: 'Desktop-native feel',
      nativeEyebrowPlatform: '{os}-native feel',
      nativeTitle: 'Native, fast, and modern',
      nativeDescription: 'Zush feels like a real desktop app: quick to open, clean to use, and visually at home on your machine instead of feeling like a clunky utility panel.',
      nativeDescriptionPlatform: 'Zush feels like a real native {os} app: quick to open, clean to use, and visually at home on your machine instead of feeling like a clunky utility panel.',
      pricingTrustItems: ['✨ Free to try', '🚫 No subscription', '↩️ 14-day refund'],
      priceEyebrow: 'One-time fair pricing',
      priceTitle: 'Pay once, keep the workflow',
      priceDescription: 'Most AI file renamers try to become another monthly bill. Zush stays simple: free to try, then one small one-time purchase when it proves useful.',
      priceLabel: 'one-time',
      speedEyebrow: 'Sssupafast!',
      speedTitle: 'Renames happen in seconds',
      speedDescription: 'Speed matters because cleanup only sticks if it does not interrupt the real work. Drop files in, review, apply, move on.',
      formatsEyebrow: 'Pro photo support',
      formatsTitle: 'Native RAW support for photographers',
      formatsDescription: 'Supports professional camera formats like CR2, NEF, ARW, DNG, RAF, and RW2, so photographers can rename imports by actual image content instead of living with `IMG_` chaos.',
      controlEyebrow: 'Low-risk automation',
      controlTitle: 'Batch, monitor, and undo',
      controlDescription: 'Clean up old piles in batch, keep new folders readable with monitoring, and revert from history if you want a different name.',
      workflowSteps: ['Batch old piles', 'Watch new folders', 'Revert from history'],
    },
    useCases: {
      items: [
        { title: 'Designers', description: 'Stop digging through hundreds of screenshots for that one reference. Find any mockup, UI element, or inspiration in seconds.' },
        { title: 'Photographers', description: 'Organize massive photo libraries effortlessly. Supports pro RAW formats like CR2, NEF, ARW, DNG, RAF, RW2, and more.' },
        { title: 'Marketers & SMM', description: 'Keep campaign decks, exports, screenshots, and assets organized. Quickly find the right file for any campaign or report.' },
        { title: 'Developers', description: 'Screenshots for docs, bug reports, and PR reviews — always organized and easy to find.' },
        { title: 'Content Creators', description: 'Thumbnails, b-roll references, and visual assets for your content — all neatly organized.' },
        { title: 'Product Managers', description: 'PRDs, meeting notes, spreadsheets, and stakeholder decks — instantly searchable.' },
      ],
    },
    renameDemo: {
      eyebrow: 'Quick demo',
      title: 'Zush AI Rename Demo',
      emptyTitle: 'Drop files here to try',
      emptySubtitle: 'Demo: up to 5 files. Only temporary previews are sent; originals stay private and are never uploaded or stored.',
      selectFiles: 'Select files...',
      supportedFormatsLabel: 'Supported preview formats',
      privacyHint: 'Your files stay private. This demo only sends a temporary preview; original files are never uploaded or stored.',
      progressLabel: '{analyzed} of {total} analyzed',
      previewOnlyLabel: 'Preview',
      startOver: 'Start Over',
      downloadCta: 'Download',
      status: {
        queued: 'Waiting...',
        preparing: 'Preparing preview...',
        analyzing: 'Analyzing file...',
        done: 'Ready',
        error: 'Could not analyze',
      },
      errors: {
        unsupportedType: '{extension} is not supported in the web preview yet.',
        fileTooLarge: 'This browser preview cannot safely read this file. Download Zush to rename full-size files.',
        emptyPreview: 'Could not extract enough content from this file.',
        processingFailed: 'Could not prepare this file.',
        tooManyFiles: 'Showing the first {limit} files for this quick demo.',
      },
      cta: {
        title: 'Zush does much more!',
        features: {
          batchRename: 'Batch Rename',
          foldersMonitor: 'Folders Monitor',
          smartNaming: 'Smart Naming & Metadata',
          customAIPrompts: 'Custom AI Prompts',
          languages: '60+ Languages',
          quickRenameShortcut: 'Quick Rename Shortcut',
          byok: 'BYOK',
          offlineAI: 'Offline AI',
        },
      },
    },
    faqItems: HOME_FAQ_DATA,
    showcaseSlides: EN_HOME_SHOWCASE_SLIDES,
  },
  pricing: {
    title: 'Pay once, use forever',
    description: 'No subscriptions, no hidden fees. Just a simple one-time purchase.',
    planName: 'Zush PRO 🌟',
    planDescription: 'One-time purchase • Lifetime access',
    billing: 'one-time',
    buttonText: 'Buy Zush PRO 🌟',
    buttonHint: '14-day money-back guarantee • Secure via Paddle',
    features: [
      { title: '10,000 Credits', desc: 'Process up to 10,000 files, then use BYOK or Offline AI mode' },
      { title: 'BYOK - Bring Your Own Key', desc: 'Use your provider key for unlimited cloud renames' },
      { title: 'Offline AI mode', desc: 'Private local models via Ollama' },
      { title: 'Folders Monitor', desc: 'Auto-rename new files as they land in watched folders' },
      { title: 'Smart Naming & Metadata', desc: 'Customize naming patterns and auto-tag files with Finder metadata' },
      { title: 'Custom AI Prompts', desc: 'Personalize AI behavior with your own rename and tagging instructions' },
      { title: 'Localization (60+ languages)', desc: 'File names in any language with custom date format' },
      { title: 'Quick Rename Shortcut', desc: 'Rename selected files in Finder with a keyboard shortcut' },
    ],
  },
  platforms: {
    mac: {
      breadcrumbLabel: 'Zush for Mac',
      softwareName: 'Zush for Mac',
      softwareDescription:
        'AI-powered file renamer for macOS. Rename screenshots, PDFs, photos and documents with cloud AI or Offline AI mode via Ollama.',
      heroTitle: 'AI File Renamer for Mac',
      heroSubtitle:
        'Rename screenshots, PDFs, photos, and documents on macOS with AI. Use fast cloud models or Offline AI mode with private local models via Ollama.',
      ctaTitle: 'Try Zush free on Mac',
      ctaSubtitle: 'Install the signed macOS app and start renaming screenshots, PDFs, photos, and documents in minutes.',
      faqDescription: 'Everything you need to know about Zush for Mac and the rest of the product.',
      features: [
        'AI-powered renaming for screenshots, PDFs, photos, documents',
        'Folder monitoring for new files and recurring cleanup',
        'Batch rename with per-file regenerate',
        'Custom prompts for names and metadata tags',
        'One-click revert from the Activity log',
        'Native Apple Silicon and Intel build',
        '60+ languages and flexible date formats',
        'BYOK for unlimited cloud renames',
        'Offline AI mode via Ollama',
      ],
      faqs: [
        { question: 'Does Zush work on Apple Silicon?', answer: 'Yes. Zush runs natively on Apple Silicon and Intel Macs running macOS 14 or newer.' },
        { question: 'Is the app notarized by Apple?', answer: 'Yes. The .dmg is code-signed and notarized, so Gatekeeper opens it normally on supported macOS versions.' },
        { question: 'Can I use Zush offline?', answer: 'Yes. PRO users can enable Offline AI mode with private local models via Ollama.' },
      ],
    },
    windows: {
      breadcrumbLabel: 'Zush for Windows',
      softwareName: 'Zush for Windows',
      softwareDescription:
        'AI-powered file renamer for Windows. Rename screenshots, PDFs, photos and documents with descriptive names.',
      heroTitle: 'AI File Renamer for Windows',
      heroSubtitle:
        'Rename screenshots, PDFs, photos, and documents on Windows with AI. Installs from the Microsoft Store with automatic updates, free to try with no signup.',
      ctaTitle: 'Try Zush free on Windows',
      ctaSubtitle: 'Open the Microsoft Store and start renaming screenshots, PDFs, photos, and documents with the full Windows build.',
      faqDescription: 'Everything you need to know about Zush for Windows and the rest of the product.',
      features: [
        'AI-powered renaming for screenshots, PDFs, photos, documents',
        'Folder monitoring for new files and recurring cleanup',
        'Batch rename with per-file regenerate',
        'Custom prompts for names and metadata tags',
        'One-click revert from the Activity log',
        'Microsoft Store install with auto-updates',
        '60+ languages and flexible date formats',
        'BYOK for unlimited cloud renames',
        'Offline AI mode via Ollama',
      ],
      faqs: [
        { question: 'Why is Zush distributed through the Microsoft Store?', answer: 'The Store handles installation, signing, and automatic updates for every user.' },
        { question: 'Does Zush for Windows have the same features as Mac?', answer: 'Yes. It includes cloud AI renaming, folder monitoring, custom prompts, revert history, BYOK, and Offline AI mode.' },
        { question: 'Does it run on Windows on ARM?', answer: 'Yes. The Microsoft Store release includes native x64 and ARM64 packages.' },
      ],
    },
  },
  featurePages: {},
  seo: {
    '/': {
      title: 'Zush — Rename Files with AI on Mac & Windows',
      description:
        'Rename screenshots, PDFs, photos and documents in seconds. Batch rename or watch folders on Mac and Windows. Free for 50 files, no signup.',
    },
  },
};

const featureFaq = (language: string): FAQCopyItem[] => [
  {
    question: language === 'en' ? 'Can I undo a rename?' : 'Can I undo a rename?',
    answer: language === 'en'
      ? 'Yes. Zush keeps a rename history so you can revert files back to their original names with one click.'
      : 'Yes. Zush keeps a rename history so you can revert files back to their original names with one click.',
  },
];

function withFeaturePages(copy: LocaleCopy): LocaleCopy {
  const routeLabels: Array<[LocalizedRoute, string, string]> = [
    ['/rename-pdf-with-ai', 'Rename PDFs with AI', 'Rename invoices, contracts, scans, and forms by the text and context inside each PDF.'],
    ['/rename-documents-with-ai', 'Rename Documents with AI', 'Rename DOCX, XLSX, PPTX, TXT, CSV, and email files by their actual content.'],
    ['/rename-screenshots-with-ai', 'Rename Screenshots with AI', 'Replace generic screenshot names with useful names based on what each screenshot shows.'],
    ['/rename-photos-with-ai', 'Rename Photos with AI', 'Rename HEIC, RAW, JPG, and other photos by subject, scene, and context.'],
  ];

  return {
    ...copy,
    featurePages: {
      ...copy.featurePages,
      ...Object.fromEntries(
        routeLabels.map(([route, h1, definitionText]) => [
          route,
          {
            h1,
            accent: h1,
            definitionText,
            faqTitle: 'Frequently Asked Questions',
            relatedToolsTitle: 'Related Tools',
            relatedGuidesTitle: 'Related Guides',
            faqItems: featureFaq('en'),
          },
        ]),
      ),
    },
  };
}

const base = withFeaturePages(EN_COPY);

const localizedFeaturePages = (
  faqTitle: string,
  relatedToolsTitle: string,
  relatedGuidesTitle: string,
  faq: FAQCopyItem[],
  entries: Array<[LocalizedRoute, string, string]>,
): Partial<Record<LocalizedRoute, FeatureCopy>> =>
  Object.fromEntries(
    entries.map(([route, h1, definitionText]) => [
      route,
      {
        h1,
        accent: h1,
        definitionText,
        faqTitle,
        relatedToolsTitle,
        relatedGuidesTitle,
        faqItems: faq,
      },
    ]),
  );

const localized = (overrides: DeepPartial<LocaleCopy>): LocaleCopy => ({
  ...base,
  ...overrides,
  header: { ...base.header, ...overrides.header },
  downloadMenu: { ...base.downloadMenu, ...overrides.downloadMenu },
  footer: {
    ...base.footer,
    ...overrides.footer,
    productLinks: {
      ...base.footer.productLinks,
      ...overrides.footer?.productLinks,
    } as Record<string, string>,
  },
  home: {
    ...base.home,
    ...overrides.home,
    featureCards: {
      ...base.home.featureCards,
      ...overrides.home?.featureCards,
    } as FeatureCardsCopy,
    videos: {
      ...base.home.videos,
      ...overrides.home?.videos,
      items: {
        ...base.home.videos.items,
        ...overrides.home?.videos?.items,
      },
    } as VideosCopy,
    speedComparison: {
      ...base.home.speedComparison,
      ...overrides.home?.speedComparison,
    } as SpeedComparisonCopy,
    whyZush: {
      ...base.home.whyZush,
      ...overrides.home?.whyZush,
      pricingTrustItems: overrides.home?.whyZush?.pricingTrustItems ?? base.home.whyZush.pricingTrustItems,
      workflowSteps: overrides.home?.whyZush?.workflowSteps ?? base.home.whyZush.workflowSteps,
    },
    useCases: {
      ...base.home.useCases,
      ...overrides.home?.useCases,
      items: overrides.home?.useCases?.items ?? base.home.useCases.items,
    },
    renameDemo: {
      ...base.home.renameDemo,
      ...overrides.home?.renameDemo,
      status: {
        ...base.home.renameDemo.status,
        ...overrides.home?.renameDemo?.status,
      },
      errors: {
        ...base.home.renameDemo.errors,
        ...overrides.home?.renameDemo?.errors,
      },
      cta: {
        ...base.home.renameDemo.cta,
        ...overrides.home?.renameDemo?.cta,
        features: {
          ...base.home.renameDemo.cta.features,
          ...overrides.home?.renameDemo?.cta?.features,
        },
      },
    },
    faqItems: overrides.home?.faqItems ?? base.home.faqItems,
    showcaseSlides: overrides.home?.showcaseSlides ?? base.home.showcaseSlides,
  },
  pricing: {
    ...base.pricing,
    ...overrides.pricing,
    features: overrides.pricing?.features ?? base.pricing.features,
  },
  platforms: {
    mac: { ...base.platforms.mac, ...overrides.platforms?.mac },
    windows: { ...base.platforms.windows, ...overrides.platforms?.windows },
  },
  featurePages: { ...base.featurePages, ...overrides.featurePages },
  seo: { ...base.seo, ...overrides.seo },
});

const simpleFeatures = (items: Array<[string, string]>) =>
  pricingFeatureIcons.map((_, index) => ({ title: items[index][0], desc: items[index][1] }));

type FooterVisibleCopy = Pick<
  FooterCopy,
  | 'blog'
  | 'changelog'
  | 'methodology'
  | 'byokSetup'
  | 'ollamaSetup'
  | 'appStoreKicker'
  | 'appStoreLabel'
  | 'appStoreAria'
  | 'microsoftStoreKicker'
  | 'microsoftStoreLabel'
  | 'microsoftStoreAria'
  | 'followX'
  | 'followYouTube'
  | 'productHunt'
  | 'designedBy'
  | 'designedWith'
  | 'productLinks'
>;

const localizedFooterDetails: Record<Exclude<Locale, 'en'>, FooterVisibleCopy> = {
  de: {
    blog: 'Blog',
    changelog: 'Änderungen',
    methodology: 'Methodik',
    byokSetup: 'BYOK-Einrichtung',
    ollamaSetup: 'Ollama-Einrichtung',
    appStoreKicker: 'Laden im',
    appStoreLabel: 'Mac App Store',
    appStoreAria: 'Zush im Mac App Store laden',
    microsoftStoreKicker: 'Laden aus dem',
    microsoftStoreLabel: 'Microsoft Store',
    microsoftStoreAria: 'Zush aus dem Microsoft Store laden',
    followX: 'Zush auf X folgen',
    followYouTube: 'Zush auf YouTube folgen',
    productHunt: 'Zush auf Product Hunt',
    designedBy: 'Entworfen von',
    designedWith: 'mit',
    productLinks: {
      mac: 'Zush für Mac',
      windows: 'Zush für Windows',
      pdf: 'PDFs umbenennen',
      photos: 'Fotos umbenennen',
      screenshots: 'Screenshots umbenennen',
      documents: 'Dokumente umbenennen',
    },
  },
  fr: {
    blog: 'Blog',
    changelog: 'Journal des changements',
    methodology: 'Méthodologie',
    byokSetup: 'Guide BYOK',
    ollamaSetup: 'Guide Ollama',
    appStoreKicker: 'Télécharger sur',
    appStoreLabel: 'Mac App Store',
    appStoreAria: 'Télécharger Zush sur le Mac App Store',
    microsoftStoreKicker: 'Télécharger depuis',
    microsoftStoreLabel: 'Microsoft Store',
    microsoftStoreAria: 'Obtenir Zush depuis le Microsoft Store',
    followX: 'Suivre Zush sur X',
    followYouTube: 'Suivre Zush sur YouTube',
    productHunt: 'Zush sur Product Hunt',
    designedBy: 'Conçu par',
    designedWith: 'avec',
    productLinks: {
      mac: 'Zush pour Mac',
      windows: 'Zush pour Windows',
      pdf: 'Renommer des PDF',
      photos: 'Renommer des photos',
      screenshots: 'Renommer des captures',
      documents: 'Renommer des documents',
    },
  },
  'pt-br': {
    blog: 'Blog',
    changelog: 'Novidades',
    methodology: 'Metodologia',
    byokSetup: 'Guia BYOK',
    ollamaSetup: 'Guia Ollama',
    appStoreKicker: 'Baixar na',
    appStoreLabel: 'Mac App Store',
    appStoreAria: 'Baixar o Zush na Mac App Store',
    microsoftStoreKicker: 'Baixar na',
    microsoftStoreLabel: 'Microsoft Store',
    microsoftStoreAria: 'Obter o Zush na Microsoft Store',
    followX: 'Seguir o Zush no X',
    followYouTube: 'Seguir o Zush no YouTube',
    productHunt: 'Zush no Product Hunt',
    designedBy: 'Criado por',
    designedWith: 'com',
    productLinks: {
      mac: 'Zush para Mac',
      windows: 'Zush para Windows',
      pdf: 'Renomear PDFs',
      photos: 'Renomear fotos',
      screenshots: 'Renomear screenshots',
      documents: 'Renomear documentos',
    },
  },
  es: {
    blog: 'Blog',
    changelog: 'Novedades',
    methodology: 'Metodología',
    byokSetup: 'Guía BYOK',
    ollamaSetup: 'Guía de Ollama',
    appStoreKicker: 'Descargar en',
    appStoreLabel: 'Mac App Store',
    appStoreAria: 'Descargar Zush en Mac App Store',
    microsoftStoreKicker: 'Descargar desde',
    microsoftStoreLabel: 'Microsoft Store',
    microsoftStoreAria: 'Obtener Zush desde Microsoft Store',
    followX: 'Seguir Zush en X',
    followYouTube: 'Seguir Zush en YouTube',
    productHunt: 'Zush en Product Hunt',
    designedBy: 'Diseñado por',
    designedWith: 'con',
    productLinks: {
      mac: 'Zush para Mac',
      windows: 'Zush para Windows',
      pdf: 'Renombrar PDFs',
      photos: 'Renombrar fotos',
      screenshots: 'Renombrar capturas',
      documents: 'Renombrar documentos',
    },
  },
  nl: {
    blog: 'Blog',
    changelog: 'Wijzigingen',
    methodology: 'Methode',
    byokSetup: 'BYOK-handleiding',
    ollamaSetup: 'Ollama-handleiding',
    appStoreKicker: 'Download in de',
    appStoreLabel: 'Mac App Store',
    appStoreAria: 'Download Zush in de Mac App Store',
    microsoftStoreKicker: 'Download via de',
    microsoftStoreLabel: 'Microsoft Store',
    microsoftStoreAria: 'Download Zush via de Microsoft Store',
    followX: 'Volg Zush op X',
    followYouTube: 'Volg Zush op YouTube',
    productHunt: 'Zush op Product Hunt',
    designedBy: 'Ontworpen door',
    designedWith: 'met',
    productLinks: {
      mac: 'Zush voor Mac',
      windows: 'Zush voor Windows',
      pdf: 'PDFs hernoemen',
      photos: 'Foto’s hernoemen',
      screenshots: 'Screenshots hernoemen',
      documents: 'Documenten hernoemen',
    },
  },
  it: {
    blog: 'Blog',
    changelog: 'Novità',
    methodology: 'Metodologia',
    byokSetup: 'Guida BYOK',
    ollamaSetup: 'Guida Ollama',
    appStoreKicker: 'Scarica da',
    appStoreLabel: 'Mac App Store',
    appStoreAria: 'Scarica Zush dal Mac App Store',
    microsoftStoreKicker: 'Scarica da',
    microsoftStoreLabel: 'Microsoft Store',
    microsoftStoreAria: 'Ottieni Zush dal Microsoft Store',
    followX: 'Segui Zush su X',
    followYouTube: 'Segui Zush su YouTube',
    productHunt: 'Zush su Product Hunt',
    designedBy: 'Progettato da',
    designedWith: 'con',
    productLinks: {
      mac: 'Zush per Mac',
      windows: 'Zush per Windows',
      pdf: 'Rinomina PDF',
      photos: 'Rinomina foto',
      screenshots: 'Rinomina screenshot',
      documents: 'Rinomina documenti',
    },
  },
  ja: {
    blog: 'ブログ',
    changelog: '変更履歴',
    methodology: '方法',
    byokSetup: 'BYOK 設定ガイド',
    ollamaSetup: 'Ollama 設定ガイド',
    appStoreKicker: 'ダウンロード',
    appStoreLabel: 'Mac App Store',
    appStoreAria: 'Mac App Store で Zush をダウンロード',
    microsoftStoreKicker: '入手先',
    microsoftStoreLabel: 'Microsoft Store',
    microsoftStoreAria: 'Microsoft Store で Zush を入手',
    followX: 'X で Zush をフォロー',
    followYouTube: 'YouTube で Zush をフォロー',
    productHunt: 'Product Hunt の Zush',
    designedBy: 'デザイン',
    designedWith: 'と',
    productLinks: {
      mac: 'Mac 版 Zush',
      windows: 'Windows 版 Zush',
      pdf: 'PDF をリネーム',
      photos: '写真をリネーム',
      screenshots: 'スクリーンショットをリネーム',
      documents: '文書をリネーム',
    },
  },
  ko: {
    blog: '블로그',
    changelog: '변경 내역',
    methodology: '방법론',
    byokSetup: 'BYOK 설정 가이드',
    ollamaSetup: 'Ollama 설정 가이드',
    appStoreKicker: '다운로드',
    appStoreLabel: 'Mac App Store',
    appStoreAria: 'Mac App Store에서 Zush 다운로드',
    microsoftStoreKicker: '다운로드',
    microsoftStoreLabel: 'Microsoft Store',
    microsoftStoreAria: 'Microsoft Store에서 Zush 받기',
    followX: 'X에서 Zush 팔로우',
    followYouTube: 'YouTube에서 Zush 팔로우',
    productHunt: 'Product Hunt의 Zush',
    designedBy: '디자인',
    designedWith: '와 함께',
    productLinks: {
      mac: 'Mac용 Zush',
      windows: 'Windows용 Zush',
      pdf: 'PDF 이름 변경',
      photos: '사진 이름 변경',
      screenshots: '스크린샷 이름 변경',
      documents: '문서 이름 변경',
    },
  },
  'zh-cn': {
    blog: '博客',
    changelog: '更新日志',
    methodology: '方法说明',
    byokSetup: 'BYOK 设置指南',
    ollamaSetup: 'Ollama 设置指南',
    appStoreKicker: '下载于',
    appStoreLabel: 'Mac App Store',
    appStoreAria: '在 Mac App Store 下载 Zush',
    microsoftStoreKicker: '下载自',
    microsoftStoreLabel: 'Microsoft Store',
    microsoftStoreAria: '从 Microsoft Store 获取 Zush',
    followX: '在 X 上关注 Zush',
    followYouTube: '在 YouTube 上关注 Zush',
    productHunt: 'Product Hunt 上的 Zush',
    designedBy: '设计',
    designedWith: '用',
    productLinks: {
      mac: 'Zush for Mac',
      windows: 'Zush for Windows',
      pdf: '重命名 PDF',
      photos: '重命名照片',
      screenshots: '重命名截图',
      documents: '重命名文档',
    },
  },
  hi: {
    blog: 'ब्लॉग',
    changelog: 'बदलाव',
    methodology: 'कार्यप्रणाली',
    byokSetup: 'BYOK सेटअप गाइड',
    ollamaSetup: 'Ollama सेटअप गाइड',
    appStoreKicker: 'डाउनलोड करें',
    appStoreLabel: 'Mac App Store',
    appStoreAria: 'Mac App Store से Zush डाउनलोड करें',
    microsoftStoreKicker: 'डाउनलोड करें',
    microsoftStoreLabel: 'Microsoft Store',
    microsoftStoreAria: 'Microsoft Store से Zush प्राप्त करें',
    followX: 'X पर Zush को फ़ॉलो करें',
    followYouTube: 'YouTube पर Zush को फ़ॉलो करें',
    productHunt: 'Product Hunt पर Zush',
    designedBy: 'डिजाइन किया',
    designedWith: 'के साथ',
    productLinks: {
      mac: 'Mac के लिए Zush',
      windows: 'Windows के लिए Zush',
      pdf: 'PDF के नाम बदलें',
      photos: 'फ़ोटो के नाम बदलें',
      screenshots: 'स्क्रीनशॉट के नाम बदलें',
      documents: 'दस्तावेज़ों के नाम बदलें',
    },
  },
  ar: {
    blog: 'المدونة',
    changelog: 'سجل التغييرات',
    methodology: 'المنهجية',
    byokSetup: 'دليل إعداد BYOK',
    ollamaSetup: 'دليل إعداد Ollama',
    appStoreKicker: 'تنزيل من',
    appStoreLabel: 'Mac App Store',
    appStoreAria: 'تنزيل Zush من Mac App Store',
    microsoftStoreKicker: 'تنزيل من',
    microsoftStoreLabel: 'Microsoft Store',
    microsoftStoreAria: 'الحصول على Zush من Microsoft Store',
    followX: 'تابع Zush على X',
    followYouTube: 'تابع Zush على YouTube',
    productHunt: 'Zush على Product Hunt',
    designedBy: 'تصميم',
    designedWith: 'بواسطة',
    productLinks: {
      mac: 'Zush لنظام Mac',
      windows: 'Zush لنظام Windows',
      pdf: 'إعادة تسمية PDF',
      photos: 'إعادة تسمية الصور',
      screenshots: 'إعادة تسمية لقطات الشاشة',
      documents: 'إعادة تسمية المستندات',
    },
  },
};

const localizedDownloadMenu: Record<Exclude<Locale, 'en'>, DownloadMenuCopy> = {
  de: {
    downloadForMac: 'Für Mac laden',
    windowsTitle: 'Windows (x64/arm64)',
    macDirectHint: 'Direkter .dmg-Download',
    windowsHint: 'Microsoft Store',
    appStoreTitle: 'Mac App Store',
    appStoreHint: 'Über App Store installieren',
    showOptions: 'Download-Optionen für {os} anzeigen',
  },
  fr: {
    downloadForMac: 'Télécharger pour Mac',
    windowsTitle: 'Windows (x64/arm64)',
    macDirectHint: 'Téléchargement .dmg direct',
    windowsHint: 'Microsoft Store',
    appStoreTitle: 'Mac App Store',
    appStoreHint: 'Installer via l’App Store',
    showOptions: 'Afficher les options de téléchargement pour {os}',
  },
  'pt-br': {
    downloadForMac: 'Baixar para Mac',
    windowsTitle: 'Windows (x64/arm64)',
    macDirectHint: 'Download direto .dmg',
    windowsHint: 'Microsoft Store',
    appStoreTitle: 'Mac App Store',
    appStoreHint: 'Instalar pela App Store',
    showOptions: 'Mostrar opções de download para {os}',
  },
  es: {
    downloadForMac: 'Descargar para Mac',
    windowsTitle: 'Windows (x64/arm64)',
    macDirectHint: 'Descarga directa .dmg',
    windowsHint: 'Microsoft Store',
    appStoreTitle: 'Mac App Store',
    appStoreHint: 'Instalar desde App Store',
    showOptions: 'Mostrar opciones de descarga para {os}',
  },
  nl: {
    downloadForMac: 'Download voor Mac',
    windowsTitle: 'Windows (x64/arm64)',
    macDirectHint: 'Directe .dmg-download',
    windowsHint: 'Microsoft Store',
    appStoreTitle: 'Mac App Store',
    appStoreHint: 'Installeren via App Store',
    showOptions: 'Downloadopties voor {os} tonen',
  },
  it: {
    downloadForMac: 'Scarica per Mac',
    windowsTitle: 'Windows (x64/arm64)',
    macDirectHint: 'Download diretto .dmg',
    windowsHint: 'Microsoft Store',
    appStoreTitle: 'Mac App Store',
    appStoreHint: 'Installa tramite App Store',
    showOptions: 'Mostra opzioni di download per {os}',
  },
  ja: {
    downloadForMac: 'Mac 版をダウンロード',
    windowsTitle: 'Windows (x64/arm64)',
    macDirectHint: '直接 .dmg ダウンロード',
    windowsHint: 'Microsoft Store',
    appStoreTitle: 'Mac App Store',
    appStoreHint: 'App Store からインストール',
    showOptions: '{os} のダウンロードオプションを表示',
  },
  ko: {
    downloadForMac: 'Mac용 다운로드',
    windowsTitle: 'Windows (x64/arm64)',
    macDirectHint: '직접 .dmg 다운로드',
    windowsHint: 'Microsoft Store',
    appStoreTitle: 'Mac App Store',
    appStoreHint: 'App Store로 설치',
    showOptions: '{os} 다운로드 옵션 표시',
  },
  'zh-cn': {
    downloadForMac: '下载 Mac 版',
    windowsTitle: 'Windows (x64/arm64)',
    macDirectHint: '直接下载 .dmg',
    windowsHint: 'Microsoft Store',
    appStoreTitle: 'Mac App Store',
    appStoreHint: '通过 App Store 安装',
    showOptions: '显示 {os} 下载选项',
  },
  hi: {
    downloadForMac: 'Mac के लिए डाउनलोड करें',
    windowsTitle: 'Windows (x64/arm64)',
    macDirectHint: 'सीधा .dmg डाउनलोड',
    windowsHint: 'Microsoft Store',
    appStoreTitle: 'Mac App Store',
    appStoreHint: 'App Store से इंस्टॉल करें',
    showOptions: '{os} के डाउनलोड विकल्प दिखाएँ',
  },
  ar: {
    downloadForMac: 'تنزيل لنظام Mac',
    windowsTitle: 'Windows (x64/arm64)',
    macDirectHint: 'تنزيل مباشر بصيغة .dmg',
    windowsHint: 'Microsoft Store',
    appStoreTitle: 'Mac App Store',
    appStoreHint: 'التثبيت عبر App Store',
    showOptions: 'عرض خيارات التنزيل لـ {os}',
  },
};

const localizedPricingFeatures: Record<Exclude<Locale, 'en'>, PricingCopy['features']> = {
  de: simpleFeatures([
    ['10.000 Credits', 'Bis zu 10.000 Dateien verarbeiten, danach BYOK oder Offline-KI nutzen'],
    ['BYOK - eigener Schlüssel', 'Nutze deinen Provider-Schlüssel für unbegrenzte Cloud-Umbenennungen'],
    ['Offline-KI-Modus', 'Private lokale Modelle über Ollama'],
    ['Ordnerüberwachung', 'Neue Dateien in überwachten Ordnern automatisch umbenennen'],
    ['Smarte Namen & Metadaten', 'Namensmuster anpassen und Finder-Metadaten setzen'],
    ['Eigene KI-Prompts', 'KI-Verhalten mit eigenen Regeln steuern'],
    ['Lokalisierung (60+ Sprachen)', 'Dateinamen in jeder Sprache mit eigenem Datumsformat'],
    ['Schnell-Shortcut', 'Ausgewählte Dateien im Finder per Tastatur umbenennen'],
  ]),
  fr: simpleFeatures([
    ['10 000 crédits', 'Traitez jusqu’à 10 000 fichiers, puis utilisez BYOK ou l’IA hors ligne'],
    ['BYOK - votre propre clé', 'Utilisez la clé de votre fournisseur pour des renommages cloud illimités'],
    ['Mode IA hors ligne', 'Modèles locaux privés via Ollama'],
    ['Surveillance de dossiers', 'Renomme automatiquement les nouveaux fichiers des dossiers surveillés'],
    ['Noms et métadonnées intelligents', 'Personnalisez les modèles de nom et ajoutez des métadonnées Finder'],
    ['Prompts IA personnalisés', 'Ajustez le comportement de l’IA avec vos propres règles'],
    ['Localisation (60+ langues)', 'Générez des noms dans n’importe quelle langue avec vos formats de date'],
    ['Raccourci de renommage rapide', 'Renommez les fichiers sélectionnés dans Finder au clavier'],
  ]),
  'pt-br': simpleFeatures([
    ['10.000 créditos', 'Processe até 10.000 arquivos e depois use BYOK ou IA offline'],
    ['BYOK - sua própria chave', 'Use a chave do seu provedor para renomeações ilimitadas na nuvem'],
    ['Modo IA offline', 'Modelos locais privados via Ollama'],
    ['Monitoramento de pastas', 'Renomeie automaticamente novos arquivos em pastas monitoradas'],
    ['Nomes e metadados inteligentes', 'Personalize padrões de nome e adicione metadados do Finder'],
    ['Prompts de IA personalizados', 'Ajuste o comportamento da IA com suas próprias regras'],
    ['Localização (60+ idiomas)', 'Gere nomes em qualquer idioma com formatos de data próprios'],
    ['Atalho de renomeação rápida', 'Renomeie arquivos selecionados no Finder pelo teclado'],
  ]),
  es: simpleFeatures([
    ['10.000 créditos', 'Procesa hasta 10.000 archivos y luego usa BYOK o IA sin conexión'],
    ['BYOK - tu propia clave', 'Usa la clave de tu proveedor para renombrados ilimitados en la nube'],
    ['Modo IA sin conexión', 'Modelos locales privados mediante Ollama'],
    ['Monitoreo de carpetas', 'Renombra automáticamente archivos nuevos en carpetas vigiladas'],
    ['Nombres y metadatos inteligentes', 'Personaliza patrones de nombre y añade metadatos de Finder'],
    ['Prompts de IA personalizados', 'Ajusta el comportamiento de la IA con tus propias reglas'],
    ['Localización (60+ idiomas)', 'Genera nombres en cualquier idioma con formatos de fecha propios'],
    ['Atajo de renombrado rápido', 'Renombra archivos seleccionados en Finder con el teclado'],
  ]),
  nl: simpleFeatures([
    ['10.000 credits', 'Verwerk tot 10.000 bestanden en gebruik daarna BYOK of offline AI'],
    ['BYOK - je eigen sleutel', 'Gebruik je provider-sleutel voor onbeperkt hernoemen in de cloud'],
    ['Offline AI-modus', 'Privé lokale modellen via Ollama'],
    ['Mapbewaking', 'Hernoem nieuwe bestanden in bewaakte mappen automatisch'],
    ['Slimme namen en metadata', 'Pas naamtemplates aan en voeg Finder-metadata toe'],
    ['Eigen AI-prompts', 'Stuur het AI-gedrag met je eigen regels'],
    ['Lokalisatie (60+ talen)', 'Genereer namen in elke taal met eigen datumformaten'],
    ['Snelle hernoemsneltoets', 'Hernoem geselecteerde bestanden in Finder met het toetsenbord'],
  ]),
  it: simpleFeatures([
    ['10.000 crediti', 'Elabora fino a 10.000 file, poi usa BYOK o IA offline'],
    ['BYOK - la tua chiave', 'Usa la chiave del tuo provider per rinomine cloud illimitate'],
    ['Modalità IA offline', 'Modelli locali privati tramite Ollama'],
    ['Monitoraggio cartelle', 'Rinomina automaticamente i nuovi file nelle cartelle monitorate'],
    ['Nomi e metadati intelligenti', 'Personalizza i pattern di nome e aggiungi metadati Finder'],
    ['Prompt IA personalizzati', 'Regola il comportamento dell’IA con le tue regole'],
    ['Localizzazione (60+ lingue)', 'Genera nomi in qualsiasi lingua con formati data personalizzati'],
    ['Scorciatoia di rinomina rapida', 'Rinomina i file selezionati nel Finder con la tastiera'],
  ]),
  ja: simpleFeatures([
    ['10,000 クレジット', '最大 10,000 ファイルを処理し、その後は BYOK またはオフライン AI を利用'],
    ['BYOK - 自分のキー', '自分のプロバイダーキーでクラウドリネームを無制限に実行'],
    ['オフライン AI モード', 'Ollama によるプライベートなローカルモデル'],
    ['フォルダ監視', '監視フォルダに入った新しいファイルを自動でリネーム'],
    ['スマートな名前とメタデータ', '命名パターンを調整し Finder メタデータを追加'],
    ['カスタム AI プロンプト', '独自ルールで AI の動作を調整'],
    ['ローカライズ（60+ 言語）', '任意の言語と日付形式でファイル名を生成'],
    ['クイックリネームショートカット', 'Finder で選択したファイルをキーボードでリネーム'],
  ]),
  ko: simpleFeatures([
    ['10,000 크레딧', '최대 10,000개 파일을 처리한 뒤 BYOK 또는 오프라인 AI 사용'],
    ['BYOK - 내 키 사용', '내 제공업체 키로 클라우드 이름 변경을 무제한 사용'],
    ['오프라인 AI 모드', 'Ollama를 통한 비공개 로컬 모델'],
    ['폴더 모니터링', '모니터링 폴더의 새 파일을 자동으로 이름 변경'],
    ['스마트 이름 및 메타데이터', '이름 패턴을 조정하고 Finder 메타데이터 추가'],
    ['사용자 지정 AI 프롬프트', '나만의 규칙으로 AI 동작 조정'],
    ['현지화(60+ 언어)', '원하는 언어와 날짜 형식으로 파일명 생성'],
    ['빠른 이름 변경 단축키', 'Finder에서 선택한 파일을 키보드로 이름 변경'],
  ]),
  'zh-cn': simpleFeatures([
    ['10,000 个额度', '最多处理 10,000 个文件，之后可使用 BYOK 或离线 AI 模式'],
    ['BYOK - 使用自己的密钥', '用自己的服务商密钥进行无限云端重命名'],
    ['离线 AI 模式', '通过 Ollama 使用私有本地模型'],
    ['文件夹监控', '新文件进入监控文件夹后自动重命名'],
    ['智能命名与元数据', '自定义命名模式并自动添加 Finder 元数据'],
    ['自定义 AI 提示词', '用自己的规则调整 AI 的命名和标签行为'],
    ['本地化（60+ 语言）', '用任意语言生成文件名，并支持自定义日期格式'],
    ['快速重命名快捷键', '在 Finder 中用键盘快捷键重命名选中文件'],
  ]),
  hi: simpleFeatures([
    ['10,000 क्रेडिट', '10,000 फ़ाइलों तक प्रोसेस करें, फिर BYOK या Offline AI मोड इस्तेमाल करें'],
    ['BYOK - अपनी कुंजी लाएँ', 'असीमित क्लाउड नाम-बदलाव के लिए अपने प्रदाता की कुंजी इस्तेमाल करें'],
    ['Offline AI मोड', 'Ollama के ज़रिए निजी स्थानीय मॉडल'],
    ['फ़ोल्डर निगरानी', 'निगरानी वाले फ़ोल्डरों में आने वाली नई फ़ाइलों के नाम अपने-आप बदलें'],
    ['स्मार्ट नाम और मेटाडेटा', 'नाम के पैटर्न बदलें और Finder मेटाडेटा के साथ फ़ाइलों को अपने-आप टैग करें'],
    ['कस्टम AI प्रॉम्प्ट', 'अपने नाम-बदलाव और टैगिंग निर्देशों से AI व्यवहार को अपने हिसाब से करें'],
    ['स्थानीयकरण (60+ भाषाएँ)', 'अपनी तारीख़ शैली के साथ किसी भी भाषा में फ़ाइल नाम बनाएँ'],
    ['त्वरित नाम-बदलाव शॉर्टकट', 'Finder में चुनी गई फ़ाइलों के नाम कीबोर्ड शॉर्टकट से बदलें'],
  ]),
  ar: simpleFeatures([
    ['10,000 رصيد', 'عالج حتى 10,000 ملف، ثم استخدم BYOK أو وضع Offline AI'],
    ['BYOK - استخدم مفتاحك الخاص', 'استخدم مفتاح مزودك لإعادة تسمية غير محدودة عبر السحابة'],
    ['وضع Offline AI', 'نماذج محلية خاصة عبر Ollama'],
    ['مراقبة المجلدات', 'أعد تسمية الملفات الجديدة تلقائيا عند وصولها إلى المجلدات المراقبة'],
    ['أسماء وبيانات وصفية ذكية', 'خصص أنماط التسمية وأضف بيانات Finder الوصفية تلقائيا'],
    ['تعليمات AI مخصصة', 'خصص سلوك الذكاء الاصطناعي بقواعدك الخاصة للأسماء والوسوم'],
    ['توطين (60+ لغة)', 'أسماء ملفات بأي لغة مع تنسيق تاريخ مخصص'],
    ['اختصار إعادة تسمية سريع', 'أعد تسمية الملفات المحددة في Finder عبر اختصار لوحة المفاتيح'],
  ]),
};

const localizedRenameDemo: Record<Exclude<Locale, 'en'>, RenameDemoCopy> = {
  de: {
    eyebrow: 'Kurzdemo',
    title: 'Zush AI Rename Demo',
    emptyTitle: 'Dateien hier ablegen',
    emptySubtitle: 'Teste bis zu 5 Dateien. Lade Zush für alle Funktionen, Ordner und Dateien in voller Größe herunter.',
    selectFiles: 'Dateien auswählen...',
    supportedFormatsLabel: 'Unterstützte Vorschauformate',
    privacyHint: 'Deine Dateien bleiben privat. Diese Demo sendet nur eine temporäre Vorschau; Originaldateien werden nie hochgeladen oder gespeichert.',
    progressLabel: '{analyzed} von {total} analysiert',
    previewOnlyLabel: 'Vorschau',
    startOver: 'Neu starten',
    downloadCta: 'Herunterladen',
    status: { queued: 'Warten...', preparing: 'Vorschau wird vorbereitet...', analyzing: 'Datei wird analysiert...', done: 'Bereit', error: 'Analyse fehlgeschlagen' },
    errors: { unsupportedType: '{extension} wird in der Web-Vorschau noch nicht unterstützt.', fileTooLarge: 'Diese Browser-Vorschau kann diese Datei nicht sicher lesen. Lade Zush herunter, um Dateien in voller Größe umzubenennen.', emptyPreview: 'Aus dieser Datei konnte nicht genug Inhalt gelesen werden.', processingFailed: 'Diese Datei konnte nicht vorbereitet werden.', tooManyFiles: 'Diese Kurzdemo zeigt die ersten {limit} Dateien.' },
    cta: {
      title: 'Zush kann noch viel mehr!',
      features: {
        batchRename: 'Stapel umbenennen',
        foldersMonitor: 'Ordnerüberwachung',
        smartNaming: 'Smarte Benennung & Metadaten',
        customAIPrompts: 'Eigene KI-Prompts',
        languages: '60+ Sprachen',
        quickRenameShortcut: 'Schnell-Umbenennen-Tastenkürzel',
        byok: 'BYOK',
        offlineAI: 'Offline-KI',
      },
    },
  },
  fr: {
    eyebrow: 'Démo rapide',
    title: 'Zush AI Rename Demo',
    emptyTitle: 'Déposez des fichiers ici',
    emptySubtitle: 'Testez jusqu’à 5 fichiers. Téléchargez Zush pour toutes les fonctionnalités, les dossiers et les fichiers complets.',
    selectFiles: 'Choisir des fichiers...',
    supportedFormatsLabel: 'Formats d’aperçu pris en charge',
    privacyHint: 'Vos fichiers restent privés. Cette démo envoie seulement un aperçu temporaire ; les fichiers originaux ne sont jamais téléversés ni stockés.',
    progressLabel: '{analyzed} sur {total} analysés',
    previewOnlyLabel: 'Aperçu',
    startOver: 'Recommencer',
    downloadCta: 'Télécharger',
    status: { queued: 'En attente...', preparing: 'Préparation de l’aperçu...', analyzing: 'Analyse du fichier...', done: 'Prêt', error: 'Analyse impossible' },
    errors: { unsupportedType: '{extension} n’est pas encore pris en charge dans l’aperçu web.', fileTooLarge: 'Cet aperçu dans le navigateur ne peut pas lire ce fichier en toute sécurité. Téléchargez Zush pour renommer les fichiers complets.', emptyPreview: 'Impossible d’extraire assez de contenu de ce fichier.', processingFailed: 'Impossible de préparer ce fichier.', tooManyFiles: 'Cette démo rapide affiche les {limit} premiers fichiers.' },
    cta: {
      title: 'Zush fait bien plus !',
      features: {
        batchRename: 'Renommage par lots',
        foldersMonitor: 'Surveillance des dossiers',
        smartNaming: 'Nommage intelligent & métadonnées',
        customAIPrompts: 'Prompts IA personnalisés',
        languages: '60+ langues',
        quickRenameShortcut: 'Raccourci de renommage rapide',
        byok: 'BYOK',
        offlineAI: 'IA hors ligne',
      },
    },
  },
  'pt-br': {
    eyebrow: 'Demonstração rápida',
    title: 'Zush AI Rename Demo',
    emptyTitle: 'Solte arquivos aqui',
    emptySubtitle: 'Teste até 5 arquivos. Baixe o Zush para todos os recursos, pastas e arquivos completos.',
    selectFiles: 'Selecionar arquivos...',
    supportedFormatsLabel: 'Formatos compatíveis na prévia',
    privacyHint: 'Seus arquivos permanecem privados. Esta demo envia apenas uma prévia temporária; os arquivos originais nunca são enviados nem armazenados.',
    progressLabel: '{analyzed} de {total} analisados',
    previewOnlyLabel: 'Prévia',
    startOver: 'Começar de novo',
    downloadCta: 'Baixar',
    status: { queued: 'Aguardando...', preparing: 'Preparando prévia...', analyzing: 'Analisando arquivo...', done: 'Pronto', error: 'Não foi possível analisar' },
    errors: { unsupportedType: '{extension} ainda não é compatível com a prévia web.', fileTooLarge: 'Esta prévia no navegador não consegue ler este arquivo com segurança. Baixe o Zush para renomear arquivos completos.', emptyPreview: 'Não foi possível extrair conteúdo suficiente deste arquivo.', processingFailed: 'Não foi possível preparar este arquivo.', tooManyFiles: 'Esta demo rápida mostra os primeiros {limit} arquivos.' },
    cta: {
      title: 'O Zush faz muito mais!',
      features: {
        batchRename: 'Renomeação em lote',
        foldersMonitor: 'Monitor de pastas',
        smartNaming: 'Nomenclatura inteligente & metadados',
        customAIPrompts: 'Prompts de IA personalizados',
        languages: '60+ idiomas',
        quickRenameShortcut: 'Atalho de renomeação rápida',
        byok: 'BYOK',
        offlineAI: 'IA offline',
      },
    },
  },
  es: {
    eyebrow: 'Demo rápida',
    title: 'Zush AI Rename Demo',
    emptyTitle: 'Suelta archivos aquí',
    emptySubtitle: 'Prueba hasta 5 archivos. Descarga Zush para todas las funciones, carpetas y archivos completos.',
    selectFiles: 'Seleccionar archivos...',
    supportedFormatsLabel: 'Formatos de vista previa admitidos',
    privacyHint: 'Tus archivos siguen siendo privados. Esta demo solo envía una vista previa temporal; los archivos originales nunca se suben ni se almacenan.',
    progressLabel: '{analyzed} de {total} analizados',
    previewOnlyLabel: 'Vista previa',
    startOver: 'Empezar de nuevo',
    downloadCta: 'Descargar',
    status: { queued: 'Esperando...', preparing: 'Preparando vista previa...', analyzing: 'Analizando archivo...', done: 'Listo', error: 'No se pudo analizar' },
    errors: { unsupportedType: '{extension} aún no es compatible con la vista previa web.', fileTooLarge: 'Esta vista previa del navegador no puede leer este archivo de forma segura. Descarga Zush para renombrar archivos completos.', emptyPreview: 'No se pudo extraer suficiente contenido de este archivo.', processingFailed: 'No se pudo preparar este archivo.', tooManyFiles: 'Esta demo rápida muestra los primeros {limit} archivos.' },
    cta: {
      title: '¡Zush hace mucho más!',
      features: {
        batchRename: 'Renombrado por lotes',
        foldersMonitor: 'Monitor de carpetas',
        smartNaming: 'Nombrado inteligente y metadatos',
        customAIPrompts: 'Prompts de IA personalizados',
        languages: '60+ idiomas',
        quickRenameShortcut: 'Atajo de renombrado rápido',
        byok: 'BYOK',
        offlineAI: 'IA sin conexión',
      },
    },
  },
  nl: {
    eyebrow: 'Snelle demo',
    title: 'Zush AI Rename Demo',
    emptyTitle: 'Sleep bestanden hierheen',
    emptySubtitle: 'Probeer maximaal 5 bestanden. Download Zush voor alle functies, mappen en volledige bestanden.',
    selectFiles: 'Bestanden kiezen...',
    supportedFormatsLabel: 'Ondersteunde voorbeeldformaten',
    privacyHint: 'Je bestanden blijven privé. Deze demo verstuurt alleen een tijdelijke preview; originele bestanden worden nooit geüpload of opgeslagen.',
    progressLabel: '{analyzed} van {total} geanalyseerd',
    previewOnlyLabel: 'Voorbeeld',
    startOver: 'Opnieuw beginnen',
    downloadCta: 'Download',
    status: { queued: 'Wachten...', preparing: 'Voorbeeld voorbereiden...', analyzing: 'Bestand analyseren...', done: 'Klaar', error: 'Analyse mislukt' },
    errors: { unsupportedType: '{extension} wordt nog niet ondersteund in het webvoorbeeld.', fileTooLarge: 'Deze browserpreview kan dit bestand niet veilig lezen. Download Zush om volledige bestanden te hernoemen.', emptyPreview: 'Er kon niet genoeg inhoud uit dit bestand worden gehaald.', processingFailed: 'Dit bestand kon niet worden voorbereid.', tooManyFiles: 'Deze snelle demo toont de eerste {limit} bestanden.' },
    cta: {
      title: 'Zush kan nog veel meer!',
      features: {
        batchRename: 'Batch hernoemen',
        foldersMonitor: 'Mapmonitor',
        smartNaming: 'Slimme naamgeving & metadata',
        customAIPrompts: 'Aangepaste AI-prompts',
        languages: '60+ talen',
        quickRenameShortcut: 'Snel hernoemen-sneltoets',
        byok: 'BYOK',
        offlineAI: 'Offline AI',
      },
    },
  },
  it: {
    eyebrow: 'Demo rapida',
    title: 'Zush AI Rename Demo',
    emptyTitle: 'Trascina qui i file',
    emptySubtitle: 'Prova fino a 5 file. Scarica Zush per tutte le funzioni, le cartelle e i file completi.',
    selectFiles: 'Seleziona file...',
    supportedFormatsLabel: 'Formati supportati nell’anteprima',
    privacyHint: 'I tuoi file restano privati. Questa demo invia solo un’anteprima temporanea; i file originali non vengono mai caricati o archiviati.',
    progressLabel: '{analyzed} di {total} analizzati',
    previewOnlyLabel: 'Anteprima',
    startOver: 'Ricomincia',
    downloadCta: 'Scarica',
    status: { queued: 'In attesa...', preparing: 'Preparazione anteprima...', analyzing: 'Analisi file...', done: 'Pronto', error: 'Analisi non riuscita' },
    errors: { unsupportedType: '{extension} non è ancora supportato nell’anteprima web.', fileTooLarge: 'Questa anteprima nel browser non può leggere questo file in sicurezza. Scarica Zush per rinominare file completi.', emptyPreview: 'Impossibile estrarre contenuto sufficiente da questo file.', processingFailed: 'Impossibile preparare questo file.', tooManyFiles: 'Questa demo rapida mostra i primi {limit} file.' },
    cta: {
      title: 'Zush fa molto di più!',
      features: {
        batchRename: 'Rinomina in batch',
        foldersMonitor: 'Monitor cartelle',
        smartNaming: 'Denominazione intelligente e metadati',
        customAIPrompts: 'Prompt IA personalizzati',
        languages: '60+ lingue',
        quickRenameShortcut: 'Scorciatoia rinomina rapida',
        byok: 'BYOK',
        offlineAI: 'IA offline',
      },
    },
  },
  ja: {
    eyebrow: 'クイックデモ',
    title: 'Zush AI Rename Demo',
    emptyTitle: 'ここにファイルをドロップ',
    emptySubtitle: '最大5ファイルまで試せます。すべての機能、フォルダ、フルサイズファイルにはZushをダウンロードしてください。',
    selectFiles: 'ファイルを選択...',
    supportedFormatsLabel: 'プレビュー対応形式',
    privacyHint: 'ファイルは非公開のままです。このデモは一時的なプレビューだけを送信し、元ファイルはアップロードも保存もされません。',
    progressLabel: '{total}件中{analyzed}件を解析',
    previewOnlyLabel: 'プレビュー',
    startOver: '最初から',
    downloadCta: 'ダウンロード',
    status: { queued: '待機中...', preparing: 'プレビューを準備中...', analyzing: 'ファイルを解析中...', done: '完了', error: '解析できませんでした' },
    errors: { unsupportedType: '{extension} はWebプレビューではまだ対応していません。', fileTooLarge: 'このブラウザプレビューでは、このファイルを安全に読み取れません。フルサイズのファイルをリネームするにはZushをダウンロードしてください。', emptyPreview: 'このファイルから十分な内容を抽出できませんでした。', processingFailed: 'このファイルを準備できませんでした。', tooManyFiles: 'このクイックデモでは最初の{limit}ファイルを表示しています。' },
    cta: {
      title: 'Zushはもっとたくさんできます!',
      features: {
        batchRename: '一括リネーム',
        foldersMonitor: 'フォルダ監視',
        smartNaming: 'スマート命名 & メタデータ',
        customAIPrompts: 'カスタムAIプロンプト',
        languages: '60以上の言語',
        quickRenameShortcut: 'クイックリネームのショートカット',
        byok: 'BYOK',
        offlineAI: 'オフラインAI',
      },
    },
  },
  ko: {
    eyebrow: '빠른 데모',
    title: 'Zush AI Rename Demo',
    emptyTitle: '여기에 파일을 놓으세요',
    emptySubtitle: '최대 5개 파일을 테스트해 보세요. 모든 기능, 폴더, 전체 크기 파일은 Zush를 다운로드하세요.',
    selectFiles: '파일 선택...',
    supportedFormatsLabel: '지원되는 미리보기 형식',
    privacyHint: '파일은 비공개로 유지됩니다. 이 데모는 임시 미리보기만 전송하며 원본 파일은 업로드되거나 저장되지 않습니다.',
    progressLabel: '{total}개 중 {analyzed}개 분석됨',
    previewOnlyLabel: '미리보기',
    startOver: '다시 시작',
    downloadCta: '다운로드',
    status: { queued: '대기 중...', preparing: '미리보기 준비 중...', analyzing: '파일 분석 중...', done: '준비됨', error: '분석할 수 없음' },
    errors: { unsupportedType: '{extension} 형식은 아직 웹 미리보기에서 지원되지 않습니다.', fileTooLarge: '이 브라우저 미리보기에서는 이 파일을 안전하게 읽을 수 없습니다. 전체 크기 파일을 이름 변경하려면 Zush를 다운로드하세요.', emptyPreview: '이 파일에서 충분한 내용을 추출하지 못했습니다.', processingFailed: '이 파일을 준비하지 못했습니다.', tooManyFiles: '이 빠른 데모는 처음 {limit}개 파일을 보여줍니다.' },
    cta: {
      title: 'Zush는 훨씬 더 많은 것을 할 수 있어요!',
      features: {
        batchRename: '일괄 이름 변경',
        foldersMonitor: '폴더 모니터',
        smartNaming: '스마트 이름 & 메타데이터',
        customAIPrompts: '맞춤 AI 프롬프트',
        languages: '60+ 언어',
        quickRenameShortcut: '빠른 이름 변경 단축키',
        byok: 'BYOK',
        offlineAI: '오프라인 AI',
      },
    },
  },
  'zh-cn': {
    eyebrow: '快速演示',
    title: 'Zush AI Rename Demo',
    emptyTitle: '将文件拖到这里',
    emptySubtitle: '最多试用 5 个文件。下载 Zush 可使用全部功能、文件夹和完整大小文件。',
    selectFiles: '选择文件...',
    supportedFormatsLabel: '支持的预览格式',
    privacyHint: '你的文件保持私密。此演示只发送临时预览；原始文件不会上传或存储。',
    progressLabel: '已分析 {analyzed}/{total}',
    previewOnlyLabel: '预览',
    startOver: '重新开始',
    downloadCta: '下载',
    status: { queued: '等待中...', preparing: '正在准备预览...', analyzing: '正在分析文件...', done: '完成', error: '无法分析' },
    errors: { unsupportedType: '网页预览暂不支持 {extension}。', fileTooLarge: '此浏览器预览无法安全读取该文件。请下载 Zush 来重命名完整大小的文件。', emptyPreview: '无法从此文件提取足够内容。', processingFailed: '无法准备此文件。', tooManyFiles: '此快速演示会显示前 {limit} 个文件。' },
    cta: {
      title: 'Zush 还能做更多！',
      features: {
        batchRename: '批量重命名',
        foldersMonitor: '文件夹监控',
        smartNaming: '智能命名与元数据',
        customAIPrompts: '自定义 AI 提示',
        languages: '60+ 种语言',
        quickRenameShortcut: '快速重命名快捷键',
        byok: 'BYOK',
        offlineAI: '离线 AI',
      },
    },
  },
  hi: {
    eyebrow: 'त्वरित डेमो',
    title: 'Zush AI नाम-बदलाव डेमो',
    emptyTitle: 'फ़ाइलें यहाँ छोड़ें',
    emptySubtitle: '5 फ़ाइलों तक आज़माएँ। सभी सुविधाओं, फ़ोल्डरों और पूरी आकार की फ़ाइलों के लिए Zush डाउनलोड करें।',
    selectFiles: 'फ़ाइलें चुनें...',
    supportedFormatsLabel: 'समर्थित प्रीव्यू फ़ॉर्मैट',
    privacyHint: 'आपकी फ़ाइलें निजी रहती हैं। यह डेमो सिर्फ़ अस्थायी प्रीव्यू भेजता है; मूल फ़ाइलें अपलोड या स्टोर नहीं होतीं।',
    progressLabel: '{total} में से {analyzed} का विश्लेषण हुआ',
    previewOnlyLabel: 'प्रीव्यू',
    startOver: 'फिर से शुरू करें',
    downloadCta: 'डाउनलोड',
    status: { queued: 'प्रतीक्षा में...', preparing: 'प्रीव्यू तैयार हो रहा है...', analyzing: 'फ़ाइल का विश्लेषण हो रहा है...', done: 'तैयार', error: 'विश्लेषण नहीं हो सका' },
    errors: { unsupportedType: '{extension} अभी वेब प्रीव्यू में समर्थित नहीं है।', fileTooLarge: 'यह ब्राउज़र प्रीव्यू इस फ़ाइल को सुरक्षित रूप से नहीं पढ़ सकता। पूरी आकार की फ़ाइलों के नाम बदलने के लिए Zush डाउनलोड करें।', emptyPreview: 'इस फ़ाइल से पर्याप्त कॉन्टेंट नहीं निकाला जा सका।', processingFailed: 'यह फ़ाइल तैयार नहीं हो सकी।', tooManyFiles: 'इस त्वरित डेमो में पहली {limit} फ़ाइलें दिखाई जा रही हैं।' },
    cta: {
      title: 'Zush इससे कहीं ज़्यादा कर सकता है!',
      features: {
        batchRename: 'एक साथ नाम बदलना',
        foldersMonitor: 'फ़ोल्डर निगरानी',
        smartNaming: 'स्मार्ट नाम और मेटाडेटा',
        customAIPrompts: 'कस्टम AI प्रॉम्प्ट',
        languages: '60+ भाषाएँ',
        quickRenameShortcut: 'त्वरित नाम-बदलाव शॉर्टकट',
        byok: 'BYOK',
        offlineAI: 'Offline AI मोड',
      },
    },
  },
  ar: {
    eyebrow: 'عرض سريع',
    title: 'Zush AI Rename Demo',
    emptyTitle: 'أسقط الملفات هنا',
    emptySubtitle: 'جرّب حتى 5 ملفات. نزّل Zush لكل الميزات والمجلدات والملفات كاملة الحجم.',
    selectFiles: 'اختيار الملفات...',
    supportedFormatsLabel: 'تنسيقات المعاينة المدعومة',
    privacyHint: 'تبقى ملفاتك خاصة. يرسل هذا العرض معاينة مؤقتة فقط؛ لا يتم رفع الملفات الأصلية أو تخزينها.',
    progressLabel: 'تم تحليل {analyzed} من {total}',
    previewOnlyLabel: 'معاينة',
    startOver: 'ابدأ من جديد',
    downloadCta: 'تنزيل',
    status: { queued: 'في الانتظار...', preparing: 'جار تحضير المعاينة...', analyzing: 'جار تحليل الملف...', done: 'جاهز', error: 'تعذر التحليل' },
    errors: { unsupportedType: 'لا يدعم معاين الويب {extension} بعد.', fileTooLarge: 'لا يمكن لهذه المعاينة في المتصفح قراءة هذا الملف بأمان. نزّل Zush لإعادة تسمية الملفات كاملة الحجم.', emptyPreview: 'تعذر استخراج محتوى كاف من هذا الملف.', processingFailed: 'تعذر تحضير هذا الملف.', tooManyFiles: 'يعرض هذا العرض السريع أول {limit} ملفات.' },
    cta: {
      title: '!يفعل Zush أكثر بكثير',
      features: {
        batchRename: 'إعادة التسمية بالدُفعات',
        foldersMonitor: 'مراقب المجلدات',
        smartNaming: 'تسمية ذكية وبيانات وصفية',
        customAIPrompts: 'أوامر ذكاء اصطناعي مخصصة',
        languages: '60+ لغة',
        quickRenameShortcut: 'اختصار إعادة التسمية السريعة',
        byok: 'BYOK',
        offlineAI: 'ذكاء اصطناعي بدون اتصال',
      },
    },
  },
};

const localizedHomeDetails: Record<Exclude<Locale, 'en'>, DeepPartial<Pick<HomeCopy, 'featureCards' | 'videos' | 'speedComparison' | 'whyZush' | 'useCases' | 'renameDemo' | 'faqItems' | 'showcaseSlides'>>> = {
  de: {
    featureCards: {
      aiAnalysis: { title: 'KI-Analyse', description: 'Fortschrittliche KI analysiert Bilder und unterstützte Dokumente, inklusive PDFs, und erzeugt automatisch aussagekräftige Dateinamen.' },
      foldersMonitoring: { title: 'Ordnerüberwachung', description: 'Überwache einen oder mehrere Ordner. Zush läuft im Hintergrund und verarbeitet neue Dateien automatisch.' },
      batchRename: { title: 'Stapelumbenennung', description: 'Ziehe mehrere Dateien hinein. Zush analysiert und benennt sie in Sekunden um.' },
      customPatterns: { title: 'Eigene Muster', description: 'Lege eigene Namensmuster mit Variablen wie {title}, {original}, {date}, {time} oder {category} fest.' },
      smartMetadata: { title: 'Smarte Metadaten', description: 'Finder-Tags und Spotlight-Metadaten automatisch setzen, damit Dateien sofort auffindbar sind.' },
      renameHistory: { title: 'Umbenennungsverlauf', description: 'Verfolge jede Änderung und stelle den ursprünglichen Dateinamen mit einem Klick wieder her.' },
      customPrompts: { title: 'Eigene KI-Prompts', description: 'Definiere Regeln für Namen, Tags und Metadaten, damit die KI deinem Workflow folgt.' },
      byok: { title: 'Eigener API-Schlüssel', description: 'Verbinde Gemini, Groq, OpenAI oder Claude für unbegrenzte Cloud-Umbenennungen. Schlüssel bleiben lokal gespeichert.' },
      offlineAi: { title: 'Offline-KI-Modus', description: 'Private lokale Modelle über Ollama. Unterstützte Dateien offline verarbeiten, ohne Inhalte an Cloud-Anbieter zu senden.' },
      addFolder: 'Ordner hinzufügen', promptRules: 'Prompt-Regeln', customBadge: 'Eigen', apiKeyConnected: 'API-Schlüssel verbunden', terminal: 'Terminal', localModelReady: 'Lokales Modell bereit', today: 'Heute', undo: 'Rückgängig',
    },
    videos: { title: 'Zush in Aktion', titleAccent: 'Zush', description: 'Sieh, wie Zush echte Dateiorganisation mit den wichtigsten Funktionen erledigt', playDemo: 'Demo abspielen', switchTo: 'Wechseln zu', items: { 'batch-rename': { title: 'Stapelumbenennung', description: 'Mehrere Dateien gleichzeitig mit KI umbenennen' }, monitor: { title: 'Ordnerüberwachung', description: 'Neue Dateien automatisch umbenennen, sobald sie erscheinen' }, tags: { title: 'Smarte Tags', description: 'Tags für schnellere Dateisuche generieren' }, naming: { title: 'Namensmuster', description: 'Wiederverwendbare Muster mit flexiblen Variablen erstellen' }, multilanguage: { title: 'Mehrsprachig', description: 'Dateinamen in mehr als 60 Sprachen erzeugen' }, 'custom-prompts': { title: 'Eigene Prompts', description: 'Dateinamen mit eigenen Anweisungen steuern' }, byok: { title: 'BYOK', description: 'Eigenen KI-Anbieter für unbegrenztes Umbenennen verbinden' }, 'offline-ai': { title: 'Offline-KI-Modus', description: 'Unterstützte Dateien offline mit lokalen Ollama-Modellen verarbeiten' }, activity: { title: 'Aktivitätsverlauf', description: 'Letzte Umbenennungen prüfen und Änderungen rückgängig machen' } } },
    whyZush: { title: 'Warum Zush zu echter Desktop-Arbeit passt', titlePlatform: 'Warum Zush auf {os} überzeugt', description: 'Einmalpreis, natives Desktop-Gefühl, schnelles Umbenennen und weniger Entscheidungen', descriptionPlatform: 'Natives Desktop-Gefühl, schnelles Umbenennen, Einmalpreis und weniger Entscheidungen auf {os}', nativeEyebrow: 'Desktop-natives Gefühl', nativeEyebrowPlatform: '{os}-natives Gefühl', nativeTitle: 'Nativ, schnell und modern', nativeDescription: 'Zush fühlt sich wie eine echte Desktop-App an: schnell geöffnet, klar bedienbar und visuell passend zu deinem System.', nativeDescriptionPlatform: 'Zush fühlt sich wie eine echte native {os}-App an: schnell geöffnet, klar bedienbar und visuell passend zu deinem System.', pricingTrustItems: ['✨ Kostenlos testen', '🚫 Kein Abo', '↩️ 14 Tage Rückerstattung'], priceEyebrow: 'Fairer Einmalpreis', priceTitle: 'Einmal zahlen, Workflow behalten', priceDescription: 'Zush bleibt einfach: kostenlos testen, dann ein kleiner Einmalkauf, wenn es nützlich ist.', priceLabel: 'einmalig', speedEyebrow: 'Superschnell', speedTitle: 'Umbenennung in Sekunden', speedDescription: 'Aufräumen funktioniert nur, wenn es die Arbeit nicht stört. Dateien reinziehen, prüfen, anwenden, weiterarbeiten.', formatsEyebrow: 'Profi-Fotoformate', formatsTitle: 'Native RAW-Unterstützung für Fotografen', formatsDescription: 'Unterstützt CR2, NEF, ARW, DNG, RAF, RW2 und weitere Formate, damit Importe nach Bildinhalt benannt werden.', controlEyebrow: 'Risikoarme Automatisierung', controlTitle: 'Stapel, Überwachung und Rückgängig', controlDescription: 'Alte Stapel bereinigen, neue Ordner lesbar halten und bei Bedarf aus dem Verlauf zurücksetzen.', workflowSteps: ['Alte Stapel', 'Neue Ordner überwachen', 'Aus Verlauf zurücksetzen'] },
    useCases: { items: [{ title: 'Designer', description: 'Finde Mockups, UI-Elemente und Referenzen in Sekunden statt in hunderten Screenshots zu suchen.' }, { title: 'Fotografen', description: 'Organisiere große Fotobibliotheken mit Unterstützung für RAW-Formate wie CR2, NEF, ARW, DNG, RAF und RW2.' }, { title: 'Marketing & SMM', description: 'Halte Kampagnen, Exporte, Screenshots und Assets sauber organisiert und schnell auffindbar.' }, { title: 'Entwickler', description: 'Screenshots für Doku, Bugreports und PR-Reviews bleiben geordnet und leicht auffindbar.' }, { title: 'Content Creator', description: 'Thumbnails, B-Roll-Referenzen und visuelle Assets bleiben übersichtlich organisiert.' }, { title: 'Product Manager', description: 'PRDs, Meeting-Notizen, Tabellen und Stakeholder-Decks werden sofort durchsuchbar.' }] },
    faqItems: [{ question: 'Was ist Zush?', answer: 'Zush ist eine KI-Desktop-App für Mac und Windows, die Dateien automatisch nach Inhalt umbenennt.' }, { question: 'Welche Dateiformate werden unterstützt?', answer: 'Zush unterstützt Bilder, Screenshots, PDFs, Dokumente, Tabellen, Präsentationen, Textdateien, CSV und mehr.' }, { question: 'Kann ich eine Umbenennung rückgängig machen?', answer: 'Ja. Zush speichert den Verlauf, damit du ursprüngliche Dateinamen mit einem Klick wiederherstellen kannst.' }, { question: 'Funktioniert Zush offline?', answer: 'Cloud-Verarbeitung benötigt Internet. PRO-Nutzer können Offline-KI mit lokalen Ollama-Modellen verwenden.' }, { question: 'Wie funktioniert der Preis?', answer: 'Zush PRO ist ein Einmalkauf ohne Abos oder versteckte Monatsgebühren.' }],
  },
  fr: {
    featureCards: {
      aiAnalysis: { title: 'Analyse IA', description: 'L’IA analyse les images et documents pris en charge, y compris les PDF, pour créer automatiquement des noms utiles.' },
      foldersMonitoring: { title: 'Surveillance des dossiers', description: 'Surveillez un ou plusieurs dossiers. Zush traite les nouveaux fichiers automatiquement en arrière-plan.' },
      batchRename: { title: 'Renommage par lot', description: 'Glissez plusieurs fichiers. Zush les analyse et les renomme en quelques secondes.' },
      customPatterns: { title: 'Modèles personnalisés', description: 'Créez vos propres modèles avec des variables comme {title}, {original}, {date}, {time} ou {category}.' },
      smartMetadata: { title: 'Métadonnées intelligentes', description: 'Ajoutez automatiquement des tags Finder et des métadonnées Spotlight pour retrouver les fichiers plus vite.' },
      renameHistory: { title: 'Historique des renommages', description: 'Gardez la trace de chaque changement et restaurez le nom d’origine en un clic.' },
      customPrompts: { title: 'Prompts IA personnalisés', description: 'Définissez les règles de noms, tags et métadonnées pour adapter l’IA à votre workflow.' },
      byok: { title: 'Votre propre clé API', description: 'Connectez Gemini, Groq, OpenAI ou Claude pour des renommages cloud illimités. Les clés restent stockées localement.' },
      offlineAi: { title: 'Mode IA hors ligne', description: 'Modèles locaux privés via Ollama. Traitez les fichiers pris en charge sans envoyer leur contenu au cloud.' },
      addFolder: 'Ajouter un dossier', promptRules: 'Règles du prompt', customBadge: 'Personnalisé', apiKeyConnected: 'Clé API connectée', terminal: 'Terminal', localModelReady: 'Modèle local prêt', today: 'Aujourd’hui', undo: 'Annuler',
    },
    videos: { title: 'Voir Zush en action', titleAccent: 'Zush', description: 'Découvrez comment Zush gère de vrais workflows d’organisation de fichiers', playDemo: 'Lire la démo', switchTo: 'Passer à', items: { 'batch-rename': { title: 'Renommage par lot', description: 'Renommez plusieurs fichiers à la fois avec l’IA' }, monitor: { title: 'Surveillance des dossiers', description: 'Renommez automatiquement les nouveaux fichiers' }, tags: { title: 'Tags intelligents', description: 'Générez des tags pour retrouver les fichiers plus vite' }, naming: { title: 'Modèles de noms', description: 'Créez des modèles réutilisables avec variables flexibles' }, multilanguage: { title: 'Multilingue', description: 'Générez des noms dans plus de 60 langues' }, 'custom-prompts': { title: 'Prompts personnalisés', description: 'Guidez la génération avec vos propres instructions' }, byok: { title: 'BYOK', description: 'Connectez votre fournisseur IA pour des renommages illimités' }, 'offline-ai': { title: 'Mode IA hors ligne', description: 'Traitez les fichiers avec des modèles locaux via Ollama' }, activity: { title: 'Historique d’activité', description: 'Consultez les renommages récents et annulez si besoin' } } },
    whyZush: { title: 'Pourquoi Zush convient au vrai travail desktop', titlePlatform: 'Pourquoi Zush gagne sur {os}', description: 'Prix unique, sensation native, renommage rapide et moins de décisions inutiles', descriptionPlatform: 'Sensation native, renommage rapide, prix unique et moins de décisions sur {os}', nativeEyebrow: 'Sensation native desktop', nativeEyebrowPlatform: 'Sensation native {os}', nativeTitle: 'Natif, rapide et moderne', nativeDescription: 'Zush ressemble à une vraie app desktop: rapide à ouvrir, claire à utiliser et cohérente avec votre système.', nativeDescriptionPlatform: 'Zush ressemble à une vraie app native {os}: rapide à ouvrir, claire à utiliser et cohérente avec votre système.', pricingTrustItems: ['✨ Essai gratuit', '🚫 Sans abonnement', '↩️ Remboursement 14 jours'], priceEyebrow: 'Prix unique équitable', priceTitle: 'Payez une fois, gardez le workflow', priceDescription: 'Zush reste simple: essai gratuit, puis un petit achat unique quand il devient utile.', priceLabel: 'une fois', speedEyebrow: 'Ultra rapide', speedTitle: 'Renommage en quelques secondes', speedDescription: 'Le rangement ne marche que s’il ne coupe pas le travail. Déposez, vérifiez, appliquez, continuez.', formatsEyebrow: 'Support photo pro', formatsTitle: 'Support RAW natif pour photographes', formatsDescription: 'Prend en charge CR2, NEF, ARW, DNG, RAF, RW2 et plus pour renommer les imports selon le contenu réel.', controlEyebrow: 'Automatisation sans risque', controlTitle: 'Lot, surveillance et annulation', controlDescription: 'Nettoyez les anciens dossiers, gardez les nouveaux lisibles et restaurez depuis l’historique.', workflowSteps: ['Lots anciens', 'Surveiller les dossiers', 'Restaurer depuis l’historique'] },
    useCases: { items: [{ title: 'Designers', description: 'Retrouvez maquettes, éléments UI et références en quelques secondes au lieu de fouiller des centaines de captures.' }, { title: 'Photographes', description: 'Organisez de grandes bibliothèques photo avec prise en charge RAW: CR2, NEF, ARW, DNG, RAF, RW2.' }, { title: 'Marketing & SMM', description: 'Gardez decks, exports, captures et assets de campagne organisés et faciles à retrouver.' }, { title: 'Développeurs', description: 'Les captures pour docs, bugs et revues PR restent organisées et faciles à chercher.' }, { title: 'Créateurs de contenu', description: 'Miniatures, références b-roll et assets visuels restent bien rangés.' }, { title: 'Product managers', description: 'PRD, notes de réunion, tableaux et decks deviennent instantanément recherchables.' }] },
    faqItems: [{ question: 'Qu’est-ce que Zush ?', answer: 'Zush est une app desktop IA pour Mac et Windows qui renomme automatiquement les fichiers selon leur contenu.' }, { question: 'Quels formats sont pris en charge ?', answer: 'Zush prend en charge images, captures, PDF, documents, feuilles de calcul, présentations, fichiers texte, CSV et plus.' }, { question: 'Puis-je annuler un renommage ?', answer: 'Oui. Zush conserve un historique pour restaurer les noms d’origine en un clic.' }, { question: 'Zush fonctionne-t-il hors ligne ?', answer: 'Le cloud nécessite internet. Les utilisateurs PRO peuvent utiliser le mode IA hors ligne avec Ollama.' }, { question: 'Comment fonctionne le prix ?', answer: 'Zush PRO est un achat unique, sans abonnement ni frais mensuels cachés.' }],
  },
  'pt-br': {
    featureCards: {
      aiAnalysis: { title: 'Análise com IA', description: 'A IA analisa imagens e documentos compatíveis, incluindo PDFs, para gerar nomes úteis automaticamente.' },
      foldersMonitoring: { title: 'Monitoramento de pastas', description: 'Monitore uma ou várias pastas. O Zush processa novos arquivos automaticamente em segundo plano.' },
      batchRename: { title: 'Renomeação em lote', description: 'Arraste vários arquivos. O Zush analisa e renomeia tudo em segundos.' },
      customPatterns: { title: 'Padrões personalizados', description: 'Defina padrões com variáveis como {title}, {original}, {date}, {time} ou {category}.' },
      smartMetadata: { title: 'Metadados inteligentes', description: 'Adicione tags do Finder e metadados do Spotlight automaticamente para encontrar arquivos mais rápido.' },
      renameHistory: { title: 'Histórico de renomeações', description: 'Acompanhe cada alteração e restaure o nome original com um clique.' },
      customPrompts: { title: 'Prompts de IA personalizados', description: 'Crie regras de nomes, tags e metadados para adaptar a IA ao seu fluxo.' },
      byok: { title: 'Use sua própria chave', description: 'Conecte Gemini, Groq, OpenAI ou Claude para renomeações ilimitadas. As chaves ficam salvas localmente.' },
      offlineAi: { title: 'Modo IA offline', description: 'Modelos locais privados via Ollama. Processe arquivos compatíveis sem enviar conteúdo para a nuvem.' },
      addFolder: 'Adicionar pasta', promptRules: 'Regras do prompt', customBadge: 'Personalizado', apiKeyConnected: 'Chave API conectada', terminal: 'Terminal', localModelReady: 'Modelo local pronto', today: 'Hoje', undo: 'Desfazer',
    },
    videos: { title: 'Veja o Zush em ação', titleAccent: 'Zush', description: 'Veja como o Zush organiza arquivos em fluxos reais', playDemo: 'Reproduzir demo', switchTo: 'Alternar para', items: { 'batch-rename': { title: 'Renomeação em lote', description: 'Renomeie vários arquivos de uma vez com IA' }, monitor: { title: 'Monitoramento de pastas', description: 'Renomeie automaticamente novos arquivos' }, tags: { title: 'Tags inteligentes', description: 'Gere tags para encontrar arquivos mais rápido' }, naming: { title: 'Padrões de nomes', description: 'Crie padrões reutilizáveis com variáveis flexíveis' }, multilanguage: { title: 'Multilíngue', description: 'Gere nomes em mais de 60 idiomas' }, 'custom-prompts': { title: 'Prompts personalizados', description: 'Guie a geração com suas próprias instruções' }, byok: { title: 'BYOK', description: 'Conecte seu provedor de IA para renomeação ilimitada' }, 'offline-ai': { title: 'Modo IA offline', description: 'Processe arquivos offline com modelos locais via Ollama' }, activity: { title: 'Histórico de atividade', description: 'Revise renomeações recentes e desfaça alterações' } } },
    whyZush: { title: 'Por que o Zush combina com trabalho real no desktop', titlePlatform: 'Por que o Zush vence no {os}', description: 'Preço único, sensação nativa, renomeação rápida e menos decisões chatas', descriptionPlatform: 'Sensação nativa, renomeação rápida, preço único e menos decisões no {os}', nativeEyebrow: 'Sensação nativa de desktop', nativeEyebrowPlatform: 'Sensação nativa do {os}', nativeTitle: 'Nativo, rápido e moderno', nativeDescription: 'O Zush parece um app desktop de verdade: abre rápido, é limpo de usar e combina com seu sistema.', nativeDescriptionPlatform: 'O Zush parece um app nativo de {os}: abre rápido, é limpo de usar e combina com seu sistema.', pricingTrustItems: ['✨ Teste grátis', '🚫 Sem assinatura', '↩️ Reembolso em 14 dias'], priceEyebrow: 'Preço único justo', priceTitle: 'Pague uma vez, mantenha o fluxo', priceDescription: 'O Zush é simples: teste grátis e depois uma pequena compra única quando ele for útil.', priceLabel: 'único', speedEyebrow: 'Muito rápido', speedTitle: 'Renomeações em segundos', speedDescription: 'Organização só funciona quando não interrompe o trabalho. Solte arquivos, revise, aplique e continue.', formatsEyebrow: 'Suporte a fotos profissionais', formatsTitle: 'Suporte RAW nativo para fotógrafos', formatsDescription: 'Compatível com CR2, NEF, ARW, DNG, RAF, RW2 e mais para renomear importações pelo conteúdo real.', controlEyebrow: 'Automação de baixo risco', controlTitle: 'Lote, monitoramento e desfazer', controlDescription: 'Limpe arquivos antigos em lote, mantenha novas pastas legíveis e reverta pelo histórico.', workflowSteps: ['Lotes antigos', 'Monitorar novas pastas', 'Reverter pelo histórico'] },
    useCases: { items: [{ title: 'Designers', description: 'Encontre mockups, elementos UI e referências em segundos sem procurar em centenas de screenshots.' }, { title: 'Fotógrafos', description: 'Organize grandes bibliotecas de fotos com suporte a RAW: CR2, NEF, ARW, DNG, RAF e RW2.' }, { title: 'Marketing & SMM', description: 'Mantenha decks, exports, screenshots e assets de campanha organizados e fáceis de encontrar.' }, { title: 'Desenvolvedores', description: 'Screenshots para docs, bugs e PRs ficam organizados e fáceis de buscar.' }, { title: 'Criadores de conteúdo', description: 'Thumbnails, referências de b-roll e assets visuais ficam bem organizados.' }, { title: 'Product managers', description: 'PRDs, notas de reunião, planilhas e decks ficam pesquisáveis instantaneamente.' }] },
    faqItems: [{ question: 'O que é o Zush?', answer: 'Zush é um app desktop com IA para Mac e Windows que renomeia arquivos automaticamente pelo conteúdo.' }, { question: 'Quais formatos são compatíveis?', answer: 'Zush suporta imagens, screenshots, PDFs, documentos, planilhas, apresentações, textos, CSV e mais.' }, { question: 'Posso desfazer uma renomeação?', answer: 'Sim. O Zush mantém histórico para restaurar nomes originais com um clique.' }, { question: 'O Zush funciona offline?', answer: 'O modo cloud precisa de internet. Usuários PRO podem usar IA offline com modelos locais via Ollama.' }, { question: 'Como funciona o preço?', answer: 'Zush PRO é uma compra única, sem assinatura nem mensalidades ocultas.' }],
  },
  es: {
    featureCards: {
      aiAnalysis: { title: 'Análisis con IA', description: 'La IA analiza imágenes y documentos compatibles, incluidos PDFs, para generar nombres útiles automáticamente.' },
      foldersMonitoring: { title: 'Monitoreo de carpetas', description: 'Monitorea una o varias carpetas. Zush procesa archivos nuevos automáticamente en segundo plano.' },
      batchRename: { title: 'Renombrado por lotes', description: 'Arrastra varios archivos. Zush los analiza y renombra en segundos.' },
      customPatterns: { title: 'Patrones personalizados', description: 'Define patrones con variables como {title}, {original}, {date}, {time} o {category}.' },
      smartMetadata: { title: 'Metadatos inteligentes', description: 'Agrega tags de Finder y metadatos de Spotlight automáticamente para encontrar archivos más rápido.' },
      renameHistory: { title: 'Historial de renombrados', description: 'Sigue cada cambio y restaura el nombre original con un clic.' },
      customPrompts: { title: 'Prompts de IA personalizados', description: 'Define reglas de nombres, tags y metadatos para adaptar la IA a tu flujo.' },
      byok: { title: 'Trae tu propia clave', description: 'Conecta Gemini, Groq, OpenAI o Claude para renombrados cloud ilimitados. Las claves se guardan localmente.' },
      offlineAi: { title: 'Modo IA offline', description: 'Modelos locales privados vía Ollama. Procesa archivos compatibles sin enviar contenido a la nube.' },
      addFolder: 'Añadir carpeta', promptRules: 'Reglas del prompt', customBadge: 'Personalizado', apiKeyConnected: 'Clave API conectada', terminal: 'Terminal', localModelReady: 'Modelo local listo', today: 'Hoy', undo: 'Deshacer',
    },
    videos: { title: 'Mira Zush en acción', titleAccent: 'Zush', description: 'Mira cómo Zush organiza archivos en flujos reales', playDemo: 'Reproducir demo', switchTo: 'Cambiar a', items: { 'batch-rename': { title: 'Renombrado por lotes', description: 'Renombra varios archivos a la vez con IA' }, monitor: { title: 'Monitoreo de carpetas', description: 'Renombra automáticamente archivos nuevos' }, tags: { title: 'Tags inteligentes', description: 'Genera tags para buscar archivos más rápido' }, naming: { title: 'Patrones de nombres', description: 'Crea patrones reutilizables con variables flexibles' }, multilanguage: { title: 'Multilingüe', description: 'Genera nombres en más de 60 idiomas' }, 'custom-prompts': { title: 'Prompts personalizados', description: 'Guía la generación con tus propias instrucciones' }, byok: { title: 'BYOK', description: 'Conecta tu proveedor de IA para renombrado ilimitado' }, 'offline-ai': { title: 'Modo IA offline', description: 'Procesa archivos offline con modelos locales vía Ollama' }, activity: { title: 'Historial de actividad', description: 'Revisa renombrados recientes y deshaz cambios' } } },
    whyZush: { title: 'Por qué Zush encaja con el trabajo real de escritorio', titlePlatform: 'Por qué Zush gana en {os}', description: 'Precio único, sensación nativa, renombrado rápido y menos decisiones molestas', descriptionPlatform: 'Sensación nativa, renombrado rápido, precio único y menos decisiones en {os}', nativeEyebrow: 'Sensación nativa de escritorio', nativeEyebrowPlatform: 'Sensación nativa de {os}', nativeTitle: 'Nativo, rápido y moderno', nativeDescription: 'Zush se siente como una app de escritorio real: rápida, limpia y coherente con tu sistema.', nativeDescriptionPlatform: 'Zush se siente como una app nativa de {os}: rápida, limpia y coherente con tu sistema.', pricingTrustItems: ['✨ Prueba gratis', '🚫 Sin suscripción', '↩️ Reembolso 14 días'], priceEyebrow: 'Precio único justo', priceTitle: 'Paga una vez, conserva el flujo', priceDescription: 'Zush es simple: prueba gratis y luego una pequeña compra única cuando te resulte útil.', priceLabel: 'una vez', speedEyebrow: 'Muy rápido', speedTitle: 'Renombrados en segundos', speedDescription: 'Ordenar solo funciona si no interrumpe el trabajo. Suelta archivos, revisa, aplica y sigue.', formatsEyebrow: 'Soporte foto pro', formatsTitle: 'Soporte RAW nativo para fotógrafos', formatsDescription: 'Compatible con CR2, NEF, ARW, DNG, RAF, RW2 y más para renombrar importaciones por su contenido real.', controlEyebrow: 'Automatización de bajo riesgo', controlTitle: 'Lote, monitoreo y deshacer', controlDescription: 'Limpia archivos antiguos en lote, mantiene carpetas nuevas legibles y revierte desde el historial.', workflowSteps: ['Lotes antiguos', 'Monitorear carpetas', 'Revertir desde historial'] },
    useCases: { items: [{ title: 'Diseñadores', description: 'Encuentra mockups, elementos UI y referencias en segundos sin buscar entre cientos de capturas.' }, { title: 'Fotógrafos', description: 'Organiza grandes bibliotecas de fotos con soporte RAW: CR2, NEF, ARW, DNG, RAF y RW2.' }, { title: 'Marketing & SMM', description: 'Mantén decks, exports, capturas y assets de campaña organizados y fáciles de encontrar.' }, { title: 'Desarrolladores', description: 'Capturas para docs, bugs y PRs quedan organizadas y fáciles de buscar.' }, { title: 'Creadores de contenido', description: 'Miniaturas, referencias b-roll y assets visuales quedan ordenados.' }, { title: 'Product managers', description: 'PRDs, notas, hojas de cálculo y decks se vuelven buscables al instante.' }] },
    faqItems: [{ question: '¿Qué es Zush?', answer: 'Zush es una app de escritorio con IA para Mac y Windows que renombra archivos automáticamente según su contenido.' }, { question: '¿Qué formatos son compatibles?', answer: 'Zush admite imágenes, capturas, PDFs, documentos, hojas de cálculo, presentaciones, texto, CSV y más.' }, { question: '¿Puedo deshacer un renombrado?', answer: 'Sí. Zush guarda historial para restaurar nombres originales con un clic.' }, { question: '¿Zush funciona offline?', answer: 'El modo cloud requiere internet. Usuarios PRO pueden usar IA offline con modelos locales vía Ollama.' }, { question: '¿Cómo funciona el precio?', answer: 'Zush PRO es una compra única, sin suscripciones ni cargos mensuales ocultos.' }],
  },
  nl: {
    featureCards: {
      aiAnalysis: { title: 'AI-analyse', description: 'AI analyseert afbeeldingen en ondersteunde documenten, inclusief PDFs, en maakt automatisch betekenisvolle bestandsnamen.' },
      foldersMonitoring: { title: 'Mapbewaking', description: 'Bewaak een of meerdere mappen. Zush verwerkt nieuwe bestanden automatisch op de achtergrond.' },
      batchRename: { title: 'Bulk hernoemen', description: 'Sleep meerdere bestanden tegelijk. Zush analyseert en hernoemt ze in seconden.' },
      customPatterns: { title: 'Eigen patronen', description: 'Stel eigen naamgevingspatronen in met variabelen zoals {title}, {original}, {date}, {time} of {category}.' },
      smartMetadata: { title: 'Slimme metadata', description: 'Voeg automatisch Finder-tags en Spotlight-metadata toe zodat bestanden snel vindbaar zijn.' },
      renameHistory: { title: 'Hernoemgeschiedenis', description: 'Volg elke wijziging en zet met één klik de originele bestandsnaam terug.' },
      customPrompts: { title: 'Eigen AI-prompts', description: 'Stel regels in voor namen, tags en metadata zodat AI je workflow volgt.' },
      byok: { title: 'Eigen sleutel gebruiken', description: 'Koppel Gemini, Groq, OpenAI of Claude voor onbeperkt cloud-hernoemen. Sleutels blijven lokaal opgeslagen.' },
      offlineAi: { title: 'Offline AI-modus', description: 'Private lokale modellen via Ollama. Verwerk ondersteunde bestanden zonder inhoud naar de cloud te sturen.' },
      addFolder: 'Map toevoegen', promptRules: 'Promptregels', customBadge: 'Eigen', apiKeyConnected: 'API-sleutel gekoppeld', terminal: 'Terminal', localModelReady: 'Lokaal model klaar', today: 'Vandaag', undo: 'Ongedaan maken',
    },
    videos: { title: 'Zie Zush in actie', titleAccent: 'Zush', description: 'Bekijk hoe Zush echte bestandsorganisatie afhandelt', playDemo: 'Demo afspelen', switchTo: 'Wissel naar', items: { 'batch-rename': { title: 'Bulk hernoemen', description: 'Hernoem meerdere bestanden tegelijk met AI' }, monitor: { title: 'Mapbewaking', description: 'Hernoem nieuwe bestanden automatisch' }, tags: { title: 'Slimme tags', description: 'Genereer tags voor sneller zoeken' }, naming: { title: 'Naampatronen', description: 'Maak herbruikbare patronen met flexibele variabelen' }, multilanguage: { title: 'Meertalig', description: 'Genereer namen in meer dan 60 talen' }, 'custom-prompts': { title: 'Eigen prompts', description: 'Stuur naamgeneratie met eigen instructies' }, byok: { title: 'BYOK', description: 'Koppel je AI-provider voor onbeperkt hernoemen' }, 'offline-ai': { title: 'Offline AI-modus', description: 'Verwerk bestanden offline met lokale Ollama-modellen' }, activity: { title: 'Activiteitsgeschiedenis', description: 'Bekijk recente hernoemingen en draai wijzigingen terug' } } },
    whyZush: { title: 'Waarom Zush past bij echt desktopwerk', titlePlatform: 'Waarom Zush wint op {os}', description: 'Eenmalige prijs, native desktopgevoel, snel hernoemen en minder keuzes', descriptionPlatform: 'Native gevoel, snel hernoemen, eenmalige prijs en minder keuzes op {os}', nativeEyebrow: 'Desktop-native gevoel', nativeEyebrowPlatform: '{os}-native gevoel', nativeTitle: 'Native, snel en modern', nativeDescription: 'Zush voelt als een echte desktopapp: snel open, schoon in gebruik en passend bij je systeem.', nativeDescriptionPlatform: 'Zush voelt als een echte native {os}-app: snel open, schoon in gebruik en passend bij je systeem.', pricingTrustItems: ['✨ Gratis proberen', '🚫 Geen abonnement', '↩️ 14 dagen terugbetaling'], priceEyebrow: 'Eerlijke eenmalige prijs', priceTitle: 'Betaal één keer, behoud je workflow', priceDescription: 'Zush blijft simpel: gratis proberen en daarna één kleine aankoop wanneer het nuttig is.', priceLabel: 'eenmalig', speedEyebrow: 'Supersnel', speedTitle: 'Hernoemen in seconden', speedDescription: 'Opruimen werkt alleen als het je werk niet stoort. Sleep bestanden, controleer, pas toe en ga door.', formatsEyebrow: 'Pro-foto ondersteuning', formatsTitle: 'Native RAW-ondersteuning voor fotografen', formatsDescription: 'Ondersteunt CR2, NEF, ARW, DNG, RAF, RW2 en meer om imports te hernoemen op basis van echte inhoud.', controlEyebrow: 'Lage-risico automatisering', controlTitle: 'Bulk, bewaking en herstel', controlDescription: 'Ruim oude stapels op, houd nieuwe mappen leesbaar en herstel vanuit de geschiedenis.', workflowSteps: ['Oude stapels', 'Nieuwe mappen bewaken', 'Uit geschiedenis herstellen'] },
    useCases: { items: [{ title: 'Designers', description: 'Vind mockups, UI-elementen en referenties in seconden zonder honderden screenshots door te zoeken.' }, { title: 'Fotografen', description: 'Organiseer grote fotobibliotheken met RAW-ondersteuning: CR2, NEF, ARW, DNG, RAF en RW2.' }, { title: 'Marketing & SMM', description: 'Houd campagnedecks, exports, screenshots en assets georganiseerd en vindbaar.' }, { title: 'Ontwikkelaars', description: 'Screenshots voor docs, bugs en PR-reviews blijven georganiseerd en doorzoekbaar.' }, { title: 'Contentmakers', description: 'Thumbnails, b-roll referenties en visuele assets blijven netjes georganiseerd.' }, { title: 'Productmanagers', description: 'PRDs, notities, spreadsheets en decks worden direct doorzoekbaar.' }] },
    faqItems: [{ question: 'Wat is Zush?', answer: 'Zush is een AI-desktopapp voor Mac en Windows die bestanden automatisch hernoemt op basis van inhoud.' }, { question: 'Welke formaten worden ondersteund?', answer: 'Zush ondersteunt afbeeldingen, screenshots, PDFs, documenten, spreadsheets, presentaties, tekstbestanden, CSV en meer.' }, { question: 'Kan ik een hernoeming ongedaan maken?', answer: 'Ja. Zush bewaart geschiedenis zodat je originele namen met één klik kunt herstellen.' }, { question: 'Werkt Zush offline?', answer: 'Cloudverwerking vereist internet. PRO-gebruikers kunnen Offline AI gebruiken met lokale Ollama-modellen.' }, { question: 'Hoe werkt de prijs?', answer: 'Zush PRO is een eenmalige aankoop zonder abonnement of verborgen maandkosten.' }],
  },
  it: {
    featureCards: {
      aiAnalysis: { title: 'Analisi IA', description: 'L’IA analizza immagini e documenti supportati, inclusi i PDF, per generare automaticamente nomi descrittivi.' },
      foldersMonitoring: { title: 'Monitoraggio cartelle', description: 'Monitora una o più cartelle. Zush elabora automaticamente i nuovi file in background.' },
      batchRename: { title: 'Rinomina in batch', description: 'Trascina più file. Zush li analizza e li rinomina in pochi secondi.' },
      customPatterns: { title: 'Pattern personalizzati', description: 'Imposta pattern con variabili come {title}, {original}, {date}, {time} o {category}.' },
      smartMetadata: { title: 'Metadati intelligenti', description: 'Aggiungi automaticamente tag Finder e metadati Spotlight per trovare subito i file.' },
      renameHistory: { title: 'Cronologia rinomine', description: 'Tieni traccia di ogni modifica e ripristina il nome originale con un clic.' },
      customPrompts: { title: 'Prompt IA personalizzati', description: 'Definisci regole per nomi, tag e metadati, così l’IA segue il tuo flusso.' },
      byok: { title: 'Usa la tua chiave', description: 'Collega Gemini, Groq, OpenAI o Claude per rinomine cloud illimitate. Le chiavi restano locali.' },
      offlineAi: { title: 'Modalità IA offline', description: 'Modelli locali privati via Ollama. Elabora file supportati senza inviare contenuti al cloud.' },
      addFolder: 'Aggiungi cartella', promptRules: 'Regole prompt', customBadge: 'Personalizzato', apiKeyConnected: 'Chiave API collegata', terminal: 'Terminale', localModelReady: 'Modello locale pronto', today: 'Oggi', undo: 'Annulla',
    },
    videos: { title: 'Guarda Zush in azione', titleAccent: 'Zush', description: 'Scopri come Zush gestisce workflow reali di organizzazione file', playDemo: 'Riproduci demo', switchTo: 'Passa a', items: { 'batch-rename': { title: 'Rinomina in batch', description: 'Rinomina più file insieme con l’IA' }, monitor: { title: 'Monitoraggio cartelle', description: 'Rinomina automaticamente i nuovi file' }, tags: { title: 'Tag intelligenti', description: 'Genera tag per cercare i file più velocemente' }, naming: { title: 'Pattern di nomi', description: 'Crea pattern riutilizzabili con variabili flessibili' }, multilanguage: { title: 'Multilingua', description: 'Genera nomi in oltre 60 lingue' }, 'custom-prompts': { title: 'Prompt personalizzati', description: 'Guida la generazione con le tue istruzioni' }, byok: { title: 'BYOK', description: 'Collega il tuo provider IA per rinomine illimitate' }, 'offline-ai': { title: 'Modalità IA offline', description: 'Elabora file offline con modelli locali via Ollama' }, activity: { title: 'Cronologia attività', description: 'Controlla le rinomine recenti e annulla le modifiche' } } },
    whyZush: { title: 'Perché Zush si adatta al vero lavoro desktop', titlePlatform: 'Perché Zush vince su {os}', description: 'Prezzo unico, sensazione nativa, rinomina veloce e meno decisioni fastidiose', descriptionPlatform: 'Sensazione nativa, rinomina veloce, prezzo unico e meno decisioni su {os}', nativeEyebrow: 'Sensazione desktop nativa', nativeEyebrowPlatform: 'Sensazione nativa {os}', nativeTitle: 'Nativo, veloce e moderno', nativeDescription: 'Zush sembra una vera app desktop: veloce da aprire, pulita da usare e coerente con il sistema.', nativeDescriptionPlatform: 'Zush sembra una vera app nativa {os}: veloce da aprire, pulita da usare e coerente con il sistema.', pricingTrustItems: ['✨ Prova gratis', '🚫 Nessun abbonamento', '↩️ Rimborso 14 giorni'], priceEyebrow: 'Prezzo unico equo', priceTitle: 'Paga una volta, conserva il workflow', priceDescription: 'Zush resta semplice: prova gratis e poi un piccolo acquisto unico quando ti è utile.', priceLabel: 'una tantum', speedEyebrow: 'Velocissimo', speedTitle: 'Rinomine in pochi secondi', speedDescription: 'L’ordine funziona solo se non interrompe il lavoro. Trascina, controlla, applica e continua.', formatsEyebrow: 'Supporto foto pro', formatsTitle: 'Supporto RAW nativo per fotografi', formatsDescription: 'Supporta CR2, NEF, ARW, DNG, RAF, RW2 e altri formati per rinominare gli import in base al contenuto reale.', controlEyebrow: 'Automazione a basso rischio', controlTitle: 'Batch, monitoraggio e annulla', controlDescription: 'Pulisci vecchi gruppi, mantieni leggibili le nuove cartelle e ripristina dalla cronologia.', workflowSteps: ['Vecchi gruppi', 'Monitorare cartelle', 'Ripristinare dalla cronologia'] },
    useCases: { items: [{ title: 'Designer', description: 'Trova mockup, elementi UI e riferimenti in pochi secondi senza cercare tra centinaia di screenshot.' }, { title: 'Fotografi', description: 'Organizza grandi librerie fotografiche con supporto RAW: CR2, NEF, ARW, DNG, RAF e RW2.' }, { title: 'Marketing & SMM', description: 'Mantieni deck, export, screenshot e asset di campagna organizzati e facili da trovare.' }, { title: 'Sviluppatori', description: 'Screenshot per documentazione, bug e PR restano ordinati e facili da cercare.' }, { title: 'Creator', description: 'Thumbnail, riferimenti b-roll e asset visivi restano organizzati.' }, { title: 'Product manager', description: 'PRD, note riunioni, fogli e deck diventano subito ricercabili.' }] },
    faqItems: [{ question: 'Che cos’è Zush?', answer: 'Zush è un’app desktop IA per Mac e Windows che rinomina automaticamente i file in base al contenuto.' }, { question: 'Quali formati supporta?', answer: 'Zush supporta immagini, screenshot, PDF, documenti, fogli, presentazioni, file di testo, CSV e altro.' }, { question: 'Posso annullare una rinomina?', answer: 'Sì. Zush conserva la cronologia per ripristinare i nomi originali con un clic.' }, { question: 'Zush funziona offline?', answer: 'Il cloud richiede internet. Gli utenti PRO possono usare IA offline con modelli locali via Ollama.' }, { question: 'Come funziona il prezzo?', answer: 'Zush PRO è un acquisto unico, senza abbonamenti né costi mensili nascosti.' }],
  },
  ja: {
    featureCards: {
      aiAnalysis: { title: 'AI 解析', description: 'AI が画像や PDF を含む対応文書を解析し、意味のあるファイル名を自動生成します。' },
      foldersMonitoring: { title: 'フォルダ監視', description: '1つ以上のフォルダを監視し、新しいファイルをバックグラウンドで自動処理します。' },
      batchRename: { title: '一括リネーム', description: '複数ファイルをドラッグ＆ドロップするだけで、Zush が数秒で解析して名前を変更します。' },
      customPatterns: { title: 'カスタムパターン', description: '{title}、{original}、{date}、{time}、{category} などの変数で独自の命名ルールを作れます。' },
      smartMetadata: { title: 'スマートメタデータ', description: 'Finder タグや Spotlight メタデータを自動追加し、自然な検索ですぐに見つけられます。' },
      renameHistory: { title: 'リネーム履歴', description: 'すべての変更を記録し、必要ならワンクリックで元の名前に戻せます。' },
      customPrompts: { title: 'カスタム AI プロンプト', description: '名前、タグ、メタデータのルールを設定し、AI の出力を自分のワークフローに合わせます。' },
      byok: { title: '自分のキーを使用', description: 'Gemini、Groq、OpenAI、Claude を接続して無制限にクラウドリネーム。キーはローカルに安全保存されます。' },
      offlineAi: { title: 'オフライン AI モード', description: 'Ollama 経由のプライベートなローカルモデルで、対応ファイルをクラウドに送らず処理できます。' },
      addFolder: 'フォルダを追加', promptRules: 'プロンプトルール', customBadge: 'カスタム', apiKeyConnected: 'APIキー接続済み', terminal: 'ターミナル', localModelReady: 'ローカルモデル準備完了', today: '今日', undo: '元に戻す',
    },
    videos: { title: 'Zush の動作を見る', titleAccent: 'Zush', description: 'Zush が実際のファイル整理ワークフローをどう処理するかをご覧ください', playDemo: 'デモを再生', switchTo: '切り替え:', items: { 'batch-rename': { title: '一括リネーム', description: '複数ファイルを AI で一度にリネーム' }, monitor: { title: 'フォルダ監視', description: '新しいファイルを自動でリネーム' }, tags: { title: 'スマートタグ', description: '検索しやすいタグを生成' }, naming: { title: '命名パターン', description: '柔軟な変数で再利用可能なパターンを作成' }, multilanguage: { title: '多言語対応', description: '60以上の言語でファイル名を生成' }, 'custom-prompts': { title: 'カスタムプロンプト', description: '独自の指示で名前生成を調整' }, byok: { title: 'BYOK', description: '自分の AI プロバイダーで無制限リネーム' }, 'offline-ai': { title: 'オフライン AI モード', description: 'Ollama のローカルモデルでオフライン処理' }, activity: { title: 'アクティビティ履歴', description: '最近のリネームを確認し、必要なら元に戻す' } } },
    whyZush: { title: 'Zush が実際のデスクトップ作業に合う理由', titlePlatform: '{os} で Zush が選ばれる理由', description: '買い切り価格、ネイティブ感、速いリネーム、迷いの少ない操作', descriptionPlatform: '{os} でのネイティブ感、速いリネーム、買い切り価格、迷いの少ない操作', nativeEyebrow: 'デスクトップネイティブ', nativeEyebrowPlatform: '{os} ネイティブ', nativeTitle: 'ネイティブ、高速、モダン', nativeDescription: 'Zush は本物のデスクトップアプリのように、すぐ開けて、使いやすく、OS に自然になじみます。', nativeDescriptionPlatform: 'Zush は本物の {os} ネイティブアプリのように、すぐ開けて、使いやすく、OS に自然になじみます。', pricingTrustItems: ['✨ 無料で試せる', '🚫 サブスクなし', '↩️ 14日返金'], priceEyebrow: '公平な買い切り価格', priceTitle: '一度払えばワークフローはそのまま', priceDescription: 'Zush はシンプルです。無料で試し、役に立つと分かったら小さな買い切り購入だけ。', priceLabel: '買い切り', speedEyebrow: '超高速', speedTitle: 'リネームは数秒で完了', speedDescription: '整理は作業を止めないことが大切です。ファイルを入れ、確認し、適用して次へ進めます。', formatsEyebrow: 'プロ写真対応', formatsTitle: '写真家向け RAW ネイティブ対応', formatsDescription: 'CR2、NEF、ARW、DNG、RAF、RW2 などをサポートし、写真の内容に基づいて名前を付けられます。', controlEyebrow: '低リスク自動化', controlTitle: '一括、監視、取り消し', controlDescription: '古いファイルを一括整理し、新しいフォルダを読みやすく保ち、履歴から戻せます。', workflowSteps: ['古いファイルを一括整理', '新しいフォルダを監視', '履歴から復元'] },
    useCases: { items: [{ title: 'デザイナー', description: '大量のスクリーンショットから探さず、モックアップや UI 要素、参考資料を数秒で見つけられます。' }, { title: '写真家', description: 'CR2、NEF、ARW、DNG、RAF、RW2 などの RAW 形式に対応し、大量の写真を整理できます。' }, { title: 'マーケター・SNS担当', description: 'キャンペーン資料、書き出し、スクリーンショット、素材を整理してすぐ見つけられます。' }, { title: '開発者', description: 'ドキュメント、バグ報告、PR レビュー用のスクリーンショットを整理できます。' }, { title: 'コンテンツ制作者', description: 'サムネイル、Bロール参考、ビジュアル素材をきれいに整理できます。' }, { title: 'プロダクトマネージャー', description: 'PRD、議事録、表計算、資料をすぐ検索できる状態にします。' }] },
    faqItems: [{ question: 'Zush とは？', answer: 'Zush は Mac と Windows 向けの AI デスクトップアプリで、内容に基づいてファイル名を自動変更します。' }, { question: '対応形式は？', answer: '画像、スクリーンショット、PDF、文書、表計算、プレゼン、テキスト、CSV などに対応しています。' }, { question: 'リネームを戻せますか？', answer: 'はい。履歴から元のファイル名をワンクリックで復元できます。' }, { question: 'オフラインで使えますか？', answer: 'クラウド処理にはネット接続が必要です。PRO では Ollama のローカルモデルでオフライン AI を使えます。' }, { question: '料金は？', answer: 'Zush PRO は買い切りです。サブスクや隠れた月額料金はありません。' }],
  },
  ko: {
    featureCards: {
      aiAnalysis: { title: 'AI 분석', description: 'AI가 이미지와 PDF를 포함한 지원 문서를 분석해 의미 있는 파일 이름을 자동 생성합니다.' },
      foldersMonitoring: { title: '폴더 모니터링', description: '하나 이상의 폴더를 감시하고 새 파일을 백그라운드에서 자동 처리합니다.' },
      batchRename: { title: '일괄 이름 변경', description: '여러 파일을 끌어다 놓으면 Zush가 몇 초 만에 분석하고 이름을 변경합니다.' },
      customPatterns: { title: '사용자 지정 패턴', description: '{title}, {original}, {date}, {time}, {category} 같은 변수로 이름 규칙을 만들 수 있습니다.' },
      smartMetadata: { title: '스마트 메타데이터', description: 'Finder 태그와 Spotlight 메타데이터를 자동 추가해 파일을 더 빨리 찾을 수 있습니다.' },
      renameHistory: { title: '이름 변경 기록', description: '모든 변경을 기록하고 클릭 한 번으로 원래 이름을 복원할 수 있습니다.' },
      customPrompts: { title: '사용자 지정 AI 프롬프트', description: '이름, 태그, 메타데이터 규칙을 설정해 AI 결과를 작업 방식에 맞춥니다.' },
      byok: { title: '내 키 가져오기', description: 'Gemini, Groq, OpenAI, Claude를 연결해 무제한 클라우드 이름 변경을 사용합니다. 키는 로컬에 저장됩니다.' },
      offlineAi: { title: '오프라인 AI 모드', description: 'Ollama를 통한 개인 로컬 모델로 지원 파일을 클라우드 전송 없이 처리합니다.' },
      addFolder: '폴더 추가', promptRules: '프롬프트 규칙', customBadge: '사용자 지정', apiKeyConnected: 'API 키 연결됨', terminal: '터미널', localModelReady: '로컬 모델 준비됨', today: '오늘', undo: '되돌리기',
    },
    videos: { title: 'Zush 작동 보기', titleAccent: 'Zush', description: 'Zush가 실제 파일 정리 흐름을 어떻게 처리하는지 확인하세요', playDemo: '데모 재생', switchTo: '전환:', items: { 'batch-rename': { title: '일괄 이름 변경', description: '여러 파일을 AI로 한 번에 변경' }, monitor: { title: '폴더 모니터링', description: '새 파일을 자동으로 이름 변경' }, tags: { title: '스마트 태그', description: '빠른 검색을 위한 태그 생성' }, naming: { title: '이름 패턴', description: '유연한 변수로 재사용 가능한 패턴 생성' }, multilanguage: { title: '다국어', description: '60개 이상 언어로 파일 이름 생성' }, 'custom-prompts': { title: '사용자 지정 프롬프트', description: '직접 작성한 지침으로 이름 생성 제어' }, byok: { title: 'BYOK', description: '내 AI 제공자를 연결해 무제한 이름 변경' }, 'offline-ai': { title: '오프라인 AI 모드', description: 'Ollama 로컬 모델로 오프라인 처리' }, activity: { title: '활동 기록', description: '최근 이름 변경을 확인하고 되돌리기' } } },
    whyZush: { title: 'Zush가 실제 데스크톱 작업에 맞는 이유', titlePlatform: '{os}에서 Zush가 강한 이유', description: '일회성 가격, 네이티브 느낌, 빠른 이름 변경, 줄어든 결정 피로', descriptionPlatform: '{os}에서 네이티브 느낌, 빠른 이름 변경, 일회성 가격, 줄어든 결정 피로', nativeEyebrow: '데스크톱 네이티브 느낌', nativeEyebrowPlatform: '{os} 네이티브 느낌', nativeTitle: '네이티브, 빠름, 모던함', nativeDescription: 'Zush는 빠르게 열리고 깔끔하게 사용할 수 있으며 시스템에 자연스럽게 어울리는 진짜 데스크톱 앱처럼 느껴집니다.', nativeDescriptionPlatform: 'Zush는 빠르게 열리고 깔끔하게 사용할 수 있으며 {os}에 자연스럽게 어울리는 진짜 네이티브 앱처럼 느껴집니다.', pricingTrustItems: ['✨ 무료 체험', '🚫 구독 없음', '↩️ 14일 환불'], priceEyebrow: '공정한 일회성 가격', priceTitle: '한 번 결제하고 워크플로 유지', priceDescription: 'Zush는 단순합니다. 무료로 사용해 보고 유용할 때 작은 일회성 구매만 하면 됩니다.', priceLabel: '일회성', speedEyebrow: '매우 빠름', speedTitle: '몇 초 만에 이름 변경', speedDescription: '정리는 작업을 방해하지 않을 때 지속됩니다. 파일을 넣고, 확인하고, 적용하고, 계속하세요.', formatsEyebrow: '전문 사진 지원', formatsTitle: '사진가를 위한 RAW 네이티브 지원', formatsDescription: 'CR2, NEF, ARW, DNG, RAF, RW2 등을 지원해 실제 이미지 내용으로 가져온 파일을 이름 변경합니다.', controlEyebrow: '낮은 위험의 자동화', controlTitle: '일괄, 모니터링, 되돌리기', controlDescription: '오래된 파일 묶음을 정리하고 새 폴더를 읽기 좋게 유지하며 기록에서 되돌릴 수 있습니다.', workflowSteps: ['오래된 묶음 정리', '새 폴더 모니터링', '기록에서 복원'] },
    useCases: { items: [{ title: '디자이너', description: '수백 장의 스크린샷을 뒤지지 않고 목업, UI 요소, 레퍼런스를 몇 초 만에 찾습니다.' }, { title: '사진가', description: 'CR2, NEF, ARW, DNG, RAF, RW2 등 RAW 형식을 지원해 대형 사진 라이브러리를 정리합니다.' }, { title: '마케팅 & SMM', description: '캠페인 덱, 내보낸 파일, 스크린샷, 자산을 정리하고 빠르게 찾습니다.' }, { title: '개발자', description: '문서, 버그 리포트, PR 리뷰용 스크린샷을 정리하고 쉽게 검색합니다.' }, { title: '콘텐츠 크리에이터', description: '썸네일, b-roll 레퍼런스, 시각 자산을 깔끔하게 정리합니다.' }, { title: '프로덕트 매니저', description: 'PRD, 회의 노트, 스프레드시트, 덱을 즉시 검색 가능하게 만듭니다.' }] },
    faqItems: [{ question: 'Zush란 무엇인가요?', answer: 'Zush는 Mac 및 Windows용 AI 데스크톱 앱으로, 파일 내용을 기반으로 이름을 자동 변경합니다.' }, { question: '어떤 형식을 지원하나요?', answer: '이미지, 스크린샷, PDF, 문서, 스프레드시트, 프레젠테이션, 텍스트, CSV 등을 지원합니다.' }, { question: '이름 변경을 되돌릴 수 있나요?', answer: '예. 기록에서 원래 파일 이름을 클릭 한 번으로 복원할 수 있습니다.' }, { question: '오프라인으로 작동하나요?', answer: '클라우드 처리는 인터넷이 필요합니다. PRO 사용자는 Ollama 로컬 모델로 오프라인 AI를 사용할 수 있습니다.' }, { question: '가격은 어떻게 되나요?', answer: 'Zush PRO는 일회성 구매이며 구독이나 숨겨진 월 요금이 없습니다.' }],
  },
  hi: {
    featureCards: {
      aiAnalysis: { title: 'AI विश्लेषण', description: 'उन्नत AI इमेज और PDF सहित समर्थित दस्तावेज़ों का विश्लेषण करके उपयोगी फ़ाइल नाम अपने-आप बनाता है।' },
      foldersMonitoring: { title: 'फ़ोल्डर निगरानी', description: 'एक या कई फ़ोल्डर देखें। Zush बैकग्राउंड में चलता है और नई फ़ाइलों को अपने-आप प्रोसेस करता है।' },
      batchRename: { title: 'एक साथ नाम बदलना', description: 'कई फ़ाइलें एक साथ खींचकर छोड़ें। Zush उन्हें कुछ सेकंड में विश्लेषित करके उनके नाम बदल देता है।' },
      customPatterns: { title: 'कस्टम पैटर्न', description: '{title}, {original}, {date}, {time} या {category} जैसे वेरिएबल से अपना फ़ाइल-नाम पैटर्न सेट करें।' },
      smartMetadata: { title: 'स्मार्ट मेटाडेटा', description: 'Finder टैग और Spotlight मेटाडेटा अपने-आप जोड़ें, ताकि फ़ाइलें प्राकृतिक खोज से तुरंत मिलें।' },
      renameHistory: { title: 'नाम-बदलाव इतिहास', description: 'हर बदलाव ट्रैक करें। गलती हो गई? मूल फ़ाइल नाम पर एक क्लिक में वापस जाएँ।' },
      customPrompts: { title: 'कस्टम AI प्रॉम्प्ट', description: 'नाम, टैग और मेटाडेटा के नियम सेट करें, ताकि AI आउटपुट आपकी शैली और काम के ढंग से मेल खाए।' },
      byok: { title: 'अपनी कुंजी लाएँ', description: 'असीमित क्लाउड नाम-बदलाव के लिए Gemini, Groq, OpenAI या Claude की अपनी API कुंजी जोड़ें। कुंजियाँ स्थानीय सुरक्षित स्टोरेज में रहती हैं।' },
      offlineAi: { title: 'Offline AI मोड', description: 'Ollama के ज़रिए निजी स्थानीय मॉडल। समर्थित फ़ाइलों को Zush cloud या AI प्रदाताओं को विश्लेषण कॉन्टेंट भेजे बिना प्रोसेस करें।' },
      addFolder: 'फ़ोल्डर जोड़ें',
      promptRules: 'प्रॉम्प्ट नियम',
      customBadge: 'कस्टम',
      apiKeyConnected: 'API कुंजी जुड़ी हुई',
      terminal: 'टर्मिनल',
      localModelReady: 'स्थानीय मॉडल तैयार',
      today: 'आज',
      undo: 'वापस करें',
    },
    videos: {
      title: 'Zush को काम करते देखें',
      titleAccent: 'Zush',
      description: 'देखें कि Zush असली फ़ाइल-संगठन काम को मुख्य सुविधाओं के साथ कैसे संभालता है',
      playDemo: 'डेमो चलाएँ',
      switchTo: 'बदलें:',
      items: {
        'batch-rename': { title: 'एक साथ नाम बदलना', description: 'AI से कई फ़ाइलों के नाम एक साथ बदलें' },
        monitor: { title: 'फ़ोल्डर निगरानी', description: 'नई फ़ाइलें आते ही उनके नाम अपने-आप बदलें' },
        tags: { title: 'स्मार्ट टैग', description: 'तेज़ फ़ाइल खोज के लिए स्मार्ट टैग बनाएँ' },
        naming: { title: 'नाम पैटर्न', description: 'लचीले वेरिएबल के साथ दोबारा इस्तेमाल होने वाले नाम पैटर्न बनाएँ' },
        multilanguage: { title: 'बहुभाषी', description: '60 से ज़्यादा भाषाओं में फ़ाइल नाम बनाएँ' },
        'custom-prompts': { title: 'कस्टम प्रॉम्प्ट', description: 'अपने निर्देशों से फ़ाइल नाम बनाना नियंत्रित करें' },
        byok: { title: 'BYOK', description: 'असीमित नाम-बदलाव के लिए अपना AI प्रदाता जोड़ें' },
        'offline-ai': { title: 'Offline AI मोड', description: 'Ollama के निजी स्थानीय मॉडल से समर्थित फ़ाइलें ऑफ़लाइन प्रोसेस करें' },
        activity: { title: 'गतिविधि इतिहास', description: 'हालिया नाम-बदलाव देखें और ज़रूरत पड़ने पर वापस करें' },
      },
    },
    whyZush: {
      title: 'Zush असली डेस्कटॉप काम के लिए क्यों सही है',
      titlePlatform: '{os} पर Zush क्यों बेहतर है',
      description: 'एक बार की कीमत, डेस्कटॉप जैसा अनुभव, तेज़ नाम-बदलाव और कम झंझट',
      descriptionPlatform: '{os} पर नेटिव डेस्कटॉप अनुभव, तेज़ नाम-बदलाव, एक बार की कीमत और कम झंझट',
      nativeEyebrow: 'डेस्कटॉप जैसा अनुभव',
      nativeEyebrowPlatform: '{os} जैसा अनुभव',
      nativeTitle: 'नेटिव, तेज़ और आधुनिक',
      nativeDescription: 'Zush एक असली डेस्कटॉप ऐप जैसा महसूस होता है: जल्दी खुलता है, साफ़ इंटरफ़ेस देता है और आपकी मशीन पर स्वाभाविक लगता है।',
      nativeDescriptionPlatform: 'Zush एक असली {os} ऐप जैसा महसूस होता है: जल्दी खुलता है, साफ़ इंटरफ़ेस देता है और आपकी मशीन पर स्वाभाविक लगता है।',
      pricingTrustItems: ['✨ मुफ़्त आज़माएँ', '🚫 कोई सब्सक्रिप्शन नहीं', '↩️ 14 दिन का रिफंड'],
      priceEyebrow: 'साफ़ एक बार की कीमत',
      priceTitle: 'एक बार भुगतान करें, काम का तरीका बनाए रखें',
      priceDescription: 'Zush सरल रहता है: पहले मुफ़्त आज़माएँ, फिर उपयोगी लगे तो छोटी एक बार की खरीद करें।',
      priceLabel: 'एक बार',
      speedEyebrow: 'बहुत तेज',
      speedTitle: 'नाम कुछ सेकंड में बदलते हैं',
      speedDescription: 'सफ़ाई तभी टिकती है जब वह असली काम को रोके नहीं। फ़ाइलें छोड़ें, देखें, लागू करें और आगे बढ़ें।',
      formatsEyebrow: 'प्रो फ़ोटो सपोर्ट',
      formatsTitle: 'फ़ोटोग्राफ़रों के लिए नेटिव RAW सपोर्ट',
      formatsDescription: 'CR2, NEF, ARW, DNG, RAF और RW2 जैसे प्रो कैमरा फ़ॉर्मैट सपोर्ट करता है, ताकि इंपोर्ट को वास्तविक इमेज कॉन्टेंट से नाम दिया जा सके।',
      controlEyebrow: 'कम जोखिम वाली ऑटोमेशन',
      controlTitle: 'एक साथ, निगरानी और वापस करना',
      controlDescription: 'पुराने ढेर को एक साथ साफ़ करें, नई फ़ोल्डरों को निगरानी से पढ़ने लायक रखें और ज़रूरत हो तो इतिहास से वापस जाएँ।',
      workflowSteps: ['पुराना ढेर साफ़ करें', 'नई फ़ोल्डर देखें', 'इतिहास से वापस जाएँ'],
    },
    useCases: {
      items: [
        { title: 'डिज़ाइनर', description: 'सैकड़ों स्क्रीनशॉट में खोए बिना mockup, UI element और reference कुछ सेकंड में खोजें।' },
        { title: 'फ़ोटोग्राफ़र', description: 'CR2, NEF, ARW, DNG, RAF, RW2 जैसे RAW फ़ॉर्मैट सपोर्ट के साथ बड़ी फ़ोटो लाइब्रेरी व्यवस्थित करें।' },
        { title: 'मार्केटिंग और SMM', description: 'कैंपेन डेक, एक्सपोर्ट, स्क्रीनशॉट और एसेट व्यवस्थित रखें और सही फ़ाइल जल्दी खोजें।' },
        { title: 'डेवलपर', description: 'डॉक्यूमेंटेशन, बग रिपोर्ट और PR review के स्क्रीनशॉट हमेशा व्यवस्थित और खोजने लायक रखें।' },
        { title: 'कॉन्टेंट क्रिएटर', description: 'थंबनेल, b-roll reference और विज़ुअल एसेट साफ़-सुथरे तरीके से व्यवस्थित करें।' },
        { title: 'प्रोडक्ट मैनेजर', description: 'PRD, मीटिंग नोट, स्प्रेडशीट और stakeholder deck को तुरंत खोजने लायक बनाएँ।' },
      ],
    },
  },
  'zh-cn': {
    featureCards: {
      aiAnalysis: { title: 'AI 分析', description: '高级 AI 会分析图片和支持的文档（包括 PDF），自动生成有意义、易搜索的文件名。' },
      foldersMonitoring: { title: '文件夹监控', description: '监控一个或多个文件夹。Zush 会在后台自动处理新加入的文件。' },
      batchRename: { title: '批量重命名', description: '一次拖入多个文件。Zush 会在几秒内完成分析并批量重命名。' },
      customPatterns: { title: '自定义命名模式', description: '用 {title}、{original}、{date}、{time} 或 {category} 等变量设置自己的文件名规则。' },
      smartMetadata: { title: '智能元数据', description: '自动添加 Finder 标签和 Spotlight 元数据，让文件可以用自然搜索快速找到。' },
      renameHistory: { title: '重命名历史', description: '记录每一次修改。如果结果不合适，可以一键恢复原始文件名。' },
      customPrompts: { title: '自定义 AI 提示词', description: '设置命名、标签和元数据规则，让 AI 输出符合你的风格和工作流。' },
      byok: { title: '使用自己的密钥', description: '连接 Gemini、Groq、OpenAI 或 Claude，实现无限云端重命名。密钥会安全保存在本地。' },
      offlineAi: { title: '离线 AI 模式', description: '通过 Ollama 使用私有本地模型。处理支持的文件时无需把分析内容发送到云端。' },
      addFolder: '添加文件夹', promptRules: '提示词规则', customBadge: '自定义', apiKeyConnected: 'API 密钥已连接', terminal: '终端', localModelReady: '本地模型已就绪', today: '今天', undo: '撤销',
      analysisNewName: '巴厘岛_日落_海滩.png',
      batchNewNames: ['看板界面.png', '招聘计划笔记.docx', '投资人更新演示.pptx'],
      metadataFileName: '赛博朋克_数字艺术.png',
      metadataTags: ['故障艺术', '蒸汽波', '雕像', '赛博朋克', '数字艺术', '棕榈树'],
      historyNewNames: ['仪表盘评审笔记.docx', 'Q1_收入报告.xlsx'],
      promptExample: '文件名保持简短，把主体放在最前，并添加匹配的 Finder 标签。',
    },
    videos: { title: '观看 Zush 实际运行', titleAccent: 'Zush', description: '看看 Zush 如何处理真实的文件整理工作流', playDemo: '播放演示', switchTo: '切换到', items: { 'batch-rename': { title: '批量重命名', description: '用 AI 一次重命名多个文件' }, monitor: { title: '文件夹监控', description: '新文件出现时自动重命名' }, tags: { title: '智能标签', description: '生成标签，让文件搜索更快' }, naming: { title: '命名模式', description: '用灵活变量创建可复用的命名模式' }, multilanguage: { title: '多语言', description: '生成 60 多种语言的文件名' }, 'custom-prompts': { title: '自定义提示词', description: '用自己的指令控制文件名生成' }, byok: { title: 'BYOK', description: '连接自己的 AI 服务商，实现无限重命名' }, 'offline-ai': { title: '离线 AI 模式', description: '通过 Ollama 本地模型离线处理文件' }, activity: { title: '活动历史', description: '查看最近的重命名并在需要时撤销' } } },
    whyZush: { title: '为什么 Zush 适合真实桌面工作', titlePlatform: '为什么 Zush 适合 {os}', description: '一次付费、原生桌面体验、快速重命名，并减少烦人的决策', descriptionPlatform: '在 {os} 上提供原生体验、快速重命名、一次付费和更少干扰', nativeEyebrow: '桌面原生体验', nativeEyebrowPlatform: '{os} 原生体验', nativeTitle: '原生、快速、现代', nativeDescription: 'Zush 像真正的桌面应用一样：启动快、界面清爽，并且自然融入你的系统。', nativeDescriptionPlatform: 'Zush 像真正的 {os} 原生应用一样：启动快、界面清爽，并且自然融入你的系统。', pricingTrustItems: ['✨ 免费试用', '🚫 无订阅', '↩️ 14 天退款'], priceEyebrow: '公平的一次性价格', priceTitle: '一次付费，保留完整工作流', priceDescription: 'Zush 保持简单：先免费试用，确认有用后只需一次性购买。', priceLabel: '一次性', speedEyebrow: '非常快', speedTitle: '几秒完成重命名', speedDescription: '整理文件只有在不打断工作时才会坚持下去。拖入文件、检查、应用，然后继续工作。', formatsEyebrow: '专业照片支持', formatsTitle: '面向摄影师的原生 RAW 支持', formatsDescription: '支持 CR2、NEF、ARW、DNG、RAF、RW2 等专业相机格式，可按图片内容重命名导入文件。', controlEyebrow: '低风险自动化', controlTitle: '批量、监控和撤销', controlDescription: '批量清理旧文件，自动保持新文件夹可读，并在需要时从历史记录恢复。', workflowSteps: ['批量整理旧文件', '监控新文件夹', '从历史恢复'] },
    useCases: { items: [{ title: '设计师', description: '不用在几百张截图里翻找，几秒内找到需要的 mockup、UI 元素或灵感参考。' }, { title: '摄影师', description: '轻松整理大型照片库，支持 CR2、NEF、ARW、DNG、RAF、RW2 等专业 RAW 格式。' }, { title: '营销与社媒', description: '让活动方案、导出文件、截图和素材保持有序，并快速找到正确文件。' }, { title: '开发者', description: '文档、Bug 报告和 PR Review 用的截图始终有序，方便查找。' }, { title: '内容创作者', description: '缩略图、b-roll 参考和视觉素材都能清晰整理。' }, { title: '产品经理', description: 'PRD、会议记录、表格和相关方资料都变得可快速搜索。' }] },
    showcaseSlides: homeShowcaseSlides([
      '戴黄帽的小狗.jpg',
      'Q1_规划笔记.docx',
      '产品发布预算.xlsx',
      '投资人更新演示.pptx',
      '客户创意简报.pdf',
      '技术仪表盘.png',
      '招聘计划笔记.docx',
      '收入预测.xlsx',
      '销售启动演示.pptx',
      '海滩上的快乐小狗.jpg',
      '网站提案.pdf',
      '亚洲风味牛肉.jpeg',
      '供应商合同笔记.docx',
      '三月销售管线.xlsx',
      '营销活动评审演示.pptx',
      '已签署服务协议.pdf',
      '明亮黄色花朵.jpg',
      '黑色福特野马.jpg',
    ]),
    faqItems: [
      { question: 'Zush 是什么？', answer: 'Zush 是适用于 Mac 和 Windows 的智能桌面应用，会用 AI 分析图片和支持的文档（包括 PDF），自动生成清晰、有意义的文件名和元数据。' },
      { question: '支持哪些文件格式？', answer: 'Zush 支持常见图片、截图、PDF、文档、表格、演示文稿、文本文件、CSV、SVG 等格式。' },
      { question: 'Zush 的 AI 重命名如何工作？', answer: '把一组文件拖进 Zush，AI 会分析内容并在几秒内生成新文件名。应用前可以预览，也可以单独重新生成某个文件名。' },
      { question: '文件夹监控如何工作？', answer: 'Zush 会在后台监控你选择的文件夹。新的支持文件出现后，会自动分析内容并实时重命名。' },
      { question: '可以重新生成 AI 文件名吗？', answer: '可以。在 AI Rename 区域选择文件并点击重新生成，就能得到新的建议文件名。' },
      { question: '可以自定义用于重命名和打标签的 AI 提示词吗？', answer: '可以。你可以写自己的规则来控制文件名和元数据标签，例如要求名称更短、主体靠前，或只使用指定标签。' },
      { question: '我的数据安全吗？', answer: '原始文件会留在你的电脑上。云端模式只发送重命名所需的分析内容；离线 AI 模式则通过 Ollama 本地模型在设备上处理。' },
      { question: '可以撤销程序做出的修改吗？', answer: '可以。你可以在 Activity 历史里一键恢复原始文件名。' },
      { question: 'Zush 支持多语言和日期格式吗？', answer: '支持。Zush 可以用 60 多种语言生成文件名，并允许选择你偏好的日期格式。' },
      { question: '价格如何计算？', answer: 'Zush PRO 是 10 美元一次性购买，包含 10,000 个额度，并解锁 BYOK 和离线 AI 模式。额度用完后可使用自己的 provider key 或离线 AI。' },
      { question: '什么是 BYOK（Bring Your Own Key）？', answer: 'BYOK 允许 PRO 用户连接自己的 Gemini、Groq、OpenAI 或 Claude API key，用于无限云端重命名。密钥会保存在本地安全存储中。' },
      { question: '为什么是一次性购买而不是订阅？', answer: '我们希望价格透明、公平。一次付费后即可长期使用，不需要月费，也不用担心订阅涨价或忘记取消。' },
      { question: '支持哪些操作系统？', answer: 'Zush 支持 macOS 14 Sonoma 及更新版本，以及 Windows 10 / 11。Mac 可使用签名 dmg 或 Mac App Store，Windows 可从 Microsoft Store 安装。' },
      { question: '应用使用哪个 AI 模型？', answer: 'Zush 使用先进的多模态 AI 模型来分析图片和支持的文档。具体模型可能会随着速度和准确性优化而更新。' },
      { question: '应用可以离线使用吗？', answer: '云端处理需要网络。PRO 用户可以安装 Ollama 和兼容模型后启用离线 AI 模式。' },
      { question: '支持音频或视频文件吗？', answer: '暂时不支持。当前 Zush 专注于图片和支持的文档，包括 PDF。音频和视频支持在路线图中。' },
      { question: '如果不适合我，可以退款吗？', answer: '可以。Zush 提供 14 天退款保证，详情可查看退款政策。' },
    ],
  },
  ar: {
    featureCards: {
      aiAnalysis: { title: 'تحليل بالذكاء الاصطناعي', description: 'يحلل الذكاء الاصطناعي الصور والمستندات المدعومة، بما في ذلك PDF، لإنشاء أسماء ملفات واضحة ومفيدة تلقائيا.' },
      foldersMonitoring: { title: 'مراقبة المجلدات', description: 'راقب مجلدا واحدا أو عدة مجلدات. يعمل Zush في الخلفية ويعالج الملفات الجديدة تلقائيا.' },
      batchRename: { title: 'إعادة تسمية دفعة واحدة', description: 'اسحب عدة ملفات مرة واحدة. يحللها Zush ويعيد تسميتها كلها خلال ثوان.' },
      customPatterns: { title: 'أنماط مخصصة', description: 'أنشئ نمط تسمية خاصا بك باستخدام متغيرات مثل {title} أو {original} أو {date} أو {time} أو {category}.' },
      smartMetadata: { title: 'بيانات وصفية ذكية', description: 'أضف وسوم Finder وبيانات Spotlight تلقائيا، لتجد الملفات بسرعة عبر البحث الطبيعي.' },
      renameHistory: { title: 'سجل إعادة التسمية', description: 'احتفظ بسجل لكل تغيير. إذا حدث خطأ، يمكنك الرجوع إلى الاسم الأصلي بنقرة واحدة.' },
      customPrompts: { title: 'تعليمات AI مخصصة', description: 'حدد قواعد الأسماء والوسوم والبيانات الوصفية حتى تتبع نتائج الذكاء الاصطناعي أسلوبك وسير عملك.' },
      byok: { title: 'استخدم مفتاحك الخاص', description: 'اربط مفتاح API الخاص بك من Gemini أو Groq أو OpenAI أو Claude لإعادة تسمية غير محدودة عبر السحابة. يتم حفظ المفاتيح محليا بأمان.' },
      offlineAi: { title: 'وضع Offline AI', description: 'نماذج محلية خاصة عبر Ollama. عالج الملفات المدعومة دون إرسال محتوى التحليل إلى سحابة Zush أو مزودي الذكاء الاصطناعي.' },
      addFolder: 'إضافة مجلد',
      promptRules: 'قواعد التعليمات',
      customBadge: 'مخصص',
      apiKeyConnected: 'تم ربط مفتاح API',
      terminal: 'الطرفية',
      localModelReady: 'النموذج المحلي جاهز',
      today: 'اليوم',
      undo: 'تراجع',
    },
    videos: {
      title: 'شاهد Zush أثناء العمل',
      titleAccent: 'Zush',
      description: 'شاهد كيف يتعامل Zush مع مهام تنظيم الملفات الحقيقية عبر هذه الميزات الأساسية',
      playDemo: 'تشغيل العرض',
      switchTo: 'التبديل إلى',
      items: {
        'batch-rename': { title: 'إعادة تسمية دفعة واحدة', description: 'أعد تسمية عدة ملفات دفعة واحدة بالذكاء الاصطناعي' },
        monitor: { title: 'مراقبة المجلدات', description: 'أعد تسمية الملفات الجديدة تلقائيا عند ظهورها' },
        tags: { title: 'وسوم ذكية', description: 'أنشئ وسوما ذكية لتسريع البحث عن الملفات' },
        naming: { title: 'أنماط التسمية', description: 'أنشئ أنماطا قابلة لإعادة الاستخدام بمتغيرات مرنة' },
        multilanguage: { title: 'متعدد اللغات', description: 'أنشئ أسماء ملفات بأكثر من 60 لغة' },
        'custom-prompts': { title: 'تعليمات مخصصة', description: 'وجّه إنشاء أسماء الملفات بتعليماتك الخاصة' },
        byok: { title: 'BYOK', description: 'اربط مزود الذكاء الاصطناعي الخاص بك لإعادة تسمية غير محدودة' },
        'offline-ai': { title: 'وضع Offline AI', description: 'عالج الملفات المدعومة دون اتصال بنماذج محلية خاصة عبر Ollama' },
        activity: { title: 'سجل النشاط', description: 'راجع عمليات إعادة التسمية الأخيرة وتراجع عن التغييرات عند الحاجة' },
      },
    },
    whyZush: {
      title: 'لماذا يناسب Zush العمل الحقيقي على سطح المكتب',
      titlePlatform: 'لماذا يتفوق Zush على {os}',
      description: 'سعر لمرة واحدة، إحساس كتطبيق أصلي، إعادة تسمية سريعة، وقرارات مزعجة أقل',
      descriptionPlatform: 'إحساس أصلي، إعادة تسمية سريعة، سعر لمرة واحدة، وقرارات أقل على {os}',
      nativeEyebrow: 'إحساس أصلي على سطح المكتب',
      nativeEyebrowPlatform: 'إحساس أصلي على {os}',
      nativeTitle: 'أصلي، سريع، وحديث',
      nativeDescription: 'يشعر Zush كتطبيق سطح مكتب حقيقي: يفتح بسرعة، واضح في الاستخدام، وينسجم بصريا مع جهازك.',
      nativeDescriptionPlatform: 'يشعر Zush كتطبيق {os} أصلي حقيقي: يفتح بسرعة، واضح في الاستخدام، وينسجم بصريا مع جهازك.',
      pricingTrustItems: ['✨ تجربة مجانية', '🚫 بدون اشتراك', '↩️ استرداد خلال 14 يوما'],
      priceEyebrow: 'سعر عادل لمرة واحدة',
      priceTitle: 'ادفع مرة واحدة واحتفظ بسير العمل',
      priceDescription: 'يبقى Zush بسيطا: جرّبه مجانا، ثم اشتره مرة واحدة بسعر صغير عندما يثبت فائدته.',
      priceLabel: 'مرة واحدة',
      speedEyebrow: 'سريع جدا',
      speedTitle: 'إعادة التسمية تتم خلال ثوان',
      speedDescription: 'ينجح تنظيم الملفات عندما لا يقطع عملك. أسقط الملفات، راجع، طبّق، ثم تابع.',
      formatsEyebrow: 'دعم صور احترافي',
      formatsTitle: 'دعم RAW أصلي للمصورين',
      formatsDescription: 'يدعم صيغ الكاميرات الاحترافية مثل CR2 وNEF وARW وDNG وRAF وRW2، حتى تتم تسمية الصور المستوردة حسب محتواها الحقيقي.',
      controlEyebrow: 'أتمتة منخفضة المخاطر',
      controlTitle: 'دفعات، مراقبة، وتراجع',
      controlDescription: 'نظف الملفات القديمة دفعة واحدة، حافظ على وضوح المجلدات الجديدة عبر المراقبة، واستعد الأسماء من السجل إذا أردت اسما مختلفا.',
      workflowSteps: ['تنظيف دفعات قديمة', 'مراقبة مجلدات جديدة', 'الاستعادة من السجل'],
    },
    useCases: {
      items: [
        { title: 'المصممون', description: 'توقف عن البحث في مئات لقطات الشاشة عن مرجع واحد. اعثر على أي نموذج أو عنصر واجهة أو إلهام خلال ثوان.' },
        { title: 'المصورون', description: 'نظم مكتبات الصور الضخمة بسهولة. يدعم صيغ RAW الاحترافية مثل CR2 وNEF وARW وDNG وRAF وRW2 والمزيد.' },
        { title: 'المسوقون وإدارة الشبكات', description: 'حافظ على عروض الحملات والتصديرات ولقطات الشاشة والملفات منظمة، واعثر على الملف المناسب بسرعة.' },
        { title: 'المطورون', description: 'لقطات الشاشة للتوثيق وتقارير الأخطاء ومراجعات PR تبقى منظمة وسهلة العثور.' },
        { title: 'صناع المحتوى', description: 'الصور المصغرة ومراجع b-roll والمواد البصرية تبقى مرتبة وواضحة.' },
        { title: 'مديرو المنتجات', description: 'مستندات PRD وملاحظات الاجتماعات والجداول والعروض تصبح قابلة للبحث فورا.' },
      ],
    },
  },
};

const localizedSpeedComparison: Record<Exclude<Locale, 'en'>, SpeedComparisonCopy> = {
  de: {
    eyebrow: 'Geschwindigkeitstest',
    title: 'Schnellere Arbeit. Schärfere Namen.',
    titleAccent: 'Schärfere Namen.',
    description: 'Dieselben 10 Dateien, dasselbe Ziel: Umbenennen nach Inhalt. Spezialisiertes Tool gegen einen allgemeinen KI-Agenten — direkter Vergleich.',
    zushLabel: 'Zush',
    zushBadge: 'Fertig',
    zushCaption: 'Speziell für Dateien gebaut. Reinziehen, saubere Namen erhalten, weiterarbeiten.',
    rivalLabel: 'Claude Cowork',
    rivalStatus: 'Arbeitet noch',
    rivalDoneLabel: 'Endlich fertig',
    rivalCaption: 'Brillanter Generalist — aber Routinearbeit an Dateien ist nicht seine Stärke.',
    rivalPlaceholderHint: 'Vergleichsaufnahme folgt',
    runningLabel: 'Läuft',
    replayLabel: 'Erneut abspielen',
    skipToEndLabel: 'Zum Ende springen',
    disclaimer: 'Claude und Claude Cowork sind Marken von Anthropic PBC. Zush ist nicht mit Anthropic verbunden, gesponsert oder unterstützt.',
  },
  fr: {
    eyebrow: 'Test de vitesse',
    title: 'Plus rapide. Noms plus clairs.',
    titleAccent: 'Noms plus clairs.',
    description: 'Mêmes 10 fichiers, même objectif : renommer par contenu. Un outil dédié face à un agent IA généraliste — face à face.',
    zushLabel: 'Zush',
    zushBadge: 'Terminé',
    zushCaption: 'Conçu pour les fichiers. Déposez-les, obtenez des noms clairs, passez à autre chose.',
    rivalLabel: 'Claude Cowork',
    rivalStatus: 'Toujours en cours',
    rivalDoneLabel: 'Enfin terminé',
    rivalCaption: 'Généraliste brillant — mais le travail routinier sur les fichiers n’est pas son fort.',
    rivalPlaceholderHint: 'Capture comparative à venir',
    runningLabel: 'En cours',
    replayLabel: 'Rejouer',
    skipToEndLabel: 'Passer à la fin',
    disclaimer: 'Claude et Claude Cowork sont des marques d’Anthropic PBC. Zush n’est ni affilié à Anthropic ni soutenu par Anthropic.',
  },
  'pt-br': {
    eyebrow: 'Teste de velocidade',
    title: 'Mais rápido. Nomes mais claros.',
    titleAccent: 'Nomes mais claros.',
    description: 'Os mesmos 10 arquivos, o mesmo objetivo: renomear pelo conteúdo. Ferramenta dedicada contra um agente de IA geral — frente a frente.',
    zushLabel: 'Zush',
    zushBadge: 'Pronto',
    zushCaption: 'Feito para arquivos. Solte-os, receba nomes claros, siga adiante.',
    rivalLabel: 'Claude Cowork',
    rivalStatus: 'Ainda trabalhando',
    rivalDoneLabel: 'Finalmente pronto',
    rivalCaption: 'Generalista brilhante — mas trabalho rotineiro com arquivos não é seu forte.',
    rivalPlaceholderHint: 'Captura comparativa em breve',
    runningLabel: 'Rodando',
    replayLabel: 'Reproduzir',
    skipToEndLabel: 'Pular para o fim',
    disclaimer: 'Claude e Claude Cowork são marcas da Anthropic PBC. Zush não é afiliada nem endossada pela Anthropic.',
  },
  es: {
    eyebrow: 'Prueba de velocidad',
    title: 'Más rápido. Nombres más claros.',
    titleAccent: 'Nombres más claros.',
    description: 'Los mismos 10 archivos, el mismo objetivo: renombrar por contenido. Una herramienta dedicada frente a un agente de IA general — cara a cara.',
    zushLabel: 'Zush',
    zushBadge: 'Listo',
    zushCaption: 'Diseñado para archivos. Arrástralos, obtén nombres claros, sigue adelante.',
    rivalLabel: 'Claude Cowork',
    rivalStatus: 'Aún trabajando',
    rivalDoneLabel: 'Por fin listo',
    rivalCaption: 'Generalista brillante — pero el trabajo rutinario con archivos no es lo suyo.',
    rivalPlaceholderHint: 'Captura de comparación próximamente',
    runningLabel: 'En curso',
    replayLabel: 'Reproducir',
    skipToEndLabel: 'Saltar al final',
    disclaimer: 'Claude y Claude Cowork son marcas de Anthropic PBC. Zush no está afiliado ni respaldado por Anthropic.',
  },
  nl: {
    eyebrow: 'Snelheidstest',
    title: 'Sneller werk. Scherpere namen.',
    titleAccent: 'Scherpere namen.',
    description: 'Dezelfde 10 bestanden, hetzelfde doel: hernoemen op inhoud. Een toegewijde tool tegen een algemene AI-agent — direct vergelijken.',
    zushLabel: 'Zush',
    zushBadge: 'Klaar',
    zushCaption: 'Gemaakt voor bestanden. Sleep ze erin, krijg duidelijke namen, ga door.',
    rivalLabel: 'Claude Cowork',
    rivalStatus: 'Nog bezig',
    rivalDoneLabel: 'Eindelijk klaar',
    rivalCaption: 'Briljante generalist — maar routinematig bestandswerk is niet zijn sterkste kant.',
    rivalPlaceholderHint: 'Vergelijkingsopname volgt',
    runningLabel: 'Bezig',
    replayLabel: 'Opnieuw afspelen',
    skipToEndLabel: 'Naar het einde',
    disclaimer: 'Claude en Claude Cowork zijn handelsmerken van Anthropic PBC. Zush is niet verbonden met of onderschreven door Anthropic.',
  },
  it: {
    eyebrow: 'Test di velocità',
    title: 'Più veloce. Nomi più chiari.',
    titleAccent: 'Nomi più chiari.',
    description: 'Stessi 10 file, stesso obiettivo: rinominare per contenuto. Uno strumento dedicato contro un agente IA generico — faccia a faccia.',
    zushLabel: 'Zush',
    zushBadge: 'Fatto',
    zushCaption: 'Pensato per i file. Trascinali, ottieni nomi chiari, vai avanti.',
    rivalLabel: 'Claude Cowork',
    rivalStatus: 'Ancora al lavoro',
    rivalDoneLabel: 'Finalmente fatto',
    rivalCaption: 'Generalista brillante — ma il lavoro di routine sui file non è il suo forte.',
    rivalPlaceholderHint: 'Acquisizione comparativa in arrivo',
    runningLabel: 'In esecuzione',
    replayLabel: 'Riproduci di nuovo',
    skipToEndLabel: 'Vai alla fine',
    disclaimer: 'Claude e Claude Cowork sono marchi di Anthropic PBC. Zush non è affiliato né sponsorizzato da Anthropic.',
  },
  ja: {
    eyebrow: 'スピードテスト',
    title: 'より速く。より鋭い名前。',
    titleAccent: 'より鋭い名前。',
    description: '同じ10ファイル、同じ目的：内容に基づいてリネーム。専用ツールと汎用AIエージェントの直接対決。',
    zushLabel: 'Zush',
    zushBadge: '完了',
    zushCaption: 'ファイル専用に設計。ドロップして、わかりやすい名前を受け取り、次へ。',
    rivalLabel: 'Claude Cowork',
    rivalStatus: '作業中',
    rivalDoneLabel: 'ようやく完了',
    rivalCaption: '優秀な汎用エージェント — だが日常的なファイル作業は得意分野ではない。',
    rivalPlaceholderHint: '比較動画は準備中',
    runningLabel: '実行中',
    replayLabel: 'もう一度',
    skipToEndLabel: '最後までスキップ',
    disclaimer: 'ClaudeおよびClaude CoworkはAnthropic PBCの商標です。ZushはAnthropicと提携・支援関係にありません。',
  },
  ko: {
    eyebrow: '속도 테스트',
    title: '더 빠르게. 더 깔끔한 이름.',
    titleAccent: '더 깔끔한 이름.',
    description: '같은 파일 10개, 같은 목표: 내용 기반으로 이름 바꾸기. 전용 도구와 범용 AI 에이전트의 정면 대결.',
    zushLabel: 'Zush',
    zushBadge: '완료',
    zushCaption: '파일 전용으로 설계. 드롭하고, 깔끔한 이름을 받고, 다음 작업으로.',
    rivalLabel: 'Claude Cowork',
    rivalStatus: '작업 중',
    rivalDoneLabel: '드디어 완료',
    rivalCaption: '뛰어난 범용 에이전트 — 하지만 일상적인 파일 작업은 그 강점이 아닙니다.',
    rivalPlaceholderHint: '비교 영상 준비 중',
    runningLabel: '실행 중',
    replayLabel: '다시 재생',
    skipToEndLabel: '끝으로 건너뛰기',
    disclaimer: 'Claude 및 Claude Cowork는 Anthropic PBC의 상표입니다. Zush는 Anthropic과 제휴되거나 후원받지 않습니다.',
  },
  'zh-cn': {
    eyebrow: '速度测试',
    title: '更快完成。命名更精准。',
    titleAccent: '命名更精准。',
    description: '同样的 10 个文件，同样的目标：根据内容重命名。专业工具与通用 AI 智能体——正面对决。',
    zushLabel: 'Zush',
    zushBadge: '完成',
    zushCaption: '为文件而生。拖入、获得清晰命名、继续工作。',
    rivalLabel: 'Claude Cowork',
    rivalStatus: '仍在工作',
    rivalDoneLabel: '终于完成',
    rivalCaption: '出色的通用智能体——但日常文件工作不是它的强项。',
    rivalPlaceholderHint: '对比视频即将上线',
    runningLabel: '运行中',
    replayLabel: '重新播放',
    skipToEndLabel: '跳到结尾',
    disclaimer: 'Claude 和 Claude Cowork 是 Anthropic PBC 的商标。Zush 与 Anthropic 没有关联，也未获其背书。',
  },
  hi: {
    eyebrow: 'स्पीड टेस्ट',
    title: 'काम तेज। नाम ज्यादा साफ।',
    titleAccent: 'नाम ज्यादा साफ।',
    description: 'वही 10 फ़ाइलें, वही लक्ष्य: कॉन्टेंट के आधार पर नाम बदलना। फ़ाइलों के लिए बना टूल और सामान्य AI एजेंट आमने-सामने।',
    zushLabel: 'Zush',
    zushBadge: 'पूरा',
    zushCaption: 'फ़ाइलों के लिए बनाया गया। छोड़ें, साफ़ नाम पाएँ, आगे बढ़ें।',
    rivalLabel: 'Claude Cowork',
    rivalStatus: 'अभी भी काम कर रहा है',
    rivalDoneLabel: 'आखिरकार पूरा',
    rivalCaption: 'कई कामों में स्मार्ट, लेकिन रोज़मर्रा के फ़ाइल काम में धीमा।',
    rivalPlaceholderHint: 'तुलना वाला वीडियो जल्द आएगा',
    runningLabel: 'चल रहा है',
    replayLabel: 'दोबारा चलाएँ',
    skipToEndLabel: 'अंत पर जाएँ',
    disclaimer: 'Claude और Claude Cowork Anthropic PBC के trademarks हैं। Zush Anthropic से संबद्ध या समर्थित नहीं है।',
  },
  ar: {
    eyebrow: 'اختبار السرعة',
    title: 'عمل أسرع. أسماء أوضح.',
    titleAccent: 'أسماء أوضح.',
    description: 'نفس الـ10 ملفات، نفس الهدف: إعادة التسمية حسب المحتوى. أداة متخصصة في مواجهة وكيل ذكاء اصطناعي عام — مباشرة.',
    zushLabel: 'Zush',
    zushBadge: 'تم',
    zushCaption: 'مصممة للملفات. أسقطها، احصل على أسماء واضحة، تابع.',
    rivalLabel: 'Claude Cowork',
    rivalStatus: 'لا يزال يعمل',
    rivalDoneLabel: 'انتهى أخيرا',
    rivalCaption: 'عام رائع — لكن العمل الروتيني مع الملفات ليس نقطة قوته.',
    rivalPlaceholderHint: 'تسجيل المقارنة قريبا',
    runningLabel: 'قيد التشغيل',
    replayLabel: 'إعادة التشغيل',
    skipToEndLabel: 'تخطي إلى النهاية',
    disclaimer: 'Claude وClaude Cowork علامتان تجاريتان لشركة Anthropic PBC. Zush غير منتسبة إلى Anthropic ولا مدعومة منها.',
  },
};

const withLocalizedFileExamples = (
  locale: Exclude<Locale, 'en'>,
  details: DeepPartial<Pick<HomeCopy, 'featureCards' | 'videos' | 'speedComparison' | 'whyZush' | 'useCases' | 'renameDemo' | 'faqItems' | 'showcaseSlides'>>,
): DeepPartial<Pick<HomeCopy, 'featureCards' | 'videos' | 'speedComparison' | 'whyZush' | 'useCases' | 'renameDemo' | 'faqItems' | 'showcaseSlides'>> => ({
  ...details,
  featureCards: {
    ...details.featureCards,
    ...localizedFileExamples[locale].featureCards,
  },
  speedComparison: localizedSpeedComparison[locale],
  renameDemo: localizedRenameDemo[locale],
  showcaseSlides: localizedFileExamples[locale].showcaseSlides,
  faqItems: details.faqItems?.length === base.home.faqItems.length
    ? details.faqItems
    : locale === 'zh-cn'
      ? base.home.faqItems
      : localizedFullHomeFaqItems[locale],
});

const COPY: Record<Locale, LocaleCopy> = {
  en: base,
  de: localized({
    header: { features: 'Funktionen', pricing: 'Preise', faq: 'FAQ', blog: 'Blog', buyPro: '🌟 PRO kaufen', download: 'Download', toggleTheme: 'Design wechseln', language: 'Sprache', homeAria: 'Zur Startseite', skipToContent: 'Zum Inhalt springen' },
    downloadMenu: localizedDownloadMenu.de,
    footer: {
      description: 'KI-Dateiumbenennung für Mac und Windows — Dateien automatisch mit KI benennen',
      product: 'Produkt',
      byFileType: 'Nach Dateityp',
      resources: 'Ressourcen',
      support: 'Support',
      pricing: 'Preise',
      contactSupport: 'Support kontaktieren',
      feedback: 'Funktionen & Fehler melden',
      terms: 'Nutzungsbedingungen',
      privacy: 'Datenschutz',
      refund: 'Rückerstattung',
      ...localizedFooterDetails.de,
    },
    home: {
      heroTitle: 'Dateien mit KI umbenennen. Automatisch.',
      heroAccent: 'Automatisch.',
      heroSubtitle: 'Schneller KI-Dateiumbenenner für Mac und Windows. Benenne Screenshots, PDFs, Dokumente und Downloads automatisch sinnvoll um — kostenlos testen.',
      buyPro: 'PRO kaufen 🌟',
      trustSignals: ['✨ Kostenlos testen', '💳 Keine Kreditkarte', '🚫 Kein Abo'],
      featuresTitle: 'Wie Zush deine Dateien mit KI umbenennt',
      featuresDescription: 'Leistungsstarke Funktionen in einer einfachen, eleganten Oberfläche',
      supportedFormats: 'Unterstützte Dateiformate',
      images: 'Bilder',
      downloadTitle: 'Zush kostenlos testen',
      downloadSubtitle: 'KI-Umbenennung mit eigenen Prompts, Ordnerüberwachung und Rückgängig-Funktion.',
      downloadHintPrefix: 'Kostenlos · Keine Kreditkarte erforderlich',
      useCasesTitle: 'Wer KI-Dateiumbenennung nutzt',
      useCasesDescription: 'Wähle die Rolle, die am besten zu deinem Workflow passt.',
      faqTitle: 'Häufig gestellte Fragen',
      faqTitleAccent: 'Fragen',
      faqDescription: 'Alles Wichtige über Zush an einem Ort',
      ...withLocalizedFileExamples('de', localizedHomeDetails.de),
    },
    pricing: {
      title: 'Einmal zahlen, dauerhaft nutzen',
      description: 'Keine Abos, keine versteckten Gebühren. Nur ein einfacher Einmalkauf.',
      planName: 'Zush PRO 🌟',
      planDescription: 'Einmalkauf • Lebenslanger Zugriff',
      billing: 'einmalig',
      buttonText: 'Zush PRO kaufen 🌟',
      buttonHint: '14 Tage Geld-zurück-Garantie • Sicher über Paddle',
      features: localizedPricingFeatures.de,
    },
    seo: {
      '/': { title: 'Zush — KI-Dateiumbenenner für Mac & Windows', description: 'Benenne Screenshots, PDFs, Fotos und Dokumente auf Mac und Windows automatisch mit KI um. Kostenlos testen, keine Anmeldung.' },
    },
    featurePages: localizedFeaturePages('Häufig gestellte Fragen', 'Verwandte Tools', 'Verwandte Anleitungen', [
      { question: 'Kann ich eine Umbenennung rückgängig machen?', answer: 'Ja. Zush speichert den Verlauf, damit du Dateien mit einem Klick auf den ursprünglichen Namen zurücksetzen kannst.' },
    ], [
      ['/rename-pdf-with-ai', 'PDFs mit KI umbenennen', 'Benenne Rechnungen, Verträge, Scans und Formulare nach Text und Kontext im PDF.'],
      ['/rename-documents-with-ai', 'Dokumente mit KI umbenennen', 'Benenne DOCX, XLSX, PPTX, TXT, CSV und E-Mails nach ihrem Inhalt.'],
      ['/rename-screenshots-with-ai', 'Screenshots mit KI umbenennen', 'Ersetze generische Screenshot-Namen durch nützliche Namen basierend auf dem Inhalt.'],
      ['/rename-photos-with-ai', 'Fotos mit KI umbenennen', 'Benenne HEIC-, RAW-, JPG- und andere Fotos nach Motiv, Szene und Kontext.'],
    ]),
  }),
  fr: localized({
    header: { features: 'Fonctions', pricing: 'Tarifs', faq: 'FAQ', blog: 'Blog', buyPro: 'Acheter 🌟 PRO', download: 'Télécharger', toggleTheme: 'Changer le thème', language: 'Langue', homeAria: 'Aller à l’accueil', skipToContent: 'Aller au contenu' },
    downloadMenu: localizedDownloadMenu.fr,
    footer: { description: 'Renommeur de fichiers IA pour Mac et Windows — renommez vos fichiers automatiquement', product: 'Produit', byFileType: 'Par type', resources: 'Ressources', support: 'Support', pricing: 'Tarifs', contactSupport: 'Contacter le support', feedback: 'Fonctions & bugs', terms: 'Conditions', privacy: 'Confidentialité', refund: 'Remboursement', ...localizedFooterDetails.fr },
    home: {
      heroTitle: 'Renommez vos fichiers avec l’IA. Automatiquement.',
      heroAccent: 'Automatiquement.',
      heroSubtitle: 'Un renommeur de fichiers IA rapide pour Mac et Windows. Renommez screenshots, PDF, documents et téléchargements avec des noms utiles — essai gratuit.',
      buyPro: 'Acheter PRO 🌟',
      trustSignals: ['✨ Essai gratuit', '💳 Sans carte bancaire', '🚫 Sans abonnement'],
      featuresTitle: 'Comment Zush renomme vos fichiers avec l’IA',
      featuresDescription: 'Des fonctions puissantes dans une interface simple et élégante',
      supportedFormats: 'Formats pris en charge',
      images: 'Images',
      downloadTitle: 'Essayez Zush gratuitement',
      downloadSubtitle: 'Renommage IA avec prompts personnalisés, surveillance de dossiers et annulation en un clic.',
      downloadHintPrefix: 'Gratuit · Sans carte bancaire',
      useCasesTitle: 'Qui utilise le renommage IA',
      useCasesDescription: 'Choisissez le rôle le plus proche de votre workflow.',
      faqTitle: 'Questions fréquentes',
      faqTitleAccent: 'fréquentes',
      faqDescription: 'Tout ce qu’il faut savoir sur Zush',
      ...withLocalizedFileExamples('fr', localizedHomeDetails.fr),
    },
    pricing: { title: 'Payez une fois, utilisez toujours', description: 'Pas d’abonnement, pas de frais cachés. Un simple achat unique.', planName: 'Zush PRO 🌟', planDescription: 'Achat unique • Accès à vie', billing: 'une fois', buttonText: 'Acheter Zush PRO 🌟', buttonHint: 'Garantie 14 jours • Paiement sécurisé via Paddle', features: localizedPricingFeatures.fr },
    seo: { '/': { title: 'Zush — Renommeur de fichiers IA pour Mac & Windows', description: 'Renommez automatiquement screenshots, PDF, photos et documents sur Mac et Windows avec l’IA. Essai gratuit.' } },
    featurePages: localizedFeaturePages('Questions fréquentes', 'Outils associés', 'Guides associés', [
      { question: 'Puis-je annuler un renommage ?', answer: 'Oui. Zush conserve un historique pour restaurer le nom d’origine en un clic.' },
    ], [
      ['/rename-pdf-with-ai', 'Renommer des PDF avec l’IA', 'Renommez factures, contrats, scans et formulaires selon le texte du PDF.'],
      ['/rename-documents-with-ai', 'Renommer des documents avec l’IA', 'Renommez DOCX, XLSX, PPTX, TXT, CSV et emails selon leur contenu.'],
      ['/rename-screenshots-with-ai', 'Renommer des screenshots avec l’IA', 'Remplacez les noms génériques par des noms utiles basés sur l’écran capturé.'],
      ['/rename-photos-with-ai', 'Renommer des photos avec l’IA', 'Renommez HEIC, RAW, JPG et autres photos selon le sujet et la scène.'],
    ]),
  }),
  'pt-br': localized({
    header: { features: 'Recursos', pricing: 'Preços', faq: 'FAQ', blog: 'Blog', buyPro: 'Comprar 🌟 PRO', download: 'Baixar', toggleTheme: 'Alternar tema', language: 'Idioma', homeAria: 'Ir para o início', skipToContent: 'Pular para o conteúdo' },
    downloadMenu: localizedDownloadMenu['pt-br'],
    footer: { description: 'Renomeador de arquivos com IA para Mac e Windows — renomeie arquivos automaticamente', product: 'Produto', byFileType: 'Por tipo', resources: 'Recursos', support: 'Suporte', pricing: 'Preços', contactSupport: 'Falar com suporte', feedback: 'Recursos e bugs', terms: 'Termos', privacy: 'Privacidade', refund: 'Reembolso', ...localizedFooterDetails['pt-br'] },
    home: {
      heroTitle: 'Renomeie arquivos com IA. Automaticamente.',
      heroAccent: 'Automaticamente.',
      heroSubtitle: 'Renomeador de arquivos com IA para Mac e Windows. Renomeie screenshots, PDFs, documentos e downloads com nomes úteis — teste grátis.',
      buyPro: 'Comprar PRO 🌟',
      trustSignals: ['✨ Teste grátis', '💳 Sem cartão', '🚫 Sem assinatura'],
      featuresTitle: 'Como o Zush renomeia seus arquivos com IA',
      featuresDescription: 'Recursos poderosos em uma interface simples e elegante',
      supportedFormats: 'Formatos compatíveis',
      images: 'Imagens',
      downloadTitle: 'Teste o Zush grátis',
      downloadSubtitle: 'Renomeação com IA, prompts personalizados, monitoramento de pastas e desfazer em um clique.',
      downloadHintPrefix: 'Grátis · Sem cartão de crédito',
      useCasesTitle: 'Quem usa renomeação com IA',
      useCasesDescription: 'Escolha o fluxo de trabalho mais próximo do seu.',
      faqTitle: 'Perguntas frequentes',
      faqTitleAccent: 'frequentes',
      faqDescription: 'Tudo que você precisa saber sobre o Zush',
      ...withLocalizedFileExamples('pt-br', localizedHomeDetails['pt-br']),
    },
    pricing: { title: 'Pague uma vez, use para sempre', description: 'Sem assinaturas e sem taxas escondidas. Apenas uma compra única.', planName: 'Zush PRO 🌟', planDescription: 'Compra única • Acesso vitalício', billing: 'único', buttonText: 'Comprar Zush PRO 🌟', buttonHint: 'Garantia de 14 dias • Seguro via Paddle', features: localizedPricingFeatures['pt-br'] },
    seo: { '/': { title: 'Zush — Renomeador de arquivos com IA para Mac & Windows', description: 'Renomeie screenshots, PDFs, fotos e documentos no Mac e Windows usando IA. Teste grátis, sem cadastro.' } },
    featurePages: localizedFeaturePages('Perguntas frequentes', 'Ferramentas relacionadas', 'Guias relacionados', [
      { question: 'Posso desfazer uma renomeação?', answer: 'Sim. O Zush mantém um histórico para restaurar o nome original com um clique.' },
    ], [
      ['/rename-pdf-with-ai', 'Renomear PDFs com IA', 'Renomeie notas, contratos, scans e formulários pelo texto do PDF.'],
      ['/rename-documents-with-ai', 'Renomear documentos com IA', 'Renomeie DOCX, XLSX, PPTX, TXT, CSV e emails pelo conteúdo real.'],
      ['/rename-screenshots-with-ai', 'Renomear screenshots com IA', 'Troque nomes genéricos por nomes úteis baseados no conteúdo da tela.'],
      ['/rename-photos-with-ai', 'Renomear fotos com IA', 'Renomeie HEIC, RAW, JPG e outras fotos por assunto, cena e contexto.'],
    ]),
  }),
  es: localized({
    header: { features: 'Funciones', pricing: 'Precios', faq: 'FAQ', blog: 'Blog', buyPro: 'Comprar 🌟 PRO', download: 'Descargar', toggleTheme: 'Cambiar tema', language: 'Idioma', homeAria: 'Ir al inicio', skipToContent: 'Saltar al contenido' },
    downloadMenu: localizedDownloadMenu.es,
    footer: { description: 'Renombrador de archivos con IA para Mac y Windows — renombra archivos automáticamente', product: 'Producto', byFileType: 'Por tipo', resources: 'Recursos', support: 'Soporte', pricing: 'Precios', contactSupport: 'Contactar soporte', feedback: 'Funciones y errores', terms: 'Términos', privacy: 'Privacidad', refund: 'Reembolso', ...localizedFooterDetails.es },
    home: {
      heroTitle: 'Renombra archivos con IA. Automáticamente.',
      heroAccent: 'Automáticamente.',
      heroSubtitle: 'Renombrador de archivos con IA para Mac y Windows. Renombra capturas, PDFs, documentos y descargas con nombres útiles — prueba gratis.',
      buyPro: 'Comprar PRO 🌟',
      trustSignals: ['✨ Prueba gratis', '💳 Sin tarjeta', '🚫 Sin suscripción'],
      featuresTitle: 'Cómo Zush renombra tus archivos con IA',
      featuresDescription: 'Funciones potentes en una interfaz simple y elegante',
      supportedFormats: 'Formatos compatibles',
      images: 'Imágenes',
      downloadTitle: 'Prueba Zush gratis',
      downloadSubtitle: 'Renombrado con IA, prompts personalizados, monitoreo de carpetas y deshacer en un clic.',
      downloadHintPrefix: 'Gratis · Sin tarjeta de crédito',
      useCasesTitle: 'Quién usa renombrado con IA',
      useCasesDescription: 'Elige el rol más cercano a tu flujo de trabajo.',
      faqTitle: 'Preguntas frecuentes',
      faqTitleAccent: 'frecuentes',
      faqDescription: 'Todo lo que necesitas saber sobre Zush',
      ...withLocalizedFileExamples('es', localizedHomeDetails.es),
    },
    pricing: { title: 'Paga una vez, úsalo para siempre', description: 'Sin suscripciones ni cargos ocultos. Solo una compra única.', planName: 'Zush PRO 🌟', planDescription: 'Compra única • Acceso de por vida', billing: 'una vez', buttonText: 'Comprar Zush PRO 🌟', buttonHint: 'Garantía de 14 días • Seguro con Paddle', features: localizedPricingFeatures.es },
    seo: { '/': { title: 'Zush — Renombrador de archivos con IA para Mac & Windows', description: 'Renombra capturas, PDFs, fotos y documentos en Mac y Windows usando IA. Prueba gratis, sin registro.' } },
    featurePages: localizedFeaturePages('Preguntas frecuentes', 'Herramientas relacionadas', 'Guías relacionadas', [
      { question: '¿Puedo deshacer un cambio de nombre?', answer: 'Sí. Zush guarda el historial para restaurar el nombre original con un clic.' },
    ], [
      ['/rename-pdf-with-ai', 'Renombrar PDFs con IA', 'Renombra facturas, contratos, escaneos y formularios por el texto del PDF.'],
      ['/rename-documents-with-ai', 'Renombrar documentos con IA', 'Renombra DOCX, XLSX, PPTX, TXT, CSV y emails por su contenido real.'],
      ['/rename-screenshots-with-ai', 'Renombrar capturas con IA', 'Cambia nombres genéricos por nombres útiles según lo que muestra la captura.'],
      ['/rename-photos-with-ai', 'Renombrar fotos con IA', 'Renombra HEIC, RAW, JPG y otras fotos por sujeto, escena y contexto.'],
    ]),
  }),
  nl: localized({
    header: { features: 'Functies', pricing: 'Prijzen', faq: 'FAQ', blog: 'Blog', buyPro: 'Koop 🌟 PRO', download: 'Download', toggleTheme: 'Thema wisselen', language: 'Taal', homeAria: 'Naar home', skipToContent: 'Naar inhoud' },
    downloadMenu: localizedDownloadMenu.nl,
    footer: { description: 'AI-bestandshernoemer voor Mac en Windows — hernoem bestanden automatisch', product: 'Product', byFileType: 'Per type', resources: 'Bronnen', support: 'Support', pricing: 'Prijzen', contactSupport: 'Support contacteren', feedback: 'Functies & bugs', terms: 'Voorwaarden', privacy: 'Privacy', refund: 'Terugbetaling', ...localizedFooterDetails.nl },
    home: {
      heroTitle: 'Hernoem bestanden met AI. Automatisch.',
      heroAccent: 'Automatisch.',
      heroSubtitle: 'Snelle AI-bestandshernoemer voor Mac en Windows. Hernoem screenshots, PDFs, documenten en downloads met betekenisvolle namen — gratis proberen.',
      buyPro: 'Koop PRO 🌟',
      trustSignals: ['✨ Gratis proberen', '💳 Geen creditcard', '🚫 Geen abonnement'],
      featuresTitle: 'Hoe Zush je bestanden met AI hernoemt',
      featuresDescription: 'Krachtige functies in een eenvoudige, elegante interface',
      supportedFormats: 'Ondersteunde bestandsformaten',
      images: 'Afbeeldingen',
      downloadTitle: 'Probeer Zush gratis',
      downloadSubtitle: 'AI-hernoemen met eigen prompts, mapbewaking en herstellen met één klik.',
      downloadHintPrefix: 'Gratis · Geen creditcard nodig',
      useCasesTitle: 'Wie gebruikt AI-bestandshernoeming',
      useCasesDescription: 'Kies de rol die het best bij je workflow past.',
      faqTitle: 'Veelgestelde vragen',
      faqTitleAccent: 'vragen',
      faqDescription: 'Alles wat je over Zush moet weten',
      ...withLocalizedFileExamples('nl', localizedHomeDetails.nl),
    },
    pricing: { title: 'Betaal één keer, gebruik voor altijd', description: 'Geen abonnementen, geen verborgen kosten. Gewoon één aankoop.', planName: 'Zush PRO 🌟', planDescription: 'Eenmalige aankoop • Levenslange toegang', billing: 'eenmalig', buttonText: 'Koop Zush PRO 🌟', buttonHint: '14 dagen geld-terug-garantie • Veilig via Paddle', features: localizedPricingFeatures.nl },
    seo: { '/': { title: 'Zush — AI-bestandshernoemer voor Mac & Windows', description: 'Hernoem screenshots, PDFs, foto’s en documenten op Mac en Windows met AI. Gratis proberen.' } },
    featurePages: localizedFeaturePages('Veelgestelde vragen', 'Gerelateerde tools', 'Gerelateerde gidsen', [
      { question: 'Kan ik een hernoeming ongedaan maken?', answer: 'Ja. Zush bewaart de geschiedenis zodat je met één klik de originele naam herstelt.' },
    ], [
      ['/rename-pdf-with-ai', 'PDFs hernoemen met AI', 'Hernoem facturen, contracten, scans en formulieren op basis van PDF-tekst.'],
      ['/rename-documents-with-ai', 'Documenten hernoemen met AI', 'Hernoem DOCX, XLSX, PPTX, TXT, CSV en e-mails op basis van inhoud.'],
      ['/rename-screenshots-with-ai', 'Screenshots hernoemen met AI', 'Vervang generieke screenshotnamen door nuttige namen op basis van de inhoud.'],
      ['/rename-photos-with-ai', 'Foto’s hernoemen met AI', 'Hernoem HEIC, RAW, JPG en andere foto’s op onderwerp, scène en context.'],
    ]),
  }),
  it: localized({
    header: { features: 'Funzioni', pricing: 'Prezzi', faq: 'FAQ', blog: 'Blog', buyPro: 'Acquista 🌟 PRO', download: 'Scarica', toggleTheme: 'Cambia tema', language: 'Lingua', homeAria: 'Vai alla home', skipToContent: 'Vai al contenuto' },
    downloadMenu: localizedDownloadMenu.it,
    footer: { description: 'Rinomina file con IA per Mac e Windows — rinomina automaticamente i file', product: 'Prodotto', byFileType: 'Per tipo', resources: 'Risorse', support: 'Supporto', pricing: 'Prezzi', contactSupport: 'Contatta supporto', feedback: 'Funzioni e bug', terms: 'Termini', privacy: 'Privacy', refund: 'Rimborso', ...localizedFooterDetails.it },
    home: {
      heroTitle: 'Rinomina file con l’IA. Automaticamente.',
      heroAccent: 'Automaticamente.',
      heroSubtitle: 'Rinomina file con IA per Mac e Windows. Rinomina screenshot, PDF, documenti e download con nomi utili — prova gratis.',
      buyPro: 'Acquista PRO 🌟',
      trustSignals: ['✨ Prova gratis', '💳 Senza carta', '🚫 Nessun abbonamento'],
      featuresTitle: 'Come Zush rinomina i tuoi file con l’IA',
      featuresDescription: 'Funzioni potenti in un’interfaccia semplice ed elegante',
      supportedFormats: 'Formati supportati',
      images: 'Immagini',
      downloadTitle: 'Prova Zush gratis',
      downloadSubtitle: 'Rinomina con IA, prompt personalizzati, monitoraggio cartelle e annulla con un clic.',
      downloadHintPrefix: 'Gratis · Nessuna carta richiesta',
      useCasesTitle: 'Chi usa la rinomina con IA',
      useCasesDescription: 'Scegli il ruolo più vicino al tuo flusso di lavoro.',
      faqTitle: 'Domande frequenti',
      faqTitleAccent: 'frequenti',
      faqDescription: 'Tutto quello che devi sapere su Zush',
      ...withLocalizedFileExamples('it', localizedHomeDetails.it),
    },
    pricing: { title: 'Paga una volta, usa per sempre', description: 'Nessun abbonamento, nessun costo nascosto. Solo un acquisto unico.', planName: 'Zush PRO 🌟', planDescription: 'Acquisto unico • Accesso a vita', billing: 'una tantum', buttonText: 'Acquista Zush PRO 🌟', buttonHint: 'Garanzia 14 giorni • Sicuro con Paddle', features: localizedPricingFeatures.it },
    seo: { '/': { title: 'Zush — Rinomina file con IA per Mac e Windows', description: 'Rinomina screenshot, PDF, foto e documenti su Mac e Windows con l’IA. Prova gratis.' } },
    featurePages: localizedFeaturePages('Domande frequenti', 'Strumenti correlati', 'Guide correlate', [
      { question: 'Posso annullare una rinomina?', answer: 'Sì. Zush conserva la cronologia per ripristinare il nome originale con un clic.' },
    ], [
      ['/rename-pdf-with-ai', 'Rinomina PDF con IA', 'Rinomina fatture, contratti, scansioni e moduli in base al testo del PDF.'],
      ['/rename-documents-with-ai', 'Rinomina documenti con IA', 'Rinomina DOCX, XLSX, PPTX, TXT, CSV ed email in base al contenuto.'],
      ['/rename-screenshots-with-ai', 'Rinomina screenshot con IA', 'Sostituisci nomi generici con nomi utili basati su ciò che mostra lo screenshot.'],
      ['/rename-photos-with-ai', 'Rinomina foto con IA', 'Rinomina HEIC, RAW, JPG e altre foto per soggetto, scena e contesto.'],
    ]),
  }),
  ja: localized({
    header: { features: '機能', pricing: '料金', faq: 'FAQ', blog: 'ブログ', buyPro: '🌟 PROを購入', download: 'ダウンロード', toggleTheme: 'テーマ切替', language: '言語', homeAria: 'ホームへ移動', skipToContent: 'コンテンツへスキップ' },
    downloadMenu: localizedDownloadMenu.ja,
    footer: { description: 'Mac と Windows 向け AI ファイルリネーム — ファイル名を自動で整理', product: '製品', byFileType: 'ファイル別', resources: 'リソース', support: 'サポート', pricing: '料金', contactSupport: 'サポートに連絡', feedback: '機能要望と不具合', terms: '利用規約', privacy: 'プライバシー', refund: '返金ポリシー', ...localizedFooterDetails.ja },
    home: {
      heroTitle: 'AIでファイル名を変更。自動で。',
      heroAccent: '自動で。',
      heroSubtitle: 'Mac と Windows 向けの高速 AI ファイルリネーム。スクリーンショット、PDF、文書、ダウンロードを意味のある名前に自動変更します。',
      buyPro: 'PROを購入 🌟',
      trustSignals: ['✨ 無料で試せる', '💳 カード不要', '🚫 サブスクなし'],
      featuresTitle: 'Zush が AI でファイル名を変える仕組み',
      featuresDescription: 'シンプルで洗練された画面に強力な機能を搭載',
      supportedFormats: '対応ファイル形式',
      images: '画像',
      downloadTitle: 'Zush を無料で試す',
      downloadSubtitle: 'カスタムプロンプト、フォルダ監視、ワンクリック復元を備えた AI リネーム。',
      downloadHintPrefix: '無料 · クレジットカード不要',
      useCasesTitle: 'AI ファイルリネームを使う人',
      useCasesDescription: 'あなたのワークフローに近い役割を選んでください。',
      faqTitle: 'よくある質問',
      faqTitleAccent: '質問',
      faqDescription: 'Zush について知っておきたいこと',
      ...withLocalizedFileExamples('ja', localizedHomeDetails.ja),
    },
    pricing: { title: '一度払えば、ずっと使える', description: 'サブスクなし、隠れた料金なし。シンプルな買い切りです。', planName: 'Zush PRO 🌟', planDescription: '買い切り • 永続アクセス', billing: '買い切り', buttonText: 'Zush PRO を購入 🌟', buttonHint: '14日間返金保証 • Paddleで安全決済', features: localizedPricingFeatures.ja },
    seo: { '/': { title: 'Zush — Mac と Windows 向け AI ファイルリネーム', description: 'スクリーンショット、PDF、写真、文書を AI で自動リネーム。無料で試せます。' } },
    featurePages: localizedFeaturePages('よくある質問', '関連ツール', '関連ガイド', [
      { question: 'リネームを元に戻せますか？', answer: 'はい。Zush は履歴を保存するため、ワンクリックで元の名前に戻せます。' },
    ], [
      ['/rename-pdf-with-ai', 'AIでPDFをリネーム', '請求書、契約書、スキャン、フォームを PDF の内容でリネームします。'],
      ['/rename-documents-with-ai', 'AIで文書をリネーム', 'DOCX、XLSX、PPTX、TXT、CSV、メールを内容に基づいてリネームします。'],
      ['/rename-screenshots-with-ai', 'AIでスクリーンショットをリネーム', '内容に基づいて汎用的なスクリーンショット名を便利な名前に変えます。'],
      ['/rename-photos-with-ai', 'AIで写真をリネーム', 'HEIC、RAW、JPG などの写真を被写体やシーンでリネームします。'],
    ]),
  }),
  ko: localized({
    header: { features: '기능', pricing: '가격', faq: 'FAQ', blog: '블로그', buyPro: '🌟 PRO 구매', download: '다운로드', toggleTheme: '테마 전환', language: '언어', homeAria: '홈으로 이동', skipToContent: '콘텐츠로 건너뛰기' },
    downloadMenu: localizedDownloadMenu.ko,
    footer: { description: 'Mac 및 Windows용 AI 파일 이름 변경 — 파일을 자동으로 정리하세요', product: '제품', byFileType: '파일 유형별', resources: '리소스', support: '지원', pricing: '가격', contactSupport: '지원 문의', feedback: '기능 및 버그', terms: '이용 약관', privacy: '개인정보', refund: '환불 정책', ...localizedFooterDetails.ko },
    home: {
      heroTitle: 'AI로 파일 이름 변경. 자동으로.',
      heroAccent: '자동으로.',
      heroSubtitle: 'Mac과 Windows를 위한 빠른 AI 파일 이름 변경 도구. 스크린샷, PDF, 문서, 다운로드 파일을 의미 있는 이름으로 자동 변경합니다.',
      buyPro: 'PRO 구매 🌟',
      trustSignals: ['✨ 무료 체험', '💳 카드 불필요', '🚫 구독 없음'],
      featuresTitle: 'Zush가 AI로 파일 이름을 바꾸는 방식',
      featuresDescription: '간단하고 세련된 인터페이스에 담긴 강력한 기능',
      supportedFormats: '지원 파일 형식',
      images: '이미지',
      downloadTitle: 'Zush 무료 체험',
      downloadSubtitle: '사용자 지정 프롬프트, 폴더 모니터링, 원클릭 되돌리기를 갖춘 AI 파일 이름 변경.',
      downloadHintPrefix: '무료 · 카드 필요 없음',
      useCasesTitle: 'AI 파일 이름 변경을 쓰는 사람들',
      useCasesDescription: '작업 흐름에 가장 가까운 역할을 선택하세요.',
      faqTitle: '자주 묻는 질문',
      faqTitleAccent: '질문',
      faqDescription: 'Zush에 대해 알아야 할 모든 것',
      ...withLocalizedFileExamples('ko', localizedHomeDetails.ko),
    },
    pricing: { title: '한 번 결제하고 계속 사용', description: '구독도 숨겨진 비용도 없습니다. 단순한 일회성 구매입니다.', planName: 'Zush PRO 🌟', planDescription: '일회성 구매 • 평생 이용', billing: '일회성', buttonText: 'Zush PRO 구매 🌟', buttonHint: '14일 환불 보장 • Paddle 보안 결제', features: localizedPricingFeatures.ko },
    seo: { '/': { title: 'Zush — Mac 및 Windows용 AI 파일 이름 변경', description: '스크린샷, PDF, 사진, 문서를 AI로 자동 이름 변경하세요. 무료 체험 가능.' } },
    featurePages: localizedFeaturePages('자주 묻는 질문', '관련 도구', '관련 가이드', [
      { question: '이름 변경을 되돌릴 수 있나요?', answer: '예. Zush는 기록을 저장하므로 한 번의 클릭으로 원래 이름으로 되돌릴 수 있습니다.' },
    ], [
      ['/rename-pdf-with-ai', 'AI로 PDF 이름 변경', '송장, 계약서, 스캔, 양식을 PDF 텍스트와 맥락으로 이름 변경합니다.'],
      ['/rename-documents-with-ai', 'AI로 문서 이름 변경', 'DOCX, XLSX, PPTX, TXT, CSV, 이메일을 실제 내용으로 이름 변경합니다.'],
      ['/rename-screenshots-with-ai', 'AI로 스크린샷 이름 변경', '일반적인 스크린샷 이름을 화면 내용 기반의 유용한 이름으로 바꿉니다.'],
      ['/rename-photos-with-ai', 'AI로 사진 이름 변경', 'HEIC, RAW, JPG 등 사진을 피사체, 장면, 맥락으로 이름 변경합니다.'],
    ]),
  }),
  'zh-cn': localized({
    header: { features: '功能', pricing: '价格', faq: 'FAQ', blog: '博客', buyPro: '购买 🌟 PRO', download: '下载', toggleTheme: '切换主题', language: '语言', homeAria: '前往首页', skipToContent: '跳到内容' },
    downloadMenu: localizedDownloadMenu['zh-cn'],
    footer: {
      description: '适用于 Mac 和 Windows 的 AI 文件重命名工具 — 自动整理文件名',
      product: '产品',
      byFileType: '按文件类型',
      resources: '资源',
      support: '支持',
      pricing: '价格',
      blog: '博客',
      changelog: '更新日志',
      methodology: '方法说明',
      byokSetup: 'BYOK 设置指南',
      ollamaSetup: 'Ollama 设置指南',
      contactSupport: '联系支持',
      feedback: '功能与问题反馈',
      terms: '服务条款',
      privacy: '隐私政策',
      refund: '退款政策',
      appStoreKicker: '下载于',
      appStoreLabel: 'Mac App Store',
      appStoreAria: '在 Mac App Store 下载 Zush',
      microsoftStoreKicker: '下载自',
      microsoftStoreLabel: 'Microsoft Store',
      microsoftStoreAria: '从 Microsoft Store 获取 Zush',
      followX: '在 X 上关注 Zush',
      followYouTube: '在 YouTube 上关注 Zush',
      productHunt: 'Product Hunt 上的 Zush',
      designedBy: '设计',
      designedWith: '用',
      productLinks: {
        mac: 'Mac 版 Zush',
        windows: 'Windows 版 Zush',
        pdf: '重命名 PDF',
        photos: '重命名照片',
        screenshots: '重命名截图',
      },
    },
    home: {
      heroTitle: '用 AI 重命名文件。自动完成。',
      heroAccent: '自动完成。',
      heroSubtitle: '适用于 Mac 和 Windows 的高速 AI 文件重命名工具。自动为截图、PDF、文档和下载文件生成有意义的名称。',
      buyPro: '购买 PRO 🌟',
      trustSignals: ['✨ 免费试用', '💳 无需信用卡', '🚫 无订阅'],
      featuresTitle: 'Zush 如何用 AI 重命名文件',
      featuresDescription: '简洁优雅的界面，内置强大功能',
      supportedFormats: '支持的文件格式',
      images: '图片',
      downloadTitle: '免费试用 Zush',
      downloadSubtitle: '支持自定义提示词、文件夹监控和一键撤销的 AI 文件重命名。',
      downloadHintPrefix: '免费 · 无需信用卡',
      useCasesTitle: '谁在使用 AI 文件重命名',
      useCasesDescription: '选择最接近你工作流的角色。',
      faqTitle: '常见问题',
      faqTitleAccent: '问题',
      faqDescription: '关于 Zush 你需要了解的一切',
      ...withLocalizedFileExamples('zh-cn', localizedHomeDetails['zh-cn']),
    },
    pricing: {
      title: '一次付费，长期使用',
      description: '没有订阅，没有隐藏费用。只有简单的一次性购买。',
      planName: 'Zush PRO 🌟',
      planDescription: '一次性购买 • 永久访问',
      billing: '一次性',
      buttonText: '购买 Zush PRO 🌟',
      buttonHint: '14 天退款保证 • Paddle 安全支付',
      features: simpleFeatures([
        ['10,000 个额度', '最多处理 10,000 个文件，之后可使用 BYOK 或离线 AI 模式'],
        ['BYOK - 使用自己的密钥', '用自己的服务商密钥进行无限云端重命名'],
        ['离线 AI 模式', '通过 Ollama 使用私有本地模型'],
        ['文件夹监控', '新文件进入监控文件夹后自动重命名'],
        ['智能命名与元数据', '自定义命名模式并自动添加 Finder 元数据'],
        ['自定义 AI 提示词', '用自己的规则调整 AI 的命名和标签行为'],
        ['本地化（60+ 语言）', '用任意语言生成文件名，并支持自定义日期格式'],
        ['快速重命名快捷键', '在 Finder 中用键盘快捷键重命名选中文件'],
      ]),
    },
    platforms: {
      mac: {
        breadcrumbLabel: 'Zush for Mac',
        softwareName: 'Zush for Mac',
        softwareDescription: '适用于 macOS 的 AI 文件重命名工具。可用云端 AI 或通过 Ollama 使用离线 AI 模式来重命名截图、PDF、照片和文档。',
        heroTitle: '适用于 Mac 的 AI 文件重命名工具',
        heroSubtitle: '在 macOS 上用 AI 重命名截图、PDF、照片和文档。支持快速云端模型，也支持通过 Ollama 使用私有本地模型。',
        ctaTitle: '在 Mac 上免费试用 Zush',
        ctaSubtitle: '安装已签名的 macOS 应用，几分钟内开始整理截图、PDF、照片和文档。',
        faqDescription: '关于 Zush for Mac 和产品功能的常见问题。',
        features: [
          '用 AI 重命名截图、PDF、照片和文档',
          '文件夹监控，自动处理新文件',
          '批量重命名并支持逐个重新生成',
          '自定义文件名和元数据标签提示词',
          '从 Activity 记录一键恢复',
          '原生支持 Apple Silicon 和 Intel Mac',
          '60+ 语言和灵活日期格式',
          'BYOK 支持无限云端重命名',
          '通过 Ollama 使用离线 AI 模式',
        ],
        faqs: [
          { question: 'Zush 支持 Apple Silicon 吗？', answer: '支持。Zush 可在 Apple Silicon 和 Intel Mac 上原生运行，要求 macOS 14 或更新版本。' },
          { question: '应用经过 Apple 公证吗？', answer: '是的。.dmg 已签名并通过公证，Gatekeeper 可以在受支持的 macOS 版本上正常打开。' },
          { question: '可以离线使用 Zush 吗？', answer: '可以。PRO 用户可以通过 Ollama 的私有本地模型启用离线 AI 模式。' },
        ],
      },
      windows: {
        breadcrumbLabel: 'Zush for Windows',
        softwareName: 'Zush for Windows',
        softwareDescription: '适用于 Windows 的 AI 文件重命名工具。为截图、PDF、照片和文档生成清晰、有意义的文件名。',
        heroTitle: '适用于 Windows 的 AI 文件重命名工具',
        heroSubtitle: '在 Windows 上用 AI 重命名截图、PDF、照片和文档。通过 Microsoft Store 安装，自动更新，可免费试用且无需注册。',
        ctaTitle: '在 Windows 上免费试用 Zush',
        ctaSubtitle: '打开 Microsoft Store，使用完整 Windows 版本开始重命名截图、PDF、照片和文档。',
        faqDescription: '关于 Zush for Windows 和产品功能的常见问题。',
        features: [
          '用 AI 重命名截图、PDF、照片和文档',
          '文件夹监控，自动处理新文件',
          '批量重命名并支持逐个重新生成',
          '自定义文件名和元数据标签提示词',
          '从 Activity 记录一键恢复',
          'Microsoft Store 安装并自动更新',
          '60+ 语言和灵活日期格式',
          'BYOK 支持无限云端重命名',
          '通过 Ollama 使用离线 AI 模式',
        ],
        faqs: [
          { question: '为什么通过 Microsoft Store 分发？', answer: 'Microsoft Store 会处理安装、签名和自动更新，用户无需手动维护版本。' },
          { question: 'Windows 版和 Mac 版功能一样吗？', answer: '是的。Windows 版包含云端 AI 重命名、文件夹监控、自定义提示词、恢复历史、BYOK 和离线 AI 模式。' },
          { question: '支持 Windows on ARM 吗？', answer: '支持。Microsoft Store 版本包含 x64 和 ARM64 原生包。' },
        ],
      },
    },
    seo: {
      '/': { title: 'Zush — 适用于 Mac 和 Windows 的 AI 文件重命名工具', description: '用 AI 自动重命名截图、PDF、照片和文档。可免费试用。' },
      '/mac': { title: 'Zush for Mac — macOS AI 文件重命名工具', description: '在 Mac 上用 AI 重命名截图、PDF、照片和文档。支持 Apple Silicon、Intel、BYOK 和 Ollama 离线 AI。' },
      '/windows': { title: 'Zush for Windows — Windows AI 文件重命名工具', description: '在 Windows 上用 AI 重命名截图、PDF、照片和文档。通过 Microsoft Store 安装，可免费试用。' },
    },
    featurePages: localizedFeaturePages('常见问题', '相关工具', '相关指南', [
      { question: '可以撤销重命名吗？', answer: '可以。Zush 会保存重命名历史，你可以一键恢复原始文件名。' },
    ], [
      ['/rename-pdf-with-ai', '用 AI 重命名 PDF', '根据 PDF 文本和上下文重命名发票、合同、扫描件和表单。'],
      ['/rename-documents-with-ai', '用 AI 重命名文档', '根据实际内容重命名 DOCX、XLSX、PPTX、TXT、CSV 和邮件文件。'],
      ['/rename-screenshots-with-ai', '用 AI 重命名截图', '根据截图内容把通用文件名改成有用的名称。'],
      ['/rename-photos-with-ai', '用 AI 重命名照片', '根据主体、场景和上下文重命名 HEIC、RAW、JPG 等照片。'],
    ]),
  }),
  hi: localized({
    header: {
      features: 'विशेषताएं',
      pricing: 'मूल्य',
      faq: 'सवाल-जवाब',
      blog: 'ब्लॉग',
      buyPro: '🌟 PRO खरीदें',
      download: 'डाउनलोड',
      toggleTheme: 'थीम बदलें',
      language: 'भाषा',
      homeAria: 'होमपेज पर जाएँ',
      skipToContent: 'मुख्य सामग्री पर जाएँ',
    },
    downloadMenu: localizedDownloadMenu.hi,
    footer: {
      description: 'Mac और Windows के लिए AI फ़ाइल नाम-बदलाव टूल — फ़ाइलों के नाम अपने-आप बदलें',
      product: 'उत्पाद',
      byFileType: 'फ़ाइल प्रकार के अनुसार',
      resources: 'संसाधन',
      support: 'सहायता',
      pricing: 'मूल्य',
      contactSupport: 'सहायता से संपर्क करें',
      feedback: 'सुविधाएँ और बग रिपोर्ट',
      terms: 'शर्तें',
      privacy: 'गोपनीयता',
      refund: 'रिफंड नीति',
      ...localizedFooterDetails.hi,
    },
    home: {
      heroTitle: 'फ़ाइलों के नाम AI से बदलें। अपने-आप।',
      heroAccent: 'अपने-आप।',
      heroSubtitle: 'Mac और Windows के लिए तेज़ AI फ़ाइल नाम-बदलाव टूल। स्क्रीनशॉट, PDF और दस्तावेज़ों को उपयोगी नामों से अपने-आप नाम दें — फ़ोल्डर निगरानी, BYOK और Offline AI शामिल।',
      buyPro: 'PRO खरीदें 🌟',
      trustSignals: ['✨ मुफ़्त आज़माएँ', '💳 क्रेडिट कार्ड नहीं चाहिए', '🚫 कोई सब्सक्रिप्शन नहीं'],
      featuresTitle: 'Zush AI आपकी फ़ाइलों के नाम कैसे बदलता है',
      featuresDescription: 'सरल, सुंदर इंटरफ़ेस में शक्तिशाली सुविधाएँ',
      supportedFormats: 'समर्थित फ़ाइल फ़ॉर्मैट',
      images: 'इमेज',
      downloadTitle: 'Zush मुफ़्त आज़माएँ',
      downloadSubtitle: 'कस्टम प्रॉम्प्ट, फ़ोल्डर निगरानी और एक-क्लिक वापसी के साथ AI फ़ाइल नाम-बदलाव।',
      downloadHintPrefix: 'मुफ़्त · क्रेडिट कार्ड नहीं चाहिए',
      useCasesTitle: 'AI फ़ाइल नाम-बदलाव कौन इस्तेमाल करता है',
      useCasesDescription: 'अपने काम के ढंग के सबसे करीब भूमिका चुनें। हर कार्ड उसी तरह की फ़ाइल अव्यवस्था के लिए बनी Zush पेज पर जाता है।',
      faqTitle: 'अक्सर पूछे जाने वाले सवाल',
      faqTitleAccent: 'सवाल',
      faqDescription: 'Zush के बारे में जरूरी सब कुछ एक जगह',
      ...withLocalizedFileExamples('hi', localizedHomeDetails.hi),
    },
    pricing: {
      title: 'एक बार भुगतान करें, हमेशा इस्तेमाल करें',
      description: 'कोई सब्सक्रिप्शन नहीं, कोई छिपा शुल्क नहीं। सिर्फ़ सरल एक बार की खरीद।',
      planName: 'Zush PRO 🌟',
      planDescription: 'एक बार की खरीद • आजीवन एक्सेस',
      billing: 'एक बार',
      buttonText: 'Zush PRO खरीदें 🌟',
      buttonHint: '14 दिन की पैसे-वापसी गारंटी • Paddle के ज़रिए सुरक्षित',
      features: localizedPricingFeatures.hi,
    },
    platforms: {
      mac: {
        breadcrumbLabel: 'Mac के लिए Zush',
        softwareName: 'Mac के लिए Zush',
        softwareDescription:
          'macOS के लिए AI फ़ाइल नाम-बदलाव टूल। स्क्रीनशॉट, PDF, फ़ोटो और दस्तावेज़ों के नाम क्लाउड AI या Ollama के Offline AI मोड से बदलें।',
        heroTitle: 'Mac के लिए AI फ़ाइल नाम-बदलाव टूल',
        heroSubtitle:
          'macOS पर स्क्रीनशॉट, PDF, फ़ोटो और दस्तावेज़ों के नाम AI से बदलें। तेज़ क्लाउड मॉडल या Ollama के निजी स्थानीय मॉडल वाला Offline AI मोड इस्तेमाल करें।',
        ctaTitle: 'Mac पर Zush मुफ़्त आज़माएँ',
        ctaSubtitle: 'Signed macOS ऐप इंस्टॉल करें और कुछ मिनटों में स्क्रीनशॉट, PDF, फ़ोटो और दस्तावेज़ों के नाम बदलना शुरू करें।',
        faqDescription: 'Mac के लिए Zush और बाकी उत्पाद के बारे में जरूरी बातें।',
        features: [
          'स्क्रीनशॉट, PDF, फ़ोटो और दस्तावेज़ों के लिए AI नाम-बदलाव',
          'नई फ़ाइलों और नियमित सफ़ाई के लिए फ़ोल्डर निगरानी',
          'हर फ़ाइल को दोबारा बनाने के विकल्प के साथ एक साथ नाम बदलना',
          'नाम और मेटाडेटा टैग के लिए कस्टम प्रॉम्प्ट',
          'गतिविधि लॉग से एक-क्लिक वापसी',
          'Apple Silicon और Intel के लिए नेटिव बिल्ड',
          '60+ भाषाएँ और लचीले तारीख़ फ़ॉर्मैट',
          'असीमित क्लाउड नाम-बदलाव के लिए BYOK',
          'Ollama के ज़रिए Offline AI मोड',
        ],
        faqs: [
          { question: 'क्या Zush Apple Silicon पर चलता है?', answer: 'हाँ। Zush macOS 14 या नए संस्करण वाले Apple Silicon और Intel Mac पर नेटिव चलता है।' },
          { question: 'क्या ऐप Apple से notarized है?', answer: 'हाँ। .dmg code-signed और notarized है, इसलिए समर्थित macOS संस्करणों पर Gatekeeper इसे सामान्य रूप से खोलता है।' },
          { question: 'क्या मैं Zush ऑफ़लाइन इस्तेमाल कर सकता हूँ?', answer: 'हाँ। PRO यूज़र Ollama के निजी स्थानीय मॉडल के साथ Offline AI मोड चालू कर सकते हैं।' },
        ],
      },
      windows: {
        breadcrumbLabel: 'Windows के लिए Zush',
        softwareName: 'Windows के लिए Zush',
        softwareDescription:
          'Windows के लिए AI फ़ाइल नाम-बदलाव टूल। स्क्रीनशॉट, PDF, फ़ोटो और दस्तावेज़ों को स्पष्ट नाम दें।',
        heroTitle: 'Windows के लिए AI फ़ाइल नाम-बदलाव टूल',
        heroSubtitle:
          'Windows पर स्क्रीनशॉट, PDF, फ़ोटो और दस्तावेज़ों के नाम AI से बदलें। Microsoft Store से इंस्टॉल होता है, अपने-आप अपडेट मिलता है, मुफ़्त आज़मा सकते हैं और साइनअप की ज़रूरत नहीं।',
        ctaTitle: 'Windows पर Zush मुफ़्त आज़माएँ',
        ctaSubtitle: 'Microsoft Store खोलें और पूरे Windows बिल्ड से स्क्रीनशॉट, PDF, फ़ोटो और दस्तावेज़ों के नाम बदलना शुरू करें।',
        faqDescription: 'Windows के लिए Zush और बाकी उत्पाद के बारे में जरूरी बातें।',
        features: [
          'स्क्रीनशॉट, PDF, फ़ोटो और दस्तावेज़ों के लिए AI नाम-बदलाव',
          'नई फ़ाइलों और नियमित सफ़ाई के लिए फ़ोल्डर निगरानी',
          'हर फ़ाइल को दोबारा बनाने के विकल्प के साथ एक साथ नाम बदलना',
          'नाम और मेटाडेटा टैग के लिए कस्टम प्रॉम्प्ट',
          'गतिविधि लॉग से एक-क्लिक वापसी',
          'अपने-आप अपडेट के साथ Microsoft Store इंस्टॉल',
          '60+ भाषाएँ और लचीले तारीख़ फ़ॉर्मैट',
          'असीमित क्लाउड नाम-बदलाव के लिए BYOK',
          'Ollama के ज़रिए Offline AI मोड',
        ],
        faqs: [
          { question: 'Zush Microsoft Store से क्यों मिलता है?', answer: 'Microsoft Store हर यूज़र के लिए इंस्टॉलेशन, signing और अपने-आप अपडेट संभालता है।' },
          { question: 'क्या Windows वाला Zush Mac जैसी ही सुविधाएँ देता है?', answer: 'हाँ। इसमें क्लाउड AI नाम-बदलाव, फ़ोल्डर निगरानी, कस्टम प्रॉम्प्ट, वापसी इतिहास, BYOK और Offline AI मोड शामिल हैं।' },
          { question: 'क्या यह Windows on ARM पर चलता है?', answer: 'हाँ। Microsoft Store release में नेटिव x64 और ARM64 पैकेज शामिल हैं।' },
        ],
      },
    },
    seo: {
      '/': {
        title: 'Zush — Mac और Windows पर AI से फ़ाइलों के नाम बदलें',
        description: 'स्क्रीनशॉट, PDF, फ़ोटो और दस्तावेज़ों के नाम सेकंडों में बदलें। Mac और Windows पर एक साथ नाम बदलें या फ़ोल्डर देखें। मुफ़्त आज़माएँ।',
      },
      '/mac': {
        title: 'Mac के लिए Zush — macOS AI फ़ाइल नाम-बदलाव टूल',
        description: 'Mac पर स्क्रीनशॉट, PDF, फ़ोटो और दस्तावेज़ों के नाम AI से बदलें। Apple Silicon, Intel, BYOK और Ollama Offline AI सपोर्ट।',
      },
      '/windows': {
        title: 'Windows के लिए Zush — AI फ़ाइल नाम-बदलाव टूल',
        description: 'Windows पर स्क्रीनशॉट, PDF, फ़ोटो और दस्तावेज़ों के नाम AI से बदलें। Microsoft Store इंस्टॉल, अपने-आप अपडेट और मुफ़्त ट्रायल।',
      },
    },
    featurePages: localizedFeaturePages('अक्सर पूछे जाने वाले सवाल', 'संबंधित टूल', 'संबंधित गाइड', [
      { question: 'क्या मैं नाम-बदलाव वापस कर सकता हूँ?', answer: 'हाँ। Zush नाम-बदलाव इतिहास रखता है ताकि आप फ़ाइलों को एक क्लिक में मूल नामों पर वापस ला सकें।' },
    ], [
      ['/rename-pdf-with-ai', 'AI से PDF के नाम बदलें', 'इनवॉइस, कॉन्ट्रैक्ट, स्कैन और फ़ॉर्म को PDF के टेक्स्ट और संदर्भ के आधार पर नाम दें।'],
      ['/rename-documents-with-ai', 'AI से दस्तावेज़ों के नाम बदलें', 'DOCX, XLSX, PPTX, TXT, CSV और ईमेल फ़ाइलों को उनके वास्तविक कॉन्टेंट से नाम दें।'],
      ['/rename-screenshots-with-ai', 'AI से स्क्रीनशॉट के नाम बदलें', 'सामान्य स्क्रीनशॉट नामों को हर स्क्रीनशॉट के कॉन्टेंट पर आधारित उपयोगी नामों से बदलें।'],
      ['/rename-photos-with-ai', 'AI से फ़ोटो के नाम बदलें', 'HEIC, RAW, JPG और दूसरी फ़ोटो को विषय, दृश्य और संदर्भ के आधार पर नाम दें।'],
    ]),
  }),
  ar: localized({
    header: {
      features: 'الميزات',
      pricing: 'السعر',
      faq: 'FAQ',
      blog: 'المدونة',
      buyPro: 'شراء 🌟 PRO',
      download: 'تنزيل',
      toggleTheme: 'تبديل السمة',
      language: 'اللغة',
      homeAria: 'الانتقال إلى الصفحة الرئيسية',
      skipToContent: 'تخطي إلى المحتوى',
    },
    downloadMenu: localizedDownloadMenu.ar,
    footer: {
      description: 'أداة إعادة تسمية الملفات بالذكاء الاصطناعي لنظامي Mac وWindows — أعد تسمية ملفاتك تلقائيا',
      product: 'المنتج',
      byFileType: 'حسب نوع الملف',
      resources: 'الموارد',
      support: 'الدعم',
      pricing: 'السعر',
      contactSupport: 'التواصل مع الدعم',
      feedback: 'الميزات وتقارير الأخطاء',
      terms: 'شروط الخدمة',
      privacy: 'سياسة الخصوصية',
      refund: 'سياسة الاسترداد',
      ...localizedFooterDetails.ar,
    },
    home: {
      heroTitle: 'أعد تسمية الملفات بالذكاء الاصطناعي. تلقائيا.',
      heroAccent: 'تلقائيا.',
      heroSubtitle: 'أداة سريعة لإعادة تسمية الملفات بالذكاء الاصطناعي على Mac وWindows. أعد تسمية لقطات الشاشة وPDF والمستندات والتنزيلات بأسماء مفهومة — مع تجربة مجانية.',
      buyPro: 'شراء PRO 🌟',
      trustSignals: ['✨ تجربة مجانية', '💳 بدون بطاقة ائتمان', '🚫 بدون اشتراك'],
      featuresTitle: 'كيف يعيد Zush تسمية ملفاتك بالذكاء الاصطناعي',
      featuresDescription: 'ميزات قوية داخل واجهة بسيطة وأنيقة',
      supportedFormats: 'صيغ الملفات المدعومة',
      images: 'الصور',
      downloadTitle: 'جرّب Zush مجانا',
      downloadSubtitle: 'إعادة تسمية بالذكاء الاصطناعي مع تعليمات مخصصة، مراقبة المجلدات، وتراجع بنقرة واحدة.',
      downloadHintPrefix: 'مجاني · لا تحتاج إلى بطاقة ائتمان',
      useCasesTitle: 'من يستخدم إعادة تسمية الملفات بالذكاء الاصطناعي',
      useCasesDescription: 'اختر الدور الأقرب إلى سير عملك. كل بطاقة تقود إلى صفحة Zush المناسبة لفوضى ملفاتك.',
      faqTitle: 'الأسئلة الشائعة',
      faqTitleAccent: 'الشائعة',
      faqDescription: 'كل ما تحتاج إلى معرفته عن Zush في مكان واحد',
      ...withLocalizedFileExamples('ar', localizedHomeDetails.ar),
    },
    pricing: {
      title: 'ادفع مرة واحدة واستخدمه دائما',
      description: 'لا اشتراكات ولا رسوم مخفية. شراء بسيط لمرة واحدة فقط.',
      planName: 'Zush PRO 🌟',
      planDescription: 'شراء لمرة واحدة • وصول دائم',
      billing: 'مرة واحدة',
      buttonText: 'شراء Zush PRO 🌟',
      buttonHint: 'ضمان استرداد 14 يوما • دفع آمن عبر Paddle',
      features: localizedPricingFeatures.ar,
    },
    platforms: {
      mac: {
        breadcrumbLabel: 'Zush لنظام Mac',
        softwareName: 'Zush لنظام Mac',
        softwareDescription:
          'أداة إعادة تسمية ملفات بالذكاء الاصطناعي لنظام macOS. أعد تسمية لقطات الشاشة وملفات PDF والصور والمستندات عبر الذكاء الاصطناعي السحابي أو وضع الذكاء الاصطناعي دون اتصال عبر Ollama.',
        heroTitle: 'أداة إعادة تسمية الملفات بالذكاء الاصطناعي لنظام Mac',
        heroSubtitle:
          'أعد تسمية لقطات الشاشة وملفات PDF والصور والمستندات على macOS بالذكاء الاصطناعي. استخدم نماذج سحابية سريعة أو وضع الذكاء الاصطناعي دون اتصال مع نماذج محلية خاصة عبر Ollama.',
        ctaTitle: 'جرّب Zush مجانا على Mac',
        ctaSubtitle: 'ثبّت تطبيق macOS الموقّع وابدأ إعادة تسمية لقطات الشاشة وملفات PDF والصور والمستندات خلال دقائق.',
        faqDescription: 'كل ما تحتاج إلى معرفته عن Zush لنظام Mac وبقية المنتج.',
        features: [
          'إعادة تسمية بالذكاء الاصطناعي للقطات الشاشة وملفات PDF والصور والمستندات',
          'مراقبة المجلدات للملفات الجديدة والتنظيف المتكرر',
          'إعادة تسمية دفعات مع إعادة توليد لكل ملف',
          'تعليمات مخصصة للأسماء ووسوم البيانات الوصفية',
          'تراجع بنقرة واحدة من سجل النشاط',
          'إصدار أصلي لمعالجات Apple Silicon وIntel',
          'أكثر من 60 لغة وتنسيقات تاريخ مرنة',
          'BYOK لإعادة تسمية سحابية غير محدودة',
          'وضع الذكاء الاصطناعي دون اتصال عبر Ollama',
        ],
        faqs: [
          { question: 'هل يعمل Zush على Apple Silicon؟', answer: 'نعم. يعمل Zush أصليا على أجهزة Mac بمعالجات Apple Silicon وIntel التي تستخدم macOS 14 أو أحدث.' },
          { question: 'هل التطبيق موثّق من Apple؟', answer: 'نعم. ملف .dmg موقّع وموثّق، لذلك يفتحه Gatekeeper بشكل طبيعي على إصدارات macOS المدعومة.' },
          { question: 'هل يمكن استخدام Zush دون اتصال؟', answer: 'نعم. يمكن لمستخدمي PRO تفعيل وضع الذكاء الاصطناعي دون اتصال باستخدام نماذج محلية خاصة عبر Ollama.' },
        ],
      },
      windows: {
        breadcrumbLabel: 'Zush لنظام Windows',
        softwareName: 'Zush لنظام Windows',
        softwareDescription:
          'أداة إعادة تسمية ملفات بالذكاء الاصطناعي لنظام Windows. أعد تسمية لقطات الشاشة وملفات PDF والصور والمستندات بأسماء وصفية.',
        heroTitle: 'أداة إعادة تسمية الملفات بالذكاء الاصطناعي لنظام Windows',
        heroSubtitle:
          'أعد تسمية لقطات الشاشة وملفات PDF والصور والمستندات على Windows بالذكاء الاصطناعي. يثبّت من Microsoft Store مع تحديثات تلقائية وتجربة مجانية دون تسجيل.',
        ctaTitle: 'جرّب Zush مجانا على Windows',
        ctaSubtitle: 'افتح Microsoft Store وابدأ إعادة تسمية لقطات الشاشة وملفات PDF والصور والمستندات بإصدار Windows الكامل.',
        faqDescription: 'كل ما تحتاج إلى معرفته عن Zush لنظام Windows وبقية المنتج.',
        features: [
          'إعادة تسمية بالذكاء الاصطناعي للقطات الشاشة وملفات PDF والصور والمستندات',
          'مراقبة المجلدات للملفات الجديدة والتنظيف المتكرر',
          'إعادة تسمية دفعات مع إعادة توليد لكل ملف',
          'تعليمات مخصصة للأسماء ووسوم البيانات الوصفية',
          'تراجع بنقرة واحدة من سجل النشاط',
          'تثبيت من Microsoft Store مع تحديثات تلقائية',
          'أكثر من 60 لغة وتنسيقات تاريخ مرنة',
          'BYOK لإعادة تسمية سحابية غير محدودة',
          'وضع الذكاء الاصطناعي دون اتصال عبر Ollama',
        ],
        faqs: [
          { question: 'لماذا يتم توزيع Zush عبر Microsoft Store؟', answer: 'يتولى Microsoft Store التثبيت والتوقيع والتحديثات التلقائية لكل مستخدم.' },
          { question: 'هل يملك Zush على Windows نفس ميزات Mac؟', answer: 'نعم. يتضمن إعادة التسمية السحابية بالذكاء الاصطناعي، مراقبة المجلدات، التعليمات المخصصة، سجل التراجع، BYOK، ووضع الذكاء الاصطناعي دون اتصال.' },
          { question: 'هل يعمل على Windows on ARM؟', answer: 'نعم. يتضمن إصدار Microsoft Store حزم x64 وARM64 أصلية.' },
        ],
      },
    },
    seo: {
      '/': {
        title: 'Zush — إعادة تسمية الملفات بالذكاء الاصطناعي على Mac وWindows',
        description: 'أعد تسمية لقطات الشاشة وPDF والصور والمستندات خلال ثوان. أعد التسمية دفعة واحدة أو راقب المجلدات على Mac وWindows. تجربة مجانية.',
      },
      '/mac': {
        title: 'Zush لنظام Mac — أداة إعادة تسمية ملفات بالذكاء الاصطناعي',
        description: 'أعد تسمية لقطات الشاشة وملفات PDF والصور والمستندات على Mac بالذكاء الاصطناعي. يدعم Apple Silicon وIntel وBYOK ووضع Ollama دون اتصال.',
      },
      '/windows': {
        title: 'Zush لنظام Windows — أداة إعادة تسمية ملفات بالذكاء الاصطناعي',
        description: 'أعد تسمية لقطات الشاشة وملفات PDF والصور والمستندات على Windows بالذكاء الاصطناعي. تثبيت من Microsoft Store وتحديثات تلقائية وتجربة مجانية.',
      },
    },
    featurePages: localizedFeaturePages('الأسئلة الشائعة', 'أدوات ذات صلة', 'أدلة ذات صلة', [
      { question: 'هل يمكنني التراجع عن إعادة التسمية؟', answer: 'نعم. يحتفظ Zush بسجل لإعادة التسمية حتى تتمكن من إعادة الملفات إلى أسمائها الأصلية بنقرة واحدة.' },
    ], [
      ['/rename-pdf-with-ai', 'إعادة تسمية ملفات PDF بالذكاء الاصطناعي', 'أعد تسمية الفواتير والعقود والمسحات والنماذج بحسب النص والسياق داخل ملف PDF.'],
      ['/rename-documents-with-ai', 'إعادة تسمية المستندات بالذكاء الاصطناعي', 'أعد تسمية DOCX وXLSX وPPTX وTXT وCSV وملفات البريد بحسب محتواها الفعلي.'],
      ['/rename-screenshots-with-ai', 'إعادة تسمية لقطات الشاشة بالذكاء الاصطناعي', 'استبدل أسماء لقطات الشاشة العامة بأسماء مفيدة مبنية على ما يظهر في كل لقطة.'],
      ['/rename-photos-with-ai', 'إعادة تسمية الصور الفوتوغرافية بالذكاء الاصطناعي', 'أعد تسمية صور HEIC وRAW وJPG وغيرها بحسب الموضوع والمشهد والسياق.'],
    ]),
  }),
};

export function getCopy(locale: Locale): LocaleCopy {
  return COPY[locale] ?? COPY.en;
}
