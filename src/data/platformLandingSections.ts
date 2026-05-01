import type { FeatureCardsCopy, LocaleCopy, UseCasesCopy } from '@/i18n/copy';
import type { Locale } from '@/i18n/config';
import type { PlatformSpecificsKey } from '@/data/platformSpecifics';

interface PlatformLandingSections {
  featuresTitle: string;
  featuresDescription: string;
  featureCards: FeatureCardsCopy;
  useCasesTitle: string;
  useCasesDescription: string;
  useCases: UseCasesCopy;
}

type PlatformOverrides = Record<
  PlatformSpecificsKey,
  Pick<PlatformLandingSections, 'featuresTitle' | 'featuresDescription' | 'useCasesTitle' | 'useCasesDescription'> & {
    featureCards: Partial<FeatureCardsCopy>;
    useCases: UseCasesCopy;
  }
>;

const EN_PLATFORM_OVERRIDES: PlatformOverrides = {
  mac: {
    featuresTitle: 'How Zush works on macOS',
    featuresDescription:
      'Mac-first renaming workflows for Finder, Spotlight, Downloads, screenshots, and local AI.',
    featureCards: {
      aiAnalysis: {
        title: 'AI analysis for Mac files',
        description:
          'Analyze screenshots, PDFs, HEIC and RAW photos, Office docs, and exports without leaving a native macOS workflow.',
      },
      foldersMonitoring: {
        title: 'Watch Downloads and Screenshots',
        description:
          'Monitor ~/Downloads, Desktop, or a screenshot folder so new files get readable names as they arrive.',
      },
      batchRename: {
        title: 'Batch rename from Finder',
        description:
          'Drag files or folders from Finder into Zush, review every suggested name, then apply the rename in place.',
      },
      customPatterns: {
        title: 'macOS naming patterns',
        description:
          'Use patterns with dates, categories, and original names so Finder folders stay consistent across projects.',
      },
      smartMetadata: {
        title: 'Finder tags and Spotlight search',
        description:
          'Generate readable names and metadata so files are easier to find later with Finder and Spotlight.',
      },
      renameHistory: {
        title: 'Undo without risk',
        description:
          'Every Mac rename is logged, so you can revert files back to their original names if a batch needs another pass.',
      },
      customPrompts: {
        title: 'Rules for Finder workflows',
        description:
          'Tell Zush how to name design exports, invoices, screenshots, and client folders before you apply changes.',
      },
      byok: {
        title: 'BYOK on Mac',
        description:
          'Connect Gemini, Groq, OpenAI, or Claude with your own key when you want unlimited cloud renames from macOS.',
      },
      offlineAi: {
        title: 'Offline AI with Ollama',
        description:
          'Run supported Mac file analysis with local models when privacy or offline work matters more than cloud speed.',
      },
      addFolder: 'Add Mac folder',
      analysisNewName: 'Client Contract Signed.pdf',
      batchNewNames: ['App Settings Screenshot.png', 'Q2 Budget Notes.docx', 'Investor Update Deck.pptx'],
      metadataFileName: 'Product Mockup Export.png',
      metadataTags: ['finder', 'mockup', 'client', 'design', 'macos'],
      historyNewNames: ['Scanner Receipt.pdf', 'Website Proposal.docx'],
      promptExample: 'Use short Finder-friendly names, keep client names first, and add matching tags.',
    },
    useCasesTitle: 'Mac workflows Zush cleans up',
    useCasesDescription:
      'The same app, tuned for the messy folders Mac users touch every day.',
    useCases: {
      items: [
        {
          title: 'Designers on Mac',
          description:
            'Rename screenshots, Figma exports, Sketch assets, and reference images so Finder folders stay scannable.',
        },
        {
          title: 'Photographers',
          description:
            'Give HEIC, RAW, and JPG imports useful names before they disappear into large photo libraries or iCloud folders.',
        },
        {
          title: 'Freelancers',
          description:
            'Clean up invoices, signed PDFs, proposals, and client downloads before archiving them by project.',
        },
        {
          title: 'Developers',
          description:
            'Turn PR screenshots, bug captures, and documentation images into filenames that explain what changed.',
        },
        {
          title: 'Creators',
          description:
            'Rename thumbnails, b-roll references, and image exports before they pile up in Desktop or Downloads.',
        },
        {
          title: 'Managers',
          description:
            'Make meeting notes, spreadsheets, decks, and stakeholder PDFs searchable from Finder and Spotlight.',
        },
      ],
    },
  },
  windows: {
    featuresTitle: 'How Zush works on Windows',
    featuresDescription:
      'Windows-first cleanup for File Explorer, Downloads, screenshots, Microsoft Store installs, and local AI.',
    featureCards: {
      aiAnalysis: {
        title: 'AI analysis for Windows files',
        description:
          'Analyze screenshots, PDFs, photos, Office docs, and exports from ordinary Windows folders.',
      },
      foldersMonitoring: {
        title: 'Watch Downloads and Screenshots',
        description:
          'Monitor Downloads, Pictures\\Screenshots, or work folders so new files get useful names automatically.',
      },
      batchRename: {
        title: 'Batch rename from File Explorer',
        description:
          'Drag mixed files from File Explorer into Zush, review the suggestions, then apply every rename in one pass.',
      },
      customPatterns: {
        title: 'Windows naming patterns',
        description:
          'Use date, category, and original-name variables to keep project folders and shared drives consistent.',
      },
      smartMetadata: {
        title: 'Searchable Windows folders',
        description:
          'Create descriptive filenames that are easier to find later through File Explorer and Windows Search.',
      },
      renameHistory: {
        title: 'Undo after a batch',
        description:
          'Every rename is tracked, so you can roll back a batch without scripts or manual filename recovery.',
      },
      customPrompts: {
        title: 'Rules for Windows folders',
        description:
          'Set naming rules for screenshots, invoices, client PDFs, reports, and shared team folders.',
      },
      byok: {
        title: 'BYOK on Windows',
        description:
          'Use your own Gemini, Groq, OpenAI, or Claude key for unlimited cloud renames from the Windows app.',
      },
      offlineAi: {
        title: 'Offline AI with Ollama',
        description:
          'Run supported file analysis locally when you want private renaming without sending content to cloud models.',
      },
      addFolder: 'Add Windows folder',
      analysisNewName: 'Vendor NDA Final.pdf',
      batchNewNames: ['Dashboard Error Screenshot.png', 'Quarterly Report Notes.docx', 'Sales Pipeline Deck.pptx'],
      metadataFileName: 'Campaign Asset Export.png',
      metadataTags: ['windows', 'campaign', 'report', 'client', 'shared'],
      historyNewNames: ['Medical Lab Results.pdf', 'Apartment Lease 2026.pdf'],
      promptExample: 'Use clear Windows-safe names, keep dates readable, and avoid characters that break sync.',
    },
    useCasesTitle: 'Windows folders Zush cleans up',
    useCasesDescription:
      'Practical cleanup for the file piles that build up in File Explorer.',
    useCases: {
      items: [
        {
          title: 'Design teams',
          description:
            'Rename screenshots, mockups, exported assets, and review images before they move to shared folders.',
        },
        {
          title: 'Photo libraries',
          description:
            'Turn camera imports and phone sync folders into searchable names instead of endless IMG and DSC files.',
        },
        {
          title: 'Operations',
          description:
            'Clean up invoices, contracts, statements, and vendor PDFs as they land in Downloads.',
        },
        {
          title: 'Developers',
          description:
            'Name bug screenshots, repro captures, and documentation images by what each file actually shows.',
        },
        {
          title: 'Creators',
          description:
            'Organize thumbnails, social exports, and reference images before project folders get hard to scan.',
        },
        {
          title: 'Managers',
          description:
            'Keep reports, spreadsheets, decks, and meeting files readable across local and synced Windows folders.',
        },
      ],
    },
  },
};

