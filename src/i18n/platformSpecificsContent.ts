import type {
  PlatformSpecificsContent,
  PlatformSpecificsKey,
  SpecKey,
} from '@/data/platformSpecifics';
import { DEFAULT_LOCALE, type Locale } from '@/i18n/config';
import type { LocaleCopy } from '@/i18n/copy';
import type { PlatformSpecificsCopy } from '@/i18n/platformSpecifics';

const REQUIREMENT_LABELS: Partial<Record<Locale, Record<SpecKey, string>>> = {
  en: {
    operatingSystem: 'Operating system',
    processor: 'Processor',
    memory: 'Memory',
    diskSpace: 'Disk space',
    network: 'Network',
    permissions: 'Permissions',
  },
  de: {
    operatingSystem: 'Betriebssystem',
    processor: 'Prozessor',
    memory: 'Arbeitsspeicher',
    diskSpace: 'Speicherplatz',
    network: 'Netzwerk',
    permissions: 'Berechtigungen',
  },
  fr: {
    operatingSystem: 'Système',
    processor: 'Processeur',
    memory: 'Mémoire',
    diskSpace: 'Espace disque',
    network: 'Réseau',
    permissions: 'Autorisations',
  },
  'pt-br': {
    operatingSystem: 'Sistema operacional',
    processor: 'Processador',
    memory: 'Memória',
    diskSpace: 'Espaço em disco',
    network: 'Rede',
    permissions: 'Permissões',
  },
  es: {
    operatingSystem: 'Sistema operativo',
    processor: 'Procesador',
    memory: 'Memoria',
    diskSpace: 'Espacio en disco',
    network: 'Red',
    permissions: 'Permisos',
  },
  nl: {
    operatingSystem: 'Besturingssysteem',
    processor: 'Processor',
    memory: 'Geheugen',
    diskSpace: 'Schijfruimte',
    network: 'Netwerk',
    permissions: 'Machtigingen',
  },
  it: {
    operatingSystem: 'Sistema operativo',
    processor: 'Processore',
    memory: 'Memoria',
    diskSpace: 'Spazio su disco',
    network: 'Rete',
    permissions: 'Permessi',
  },
  ja: {
    operatingSystem: '対応 OS',
    processor: 'プロセッサ',
    memory: 'メモリ',
    diskSpace: 'ディスク容量',
    network: 'ネットワーク',
    permissions: '権限',
  },
  ko: {
    operatingSystem: '운영체제',
    processor: '프로세서',
    memory: '메모리',
    diskSpace: '디스크 공간',
    network: '네트워크',
    permissions: '권한',
  },
  'zh-cn': {
    operatingSystem: '操作系统',
    processor: '处理器',
    memory: '内存',
    diskSpace: '磁盘空间',
    network: '网络',
    permissions: '权限',
  },
  ar: {
    operatingSystem: 'نظام التشغيل',
    processor: 'المعالج',
    memory: 'الذاكرة',
    diskSpace: 'مساحة القرص',
    network: 'الشبكة',
    permissions: 'الأذونات',
  },
};

