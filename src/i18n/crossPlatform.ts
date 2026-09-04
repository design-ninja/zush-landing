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
    'A signed and notarized .dmg, Mac App Store build, or Homebrew cask for macOS. A Microsoft Store install for Windows. Same renaming engine, same BYOK and Local AI mode, native to each OS.',
  macTitle: 'AI File Renamer for Mac',
  macDescription: 'Apple Silicon and Intel · macOS 15+ · App Store + .dmg + Homebrew',
  windowsTitle: 'AI File Renamer for Windows',
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
      'Eine signierte und notarisierte .dmg, ein Mac-App-Store-Build oder ein Homebrew-Cask für macOS. Eine Microsoft-Store-Installation für Windows. Gleiche Rename-Engine, gleiches BYOK und lokale KI, nativ pro System.',
    macTitle: 'KI-Dateiumbenenner für Mac',
    macDescription: 'Apple Silicon und Intel · macOS 15+ · App Store + .dmg + Homebrew',
    windowsTitle: 'KI-Dateiumbenenner für Windows',
    windowsDescription: 'x64 und ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Mac-Details ansehen',
    windowsCta: 'Windows-Details ansehen',
  },
  fr: {
    eyebrow: 'Disponible sur les deux ordinateurs',
    title: 'Choisissez votre plateforme — un seul Zush, natif partout',
    description:
      'Un .dmg signé et notarisé, une version Mac App Store ou un cask Homebrew pour macOS. Une installation Microsoft Store pour Windows. Même moteur de renommage, même BYOK et IA locale, natif sur chaque OS.',
    macTitle: 'Renommeur de fichiers pour Mac',
    macDescription: 'Apple Silicon et Intel · macOS 15+ · App Store + .dmg + Homebrew',
    windowsTitle: 'Renommeur de fichiers pour Windows',
    windowsDescription: 'x64 et ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Voir les détails Mac',
    windowsCta: 'Voir les détails Windows',
  },
  'pt-br': {
    eyebrow: 'Disponível nos dois desktops',
    title: 'Escolha sua plataforma — o mesmo Zush, nativo em todo lugar',
    description:
      'Um .dmg assinado e notarizado, build da Mac App Store ou cask Homebrew para macOS. Instalação pela Microsoft Store no Windows. Mesma engine de renomeação, mesmo BYOK e IA local, nativo em cada SO.',
    macTitle: 'Renomeador de arquivos para Mac',
    macDescription: 'Apple Silicon e Intel · macOS 15+ · App Store + .dmg + Homebrew',
    windowsTitle: 'Renomeador de arquivos para Windows',
    windowsDescription: 'x64 e ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Ver detalhes do Mac',
    windowsCta: 'Ver detalhes do Windows',
  },
  es: {
    eyebrow: 'Disponible en ambos escritorios',
    title: 'Elige tu plataforma — el mismo Zush, nativo en todas partes',
    description:
      'Un .dmg firmado y notarizado, versión de Mac App Store o cask de Homebrew para macOS. Instalación desde Microsoft Store para Windows. El mismo motor de renombrado, el mismo BYOK e IA local, nativo en cada SO.',
    macTitle: 'Renombrador de archivos para Mac',
    macDescription: 'Apple Silicon e Intel · macOS 15+ · App Store + .dmg + Homebrew',
    windowsTitle: 'Renombrador de archivos para Windows',
    windowsDescription: 'x64 y ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Ver detalles de Mac',
    windowsCta: 'Ver detalles de Windows',
  },
  nl: {
    eyebrow: 'Beschikbaar op beide desktops',
    title: 'Kies je platform — dezelfde Zush, overal native',
    description:
      'Een ondertekende en genotariseerde .dmg, Mac App Store-build of Homebrew-cask voor macOS. Een Microsoft Store-installatie voor Windows. Dezelfde rename-engine, dezelfde BYOK en lokale AI, native per OS.',
    macTitle: 'Bestandshernoemer voor Mac',
    macDescription: 'Apple Silicon en Intel · macOS 15+ · App Store + .dmg + Homebrew',
    windowsTitle: 'Bestandshernoemer voor Windows',
    windowsDescription: 'x64 en ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Bekijk Mac-details',
    windowsCta: 'Bekijk Windows-details',
  },
  it: {
    eyebrow: 'Disponibile su entrambi i desktop',
    title: 'Scegli la tua piattaforma — lo stesso Zush, nativo ovunque',
    description:
      'Un .dmg firmato e notarizzato, build Mac App Store o cask Homebrew per macOS. Installazione dal Microsoft Store per Windows. Stesso motore di rinomina, stesso BYOK e IA locale, nativo su ogni OS.',
    macTitle: 'Rinomina file per Mac',
    macDescription: 'Apple Silicon e Intel · macOS 15+ · App Store + .dmg + Homebrew',
    windowsTitle: 'Rinomina file per Windows',
    windowsDescription: 'x64 e ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Vedi dettagli Mac',
    windowsCta: 'Vedi dettagli Windows',
  },
  ja: {
    eyebrow: '両方のデスクトップで利用可能',
    title: 'プラットフォームを選んでください — 同じ Zush、どこでもネイティブ',
    description:
      'macOS には署名済みで notarize された .dmg、Mac App Store 版、Homebrew cask。Windows には Microsoft Store からのインストール。同じリネームエンジン、同じ BYOK とローカル AI、それぞれの OS にネイティブ。',
    macTitle: 'Mac向けファイルリネーム',
    macDescription: 'Apple Silicon と Intel · macOS 15+ · App Store + .dmg + Homebrew',
    windowsTitle: 'Windows向けファイルリネーム',
    windowsDescription: 'x64 と ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Mac の詳細を見る',
    windowsCta: 'Windows の詳細を見る',
  },
  ko: {
    eyebrow: '두 데스크톱에서 사용 가능',
    title: '플랫폼을 선택하세요 — 동일한 Zush, 어디서나 네이티브',
    description:
      'macOS용 서명 및 공증된 .dmg, Mac App Store 빌드 또는 Homebrew cask. Windows용 Microsoft Store 설치. 동일한 이름 변경 엔진, 동일한 BYOK 및 로컬 AI, 각 OS에 네이티브.',
    macTitle: 'Mac용 파일 이름 변경 도구',
    macDescription: 'Apple Silicon 및 Intel · macOS 15+ · App Store + .dmg + Homebrew',
    windowsTitle: 'Windows용 파일 이름 변경 도구',
    windowsDescription: 'x64 및 ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Mac 상세 보기',
    windowsCta: 'Windows 상세 보기',
  },
  'zh-cn': {
    eyebrow: '两种桌面系统均可用',
    title: '选择你的平台 — 同一个 Zush，在每个系统上都是原生',
    description:
      '为 macOS 提供签名并公证的 .dmg、Mac App Store 版本或 Homebrew cask。为 Windows 提供 Microsoft Store 安装。相同的重命名引擎、相同的 BYOK 和本地 AI，每个系统都是原生体验。',
    macTitle: '适用于 Mac 的文件重命名工具',
    macDescription: 'Apple Silicon 与 Intel · macOS 15+ · App Store + .dmg + Homebrew',
    windowsTitle: '适用于 Windows 的文件重命名工具',
    windowsDescription: 'x64 与 ARM64 · Windows 10/11 · Microsoft Store',
    macCta: '查看 Mac 详情',
    windowsCta: '查看 Windows 详情',
  },
  tr: {
    eyebrow: 'İki masaüstü platformunda da mevcut',
    title: 'Platformunuzu seçin — aynı Zush, her yerde yerel',
    description:
      'macOS için imzalanmış ve noter onaylı .dmg, Mac App Store sürümü veya Homebrew cask. Windows için Microsoft Store kurulumu. Aynı yeniden adlandırma motoru, aynı BYOK ve yerel yapay zekâ modu; her işletim sisteminde yerel deneyim.',
    macTitle: 'Mac için dosya adlandırıcı',
    macDescription: 'Apple Silicon ve Intel · macOS 15+ · App Store + .dmg + Homebrew',
    windowsTitle: 'Windows için dosya adlandırıcı',
    windowsDescription: 'x64 ve ARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'Mac ayrıntılarını gör',
    windowsCta: 'Windows ayrıntılarını gör',
  },
  ar: {
    eyebrow: 'متوفر على كلا نظامي سطح المكتب',
    title: 'اختر منصتك — Zush نفسه، بتجربة أصلية في كل مكان',
    description:
      'ملف .dmg موقّع وموثق أو إصدار Mac App Store أو Homebrew cask لنظام macOS. تثبيت عبر Microsoft Store لنظام Windows. نفس محرك إعادة التسمية، ونفس BYOK والذكاء الاصطناعي المحلي، بتجربة أصلية لكل نظام.',
    macTitle: 'أداة إعادة تسمية الملفات لنظام Mac',
    macDescription: 'Apple Silicon وIntel · macOS 15+ · App Store + .dmg + Homebrew',
    windowsTitle: 'أداة إعادة تسمية الملفات لنظام Windows',
    windowsDescription: 'x64 وARM64 · Windows 10/11 · Microsoft Store',
    macCta: 'عرض تفاصيل Mac',
    windowsCta: 'عرض تفاصيل Windows',
  },
};

export function getCrossPlatformBannerCopy(locale: Locale): CrossPlatformBannerCopy {
  return COPY[locale] ?? EN;
}
