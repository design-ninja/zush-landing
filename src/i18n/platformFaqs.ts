import { ORGANIZATION_FEATURES } from '@/i18n/organizationFeatures';
import type { Locale } from '@/i18n/config';
import type { FAQCopyItem } from '@/i18n/copy';

type Platform = 'mac' | 'windows';

interface PlatformFaqCopy {
  description: string;
  items: FAQCopyItem[];
}

const PLATFORM_FAQ_COPY: Partial<Record<Locale, Record<Platform, PlatformFaqCopy>>> = {
  de: {
    mac: {
      description: 'Alles Wichtige über die Mac-App und das Produkt.',
      items: [
        { question: 'Funktioniert Zush auf Apple Silicon?', answer: 'Ja. Zush läuft nativ auf Apple Silicon und Intel Macs mit macOS 15 oder neuer.' },
        { question: 'Ist die App von Apple notariell beglaubigt?', answer: 'Ja. Die .dmg ist codesigniert und notariell beglaubigt, sodass Gatekeeper sie auf unterstützten macOS-Versionen normal öffnet.' },
        { question: 'Kann ich Zush offline nutzen?', answer: 'Ja. Nutzer aller Pläne können lokale KI mit Ollama aktivieren. Nach der Einrichtung funktioniert sie offline. FREE umfasst 50 Umbenennungen in allen KI-Modi; PRO entfernt das Limit.' },
      ],
    },
    windows: {
      description: 'Alles Wichtige über die Windows-App und das Produkt.',
      items: [
        { question: 'Warum wird Zush über den Microsoft Store verteilt?', answer: 'Der Store übernimmt Installation, Signierung und automatische Updates für alle Nutzer.' },
        { question: 'Läuft es auf Windows on ARM?', answer: 'Ja. Die Microsoft-Store-Version enthält native x64- und ARM64-Pakete.' },
      ],
    },
  },
  fr: {
    mac: {
      description: 'Tout ce qu’il faut savoir sur l’app Mac et le produit.',
      items: [
        { question: 'Zush fonctionne-t-il sur Apple Silicon ?', answer: 'Oui. Zush fonctionne nativement sur les Mac Apple Silicon et Intel avec macOS 15 ou plus récent.' },
        { question: 'L’app est-elle notarisée par Apple ?', answer: 'Oui. Le .dmg est signé et notarisé, donc Gatekeeper l’ouvre normalement sur les versions macOS prises en charge.' },
        { question: 'Puis-je utiliser Zush hors ligne ?', answer: 'Oui. Les utilisateurs de toutes les offres peuvent activer l’IA locale avec Ollama. Elle fonctionne hors ligne après la configuration. FREE inclut 50 renommages partagés entre tous les modes; PRO supprime la limite.' },
      ],
    },
    windows: {
      description: 'Tout ce qu’il faut savoir sur l’app Windows et le produit.',
      items: [
        { question: 'Pourquoi Zush est-il distribué via le Microsoft Store ?', answer: 'Le Store gère l’installation, la signature et les mises à jour automatiques pour chaque utilisateur.' },
        { question: 'Fonctionne-t-il sur Windows on ARM ?', answer: 'Oui. La version Microsoft Store inclut des paquets natifs x64 et ARM64.' },
      ],
    },
  },
  'pt-br': {
    mac: {
      description: 'Tudo que você precisa saber sobre o app para Mac e o produto.',
      items: [
        { question: 'O Zush funciona em Apple Silicon?', answer: 'Sim. O Zush roda nativamente em Macs Apple Silicon e Intel com macOS 15 ou mais recente.' },
        { question: 'O app é notarizado pela Apple?', answer: 'Sim. O .dmg é assinado e notarizado, então o Gatekeeper o abre normalmente nas versões compatíveis do macOS.' },
        { question: 'Posso usar o Zush offline?', answer: 'Sim. Usuários de todos os planos podem ativar a IA local com Ollama. Ela funciona offline após a configuração. O FREE inclui 50 renomeações compartilhadas entre todos os modos; o PRO remove o limite.' },
      ],
    },
    windows: {
      description: 'Tudo que você precisa saber sobre o app para Windows e o produto.',
      items: [
        { question: 'Por que o Zush é distribuído pela Microsoft Store?', answer: 'A Store cuida da instalação, assinatura e atualizações automáticas para todos os usuários.' },
        { question: 'Ele roda em Windows on ARM?', answer: 'Sim. A versão da Microsoft Store inclui pacotes nativos x64 e ARM64.' },
      ],
    },
  },
  es: {
    mac: {
      description: 'Todo lo que necesitas saber sobre la app para Mac y el producto.',
      items: [
        { question: '¿Zush funciona en Apple Silicon?', answer: 'Sí. Zush se ejecuta de forma nativa en Macs Apple Silicon e Intel con macOS 15 o posterior.' },
        { question: '¿La app está notarizada por Apple?', answer: 'Sí. El .dmg está firmado y notarizado, por lo que Gatekeeper lo abre normalmente en versiones compatibles de macOS.' },
        { question: '¿Puedo usar Zush sin conexión?', answer: 'Sí. Los usuarios de todos los planes pueden activar la IA local con Ollama. Funciona sin conexión después de configurarla. FREE incluye 50 renombrados compartidos entre todos los modos; PRO elimina el límite.' },
      ],
    },
    windows: {
      description: 'Todo lo que necesitas saber sobre la app para Windows y el producto.',
      items: [
        { question: '¿Por qué Zush se distribuye mediante Microsoft Store?', answer: 'La Store gestiona la instalación, la firma y las actualizaciones automáticas para cada usuario.' },
        { question: '¿Funciona en Windows on ARM?', answer: 'Sí. La versión de Microsoft Store incluye paquetes nativos x64 y ARM64.' },
      ],
    },
  },
  nl: {
    mac: {
      description: 'Alles wat je moet weten over de Mac-app en het product.',
      items: [
        { question: 'Werkt Zush op Apple Silicon?', answer: 'Ja. Zush draait native op Apple Silicon- en Intel-Macs met macOS 15 of nieuwer.' },
        { question: 'Is de app door Apple genotariseerd?', answer: 'Ja. De .dmg is code-signed en genotariseerd, zodat Gatekeeper deze normaal opent op ondersteunde macOS-versies.' },
        { question: 'Kan ik Zush offline gebruiken?', answer: 'Ja. Gebruikers van elk abonnement kunnen Lokale AI met Ollama inschakelen. Na de installatie werkt die offline. FREE bevat 50 hernoemingen voor alle modi; PRO verwijdert de limiet.' },
      ],
    },
    windows: {
      description: 'Alles wat je moet weten over de Windows-app en het product.',
      items: [
        { question: 'Waarom wordt Zush via de Microsoft Store verspreid?', answer: 'De Store regelt installatie, ondertekening en automatische updates voor elke gebruiker.' },
        { question: 'Draait het op Windows on ARM?', answer: 'Ja. De Microsoft Store-release bevat native x64- en ARM64-pakketten.' },
      ],
    },
  },
  it: {
    mac: {
      description: 'Tutto quello che devi sapere sull’app per Mac e sul prodotto.',
      items: [
        { question: 'Zush funziona su Apple Silicon?', answer: 'Sì. Zush gira in modo nativo su Mac Apple Silicon e Intel con macOS 15 o versioni successive.' },
        { question: 'L’app è notarizzata da Apple?', answer: 'Sì. Il file .dmg è firmato e notarizzato, quindi Gatekeeper lo apre normalmente sulle versioni macOS supportate.' },
        { question: 'Posso usare Zush offline?', answer: 'Sì. Gli utenti di tutti i piani possono attivare l’IA locale con Ollama. Dopo la configurazione funziona offline. FREE include 50 rinomine condivise tra tutte le modalità; PRO rimuove il limite.' },
      ],
    },
    windows: {
      description: 'Tutto quello che devi sapere sull’app per Windows e sul prodotto.',
      items: [
        { question: 'Perché Zush è distribuito tramite Microsoft Store?', answer: 'Lo Store gestisce installazione, firma e aggiornamenti automatici per ogni utente.' },
        { question: 'Funziona su Windows on ARM?', answer: 'Sì. La versione Microsoft Store include pacchetti nativi x64 e ARM64.' },
      ],
    },
  },
  ja: {
    mac: {
      description: 'Mac 版アプリと製品全体について知っておきたいこと。',
      items: [
        { question: 'Zush は Apple Silicon で動作しますか？', answer: 'はい。Zush は macOS 15 以降の Apple Silicon Mac と Intel Mac でネイティブに動作します。' },
        { question: 'アプリは Apple によって notarize されていますか？', answer: 'はい。.dmg はコード署名と notarization 済みなので、対応する macOS では Gatekeeper から通常どおり開けます。' },
        { question: 'Zush はオフラインで使えますか？', answer: 'はい。すべてのプランで Ollama を使うローカル AI を有効にでき、設定後はオフラインで動作します。FREE は全モード共通 50 回、PRO は無制限です。' },
      ],
    },
    windows: {
      description: 'Windows 版アプリと製品全体について知っておきたいこと。',
      items: [
        { question: 'なぜ Zush は Microsoft Store で配布されていますか？', answer: 'Store がインストール、署名、自動更新を各ユーザー向けに管理するためです。' },
        { question: 'Windows on ARM で動作しますか？', answer: 'はい。Microsoft Store 版には x64 と ARM64 のネイティブパッケージが含まれます。' },
      ],
    },
  },
  ko: {
    mac: {
      description: 'Mac용 앱과 제품 전반에 대해 알아야 할 내용입니다.',
      items: [
        { question: 'Zush는 Apple Silicon에서 작동하나요?', answer: '예. Zush는 macOS 15 이상을 실행하는 Apple Silicon 및 Intel Mac에서 네이티브로 작동합니다.' },
        { question: '앱은 Apple 공증을 받았나요?', answer: '예. .dmg는 코드 서명 및 공증이 완료되어 지원되는 macOS 버전에서 Gatekeeper가 정상적으로 열 수 있습니다.' },
        { question: 'Zush를 오프라인으로 사용할 수 있나요?', answer: '예. 모든 플랜에서 Ollama를 사용하는 로컬 AI를 활성화할 수 있으며 설정 후에는 오프라인으로 작동합니다. FREE는 모든 모드에서 공통 50회이며 PRO는 제한을 제거합니다.' },
      ],
    },
    windows: {
      description: 'Windows용 앱과 제품 전반에 대해 알아야 할 내용입니다.',
      items: [
        { question: 'Zush는 왜 Microsoft Store로 배포되나요?', answer: 'Store가 모든 사용자의 설치, 서명, 자동 업데이트를 처리하기 때문입니다.' },
        { question: 'Windows on ARM에서 실행되나요?', answer: '예. Microsoft Store 릴리스에는 네이티브 x64 및 ARM64 패키지가 포함됩니다.' },
      ],
    },
  },
  'zh-cn': {
    mac: {
      description: '关于 Mac 版应用和产品功能的常见问题。',
      items: [
        { question: 'Zush 支持 Apple Silicon 吗？', answer: '支持。Zush 可在 Apple Silicon 和 Intel Mac 上原生运行，要求 macOS 15 或更新版本。' },
        { question: '应用经过 Apple 公证吗？', answer: '是的。.dmg 已签名并通过公证，Gatekeeper 可以在受支持的 macOS 版本上正常打开。' },
        { question: '可以离线使用 Zush 吗？', answer: '可以。所有方案都可启用通过 Ollama 运行的本地 AI，完成设置后即可离线工作。FREE 在所有模式间共享 50 次，PRO 会移除限制。' },
      ],
    },
    windows: {
      description: '关于 Windows 版应用和产品功能的常见问题。',
      items: [
        { question: '为什么通过 Microsoft Store 分发？', answer: 'Microsoft Store 会处理安装、签名和自动更新，用户无需手动维护版本。' },
        { question: '支持 Windows on ARM 吗？', answer: '支持。Microsoft Store 版本包含 x64 和 ARM64 原生包。' },
      ],
    },
  },
};