const PLATFORM_OVERRIDES: Partial<Record<Locale, PlatformOverrides>> = {
  en: EN_PLATFORM_OVERRIDES,
  de: {
    mac: {
      featuresTitle: 'So arbeitet Zush auf macOS',
      featuresDescription: 'Mac-orientierte Workflows für Finder, Spotlight, Downloads, Screenshots und lokale KI.',
      featureCards: {
        aiAnalysis: { title: 'KI-Analyse für Mac-Dateien', description: 'Analysiere Screenshots, PDFs, HEIC- und RAW-Fotos, Office-Dokumente und Exporte direkt im nativen macOS-Workflow.' },
        foldersMonitoring: { title: 'Downloads und Screenshots überwachen', description: 'Überwache ~/Downloads, Desktop oder einen Screenshot-Ordner, damit neue Dateien sofort lesbare Namen erhalten.' },
        batchRename: { title: 'Batch-Umbenennung aus dem Finder', description: 'Ziehe Dateien oder Ordner aus dem Finder in Zush, prüfe die Vorschläge und wende sie direkt an.' },
        customPatterns: { title: 'macOS-Namensmuster', description: 'Nutze Muster mit Datum, Kategorie und Originalnamen, damit Finder-Ordner über Projekte hinweg konsistent bleiben.' },
        smartMetadata: { title: 'Finder-Tags und Spotlight-Suche', description: 'Erzeuge lesbare Namen und Metadaten, damit Dateien später in Finder und Spotlight leichter auffindbar sind.' },
        renameHistory: { title: 'Ohne Risiko rückgängig machen', description: 'Jede Mac-Umbenennung wird protokolliert, damit du Dateien bei Bedarf auf ihre Originalnamen zurücksetzen kannst.' },
        customPrompts: { title: 'Regeln für Finder-Workflows', description: 'Lege fest, wie Zush Design-Exporte, Rechnungen, Screenshots und Kundenordner benennen soll.' },
        byok: { title: 'BYOK auf dem Mac', description: 'Verbinde Gemini, Groq, OpenAI oder Claude mit deinem eigenen Schlüssel für unbegrenzte Cloud-Umbenennungen auf macOS.' },
        offlineAi: { title: 'Offline-KI mit Ollama', description: 'Nutze lokale Modelle für unterstützte Mac-Dateien, wenn Datenschutz oder Offline-Arbeit wichtiger als Cloud-Speed sind.' },
      },
      useCasesTitle: 'Mac-Workflows, die Zush aufräumt',
      useCasesDescription: 'Dieselbe App, zugeschnitten auf die unordentlichen Ordner, die Mac-Nutzer täglich öffnen.',
      useCases: {
        items: [
          { title: 'Designer auf dem Mac', description: 'Benenne Screenshots, Figma-Exporte, Sketch-Assets und Referenzbilder um, damit Finder-Ordner scannbar bleiben.' },
          { title: 'Fotografen', description: 'Gib HEIC-, RAW- und JPG-Importen nützliche Namen, bevor sie in großen Fotobibliotheken oder iCloud-Ordnern verschwinden.' },
          { title: 'Freelancer', description: 'Räume Rechnungen, signierte PDFs, Angebote und Kundendownloads auf, bevor du sie projektweise archivierst.' },
          { title: 'Entwickler', description: 'Mache aus PR-Screenshots, Bug-Captures und Doku-Bildern Dateinamen, die erklären, was zu sehen ist.' },
          { title: 'Creator', description: 'Benenne Thumbnails, B-Roll-Referenzen und Bildexporte um, bevor Desktop oder Downloads vollaufen.' },
          { title: 'Manager', description: 'Mache Notizen, Tabellen, Decks und Stakeholder-PDFs über Finder und Spotlight auffindbar.' },
        ],
      },
    },
    windows: {
      featuresTitle: 'So arbeitet Zush auf Windows',
      featuresDescription: 'Windows-orientierte Ordnung für Datei-Explorer, Downloads, Screenshots, Microsoft Store und lokale KI.',
      featureCards: {
        aiAnalysis: { title: 'KI-Analyse für Windows-Dateien', description: 'Analysiere Screenshots, PDFs, Fotos, Office-Dokumente und Exporte aus normalen Windows-Ordnern.' },
        foldersMonitoring: { title: 'Downloads und Screenshots überwachen', description: 'Überwache Downloads, Pictures\\Screenshots oder Arbeitsordner, damit neue Dateien automatisch nützliche Namen erhalten.' },
        batchRename: { title: 'Batch-Umbenennung aus dem Explorer', description: 'Ziehe gemischte Dateien aus dem Datei-Explorer in Zush, prüfe die Vorschläge und wende alle Namen in einem Durchgang an.' },
        customPatterns: { title: 'Windows-Namensmuster', description: 'Nutze Datum, Kategorie und Originalnamen, damit Projektordner und geteilte Laufwerke konsistent bleiben.' },
        smartMetadata: { title: 'Durchsuchbare Windows-Ordner', description: 'Erzeuge beschreibende Dateinamen, die später über Datei-Explorer und Windows-Suche leichter auffindbar sind.' },
        renameHistory: { title: 'Batch rückgängig machen', description: 'Jede Umbenennung wird verfolgt, damit du ohne Skripte oder manuelle Wiederherstellung zurückrollen kannst.' },
        customPrompts: { title: 'Regeln für Windows-Ordner', description: 'Setze Namensregeln für Screenshots, Rechnungen, Kunden-PDFs, Reports und geteilte Teamordner.' },
        byok: { title: 'BYOK auf Windows', description: 'Nutze deinen eigenen Gemini-, Groq-, OpenAI- oder Claude-Schlüssel für unbegrenzte Cloud-Umbenennungen in der Windows-App.' },
        offlineAi: { title: 'Offline-KI mit Ollama', description: 'Analysiere unterstützte Dateien lokal, wenn private Umbenennung ohne Cloud-Modelle wichtig ist.' },
      },
      useCasesTitle: 'Windows-Ordner, die Zush aufräumt',
      useCasesDescription: 'Praktische Ordnung für Dateistapel, die sich im Datei-Explorer ansammeln.',
      useCases: {
        items: [
          { title: 'Designteams', description: 'Benenne Screenshots, Mockups, exportierte Assets und Review-Bilder um, bevor sie in geteilte Ordner wandern.' },
          { title: 'Fotobibliotheken', description: 'Verwandle Kameraimporte und Smartphone-Sync-Ordner in suchbare Namen statt endloser IMG- und DSC-Dateien.' },
          { title: 'Operations', description: 'Räume Rechnungen, Verträge, Kontoauszüge und Lieferanten-PDFs auf, sobald sie in Downloads landen.' },
          { title: 'Entwickler', description: 'Benenne Bug-Screenshots, Repro-Captures und Doku-Bilder danach, was jede Datei tatsächlich zeigt.' },
          { title: 'Creator', description: 'Organisiere Thumbnails, Social-Exporte und Referenzbilder, bevor Projektordner schwer scannbar werden.' },
          { title: 'Manager', description: 'Halte Reports, Tabellen, Decks und Meeting-Dateien in lokalen und synchronisierten Windows-Ordnern lesbar.' },
        ],
      },
    },
  },
  fr: {
    mac: {
      featuresTitle: 'Comment Zush fonctionne sur macOS',
      featuresDescription: 'Des workflows Mac pour Finder, Spotlight, Téléchargements, captures d’écran et IA locale.',
      featureCards: {
        aiAnalysis: { title: 'Analyse IA des fichiers Mac', description: 'Analysez captures, PDF, photos HEIC et RAW, documents Office et exports sans quitter un workflow macOS natif.' },
        foldersMonitoring: { title: 'Surveiller Téléchargements et captures', description: 'Surveillez ~/Downloads, le Bureau ou un dossier de captures pour donner des noms lisibles aux nouveaux fichiers.' },
        batchRename: { title: 'Renommage en lot depuis Finder', description: 'Glissez des fichiers ou dossiers depuis Finder vers Zush, vérifiez les propositions, puis appliquez le renommage.' },
        customPatterns: { title: 'Modèles de noms macOS', description: 'Utilisez dates, catégories et noms d’origine pour garder des dossiers Finder cohérents.' },
        smartMetadata: { title: 'Tags Finder et recherche Spotlight', description: 'Créez des noms et métadonnées lisibles pour retrouver les fichiers plus vite dans Finder et Spotlight.' },
        renameHistory: { title: 'Annuler sans risque', description: 'Chaque renommage Mac est journalisé pour revenir aux noms d’origine si un lot doit être repris.' },
        customPrompts: { title: 'Règles pour workflows Finder', description: 'Indiquez à Zush comment nommer exports design, factures, captures et dossiers clients.' },
        byok: { title: 'BYOK sur Mac', description: 'Connectez Gemini, Groq, OpenAI ou Claude avec votre propre clé pour des renommages cloud illimités sur macOS.' },
        offlineAi: { title: 'IA hors ligne avec Ollama', description: 'Analysez les fichiers Mac pris en charge avec des modèles locaux lorsque la confidentialité prime.' },
      },
      useCasesTitle: 'Workflows Mac que Zush nettoie',
      useCasesDescription: 'La même app, adaptée aux dossiers que les utilisateurs Mac ouvrent chaque jour.',
      useCases: {
        items: [
          { title: 'Designers sur Mac', description: 'Renommez captures, exports Figma, assets Sketch et images de référence pour garder Finder lisible.' },
          { title: 'Photographes', description: 'Donnez des noms utiles aux imports HEIC, RAW et JPG avant qu’ils ne disparaissent dans de grandes photothèques.' },
          { title: 'Freelances', description: 'Nettoyez factures, PDF signés, propositions et téléchargements clients avant l’archivage projet.' },
          { title: 'Développeurs', description: 'Transformez captures de PR, bugs et docs en noms qui expliquent vraiment le contenu.' },
          { title: 'Créateurs', description: 'Renommez miniatures, références b-roll et exports image avant l’encombrement du Bureau ou des Téléchargements.' },
          { title: 'Managers', description: 'Rendez notes, feuilles, decks et PDF d’équipe trouvables dans Finder et Spotlight.' },
        ],
      },
    },
    windows: {
      featuresTitle: 'Comment Zush fonctionne sur Windows',
      featuresDescription: 'Nettoyage pensé pour l’Explorateur, les téléchargements, les captures, le Microsoft Store et l’IA locale.',
      featureCards: {
        aiAnalysis: { title: 'Analyse IA des fichiers Windows', description: 'Analysez captures, PDF, photos, documents Office et exports depuis des dossiers Windows ordinaires.' },
        foldersMonitoring: { title: 'Surveiller téléchargements et captures', description: 'Surveillez Downloads, Pictures\\Screenshots ou vos dossiers de travail pour nommer automatiquement les nouveaux fichiers.' },
        batchRename: { title: 'Renommage en lot depuis l’Explorateur', description: 'Glissez des fichiers depuis l’Explorateur vers Zush, vérifiez les suggestions, puis appliquez tout en une passe.' },
        customPatterns: { title: 'Modèles de noms Windows', description: 'Utilisez date, catégorie et nom d’origine pour garder projets et dossiers partagés cohérents.' },
        smartMetadata: { title: 'Dossiers Windows consultables', description: 'Créez des noms descriptifs faciles à retrouver dans l’Explorateur et Windows Search.' },
        renameHistory: { title: 'Annuler après un lot', description: 'Chaque renommage est suivi pour revenir en arrière sans scripts ni récupération manuelle.' },
        customPrompts: { title: 'Règles pour dossiers Windows', description: 'Définissez des règles pour captures, factures, PDF clients, rapports et dossiers partagés.' },
        byok: { title: 'BYOK sur Windows', description: 'Utilisez votre clé Gemini, Groq, OpenAI ou Claude pour des renommages cloud illimités dans l’app Windows.' },
        offlineAi: { title: 'IA hors ligne avec Ollama', description: 'Analysez localement les fichiers pris en charge quand vous voulez renommer sans modèle cloud.' },
      },
      useCasesTitle: 'Dossiers Windows que Zush nettoie',
      useCasesDescription: 'Nettoyage pratique pour les piles de fichiers qui s’accumulent dans l’Explorateur.',
      useCases: {
        items: [
          { title: 'Équipes design', description: 'Renommez captures, mockups, assets exportés et images de revue avant les dossiers partagés.' },
          { title: 'Photothèques', description: 'Transformez imports d’appareil photo et dossiers synchronisés en noms recherchables plutôt qu’en IMG sans fin.' },
          { title: 'Opérations', description: 'Nettoyez factures, contrats, relevés et PDF fournisseurs dès leur arrivée dans Téléchargements.' },
          { title: 'Développeurs', description: 'Nommez captures de bug, repros et images de documentation selon ce que chaque fichier montre.' },
          { title: 'Créateurs', description: 'Organisez miniatures, exports sociaux et références avant que les dossiers projet deviennent illisibles.' },
          { title: 'Managers', description: 'Gardez rapports, feuilles, decks et fichiers de réunion lisibles dans les dossiers Windows locaux et synchronisés.' },
        ],
      },
    },
  },
  'pt-br': {
    mac: {
      featuresTitle: 'Como o Zush funciona no macOS',
      featuresDescription: 'Fluxos para Mac com Finder, Spotlight, Downloads, screenshots e IA local.',
      featureCards: {
        aiAnalysis: { title: 'Análise de IA para arquivos do Mac', description: 'Analise screenshots, PDFs, fotos HEIC e RAW, documentos Office e exports sem sair do fluxo nativo do macOS.' },
        foldersMonitoring: { title: 'Monitore Downloads e screenshots', description: 'Monitore ~/Downloads, Mesa ou a pasta de screenshots para nomear novos arquivos assim que chegam.' },
        batchRename: { title: 'Renomeação em lote pelo Finder', description: 'Arraste arquivos ou pastas do Finder para o Zush, revise os nomes sugeridos e aplique no local.' },
        customPatterns: { title: 'Padrões de nome no macOS', description: 'Use datas, categorias e nomes originais para manter pastas do Finder consistentes entre projetos.' },
        smartMetadata: { title: 'Tags do Finder e busca Spotlight', description: 'Crie nomes e metadados legíveis para encontrar arquivos depois no Finder e no Spotlight.' },
        renameHistory: { title: 'Desfaça sem risco', description: 'Cada renomeação no Mac fica registrada para você restaurar nomes originais se precisar revisar um lote.' },
        customPrompts: { title: 'Regras para fluxos do Finder', description: 'Diga ao Zush como nomear exports de design, notas, screenshots e pastas de clientes.' },
        byok: { title: 'BYOK no Mac', description: 'Conecte Gemini, Groq, OpenAI ou Claude com sua própria chave para renomeações cloud ilimitadas no macOS.' },
        offlineAi: { title: 'IA offline com Ollama', description: 'Use modelos locais em arquivos Mac compatíveis quando privacidade ou trabalho offline forem prioridade.' },
      },
      useCasesTitle: 'Fluxos do Mac que o Zush organiza',
      useCasesDescription: 'O mesmo app, ajustado para as pastas bagunçadas que usuários de Mac abrem todo dia.',
      useCases: {
        items: [
          { title: 'Designers no Mac', description: 'Renomeie screenshots, exports do Figma, assets do Sketch e referências para manter o Finder fácil de escanear.' },
          { title: 'Fotógrafos', description: 'Dê nomes úteis a HEIC, RAW e JPG antes que sumam em grandes bibliotecas ou pastas do iCloud.' },
          { title: 'Freelancers', description: 'Organize notas, PDFs assinados, propostas e downloads de clientes antes de arquivar por projeto.' },
          { title: 'Desenvolvedores', description: 'Transforme screenshots de PR, bugs e docs em nomes que explicam o que mudou.' },
          { title: 'Criadores', description: 'Renomeie thumbnails, referências de b-roll e exports antes de acumularem na Mesa ou em Downloads.' },
          { title: 'Gestores', description: 'Torne notas, planilhas, decks e PDFs encontráveis pelo Finder e Spotlight.' },
        ],
      },
    },
    windows: {
      featuresTitle: 'Como o Zush funciona no Windows',
      featuresDescription: 'Organização para Explorador de Arquivos, Downloads, screenshots, Microsoft Store e IA local.',
      featureCards: {
        aiAnalysis: { title: 'Análise de IA para arquivos do Windows', description: 'Analise screenshots, PDFs, fotos, documentos Office e exports de pastas comuns do Windows.' },
        foldersMonitoring: { title: 'Monitore Downloads e screenshots', description: 'Monitore Downloads, Pictures\\Screenshots ou pastas de trabalho para nomear novos arquivos automaticamente.' },
        batchRename: { title: 'Renomeação em lote pelo Explorador', description: 'Arraste arquivos mistos do Explorador para o Zush, revise sugestões e aplique tudo em uma passada.' },
        customPatterns: { title: 'Padrões de nome no Windows', description: 'Use data, categoria e nome original para manter projetos e pastas compartilhadas consistentes.' },
        smartMetadata: { title: 'Pastas do Windows pesquisáveis', description: 'Crie nomes descritivos que ficam mais fáceis de encontrar no Explorador e na Busca do Windows.' },
        renameHistory: { title: 'Desfaça após um lote', description: 'Cada renomeação é registrada para você reverter sem scripts nem recuperação manual.' },
        customPrompts: { title: 'Regras para pastas Windows', description: 'Defina regras para screenshots, notas, PDFs de clientes, relatórios e pastas de equipe.' },
        byok: { title: 'BYOK no Windows', description: 'Use sua chave Gemini, Groq, OpenAI ou Claude para renomeações cloud ilimitadas no app Windows.' },
        offlineAi: { title: 'IA offline com Ollama', description: 'Analise arquivos compatíveis localmente quando quiser renomear com privacidade sem modelos cloud.' },
      },
      useCasesTitle: 'Pastas do Windows que o Zush organiza',
      useCasesDescription: 'Limpeza prática para pilhas de arquivos que crescem no Explorador de Arquivos.',
      useCases: {
        items: [
          { title: 'Times de design', description: 'Renomeie screenshots, mockups, assets exportados e imagens de revisão antes de irem para pastas compartilhadas.' },
          { title: 'Bibliotecas de fotos', description: 'Transforme imports de câmera e pastas sincronizadas em nomes pesquisáveis em vez de arquivos IMG e DSC sem fim.' },
          { title: 'Operações', description: 'Organize notas, contratos, extratos e PDFs de fornecedores assim que chegam em Downloads.' },
          { title: 'Desenvolvedores', description: 'Nomeie screenshots de bugs, repros e imagens de documentação pelo que cada arquivo mostra.' },
          { title: 'Criadores', description: 'Organize thumbnails, exports sociais e referências antes que pastas de projeto fiquem difíceis de escanear.' },
          { title: 'Gestores', description: 'Mantenha relatórios, planilhas, decks e arquivos de reunião legíveis em pastas locais e sincronizadas.' },
        ],
      },
    },
  },
  es: {
    mac: {
      featuresTitle: 'Cómo funciona Zush en macOS',
      featuresDescription: 'Flujos para Mac con Finder, Spotlight, Descargas, capturas e IA local.',
      featureCards: {
        aiAnalysis: { title: 'Análisis IA para archivos de Mac', description: 'Analiza capturas, PDFs, fotos HEIC y RAW, documentos Office y exports sin salir del flujo nativo de macOS.' },
        foldersMonitoring: { title: 'Vigila Descargas y capturas', description: 'Monitoriza ~/Downloads, Escritorio o una carpeta de capturas para dar nombres legibles a cada archivo nuevo.' },
        batchRename: { title: 'Renombrado por lotes desde Finder', description: 'Arrastra archivos o carpetas desde Finder a Zush, revisa cada sugerencia y aplica el cambio en su lugar.' },
        customPatterns: { title: 'Patrones de nombre en macOS', description: 'Usa fechas, categorías y nombres originales para mantener carpetas de Finder consistentes.' },
        smartMetadata: { title: 'Etiquetas Finder y búsqueda Spotlight', description: 'Genera nombres y metadatos legibles para encontrar archivos después en Finder y Spotlight.' },
        renameHistory: { title: 'Deshacer sin riesgo', description: 'Cada renombrado en Mac queda registrado para volver al nombre original si necesitas otra pasada.' },
        customPrompts: { title: 'Reglas para flujos de Finder', description: 'Dile a Zush cómo nombrar exports de diseño, facturas, capturas y carpetas de clientes.' },
        byok: { title: 'BYOK en Mac', description: 'Conecta Gemini, Groq, OpenAI o Claude con tu propia clave para renombrados cloud ilimitados en macOS.' },
        offlineAi: { title: 'IA offline con Ollama', description: 'Usa modelos locales con archivos Mac compatibles cuando importan más la privacidad o el trabajo sin conexión.' },
      },
      useCasesTitle: 'Flujos de Mac que Zush ordena',
      useCasesDescription: 'La misma app, adaptada a las carpetas que los usuarios de Mac abren cada día.',
      useCases: {
        items: [
          { title: 'Diseñadores en Mac', description: 'Renombra capturas, exports de Figma, assets de Sketch e imágenes de referencia para que Finder sea fácil de revisar.' },
          { title: 'Fotógrafos', description: 'Da nombres útiles a importaciones HEIC, RAW y JPG antes de que se pierdan en bibliotecas grandes o iCloud.' },
          { title: 'Freelancers', description: 'Ordena facturas, PDFs firmados, propuestas y descargas de clientes antes de archivar por proyecto.' },
          { title: 'Desarrolladores', description: 'Convierte capturas de PR, bugs y documentación en nombres que explican qué cambió.' },
          { title: 'Creadores', description: 'Renombra miniaturas, referencias b-roll y exports antes de que saturen Escritorio o Descargas.' },
          { title: 'Managers', description: 'Haz que notas, hojas, decks y PDFs sean encontrables desde Finder y Spotlight.' },
        ],
      },
    },
    windows: {
      featuresTitle: 'Cómo funciona Zush en Windows',
      featuresDescription: 'Orden para Explorador de archivos, Descargas, capturas, Microsoft Store e IA local.',
      featureCards: {
        aiAnalysis: { title: 'Análisis IA para archivos Windows', description: 'Analiza capturas, PDFs, fotos, documentos Office y exports desde carpetas normales de Windows.' },
        foldersMonitoring: { title: 'Vigila Descargas y capturas', description: 'Monitoriza Downloads, Pictures\\Screenshots o carpetas de trabajo para nombrar archivos nuevos automáticamente.' },
        batchRename: { title: 'Renombrado por lotes desde Explorador', description: 'Arrastra archivos mixtos desde el Explorador a Zush, revisa sugerencias y aplica todo de una vez.' },
        customPatterns: { title: 'Patrones de nombre en Windows', description: 'Usa fecha, categoría y nombre original para mantener consistentes proyectos y carpetas compartidas.' },
        smartMetadata: { title: 'Carpetas Windows buscables', description: 'Crea nombres descriptivos que son más fáciles de encontrar en el Explorador y Windows Search.' },
        renameHistory: { title: 'Deshacer después de un lote', description: 'Cada cambio se registra para revertir sin scripts ni recuperación manual de nombres.' },
        customPrompts: { title: 'Reglas para carpetas Windows', description: 'Define reglas para capturas, facturas, PDFs de clientes, informes y carpetas compartidas.' },
        byok: { title: 'BYOK en Windows', description: 'Usa tu clave de Gemini, Groq, OpenAI o Claude para renombrados cloud ilimitados desde la app Windows.' },
        offlineAi: { title: 'IA offline con Ollama', description: 'Analiza archivos compatibles localmente cuando quieres renombrar en privado sin modelos cloud.' },
      },
      useCasesTitle: 'Carpetas Windows que Zush ordena',
      useCasesDescription: 'Limpieza práctica para los montones de archivos que crecen en el Explorador.',
      useCases: {
        items: [
          { title: 'Equipos de diseño', description: 'Renombra capturas, mockups, assets exportados e imágenes de revisión antes de moverlos a carpetas compartidas.' },
          { title: 'Bibliotecas de fotos', description: 'Convierte imports de cámara y carpetas sincronizadas en nombres buscables, no en listas eternas de IMG y DSC.' },
          { title: 'Operaciones', description: 'Ordena facturas, contratos, extractos y PDFs de proveedores cuando llegan a Descargas.' },
          { title: 'Desarrolladores', description: 'Nombra capturas de bugs, repros e imágenes de docs según lo que muestra cada archivo.' },
          { title: 'Creadores', description: 'Organiza miniaturas, exports sociales y referencias antes de que los proyectos sean difíciles de revisar.' },
          { title: 'Managers', description: 'Mantén informes, hojas, decks y archivos de reunión legibles en carpetas locales y sincronizadas.' },
        ],
      },
    },
  },
  nl: {
    mac: {
      featuresTitle: 'Zo werkt Zush op macOS',
      featuresDescription: 'Mac-gerichte workflows voor Finder, Spotlight, Downloads, screenshots en lokale AI.',
      featureCards: {
        aiAnalysis: { title: 'AI-analyse voor Mac-bestanden', description: 'Analyseer screenshots, PDFs, HEIC- en RAW-foto’s, Office-documenten en exports binnen een native macOS-workflow.' },
        foldersMonitoring: { title: 'Bewaak Downloads en screenshots', description: 'Bewaak ~/Downloads, Desktop of een screenshotmap zodat nieuwe bestanden direct leesbare namen krijgen.' },
        batchRename: { title: 'Bulk hernoemen vanuit Finder', description: 'Sleep bestanden of mappen uit Finder naar Zush, controleer de voorgestelde namen en pas ze op hun plek toe.' },
        customPatterns: { title: 'macOS-naampatronen', description: 'Gebruik datums, categorieën en oorspronkelijke namen om Finder-mappen consistent te houden.' },
        smartMetadata: { title: 'Finder-tags en Spotlight-zoekopdrachten', description: 'Maak leesbare namen en metadata zodat bestanden later makkelijker vindbaar zijn in Finder en Spotlight.' },
        renameHistory: { title: 'Zonder risico herstellen', description: 'Elke Mac-hernoeming wordt vastgelegd, zodat je bestanden kunt terugzetten als een batch nog een ronde nodig heeft.' },
        customPrompts: { title: 'Regels voor Finder-workflows', description: 'Vertel Zush hoe het designexports, facturen, screenshots en klantmappen moet benoemen.' },
        byok: { title: 'BYOK op Mac', description: 'Verbind Gemini, Groq, OpenAI of Claude met je eigen sleutel voor onbeperkt cloudhernoemen op macOS.' },
        offlineAi: { title: 'Offline AI met Ollama', description: 'Gebruik lokale modellen voor ondersteunde Mac-bestanden wanneer privacy of offline werk belangrijker is.' },
      },
      useCasesTitle: 'Mac-workflows die Zush opruimt',
      useCasesDescription: 'Dezelfde app, afgestemd op de rommelige mappen die Mac-gebruikers dagelijks openen.',
      useCases: {
        items: [
          { title: 'Designers op Mac', description: 'Hernoem screenshots, Figma-exports, Sketch-assets en referentiebeelden zodat Finder-mappen scanbaar blijven.' },
          { title: 'Fotografen', description: 'Geef HEIC-, RAW- en JPG-imports nuttige namen voordat ze verdwijnen in grote fotobibliotheken of iCloud-mappen.' },
          { title: 'Freelancers', description: 'Ruim facturen, ondertekende PDFs, voorstellen en klantdownloads op voordat je ze per project archiveert.' },
          { title: 'Ontwikkelaars', description: 'Maak van PR-screenshots, bugcaptures en documentatiebeelden bestandsnamen die uitleggen wat er te zien is.' },
          { title: 'Makers', description: 'Hernoem thumbnails, b-roll-referenties en exports voordat Desktop of Downloads volloopt.' },
          { title: 'Managers', description: 'Maak notities, spreadsheets, decks en stakeholder-PDFs vindbaar via Finder en Spotlight.' },
        ],
      },
    },
    windows: {
      featuresTitle: 'Zo werkt Zush op Windows',
      featuresDescription: 'Windows-gerichte opruiming voor Verkenner, Downloads, screenshots, Microsoft Store en lokale AI.',
      featureCards: {
        aiAnalysis: { title: 'AI-analyse voor Windows-bestanden', description: 'Analyseer screenshots, PDFs, foto’s, Office-documenten en exports vanuit gewone Windows-mappen.' },
        foldersMonitoring: { title: 'Bewaak Downloads en screenshots', description: 'Bewaak Downloads, Pictures\\Screenshots of werkmappen zodat nieuwe bestanden automatisch bruikbare namen krijgen.' },
        batchRename: { title: 'Bulk hernoemen vanuit Verkenner', description: 'Sleep gemengde bestanden uit Verkenner naar Zush, controleer de suggesties en pas alles in één ronde toe.' },
        customPatterns: { title: 'Windows-naampatronen', description: 'Gebruik datum, categorie en oorspronkelijke naam om projectmappen en gedeelde drives consistent te houden.' },
        smartMetadata: { title: 'Doorzoekbare Windows-mappen', description: 'Maak beschrijvende bestandsnamen die later makkelijker te vinden zijn via Verkenner en Windows Search.' },
        renameHistory: { title: 'Een batch ongedaan maken', description: 'Elke hernoeming wordt bijgehouden, zodat je zonder scripts of handmatig herstel kunt terugrollen.' },
        customPrompts: { title: 'Regels voor Windows-mappen', description: 'Stel naamregels in voor screenshots, facturen, klant-PDFs, rapporten en gedeelde teammappen.' },
        byok: { title: 'BYOK op Windows', description: 'Gebruik je eigen Gemini-, Groq-, OpenAI- of Claude-sleutel voor onbeperkt cloudhernoemen vanuit de Windows-app.' },
        offlineAi: { title: 'Offline AI met Ollama', description: 'Analyseer ondersteunde bestanden lokaal wanneer je privé wilt hernoemen zonder cloudmodellen.' },
      },
      useCasesTitle: 'Windows-mappen die Zush opruimt',
      useCasesDescription: 'Praktische opruiming voor stapels bestanden die groeien in Verkenner.',
      useCases: {
        items: [
          { title: 'Designteams', description: 'Hernoem screenshots, mockups, geëxporteerde assets en reviewbeelden voordat ze naar gedeelde mappen gaan.' },
          { title: 'Fotobibliotheken', description: 'Maak van camera-imports en syncmappen doorzoekbare namen in plaats van eindeloze IMG- en DSC-bestanden.' },
          { title: 'Operations', description: 'Ruim facturen, contracten, afschriften en leveranciers-PDFs op zodra ze in Downloads landen.' },
          { title: 'Ontwikkelaars', description: 'Noem bugscreenshots, reprobeelden en documentatiebeelden naar wat elk bestand laat zien.' },
          { title: 'Makers', description: 'Organiseer thumbnails, social exports en referenties voordat projectmappen lastig te scannen worden.' },
          { title: 'Managers', description: 'Houd rapporten, spreadsheets, decks en vergaderbestanden leesbaar in lokale en gesynchroniseerde Windows-mappen.' },
        ],
      },
    },
  },
  it: {
    mac: {
      featuresTitle: 'Come funziona Zush su macOS',
      featuresDescription: 'Workflow per Mac con Finder, Spotlight, Download, screenshot e IA locale.',
      featureCards: {
        aiAnalysis: { title: 'Analisi IA per file Mac', description: 'Analizza screenshot, PDF, foto HEIC e RAW, documenti Office ed export senza uscire dal workflow nativo macOS.' },
        foldersMonitoring: { title: 'Monitora Download e screenshot', description: 'Monitora ~/Downloads, Scrivania o una cartella screenshot per dare nomi leggibili ai nuovi file.' },
        batchRename: { title: 'Rinomina in batch da Finder', description: 'Trascina file o cartelle da Finder in Zush, controlla i suggerimenti e applica la rinomina sul posto.' },
        customPatterns: { title: 'Pattern di nome per macOS', description: 'Usa date, categorie e nomi originali per mantenere coerenti le cartelle Finder.' },
        smartMetadata: { title: 'Tag Finder e ricerca Spotlight', description: 'Crea nomi e metadati leggibili per trovare i file più facilmente in Finder e Spotlight.' },
        renameHistory: { title: 'Annulla senza rischio', description: 'Ogni rinomina su Mac viene registrata, così puoi ripristinare i nomi originali se serve un altro passaggio.' },
        customPrompts: { title: 'Regole per workflow Finder', description: 'Dì a Zush come nominare export design, fatture, screenshot e cartelle cliente.' },
        byok: { title: 'BYOK su Mac', description: 'Collega Gemini, Groq, OpenAI o Claude con la tua chiave per rinomine cloud illimitate su macOS.' },
        offlineAi: { title: 'IA offline con Ollama', description: 'Usa modelli locali sui file Mac supportati quando privacy o lavoro offline contano di più.' },
      },
      useCasesTitle: 'Workflow Mac che Zush riordina',
      useCasesDescription: 'La stessa app, adattata alle cartelle disordinate che gli utenti Mac aprono ogni giorno.',
      useCases: {
        items: [
          { title: 'Designer su Mac', description: 'Rinomina screenshot, export Figma, asset Sketch e immagini reference per mantenere leggibili le cartelle Finder.' },
          { title: 'Fotografi', description: 'Dai nomi utili a import HEIC, RAW e JPG prima che spariscano in librerie foto o cartelle iCloud.' },
          { title: 'Freelance', description: 'Riordina fatture, PDF firmati, proposte e download cliente prima di archiviarli per progetto.' },
          { title: 'Sviluppatori', description: 'Trasforma screenshot di PR, bug e documentazione in nomi che spiegano cosa mostrano.' },
          { title: 'Creator', description: 'Rinomina thumbnail, riferimenti b-roll ed export immagine prima che Scrivania o Download si riempiano.' },
          { title: 'Manager', description: 'Rendi note, fogli, deck e PDF cercabili da Finder e Spotlight.' },
        ],
      },
    },
    windows: {
      featuresTitle: 'Come funziona Zush su Windows',
      featuresDescription: 'Pulizia pensata per Esplora file, Download, screenshot, Microsoft Store e IA locale.',
      featureCards: {
        aiAnalysis: { title: 'Analisi IA per file Windows', description: 'Analizza screenshot, PDF, foto, documenti Office ed export da normali cartelle Windows.' },
        foldersMonitoring: { title: 'Monitora Download e screenshot', description: 'Monitora Downloads, Pictures\\Screenshots o cartelle di lavoro per nominare automaticamente i nuovi file.' },
        batchRename: { title: 'Rinomina in batch da Esplora file', description: 'Trascina file misti da Esplora file in Zush, controlla i suggerimenti e applica tutto in un passaggio.' },
        customPatterns: { title: 'Pattern di nome per Windows', description: 'Usa data, categoria e nome originale per mantenere coerenti progetti e cartelle condivise.' },
        smartMetadata: { title: 'Cartelle Windows ricercabili', description: 'Crea nomi descrittivi più facili da trovare in Esplora file e Windows Search.' },
        renameHistory: { title: 'Annulla dopo un batch', description: 'Ogni rinomina è tracciata, così puoi tornare indietro senza script o recupero manuale.' },
        customPrompts: { title: 'Regole per cartelle Windows', description: 'Imposta regole per screenshot, fatture, PDF cliente, report e cartelle team condivise.' },
        byok: { title: 'BYOK su Windows', description: 'Usa la tua chiave Gemini, Groq, OpenAI o Claude per rinomine cloud illimitate dall’app Windows.' },
        offlineAi: { title: 'IA offline con Ollama', description: 'Analizza localmente i file supportati quando vuoi rinominare in privato senza modelli cloud.' },
      },
      useCasesTitle: 'Cartelle Windows che Zush riordina',
      useCasesDescription: 'Pulizia pratica per i cumuli di file che crescono in Esplora file.',
      useCases: {
        items: [
          { title: 'Team design', description: 'Rinomina screenshot, mockup, asset esportati e immagini di review prima delle cartelle condivise.' },
          { title: 'Librerie foto', description: 'Trasforma import da fotocamera e cartelle sync in nomi cercabili invece di infiniti file IMG e DSC.' },
          { title: 'Operations', description: 'Riordina fatture, contratti, estratti e PDF fornitori appena arrivano in Download.' },
          { title: 'Sviluppatori', description: 'Nomina screenshot di bug, repro e immagini docs in base a ciò che ogni file mostra.' },
          { title: 'Creator', description: 'Organizza thumbnail, export social e reference prima che le cartelle progetto diventino difficili da leggere.' },
          { title: 'Manager', description: 'Mantieni leggibili report, fogli, deck e file riunione in cartelle Windows locali e sincronizzate.' },
        ],
      },
    },
  },
  ja: {
    mac: {
      featuresTitle: 'Zush の macOS ワークフロー',
      featuresDescription: 'Finder、Spotlight、ダウンロード、スクリーンショット、ローカル AI に合わせた Mac 向けの整理。',
      featureCards: {
        aiAnalysis: { title: 'Mac ファイルの AI 解析', description: 'スクリーンショット、PDF、HEIC/RAW 写真、Office 文書、書き出しファイルを macOS の流れのまま解析します。' },
        foldersMonitoring: { title: 'ダウンロードとスクリーンショットを監視', description: '~/Downloads、デスクトップ、スクリーンショット保存先を監視し、新しいファイルに読みやすい名前を付けます。' },
        batchRename: { title: 'Finder から一括リネーム', description: 'Finder からファイルやフォルダを Zush にドラッグし、候補を確認してその場で適用できます。' },
        customPatterns: { title: 'macOS 向け命名パターン', description: '日付、カテゴリ、元の名前を使って、Finder のプロジェクトフォルダを揃えます。' },
        smartMetadata: { title: 'Finder タグと Spotlight 検索', description: '読みやすい名前とメタデータで、Finder と Spotlight から後で見つけやすくします。' },
        renameHistory: { title: '安全に取り消し', description: 'Mac でのリネーム履歴を残すため、必要なら元のファイル名に戻せます。' },
        customPrompts: { title: 'Finder ワークフローのルール', description: 'デザイン書き出し、請求書、スクリーンショット、顧客フォルダの命名ルールを指定できます。' },
        byok: { title: 'Mac で BYOK', description: 'Gemini、Groq、OpenAI、Claude の自分のキーを使い、macOS からクラウドリネームを拡張できます。' },
        offlineAi: { title: 'Ollama でオフライン AI', description: 'プライバシーやオフライン作業を優先したいとき、対応ファイルをローカルモデルで解析できます。' },
      },
      useCasesTitle: 'Zush が整理する Mac ワークフロー',
      useCasesDescription: 'Mac ユーザーが毎日触る散らかったフォルダに合わせた整理です。',
      useCases: {
        items: [
          { title: 'Mac のデザイナー', description: 'スクリーンショット、Figma 書き出し、Sketch アセット、参考画像を Finder で見やすい名前にします。' },
          { title: '写真家', description: 'HEIC、RAW、JPG の読み込みに有用な名前を付け、大きな写真ライブラリや iCloud で埋もれにくくします。' },
          { title: 'フリーランス', description: '請求書、署名済み PDF、提案書、顧客ダウンロードをプロジェクト別に保存する前に整理します。' },
          { title: '開発者', description: 'PR、バグ報告、ドキュメント用スクリーンショットを、内容が分かるファイル名にします。' },
          { title: 'クリエイター', description: 'サムネイル、b-roll 参照、画像書き出しがデスクトップやダウンロードに溜まる前に整理します。' },
          { title: 'マネージャー', description: 'メモ、表、資料、関係者向け PDF を Finder と Spotlight で探しやすくします。' },
        ],
      },
    },
    windows: {
      featuresTitle: 'Zush の Windows ワークフロー',
      featuresDescription: 'エクスプローラー、ダウンロード、スクリーンショット、Microsoft Store、ローカル AI に合わせた整理。',
      featureCards: {
        aiAnalysis: { title: 'Windows ファイルの AI 解析', description: '通常の Windows フォルダ内のスクリーンショット、PDF、写真、Office 文書、書き出しファイルを解析します。' },
        foldersMonitoring: { title: 'ダウンロードとスクリーンショットを監視', description: 'Downloads、Pictures\\Screenshots、作業フォルダを監視し、新しいファイルに自動で名前を付けます。' },
        batchRename: { title: 'エクスプローラーから一括リネーム', description: 'エクスプローラーから複数種類のファイルを Zush にドラッグし、候補を確認して一括適用できます。' },
        customPatterns: { title: 'Windows 向け命名パターン', description: '日付、カテゴリ、元の名前を使って、プロジェクトフォルダや共有ドライブを揃えます。' },
        smartMetadata: { title: '検索しやすい Windows フォルダ', description: 'エクスプローラーや Windows Search で後から見つけやすい説明的なファイル名を作ります。' },
        renameHistory: { title: '一括処理後に取り消し', description: 'すべてのリネームを記録するため、スクリプトなしでロールバックできます。' },
        customPrompts: { title: 'Windows フォルダのルール', description: 'スクリーンショット、請求書、顧客 PDF、レポート、共有チームフォルダの命名ルールを設定できます。' },
        byok: { title: 'Windows で BYOK', description: '自分の Gemini、Groq、OpenAI、Claude キーを使い、Windows アプリからクラウドリネームを拡張できます。' },
        offlineAi: { title: 'Ollama でオフライン AI', description: 'クラウドモデルを使わず、対応ファイルをローカルで解析したいときに使えます。' },
      },
      useCasesTitle: 'Zush が整理する Windows フォルダ',
      useCasesDescription: 'エクスプローラーに溜まりがちなファイルを実用的に整理します。',
      useCases: {
        items: [
          { title: 'デザインチーム', description: '共有フォルダへ移す前に、スクリーンショット、モックアップ、書き出しアセット、レビュー画像を整理します。' },
          { title: '写真ライブラリ', description: 'カメラ読み込みや同期フォルダを、IMG や DSC の羅列ではなく検索できる名前にします。' },
          { title: 'オペレーション', description: '請求書、契約書、明細、ベンダー PDF が Downloads に入った時点で整理します。' },
          { title: '開発者', description: 'バグのスクリーンショット、再現画像、ドキュメント画像を内容に合わせて命名します。' },
          { title: 'クリエイター', description: 'サムネイル、SNS 書き出し、参考画像をプロジェクトフォルダが見づらくなる前に整理します。' },
          { title: 'マネージャー', description: 'レポート、表、資料、会議ファイルをローカルと同期済み Windows フォルダで読みやすく保ちます。' },
        ],
      },
    },
  },
  ko: {
    mac: {
      featuresTitle: 'macOS에서 Zush가 작동하는 방식',
      featuresDescription: 'Finder, Spotlight, 다운로드, 스크린샷, 로컬 AI에 맞춘 Mac 워크플로입니다.',
      featureCards: {
        aiAnalysis: { title: 'Mac 파일 AI 분석', description: '스크린샷, PDF, HEIC/RAW 사진, Office 문서, 내보낸 파일을 macOS 흐름 안에서 분석합니다.' },
        foldersMonitoring: { title: '다운로드와 스크린샷 감시', description: '~/Downloads, 데스크탑, 스크린샷 폴더를 감시해 새 파일에 읽기 쉬운 이름을 붙입니다.' },
        batchRename: { title: 'Finder에서 일괄 이름 변경', description: 'Finder에서 파일이나 폴더를 Zush로 끌어와 제안 이름을 확인하고 바로 적용합니다.' },
        customPatterns: { title: 'macOS 이름 패턴', description: '날짜, 카테고리, 원래 이름을 사용해 Finder 프로젝트 폴더를 일관되게 유지합니다.' },
        smartMetadata: { title: 'Finder 태그와 Spotlight 검색', description: '읽기 쉬운 이름과 메타데이터로 Finder와 Spotlight에서 파일을 더 쉽게 찾습니다.' },
        renameHistory: { title: '위험 없이 되돌리기', description: 'Mac에서의 모든 이름 변경을 기록하므로 필요하면 원래 파일명으로 되돌릴 수 있습니다.' },
        customPrompts: { title: 'Finder 워크플로 규칙', description: '디자인 내보내기, 청구서, 스크린샷, 고객 폴더를 어떻게 이름 붙일지 지정합니다.' },
        byok: { title: 'Mac에서 BYOK', description: '자신의 Gemini, Groq, OpenAI, Claude 키로 macOS에서 클라우드 이름 변경을 확장합니다.' },
        offlineAi: { title: 'Ollama 오프라인 AI', description: '개인정보나 오프라인 작업이 중요할 때 지원되는 Mac 파일을 로컬 모델로 분석합니다.' },
      },
      useCasesTitle: 'Zush가 정리하는 Mac 워크플로',
      useCasesDescription: 'Mac 사용자가 매일 여는 지저분한 폴더에 맞춘 정리입니다.',
      useCases: {
        items: [
          { title: 'Mac 디자이너', description: '스크린샷, Figma 내보내기, Sketch 에셋, 참고 이미지를 Finder에서 훑기 쉬운 이름으로 바꿉니다.' },
          { title: '사진가', description: 'HEIC, RAW, JPG 가져오기에 유용한 이름을 붙여 큰 사진 라이브러리나 iCloud 폴더에서 묻히지 않게 합니다.' },
          { title: '프리랜서', description: '청구서, 서명된 PDF, 제안서, 고객 다운로드를 프로젝트별로 보관하기 전에 정리합니다.' },
          { title: '개발자', description: 'PR 스크린샷, 버그 캡처, 문서 이미지를 무엇이 바뀌었는지 설명하는 파일명으로 만듭니다.' },
          { title: '크리에이터', description: '썸네일, b-roll 참고, 이미지 내보내기가 데스크탑이나 다운로드에 쌓이기 전에 정리합니다.' },
          { title: '매니저', description: '메모, 스프레드시트, 덱, 이해관계자 PDF를 Finder와 Spotlight에서 찾기 쉽게 만듭니다.' },
        ],
      },
    },
    windows: {
      featuresTitle: 'Windows에서 Zush가 작동하는 방식',
      featuresDescription: '파일 탐색기, 다운로드, 스크린샷, Microsoft Store, 로컬 AI에 맞춘 정리입니다.',
      featureCards: {
        aiAnalysis: { title: 'Windows 파일 AI 분석', description: '일반 Windows 폴더의 스크린샷, PDF, 사진, Office 문서, 내보낸 파일을 분석합니다.' },
        foldersMonitoring: { title: '다운로드와 스크린샷 감시', description: 'Downloads, Pictures\\Screenshots 또는 작업 폴더를 감시해 새 파일에 자동으로 유용한 이름을 붙입니다.' },
        batchRename: { title: '파일 탐색기에서 일괄 이름 변경', description: '파일 탐색기에서 여러 파일을 Zush로 끌어와 제안을 확인하고 한 번에 적용합니다.' },
        customPatterns: { title: 'Windows 이름 패턴', description: '날짜, 카테고리, 원래 이름으로 프로젝트 폴더와 공유 드라이브를 일관되게 유지합니다.' },
        smartMetadata: { title: '검색 가능한 Windows 폴더', description: '파일 탐색기와 Windows Search에서 나중에 찾기 쉬운 설명형 파일명을 만듭니다.' },
        renameHistory: { title: '일괄 작업 후 되돌리기', description: '모든 이름 변경을 추적하므로 스크립트나 수동 복구 없이 되돌릴 수 있습니다.' },
        customPrompts: { title: 'Windows 폴더 규칙', description: '스크린샷, 청구서, 고객 PDF, 보고서, 공유 팀 폴더의 이름 규칙을 설정합니다.' },
        byok: { title: 'Windows에서 BYOK', description: '자신의 Gemini, Groq, OpenAI, Claude 키로 Windows 앱에서 클라우드 이름 변경을 확장합니다.' },
        offlineAi: { title: 'Ollama 오프라인 AI', description: '클라우드 모델 없이 비공개로 이름을 바꾸고 싶을 때 지원 파일을 로컬에서 분석합니다.' },
      },
      useCasesTitle: 'Zush가 정리하는 Windows 폴더',
      useCasesDescription: '파일 탐색기에 쌓이는 파일 더미를 실용적으로 정리합니다.',
      useCases: {
        items: [
          { title: '디자인 팀', description: '공유 폴더로 옮기기 전에 스크린샷, 목업, 내보낸 에셋, 리뷰 이미지를 정리합니다.' },
          { title: '사진 라이브러리', description: '카메라 가져오기와 동기화 폴더를 끝없는 IMG, DSC 파일 대신 검색 가능한 이름으로 바꿉니다.' },
          { title: '운영 팀', description: '청구서, 계약서, 명세서, 공급업체 PDF가 다운로드에 들어오면 바로 정리합니다.' },
          { title: '개발자', description: '버그 스크린샷, 재현 캡처, 문서 이미지를 각 파일이 보여주는 내용에 맞게 이름 붙입니다.' },
          { title: '크리에이터', description: '썸네일, 소셜 내보내기, 참고 이미지를 프로젝트 폴더가 복잡해지기 전에 정리합니다.' },
          { title: '매니저', description: '보고서, 스프레드시트, 덱, 회의 파일을 로컬 및 동기화된 Windows 폴더에서 읽기 쉽게 유지합니다.' },
        ],
      },
    },
  },
  'zh-cn': {
    mac: {
      featuresTitle: 'Zush 在 macOS 上如何工作',
      featuresDescription: '面向 Finder、Spotlight、下载、截图和本地 AI 的 Mac 文件整理流程。',
      featureCards: {
        aiAnalysis: { title: 'Mac 文件 AI 分析', description: '在原生 macOS 流程中分析截图、PDF、HEIC 和 RAW 照片、Office 文档与导出文件。' },
        foldersMonitoring: { title: '监控下载和截图', description: '监控 ~/Downloads、桌面或截图文件夹，让新文件进入后立即获得可读名称。' },
        batchRename: { title: '从 Finder 批量重命名', description: '从 Finder 拖入文件或文件夹，检查每个建议名称，然后原地应用。' },
        customPatterns: { title: 'macOS 命名模式', description: '使用日期、类别和原始名称，让 Finder 项目文件夹保持一致。' },
        smartMetadata: { title: 'Finder 标签和 Spotlight 搜索', description: '生成可读文件名和元数据，让文件之后更容易在 Finder 和 Spotlight 中找到。' },
        renameHistory: { title: '低风险撤销', description: '每次 Mac 重命名都会记录，必要时可以把文件恢复到原始名称。' },
        customPrompts: { title: 'Finder 工作流规则', description: '告诉 Zush 如何命名设计导出、发票、截图和客户文件夹。' },
        byok: { title: 'Mac 上的 BYOK', description: '连接自己的 Gemini、Groq、OpenAI 或 Claude 密钥，在 macOS 上扩展云端重命名。' },
        offlineAi: { title: '通过 Ollama 离线 AI', description: '当隐私或离线工作更重要时，用本地模型分析支持的 Mac 文件。' },
      },
      useCasesTitle: 'Zush 清理的 Mac 工作流',
      useCasesDescription: '同一个应用，针对 Mac 用户每天打开的混乱文件夹做了调整。',
      useCases: {
        items: [
          { title: 'Mac 设计师', description: '重命名截图、Figma 导出、Sketch 素材和参考图，让 Finder 文件夹更容易浏览。' },
          { title: '摄影师', description: '给 HEIC、RAW 和 JPG 导入文件添加有用名称，避免它们埋没在大型图库或 iCloud 文件夹中。' },
          { title: '自由职业者', description: '在按项目归档前整理发票、已签名 PDF、提案和客户下载文件。' },
          { title: '开发者', description: '把 PR 截图、bug 捕获和文档图片改成能说明内容的文件名。' },
          { title: '创作者', description: '在桌面或下载文件夹堆满前整理缩略图、b-roll 参考和图片导出。' },
          { title: '管理者', description: '让笔记、表格、演示文稿和相关方 PDF 可通过 Finder 与 Spotlight 搜索。' },
        ],
      },
    },
    windows: {
      featuresTitle: 'Zush 在 Windows 上如何工作',
      featuresDescription: '面向文件资源管理器、下载、截图、Microsoft Store 和本地 AI 的文件整理。',
      featureCards: {
        aiAnalysis: { title: 'Windows 文件 AI 分析', description: '分析普通 Windows 文件夹中的截图、PDF、照片、Office 文档和导出文件。' },
        foldersMonitoring: { title: '监控下载和截图', description: '监控 Downloads、Pictures\\Screenshots 或工作文件夹，让新文件自动获得有用名称。' },
        batchRename: { title: '从文件资源管理器批量重命名', description: '从文件资源管理器拖入混合文件，检查建议，然后一次应用所有重命名。' },
        customPatterns: { title: 'Windows 命名模式', description: '使用日期、类别和原始名称，让项目文件夹和共享盘保持一致。' },
        smartMetadata: { title: '可搜索的 Windows 文件夹', description: '创建描述性文件名，之后更容易通过文件资源管理器和 Windows Search 找到。' },
        renameHistory: { title: '批量后可撤销', description: '每次重命名都会被记录，因此无需脚本或手动恢复也能回滚。' },
        customPrompts: { title: 'Windows 文件夹规则', description: '为截图、发票、客户 PDF、报告和共享团队文件夹设置命名规则。' },
        byok: { title: 'Windows 上的 BYOK', description: '使用自己的 Gemini、Groq、OpenAI 或 Claude 密钥，在 Windows 应用中扩展云端重命名。' },
        offlineAi: { title: '通过 Ollama 离线 AI', description: '当你想不使用云端模型进行私密重命名时，本地分析支持的文件。' },
      },
      useCasesTitle: 'Zush 清理的 Windows 文件夹',
      useCasesDescription: '为文件资源管理器中不断堆积的文件提供实用整理。',
      useCases: {
        items: [
          { title: '设计团队', description: '在移动到共享文件夹前，整理截图、mockup、导出素材和评审图片。' },
          { title: '照片图库', description: '把相机导入和同步文件夹变成可搜索名称，而不是无尽的 IMG 和 DSC 文件。' },
          { title: '运营团队', description: '发票、合同、账单和供应商 PDF 一进入下载文件夹就可以整理。' },
          { title: '开发者', description: '根据每个文件实际显示的内容命名 bug 截图、复现捕获和文档图片。' },
          { title: '创作者', description: '在项目文件夹难以浏览前，整理缩略图、社媒导出和参考图片。' },
          { title: '管理者', description: '让报告、表格、演示文稿和会议文件在本地及同步的 Windows 文件夹中保持可读。' },
        ],
      },
    },
  },
};

export function getPlatformLandingSections(
  platform: PlatformSpecificsKey,
  locale: Locale,
  copy: LocaleCopy,
): PlatformLandingSections {
  const overrides = PLATFORM_OVERRIDES[locale]?.[platform];

  if (!overrides) {
    return {
      featuresTitle: copy.home.featuresTitle,
      featuresDescription: copy.home.featuresDescription,
      featureCards: copy.home.featureCards,
      useCasesTitle: copy.home.useCasesTitle,
      useCasesDescription: copy.home.useCasesDescription,
      useCases: copy.home.useCases,
    };
  }

  return {
    featuresTitle: overrides.featuresTitle,
    featuresDescription: overrides.featuresDescription,
    featureCards: {
      ...copy.home.featureCards,
      ...overrides.featureCards,
    },
    useCasesTitle: overrides.useCasesTitle,
    useCasesDescription: overrides.useCasesDescription,
    useCases: overrides.useCases,
  };
}
