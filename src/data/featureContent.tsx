import {
  Camera,
  Palette,
  Megaphone,
  Code,
  Video,
  Briefcase,
  FileText,
  GraduationCap,
  Scale,
  Building2,
  Image,
  Monitor,
} from 'lucide-react';
import type { UseCaseData } from '@/components/UseCases/UseCases';
import type { Locale } from '@/i18n/config';

export type FeatureCategory = 'general' | 'image' | 'document' | 'screenshot' | 'photo' | 'pdf';

// ---------- USE CASES PER CATEGORY ----------

const imageUseCases: UseCaseData[] = [
  {
    icon: Camera,
    title: 'Photographers',
    description: (
      <>
        Replace <strong>IMG_4382.jpg</strong> with meaningful scene descriptions.
        Supports <strong>RAW formats</strong> like CR2, NEF, ARW, DNG, and more.
      </>
    ),
    color: 'blue',
  },
  {
    icon: Palette,
    title: 'UI/UX Designers',
    description: (
      <>
        Screenshots of competitor apps, design references, and mockup iterations —
        all named by <strong>what they show</strong>, not when they were taken.
      </>
    ),
    color: 'purple',
  },
  {
    icon: Megaphone,
    title: 'Social Media Managers',
    description: (
      <>
        Campaign visuals, ad creatives, and post assets —
        <strong> instantly searchable</strong> by content instead of cryptic filenames.
      </>
    ),
    color: 'orange',
  },
  {
    icon: Video,
    title: 'Content Creators',
    description: (
      <>
        Thumbnails, b-roll stills, and visual references —
        find the <strong>right image</strong> without scrolling through hundreds.
      </>
    ),
    color: 'pink',
  },
  {
    icon: Code,
    title: 'Developers',
    description: (
      <>
        Bug screenshots, PR review captures, and documentation images —
        <strong> always labeled</strong> by the issue or feature they document.
      </>
    ),
    color: 'green',
  },
  {
    icon: Image,
    title: 'Stock Photo Curators',
    description: (
      <>
        Bulk-rename stock libraries with <strong>SEO-friendly descriptive names</strong> that
        help images rank in search and are easier to license.
      </>
    ),
    color: 'cyan',
  },
];

const documentUseCases: UseCaseData[] = [
  {
    icon: Scale,
    title: 'Legal Teams',
    description: (
      <>
        Contracts, NDAs, and compliance filings — renamed by
        <strong> parties, date, and document type</strong> for fast retrieval.
      </>
    ),
    color: 'purple',
  },
  {
    icon: Building2,
    title: 'Finance & Accounting',
    description: (
      <>
        Invoices, receipts, bank statements, and tax forms — AI reads the content and
        <strong> names them by vendor, amount, and period</strong>.
      </>
    ),
    color: 'blue',
  },
  {
    icon: Briefcase,
    title: 'Project Managers',
    description: (
      <>
        SOWs, project plans, meeting minutes, and status reports —
        <strong> instantly findable</strong> by project name and document type.
      </>
    ),
    color: 'orange',
  },
  {
    icon: GraduationCap,
    title: 'Students & Researchers',
    description: (
      <>
        Research papers, lecture notes, and study guides — renamed by
        <strong> subject, author, and topic</strong> instead of "download (14).pdf".
      </>
    ),
    color: 'green',
  },
  {
    icon: FileText,
    title: 'HR & Recruiting',
    description: (
      <>
        Resumes, offer letters, and onboarding docs — AI extracts
        <strong> candidate names and roles</strong> for organized hiring pipelines.
      </>
    ),
    color: 'pink',
  },
  {
    icon: Monitor,
    title: 'IT & Operations',
    description: (
      <>
        System logs, configuration exports, and runbooks —
        <strong> labeled by system, date, and action</strong> for fast incident response.
      </>
    ),
    color: 'cyan',
  },
];

const pdfUseCases: UseCaseData[] = [
  {
    icon: Building2,
    title: 'Invoice folders',
    description: (
      <>
        Rename vendor invoices by <strong>supplier, invoice date, and billing period</strong> so accounting folders sort cleanly.
      </>
    ),
    color: 'blue',
  },
  {
    icon: Scale,
    title: 'Contracts & NDAs',
    description: (
      <>
        Turn legal PDFs into names with <strong>counterparty, agreement type, status, and date</strong> instead of "signed.pdf".
      </>
    ),
    color: 'purple',
  },
  {
    icon: Briefcase,
    title: 'Client paperwork',
    description: (
      <>
        Proposals, scopes, creative briefs, and approvals stay searchable by
        <strong> client, project, and document role</strong>.
      </>
    ),
    color: 'orange',
  },
  {
    icon: GraduationCap,
    title: 'Scans & research PDFs',
    description: (
      <>
        Scanned letters, articles, and forms get names based on
        <strong> visible page content</strong>, even when the file has no useful title.
      </>
    ),
    color: 'green',
  },
  {
    icon: FileText,
    title: 'Receipts & reimbursements',
    description: (
      <>
        Save expense PDFs as <strong>merchant, purchase type, and date</strong> for fast reimbursement review.
      </>
    ),
    color: 'pink',
  },
  {
    icon: Monitor,
    title: 'Statements & tax records',
    description: (
      <>
        Bank statements, insurance policies, and tax forms are labeled by
        <strong> institution, form type, and period</strong>.
      </>
    ),
    color: 'cyan',
  },
];

const screenshotUseCases: UseCaseData[] = [
  {
    icon: Code,
    title: 'Developers',
    description: (
      <>
        Bug reports, error logs, and UI states — renamed from
        <strong> "Screenshot 2026-03-15"</strong> to what the screenshot actually shows.
      </>
    ),
    color: 'green',
  },
  {
    icon: Palette,
    title: 'Designers',
    description: (
      <>
        Competitor analysis, design inspiration, and review captures —
        <strong> named by app, screen, and context</strong> automatically.
      </>
    ),
    color: 'purple',
  },
  {
    icon: Megaphone,
    title: 'Marketers',
    description: (
      <>
        Analytics dashboards, ad performance captures, and social proof —
        <strong> searchable by campaign and metric</strong>.
      </>
    ),
    color: 'orange',
  },
  {
    icon: Briefcase,
    title: 'Product Managers',
    description: (
      <>
        Feature specs, user feedback captures, and competitive screenshots —
        <strong> organized by product and feature</strong>.
      </>
    ),
    color: 'cyan',
  },
  {
    icon: GraduationCap,
    title: 'Students',
    description: (
      <>
        Lecture slides, research screenshots, and reference captures —
        <strong> named by subject and topic</strong> for easy exam prep.
      </>
    ),
    color: 'blue',
  },
  {
    icon: Video,
    title: 'Content Creators',
    description: (
      <>
        Tutorial captures, before/after comparisons, and tool demos —
        <strong> labeled by step and context</strong> for video production.
      </>
    ),
    color: 'pink',
  },
];

const photoUseCases: UseCaseData[] = [
  {
    icon: Camera,
    title: 'Professional Photographers',
    description: (
      <>
        Wedding galleries, event shoots, and portrait sessions — AI describes each photo's
        <strong> subject, scene, and composition</strong> for client delivery.
      </>
    ),
    color: 'blue',
  },
  {
    icon: Palette,
    title: 'Product Photographers',
    description: (
      <>
        E-commerce product shots, lifestyle images, and detail angles —
        <strong> named by product, angle, and variant</strong> for catalog uploads.
      </>
    ),
    color: 'purple',
  },
  {
    icon: Video,
    title: 'Travel Bloggers',
    description: (
      <>
        Travel photos organized by <strong>location, landmark, and scene</strong> —
        no more guessing which IMG_ is which destination.
      </>
    ),
    color: 'orange',
  },
  {
    icon: Building2,
    title: 'Real Estate Agents',
    description: (
      <>
        Property photos named by <strong>room, feature, and address</strong> —
        ready for MLS listings without manual sorting.
      </>
    ),
    color: 'green',
  },
  {
    icon: Megaphone,
    title: 'Social Media Managers',
    description: (
      <>
        Campaign photos and brand assets — AI names each by
        <strong> content and style</strong> for quick posting.
      </>
    ),
    color: 'pink',
  },
  {
    icon: Image,
    title: 'Photo Archivists',
    description: (
      <>
        Historical photos and family archives — <strong>descriptive names</strong> that
        preserve context for future generations.
      </>
    ),
    color: 'cyan',
  },
];

