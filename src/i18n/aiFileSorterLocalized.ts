import type { Slide } from '@/components/FileShowcase';
import type { Locale } from '@/i18n/config';
import type { FAQCopyItem } from '@/i18n/copy';

type NonDefaultLocale = Exclude<Locale, 'en'>;

export interface AiFileSorterLocaleCopy {
  seo: { title: string; description: string };
  h1: string;
  accent: string;
  definitionText: string;
  faqTitle: string;
  relatedToolsTitle: string;
  relatedGuidesTitle: string;
  faqItems: FAQCopyItem[];
  directAnswerSection: { heading: string; answer: string; steps: string[] };
  howTo: { name: string; description: string; steps: Array<[name: string, text: string]> };
  featureList: string[];
  /** Folder names, then the six file titles shown in the hero, in the order of `buildSlides`. */
  showcase: { folders: [string, string, string, string, string, string]; files: [string, string, string, string, string, string] };
  relatedPages: Array<{ title: string; href: string }>;
}

// Same files as the English hero: a mixed Downloads batch sorted into one level of
// folders inside the destination. Only the folder and title words are translated.
export function buildAiFileSorterSlides({ folders, files }: AiFileSorterLocaleCopy['showcase']): Slide[] {
  const [invoices, receipts, screenshots, contracts, videos, meetings] = folders;
  return [
    {
      files: [
        { before: 'download (7).pdf', after: `${invoices}/Cloudflare – 2026-06 – ${files[0]}.pdf`, type: 'pdf' },
        { before: 'IMG_2041.HEIC', after: `${receipts}/Whole Foods – ${files[1]}.heic`, type: 'image' },
        { before: 'Screenshot 2026-06-12.png', after: `${screenshots}/Stripe – ${files[2]}.png`, img: '/images/examples/workspace.jpg', type: 'image' },
        { before: 'Scan0001.pdf', after: `${contracts}/${files[3]} – 12 Main St.pdf`, type: 'pdf' },
        { before: 'IMG_5501.MOV', after: `${videos}/${files[4]}.mov`, type: 'video' },
        { before: 'New Recording 14.m4a', after: `${meetings}/${files[5]}.m4a`, type: 'audio' },
      ],
    },
  ];
}