const REQUIREMENT_TEXT: Partial<Record<Locale, {
  memory: string;
  network: string;
  permissions: string;
  diskSpace: (appSize: string) => string;
}>> = {
  en: {
    memory: '4 GB minimum, 8 GB recommended for Offline AI',
    diskSpace: (appSize) => `${appSize} for the app, additional space for Ollama models`,
    network: 'Required for cloud renaming, optional for Offline AI mode',
    permissions: 'Folder access is requested when you add folders to rename or monitor',
  },
  de: {
    memory: '4 GB Minimum, 8 GB für Offline-KI empfohlen',
    diskSpace: (appSize) => `${appSize} für die App, zusätzlicher Speicher für Ollama-Modelle`,
    network: 'Für Cloud-Umbenennung erforderlich, für Offline-KI optional',
    permissions: 'Ordnerzugriff wird angefragt, wenn du Ordner zum Umbenennen oder Überwachen hinzufügst',
  },
  fr: {
    memory: '4 Go minimum, 8 Go recommandés pour l’IA hors ligne',
    diskSpace: (appSize) => `${appSize} pour l’app, espace supplémentaire pour les modèles Ollama`,
    network: 'Requis pour le renommage cloud, optionnel pour le mode IA hors ligne',
    permissions: 'L’accès aux dossiers est demandé lorsque vous ajoutez des dossiers à renommer ou surveiller',
  },
  'pt-br': {
    memory: '4 GB mínimo, 8 GB recomendados para IA offline',
    diskSpace: (appSize) => `${appSize} para o app, espaço extra para modelos Ollama`,
    network: 'Necessário para renomeação cloud, opcional no modo IA offline',
    permissions: 'O acesso a pastas é solicitado quando você adiciona pastas para renomear ou monitorar',
  },
  es: {
    memory: '4 GB mínimo, 8 GB recomendados para IA offline',
    diskSpace: (appSize) => `${appSize} para la app, espacio adicional para modelos Ollama`,
    network: 'Necesaria para el renombrado cloud, opcional en modo IA offline',
    permissions: 'El acceso a carpetas se solicita cuando añades carpetas para renombrar o monitorizar',
  },
  nl: {
    memory: '4 GB minimaal, 8 GB aanbevolen voor Offline AI',
    diskSpace: (appSize) => `${appSize} voor de app, extra ruimte voor Ollama-modellen`,
    network: 'Vereist voor cloudhernoemen, optioneel voor Offline AI',
    permissions: 'Maptoegang wordt gevraagd wanneer je mappen toevoegt om te hernoemen of te bewaken',
  },
  it: {
    memory: '4 GB minimi, 8 GB consigliati per IA offline',
    diskSpace: (appSize) => `${appSize} per l’app, spazio aggiuntivo per i modelli Ollama`,
    network: 'Necessaria per la rinomina cloud, opzionale per la modalità IA offline',
    permissions: 'L’accesso alle cartelle viene richiesto quando aggiungi cartelle da rinominare o monitorare',
  },
  ja: {
    memory: '最小 4 GB、オフライン AI には 8 GB 推奨',
    diskSpace: (appSize) => `アプリに ${appSize}、Ollama モデル用に追加容量`,
    network: 'クラウドリネームには必要、オフライン AI では任意',
    permissions: 'リネームまたは監視するフォルダを追加するときにフォルダアクセスを要求します',
  },
  ko: {
    memory: '최소 4 GB, 오프라인 AI는 8 GB 권장',
    diskSpace: (appSize) => `앱에 ${appSize}, Ollama 모델용 추가 공간`,
    network: '클라우드 이름 변경에는 필요, 오프라인 AI 모드에서는 선택 사항',
    permissions: '이름 변경 또는 모니터링할 폴더를 추가할 때 폴더 접근 권한을 요청합니다',
  },
  'zh-cn': {
    memory: '最低 4 GB，离线 AI 建议 8 GB',
    diskSpace: (appSize) => `应用约 ${appSize}，Ollama 模型需要额外空间`,
    network: '云端重命名需要网络，离线 AI 模式可选',
    permissions: '添加要重命名或监控的文件夹时会请求文件夹访问权限',
  },
  ar: {
    memory: '4 GB كحد أدنى، و8 GB موصى بها لوضع الذكاء الاصطناعي دون اتصال',
    diskSpace: (appSize) => `${appSize} للتطبيق، مع مساحة إضافية لنماذج Ollama`,
    network: 'مطلوبة لإعادة التسمية السحابية، واختيارية لوضع الذكاء الاصطناعي دون اتصال',
    permissions: 'يُطلب الوصول إلى المجلدات عندما تضيف مجلدات لإعادة التسمية أو المراقبة',
  },
};

function appSizeFor(platform: PlatformSpecificsKey): string {
  return platform === 'mac' ? '~200 MB' : '~250 MB';
}

function osLabelFor(platform: PlatformSpecificsKey): string {
  return platform === 'mac' ? 'macOS' : 'Windows';
}

function localizedAfterNames(copy: LocaleCopy): string[] {
  return copy.home.showcaseSlides.flatMap((slide) => slide.files.map((file) => file.after));
}