// ---------- CATEGORY LOOKUP ----------

const useCasesMap: Record<FeatureCategory, { title: string; description: string; items: UseCaseData[] }> = {
  general: {
    title: 'Who Uses AI File Renaming',
    description: 'From designers to developers — Zush saves hours for everyone who works with files',
    items: [], // uses default
  },
  image: {
    title: 'Who Uses AI Image Renaming',
    description: 'Photographers, designers, and creators who need searchable image libraries',
    items: imageUseCases,
  },
  document: {
    title: 'Who Uses AI Document Renaming',
    description: 'Legal teams, accountants, and managers who handle hundreds of documents daily',
    items: documentUseCases,
  },
  pdf: {
    title: 'Who Uses AI PDF Renaming',
    description: 'People who need searchable invoices, contracts, scans, statements, and receipts',
    items: pdfUseCases,
  },
  screenshot: {
    title: 'Who Uses AI Screenshot Renaming',
    description: 'Developers, designers, and PMs who take dozens of screenshots every day',
    items: screenshotUseCases,
  },
  photo: {
    title: 'Who Uses AI Photo Renaming',
    description: 'Photographers and creators who need organized, searchable photo libraries',
    items: photoUseCases,
  },
};

type LocalizedCategoryUseCases = {
  title: string;
  description: string;
  items: Array<{ title: string; description: string }>;
};

const categoryItemMeta: Record<Exclude<FeatureCategory, 'general'>, Array<Pick<UseCaseData, 'icon' | 'color'>>> = {
  image: [
    { icon: Camera, color: 'blue' },
    { icon: Palette, color: 'purple' },
    { icon: Megaphone, color: 'orange' },
    { icon: Video, color: 'pink' },
    { icon: Code, color: 'green' },
    { icon: Image, color: 'cyan' },
  ],
  document: [
    { icon: Scale, color: 'purple' },
    { icon: Building2, color: 'blue' },
    { icon: Briefcase, color: 'orange' },
    { icon: GraduationCap, color: 'green' },
    { icon: FileText, color: 'pink' },
    { icon: Monitor, color: 'cyan' },
  ],
  pdf: [
    { icon: Building2, color: 'blue' },
    { icon: Scale, color: 'purple' },
    { icon: Briefcase, color: 'orange' },
    { icon: GraduationCap, color: 'green' },
    { icon: FileText, color: 'pink' },
    { icon: Monitor, color: 'cyan' },
  ],
  screenshot: [
    { icon: Code, color: 'green' },
    { icon: Palette, color: 'purple' },
    { icon: Megaphone, color: 'orange' },
    { icon: Briefcase, color: 'cyan' },
    { icon: GraduationCap, color: 'blue' },
    { icon: Video, color: 'pink' },
  ],
  photo: [
    { icon: Camera, color: 'blue' },
    { icon: Palette, color: 'purple' },
    { icon: Video, color: 'orange' },
    { icon: Building2, color: 'green' },
    { icon: Megaphone, color: 'pink' },
    { icon: Image, color: 'cyan' },
  ],
};

