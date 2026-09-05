import type { Locale } from '@/i18n/config';

export interface LandingWorkflow {
  heading: string;
  answer: string;
  steps: string[];
  example?: { before: string; after: string; caption: string };
  limit: string;
  links: Array<{ href: string; label: string }>;
}

const workflows: Record<string, LandingWorkflow> = {
  '/batch-rename-files': {
    heading: 'Review a mixed batch before changing filenames',
    answer: 'Zush gives each file its own content-based name while applying one naming convention to the batch. Use it for mixed screenshots, photos, and documents; a simple prefix or numbered sequence may only need your file manager’s rename tools.',
    steps: [
      'Add a small, representative selection of files. Choose the AI mode and a Template with the fields your folder needs.',
      'Generate suggestions and review the whole list. Check missing dates, weak descriptions, duplicate names, and file extensions.',
      'Apply the reviewed batch, open a few renamed files, and check rename history before processing a larger archive.',
    ],
    example: { before: 'Screenshot.png', after: 'Acme_Checkout-Error.png', caption: 'Illustrative pattern: known project prefix + description from the screenshot. Verify the project and description before applying.' },
    limit: 'A consistent pattern does not guarantee correct AI fields. Linked project files can depend on their original names; test copies first and keep a backup.',
    links: [{ href: '/docs/batch-rename-files', label: 'Batch preview and rename steps' }, { href: '/blog/how-to-safely-batch-rename-files', label: 'Check and undo a batch rename' }],
  },
  '/ai-file-organizer': {
    heading: 'Make a folder searchable while keeping files in place',
    answer: 'Zush organizes files through descriptive filenames and supported metadata. It keeps each file in its current folder. Choose this workflow when you want to find documents by client, project, or subject without rebuilding your folder structure.',
    steps: [
      'Choose one Downloads or client folder and decide which details you will search for later, such as project, document type, and date.',
      'Save those fields as a Template. Generate names and compare uncertain details with the original files before applying.',
      'Check the renamed files in Finder or File Explorer. After the pattern is reliable, assign it to folder monitoring for new arrivals.',
    ],
    example: { before: 'Clients/Acme/document.pdf', after: 'Clients/Acme/Acme_Service-Agreement.pdf', caption: 'Illustrative path: only the filename changes; the Clients/Acme folder stays the same.' },
    limit: 'Zush does not move files between folders or replace a search database. Search results also depend on your operating system’s indexing. Use rename history to restore names when needed.',
    links: [{ href: '/docs/file-search', label: 'Find files through names and metadata' }, { href: '/docs/folder-monitoring', label: 'Set up folder monitoring' }],
  },
  '/offline-ai-file-renamer': {
    heading: 'Set up local file analysis before going offline',
    answer: 'Zush can run supported file analysis through LM Studio or Ollama on your Mac or Windows PC. Install the local runtime, download a compatible model, and test the connection first. Images and file previews need a vision-capable model.',
    steps: [
      'Install LM Studio or Ollama and download a vision-capable model while online. Check that your computer has enough memory and disk space for that model.',
      'Start the local server. In Zush Settings → AI Modes, choose the matching local mode, select the installed model, and run Test. Use a local endpoint to keep analysis on this computer.',
      'Try a small set of your actual file types, check the suggestions, then verify the workflow without a network connection before relying on it offline.',
    ],
    limit: 'Local analysis works after setup; downloading models and app updates requires a connection. Speed and supported analysis depend on the model, file type, and hardware. BYOK uses a cloud provider. Zush does not silently switch to cloud analysis while a local mode is selected.',
    links: [{ href: '/docs/lm-studio', label: 'LM Studio requirements and setup' }, { href: '/docs/offline-ai', label: 'Ollama requirements and setup' }, { href: '/docs/ai-modes', label: 'Compare cloud and local AI modes' }],
  },
  '/rename-scanned-documents': {
    heading: 'Turn scanner output into names you can verify',
    answer: 'Zush uses AI vision to suggest names from image-only scans without requiring a separate OCR pass. Start with the folder where your scanner saves PDFs or images, then choose document type, sender, and document date as naming fields.',
    steps: [
      'Add a few representative scans, including a clear page, a multi-page document, and a poor-quality sample. Choose an AI mode that supports image analysis.',
      'Build a Template and compare each proposed field with the scan. Distinguish the document date from the scan date; correct or set aside unreadable identifiers.',
      'Apply the reviewed names and check rename history. Enable folder monitoring only after testing newly arriving scans and the naming convention.',
    ],
    example: { before: 'Scan0001.pdf', after: '2026-09-01_Acme_Statement.pdf', caption: 'Illustrative pattern: verified document date + sender + document type. The scan itself is unchanged.' },
    limit: 'Blurred text, handwriting, and conflicting dates can produce plausible but incorrect suggestions. Renaming a scan does not add a searchable OCR text layer to the PDF.',
    links: [{ href: '/blog/rename-scanned-documents-automatically', label: 'Compare scanner settings, OCR rules, and AI' }, { href: '/docs/folder-monitoring', label: 'Configure the scanner intake folder' }],
  },
};

