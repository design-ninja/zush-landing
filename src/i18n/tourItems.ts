import type { Locale } from './config';

type TourItemCopy = { title: string; description: string };
type TourExtraId = 'zush-cloud-ai' | 'naming' | 'windows-batch-rename';

/**
 * Tour tabs that the per-locale showcase copy does not cover yet. Without these,
 * localized pages fall back to the English title and caption from showcaseMedia.
 */
export const LOCALIZED_TOUR_EXTRAS: Record<Exclude<Locale, 'en'>, Record<TourExtraId, TourItemCopy>> = {
  de: {
    'zush-cloud-ai': { title: 'Zush Cloud AI', description: 'Sofort umbenennen – mit verwalteter Cloud-Analyse, ohne Einrichtung' },
    naming: { title: 'Namensmuster', description: 'Wiederverwendbare Namensmuster mit flexiblen Variablen erstellen' },
    'windows-batch-rename': { title: 'Stapelumbenennung unter Windows', description: 'Dateien in Zush für Windows mit KI nach ihrem Inhalt gesammelt umbenennen' },
  },
  fr: {
    'zush-cloud-ai': { title: 'Zush Cloud AI', description: 'Renommez tout de suite grâce à l’analyse cloud gérée, sans configuration' },
    naming: { title: 'Modèles de noms', description: 'Créez des modèles de noms réutilisables avec des variables flexibles' },
    'windows-batch-rename': { title: 'Renommage par lot sous Windows', description: 'Renommez des fichiers par lot avec l’IA selon leur contenu dans Zush pour Windows' },
  },
  es: {
    'zush-cloud-ai': { title: 'Zush Cloud AI', description: 'Empieza a renombrar al instante con análisis en la nube gestionado, sin configuración' },
    naming: { title: 'Patrones de nombres', description: 'Crea patrones de nombres reutilizables con variables flexibles' },
    'windows-batch-rename': { title: 'Renombrado por lotes en Windows', description: 'Renombra archivos por lotes con IA según su contenido en Zush para Windows' },
  },
  'pt-br': {
    'zush-cloud-ai': { title: 'Zush Cloud AI', description: 'Comece a renomear na hora com análise gerenciada na nuvem, sem configuração' },
    naming: { title: 'Padrões de nomes', description: 'Crie padrões de nomes reutilizáveis com variáveis flexíveis' },
    'windows-batch-rename': { title: 'Renomeação em lote no Windows', description: 'Renomeie arquivos em lote com IA pelo conteúdo no Zush para Windows' },
  },
  it: {
    'zush-cloud-ai': { title: 'Zush Cloud AI', description: 'Inizia subito a rinominare con l’analisi cloud gestita, senza configurazione' },
    naming: { title: 'Schemi di nomi', description: 'Crea schemi di nomi riutilizzabili con variabili flessibili' },
    'windows-batch-rename': { title: 'Rinomina in batch su Windows', description: 'Rinomina i file in batch con l’IA in base al contenuto in Zush per Windows' },
  },
  nl: {
    'zush-cloud-ai': { title: 'Zush Cloud AI', description: 'Begin direct met hernoemen via beheerde cloudanalyse, zonder installatie' },
    naming: { title: 'Naampatronen', description: 'Maak herbruikbare naampatronen met flexibele variabelen' },
    'windows-batch-rename': { title: 'Batch hernoemen op Windows', description: 'Hernoem bestanden in batch met AI op basis van hun inhoud in Zush voor Windows' },
  },
  tr: {
    'zush-cloud-ai': { title: 'Zush Cloud AI', description: 'Kurulum olmadan, yönetilen bulut analiziyle hemen yeniden adlandırmaya başlayın' },
    naming: { title: 'Adlandırma kalıpları', description: 'Esnek değişkenlerle yeniden kullanılabilir adlandırma kalıpları oluşturun' },
    'windows-batch-rename': { title: 'Windows’ta toplu yeniden adlandırma', description: 'Windows için Zush ile dosyaları içeriklerine göre yapay zekâyla toplu olarak yeniden adlandırın' },
  },
  ja: {
    'zush-cloud-ai': { title: 'Zush Cloud AI', description: '設定不要のマネージドクラウド分析で、すぐに名前変更を始められます' },
    naming: { title: '命名パターン', description: '柔軟な変数で再利用できる命名パターンを作成' },
    'windows-batch-rename': { title: 'Windowsで一括名前変更', description: 'Zush for WindowsでAIがファイルの内容に基づいて一括で名前を変更' },
  },
  ko: {
    'zush-cloud-ai': { title: 'Zush Cloud AI', description: '설정 없이 관리형 클라우드 분석으로 바로 이름 변경을 시작하세요' },
    naming: { title: '이름 패턴', description: '유연한 변수로 재사용 가능한 이름 패턴 만들기' },
    'windows-batch-rename': { title: 'Windows 일괄 이름 변경', description: 'Windows용 Zush에서 AI로 파일 내용을 기준으로 일괄 이름 변경' },
  },
  'zh-cn': {
    'zush-cloud-ai': { title: 'Zush Cloud AI', description: '无需设置，使用托管云端分析立即开始重命名' },
    naming: { title: '命名模式', description: '使用灵活变量创建可重复使用的命名模式' },
    'windows-batch-rename': { title: 'Windows 批量重命名', description: '在 Windows 版 Zush 中按文件内容用 AI 批量重命名' },
  },
};
