import type { Locale } from '@/i18n/config';

export interface PlatformSpecificsCopy {
  systemRequirementsEyebrow: string;
  systemRequirementsTitle: string;
  systemRequirementsDescription: string;
  installMethodsEyebrow: string;
  installMethodsTitle: string;
  installMethodsDescription: string;
  installRecommendedBadge: string;
  installCtaLabel: string;
  quickstartEyebrow: string;
  quickstartTitle: string;
  quickstartDescriptionMac: string;
  quickstartDescriptionWindows: string;
  quickstartDropPrefix: string;
  quickstartFilesReady: string;
  quickstartWatching: string;
  integrationsEyebrow: string;
  integrationsTitle: string;
  integrationsDescriptionMac: string;
  integrationsDescriptionWindows: string;
  scenariosEyebrow: string;
  scenariosTitle: string;
  scenariosDescriptionMac: string;
  scenariosDescriptionWindows: string;
  scenariosBeforeLabel: string;
  scenariosAfterLabel: string;
  securityEyebrow: string;
  securityTitle: string;
  securityDescriptionMac: string;
  securityDescriptionWindows: string;
}

const EN: PlatformSpecificsCopy = {
  systemRequirementsEyebrow: 'Compatibility',
  systemRequirementsTitle: 'System requirements',
  systemRequirementsDescription:
    'Everything you need to know before installing — supported OS versions, CPU architectures, memory, and permissions.',
  installMethodsEyebrow: 'Setup',
  installMethodsTitle: 'Install methods',
  installMethodsDescription:
    'Pick the installer that matches how you manage software on your machine.',
  installRecommendedBadge: 'Recommended',
  installCtaLabel: 'Open',
  quickstartEyebrow: 'First run',
  quickstartTitle: 'Quickstart in 60 seconds',
  quickstartDescriptionMac:
    'From a fresh download to a fully automated rename pipeline, the whole flow on Mac fits in a single coffee break.',
  quickstartDescriptionWindows:
    'From the Microsoft Store install to ongoing folder monitoring, the whole flow on Windows fits in a single coffee break.',
  quickstartDropPrefix: 'Drop',
  quickstartFilesReady: '3 files ready',
  quickstartWatching: 'Watching',
  integrationsEyebrow: 'Integrations',
  integrationsTitle: 'Native integrations',
  integrationsDescriptionMac:
    'Zush plugs into the parts of macOS you already use every day — Finder, Shortcuts, Spotlight, and screenshots.',
  integrationsDescriptionWindows:
    'Zush plugs into the parts of Windows you already use every day — File Explorer, Snipping Tool, OneDrive, and Windows Search.',
  scenariosEyebrow: 'Workflows',
  scenariosTitle: 'Real-world scenarios',
  scenariosDescriptionMac:
    'These are the everyday Mac workflows people use Zush for. Each one is a watch-folder or drag-and-drop away.',
  scenariosDescriptionWindows:
    'These are the everyday Windows workflows people use Zush for. Each one is a watch-folder or drag-and-drop away.',
  scenariosBeforeLabel: 'Before',
  scenariosAfterLabel: 'After',
  securityEyebrow: 'Privacy',
  securityTitle: 'Security & privacy',
  securityDescriptionMac:
    'Zush is built to satisfy macOS security expectations. Notarized binary, sandboxed App Store option, Keychain-stored keys, and clear data boundaries.',
  securityDescriptionWindows:
    'Zush uses the standard Microsoft Store install path, Windows Credential Manager for keys, and clear data boundaries.',
};

