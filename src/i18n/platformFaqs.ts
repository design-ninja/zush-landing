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
      description: 'Alles Wichtige über Zush für Mac und den Rest des Produkts.',
      items: [
        { question: 'Funktioniert Zush auf Apple Silicon?', answer: 'Ja. Zush läuft nativ auf Apple Silicon und Intel Macs mit macOS 14 oder neuer.' },
        { question: 'Ist die App von Apple notariell beglaubigt?', answer: 'Ja. Die .dmg ist codesigniert und notariell beglaubigt, sodass Gatekeeper sie auf unterstützten macOS-Versionen normal öffnet.' },
        { question: 'Kann ich Zush offline nutzen?', answer: 'Ja. PRO-Nutzer können den Offline-KI-Modus mit privaten lokalen Modellen über Ollama aktivieren.' },
      ],
    },
    windows: {
      description: 'Alles Wichtige über Zush für Windows und den Rest des Produkts.',
      items: [
        { question: 'Warum wird Zush über den Microsoft Store verteilt?', answer: 'Der Store übernimmt Installation, Signierung und automatische Updates für alle Nutzer.' },
        { question: 'Hat Zush für Windows dieselben Funktionen wie Mac?', answer: 'Ja. Es enthält Cloud-KI-Umbenennung, Ordnerüberwachung, eigene Prompts, Verlauf zum Wiederherstellen, BYOK und Offline-KI-Modus.' },
        { question: 'Läuft es auf Windows on ARM?', answer: 'Ja. Die Microsoft-Store-Version enthält native x64- und ARM64-Pakete.' },
      ],
    },
  },
  fr: {
    mac: {
      description: 'Tout ce qu’il faut savoir sur Zush pour Mac et le reste du produit.',
      items: [
        { question: 'Zush fonctionne-t-il sur Apple Silicon ?', answer: 'Oui. Zush fonctionne nativement sur les Mac Apple Silicon et Intel avec macOS 14 ou plus récent.' },
        { question: 'L’app est-elle notarisée par Apple ?', answer: 'Oui. Le .dmg est signé et notarisé, donc Gatekeeper l’ouvre normalement sur les versions macOS prises en charge.' },
        { question: 'Puis-je utiliser Zush hors ligne ?', answer: 'Oui. Les utilisateurs PRO peuvent activer le mode IA hors ligne avec des modèles locaux privés via Ollama.' },
      ],
    },
    windows: {
      description: 'Tout ce qu’il faut savoir sur Zush pour Windows et le reste du produit.',
      items: [
        { question: 'Pourquoi Zush est-il distribué via le Microsoft Store ?', answer: 'Le Store gère l’installation, la signature et les mises à jour automatiques pour chaque utilisateur.' },
        { question: 'Zush pour Windows a-t-il les mêmes fonctions que sur Mac ?', answer: 'Oui. Il inclut le renommage IA cloud, la surveillance de dossiers, les prompts personnalisés, l’historique de restauration, BYOK et le mode IA hors ligne.' },
        { question: 'Fonctionne-t-il sur Windows on ARM ?', answer: 'Oui. La version Microsoft Store inclut des paquets natifs x64 et ARM64.' },
      ],
    },
  },
  'pt-br': {
    mac: {
      description: 'Tudo que você precisa saber sobre o Zush para Mac e o restante do produto.',
      items: [
        { question: 'O Zush funciona em Apple Silicon?', answer: 'Sim. O Zush roda nativamente em Macs Apple Silicon e Intel com macOS 14 ou mais recente.' },
        { question: 'O app é notarizado pela Apple?', answer: 'Sim. O .dmg é assinado e notarizado, então o Gatekeeper o abre normalmente nas versões compatíveis do macOS.' },
        { question: 'Posso usar o Zush offline?', answer: 'Sim. Usuários PRO podem ativar o modo IA offline com modelos locais privados via Ollama.' },
      ],
    },
    windows: {
      description: 'Tudo que você precisa saber sobre o Zush para Windows e o restante do produto.',
      items: [
        { question: 'Por que o Zush é distribuído pela Microsoft Store?', answer: 'A Store cuida da instalação, assinatura e atualizações automáticas para todos os usuários.' },
        { question: 'O Zush para Windows tem os mesmos recursos do Mac?', answer: 'Sim. Ele inclui renomeação com IA na nuvem, monitoramento de pastas, prompts personalizados, histórico para reverter, BYOK e modo IA offline.' },
        { question: 'Ele roda em Windows on ARM?', answer: 'Sim. A versão da Microsoft Store inclui pacotes nativos x64 e ARM64.' },
      ],
    },
  },
  es: {
    mac: {
      description: 'Todo lo que necesitas saber sobre Zush para Mac y el resto del producto.',
      items: [
        { question: '¿Zush funciona en Apple Silicon?', answer: 'Sí. Zush se ejecuta de forma nativa en Macs Apple Silicon e Intel con macOS 14 o posterior.' },
        { question: '¿La app está notarizada por Apple?', answer: 'Sí. El .dmg está firmado y notarizado, por lo que Gatekeeper lo abre normalmente en versiones compatibles de macOS.' },
        { question: '¿Puedo usar Zush sin conexión?', answer: 'Sí. Los usuarios PRO pueden activar el modo IA offline con modelos locales privados mediante Ollama.' },
      ],
    },
    windows: {
      description: 'Todo lo que necesitas saber sobre Zush para Windows y el resto del producto.',
      items: [
        { question: '¿Por qué Zush se distribuye mediante Microsoft Store?', answer: 'La Store gestiona la instalación, la firma y las actualizaciones automáticas para cada usuario.' },
        { question: '¿Zush para Windows tiene las mismas funciones que Mac?', answer: 'Sí. Incluye renombrado con IA en la nube, monitoreo de carpetas, prompts personalizados, historial para revertir, BYOK y modo IA offline.' },
        { question: '¿Funciona en Windows on ARM?', answer: 'Sí. La versión de Microsoft Store incluye paquetes nativos x64 y ARM64.' },
      ],
    },
  },
  nl: {
    mac: {
      description: 'Alles wat je moet weten over Zush voor Mac en de rest van het product.',
      items: [
        { question: 'Werkt Zush op Apple Silicon?', answer: 'Ja. Zush draait native op Apple Silicon- en Intel-Macs met macOS 14 of nieuwer.' },
        { question: 'Is de app door Apple genotariseerd?', answer: 'Ja. De .dmg is code-signed en genotariseerd, zodat Gatekeeper deze normaal opent op ondersteunde macOS-versies.' },
        { question: 'Kan ik Zush offline gebruiken?', answer: 'Ja. PRO-gebruikers kunnen Offline AI inschakelen met private lokale modellen via Ollama.' },
      ],
    },
    windows: {
      description: 'Alles wat je moet weten over Zush voor Windows en de rest van het product.',
      items: [
        { question: 'Waarom wordt Zush via de Microsoft Store verspreid?', answer: 'De Store regelt installatie, ondertekening en automatische updates voor elke gebruiker.' },
        { question: 'Heeft Zush voor Windows dezelfde functies als Mac?', answer: 'Ja. Het bevat cloud AI-renaming, mapmonitoring, aangepaste prompts, herstelgeschiedenis, BYOK en Offline AI.' },
        { question: 'Draait het op Windows on ARM?', answer: 'Ja. De Microsoft Store-release bevat native x64- en ARM64-pakketten.' },
      ],
    },
  },
  it: {
    mac: {
      description: 'Tutto quello che devi sapere su Zush per Mac e sul resto del prodotto.',
      items: [
        { question: 'Zush funziona su Apple Silicon?', answer: 'Sì. Zush gira in modo nativo su Mac Apple Silicon e Intel con macOS 14 o versioni successive.' },
        { question: 'L’app è notarizzata da Apple?', answer: 'Sì. Il file .dmg è firmato e notarizzato, quindi Gatekeeper lo apre normalmente sulle versioni macOS supportate.' },
        { question: 'Posso usare Zush offline?', answer: 'Sì. Gli utenti PRO possono attivare la modalità IA offline con modelli locali privati tramite Ollama.' },
      ],
    },
    windows: {
      description: 'Tutto quello che devi sapere su Zush per Windows e sul resto del prodotto.',
      items: [
        { question: 'Perché Zush è distribuito tramite Microsoft Store?', answer: 'Lo Store gestisce installazione, firma e aggiornamenti automatici per ogni utente.' },
        { question: 'Zush per Windows ha le stesse funzioni della versione Mac?', answer: 'Sì. Include rinomina IA cloud, monitoraggio cartelle, prompt personalizzati, cronologia per ripristinare, BYOK e modalità IA offline.' },
        { question: 'Funziona su Windows on ARM?', answer: 'Sì. La versione Microsoft Store include pacchetti nativi x64 e ARM64.' },
      ],
    },
  },
  ja: {
    mac: {
      description: 'Zush for Mac と製品全体について知っておきたいこと。',
      items: [
        { question: 'Zush は Apple Silicon で動作しますか？', answer: 'はい。Zush は macOS 14 以降の Apple Silicon Mac と Intel Mac でネイティブに動作します。' },
        { question: 'アプリは Apple によって notarize されていますか？', answer: 'はい。.dmg はコード署名と notarization 済みなので、対応する macOS では Gatekeeper から通常どおり開けます。' },
        { question: 'Zush はオフラインで使えますか？', answer: 'はい。PRO ユーザーは Ollama のプライベートなローカルモデルでオフライン AI モードを有効にできます。' },
      ],
    },
    windows: {
      description: 'Zush for Windows と製品全体について知っておきたいこと。',
      items: [
        { question: 'なぜ Zush は Microsoft Store で配布されていますか？', answer: 'Store がインストール、署名、自動更新を各ユーザー向けに管理するためです。' },
        { question: 'Zush for Windows は Mac 版と同じ機能がありますか？', answer: 'はい。クラウド AI リネーム、フォルダ監視、カスタムプロンプト、復元履歴、BYOK、オフライン AI モードを含みます。' },
        { question: 'Windows on ARM で動作しますか？', answer: 'はい。Microsoft Store 版には x64 と ARM64 のネイティブパッケージが含まれます。' },
      ],
    },
  },
  ko: {
    mac: {
      description: 'Mac용 Zush와 제품 전반에 대해 알아야 할 내용입니다.',
      items: [
        { question: 'Zush는 Apple Silicon에서 작동하나요?', answer: '예. Zush는 macOS 14 이상을 실행하는 Apple Silicon 및 Intel Mac에서 네이티브로 작동합니다.' },
        { question: '앱은 Apple 공증을 받았나요?', answer: '예. .dmg는 코드 서명 및 공증이 완료되어 지원되는 macOS 버전에서 Gatekeeper가 정상적으로 열 수 있습니다.' },
        { question: 'Zush를 오프라인으로 사용할 수 있나요?', answer: '예. PRO 사용자는 Ollama를 통한 개인 로컬 모델로 오프라인 AI 모드를 활성화할 수 있습니다.' },
      ],
    },
    windows: {
      description: 'Windows용 Zush와 제품 전반에 대해 알아야 할 내용입니다.',
      items: [
        { question: 'Zush는 왜 Microsoft Store로 배포되나요?', answer: 'Store가 모든 사용자의 설치, 서명, 자동 업데이트를 처리하기 때문입니다.' },
        { question: 'Windows용 Zush도 Mac과 같은 기능을 제공하나요?', answer: '예. 클라우드 AI 이름 변경, 폴더 모니터링, 사용자 지정 프롬프트, 복원 기록, BYOK, 오프라인 AI 모드를 포함합니다.' },
        { question: 'Windows on ARM에서 실행되나요?', answer: '예. Microsoft Store 릴리스에는 네이티브 x64 및 ARM64 패키지가 포함됩니다.' },
      ],
    },
  },
  'zh-cn': {
    mac: {
      description: '关于 Zush for Mac 和产品功能的常见问题。',
      items: [
        { question: 'Zush 支持 Apple Silicon 吗？', answer: '支持。Zush 可在 Apple Silicon 和 Intel Mac 上原生运行，要求 macOS 14 或更新版本。' },
        { question: '应用经过 Apple 公证吗？', answer: '是的。.dmg 已签名并通过公证，Gatekeeper 可以在受支持的 macOS 版本上正常打开。' },
        { question: '可以离线使用 Zush 吗？', answer: '可以。PRO 用户可以通过 Ollama 的私有本地模型启用离线 AI 模式。' },
      ],
    },
    windows: {
      description: '关于 Zush for Windows 和产品功能的常见问题。',
      items: [
        { question: '为什么通过 Microsoft Store 分发？', answer: 'Microsoft Store 会处理安装、签名和自动更新，用户无需手动维护版本。' },
        { question: 'Windows 版和 Mac 版功能一样吗？', answer: '是的。Windows 版包含云端 AI 重命名、文件夹监控、自定义提示词、恢复历史、BYOK 和离线 AI 模式。' },
        { question: '支持 Windows on ARM 吗？', answer: '支持。Microsoft Store 版本包含 x64 和 ARM64 原生包。' },
      ],
    },
  },
};

export function getPlatformFaqCopy(
  locale: Locale,
  platform: Platform,
  fallback: PlatformFaqCopy,
): PlatformFaqCopy {
  return PLATFORM_FAQ_COPY[locale]?.[platform] ?? fallback;
}
