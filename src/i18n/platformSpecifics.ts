import type { Locale } from '@/i18n/config';

export interface PlatformSpecificsCopy {
  scenariosEyebrow: string;
  scenariosTitle: string;
  scenariosDescriptionMac: string;
  scenariosDescriptionWindows: string;
}

const EN: PlatformSpecificsCopy = {
  scenariosEyebrow: 'Workflows',
  scenariosTitle: 'Real-world scenarios',
  scenariosDescriptionMac:
    'These are the everyday Mac workflows people use Zush for. Each one is a watch-folder or drag-and-drop away.',
  scenariosDescriptionWindows:
    'These are the everyday Windows workflows people use Zush for. Each one is a watch-folder or drag-and-drop away.',
};

const PLATFORM_SPECIFICS_COPY: Partial<Record<Locale, PlatformSpecificsCopy>> = {
  en: EN,
  de: {
    scenariosEyebrow: 'Workflows',
    scenariosTitle: 'Echte Anwendungsfälle',
    scenariosDescriptionMac:
      'Das sind die alltäglichen Mac-Workflows, für die Zush genutzt wird. Jeder ist nur einen Überwachungs-Ordner oder Drag-and-Drop entfernt.',
    scenariosDescriptionWindows:
      'Das sind die alltäglichen Windows-Workflows, für die Zush genutzt wird. Jeder ist nur einen Überwachungs-Ordner oder Drag-and-Drop entfernt.',
  },
  fr: {
    scenariosEyebrow: 'Workflows',
    scenariosTitle: 'Scénarios concrets',
    scenariosDescriptionMac:
      'Voici les workflows Mac quotidiens pour lesquels les gens utilisent Zush. Chacun est à un dossier surveillé ou un glisser-déposer.',
    scenariosDescriptionWindows:
      'Voici les workflows Windows quotidiens pour lesquels les gens utilisent Zush. Chacun est à un dossier surveillé ou un glisser-déposer.',
  },
  'pt-br': {
    scenariosEyebrow: 'Fluxos',
    scenariosTitle: 'Cenários reais',
    scenariosDescriptionMac:
      'Estes são os fluxos do dia a dia no Mac para os quais as pessoas usam o Zush. Cada um está a uma pasta monitorada ou um arrastar-e-soltar.',
    scenariosDescriptionWindows:
      'Estes são os fluxos do dia a dia no Windows para os quais as pessoas usam o Zush. Cada um está a uma pasta monitorada ou um arrastar-e-soltar.',
  },
  es: {
    scenariosEyebrow: 'Flujos',
    scenariosTitle: 'Casos de uso reales',
    scenariosDescriptionMac:
      'Estos son los flujos diarios de Mac para los que la gente usa Zush. Cada uno está a una carpeta monitorizada o un arrastrar-y-soltar.',
    scenariosDescriptionWindows:
      'Estos son los flujos diarios de Windows para los que la gente usa Zush. Cada uno está a una carpeta monitorizada o un arrastrar-y-soltar.',
  },
  nl: {
    scenariosEyebrow: 'Workflows',
    scenariosTitle: 'Praktijkscenario’s',
    scenariosDescriptionMac:
      'Dit zijn de dagelijkse Mac-workflows waar mensen Zush voor gebruiken. Elk is een watched folder of een drag-and-drop verwijderd.',
    scenariosDescriptionWindows:
      'Dit zijn de dagelijkse Windows-workflows waar mensen Zush voor gebruiken. Elk is een watched folder of een drag-and-drop verwijderd.',
  },
  it: {
    scenariosEyebrow: 'Flussi',
    scenariosTitle: 'Scenari reali',
    scenariosDescriptionMac:
      'Questi sono i flussi quotidiani su Mac per cui le persone usano Zush. Ognuno è a una cartella monitorata o un drag-and-drop di distanza.',
    scenariosDescriptionWindows:
      'Questi sono i flussi quotidiani su Windows per cui le persone usano Zush. Ognuno è a una cartella monitorata o un drag-and-drop di distanza.',
  },
  ja: {
    scenariosEyebrow: 'ワークフロー',
    scenariosTitle: '実際の使用シナリオ',
    scenariosDescriptionMac:
      'これらは多くの人が Zush を使っている Mac の日常的なワークフローです。それぞれ監視フォルダまたはドラッグ＆ドロップで実行できます。',
    scenariosDescriptionWindows:
      'これらは多くの人が Zush を使っている Windows の日常的なワークフローです。それぞれ監視フォルダまたはドラッグ＆ドロップで実行できます。',
  },
  ko: {
    scenariosEyebrow: '워크플로',
    scenariosTitle: '실제 사용 사례',
    scenariosDescriptionMac:
      '사람들이 Zush를 사용하는 일상적인 Mac 워크플로입니다. 각각 감시 폴더 하나 또는 드래그 앤 드롭으로 실행됩니다.',
    scenariosDescriptionWindows:
      '사람들이 Zush를 사용하는 일상적인 Windows 워크플로입니다. 각각 감시 폴더 하나 또는 드래그 앤 드롭으로 실행됩니다.',
  },
  'zh-cn': {
    scenariosEyebrow: '工作流',
    scenariosTitle: '真实使用场景',
    scenariosDescriptionMac:
      '这些是人们在 Mac 上日常使用 Zush 的工作流。每一个只需一个监控文件夹或一次拖放即可完成。',
    scenariosDescriptionWindows:
      '这些是人们在 Windows 上日常使用 Zush 的工作流。每一个只需一个监控文件夹或一次拖放即可完成。',
  },
  tr: {
    scenariosEyebrow: 'İş akışları',
    scenariosTitle: 'Gerçek iş akışı örnekleri',
    scenariosDescriptionMac:
      'İnsanların Zush’u Mac’te her gün kullandığı iş akışları. Her biri izlenen bir klasör veya sürükle-bırak kadar basittir.',
    scenariosDescriptionWindows:
      'İnsanların Zush’u Windows’ta her gün kullandığı iş akışları. Her biri izlenen bir klasör veya sürükle-bırak kadar basittir.',
  },
  ar: {
    scenariosEyebrow: 'سير العمل',
    scenariosTitle: 'سيناريوهات واقعية',
    scenariosDescriptionMac:
      'هذه هي تدفقات Mac اليومية التي يستخدم الناس Zush من أجلها. كل واحد منها يبدأ بمجلد مراقب أو سحب وإفلات.',
    scenariosDescriptionWindows:
      'هذه هي تدفقات Windows اليومية التي يستخدم الناس Zush من أجلها. كل واحد منها يبدأ بمجلد مراقب أو سحب وإفلات.',
  },
};

export function getPlatformSpecificsCopy(locale: Locale): PlatformSpecificsCopy {
  return PLATFORM_SPECIFICS_COPY[locale] ?? EN;
}
