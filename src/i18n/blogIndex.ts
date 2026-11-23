import type { Locale } from '@/i18n/config';

/**
 * Copy for the translated blog lists at `/<locale>/blog`. Each list shows only
 * the posts that exist in that language and links back to the English blog,
 * which holds the full set.
 */
export interface BlogIndexCopy {
  title: string;
  description: string;
  intro: string;
  allPostsHeading: string;
  englishBlogLink: string;
}

export const BLOG_INDEX_COPY: Record<Exclude<Locale, 'en'>, BlogIndexCopy> = {
  de: {
    title: 'Zush Blog auf Deutsch: Dateien umbenennen und ordnen',
    description:
      'Anleitungen und Vergleiche auf Deutsch: Dateien mit KI umbenennen, in Ordner sortieren und auf Mac und Windows ordnen. Alle übersetzten Zush-Artikel.',
    intro: 'Alle Artikel, die es auf Deutsch gibt, neueste zuerst. Weitere Anleitungen stehen im englischen Blog.',
    allPostsHeading: 'Alle Artikel auf Deutsch',
    englishBlogLink: 'Englischen Blog öffnen',
  },
  fr: {
    title: 'Blog Zush en français : renommer et ranger ses fichiers',
    description:
      'Guides et comparatifs en français pour renommer des fichiers avec l’IA, les classer dans des dossiers et organiser un Mac ou un PC Windows.',
    intro: 'Tous les articles disponibles en français, du plus récent au plus ancien. D’autres guides sont publiés sur le blog en anglais.',
    allPostsHeading: 'Tous les articles en français',
    englishBlogLink: 'Ouvrir le blog en anglais',
  },
  es: {
    title: 'Blog de Zush en español: renombrar y organizar archivos',
    description:
      'Guías y comparativas en español para renombrar archivos con IA, ordenarlos en carpetas y organizar tu Mac o tu PC con Windows.',
    intro: 'Todos los artículos disponibles en español, del más reciente al más antiguo. Hay más guías en el blog en inglés.',
    allPostsHeading: 'Todos los artículos en español',
    englishBlogLink: 'Abrir el blog en inglés',
  },
  'pt-br': {
    title: 'Blog do Zush em português: renomear e organizar arquivos',
    description:
      'Guias e comparativos em português para renomear arquivos com IA, organizá-los em pastas e arrumar seu Mac ou PC com Windows.',
    intro: 'Todos os artigos disponíveis em português, do mais recente ao mais antigo. Há mais guias no blog em inglês.',
    allPostsHeading: 'Todos os artigos em português',
    englishBlogLink: 'Abrir o blog em inglês',
  },
  it: {
    title: 'Blog di Zush in italiano: rinominare e ordinare i file',
    description:
      'Guide e confronti in italiano per rinominare i file con l’IA, ordinarli in cartelle e organizzare un Mac o un PC Windows.',
    intro: 'Tutti gli articoli disponibili in italiano, dal più recente. Altre guide sono sul blog in inglese.',
    allPostsHeading: 'Tutti gli articoli in italiano',
    englishBlogLink: 'Apri il blog in inglese',
  },
  nl: {
    title: 'Zush-blog in het Nederlands: bestanden hernoemen en ordenen',
    description:
      'Handleidingen en vergelijkingen in het Nederlands: bestanden hernoemen met AI, in mappen sorteren en je Mac of Windows-pc ordenen.',
    intro: 'Alle artikelen die in het Nederlands beschikbaar zijn, nieuwste eerst. Meer handleidingen staan op de Engelse blog.',
    allPostsHeading: 'Alle artikelen in het Nederlands',
    englishBlogLink: 'Engelse blog openen',
  },
  tr: {
    title: 'Zush Blog Türkçe: dosyaları yeniden adlandırma ve düzenleme',
    description:
      'Dosyaları yapay zekâyla yeniden adlandırma, klasörlere ayırma ve Mac ile Windows’ta düzenleme üzerine Türkçe rehberler ve karşılaştırmalar.',
    intro: 'Türkçe yayımlanan tüm yazılar, en yeniden eskiye. Daha fazla rehber İngilizce blogda.',
    allPostsHeading: 'Türkçe tüm yazılar',
    englishBlogLink: 'İngilizce blogu aç',
  },
  ja: {
    title: 'Zushブログ（日本語）：ファイル名の変更と整理',
    description:
      'AIによるファイル名の変更、フォルダへの仕分け、MacとWindowsでのファイル整理について、日本語で読めるガイドと比較記事をまとめています。',
    intro: '日本語で公開している記事の一覧です（新しい順）。ほかのガイドは英語版ブログにあります。',
    allPostsHeading: '日本語の記事一覧',
    englishBlogLink: '英語版ブログを開く',
  },
  ko: {
    title: 'Zush 블로그(한국어): 파일 이름 변경과 정리',
    description:
      'AI로 파일 이름 바꾸기, 폴더별로 분류하기, Mac과 Windows에서 파일 정리하기에 관한 한국어 가이드와 비교 글을 모았습니다.',
    intro: '한국어로 볼 수 있는 모든 글을 최신순으로 정리했습니다. 더 많은 가이드는 영어 블로그에 있습니다.',
    allPostsHeading: '한국어 글 전체',
    englishBlogLink: '영어 블로그 열기',
  },
  'zh-cn': {
    title: 'Zush 博客（简体中文）：文件重命名与整理',
    description: '关于用 AI 重命名文件、按文件夹分类以及在 Mac 和 Windows 上整理文件的中文指南与对比文章。',
    intro: '这里列出所有中文文章，按发布时间从新到旧排列。更多指南请查看英文博客。',
    allPostsHeading: '全部中文文章',
    englishBlogLink: '打开英文博客',
  },
};
