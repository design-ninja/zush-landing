import type { HomeCopy } from '@/i18n/copy';
import type { ProfessionLocaleCopy } from '@/i18n/professions/types';

export const home = {
  "heroTitle": "Dosya Adlandırıcı\nMac ve Windows için",
  "heroAccent": "Dosya Adlandırıcı",
  "heroSubtitle": "Dosyaları içeriklerine göre yapay zekâyla toplu yeniden adlandırın. Zush; ekran görüntüleri, PDF’ler, fotoğraflar, videolar, sesler ve belgeler dâhil 100’den fazla biçimi destekler, seçtiğiniz ayrıntıları tam olarak çıkarır ve belirlediğiniz dosya adlarına dönüştürür.",
  "heroHighlights": [
    "Dosyaları içeriklerine göre yapay zekâyla toplu yeniden adlandırın"
  ],
  "buyPro": "PRO satın al",
  "trustSignals": [
    "Ücretsiz başlayın",
    "Kayıt gerekmez",
    "Kredi kartı gerekmez"
  ],
  "heroModes": [
    "Bulut AI",
    "BYOK",
    "Çevrimdışı",
    "100+ biçim"
  ],
  "featuresTitle": "Zush Özellikleri",
  "featuresDescription": "Önizlemeler, şablonlar, klasör izleme ve tek tıkla geri alma ile dağınık dosya adlarını açık ve tutarlı hâle getirin.",
  "supportedFormats": "Desteklenen dosya biçimleri",
  "images": "Görseller",
  "designLabel": "Tasarım",
  "documents": "Belgeler",
  "videosLabel": "Videolar",
  "audioLabel": "Ses",
  "cloudFoldersTitle": "Bulut klasörleriyle çalışır",
  "cloudFoldersDescription": "Zush, iCloud Drive, Google Drive, Dropbox ve OneDrive'nin senkronize tutulanları da dahil olmak üzere herhangi bir yerel klasördeki dosyaları yeniden adlandırır. Bağlanacak hesap yok.",
  "downloadTitle": "Zush’u ücretsiz deneyin",
  "downloadSubtitle": "Dosyaları toplu yeniden adlandırın, klasörleri izleyin ve ekran görüntülerini, PDF’leri, fotoğrafları, sesleri, videoları ve belgeleri içeriklerine göre adlandırın.",
  "downloadHintPrefix": "Ücretsiz · kredi kartı gerekmez",
  "useCasesTitle": "Yapay zekâyla dosya adlandırmayı kimler kullanır?",
  "useCasesDescription": "İş akışınıza en yakın rolü seçin. Her kart sizi aynı tür dosya karmaşası için hazırlanmış Zush sayfasına götürür.",
  "faqTitle": "Sık sorulan sorular",
  "faqTitleAccent": "Sorular",
  "faqDescription": "Zush hakkında bilmeniz gerekenler tek yerde",
  "featureCards": {
    "aiAnalysis": {
      "title": "Yapay zekâ analizi",
      "description": "Görsel ve PDF’lerden ses, video ve Office dosyalarına kadar 100’den fazla dosya biçimini tek seferde analiz edip yeniden adlandırın."
    },
    "foldersMonitoring": {
      "title": "Klasör izleme",
      "description": "Bir veya birden fazla klasörü izleyin. Zush arka planda çalışır ve yeni dosyaları otomatik olarak işler."
    },
    "batchRename": {
      "title": "Toplu yeniden adlandırma",
      "description": "Birden fazla dosyayı sürükleyip bırakın. Zush dosyaları saniyeler içinde analiz eder ve adlarını değiştirir."
    },
    "templates": {
      "title": "Şablonlar",
      "description": "Ekran görüntüleri, giderler, müzik parçaları, müşteri çalışmaları, yasal dosyalar, seyahat rezervasyonları ve izlenen klasörler için yeniden kullanılabilir ayarlar kaydedin."
    },
    "namingBlocks": {
      "title": "Adlandırma Blokları",
      "description": "Tarih, meta veri, ses, fotoğraf, finans, hukuk, seyahat, müşteri ve yapay zekâ alanları için 145’ten fazla blokla tutarlı dosya adları oluşturun."
    },
    "customAiBlocks": {
      "title": "Özel Yapay Zekâ Blokları",
      "description": "Zush’un çıkarmasını istediğiniz ayrıntıyı tarif edin ve bunu her şablonda Özel Yapay Zekâ Bloğu olarak yeniden kullanın."
    },
    "audioSupport": {
      "title": "Ses desteği",
      "description": "MP3, M4A, WAV, FLAC, OGG, WebM ve MPGA dosyalarını meta veri, tanıma, transkript ve ses alanlarıyla yeniden adlandırın."
    },
    "customPatterns": {
      "title": "Özel kalıplar",
      "description": "{title}, {original}, {date}, {time} veya {category} gibi değişkenlerle kendi dosya adı kalıbınızı oluşturun."
    },
    "smartMetadata": {
      "title": "Akıllı meta veri",
      "description": "Finder etiketlerini ve Spotlight meta verilerini otomatik ekleyerek dosyaları doğal aramayla anında bulun."
    },
    "renameHistory": {
      "title": "Yeniden adlandırma geçmişi",
      "description": "Her değişikliği izleyin. Sonuç uygun değilse tek tıklamayla orijinal dosya adına dönün."
    },
    "customPrompts": {
      "title": "Özel yapay zekâ istemleri",
      "description": "Adlar, etiketler ve meta veriler için kurallar belirleyerek yapay zekâ çıktısını tarzınıza ve iş akışınıza uyarlayın."
    },
    "byok": {
      "title": "Kendi anahtarınızı kullanın",
      "description": "Bulut yeniden adlandırma için kendi Gemini, Groq, OpenAI veya Claude API anahtarınızı bağlayın. FREE tüm modlarda ortak 50 işlem sunar; PRO limiti kaldırır. Anahtarlar yerel ve güvenli depolamada tutulur."
    },
    "offlineAi": {
      "title": "Çevrimdışı Yapay Zekâ modu",
      "description": "Ollama aracılığıyla özel yerel modeller. Desteklenen dosyaları analiz içeriğini Zush bulutuna veya yapay zekâ sağlayıcılarına göndermeden işleyin."
    },
    "cloudAi": {
      "title": "Bulut yapay zekâ",
      "description": "İsteği kendi relay’imiz üzerinden ticari bir yapay zekâ sağlayıcısına iletir; sağlayıcının standart API koşulları geçerlidir. Relay, API anahtarının uygulamadan çıkarılamaması için vardır."
    },
    "bandTitle": "Zush’u güvenle kullanmanın 3 yolu",
    "bandSubtitle": "Kutudan çıktığı gibi çalışan bulut yapay zekâsı, kendi API anahtarın veya Ollama ile tamamen çevrimdışı.",
    "addFolder": "Klasör ekle",
    "promptRules": "İstem kuralları",
    "customBadge": "Özel",
    "templateActive": "Etkin şablon",
    "templateNames": [
      "Ekran Görüntüleri",
      "Müzik Parçaları",
      "Müşteri Notları"
    ],
    "namingBlockLabels": [
      "{date}",
      "{client_name}",
      "{artist}",
      "{bpm}",
      "{invoice_number}",
      "{title}"
    ],
    "apiKeyConnected": "API anahtarı bağlandı",
    "terminal": "terminali",
    "localModelReady": "Yerel model hazır",
    "today": "Bugün",
    "undo": "Geri al",
    "analysisNewName": "bali_gun_batimi_plaji.png",
    "batchNewNames": [
      "kanban_panosi_arayuzu.png",
      "ise_alim_plani_notlari.docx",
      "yatirimci_guncelleme_sunumu.pptx"
    ],
    "metadataFileName": "siberpunk_sanati.png",
    "metadataTags": [
      "glitch sanatı",
      "vaporwave",
      "heykel",
      "siberpunk",
      "dijital sanat",
      "palmiye"
    ],
    "historyNewNames": [
      "pano_inceleme_notlari.docx",
      "q1_gelir_raporu.xlsx"
    ],
    "promptExample": "Adları kısa tutun, konuyu başa alın ve eşleşen Finder etiketlerini ekleyin.",
    "audioNewNames": [
      "lofi_piyano_dongusu_92bpm.mp3",
      "musteri_kesif_gorusmesi.m4a"
    ]
  },
  "offlineAiModal": {
    "title": "Cihazınızda kalan yapay zekâ",
    "description": "Çevrimdışı Yapay Zekâ isteğe bağlı bir moddur. Yerel Ollama modeli doğrudan Mac veya Windows bilgisayarınızda, bulut olmadan çalışır.",
    "points": [
      "Hiçbir şey cihazınızdan ayrılmaz. Zush bulutu da yoktur, üçüncü taraf yapay zekâ da.",
      "Ekran görüntüleri, fotoğraflar, PDF’ler ve belge önizlemeleri için idealdir.",
      "Daha fazla model veya dosya türü gerektiğinde istediğiniz zaman Bulut ya da BYOK’a geçin."
    ],
    "proTitle": "Her planda kullanılabilir",
    "proDescription": "FREE, Cloud AI, BYOK ve Çevrimdışı Yapay Zekâ arasında ortak 50 yeniden adlandırma sunar. PRO limiti kaldırır. Ollama ve yerel model ayrıca kurulur.",
    "closeLabel": "Kapat"
  },
  "showcase": {
    "title": "Zush turuna çıkın",
    "titleAccent": "Zush",
    "description": "Her özellik için kısa bir demo — nasıl çalıştığını görmek için sekmeye tıklayın",
    "playShowcase": "Demoyu oynat",
    "switchTo": "Şuna geç:",
    "items": {
      "batch-rename": {
        "title": "Yapay zekâyla toplu yeniden adlandırma",
        "description": "Uygulamadan önce dosyaları gerçek içeriklerine göre topluca inceleyin ve yeniden adlandırın"
      },
      "monitor": {
        "title": "Klasör izleme",
        "description": "Klasörleri izleyin ve yeni dosyaları otomatik yeniden adlandırın"
      },
      "activity": {
        "title": "Etkinlik geçmişi",
        "description": "Son yeniden adlandırmaları görün ve gerektiğinde geri alın"
      },
      "statistics": {
        "title": "İstatistikler",
        "description": "Yeniden adlandırma hacmini, klasör izleme payını, etkinlikleri ve dosya türü eğilimlerini görün"
      },
      "templates": {
        "title": "Şablonlar",
        "description": "Yapay zekâyla yeniden adlandırma ve klasör izleme için yeniden kullanılabilir ayarları kaydedin"
      },
      "naming-blocks": {
        "title": "Adlandırma Blokları",
        "description": "Dosya içeriğini kullanarak 145’ten fazla hazır blokla dosya adları oluşturun"
      },
      "custom-ai-blocks": {
        "title": "Özel Yapay Zekâ Blokları",
        "description": "Yapay zekânın ne çıkaracağını açıklayın ve kendi adlandırma bloğunuz olarak yeniden kullanın"
      },
      "tags": {
        "title": "Akıllı etiketler",
        "description": "Dosyaları daha hızlı aramak için akıllı etiketler oluşturun"
      },
      "multilanguage": {
        "title": "Çoklu dil",
        "description": "60’tan fazla dilde dosya adı oluşturun"
      },
      "custom-prompts": {
        "title": "Özel istemler",
        "description": "Kendi talimatlarınızla dosya adı oluşturmayı yönetin"
      },
      "byok": {
        "title": "BYOK",
        "description": "BYOK ile kendi yapay zekâ sağlayıcınızı bağlayın"
      },
      "offline-ai": {
        "title": "Çevrimdışı yapay zekâyla yeniden adlandırma",
        "description": "Desteklenen dosyalar için Ollama’nın özel yerel modellerini kullanın"
      }
    }
  },
  "speedComparison": {
    "eyebrow": "Hız testi",
    "title": "Hızlı çalışın. Net adlar.",
    "titleAccent": "Net adlar.",
    "description": "Aynı 10 dosya, aynı hedef: içeriğe göre yeniden adlandırma. Dosyalar için üretilmiş bir araç ile genel amaçlı bir yapay zekâ aracı karşı karşıya.",
    "zushLabel": "Zush",
    "zushBadge": "Tamamlandı",
    "zushCaption": "Dosyalar için üretildi. Bırakın, net adlar alın ve devam edin.",
    "rivalLabel": "Claude Cowork",
    "rivalStatus": "Hâlâ çalışıyor",
    "rivalDoneLabel": "Sonunda tamamlandı",
    "rivalCaption": "Genel görevlerde akıllı; ancak günlük dosya işlerinde yavaş.",
    "rivalPlaceholderHint": "Karşılaştırma videosu yakında",
    "runningLabel": "Çalışıyor",
    "replayLabel": "Yeniden oynat",
    "skipToEndLabel": "Sona geç",
    "disclaimer": "Claude ve Claude Cowork, Anthropic PBC’nin ticari markalarıdır. Zush’un Anthropic ile bağlantısı veya Anthropic tarafından onayı yoktur."
  },
  "whyZush": {
    "title": "Zush neden sıradan dosya adlandırıcılardan daha güçlü?",
    "titlePlatform": "Zush neden {os} için daha iyi?",
    "description": "Yapay zekâyla toplu yeniden adlandırma, otomatik klasör izleme, geri alma, BYOK, Çevrimdışı Yapay Zekâ ve karma biçim desteği tek bir masaüstü uygulamasında",
    "descriptionPlatform": "{os} için yerel masaüstü deneyimi, hızlı yeniden adlandırma, yeniden kullanılabilir şablonlar ve daha az sürtünme",
    "nativeEyebrow": "Masaüstüne yerel deneyim",
    "nativeEyebrowPlatform": "{os} yerel deneyimi",
    "nativeTitle": "Yerel, hızlı, modern",
    "nativeDescription": "Zush gerçek bir masaüstü uygulaması gibi hissettirir: hızlı açılır, temiz bir arayüz sunar ve sisteminize doğal biçimde uyum sağlar.",
    "nativeDescriptionPlatform": "Zush gerçek bir yerel {os} uygulaması gibi hissettirir: hızlı açılır, temiz bir arayüz sunar ve sisteminize doğal biçimde uyum sağlar.",
    "pricingTrustItems": [
      "✨ Ücretsiz deneyin",
      "∞ Sınırsız PRO",
      "↩️ 14 gün iade"
    ],
    "priceEyebrow": "Yeniden kullanılabilir şablonlar",
    "priceTitle": "Her klasör için tek ayar",
    "priceDescription": "Ekran görüntüleri, giderler, müzik parçaları, müşteri notları, yasal dosyalar, seyahat rezervasyonları ve izlenen klasörler için adlandırma kurallarını kaydedin.",
    "priceLabel": "11 yerleşik şablon",
    "speedEyebrow": "Çok hızlı",
    "speedTitle": "Saniyeler içinde yeniden adlandırın",
    "speedDescription": "Düzen, gerçek işinizi yavaşlatmadığında kalıcı olur. Dosyaları bırakın, inceleyin, uygulayın ve devam edin.",
    "formatsEyebrow": "100’den fazla desteklenen biçim",
    "formatsTitle": "Ekran görüntüleri, PDF’ler, fotoğraflar, sesler, belgeler ve videolar",
    "formatsDescription": "AVIF, RAW, Office dosyaları, PDF’ler, altyazılar, MP3, M4A, WAV, FLAC ve yaygın video biçimleri tek bir içerik odaklı toplu işlemde desteklenir.",
    "controlEyebrow": "Adlandırma Blokları",
    "controlTitle": "Profesyonel işler için yapılandırılmış dosya adları",
    "controlDescription": "Profesyoneller kendi işlerine uygun bloklarla dosya adı kalıplarını oluşturabilir. Yapay zekâ her dosyayı okur ve blokları seçtiğiniz ayrıntılarla — müşteri, tarih, fatura numarası, konum veya proje — doldurur.",
    "workflowSteps": [
      "Fotoğrafçılar: tarih, müşteri, çekim, sahne",
      "Doktorlar: ziyaret türü, tarih, kayıt türü",
      "Muhasebeciler: tedarikçi, fatura, dönem"
    ]
  },
  "useCases": {
    "items": [
      {
        "title": "Tasarımcılar",
        "description": "Yüzlerce ekran görüntüsü arasında kaybolmadan maketleri, arayüz öğelerini ve referansları saniyeler içinde bulun."
      },
      {
        "title": "Fotoğrafçılar",
        "description": "CR2, NEF, ARW, DNG, RAF ve RW2 gibi RAW biçimlerinin desteğiyle büyük fotoğraf arşivlerini düzenleyin."
      },
      {
        "title": "Pazarlama ve sosyal medya",
        "description": "Kampanya sunumlarını, dışa aktarmaları, ekran görüntülerini ve varlıkları düzenli tutup doğru dosyayı hızla bulun."
      },
      {
        "title": "Geliştiriciler",
        "description": "Belgeleri, hata raporlarını ve PR inceleme ekran görüntülerini düzenli ve aranabilir tutun."
      },
      {
        "title": "İçerik üreticileri",
        "description": "Küçük resimleri, b-roll referanslarını ve görsel varlıkları düzenli tutun."
      },
      {
        "title": "Ürün yöneticileri",
        "description": "PRD’leri, toplantı notlarını, elektronik tabloları ve paydaş sunumlarını anında aranabilir hâle getirin."
      }
    ]
  },
  "workflows": {
    "title": "Zush neleri yeniden adlandırabilir?",
    "description": "Bir iş akışı seçin; her sayfa Zush’un o dosya türünü içeriğine göre nasıl adlandırdığını gösterir.",
    "items": {
      "screenshots": {
        "title": "Ekran görüntülerini yeniden adlandır",
        "description": "\"Ekran Görüntüsü 2026-07-03\", ekranda ne olduğunu anlatan bir ada dönüşür."
      },
      "pdfs": {
        "title": "PDF’leri ve taramaları yeniden adlandır",
        "description": "Faturaları, sözleşmeleri ve taramaları belge içindeki metne göre adlandırın."
      },
      "photos": {
        "title": "Fotoğrafları yeniden adlandır",
        "description": "RAW, HEIC ve JPG dosyalarını konuya ve sahneye göre adlandırın."
      },
      "documents": {
        "title": "Belgeleri yeniden adlandır",
        "description": "Word, Excel, PowerPoint ve iWork dosyalarını konuya göre adlandırın."
      },
      "design": {
        "title": "Tasarım dosyalarını yeniden adlandır",
        "description": "Figma, Sketch, PSD ve dışa aktarılan dosyaları içeriklerine göre adlandırın."
      },
      "videos": {
        "title": "Videoları yeniden adlandır",
        "description": "Kayıtları ve klipleri karelere ve bağlama göre adlandırın."
      },
      "audio": {
        "title": "Ses dosyalarını yeniden adlandır",
        "description": "MP3, WAV ve sesli notları sese ve meta verilere göre adlandırın."
      },
      "organizer": {
        "title": "Dosyaları yapay zekâyla düzenle",
        "description": "İndirilenler ve karma klasörleri aranabilir adlarla düzenleyin."
      },
      "batch": {
        "title": "Dosyaları toplu yeniden adlandır",
        "description": "Yüzlerce dosyayı aynı anda, önizleme ve tek tıklamayla geri alma desteğiyle işleyin."
      },
      "offline": {
        "title": "Çevrimdışı yapay zekâ adlandırıcı",
        "description": "Ollama aracılığıyla yerel modeller; dosyalar cihazınızdan asla ayrılmaz."
      }
    }
  },
  "faqItems": [
    {
      "question": "Zush nedir?",
      "answer": "Zush, Mac ve Windows için dosyaları yapay zekâyla otomatik olarak yeniden adlandıran akıllı bir masaüstü uygulamasıdır. Görselleri, videoları, PDF’leri ve desteklenen belgeleri analiz ederek anlamlı adlar ve meta veriler oluşturur."
    },
    {
      "question": "Hangi dosya biçimleri destekleniyor?",
      "answer": "Zush; görselleri, sesleri, videoları, ekran görüntülerini, PDF’leri, belgeleri, elektronik tabloları, sunumları, metin dosyalarını, CSV, SVG ve daha birçok günlük biçimi destekler."
    },
    {
      "question": "Zush AI Rename nasıl çalışır?",
      "answer": "AI Rename, dosyaları içeriklerine göre yeniden adlandırmak için yapay zekâ kullanır. Dosyaları Zush penceresine sürükleyip bırakmanız yeterlidir; dosyalar saniyeler içinde analiz edilir ve yeniden adlandırılır. Değişiklikleri uygulamadan önce her adı inceleyebilir veya yeniden oluşturabilirsiniz. Ekran görüntülerini, tasarım dosyalarını, sesleri, videoları, PDF’leri, iWork belgelerini ve indirilenleri tek geçişte düzenlemek için idealdir."
    },
    {
      "question": "Klasör izleme nasıl çalışır?",
      "answer": "Zush seçtiğiniz klasörleri arka planda izler. Yeni desteklenen dosyalar eklendiğinde, çevrimiçiyken otomatik olarak analiz edilir ve yeniden adlandırılır."
    },
    {
      "question": "Yapay zekânın oluşturduğu dosya adını yeniden üretebilir miyim?",
      "answer": "Evet. AI Rename bölümünde dosyayı seçin ve yeni bir öneri almak için Yeniden Oluştur’a tıklayın."
    },
    {
      "question": "Adlar ve etiketler için yapay zekâ istemini özelleştirebilir miyim?",
      "answer": "Evet. Kısa adlar, ana konunun başta olması veya yalnızca belirli etiketlerin kullanılması gibi dosya adı ve meta veri kurallarınızı yazabilirsiniz."
    },
    {
      "question": "Verilerim güvende mi?",
      "answer": "Orijinal dosyalarınız bilgisayarınızda kalır. Bulut modunda yalnızca analiz için gereken içerik seçtiğiniz yapay zekâ sağlayıcısına gönderilir. Çevrimdışı Yapay Zekâ modunda Ollama, desteklenen dosyaları yerel olarak işler."
    },
    {
      "question": "Değişiklikleri geri alabilir miyim?",
      "answer": "Evet. Etkinlik geçmişinden dosyaları tek tıklamayla orijinal adlarına döndürebilirsiniz."
    },
    {
      "question": "Zush birden fazla dili ve tarih biçimini destekliyor mu?",
      "answer": "Evet. Zush 60’tan fazla dilde dosya adı oluşturabilir ve tercih ettiğiniz tarih biçimini kullanabilir."
    },
    {
      "question": "Ücretlendirme nasıl çalışır?",
      "answer": "Zush PRO iki plan sunar: ayda 10 USD Monthly veya tek seferlik 48 USD One-Time. BYOK ve Çevrimdışı Yapay Zekâ FREE’de de sunulur; her iki PRO planı ortak 50 yeniden adlandırma limitini kaldırır."
    },
    {
      "question": "BYOK (Bring Your Own Key) nedir?",
      "answer": "BYOK, tüm planlardaki kullanıcıların kendi Gemini, Groq, OpenAI veya Claude API anahtarlarını bağlayarak bulut yeniden adlandırmayı kullanmasını sağlar. FREE tüm modlarda ortak 50 işlem sunar; PRO limiti kaldırır. Anahtar yerel ve güvenli depolamada tutulur."
    },
    {
      "question": "Monthly ile One-Time arasındaki fark nedir?",
      "answer": "Monthly plan ayda 10 USD’dir ve esnektir. One-Time plan 48 USD’dir ve ömür boyu erişim sağlar. BYOK ve Çevrimdışı Yapay Zekâ FREE’de de sunulur; her iki plan ortak 50 yeniden adlandırma limitini kaldırır."
    },
    {
      "question": "Hangi işletim sistemleri destekleniyor?",
      "answer": "Zush macOS 15 Sequoia ve daha yeni sürümlerde, ayrıca Windows 10 ve 11’de çalışır. Mac için imzalanmış dmg, Mac App Store ve Homebrew; Windows için Microsoft Store seçenekleri vardır."
    },
    {
      "question": "Uygulama hangi yapay zekâ modelini kullanıyor?",
      "answer": "Zush görselleri, videoları ve desteklenen belgeleri hızlı ve doğru analiz etmek için modern çok modlu yapay zekâ modelleri kullanır. Belirli model, optimizasyonlarla birlikte değişebilir."
    },
    {
      "question": "Uygulama çevrimdışı çalışır mı?",
      "answer": "Bulut işleme için internet gerekir. tüm planlardaki kullanıcılar Ollama ve uyumlu bir model kurduktan sonra Çevrimdışı Yapay Zekâ’yı etkinleştirebilir."
    },
    {
      "question": "Ses veya video dosyaları destekleniyor mu?",
      "answer": "Zush 3.0; MP4, MOV, M4V, MPEG, 3GP, TS, MTS, M2TS, DV ve VOB videolarının yanı sıra MP3, M4A, WAV, FLAC, OGG, WebM ve MPGA ses dosyalarını destekler. Ses analizi meta verileri, tanımayı ve transkript bağlamını kullanabilir."
    },
    {
      "question": "Uygulama bana uygun değilse para iadesi alabilir miyim?",
      "answer": "Evet. Zush 14 günlük para iade garantisi sunar. Ayrıntılar iade politikasında yer alır."
    }
  ],
  "showcaseSlides": [
    {
      "files": [
        {
          "before": "IMG_0842.JPG",
          "after": "sari_sapkali_pug.jpg",
          "img": "/images/examples/pug.jpg",
          "type": "image"
        },
        {
          "before": "track_01_final.mp3",
          "after": "lofi_piyano_dongusu_92bpm.mp3",
          "type": "audio"
        },
        {
          "before": "checkout-flow.fig",
          "after": "yatirimci_guncelleme_sunumu.fig",
          "type": "design",
          "label": "incir"
        },
        {
          "before": "budget_export_copy(2).xlsx",
          "after": "urun_lansman_butcesi.xlsx",
          "type": "sheet"
        },
        {
          "before": "client-brief-scan.pdf",
          "after": "musteri_yaratici_brifi.pdf",
          "type": "pdf"
        },
        {
          "before": "demo_take_02.mov",
          "after": "ayarlar_kenar_cubugu_tanitimi.mov",
          "img": "/images/examples/videos/settings-sidebar-walkthrough.webp",
          "type": "video"
        }
      ]
    },
    {
      "files": [
        {
          "before": "voice_memo_042.m4a",
          "after": "musteri_kesif_gorusmesi.m4a",
          "type": "audio"
        },
        {
          "before": "notes_from_call_FINAL.docx",
          "after": "ise_alim_plani_notlari.docx",
          "type": "doc"
        },
        {
          "before": "forecast_2026-03-18_export.xlsx",
          "after": "gelir_tahmini.xlsx",
          "type": "sheet"
        },
        {
          "before": "board-review.key",
          "after": "satis_baslangic_sunumu.key",
          "type": "slides",
          "label": "ANAHTAR"
        },
        {
          "before": "IMG_20240812_143052.jpg",
          "after": "plajdaki_mutlu_kopek.jpg",
          "img": "/images/examples/dog.jpg",
          "type": "image"
        },
        {
          "before": "proposal_draft_approved.pdf",
          "after": "web_sitesi_teklifi.pdf",
          "type": "pdf"
        }
      ]
    },
    {
      "files": [
        {
          "before": "contract_notes_clean.docx",
          "after": "tedarikci_sozlesmesi_notlari.docx",
          "type": "doc"
        },
        {
          "before": "episode_intro_take2.wav",
          "after": "podcast_giris_roportaji.wav",
          "type": "audio"
        },
        {
          "before": "pipeline_export_march.xlsx",
          "after": "mart_satis_hatti.xlsx",
          "type": "sheet"
        },
        {
          "before": "brand-system.sketch",
          "after": "kampanya_inceleme_sunumu.sketch",
          "type": "design",
          "label": "Kroki"
        },
        {
          "before": "scan_2026_03_19.pdf",
          "after": "imzali_hizmet_sozlesmesi.pdf",
          "type": "pdf"
        },
        {
          "before": "PXL_20240720_091234.jpg",
          "after": "parlak_sari_cicekler.jpg",
          "img": "/images/examples/flowers.jpg",
          "type": "image"
        }
      ]
    }
  ]
} satisfies HomeCopy;

