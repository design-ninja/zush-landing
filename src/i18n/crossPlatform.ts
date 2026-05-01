import type { Locale } from '@/i18n/config';

export interface CrossPlatformBannerCopy {
  eyebrow: string;
  title: string;
  description: string;
  macTitle: string;
  macDescription: string;
  windowsTitle: string;
  windowsDescription: string;
  macCta: string;
  windowsCta: string;
}

const EN: CrossPlatformBannerCopy = {
  eyebrow: 'Available on both desktops',
  title: 'Pick your platform — same Zush, native everywhere',
  description:
    'A signed and notarized .dmg for macOS. A Microsoft Store install for Windows. Same renaming engine, same BYOK and Offline AI mode, native to each OS.',
  macTitle: 'Zush for Mac',
  macDescription: 'Apple Silicon and Intel · macOS 14+ · App Store + .dmg',
  windowsTitle: 'Zush for Windows',
  windowsDescription: 'x64 and ARM64 · Windows 10/11 · Microsoft Store',
  macCta: 'See Mac details',
  windowsCta: 'See Windows details',
};

const COPY: Record<Locale, CrossPlatformBannerCopy> = {
  en: EN,
  de: {
    eyebrow: 'Auf beiden Desktops verfügbar',
    title: 'Wähle deine Plattform — dasselbe Zush, überall nativ',
    description:
      'Eine signierte und notarisierte .dmg für macOS. Eine Microsoft-Store-Installation für Windows. Gleiche Rename-Engine, gleiches BYOK und Offline-KI, nativ pro System.',
    macTitle: 'Zush für Mac',
    macDescription: 'Apple Silicon und Intel · macOS 14+ · App Store + .dmg',
    windowsTitle: 'Zush für Windows',
    windowsDescription: 'x64 und ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Mac-Details ansehen',
    windowsCta: 'Windows-Details ansehen',
  },
  fr: {
    eyebrow: 'Disponible sur les deux ordinateurs',
    title: 'Choisissez votre plateforme — un seul Zush, natif partout',
    description:
      'Un .dmg signé et notarisé pour macOS. Une installation Microsoft Store pour Windows. Même moteur de renommage, même BYOK et IA hors ligne, natif sur chaque OS.',
    macTitle: 'Zush pour Mac',
    macDescription: 'Apple Silicon et Intel · macOS 14+ · App Store + .dmg',
    windowsTitle: 'Zush pour Windows',
    windowsDescription: 'x64 et ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Voir les détails Mac',
    windowsCta: 'Voir les détails Windows',
  },
  'pt-br': {
    eyebrow: 'Disponível nos dois desktops',
    title: 'Escolha sua plataforma — o mesmo Zush, nativo em todo lugar',
    description:
      'Um .dmg assinado e notarizado para macOS. Instalação pela Microsoft Store no Windows. Mesma engine de renomeação, mesmo BYOK e IA offline, nativo em cada SO.',
    macTitle: 'Zush para Mac',
    macDescription: 'Apple Silicon e Intel · macOS 14+ · App Store + .dmg',
    windowsTitle: 'Zush para Windows',
    windowsDescription: 'x64 e ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Ver detalhes do Mac',
    windowsCta: 'Ver detalhes do Windows',
  },
  es: {
    eyebrow: 'Disponible en ambos escritorios',
    title: 'Elige tu plataforma — el mismo Zush, nativo en todas partes',
    description:
      'Un .dmg firmado y notarizado para macOS. Instalación desde Microsoft Store para Windows. El mismo motor de renombrado, el mismo BYOK e IA offline, nativo en cada SO.',
    macTitle: 'Zush para Mac',
    macDescription: 'Apple Silicon e Intel · macOS 14+ · App Store + .dmg',
    windowsTitle: 'Zush para Windows',
    windowsDescription: 'x64 y ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Ver detalles de Mac',
    windowsCta: 'Ver detalles de Windows',
  },
  nl: {
    eyebrow: 'Beschikbaar op beide desktops',
    title: 'Kies je platform — dezelfde Zush, overal native',
    description:
      'Een ondertekende en genotariseerde .dmg voor macOS. Een Microsoft Store-installatie voor Windows. Dezelfde rename-engine, dezelfde BYOK en Offline AI, native per OS.',
    macTitle: 'Zush voor Mac',
    macDescription: 'Apple Silicon en Intel · macOS 14+ · App Store + .dmg',
    windowsTitle: 'Zush voor Windows',
    windowsDescription: 'x64 en ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Bekijk Mac-details',
    windowsCta: 'Bekijk Windows-details',
  },
  it: {
    eyebrow: 'Disponibile su entrambi i desktop',
    title: 'Scegli la tua piattaforma — lo stesso Zush, nativo ovunque',
    description:
      'Un .dmg firmato e notarizzato per macOS. Installazione dal Microsoft Store per Windows. Stesso motore di rinomina, stesso BYOK e IA offline, nativo su ogni OS.',
    macTitle: 'Zush per Mac',
    macDescription: 'Apple Silicon e Intel · macOS 14+ · App Store + .dmg',
    windowsTitle: 'Zush per Windows',
    windowsDescription: 'x64 e ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Vedi dettagli Mac',
    windowsCta: 'Vedi dettagli Windows',
  },
  ja: {
    eyebrow: '両方のデスクトップで利用可能',
    title: 'プラットフォームを選んでください — 同じ Zush、どこでもネイティブ',
    description:
      'macOS には署名済みで notarize された .dmg。Windows には Microsoft Store からのインストール。同じリネームエンジン、同じ BYOK とオフライン AI、それぞれの OS にネイティブ。',
    macTitle: 'Zush for Mac',
    macDescription: 'Apple Silicon と Intel · macOS 14+ · App Store + .dmg',
    windowsTitle: 'Zush for Windows',
    windowsDescription: 'x64 と ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Mac の詳細を見る',
    windowsCta: 'Windows の詳細を見る',
  },
  ko: {
    eyebrow: '두 데스크톱에서 사용 가능',
    title: '플랫폼을 선택하세요 — 동일한 Zush, 어디서나 네이티브',
    description:
      'macOS용 서명 및 공증된 .dmg. Windows용 Microsoft Store 설치. 동일한 이름 변경 엔진, 동일한 BYOK 및 오프라인 AI, 각 OS에 네이티브.',
    macTitle: 'Mac용 Zush',
    macDescription: 'Apple Silicon 및 Intel · macOS 14+ · App Store + .dmg',
    windowsTitle: 'Windows용 Zush',
    windowsDescription: 'x64 및 ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Mac 상세 보기',
    windowsCta: 'Windows 상세 보기',
  },
  'zh-cn': {
    eyebrow: '两种桌面系统均可用',
    title: '选择你的平台 — 同一个 Zush，在每个系统上都是原生',
    description:
      '为 macOS 提供签名并公证的 .dmg。为 Windows 提供 Microsoft Store 安装。相同的重命名引擎、相同的 BYOK 和离线 AI，每个系统都是原生体验。',
    macTitle: 'Zush for Mac',
    macDescription: 'Apple Silicon 与 Intel · macOS 14+ · App Store + .dmg',
    windowsTitle: 'Zush for Windows',
    windowsDescription: 'x64 与 ARM64 · Windows 10/11 · Microsoft Store',
    macCta: '查看 Mac 详情',
    windowsCta: '查看 Windows 详情',
  },
  ar: {
    eyebrow: 'متوفر على كلا نظامي سطح المكتب',
    title: 'اختر منصتك — Zush نفسه، بتجربة أصلية في كل مكان',
    description:
      'ملف .dmg موقّع وموثق لنظام macOS. تثبيت عبر Microsoft Store لنظام Windows. نفس محرك إعادة التسمية، ونفس BYOK وOffline AI، بتجربة أصلية لكل نظام.',
    macTitle: 'Zush لنظام Mac',
    macDescription: 'Apple Silicon وIntel · macOS 14+ · App Store + .dmg',
    windowsTitle: 'Zush لنظام Windows',
    windowsDescription: 'x64 وARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'عرض تفاصيل Mac',
    windowsCta: 'عرض تفاصيل Windows',
  },
};

export function getCrossPlatformBannerCopy(locale: Locale): CrossPlatformBannerCopy {
  return COPY[locale] ?? EN;
}