const PLATFORM_SPECIFICS_COPY: Record<Locale, PlatformSpecificsCopy> = {
  en: EN,
  de: {
    systemRequirementsEyebrow: 'Kompatibilität',
    installMethodsEyebrow: 'Setup',
    quickstartEyebrow: 'Erster Start',
    integrationsEyebrow: 'Integrationen',
    scenariosEyebrow: 'Workflows',
    securityEyebrow: 'Datenschutz',
    systemRequirementsTitle: 'Systemanforderungen',
    systemRequirementsDescription:
      'Alles, was du vor der Installation wissen musst — unterstützte Betriebssystem-Versionen, Prozessor-Architekturen, RAM und Berechtigungen.',
    installMethodsTitle: 'Installationswege',
    installMethodsDescription:
      'Wähle den Installer, der zu deiner Verwaltung passt.',
    installRecommendedBadge: 'Empfohlen',
    installCtaLabel: 'Öffnen',
    quickstartTitle: 'Schnellstart in 60 Sekunden',
    quickstartDescriptionMac:
      'Vom frischen Download bis zur vollautomatischen Umbenenn-Pipeline — der gesamte Ablauf auf dem Mac passt in eine Kaffeepause.',
    quickstartDescriptionWindows:
      'Von der Microsoft-Store-Installation bis zur laufenden Ordnerüberwachung — der gesamte Ablauf unter Windows passt in eine Kaffeepause.',
    quickstartDropPrefix: 'Ablegen in',
    quickstartFilesReady: '3 Dateien bereit',
    quickstartWatching: 'Überwacht',
    integrationsTitle: 'Native Integrationen',
    integrationsDescriptionMac:
      'Zush bindet sich in die macOS-Bestandteile ein, die du jeden Tag nutzt — Finder, Kurzbefehle, Spotlight und Screenshots.',
    integrationsDescriptionWindows:
      'Zush bindet sich in die Windows-Bestandteile ein, die du jeden Tag nutzt — Datei-Explorer, Snipping Tool, OneDrive und Windows-Suche.',
    scenariosTitle: 'Echte Anwendungsfälle',
    scenariosDescriptionMac:
      'Das sind die alltäglichen Mac-Workflows, für die Zush genutzt wird. Jeder ist nur einen Überwachungs-Ordner oder Drag-and-Drop entfernt.',
    scenariosDescriptionWindows:
      'Das sind die alltäglichen Windows-Workflows, für die Zush genutzt wird. Jeder ist nur einen Überwachungs-Ordner oder Drag-and-Drop entfernt.',
    scenariosBeforeLabel: 'Vorher',
    scenariosAfterLabel: 'Nachher',
    securityTitle: 'Sicherheit & Datenschutz',
    securityDescriptionMac:
      'Zush erfüllt die macOS-Sicherheitsanforderungen: notarisierte Binary, sandboxed App-Store-Variante, im Keychain gespeicherte Schlüssel und klare Datengrenzen.',
    securityDescriptionWindows:
      'Zush nutzt den Standardweg über den Microsoft Store, Windows Credential Manager für Schlüssel und klare Datengrenzen.',
  },
  fr: {
    systemRequirementsEyebrow: 'Compatibilité',
    installMethodsEyebrow: 'Installation',
    quickstartEyebrow: 'Premier lancement',
    integrationsEyebrow: 'Intégrations',
    scenariosEyebrow: 'Workflows',
    securityEyebrow: 'Confidentialité',
    systemRequirementsTitle: 'Configuration requise',
    systemRequirementsDescription:
      'Tout ce qu’il faut savoir avant d’installer — versions d’OS supportées, architectures CPU, mémoire et autorisations.',
    installMethodsTitle: 'Méthodes d’installation',
    installMethodsDescription:
      'Choisissez l’installeur qui correspond à votre gestion logicielle.',
    installRecommendedBadge: 'Recommandé',
    installCtaLabel: 'Ouvrir',
    quickstartTitle: 'Démarrage rapide en 60 secondes',
    quickstartDescriptionMac:
      'Du téléchargement à un pipeline de renommage entièrement automatisé — tout le parcours Mac tient dans une pause café.',
    quickstartDescriptionWindows:
      'De l’installation depuis le Microsoft Store à la surveillance continue de dossier — tout le parcours Windows tient dans une pause café.',
    quickstartDropPrefix: 'Déposer dans',
    quickstartFilesReady: '3 fichiers prêts',
    quickstartWatching: 'Surveillance',
    integrationsTitle: 'Intégrations natives',
    integrationsDescriptionMac:
      'Zush s’intègre aux éléments de macOS que vous utilisez chaque jour — Finder, Raccourcis, Spotlight et captures d’écran.',
    integrationsDescriptionWindows:
      'Zush s’intègre aux éléments de Windows que vous utilisez chaque jour — Explorateur de fichiers, Outil Capture, OneDrive et recherche Windows.',
    scenariosTitle: 'Scénarios concrets',
    scenariosDescriptionMac:
      'Voici les workflows Mac quotidiens pour lesquels les gens utilisent Zush. Chacun est à un dossier surveillé ou un glisser-déposer.',
    scenariosDescriptionWindows:
      'Voici les workflows Windows quotidiens pour lesquels les gens utilisent Zush. Chacun est à un dossier surveillé ou un glisser-déposer.',
    scenariosBeforeLabel: 'Avant',
    scenariosAfterLabel: 'Après',
    securityTitle: 'Sécurité & confidentialité',
    securityDescriptionMac:
      'Zush respecte les attentes de sécurité macOS : binaire notarisé, version App Store sandboxée, clés dans le Trousseau et frontières de données claires.',
    securityDescriptionWindows:
      'Zush utilise le parcours standard du Microsoft Store, le Gestionnaire d’identifiants Windows pour les clés et des limites de données claires.',
  },
  'pt-br': {
    systemRequirementsEyebrow: 'Compatibilidade',
    installMethodsEyebrow: 'Instalação',
    quickstartEyebrow: 'Primeira execução',
    integrationsEyebrow: 'Integrações',
    scenariosEyebrow: 'Fluxos',
    securityEyebrow: 'Privacidade',
    systemRequirementsTitle: 'Requisitos de sistema',
    systemRequirementsDescription:
      'Tudo que você precisa saber antes de instalar — versões de SO suportadas, arquiteturas de CPU, memória e permissões.',
    installMethodsTitle: 'Métodos de instalação',
    installMethodsDescription:
      'Escolha o instalador que combina com a forma como você gerencia softwares.',
    installRecommendedBadge: 'Recomendado',
    installCtaLabel: 'Abrir',
    quickstartTitle: 'Início rápido em 60 segundos',
    quickstartDescriptionMac:
      'Do download a um pipeline de renomeação totalmente automatizado — todo o fluxo no Mac cabe em uma pausa para o café.',
    quickstartDescriptionWindows:
      'Da instalação pela Microsoft Store ao monitoramento contínuo de pastas — todo o fluxo no Windows cabe em uma pausa para o café.',
    quickstartDropPrefix: 'Soltar em',
    quickstartFilesReady: '3 arquivos prontos',
    quickstartWatching: 'Monitorando',
    integrationsTitle: 'Integrações nativas',
    integrationsDescriptionMac:
      'O Zush se conecta aos recursos do macOS que você já usa todo dia — Finder, Atalhos, Spotlight e capturas de tela.',
    integrationsDescriptionWindows:
      'O Zush se conecta aos recursos do Windows que você já usa todo dia — Explorador de Arquivos, Ferramenta de Captura, OneDrive e Pesquisa do Windows.',
    scenariosTitle: 'Cenários reais',
    scenariosDescriptionMac:
      'Estes são os fluxos do dia a dia no Mac para os quais as pessoas usam o Zush. Cada um está a uma pasta monitorada ou um arrastar-e-soltar.',
    scenariosDescriptionWindows:
      'Estes são os fluxos do dia a dia no Windows para os quais as pessoas usam o Zush. Cada um está a uma pasta monitorada ou um arrastar-e-soltar.',
    scenariosBeforeLabel: 'Antes',
    scenariosAfterLabel: 'Depois',
    securityTitle: 'Segurança & privacidade',
    securityDescriptionMac:
      'O Zush atende às expectativas de segurança do macOS: binário notarizado, versão da App Store em sandbox, chaves no Keychain e limites de dados claros.',
    securityDescriptionWindows:
      'O Zush usa o fluxo padrão da Microsoft Store, o Gerenciador de Credenciais do Windows para chaves e limites de dados claros.',
  },
  es: {
    systemRequirementsEyebrow: 'Compatibilidad',
    installMethodsEyebrow: 'Instalación',
    quickstartEyebrow: 'Primer arranque',
    integrationsEyebrow: 'Integraciones',
    scenariosEyebrow: 'Flujos',
    securityEyebrow: 'Privacidad',
    systemRequirementsTitle: 'Requisitos del sistema',
    systemRequirementsDescription:
      'Todo lo que necesitas saber antes de instalar — versiones de SO compatibles, arquitecturas de CPU, memoria y permisos.',
    installMethodsTitle: 'Métodos de instalación',
    installMethodsDescription:
      'Elige el instalador que se adapta a cómo gestionas el software.',
    installRecommendedBadge: 'Recomendado',
    installCtaLabel: 'Abrir',
    quickstartTitle: 'Inicio rápido en 60 segundos',
    quickstartDescriptionMac:
      'De la descarga a un pipeline de renombrado totalmente automatizado — todo el flujo en Mac cabe en una pausa para el café.',
    quickstartDescriptionWindows:
      'De la instalación desde Microsoft Store al monitoreo continuo de carpetas — todo el flujo en Windows cabe en una pausa para el café.',
    quickstartDropPrefix: 'Soltar en',
    quickstartFilesReady: '3 archivos listos',
    quickstartWatching: 'Vigilando',
    integrationsTitle: 'Integraciones nativas',
    integrationsDescriptionMac:
      'Zush se integra con las partes de macOS que ya usas a diario — Finder, Atajos, Spotlight y capturas de pantalla.',
    integrationsDescriptionWindows:
      'Zush se integra con las partes de Windows que ya usas a diario — Explorador de Archivos, Recortes, OneDrive y Búsqueda de Windows.',
    scenariosTitle: 'Casos de uso reales',
    scenariosDescriptionMac:
      'Estos son los flujos diarios de Mac para los que la gente usa Zush. Cada uno está a una carpeta monitorizada o un arrastrar-y-soltar.',
    scenariosDescriptionWindows:
      'Estos son los flujos diarios de Windows para los que la gente usa Zush. Cada uno está a una carpeta monitorizada o un arrastrar-y-soltar.',
    scenariosBeforeLabel: 'Antes',
    scenariosAfterLabel: 'Después',
    securityTitle: 'Seguridad y privacidad',
    securityDescriptionMac:
      'Zush cumple las expectativas de seguridad de macOS: binario notarizado, versión App Store en sandbox, claves en Llavero y límites de datos claros.',
    securityDescriptionWindows:
      'Zush usa el flujo estándar de Microsoft Store, el Administrador de credenciales de Windows para las claves y límites de datos claros.',
  },
  nl: {
    systemRequirementsEyebrow: 'Compatibiliteit',
    installMethodsEyebrow: 'Installatie',
    quickstartEyebrow: 'Eerste start',
    integrationsEyebrow: 'Integraties',
    scenariosEyebrow: 'Workflows',
    securityEyebrow: 'Privacy',
    systemRequirementsTitle: 'Systeemvereisten',
    systemRequirementsDescription:
      'Alles wat je moet weten voor de installatie — ondersteunde OS-versies, CPU-architecturen, geheugen en machtigingen.',
    installMethodsTitle: 'Installatiemethoden',
    installMethodsDescription:
      'Kies de installer die past bij hoe je je software beheert.',
    installRecommendedBadge: 'Aanbevolen',
    installCtaLabel: 'Openen',
    quickstartTitle: 'Snelstart in 60 seconden',
    quickstartDescriptionMac:
      'Van een verse download tot een volledig geautomatiseerde hernoempijplijn — de hele flow op Mac past in één koffiepauze.',
    quickstartDescriptionWindows:
      'Van Microsoft Store-installatie tot doorlopende mapmonitoring — de hele flow op Windows past in één koffiepauze.',
    quickstartDropPrefix: 'Sleep naar',
    quickstartFilesReady: '3 bestanden klaar',
    quickstartWatching: 'Bewaken',
    integrationsTitle: 'Native integraties',
    integrationsDescriptionMac:
      'Zush sluit aan op de macOS-onderdelen die je elke dag gebruikt — Finder, Opdrachten, Spotlight en schermafbeeldingen.',
    integrationsDescriptionWindows:
      'Zush sluit aan op de Windows-onderdelen die je elke dag gebruikt — Verkenner, Knipprogramma, OneDrive en Windows Zoeken.',
    scenariosTitle: 'Praktijkscenario’s',
    scenariosDescriptionMac:
      'Dit zijn de dagelijkse Mac-workflows waar mensen Zush voor gebruiken. Elk is een watched folder of een drag-and-drop verwijderd.',
    scenariosDescriptionWindows:
      'Dit zijn de dagelijkse Windows-workflows waar mensen Zush voor gebruiken. Elk is een watched folder of een drag-and-drop verwijderd.',
    scenariosBeforeLabel: 'Voor',
    scenariosAfterLabel: 'Na',
    securityTitle: 'Beveiliging & privacy',
    securityDescriptionMac:
      'Zush voldoet aan de macOS-beveiligingsverwachtingen: genotariseerde binary, App Store-versie in sandbox, sleutels in de Sleutelhanger en heldere datagrenzen.',
    securityDescriptionWindows:
      'Zush gebruikt het standaard Microsoft Store-pad, Windows Referentiebeheer voor sleutels en duidelijke datagrenzen.',
  },
  it: {
    systemRequirementsEyebrow: 'Compatibilità',
    installMethodsEyebrow: 'Installazione',
    quickstartEyebrow: 'Primo avvio',
    integrationsEyebrow: 'Integrazioni',
    scenariosEyebrow: 'Flussi',
    securityEyebrow: 'Privacy',
    systemRequirementsTitle: 'Requisiti di sistema',
    systemRequirementsDescription:
      'Tutto quello che devi sapere prima dell’installazione — versioni di OS supportate, architetture CPU, memoria e permessi.',
    installMethodsTitle: 'Metodi di installazione',
    installMethodsDescription:
      'Scegli l’installer che si adatta al modo in cui gestisci il software.',
    installRecommendedBadge: 'Consigliato',
    installCtaLabel: 'Apri',
    quickstartTitle: 'Avvio rapido in 60 secondi',
    quickstartDescriptionMac:
      'Dal download a una pipeline di rinomina completamente automatizzata — tutto il flusso su Mac entra in una pausa caffè.',
    quickstartDescriptionWindows:
      'Dall’installazione dal Microsoft Store al monitoraggio continuo di cartelle — tutto il flusso su Windows entra in una pausa caffè.',
    quickstartDropPrefix: 'Rilascia in',
    quickstartFilesReady: '3 file pronti',
    quickstartWatching: 'Monitoraggio',
    integrationsTitle: 'Integrazioni native',
    integrationsDescriptionMac:
      'Zush si integra con le parti di macOS che usi ogni giorno — Finder, Comandi rapidi, Spotlight e schermate.',
    integrationsDescriptionWindows:
      'Zush si integra con le parti di Windows che usi ogni giorno — Esplora file, Strumento di cattura, OneDrive e Ricerca Windows.',
    scenariosTitle: 'Scenari reali',
    scenariosDescriptionMac:
      'Questi sono i flussi quotidiani su Mac per cui le persone usano Zush. Ognuno è a una cartella monitorata o un drag-and-drop di distanza.',
    scenariosDescriptionWindows:
      'Questi sono i flussi quotidiani su Windows per cui le persone usano Zush. Ognuno è a una cartella monitorata o un drag-and-drop di distanza.',
    scenariosBeforeLabel: 'Prima',
    scenariosAfterLabel: 'Dopo',
    securityTitle: 'Sicurezza e privacy',
    securityDescriptionMac:
      'Zush soddisfa le aspettative di sicurezza macOS: binary notarizzato, versione App Store in sandbox, chiavi nel Portachiavi e confini di dati chiari.',
    securityDescriptionWindows:
      'Zush usa il percorso standard del Microsoft Store, Gestione credenziali di Windows per le chiavi e confini di dati chiari.',
  },
  ja: {
    systemRequirementsEyebrow: '互換性',
    installMethodsEyebrow: 'セットアップ',
    quickstartEyebrow: '初回起動',
    integrationsEyebrow: '統合',
    scenariosEyebrow: 'ワークフロー',
    securityEyebrow: 'プライバシー',
    systemRequirementsTitle: '動作環境',
    systemRequirementsDescription:
      'インストール前に確認したい情報 — 対応 OS、CPU アーキテクチャ、メモリ、権限のすべて。',
    installMethodsTitle: 'インストール方法',
    installMethodsDescription:
      'あなたのソフトウェア管理に合うインストーラーを選んでください。',
    installRecommendedBadge: '推奨',
    installCtaLabel: '開く',
    quickstartTitle: '60 秒でクイックスタート',
    quickstartDescriptionMac:
      'ダウンロードから完全自動のリネームパイプラインまで、Mac での流れはコーヒーブレイクで完結します。',
    quickstartDescriptionWindows:
      'Microsoft Store のインストールから継続的なフォルダ監視まで、Windows での流れはコーヒーブレイクで完結します。',
    quickstartDropPrefix: 'ドロップ先',
    quickstartFilesReady: '3 件のファイル準備完了',
    quickstartWatching: '監視中',
    integrationsTitle: 'ネイティブ統合',
    integrationsDescriptionMac:
      'Zush は毎日使う macOS の機能と直接連携します — Finder、ショートカット、Spotlight、スクリーンショット。',
    integrationsDescriptionWindows:
      'Zush は毎日使う Windows の機能と直接連携します — エクスプローラー、Snipping Tool、OneDrive、Windows サーチ。',
    scenariosTitle: '実際の使用シナリオ',
    scenariosDescriptionMac:
      'これらは多くの人が Zush を使っている Mac の日常的なワークフローです。それぞれ監視フォルダまたはドラッグ＆ドロップで実行できます。',
    scenariosDescriptionWindows:
      'これらは多くの人が Zush を使っている Windows の日常的なワークフローです。それぞれ監視フォルダまたはドラッグ＆ドロップで実行できます。',
    scenariosBeforeLabel: '変更前',
    scenariosAfterLabel: '変更後',
    securityTitle: 'セキュリティとプライバシー',
    securityDescriptionMac:
      'Zush は macOS のセキュリティ要件を満たします: notarize 済みバイナリ、サンドボックス化された App Store 版、Keychain に保存される鍵、明確なデータ境界。',
    securityDescriptionWindows:
      'Zush は標準の Microsoft Store インストール経路、キー用の Windows 資格情報マネージャー、明確なデータ境界を使います。',
  },
  ko: {
    systemRequirementsEyebrow: '호환성',
    installMethodsEyebrow: '설치',
    quickstartEyebrow: '첫 실행',
    integrationsEyebrow: '통합',
    scenariosEyebrow: '워크플로',
    securityEyebrow: '개인 정보',
    systemRequirementsTitle: '시스템 요구 사항',
    systemRequirementsDescription:
      '설치 전에 알아야 할 모든 것 — 지원 OS 버전, CPU 아키텍처, 메모리, 권한.',
    installMethodsTitle: '설치 방법',
    installMethodsDescription:
      '소프트웨어 관리 방식에 맞는 설치 방법을 선택하세요.',
    installRecommendedBadge: '권장',
    installCtaLabel: '열기',
    quickstartTitle: '60초 빠른 시작',
    quickstartDescriptionMac:
      '다운로드부터 완전 자동화된 이름 변경 파이프라인까지, Mac에서의 전체 흐름은 커피 한 잔이면 충분합니다.',
    quickstartDescriptionWindows:
      'Microsoft Store 설치부터 지속적인 폴더 모니터링까지, Windows에서의 전체 흐름은 커피 한 잔이면 충분합니다.',
    quickstartDropPrefix: '드롭 위치',
    quickstartFilesReady: '파일 3개 준비됨',
    quickstartWatching: '감시 중',
    integrationsTitle: '네이티브 통합',
    integrationsDescriptionMac:
      'Zush는 매일 사용하는 macOS 구성 요소와 직접 연동됩니다 — Finder, 단축어, Spotlight, 스크린샷.',
    integrationsDescriptionWindows:
      'Zush는 매일 사용하는 Windows 구성 요소와 직접 연동됩니다 — 파일 탐색기, 캡처 도구, OneDrive, Windows 검색.',
    scenariosTitle: '실제 사용 사례',
    scenariosDescriptionMac:
      '사람들이 Zush를 사용하는 일상적인 Mac 워크플로입니다. 각각 감시 폴더 하나 또는 드래그 앤 드롭으로 실행됩니다.',
    scenariosDescriptionWindows:
      '사람들이 Zush를 사용하는 일상적인 Windows 워크플로입니다. 각각 감시 폴더 하나 또는 드래그 앤 드롭으로 실행됩니다.',
    scenariosBeforeLabel: '이전',
    scenariosAfterLabel: '이후',
    securityTitle: '보안 및 개인 정보',
    securityDescriptionMac:
      'Zush는 macOS 보안 기대치를 만족합니다: 공증된 바이너리, 샌드박스 App Store 버전, 키체인 저장 키, 명확한 데이터 경계.',
    securityDescriptionWindows:
      'Zush는 표준 Microsoft Store 설치 경로, 키 저장을 위한 Windows 자격 증명 관리자, 명확한 데이터 경계를 사용합니다.',
  },
  'zh-cn': {
    systemRequirementsEyebrow: '兼容性',
    installMethodsEyebrow: '安装',
    quickstartEyebrow: '首次运行',
    integrationsEyebrow: '集成',
    scenariosEyebrow: '工作流',
    securityEyebrow: '隐私',
    systemRequirementsTitle: '系统要求',
    systemRequirementsDescription:
      '安装前需要了解的所有信息 — 支持的系统版本、CPU 架构、内存和权限。',
    installMethodsTitle: '安装方式',
    installMethodsDescription:
      '根据你的软件管理习惯选择安装方式。',
    installRecommendedBadge: '推荐',
    installCtaLabel: '打开',
    quickstartTitle: '60 秒快速上手',
    quickstartDescriptionMac:
      '从下载到完全自动化的重命名流水线 — 在 Mac 上的整个流程一杯咖啡的时间就能搞定。',
    quickstartDescriptionWindows:
      '从 Microsoft Store 安装到持续的文件夹监控 — 在 Windows 上的整个流程一杯咖啡的时间就能搞定。',
    quickstartDropPrefix: '拖放到',
    quickstartFilesReady: '3 个文件已准备好',
    quickstartWatching: '正在监控',
    integrationsTitle: '原生集成',
    integrationsDescriptionMac:
      'Zush 与你每天使用的 macOS 组件无缝集成 — Finder、快捷指令、Spotlight 和截图。',
    integrationsDescriptionWindows:
      'Zush 与你每天使用的 Windows 组件无缝集成 — 文件资源管理器、截图工具、OneDrive 和 Windows 搜索。',
    scenariosTitle: '真实使用场景',
    scenariosDescriptionMac:
      '这些是人们在 Mac 上日常使用 Zush 的工作流。每一个只需一个监控文件夹或一次拖放即可完成。',
    scenariosDescriptionWindows:
      '这些是人们在 Windows 上日常使用 Zush 的工作流。每一个只需一个监控文件夹或一次拖放即可完成。',
    scenariosBeforeLabel: '之前',
    scenariosAfterLabel: '之后',
    securityTitle: '安全与隐私',
    securityDescriptionMac:
      'Zush 满足 macOS 的安全要求：经过 Apple 公证的二进制、沙盒化的 App Store 版本、保存在钥匙串中的密钥，以及清晰的数据边界。',
    securityDescriptionWindows:
      'Zush 使用标准的 Microsoft Store 安装流程、Windows 凭据管理器保存密钥，并保持清晰的数据边界。',
  },
};

export function getPlatformSpecificsCopy(locale: Locale): PlatformSpecificsCopy {
  return PLATFORM_SPECIFICS_COPY[locale] ?? EN;
}
