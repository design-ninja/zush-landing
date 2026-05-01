import type { Locale } from '@/i18n/config';
import { getLocalizedPath } from '@/i18n/config';
import { getStaticPageCopy } from '@/i18n/staticPages';
import type { BYOKSetupCopy, ProviderSetup } from '@/views/BYOKSetup/BYOKSetup';
import type { OllamaSetupCopy } from '@/views/OllamaSetup/OllamaSetup';

type SetupLocale = Exclude<Locale, 'en'>;

interface ProviderMeta {
  id: 'gemini' | 'groq' | 'openai' | 'claude';
  title: string;
  providerName: string;
  dashboardName: string;
  dashboardUrl: string;
  pricingUrl: string;
  noteType: 'free' | 'pricing';
}

interface BYOKLocaleText {
  option: string;
  getKey: (dashboardName: string, isFree: boolean) => string;
  copyInstruction: string;
  openDashboard: (dashboardName: string) => string;
  freeTierLabel: string;
  pricingLabel: string;
  notes: Record<ProviderMeta['id'], string>;
  steps: BYOKSetupCopy['steps'];
  faqTitle: string;
  faqs: BYOKSetupCopy['faqs'];
  securityTitle: string;
}

interface OllamaLocaleText {
  downloadOllama: string;
  recommendedModelsButton: string;
  offlineTitleFallback: string;
  setupTitle: string;
  openDownloadPage: string;
  steps: OllamaSetupCopy['steps'];
  recommendedTitle: string;
  recommendedLead: string;
  models: OllamaSetupCopy['recommendedModels'];
  catalogPrefix: string;
  catalogLink: string;
  catalogSuffix: string;
  troubleshootingTitle: string;
  troubleshooting: OllamaSetupCopy['troubleshooting'];
  note: string;
}

interface SetupLocaleText {
  backToHome: string;
  byok: BYOKLocaleText;
  ollama: OllamaLocaleText;
}

const PROVIDERS: ProviderMeta[] = [
  {
    id: 'gemini',
    title: 'Gemini API (Google)',
    providerName: 'Gemini (Google)',
    dashboardName: 'Google AI Studio',
    dashboardUrl: 'https://aistudio.google.com/app/apikey',
    pricingUrl: 'https://ai.google.dev/pricing',
    noteType: 'free',
  },
  {
    id: 'groq',
    title: 'Groq API',
    providerName: 'Groq',
    dashboardName: 'Groq Console',
    dashboardUrl: 'https://console.groq.com/keys',
    pricingUrl: 'https://groq.com/pricing/',
    noteType: 'free',
  },
  {
    id: 'openai',
    title: 'OpenAI API',
    providerName: 'OpenAI',
    dashboardName: 'OpenAI Platform',
    dashboardUrl: 'https://platform.openai.com/api-keys',
    pricingUrl: 'https://platform.openai.com/docs/pricing',
    noteType: 'pricing',
  },
  {
    id: 'claude',
    title: 'Claude API (Anthropic)',
    providerName: 'Claude',
    dashboardName: 'Anthropic Console',
    dashboardUrl: 'https://console.anthropic.com/settings/keys',
    pricingUrl: 'https://www.anthropic.com/pricing#702702',
    noteType: 'pricing',
  },
];

const makeProviderCopy = (text: BYOKLocaleText): ProviderSetup[] =>
  PROVIDERS.map((provider, index) => ({
    title: `${text.option} ${index + 1}: ${provider.title}`,
    providerName: provider.providerName,
    dashboardName: provider.dashboardName,
    getKeyText: text.getKey(provider.dashboardName, provider.noteType === 'free'),
    dashboardUrl: provider.dashboardUrl,
    buttonLabel: text.openDashboard(provider.dashboardName),
    copyInstruction: text.copyInstruction,
    noteLabel: provider.noteType === 'free' ? text.freeTierLabel : text.pricingLabel,
    noteText: text.notes[provider.id],
    pricingUrl: provider.pricingUrl,
  }));

const modelNames = {
  speed: 'qwen2.5vl:3b',
  balance: 'gemma3:4b',
  documents: 'granite3.2-vision:2b',
} as const;