const documents: Record<Locale, LandingWorkflow> = {
  en: {
    heading: 'Name documents and ebooks from the fields that matter',
    answer: 'Zush reads supported document content to suggest names for Word files, spreadsheets, presentations, and ebooks. Choose fields for the job: client and subject for a proposal, reporting period for a spreadsheet, or author and title for a book.',
    steps: ['Start with a small folder of copies and choose a Template for that document type.', 'Generate names, then verify clients, dates, versions, authors, and titles against the source. Leave missing details out instead of accepting a guess.', 'Review duplicate names and extensions, apply the batch, and test rename history before processing the archive.'],
    example: { before: 'Document1.docx', after: 'Acme_Project-Proposal.docx', caption: 'Illustrative filename: verified client + document purpose. The document contents stay unchanged.' },
    limit: 'A workbook can cover several topics, and an ebook can have incomplete metadata. Review uncertain results individually. Documents linked from other projects may depend on their original filenames.',
    links: [{ href: '/blog/ai-document-renamer-guide', label: 'Choose and verify document naming fields' }, { href: '/blog/batch-rename-epub-fb2-files', label: 'Name EPUB and FB2 books by author and title' }],
  },
  de: {
    heading: 'Dokumente und E-Books nach passenden Angaben benennen',
    answer: 'Zush liest unterstützte Dokumentinhalte und schlägt Namen für Word-Dateien, Tabellen, Präsentationen und E-Books vor. Wähle Kunde und Thema für Angebote, den Berichtszeitraum für Tabellen oder Autor und Titel für Bücher.',
    steps: ['Beginne mit wenigen Dateikopien und einer Vorlage für den Dokumenttyp.', 'Prüfe Kunden, Daten, Versionen, Autoren und Titel anhand der Originale. Lass fehlende Angaben weg, statt eine Vermutung zu übernehmen.', 'Prüfe doppelte Namen und Dateiendungen, wende den Stapel an und teste den Umbenennungsverlauf vor dem gesamten Archiv.'],
    example: { before: 'Dokument1.docx', after: 'Acme_Projektangebot.docx', caption: 'Namensbeispiel: geprüfter Kunde + Dokumentzweck. Der Dokumentinhalt bleibt unverändert.' },
    limit: 'Tabellen können mehrere Themen enthalten; Buchmetadaten können fehlen. Prüfe unklare Ergebnisse einzeln. Verknüpfte Dokumente können auf ihre bisherigen Dateinamen angewiesen sein.',
    links: [{ href: '/blog/ai-document-renamer-guide', label: 'Namensfelder auswählen und prüfen (Englisch)' }],
  },
  fr: {
    heading: 'Nommer documents et livres avec les bonnes informations',
    answer: 'Zush lit le contenu des documents pris en charge pour proposer des noms aux fichiers Word, tableaux, présentations et livres numériques. Choisissez le client et le sujet pour une proposition, la période pour un tableau, ou l’auteur et le titre pour un livre.',
    steps: ['Commencez par quelques copies et un modèle adapté au type de document.', 'Vérifiez clients, dates, versions, auteurs et titres dans les originaux. Omettez les informations manquantes plutôt que d’accepter une supposition.', 'Vérifiez les doublons de noms et les extensions, appliquez le lot, puis testez l’historique de renommage avant de traiter les archives.'],
    example: { before: 'Document1.docx', after: 'Acme_Proposition-Projet.docx', caption: 'Exemple de nom : client vérifié + objet du document. Le contenu reste inchangé.' },
    limit: 'Un classeur peut couvrir plusieurs sujets et les métadonnées d’un livre peuvent être incomplètes. Vérifiez les cas ambigus. Les documents liés à un projet peuvent dépendre de leur ancien nom.',
    links: [{ href: '/blog/ai-document-renamer-guide', label: 'Choisir et vérifier les champs du nom (anglais)' }],
  },
  es: {
    heading: 'Nombra documentos y libros con los datos adecuados',
    answer: 'Zush lee el contenido compatible para proponer nombres a archivos de Word, hojas de cálculo, presentaciones y libros electrónicos. Elige cliente y tema para propuestas, periodo para hojas de cálculo, o autor y título para libros.',
    steps: ['Empieza con unas copias y una plantilla para ese tipo de documento.', 'Comprueba clientes, fechas, versiones, autores y títulos en los originales. Omite los datos que faltan en lugar de aceptar una suposición.', 'Revisa nombres duplicados y extensiones, aplica el lote y prueba el historial de renombrado antes de procesar el archivo completo.'],
    example: { before: 'Documento1.docx', after: 'Acme_Propuesta-Proyecto.docx', caption: 'Ejemplo de nombre: cliente verificado + finalidad del documento. El contenido no cambia.' },
    limit: 'Una hoja de cálculo puede abarcar varios temas y los metadatos de un libro pueden estar incompletos. Revisa los casos dudosos. Los documentos enlazados a proyectos pueden depender de sus nombres originales.',
    links: [{ href: '/blog/ai-document-renamer-guide', label: 'Elegir y verificar los campos del nombre (inglés)' }],
  },
  'pt-br': {
    heading: 'Nomeie documentos e livros com os campos certos',
    answer: 'O Zush lê o conteúdo compatível para sugerir nomes a arquivos Word, planilhas, apresentações e ebooks. Escolha cliente e assunto para propostas, período para planilhas ou autor e título para livros.',
    steps: ['Comece com algumas cópias e um modelo para esse tipo de documento.', 'Confira clientes, datas, versões, autores e títulos nos originais. Omita os dados ausentes em vez de aceitar uma suposição.', 'Revise nomes duplicados e extensões, aplique o lote e teste o histórico de renomeação antes de processar todo o acervo.'],
    example: { before: 'Documento1.docx', after: 'Acme_Proposta-Projeto.docx', caption: 'Exemplo de nome: cliente verificado + finalidade do documento. O conteúdo permanece igual.' },
    limit: 'Uma planilha pode tratar de vários assuntos e os metadados de um livro podem estar incompletos. Revise os casos incertos. Documentos vinculados a projetos podem depender dos nomes originais.',
    links: [{ href: '/blog/ai-document-renamer-guide', label: 'Escolher e conferir os campos do nome (inglês)' }],
  },
  it: {
    heading: 'Nomina documenti ed ebook con i dati utili',
    answer: 'Zush legge i contenuti supportati per suggerire nomi a file Word, fogli di calcolo, presentazioni ed ebook. Scegli cliente e argomento per le proposte, periodo per i fogli di calcolo oppure autore e titolo per i libri.',
    steps: ['Inizia con alcune copie e un modello adatto al tipo di documento.', 'Verifica clienti, date, versioni, autori e titoli negli originali. Ometti i dati mancanti invece di accettare una supposizione.', 'Controlla nomi duplicati ed estensioni, applica il lotto e prova la cronologia delle rinomine prima di elaborare l’intero archivio.'],
    example: { before: 'Documento1.docx', after: 'Acme_Proposta-Progetto.docx', caption: 'Esempio di nome: cliente verificato + scopo del documento. Il contenuto resta invariato.' },
    limit: 'Un foglio di calcolo può coprire più argomenti e i metadati di un libro possono essere incompleti. Verifica i casi dubbi. I documenti collegati a progetti possono dipendere dai nomi originali.',
    links: [{ href: '/blog/ai-document-renamer-guide', label: 'Scegliere e verificare i campi del nome (inglese)' }],
  },
  nl: {
    heading: 'Geef documenten en ebooks namen met de juiste gegevens',
    answer: 'Zush leest ondersteunde inhoud en stelt namen voor Word-bestanden, spreadsheets, presentaties en ebooks voor. Kies klant en onderwerp voor voorstellen, verslagperiode voor spreadsheets of auteur en titel voor boeken.',
    steps: ['Begin met enkele kopieën en een sjabloon voor het documenttype.', 'Controleer klanten, datums, versies, auteurs en titels in de originelen. Laat ontbrekende gegevens weg in plaats van een gok te accepteren.', 'Controleer dubbele namen en extensies, pas de batch toe en test de hernoemgeschiedenis voordat je het hele archief verwerkt.'],
    example: { before: 'Document1.docx', after: 'Acme_Projectvoorstel.docx', caption: 'Voorbeeldnaam: gecontroleerde klant + documentdoel. De inhoud blijft ongewijzigd.' },
    limit: 'Een werkmap kan meerdere onderwerpen bevatten en boekmetadata kunnen onvolledig zijn. Controleer twijfelgevallen apart. Gekoppelde documenten kunnen afhankelijk zijn van hun oorspronkelijke naam.',
    links: [{ href: '/blog/ai-document-renamer-guide', label: 'Naamvelden kiezen en controleren (Engels)' }],
  },
  tr: {
    heading: 'Belge ve e-kitapları gerekli bilgilerle adlandırın',
    answer: 'Zush, desteklenen içerikleri okuyarak Word dosyaları, tablolar, sunumlar ve e-kitaplar için ad önerir. Tekliflerde müşteri ve konuyu, tablolarda rapor dönemini, kitaplarda yazar ve başlığı seçin.',
    steps: ['Birkaç dosya kopyasıyla başlayın ve belge türüne uygun bir şablon seçin.', 'Müşteri, tarih, sürüm, yazar ve başlık bilgilerini asıllarıyla karşılaştırın. Eksik bilgilerin yerine tahminleri kabul etmeyin.', 'Yinelenen adları ve uzantıları kontrol edip toplu işlemi uygulayın. Tüm arşivi işlemeden önce yeniden adlandırma geçmişini deneyin.'],
    example: { before: 'Belge1.docx', after: 'Acme_Proje-Teklifi.docx', caption: 'Örnek ad: doğrulanmış müşteri + belgenin amacı. Belge içeriği değişmez.' },
    limit: 'Bir çalışma kitabı birden fazla konuyu kapsayabilir; kitap meta verileri eksik olabilir. Belirsiz sonuçları tek tek inceleyin. Projelere bağlı belgeler eski dosya adlarına ihtiyaç duyabilir.',
    links: [{ href: '/blog/ai-document-renamer-guide', label: 'Adlandırma alanlarını seçme ve doğrulama (İngilizce)' }],
  },
  ja: {
    heading: '必要な情報から文書や電子書籍に名前を付ける',
    answer: 'Zushは対応する文書の内容を読み取り、Wordファイル、表計算、プレゼンテーション、電子書籍の名前を提案します。提案書には顧客と件名、表計算には対象期間、書籍には著者とタイトルを選びます。',
    steps: ['少数のコピーから始め、文書の種類に合うテンプレートを選びます。', '顧客、日付、版、著者、タイトルを元の文書と照合します。不明な情報は推測を採用せず省きます。', '名前の重複と拡張子を確認して適用します。アーカイブ全体を処理する前に、名前の変更履歴から元に戻せることを試します。'],
    example: { before: '文書1.docx', after: 'Acme_プロジェクト提案書.docx', caption: '名前の例：確認済みの顧客名＋文書の目的。文書の内容は変わりません。' },
    limit: 'ブックには複数の主題が含まれ、書籍のメタデータが欠けている場合もあります。不確かな結果は個別に確認してください。他のプロジェクトから参照される文書は、元のファイル名に依存することがあります。',
    links: [{ href: '/blog/ai-document-renamer-guide', label: '名前に使う情報の選び方と確認方法（英語）' }],
  },
  ko: {
    heading: '필요한 정보로 문서와 전자책 이름 만들기',
    answer: 'Zush는 지원되는 문서 내용을 읽어 Word 파일, 스프레드시트, 프레젠테이션, 전자책의 이름을 제안합니다. 제안서에는 고객과 주제, 표에는 보고 기간, 책에는 저자와 제목을 선택하세요.',
    steps: ['소수의 복사본으로 시작하고 문서 유형에 맞는 템플릿을 선택하세요.', '고객, 날짜, 버전, 저자, 제목을 원본과 대조하세요. 누락된 정보는 추측을 받아들이지 말고 생략하세요.', '중복 이름과 확장자를 확인한 뒤 적용하세요. 전체 자료를 처리하기 전에 이름 변경 기록에서 복원되는지 테스트하세요.'],
    example: { before: '문서1.docx', after: 'Acme_프로젝트-제안서.docx', caption: '이름 예시: 확인한 고객명 + 문서 목적. 문서 내용은 변경되지 않습니다.' },
    limit: '통합 문서에는 여러 주제가 있을 수 있고 책의 메타데이터가 불완전할 수도 있습니다. 불확실한 결과는 개별 확인하세요. 프로젝트에 연결된 문서는 원래 파일 이름에 의존할 수 있습니다.',
    links: [{ href: '/blog/ai-document-renamer-guide', label: '이름 필드 선택 및 확인 방법(영어)' }],
  },
  'zh-cn': {
    heading: '用所需信息为文档和电子书命名',
    answer: 'Zush读取支持的文档内容，为Word文件、电子表格、演示文稿和电子书建议名称。提案可选客户与主题，表格可选报告期间，书籍可选作者与书名。',
    steps: ['先用少量副本测试，并选择适合文档类型的模板。', '对照原文核实客户、日期、版本、作者和书名。缺失的信息应省略，不要直接接受猜测。', '检查重名和扩展名后应用更改。处理整个档案前，先测试通过重命名历史恢复原名。'],
    example: { before: '文档1.docx', after: 'Acme_项目提案.docx', caption: '命名示例：已核实的客户＋文档用途。文档内容保持不变。' },
    limit: '一个工作簿可能涉及多个主题，书籍元数据也可能不完整。请逐项核查不确定的结果。被其他项目引用的文档可能依赖原始文件名。',
    links: [{ href: '/blog/ai-document-renamer-guide', label: '选择并核实命名字段（英文）' }],
  },
  ar: {
    heading: 'سمِّ المستندات والكتب الإلكترونية بالمعلومات المناسبة',
    answer: 'يقرأ Zush محتوى المستندات المدعومة ليقترح أسماء لملفات Word والجداول والعروض والكتب الإلكترونية. اختر العميل والموضوع للمقترحات، وفترة التقرير للجداول، والمؤلف والعنوان للكتب.',
    steps: ['ابدأ بعدد قليل من النسخ واختر قالبًا يناسب نوع المستند.', 'تحقق من العملاء والتواريخ والإصدارات والمؤلفين والعناوين بالرجوع إلى الأصل. احذف المعلومات الناقصة بدل قبول التخمين.', 'راجع الأسماء المكررة والامتدادات ثم طبّق التغييرات. اختبر استعادة الأسماء من السجل قبل معالجة الأرشيف بالكامل.'],
    example: { before: 'مستند1.docx', after: 'Acme_مقترح-مشروع.docx', caption: 'مثال للاسم: عميل تم التحقق منه + غرض المستند. يبقى المحتوى دون تغيير.' },
    limit: 'قد يتناول جدول العمل عدة موضوعات، وقد تكون بيانات الكتاب ناقصة. راجع النتائج غير المؤكدة منفردة. قد تعتمد المستندات المرتبطة بمشروعات أخرى على أسمائها الأصلية.',
    links: [{ href: '/blog/ai-document-renamer-guide', label: 'اختيار حقول الاسم والتحقق منها (بالإنجليزية)' }],
  },
};