export const AI_FILE_SORTER_LOCALIZED: Record<NonDefaultLocale, AiFileSorterLocaleCopy> = {
  de: {
    seo: {
      title: 'KI-Dateisortierer für Mac & Windows: Dateien in Ordner sortieren',
      description: 'Dateien mit KI auf Mac und Windows in Ordner sortieren. Beschreibe die Ordner in Alltagssprache oder nutze Auto. Zush liest, benennt und sortiert jede Datei.',
    },
    h1: 'KI-Dateisortierer: Dateien nach eigenen Regeln in Ordner sortieren',
    accent: 'nach eigenen Regeln',
    definitionText: 'Zush ist ein KI-Dateisortierer für Mac und Windows. Beschreibe die gewünschten Ordner in Alltagssprache, etwa „Rechnungen nach Unternehmen und Belege nach Monat gruppieren“, oder lass Auto nach Inhalt gruppieren. Zush liest jede Datei, benennt sie um und verschiebt sie nach deiner Prüfung in den passenden Ordner.',
    faqTitle: 'Häufig gestellte Fragen',
    relatedToolsTitle: 'Verwandte Tools',
    relatedGuidesTitle: 'Verwandte Anleitungen',
    faqItems: [
      { question: 'Was ist ein KI-Dateisortierer?', answer: 'Ein KI-Dateisortierer liest, was eine Datei enthält, und verschiebt sie in einen passenden Ordner, statt nach Endung oder Dateinamen zu sortieren. Zush liest PDFs, Scans, Fotos, Screenshots, Dokumente, Videos und Audio, schlägt Ordner vor und benennt jede Datei im selben geprüften Stapel um.' },
      { question: 'Kann ich Zush in eigenen Worten sagen, wie sortiert werden soll?', answer: 'Ja. Schreibe Ordnerregeln in Alltagssprache mit bis zu 2.000 Zeichen, zum Beispiel „Rechnungen nach Unternehmen und Belege nach Monat gruppieren, Monatsordner als JJJJ-MM benennen“. Bleibt das Feld leer, gruppiert Auto die Dateien nach Inhalt in wenige breite Ordner. Bedingungen, Regex oder Skripte sind nicht nötig.' },
      { question: 'Nutzt Zush bereits vorhandene Ordner?', answer: 'Ja. Mit „Vorhandene Ordner wiederverwenden“ ordnet Zush Dateien passenden Ordnern im Ziel zu und legt nur dann einen neuen Ordner an, wenn keiner passt. Dateien ohne passenden Ordner werden umbenannt, aber nicht gruppiert.' },
      { question: 'Kann Zush neue Dateien automatisch sortieren?', answer: 'Ja. Speichere Zielordner und Ordnerregeln in einer Vorlage und weise sie einem überwachten Ordner wie Downloads oder dem Scanner-Ordner zu. Neue Dateien werden umbenannt und einsortiert, und Monitor verwendet die bereits angelegten Ordner weiter.' },
      { question: 'Funktioniert die KI-Ordnersortierung unter Windows?', answer: 'Ja. Zush für Windows 10 und 11 hat dieselben Einstellungen für Zielordner, Ordnersortierung, vorhandene Ordner und Ordnerregeln wie die Mac-App. Vorlagen lassen sich zwischen Mac und Windows exportieren und importieren.' },
      { question: 'Kann ich Dateien offline in Ordner sortieren?', answer: 'Ja. Mit LM Studio oder Ollama laufen sowohl die Dateianalyse als auch die Ordnerplanung auf deinem Computer. Zush wechselt nicht in die Cloud, solange ein lokaler Modus ausgewählt ist.' },
      { question: 'Ist es sicher, KI Dateien verschieben zu lassen?', answer: 'Zush zeigt jeden vorgeschlagenen Dateinamen und Ordner, bevor etwas verschoben wird. Du kannst Ordner umbenennen oder Dateien einer anderen Gruppe zuordnen. Rückgängig verschiebt eine Datei zurück in den ursprünglichen Ordner und stellt ihren Namen wieder her.' },
    ],
    directAnswerSection: {
      heading: 'Ordner einmal beschreiben, Zush erledigt die Ablage',
      answer: 'Zush sortiert nach dem, was eine Datei enthält, nicht nach ihrer Endung. Schreibe Ordnerregeln wie für eine Assistenz oder lass das Feld für Auto leer. Zush analysiert jede Datei, schlägt Namen und Ordner vor und wartet auf deine Prüfung.',
      steps: [
        'Öffne KI-Umbenennen, wähle eine Vorlage für die Dateinamen und lege mit der Ordnersteuerung unter den Naming Blocks ein Ziel fest.',
        'Aktiviere „Sortieren“ und schreibe eine Regel wie „Rechnungen nach Unternehmen gruppieren“ oder lass die Ordnerregeln für Auto leer.',
        'Prüfe die vorgeschlagenen Namen und Ordner, wende den Stapel an und speichere die Einstellungen in einer Vorlage für Monitor.',
      ],
    },
    howTo: {
      name: 'Dateien mit KI in Ordner sortieren',
      description: 'Mit Zush auf Mac oder Windows Dateien nach Inhalt in Ordner sortieren, automatisch oder nach eigenen Regeln in Alltagssprache.',
      steps: [
        ['Dateien und Vorlage wählen', 'Öffne KI-Umbenennen, wähle eine Vorlage und füge einen gemischten Ordner hinzu.'],
        ['Zielordner festlegen', 'Wähle das Ziel für die sortierten Ordner oder behalte den ursprünglichen Speicherort.'],
        ['Ordnerregeln schreiben', 'Aktiviere „Sortieren“ und beschreibe die Gruppierung oder nutze Auto.'],
        ['Prüfen und anwenden', 'Kontrolliere Namen und Ordner und wende den Stapel an.'],
      ],
    },
    featureList: ['Dateien auf Mac und Windows nach Inhalt in Ordner sortieren', 'Ordnerregeln in Alltagssprache oder Auto', 'Umbenennen und sortieren in einem geprüften Stapel', 'Zielordner wählen und vorhandene Ordner wiederverwenden', 'Neue Dateien automatisch mit Monitor sortieren', 'Lokale KI mit LM Studio oder Ollama'],
    showcase: { folders: ['Rechnungen', 'Belege', 'Screenshots', 'Verträge', 'Videos', 'Meetings'], files: ['Rechnung', '2026-06-03', 'Umsatz-Dashboard', 'Mietvertrag', 'Sonnenuntergang am Strand', 'Team-Meeting Q3-Roadmap'] },
    relatedPages: [
      { title: 'Dateien stapelweise umbenennen', href: '/batch-rename-files' },
      { title: 'Zush für Mac', href: '/mac' },
      { title: 'Zush für Windows', href: '/windows' },
      { title: 'PDFs mit KI umbenennen', href: '/rename-pdf-with-ai' },
      { title: 'Fotos mit KI umbenennen', href: '/rename-photos-with-ai' },
      { title: 'Dokumentation: Ordnersortierung', href: '/docs/folder-sorting' },
    ],
  },
  fr: {
    seo: {
      title: 'Trieur de fichiers IA pour Mac et Windows : classer par vos règles',
      description: 'Classez vos fichiers dans des dossiers avec l’IA sur Mac et Windows. Décrivez les dossiers en langage naturel ou utilisez Auto. Zush lit, renomme et range chaque fichier.',
    },
    h1: 'Trieur de fichiers IA : classez vos fichiers selon vos propres règles',
    accent: 'selon vos propres règles',
    definitionText: 'Zush est un trieur de fichiers IA pour Mac et Windows. Décrivez les dossiers voulus en langage naturel, par exemple « Regrouper les factures par entreprise et les reçus par mois », ou laissez le mode Auto regrouper par contenu. Zush lit chaque fichier, le renomme et le déplace dans le bon dossier après votre vérification.',
    faqTitle: 'Questions fréquentes',
    relatedToolsTitle: 'Outils associés',
    relatedGuidesTitle: 'Guides associés',
    faqItems: [
      { question: 'Qu’est-ce qu’un trieur de fichiers IA ?', answer: 'Un trieur de fichiers IA lit le contenu de chaque fichier et le place dans un dossier adapté, au lieu de trier par extension ou par nom. Zush lit les PDF, scans, photos, captures d’écran, documents, vidéos et fichiers audio, propose des dossiers et renomme chaque fichier dans le même lot vérifié.' },
      { question: 'Puis-je expliquer à Zush comment trier, avec mes propres mots ?', answer: 'Oui. Rédigez des règles de dossiers en langage naturel, jusqu’à 2 000 caractères, par exemple « Regrouper les factures par entreprise et les reçus par mois, nommer les dossiers de mois AAAA-MM ». Si le champ reste vide, Auto regroupe les fichiers par contenu en quelques grands dossiers. Aucune condition, regex ou script n’est nécessaire.' },
      { question: 'Zush utilise-t-il les dossiers qui existent déjà ?', answer: 'Oui. Avec « Réutiliser les dossiers existants », Zush associe les fichiers aux dossiers adaptés déjà présents dans la destination et n’en crée un nouveau que si aucun ne convient. Les fichiers sans dossier adapté sont renommés sans être regroupés.' },
      { question: 'Zush peut-il trier automatiquement les nouveaux fichiers ?', answer: 'Oui. Enregistrez la destination et les règles de dossiers dans un modèle, puis attribuez-le à un dossier surveillé comme Téléchargements ou le dossier du scanner. Les nouveaux fichiers sont renommés et classés, et Monitor réutilise les dossiers qu’il a déjà créés.' },
      { question: 'Le classement par IA fonctionne-t-il sous Windows ?', answer: 'Oui. Zush pour Windows 10 et 11 propose les mêmes réglages de dossier de destination, de classement, de réutilisation des dossiers et de règles que l’app Mac. Les modèles s’exportent et s’importent entre Mac et Windows.' },
      { question: 'Puis-je classer mes fichiers hors ligne ?', answer: 'Oui. Avec LM Studio ou Ollama, l’analyse des fichiers et la planification des dossiers se font sur votre ordinateur. Zush ne bascule pas vers le cloud tant qu’un mode local est sélectionné.' },
      { question: 'Est-il sûr de laisser l’IA déplacer mes fichiers ?', answer: 'Zush affiche chaque nom et chaque dossier proposés avant tout déplacement. Vous pouvez renommer un dossier ou déplacer un fichier vers un autre groupe. Annuler remet le fichier dans son dossier d’origine avec son nom d’origine.' },
    ],
    directAnswerSection: {
      heading: 'Décrivez vos dossiers une fois, Zush range tout',
      answer: 'Zush classe selon ce que contient un fichier, pas selon son extension. Rédigez des règles de dossiers comme pour un assistant, ou laissez le champ vide pour Auto. Zush analyse chaque fichier, propose un nom et un dossier, puis attend votre validation.',
      steps: [
        'Ouvrez Renommage IA, choisissez un modèle pour les noms et définissez la destination avec le sélecteur de dossier sous les Naming Blocks.',
        'Activez « Trier » et écrivez une règle comme « Regrouper les factures par entreprise », ou laissez les règles vides pour Auto.',
        'Vérifiez les noms et dossiers proposés, appliquez le lot, puis enregistrez les réglages dans un modèle pour Monitor.',
      ],
    },
    howTo: {
      name: 'Classer des fichiers dans des dossiers avec l’IA',
      description: 'Utilisez Zush sur Mac ou Windows pour classer des fichiers par contenu, automatiquement ou selon vos règles en langage naturel.',
      steps: [
        ['Ajouter les fichiers et choisir un modèle', 'Ouvrez Renommage IA, choisissez un modèle et ajoutez un dossier de fichiers variés.'],
        ['Choisir la destination', 'Sélectionnez où créer les dossiers triés ou conservez l’emplacement d’origine.'],
        ['Écrire les règles de dossiers', 'Activez « Trier » et décrivez le regroupement, ou utilisez Auto.'],
        ['Vérifier et appliquer', 'Contrôlez les noms et les dossiers, puis appliquez le lot.'],
      ],
    },
    featureList: ['Classer les fichiers par contenu sur Mac et Windows', 'Règles de dossiers en langage naturel ou mode Auto', 'Renommer et classer dans un même lot vérifié', 'Choisir une destination et réutiliser les dossiers existants', 'Classement automatique des nouveaux fichiers avec Monitor', 'IA locale avec LM Studio ou Ollama'],
    showcase: { folders: ['Factures', 'Reçus', 'Captures', 'Contrats', 'Vidéos', 'Réunions'], files: ['Facture', '2026-06-03', 'Tableau de revenus', 'Contrat de bail', 'Coucher de soleil plage', 'Réunion équipe feuille de route T3'] },
    relatedPages: [
      { title: 'Zush pour Mac', href: '/mac' },
      { title: 'Zush pour Windows', href: '/windows' },
      { title: 'Renommer des PDF avec l’IA', href: '/rename-pdf-with-ai' },
      { title: 'Renommer des photos avec l’IA', href: '/rename-photos-with-ai' },
      { title: 'Renommer des documents avec l’IA', href: '/rename-documents-with-ai' },
      { title: 'Documentation du classement', href: '/docs/folder-sorting' },
    ],
  },
  es: {
    seo: {
      title: 'Clasificador de archivos con IA para Mac y Windows: tus reglas',
      description: 'Ordena archivos en carpetas con IA en Mac y Windows. Describe las carpetas con tus palabras o usa Auto. Zush lee, renombra y archiva cada documento, foto y vídeo.',
    },
    h1: 'Clasificador de archivos con IA: ordena archivos en carpetas con tus reglas',
    accent: 'con tus reglas',
    definitionText: 'Zush es un clasificador de archivos con IA para Mac y Windows. Describe las carpetas que quieres con tus propias palabras, por ejemplo «Agrupar facturas por empresa y recibos por mes», o deja que Auto agrupe por contenido. Zush lee cada archivo, lo renombra y lo mueve a la carpeta correcta después de que revises el plan.',
    faqTitle: 'Preguntas frecuentes',
    relatedToolsTitle: 'Herramientas relacionadas',
    relatedGuidesTitle: 'Guías relacionadas',
    faqItems: [
      { question: '¿Qué es un clasificador de archivos con IA?', answer: 'Un clasificador de archivos con IA lee lo que contiene cada archivo y lo mueve a una carpeta adecuada, en lugar de ordenar por extensión o nombre. Zush lee PDF, escaneos, fotos, capturas, documentos, vídeos y audio, propone carpetas y renombra cada archivo en el mismo lote revisado.' },
      { question: '¿Puedo decirle a Zush cómo ordenar con mis propias palabras?', answer: 'Sí. Escribe reglas de carpetas en lenguaje natural, de hasta 2000 caracteres, por ejemplo «Agrupar facturas por empresa y recibos por mes, nombrar las carpetas de mes AAAA-MM». Si dejas el campo vacío, Auto agrupa los archivos por contenido en pocas carpetas amplias. No hacen falta condiciones, regex ni scripts.' },
      { question: '¿Zush usa carpetas que ya existen?', answer: 'Sí. Con «Reutilizar carpetas existentes», Zush asigna los archivos a carpetas adecuadas que ya están en el destino y solo crea una nueva cuando ninguna encaja. Los archivos que no encajan en ninguna carpeta se renombran sin agruparse.' },
      { question: '¿Puede Zush ordenar archivos nuevos automáticamente?', answer: 'Sí. Guarda el destino y las reglas de carpetas en una plantilla y asígnala a una carpeta vigilada, como Descargas o la del escáner. Los archivos nuevos se renombran y se ordenan, y Monitor reutiliza las carpetas que ya creó.' },
      { question: '¿La ordenación con IA funciona en Windows?', answer: 'Sí. Zush para Windows 10 y 11 tiene los mismos ajustes de carpeta de destino, ordenación, reutilización de carpetas y reglas que la app de Mac. Las plantillas se exportan e importan entre Mac y Windows.' },
      { question: '¿Puedo ordenar archivos sin conexión?', answer: 'Sí. Con LM Studio u Ollama, tanto el análisis de archivos como la planificación de carpetas se ejecutan en tu ordenador. Zush no pasa a la nube mientras haya un modo local seleccionado.' },
      { question: '¿Es seguro dejar que la IA mueva mis archivos?', answer: 'Zush muestra cada nombre y carpeta propuestos antes de mover nada. Puedes renombrar una carpeta o mover un archivo a otro grupo. Deshacer devuelve el archivo a su carpeta original con su nombre original.' },
    ],
    directAnswerSection: {
      heading: 'Describe tus carpetas una vez y Zush archiva todo',
      answer: 'Zush ordena según lo que contiene un archivo, no según su extensión. Escribe reglas de carpetas como si dieras instrucciones a un asistente, o deja el campo vacío para usar Auto. Zush analiza cada archivo, propone un nombre y una carpeta, y espera tu revisión.',
      steps: [
        'Abre Renombrar con IA, elige una plantilla para los nombres y fija el destino con el selector de carpeta bajo los Naming Blocks.',
        'Activa «Ordenar» y escribe una regla como «Agrupar facturas por empresa», o deja las reglas vacías para Auto.',
        'Revisa los nombres y carpetas propuestos, aplica el lote y guarda la configuración en una plantilla para Monitor.',
      ],
    },
    howTo: {
      name: 'Ordenar archivos en carpetas con IA',
      description: 'Usa Zush en Mac o Windows para ordenar archivos por contenido, automáticamente o con tus propias reglas en lenguaje natural.',
      steps: [
        ['Añadir archivos y elegir plantilla', 'Abre Renombrar con IA, elige una plantilla y añade una carpeta con archivos variados.'],
        ['Elegir el destino', 'Selecciona dónde crear las carpetas o conserva la ubicación original.'],
        ['Escribir reglas de carpetas', 'Activa «Ordenar» y describe la agrupación, o usa Auto.'],
        ['Revisar y aplicar', 'Comprueba nombres y carpetas y aplica el lote.'],
      ],
    },
    featureList: ['Ordenar archivos por contenido en Mac y Windows', 'Reglas de carpetas en lenguaje natural o modo Auto', 'Renombrar y ordenar en un mismo lote revisado', 'Elegir destino y reutilizar carpetas existentes', 'Ordenación automática de archivos nuevos con Monitor', 'IA local con LM Studio u Ollama'],
    showcase: { folders: ['Facturas', 'Recibos', 'Capturas', 'Contratos', 'Vídeos', 'Reuniones'], files: ['Factura', '2026-06-03', 'Panel de ingresos', 'Contrato de alquiler', 'Atardecer en la playa', 'Reunión de equipo hoja de ruta T3'] },
    relatedPages: [
      { title: 'Zush para Mac', href: '/mac' },
      { title: 'Zush para Windows', href: '/windows' },
      { title: 'Renombrar PDF con IA', href: '/rename-pdf-with-ai' },
      { title: 'Renombrar fotos con IA', href: '/rename-photos-with-ai' },
      { title: 'Renombrar documentos con IA', href: '/rename-documents-with-ai' },
      { title: 'Documentación de ordenación', href: '/docs/folder-sorting' },
    ],
  },
  'pt-br': {
    seo: {
      title: 'Organizador de arquivos com IA para Mac e Windows: suas regras',
      description: 'Organize arquivos em pastas com IA no Mac e no Windows. Descreva as pastas com suas palavras ou use o Auto. O Zush lê, renomeia e arquiva cada documento, foto e vídeo.',
    },
    h1: 'Organizador de arquivos com IA: separe arquivos em pastas com suas regras',
    accent: 'com suas regras',
    definitionText: 'O Zush organiza arquivos em pastas com IA no Mac e no Windows. Descreva as pastas com suas palavras, por exemplo “Agrupar faturas por empresa e recibos por mês”, ou deixe o Auto agrupar pelo conteúdo. O Zush lê cada arquivo, renomeia e o move para a pasta certa depois que você revisa o plano.',
    faqTitle: 'Perguntas frequentes',
    relatedToolsTitle: 'Ferramentas relacionadas',
    relatedGuidesTitle: 'Guias relacionados',
    faqItems: [
      { question: 'O que é um organizador de arquivos com IA?', answer: 'Um organizador de arquivos com IA lê o que cada arquivo contém e o move para uma pasta adequada, em vez de separar por extensão ou nome. O Zush lê PDFs, digitalizações, fotos, capturas de tela, documentos, vídeos e áudio, sugere pastas e renomeia cada arquivo no mesmo lote revisado.' },
      { question: 'Posso dizer ao Zush como organizar com minhas palavras?', answer: 'Sim. Escreva regras de pastas em linguagem natural, com até 2.000 caracteres, por exemplo “Agrupar faturas por empresa e recibos por mês, nomear pastas de mês como AAAA-MM”. Com o campo vazio, o Auto agrupa os arquivos pelo conteúdo em poucas pastas amplas. Não é preciso criar condições, regex nem scripts.' },
      { question: 'O Zush usa pastas que já existem?', answer: 'Sim. Com “Reutilizar pastas existentes”, o Zush associa os arquivos a pastas adequadas que já estão no destino e só cria uma nova quando nenhuma serve. Arquivos que não se encaixam em nenhuma pasta são renomeados sem agrupamento.' },
      { question: 'O Zush organiza arquivos novos automaticamente?', answer: 'Sim. Salve o destino e as regras de pastas em um modelo e atribua-o a uma pasta monitorada, como Downloads ou a pasta do scanner. Os arquivos novos são renomeados e organizados, e o Monitor reutiliza as pastas que já criou.' },
      { question: 'A organização em pastas com IA funciona no Windows?', answer: 'Sim. O Zush para Windows 10 e 11 tem as mesmas configurações de pasta de destino, organização, reutilização de pastas e regras do app para Mac. Os modelos podem ser exportados e importados entre Mac e Windows.' },
      { question: 'Posso organizar arquivos offline?', answer: 'Sim. Com LM Studio ou Ollama, a análise dos arquivos e o planejamento das pastas rodam no seu computador. O Zush não passa para a nuvem enquanto um modo local estiver selecionado.' },
      { question: 'É seguro deixar a IA mover meus arquivos?', answer: 'O Zush mostra cada nome e cada pasta sugeridos antes de mover qualquer coisa. Você pode renomear uma pasta ou mover um arquivo para outro grupo. Desfazer devolve o arquivo à pasta original com o nome original.' },
    ],
    directAnswerSection: {
      heading: 'Descreva suas pastas uma vez e o Zush arquiva tudo',
      answer: 'O Zush organiza pelo conteúdo do arquivo, não pela extensão. Escreva regras de pastas como se estivesse orientando um assistente, ou deixe o campo vazio para usar o Auto. O Zush analisa cada arquivo, sugere nome e pasta e espera sua revisão.',
      steps: [
        'Abra Renomear com IA, escolha um modelo para os nomes e defina o destino no seletor de pasta abaixo dos Naming Blocks.',
        'Ative “Organizar” e escreva uma regra como “Agrupar faturas por empresa”, ou deixe as regras vazias para o Auto.',
        'Revise os nomes e pastas sugeridos, aplique o lote e salve a configuração em um modelo para o Monitor.',
      ],
    },
    howTo: {
      name: 'Organizar arquivos em pastas com IA',
      description: 'Use o Zush no Mac ou no Windows para organizar arquivos pelo conteúdo, automaticamente ou com suas regras em linguagem natural.',
      steps: [
        ['Adicionar arquivos e escolher modelo', 'Abra Renomear com IA, escolha um modelo e adicione uma pasta com arquivos variados.'],
        ['Escolher o destino', 'Selecione onde criar as pastas ou mantenha o local original.'],
        ['Escrever regras de pastas', 'Ative “Organizar” e descreva o agrupamento, ou use o Auto.'],
        ['Revisar e aplicar', 'Confira nomes e pastas e aplique o lote.'],
      ],
    },
    featureList: ['Organizar arquivos pelo conteúdo no Mac e no Windows', 'Regras de pastas em linguagem natural ou modo Auto', 'Renomear e organizar no mesmo lote revisado', 'Escolher destino e reutilizar pastas existentes', 'Organização automática de novos arquivos com o Monitor', 'IA local com LM Studio ou Ollama'],
    showcase: { folders: ['Faturas', 'Recibos', 'Capturas', 'Contratos', 'Vídeos', 'Reuniões'], files: ['Fatura', '2026-06-03', 'Painel de receita', 'Contrato de aluguel', 'Pôr do sol na praia', 'Reunião de equipe roadmap T3'] },
    relatedPages: [
      { title: 'Zush para Mac', href: '/mac' },
      { title: 'Zush para Windows', href: '/windows' },
      { title: 'Renomear PDFs com IA', href: '/rename-pdf-with-ai' },
      { title: 'Renomear fotos com IA', href: '/rename-photos-with-ai' },
      { title: 'Renomear documentos com IA', href: '/rename-documents-with-ai' },
      { title: 'Documentação da organização em pastas', href: '/docs/folder-sorting' },
    ],
  },
  it: {
    seo: {
      title: 'Smistatore di file con IA per Mac e Windows: le tue regole',
      description: 'Ordina i file in cartelle con l’IA su Mac e Windows. Descrivi le cartelle con parole tue o usa Auto. Zush legge, rinomina e archivia ogni documento, foto e video.',
    },
    h1: 'Smistatore di file con IA: ordina i file in cartelle con le tue regole',
    accent: 'con le tue regole',
    definitionText: 'Zush è uno smistatore di file con IA per Mac e Windows. Descrivi le cartelle che vuoi con parole tue, ad esempio «Raggruppa le fatture per azienda e le ricevute per mese», oppure lascia che Auto raggruppi per contenuto. Zush legge ogni file, lo rinomina e lo sposta nella cartella giusta dopo che hai controllato il piano.',
    faqTitle: 'Domande frequenti',
    relatedToolsTitle: 'Strumenti correlati',
    relatedGuidesTitle: 'Guide correlate',
    faqItems: [
      { question: 'Che cos’è uno smistatore di file con IA?', answer: 'Uno smistatore di file con IA legge il contenuto di ogni file e lo sposta in una cartella adatta, invece di ordinare per estensione o nome. Zush legge PDF, scansioni, foto, screenshot, documenti, video e audio, propone cartelle e rinomina ogni file nello stesso lotto controllato.' },
      { question: 'Posso spiegare a Zush come ordinare con parole mie?', answer: 'Sì. Scrivi regole per le cartelle in linguaggio naturale, fino a 2.000 caratteri, ad esempio «Raggruppa le fatture per azienda e le ricevute per mese, nomina le cartelle dei mesi AAAA-MM». Se il campo resta vuoto, Auto raggruppa i file per contenuto in poche cartelle ampie. Non servono condizioni, regex o script.' },
      { question: 'Zush usa le cartelle che esistono già?', answer: 'Sì. Con «Riutilizza cartelle esistenti», Zush associa i file alle cartelle adatte già presenti nella destinazione e ne crea una nuova solo quando nessuna è adatta. I file che non rientrano in alcuna cartella vengono rinominati senza essere raggruppati.' },
      { question: 'Zush può ordinare automaticamente i nuovi file?', answer: 'Sì. Salva destinazione e regole delle cartelle in un modello e assegnalo a una cartella monitorata, come Download o la cartella dello scanner. I nuovi file vengono rinominati e ordinati, e Monitor riutilizza le cartelle che ha già creato.' },
      { question: 'L’ordinamento con IA funziona su Windows?', answer: 'Sì. Zush per Windows 10 e 11 ha le stesse impostazioni di cartella di destinazione, ordinamento, riutilizzo delle cartelle e regole dell’app per Mac. I modelli si esportano e importano tra Mac e Windows.' },
      { question: 'Posso ordinare i file offline?', answer: 'Sì. Con LM Studio o Ollama, sia l’analisi dei file sia la pianificazione delle cartelle avvengono sul tuo computer. Zush non passa al cloud finché è selezionata una modalità locale.' },
      { question: 'È sicuro lasciare che l’IA sposti i miei file?', answer: 'Zush mostra ogni nome e ogni cartella proposti prima di spostare qualcosa. Puoi rinominare una cartella o spostare un file in un altro gruppo. Annulla riporta il file nella cartella originale con il nome originale.' },
    ],
    directAnswerSection: {
      heading: 'Descrivi le cartelle una volta, Zush archivia tutto',
      answer: 'Zush ordina in base al contenuto di un file, non alla sua estensione. Scrivi le regole delle cartelle come se istruissi un assistente, oppure lascia il campo vuoto per Auto. Zush analizza ogni file, propone nome e cartella e attende la tua verifica.',
      steps: [
        'Apri Rinomina con IA, scegli un modello per i nomi e imposta la destinazione con il selettore di cartella sotto i Naming Blocks.',
        'Attiva «Ordina» e scrivi una regola come «Raggruppa le fatture per azienda», oppure lascia vuote le regole per Auto.',
        'Controlla nomi e cartelle proposti, applica il lotto e salva le impostazioni in un modello per Monitor.',
      ],
    },
    howTo: {
      name: 'Ordinare i file in cartelle con l’IA',
      description: 'Usa Zush su Mac o Windows per ordinare i file per contenuto, automaticamente o con le tue regole in linguaggio naturale.',
      steps: [
        ['Aggiungere file e scegliere un modello', 'Apri Rinomina con IA, scegli un modello e aggiungi una cartella di file misti.'],
        ['Scegliere la destinazione', 'Seleziona dove creare le cartelle o mantieni la posizione originale.'],
        ['Scrivere le regole delle cartelle', 'Attiva «Ordina» e descrivi il raggruppamento, oppure usa Auto.'],
        ['Controllare e applicare', 'Verifica nomi e cartelle e applica il lotto.'],
      ],
    },
    featureList: ['Ordinare i file per contenuto su Mac e Windows', 'Regole delle cartelle in linguaggio naturale o modalità Auto', 'Rinominare e ordinare nello stesso lotto controllato', 'Scegliere la destinazione e riutilizzare cartelle esistenti', 'Ordinamento automatico dei nuovi file con Monitor', 'IA locale con LM Studio o Ollama'],
    showcase: { folders: ['Fatture', 'Ricevute', 'Screenshot', 'Contratti', 'Video', 'Riunioni'], files: ['Fattura', '2026-06-03', 'Dashboard ricavi', 'Contratto di locazione', 'Tramonto sulla spiaggia', 'Riunione team roadmap Q3'] },
    relatedPages: [
      { title: 'Zush per Mac', href: '/mac' },
      { title: 'Zush per Windows', href: '/windows' },
      { title: 'Rinomina PDF con l’IA', href: '/rename-pdf-with-ai' },
      { title: 'Rinomina foto con l’IA', href: '/rename-photos-with-ai' },
      { title: 'Rinomina documenti con l’IA', href: '/rename-documents-with-ai' },
      { title: 'Documentazione dell’ordinamento', href: '/docs/folder-sorting' },
    ],
  },
  nl: {
    seo: {
      title: 'AI-bestandssorteerder voor Mac en Windows: sorteer met eigen regels',
      description: 'Sorteer bestanden met AI in mappen op Mac en Windows. Beschrijf de mappen in gewone taal of gebruik Auto. Zush leest, hernoemt en archiveert elk document, foto en video.',
    },
    h1: 'AI-bestandssorteerder: sorteer bestanden in mappen met je eigen regels',
    accent: 'met je eigen regels',
    definitionText: 'Zush is een AI-bestandssorteerder voor Mac en Windows. Beschrijf de mappen die je wilt in gewone taal, bijvoorbeeld ‘Groepeer facturen per bedrijf en bonnen per maand’, of laat Auto op inhoud groeperen. Zush leest elk bestand, geeft het een nieuwe naam en verplaatst het na jouw controle naar de juiste map.',
    faqTitle: 'Veelgestelde vragen',
    relatedToolsTitle: 'Gerelateerde tools',
    relatedGuidesTitle: 'Gerelateerde gidsen',
    faqItems: [
      { question: 'Wat is een AI-bestandssorteerder?', answer: 'Een AI-bestandssorteerder leest wat een bestand bevat en verplaatst het naar een passende map, in plaats van te sorteren op extensie of bestandsnaam. Zush leest pdf’s, scans, foto’s, screenshots, documenten, video’s en audio, stelt mappen voor en hernoemt elk bestand in dezelfde gecontroleerde batch.' },
      { question: 'Kan ik Zush in eigen woorden vertellen hoe er gesorteerd moet worden?', answer: 'Ja. Schrijf mapregels in gewone taal, tot 2.000 tekens, bijvoorbeeld ‘Groepeer facturen per bedrijf en bonnen per maand, noem maandmappen JJJJ-MM’. Laat je het veld leeg, dan groepeert Auto de bestanden op inhoud in een paar brede mappen. Voorwaarden, regex of scripts zijn niet nodig.' },
      { question: 'Gebruikt Zush mappen die al bestaan?', answer: 'Ja. Met ‘Bestaande mappen hergebruiken’ koppelt Zush bestanden aan passende mappen die al in de bestemming staan en maakt het alleen een nieuwe map als niets past. Bestanden die nergens passen, krijgen een nieuwe naam zonder te worden gegroepeerd.' },
      { question: 'Kan Zush nieuwe bestanden automatisch sorteren?', answer: 'Ja. Sla de bestemming en mapregels op in een sjabloon en koppel het aan een gevolgde map zoals Downloads of de scannermap. Nieuwe bestanden worden hernoemd en gesorteerd, en Monitor hergebruikt de mappen die het al heeft gemaakt.' },
      { question: 'Werkt AI-mapsortering op Windows?', answer: 'Ja. Zush voor Windows 10 en 11 heeft dezelfde instellingen voor bestemmingsmap, mapsortering, hergebruik van mappen en mapregels als de Mac-app. Sjablonen kun je tussen Mac en Windows exporteren en importeren.' },
      { question: 'Kan ik bestanden offline sorteren?', answer: 'Ja. Met LM Studio of Ollama draaien zowel de bestandsanalyse als de mapplanning op je computer. Zush schakelt niet over naar de cloud zolang een lokale modus is gekozen.' },
      { question: 'Is het veilig om AI mijn bestanden te laten verplaatsen?', answer: 'Zush toont elke voorgestelde bestandsnaam en map voordat er iets wordt verplaatst. Je kunt een map hernoemen of een bestand naar een andere groep verplaatsen. Ongedaan maken zet het bestand terug in de oorspronkelijke map met de oorspronkelijke naam.' },
    ],
    directAnswerSection: {
      heading: 'Beschrijf je mappen één keer, Zush doet het archiveren',
      answer: 'Zush sorteert op wat een bestand bevat, niet op de extensie. Schrijf mapregels zoals je een assistent zou instrueren, of laat het veld leeg voor Auto. Zush analyseert elk bestand, stelt een naam en een map voor en wacht op jouw controle.',
      steps: [
        'Open AI-hernoemen, kies een sjabloon voor de bestandsnamen en stel de bestemming in met de mapkeuze onder de Naming Blocks.',
        'Zet ‘Sorteren’ aan en schrijf een regel zoals ‘Groepeer facturen per bedrijf’, of laat de mapregels leeg voor Auto.',
        'Controleer de voorgestelde namen en mappen, pas de batch toe en sla de instellingen op in een sjabloon voor Monitor.',
      ],
    },
    howTo: {
      name: 'Bestanden met AI in mappen sorteren',
      description: 'Gebruik Zush op Mac of Windows om bestanden op inhoud in mappen te sorteren, automatisch of met je eigen regels in gewone taal.',
      steps: [
        ['Bestanden toevoegen en sjabloon kiezen', 'Open AI-hernoemen, kies een sjabloon en voeg een map met gemengde bestanden toe.'],
        ['Bestemming kiezen', 'Kies waar de gesorteerde mappen komen of behoud de oorspronkelijke locatie.'],
        ['Mapregels schrijven', 'Zet ‘Sorteren’ aan en beschrijf de groepering, of gebruik Auto.'],
        ['Controleren en toepassen', 'Controleer namen en mappen en pas de batch toe.'],
      ],
    },
    featureList: ['Bestanden op inhoud sorteren op Mac en Windows', 'Mapregels in gewone taal of Auto', 'Hernoemen en sorteren in één gecontroleerde batch', 'Bestemming kiezen en bestaande mappen hergebruiken', 'Nieuwe bestanden automatisch sorteren met Monitor', 'Lokale AI met LM Studio of Ollama'],
    showcase: { folders: ['Facturen', 'Bonnen', 'Screenshots', 'Contracten', "Video's", 'Vergaderingen'], files: ['Factuur', '2026-06-03', 'Omzetdashboard', 'Huurovereenkomst', 'Zonsondergang op het strand', 'Teamoverleg roadmap Q3'] },
    relatedPages: [
      { title: 'Zush voor Mac', href: '/mac' },
      { title: 'Zush voor Windows', href: '/windows' },
      { title: 'Pdf’s hernoemen met AI', href: '/rename-pdf-with-ai' },
      { title: 'Foto’s hernoemen met AI', href: '/rename-photos-with-ai' },
      { title: 'Documenten hernoemen met AI', href: '/rename-documents-with-ai' },
      { title: 'Documentatie mapsortering', href: '/docs/folder-sorting' },
    ],
  },
  tr: {
    seo: {
      title: 'Mac ve Windows için yapay zekâ dosya sıralayıcı: kendi kurallarınız',
      description: 'Dosyaları Mac ve Windows’ta yapay zekâyla klasörlere ayırın. Klasörleri kendi cümlelerinizle tarif edin ya da Auto’yu kullanın. Zush her dosyayı okur, adlandırır ve yerleştirir.',
    },
    h1: 'Yapay zekâ dosya sıralayıcı: dosyaları kendi kurallarınızla klasörlere ayırın',
    accent: 'kendi kurallarınızla',
    definitionText: 'Zush, Mac ve Windows için bir yapay zekâ dosya sıralayıcıdır. İstediğiniz klasörleri kendi cümlelerinizle tarif edin, örneğin “Faturaları şirkete, fişleri aya göre grupla”, ya da Auto’nun içeriğe göre gruplamasına izin verin. Zush her dosyayı okur, yeniden adlandırır ve planı incelemenizin ardından doğru klasöre taşır.',
    faqTitle: 'Sık sorulan sorular',
    relatedToolsTitle: 'İlgili araçlar',
    relatedGuidesTitle: 'İlgili rehberler',
    faqItems: [
      { question: 'Yapay zekâ dosya sıralayıcı nedir?', answer: 'Yapay zekâ dosya sıralayıcı, dosyaları uzantıya veya ada göre değil, içeriklerine göre okuyup uygun klasöre taşır. Zush PDF’leri, taramaları, fotoğrafları, ekran görüntülerini, belgeleri, videoları ve ses dosyalarını okur, klasör önerir ve her dosyayı aynı incelenen grupta yeniden adlandırır.' },
      { question: 'Zush’a nasıl sıralayacağını kendi cümlelerimle anlatabilir miyim?', answer: 'Evet. Klasör kurallarını en fazla 2.000 karakterle günlük dilde yazın, örneğin “Faturaları şirkete, fişleri aya göre grupla; ay klasörlerini YYYY-AA olarak adlandır”. Alanı boş bırakırsanız Auto dosyaları içeriğe göre birkaç geniş klasörde toplar. Koşul, regex veya betik gerekmez.' },
      { question: 'Zush mevcut klasörleri kullanır mı?', answer: 'Evet. “Mevcut klasörleri yeniden kullan” açıkken Zush dosyaları hedefte zaten bulunan uygun klasörlerle eşleştirir ve yalnızca hiçbiri uymadığında yeni klasör oluşturur. Hiçbir klasöre uymayan dosyalar gruplanmadan yeniden adlandırılır.' },
      { question: 'Zush yeni dosyaları otomatik olarak sıralayabilir mi?', answer: 'Evet. Hedefi ve klasör kurallarını bir şablona kaydedip İndirilenler veya tarayıcı klasörü gibi izlenen bir klasöre atayın. Yeni dosyalar yeniden adlandırılıp sıralanır ve Monitor daha önce oluşturduğu klasörleri kullanmaya devam eder.' },
      { question: 'Yapay zekâyla klasör sıralama Windows’ta çalışır mı?', answer: 'Evet. Windows 10 ve 11 için Zush, Mac uygulamasıyla aynı hedef klasör, klasör sıralama, klasörleri yeniden kullanma ve klasör kuralları ayarlarına sahiptir. Şablonlar Mac ile Windows arasında dışa ve içe aktarılabilir.' },
      { question: 'Dosyaları çevrimdışı sıralayabilir miyim?', answer: 'Evet. LM Studio veya Ollama seçiliyken hem dosya analizi hem de klasör planlaması bilgisayarınızda çalışır. Yerel mod seçiliyken Zush buluta geçmez.' },
      { question: 'Dosyalarımı yapay zekânın taşıması güvenli mi?', answer: 'Zush hiçbir şeyi taşımadan önce önerilen her dosya adını ve klasörü gösterir. Bir klasörü yeniden adlandırabilir veya bir dosyayı başka bir gruba taşıyabilirsiniz. Geri alma, dosyayı özgün klasörüne ve özgün adına döndürür.' },
    ],
    directAnswerSection: {
      heading: 'Klasörleri bir kez tarif edin, dosyalamayı Zush yapsın',
      answer: 'Zush dosyaları uzantısına göre değil, içeriğine göre sıralar. Klasör kurallarını bir asistana talimat verir gibi yazın ya da Auto için alanı boş bırakın. Zush her dosyayı analiz eder, ad ve klasör önerir ve onayınızı bekler.',
      steps: [
        'Yapay Zekâyla Yeniden Adlandır’ı açın, dosya adları için bir şablon seçin ve Naming Blocks altındaki klasör denetimiyle hedefi belirleyin.',
        '“Sırala”yı açın ve “Faturaları şirkete göre grupla” gibi bir kural yazın ya da Auto için kuralları boş bırakın.',
        'Önerilen adları ve klasörleri inceleyin, grubu uygulayın ve ayarları Monitor için bir şablona kaydedin.',
      ],
    },
    howTo: {
      name: 'Dosyaları yapay zekâyla klasörlere ayırma',
      description: 'Zush ile Mac veya Windows’ta dosyaları içeriğe göre, otomatik olarak ya da günlük dilde yazdığınız kurallarla klasörlere ayırın.',
      steps: [
        ['Dosyaları ekleyin ve şablon seçin', 'Yapay Zekâyla Yeniden Adlandır’ı açın, bir şablon seçin ve karışık dosyalar içeren bir klasör ekleyin.'],
        ['Hedefi seçin', 'Sıralanan klasörlerin nerede oluşturulacağını seçin veya özgün konumu koruyun.'],
        ['Klasör kurallarını yazın', '“Sırala”yı açın ve gruplamayı tarif edin ya da Auto’yu kullanın.'],
        ['İnceleyin ve uygulayın', 'Adları ve klasörleri kontrol edip grubu uygulayın.'],
      ],
    },
    featureList: ['Mac ve Windows’ta dosyaları içeriğe göre klasörlere ayırma', 'Günlük dilde klasör kuralları veya Auto', 'Tek bir incelenen grupta yeniden adlandırma ve sıralama', 'Hedef seçme ve mevcut klasörleri yeniden kullanma', 'Monitor ile yeni dosyaları otomatik sıralama', 'LM Studio veya Ollama ile yerel yapay zekâ'],
    showcase: { folders: ['Faturalar', 'Fişler', 'Ekran Görüntüleri', 'Sözleşmeler', 'Videolar', 'Toplantılar'], files: ['Fatura', '2026-06-03', 'Gelir Panosu', 'Kira Sözleşmesi', 'Sahilde Gün Batımı', 'Ekip Toplantısı Q3 Yol Haritası'] },
    relatedPages: [
      { title: 'Mac için Zush', href: '/mac' },
      { title: 'Windows için Zush', href: '/windows' },
      { title: 'PDF’leri yapay zekâyla yeniden adlandırın', href: '/rename-pdf-with-ai' },
      { title: 'Fotoğrafları yapay zekâyla yeniden adlandırın', href: '/rename-photos-with-ai' },
      { title: 'Belgeleri yapay zekâyla yeniden adlandırın', href: '/rename-documents-with-ai' },
      { title: 'Klasör sıralama belgeleri', href: '/docs/folder-sorting' },
    ],
  },
  ja: {
    seo: {
      title: 'Mac・Windows対応AIファイル仕分け：自分のルールでフォルダ整理',
      description: 'MacとWindowsでAIを使ってファイルをフォルダに仕分け。普段の言葉でフォルダを指定するかAutoを使えば、Zushが書類・写真・動画を読み取り、名前を付けて整理します。',
    },
    h1: 'AIファイル仕分け：自分のルールでファイルをフォルダに整理',
    accent: '自分のルールで',
    definitionText: 'ZushはMacとWindowsで使えるAIファイル仕分けアプリです。「請求書は会社別、領収書は月別にまとめる」のようにフォルダの分け方を普段の言葉で書くか、Autoに内容ごとのグループ分けを任せます。Zushは各ファイルを読み取って名前を変更し、計画を確認したあとで適切なフォルダへ移動します。',
    faqTitle: 'よくある質問',
    relatedToolsTitle: '関連ツール',
    relatedGuidesTitle: '関連ガイド',
    faqItems: [
      { question: 'AIファイル仕分けとは何ですか？', answer: 'AIファイル仕分けは、拡張子やファイル名ではなく各ファイルの中身を読み取り、適切なフォルダへ移動する仕組みです。ZushはPDF、スキャン、写真、スクリーンショット、書類、動画、音声を読み取り、フォルダを提案し、同じ確認済みバッチで各ファイルの名前も変更します。' },
      { question: '仕分け方を自分の言葉でZushに伝えられますか？', answer: 'はい。「請求書は会社別、領収書は月別にまとめ、月のフォルダ名はYYYY-MMにする」のように、フォルダルールを最大2,000文字の普段の言葉で書けます。空欄のままにするとAutoが内容に応じて少数の大きなフォルダにまとめます。条件式、正規表現、スクリプトは不要です。' },
      { question: '既存のフォルダも使えますか？', answer: 'はい。「既存フォルダを再利用」をオンにすると、Zushは保存先にある適切なフォルダにファイルを割り当て、合うものがない場合だけ新しいフォルダを作成します。どのフォルダにも合わないファイルは、グループ化せずに名前だけ変更されます。' },
      { question: '新しいファイルを自動で仕分けできますか？', answer: 'はい。保存先とフォルダルールをテンプレートに保存し、ダウンロードやスキャナーの保存先など監視中のフォルダに割り当てます。新しいファイルは名前を変更して仕分けられ、Monitorは作成済みのフォルダを引き続き使います。' },
      { question: 'AIフォルダ仕分けはWindowsでも使えますか？', answer: 'はい。Windows 10/11版Zushには、Mac版と同じ保存先フォルダ、フォルダ仕分け、既存フォルダの再利用、フォルダルールの設定があります。テンプレートはMacとWindowsの間でエクスポート・インポートできます。' },
      { question: 'オフラインで仕分けできますか？', answer: 'はい。LM StudioまたはOllamaを選ぶと、ファイル分析とフォルダ計画の両方がパソコン上で実行されます。ローカルモードを選択している間、Zushがクラウドに切り替えることはありません。' },
      { question: 'AIにファイルを移動させても安全ですか？', answer: 'Zushは何かを移動する前に、提案されたファイル名とフォルダをすべて表示します。フォルダ名を変更したり、ファイルを別のグループに移したりできます。元に戻すと、ファイルは元のフォルダと元の名前に戻ります。' },
    ],
    directAnswerSection: {
      heading: 'フォルダの分け方を一度書けば、整理はZushにおまかせ',
      answer: 'Zushは拡張子ではなく、ファイルの中身で仕分けます。アシスタントに頼むようにフォルダルールを書くか、空欄にしてAutoを使います。Zushは各ファイルを分析し、名前とフォルダを提案して確認を待ちます。',
      steps: [
        'AIリネームを開き、ファイル名用のテンプレートを選び、Naming Blocksの下にあるフォルダ設定で保存先を決めます。',
        '「仕分け」をオンにし、「請求書は会社別にまとめる」のようなルールを書くか、Autoを使う場合は空欄のままにします。',
        '提案された名前とフォルダを確認して適用し、設定をMonitor用のテンプレートに保存します。',
      ],
    },
    howTo: {
      name: 'AIでファイルをフォルダに仕分ける方法',
      description: 'MacまたはWindowsのZushで、ファイルを内容に応じて自動で、または普段の言葉で書いたルールでフォルダに仕分けます。',
      steps: [
        ['ファイルを追加してテンプレートを選ぶ', 'AIリネームを開き、テンプレートを選んで、さまざまなファイルが入ったフォルダを追加します。'],
        ['保存先を選ぶ', '仕分けたフォルダを作る場所を選ぶか、元の場所のままにします。'],
        ['フォルダルールを書く', '「仕分け」をオンにして分け方を書くか、Autoを使います。'],
        ['確認して適用する', '名前とフォルダを確認してから適用します。'],
      ],
    },
    featureList: ['MacとWindowsでファイルを内容ごとにフォルダへ仕分け', '普段の言葉で書くフォルダルールまたはAuto', '名前の変更と仕分けを1回の確認済みバッチで実行', '保存先の指定と既存フォルダの再利用', 'Monitorで新しいファイルを自動仕分け', 'LM StudioまたはOllamaによるローカルAI'],
    showcase: { folders: ['請求書', '領収書', 'スクリーンショット', '契約書', '動画', '会議'], files: ['請求書', '2026-06-03', '売上ダッシュボード', '賃貸契約書', '海辺の夕日', 'チーム会議 Q3ロードマップ'] },
    relatedPages: [
      { title: 'Mac版Zush', href: '/mac' },
      { title: 'Windows版Zush', href: '/windows' },
      { title: 'AIでPDFをリネーム', href: '/rename-pdf-with-ai' },
      { title: 'AIで写真をリネーム', href: '/rename-photos-with-ai' },
      { title: 'AIで書類をリネーム', href: '/rename-documents-with-ai' },
      { title: 'フォルダ仕分けのドキュメント', href: '/docs/folder-sorting' },
    ],
  },
  ko: {
    seo: {
      title: 'Mac·Windows용 AI 파일 분류기: 내 규칙대로 폴더 정리',
      description: 'Mac과 Windows에서 AI로 파일을 폴더별로 분류하세요. 폴더 규칙을 평소 말투로 쓰거나 Auto를 사용하면 Zush가 문서, 사진, 동영상을 읽고 이름을 붙여 정리합니다.',
    },
    h1: 'AI 파일 분류기: 내 규칙대로 파일을 폴더에 정리',
    accent: '내 규칙대로',
    definitionText: 'Zush는 Mac과 Windows용 AI 파일 분류기입니다. "청구서는 회사별로, 영수증은 월별로 묶기"처럼 원하는 폴더를 평소 말투로 설명하거나 Auto가 내용에 따라 묶게 하세요. Zush는 각 파일을 읽고 이름을 바꾼 뒤, 계획을 확인하면 알맞은 폴더로 옮깁니다.',
    faqTitle: '자주 묻는 질문',
    relatedToolsTitle: '관련 도구',
    relatedGuidesTitle: '관련 가이드',
    faqItems: [
      { question: 'AI 파일 분류기란 무엇인가요?', answer: 'AI 파일 분류기는 확장자나 파일 이름이 아니라 파일 내용을 읽고 알맞은 폴더로 옮기는 도구입니다. Zush는 PDF, 스캔, 사진, 스크린샷, 문서, 동영상, 오디오를 읽고 폴더를 제안하며, 같은 검토 배치에서 각 파일의 이름도 바꿉니다.' },
      { question: '분류 방법을 내 말로 Zush에 알려줄 수 있나요?', answer: '네. "청구서는 회사별로, 영수증은 월별로 묶고 월 폴더 이름은 YYYY-MM으로"처럼 폴더 규칙을 최대 2,000자까지 평소 말투로 쓸 수 있습니다. 비워 두면 Auto가 내용에 따라 몇 개의 넓은 폴더로 묶습니다. 조건식, 정규식, 스크립트는 필요 없습니다.' },
      { question: '이미 있는 폴더도 사용하나요?', answer: '네. "기존 폴더 재사용"을 켜면 Zush는 대상 위치에 이미 있는 알맞은 폴더에 파일을 넣고, 맞는 폴더가 없을 때만 새 폴더를 만듭니다. 어느 폴더에도 맞지 않는 파일은 묶지 않고 이름만 바꿉니다.' },
      { question: '새 파일을 자동으로 분류할 수 있나요?', answer: '네. 대상 폴더와 폴더 규칙을 템플릿에 저장하고 다운로드나 스캐너 폴더 같은 모니터링 폴더에 지정하세요. 새 파일은 이름이 바뀌고 분류되며, Monitor는 이미 만든 폴더를 계속 사용합니다.' },
      { question: 'AI 폴더 분류는 Windows에서도 되나요?', answer: '네. Windows 10/11용 Zush에는 Mac 앱과 같은 대상 폴더, 폴더 분류, 기존 폴더 재사용, 폴더 규칙 설정이 있습니다. 템플릿은 Mac과 Windows 사이에서 내보내고 가져올 수 있습니다.' },
      { question: '오프라인으로 분류할 수 있나요?', answer: '네. LM Studio나 Ollama를 선택하면 파일 분석과 폴더 계획이 모두 컴퓨터에서 실행됩니다. 로컬 모드가 선택된 동안 Zush는 클라우드로 전환하지 않습니다.' },
      { question: 'AI가 파일을 옮겨도 안전한가요?', answer: 'Zush는 무엇이든 옮기기 전에 제안된 파일 이름과 폴더를 모두 보여줍니다. 폴더 이름을 바꾸거나 파일을 다른 그룹으로 옮길 수 있습니다. 실행 취소하면 파일이 원래 폴더와 원래 이름으로 돌아갑니다.' },
    ],
    directAnswerSection: {
      heading: '폴더 규칙은 한 번만, 정리는 Zush가',
      answer: 'Zush는 확장자가 아니라 파일 내용으로 분류합니다. 비서에게 부탁하듯 폴더 규칙을 쓰거나 비워 두고 Auto를 사용하세요. Zush는 각 파일을 분석해 이름과 폴더를 제안하고 확인을 기다립니다.',
      steps: [
        'AI 이름 변경을 열고 파일 이름용 템플릿을 고른 뒤 Naming Blocks 아래 폴더 설정에서 대상 위치를 정합니다.',
        '"분류"를 켜고 "청구서는 회사별로 묶기" 같은 규칙을 쓰거나, Auto를 쓰려면 규칙을 비워 둡니다.',
        '제안된 이름과 폴더를 확인해 적용하고, 설정을 Monitor용 템플릿에 저장합니다.',
      ],
    },
    howTo: {
      name: 'AI로 파일을 폴더별로 분류하는 방법',
      description: 'Mac 또는 Windows용 Zush로 파일을 내용에 따라 자동으로, 또는 평소 말투로 쓴 규칙대로 폴더에 분류합니다.',
      steps: [
        ['파일 추가 및 템플릿 선택', 'AI 이름 변경을 열고 템플릿을 고른 뒤 여러 종류의 파일이 든 폴더를 추가합니다.'],
        ['대상 위치 선택', '분류된 폴더를 만들 위치를 고르거나 원래 위치를 유지합니다.'],
        ['폴더 규칙 작성', '"분류"를 켜고 묶는 방법을 쓰거나 Auto를 사용합니다.'],
        ['확인 후 적용', '이름과 폴더를 확인한 뒤 적용합니다.'],
      ],
    },
    featureList: ['Mac과 Windows에서 파일을 내용별로 폴더에 분류', '평소 말투의 폴더 규칙 또는 Auto', '이름 변경과 분류를 한 번의 검토 배치로', '대상 위치 지정과 기존 폴더 재사용', 'Monitor로 새 파일 자동 분류', 'LM Studio 또는 Ollama로 로컬 AI'],
    showcase: { folders: ['청구서', '영수증', '스크린샷', '계약서', '동영상', '회의'], files: ['청구서', '2026-06-03', '매출 대시보드', '임대 계약서', '해변 일몰', '팀 회의 Q3 로드맵'] },
    relatedPages: [
      { title: 'Mac용 Zush', href: '/mac' },
      { title: 'Windows용 Zush', href: '/windows' },
      { title: 'AI로 PDF 이름 변경', href: '/rename-pdf-with-ai' },
      { title: 'AI로 사진 이름 변경', href: '/rename-photos-with-ai' },
      { title: 'AI로 문서 이름 변경', href: '/rename-documents-with-ai' },
      { title: '폴더 분류 문서', href: '/docs/folder-sorting' },
    ],
  },
  'zh-cn': {
    seo: {
      title: 'Mac 和 Windows AI 文件分类工具：按你的规则整理文件夹',
      description: '在 Mac 和 Windows 上用 AI 把文件分类到文件夹。用日常语言描述文件夹，或使用 Auto。Zush 会读取、重命名并归档每个文档、照片和视频。',
    },
    h1: 'AI 文件分类：按你的规则把文件整理进文件夹',
    accent: '按你的规则',
    definitionText: 'Zush 是适用于 Mac 和 Windows 的 AI 文件分类工具。用日常语言描述你想要的文件夹，例如“按公司归类发票，按月份归类收据”，或让 Auto 按内容自动分组。Zush 会读取每个文件、重命名，并在你确认计划后移入合适的文件夹。',
    faqTitle: '常见问题',
    relatedToolsTitle: '相关工具',
    relatedGuidesTitle: '相关指南',
    faqItems: [
      { question: '什么是 AI 文件分类工具？', answer: 'AI 文件分类工具会读取每个文件的内容并把它移到合适的文件夹，而不是按扩展名或文件名排序。Zush 可以读取 PDF、扫描件、照片、截图、文档、视频和音频，建议文件夹，并在同一个已确认的批次中为每个文件重命名。' },
      { question: '可以用自己的话告诉 Zush 如何分类吗？', answer: '可以。用日常语言编写最多 2,000 个字符的文件夹规则，例如“按公司归类发票，按月份归类收据，月份文件夹命名为 YYYY-MM”。留空时，Auto 会按内容把文件分到几个大类文件夹中。不需要条件、正则表达式或脚本。' },
      { question: 'Zush 会使用已有的文件夹吗？', answer: '会。开启“复用已有文件夹”后，Zush 会把文件放入目标位置中已有的合适文件夹，只有在都不合适时才新建文件夹。不适合任何文件夹的文件只会重命名，不会被分组。' },
      { question: 'Zush 能自动整理新文件吗？', answer: '能。把目标文件夹和文件夹规则保存到模板中，再分配给“下载”或扫描仪保存位置等受监控文件夹。新文件会被重命名并分类，Monitor 会继续使用它已创建的文件夹。' },
      { question: 'AI 文件夹分类支持 Windows 吗？', answer: '支持。Windows 10 和 11 版 Zush 拥有与 Mac 版相同的目标文件夹、文件夹分类、复用已有文件夹和文件夹规则设置。模板可以在 Mac 和 Windows 之间导出和导入。' },
      { question: '可以离线分类文件吗？', answer: '可以。选择 LM Studio 或 Ollama 后，文件分析和文件夹规划都在你的电脑上运行。选择本地模式时，Zush 不会切换到云端。' },
      { question: '让 AI 移动文件安全吗？', answer: 'Zush 会在移动任何文件之前显示所有建议的文件名和文件夹。你可以重命名文件夹，或把文件移到其他分组。撤销会把文件移回原文件夹并恢复原文件名。' },
    ],
    directAnswerSection: {
      heading: '文件夹规则写一次，归档交给 Zush',
      answer: 'Zush 按文件内容分类，而不是按扩展名。像给助理交代工作一样编写文件夹规则，或留空使用 Auto。Zush 会分析每个文件，建议名称和文件夹，并等待你确认。',
      steps: [
        '打开 AI 重命名，为文件名选择模板，并在 Naming Blocks 下方的文件夹控件中设置目标位置。',
        '开启“分类”，写一条规则，例如“按公司归类发票”，或留空以使用 Auto。',
        '检查建议的名称和文件夹后应用批次，并把设置保存为供 Monitor 使用的模板。',
      ],
    },
    howTo: {
      name: '用 AI 把文件分类到文件夹',
      description: '在 Mac 或 Windows 上使用 Zush，按内容自动分类文件，或按你用日常语言写的规则分类。',
      steps: [
        ['添加文件并选择模板', '打开 AI 重命名，选择模板，并添加一个包含各类文件的文件夹。'],
        ['选择目标位置', '选择在哪里创建分类文件夹，或保留原位置。'],
        ['编写文件夹规则', '开启“分类”并描述分组方式，或使用 Auto。'],
        ['检查并应用', '确认名称和文件夹后应用批次。'],
      ],
    },
    featureList: ['在 Mac 和 Windows 上按内容把文件分类到文件夹', '日常语言文件夹规则或 Auto', '在同一个已确认批次中重命名并分类', '选择目标位置并复用已有文件夹', '通过 Monitor 自动分类新文件', '使用 LM Studio 或 Ollama 的本地 AI'],
    showcase: { folders: ['发票', '收据', '截图', '合同', '视频', '会议'], files: ['发票', '2026-06-03', '收入仪表板', '租赁合同', '海滩日落', '团队会议 Q3 路线图'] },
    relatedPages: [
      { title: 'Mac 版 Zush', href: '/mac' },
      { title: 'Windows 版 Zush', href: '/windows' },
      { title: '用 AI 重命名 PDF', href: '/rename-pdf-with-ai' },
      { title: '用 AI 重命名照片', href: '/rename-photos-with-ai' },
      { title: '用 AI 重命名文档', href: '/rename-documents-with-ai' },
      { title: '文件夹分类文档', href: '/docs/folder-sorting' },
    ],
  },
  ar: {
    seo: {
      title: 'فرز الملفات بالذكاء الاصطناعي على Mac وWindows بقواعدك',
      description: 'افرز الملفات في مجلدات بالذكاء الاصطناعي على Mac وWindows. صف المجلدات بلغتك العادية أو استخدم Auto، وسيقرأ Zush كل مستند وصورة وفيديو ويعيد تسميته ويحفظه في مكانه.',
    },
    h1: 'فرز الملفات بالذكاء الاصطناعي: رتّب الملفات في مجلدات بقواعدك الخاصة',
    accent: 'بقواعدك الخاصة',
    definitionText: 'Zush تطبيق لفرز الملفات بالذكاء الاصطناعي على Mac وWindows. صف المجلدات التي تريدها بلغتك العادية، مثل «جمّع الفواتير حسب الشركة والإيصالات حسب الشهر»، أو دع وضع Auto يجمعها حسب المحتوى. يقرأ Zush كل ملف ويعيد تسميته وينقله إلى المجلد المناسب بعد مراجعتك للخطة.',
    faqTitle: 'الأسئلة الشائعة',
    relatedToolsTitle: 'أدوات ذات صلة',
    relatedGuidesTitle: 'أدلة ذات صلة',
    faqItems: [
      { question: 'ما المقصود بفرز الملفات بالذكاء الاصطناعي؟', answer: 'يقرأ فرز الملفات بالذكاء الاصطناعي محتوى كل ملف وينقله إلى مجلد مناسب، بدلًا من الفرز حسب الامتداد أو الاسم. يقرأ Zush ملفات PDF والمستندات الممسوحة ضوئيًا والصور ولقطات الشاشة والمستندات والفيديو والصوت، ويقترح المجلدات ويعيد تسمية كل ملف في الدفعة نفسها بعد مراجعتها.' },
      { question: 'هل يمكنني أن أشرح لـZush طريقة الفرز بكلماتي؟', answer: 'نعم. اكتب قواعد المجلدات بلغتك العادية بما يصل إلى 2000 حرف، مثل «جمّع الفواتير حسب الشركة والإيصالات حسب الشهر، وسمِّ مجلدات الأشهر بصيغة YYYY-MM». وإذا تركت الحقل فارغًا، يجمع وضع Auto الملفات حسب المحتوى في عدد قليل من المجلدات العامة. لا حاجة إلى شروط أو تعبيرات نمطية أو نصوص برمجية.' },
      { question: 'هل يستخدم Zush المجلدات الموجودة؟', answer: 'نعم. عند تفعيل «إعادة استخدام المجلدات الموجودة»، يطابق Zush الملفات مع المجلدات المناسبة الموجودة في الوجهة، ولا ينشئ مجلدًا جديدًا إلا إذا لم يناسبها أي مجلد. أما الملفات التي لا يناسبها أي مجلد فتُعاد تسميتها دون تجميع.' },
      { question: 'هل يمكن لـZush فرز الملفات الجديدة تلقائيًا؟', answer: 'نعم. احفظ الوجهة وقواعد المجلدات في قالب، ثم عيّنه لمجلد مراقَب مثل التنزيلات أو مجلد الماسح الضوئي. تُعاد تسمية الملفات الجديدة وتُفرز، ويواصل Monitor استخدام المجلدات التي أنشأها من قبل.' },
      { question: 'هل يعمل فرز المجلدات بالذكاء الاصطناعي على Windows؟', answer: 'نعم. يتضمن Zush لنظامي Windows 10 و11 الإعدادات نفسها الموجودة في تطبيق Mac: مجلد الوجهة وفرز المجلدات وإعادة استخدام المجلدات وقواعد المجلدات. ويمكن تصدير القوالب واستيرادها بين Mac وWindows.' },
      { question: 'هل يمكنني فرز الملفات دون اتصال بالإنترنت؟', answer: 'نعم. عند اختيار LM Studio أو Ollama، يعمل تحليل الملفات وتخطيط المجلدات على جهازك. ولا ينتقل Zush إلى السحابة ما دام الوضع المحلي محددًا.' },
      { question: 'هل من الآمن أن يترك المرء الذكاء الاصطناعي ينقل ملفاته؟', answer: 'يعرض Zush كل اسم ملف ومجلد مقترح قبل نقل أي شيء. يمكنك إعادة تسمية مجلد أو نقل ملف إلى مجموعة أخرى. ويعيد التراجع الملف إلى مجلده الأصلي باسمه الأصلي.' },
    ],
    directAnswerSection: {
      heading: 'صف مجلداتك مرة واحدة ودع Zush يتولى الترتيب',
      answer: 'يفرز Zush الملفات حسب محتواها لا حسب امتدادها. اكتب قواعد المجلدات كما لو كنت توجّه مساعدًا، أو اترك الحقل فارغًا لاستخدام Auto. يحلل Zush كل ملف ويقترح اسمًا ومجلدًا وينتظر مراجعتك.',
      steps: [
        'افتح إعادة التسمية بالذكاء الاصطناعي، واختر قالبًا لأسماء الملفات، وحدد الوجهة من عنصر التحكم بالمجلد أسفل Naming Blocks.',
        'فعّل «فرز» واكتب قاعدة مثل «جمّع الفواتير حسب الشركة»، أو اترك القواعد فارغة لاستخدام Auto.',
        'راجع الأسماء والمجلدات المقترحة وطبّق الدفعة، ثم احفظ الإعدادات في قالب لاستخدامه مع Monitor.',
      ],
    },
    howTo: {
      name: 'فرز الملفات في مجلدات بالذكاء الاصطناعي',
      description: 'استخدم Zush على Mac أو Windows لفرز الملفات حسب محتواها تلقائيًا أو وفق قواعد تكتبها بلغتك العادية.',
      steps: [
        ['أضف الملفات واختر قالبًا', 'افتح إعادة التسمية بالذكاء الاصطناعي واختر قالبًا وأضف مجلدًا يضم ملفات متنوعة.'],
        ['اختر الوجهة', 'حدد مكان إنشاء المجلدات المفروزة أو احتفظ بالموقع الأصلي.'],
        ['اكتب قواعد المجلدات', 'فعّل «فرز» وصف طريقة التجميع، أو استخدم Auto.'],
        ['راجع وطبّق', 'تحقق من الأسماء والمجلدات ثم طبّق الدفعة.'],
      ],
    },
    featureList: ['فرز الملفات حسب المحتوى في مجلدات على Mac وWindows', 'قواعد مجلدات بلغة عادية أو وضع Auto', 'إعادة التسمية والفرز في دفعة واحدة بعد المراجعة', 'اختيار الوجهة وإعادة استخدام المجلدات الموجودة', 'فرز الملفات الجديدة تلقائيًا عبر Monitor', 'ذكاء اصطناعي محلي عبر LM Studio أو Ollama'],
    showcase: { folders: ['الفواتير', 'الإيصالات', 'لقطات الشاشة', 'العقود', 'الفيديو', 'الاجتماعات'], files: ['فاتورة', '2026-06-03', 'لوحة الإيرادات', 'عقد إيجار', 'غروب على الشاطئ', 'اجتماع الفريق خطة الربع الثالث'] },
    relatedPages: [
      { title: 'Zush لنظام Mac', href: '/mac' },
      { title: 'Zush لنظام Windows', href: '/windows' },
      { title: 'إعادة تسمية ملفات PDF بالذكاء الاصطناعي', href: '/rename-pdf-with-ai' },
      { title: 'إعادة تسمية الصور بالذكاء الاصطناعي', href: '/rename-photos-with-ai' },
      { title: 'إعادة تسمية المستندات بالذكاء الاصطناعي', href: '/rename-documents-with-ai' },
      { title: 'وثائق فرز المجلدات', href: '/docs/folder-sorting' },
    ],
  },
};