const t: Partial<Record<SetupLocale, SetupLocaleText>> = {
  de: {
    backToHome: 'Zurück zur Startseite',
    byok: {
      option: 'Option',
      getKey: (dashboardName, isFree) => `Öffne ${dashboardName} und erstelle ${isFree ? 'einen kostenlosen API-Schlüssel' : 'einen API-Schlüssel'}.`,
      copyInstruction: 'Klicke im Anbieter-Dashboard auf die Schaltfläche zum Erstellen eines Schlüssels und kopiere den generierten Schlüssel.',
      openDashboard: (dashboardName) => `${dashboardName} öffnen`,
      freeTierLabel: 'Kostenloses Kontingent:',
      pricingLabel: 'Preise:',
      notes: {
        gemini: 'Gemini bietet 15 Anfragen pro Minute kostenlos. Das reicht für die meisten Nutzer.',
        groq: 'Groq bietet ein großzügiges kostenloses Kontingent mit sehr schneller Inferenz.',
        openai: 'OpenAI nutzt Pay-as-you-go. Zush verwendet GPT-4o mini für schnelle und günstige Dateianalyse.',
        claude: 'Claude nutzt Pay-as-you-go. Zush verwendet Claude Haiku für schnelle und kosteneffiziente Dateianalyse.',
      },
      steps: {
        getKey: 'API-Schlüssel abrufen',
        copyKey: 'API-Schlüssel kopieren',
        configure: 'In Zush konfigurieren',
        settingsPath: 'Öffne Zush -> Settings -> Preferences -> BYOK',
        selectProvider: (providerName) => `"${providerName}" als KI-Anbieter auswählen`,
        pasteKey: 'API-Schlüssel einfügen',
        saveEnable: 'Auf "Save" klicken und BYOK aktivieren',
        viewPricing: 'Preise ansehen ->',
      },
      faqTitle: 'Häufig gestellte Fragen',
      faqs: [
        { question: 'Ist mein API-Schlüssel sicher?', answer: 'Ja. Der Schlüssel wird lokal in sicherem Systemspeicher abgelegt und nur für BYOK-Anfragen an den gewählten Anbieter verwendet.' },
        { question: 'Was kostet das?', answer: 'Gemini und Groq haben kostenlose Kontingente. OpenAI und Claude rechnen nutzungsbasiert ab. Typische Nutzung kostet meist deutlich unter 1 US-Dollar pro Monat.' },
        { question: 'Bleiben meine 10.000 Credits erhalten?', answer: 'Ja. Wenn BYOK deaktiviert ist, kannst du verbleibende Credits weiter nutzen. BYOK ist optional.' },
        { question: 'Welchen Anbieter soll ich wählen?', answer: 'Alle vier funktionieren gut. Gemini ist stark multimodal, Groq sehr schnell, OpenAI zuverlässig und Claude liefert hochwertige Dateiverständnis-Ergebnisse.' },
        { question: 'Brauche ich PRO?', answer: 'Ja, BYOK ist eine PRO-Funktion. Free-Nutzer können für eine Einmalzahlung von 10 US-Dollar upgraden.' },
      ],
      securityTitle: 'Sicherheit & Datenschutz',
    },
    ollama: {
      downloadOllama: 'Ollama herunterladen',
      recommendedModelsButton: 'Empfohlene Modelle',
      offlineTitleFallback: 'Was Offline-KI bedeutet',
      setupTitle: 'Einrichtungsschritte',
      openDownloadPage: 'Ollama-Downloadseite öffnen',
      steps: [
        { title: 'Ollama installieren', body: 'Lade Ollama für macOS von der offiziellen Website, installiere es und öffne die App einmal, damit der lokale Server startet.' },
        { title: 'Vision-Modell herunterladen', body: 'Zush funktioniert am besten mit einem vision-fähigen Modell für Bilder, Screenshots, PDFs und Vorschauen. Starte mit:', command: `ollama pull ${modelNames.speed}` },
        { title: 'Prüfen, ob Ollama läuft', body: 'Ollama läuft normalerweise im Hintergrund. Wenn Zush keine Verbindung herstellen kann, starte es im Terminal:', command: 'ollama serve' },
        { title: 'Offline-KI in Zush aktivieren', body: 'Öffne Zush, gehe zu AI Setup, aktiviere Offline AI mode, aktualisiere die Modellliste, wähle dein Modell und führe Test aus.' },
      ],
      recommendedTitle: 'Empfohlene Modelle',
      recommendedLead: 'Wähle je nach Aufgabe: qwen2.5vl:3b für Geschwindigkeit, gemma3:4b für Balance oder granite3.2-vision:2b für Dokumente.',
      models: [
        { name: modelNames.speed, label: 'Für Tempo', command: `ollama pull ${modelNames.speed}`, description: 'Die schnellste erste Wahl für alltägliche Screenshots und Bilder.', hardware: 'Die meisten Apple-Silicon-Macs', speed: 'Am schnellsten' },
        { name: modelNames.balance, label: 'Für Balance', command: `ollama pull ${modelNames.balance}`, description: 'Ein guter Standard, wenn Qualität und Geschwindigkeit beide wichtig sind.', hardware: '8 GB+ Speicher empfohlen', speed: 'Ausgewogen' },
        { name: modelNames.documents, label: 'Für Dokumente', command: `ollama pull ${modelNames.documents}`, description: 'Ein kompaktes Vision-Modell für Dokumentvorschauen, Scans und strukturierte Inhalte.', hardware: 'Die meisten Apple-Silicon-Macs', speed: 'Schnell' },
      ],
      catalogPrefix: 'Oder wähle ein anderes vision-fähiges Modell aus dem ',
      catalogLink: 'Ollama-Modellkatalog',
      catalogSuffix: '.',
      troubleshootingTitle: 'Fehlerbehebung',
      troubleshooting: [
        { title: 'Zush sieht keine Modelle', body: 'Führe ollama list im Terminal aus. Wenn die Liste leer ist, lade zuerst ein Modell und aktualisiere dann Zush.' },
        { title: 'Verbindungstest schlägt fehl', body: 'Stelle sicher, dass Ollama läuft und der Host in Zush auf http://127.0.0.1:11434 gesetzt ist.' },
        { title: 'Die Verarbeitung ist zu langsam', body: 'Nutze ein kleineres Modell wie qwen2.5vl:3b, schließe speicherintensive Apps oder wechsle für große Stapel zurück zur Cloud.' },
      ],
      note: 'Offline-KI ist getrennt von Cloud und BYOK. Cloud nutzt Zush-Credits, BYOK nutzt deinen Anbieter-Schlüssel und Offline-KI nutzt Ollama auf deinem Gerät.',
    },
  },
  fr: {
    backToHome: 'Retour à l’accueil',
    byok: {
      option: 'Option',
      getKey: (dashboardName, isFree) => `Ouvrez ${dashboardName} et créez ${isFree ? 'une clé API gratuite' : 'une clé API'}.`,
      copyInstruction: 'Cliquez sur la création de clé dans le tableau de bord du fournisseur, puis copiez la clé générée.',
      openDashboard: (dashboardName) => `Ouvrir ${dashboardName}`,
      freeTierLabel: 'Offre gratuite :',
      pricingLabel: 'Tarifs :',
      notes: {
        gemini: 'Gemini propose 15 requêtes par minute gratuitement, suffisant pour la plupart des usages.',
        groq: 'Groq propose une offre gratuite généreuse avec une inférence très rapide.',
        openai: 'OpenAI est facturé à l’usage. Zush utilise GPT-4o mini pour une analyse rapide et abordable.',
        claude: 'Claude est facturé à l’usage. Zush utilise Claude Haiku pour une analyse rapide et économique.',
      },
      steps: {
        getKey: 'Obtenir votre clé API',
        copyKey: 'Copier votre clé API',
        configure: 'Configurer dans Zush',
        settingsPath: 'Ouvrez Zush -> Settings -> Preferences -> BYOK',
        selectProvider: (providerName) => `Sélectionnez "${providerName}" comme fournisseur IA`,
        pasteKey: 'Collez votre clé API',
        saveEnable: 'Cliquez sur "Save" et activez BYOK',
        viewPricing: 'Voir les tarifs ->',
      },
      faqTitle: 'Questions fréquentes',
      faqs: [
        { question: 'Ma clé API est-elle sécurisée ?', answer: 'Oui. Elle est stockée localement dans le stockage sécurisé du système et utilisée seulement pour les requêtes BYOK vers le fournisseur choisi.' },
        { question: 'Combien cela coûte-t-il ?', answer: 'Gemini et Groq ont des offres gratuites. OpenAI et Claude sont facturés à l’usage. Pour une utilisation typique, le coût est souvent inférieur à 1 $ par mois.' },
        { question: 'Est-ce que je garde mes 10 000 crédits ?', answer: 'Oui. Quand BYOK est désactivé, vous pouvez continuer à utiliser vos crédits restants. BYOK est optionnel.' },
        { question: 'Quel fournisseur choisir ?', answer: 'Les quatre fonctionnent bien : Gemini est fort en multimodal, Groq est très rapide, OpenAI est fiable et Claude donne une compréhension de fichiers de haute qualité.' },
        { question: 'Faut-il être PRO ?', answer: 'Oui, BYOK est réservé aux utilisateurs PRO. Les utilisateurs gratuits peuvent passer à PRO avec un paiement unique de 10 $.' },
      ],
      securityTitle: 'Sécurité et confidentialité',
    },
    ollama: {
      downloadOllama: 'Télécharger Ollama',
      recommendedModelsButton: 'Modèles recommandés',
      offlineTitleFallback: 'Ce que signifie l’IA hors ligne',
      setupTitle: 'Étapes de configuration',
      openDownloadPage: 'Ouvrir la page de téléchargement Ollama',
      steps: [
        { title: 'Installer Ollama', body: 'Téléchargez Ollama pour macOS depuis le site officiel, installez-le et ouvrez l’app une fois pour démarrer le serveur local.' },
        { title: 'Télécharger un modèle vision', body: 'Zush fonctionne mieux avec un modèle capable de comprendre images, captures, PDF et aperçus. Commencez par :', command: `ollama pull ${modelNames.speed}` },
        { title: 'Vérifier qu’Ollama tourne', body: 'Ollama fonctionne normalement en arrière-plan. Si Zush ne se connecte pas, démarrez-le dans le Terminal :', command: 'ollama serve' },
        { title: 'Activer l’IA hors ligne dans Zush', body: 'Ouvrez Zush, allez dans AI Setup, activez Offline AI mode, actualisez la liste des modèles, choisissez le modèle et lancez Test.' },
      ],
      recommendedTitle: 'Modèles recommandés',
      recommendedLead: 'Choisissez selon le besoin : qwen2.5vl:3b pour la vitesse, gemma3:4b pour l’équilibre ou granite3.2-vision:2b pour les documents.',
      models: [
        { name: modelNames.speed, label: 'Vitesse', command: `ollama pull ${modelNames.speed}`, description: 'Le premier choix le plus rapide pour captures et images courantes.', hardware: 'La plupart des Mac Apple Silicon', speed: 'Le plus rapide' },
        { name: modelNames.balance, label: 'Équilibre', command: `ollama pull ${modelNames.balance}`, description: 'Un bon choix par défaut quand vitesse et qualité comptent.', hardware: '8 Go+ recommandés', speed: 'Équilibré' },
        { name: modelNames.documents, label: 'Documents', command: `ollama pull ${modelNames.documents}`, description: 'Un modèle vision compact pour aperçus de documents, scans et contenus structurés.', hardware: 'La plupart des Mac Apple Silicon', speed: 'Rapide' },
      ],
      catalogPrefix: 'Ou choisissez un autre modèle vision dans le ',
      catalogLink: 'catalogue de modèles Ollama',
      catalogSuffix: '.',
      troubleshootingTitle: 'Dépannage',
      troubleshooting: [
        { title: 'Zush ne voit aucun modèle', body: 'Exécutez ollama list dans le Terminal. Si la liste est vide, téléchargez d’abord un modèle, puis actualisez Zush.' },
        { title: 'Le test de connexion échoue', body: 'Vérifiez qu’Ollama fonctionne et que l’hôte dans Zush est http://127.0.0.1:11434.' },
        { title: 'Le traitement est trop lent', body: 'Utilisez un modèle plus petit comme qwen2.5vl:3b, fermez les apps gourmandes ou revenez au cloud pour les gros lots.' },
      ],
      note: 'Le mode IA hors ligne est distinct du Cloud et de BYOK. Cloud utilise les crédits Zush, BYOK utilise votre clé fournisseur et l’IA hors ligne utilise Ollama sur votre appareil.',
    },
  },
  'pt-br': {
    backToHome: 'Voltar ao início',
    byok: {
      option: 'Opção',
      getKey: (dashboardName, isFree) => `Abra ${dashboardName} e crie ${isFree ? 'uma chave API gratuita' : 'uma chave API'}.`,
      copyInstruction: 'Clique para criar uma chave no painel do provedor e copie a chave gerada.',
      openDashboard: (dashboardName) => `Abrir ${dashboardName}`,
      freeTierLabel: 'Plano gratuito:',
      pricingLabel: 'Preço:',
      notes: {
        gemini: 'O Gemini oferece 15 solicitações por minuto gratuitamente, ideal para a maioria dos usuários.',
        groq: 'O Groq oferece um plano gratuito generoso com inferência muito rápida.',
        openai: 'A OpenAI cobra por uso. O Zush usa GPT-4o mini para análise rápida e acessível.',
        claude: 'O Claude cobra por uso. O Zush usa Claude Haiku para análise rápida e econômica.',
      },
      steps: {
        getKey: 'Obtenha sua chave API',
        copyKey: 'Copie sua chave API',
        configure: 'Configure no Zush',
        settingsPath: 'Abra Zush -> Settings -> Preferences -> BYOK',
        selectProvider: (providerName) => `Selecione "${providerName}" como provedor de IA`,
        pasteKey: 'Cole sua chave API',
        saveEnable: 'Clique em "Save" e ative BYOK',
        viewPricing: 'Ver preços ->',
      },
      faqTitle: 'Perguntas frequentes',
      faqs: [
        { question: 'Minha chave API é segura?', answer: 'Sim. Ela fica armazenada localmente em armazenamento seguro da plataforma e é usada apenas em solicitações BYOK para o provedor escolhido.' },
        { question: 'Quanto custa?', answer: 'Gemini e Groq têm planos gratuitos. OpenAI e Claude cobram por uso. Em uso típico, o custo costuma ficar abaixo de US$ 1 por mês.' },
        { question: 'Ainda tenho os 10.000 créditos?', answer: 'Sim. Quando BYOK está desativado, você pode usar seus créditos restantes. BYOK é opcional.' },
        { question: 'Qual provedor escolher?', answer: 'Todos funcionam bem. Gemini é forte em multimodal, Groq é muito rápido, OpenAI é confiável e Claude entende arquivos com alta qualidade.' },
        { question: 'Preciso ser PRO?', answer: 'Sim, BYOK é exclusivo para PRO. Usuários gratuitos podem fazer upgrade com pagamento único de US$ 10.' },
      ],
      securityTitle: 'Segurança e privacidade',
    },
    ollama: {
      downloadOllama: 'Baixar Ollama',
      recommendedModelsButton: 'Modelos recomendados',
      offlineTitleFallback: 'O que significa IA offline',
      setupTitle: 'Passos de configuração',
      openDownloadPage: 'Abrir página de download do Ollama',
      steps: [
        { title: 'Instale o Ollama', body: 'Baixe o Ollama para macOS no site oficial, instale e abra o app uma vez para iniciar o servidor local.' },
        { title: 'Baixe um modelo de visão', body: 'O Zush funciona melhor com um modelo capaz de entender imagens, screenshots, PDFs e prévias. Comece com:', command: `ollama pull ${modelNames.speed}` },
        { title: 'Verifique se o Ollama está rodando', body: 'Normalmente o Ollama roda em segundo plano. Se o Zush não conectar, inicie pelo Terminal:', command: 'ollama serve' },
        { title: 'Ative IA offline no Zush', body: 'Abra Zush, vá para AI Setup, ative Offline AI mode, atualize a lista de modelos, selecione o modelo e rode Test.' },
      ],
      recommendedTitle: 'Modelos recomendados',
      recommendedLead: 'Escolha pelo trabalho: qwen2.5vl:3b para velocidade, gemma3:4b para equilíbrio ou granite3.2-vision:2b para documentos.',
      models: [
        { name: modelNames.speed, label: 'Velocidade', command: `ollama pull ${modelNames.speed}`, description: 'A primeira opção mais rápida para screenshots e imagens do dia a dia.', hardware: 'Maioria dos Macs Apple Silicon', speed: 'Mais rápido' },
        { name: modelNames.balance, label: 'Equilíbrio', command: `ollama pull ${modelNames.balance}`, description: 'Um bom padrão quando velocidade e qualidade importam.', hardware: '8 GB+ recomendados', speed: 'Equilibrado' },
        { name: modelNames.documents, label: 'Documentos', command: `ollama pull ${modelNames.documents}`, description: 'Modelo de visão compacto para prévias de documentos, digitalizações e conteúdo estruturado.', hardware: 'Maioria dos Macs Apple Silicon', speed: 'Rápido' },
      ],
      catalogPrefix: 'Ou escolha outro modelo de visão no ',
      catalogLink: 'catálogo de modelos Ollama',
      catalogSuffix: '.',
      troubleshootingTitle: 'Solução de problemas',
      troubleshooting: [
        { title: 'O Zush não vê modelos', body: 'Execute ollama list no Terminal. Se a lista estiver vazia, baixe um modelo primeiro e atualize o Zush.' },
        { title: 'O teste de conexão falha', body: 'Confirme que o Ollama está rodando e que o host no Zush é http://127.0.0.1:11434.' },
        { title: 'O processamento está lento', body: 'Use um modelo menor como qwen2.5vl:3b, feche apps pesados ou volte para a nuvem em lotes grandes.' },
      ],
      note: 'IA offline é separada de Cloud e BYOK. Cloud usa créditos do Zush, BYOK usa sua chave do provedor e IA offline usa Ollama no seu dispositivo.',
    },
  },
  es: {
    backToHome: 'Volver al inicio',
    byok: {
      option: 'Opción',
      getKey: (dashboardName, isFree) => `Abre ${dashboardName} y crea ${isFree ? 'una clave API gratuita' : 'una clave API'}.`,
      copyInstruction: 'Haz clic para crear una clave en el panel del proveedor y copia la clave generada.',
      openDashboard: (dashboardName) => `Abrir ${dashboardName}`,
      freeTierLabel: 'Plan gratuito:',
      pricingLabel: 'Precio:',
      notes: {
        gemini: 'Gemini ofrece 15 solicitudes por minuto gratis, suficiente para la mayoría.',
        groq: 'Groq ofrece un plan gratuito generoso con inferencia muy rápida.',
        openai: 'OpenAI cobra por uso. Zush usa GPT-4o mini para análisis rápido y económico.',
        claude: 'Claude cobra por uso. Zush usa Claude Haiku para análisis rápido y rentable.',
      },
      steps: {
        getKey: 'Obtén tu clave API',
        copyKey: 'Copia tu clave API',
        configure: 'Configura en Zush',
        settingsPath: 'Abre Zush -> Settings -> Preferences -> BYOK',
        selectProvider: (providerName) => `Selecciona "${providerName}" como proveedor de IA`,
        pasteKey: 'Pega tu clave API',
        saveEnable: 'Haz clic en "Save" y activa BYOK',
        viewPricing: 'Ver precios ->',
      },
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        { question: '¿Mi clave API es segura?', answer: 'Sí. Se guarda localmente en almacenamiento seguro de la plataforma y solo se usa para solicitudes BYOK al proveedor elegido.' },
        { question: '¿Cuánto cuesta?', answer: 'Gemini y Groq tienen planes gratuitos. OpenAI y Claude cobran por uso. En uso típico suele costar menos de 1 US$ al mes.' },
        { question: '¿Conservo los 10.000 créditos?', answer: 'Sí. Cuando BYOK está desactivado, puedes seguir usando los créditos restantes. BYOK es opcional.' },
        { question: '¿Qué proveedor elijo?', answer: 'Los cuatro funcionan bien. Gemini es fuerte en multimodal, Groq es muy rápido, OpenAI es fiable y Claude entiende archivos con mucha calidad.' },
        { question: '¿Necesito PRO?', answer: 'Sí, BYOK es exclusivo de PRO. Puedes actualizar con un pago único de 10 US$.' },
      ],
      securityTitle: 'Seguridad y privacidad',
    },
    ollama: {
      downloadOllama: 'Descargar Ollama',
      recommendedModelsButton: 'Modelos recomendados',
      offlineTitleFallback: 'Qué significa IA offline',
      setupTitle: 'Pasos de configuración',
      openDownloadPage: 'Abrir página de descarga de Ollama',
      steps: [
        { title: 'Instala Ollama', body: 'Descarga Ollama para macOS desde el sitio oficial, instálalo y abre la app una vez para iniciar el servidor local.' },
        { title: 'Descarga un modelo de visión', body: 'Zush funciona mejor con un modelo que entienda imágenes, capturas, PDFs y vistas previas. Empieza con:', command: `ollama pull ${modelNames.speed}` },
        { title: 'Comprueba que Ollama está activo', body: 'Ollama suele ejecutarse en segundo plano. Si Zush no conecta, inícialo desde Terminal:', command: 'ollama serve' },
        { title: 'Activa IA offline en Zush', body: 'Abre Zush, ve a AI Setup, activa Offline AI mode, actualiza la lista de modelos, selecciona uno y ejecuta Test.' },
      ],
      recommendedTitle: 'Modelos recomendados',
      recommendedLead: 'Elige según la tarea: qwen2.5vl:3b para velocidad, gemma3:4b para equilibrio o granite3.2-vision:2b para documentos.',
      models: [
        { name: modelNames.speed, label: 'Velocidad', command: `ollama pull ${modelNames.speed}`, description: 'La opción inicial más rápida para capturas e imágenes cotidianas.', hardware: 'La mayoría de Macs Apple Silicon', speed: 'Más rápido' },
        { name: modelNames.balance, label: 'Equilibrio', command: `ollama pull ${modelNames.balance}`, description: 'Buen valor por defecto cuando importan velocidad y calidad.', hardware: '8 GB+ recomendados', speed: 'Equilibrado' },
        { name: modelNames.documents, label: 'Documentos', command: `ollama pull ${modelNames.documents}`, description: 'Modelo de visión compacto para documentos, escaneos y contenido estructurado.', hardware: 'La mayoría de Macs Apple Silicon', speed: 'Rápido' },
      ],
      catalogPrefix: 'O elige otro modelo de visión en el ',
      catalogLink: 'catálogo de modelos de Ollama',
      catalogSuffix: '.',
      troubleshootingTitle: 'Solución de problemas',
      troubleshooting: [
        { title: 'Zush no ve ningún modelo', body: 'Ejecuta ollama list en Terminal. Si la lista está vacía, descarga un modelo y luego actualiza Zush.' },
        { title: 'Falla el test de conexión', body: 'Asegúrate de que Ollama esté activo y que el host en Zush sea http://127.0.0.1:11434.' },
        { title: 'El procesamiento es lento', body: 'Usa un modelo más pequeño como qwen2.5vl:3b, cierra apps pesadas o vuelve a Cloud para lotes grandes.' },
      ],
      note: 'IA offline es independiente de Cloud y BYOK. Cloud usa créditos de Zush, BYOK usa tu clave del proveedor e IA offline usa Ollama en tu dispositivo.',
    },
  },
  nl: {
    backToHome: 'Terug naar home',
    byok: {
      option: 'Optie',
      getKey: (dashboardName, isFree) => `Open ${dashboardName} en maak ${isFree ? 'een gratis API-sleutel' : 'een API-sleutel'} aan.`,
      copyInstruction: 'Klik in het provider-dashboard om een sleutel te maken en kopieer de gegenereerde sleutel.',
      openDashboard: (dashboardName) => `${dashboardName} openen`,
      freeTierLabel: 'Gratis laag:',
      pricingLabel: 'Prijzen:',
      notes: {
        gemini: 'Gemini biedt gratis 15 requests per minuut, genoeg voor de meeste gebruikers.',
        groq: 'Groq biedt een ruime gratis laag met zeer snelle inferentie.',
        openai: 'OpenAI rekent per gebruik. Zush gebruikt GPT-4o mini voor snelle en betaalbare analyse.',
        claude: 'Claude rekent per gebruik. Zush gebruikt Claude Haiku voor snelle en kosteneffectieve analyse.',
      },
      steps: {
        getKey: 'Haal je API-sleutel op',
        copyKey: 'Kopieer je API-sleutel',
        configure: 'Configureer in Zush',
        settingsPath: 'Open Zush -> Settings -> Preferences -> BYOK',
        selectProvider: (providerName) => `Selecteer "${providerName}" als AI-provider`,
        pasteKey: 'Plak je API-sleutel',
        saveEnable: 'Klik op "Save" en schakel BYOK in',
        viewPricing: 'Bekijk prijzen ->',
      },
      faqTitle: 'Veelgestelde vragen',
      faqs: [
        { question: 'Is mijn API-sleutel veilig?', answer: 'Ja. De sleutel wordt lokaal opgeslagen in veilige platformopslag en alleen gebruikt voor BYOK-verzoeken naar je gekozen provider.' },
        { question: 'Wat kost het?', answer: 'Gemini en Groq hebben gratis lagen. OpenAI en Claude rekenen per gebruik. Typisch gebruik kost meestal minder dan 1 dollar per maand.' },
        { question: 'Houd ik mijn 10.000 credits?', answer: 'Ja. Als BYOK uit staat, kun je je resterende credits blijven gebruiken. BYOK is optioneel.' },
        { question: 'Welke provider kies ik?', answer: 'Alle vier werken goed. Gemini is sterk multimodaal, Groq is erg snel, OpenAI is betrouwbaar en Claude begrijpt bestanden goed.' },
        { question: 'Heb ik PRO nodig?', answer: 'Ja, BYOK is exclusief voor PRO. Gratis gebruikers kunnen upgraden met een eenmalige betaling van 10 dollar.' },
      ],
      securityTitle: 'Beveiliging en privacy',
    },
    ollama: {
      downloadOllama: 'Ollama downloaden',
      recommendedModelsButton: 'Aanbevolen modellen',
      offlineTitleFallback: 'Wat offline AI betekent',
      setupTitle: 'Installatiestappen',
      openDownloadPage: 'Ollama-downloadpagina openen',
      steps: [
        { title: 'Installeer Ollama', body: 'Download Ollama voor macOS van de officiële website, installeer het en open de app één keer zodat de lokale server start.' },
        { title: 'Download een vision-model', body: 'Zush werkt het best met een model dat beelden, screenshots, PDFs en previews begrijpt. Begin met:', command: `ollama pull ${modelNames.speed}` },
        { title: 'Controleer of Ollama draait', body: 'Ollama draait normaal op de achtergrond. Als Zush niet kan verbinden, start het vanuit Terminal:', command: 'ollama serve' },
        { title: 'Schakel offline AI in Zush in', body: 'Open Zush, ga naar AI Setup, zet Offline AI mode aan, vernieuw de modellenlijst, kies je model en voer Test uit.' },
      ],
      recommendedTitle: 'Aanbevolen modellen',
      recommendedLead: 'Kies op taak: qwen2.5vl:3b voor snelheid, gemma3:4b voor balans of granite3.2-vision:2b voor documenten.',
      models: [
        { name: modelNames.speed, label: 'Snelheid', command: `ollama pull ${modelNames.speed}`, description: 'De snelste eerste keuze voor dagelijkse screenshots en afbeeldingen.', hardware: 'Meeste Apple Silicon Macs', speed: 'Snelst' },
        { name: modelNames.balance, label: 'Balans', command: `ollama pull ${modelNames.balance}`, description: 'Een goede standaard wanneer snelheid en kwaliteit allebei tellen.', hardware: '8 GB+ aanbevolen', speed: 'Gebalanceerd' },
        { name: modelNames.documents, label: 'Documenten', command: `ollama pull ${modelNames.documents}`, description: 'Een compact vision-model voor documentpreviews, scans en gestructureerde inhoud.', hardware: 'Meeste Apple Silicon Macs', speed: 'Snel' },
      ],
      catalogPrefix: 'Of kies een ander vision-model uit de ',
      catalogLink: 'Ollama-modelcatalogus',
      catalogSuffix: '.',
      troubleshootingTitle: 'Problemen oplossen',
      troubleshooting: [
        { title: 'Zush ziet geen modellen', body: 'Voer ollama list uit in Terminal. Is de lijst leeg, download dan eerst een model en vernieuw Zush.' },
        { title: 'Verbindingstest mislukt', body: 'Controleer of Ollama draait en of de host in Zush http://127.0.0.1:11434 is.' },
        { title: 'Verwerking is te traag', body: 'Gebruik een kleiner model zoals qwen2.5vl:3b, sluit zware apps of gebruik Cloud voor grote batches.' },
      ],
      note: 'Offline AI staat los van Cloud en BYOK. Cloud gebruikt Zush-credits, BYOK gebruikt je provider-sleutel en offline AI gebruikt Ollama op je apparaat.',
    },
  },
  it: {
    backToHome: 'Torna alla home',
    byok: {
      option: 'Opzione',
      getKey: (dashboardName, isFree) => `Apri ${dashboardName} e crea ${isFree ? 'una chiave API gratuita' : 'una chiave API'}.`,
      copyInstruction: 'Crea una chiave nel pannello del provider e copia la chiave generata.',
      openDashboard: (dashboardName) => `Apri ${dashboardName}`,
      freeTierLabel: 'Piano gratuito:',
      pricingLabel: 'Prezzi:',
      notes: {
        gemini: 'Gemini offre 15 richieste al minuto gratis, ideale per la maggior parte degli utenti.',
        groq: 'Groq offre un piano gratuito generoso con inferenza molto veloce.',
        openai: 'OpenAI usa prezzi a consumo. Zush usa GPT-4o mini per analisi rapide ed economiche.',
        claude: 'Claude usa prezzi a consumo. Zush usa Claude Haiku per analisi rapide e convenienti.',
      },
      steps: {
        getKey: 'Ottieni la chiave API',
        copyKey: 'Copia la chiave API',
        configure: 'Configura in Zush',
        settingsPath: 'Apri Zush -> Settings -> Preferences -> BYOK',
        selectProvider: (providerName) => `Seleziona "${providerName}" come provider IA`,
        pasteKey: 'Incolla la chiave API',
        saveEnable: 'Clicca "Save" e abilita BYOK',
        viewPricing: 'Vedi prezzi ->',
      },
      faqTitle: 'Domande frequenti',
      faqs: [
        { question: 'La mia chiave API è sicura?', answer: 'Sì. La chiave resta salvata localmente nello storage sicuro della piattaforma ed è usata solo per richieste BYOK verso il provider scelto.' },
        { question: 'Quanto costa?', answer: 'Gemini e Groq hanno piani gratuiti. OpenAI e Claude sono a consumo. Un uso tipico costa spesso meno di 1 dollaro al mese.' },
        { question: 'Mantengo i 10.000 crediti?', answer: 'Sì. Quando BYOK è disattivato puoi continuare a usare i crediti rimanenti. BYOK è facoltativo.' },
        { question: 'Quale provider scegliere?', answer: 'Tutti funzionano bene. Gemini è forte nel multimodale, Groq è molto veloce, OpenAI è affidabile e Claude capisce i file con alta qualità.' },
        { question: 'Serve PRO?', answer: 'Sì, BYOK è una funzione PRO. Gli utenti gratuiti possono fare upgrade con pagamento unico da 10 dollari.' },
      ],
      securityTitle: 'Sicurezza e privacy',
    },
    ollama: {
      downloadOllama: 'Scarica Ollama',
      recommendedModelsButton: 'Modelli consigliati',
      offlineTitleFallback: 'Cosa significa IA offline',
      setupTitle: 'Passaggi di configurazione',
      openDownloadPage: 'Apri la pagina download di Ollama',
      steps: [
        { title: 'Installa Ollama', body: 'Scarica Ollama per macOS dal sito ufficiale, installalo e apri l’app una volta per avviare il server locale.' },
        { title: 'Scarica un modello vision', body: 'Zush funziona meglio con un modello capace di capire immagini, screenshot, PDF e anteprime. Inizia con:', command: `ollama pull ${modelNames.speed}` },
        { title: 'Controlla che Ollama sia attivo', body: 'Ollama di solito resta in background. Se Zush non si connette, avvialo dal Terminale:', command: 'ollama serve' },
        { title: 'Abilita IA offline in Zush', body: 'Apri Zush, vai in AI Setup, attiva Offline AI mode, aggiorna la lista modelli, scegli il modello e avvia Test.' },
      ],
      recommendedTitle: 'Modelli consigliati',
      recommendedLead: 'Scegli in base al lavoro: qwen2.5vl:3b per velocità, gemma3:4b per equilibrio o granite3.2-vision:2b per documenti.',
      models: [
        { name: modelNames.speed, label: 'Velocità', command: `ollama pull ${modelNames.speed}`, description: 'La prima scelta più rapida per screenshot e immagini quotidiane.', hardware: 'La maggior parte dei Mac Apple Silicon', speed: 'Più veloce' },
        { name: modelNames.balance, label: 'Equilibrio', command: `ollama pull ${modelNames.balance}`, description: 'Un buon default quando contano sia velocità sia qualità.', hardware: '8 GB+ consigliati', speed: 'Bilanciato' },
        { name: modelNames.documents, label: 'Documenti', command: `ollama pull ${modelNames.documents}`, description: 'Modello vision compatto per anteprime di documenti, scansioni e contenuti strutturati.', hardware: 'La maggior parte dei Mac Apple Silicon', speed: 'Veloce' },
      ],
      catalogPrefix: 'Oppure scegli un altro modello vision dal ',
      catalogLink: 'catalogo modelli Ollama',
      catalogSuffix: '.',
      troubleshootingTitle: 'Risoluzione problemi',
      troubleshooting: [
        { title: 'Zush non vede modelli', body: 'Esegui ollama list nel Terminale. Se la lista è vuota, scarica prima un modello e poi aggiorna Zush.' },
        { title: 'Il test di connessione fallisce', body: 'Verifica che Ollama sia attivo e che l’host in Zush sia http://127.0.0.1:11434.' },
        { title: 'L’elaborazione è lenta', body: 'Usa un modello più piccolo come qwen2.5vl:3b, chiudi app pesanti o torna al Cloud per batch grandi.' },
      ],
      note: 'IA offline è separata da Cloud e BYOK. Cloud usa crediti Zush, BYOK usa la chiave del provider e IA offline usa Ollama sul dispositivo.',
    },
  },
  ja: {
    backToHome: 'ホームに戻る',
    byok: {
      option: 'オプション',
      getKey: (dashboardName, isFree) => `${dashboardName} を開き、${isFree ? '無料の API キー' : 'API キー'}を作成します。`,
      copyInstruction: 'プロバイダーのダッシュボードでキーを作成し、生成されたキーをコピーします。',
      openDashboard: (dashboardName) => `${dashboardName} を開く`,
      freeTierLabel: '無料枠:',
      pricingLabel: '料金:',
      notes: {
        gemini: 'Gemini は無料で毎分 15 リクエストを利用でき、多くのユーザーに十分です。',
        groq: 'Groq は高速な推論と余裕のある無料枠を提供します。',
        openai: 'OpenAI は従量課金です。Zush は高速で手頃な GPT-4o mini を使用します。',
        claude: 'Claude は従量課金です。Zush は高速で費用効率のよい Claude Haiku を使用します。',
      },
      steps: {
        getKey: 'API キーを取得',
        copyKey: 'API キーをコピー',
        configure: 'Zush で設定',
        settingsPath: 'Zush -> Settings -> Preferences -> BYOK を開きます',
        selectProvider: (providerName) => `AI Provider として "${providerName}" を選択`,
        pasteKey: 'API キーを貼り付ける',
        saveEnable: '"Save" をクリックして BYOK を有効化',
        viewPricing: '料金を見る ->',
      },
      faqTitle: 'よくある質問',
      faqs: [
        { question: 'API キーは安全ですか？', answer: 'はい。キーは安全なプラットフォームストレージにローカル保存され、選択したプロバイダーへの BYOK リクエストにのみ使われます。' },
        { question: '費用はいくらですか？', answer: 'Gemini と Groq には無料枠があります。OpenAI と Claude は従量課金です。通常利用では月 1 ドル未満に収まることが多いです。' },
        { question: '10,000 クレジットは残りますか？', answer: 'はい。BYOK をオフにすれば残りのクレジットを使えます。BYOK は任意です。' },
        { question: 'どのプロバイダーを選ぶべきですか？', answer: '4 つとも利用できます。Gemini はマルチモーダル、Groq は速度、OpenAI は信頼性、Claude は高品質なファイル理解に強みがあります。' },
        { question: 'PRO が必要ですか？', answer: 'はい。BYOK は PRO 限定機能です。無料ユーザーは 10 ドルの一回払いでアップグレードできます。' },
      ],
      securityTitle: 'セキュリティとプライバシー',
    },
    ollama: {
      downloadOllama: 'Ollama をダウンロード',
      recommendedModelsButton: '推奨モデル',
      offlineTitleFallback: 'オフライン AI とは',
      setupTitle: '設定手順',
      openDownloadPage: 'Ollama のダウンロードページを開く',
      steps: [
        { title: 'Ollama をインストール', body: '公式サイトから macOS 版 Ollama をダウンロードしてインストールし、一度開いてローカルサーバーを起動します。' },
        { title: 'Vision モデルをダウンロード', body: '画像、スクリーンショット、PDF、プレビューを扱うため、Vision 対応モデルが最適です。まずは次を使います:', command: `ollama pull ${modelNames.speed}` },
        { title: 'Ollama が動作しているか確認', body: 'Ollama は通常バックグラウンドで動作します。Zush が接続できない場合は Terminal で起動します:', command: 'ollama serve' },
        { title: 'Zush でオフライン AI を有効化', body: 'Zush を開き、AI Setup で Offline AI mode を有効にし、モデル一覧を更新してモデルを選び、Test を実行します。' },
      ],
      recommendedTitle: '推奨モデル',
      recommendedLead: '用途に応じて選びます: 速度重視なら qwen2.5vl:3b、バランスなら gemma3:4b、文書なら granite3.2-vision:2b。',
      models: [
        { name: modelNames.speed, label: '速度重視', command: `ollama pull ${modelNames.speed}`, description: '日常的なスクリーンショットや画像に最も速い最初の選択肢です。', hardware: '多くの Apple Silicon Mac', speed: '最速' },
        { name: modelNames.balance, label: 'バランス', command: `ollama pull ${modelNames.balance}`, description: '速度と品質の両方を重視する場合の標準候補です。', hardware: '8 GB 以上推奨', speed: 'バランス' },
        { name: modelNames.documents, label: '文書向け', command: `ollama pull ${modelNames.documents}`, description: '文書プレビュー、スキャン、構造化された視覚情報に向く小型 Vision モデルです。', hardware: '多くの Apple Silicon Mac', speed: '高速' },
      ],
      catalogPrefix: 'または ',
      catalogLink: 'Ollama モデルカタログ',
      catalogSuffix: 'から別の Vision 対応モデルを選べます。',
      troubleshootingTitle: 'トラブルシューティング',
      troubleshooting: [
        { title: 'Zush にモデルが表示されない', body: 'Terminal で ollama list を実行します。空の場合は先にモデルをダウンロードし、Zush を更新します。' },
        { title: '接続テストに失敗する', body: 'Ollama が動作しており、Zush のホストが http://127.0.0.1:11434 に設定されているか確認します。' },
        { title: '処理が遅い', body: 'qwen2.5vl:3b のような小さいモデルを使う、重いアプリを閉じる、大きなバッチでは Cloud に戻すなどを試します。' },
      ],
      note: 'オフライン AI は Cloud と BYOK とは別です。Cloud は Zush クレジット、BYOK はプロバイダーキー、オフライン AI は端末上の Ollama を使います。',
    },
  },
  ko: {
    backToHome: '홈으로 돌아가기',
    byok: {
      option: '옵션',
      getKey: (dashboardName, isFree) => `${dashboardName}를 열고 ${isFree ? '무료 API 키' : 'API 키'}를 만드세요.`,
      copyInstruction: '제공자 대시보드에서 키를 생성한 뒤 생성된 키를 복사하세요.',
      openDashboard: (dashboardName) => `${dashboardName} 열기`,
      freeTierLabel: '무료 티어:',
      pricingLabel: '가격:',
      notes: {
        gemini: 'Gemini는 분당 15회 요청을 무료로 제공해 대부분의 사용자에게 충분합니다.',
        groq: 'Groq는 매우 빠른 추론과 넉넉한 무료 티어를 제공합니다.',
        openai: 'OpenAI는 사용량 기반 과금입니다. Zush는 빠르고 저렴한 GPT-4o mini를 사용합니다.',
        claude: 'Claude는 사용량 기반 과금입니다. Zush는 빠르고 효율적인 Claude Haiku를 사용합니다.',
      },
      steps: {
        getKey: 'API 키 받기',
        copyKey: 'API 키 복사',
        configure: 'Zush에서 설정',
        settingsPath: 'Zush -> Settings -> Preferences -> BYOK 열기',
        selectProvider: (providerName) => `AI Provider로 "${providerName}" 선택`,
        pasteKey: 'API 키 붙여넣기',
        saveEnable: '"Save"를 클릭하고 BYOK 활성화',
        viewPricing: '가격 보기 ->',
      },
      faqTitle: '자주 묻는 질문',
      faqs: [
        { question: 'API 키는 안전한가요?', answer: '네. 키는 안전한 플랫폼 저장소에 로컬로 저장되며 선택한 제공자에 대한 BYOK 요청에만 사용됩니다.' },
        { question: '비용은 얼마나 드나요?', answer: 'Gemini와 Groq는 무료 티어가 있습니다. OpenAI와 Claude는 사용량 기반입니다. 일반적인 사용량은 월 1달러 미만인 경우가 많습니다.' },
        { question: '10,000 크레딧은 유지되나요?', answer: '네. BYOK를 끄면 남은 크레딧을 계속 사용할 수 있습니다. BYOK는 선택 사항입니다.' },
        { question: '어떤 제공자를 선택해야 하나요?', answer: '네 가지 모두 잘 작동합니다. Gemini는 멀티모달, Groq는 속도, OpenAI는 안정성, Claude는 고품질 파일 이해가 강점입니다.' },
        { question: 'PRO가 필요한가요?', answer: '네. BYOK는 PRO 전용 기능입니다. 무료 사용자는 10달러 일회 결제로 업그레이드할 수 있습니다.' },
      ],
      securityTitle: '보안 및 개인정보',
    },
    ollama: {
      downloadOllama: 'Ollama 다운로드',
      recommendedModelsButton: '추천 모델',
      offlineTitleFallback: '오프라인 AI 의미',
      setupTitle: '설정 단계',
      openDownloadPage: 'Ollama 다운로드 페이지 열기',
      steps: [
        { title: 'Ollama 설치', body: '공식 웹사이트에서 macOS용 Ollama를 다운로드해 설치하고, 로컬 서버가 시작되도록 앱을 한 번 여세요.' },
        { title: '비전 모델 다운로드', body: 'Zush는 이미지, 스크린샷, PDF, 미리보기를 이해하는 비전 모델과 가장 잘 작동합니다. 먼저 다음을 사용하세요:', command: `ollama pull ${modelNames.speed}` },
        { title: 'Ollama 실행 확인', body: 'Ollama는 보통 백그라운드에서 실행됩니다. Zush가 연결하지 못하면 터미널에서 시작하세요:', command: 'ollama serve' },
        { title: 'Zush에서 오프라인 AI 활성화', body: 'Zush를 열고 AI Setup에서 Offline AI mode를 켠 뒤 모델 목록을 새로고침하고 모델을 선택한 후 Test를 실행하세요.' },
      ],
      recommendedTitle: '추천 모델',
      recommendedLead: '작업에 맞게 선택하세요: 속도는 qwen2.5vl:3b, 균형은 gemma3:4b, 문서는 granite3.2-vision:2b.',
      models: [
        { name: modelNames.speed, label: '속도', command: `ollama pull ${modelNames.speed}`, description: '일상적인 스크린샷과 이미지에 가장 빠른 첫 선택입니다.', hardware: '대부분의 Apple Silicon Mac', speed: '가장 빠름' },
        { name: modelNames.balance, label: '균형', command: `ollama pull ${modelNames.balance}`, description: '속도와 품질이 모두 중요할 때 좋은 기본값입니다.', hardware: '8GB+ 메모리 권장', speed: '균형' },
        { name: modelNames.documents, label: '문서', command: `ollama pull ${modelNames.documents}`, description: '문서 미리보기, 스캔, 구조화된 시각 콘텐츠에 유용한 소형 비전 모델입니다.', hardware: '대부분의 Apple Silicon Mac', speed: '빠름' },
      ],
      catalogPrefix: '또는 ',
      catalogLink: 'Ollama 모델 카탈로그',
      catalogSuffix: '에서 다른 비전 모델을 선택하세요.',
      troubleshootingTitle: '문제 해결',
      troubleshooting: [
        { title: 'Zush가 모델을 찾지 못함', body: '터미널에서 ollama list를 실행하세요. 목록이 비어 있으면 먼저 모델을 다운로드하고 Zush를 새로고침하세요.' },
        { title: '연결 테스트 실패', body: 'Ollama가 실행 중이고 Zush의 host가 http://127.0.0.1:11434 로 설정되어 있는지 확인하세요.' },
        { title: '처리가 너무 느림', body: 'qwen2.5vl:3b 같은 작은 모델을 사용하거나, 무거운 앱을 닫거나, 큰 배치는 Cloud로 전환하세요.' },
      ],
      note: '오프라인 AI는 Cloud 및 BYOK와 별개입니다. Cloud는 Zush 크레딧, BYOK는 제공자 키, 오프라인 AI는 기기의 Ollama를 사용합니다.',
    },
  },
  'zh-cn': {
    backToHome: '返回首页',
    byok: {
      option: '选项',
      getKey: (dashboardName, isFree) => `打开 ${dashboardName}，创建${isFree ? '免费 API 密钥' : 'API 密钥'}。`,
      copyInstruction: '在服务商控制台创建密钥，并复制生成的 API 密钥。',
      openDashboard: (dashboardName) => `打开 ${dashboardName}`,
      freeTierLabel: '免费额度：',
      pricingLabel: '价格：',
      notes: {
        gemini: 'Gemini 免费提供每分钟 15 次请求，适合大多数用户。',
        groq: 'Groq 提供慷慨的免费额度和高速推理。',
        openai: 'OpenAI 按量计费。Zush 使用 GPT-4o mini，兼顾速度和成本。',
        claude: 'Claude 按量计费。Zush 使用 Claude Haiku，适合快速且经济的文件分析。',
      },
      steps: {
        getKey: '获取 API 密钥',
        copyKey: '复制 API 密钥',
        configure: '在 Zush 中配置',
        settingsPath: '打开 Zush -> Settings -> Preferences -> BYOK',
        selectProvider: (providerName) => `选择 "${providerName}" 作为 AI Provider`,
        pasteKey: '粘贴 API 密钥',
        saveEnable: '点击 "Save" 并启用 BYOK',
        viewPricing: '查看价格 ->',
      },
      faqTitle: '常见问题',
      faqs: [
        { question: '我的 API 密钥安全吗？', answer: '安全。密钥会保存在本地安全存储中，只在向所选服务商发起 BYOK 请求时使用。' },
        { question: '费用是多少？', answer: 'Gemini 和 Groq 提供免费额度。OpenAI 和 Claude 按量计费。典型使用通常每月不到 1 美元。' },
        { question: '10,000 credits 还在吗？', answer: '还在。关闭 BYOK 后，你仍可继续使用剩余 credits。BYOK 是可选功能。' },
        { question: '应该选择哪个服务商？', answer: '四个都可用。Gemini 擅长多模态，Groq 速度快，OpenAI 稳定，Claude 对文件理解质量高。' },
        { question: '需要 PRO 吗？', answer: '需要。BYOK 是 PRO 专属功能。免费用户可通过一次性支付 10 美元升级。' },
      ],
      securityTitle: '安全与隐私',
    },
    ollama: {
      downloadOllama: '下载 Ollama',
      recommendedModelsButton: '推荐模型',
      offlineTitleFallback: '离线 AI 的含义',
      setupTitle: '设置步骤',
      openDownloadPage: '打开 Ollama 下载页面',
      steps: [
        { title: '安装 Ollama', body: '从官方网站下载 macOS 版 Ollama，完成安装后打开一次应用，让本地服务器启动。' },
        { title: '下载视觉模型', body: 'Zush 最适合搭配能理解图片、截图、PDF 和预览的视觉模型。建议先使用：', command: `ollama pull ${modelNames.speed}` },
        { title: '确认 Ollama 正在运行', body: 'Ollama 通常会在后台运行。如果 Zush 无法连接，可在终端启动：', command: 'ollama serve' },
        { title: '在 Zush 中启用离线 AI', body: '打开 Zush，进入 AI Setup，开启 Offline AI mode，刷新模型列表，选择模型并运行 Test。' },
      ],
      recommendedTitle: '推荐模型',
      recommendedLead: '按任务选择：qwen2.5vl:3b 适合速度，gemma3:4b 适合平衡，granite3.2-vision:2b 适合文档。',
      models: [
        { name: modelNames.speed, label: '速度', command: `ollama pull ${modelNames.speed}`, description: '处理日常截图和图片时最快的首选。', hardware: '大多数 Apple Silicon Mac', speed: '最快' },
        { name: modelNames.balance, label: '平衡', command: `ollama pull ${modelNames.balance}`, description: '当速度和质量都重要时，这是很好的默认选择。', hardware: '建议 8GB+ 内存', speed: '均衡' },
        { name: modelNames.documents, label: '文档', command: `ollama pull ${modelNames.documents}`, description: '适合文档预览、扫描件和结构化视觉内容的小型视觉模型。', hardware: '大多数 Apple Silicon Mac', speed: '快速' },
      ],
      catalogPrefix: '也可以从 ',
      catalogLink: 'Ollama 模型目录',
      catalogSuffix: '选择其他视觉模型。',
      troubleshootingTitle: '故障排查',
      troubleshooting: [
        { title: 'Zush 看不到模型', body: '在终端运行 ollama list。如果列表为空，请先下载模型，然后刷新 Zush。' },
        { title: '连接测试失败', body: '确认 Ollama 正在运行，并且 Zush 中的 host 设置为 http://127.0.0.1:11434。' },
        { title: '处理太慢', body: '使用 qwen2.5vl:3b 这类更小的模型，关闭占内存的应用，或在大批量处理时切回 Cloud。' },
      ],
      note: '离线 AI 与 Cloud 和 BYOK 分开。Cloud 使用 Zush credits，BYOK 使用你的服务商密钥，离线 AI 使用设备上的 Ollama。',
    },
  },
};

