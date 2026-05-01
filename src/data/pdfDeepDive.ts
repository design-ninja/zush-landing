import type { Locale } from '@/i18n/config';

export interface PdfDeepDiveCopy {
  workflowsEyebrow: string;
  workflowsTitle: string;
  workflowsIntro: string;
  recipes: Array<{
    title: string;
    before: string;
    after: string;
    detail: string;
  }>;
  comparisonEyebrow: string;
  comparisonTitle: string;
  comparisonIntro: string;
  comparisonRows: Array<{
    tool: string;
    bestFor: string;
    gap: string;
  }>;
}

const PDF_DEEP_DIVE_COPY: Record<Locale, PdfDeepDiveCopy> = {
  en: {
    workflowsEyebrow: 'PDF naming workflows',
    workflowsTitle: 'Built for invoices, contracts, scans, and statements',
    workflowsIntro:
      'PDF cleanup is different from renaming photos or screenshots. The useful filename is usually hidden in the document text: vendor names, counterparties, dates, form numbers, billing periods, and signatures.',
    recipes: [
      {
        title: 'Invoices',
        before: 'scan_001.pdf',
        after: 'Amazon Invoice 2026-03.pdf',
        detail: 'Vendor, document type, invoice period, and date keep accounting folders sortable.',
      },
      {
        title: 'Contracts',
        before: 'signed-final.pdf',
        after: 'Acme NDA Signed 2026-03-14.pdf',
        detail: 'Counterparty, agreement type, status, and date make legal PDFs easier to retrieve.',
      },
      {
        title: 'Statements',
        before: 'download (7).pdf',
        after: 'Chase Statement March 2026.pdf',
        detail: 'Institution and reporting period are pulled from the PDF instead of guessed from the download name.',
      },
      {
        title: 'Scanned receipts',
        before: 'IMG_20260310_scan.pdf',
        after: 'Home Depot Receipt March 10.pdf',
        detail: 'For image-only scans, AI vision reads visible page content when there is no embedded text layer.',
      },
    ],
    comparisonEyebrow: 'Workflow comparison',
    comparisonTitle: 'Where Zush fits next to Finder, Preview, and Adobe Acrobat',
    comparisonIntro:
      'Zush does not replace PDF readers or editors. It fills the repetitive filename step after PDFs are downloaded, scanned, signed, exported, or received by email.',
    comparisonRows: [
      {
        tool: 'Finder / File Explorer',
        bestFor: 'One-off manual renames',
        gap: 'You still have to open each PDF, read it, decide on a name, and repeat that for every file.',
      },
      {
        tool: 'Preview',
        bestFor: 'Reading, marking up, exporting, and signing PDFs on Mac',
        gap: 'Preview does not batch-generate content-aware filenames for invoices, contracts, scans, and statements.',
      },
      {
        tool: 'Adobe Acrobat',
        bestFor: 'OCR, editing, forms, signatures, and PDF review workflows',
        gap: 'Acrobat helps manage PDF content, but filename cleanup is still largely a separate manual workflow.',
      },
      {
        tool: 'Zush',
        bestFor: 'Turning weak PDF filenames into searchable document names',
        gap: 'Zush reads text layers or scanned pages, extracts entities and dates, then previews names before applying them.',
      },
    ],
  },
  de: {
    workflowsEyebrow: 'PDF-Namensworkflows',
    workflowsTitle: 'Gebaut für Rechnungen, Verträge, Scans und Kontoauszüge',
    workflowsIntro:
      'PDF-Aufräumen unterscheidet sich vom Umbenennen von Fotos oder Screenshots. Der nützliche Dateiname steckt meist im Dokumenttext: Anbieter, Vertragspartner, Daten, Formularnummern, Abrechnungszeiträume und Signaturen.',
    recipes: [
      {
        title: 'Rechnungen',
        before: 'scan_001.pdf',
        after: 'Amazon Rechnung 2026-03.pdf',
        detail: 'Anbieter, Dokumenttyp, Abrechnungszeitraum und Datum halten Buchhaltungsordner sortierbar.',
      },
      {
        title: 'Verträge',
        before: 'signed-final.pdf',
        after: 'Acme NDA Unterzeichnet 2026-03-14.pdf',
        detail: 'Gegenpartei, Vertragstyp, Status und Datum machen juristische PDFs leichter auffindbar.',
      },
      {
        title: 'Kontoauszüge',
        before: 'download (7).pdf',
        after: 'Chase Kontoauszug März 2026.pdf',
        detail: 'Institut und Berichtszeitraum kommen aus dem PDF statt aus dem Downloadnamen geraten zu werden.',
      },
      {
        title: 'Gescannte Belege',
        before: 'IMG_20260310_scan.pdf',
        after: 'Home Depot Beleg 10 März.pdf',
        detail: 'Bei Bildscans liest KI sichtbare Seiteninhalte, auch wenn keine eingebettete Textebene vorhanden ist.',
      },
    ],
    comparisonEyebrow: 'Workflow-Vergleich',
    comparisonTitle: 'Wo Zush neben Finder, Vorschau und Adobe Acrobat passt',
    comparisonIntro:
      'Zush ersetzt keine PDF-Reader oder Editoren. Es übernimmt den wiederholbaren Dateinamen-Schritt, nachdem PDFs geladen, gescannt, signiert, exportiert oder per E-Mail empfangen wurden.',
    comparisonRows: [
      {
        tool: 'Finder / Datei-Explorer',
        bestFor: 'Einzelne manuelle Umbenennungen',
        gap: 'Du musst jedes PDF öffnen, lesen, einen Namen festlegen und das für jede Datei wiederholen.',
      },
      {
        tool: 'Vorschau',
        bestFor: 'PDFs auf dem Mac lesen, markieren, exportieren und signieren',
        gap: 'Vorschau erzeugt keine inhaltsbewussten Batch-Dateinamen für Rechnungen, Verträge, Scans und Kontoauszüge.',
      },
      {
        tool: 'Adobe Acrobat',
        bestFor: 'OCR, Bearbeitung, Formulare, Signaturen und PDF-Reviews',
        gap: 'Acrobat hilft beim PDF-Inhalt, aber das Aufräumen der Dateinamen bleibt meist ein separater manueller Schritt.',
      },
      {
        tool: 'Zush',
        bestFor: 'Schwache PDF-Dateinamen in durchsuchbare Dokumentnamen verwandeln',
        gap: 'Zush liest Textebenen oder gescannte Seiten, erkennt Namen und Daten und zeigt neue Dateinamen vor dem Anwenden an.',
      },
    ],
  },
  fr: {
    workflowsEyebrow: 'Workflows de noms PDF',
    workflowsTitle: 'Pensé pour factures, contrats, scans et relevés',
    workflowsIntro:
      'Nettoyer des PDF n’est pas comme renommer des photos ou des captures. Le bon nom se cache souvent dans le texte du document : fournisseurs, parties, dates, numéros de formulaire, périodes et signatures.',
    recipes: [
      {
        title: 'Factures',
        before: 'scan_001.pdf',
        after: 'Facture Amazon 2026-03.pdf',
        detail: 'Fournisseur, type de document, période et date gardent les dossiers comptables faciles à trier.',
      },
      {
        title: 'Contrats',
        before: 'signed-final.pdf',
        after: 'NDA Acme Signé 2026-03-14.pdf',
        detail: 'Contrepartie, type d’accord, statut et date rendent les PDF juridiques plus faciles à retrouver.',
      },
      {
        title: 'Relevés',
        before: 'download (7).pdf',
        after: 'Relevé Chase Mars 2026.pdf',
        detail: 'L’institution et la période viennent du PDF au lieu d’être devinées depuis le nom téléchargé.',
      },
      {
        title: 'Reçus scannés',
        before: 'IMG_20260310_scan.pdf',
        after: 'Reçu Home Depot 10 mars.pdf',
        detail: 'Pour les scans en image, la vision IA lit le contenu visible même sans couche texte intégrée.',
      },
    ],
    comparisonEyebrow: 'Comparaison de workflow',
    comparisonTitle: 'Où Zush se place face à Finder, Aperçu et Adobe Acrobat',
    comparisonIntro:
      'Zush ne remplace pas les lecteurs ou éditeurs PDF. Il couvre l’étape répétitive du nommage après téléchargement, scan, signature, export ou réception par email.',
    comparisonRows: [
      {
        tool: 'Finder / Explorateur de fichiers',
        bestFor: 'Renommages manuels ponctuels',
        gap: 'Il faut encore ouvrir chaque PDF, le lire, choisir un nom et recommencer pour chaque fichier.',
      },
      {
        tool: 'Aperçu',
        bestFor: 'Lire, annoter, exporter et signer des PDF sur Mac',
        gap: 'Aperçu ne génère pas de noms en lot basés sur le contenu pour factures, contrats, scans et relevés.',
      },
      {
        tool: 'Adobe Acrobat',
        bestFor: 'OCR, édition, formulaires, signatures et revue PDF',
        gap: 'Acrobat gère le contenu PDF, mais le nettoyage des noms reste souvent un workflow manuel séparé.',
      },
      {
        tool: 'Zush',
        bestFor: 'Transformer des noms PDF faibles en noms de documents recherchables',
        gap: 'Zush lit le texte ou les pages scannées, extrait entités et dates, puis prévisualise les noms avant application.',
      },
    ],
  },
  'pt-br': {
    workflowsEyebrow: 'Fluxos de nomes para PDF',
    workflowsTitle: 'Feito para notas, contratos, scans e extratos',
    workflowsIntro:
      'Organizar PDFs é diferente de renomear fotos ou screenshots. O nome útil costuma estar no texto do documento: fornecedores, partes, datas, números de formulário, períodos de cobrança e assinaturas.',
    recipes: [
      {
        title: 'Notas e faturas',
        before: 'scan_001.pdf',
        after: 'Nota Amazon 2026-03.pdf',
        detail: 'Fornecedor, tipo de documento, período e data mantêm pastas contábeis fáceis de ordenar.',
      },
      {
        title: 'Contratos',
        before: 'signed-final.pdf',
        after: 'NDA Acme Assinado 2026-03-14.pdf',
        detail: 'Parte, tipo de acordo, status e data deixam PDFs jurídicos mais fáceis de encontrar.',
      },
      {
        title: 'Extratos',
        before: 'download (7).pdf',
        after: 'Extrato Chase Março 2026.pdf',
        detail: 'Instituição e período são lidos do PDF em vez de inferidos pelo nome do download.',
      },
      {
        title: 'Recibos escaneados',
        before: 'IMG_20260310_scan.pdf',
        after: 'Recibo Home Depot 10 março.pdf',
        detail: 'Em scans sem texto embutido, a visão de IA lê o conteúdo visível da página.',
      },
    ],
    comparisonEyebrow: 'Comparação de workflow',
    comparisonTitle: 'Onde o Zush entra junto de Finder, Preview e Adobe Acrobat',
    comparisonIntro:
      'O Zush não substitui leitores ou editores de PDF. Ele resolve a etapa repetitiva de nomear arquivos depois que PDFs são baixados, escaneados, assinados, exportados ou recebidos por email.',
    comparisonRows: [
      {
        tool: 'Finder / Explorador de Arquivos',
        bestFor: 'Renomeações manuais pontuais',
        gap: 'Você ainda precisa abrir cada PDF, ler, decidir um nome e repetir isso para todos os arquivos.',
      },
      {
        tool: 'Preview',
        bestFor: 'Ler, marcar, exportar e assinar PDFs no Mac',
        gap: 'O Preview não gera nomes em lote com base no conteúdo para notas, contratos, scans e extratos.',
      },
      {
        tool: 'Adobe Acrobat',
        bestFor: 'OCR, edição, formulários, assinaturas e revisão de PDFs',
        gap: 'O Acrobat ajuda com o conteúdo do PDF, mas a limpeza do nome do arquivo continua manual.',
      },
      {
        tool: 'Zush',
        bestFor: 'Transformar nomes fracos de PDFs em nomes pesquisáveis',
        gap: 'O Zush lê texto ou páginas escaneadas, extrai entidades e datas, e mostra uma prévia antes de renomear.',
      },
    ],
  },
  es: {
    workflowsEyebrow: 'Flujos de nombres PDF',
    workflowsTitle: 'Creado para facturas, contratos, escaneos y estados',
    workflowsIntro:
      'Limpiar PDFs no es igual que renombrar fotos o capturas. El nombre útil suele estar dentro del texto: proveedores, partes, fechas, formularios, periodos de facturación y firmas.',
    recipes: [
      {
        title: 'Facturas',
        before: 'scan_001.pdf',
        after: 'Factura Amazon 2026-03.pdf',
        detail: 'Proveedor, tipo de documento, periodo y fecha mantienen las carpetas contables ordenables.',
      },
      {
        title: 'Contratos',
        before: 'signed-final.pdf',
        after: 'NDA Acme Firmado 2026-03-14.pdf',
        detail: 'Contraparte, tipo de acuerdo, estado y fecha hacen que los PDFs legales sean fáciles de recuperar.',
      },
      {
        title: 'Estados',
        before: 'download (7).pdf',
        after: 'Estado Chase Marzo 2026.pdf',
        detail: 'Institución y periodo se extraen del PDF en lugar de adivinarse por el nombre descargado.',
      },
      {
        title: 'Recibos escaneados',
        before: 'IMG_20260310_scan.pdf',
        after: 'Recibo Home Depot 10 marzo.pdf',
        detail: 'Para scans en imagen, la visión IA lee el contenido visible aunque no exista capa de texto.',
      },
    ],
    comparisonEyebrow: 'Comparación de workflow',
    comparisonTitle: 'Dónde encaja Zush junto a Finder, Vista Previa y Adobe Acrobat',
    comparisonIntro:
      'Zush no sustituye lectores ni editores PDF. Cubre el paso repetitivo de nombrar archivos después de descargar, escanear, firmar, exportar o recibir PDFs por email.',
    comparisonRows: [
      {
        tool: 'Finder / Explorador de archivos',
        bestFor: 'Renombrados manuales puntuales',
        gap: 'Aún tienes que abrir cada PDF, leerlo, decidir el nombre y repetirlo con cada archivo.',
      },
      {
        tool: 'Vista Previa',
        bestFor: 'Leer, anotar, exportar y firmar PDFs en Mac',
        gap: 'Vista Previa no genera nombres por lote basados en contenido para facturas, contratos, scans y estados.',
      },
      {
        tool: 'Adobe Acrobat',
        bestFor: 'OCR, edición, formularios, firmas y revisión de PDFs',
        gap: 'Acrobat ayuda con el contenido PDF, pero limpiar nombres de archivo sigue siendo un flujo manual separado.',
      },
      {
        tool: 'Zush',
        bestFor: 'Convertir nombres PDF débiles en documentos fáciles de buscar',
        gap: 'Zush lee texto o páginas escaneadas, extrae entidades y fechas, y muestra una vista previa antes de aplicar.',
      },
    ],
  },
  nl: {
    workflowsEyebrow: 'PDF-naamworkflows',
    workflowsTitle: 'Gebouwd voor facturen, contracten, scans en afschriften',
    workflowsIntro:
      'PDFs opschonen is anders dan foto’s of screenshots hernoemen. De bruikbare bestandsnaam zit vaak in de documenttekst: leveranciers, partijen, datums, formuliernummers, perioden en handtekeningen.',
    recipes: [
      {
        title: 'Facturen',
        before: 'scan_001.pdf',
        after: 'Amazon Factuur 2026-03.pdf',
        detail: 'Leverancier, documenttype, periode en datum houden boekhoudmappen makkelijk sorteerbaar.',
      },
      {
        title: 'Contracten',
        before: 'signed-final.pdf',
        after: 'Acme NDA Ondertekend 2026-03-14.pdf',
        detail: 'Tegenpartij, type overeenkomst, status en datum maken juridische PDFs sneller vindbaar.',
      },
      {
        title: 'Afschriften',
        before: 'download (7).pdf',
        after: 'Chase Afschrift Maart 2026.pdf',
        detail: 'Instelling en rapportageperiode worden uit het PDF gehaald in plaats van uit de downloadnaam geraden.',
      },
      {
        title: 'Gescande bonnen',
        before: 'IMG_20260310_scan.pdf',
        after: 'Home Depot Bon 10 maart.pdf',
        detail: 'Bij scans als afbeelding leest AI-visie de zichtbare pagina-inhoud wanneer er geen tekstlaag is.',
      },
    ],
    comparisonEyebrow: 'Workflowvergelijking',
    comparisonTitle: 'Waar Zush past naast Finder, Preview en Adobe Acrobat',
    comparisonIntro:
      'Zush vervangt geen PDF-lezers of editors. Het vult de herhaalde bestandsnaamstap nadat PDFs zijn gedownload, gescand, ondertekend, geëxporteerd of per mail ontvangen.',
    comparisonRows: [
      {
        tool: 'Finder / Verkenner',
        bestFor: 'Eenmalig handmatig hernoemen',
        gap: 'Je moet nog steeds elk PDF openen, lezen, een naam kiezen en dat voor ieder bestand herhalen.',
      },
      {
        tool: 'Preview',
        bestFor: 'PDFs lezen, markeren, exporteren en ondertekenen op Mac',
        gap: 'Preview genereert geen inhoudsbewuste batchnamen voor facturen, contracten, scans en afschriften.',
      },
      {
        tool: 'Adobe Acrobat',
        bestFor: 'OCR, bewerken, formulieren, handtekeningen en PDF-review',
        gap: 'Acrobat helpt met PDF-inhoud, maar bestandsnamen opschonen blijft meestal een aparte handmatige stap.',
      },
      {
        tool: 'Zush',
        bestFor: 'Zwakke PDF-namen veranderen in doorzoekbare documentnamen',
        gap: 'Zush leest tekstlagen of scans, haalt entiteiten en datums op en toont namen vooraf.',
      },
    ],
  },
  it: {
    workflowsEyebrow: 'Workflow nomi PDF',
    workflowsTitle: 'Creato per fatture, contratti, scansioni ed estratti',
    workflowsIntro:
      'Ripulire i PDF è diverso dal rinominare foto o screenshot. Il nome utile spesso è nascosto nel testo: fornitori, controparti, date, moduli, periodi di fatturazione e firme.',
    recipes: [
      {
        title: 'Fatture',
        before: 'scan_001.pdf',
        after: 'Fattura Amazon 2026-03.pdf',
        detail: 'Fornitore, tipo documento, periodo e data mantengono ordinabili le cartelle contabili.',
      },
      {
        title: 'Contratti',
        before: 'signed-final.pdf',
        after: 'NDA Acme Firmato 2026-03-14.pdf',
        detail: 'Controparte, tipo di accordo, stato e data rendono più recuperabili i PDF legali.',
      },
      {
        title: 'Estratti',
        before: 'download (7).pdf',
        after: 'Estratto Chase Marzo 2026.pdf',
        detail: 'Istituto e periodo vengono letti dal PDF invece di essere dedotti dal nome scaricato.',
      },
      {
        title: 'Ricevute scansionate',
        before: 'IMG_20260310_scan.pdf',
        after: 'Ricevuta Home Depot 10 marzo.pdf',
        detail: 'Per scansioni come immagini, la visione IA legge il contenuto visibile anche senza testo incorporato.',
      },
    ],
    comparisonEyebrow: 'Confronto workflow',
    comparisonTitle: 'Dove si inserisce Zush accanto a Finder, Anteprima e Adobe Acrobat',
    comparisonIntro:
      'Zush non sostituisce lettori o editor PDF. Copre il passaggio ripetitivo del nome file dopo download, scansione, firma, esportazione o ricezione via email.',
    comparisonRows: [
      {
        tool: 'Finder / Esplora file',
        bestFor: 'Rinomine manuali singole',
        gap: 'Devi comunque aprire ogni PDF, leggerlo, scegliere un nome e ripetere per ogni file.',
      },
      {
        tool: 'Anteprima',
        bestFor: 'Leggere, annotare, esportare e firmare PDF su Mac',
        gap: 'Anteprima non genera nomi in batch basati sul contenuto per fatture, contratti, scansioni ed estratti.',
      },
      {
        tool: 'Adobe Acrobat',
        bestFor: 'OCR, modifica, moduli, firme e revisione PDF',
        gap: 'Acrobat aiuta con il contenuto PDF, ma pulire i nomi file resta spesso un flusso manuale separato.',
      },
      {
        tool: 'Zush',
        bestFor: 'Trasformare nomi PDF deboli in nomi ricercabili',
        gap: 'Zush legge testo o pagine scansionate, estrae entità e date, poi mostra i nomi prima di applicarli.',
      },
    ],
  },
  ja: {
    workflowsEyebrow: 'PDF 名付けワークフロー',
    workflowsTitle: '請求書、契約書、スキャン、明細に対応',
    workflowsIntro:
      'PDF の整理は写真やスクリーンショットのリネームとは違います。役立つ名前は多くの場合、文書内の取引先、日付、フォーム番号、期間、署名などに隠れています。',
    recipes: [
      {
        title: '請求書',
        before: 'scan_001.pdf',
        after: 'Amazon 請求書 2026-03.pdf',
        detail: '取引先、文書タイプ、請求期間、日付で会計フォルダを並べやすくします。',
      },
      {
        title: '契約書',
        before: 'signed-final.pdf',
        after: 'Acme NDA 署名済み 2026-03-14.pdf',
        detail: '相手先、契約種別、ステータス、日付で法務 PDF を探しやすくします。',
      },
      {
        title: '明細',
        before: 'download (7).pdf',
        after: 'Chase 明細 2026年3月.pdf',
        detail: '金融機関と対象期間をダウンロード名から推測せず、PDF から読み取ります。',
      },
      {
        title: 'スキャンした領収書',
        before: 'IMG_20260310_scan.pdf',
        after: 'Home Depot 領収書 3月10日.pdf',
        detail: '画像だけのスキャンでも、テキスト層がなくても、AI ビジョンが見える内容を読み取ります。',
      },
    ],
    comparisonEyebrow: 'ワークフロー比較',
    comparisonTitle: 'Finder、プレビュー、Adobe Acrobat と Zush の役割',
    comparisonIntro:
      'Zush は PDF リーダーや編集ツールの代替ではありません。PDF のダウンロード、スキャン、署名、書き出し、受信後に残る反復的なファイル名整理を担当します。',
    comparisonRows: [
      {
        tool: 'Finder / エクスプローラー',
        bestFor: '単発の手動リネーム',
        gap: '各 PDF を開き、読み、名前を考え、すべてのファイルで繰り返す必要があります。',
      },
      {
        tool: 'プレビュー',
        bestFor: 'Mac で PDF を読む、注釈、書き出し、署名する作業',
        gap: '請求書、契約書、スキャン、明細に対して内容ベースの一括ファイル名生成はできません。',
      },
      {
        tool: 'Adobe Acrobat',
        bestFor: 'OCR、編集、フォーム、署名、PDF レビュー',
        gap: 'PDF 内容の管理には強い一方、ファイル名整理は別の手作業として残りがちです。',
      },
      {
        tool: 'Zush',
        bestFor: '弱い PDF ファイル名を検索しやすい文書名に変える',
        gap: 'Zush はテキスト層やスキャンページを読み、名前や日付を抽出して、適用前にプレビューします。',
      },
    ],
  },
  ko: {
    workflowsEyebrow: 'PDF 이름 워크플로',
    workflowsTitle: '송장, 계약서, 스캔, 명세서를 위해 설계',
    workflowsIntro:
      'PDF 정리는 사진이나 스크린샷 이름 변경과 다릅니다. 유용한 파일명은 대개 문서 안의 업체명, 당사자, 날짜, 양식 번호, 청구 기간, 서명에 숨어 있습니다.',
    recipes: [
      {
        title: '송장',
        before: 'scan_001.pdf',
        after: 'Amazon 송장 2026-03.pdf',
        detail: '업체, 문서 유형, 청구 기간, 날짜로 회계 폴더를 정렬하기 쉽게 유지합니다.',
      },
      {
        title: '계약서',
        before: 'signed-final.pdf',
        after: 'Acme NDA 서명완료 2026-03-14.pdf',
        detail: '상대방, 계약 유형, 상태, 날짜로 법무 PDF를 더 쉽게 찾을 수 있습니다.',
      },
      {
        title: '명세서',
        before: 'download (7).pdf',
        after: 'Chase 명세서 2026년 3월.pdf',
        detail: '기관과 기간을 다운로드 이름에서 추측하지 않고 PDF에서 읽어냅니다.',
      },
      {
        title: '스캔 영수증',
        before: 'IMG_20260310_scan.pdf',
        after: 'Home Depot 영수증 3월 10일.pdf',
        detail: '텍스트 레이어가 없는 이미지 스캔도 AI 비전이 보이는 페이지 내용을 읽습니다.',
      },
    ],
    comparisonEyebrow: '워크플로 비교',
    comparisonTitle: 'Finder, Preview, Adobe Acrobat 옆에서 Zush가 맡는 역할',
    comparisonIntro:
      'Zush는 PDF 리더나 편집기를 대체하지 않습니다. 다운로드, 스캔, 서명, 내보내기, 이메일 수신 후 반복되는 파일명 정리 단계를 맡습니다.',
    comparisonRows: [
      {
        tool: 'Finder / 파일 탐색기',
        bestFor: '단발성 수동 이름 변경',
        gap: '각 PDF를 열고 읽고 이름을 정한 뒤 모든 파일에 대해 반복해야 합니다.',
      },
      {
        tool: 'Preview',
        bestFor: 'Mac에서 PDF 읽기, 표시, 내보내기, 서명',
        gap: 'Preview는 송장, 계약서, 스캔, 명세서의 내용을 바탕으로 일괄 파일명을 만들지 않습니다.',
      },
      {
        tool: 'Adobe Acrobat',
        bestFor: 'OCR, 편집, 양식, 서명, PDF 검토',
        gap: 'Acrobat은 PDF 내용 관리에 강하지만 파일명 정리는 별도의 수동 작업으로 남는 경우가 많습니다.',
      },
      {
        tool: 'Zush',
        bestFor: '약한 PDF 파일명을 검색 가능한 문서명으로 바꾸기',
        gap: 'Zush는 텍스트 레이어나 스캔 페이지를 읽고 이름과 날짜를 추출한 뒤 적용 전 미리 보여줍니다.',
      },
    ],
  },
  'zh-cn': {
    workflowsEyebrow: 'PDF 命名流程',
    workflowsTitle: '为发票、合同、扫描件和账单而设计',
    workflowsIntro:
      '整理 PDF 不同于重命名照片或截图。真正有用的文件名通常藏在文档文字里：供应商、签约方、日期、表单编号、账期和签名。',
    recipes: [
      {
        title: '发票',
        before: 'scan_001.pdf',
        after: 'Amazon 发票 2026-03.pdf',
        detail: '供应商、文档类型、账期和日期让财务文件夹更容易排序。',
      },
      {
        title: '合同',
        before: 'signed-final.pdf',
        after: 'Acme NDA 已签署 2026-03-14.pdf',
        detail: '签约方、协议类型、状态和日期让法律 PDF 更容易检索。',
      },
      {
        title: '账单',
        before: 'download (7).pdf',
        after: 'Chase 账单 2026年3月.pdf',
        detail: '机构和周期来自 PDF 内容，而不是从下载文件名里猜测。',
      },
      {
        title: '扫描收据',
        before: 'IMG_20260310_scan.pdf',
        after: 'Home Depot 收据 3月10日.pdf',
        detail: '对于只有图片的扫描件，即使没有文本层，AI 视觉也能读取页面可见内容。',
      },
    ],
    comparisonEyebrow: '流程对比',
    comparisonTitle: 'Zush 与 Finder、预览和 Adobe Acrobat 的分工',
    comparisonIntro:
      'Zush 不替代 PDF 阅读器或编辑器。它补上 PDF 下载、扫描、签署、导出或邮件接收之后反复整理文件名的步骤。',
    comparisonRows: [
      {
        tool: 'Finder / 文件资源管理器',
        bestFor: '单个文件手动重命名',
        gap: '你仍然需要打开每个 PDF、阅读内容、决定名称，然后对每个文件重复操作。',
      },
      {
        tool: '预览',
        bestFor: '在 Mac 上阅读、标注、导出和签署 PDF',
        gap: '预览不会为发票、合同、扫描件和账单批量生成基于内容的文件名。',
      },
      {
        tool: 'Adobe Acrobat',
        bestFor: 'OCR、编辑、表单、签名和 PDF 审阅',
        gap: 'Acrobat 擅长处理 PDF 内容，但文件名清理通常仍是单独的手动流程。',
      },
      {
        tool: 'Zush',
        bestFor: '把弱 PDF 文件名变成可搜索的文档名',
        gap: 'Zush 读取文本层或扫描页面，提取实体和日期，并在应用前预览新名称。',
      },
    ],
  },
};

export function getPdfDeepDiveCopy(locale: Locale): PdfDeepDiveCopy {
  return PDF_DEEP_DIVE_COPY[locale] ?? PDF_DEEP_DIVE_COPY.en;
}