function platformInstallMethods(
  platform: PlatformSpecificsKey,
  localeCopy: LocaleCopy,
  sectionCopy: PlatformSpecificsCopy,
  fallback: PlatformSpecificsContent,
): PlatformSpecificsContent['installMethods'] {
  const platformCopy = localeCopy.platforms[platform];

  return fallback.installMethods.map((method) => {
    const isAppStore = method.storeBadge.kind === 'app-store';
    const isMicrosoftStore = method.storeBadge.kind === 'microsoft-store';
    const label = isAppStore
      ? localeCopy.footer.appStoreLabel
      : isMicrosoftStore
        ? localeCopy.footer.microsoftStoreLabel
        : localeCopy.downloadMenu.macDirectHint;
    const kicker = isAppStore
      ? localeCopy.footer.appStoreKicker
      : isMicrosoftStore
        ? localeCopy.footer.microsoftStoreKicker
        : localeCopy.header.download;

    return {
      ...method,
      title: label,
      badge: method.recommended ? sectionCopy.installRecommendedBadge : method.badge,
      description: platformCopy.ctaSubtitle,
      steps: [
        { step: localeCopy.header.download, detail: platformCopy.ctaSubtitle },
        {
          step: localeCopy.home.featureCards.batchRename.title,
          detail: localeCopy.home.featureCards.batchRename.description,
        },
        {
          step: localeCopy.home.featureCards.foldersMonitoring.title,
          detail: localeCopy.home.featureCards.foldersMonitoring.description,
        },
      ],
      storeBadge: {
        ...method.storeBadge,
        kicker,
        label,
        ariaLabel: platformCopy.ctaTitle,
      },
    };
  });
}

export function getLocalizedPlatformSpecificsContent(
  platform: PlatformSpecificsKey,
  locale: Locale,
  localeCopy: LocaleCopy,
  sectionCopy: PlatformSpecificsCopy,
  fallback: PlatformSpecificsContent,
): PlatformSpecificsContent {
  if (locale === DEFAULT_LOCALE) return fallback;

  const labels = REQUIREMENT_LABELS[locale] ?? REQUIREMENT_LABELS[DEFAULT_LOCALE]!;
  const requirementText = REQUIREMENT_TEXT[locale] ?? REQUIREMENT_TEXT[DEFAULT_LOCALE]!;
  const afterNames = localizedAfterNames(localeCopy);
  const osLabel = osLabelFor(platform);
  const platformCopy = localeCopy.platforms[platform];

  return {
    systemRequirements: {
      rows: fallback.systemRequirements.rows.map((row) => ({
        ...row,
        label: labels[row.key],
        value:
          row.key === 'memory'
            ? requirementText.memory
            : row.key === 'diskSpace'
              ? requirementText.diskSpace(appSizeFor(platform))
              : row.key === 'network'
                ? requirementText.network
                : row.key === 'permissions'
                  ? requirementText.permissions
                  : row.value,
      })),
    },
    installMethods: platformInstallMethods(platform, localeCopy, sectionCopy, fallback),
    quickstart: [
      {
        title: platformCopy.ctaTitle,
        detail: platformCopy.ctaSubtitle,
        duration: '~10s',
        preview: 'launch',
      },
      {
        title: localeCopy.home.featureCards.aiAnalysis.title,
        detail: localeCopy.home.featureCards.aiAnalysis.description,
        duration: '~20s',
        preview: 'drop',
      },
      {
        title: localeCopy.home.featureCards.batchRename.title,
        detail: localeCopy.home.featureCards.batchRename.description,
        duration: '~20s',
        preview: 'review',
      },
      {
        title: localeCopy.home.featureCards.foldersMonitoring.title,
        detail: localeCopy.home.featureCards.foldersMonitoring.description,
        duration: '~10s',
        preview: 'watch',
      },
    ],
    integrations: [
      {
        title: localeCopy.home.whyZush.nativeTitle,
        description: localeCopy.home.whyZush.nativeDescriptionPlatform.replace('{os}', osLabel),
      },
      localeCopy.home.featureCards.foldersMonitoring,
      localeCopy.home.featureCards.batchRename,
      localeCopy.home.featureCards.customPrompts,
      localeCopy.home.featureCards.byok,
      localeCopy.home.featureCards.offlineAi,
    ],
    scenarios: fallback.scenarios.map((scenario, index) => {
      const useCase = localeCopy.home.useCases.items[index];
      return {
        ...scenario,
        title: useCase?.title ?? scenario.title,
        description: useCase?.description ?? scenario.description,
        after: afterNames[index] ?? scenario.after,
      };
    }),
    security: [
      {
        title: platformCopy.softwareName,
        description: platformCopy.softwareDescription,
      },
      localeCopy.home.featureCards.offlineAi,
      localeCopy.home.featureCards.byok,
      localeCopy.home.featureCards.renameHistory,
    ],
  };
}