export function getBYOKSetupCopy(locale: SetupLocale): BYOKSetupCopy {
  const staticCopy = getStaticPageCopy(locale, '/byok-setup');
  const localeText = t[locale] ?? t.de!;
  const text = localeText.byok;
  const overview = staticCopy.sections[0];
  const security = staticCopy.sections[2];

  return {
    title: staticCopy.title,
    subtitle: staticCopy.description,
    whatTitle: overview.title,
    whatBody: overview.body,
    benefits: (overview.bullets ?? []).map((benefit) => ['✓', benefit] as [string, string]),
    providers: makeProviderCopy(text),
    steps: text.steps,
    faqTitle: text.faqTitle,
    faqs: text.faqs,
    securityTitle: text.securityTitle,
    securityBody: security.body,
    backToHomeLabel: localeText.backToHome,
    homeHref: getLocalizedPath('/', locale),
  };
}

export function getOllamaSetupCopy(locale: SetupLocale): OllamaSetupCopy {
  const staticCopy = getStaticPageCopy(locale, '/ollama-setup');
  const localeText = t[locale] ?? t.de!;
  const text = localeText.ollama;
  const offline = staticCopy.sections[0];

  return {
    title: staticCopy.title,
    subtitle: staticCopy.description,
    downloadOllama: text.downloadOllama,
    recommendedModelsButton: text.recommendedModelsButton,
    offlineTitle: offline?.title ?? text.offlineTitleFallback,
    offlineBody: offline?.body ?? staticCopy.description,
    setupTitle: text.setupTitle,
    openDownloadPage: text.openDownloadPage,
    steps: text.steps,
    recommendedTitle: text.recommendedTitle,
    recommendedLead: text.recommendedLead,
    recommendedModels: text.models,
    catalogPrefix: text.catalogPrefix,
    catalogLink: text.catalogLink,
    catalogSuffix: text.catalogSuffix,
    troubleshootingTitle: text.troubleshootingTitle,
    troubleshooting: text.troubleshooting,
    note: text.note,
    backToHomeLabel: localeText.backToHome,
    homeHref: getLocalizedPath('/', locale),
  };
}