const germanBatch: LandingWorkflow = {
  heading: 'Einen gemischten Stapel vor dem Umbenennen prüfen',
  answer: 'Zush gibt jeder Datei einen eigenen inhaltsbasierten Namen innerhalb derselben Namenskonvention. Für gemischte Bilder und Dokumente ist das hilfreich; für ein gemeinsames Präfix oder eine Nummernfolge genügt oft die Umbenennen-Funktion des Dateimanagers.',
  steps: ['Füge eine kleine, typische Dateiauswahl hinzu. Wähle den KI-Modus und eine Vorlage mit den benötigten Feldern.', 'Erzeuge Vorschläge und prüfe fehlende Daten, unklare Beschreibungen, doppelte Namen und Dateiendungen.', 'Wende den geprüften Stapel an, öffne einige Dateien und teste den Umbenennungsverlauf, bevor du das Archiv verarbeitest.'],
  example: { before: 'Screenshot.png', after: 'Acme_Fehler-beim-Bezahlen.png', caption: 'Namensbeispiel: bekanntes Projekt + Bildschirminhalt. Prüfe beide Angaben vor dem Anwenden.' },
  limit: 'Ein einheitliches Muster garantiert keine korrekten KI-Angaben. Verknüpfte Projektdateien können ihre ursprünglichen Namen benötigen. Teste zuerst Kopien und behalte ein Backup.',
  links: [{ href: '/docs/batch-rename-files', label: 'Stapelvorschau und Umbenennen (Englisch)' }],
};

export function getLandingWorkflow(route: string, locale: Locale): LandingWorkflow | undefined {
  if (route === '/rename-documents-with-ai') return documents[locale];
  if (route === '/batch-rename-files' && locale === 'de') return germanBatch;
  return locale === 'en' ? workflows[route] : undefined;
}