const WINDOWS_BENCHMARK_FAQ: Record<Locale, FAQCopyItem> = {
  en: { question: "How does Zush compare with other AI file renamers on Windows?", answer: "In our November 2026 test of six AI renamers on the same 30 files on Windows 11, Zush scored 94.8 out of 100, ahead of NameQuick (73.0), RenameClick (70.2), Renamer.ai (56.8), FilesDesk (52.5) and AI Renamer (37.2). It renamed all 30 files, including scans and RAW photos, with no account, and Undo All restored the whole batch. The test data is public on the Methodology page." },
  fr: { question: "Comment Zush se compare-t-il aux autres outils IA de renommage sur Windows ?", answer: "Lors de notre test de novembre 2026, six outils ont renommé les mêmes 30 fichiers sous Windows 11 : Zush a obtenu 94,8 sur 100, devant NameQuick (73,0), RenameClick (70,2), Renamer.ai (56,8), FilesDesk (52,5) et AI Renamer (37,2). Il a renommé les 30 fichiers, scans et photos RAW compris, sans compte, et Undo All a restauré tout le lot. Les données sont publiques sur la page Méthodologie." },
  de: { question: "Wie schneidet Zush im Vergleich zu anderen KI-Umbenennern unter Windows ab?", answer: "In unserem Test vom November 2026 haben sechs KI-Umbenenner dieselben 30 Dateien unter Windows 11 bearbeitet: Zush erreichte 94,8 von 100 Punkten, vor NameQuick (73,0), RenameClick (70,2), Renamer.ai (56,8), FilesDesk (52,5) und AI Renamer (37,2). Zush hat alle 30 Dateien umbenannt, auch Scans und RAW-Fotos, ohne Konto, und Undo All hat den ganzen Stapel wiederhergestellt. Die Testdaten sind auf der Methodik-Seite öffentlich." },
  es: { question: "¿Cómo se compara Zush con otros renombradores con IA en Windows?", answer: "En nuestra prueba de noviembre de 2026, seis renombradores con IA procesaron los mismos 30 archivos en Windows 11: Zush obtuvo 94,8 de 100, por delante de NameQuick (73,0), RenameClick (70,2), Renamer.ai (56,8), FilesDesk (52,5) y AI Renamer (37,2). Renombró los 30 archivos, incluidos escaneos y fotos RAW, sin cuenta, y Undo All restauró todo el lote. Los datos de la prueba son públicos en la página de Metodología." },
  'pt-br': { question: "Como o Zush se compara a outros renomeadores com IA no Windows?", answer: "No nosso teste de novembro de 2026, seis renomeadores com IA receberam os mesmos 30 arquivos no Windows 11: o Zush fez 94,8 de 100, à frente de NameQuick (73,0), RenameClick (70,2), Renamer.ai (56,8), FilesDesk (52,5) e AI Renamer (37,2). Ele renomeou os 30 arquivos, incluindo digitalizações e fotos RAW, sem conta, e o Undo All restaurou o lote inteiro. Os dados do teste são públicos na página de Metodologia." },
  it: { question: "Come si confronta Zush con altri strumenti IA per rinominare file su Windows?", answer: "Nel nostro test di novembre 2026 sei strumenti IA hanno rinominato gli stessi 30 file su Windows 11: Zush ha ottenuto 94,8 su 100, davanti a NameQuick (73,0), RenameClick (70,2), Renamer.ai (56,8), FilesDesk (52,5) e AI Renamer (37,2). Ha rinominato tutti i 30 file, scansioni e foto RAW comprese, senza account, e Undo All ha ripristinato l’intero batch. I dati del test sono pubblici nella pagina Metodologia." },
  nl: { question: "Hoe verhoudt Zush zich tot andere AI-bestandshernoemers op Windows?", answer: "In onze test van november 2026 kregen zes AI-hernoemers dezelfde 30 bestanden op Windows 11: Zush scoorde 94,8 van de 100, voor NameQuick (73,0), RenameClick (70,2), Renamer.ai (56,8), FilesDesk (52,5) en AI Renamer (37,2). Het hernoemde alle 30 bestanden, ook scans en RAW-foto’s, zonder account, en Undo All herstelde de hele batch. De testgegevens staan openbaar op de pagina Methodologie." },
  tr: { question: "Zush, Windows’taki diğer yapay zeka dosya adlandırıcılarla nasıl karşılaştırılır?", answer: "Kasım 2026’daki testimizde altı yapay zeka adlandırıcısı Windows 11’de aynı 30 dosyayı işledi: Zush 100 üzerinden 94,8 puan aldı ve NameQuick (73,0), RenameClick (70,2), Renamer.ai (56,8), FilesDesk (52,5) ve AI Renamer’ın (37,2) önüne geçti. Taramalar ve RAW fotoğraflar dahil 30 dosyanın tamamını hesap gerektirmeden yeniden adlandırdı ve Undo All tüm toplu işlemi geri aldı. Test verileri Metodoloji sayfasında herkese açık." },
  ja: { question: "Windows で Zush は他の AI ファイルリネームツールと比べてどうですか？", answer: "2026年11月、Windows 11 で6つの AI リネームツールに同じ30ファイルを処理させたテストで、Zush は100点中94.8点でした。NameQuick（73.0）、RenameClick（70.2）、Renamer.ai（56.8）、FilesDesk（52.5）、AI Renamer（37.2）を上回りました。スキャンや RAW 写真を含む30ファイルすべてをアカウントなしでリネームし、Undo All で一括して元に戻せました。テストデータは方法論ページで公開しています。" },
  ko: { question: "Windows에서 Zush는 다른 AI 파일 이름 변경 도구와 비교해 어떤가요?", answer: "2026년 11월 Windows 11에서 6개 AI 이름 변경 도구에 같은 30개 파일을 처리하게 한 테스트에서 Zush는 100점 만점에 94.8점을 받아 NameQuick(73.0), RenameClick(70.2), Renamer.ai(56.8), FilesDesk(52.5), AI Renamer(37.2)를 앞섰습니다. 스캔 문서와 RAW 사진을 포함한 30개 파일을 계정 없이 모두 이름 변경했고, Undo All로 전체 작업을 되돌렸습니다. 테스트 데이터는 방법론 페이지에 공개되어 있습니다." },
  'zh-cn': { question: "在 Windows 上，Zush 与其他 AI 文件重命名工具相比如何？", answer: "在我们 2026 年 11 月的测试中，六款 AI 重命名工具在 Windows 11 上处理了同样的 30 个文件：Zush 获得 94.8 分（满分 100），领先 NameQuick（73.0）、RenameClick（70.2）、Renamer.ai（56.8）、FilesDesk（52.5）和 AI Renamer（37.2）。它无需账户就重命名了全部 30 个文件，包括扫描件和 RAW 照片，并可通过 Undo All 一次撤销整批操作。测试数据公开在方法论页面。" },
};

export function getPlatformFaqCopy(
  locale: Locale,
  platform: Platform,
  fallback: PlatformFaqCopy,
): PlatformFaqCopy {
  const copy = PLATFORM_FAQ_COPY[locale]?.[platform] ?? fallback;
  const organization = ORGANIZATION_FEATURES[locale];
  return {
    ...copy,
    items: [
      { question: organization.sortingQuestion, answer: organization.sortingAnswer },
      ...(platform === 'windows' ? [WINDOWS_BENCHMARK_FAQ[locale] ?? WINDOWS_BENCHMARK_FAQ.en] : []),
      ...copy.items,
    ],
  };
}
