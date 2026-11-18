import type { Locale } from './config';

interface DuplicateFeatureCopy {
  title: string;
  summary: string;
  /** Link text to the English duplicate-files guide in the docs. */
  docsLink: string;
  /** Homepage FAQ entry, placed after the folder sorting questions. */
  faqQuestion: string;
  faqAnswer: string;
}

/** The duplicate-files block of the homepage features section. */
export const DUPLICATE_FEATURES: Record<Locale, DuplicateFeatureCopy> = {
  en: {
    title: 'Duplicate Detection',
    summary: 'Zush compares file contents in every batch and labels exact copies, whatever they are called. Keep them, mark them in the filename, or move them to the Trash as you rename. Copies are never sent to AI, so they use no credits, and Undo puts trashed copies back.',
    docsLink: 'How duplicate detection works',
    faqQuestion: 'Can Zush find and remove duplicate files?',
    faqAnswer: 'Yes. Turn on Detect duplicate files in a template, and Zush compares the contents of every file in the batch, so exact copies are found whatever they are called. Choose whether copies stay as they are, get a Duplicate mark in their name, or move to the Trash (the Recycle Bin on Windows) when you rename. Copies are never sent to AI and use no credits, and Activity history can put trashed copies back. Files that only look alike, such as two scans of the same page, are not treated as copies.',
  },
  de: {
    title: 'Doppelte Dateien',
    summary: 'Zush vergleicht in jedem Stapel die Dateiinhalte und kennzeichnet exakte Kopien, egal wie sie heißen. Behalte sie, markiere sie im Dateinamen oder lege sie beim Umbenennen in den Papierkorb. Kopien gehen nie an die KI und kosten keine Credits; Rückgängig holt sie aus dem Papierkorb zurück.',
    docsLink: 'So funktioniert die Duplikaterkennung',
    faqQuestion: 'Kann Zush doppelte Dateien finden und entfernen?',
    faqAnswer: 'Ja. Aktiviere in einer Vorlage „Doppelte Dateien erkennen“: Zush vergleicht dann den Inhalt aller Dateien im Stapel und findet exakte Kopien, egal wie sie heißen. Du entscheidest, ob Kopien unverändert bleiben, eine Duplikat-Markierung im Namen bekommen oder beim Umbenennen in den Papierkorb wandern. Kopien gehen nie an die KI und kosten keine Credits; der Aktivitätsverlauf holt verschobene Kopien zurück. Dateien, die nur ähnlich aussehen, etwa zwei Scans derselben Seite, gelten nicht als Kopien.',
  },
  fr: {
    title: 'Fichiers en double',
    summary: 'Zush compare le contenu des fichiers de chaque lot et signale les copies exactes, quel que soit leur nom. Gardez-les, marquez-les dans le nom ou mettez-les à la corbeille pendant le renommage. Les copies ne sont jamais envoyées à l’IA et ne coûtent aucun crédit ; Annuler les récupère dans la corbeille.',
    docsLink: 'Fonctionnement de la détection des doublons',
    faqQuestion: 'Zush peut-il trouver et supprimer les fichiers en double ?',
    faqAnswer: 'Oui. Activez la détection des doublons dans un modèle : Zush compare le contenu de chaque fichier du lot et repère les copies exactes, quel que soit leur nom. Choisissez si les copies restent telles quelles, reçoivent une marque de doublon dans leur nom ou partent à la corbeille au moment du renommage. Les copies ne sont jamais envoyées à l’IA et ne coûtent aucun crédit ; l’historique d’activité peut récupérer celles mises à la corbeille. Les fichiers qui se ressemblent seulement, comme deux numérisations de la même page, ne sont pas considérés comme des copies.',
  },
  es: {
    title: 'Archivos duplicados',
    summary: 'Zush compara el contenido de los archivos de cada lote y señala las copias exactas, se llamen como se llamen. Consérvalas, márcalas en el nombre o muévelas a la Papelera al renombrar. Las copias nunca se envían a la IA, así que no gastan créditos, y Deshacer las recupera de la Papelera.',
    docsLink: 'Cómo funciona la detección de duplicados',
    faqQuestion: '¿Puede Zush encontrar y eliminar archivos duplicados?',
    faqAnswer: 'Sí. Activa la detección de duplicados en una plantilla y Zush comparará el contenido de cada archivo del lote, así que encuentra las copias exactas se llamen como se llamen. Elige si las copias se quedan como están, reciben una marca de duplicado en el nombre o van a la Papelera al renombrar. Las copias nunca se envían a la IA ni gastan créditos, y el historial de actividad puede recuperar las que se movieron a la Papelera. Los archivos que solo se parecen, como dos escaneos de la misma página, no cuentan como copias.',
  },
  'pt-br': {
    title: 'Arquivos duplicados',
    summary: 'O Zush compara o conteúdo dos arquivos de cada lote e identifica cópias exatas, seja qual for o nome. Mantenha, marque no nome do arquivo ou mova para o Lixo ao renomear. As cópias nunca vão para a IA, então não gastam créditos, e Desfazer traz de volta as que foram para o Lixo.',
    docsLink: 'Como funciona a detecção de duplicados',
    faqQuestion: 'O Zush encontra e remove arquivos duplicados?',
    faqAnswer: 'Sim. Ative a detecção de duplicados em um modelo e o Zush compara o conteúdo de cada arquivo do lote, então encontra cópias exatas seja qual for o nome. Escolha se as cópias ficam como estão, recebem uma marca de duplicado no nome ou vão para o Lixo ao renomear. As cópias nunca vão para a IA nem gastam créditos, e o histórico de atividade pode trazer de volta as que foram para o Lixo. Arquivos apenas parecidos, como duas digitalizações da mesma página, não contam como cópias.',
  },
  it: {
    title: 'File duplicati',
    summary: 'Zush confronta il contenuto dei file in ogni batch e segnala le copie esatte, qualunque sia il loro nome. Tienile, segnale nel nome o spostale nel Cestino durante la rinomina. Le copie non vengono mai inviate all’IA, quindi non consumano crediti, e Annulla le recupera dal Cestino.',
    docsLink: 'Come funziona il rilevamento dei duplicati',
    faqQuestion: 'Zush può trovare e rimuovere i file duplicati?',
    faqAnswer: 'Sì. Attiva il rilevamento dei duplicati in un modello e Zush confronta il contenuto di ogni file del batch, trovando le copie esatte qualunque sia il loro nome. Scegli se le copie restano come sono, ricevono un segno di duplicato nel nome o finiscono nel Cestino durante la rinomina. Le copie non vengono mai inviate all’IA e non consumano crediti; la cronologia attività può ripristinare quelle spostate nel Cestino. I file solo simili, come due scansioni della stessa pagina, non vengono considerati copie.',
  },
  nl: {
    title: 'Dubbele bestanden',
    summary: 'Zush vergelijkt de inhoud van de bestanden in elke batch en markeert exacte kopieën, hoe ze ook heten. Behoud ze, markeer ze in de bestandsnaam of verplaats ze bij het hernoemen naar de prullenmand. Kopieën gaan nooit naar de AI en kosten dus geen credits; Ongedaan maken zet ze terug.',
    docsLink: 'Zo werkt het opsporen van duplicaten',
    faqQuestion: 'Kan Zush dubbele bestanden vinden en verwijderen?',
    faqAnswer: 'Ja. Zet het opsporen van duplicaten aan in een template en Zush vergelijkt de inhoud van elk bestand in de batch, zodat exacte kopieën worden gevonden, hoe ze ook heten. Kies of kopieën blijven zoals ze zijn, een duplicaatmarkering in hun naam krijgen of bij het hernoemen naar de prullenmand gaan. Kopieën gaan nooit naar de AI en kosten geen credits; de activiteitsgeschiedenis zet verplaatste kopieën terug. Bestanden die alleen op elkaar lijken, zoals twee scans van dezelfde pagina, gelden niet als kopie.',
  },
  tr: {
    title: 'Yinelenen dosyalar',
    summary: 'Zush her toplu işte dosya içeriklerini karşılaştırır ve adları ne olursa olsun birebir kopyaları işaretler. Yeniden adlandırırken kopyaları olduğu gibi tutun, dosya adında işaretleyin veya Çöp Kutusu’na taşıyın. Kopyalar yapay zekâya hiç gönderilmez, kredi harcamaz; Geri Al çöpe giden kopyaları geri getirir.',
    docsLink: 'Yinelenen dosya tespiti nasıl çalışır',
    faqQuestion: 'Zush yinelenen dosyaları bulup kaldırabilir mi?',
    faqAnswer: 'Evet. Bir şablonda yinelenen dosya tespitini açın; Zush toplu işteki her dosyanın içeriğini karşılaştırır ve adı ne olursa olsun birebir kopyaları bulur. Kopyaların olduğu gibi kalmasını, adlarına bir yinelenen işareti eklenmesini ya da yeniden adlandırırken Çöp Kutusu’na taşınmasını seçin. Kopyalar yapay zekâya hiç gönderilmez ve kredi harcamaz; etkinlik geçmişi çöpe taşınan kopyaları geri getirebilir. Aynı sayfanın iki taraması gibi yalnızca birbirine benzeyen dosyalar kopya sayılmaz.',
  },
  ja: {
    title: '重複ファイル',
    summary: 'Zush はバッチごとにファイルの中身を比較し、名前に関係なく完全に同じコピーを見つけて表示します。名前変更のときに、そのまま残す・ファイル名に印を付ける・ゴミ箱に移動から選べます。コピーは AI に送られないのでクレジットを消費せず、取り消せばゴミ箱から元に戻ります。',
    docsLink: '重複検出のしくみ',
    faqQuestion: 'Zush で重複ファイルを見つけて削除できますか？',
    faqAnswer: 'はい。テンプレートで重複ファイルの検出をオンにすると、Zush はバッチ内のすべてのファイルの中身を比較し、名前に関係なく完全に同じコピーを見つけます。コピーはそのまま残す、名前に重複の印を付ける、名前変更のときにゴミ箱へ移動する、から選べます。コピーは AI に送られずクレジットも消費しません。ゴミ箱に移したコピーはアクティビティ履歴から元に戻せます。同じページを 2 回スキャンしたファイルのように、見た目が似ているだけのファイルはコピーとして扱いません。',
  },
  ko: {
    title: '중복 파일',
    summary: 'Zush는 일괄 작업마다 파일 내용을 비교해 이름과 상관없이 완전히 같은 사본을 표시합니다. 이름을 변경할 때 그대로 두거나, 파일 이름에 표시하거나, 휴지통으로 옮길 수 있습니다. 사본은 AI로 보내지 않아 크레딧이 들지 않고, 실행 취소하면 휴지통에서 되돌아옵니다.',
    docsLink: '중복 감지 작동 방식',
    faqQuestion: 'Zush로 중복 파일을 찾아 삭제할 수 있나요?',
    faqAnswer: '네. 템플릿에서 중복 파일 감지를 켜면 Zush가 일괄 작업의 모든 파일 내용을 비교해, 이름과 상관없이 완전히 같은 사본을 찾습니다. 사본을 그대로 둘지, 이름에 중복 표시를 붙일지, 이름을 변경할 때 휴지통으로 옮길지 선택하세요. 사본은 AI로 보내지 않으므로 크레딧이 들지 않고, 휴지통으로 옮긴 사본은 활동 기록에서 되돌릴 수 있습니다. 같은 페이지를 두 번 스캔한 파일처럼 비슷해 보이기만 하는 파일은 사본으로 보지 않습니다.',
  },
  'zh-cn': {
    title: '重复文件',
    summary: 'Zush 会比较每批文件的内容，无论文件名是什么，都能标出完全相同的副本。重命名时可以保留副本、在文件名中标记，或移到废纸篓。副本从不发送给 AI，不消耗额度；撤销即可把移到废纸篓的副本放回原处。',
    docsLink: '重复检测的工作方式',
    faqQuestion: 'Zush 能查找并删除重复文件吗？',
    faqAnswer: '可以。在模板中开启重复文件检测后，Zush 会比较批次中每个文件的内容，无论文件名是什么，都能找出完全相同的副本。你可以选择保留副本、在文件名中加上重复标记，或在重命名时移到废纸篓。副本不会发送给 AI，也不消耗额度；移到废纸篓的副本可以在活动记录中恢复。只是看起来相似的文件，例如同一页的两次扫描，不会被当作副本。',
  },
};