export const professions = {
  "accountants": {
    "path": "/for-accountants",
    "seo": {
      "title": "AI Dosya Yeniden Adlandırma ile Muhasebe Belge Yönetimi",
      "description": "Zush faturaları, makbuzları, ekstreleri, vergi formlarını ve taramaları okur, ardından her dosyayı kendi kurallarınıza göre adlandırır. Her istemci için bir Template oluşturun, her partiyi önizleyin ve istediğiniz zaman geri alın. Ölçülmemiş Cloud AI'yi, kendi sağlayıcı anahtarınızı veya yerel Çevrimdışı AI'yı kullanın."
    },
    "pageTitle": "Muhasebe belge yönetimi",
    "hero": {
      "eyebrow": "Muhasebeciler için AI dosya yeniden adlandırıcı",
      "titleLead": "Muhasebe dosyalarını şuna göre yeniden adlandırın:",
      "titleAccent": "satıcı, tarih ve numara",
      "subtitle": "Zush faturaları, makbuzları, ekstreleri, vergi formlarını ve taramaları okur, ardından her dosyayı kendi kurallarınıza göre adlandırır. Her istemci için bir Template oluşturun, her partiyi önizleyin ve istediğiniz zaman geri alın. Ölçülmemiş Cloud AI'yi, kendi sağlayıcı anahtarınızı veya yerel Çevrimdışı AI'yı kullanın.",
      "trustLine": [
        "Unmetered paid plans",
        "Private Offline AI and BYOK",
        "Preview and undo every batch"
      ],
      "photoAlt": "Parlak bir ofiste masaüstü bilgisayarda mali belgeleri inceleyen muhasebeci",
      "downloadMac": "Mac için indirin",
      "downloadWindows": "Windows için indirin",
      "trustAria": "Muhasebe belge yönetimi ekipleri neden Zush kullanıyor?"
    },
    "demoLabel": "Zush faturalar, makbuzlar ve muhasebe belgeleri klasörünü yeniden adlandırma",
    "audiences": {
      "eyebrow": "Kimin için",
      "title": "Muhasebeciler, muhasebeciler ve müşteri muhasebe ekipleri için tasarlandı",
      "description": "Aynı dosya yeniden adlandırma iş akışı, yinelenen müşteri alımı, makbuz işleme, mutabakat desteği ve ay sonu kapanışı için uygundur.",
      "items": [
        {
          "title": "Küçük muhasebe uygulamaları",
          "description": "Faturalar e-posta, portallar, tarayıcılar ve paylaşılan sürücüler aracılığıyla geldiğinde bile her müşteri alım klasörünü kendi kurallarına göre tutun.",
          "imageAlt": "Küçük muhasebe uygulamaları: Faturalar e-posta, portallar, tarayıcılar ve ortak sürücüler aracılığıyla geldiğinde bile her müşteri alım klasörünü kendi kurallarına göre tutun."
        },
        {
          "title": "Bağımsız muhasebeciler",
          "description": "Mutabakat başlamadan önce haftalık makbuz ve indirme yığınını satıcıya, tarihe, tutara ve kategoriye göre adlandırılmış dosyalara dönüştürün.",
          "imageAlt": "Bağımsız muhasebeciler: Mutabakat başlamadan önce haftalık makbuz ve indirme yığınını satıcıya, tarihe, tutara ve kategoriye göre adlandırılmış dosyalara dönüştürün."
        },
        {
          "title": "Müşteri muhasebesi ve AP ekipleri",
          "description": "Paylaşılan Templates'yi kullanarak herkesin kuralı ezberlemeden faturaları, ekstreleri, yakın desteği adlandırmasını ve ihracatları aynı şekilde adlandırmasını sağlayın.",
          "imageAlt": "Müşteri muhasebesi ve AP ekipleri: Paylaşılan Templates'yi kullanarak herkesin faturaları, ekstreleri, yakın desteği adlandırmasını ve kuralı ezberlemeden aynı şekilde ihracat yapmasını sağlayın."
        }
      ]
    },
    "fields": {
      "title": "Her muhasebe dosya adı için alanları seçin",
      "description": "Zush her belgenin görünür içeriğini okur. Template'niz satıcıyı, tarihi, fatura numarasını, tutarı, kategoriyi, vergi dönemini veya soyadında kullanılan özel alanı seçer.",
      "instruction": "Sonucu görmek için bir alan seçin",
      "ariaLabel": "Zush'nin okuduğu muhasebe alanları",
      "hint": "Önerilen dosya adı",
      "items": [
        {
          "label": "Belge tarihi",
          "before": "download (7).pdf",
          "after": "2026-06-12 – Acme Temini – INV-10234",
          "emphasis": "2026-06-12"
        },
        {
          "label": "Satıcı / müşteri",
          "before": "invoice.pdf",
          "after": "2026-06-12 – Acme Temini – INV-10234"
        },
        {
          "label": "Fatura numarası",
          "before": "attachment.pdf",
          "after": "2026-06-12 – Acme Temini – INV-10234",
          "emphasis": "INV-10234"
        },
        {
          "label": "Tutar",
          "before": "bill (3).pdf",
          "after": "2026-06-12 – Acme Arzı – 1,204 ABD Doları"
        },
        {
          "label": "Para birimi",
          "before": "scan_0042.pdf",
          "after": "2026-06-12 – Acme Arzı – 1,204 ABD Doları"
        },
        {
          "label": "Gider kategorisi",
          "before": "IMG_2041.jpg",
          "after": "2026-06-03 – Bütün Gıdalar – Yemekler – 84 USD",
          "emphasis": "Yemekler"
        },
        {
          "label": "Vergi yılı/dönemi",
          "before": "scan.pdf",
          "after": "2025 – 1099-NEC – Rivera Danışmanlık",
          "emphasis": "2025"
        },
        {
          "label": "Ödeme durumu",
          "before": "invoice_copy.pdf",
          "after": "Vertex GmbH – INV-0088 – ÜCRETLİ"
        },
        {
          "label": "Bildirim dönemi",
          "before": "statement_final.pdf",
          "after": "2026-05 – Birinci Ulusal – Banka Özeti",
          "emphasis": "2026-05"
        },
        {
          "label": "Hesap / varlık",
          "before": "export (1).xlsx",
          "after": "2026-2. Çeyrek – Vertex GmbH – Gider Özeti",
          "emphasis": "Vertex GmbH"
        },
        {
          "label": "Özel alan — sade bir dille açıklayın",
          "before": "doc.pdf",
          "after": "2026-06-08 – W-9 – Rivera Danışmanlık",
          "emphasis": "W-9"
        }
      ]
    },
    "privacy": {
      "eyebrow": "İşleme ve gizlilik",
      "title": "Mali belgelerin nasıl işleneceğini seçin",
      "description": "Yönetilen Bulut Yapay Zeka ile hızlı bir şekilde başlayın, BYOK ile firmanızın sağlayıcı hesabı üzerinden analizi yönlendirin veya desteklenen belge analizini yerel Çevrimdışı Yapay Zeka ile makinede tutun.",
      "items": [
        {
          "title": "Yerel modellerle çevrimdışı yapay zeka",
          "description": "Yerel Ollama modelleri, depolandıkları Mac veya Windows PC'deki desteklenen faturaları, makbuzları, ekstreleri ve taramaları analiz eder. Dosya içeriği Zush'ye veya üçüncü taraf bir AI sağlayıcısına gönderilmez.",
          "badge": "Dosyalar makinede kalıyor",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "BYOK ile sağlayıcı hesabınız",
          "description": "Analizi yapay zeka sağlayıcı hesabı ve firmanızın kontrol ettiği API anahtarı aracılığıyla yönlendirin. Anahtar, güvenli yerel depolamada kalır ve ekibiniz, müşteri çalışması için kullanılan sağlayıcıyı ve modeli seçer.",
          "badge": "Anahtarınız ve hesabınız",
          "kind": "byok"
        },
        {
          "title": "Yönetilen Bulut Yapay Zekası",
          "description": "Kolaylığın öncelikli olduğu durumlarda yerleşik yönetimli modu kullanın. Ücretli planlar ölçülmediğinden yinelenen alım ve biriktirilmiş işlerin temizlenmesi belge başına kredi tüketmez.",
          "badge": "En hızlı kurulum",
          "kind": "cloud-ai"
        }
      ],
      "note": "Firmanıza ve müşteri politikanıza uygun işlem modunu seçin. Zush her modda dosyaları yerinde yeniden adlandırır ve saklamaz.",
      "docsLinkLabel": "Modların verileri nasıl işlediğini okuyun"
    },
    "workflow": {
      "eyebrow": "İş akışı",
      "title": "İstemci alım klasörlerindeki dosyaları otomatik olarak yeniden adlandırın",
      "description": "Bir Template istemcisi kurun, alım klasörünü izleyin ve herhangi bir değişiklik yapmadan önce önerilen her partiyi inceleyin.",
      "items": [
        {
          "title": "Dosyaları bir alım klasörüne yönlendirin",
          "description": "E-posta ekleri, portal indirmeleri, tarayıcı çıktısı ve makbuz fotoğrafları, müşteri veya varlık başına izlenen tek bir klasöre yerleştirilebilir."
        },
        {
          "title": "Template istemcisindeki adları inceleyin",
          "description": "Dosya adına ait olan tarihi, satıcıyı, numarayı, tutarı, kategoriyi veya özel alanları seçin ve ardından önerilen grubu uygulamadan önce okuyun."
        },
        {
          "title": "Geri al ile uygula ve izlemeye devam et",
          "description": "Yeniden adlandırma geçmişi bir toplu işlemi geri döndürebilir. Template'yi klasöre atanmış halde tutun, böylece yeni kaynak belgeler zaten aynı kurallara göre adlandırılmış olarak gelir."
        }
      ],
      "links": [
        {
          "label": "Adım adım bir fatura Template oluşturun",
          "href": "/docs/templates/invoices"
        },
        {
          "label": "Fatura yeniden adlandırma nasıl çalışır?",
          "href": "/rename-invoices-with-ai"
        },
        {
          "label": "Arşive alım iş akışını düzenleyin",
          "href": "/blog/how-to-organize-invoices-and-receipts"
        }
      ]
    },
    "documents": {
      "eyebrow": "Desteklenen muhasebe dosyaları",
      "title": "Muhasebe belgeleri Zush otomatik olarak yeniden adlandırılabilir",
      "description": "Borçlar, makbuzlar, vergi belgeleri ve yakın destek için ayrı Templates kullanın. Her iş akışı, orijinal içeriği değiştirmeden kendi alanlarını ve adlandırma düzenini korur.",
      "items": [
        {
          "title": "Tedarikçi faturaları ve faturaları",
          "description": "AP belgelerini fatura tarihine, satıcıya, fatura numarasına, tutara, para birimine veya müşteri sözleşmesinin gerektirdiği alanlara göre adlandırın.",
          "example": "2026-06-12 – Acme Tedarik – INV-10234 – 1,204 USD.pdf"
        },
        {
          "title": "Makbuz ve gider kanıtları",
          "description": "PDF, JPG ve HEIC makbuzlarını okuyun, ardından Custom AI Block ile açıklanan satıcıyı, tarihi, tutarı ve kategoriyi ekleyin.",
          "example": "2026-06-03 – Bütün Gıdalar – Yemekler – 84 USD.jpg"
        },
        {
          "title": "Banka ve kart ekstreleri",
          "description": "Mutabakat sırasında daha hızlı erişim için genel indirmeleri kuruma, hesap etiketine ve ekstre dönemine göre adlandırılmış ekstrelere dönüştürün.",
          "example": "2026-05 – Birinci Ulusal – İşletme – Beyanı.pdf"
        },
        {
          "title": "Vergi formları ve müşteri belgeleri",
          "description": "Her dosya adını yazmadan W-9'ları, 1099'ları, vergi bildirimlerini ve destekleyici taramaları form türüne, vergi yılına, veren kuruluşa veya kuruluşa göre adlandırın.",
          "example": "2025 – 1099-NEC – Rivera Consulting.pdf"
        },
        {
          "title": "Maaş bordrosu ve kapanış raporları",
          "description": "Bordro kayıtlarını, günlük desteğini ve aylık raporları döneme, varlığa, rapor türüne ve onay durumuna göre hizalanmış halde tutun.",
          "example": "2026-05 – Vertex GmbH – Bordro Raporu – FINAL.pdf"
        },
        {
          "title": "E-tablolar ve dışa aktarmalar",
          "description": "Gider aktarımlarını, mutabakatları ve çalışma kitabı teslimatlarını müşteriye, döneme ve içeriğe göre yeniden adlandırın; böylece en son dosya aktarımdan sonra aranabilir.",
          "example": "2026-2. Çeyrek – Vertex GmbH – Gider Özeti.xlsx"
        }
      ]
    },
    "testimonialsTitle": "Muhasebe ekipleri Zush'yi nasıl çalıştırıyor?",
    "testimonialsDescription": "Yaygın muhasebe belgesi modellerine dayalı açıklayıcı iş akışları.",
    "testimonialsRatingAria": "5 üzerinden 5 yıldız",
    "testimonials": [
      {
        "name": "Elena Park",
        "role": "Muhasebe uygulama sahibi",
        "quote": "Her istemcinin biraz farklı bir dosya adı kuralı vardır. Templates bu kuralları aklımdan uzak tutar ve önerilen partinin tamamını uygulamadan önce kontrol edebilirim."
      },
      {
        "name": "Marco Ruiz",
        "role": "Bağımsız muhasebeci",
        "quote": "Zaman aşımı tek bir makbuz değildi; bir aylık IMG dosyaları ve indirmeleriydi. Bunları tarihe, satıcıya, tutara ve kategoriye göre adlandırmak bana kullanışlı bir alım klasörü sağlıyor."
      },
      {
        "name": "Nia Brown",
        "role": "Müşteri muhasebe lideri",
        "quote": "İş istasyonunda kalması gereken istemci klasörleri için Çevrimdışı AI kullanıyoruz. Önizleme, herhangi biri toplu işlemi uygulamadan önce tek sayı taramasını yakalar."
      }
    ],
    "faq": {
      "title": "Muhasebe dosyasının yeniden adlandırılması, yanıtlandı",
      "description": "İstemci Templates, klasör izleme, yerel Çevrimdışı Yapay Zeka, BYOK, önizleme, geri alma ve ölçülmemiş yeniden adlandırma, bir muhasebe belgesi iş akışına nasıl uyar?",
      "items": [
        {
          "question": "Zush muhasebe belge yönetimi yazılımının yerini mi alıyor?",
          "answer": "Hayır. Zush, mevcut muhasebe yığınınızın etrafındaki dosya adlandırma katmanıdır. Faturaları, makbuzları, ekstreleri, taramaları, indirmeleri ve dışa aktarmaları yerinde yeniden adlandırır, ancak müşteri kayıtlarını saklamaz, erişimi kontrol etmez, faturaları onaylamaz, işlemleri göndermez veya bir belge yönetim sistemini, QuickBooks, Xero'yi veya firmanızın portalını değiştirmez."
        },
        {
          "question": "Zush muhasebecilere ve muhasebecilere nasıl yardımcı olur?",
          "answer": "Zush faturaları, makbuzları, ekstreleri, vergi formlarını, elektronik tabloları ve taramaları okur, ardından satıcı, tarih, fatura numarası, tutar, para birimi ve kategori gibi alanlardan oluşturulan dosya adları önerir. Toplu işlemi uygulamadan önce gözden geçirirsiniz ve daha sonra geri alma seçeneği kullanılabilir durumda kalır."
        },
        {
          "question": "Her istemcinin farklı bir adlandırma kuralı olabilir mi?",
          "answer": "Evet. İstemci, varlık veya iş akışı başına yeniden kullanılabilir bir Template oluşturun. Template, dosya adı yapısını, tarih biçimini, Naming Blocks'yi ve gider kategorisi, hesap kodu veya onay durumu gibi Custom AI Block alanlarını kontrol eder."
        },
        {
          "question": "Zush müşteri alım klasörünü izleyebilir mi?",
          "answer": "Evet. Klasör izlemeye bir Template atayın; Zush, yeni e-posta kayıtlarını, portal indirmelerini veya tarayıcı çıktısını geldiklerinde işleyebilir. Yeniden adlandırma geçmişi, uygulanan toplu işlerin geri döndürülebilir olmasını sağlar."
        },
        {
          "question": "Taranmış faturalar ve makbuz fotoğraflarıyla çalışır mı?",
          "answer": "Evet. Zush, yalnızca görüntü içeren PDF'leri ve desteklenen görüntü formatlarını okumak için AI vizyonunu kullanır; böylece taramalar ve alındı ​​fotoğrafları, ayrı bir OCR adımı olmadan, doğuştan dijital belgelerle aynı kuralı takip edebilir."
        },
        {
          "question": "Müşterinin finansal verileri gizli tutuluyor mu?",
          "answer": "Dosyalar yerinde yeniden adlandırılır ve Zush tarafından saklanmaz. Analiz için, sağlayıcı hesabı aracılığıyla yönetilen Bulut Yapay Zeka, BYOK'yi seçin ve firma kontrollerinizi anahtarlayın veya desteklenen dosya analizinin makinede kalması için yerel Ollama modelleriyle Çevrimdışı Yapay Zeka'yı seçin."
        },
        {
          "question": "Zush, QuickBooks veya Xero'ye bağlanıyor mu?",
          "answer": "Zush dosya katmanını muhasebe yazılımı etrafında düzenler (indirmeler, e-posta ekleri, taramalar, dışa aktarmalar ve destekleyici belgeler). QuickBooks, Xero veya başka bir deftere işlem göndermez veya içindeki kayıtları değiştirmez."
        },
        {
          "question": "Zush belge başına ücret alıyor mu?",
          "answer": "Hayır. Ücretli planlar dosya başına kredi yerine sınırsız yeniden adlandırma içerir; böylece Template'yi değiştirdikten sonra aynı belgeler için tekrar ödeme yapmadan bir klasörü yeniden çalıştırabilirsiniz. İlk 50 yeniden adın değerlendirilmesi ücretsizdir."
        }
      ]
    },
    "guides": {
      "title": "Muhasebe belgesi kılavuzları",
      "description": "Faturalar, makbuzlar, vergi formları ve QuickBooks veya Xero etrafında bulunan dosyalar için adlandırma kuralları ve alım iş akışları.",
      "slugs": [
        "invoice-file-naming-convention",
        "automatically-rename-invoices-ai",
        "how-to-organize-invoices-and-receipts",
        "rename-invoices-for-quickbooks-xero"
      ]
    },
    "finalCta": {
      "title": "Bir istemci alım klasöründe Zush'yi deneyin",
      "subtitle": "Kopyalanan bir fatura veya makbuz grubunu ekleyin, önerilen adları okuyun ve Template'nin başka bir geçişe ihtiyacı varsa yeniden adlandırmayı geri alın."
    }
  },
  "medical": {
    "path": "/for-medical",
    "seo": {
      "title": "Çevrimdışı AI Dosya Yeniden Adlandırma ile Sağlık Hizmetleri Doküman Yönetimi",
      "description": "Zush, sağlık hizmetleri belge yönetiminin dosya adı katmanını yönetir: muayenehanenizin seçtiği alanları kullanarak taranan tıbbi kayıtları, faksları, laboratuvar raporlarını ve alım formlarını yeniden adlandırır. Yerel Çevrimdışı Yapay Zeka veya kuruluş tarafından kontrol edilen BYOK ile EHR'nizin yanı sıra toplu önizleme ve geri alma özellikleriyle birlikte çalışır."
    },
    "pageTitle": "Tıbbi belge yönetimi",
    "hero": {
      "eyebrow": "Tıbbi uygulamalar için sağlık belge yönetimi",
      "titleLead": "Sağlık hizmetleri belgelerini şu şekilde yeniden adlandırın:",
      "titleAccent": "MRN, tarih ve tür",
      "subtitle": "Zush, sağlık hizmetleri belge yönetiminin dosya adı katmanını yönetir: muayenehanenizin seçtiği alanları kullanarak taranan tıbbi kayıtları, faksları, laboratuvar raporlarını ve alım formlarını yeniden adlandırır. Yerel Çevrimdışı Yapay Zeka veya kuruluş tarafından kontrol edilen BYOK ile EHR'nizin yanı sıra toplu önizleme ve geri alma özellikleriyle birlikte çalışır.",
      "trustLine": [
        "Local Offline AI",
        "Organization-controlled BYOK",
        "Preview and undo every batch"
      ],
      "photoAlt": "Taranan tıbbi kayıtları düzenlemek için masaüstü bilgisayar kullanan bir doktor",
      "downloadMac": "Mac için indirin",
      "downloadWindows": "Windows için indirin",
      "trustAria": "Tıbbi belge yönetimi ekipleri neden Zush kullanıyor?"
    },
    "demoLabel": "Zush taranan tıbbi kayıtların bulunduğu bir klasörü yeniden adlandırıyor",
    "audiences": {
      "eyebrow": "Kimin için",
      "title": "Küçük tıbbi muayenehaneler ve belge ağırlıklı ekipler için tasarlandı",
      "description": "Aynı dosya yeniden adlandırma iş akışı, EHR'yi değiştirmeye gerek kalmadan klinik alım, ön büro taraması ve tıbbi faturalandırmaya uygundur.",
      "items": [
        {
          "title": "Solo muayenehane ve klinik sahipleri",
          "description": "Günün alım yığını, gece boyunca dosyalanmış bir kayıt seti haline gelir; kimse yazmadan MRN, hizmet tarihi ve kayıt türüne göre adlandırılır.",
          "imageAlt": "Tek başına muayenehane ve klinik sahipleri: Günün giriş yığını, gece boyunca dosyalanmış bir kayıt kümesi haline gelir; kimse yazmadan MRN, hizmet tarihi ve kayıt türüne göre adlandırılır."
        },
        {
          "title": "Muayenehane yöneticileri ve ön büro",
          "description": "Tarama yapan her kişi arasında eğitim oturumu olmaksızın bir toplantı. Template kuralı elinde tutuyor; Personel sadece dosyaları bırakıyor.",
          "imageAlt": "Muayenehane yöneticileri ve ön büro: Tarama yapan her kişi için eğitim oturumu olmaksızın bir toplantı. Template kuralı elinde tutuyor; Personel sadece dosyaları bırakıyor."
        },
        {
          "title": "Tıbbi faturalandırma",
          "description": "EOB'ler, ERA'lar ve talep yazışmaları hesap numarasına ve ödeyene göre adlandırılır, dolayısıyla bir havaleyi bir taleple eşleştirmek av olmaktan çıkar.",
          "imageAlt": "Tıbbi faturalandırma: EOB'ler, ERA'lar ve talep yazışmaları, hesap numarasına ve ödeyene göre adlandırılır, dolayısıyla bir havaleyi bir taleple eşleştirmek av olmaktan çıkar."
        }
      ]
    },
    "fields": {
      "title": "Tıbbi kayıt alanları",
      "description": "Her tıbbi kayıt dosya adı için alanları seçin",
      "instruction": "Sonucu görmek için bir alan seçin",
      "ariaLabel": "Tıbbi alanlar Zush okur",
      "hint": "Önerilen dosya adı",
      "footnote": "Custom AI Blocks, tanımladığınız herhangi bir alanı - \"siparişi veren doktor\", \"prosedür kodu\" veya \"imzalı tarih\" - çıkarabilir. Template cihazınız hangi alanların dosya adının parçası olacağına karar verir.",
      "filenamePattern": "{Dahili Kimlik} – {Hizmet tarihi} – {Belge türü}",
      "filenameExamples": [
        "MRN-48211 – 2026-06-12 – Lab Results.pdf",
        "MRN-30177 – 2026-05-30 – Imaging – Chest X-Ray.pdf",
        "MRN-51402 – 2026-06-05 – Intake Form.pdf"
      ],
      "items": [
        {
          "label": "MRN / Hasta Kimliği",
          "before": "Scan0001.pdf",
          "after": "MRN-48211 – 2026-06-12 – Laboratuvar Sonuçları",
          "emphasis": "MRN-48211"
        },
        {
          "label": "Hizmet tarihi",
          "before": "Scan0002.pdf",
          "after": "MRN-48211 – 2026-06-12 – Laboratuvar Sonuçları",
          "emphasis": "2026-06-12"
        },
        {
          "label": "Kayıt türü",
          "before": "fax_received.pdf",
          "after": "MRN-30177 – 2026-05-30 – Göğüs Röntgeni",
          "emphasis": "Göğüs Röntgeni"
        },
        {
          "label": "Yönlendiren sağlayıcı",
          "before": "referral.pdf",
          "after": "MRN-30177 – 2026-06-02 – Dr Chen"
        },
        {
          "label": "Uzmanlık",
          "before": "consult_note.pdf",
          "after": "MRN-30177 – 2026-06-02 – Kardiyoloji",
          "emphasis": "Kardiyoloji"
        },
        {
          "label": "Ödeyen / Sigorta",
          "before": "eob.pdf",
          "after": "ACC-2210 – 2026-06-04 – Mavi Haç",
          "emphasis": "Mavi Haç"
        },
        {
          "label": "Talep #",
          "before": "Scan_0052.pdf",
          "after": "ACC-2210 – 2026-06-04 – Talep 88213",
          "emphasis": "Talep 88213"
        },
        {
          "label": "Tutar",
          "before": "statement.pdf",
          "after": "ACC-2210 – 2026-06-04 – Aetna 1.240 Dolar"
        },
        {
          "label": "Prosedür kodu",
          "before": "procedure.pdf",
          "after": "MRN-51402 – 2026-06-05 – CPT 93000",
          "emphasis": "CPT 93000"
        },
        {
          "label": "Belge tarihi",
          "before": "outside_records.pdf",
          "after": "MRN-51402 – 2026-06-05 – Dış Kayıtlar",
          "emphasis": "2026-06-05"
        },
        {
          "label": "Özel alan — sade bir dille açıklayın",
          "before": "doc_20260608.pdf",
          "after": "MRN-51402 – 2026-06-05 – Onay Formu",
          "emphasis": "Onay Formu"
        }
      ]
    },
    "privacy": {
      "eyebrow": "Özel işleme",
      "title": "Tıbbi belgeler için çevrimdışı ve BYOK işleme",
      "description": "Yerel Ollama modelleriyle desteklenen analizleri çalıştırın veya bunu yapay zeka sağlayıcı hesabı üzerinden yönlendirip kuruluşunuzun kontrollerini anahtarlayın. Zush, dosyaları yerinde yeniden adlandırır ve saklamaz.",
      "items": [
        {
          "title": "Yerel modellerle çevrimdışı yapay zeka",
          "description": "Yerel Ollama modelleri, depolandıkları Mac veya Windows PC'deki desteklenen taramaları ve belgeleri analiz eder. Dosya içeriği Zush'ye veya üçüncü taraf bir AI sağlayıcısına gönderilmez.",
          "badge": "Kayıtlar için önerilir",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "Organizasyon kontrollü BYOK",
          "description": "Analizi, kuruluşunuzun kontrol ettiği AI sağlayıcı hesabı ve API anahtarı aracılığıyla yönlendirin. Anahtar güvenli yerel depolamada kalır ve ekibiniz iş akışı için kullanılan sağlayıcıyı ve modeli seçer.",
          "badge": "Sağlayıcı hesabınız",
          "kind": "byok"
        },
        {
          "title": "Yönetilen Bulut Yapay Zekası",
          "description": "Yönetilen bulut işleme, sıradan dosyalar için kullanılabilir. Tıbbi belge iş akışları için Çevrimdışı AI'yı veya ekibinizin izlediği politikaya göre kuruluşunuzun BYOK kurulumunu kullanın.",
          "badge": "Genel dosyalar için",
          "kind": "cloud-ai"
        }
      ],
      "note": "Belge içeriğinin makinede kalması gerektiğinde Çevrimdışı AI'yı kullanın. Kuruluşunuz analizi kendi sağlayıcı hesabı ve anahtarı aracılığıyla yönlendirdiğinde BYOK'yi kullanın. Zush her modda dosyaları yerinde yeniden adlandırır ve saklamaz.",
      "docsLinkLabel": "Modların verileri nasıl işlediğini okuyun"
    },
    "workflow": {
      "eyebrow": "İş akışı",
      "title": "Tarayıcı ve faks klasörlerindeki kayıtları otomatik olarak yeniden adlandırın",
      "description": "Bir Template tıbbi kayıt oluşturun, alım klasörünü izleyin ve önerilen her partiyi herhangi bir değişiklik yapmadan önce inceleyin.",
      "items": [
        {
          "title": "Zush'yi tarama klasörüne doğrultun",
          "description": "Klasör izleme, tarayıcınızın veya faks yazılımınızın içine yazdığı her şeyi (alınma klasörü, paylaşılan sürücü, faks biriktirme) izler."
        },
        {
          "title": "Önerilen adları inceleyin",
          "description": "Önizleme bir formalite değil, bir kontroldür: toplu işlemi okuyun, her dosya adında yalnızca onaylanmış alanların göründüğünü onaylayın ve yanlış görünen her şeyi yeniden oluşturun."
        },
        {
          "title": "Geri al ile uygula",
          "description": "Yeniden adlandırma geçmişi herhangi bir toplu işlemi geri alır. Bir kongre değişikliği bir temizleme projesi değil, yeniden çalıştırmadır."
        }
      ],
      "links": [
        {
          "label": "Template kayıtlarını adım adım oluşturun",
          "href": "/docs/templates/medical-records"
        },
        {
          "label": "Taranan belgeyi yeniden adlandırma nasıl çalışır?",
          "href": "/rename-scanned-documents"
        },
        {
          "label": "Küçük uygulamalı bir tarama iş akışı düzenleyin",
          "href": "/blog/how-to-organize-scanned-medical-records-small-practice"
        }
      ]
    },
    "documents": {
      "eyebrow": "Desteklenen tıbbi dosyalar",
      "title": "Tıbbi belgeler Zush otomatik olarak yeniden adlandırılabilir",
      "description": "Bir Template'yi klinik kayıtlar için, diğerini ise fatura evrakları için kullanın. Her akış, orijinal belgeleri değiştirmeden kendi alanlarını ve adlandırma düzenini korur.",
      "items": [
        {
          "title": "Taranan hasta kayıtları",
          "description": "Tarayıcı çıktısını ve arşiv dışa aktarımlarını dahili kimlik, hizmet tarihi ve belge türünden oluşturulan tutarlı dosya adlarına dönüştürün.",
          "example": "MRN-48211 – 2026-06-12 – İlerleme Notu.pdf"
        },
        {
          "title": "Laboratuvar raporları",
          "description": "Yalnızca görüntü içeren laboratuvar PDF'lerini okuyun ve ayrı bir OCR iş akışı olmadan bunları tanımlayıcıya, hizmet tarihine ve rapor türüne göre adlandırın.",
          "example": "MRN-48211 – 2026-06-12 – Laboratuvar Sonuçları.pdf"
        },
        {
          "title": "Yönlendirmeler ve fakslanan belgeler",
          "description": "Gelen yönlendirmeleri, danışma mektuplarını ve faks kayıtlarını tanımlayın ve ardından uygulamanın geri kalanında kullanılan aynı adlandırma modelini uygulayın.",
          "example": "MRN-30177 – 2026-06-02 – Sevk – Cardiology.pdf"
        },
        {
          "title": "Kabul ve onay formları",
          "description": "Form türünü ve imza tarihini ön büro taramalarından çıkarın, böylece her alım partisi yeniden kullanılabilir bir Template'yi takip etsin.",
          "example": "MRN-51402 – 2026-06-05 – Onay Formu.pdf"
        },
        {
          "title": "Görüntüleme ve raporlara danışma",
          "description": "Görüntüleme raporlarını, uzman notlarını ve dış kayıtları ekibinizin daha sonra almak için kullandığı alanlara göre adlandırın.",
          "example": "MRN-30177 – 2026-05-30 – Görüntüleme – Göğüs Röntgeni.pdf"
        },
        {
          "title": "EOB'ler, ERA'lar ve talep yazışmaları",
          "description": "Ödeme yapanın belgeleri, hesap referansları, havaleler ve talep yazışmaları için ayrı bir faturalandırma Template kullanın.",
          "example": "ACC-2210 – 2026-06-04 – ERA – Aetna.pdf"
        }
      ]
    },
    "testimonialsTitle": "Klinisyenler ne diyor",
    "testimonialsDescription": "Yaşamak için kayıt tutan kişilerden gelen geri bildirimler.",
    "testimonialsRatingAria": "5 üzerinden 5 yıldız",
    "testimonials": [
      {
        "name": "Dr. Amir Khan",
        "role": "Klinik sahibi",
        "quote": "Takip notları için ayrı bir kimliksizleştirilmiş arşiv tutuyorum. Çevrimdışı AI ile Zush, taramaları ziyaret tarihine ve kayıt türüne göre adlandırabilir. Körü körüne koştuğum bir şey değil ama yazmayı oldukça azaltıyor."
      },
      {
        "name": "Renata Alves",
        "role": "Uygulama yöneticisi",
        "quote": "Ön büro her şeyi tek bir klasöre tarar ve akşam olduğunda bu dosya Scan-birşey adı verilen dört yüz dosya haline gelirdi. Şimdi MRN ve tarihe göre isimlendirilmiş olarak çıkıyor. Başvurmadan önce hâlâ ön izleme listesini okuyorum; bu beni rahat ettiren kısım."
      },
      {
        "name": "Dana Whitfield",
        "role": "Tıbbi fatura",
        "quote": "Havalelerin taleplerle eşleştirilmesi haftamın en kötü saatiydi. EOB'lerin hesap numarasına ve ödeyene göre adlandırılması bunun çoğunu gerçekleştirdi. Birkaç tarama genel olarak geri dönüyor ve bunları elle düzeltiyorum."
      }
    ],
    "pricingPreface": "Tek lisans, sınırsız. Belge başına kredi yok; şablon değişikliğinden sonra bir klasörü ücretsiz olarak yeniden çalıştırın.",
    "faq": {
      "title": "Tıbbi kayıt dosyasının yeniden adlandırılması, yanıtlandı",
      "description": "Yerel modeller, kuruluş tarafından kontrol edilen BYOK, tarayıcı klasörleri, Templates, önizleme ve geri alma işlemlerinin tıbbi belge iş akışına nasıl uyum sağladığı.",
      "items": [
        {
          "question": "Zush HIPAA uyumlu mu?",
          "answer": "Zush, uygulamanın tek başına bir iş akışını HIPAA uyumlu hale getirdiğini iddia etmez. Çevrimdışı yapay zeka, desteklenen dosya analizini iş istasyonunda tutar ancak uyumluluk aynı zamanda cihaz güvenliğine, erişim kontrollerine, yedeklemelere, saklamaya, dosya adı politikasına ve kuruluşunuzun prosedürlerine de bağlıdır. Korunan sağlık bilgilerini işlemeden önce gizlilik veya güvenlik sorumlunuzun iş akışının tamamını incelemesini sağlayın."
        },
        {
          "question": "Zush hasta kayıtlarını herhangi bir yere yüklemeden yeniden adlandırabilir mi?",
          "answer": "Evet. Çevrimdışı AI modunda Zush, Mac veya Windows'ta yerel Ollama modelleriyle desteklenen dosyaları analiz eder; kayıtlar tamamen makinede okunur ve yeniden adlandırılır. Dosya içeriği Zush'ye veya üçüncü taraf bir yapay zeka sağlayıcısına gönderilmez ve Zush, dosyaları saklamaz."
        },
        {
          "question": "Bir muayenehane tıbbi kayıt dosya adlarını nasıl yapılandırmalıdır?",
          "answer": "Pratik bir başlangıç modeli dahili kimlik, hizmet tarihi ve belge türüdür. Kuruluşunuz tam adlandırma politikasına karar verir ve Zush Template bunu tutarlı bir şekilde uygular. Belgenin içindeki bir klasör listesinde görünmesi gerekmeyen ayrıntıları saklayın ve önerilen grubu uygulamadan önce inceleyin."
        },
        {
          "question": "Taranmış kayıtları ve faksları işliyor mu?",
          "answer": "Evet. Çoğu kayıt, metin katmanı olmadan tarayıcı veya faks çıkışı olarak girilir. Zush, sayfa görüntüsünü yapay zeka vizyonuyla okur (ayrı bir OCR geçişi yoktur) ve sayfada yazdırılanlardan tanımlayıcıyı, hizmet tarihini ve kayıt türünü çıkarır."
        },
        {
          "question": "Zush el yazısını veya düşük kaliteli taramaları okuyabilir mi?",
          "answer": "Tipik ofis taramaları (basılı laboratuvar raporları, faksla gönderilen yönlendirmeler, el yazısı alanları olan formlar) güvenilir bir şekilde okunur. Yoğun el yazısıyla yazılmış notlar ve çok çarpık veya soluk sayfalar öyle değildir: bunlar yanlış bir ad yerine genel bir adla gelir ve önizleme, herhangi bir şey uygulanmadan önce bunları yakaladığınız yerdir."
        },
        {
          "question": "Zush, sağlık hizmetleri belge yönetimi yazılımımızın veya EHR'nin yerini mi alıyor?",
          "answer": "Hayır. Zush, bir EHR veya belge yönetim sistemi etrafındaki dosya adı katmanını yönetir - tarayıcı ve faks çıktısı, dışa aktarılan kayıtlar, içe aktarılmayı bekleyen ekler ve arşiv klasörleri. EHR'nin kendisine bağlanmaz, onu okumaz veya değiştirmez. Bir belge EHR içinde bulunuyorsa Zush dahil değildir; bir klasörde bulunuyorsa Zush onu adlandırabilir."
        },
        {
          "question": "Bir tıbbi muayenehane hangi yapay zeka modunu kullanmalıdır?",
          "answer": "Desteklenen belge analizinin makinede kalması gerektiğinde Çevrimdışı AI kullanın; Mac veya Windows'ta yerel Ollama modellerini çalıştırır. Kuruluşunuz analizin kendi yapay zeka sağlayıcı hesabı ve API anahtarı aracılığıyla yönlendirilmesini istediğinde BYOK'yi kullanın. Ekibiniz kendi iç politikasına uygun modu seçer."
        },
        {
          "question": "Adlandırma kuralı sistemleri değiştirdikten sonra hâlâ anlamlı olacak mı?",
          "answer": "Tanımlayıcıyı, hizmet tarihini ve kayıt türünü dosya adına koymamızın nedeni budur. Kayıtlar, onları üreten yazılımdan daha uzun süre dayanır: bir dışa aktarma, taşıma veya arşiv sürücüsü, bu dosyalara anlam veren veritabanını ortadan kaldırır ve hayatta kalan, kendini tanımlayan bir dosya adıdır. Bu şekilde adlandırılan bir klasör, on yıl sonra bile dosya tarayıcısından başka bir şey olmadan okunabilir durumda olacaktır."
        },
        {
          "question": "Tarayıcı klasörü otomatik olarak yeniden adlandırılabilir mi?",
          "answer": "Evet. Tarayıcınızın veya faks yazılımınızın kaydettiği klasördeki klasör izlemeye bir Template atayın ve her yeni belge, ön izleme grupları ve geri döndürme için yeniden adlandırma geçmişiyle birlikte, geldiğinde sizin geleneğinize göre yeniden adlandırılır."
        }
      ]
    },
    "guides": {
      "title": "Tıbbi belge düzenleme kılavuzları",
      "description": "EHR dışındaki kayıtları işleyen küçük muayenehaneler için pratik tarayıcı, adlandırma ve gizlilik iş akışları.",
      "slugs": [
        "how-to-organize-scanned-medical-records-small-practice",
        "rename-scanned-documents-automatically",
        "cloud-vs-local-ai-file-renaming"
      ]
    },
    "finalCta": {
      "title": "Zush'yi tek bir tarama klasöründe deneyin",
      "subtitle": "Dünkü alıma doğrultun, önerilen isimleri okuyun ve beğenmezseniz partiyi geri alın. Çevrimdışı yapay zeka tüm çalışmayı makinenizde tutar."
    }
  },
  "photographers": {
    "path": "/for-photographers",
    "seo": {
      "title": "Fotoğrafçılar ve Kameramanlar için AI Dosya Yeniden Adlandırıcı",
      "description": "Zush, RAW fotoğraflarını, JPEG'leri ve video kliplerini okur, ardından her dosyada zaten bulunan içerik ve meta verilerden aranabilir dosya adları önerir. Stüdyonuz için bir Template adlandırma oluşturun, grubu inceleyin ve orijinal ortamı tam olarak olduğu yerde tutun."
    },
    "pageTitle": "Fotoğrafçılar ve kameramanlar için AI dosyasını yeniden adlandırma",
    "hero": {
      "eyebrow": "Fotoğrafçılar ve kameramanlar için",
      "titleLead": "Her çekimi şu şekilde yeniden adlandırın:",
      "titleAccent": "proje, sahne ve çekim",
      "subtitle": "Zush, RAW fotoğraflarını, JPEG'leri ve video kliplerini okur, ardından her dosyada zaten bulunan içerik ve meta verilerden aranabilir dosya adları önerir. Stüdyonuz için bir Template adlandırma oluşturun, grubu inceleyin ve orijinal ortamı tam olarak olduğu yerde tutun.",
      "trustLine": [
        "RAW, photo, and video formats",
        "Custom naming Templates",
        "Preview and undo every batch"
      ],
      "photoAlt": "Bir gün ışığı stüdyosunda bir çekimi birlikte inceleyen bir fotoğrafçı ve kameraman",
      "downloadMac": "Mac için indirin",
      "downloadWindows": "Windows için indirin",
      "trustAria": "Fotoğrafçılar ve kameraman ekipleri için AI dosyası yeniden adlandırma işleminde neden Zush kullanılıyor?"
    },
    "demoLabel": "Zush fotoğraf ve video kliplerden oluşan karma bir klasörü yeniden adlandırma",
    "audiences": {
      "eyebrow": "Yaratıcı ekipler için",
      "title": "Kart alımından müşteriye teslimine kadar her dosya adını kullanışlı tutun",
      "description": "Ekibinizin zaten bildiği yaratıcı araçları değiştirmeden, fotoğraflar, çekimler, dışa aktarımlar ve arşivlerde aynı adlandırma katmanını kullanın.",
      "items": [
        {
          "title": "Portre, düğün ve etkinlik fotoğrafçıları",
          "description": "Tekrarlanan kamera sayaçlarını proje, tarih, konu, an ve konumla değiştirin; ayıklamadan önce kullanışlıdır ve yıllar sonra da anlaşılabilir.",
          "imageAlt": "Portre, düğün ve etkinlik fotoğrafçıları: Tekrarlanan kamera sayaçlarını proje, tarih, konu, an ve konumla değiştirin; ayırmadan önce kullanışlıdır ve yıllar sonra hala anlaşılabilir."
        },
        {
          "title": "Videografçılar ve editörler",
          "description": "Genel kamera kliplerini aranabilir b-roll'e, röportaja, konuma, sahneye dönüştürün ve düzenleme başlamadan önce ad alın.",
          "imageAlt": "Kameramanlar ve editörler: Genel kamera kliplerini aranabilir b-roll'e, röportaja, konuma, sahneye dönüştürün ve düzenleme başlamadan önce ad alın."
        },
        {
          "title": "Stüdyolar ve prodüksiyon ekipleri",
          "description": "Asistanlara, yapımcılara ve editörlere, alma klasörleri, etkin projeler, teslimatlar ve arşivler için tek bir ortak kural verin.",
          "imageAlt": "Stüdyolar ve yapım ekipleri: Asistanlara, yapımcılara ve editörlere, alma klasörleri, etkin projeler, teslimatlar ve arşivler için tek bir ortak kural verin."
        }
      ]
    },
    "fields": {
      "title": "Stüdyo adlandırma alanları",
      "description": "Stüdyonuzun aradığı ayrıntılardan dosya adları oluşturun",
      "instruction": "Sonucu görmek için bir alana dokunun",
      "ariaLabel": "Zush'nin okuduğu fotoğraf ve video alanları",
      "hint": "Önerilen dosya adı",
      "items": [
        {
          "label": "Yakalama tarihi",
          "before": "DSC_4831.NEF",
          "after": "2026-06-14 – Ortega Düğünü – Tören",
          "emphasis": "2026-06-14"
        },
        {
          "label": "Müşteri / Proje",
          "before": "IMG_7294.CR3",
          "after": "Ortega Düğünü – Portreler – Avlu"
        },
        {
          "label": "Konu",
          "before": "DSCF1042.RAF",
          "after": "Maya Chen – Stüdyo Portresi – Bak 02",
          "emphasis": "Maya Chen"
        },
        {
          "label": "Sahne / Konum",
          "before": "A001_C003.mov",
          "after": "Nehir Evi - Altın Saat Dış Görünümü - 03'ü Alın",
          "emphasis": "Altın Saat Dış Görünümü"
        },
        {
          "label": "Atış türü",
          "before": "MVI_8842.MP4",
          "after": "Northwind Kampanyası – Ürün Yakın Çekim – 02. Çekim"
        },
        {
          "label": "Al",
          "before": "C0048.MOV",
          "after": "Kurucu Röportajı – Kamera A – 04. Çekim"
        },
        {
          "label": "Kamera",
          "before": "A003_0614AB.MOV",
          "after": "Kurucu Röportajı – Kamera A – 03. Çekim",
          "emphasis": "Kamera A"
        },
        {
          "label": "Oryantasyon",
          "before": "IMG_9107.ARW",
          "after": "Kıyı Yazı işleri – Portre – Dikey",
          "emphasis": "Dikey"
        },
        {
          "label": "Teslimat türü",
          "before": "final_final_03.mp4",
          "after": "Northwind Lansmanı – Sosyal Kesim – 9x16",
          "emphasis": "Sosyal Kesim"
        },
        {
          "label": "Özel alan — sade bir dille açıklayın",
          "before": "DSC_4908.NEF",
          "after": "Ortega Düğünü – İlk Dans – Seçin",
          "emphasis": "İlk Dans"
        }
      ]
    },
    "privacy": {
      "eyebrow": "İşleme ve gizlilik",
      "title": "Her müşteri çekiminin nasıl analiz edileceğini seçin",
      "description": "Yönetilen yapay zekayla başlayın, stüdyo kontrollerinizin sağlayıcı hesabına bağlayın veya özel ve yayınlanmamış çalışmalar için desteklenen görsel analizleri yerel olarak çalıştırın.",
      "items": [
        {
          "title": "Cloud AI ile hızla başlayın",
          "description": "Görsel önizlemeleri ve örneklenmiş video karelerini analiz etmek için Zush tarafından yönetilen yapay zekayı kullanın, ardından önerilen adları çekime uygulamadan önce inceleyin.",
          "badge": "En hızlı kurulum",
          "badgeTone": "success",
          "kind": "cloud-ai"
        },
        {
          "title": "Kendi AI hesabınızı kullanın",
          "description": "Sağlayıcıyı bağlayın ve stüdyonuzun halihazırda kullandığı modeli. Siz sağlayıcı hesabını kontrol ederken API anahtarınız güvenli yerel depolamada kalır.",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "İstemcinin makinede çalışmasını sağlayın",
          "description": "Yayınlanmamış kampanyaların, özel etkinliklerin veya müşteri görüntülerinin yerel kalması gerektiğinde Mac veya Windows'ta yerel Ollama modelleriyle desteklenen görsel analizleri çalıştırın.",
          "badge": "Çevrimdışı Yapay Zeka",
          "kind": "offline-ai"
        }
      ],
      "note": "Zush, medyayı yerinde yeniden adlandırır ve yeni bir varlık kitaplığı haline gelmez. Her iş akışı için işleme modunu seçin, mevcut klasör yapınızı koruyun ve bir toplu işlemin geri döndürülmesi gerektiğinde yeniden adlandırma geçmişini kullanın.",
      "docsLinkLabel": "Modların verileri nasıl işlediğini okuyun"
    },
    "workflow": {
      "eyebrow": "İş akışı",
      "title": "İş akışınızı yeniden oluşturmadan bir çekimi toplu olarak yeniden adlandırın",
      "description": "Lightroom, Capture One, NLE'nizi ve depolama düzeninizi koruyun. Medyanın zaten bulunduğu klasörlerin çevresine yeniden kullanılabilir bir adlandırma adımı ekleyin.",
      "items": [
        {
          "title": "Stüdyo adlandırma kuralını oluşturma",
          "description": "Tarih, müşteri, proje, konu, konum, sahne, çekim türü, çekim, kamera ve ekibinizin ihtiyaç duyduğu tüm özel alanları yeniden kullanılabilir tek bir Template'de birleştirin."
        },
        {
          "title": "Bir besleme veya arşiv klasöründe çalıştırın",
          "description": "Kaynak medyayı hareket ettirmeden kopyalanmış bir çekim, bir kart alımı, bir dışa aktarma klasörü veya RAW fotoğraf, JPEG ve video kliplerden oluşan karma bir arşiv ekleyin."
        },
        {
          "title": "İnceleyin, uygulayın ve yeniden kullanın",
          "description": "Önerilen adları tek bir grup halinde okuyun, istisnaları düzeltin, geri alma özelliğiyle uygulayın ve ardından aynı Template'yi bir sonraki işte yeniden kullanın."
        }
      ],
      "links": [
        {
          "label": "Zush'nin fotoğrafları nasıl yeniden adlandırdığını görün",
          "href": "/rename-photos-with-ai"
        },
        {
          "label": "Zush'nin video klipleri nasıl yeniden adlandırdığını görün",
          "href": "/rename-videos-with-ai"
        },
        {
          "label": "Yeniden kullanılabilir bir adlandırma oluşturun Template",
          "href": "/docs/templates"
        }
      ]
    },
    "documents": {
      "eyebrow": "Desteklenen medya",
      "title": "Durağan görüntüler, çekimler ve teslimatlar için tek bir adlandırma iş akışı",
      "description": "Medyayı yakalamak ve dışa aktarmak için ayrı Templates kullanın veya karma bir proje klasörüne tek bir stüdyo kuralı uygulayın.",
      "items": [
        {
          "title": "RAW fotoğraf çekimleri",
          "description": "Orijinal RAW uzantısını korurken kamera sayaçlarını projeyi, tarihi, konuyu, sahneyi veya konumu taşıyan adlara dönüştürün.",
          "example": "2026-06-14 – Ortega Düğünü – Tören – İlk Kiss.nef"
        },
        {
          "title": "Portreler ve etkinlik galerileri",
          "description": "Ayırmadan, teslim etmeden veya uzun vadeli arşivlemeden önce JPEG, HEIC, TIFF ve RAW seçimlerine okunabilir bir kural uygulayın.",
          "example": "Maya Chen – Stüdyo Portresi – Bak 02.cr3"
        },
        {
          "title": "B-roll ve konum görüntüleri",
          "description": "Kısa klipleri görünür konuya, ortama, çekim türüne ve projeye göre adlandırın; böylece editörler her dosyayı açmadan önce yararlı görüntüleri bulabilir.",
          "example": "Nehir Evi – Dış Cephe – Altın Saat – Wide.mov"
        },
        {
          "title": "Röportajlar ve çoklu kamera çekimleri",
          "description": "Benzer şekilde numaralandırılmış kliplerin Finder veya File Explorer'de taranmasını kolaylaştırmak için konuşmacıyı, röportaj konusunu, kamerayı ve çekim alanlarını kullanın.",
          "example": "Kurucu Röportajı – Kamera A – 04.mp4'ü Çekin"
        },
        {
          "title": "Sosyal ve müşteri ihracatları",
          "description": "Nihai son dosya adlarını, aktarımınızın gerektirdiği proje, teslimat, en boy oranı, dil veya sürüm alanlarıyla değiştirin.",
          "example": "Northwind Lansmanı – Sosyal Kesim – 9x16 – v03.mp4"
        },
        {
          "title": "Karma stüdyo arşivleri",
          "description": "Her dosyanın mevcut bağlamından önerilen bir dosya adı ile fotoğraflar, görüntüler, ses, altyazılar ve üretim belgelerinde bir toplu iş çalıştırın.",
          "example": "Coastal Editoryal – Kamera Arkası – Stüdyo Kurulumu.jpg"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "Organizasyon sonuçları",
      "title": "Hangi medya dosya adları daha iyi değişir?",
      "description": "Kazanç kozmetik değil. İçe aktarmadan önce, işbirliği sırasında ve teslimattan sonra anlaşılır kalan medyadır.",
      "items": [
        {
          "title": "Çekimi açmadan önce bulun",
          "description": "Açıklayıcı bir konu, sahne, konum veya çekim, klasör listesini çekimin yararlı bir ilk geçiş dizinine dönüştürür."
        },
        {
          "title": "Her kamerada geleneği sürdürün",
          "description": "Yeniden kullanılabilen Template, farklı gövdelerden, kartlardan ve operatörlerden gelen dosyaların aynı stüdyo adlandırma sırasını takip etmesini sağlar."
        },
        {
          "title": "Kendini açıklayan medyayı bırakın",
          "description": "Editörler ve müşteriler, proje içeriğini kataloğunuzun, NLE'nin, ortak Drive'ın veya dağıtım platformunuzun dışında tutan dosya adları alır."
        }
      ]
    },
    "faq": {
      "title": "Fotoğraf ve video dosyasının yeniden adlandırılması, yanıtlandı",
      "description": "Zush, RAW fotoğraflarını, video kliplerini, Templates'yi, işleme modlarını, toplu incelemeyi, mevcut yaratıcı araçları ve geri almayı nasıl işler?",
      "items": [
        {
          "question": "Fotoğrafçılar için iyi bir dosya adlandırma kuralı nedir?",
          "answer": "Pratik bir başlangıç noktası, çekim tarihi, müşteri veya proje, konu veya sahne ve konum, çekim türü veya seçim durumu gibi kısa bir ayırıcıdır. Sıralamayı tutarlı tutun ve ekibinizin daha sonra arayacağı alanları kullanın."
        },
        {
          "question": "Zush, RAW fotoğraflarını yeniden adlandırabilir mi?",
          "answer": "Evet. Zush, CR2, CR3, NEF, ARW, DNG, ORF, RAF, RW2, PEF, SRW, SR2 ve RAW dahil olmak üzere yaygın RAW formatlarını destekler. Mevcut önizlemeleri ve meta verileri analiz eder, yeni bir dosya adı önerir ve dosya uzantısını korur."
        },
        {
          "question": "Yapay Zeka, video klipleri içindekilere göre yeniden adlandırabilir mi?",
          "answer": "Evet. Zush çerçeveleri örnekler ve mevcut olduğunda mevcut altyazı veya transkript içeriğini kullanır, ardından MP4, MOV, M4V, MTS, M2TS ve diğerleri gibi desteklenen formatlar için açıklayıcı bir ad önerir. Uygulamadan önce partiyi gözden geçirin."
        },
        {
          "question": "Klipleri sahneye, konuma veya çekime göre adlandırabilir mi?",
          "answer": "Evet. Bu alanları bir Template'ye ekleyin veya stüdyoya özgü bir alanı Custom AI Block ile tanımlayın. Sonuçlar, her dosyada mevcut olan görsel ve meta veri bağlamına bağlı olduğundan, belirsiz klipler için önizleme adımı önemlidir."
        },
        {
          "question": "Zush, Lightroom, Capture One veya bir NLE'nin yerini mi alıyor?",
          "answer": "Hayır. Zush, mevcut iş akışınızdaki dosya adı katmanını yönetir. İçe aktarma öncesinde, aktarma sırasında veya bir arşivde bulunan sıradan klasörlerdeki medyayı yeniden adlandırır; ayıklama, renklendirme, düzenleme, kataloglar, zaman çizelgeleri veya dijital varlık yönetiminin yerini almaz."
        },
        {
          "question": "Yayınlanmamış veya özel istemcinin çalışmasını çevrimdışı tutabilir miyim?",
          "answer": "Evet. Çevrimdışı AI, Mac veya Windows'ta desteklenen analizler için yerel Ollama modellerini kullanır, dolayısıyla dosya içeriği Zush'ye veya üçüncü taraf bir AI sağlayıcısına gönderilmez. Stüdyonuz analizi kendi sağlayıcı hesabı üzerinden yönlendirdiğinde BYOK'yi de kullanabilirsiniz."
        },
        {
          "question": "Yeniden adlandırılan bir çekimi geri alabilir miyim?",
          "answer": "Evet. Önerilen tüm dosya adlarını uygulamadan önce inceleyin ve adlandırma kuralının başka bir geçişe ihtiyacı varsa toplu işlemi geri almak için yeniden adlandırma geçmişini kullanın."
        },
        {
          "question": "Zush fotoğraf ve video dosyalarımı taşıyor mu veya yüklüyor mu?",
          "answer": "Zush, dosyaları yerinde yeniden adlandırır ve bunları yeni bir kitaplığa taşımaz veya saklamaz. Bulut işleme, kompakt bir analiz yükü gönderebilir; BYOK, sağlayıcı hesabınızı kullanır; Çevrimdışı yapay zeka, desteklenen analizleri makinede tutar."
        }
      ]
    },
    "guides": {
      "title": "Fotoğraf ve video düzenleme kılavuzları",
      "description": "RAW çekimleri, fotoğraf kitaplıkları, istemci dışa aktarmaları ve video klipler için adlandırma ve arşivleme iş akışları.",
      "slugs": [
        "ai-photo-renamer-guide",
        "best-ways-to-organize-photos-on-mac",
        "rename-video-files-with-ai",
        "digital-photo-organization-mistakes-to-avoid"
      ]
    },
    "finalCta": {
      "title": "Kopyalanan bir çekim klasöründe Zush'yi deneyin",
      "subtitle": "Küçük bir RAW fotoğraf veya klip seti ile başlayın, önerilen adları inceleyin, Template'yi hassaslaştırın ve başka bir geçişe ihtiyaç duyarsa grubu geri alın."
    }
  },
  "legal": {
    "path": "/for-legal",
    "seo": {
      "title": "Çevrimdışı AI Dosya Yeniden Adlandırma ile Yasal Belge Yönetimi",
      "description": "Zush dilekçeleri, sözleşmeleri, yazışmaları, keşifleri ve taramaları okur ve ardından bunlara tutarlı, aranabilir dosya adları verir. Mac veya Windows'ta mevcut klasörler, paylaşılan sürücüler ve DMS dışa aktarmalarıyla kullanın."
    },
    "pageTitle": "Yasal belge yönetimi",
    "hero": {
      "eyebrow": "Hukuk firmaları ve hukuk ekipleri için",
      "titleLead": "Yasal belgeleri şu şekilde yeniden adlandırın:",
      "titleAccent": "konu, tarih ve tür",
      "subtitle": "Zush dilekçeleri, sözleşmeleri, yazışmaları, keşifleri ve taramaları okur ve ardından bunlara tutarlı, aranabilir dosya adları verir. Mac veya Windows'ta mevcut klasörler, paylaşılan sürücüler ve DMS dışa aktarmalarıyla kullanın.",
      "trustLine": [
        "Works with your existing folders",
        "Offline AI for confidential files",
        "Preview before every rename"
      ],
      "photoAlt": "Genç bir avukat ofisindeki masaüstü bilgisayarda dava belgelerini inceliyor",
      "downloadMac": "Mac için indirin",
      "downloadWindows": "Windows için indirin",
      "trustAria": "Yasal belge yönetimi ekipleri neden Zush kullanıyor?"
    },
    "demoLabel": "Zush yasal belgeleri aranabilir konu dosyaları halinde düzenliyor",
    "audiences": {
      "eyebrow": "Yasal dosya organizasyonu",
      "title": "Klasör çalışma alanı olduğunda, dosya adları dizin olur",
      "description": "Zush, hukuk ekiplerinin resmi bir belge yönetim sisteminin öncesinde, yanında ve dışında yaşayan belgeleri düzenlemesine yardımcı olur.",
      "items": [
        {
          "title": "Paylaşılan klasörlerden çalışan küçük firmalar",
          "description": "Başka bir belge deposu satın almadan vaka dosyalarını Finder, File Explorer, OneDrive, Dropbox veya bir ağ sürücüsünde anlaşılır tutun.",
          "imageAlt": "Paylaşılan klasörlerden çalışan küçük firmalar: Başka bir belge deposu satın almadan vaka dosyalarını Finder, File Explorer, OneDrive, Dropbox veya bir ağ sürücüsünde anlaşılır tutun."
        },
        {
          "title": "Dava ve avukat yardımcısı ekipleri",
          "description": "İndirilen savunmaları, prodüksiyonları, sergileri, yazışmaları ve tarayıcı çıktılarını, dosyalamadan veya incelemeden önce kronolojik bir konu klasörüne dönüştürün.",
          "imageAlt": "Dava ve avukat yardımcısı ekipleri: İndirilen savunmaları, prodüksiyonları, sergileri, yazışmaları ve tarayıcı çıktılarını, dosyalamadan veya incelemeden önce kronolojik bir konu klasörüne dönüştürün."
        },
        {
          "title": "Yasal operasyonlar ve DMS yöneticileri",
          "description": "Belgelerin sistemler arasında taşınırken veya DMS'den ayrılırken bağlamlarını koruyabilmesi için giriş, geçiş ve dışa aktarma sırasında dosya adlarını standartlaştırın.",
          "imageAlt": "Yasal operasyonlar ve DMS yöneticileri: Belgelerin sistemler arasında taşınırken veya DMS'den ayrılırken bağlamlarını koruyabilmesi için giriş, geçiş ve dışa aktarma sırasında dosya adlarını standartlaştırın."
        }
      ]
    },
    "fields": {
      "title": "Madde adlandırma alanları",
      "description": "Her vaka klasörünü aranabilir bir konu kaydına dönüştürün",
      "instruction": "Sonucu görmek için bir alana dokunun",
      "ariaLabel": "Zush'nin okuduğu yasal alanlar",
      "hint": "Önerilen dosya adı",
      "items": [
        {
          "label": "Madde numarası",
          "before": "document (7).pdf",
          "after": "2026-0142 – 2026-06-12 – Keşif Emri",
          "emphasis": "2026-0142"
        },
        {
          "label": "Belge tarihi",
          "before": "scan_0048.pdf",
          "after": "2026-0142 – 2026-06-13 – Avukat Mektubu",
          "emphasis": "2026-06-13"
        },
        {
          "label": "Belge türü",
          "before": "download (3).pdf",
          "after": "2026-0142 – 2026-05-06 – Şikayet",
          "emphasis": "Şikayet"
        },
        {
          "label": "Müşteri",
          "before": "signed_final.pdf",
          "after": "Northwind – 01.06.2026 – Gizlilik Anlaşması – Yürütüldü"
        },
        {
          "label": "Taraf / Karşı Taraf",
          "before": "contract_v2.docx",
          "after": "Northwind – Gizlilik Anlaşması – Meridian – Taslak v02"
        },
        {
          "label": "Mahkeme / Mekan",
          "before": "efile.pdf",
          "after": "2026-0142 – 2026-05-29 – Cevap – SDNY",
          "emphasis": "SDNY"
        },
        {
          "label": "Durum",
          "before": "agreement.pdf",
          "after": "Northwind – Hizmet Sözleşmesi – Yürürlükte"
        },
        {
          "label": "Sürüm",
          "before": "ltr_draft_final2.docx",
          "after": "2026-0142 – Talep Mektubu – v03",
          "emphasis": "v03"
        },
        {
          "label": "Yazar / Danışman",
          "before": "correspondence.pdf",
          "after": "2026-0142 – 2026-06-13 – Mektup – J. Chen",
          "emphasis": "J. Chen"
        },
        {
          "label": "Özel alan — sade bir dille açıklayın",
          "before": "Scan0091.pdf",
          "after": "2026-0158 – Ek B – Fatura Seti",
          "emphasis": "Ek B"
        }
      ]
    },
    "privacy": {
      "eyebrow": "Gizli işleme",
      "title": "Gizli yasal belgeleri kendi koşullarınıza göre düzenleyin",
      "description": "İş akışındaki belgelere göre yerel işlemeyi, firmanızın onaylı yapay zeka sağlayıcısını veya Zush tarafından yönetilen yapay zekayı seçin. Kaynak dosyalar, ekibinizin zaten sakladığı yerde kalır.",
      "items": [
        {
          "title": "Yerel modellerle çevrimdışı yapay zeka",
          "description": "Desteklenen vaka dosyalarını, depolandıkları Mac veya Windows PC'deki yerel Ollama modelleriyle düzenleyin. Belge içeriği Zush'ye veya bir AI sağlayıcısına gönderilmez.",
          "badge": "Dosyaları makinede tut",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "Firmanızın AI hesabını kullanın",
          "description": "Firmanız tarafından onaylanan AI sağlayıcı hesabını ve modelini bağlayın. Sağlayıcı seçtiğiniz belgeleri işlerken API anahtarı güvenli yerel depolamada kalır.",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "Yönetilen yapay zekayla başlayın",
          "description": "Gizli olmayan belgeler ve hızlı değerlendirme için Zush tarafından yönetilen yapay zekayı kullanın. İstemci dosyaları farklı bir işleme ilkesi gerektirdiğinde Çevrimdışı AI veya BYOK'yi seçin.",
          "badge": "En hızlı kurulum",
          "kind": "cloud-ai"
        }
      ],
      "note": "Zush hiçbir zaman vaka dosyalarınızın deposu haline gelmez: belgeleri yerinde yeniden adlandırır ve saklamaz. Firmanız her iş akışı için belge içeriğinin nasıl işleneceğini seçer.",
      "docsLinkLabel": "Modların verileri nasıl işlediğini okuyun"
    },
    "workflow": {
      "eyebrow": "İş akışı",
      "title": "Halihazırda kullandığınız araçlara tutarlı dosya organizasyonu ekleyin",
      "description": "Zush'yi e-posta, mahkeme indirmeleri, tarayıcılar, paylaşılan klasörler ve yasal belge yönetim sisteminiz arasında adlandırma katmanı olarak kullanın.",
      "items": [
        {
          "title": "Konu adlandırma kuralını tanımlayın",
          "description": "Müşteri veya konu numarası, belge tarihi, türü, tarafı, durumu, sürümü ve uygulamanızın kullandığı herhangi bir alandan bir Template oluşturun."
        },
        {
          "title": "Girişte veya arşivde çalıştırın",
          "description": "Belgeleri yeni bir platforma taşımadan kopyalanan bir vaka klasörünü, indirilen dosyaları, tarayıcı çıktısını veya bir DMS dışa aktarımını düzenleyin."
        },
        {
          "title": "Konuya hazır dosya adlarını onaylayın",
          "description": "Grubun tamamını inceleyin, istisnaları düzeltin ve yeniden adlandırma geçmişiyle birlikte uygulayın. Daha sonra yinelenen alım klasörlerini aynı kuralla izleyin."
        }
      ],
      "links": [
        {
          "label": "Template adlı yasal bir belge oluşturun",
          "href": "/docs/templates/legal-documents"
        },
        {
          "label": "Yasal belge alım klasörlerini otomatikleştirin",
          "href": "/docs/folder-monitoring"
        },
        {
          "label": "Yasal dosya adlandırma kurallarına ve örneklerine bakın",
          "href": "/blog/legal-file-naming-conventions"
        }
      ]
    },
    "documents": {
      "eyebrow": "Desteklenen yasal dosyalar",
      "title": "Her hukuki konuya ilişkin belgeler için tek bir düzenleyici",
      "description": "Firma genelinde tutarlı, konuya dayalı bir yapıyı korurken dava, işlemsel işler, keşif ve müşteri alımı için ayrı adlandırma kuralları oluşturun.",
      "items": [
        {
          "title": "Mahkeme kayıtları",
          "description": "Şikayetleri, yanıtları, talepleri, siparişleri, bildirimleri ve e-dosyalama makbuzlarını konuya, tarihe, belge türüne ve yere göre adlandırın.",
          "example": "2026-0142 – 2026-05-29 – Cevap – SDNY.pdf"
        },
        {
          "title": "Sözleşmeler ve anlaşmalar",
          "description": "Taslakları, kırmızı çizgileri, temiz kopyaları ve yürütülen sözleşmeleri müşteriler ve karşı taraflar arasında ayrı tutun.",
          "example": "Northwind – Gizlilik Anlaşması – Meridian – İdam Edildi – 2026-06-01.pdf"
        },
        {
          "title": "Yazışma",
          "description": "Talep mektuplarını, müşteri mektuplarını ve karşı taraf avukatıyla olan iletişimleri kronolojik sıraya göre düzenleyin.",
          "example": "2026-0142 – 2026-06-10 – Talep Mektubu – v03.docx"
        },
        {
          "title": "Keşif ve sergiler",
          "description": "Yapımları, yanıtları, sergi setlerini, biriktirme materyallerini ve kanıt taramalarını konuya özgü alanlara göre adlandırın.",
          "example": "2026-0158 – 2026-06-11 – Ek B – Fatura Seti.pdf"
        },
        {
          "title": "Dahili çalışma ürünü",
          "description": "Aynı kuralı araştırmaya, görüşme notlarına, strateji notlarına ve ifade hazırlık dosyalarına da uygulayın.",
          "example": "2026-0142 – 2026-06-12 – Not – Biriktirme Hazırlığı.docx"
        },
        {
          "title": "Tarayıcı çıkışı",
          "description": "Yalnızca görsel içeren PDF'leri ve genel kaynak adlarına sahip kağıt yazışmalarını aranabilir konu dosyalarına dönüştürün.",
          "example": "2026-0158 – 2026-06-13 – Yazışma – Danışman.pdf"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "Organizasyon sonuçları",
      "title": "Hangi yasal dosya organizasyonu daha iyi değişir?",
      "description": "Amaç daha güzel dosya adları değil. Belgeler nereye giderse gitsin anlaşılabilen bir dava dosyasıdır.",
      "items": [
        {
          "title": "Açmadan önce doğru belgeyi bulun",
          "description": "Madde numarası, belge türü, taraf ve durum, klasör listesini indirmeler ve tarama numaraları duvarı yerine kullanışlı bir dizine dönüştürür."
        },
        {
          "title": "Vaka kronolojisini bir bakışta okuyun",
          "description": "Belge tarihini tutarlı bir ISO formatına yerleştirdiğinizde, konu klasörü başvurular, mektuplar, anlaşmalar ve olaylardan oluşan bir zaman çizelgesine göre sıralanır."
        },
        {
          "title": "İçeriği DMS dışında koruyun",
          "description": "Kendini tanımlayan dosya adları, e-posta eklerinde, istemci dışa aktarımlarında, ortak sürücülerde, keşif kümelerinde ve kapalı dosya arşivlerinde yararlı olmaya devam eder."
        }
      ]
    },
    "faq": {
      "title": "Yasal belge organizasyonu, yanıtlandı",
      "description": "Yapay zeka dosya organizasyonu, konu klasörleri, ortak sürücüler, yasal belge yönetimi yazılımı, gizli dosyalar, önizleme ve geri alma ile nasıl çalışır?",
      "items": [
        {
          "question": "Yasal belgeleri düzenlemenin en iyi yolu nedir?",
          "answer": "Belgeleri müşteriye ve konuya göre düzenleyin, ardından konu numarası, belge tarihi, belge türü, taraf ve sürüm veya durumdan oluşturulan tutarlı bir dosya adı kullanın. Bu, her bir klasörün aranabilir ve kronolojik olmasını sağlarken aynı zamanda sözleşmeyi ortak sürücüler, dışa aktarmalar ve belge yönetimi sistemleri arasında taşınabilir tutar."
        },
        {
          "question": "Yapay zeka yasal belgeleri otomatik olarak düzenleyebilir mi?",
          "answer": "Evet. Zush, PDF'lerin, Word belgelerinin ve taramaların içeriğini okur, Template'nizde tanımlanan alanları çıkarır ve toplu iş için tutarlı dosya adları önerir. Bir kişi herhangi bir dosya adı değişmeden önce sonuçları inceler."
        },
        {
          "question": "Zush yasal belge yönetimi yazılımının yerini mi alıyor?",
          "answer": "Hayır. Zush, DMS'nizin çevresindeki belgeler için bir organizasyon katmanıdır: alım klasörleri, paylaşılan sürücüler, indirilen dosyalar, tarayıcı çıktısı, geçiş toplu işlemleri ve dışa aktarımlar. Dosyaları yerinde yeniden adlandırır ve belge depolama, erişim kontrolü, hukuki araştırma veya konu yönetimi sağlamaz."
        },
        {
          "question": "Zush gizli vaka dosyalarını yüklemeden düzenleyebilir mi?",
          "answer": "Evet. Çevrimdışı AI modunda, desteklenen dosyalar Mac veya Windows'taki yerel Ollama modelleriyle analiz edilir, böylece belge içeriği o makinede kalır. Zush, dosyaları yerinde yeniden adlandırır ve saklamaz."
        },
        {
          "question": "Bir hukuk firması eski dava dosyalarını nasıl düzenleyebilir?",
          "answer": "Kopyalanmış bir kapalı dosya klasörüyle başlayın, bu belgelerde zaten mevcut olan alanlar için bir Template tanımlayın ve önerilen adların toplu olarak önizlemesini yapın. Kural güvenilir hale geldiğinde, onu, geri alınabilecek yeniden adlandırma geçmişiyle birlikte arşive uygulayın."
        },
        {
          "question": "Zush yasal belgelerden konu numaralarını çıkarabilir mi?",
          "answer": "Evet. Konuyu veya vaka numarasını ve gerekli formatını açıklayan bir Custom AI Block ekleyin. Blok, Template adlandırmasında belge tarihi, türü, tarafı, yeri, durumu, sürümü veya firmaya özgü diğer alanların yanında görünebilir."
        },
        {
          "question": "Mahkeme dosyalarını ve taranmış yasal belgeleri düzenliyor mu?",
          "answer": "Evet. Zush, ayrı bir OCR adımı olmadan e-dosyalama PDF'lerini ve yapay zeka vizyonuyla yalnızca görüntü içeren tarayıcı çıktısını okuyabilir. Klasör izleme, bu belgelerin geldiği yerleri izleyebilir."
        },
        {
          "question": "Taslakları, kırmızı çizgileri ve yürütülen kopyaları ayırt edebiliyor mu?",
          "answer": "Evet. İşlemsel bir Template'ye durum ve sürüm alanlarını ekleyin; böylece önerilen her dosya adı, belgenin bir taslak mı, kırmızı çizgi mi, temiz kopya mı yoksa yürütülmüş bir sözleşme mi olduğunu tanımlar."
        }
      ]
    },
    "guides": {
      "title": "Yasal belge düzenleme kılavuzları",
      "description": "Bir hukuk firmasının DMS'si etrafındaki belgeler için maddeye dayalı adlandırma, tarayıcı girişi ve özel yapay zeka işleme.",
      "slugs": [
        "legal-file-naming-conventions",
        "rename-scanned-documents-automatically",
        "cloud-vs-local-ai-file-renaming"
      ]
    },
    "finalCta": {
      "title": "Zush ile kopyalanan bir vaka klasörünü düzenleyin",
      "subtitle": "İndirilenler, taslaklar ve taramalarla dolu bir konu klasörüyle başlayın. Önerilen dosya adlarını gözden geçirin, adlandırma kuralını hassaslaştırın ve başka bir geçiş gerekiyorsa toplu işlemi geri alın."
    }
  },
  "hr": {
    "path": "/for-hr",
    "seo": {
      "title": "Çevrimdışı AI Dosya Yeniden Adlandırma ile İK Belge Yönetimi",
      "description": "Zush özgeçmişleri, teklif mektuplarını, işe alım formlarını, incelemeleri, politikaları ve dışa aktarılan kayıtları okur ve ardından bunlara tutarlı, aranabilir dosya adları verir. Mac veya Windows'ta mevcut klasörler, paylaşılan sürücüler, ATS indirmeleri ve HRIS dışa aktarmalarıyla kullanın."
    },
    "pageTitle": "İK belge yönetimi",
    "hero": {
      "eyebrow": "İK ve insan ekipleri için",
      "titleLead": "İK belgelerini şu şekilde yeniden adlandırın:",
      "titleAccent": "çalışan, tarih ve tür",
      "subtitle": "Zush özgeçmişleri, teklif mektuplarını, işe alım formlarını, incelemeleri, politikaları ve dışa aktarılan kayıtları okur ve ardından bunlara tutarlı, aranabilir dosya adları verir. Mac veya Windows'ta mevcut klasörler, paylaşılan sürücüler, ATS indirmeleri ve HRIS dışa aktarmalarıyla kullanın.",
      "trustLine": [
        "Works with your existing folders",
        "Offline AI for sensitive records",
        "Preview before every rename"
      ],
      "photoAlt": "İK profesyonelleri modern bir ofiste çalışanların işe alım belgelerini inceliyor",
      "downloadMac": "Mac için indirin",
      "downloadWindows": "Windows için indirin",
      "trustAria": "İK belge yönetimi ekipleri neden Zush kullanıyor?"
    },
    "demoLabel": "Zush İK belgelerini aranabilir çalışan ve aday dosyaları halinde düzenleme",
    "audiences": {
      "eyebrow": "İK dosya organizasyonu",
      "title": "Dosyalar insan sistemleri arasında taşındığında dosya adları bağlamı taşır",
      "description": "Zush, kişi ekiplerinin ATS veya HRIS öncesinde, yanında ve dışında bulunan belgeleri düzenlemesine yardımcı olur.",
      "items": [
        {
          "title": "İK genel uzmanları ve küçük insan ekipleri",
          "description": "Finder, File Explorer, OneDrive, Dropbox veya bir ağ sürücüsünde işe alım, çalışan değişiklikleri, incelemeler ve işten çıkarma belgelerini anlaşılır tutun.",
          "imageAlt": "İK genel uzmanları ve küçük insan ekipleri: Finder, File Explorer, OneDrive, Dropbox veya bir ağ sürücüsünde işe alım, çalışan değişiklikleri, incelemeler ve işten çıkarma belgelerini anlaşılır tutun."
        },
        {
          "title": "İşe alma ve yetenek kazanma",
          "description": "ATS indirmelerini, özgeçmişlerini, portföylerini, röportaj notlarını, puan kartlarını ve imzalı tekliflerini devir veya arşivlemeden önce tutarlı bir aday kaydına dönüştürün.",
          "imageAlt": "İşe alma ve yetenek edinme: ATS indirmelerini, özgeçmişlerini, portföylerini, röportaj notlarını, puan kartlarını ve imzalı teklifleri devir veya arşivlemeden önce tutarlı bir aday kaydına dönüştürün."
        },
        {
          "title": "Kişi işlemleri ve HRIS yöneticileri",
          "description": "Çalışan kayıtlarının sistemler arasında geçiş yaptıklarında veya HRIS'den çıktıklarında bağlamlarını korumaları için giriş, geçiş ve dışa aktarma sırasında dosya adlarını standartlaştırın.",
          "imageAlt": "Kişi işlemleri ve HRIS yöneticileri: Çalışan kayıtlarının sistemler arasında geçiş yaptıklarında veya HRIS'den ayrıldıklarında bağlamlarını korumaları için giriş, geçiş ve dışa aktarma sırasında dosya adlarını standartlaştırın."
        }
      ]
    },
    "fields": {
      "title": "Kişiler alanları kaydeder",
      "description": "Her İK klasörünü aranabilir bir kişi kaydına dönüştürün",
      "instruction": "Sonucu görmek için bir alana dokunun",
      "ariaLabel": "İK alanları Zush okur",
      "hint": "Önerilen dosya adı",
      "items": [
        {
          "label": "Çalışan Kimliği",
          "before": "scan_0048.pdf",
          "after": "EMP-1042 – 2026-08-03 – Avantaj Kaydı",
          "emphasis": "EMP-1042"
        },
        {
          "label": "aday",
          "before": "resume-final.pdf",
          "after": "Rivera Sofia – Ürün Tasarımcısı – Özgeçmiş"
        },
        {
          "label": "Belge tarihi",
          "before": "document (7).pdf",
          "after": "EMP-1042 – 2026-08-03 – Teklif Mektubu",
          "emphasis": "2026-08-03"
        },
        {
          "label": "Belge türü",
          "before": "download (3).pdf",
          "after": "EMP-1042 – 2026-08-05 – Vergi Formu",
          "emphasis": "Vergi Formu"
        },
        {
          "label": "Rol / Pozisyon",
          "before": "candidate_notes.docx",
          "after": "Rivera Sofia – Ürün Tasarımcısı – Röportaj Notları",
          "emphasis": "Ürün Tasarımcısı"
        },
        {
          "label": "Departman",
          "before": "policy_ack.pdf",
          "after": "EMP-1186 – Finans – Güvenlik Politikası Onayı",
          "emphasis": "Finans"
        },
        {
          "label": "Geçerlilik tarihi",
          "before": "signed_letter.pdf",
          "after": "EMP-1042 – Promosyon – Geçerlilik Tarihi 2026-09-01",
          "emphasis": "2026-09-01"
        },
        {
          "label": "İnceleme dönemi",
          "before": "review_final2.docx",
          "after": "EMP-1042 – Performans İncelemesi – 2026 H1",
          "emphasis": "2026 H1"
        },
        {
          "label": "Durum",
          "before": "offer.pdf",
          "after": "Rivera Sofia – Ürün Tasarımcısı – Teklif – İmzalandı",
          "emphasis": "İmzalandı"
        },
        {
          "label": "Özel alan — sade bir dille açıklayın",
          "before": "Form0091.pdf",
          "after": "EMP-1042 – Ekipman Sözleşmesi – Dizüstü Bilgisayar İadesi",
          "emphasis": "Dizüstü Bilgisayar İadesi"
        }
      ]
    },
    "privacy": {
      "eyebrow": "Hassas dosya işleme",
      "title": "Hassas İK dokümanlarını kendi koşullarınıza göre düzenleyin",
      "description": "İş akışındaki belgelere göre yerel işlemeyi, kuruluşunuzun onaylı yapay zeka sağlayıcısını veya Zush tarafından yönetilen yapay zekayı seçin. Kaynak dosyalar, ekibinizin zaten sakladığı yerde kalır.",
      "items": [
        {
          "title": "Yerel modellerle çevrimdışı yapay zeka",
          "description": "Desteklenen çalışan ve aday dosyalarını, depolandıkları Mac veya Windows PC'deki yerel Ollama modelleriyle düzenleyin. Belge içeriği Zush'ye veya bir AI sağlayıcısına gönderilmez.",
          "badge": "Dosyaları makinede tut",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "Kuruluşunuzun AI hesabını kullanın",
          "description": "Kuruluşunuz tarafından onaylanan AI sağlayıcı hesabını ve modelini bağlayın. Sağlayıcı seçtiğiniz belgeleri işlerken API anahtarı güvenli yerel depolamada kalır.",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "Yönetilen yapay zekayla başlayın",
          "description": "Örnek veya hassas olmayan belgeler ve hızlı değerlendirme için Zush tarafından yönetilen yapay zekayı kullanın. Personel kayıtları farklı bir işleme politikası gerektirdiğinde Çevrimdışı AI veya BYOK'yi seçin.",
          "badge": "En hızlı kurulum",
          "kind": "cloud-ai"
        }
      ],
      "note": "Zush asla çalışan veya aday dosyaları için kayıt sistemi haline gelmez: belgeleri yerinde yeniden adlandırır ve saklamaz. Kuruluşunuz her iş akışı için belge içeriğinin nasıl işleneceğini seçer.",
      "docsLinkLabel": "Modların verileri nasıl işlediğini okuyun"
    },
    "workflow": {
      "eyebrow": "İş akışı",
      "title": "Halihazırda kullandığınız İK araçlarına tutarlı dosya organizasyonu ekleyin",
      "description": "Zush'yi e-posta, işe alma indirmeleri, tarayıcılar, paylaşılan klasörler ve ATS veya HRIS arasında adlandırma katmanı olarak kullanın.",
      "items": [
        {
          "title": "İK adlandırma kuralını tanımlayın",
          "description": "Çalışan veya aday kimliği, belge tarihi, türü, rolü, departmanı, inceleme süresi, durumu ve kişi ekibinizin kullandığı herhangi bir alandan bir Template oluşturun."
        },
        {
          "title": "Girişte veya dışa aktarımda çalıştırın",
          "description": "Dosyaları yeni bir platforma taşımadan, kopyalanan bir çalışan klasörünü düzenleyin, indirmeleri işe alın, taramaları yapın, politika onaylarını alın veya ATS veya HRIS dışa aktarımını gerçekleştirin."
        },
        {
          "title": "Aranabilir dosya adlarını onaylayın",
          "description": "Grubun tamamını inceleyin, istisnaları düzeltin ve yeniden adlandırma geçmişiyle birlikte uygulayın. Daha sonra yinelenen alım klasörlerini aynı kuralla izleyin."
        }
      ],
      "links": [
        {
          "label": "Çalışan dosyası adlandırma kuralı oluşturun",
          "href": "/blog/hr-employee-file-naming-convention"
        },
        {
          "label": "İlk katılım belge alımını organize edin",
          "href": "/blog/organize-employee-onboarding-documents"
        },
        {
          "label": "Aday ve işe alım dosyalarını düzenleyin",
          "href": "/blog/organize-candidate-files-recruiting"
        }
      ]
    },
    "documents": {
      "eyebrow": "Desteklenen İK dosyaları",
      "title": "Çalışanların yaşam döngüsü boyunca dosyalar için tek düzenleyici",
      "description": "Tutarlı bir insan temelli yapıyı korurken işe alma, işe alım, çalışan değişiklikleri, performans, politika onayları ve işten çıkarma için ayrı adlandırma kuralları oluşturun.",
      "items": [
        {
          "title": "İşe alım ve aday dosyaları",
          "description": "Adaya, role, tarihe ve duruma göre özgeçmişleri, portföyleri, röportaj notlarını, puan kartlarını, geçmiş kontrol belgelerini ve teklifleri adlandırın.",
          "example": "Rivera Sofia – Ürün Tasarımcısı – Teklif – Signed.pdf"
        },
        {
          "title": "İlk katılım kayıtları",
          "description": "İmzalı teklifleri, vergi formlarını, yardım seçimlerini, kimlik belgelerini, ekipman anlaşmalarını ve politika onaylarını ayrı tutun.",
          "example": "EMP-1042 – 2026-08-05 – Avantajlar Kaydı.pdf"
        },
        {
          "title": "Çalışan değişiklikleri",
          "description": "Yürürlük tarihi ve durumuna göre terfi mektuplarını, tazminat değişikliklerini, transferleri, izin kayıtlarını ve esnek çalışma sözleşmelerini düzenleyin.",
          "example": "EMP-1042 – Promosyon – Geçerlilik Tarihi 2026-09-01.pdf"
        },
        {
          "title": "Performans ve geliştirme",
          "description": "İnceleme formlarını, hedefleri, gelişim planlarını, eğitim sertifikalarını ve yönetici notlarını çalışana ve inceleme dönemine göre adlandırın.",
          "example": "EMP-1042 – Performans İncelemesi – 2026 H1.pdf"
        },
        {
          "title": "Politikalar ve onaylar",
          "description": "El kitabı makbuzlarını, güvenlik eğitimini, davranış kuralları onaylarını ve politika güncellemelerini çalışana, politikaya ve tarihe göre ayırın.",
          "example": "EMP-1186 – Güvenlik Politikası Bildirimi – 2026-07-22.pdf"
        },
        {
          "title": "Ayrılma ve arşivler",
          "description": "Saklama veya arşivleme iş akışlarından önce çıkış formlarını, ekipman iadelerini, son mektupları ve dışa aktarılan personel kayıtlarını net dosyalara dönüştürün.",
          "example": "EMP-1042 – Ekipman İadesi – Tamamlandı – 2026-10-04.pdf"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "Organizasyon sonuçları",
      "title": "İK dosya organizasyonunda daha iyi ne olabilir?",
      "description": "Amaç daha güzel dosya adları değil. Onaylanmış bir iş akışının belgeyi gönderdiği her yerde anlaşılır kalan bir kişi kaydıdır.",
      "items": [
        {
          "title": "Açmadan önce kaydı tanımlayın",
          "description": "Çalışan veya aday kimliği, belge türü, rol, dönem ve durum, bir klasör listesini, indirmeler ve tarama numaralarından oluşan bir duvar yerine kullanışlı bir dizine dönüştürür."
        },
        {
          "title": "Yaşam döngüsü aktarımlarının gözden geçirilmesini kolaylaştırın",
          "description": "Tutarlı adlar, işe alım, İK, yöneticiler, maaş bordrosu, BT ve operasyonların, onaylanmış bir iş akışından geçen bir dosyanın ne olduğunu anlamasına yardımcı olur."
        },
        {
          "title": "İçeriği HRIS dışında koruyun",
          "description": "Kendini tanımlayan dosya adları, onaylı dışa aktarmalarda, geçiş toplu işlerinde, paylaşılan klasörlerde, çalışan paketlerinde ve saklama arşivlerinde kullanışlı olmaya devam eder."
        }
      ]
    },
    "faq": {
      "title": "İK belge organizasyonu, yanıtlandı",
      "description": "AI dosya organizasyonu, çalışan klasörleri, işe alım indirmeleri, HRIS ve ATS dışa aktarmaları, hassas kayıtlar, önizleme ve geri alma ile nasıl çalışır?",
      "items": [
        {
          "question": "İK belgelerini düzenlemenin en iyi yolu nedir?",
          "answer": "Kayıt sistemi olarak HRIS veya ATS'yi kullanın, ardından dosyaları çalışan veya aday kimliğine ve belge tarihi, türü, rolü veya departmanı, dönemi ve durumuna göre oluşturulan tutarlı bir dosya adına göre bunun etrafında düzenleyin. Kuruluşunuzun politikası gerektirmediği sürece hassas kişisel ayrıntıları dosya adlarından uzak tutun."
        },
        {
          "question": "Yapay zeka çalışan dosyalarını otomatik olarak düzenleyebilir mi?",
          "answer": "Evet. Zush, PDF'leri, Word belgelerini, görüntüleri ve taramaları okur, Template'nizde tanımlanan alanları çıkarır ve toplu iş için tutarlı dosya adları önerir. Bir kişi herhangi bir dosya adı değişmeden önce sonuçları inceler."
        },
        {
          "question": "Zush, HRIS, ATS veya çalışan belge yönetimi sisteminin yerini mi alıyor?",
          "answer": "Hayır. Zush, alım klasörleri, paylaşılan sürücüler, indirme işlemlerinin alınması, tarayıcı çıktısı, geçiş toplu işlemleri ve dışa aktarımlar için bir organizasyon katmanıdır. Dosyaları yerinde yeniden adlandırır ve çalışan kayıtlarının saklanması, izinler, işe alım, maaş bordrosu, saklama yaptırımı veya vaka yönetimi sağlamaz."
        },
        {
          "question": "Zush hassas İK dosyalarını yüklemeden düzenleyebilir mi?",
          "answer": "Evet. Çevrimdışı AI modunda, desteklenen dosyalar Mac veya Windows'taki yerel Ollama modelleriyle analiz edilir, böylece belge içeriği o makinede kalır. Zush, dosyaları yerinde yeniden adlandırır ve saklamaz."
        },
        {
          "question": "İK çalışan belgelerini nasıl adlandırmalı?",
          "answer": "Pratik bir kalıp ÇalışanKimliği – YYYY-AA-GG – Belge Türü – DönemOrStatus'tur. Aday dosyaları için Aday – Rol – DocumentType – Durum'u kullanın. Tam alanlar kuruluşunuzun erişim, gizlilik ve saklama politikalarına uygun olmalıdır."
        },
        {
          "question": "Zush çalışan kimliklerini ve geçerlilik tarihlerini çıkarabilir mi?",
          "answer": "Evet. Çalışan kimliğini, yürürlük tarihini, inceleme dönemini, rolü, departmanı veya kuruluşa özgü diğer alanları ve gerekli biçimleri açıklayan Custom AI Blocks'yi ekleyin."
        },
        {
          "question": "Taranan işe alım formlarını düzenliyor mu?",
          "answer": "Evet. Zush, ayrı bir OCR adımı olmadan, yalnızca görüntü içeren PDF'leri ve fotoğraflanmış belgeleri AI vizyonuyla okuyabilir. Klasör izleme, katılım belgelerinin ulaştığı onaylı konumları izleyebilir."
        },
        {
          "question": "İK işe alım ve çalışan kayıtları için farklı adlandırma kuralları kullanabilir mi?",
          "answer": "Evet. Aday alımı, işe alım, çalışan değişiklikleri, performans belgeleri ve işten çıkarma için ayrı Templates oluşturun; böylece her iş akışı yalnızca ihtiyaç duyduğu alanları çıkarır."
        }
      ]
    },
    "guides": {
      "title": "İK belge düzenleme kılavuzları",
      "description": "Çalışan, aday ve işe alım belgeleri için adlandırma kuralları ve alım iş akışları.",
      "slugs": [
        "hr-employee-file-naming-convention",
        "organize-employee-onboarding-documents",
        "organize-candidate-files-recruiting"
      ]
    },
    "finalCta": {
      "title": "Zush ile kopyalanan bir İK klasörünü düzenleyin",
      "subtitle": "İndirilen işe alım formları, işe alım formları veya dışa aktarılan çalışan belgelerinin bulunduğu bir klasörle başlayın. Önerilen dosya adlarını gözden geçirin, adlandırma kuralını hassaslaştırın ve başka bir geçiş gerekiyorsa toplu işlemi geri alın."
    }
  },
  "real-estate": {
    "path": "/for-real-estate",
    "seo": {
      "title": "AI Dosya Yeniden Adlandırma ile Gayrimenkul Belge Yönetimi",
      "description": "Zush satın alma sözleşmelerini, açıklamaları, inceleme raporlarını, değerlendirmeleri, tapu belgelerini ve mülk fotoğraflarını okur ve ardından bunlara tutarlı dosya adları verir. Mevcut işlem sisteminizi, klasörlerinizi ve ortak sürücülerinizi Mac veya Windows'ta tutun."
    },
    "pageTitle": "Gayrimenkul belge yönetimi",
    "hero": {
      "eyebrow": "Emlakçılar ve işlem ekipleri için",
      "titleLead": "Özellik dosyalarını şu şekilde yeniden adlandırın:",
      "titleAccent": "adres, tarih ve tür",
      "subtitle": "Zush satın alma sözleşmelerini, açıklamaları, inceleme raporlarını, değerlendirmeleri, tapu belgelerini ve mülk fotoğraflarını okur ve ardından bunlara tutarlı dosya adları verir. Mevcut işlem sisteminizi, klasörlerinizi ve ortak sürücülerinizi Mac veya Windows'ta tutun.",
      "trustLine": [
        "Works beside your transaction system",
        "Offline AI for sensitive files",
        "Preview and undo every batch"
      ],
      "photoAlt": "Parlak bir ofiste iki potansiyel alıcıya ev planlarını gösteren bir emlakçı",
      "downloadMac": "Mac için indirin",
      "downloadWindows": "Windows için indirin",
      "trustAria": "Gayrimenkul belge yönetimi ekipleri neden Zush kullanıyor?"
    },
    "demoLabel": "Zush emlak işlem belgelerini mülk adresine göre düzenleme",
    "audiences": {
      "eyebrow": "Gayrimenkul dosya organizasyonu",
      "title": "Tekliften arşive kadar her mülk dosyasını tanınabilir tutun",
      "description": "Zush, aracı kurumunuzun halihazırda kullandığı araçları değiştirmeden, her işlemle ilgili belgelere ve medyaya tutarlı, adres tabanlı bir kimlik kazandırır.",
      "items": [
        {
          "title": "Aktif işlemleri yöneten aracılar",
          "description": "DocuSign indirmelerini, açıklamalarını, inceleme raporlarını, borç veren isteklerini ve kapanış belgelerini e-posta, İndirilenler, paylaşılan klasörler ve işlem platformunda tanımlanabilir tutun.",
          "imageAlt": "Aktif işlemleri yöneten aracılar: DocuSign indirmelerini, açıklamalarını, inceleme raporlarını, borç veren isteklerini ve kapanış belgelerini e-posta, İndirilenler, paylaşılan klasörler ve işlem platformunda tanımlanabilir tutun."
        },
        {
          "title": "İşlem koordinatörleri ve komisyoncu operasyonları",
          "description": "Uyumluluk dosyalarını derlemeden, isteklere yanıt vermeden veya kapatılmış bir işlemi arşivlemeden önce ekip genelinde tek bir adres tabanlı kural uygulayın.",
          "imageAlt": "İşlem koordinatörleri ve komisyoncu operasyonları: Uyumluluk dosyalarını birleştirmeden, isteklere yanıt vermeden veya kapatılmış bir işlemi arşivlemeden önce ekip genelinde tek bir adres tabanlı kural uygulayın."
        },
        {
          "title": "Belgeleri ve medyayı kullanan ekiplerin listelenmesi",
          "description": "Mülk fotoğraflarını, kat planlarını, açıklamaları, listeleme paketlerini ve pazarlama ihracatlarını tek bir uygulamaya zorlamadan doğru adrese bağlı tutun.",
          "imageAlt": "Belgeleri ve medyayı yöneten ekipleri listeleme: Mülk fotoğraflarını, kat planlarını, açıklamaları, listeleme paketlerini ve pazarlama ihracatlarını tek bir uygulamaya zorlamadan doğru adrese bağlı tutun."
        }
      ]
    },
    "fields": {
      "title": "Özellik adlandırma alanları",
      "description": "İşlem klasörünü mülk kaydına dönüştürün",
      "instruction": "Sonucu görmek için bir alana dokunun",
      "ariaLabel": "Gayrimenkul alanları Zush okur",
      "hint": "Önerilen dosya adı",
      "items": [
        {
          "label": "Mülk adresi",
          "before": "DocuSign_892347234.pdf",
          "after": "742 Evergreen Terrace - Satın Alma Sözleşmesi - Yürürlükte"
        },
        {
          "label": "Belge tarihi",
          "before": "download (8).pdf",
          "after": "742 Evergreen Teras - 2026-06-08 - Muayene Raporu",
          "emphasis": "2026-06-08"
        },
        {
          "label": "Belge türü",
          "before": "Document (4).pdf",
          "after": "742 Evergreen Teras - Unvan Taahhüdü - 2026-06-05"
        },
        {
          "label": "Alıcı / satıcı",
          "before": "signed_final.pdf",
          "after": "742 Evergreen Terrace - Johnson'dan Smith'e - Satın Alma Sözleşmesi",
          "emphasis": "Johnson'dan Smith'e"
        },
        {
          "label": "İşlem Kimliği",
          "before": "attachment.pdf",
          "after": "TX-2026-0184 - 742 Evergreen Teras - Açıklama",
          "emphasis": "TX-2026-0184"
        },
        {
          "label": "Durum",
          "before": "contract_v3.pdf",
          "after": "742 Evergreen Terrace - Satın Alma Sözleşmesi - Yürürlükte"
        },
        {
          "label": "Kapanış tarihi",
          "before": "closing.pdf",
          "after": "742 Evergreen Teras - Kapanış Açıklaması - 2026-07-02",
          "emphasis": "2026-07-02"
        },
        {
          "label": "Temsilci / komisyonculuk",
          "before": "listing_docs.zip",
          "after": "88 Harbour Lane - Listeleme Paketi - J. Chen",
          "emphasis": "J. Chen"
        },
        {
          "label": "İlan numarası",
          "before": "property.pdf",
          "after": "MLS-884201 - 88 Harbour Lane - Satıcı Açıklaması",
          "emphasis": "MLS-884201"
        },
        {
          "label": "Fotoğraf konusu",
          "before": "IMG_4821.jpg",
          "after": "88 Harbour Lane - Mutfak - Geniş - 01",
          "emphasis": "Mutfak"
        },
        {
          "label": "Özel alan - sade bir dille açıklayın",
          "before": "scan_0042.pdf",
          "after": "742 Evergreen Teras - HOA Belgeleri - 2026",
          "emphasis": "HOA Belgeleri"
        }
      ]
    },
    "privacy": {
      "eyebrow": "İşlem dosyası işleme",
      "title": "İşlem belgelerini kendi koşullarınıza göre işleyin",
      "description": "İş akışındaki dosyalara göre yerel işlemeyi, aracı kurumunuzun onaylı yapay zeka sağlayıcısını veya Zush tarafından yönetilen yapay zekayı seçin. Kaynak belgeler mevcut klasörlerinde kalır.",
      "items": [
        {
          "title": "Yerel modellerle çevrimdışı yapay zeka",
          "description": "Desteklenen işlem belgelerini ve özellik ortamlarını, depolandıkları Mac veya Windows PC'deki yerel Ollama modelleriyle analiz edin. Dosya içeriği Zush'ye veya bir AI sağlayıcısına gönderilmez.",
          "badge": "Dosyaları makinede tut",
          "badgeTone": "success",
          "kind": "offline-ai"
        },
        {
          "title": "Aracı kurumunuzun AI hesabını kullanın",
          "description": "Aracı kurumunuzun onayladığı AI sağlayıcı hesabını ve modelini bağlayın. Sağlayıcı yalnızca seçtiğiniz dosyaları işlerken API anahtarı güvenli yerel depolamada kalır.",
          "badge": "BYOK",
          "kind": "byok"
        },
        {
          "title": "Yönetilen yapay zekayla başlayın",
          "description": "Hızlı değerlendirme veya hassas olmayan listeleme materyali için Zush tarafından yönetilen yapay zekayı kullanın. Bir işlem farklı bir işleme politikası gerektirdiğinde Çevrimdışı AI veya BYOK'yi seçin.",
          "badge": "En hızlı kurulum",
          "kind": "cloud-ai"
        }
      ],
      "note": "Zush işlem deponuz haline gelmez. Dosyaları yerinde yeniden adlandırır, saklamaz ve izinleri, saklamayı, uyumluluk kontrol listelerini ve iletişimi aracı kurumunuzun halihazırda kullandığı sistemler içinde bırakır.",
      "docsLinkLabel": "Modların verileri nasıl işlediğini okuyun"
    },
    "workflow": {
      "eyebrow": "İş akışı",
      "title": "Zaten sahip olduğunuz işlem akışına tutarlı dosya adları ekleyin",
      "description": "Zush'yi e-posta, e-imza indirmeleri, tarayıcılar, mülk ziyaretleri, paylaşılan klasörler ve işlem yönetimi sisteminiz arasında kullanın.",
      "items": [
        {
          "title": "Özellik adlandırma kuralını tanımlayın",
          "description": "Mülk adresi, işlem kimliği, belge tarihi, tür, taraf, durum, kapanış tarihi ve komisyonculuğa özgü herhangi bir alandan bir Template oluşturun."
        },
        {
          "title": "İşlem alımında çalıştırın",
          "description": "DocuSign indirmelerini, e-posta eklerini, tarayıcı çıktısını, denetim raporlarını, başlık belgelerini, fotoğrafları listelemeyi veya kapalı anlaşma arşivini yeni bir platforma taşımadan düzenleyin."
        },
        {
          "title": "Özelliğe hazır dosya adlarını onaylayın",
          "description": "Grubu gözden geçirin, istisnaları düzeltin ve yeniden adlandırma geçmişiyle birlikte uygulayın. Bir sonraki işlem için izlenen alım klasörlerinde aynı kuralı yeniden kullanın."
        }
      ],
      "links": [
        {
          "label": "Bir emlak belgesi adlandırma kuralı oluşturun",
          "href": "/blog/real-estate-document-naming-convention"
        },
        {
          "label": "İşlem klasörünün tamamını düzenleyin",
          "href": "/blog/how-to-organize-real-estate-transaction-files"
        },
        {
          "label": "DocuSign indirmelerini özelliğe göre yeniden adlandırın",
          "href": "/blog/rename-docusign-files-by-property-address"
        }
      ]
    },
    "documents": {
      "eyebrow": "Desteklenen işlem dosyaları",
      "title": "Her mülk işlemine ilişkin dosyalar için tek bir düzenleyici",
      "description": "Adresi her iş akışında tutarlı tutarken satın almalar, listelemeler, kiralamalar, kapanış paketleri ve mülk medyası için ayrı Templates kullanın.",
      "items": [
        {
          "title": "Satın alma sözleşmeleri ve ekleri",
          "description": "Teklifleri, sayaçları, değişiklikleri ve yürütülen sözleşmeleri mülk, taraf, durum ve belge tarihine göre adlandırın.",
          "example": "742 Evergreen Terrace - Satın Alma Sözleşmesi - Yürürlükte - 2026-06-12.pdf"
        },
        {
          "title": "Denetimler ve onarımlar",
          "description": "Ev denetimlerini, uzman raporlarını, onarım tahminlerini ve makbuzları doğru adrese iliştirilmiş halde tutun.",
          "example": "742 Evergreen Teras - Muayene Raporu - 2026-06-08.pdf"
        },
        {
          "title": "Başlık, emanet ve kapanış",
          "description": "Portal indirme adlarına bağlı kalmadan tapu taahhütlerini, hesap özetlerini, kapanış açıklamalarını, telgraf talimatlarını ve kayıtlı belgeleri düzenleyin.",
          "example": "742 Evergreen Teras - Kapanış Açıklaması - 2026-07-02.pdf"
        },
        {
          "title": "Değerlemeler ve borç veren belgeleri",
          "description": "Değerleme raporlarını, borç veren taleplerini, onay mektuplarını ve destekleyici belgeleri mülk ve tarihe göre adlandırın.",
          "example": "742 Evergreen Teras - Ekspertiz - 2026-06-18.pdf"
        },
        {
          "title": "Açıklamalar ve HOA dosyaları",
          "description": "Satıcı açıklamalarını, kurşun bazlı boya formlarını, HOA paketlerini, sigorta kayıtlarını ve yerel formları tek bir işlem klasöründe ayırt edin.",
          "example": "88 Harbor Lane - Satıcı Açıklaması - İmzalı - 2026-05-27.pdf"
        },
        {
          "title": "Fotoğrafların listelenmesi ve incelenmesi",
          "description": "Medyanın işlem bağlamında kalması için listeleme fotoğraflarına, oda ayrıntılarına, inceleme görsellerine ve pazarlama ihracatlarına aynı mülk adresini uygulayın.",
          "example": "88 Harbour Lane - Mutfak - Geniş - 01.jpg"
        }
      ]
    },
    "outcomes": {
      "eyebrow": "Organizasyon sonuçları",
      "title": "Özellik dosyalarının yararlı adları olduğunda ne değişir?",
      "description": "Amaç, bir portalın dışında ve anlaşma kapandıktan sonra hala anlamlı olan bir işlem klasörüdür.",
      "items": [
        {
          "title": "Adresi arayın ve işlemi görün",
          "description": "Her dosya adındaki tutarlı mülk adresi, sözleşmeleri, raporları, açıklamaları ve fotoğrafları açmadan önce keşfedilebilir hale getirir."
        },
        {
          "title": "Daha az tahmine dayalı bir kapanış paketi oluşturun",
          "description": "Belge türü, tarih, taraf ve durum, klasörü listeleyen portal kimlikleri ve tekrarlanan indirmeler yerine kullanılabilir bir kontrol listesi haline getirir."
        },
        {
          "title": "Anlaşma tamamlandıktan sonra bağlamı koruyun",
          "description": "Kendini tanımlayan dosya adları, e-posta eklerinde, aracılık arşivlerinde, yerel yedeklemelerde, paylaşılan sürücülerde ve bir işlem sisteminden yapılan dışa aktarımlarda yararlı olmaya devam eder."
        }
      ]
    },
    "faq": {
      "title": "Gayrimenkul belge organizasyonu, yanıtlandı",
      "description": "AI dosya yeniden adlandırma işlem sistemleri, DocuSign indirmeleri, belgeleri kapatma, mülk fotoğrafları, hassas dosyalar, önizleme ve geri alma ile nasıl çalışır?",
      "items": [
        {
          "question": "Gayrimenkul belge yönetimi nedir?",
          "answer": "Gayrimenkul belge yönetimi, bir işlem boyunca anlaşmaları, açıklamaları, incelemeleri, tapu dosyalarını, borç veren belgelerini, kapanış kayıtlarını ve mülk medyasını tanımlanabilir tutma sürecidir. Zush, her dosyayı okuyarak ve tutarlı bir özellik tabanlı adlandırma kuralı uygulayarak dosya adı katmanını işler."
        },
        {
          "question": "Zush emlak işlem yönetimi yazılımının yerini mi alıyor?",
          "answer": "Hayır. Zush, DocuSign indirmeleri, e-posta ekleri, tarayıcı çıktısı, inceleme raporları, mülk fotoğrafları, dışa aktarmalar ve arşivler dahil olmak üzere işlem sisteminizdeki dosyaları yeniden adlandırır. Son teslim tarihlerini, imzaları, uyumluluk kontrol listelerini, iletişimi, izinleri veya işlem kayıtlarını yönetmez."
        },
        {
          "question": "Zush, DocuSign dosyalarını özellik adresine göre yeniden adlandırabilir mi?",
          "answer": "Evet. Bir Template, bir DocuSign PDF'den mülk adresini, belge türünü, yürütme tarihini, tarafları, işlem kimliğini ve durumu çıkarabilir ve ardından \"742 Evergreen Terrace - Satın Alma Sözleşmesi - Yürütüldü - 2026-06-12.pdf\" gibi bir dosya adı önerebilir."
        },
        {
          "question": "Kapanış belgelerini otomatik olarak düzenleyebilir mi?",
          "answer": "Zush tapu taahhütlerini, değerlendirme raporlarını, kapanış açıklamalarını, ödeme beyanlarını, borç veren belgelerini ve kayıtlı dosyaları gözden geçirilmiş bir toplu iş olarak yeniden adlandırabilir. Klasör izleme aynı zamanda yeni işlem belgelerinin geldiği yerleri de izleyebilir."
        },
        {
          "question": "Zush mülk fotoğraflarını ve PDF'leri yeniden adlandırabilir mi?",
          "answer": "Evet. Zush, desteklenen mülk fotoğraflarını adrese, odaya, görünüme, çekim türüne veya Template'deki başka bir alana göre adlandırabilir. Dosya adı yapısı işlem belgelerinden farklı olduğunda medyayı listelemek için ayrı bir Template kullanın."
        },
        {
          "question": "Zush, dosyaları özellik klasörlerine taşır mı?",
          "answer": "Hayır. Zush, dosyaları yerinde yeniden adlandırır ve mevcut klasör yapısını değiştirmeden bırakır. Bu, bir aracı kurumun mevcut işlem klasörleri, paylaşılan sürücüsü, Dropbox, OneDrive veya yerel arşivinin etrafına bir adlandırma katmanı eklemeyi güvenli hale getirir."
        },
        {
          "question": "İşlem dosyaları yüklenmeden işlem yapılabilir mi?",
          "answer": "Evet. Çevrimdışı AI modu, desteklenen dosyaları Mac veya Windows'taki yerel Ollama modelleriyle analiz eder, böylece belge içeriği o makinede kalır. BYOK, aracı kurum kendi onaylı sağlayıcı hesabını kullanmayı tercih ettiğinde kullanılabilir."
        },
        {
          "question": "Taranan emlak belgeleriyle çalışır mı?",
          "answer": "Evet. AI Vision, yalnızca görüntü içeren PDF'leri ve desteklenen görüntüleri ayrı bir OCR geçişi olmadan okuyabilir. Buna ofis tarayıcı çıktısı, fotoğraflanmış evraklar, eski kapanış dosyaları ve tarama olarak geri gönderilen imzalı belgeler dahildir."
        },
        {
          "question": "Bir aracı kurum, dosya adlarını birden fazla aracı arasında standartlaştırabilir mi?",
          "answer": "Evet. Satın alma işlemleri, listelemeler, kiralamalar, kapanış paketleri ve mülk medyası için yeniden kullanılabilir Templates oluşturun. Her temsilci veya koordinatör aynı gerekli alan sırasını uygulayabilir ve toplu işlemi değiştirmeden önce önerilen adların ön izlemesini yapabilir."
        }
      ]
    },
    "guides": {
      "title": "Gayrimenkul işlem dosyası kılavuzları",
      "description": "Adlandırma kuralları, işlem klasörü yapısı ve e-imza indirmelerinin otomatik olarak temizlenmesi için ayrı kılavuzlar.",
      "slugs": [
        "real-estate-document-naming-convention",
        "how-to-organize-real-estate-transaction-files",
        "rename-docusign-files-by-property-address"
      ]
    },
    "finalCta": {
      "title": "Kopyalanan bir işlem klasöründe Zush'yi deneyin",
      "subtitle": "Küçük bir DocuSign indirmeleri, inceleme raporları, açıklamalar veya kapanış dosyaları grubuyla başlayın. Önerilen adları gözden geçirin, Template'yi hassaslaştırın ve başka bir geçiş gerekiyorsa toplu işlemi geri alın."
    }
  }
} satisfies ProfessionLocaleCopy;