const localizedUseCaseCopy: Partial<Record<Locale, Partial<Record<FeatureCategory, LocalizedCategoryUseCases>>>> = {
  de: {
    image: {
      title: 'Wer KI-Bildumbenennung nutzt',
      description: 'Fotografen, Designer und Creator, die durchsuchbare Bildbibliotheken brauchen',
      items: [
        { title: 'Fotografen', description: 'Ersetze IMG_4382.jpg durch beschreibende Szenennamen. Unterstützt RAW-Formate wie CR2, NEF, ARW, DNG und mehr.' },
        { title: 'UI/UX-Designer', description: 'Screenshots von Wettbewerbern, Referenzen und Mockups werden nach Inhalt benannt, nicht nach Aufnahmezeit.' },
        { title: 'Social-Media-Manager', description: 'Kampagnenbilder, Anzeigenmotive und Assets werden sofort über ihren Inhalt auffindbar.' },
        { title: 'Content Creator', description: 'Thumbnails, B-Roll-Standbilder und visuelle Referenzen sind ohne endloses Scrollen auffindbar.' },
        { title: 'Entwickler', description: 'Bug-Screenshots, PR-Captures und Doku-Bilder werden nach Issue oder Feature benannt.' },
        { title: 'Stockfoto-Kuratoren', description: 'Benenne Stock-Bibliotheken mit SEO-freundlichen Namen, die Suche und Lizenzierung erleichtern.' },
      ],
    },
    document: {
      title: 'Wer KI-Dokumentumbenennung nutzt',
      description: 'Juristische Teams, Buchhaltung und Manager mit hunderten Dokumenten pro Woche',
      items: [
        { title: 'Legal Teams', description: 'Verträge, NDAs und Compliance-Dateien werden nach Parteien, Datum und Dokumenttyp benannt.' },
        { title: 'Finanzen & Buchhaltung', description: 'Rechnungen, Belege, Kontoauszüge und Steuerformulare erhalten Namen aus dem tatsächlichen Inhalt.' },
        { title: 'Projektmanager', description: 'SOWs, Projektpläne, Meetingnotizen und Statusberichte bleiben nach Projekt und Dokumenttyp auffindbar.' },
        { title: 'Studierende & Forschung', description: 'Papers, Vorlesungsnotizen und Lernmaterialien werden nach Fach, Autor und Thema benannt.' },
        { title: 'HR & Recruiting', description: 'Lebensläufe, Angebote und Onboarding-Dokumente werden nach Kandidat und Rolle sortierbar.' },
        { title: 'IT & Operations', description: 'Logs, Konfigurationsexporte und Runbooks werden nach System, Datum und Aktion benannt.' },
      ],
    },
    pdf: {
      title: 'Wer KI-PDF-Umbenennung nutzt',
      description: 'Teams, die Rechnungen, Verträge, Scans, Auszüge und Belege schnell wiederfinden müssen',
      items: [
        { title: 'Rechnungsordner', description: 'Rechnungen werden nach Anbieter, Rechnungsdatum und Zeitraum benannt, damit Buchhaltung sortierbar bleibt.' },
        { title: 'Verträge & NDAs', description: 'Juristische PDFs bekommen Namen mit Gegenpartei, Vertragstyp, Status und Datum statt signed.pdf.' },
        { title: 'Kundenunterlagen', description: 'Angebote, Scopes, Briefings und Freigaben bleiben nach Kunde, Projekt und Dokumentrolle auffindbar.' },
        { title: 'Scans & Research-PDFs', description: 'Gescannte Briefe, Artikel und Formulare werden nach sichtbarem Seiteninhalt benannt.' },
        { title: 'Belege & Erstattungen', description: 'Ausgaben-PDFs werden nach Händler, Kaufart und Datum für schnelle Erstattungsprüfung gespeichert.' },
        { title: 'Auszüge & Steuerunterlagen', description: 'Bankauszüge, Policen und Steuerformulare erhalten Namen mit Institut, Formularart und Zeitraum.' },
      ],
    },
    screenshot: {
      title: 'Wer KI-Screenshot-Umbenennung nutzt',
      description: 'Entwickler, Designer und PMs, die täglich viele Screenshots aufnehmen',
      items: [
        { title: 'Entwickler', description: 'Bugreports, Fehlerlogs und UI-Zustände werden nach dem sichtbaren Problem benannt.' },
        { title: 'Designer', description: 'Wettbewerbsanalyse, Inspiration und Review-Captures werden nach App, Screen und Kontext benannt.' },
        { title: 'Marketer', description: 'Analytics-Dashboards, Anzeigenleistung und Social Proof bleiben nach Kampagne und Metrik auffindbar.' },
        { title: 'Produktmanager', description: 'Specs, Nutzerfeedback und Wettbewerbs-Screenshots werden nach Produkt und Feature organisiert.' },
        { title: 'Studierende', description: 'Folien, Recherche-Screenshots und Referenzen werden nach Fach und Thema benannt.' },
        { title: 'Content Creator', description: 'Tutorial-Captures, Vorher-nachher-Vergleiche und Tool-Demos werden nach Schritt und Kontext benannt.' },
      ],
    },
    photo: {
      title: 'Wer KI-Fotoumbenennung nutzt',
      description: 'Fotografen und Creator, die organisierte und durchsuchbare Fotobibliotheken brauchen',
      items: [
        { title: 'Professionelle Fotografen', description: 'Hochzeiten, Events und Porträts erhalten Namen nach Motiv, Szene und Komposition.' },
        { title: 'Produktfotografen', description: 'E-Commerce-Bilder, Lifestyle-Shots und Detailansichten werden nach Produkt, Winkel und Variante benannt.' },
        { title: 'Reiseblogger', description: 'Reisefotos werden nach Ort, Landmarke und Szene organisiert, statt IMG_-Nummern zu durchsuchen.' },
        { title: 'Immobilienmakler', description: 'Objektfotos werden nach Raum, Merkmal und Adresse benannt und sind bereit für Listings.' },
        { title: 'Social-Media-Manager', description: 'Kampagnenfotos und Markenassets erhalten Namen nach Inhalt und Stil für schnellere Planung.' },
        { title: 'Fotoarchivare', description: 'Historische Fotos und Familienarchive bekommen beschreibende Namen, die Kontext bewahren.' },
      ],
    },
  },
  fr: {
    image: {
      title: 'Qui utilise le renommage d’images par IA',
      description: 'Photographes, designers et créateurs qui ont besoin de bibliothèques d’images recherchables',
      items: [
        { title: 'Photographes', description: 'Remplacez IMG_4382.jpg par des noms de scène utiles. Compatible avec les RAW comme CR2, NEF, ARW, DNG et plus.' },
        { title: 'Designers UI/UX', description: 'Captures concurrentes, références et itérations de maquettes sont nommées selon ce qu’elles montrent.' },
        { title: 'Social media managers', description: 'Visuels de campagne, créations publicitaires et assets deviennent retrouvables par leur contenu.' },
        { title: 'Créateurs de contenu', description: 'Miniatures, images de b-roll et références visuelles se retrouvent sans parcourir des centaines de fichiers.' },
        { title: 'Développeurs', description: 'Captures de bugs, revues PR et images de documentation sont liées au problème ou à la fonctionnalité.' },
        { title: 'Curateurs de photos stock', description: 'Renommez des bibliothèques stock avec des noms descriptifs utiles pour le SEO et la recherche.' },
      ],
    },
    document: {
      title: 'Qui utilise le renommage de documents par IA',
      description: 'Équipes juridiques, comptables et managers qui traitent beaucoup de documents',
      items: [
        { title: 'Équipes juridiques', description: 'Contrats, NDA et dossiers de conformité sont nommés par parties, date et type de document.' },
        { title: 'Finance & comptabilité', description: 'Factures, reçus, relevés et formulaires fiscaux prennent un nom basé sur leur contenu.' },
        { title: 'Chefs de projet', description: 'SOW, plans, comptes rendus et rapports restent retrouvables par projet et type.' },
        { title: 'Étudiants & chercheurs', description: 'Articles, notes de cours et supports d’étude sont nommés par sujet, auteur et thème.' },
        { title: 'RH & recrutement', description: 'CV, offres et documents d’onboarding sont triés par candidat et poste.' },
        { title: 'IT & opérations', description: 'Logs, exports de configuration et runbooks sont nommés par système, date et action.' },
      ],
    },
    pdf: {
      title: 'Qui utilise le renommage de PDF par IA',
      description: 'Ceux qui doivent retrouver vite factures, contrats, scans, relevés et reçus',
      items: [
        { title: 'Dossiers de factures', description: 'Les factures sont nommées par fournisseur, date et période pour garder la comptabilité triable.' },
        { title: 'Contrats & NDA', description: 'Les PDF juridiques incluent contrepartie, type d’accord, statut et date au lieu de signed.pdf.' },
        { title: 'Documents client', description: 'Propositions, scopes, briefs et validations restent recherchables par client, projet et rôle.' },
        { title: 'Scans & PDF de recherche', description: 'Lettres, articles et formulaires scannés sont nommés selon le contenu visible de la page.' },
        { title: 'Reçus & remboursements', description: 'Les PDF de dépenses sont enregistrés par marchand, type d’achat et date.' },
        { title: 'Relevés & dossiers fiscaux', description: 'Relevés bancaires, assurances et formulaires fiscaux sont nommés par institution, type et période.' },
      ],
    },
    screenshot: {
      title: 'Qui utilise le renommage de screenshots par IA',
      description: 'Développeurs, designers et PM qui prennent des dizaines de captures chaque jour',
      items: [
        { title: 'Développeurs', description: 'Bugs, logs d’erreur et états UI sont renommés selon ce que la capture montre vraiment.' },
        { title: 'Designers', description: 'Analyse concurrente, inspiration et captures de review sont nommées par app, écran et contexte.' },
        { title: 'Marketeurs', description: 'Dashboards analytics, performances publicitaires et preuves sociales restent recherchables.' },
        { title: 'Product managers', description: 'Specs, retours utilisateurs et captures concurrentes sont organisés par produit et fonctionnalité.' },
        { title: 'Étudiants', description: 'Slides, captures de recherche et références sont nommées par matière et sujet.' },
        { title: 'Créateurs de contenu', description: 'Captures de tutoriel, comparaisons et démos d’outils sont nommées par étape et contexte.' },
      ],
    },
    photo: {
      title: 'Qui utilise le renommage de photos par IA',
      description: 'Photographes et créateurs qui veulent des photothèques organisées et recherchables',
      items: [
        { title: 'Photographes professionnels', description: 'Mariages, événements et portraits sont décrits par sujet, scène et composition.' },
        { title: 'Photographes produit', description: 'Photos e-commerce, lifestyle et détails sont nommés par produit, angle et variante.' },
        { title: 'Blogueurs voyage', description: 'Les photos de voyage sont organisées par lieu, monument et scène.' },
        { title: 'Agents immobiliers', description: 'Les photos de biens sont nommées par pièce, caractéristique et adresse.' },
        { title: 'Social media managers', description: 'Photos de campagne et assets de marque sont nommés par contenu et style.' },
        { title: 'Archivistes photo', description: 'Photos historiques et archives familiales conservent leur contexte grâce à des noms descriptifs.' },
      ],
    },
  },
  'pt-br': {
    image: {
      title: 'Quem usa renomeação de imagens com IA',
      description: 'Fotógrafos, designers e criadores que precisam de bibliotecas pesquisáveis',
      items: [
        { title: 'Fotógrafos', description: 'Troque IMG_4382.jpg por nomes de cena úteis. Suporta RAW como CR2, NEF, ARW, DNG e mais.' },
        { title: 'Designers UI/UX', description: 'Screenshots de concorrentes, referências e mockups ganham nomes pelo que mostram.' },
        { title: 'Social media managers', description: 'Visuais de campanha, criativos e assets ficam pesquisáveis pelo conteúdo.' },
        { title: 'Criadores de conteúdo', description: 'Thumbnails, frames de b-roll e referências visuais aparecem sem rolar centenas de arquivos.' },
        { title: 'Desenvolvedores', description: 'Screenshots de bugs, reviews de PR e imagens de documentação recebem nomes pelo issue ou recurso.' },
        { title: 'Curadores de stock photo', description: 'Renomeie bibliotecas com nomes descritivos e úteis para SEO e licenciamento.' },
      ],
    },
    document: {
      title: 'Quem usa renomeação de documentos com IA',
      description: 'Times jurídicos, contábeis e gestores que lidam com muitos documentos',
      items: [
        { title: 'Times jurídicos', description: 'Contratos, NDAs e compliance são nomeados por partes, data e tipo de documento.' },
        { title: 'Financeiro & contabilidade', description: 'Notas, recibos, extratos e impostos ganham nomes pelo conteúdo real.' },
        { title: 'Gerentes de projeto', description: 'SOWs, planos, atas e relatórios ficam pesquisáveis por projeto e tipo.' },
        { title: 'Estudantes & pesquisadores', description: 'Artigos, notas e materiais de estudo são nomeados por disciplina, autor e tópico.' },
        { title: 'RH & recrutamento', description: 'Currículos, propostas e onboarding ficam organizados por candidato e cargo.' },
        { title: 'TI & operações', description: 'Logs, exports de configuração e runbooks são nomeados por sistema, data e ação.' },
      ],
    },
    pdf: {
      title: 'Quem usa renomeação de PDF com IA',
      description: 'Pessoas que precisam encontrar notas, contratos, scans, extratos e recibos',
      items: [
        { title: 'Pastas de notas', description: 'Notas e faturas são nomeadas por fornecedor, data e período para ordenar a contabilidade.' },
        { title: 'Contratos & NDAs', description: 'PDFs jurídicos ganham contraparte, tipo de acordo, status e data em vez de signed.pdf.' },
        { title: 'Documentos de cliente', description: 'Propostas, escopos, briefings e aprovações ficam pesquisáveis por cliente, projeto e função.' },
        { title: 'Scans & PDFs de pesquisa', description: 'Cartas, artigos e formulários escaneados são nomeados pelo conteúdo visível.' },
        { title: 'Recibos & reembolsos', description: 'PDFs de despesas são salvos por loja, tipo de compra e data.' },
        { title: 'Extratos & impostos', description: 'Extratos bancários, seguros e formulários fiscais são nomeados por instituição, tipo e período.' },
      ],
    },
    screenshot: {
      title: 'Quem usa renomeação de screenshots com IA',
      description: 'Desenvolvedores, designers e PMs que capturam muitas telas todos os dias',
      items: [
        { title: 'Desenvolvedores', description: 'Bugs, logs de erro e estados de UI são nomeados pelo que aparece na tela.' },
        { title: 'Designers', description: 'Análise competitiva, inspiração e reviews são nomeados por app, tela e contexto.' },
        { title: 'Marketing', description: 'Dashboards, performance de anúncios e social proof ficam pesquisáveis por campanha e métrica.' },
        { title: 'Product managers', description: 'Specs, feedbacks e screenshots competitivos ficam organizados por produto e recurso.' },
        { title: 'Estudantes', description: 'Slides, pesquisa e referências são nomeados por matéria e tema.' },
        { title: 'Criadores de conteúdo', description: 'Tutoriais, comparações e demos são nomeados por etapa e contexto.' },
      ],
    },
    photo: {
      title: 'Quem usa renomeação de fotos com IA',
      description: 'Fotógrafos e criadores que precisam de bibliotecas organizadas e pesquisáveis',
      items: [
        { title: 'Fotógrafos profissionais', description: 'Casamentos, eventos e retratos recebem nomes por assunto, cena e composição.' },
        { title: 'Fotógrafos de produto', description: 'Fotos de e-commerce, lifestyle e detalhes são nomeadas por produto, ângulo e variante.' },
        { title: 'Blogueiros de viagem', description: 'Fotos de viagem são organizadas por local, ponto turístico e cena.' },
        { title: 'Corretores imobiliários', description: 'Fotos de imóveis são nomeadas por cômodo, recurso e endereço.' },
        { title: 'Social media managers', description: 'Fotos de campanha e assets de marca recebem nomes por conteúdo e estilo.' },
        { title: 'Arquivistas de fotos', description: 'Fotos históricas e acervos familiares ganham nomes que preservam contexto.' },
      ],
    },
  },
  es: {
    image: {
      title: 'Quién usa renombrado de imágenes con IA',
      description: 'Fotógrafos, diseñadores y creadores que necesitan bibliotecas de imágenes buscables',
      items: [
        { title: 'Fotógrafos', description: 'Cambia IMG_4382.jpg por nombres de escena útiles. Soporta RAW como CR2, NEF, ARW, DNG y más.' },
        { title: 'Diseñadores UI/UX', description: 'Capturas de competidores, referencias y mockups se nombran por lo que muestran.' },
        { title: 'Social media managers', description: 'Visuales de campaña, anuncios y assets quedan buscables por contenido.' },
        { title: 'Creadores de contenido', description: 'Thumbnails, frames de b-roll y referencias visuales aparecen sin revisar cientos de archivos.' },
        { title: 'Desarrolladores', description: 'Capturas de bugs, revisiones PR y documentación se nombran por issue o funcionalidad.' },
        { title: 'Curadores de stock photo', description: 'Renombra bibliotecas con nombres descriptivos útiles para SEO, búsqueda y licencias.' },
      ],
    },
    document: {
      title: 'Quién usa renombrado de documentos con IA',
      description: 'Equipos legales, contables y managers que manejan muchos documentos',
      items: [
        { title: 'Equipos legales', description: 'Contratos, NDAs y compliance se nombran por partes, fecha y tipo de documento.' },
        { title: 'Finanzas & contabilidad', description: 'Facturas, recibos, estados y formularios fiscales toman nombres desde su contenido.' },
        { title: 'Project managers', description: 'SOWs, planes, minutas e informes quedan buscables por proyecto y tipo.' },
        { title: 'Estudiantes & investigadores', description: 'Papers, apuntes y guías se nombran por materia, autor y tema.' },
        { title: 'RRHH & recruiting', description: 'CVs, ofertas y onboarding se organizan por candidato y rol.' },
        { title: 'IT & operaciones', description: 'Logs, exports de configuración y runbooks se nombran por sistema, fecha y acción.' },
      ],
    },
    pdf: {
      title: 'Quién usa renombrado de PDF con IA',
      description: 'Personas que necesitan encontrar facturas, contratos, scans, estados y recibos',
      items: [
        { title: 'Carpetas de facturas', description: 'Las facturas se nombran por proveedor, fecha y periodo para ordenar contabilidad.' },
        { title: 'Contratos & NDAs', description: 'Los PDFs legales incluyen contraparte, tipo de acuerdo, estado y fecha en lugar de signed.pdf.' },
        { title: 'Papeles de clientes', description: 'Propuestas, alcances, briefs y aprobaciones quedan buscables por cliente, proyecto y rol.' },
        { title: 'Scans & PDFs de investigación', description: 'Cartas, artículos y formularios escaneados se nombran según el contenido visible.' },
        { title: 'Recibos & reembolsos', description: 'PDFs de gastos se guardan por comercio, tipo de compra y fecha.' },
        { title: 'Estados & impuestos', description: 'Estados bancarios, seguros y formularios fiscales se nombran por institución, tipo y periodo.' },
      ],
    },
    screenshot: {
      title: 'Quién usa renombrado de capturas con IA',
      description: 'Desarrolladores, diseñadores y PMs que toman muchas capturas cada día',
      items: [
        { title: 'Desarrolladores', description: 'Bugs, logs de error y estados UI se renombran según lo que muestra la captura.' },
        { title: 'Diseñadores', description: 'Análisis competitivo, inspiración y reviews se nombran por app, pantalla y contexto.' },
        { title: 'Marketers', description: 'Dashboards, anuncios y social proof quedan buscables por campaña y métrica.' },
        { title: 'Product managers', description: 'Specs, feedback y capturas competitivas se organizan por producto y funcionalidad.' },
        { title: 'Estudiantes', description: 'Diapositivas, investigación y referencias se nombran por asignatura y tema.' },
        { title: 'Creadores de contenido', description: 'Tutoriales, comparaciones y demos se nombran por paso y contexto.' },
      ],
    },
    photo: {
      title: 'Quién usa renombrado de fotos con IA',
      description: 'Fotógrafos y creadores que necesitan bibliotecas organizadas y buscables',
      items: [
        { title: 'Fotógrafos profesionales', description: 'Bodas, eventos y retratos reciben nombres por sujeto, escena y composición.' },
        { title: 'Fotógrafos de producto', description: 'Fotos e-commerce, lifestyle y detalles se nombran por producto, ángulo y variante.' },
        { title: 'Bloggers de viaje', description: 'Las fotos de viaje se organizan por lugar, punto de interés y escena.' },
        { title: 'Agentes inmobiliarios', description: 'Fotos de propiedades se nombran por habitación, característica y dirección.' },
        { title: 'Social media managers', description: 'Fotos de campaña y assets de marca se nombran por contenido y estilo.' },
        { title: 'Archivistas fotográficos', description: 'Fotos históricas y familiares ganan nombres que preservan contexto.' },
      ],
    },
  },
  nl: {
    image: {
      title: 'Wie AI-afbeeldingen hernoemen gebruikt',
      description: 'Fotografen, designers en makers die doorzoekbare beeldbibliotheken nodig hebben',
      items: [
        { title: 'Fotografen', description: 'Vervang IMG_4382.jpg door betekenisvolle scenenamen. Ondersteunt RAW zoals CR2, NEF, ARW en DNG.' },
        { title: 'UI/UX-designers', description: 'Concurrentiescreenshots, referenties en mockups krijgen namen op basis van wat ze tonen.' },
        { title: 'Social media managers', description: 'Campagnebeelden, advertenties en assets worden vindbaar op inhoud.' },
        { title: 'Contentmakers', description: 'Thumbnails, b-roll stills en visuele referenties zijn te vinden zonder eindeloos scrollen.' },
        { title: 'Developers', description: 'Bugshots, PR-captures en documentatiebeelden worden genoemd naar issue of feature.' },
        { title: 'Stockfoto-curatoren', description: 'Hernoem stockbibliotheken met SEO-vriendelijke namen die zoeken en licenties makkelijker maken.' },
      ],
    },
    document: {
      title: 'Wie AI-documenten hernoemen gebruikt',
      description: 'Juridische teams, accountants en managers met veel documenten',
      items: [
        { title: 'Juridische teams', description: 'Contracten, NDAs en compliancebestanden worden genoemd naar partijen, datum en type.' },
        { title: 'Finance & accounting', description: 'Facturen, bonnen, afschriften en belastingformulieren krijgen namen vanuit de inhoud.' },
        { title: 'Projectmanagers', description: 'SOWs, plannen, notulen en rapporten blijven vindbaar per project en documenttype.' },
        { title: 'Studenten & onderzoekers', description: 'Papers, colleges en studiemateriaal krijgen namen per vak, auteur en onderwerp.' },
        { title: 'HR & recruitment', description: 'CVs, aanbiedingen en onboardingdocs worden sorteerbaar per kandidaat en rol.' },
        { title: 'IT & operations', description: 'Logs, configuratie-exports en runbooks worden genoemd naar systeem, datum en actie.' },
      ],
    },
    pdf: {
      title: 'Wie AI-PDFs hernoemen gebruikt',
      description: 'Mensen die facturen, contracten, scans, afschriften en bonnen snel moeten vinden',
      items: [
        { title: 'Factuurmappen', description: 'Facturen worden genoemd naar leverancier, datum en periode zodat boekhouding sorteerbaar blijft.' },
        { title: 'Contracten & NDAs', description: 'Juridische PDFs krijgen tegenpartij, overeenkomsttype, status en datum in plaats van signed.pdf.' },
        { title: 'Klantdocumenten', description: 'Voorstellen, scopes, briefs en goedkeuringen blijven vindbaar per klant, project en rol.' },
        { title: 'Scans & research-PDFs', description: 'Gescande brieven, artikelen en formulieren worden genoemd naar zichtbare pagina-inhoud.' },
        { title: 'Bonnen & declaraties', description: 'Uitgaven-PDFs worden opgeslagen per winkel, aankooptype en datum.' },
        { title: 'Afschriften & belasting', description: 'Bankafschriften, polissen en belastingformulieren krijgen instelling, type en periode.' },
      ],
    },
    screenshot: {
      title: 'Wie AI-screenshots hernoemen gebruikt',
      description: 'Developers, designers en PMs die dagelijks veel screenshots maken',
      items: [
        { title: 'Developers', description: 'Bugreports, foutlogs en UI-states worden genoemd naar wat de screenshot toont.' },
        { title: 'Designers', description: 'Concurrentieanalyse, inspiratie en reviewcaptures krijgen app, scherm en context.' },
        { title: 'Marketeers', description: 'Analyticsdashboards, advertentieprestaties en social proof blijven vindbaar.' },
        { title: 'Productmanagers', description: 'Specs, feedback en competitieve screenshots worden per product en feature georganiseerd.' },
        { title: 'Studenten', description: 'Slides, researchscreenshots en referenties krijgen vak en onderwerp.' },
        { title: 'Contentmakers', description: 'Tutorialcaptures, vergelijkingen en tooldemo’s worden genoemd naar stap en context.' },
      ],
    },
    photo: {
      title: 'Wie AI-fotos hernoemen gebruikt',
      description: 'Fotografen en makers die georganiseerde, doorzoekbare fotobibliotheken nodig hebben',
      items: [
        { title: 'Professionele fotografen', description: 'Bruiloften, events en portretten krijgen namen per onderwerp, scène en compositie.' },
        { title: 'Productfotografen', description: 'E-commercebeelden, lifestyle en details worden genoemd naar product, hoek en variant.' },
        { title: 'Reisbloggers', description: 'Reisfoto’s worden georganiseerd per locatie, landmark en scène.' },
        { title: 'Makelaars', description: 'Vastgoedfoto’s krijgen kamer, kenmerk en adres en zijn klaar voor listings.' },
        { title: 'Social media managers', description: 'Campagnefoto’s en merkassets worden genoemd naar inhoud en stijl.' },
        { title: 'Fotoarchivarissen', description: 'Historische en familiebeelden krijgen namen die context bewaren.' },
      ],
    },
  },
  it: {
    image: {
      title: 'Chi usa la rinomina immagini con IA',
      description: 'Fotografi, designer e creator che hanno bisogno di librerie immagini ricercabili',
      items: [
        { title: 'Fotografi', description: 'Sostituisci IMG_4382.jpg con nomi descrittivi. Supporta RAW come CR2, NEF, ARW, DNG e altri.' },
        { title: 'Designer UI/UX', description: 'Screenshot competitor, riferimenti e mockup vengono nominati in base a ciò che mostrano.' },
        { title: 'Social media manager', description: 'Visual di campagna, creatività e asset diventano ricercabili per contenuto.' },
        { title: 'Content creator', description: 'Thumbnail, frame b-roll e riferimenti visivi si trovano senza scorrere centinaia di file.' },
        { title: 'Sviluppatori', description: 'Screenshot di bug, review PR e immagini docs vengono collegati a issue o feature.' },
        { title: 'Curatori stock photo', description: 'Rinomina librerie stock con nomi descrittivi utili per SEO, ricerca e licenze.' },
      ],
    },
    document: {
      title: 'Chi usa la rinomina documenti con IA',
      description: 'Team legali, contabili e manager che gestiscono molti documenti',
      items: [
        { title: 'Team legali', description: 'Contratti, NDA e compliance vengono nominati per parti, data e tipo documento.' },
        { title: 'Finanza e contabilità', description: 'Fatture, ricevute, estratti e moduli fiscali prendono nomi dal contenuto reale.' },
        { title: 'Project manager', description: 'SOW, piani, verbali e report restano ricercabili per progetto e tipo.' },
        { title: 'Studenti e ricercatori', description: 'Paper, appunti e materiali studio vengono nominati per materia, autore e tema.' },
        { title: 'HR & recruiting', description: 'CV, offerte e documenti onboarding sono organizzati per candidato e ruolo.' },
        { title: 'IT & operations', description: 'Log, export configurazione e runbook vengono nominati per sistema, data e azione.' },
      ],
    },
    pdf: {
      title: 'Chi usa la rinomina PDF con IA',
      description: 'Chi deve trovare fatture, contratti, scansioni, estratti e ricevute',
      items: [
        { title: 'Cartelle fatture', description: 'Le fatture vengono nominate per fornitore, data e periodo per ordinare la contabilità.' },
        { title: 'Contratti & NDA', description: 'I PDF legali includono controparte, tipo accordo, stato e data invece di signed.pdf.' },
        { title: 'Documenti cliente', description: 'Proposte, scope, brief e approvazioni restano ricercabili per cliente, progetto e ruolo.' },
        { title: 'Scansioni & PDF ricerca', description: 'Lettere, articoli e moduli scansionati vengono nominati dal contenuto visibile.' },
        { title: 'Ricevute & rimborsi', description: 'PDF spese salvati per esercente, tipo acquisto e data.' },
        { title: 'Estratti & tasse', description: 'Estratti bancari, polizze e moduli fiscali nominati per istituto, tipo e periodo.' },
      ],
    },
    screenshot: {
      title: 'Chi usa la rinomina screenshot con IA',
      description: 'Sviluppatori, designer e PM che catturano molti screenshot ogni giorno',
      items: [
        { title: 'Sviluppatori', description: 'Bug report, log errori e stati UI vengono rinominati in base a ciò che si vede.' },
        { title: 'Designer', description: 'Analisi competitor, ispirazione e review vengono nominati per app, schermata e contesto.' },
        { title: 'Marketer', description: 'Dashboard analytics, performance ads e social proof restano ricercabili.' },
        { title: 'Product manager', description: 'Spec, feedback e screenshot competitor organizzati per prodotto e feature.' },
        { title: 'Studenti', description: 'Slide, ricerca e riferimenti vengono nominati per materia e tema.' },
        { title: 'Content creator', description: 'Tutorial, confronti e demo tool nominati per step e contesto.' },
      ],
    },
    photo: {
      title: 'Chi usa la rinomina foto con IA',
      description: 'Fotografi e creator che vogliono librerie foto organizzate e ricercabili',
      items: [
        { title: 'Fotografi professionisti', description: 'Matrimoni, eventi e ritratti ricevono nomi per soggetto, scena e composizione.' },
        { title: 'Fotografi prodotto', description: 'Scatti e-commerce, lifestyle e dettagli nominati per prodotto, angolo e variante.' },
        { title: 'Travel blogger', description: 'Foto di viaggio organizzate per luogo, landmark e scena.' },
        { title: 'Agenti immobiliari', description: 'Foto immobili nominate per stanza, caratteristica e indirizzo.' },
        { title: 'Social media manager', description: 'Foto campagna e asset brand nominati per contenuto e stile.' },
        { title: 'Archivisti fotografici', description: 'Foto storiche e archivi familiari ottengono nomi che conservano contesto.' },
      ],
    },
  },
  ja: {
    image: {
      title: 'AI 画像リネームを使う人',
      description: '検索しやすい画像ライブラリが必要な写真家、デザイナー、クリエイター向け',
      items: [
        { title: '写真家', description: 'IMG_4382.jpg を意味のあるシーン名に変更。CR2、NEF、ARW、DNG などの RAW に対応します。' },
        { title: 'UI/UX デザイナー', description: '競合アプリ、参考画像、モックアップのスクリーンショットを内容ベースで命名します。' },
        { title: 'SNS 担当者', description: 'キャンペーン画像、広告クリエイティブ、投稿素材を内容で検索しやすくします。' },
        { title: 'コンテンツクリエイター', description: 'サムネイル、B ロールの静止画、参考素材を大量の中からすぐ探せます。' },
        { title: '開発者', description: 'バグ画像、PR レビュー、ドキュメント画像を issue や機能に紐づく名前にします。' },
        { title: 'ストック写真管理者', description: 'SEO とライセンス検索に役立つ説明的な名前で素材ライブラリを整理します。' },
      ],
    },
    document: {
      title: 'AI 文書リネームを使う人',
      description: '大量の文書を扱う法務、経理、マネージャー向け',
      items: [
        { title: '法務チーム', description: '契約書、NDA、コンプライアンス文書を当事者、日付、文書種別で命名します。' },
        { title: '財務・経理', description: '請求書、領収書、明細、税務書類を実際の内容に基づいて整理します。' },
        { title: 'プロジェクトマネージャー', description: 'SOW、計画書、議事録、レポートをプロジェクト名と文書種別で探せます。' },
        { title: '学生・研究者', description: '論文、講義ノート、学習資料を科目、著者、トピックで命名します。' },
        { title: '人事・採用', description: '履歴書、オファー、オンボーディング文書を候補者と職種で整理します。' },
        { title: 'IT・運用', description: 'ログ、設定エクスポート、Runbook をシステム、日付、操作で命名します。' },
      ],
    },
    pdf: {
      title: 'AI PDF リネームを使う人',
      description: '請求書、契約書、スキャン、明細、領収書をすばやく探したい人向け',
      items: [
        { title: '請求書フォルダ', description: '請求書を取引先、請求日、期間で命名し、経理フォルダを並べやすくします。' },
        { title: '契約書・NDA', description: 'signed.pdf ではなく、相手先、契約種別、状態、日付を含む名前にします。' },
        { title: 'クライアント書類', description: '提案書、スコープ、ブリーフ、承認書を顧客、プロジェクト、役割で検索できます。' },
        { title: 'スキャン・研究 PDF', description: 'スキャンした手紙、記事、フォームを見えるページ内容から命名します。' },
        { title: '領収書・精算', description: '経費 PDF を店舗、購入種別、日付で保存し、確認しやすくします。' },
        { title: '明細・税務記録', description: '銀行明細、保険、税務フォームを機関、種類、期間で命名します。' },
      ],
    },
    screenshot: {
      title: 'AI スクリーンショットリネームを使う人',
      description: '毎日多くのスクリーンショットを撮る開発者、デザイナー、PM 向け',
      items: [
        { title: '開発者', description: 'バグ報告、エラーログ、UI 状態をスクリーンに見える内容で命名します。' },
        { title: 'デザイナー', description: '競合分析、参考画面、レビュー用キャプチャをアプリ、画面、文脈で整理します。' },
        { title: 'マーケター', description: '分析画面、広告実績、ソーシャルプルーフをキャンペーンや指標で探せます。' },
        { title: 'プロダクトマネージャー', description: '仕様、ユーザーフィードバック、競合画面を製品と機能で整理します。' },
        { title: '学生', description: '講義スライド、調査画像、参考資料を科目とトピックで命名します。' },
        { title: 'コンテンツクリエイター', description: 'チュートリアル、比較、ツールデモを手順と文脈で命名します。' },
      ],
    },
    photo: {
      title: 'AI 写真リネームを使う人',
      description: '整理され検索しやすい写真ライブラリが必要な写真家とクリエイター向け',
      items: [
        { title: 'プロ写真家', description: '結婚式、イベント、ポートレートを被写体、シーン、構図で命名します。' },
        { title: '商品写真家', description: 'EC 商品写真、ライフスタイル画像、詳細カットを商品、角度、バリエーションで整理します。' },
        { title: '旅行ブロガー', description: '旅行写真を場所、ランドマーク、シーンで整理します。' },
        { title: '不動産エージェント', description: '物件写真を部屋、特徴、住所で命名し、掲載準備を簡単にします。' },
        { title: 'SNS 担当者', description: 'キャンペーン写真とブランド素材を内容とスタイルで命名します。' },
        { title: '写真アーカイブ担当', description: '歴史写真や家族写真に文脈が残る説明的な名前を付けます。' },
      ],
    },
  },
  ko: {
    image: {
      title: 'AI 이미지 이름 변경을 쓰는 사람',
      description: '검색 가능한 이미지 라이브러리가 필요한 사진가, 디자이너, 크리에이터',
      items: [
        { title: '사진가', description: 'IMG_4382.jpg를 의미 있는 장면 이름으로 바꿉니다. CR2, NEF, ARW, DNG 같은 RAW도 지원합니다.' },
        { title: 'UI/UX 디자이너', description: '경쟁 앱, 레퍼런스, 목업 스크린샷을 보이는 내용 기준으로 이름 짓습니다.' },
        { title: '소셜 미디어 매니저', description: '캠페인 이미지, 광고 소재, 게시물 자산을 내용으로 바로 찾을 수 있습니다.' },
        { title: '콘텐츠 크리에이터', description: '썸네일, b-roll 스틸, 시각 자료를 수백 개 파일 속에서 빠르게 찾습니다.' },
        { title: '개발자', description: '버그 스크린샷, PR 리뷰, 문서 이미지를 이슈나 기능 기준으로 정리합니다.' },
        { title: '스톡 사진 큐레이터', description: 'SEO와 라이선스 검색에 유리한 설명형 이름으로 라이브러리를 정리합니다.' },
      ],
    },
    document: {
      title: 'AI 문서 이름 변경을 쓰는 사람',
      description: '많은 문서를 다루는 법무, 회계, 관리자 팀',
      items: [
        { title: '법무팀', description: '계약서, NDA, 컴플라이언스 파일을 당사자, 날짜, 문서 유형으로 이름 짓습니다.' },
        { title: '재무 & 회계', description: '송장, 영수증, 명세서, 세금 양식을 실제 내용 기준으로 정리합니다.' },
        { title: '프로젝트 매니저', description: 'SOW, 계획서, 회의록, 상태 보고서를 프로젝트와 문서 유형으로 찾습니다.' },
        { title: '학생 & 연구자', description: '논문, 강의 노트, 학습 자료를 과목, 저자, 주제로 이름 짓습니다.' },
        { title: 'HR & 채용', description: '이력서, 오퍼, 온보딩 문서를 후보자와 역할 기준으로 정리합니다.' },
        { title: 'IT & 운영', description: '로그, 설정 export, runbook을 시스템, 날짜, 작업으로 이름 짓습니다.' },
      ],
    },
    pdf: {
      title: 'AI PDF 이름 변경을 쓰는 사람',
      description: '송장, 계약서, 스캔, 명세서, 영수증을 빠르게 찾아야 하는 사람',
      items: [
        { title: '송장 폴더', description: '송장을 공급업체, 날짜, 청구 기간으로 이름 지어 회계 폴더를 정렬하기 쉽게 합니다.' },
        { title: '계약서 & NDA', description: 'signed.pdf 대신 상대방, 계약 유형, 상태, 날짜가 들어간 이름을 만듭니다.' },
        { title: '고객 문서', description: '제안서, 범위, 브리프, 승인 문서를 고객, 프로젝트, 역할로 찾을 수 있습니다.' },
        { title: '스캔 & 연구 PDF', description: '스캔한 편지, 기사, 양식을 보이는 페이지 내용 기준으로 이름 짓습니다.' },
        { title: '영수증 & 환급', description: '지출 PDF를 상점, 구매 유형, 날짜로 저장해 검토를 빠르게 합니다.' },
        { title: '명세서 & 세금 기록', description: '은행 명세서, 보험, 세금 양식을 기관, 유형, 기간으로 이름 짓습니다.' },
      ],
    },
    screenshot: {
      title: 'AI 스크린샷 이름 변경을 쓰는 사람',
      description: '매일 많은 스크린샷을 찍는 개발자, 디자이너, PM',
      items: [
        { title: '개발자', description: '버그 리포트, 에러 로그, UI 상태를 화면에 보이는 내용 기준으로 이름 짓습니다.' },
        { title: '디자이너', description: '경쟁 분석, 디자인 영감, 리뷰 캡처를 앱, 화면, 맥락으로 정리합니다.' },
        { title: '마케터', description: '분석 대시보드, 광고 성과, 소셜 proof를 캠페인과 지표로 찾습니다.' },
        { title: '프로덕트 매니저', description: '스펙, 사용자 피드백, 경쟁 스크린샷을 제품과 기능으로 정리합니다.' },
        { title: '학생', description: '강의 슬라이드, 리서치 캡처, 참고 자료를 과목과 주제로 이름 짓습니다.' },
        { title: '콘텐츠 크리에이터', description: '튜토리얼 캡처, 비교 이미지, 도구 데모를 단계와 맥락으로 이름 짓습니다.' },
      ],
    },
    photo: {
      title: 'AI 사진 이름 변경을 쓰는 사람',
      description: '정리되고 검색 가능한 사진 라이브러리가 필요한 사진가와 크리에이터',
      items: [
        { title: '전문 사진가', description: '웨딩, 이벤트, 인물 사진을 피사체, 장면, 구도로 이름 짓습니다.' },
        { title: '제품 사진가', description: '이커머스 사진, 라이프스타일 컷, 디테일 컷을 제품, 각도, 옵션으로 정리합니다.' },
        { title: '여행 블로거', description: '여행 사진을 장소, 랜드마크, 장면으로 정리합니다.' },
        { title: '부동산 중개인', description: '매물 사진을 방, 특징, 주소로 이름 지어 listing 준비를 쉽게 합니다.' },
        { title: '소셜 미디어 매니저', description: '캠페인 사진과 브랜드 자산을 내용과 스타일로 이름 짓습니다.' },
        { title: '사진 아카이브 담당', description: '역사 사진과 가족 아카이브에 맥락이 남는 설명형 이름을 붙입니다.' },
      ],
    },
  },
  'zh-cn': {
    image: {
      title: '谁会使用 AI 图片重命名',
      description: '适合需要可搜索图片库的摄影师、设计师和内容创作者',
      items: [
        { title: '摄影师', description: '把 IMG_4382.jpg 改成有意义的场景名称。支持 CR2、NEF、ARW、DNG 等 RAW 格式。' },
        { title: 'UI/UX 设计师', description: '竞品截图、设计参考和 mockup 版本按画面内容命名，而不是按时间命名。' },
        { title: '社媒运营', description: '活动视觉、广告素材和帖子资产可以按内容快速搜索。' },
        { title: '内容创作者', description: '缩略图、b-roll 静帧和视觉参考不再需要在大量文件中翻找。' },
        { title: '开发者', description: 'Bug 截图、PR review 画面和文档图片会按问题或功能命名。' },
        { title: '图库管理者', description: '用更适合 SEO 和授权检索的描述性名称整理 stock 图片库。' },
      ],
    },
    document: {
      title: '谁会使用 AI 文档重命名',
      description: '适合法务、财务和需要处理大量文档的管理者',
      items: [
        { title: '法务团队', description: '合同、NDA 和合规文件按参与方、日期和文档类型命名。' },
        { title: '财务与会计', description: '发票、收据、银行账单和税务表单按真实内容生成文件名。' },
        { title: '项目经理', description: 'SOW、项目计划、会议纪要和状态报告按项目和文档类型检索。' },
        { title: '学生与研究者', description: '论文、课堂笔记和学习资料按科目、作者和主题命名。' },
        { title: 'HR 与招聘', description: '简历、offer 和入职文件按候选人和岗位整理。' },
        { title: 'IT 与运营', description: '日志、配置导出和 runbook 按系统、日期和操作命名。' },
      ],
    },
    pdf: {
      title: '谁会使用 AI PDF 重命名',
      description: '适合需要快速找到发票、合同、扫描件、账单和收据的人',
      items: [
        { title: '发票文件夹', description: '按供应商、发票日期和账期命名，让财务文件夹更容易排序。' },
        { title: '合同与 NDA', description: '把 signed.pdf 变成包含签约方、协议类型、状态和日期的名称。' },
        { title: '客户文件', description: '提案、范围说明、brief 和审批文件按客户、项目和文档角色搜索。' },
        { title: '扫描与研究 PDF', description: '扫描信件、文章和表单按页面可见内容命名。' },
        { title: '收据与报销', description: '支出 PDF 按商家、购买类型和日期保存，方便报销审核。' },
        { title: '账单与税务记录', description: '银行账单、保险和税务表单按机构、类型和周期命名。' },
      ],
    },
    screenshot: {
      title: '谁会使用 AI 截图重命名',
      description: '适合每天保存大量截图的开发者、设计师和产品经理',
      items: [
        { title: '开发者', description: 'Bug 报告、错误日志和 UI 状态会按截图实际显示的内容命名。' },
        { title: '设计师', description: '竞品分析、设计灵感和评审截图按 app、页面和上下文整理。' },
        { title: '营销人员', description: '数据看板、广告效果和 social proof 按活动和指标检索。' },
        { title: '产品经理', description: '规格、用户反馈和竞品截图按产品和功能组织。' },
        { title: '学生', description: '课件、研究截图和参考资料按科目和主题命名。' },
        { title: '内容创作者', description: '教程截图、对比图和工具演示按步骤和上下文命名。' },
      ],
    },
    photo: {
      title: '谁会使用 AI 照片重命名',
      description: '适合需要有序、可搜索照片库的摄影师和创作者',
      items: [
        { title: '专业摄影师', description: '婚礼、活动和肖像照片按主体、场景和构图命名。' },
        { title: '产品摄影师', description: '电商产品图、生活方式图和细节图按产品、角度和变体整理。' },
        { title: '旅行博主', description: '旅行照片按地点、地标和场景组织。' },
        { title: '房产经纪人', description: '房源照片按房间、特色和地址命名，方便发布 listing。' },
        { title: '社媒运营', description: '活动照片和品牌资产按内容和风格命名。' },
        { title: '照片档案管理者', description: '历史照片和家庭档案获得能保留上下文的描述性名称。' },
      ],
    },
  },
  ar: {
    image: {
      title: 'من يستخدم إعادة تسمية الصور بالذكاء الاصطناعي',
      description: 'مصورون ومصممون وصناع محتوى يحتاجون إلى مكتبات صور قابلة للبحث',
      items: [
        { title: 'المصورون', description: 'استبدل IMG_4382.jpg بأسماء تصف المشهد. يدعم صيغ RAW مثل CR2 وNEF وARW وDNG وغيرها.' },
        { title: 'مصممو UI/UX', description: 'لقطات تطبيقات المنافسين والمراجع ونماذج التصميم تُسمى بحسب ما تعرضه، لا بحسب وقت التقاطها.' },
        { title: 'مديرو الشبكات الاجتماعية', description: 'تصبح صور الحملات والإعلانات والأصول قابلة للبحث فورا بحسب محتواها بدلا من أسماء مبهمة.' },
        { title: 'صناع المحتوى', description: 'اعثر على الصور المصغرة ولقطات b-roll والمراجع المرئية دون التمرير بين مئات الملفات.' },
        { title: 'المطورون', description: 'لقطات الأخطاء ومراجعات PR وصور التوثيق تُسمى بحسب المشكلة أو الميزة التي توثقها.' },
        { title: 'منسقو الصور المخزنة', description: 'أعد تسمية مكتبات الصور المخزنة بأسماء وصفية مناسبة للبحث والترخيص وSEO.' },
      ],
    },
    document: {
      title: 'من يستخدم إعادة تسمية المستندات بالذكاء الاصطناعي',
      description: 'فرق قانونية ومحاسبون ومديرون يتعاملون مع مئات المستندات يوميا',
      items: [
        { title: 'الفرق القانونية', description: 'العقود وNDAs وملفات الامتثال تُسمى بحسب الأطراف والتاريخ ونوع المستند.' },
        { title: 'المالية والمحاسبة', description: 'الفواتير والإيصالات وكشوف الحساب ونماذج الضرائب يأخذها Zush من المحتوى الفعلي.' },
        { title: 'مديرو المشاريع', description: 'SOWs وخطط المشاريع ومحاضر الاجتماعات وتقارير الحالة تبقى قابلة للعثور عليها بحسب المشروع ونوع المستند.' },
        { title: 'الطلاب والباحثون', description: 'الأبحاث وملاحظات المحاضرات وأدلة الدراسة تُسمى بحسب المادة والمؤلف والموضوع بدلا من download (14).pdf.' },
        { title: 'الموارد البشرية والتوظيف', description: 'السير الذاتية وخطابات العرض ومستندات onboarding تُنظم بحسب أسماء المرشحين والأدوار.' },
        { title: 'تقنية المعلومات والعمليات', description: 'السجلات وتصديرات الإعدادات وrunbooks تُسمى بحسب النظام والتاريخ والإجراء لسرعة الاستجابة.' },
      ],
    },
    pdf: {
      title: 'من يستخدم إعادة تسمية PDF بالذكاء الاصطناعي',
      description: 'كل من يحتاج إلى العثور بسرعة على الفواتير والعقود والمسحات والكشوف والإيصالات',
      items: [
        { title: 'مجلدات الفواتير', description: 'أعد تسمية فواتير الموردين بحسب المورد وتاريخ الفاتورة وفترة الفوترة حتى تبقى مجلدات المحاسبة مرتبة.' },
        { title: 'العقود وNDAs', description: 'حوّل ملفات PDF القانونية إلى أسماء تتضمن الطرف المقابل ونوع الاتفاق والحالة والتاريخ بدلا من signed.pdf.' },
        { title: 'ملفات العملاء', description: 'العروض ونطاقات العمل والملخصات والموافقات تبقى قابلة للبحث بحسب العميل والمشروع ودور المستند.' },
        { title: 'المسحات وملفات البحث PDF', description: 'الرسائل والمقالات والنماذج الممسوحة تحصل على أسماء مبنية على محتوى الصفحة المرئي حتى دون عنوان مفيد.' },
        { title: 'الإيصالات والتعويضات', description: 'احفظ ملفات PDF الخاصة بالمصاريف بحسب التاجر ونوع الشراء والتاريخ لتسريع مراجعة التعويض.' },
        { title: 'الكشوف والسجلات الضريبية', description: 'كشوف البنوك ووثائق التأمين ونماذج الضرائب تُسمى بحسب المؤسسة ونوع النموذج والفترة.' },
      ],
    },
    screenshot: {
      title: 'من يستخدم إعادة تسمية لقطات الشاشة بالذكاء الاصطناعي',
      description: 'مطورو ومصممو ومديرو منتجات يلتقطون عشرات الصور يوميا',
      items: [
        { title: 'المطورون', description: 'تقارير الأخطاء وسجلات المشاكل وحالات الواجهة تُسمى بحسب ما تعرضه اللقطة فعليا.' },
        { title: 'المصممون', description: 'تحليل المنافسين وإلهام التصميم ولقطات المراجعة تُسمى بحسب التطبيق والشاشة والسياق.' },
        { title: 'المسوقون', description: 'لوحات التحليلات ونتائج الإعلانات وsocial proof تبقى قابلة للبحث بحسب الحملة والمؤشر.' },
        { title: 'مديرو المنتجات', description: 'المواصفات وملاحظات المستخدمين ولقطات المنافسين تُنظم بحسب المنتج والميزة.' },
        { title: 'الطلاب', description: 'شرائح المحاضرات ولقطات البحث والمراجع تُسمى بحسب المادة والموضوع لتسهيل المراجعة.' },
        { title: 'صناع المحتوى', description: 'لقطات الشرح والمقارنات قبل وبعد وعروض الأدوات تُسمى بحسب الخطوة والسياق للإنتاج.' },
      ],
    },
    photo: {
      title: 'من يستخدم إعادة تسمية الصور الفوتوغرافية بالذكاء الاصطناعي',
      description: 'مصورون وصناع محتوى يحتاجون إلى مكتبات صور منظمة وقابلة للبحث',
      items: [
        { title: 'المصورون المحترفون', description: 'حفلات الزفاف والفعاليات وجلسات البورتريه تحصل على أسماء بحسب الموضوع والمشهد والتكوين.' },
        { title: 'مصورون المنتجات', description: 'صور التجارة الإلكترونية والصور النمطية وزوايا التفاصيل تُسمى بحسب المنتج والزاوية والنسخة.' },
        { title: 'مدونو السفر', description: 'صور السفر تُنظم بحسب الموقع والمعلم والمشهد، دون تخمين أي ملف IMG_ يمثل أي وجهة.' },
        { title: 'وكلاء العقارات', description: 'صور العقارات تُسمى بحسب الغرفة والميزة والعنوان، وتصبح جاهزة للنشر دون فرز يدوي.' },
        { title: 'مديرو الشبكات الاجتماعية', description: 'صور الحملات وأصول العلامة تُسمى بحسب المحتوى والأسلوب لتسريع النشر.' },
        { title: 'أمناء أرشيف الصور', description: 'الصور التاريخية وأرشيف العائلة تحصل على أسماء وصفية تحفظ السياق للأجيال القادمة.' },
      ],
    },
  },
};

function withCategoryMeta(category: Exclude<FeatureCategory, 'general'>, copy: LocalizedCategoryUseCases) {
  const meta = categoryItemMeta[category];

  return {
    title: copy.title,
    description: copy.description,
    items: copy.items.map((item, index) => ({
      ...meta[index],
      ...item,
    })),
  };
}

export function getUseCasesForCategory(category: FeatureCategory, locale: Locale = 'en') {
  if (category !== 'general') {
    const localizedCopy = localizedUseCaseCopy[locale]?.[category];

    if (localizedCopy) {
      return withCategoryMeta(category, localizedCopy);
    }
  }

  return useCasesMap[category];
}
