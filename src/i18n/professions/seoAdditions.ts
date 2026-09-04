import type { Locale } from '@/i18n/config';
import type {
  ProfessionComparisonCopy,
  ProfessionEditorialReviewCopy,
  ProfessionKey,
  ProfessionPageCopy,
  ProfessionSectionCopy,
} from '@/i18n/professions/types';

type NonEnglishLocale = Exclude<Locale, 'en'>;

interface AccountantEnhancement {
  seo: ProfessionPageCopy['seo'];
  pageTitle: string;
  hero: Pick<ProfessionPageCopy['hero'], 'eyebrow' | 'titleLead' | 'titleAccent' | 'subtitle'>;
  comparison: ProfessionComparisonCopy;
  editorialReview: ProfessionEditorialReviewCopy;
  dmsFaqAnswer: string;
  scanFaqAnswer: string;
  softwareFaqQuestion: string;
  softwareFaqAnswer: string;
  guidesDescription: string;
}

interface PhotographerEnhancement {
  seo: ProfessionPageCopy['seo'];
  pageTitle: string;
  hero: Pick<ProfessionPageCopy['hero'], 'eyebrow' | 'titleLead' | 'titleAccent' | 'subtitle'>;
  comparison: ProfessionComparisonCopy;
  namingRecipes: ProfessionSectionCopy;
  workflowDescription: string;
  boundaryFaqQuestion: string;
  boundaryFaqAnswer: string;
  metadataFaqQuestion: string;
  metadataFaqAnswer: string;
}

interface LocaleEnhancement {
  accountants: AccountantEnhancement;
  photographers: PhotographerEnhancement;
}

const ENHANCEMENTS: Record<NonEnglishLocale, LocaleEnhancement> = {
  fr: {
    accountants: {
      seo: {
        title: "Renommeur de fichiers IA pour comptables",
        description: "Renommez par lots factures, reçus, relevés, formulaires fiscaux et scans par fournisseur, date, numéro, montant et client. Prévisualisation sur Mac et Windows.",
      },
      pageTitle: "Renommeur de fichiers IA pour comptables",
      hero: {
        eyebrow: "Renommeur de fichiers IA pour comptables et cabinets",
        titleLead: "Renommez les documents comptables par",
        titleAccent: "fournisseur, date et numéro",
        subtitle: "Zush est une couche de nommage pour les documents comptables, pas un système de gestion documentaire ni un grand livre. Il nomme factures, reçus, relevés, formulaires fiscaux et scans selon la convention de chaque client, avec aperçu du lot et annulation sur Mac et Windows.",
      },
      comparison: {
        eyebrow: "Pourquoi Zush",
        title: "Pourquoi les équipes comptables utilisent Zush pour nommer leurs fichiers",
        description: "Zush fournit une convention réutilisable pour les factures, reçus, relevés, formulaires fiscaux, scans et exports, tout en laissant chaque fichier dans son dossier actuel.",
        ariaLabel: "Avantages de Zush pour le nommage des fichiers comptables",
        columns: ["Besoin comptable", "Réponse de Zush", "Bénéfice opérationnel"],
        items: [
          { need: "Conventions propres à chaque client", zushWorkflow: "Enregistrez un modèle Zush réutilisable par client, entité ou type de document.", benefit: "La règle reste cohérente sans dépendre de la mémoire de l’équipe." },
          { need: "Champs comptables tirés du contenu", zushWorkflow: "Zush peut proposer le fournisseur, la date, le numéro, le montant, la devise, la période et des champs personnalisés.", benefit: "Les téléchargements et scans génériques deviennent des fichiers comptables recherchables." },
          { need: "Contrôle avant modification", zushWorkflow: "Comparez le nom d’origine et le nom proposé dans l’aperçu du lot.", benefit: "Les dates, montants, devises et numéros ambigus sont corrigés avant application." },
          { need: "Choix de traitement privé", zushWorkflow: "Choisissez l’IA cloud gérée, votre propre clé fournisseur ou l’IA locale avec Ollama.", benefit: "Le cabinet adapte le mode de traitement à sa politique de données client." },
          { need: "Dossiers et stockage existants", zushWorkflow: "Zush renomme les documents sur place au lieu de les déplacer vers un nouveau référentiel.", benefit: "Les noms améliorés restent portables dans le flux de travail actuel." },
          { need: "Récupération après renommage", zushWorkflow: "L’historique conserve le nom d’origine, le nouveau nom, le dossier et l’horodatage.", benefit: "Un lot appliqué peut être vérifié puis annulé si le modèle doit être ajusté." },
        ],
        note: "Zush est la couche de nommage, pas un référentiel documentaire ni un grand livre. Les noms générés par IA sont des étiquettes de travail : vérifiez les champs ambigus dans le document source.",
      },
      editorialReview: {
        label: "Évaluation éditoriale indépendante",
        ratingAria: "Note de 4,5 sur 5",
        readLabel: "Lire l’évaluation complète sur Softpedia",
      },
      dmsFaqAnswer: "Non. Zush est la couche de nommage autour de votre environnement comptable. Il renomme sur place factures, reçus, relevés, scans, téléchargements et exports, mais ne stocke pas les dossiers clients, ne gère pas les accès ou approbations et ne remplace pas un système documentaire, une plateforme comptable ou un portail de cabinet.",
      scanFaqAnswer: "Oui. Zush utilise la vision IA pour lire les PDF image et les formats d’image pris en charge. La qualité du scan reste déterminante : vérifiez le fournisseur, les dates, les numéros, les montants et les devises avant d’appliquer le lot.",
      softwareFaqQuestion: "Zush se connecte-t-il aux logiciels comptables ?",
      softwareFaqAnswer: "Zush organise la couche fichier autour de votre logiciel comptable : téléchargements, pièces jointes, scans, exports et justificatifs. Il ne comptabilise aucune transaction et ne modifie pas les écritures d’une plateforme comptable ou d’un grand livre.",
      guidesDescription: "Conventions Zush et flux d’entrée pour les factures, reçus, formulaires fiscaux et fichiers de votre environnement comptable.",
    },
    photographers: {
      seo: {
        title: "Renommeur de fichiers IA pour photographes et vidéastes",
        description: "Renommez photos RAW, JPEG et clips vidéo par projet, date, sujet, scène et prise. Flux par lots pour photographes et vidéastes sur Mac et Windows.",
      },
      pageTitle: "Renommeur de fichiers IA pour photographes et vidéastes",
      hero: {
        eyebrow: "Pour les photographes et vidéastes",
        titleLead: "Nommage de fichiers par IA pour photographes :",
        titleAccent: "organisez les séances par projet, scène et prise",
        subtitle: "Zush est un renommeur de fichiers IA pour ordinateur destiné aux photographes et vidéastes. Il combine les métadonnées disponibles et le contenu visuel pour nommer les photos RAW, JPEG et clips pris en charge, tandis que votre catalogue, éditeur ou logiciel de montage reste l’outil de création.",
      },
      comparison: {
        eyebrow: "Pourquoi Zush",
        title: "Pourquoi les photographes et vidéastes utilisent Zush pour nommer leurs fichiers",
        description: "Zush combine contexte visuel, dates, métadonnées appareil, séquences et règles du studio pour créer des noms portables avant l’import, pendant le transfert ou dans l’archive.",
        ariaLabel: "Avantages de Zush pour le nommage professionnel des médias",
        columns: ["Besoin média", "Réponse de Zush", "Bénéfice opérationnel"],
        items: [
          { need: "Décrire ce que montre chaque fichier", zushWorkflow: "Zush peut proposer sujet, scène, lieu, type de plan, prise et champs visuels personnalisés.", benefit: "Le dossier devient recherchable sans ouvrir chaque photo ou clip." },
          { need: "Combiner IA et métadonnées stables", zushWorkflow: "Créez un modèle Zush avec date, EXIF, appareil, séquence, projet et contexte détecté par IA.", benefit: "Les noms restent prévisibles tout en décrivant chaque prise." },
          { need: "Une convention pour toutes les caméras", zushWorkflow: "Appliquez le même ordre, séparateur, format de date et règles de studio à un lot mixte.", benefit: "Les fichiers de différents boîtiers, cartes et opérateurs suivent le même système." },
          { need: "Vérifier avant import ou transfert", zushWorkflow: "Affichez côte à côte chaque nom d’origine et proposé avant d’appliquer le lot.", benefit: "Les sujets, scènes et prises ambigus sont corrigés avant la production." },
          { need: "Annuler un renommage appliqué", zushWorkflow: "Zush conserve la correspondance origine-nouveau nom dans l’historique.", benefit: "Le lot complet peut être vérifié et restauré si le modèle doit être ajusté." },
        ],
        boundaryTitle: "Ce qu’un renommage modifie — et ce qu’il faut vérifier",
        boundaryItems: [
          "Zush modifie le nom et le chemin du fichier, pas les pixels, le contenu vidéo ni les métadonnées intégrées.",
          "Les RAW pris en charge conservent leur extension et chaque changement proposé est visible avant application.",
          "L’historique conserve l’ancien nom, le nouveau nom, le dossier et l’horodatage pour permettre l’annulation.",
          "Catalogues, timelines, paires RAW+JPEG et fichiers XMP peuvent créer des liens. Testez une copie et renommez avant import si le rétablissement des liens n’a pas été vérifié.",
        ],
      },
      namingRecipes: {
        title: "Modèles de noms réutilisables pour les séances professionnelles",
        description: "Commencez par des métadonnées stables comme la date, le client, l’appareil et la séquence. Ajoutez sujet, scène, lieu ou type de plan détecté par IA lorsque cela améliore la recherche.",
        items: [
          { title: "Séance client avec séquence appareil", description: "Utilisez une date et un projet déterministes, puis conservez l’appareil ou la séquence pour éviter les collisions entre boîtiers.", example: "{YYYYMMDD}_{Client}_{Séance}_{Appareil}_{Séquence}" },
          { title: "Production vidéo multi-caméras", description: "Combinez le projet avec la scène, le type de plan, la prise et la caméra avant l’entrée dans la timeline.", example: "{Projet}_{Scène}_{TypePlan}_{Prise}_{Caméra}" },
          { title: "Archive portrait ou événement recherchable", description: "Placez d’abord le client et la date, puis le sujet, le lieu ou le moment distinctif.", example: "{Client}_{DateCapture}_{Sujet}_{Lieu}" },
        ],
      },
      workflowDescription: "Conservez votre catalogue, éditeur, logiciel de montage et stockage. Ajoutez une étape de nommage Zush réutilisable autour des dossiers où les médias arrivent déjà.",
      boundaryFaqQuestion: "Zush remplace-t-il un catalogue photo, un éditeur ou un logiciel de montage ?",
      boundaryFaqAnswer: "Non. Zush gère la couche du nom de fichier autour de votre flux existant. Il renomme les médias dans leurs dossiers avant l’import, pendant un transfert ou dans une archive ; il ne remplace pas le tri, l’étalonnage, le montage, les catalogues, les timelines ou la gestion des ressources numériques.",
      metadataFaqQuestion: "Le renommage modifie-t-il les métadonnées photo ou le contenu vidéo ?",
      metadataFaqAnswer: "Non. Zush modifie le nom et le chemin, pas les pixels, le contenu vidéo ni les métadonnées intégrées, et les RAW pris en charge conservent leur extension. Testez toutefois une copie lorsque catalogues, timelines, paires RAW+JPEG ou fichiers XMP maintiennent leurs propres liens.",
    },
  },
  de: {
    accountants: {
      seo: {
        title: "KI-Dateiumbenenner für Buchhaltung und Kanzleien",
        description: "Rechnungen, Belege, Auszüge, Steuerformulare und Scans nach Lieferant, Datum, Nummer, Betrag und Mandant stapelweise umbenennen. Vorschau auf Mac und Windows.",
      },
      pageTitle: "KI-Dateiumbenenner für Buchhaltung und Kanzleien",
      hero: {
        eyebrow: "KI-Dateiumbenenner für Buchhaltung und Kanzleien",
        titleLead: "Buchhaltungsdokumente umbenennen nach",
        titleAccent: "Lieferant, Datum und Nummer",
        subtitle: "Zush ist die Benennungsebene für Buchhaltungsdokumente, kein Dokumentenmanagement und kein Hauptbuch. Es benennt Rechnungen, Belege, Auszüge, Steuerformulare und Scans nach der Konvention jedes Mandanten — mit Stapelvorschau und Rückgängig-Funktion auf Mac und Windows.",
      },
      comparison: {
        eyebrow: "Warum Zush",
        title: "Warum Buchhaltungsteams Zush für Dateinamen verwenden",
        description: "Zush schafft eine wiederverwendbare Benennung für Rechnungen, Belege, Auszüge, Steuerformulare, Scans und Exporte, während jede Datei im vorhandenen Ordner bleibt.",
        ariaLabel: "Vorteile von Zush bei der Benennung von Buchhaltungsdateien",
        columns: ["Anforderung", "So löst Zush sie", "Vorteil im Ablauf"],
        items: [
          { need: "Mandantenspezifische Konventionen", zushWorkflow: "Speichern Sie je Mandant, Einheit oder Dokumentenprozess eine wiederverwendbare Zush-Vorlage.", benefit: "Die Regel bleibt einheitlich, ohne vom Gedächtnis des Teams abzuhängen." },
          { need: "Inhaltsbasierte Buchhaltungsfelder", zushWorkflow: "Zush kann Lieferant, Datum, Nummer, Betrag, Währung, Zeitraum und eigene Felder vorschlagen.", benefit: "Generische Downloads und Scans werden zu durchsuchbaren Buchhaltungsdateien." },
          { need: "Prüfung vor jeder Änderung", zushWorkflow: "Vergleichen Sie ursprüngliche und vorgeschlagene Namen in einer Stapelvorschau.", benefit: "Mehrdeutige Daten, Beträge, Währungen und Nummern lassen sich vorher korrigieren." },
          { need: "Private Verarbeitungsoptionen", zushWorkflow: "Wählen Sie verwaltete Cloud-KI, den eigenen Anbieterschlüssel oder lokale KI mit Ollama.", benefit: "Die Kanzlei stimmt den Modus auf ihre Richtlinie für Mandantendaten ab." },
          { need: "Vorhandene Ordner und Speicher", zushWorkflow: "Zush benennt Dokumente am bestehenden Ort um, statt sie in ein neues Repository zu verschieben.", benefit: "Die verbesserten Namen bleiben im aktuellen Arbeitsablauf portabel." },
          { need: "Wiederherstellung nach dem Umbenennen", zushWorkflow: "Der Verlauf speichert alten Namen, neuen Namen, Ordner und Zeitstempel.", benefit: "Ein angewendeter Stapel kann geprüft und bei Bedarf zurückgesetzt werden." },
        ],
        note: "Zush ist die Benennungsebene, kein Dokumentenarchiv und kein Hauptbuch. KI-generierte Namen sind Arbeitsetiketten; prüfen Sie mehrdeutige Felder anhand des Quelldokuments.",
      },
      editorialReview: {
        label: "Unabhängiger redaktioneller Test",
        ratingAria: "Bewertung 4,5 von 5",
        readLabel: "Vollständigen Softpedia-Test lesen",
      },
      dmsFaqAnswer: "Nein. Zush ist die Benennungsebene rund um Ihre Buchhaltungsumgebung. Es benennt Rechnungen, Belege, Auszüge, Scans, Downloads und Exporte am bestehenden Ort um, speichert aber keine Mandantenakten, steuert keine Zugriffe oder Freigaben und ersetzt weder Dokumentenmanagement noch Buchhaltungsplattform oder Kanzleiportal.",
      scanFaqAnswer: "Ja. Zush nutzt KI-Bilderkennung für bildbasierte PDFs und unterstützte Bildformate. Die Scanqualität bleibt wichtig: Prüfen Sie Lieferanten, Daten, Rechnungsnummern, Beträge und Währungen vor dem Anwenden des Stapels.",
      softwareFaqQuestion: "Verbindet sich Zush mit Buchhaltungssoftware?",
      softwareFaqAnswer: "Zush organisiert die Dateiebene rund um Buchhaltungssoftware: Downloads, Anhänge, Scans, Exporte und Belege. Es bucht keine Transaktionen und verändert keine Datensätze in einer Buchhaltungsplattform oder einem Hauptbuch.",
      guidesDescription: "Zush-Namenskonventionen und Eingangsabläufe für Rechnungen, Belege, Steuerformulare und Dateien in Ihrer Buchhaltungsumgebung.",
    },
    photographers: {
      seo: {
        title: "KI-Dateiumbenenner für Fotografen und Videografen",
        description: "RAW-Fotos, JPEGs und Videoclips nach Projekt, Datum, Motiv, Szene und Take umbenennen. Stapelabläufe für Foto und Video auf Mac und Windows.",
      },
      pageTitle: "KI-Dateiumbenenner für Fotografen und Videografen",
      hero: {
        eyebrow: "Für Fotografen und Videografen",
        titleLead: "KI-Dateibenennung für Fotografen:",
        titleAccent: "Shootings nach Projekt, Szene und Take organisieren",
        subtitle: "Zush ist ein Desktop-KI-Dateiumbenenner für Fotografen und Videografen. Es kombiniert verfügbare Metadaten mit Bildinhalten, um RAW-Fotos, JPEGs und unterstützte Clips zu benennen, während Katalog, Editor oder Schnittsoftware das Kreativsystem bleiben.",
      },
      comparison: {
        eyebrow: "Warum Zush",
        title: "Warum Fotografen und Videografen Zush für Dateinamen verwenden",
        description: "Zush kombiniert Bildkontext, Datum, Kamerametadaten, Sequenzen und Studioregeln zu portablen Namen vor dem Import, bei der Übergabe oder im Archiv.",
        ariaLabel: "Vorteile von Zush für professionelle Mediennamen",
        columns: ["Medienanforderung", "So löst Zush sie", "Vorteil im Ablauf"],
        items: [
          { need: "Beschreiben, was jede Datei zeigt", zushWorkflow: "Zush kann Motiv, Szene, Ort, Einstellung, Take und eigene visuelle Felder vorschlagen.", benefit: "Der Ordner wird durchsuchbar, ohne jedes Foto oder jeden Clip zu öffnen." },
          { need: "KI mit stabilen Metadaten kombinieren", zushWorkflow: "Erstellen Sie eine Zush-Vorlage aus Datum, EXIF, Kamera, Sequenz, Projekt und KI-Kontext.", benefit: "Namen bleiben vorhersehbar und beschreiben dennoch die einzelne Aufnahme." },
          { need: "Eine Konvention über alle Kameras", zushWorkflow: "Wenden Sie Feldreihenfolge, Trenner, Datumsformat und Studioregeln auf gemischte Stapel an.", benefit: "Dateien verschiedener Bodies, Karten und Operatoren folgen einem System." },
          { need: "Prüfung vor Import oder Übergabe", zushWorkflow: "Sehen Sie jeden alten und vorgeschlagenen Namen vor dem Anwenden nebeneinander.", benefit: "Mehrdeutige Motive, Szenen und Takes werden vor der Produktion korrigiert." },
          { need: "Angewendete Umbenennung zurücknehmen", zushWorkflow: "Zush speichert die Zuordnung von ursprünglichem zu neuem Namen im Verlauf.", benefit: "Der komplette Stapel lässt sich prüfen und wiederherstellen." },
        ],
        boundaryTitle: "Was eine Umbenennung ändert — und was Sie prüfen sollten",
        boundaryItems: [
          "Zush ändert Dateiname und Pfad, nicht Bildpixel, Videoinhalt oder eingebettete Metadaten.",
          "Unterstützte RAW-Dateien behalten ihre Erweiterung; jede Änderung ist vor dem Anwenden sichtbar.",
          "Der Verlauf speichert alten Namen, neuen Namen, Ordner und Zeitstempel für die Wiederherstellung.",
          "Kataloge, Timelines, RAW+JPEG-Paare und XMP-Sidecars können Verknüpfungen besitzen. Testen Sie einen kopierten Ordner und benennen Sie möglichst vor dem Import um.",
        ],
      },
      namingRecipes: {
        title: "Wiederverwendbare Dateinamensrezepte für professionelle Shootings",
        description: "Beginnen Sie mit stabilen Metadaten wie Datum, Kunde, Kamera und Sequenz. Ergänzen Sie KI-erkanntes Motiv, Szene, Ort oder Einstellung nur, wenn es die Suche verbessert.",
        items: [
          { title: "Kundenshooting mit Kamerasequenz", description: "Nutzen Sie Datum und Projekt als stabile Basis und behalten Sie Kamera oder Sequenz für eindeutige Namen über mehrere Bodies.", example: "{YYYYMMDD}_{Kunde}_{Shooting}_{Kamera}_{Sequenz}" },
          { title: "Videoproduktion mit mehreren Kameras", description: "Kombinieren Sie Projekt, Szene, Einstellung, Take und Kamera, bevor Clips in die Timeline gelangen.", example: "{Projekt}_{Szene}_{Einstellung}_{Take}_{Kamera}" },
          { title: "Durchsuchbares Porträt- oder Eventarchiv", description: "Stellen Sie Kunde und Datum voran und ergänzen Sie Motiv, Ort oder den unterscheidenden Moment.", example: "{Kunde}_{Aufnahmedatum}_{Motiv}_{Ort}" },
        ],
      },
      workflowDescription: "Behalten Sie Katalog, Editor, Schnittsoftware und Speicherstruktur. Ergänzen Sie einen wiederverwendbaren Zush-Benennungsschritt an den Ordnern, in denen Medien bereits ankommen.",
      boundaryFaqQuestion: "Ersetzt Zush einen Fotokatalog, Editor oder eine Schnittsoftware?",
      boundaryFaqAnswer: "Nein. Zush übernimmt die Dateinamensebene rund um Ihren bestehenden Ablauf. Es benennt Medien vor dem Import, bei der Übergabe oder im Archiv um; Auswahl, Farbkorrektur, Bearbeitung, Kataloge, Timelines und Digital-Asset-Management bleiben in Ihren Kreativwerkzeugen.",
      metadataFaqQuestion: "Verändert das Umbenennen Foto-Metadaten oder Videoinhalte?",
      metadataFaqAnswer: "Nein. Zush ändert Dateiname und Pfad, nicht Bildpixel, Videoinhalt oder eingebettete Metadaten; unterstützte RAW-Dateien behalten ihre Erweiterung. Testen Sie einen kopierten Ordner, wenn Kataloge, Timelines, RAW+JPEG-Paare oder XMP-Sidecars eigene Verknüpfungen pflegen.",
    },
  },
  es: {
    accountants: {
      seo: { title: "Renombrador de archivos con IA para contables", description: "Renombra por lotes facturas, recibos, extractos, formularios fiscales y escaneos por proveedor, fecha, número, importe y cliente. Vista previa en Mac y Windows." },
      pageTitle: "Renombrador de archivos con IA para contables",
      hero: { eyebrow: "Renombrador con IA para contables y asesorías", titleLead: "Renombra documentos contables por", titleAccent: "proveedor, fecha y número", subtitle: "Zush es la capa de nombres para documentos contables, no un gestor documental ni un libro mayor. Nombra facturas, recibos, extractos, formularios fiscales y escaneos según la convención de cada cliente, con vista previa y deshacer en Mac y Windows." },
      comparison: {
        eyebrow: "Por qué Zush", title: "Por qué los equipos contables usan Zush para nombrar archivos", description: "Zush aplica una convención reutilizable a facturas, recibos, extractos, formularios fiscales, escaneos y exportaciones sin sacarlos de sus carpetas.", ariaLabel: "Ventajas de Zush para nombrar archivos contables", columns: ["Necesidad contable", "Cómo responde Zush", "Ventaja operativa"],
        items: [
          { need: "Convenciones por cliente", zushWorkflow: "Guarda una plantilla Zush por cliente, entidad o tipo de documento.", benefit: "La regla se mantiene uniforme sin depender de la memoria del equipo." },
          { need: "Campos obtenidos del contenido", zushWorkflow: "Zush puede proponer proveedor, fecha, número, importe, moneda, periodo y campos personalizados.", benefit: "Las descargas y escaneos genéricos se vuelven archivos localizables." },
          { need: "Revisión antes del cambio", zushWorkflow: "Compara el nombre original y el propuesto en la vista previa del lote.", benefit: "Corrige fechas, importes, monedas y números ambiguos antes de aplicar." },
          { need: "Opciones de procesamiento privado", zushWorkflow: "Elige IA gestionada en la nube, tu propia clave de proveedor o IA local con Ollama.", benefit: "La asesoría adapta el tratamiento a su política de datos." },
          { need: "Carpetas y almacenamiento actuales", zushWorkflow: "Zush renombra los documentos donde ya están, sin moverlos a otro repositorio.", benefit: "Los nombres mejorados siguen siendo portátiles en el flujo actual." },
          { need: "Recuperación tras renombrar", zushWorkflow: "El historial conserva nombre anterior, nombre nuevo, carpeta y fecha.", benefit: "Puedes revisar y deshacer un lote si debes ajustar la plantilla." },
        ],
        note: "Zush es la capa de nombres, no un repositorio documental ni un libro mayor. Los nombres generados por IA son etiquetas de trabajo: comprueba los campos ambiguos en el documento original.",
      },
      editorialReview: { label: "Reseña editorial independiente", ratingAria: "Puntuación de 4,5 sobre 5", readLabel: "Leer la reseña completa en Softpedia" },
      dmsFaqAnswer: "No. Zush es la capa de nombres alrededor de tu entorno contable. Renombra facturas, recibos, extractos, escaneos, descargas y exportaciones donde están, pero no almacena expedientes, gestiona accesos o aprobaciones ni sustituye un gestor documental, una plataforma contable o un portal de asesoría.",
      scanFaqAnswer: "Sí. Zush usa visión con IA para leer PDF basados en imagen y formatos compatibles. La calidad del escaneo importa: revisa proveedor, fechas, números, importes y monedas antes de aplicar el lote.",
      softwareFaqQuestion: "¿Zush se conecta al software contable?",
      softwareFaqAnswer: "Zush organiza la capa de archivos alrededor de tu software contable: descargas, adjuntos, escaneos, exportaciones y justificantes. No contabiliza transacciones ni modifica asientos en una plataforma contable o libro mayor.",
      guidesDescription: "Convenciones Zush y flujos de entrada para facturas, recibos, formularios fiscales y archivos de tu entorno contable.",
    },
    photographers: {
      seo: { title: "Renombrador de archivos con IA para fotógrafos y vídeo", description: "Renombra fotos RAW, JPEG y clips por proyecto, fecha, sujeto, escena y toma. Flujo por lotes para fotografía y vídeo en Mac y Windows." },
      pageTitle: "Renombrador de archivos con IA para fotógrafos y videógrafos",
      hero: { eyebrow: "Para fotógrafos y videógrafos", titleLead: "Nombres de archivo con IA para fotografía:", titleAccent: "organiza sesiones por proyecto, escena y toma", subtitle: "Zush es un renombrador de escritorio con IA para fotógrafos y videógrafos. Combina los metadatos disponibles y el contenido visual para nombrar fotos RAW, JPEG y clips compatibles, mientras tu catálogo, editor o programa de montaje sigue siendo la herramienta creativa." },
      comparison: {
        eyebrow: "Por qué Zush", title: "Por qué fotógrafos y videógrafos usan Zush para nombrar archivos", description: "Zush combina contexto visual, fechas, metadatos de cámara, secuencias y reglas del estudio para crear nombres portátiles antes de importar, durante una entrega o en el archivo.", ariaLabel: "Ventajas de Zush para nombres de medios profesionales", columns: ["Necesidad", "Cómo responde Zush", "Ventaja operativa"],
        items: [
          { need: "Describir lo que muestra cada archivo", zushWorkflow: "Zush puede proponer sujeto, escena, ubicación, tipo de plano, toma y campos visuales propios.", benefit: "La carpeta se puede buscar sin abrir cada foto o clip." },
          { need: "Combinar IA y metadatos estables", zushWorkflow: "Crea una plantilla con fecha, EXIF, cámara, secuencia, proyecto y contexto de IA.", benefit: "Los nombres son predecibles y describen cada captura." },
          { need: "Una convención para todas las cámaras", zushWorkflow: "Aplica el mismo orden, separador, fecha y reglas a un lote mixto.", benefit: "Archivos de distintos cuerpos, tarjetas y operadores siguen un sistema." },
          { need: "Revisar antes de importar o entregar", zushWorkflow: "Compara cada nombre original y propuesto antes de aplicar el lote.", benefit: "Corrige sujetos, escenas y tomas ambiguos antes de producción." },
          { need: "Deshacer un cambio aplicado", zushWorkflow: "Zush conserva en el historial la relación entre el nombre anterior y el nuevo.", benefit: "Puedes revisar y restaurar el lote completo." },
        ],
        boundaryTitle: "Qué cambia al renombrar y qué debes comprobar", boundaryItems: ["Zush cambia el nombre y la ruta, no los píxeles, el vídeo ni los metadatos incrustados.", "Los RAW compatibles conservan su extensión y cada cambio se muestra antes de aplicarlo.", "El historial guarda nombre anterior, nombre nuevo, carpeta y fecha para poder deshacer.", "Catálogos, líneas de tiempo, pares RAW+JPEG y archivos XMP pueden mantener vínculos. Prueba una copia y renombra antes de importar cuando sea posible."],
      },
      namingRecipes: { title: "Recetas de nombres reutilizables para sesiones profesionales", description: "Empieza con metadatos estables como fecha, cliente, cámara y secuencia. Añade sujeto, escena, lugar o plano detectado por IA cuando mejore la búsqueda.", items: [
        { title: "Sesión de cliente con secuencia", description: "Usa fecha y proyecto como base y conserva cámara o secuencia para evitar colisiones.", example: "{AAAAMMDD}_{Cliente}_{Sesión}_{Cámara}_{Secuencia}" },
        { title: "Producción de vídeo multicámara", description: "Combina proyecto, escena, plano, toma y cámara antes de entrar en la línea de tiempo.", example: "{Proyecto}_{Escena}_{Plano}_{Toma}_{Cámara}" },
        { title: "Archivo de retratos o eventos", description: "Pon primero cliente y fecha; después, sujeto, lugar o momento distintivo.", example: "{Cliente}_{FechaCaptura}_{Sujeto}_{Lugar}" },
      ] },
      workflowDescription: "Conserva tu catálogo, editor, programa de montaje y almacenamiento. Añade un paso reutilizable de nombres Zush en las carpetas donde ya llegan los medios.",
      boundaryFaqQuestion: "¿Zush sustituye un catálogo, editor o programa de montaje?", boundaryFaqAnswer: "No. Zush gestiona la capa del nombre de archivo alrededor de tu flujo actual. Renombra medios antes de importar, durante una entrega o en el archivo; no sustituye selección, color, edición, catálogos, líneas de tiempo ni gestión de activos.",
      metadataFaqQuestion: "¿Renombrar modifica los metadatos de la foto o el contenido del vídeo?", metadataFaqAnswer: "No. Zush cambia el nombre y la ruta, no los píxeles, el vídeo ni los metadatos incrustados; los RAW compatibles conservan su extensión. Prueba una copia si catálogos, líneas de tiempo, pares RAW+JPEG o archivos XMP mantienen vínculos propios.",
    },
  },
  'pt-br': {
    accountants: {
      seo: { title: "Renomeador de arquivos com IA para contadores", description: "Renomeie em lote notas, recibos, extratos, formulários fiscais e digitalizações por fornecedor, data, número, valor e cliente. Prévia no Mac e Windows." },
      pageTitle: "Renomeador de arquivos com IA para contadores",
      hero: { eyebrow: "Renomeador com IA para contadores e escritórios", titleLead: "Renomeie documentos contábeis por", titleAccent: "fornecedor, data e número", subtitle: "Zush é a camada de nomes para documentos contábeis, não um gerenciador de documentos nem um livro-razão. Ele nomeia notas, recibos, extratos, formulários fiscais e digitalizações pela convenção de cada cliente, com prévia e desfazer no Mac e Windows." },
      comparison: { eyebrow: "Por que Zush", title: "Por que equipes contábeis usam Zush para nomear arquivos", description: "Zush aplica uma convenção reutilizável a documentos contábeis sem tirá-los das pastas atuais.", ariaLabel: "Vantagens do Zush para nomes de arquivos contábeis", columns: ["Necessidade", "Como o Zush resolve", "Benefício"], items: [
        { need: "Convenções por cliente", zushWorkflow: "Salve um modelo Zush por cliente, entidade ou tipo de documento.", benefit: "A regra permanece consistente para toda a equipe." },
        { need: "Campos extraídos do conteúdo", zushWorkflow: "Zush pode sugerir fornecedor, data, número, valor, moeda, período e campos próprios.", benefit: "Downloads e scans genéricos viram arquivos pesquisáveis." },
        { need: "Revisão antes da alteração", zushWorkflow: "Compare o nome original e o sugerido na prévia do lote.", benefit: "Corrija dados ambíguos antes de aplicar." },
        { need: "Processamento privado", zushWorkflow: "Escolha IA gerenciada na nuvem, sua chave de provedor ou IA local com Ollama.", benefit: "O escritório adequa o modo à política de dados." },
        { need: "Pastas existentes", zushWorkflow: "Zush renomeia no local, sem mover arquivos para outro repositório.", benefit: "Os nomes continuam portáteis no fluxo atual." },
        { need: "Recuperação", zushWorkflow: "O histórico guarda nome antigo, novo, pasta e horário.", benefit: "O lote pode ser revisado e desfeito." },
      ], note: "Zush é a camada de nomes, não um repositório nem um livro-razão. Nomes gerados por IA são rótulos de trabalho; confirme campos ambíguos no documento original." },
      editorialReview: { label: "Avaliação editorial independente", ratingAria: "Nota 4,5 de 5", readLabel: "Ler a avaliação completa no Softpedia" },
      dmsFaqAnswer: "Não. Zush é a camada de nomes ao redor do seu ambiente contábil. Ele renomeia documentos no local, mas não armazena dossiês, controla acessos ou aprovações nem substitui um gerenciador documental, plataforma contábil ou portal do escritório.",
      scanFaqAnswer: "Sim. Zush usa visão de IA para ler PDFs de imagem e formatos compatíveis. A qualidade do scan importa: revise fornecedor, datas, números, valores e moedas antes de aplicar o lote.",
      softwareFaqQuestion: "O Zush se conecta a softwares contábeis?", softwareFaqAnswer: "Zush organiza a camada de arquivos ao redor do software contábil: downloads, anexos, scans, exportações e comprovantes. Ele não lança transações nem altera registros contábeis.",
      guidesDescription: "Convenções Zush e fluxos de entrada para notas, recibos, formulários fiscais e arquivos do seu ambiente contábil.",
    },
    photographers: {
      seo: { title: "Renomeador com IA para fotógrafos e videomakers", description: "Renomeie fotos RAW, JPEG e vídeos por projeto, data, assunto, cena e tomada. Fluxo em lote no Mac e Windows." }, pageTitle: "Renomeador com IA para fotógrafos e videomakers",
      hero: { eyebrow: "Para fotógrafos e videomakers", titleLead: "Nomes de arquivo com IA para fotografia:", titleAccent: "organize trabalhos por projeto, cena e tomada", subtitle: "Zush é um renomeador de desktop com IA para fotógrafos e videomakers. Ele combina metadados disponíveis e conteúdo visual para nomear fotos RAW, JPEG e vídeos compatíveis, enquanto catálogo, editor e software de edição continuam como ferramentas criativas." },
      comparison: { eyebrow: "Por que Zush", title: "Por que profissionais de foto e vídeo usam Zush para nomear arquivos", description: "Zush combina contexto visual, datas, metadados da câmera, sequências e regras do estúdio para criar nomes portáteis.", ariaLabel: "Vantagens do Zush para nomes de mídia profissional", columns: ["Necessidade", "Como o Zush resolve", "Benefício"], items: [
        { need: "Descrever cada arquivo", zushWorkflow: "Zush pode sugerir assunto, cena, local, enquadramento, tomada e campos visuais próprios.", benefit: "A pasta fica pesquisável sem abrir cada arquivo." },
        { need: "Combinar IA e metadados", zushWorkflow: "Crie um modelo com data, EXIF, câmera, sequência, projeto e contexto de IA.", benefit: "Os nomes ficam previsíveis e descritivos." },
        { need: "Uma convenção entre câmeras", zushWorkflow: "Aplique a mesma ordem, separador, data e regras a um lote misto.", benefit: "Arquivos de câmeras, cartões e operadores diferentes seguem um sistema." },
        { need: "Revisar antes de importar", zushWorkflow: "Compare cada nome original e sugerido antes de aplicar.", benefit: "Corrija assuntos, cenas e tomadas ambíguos." },
        { need: "Desfazer", zushWorkflow: "Zush mantém no histórico o vínculo entre nome original e novo.", benefit: "O lote inteiro pode ser restaurado." },
      ], boundaryTitle: "O que muda ao renomear — e o que conferir", boundaryItems: ["Zush muda nome e caminho, não pixels, vídeo nem metadados incorporados.", "Arquivos RAW compatíveis mantêm a extensão e toda mudança aparece na prévia.", "O histórico guarda nome antigo, novo, pasta e horário para desfazer.", "Catálogos, timelines, pares RAW+JPEG e arquivos XMP podem manter vínculos. Teste uma cópia e renomeie antes de importar quando possível."] },
      namingRecipes: { title: "Receitas reutilizáveis para trabalhos profissionais", description: "Comece com data, cliente, câmera e sequência. Acrescente assunto, cena, local ou enquadramento detectado por IA quando ajudar na busca.", items: [
        { title: "Ensaio de cliente com sequência", description: "Use data e projeto como base e mantenha câmera ou sequência para evitar colisões.", example: "{AAAAMMDD}_{Cliente}_{Ensaio}_{Câmera}_{Sequência}" },
        { title: "Produção multicâmera", description: "Combine projeto, cena, enquadramento, tomada e câmera antes da timeline.", example: "{Projeto}_{Cena}_{Enquadramento}_{Tomada}_{Câmera}" },
        { title: "Arquivo pesquisável", description: "Coloque cliente e data primeiro; depois assunto, local ou momento.", example: "{Cliente}_{DataCaptura}_{Assunto}_{Local}" },
      ] },
      workflowDescription: "Mantenha catálogo, editor, software de edição e armazenamento. Acrescente uma etapa reutilizável de nomes Zush nas pastas onde a mídia já chega.",
      boundaryFaqQuestion: "O Zush substitui catálogo, editor ou software de edição?", boundaryFaqAnswer: "Não. Zush cuida da camada do nome de arquivo no seu fluxo. Ele renomeia antes da importação, durante a entrega ou no arquivo; não substitui seleção, cor, edição, catálogos, timelines ou gestão de ativos.",
      metadataFaqQuestion: "Renomear altera metadados da foto ou o conteúdo do vídeo?", metadataFaqAnswer: "Não. Zush muda nome e caminho, não pixels, vídeo nem metadados incorporados; RAW compatíveis mantêm a extensão. Teste uma cópia quando catálogos, timelines, pares RAW+JPEG ou XMP mantiverem vínculos próprios.",
    },
  },
  it: {
    accountants: {
      seo: { title: "Rinomina file con IA per commercialisti", description: "Rinomina in batch fatture, ricevute, estratti, moduli fiscali e scansioni per fornitore, data, numero, importo e cliente. Anteprima su Mac e Windows." }, pageTitle: "Rinomina file con IA per commercialisti",
      hero: { eyebrow: "Rinomina file con IA per commercialisti e studi", titleLead: "Rinomina i documenti contabili per", titleAccent: "fornitore, data e numero", subtitle: "Zush è il livello di denominazione dei documenti contabili, non un gestionale documentale né un libro mastro. Nomina fatture, ricevute, estratti, moduli fiscali e scansioni secondo la convenzione di ogni cliente, con anteprima e annullamento su Mac e Windows." },
      comparison: { eyebrow: "Perché Zush", title: "Perché i team contabili usano Zush per nominare i file", description: "Zush applica una convenzione riutilizzabile ai documenti contabili lasciandoli nelle cartelle esistenti.", ariaLabel: "Vantaggi di Zush per i nomi dei file contabili", columns: ["Esigenza", "Risposta di Zush", "Vantaggio operativo"], items: [
        { need: "Convenzioni per cliente", zushWorkflow: "Salva un modello Zush per cliente, entità o tipo di documento.", benefit: "La regola resta coerente per tutto il team." }, { need: "Campi ricavati dal contenuto", zushWorkflow: "Zush può proporre fornitore, data, numero, importo, valuta, periodo e campi personalizzati.", benefit: "Download e scansioni generiche diventano ricercabili." }, { need: "Controllo prima della modifica", zushWorkflow: "Confronta nome originale e proposto nell’anteprima del batch.", benefit: "Correggi i dati ambigui prima di applicare." }, { need: "Elaborazione privata", zushWorkflow: "Scegli IA cloud gestita, una tua chiave provider o IA locale con Ollama.", benefit: "Lo studio adatta il trattamento alla propria policy." }, { need: "Cartelle esistenti", zushWorkflow: "Zush rinomina sul posto senza spostare i documenti in un altro archivio.", benefit: "I nomi restano portabili nel flusso attuale." }, { need: "Ripristino", zushWorkflow: "La cronologia conserva nome precedente, nuovo nome, cartella e data.", benefit: "Il batch può essere verificato e annullato." },
      ], note: "Zush è il livello di denominazione, non un archivio documentale né un libro mastro. I nomi generati dall’IA sono etichette operative: verifica i campi ambigui sul documento originale." },
      editorialReview: { label: "Recensione editoriale indipendente", ratingAria: "Valutazione 4,5 su 5", readLabel: "Leggi la recensione completa su Softpedia" },
      dmsFaqAnswer: "No. Zush è il livello di denominazione intorno al tuo ambiente contabile. Rinomina documenti sul posto, ma non archivia fascicoli, gestisce accessi o approvazioni e non sostituisce un sistema documentale, una piattaforma contabile o un portale di studio.", scanFaqAnswer: "Sì. Zush usa la visione IA per leggere PDF immagine e formati supportati. La qualità della scansione conta: controlla fornitore, date, numeri, importi e valute prima di applicare il batch.", softwareFaqQuestion: "Zush si collega ai software contabili?", softwareFaqAnswer: "Zush organizza il livello dei file intorno al software contabile: download, allegati, scansioni, esportazioni e giustificativi. Non registra transazioni né modifica scritture contabili.", guidesDescription: "Convenzioni Zush e flussi in ingresso per fatture, ricevute, moduli fiscali e file del tuo ambiente contabile.",
    },
    photographers: {
      seo: { title: "Rinomina file con IA per fotografi e videomaker", description: "Rinomina foto RAW, JPEG e clip per progetto, data, soggetto, scena e ciak. Flussi batch su Mac e Windows." }, pageTitle: "Rinomina file con IA per fotografi e videomaker", hero: { eyebrow: "Per fotografi e videomaker", titleLead: "Nomi file con IA per la fotografia:", titleAccent: "organizza gli shooting per progetto, scena e ciak", subtitle: "Zush è un rinominatore desktop con IA per fotografi e videomaker. Combina metadati disponibili e contenuto visivo per nominare RAW, JPEG e clip supportate, mentre catalogo, editor e software di montaggio restano gli strumenti creativi." },
      comparison: { eyebrow: "Perché Zush", title: "Perché fotografi e videomaker usano Zush per nominare i file", description: "Zush combina contesto visivo, date, metadati fotocamera, sequenze e regole dello studio per creare nomi portabili.", ariaLabel: "Vantaggi di Zush per i nomi dei media professionali", columns: ["Esigenza", "Risposta di Zush", "Vantaggio"], items: [
        { need: "Descrivere ogni file", zushWorkflow: "Zush può proporre soggetto, scena, luogo, inquadratura, ciak e campi visivi personalizzati.", benefit: "La cartella diventa ricercabile senza aprire ogni file." }, { need: "Unire IA e metadati stabili", zushWorkflow: "Crea un modello con data, EXIF, fotocamera, sequenza, progetto e contesto IA.", benefit: "I nomi restano prevedibili e descrittivi." }, { need: "Una convenzione tra fotocamere", zushWorkflow: "Applica lo stesso ordine, separatore, data e regole a un batch misto.", benefit: "File da corpi, schede e operatori diversi seguono un sistema." }, { need: "Controllo prima dell’importazione", zushWorkflow: "Confronta ogni nome originale e proposto prima di applicare.", benefit: "Correggi soggetti, scene e ciak ambigui." }, { need: "Annullare", zushWorkflow: "Zush conserva in cronologia il legame tra nome originale e nuovo.", benefit: "L’intero batch può essere ripristinato." },
      ], boundaryTitle: "Cosa cambia rinominando — e cosa verificare", boundaryItems: ["Zush cambia nome e percorso, non pixel, video o metadati incorporati.", "I RAW supportati mantengono l’estensione e ogni modifica appare in anteprima.", "La cronologia conserva vecchio nome, nuovo nome, cartella e data per l’annullamento.", "Cataloghi, timeline, coppie RAW+JPEG e file XMP possono mantenere collegamenti. Prova una copia e rinomina prima dell’importazione quando possibile."] },
      namingRecipes: { title: "Schemi di nome riutilizzabili per shooting professionali", description: "Inizia da data, cliente, fotocamera e sequenza. Aggiungi soggetto, scena, luogo o inquadratura rilevati dall’IA quando aiutano la ricerca.", items: [{ title: "Shooting cliente con sequenza", description: "Usa data e progetto come base; mantieni fotocamera o sequenza per evitare collisioni.", example: "{AAAAMMGG}_{Cliente}_{Shooting}_{Fotocamera}_{Sequenza}" }, { title: "Produzione multicamera", description: "Combina progetto, scena, inquadratura, ciak e fotocamera prima della timeline.", example: "{Progetto}_{Scena}_{Inquadratura}_{Ciak}_{Fotocamera}" }, { title: "Archivio ricercabile", description: "Metti prima cliente e data, poi soggetto, luogo o momento.", example: "{Cliente}_{DataScatto}_{Soggetto}_{Luogo}" }] },
      workflowDescription: "Mantieni catalogo, editor, software di montaggio e archiviazione. Aggiungi un passaggio riutilizzabile di denominazione Zush nelle cartelle in cui arrivano i media.", boundaryFaqQuestion: "Zush sostituisce un catalogo, editor o software di montaggio?", boundaryFaqAnswer: "No. Zush gestisce il livello del nome file nel flusso esistente. Rinomina prima dell’importazione, durante la consegna o in archivio; non sostituisce selezione, colore, montaggio, cataloghi, timeline o gestione degli asset.", metadataFaqQuestion: "Rinominare modifica i metadati delle foto o il contenuto video?", metadataFaqAnswer: "No. Zush cambia nome e percorso, non pixel, video o metadati incorporati; i RAW supportati mantengono l’estensione. Prova una copia se cataloghi, timeline, coppie RAW+JPEG o XMP mantengono collegamenti propri.",
    },
  },
  nl: {
    accountants: {
      seo: { title: "AI-bestandshernoemer voor accountants", description: "Hernoem facturen, bonnen, afschriften, belastingformulieren en scans in bulk op leverancier, datum, nummer, bedrag en klant. Preview op Mac en Windows." }, pageTitle: "AI-bestandshernoemer voor accountants", hero: { eyebrow: "AI-bestandshernoemer voor accountants en kantoren", titleLead: "Geef boekhoudstukken namen op", titleAccent: "leverancier, datum en nummer", subtitle: "Zush is de naamgevingslaag voor boekhoudstukken, geen documentbeheer of grootboek. Het benoemt facturen, bonnen, afschriften, belastingformulieren en scans volgens de conventie van elke klant, met bulkpreview en ongedaan maken op Mac en Windows." },
      comparison: { eyebrow: "Waarom Zush", title: "Waarom boekhoudteams Zush gebruiken voor bestandsnamen", description: "Zush past een herbruikbare conventie toe terwijl elk document in de bestaande map blijft.", ariaLabel: "Voordelen van Zush voor boekhoudkundige bestandsnamen", columns: ["Behoefte", "Zush-aanpak", "Operationeel voordeel"], items: [
        { need: "Conventies per klant", zushWorkflow: "Bewaar een Zush-sjabloon per klant, entiteit of documenttype.", benefit: "De regel blijft consistent voor het hele team." }, { need: "Velden uit de inhoud", zushWorkflow: "Zush kan leverancier, datum, nummer, bedrag, valuta, periode en eigen velden voorstellen.", benefit: "Generieke downloads en scans worden vindbaar." }, { need: "Controle vóór wijziging", zushWorkflow: "Vergelijk originele en voorgestelde namen in de bulkpreview.", benefit: "Corrigeer dubbelzinnige gegevens vóór toepassen." }, { need: "Privéverwerking", zushWorkflow: "Kies beheerde cloud-AI, een eigen providersleutel of lokale AI met Ollama.", benefit: "Het kantoor stemt verwerking af op het databeleid." }, { need: "Bestaande mappen", zushWorkflow: "Zush hernoemt ter plaatse en verplaatst niets naar een nieuwe opslag.", benefit: "De namen blijven bruikbaar in de huidige workflow." }, { need: "Herstel", zushWorkflow: "De geschiedenis bewaart oude naam, nieuwe naam, map en tijdstip.", benefit: "Een bulkactie kan worden nagekeken en teruggedraaid." },
      ], note: "Zush is de naamgevingslaag, geen documentarchief of grootboek. AI-namen zijn werketiketten; controleer dubbelzinnige velden in het brondocument." }, editorialReview: { label: "Onafhankelijke redactionele beoordeling", ratingAria: "Score 4,5 van 5", readLabel: "Lees de volledige beoordeling op Softpedia" }, dmsFaqAnswer: "Nee. Zush is de naamgevingslaag rond uw boekhoudomgeving. Het hernoemt documenten ter plaatse, maar bewaart geen klantdossiers, beheert geen toegang of goedkeuringen en vervangt geen documentbeheer, boekhoudplatform of kantoorportaal.", scanFaqAnswer: "Ja. Zush gebruikt AI-visie voor beeld-pdf’s en ondersteunde afbeeldingen. Scankwaliteit blijft belangrijk: controleer leverancier, data, nummers, bedragen en valuta vóór toepassen.", softwareFaqQuestion: "Koppelt Zush met boekhoudsoftware?", softwareFaqAnswer: "Zush organiseert de bestandslaag rond boekhoudsoftware: downloads, bijlagen, scans, exports en bewijsstukken. Het boekt geen transacties en wijzigt geen grootboekrecords.", guidesDescription: "Zush-conventies en intakeflows voor facturen, bonnen, belastingformulieren en bestanden in uw boekhoudomgeving.",
    },
    photographers: {
      seo: { title: "AI-bestandshernoemer voor fotografen en videomakers", description: "Hernoem RAW-foto’s, JPEG’s en clips op project, datum, onderwerp, scène en take. Bulkwijzigingen op Mac en Windows." }, pageTitle: "AI-bestandshernoemer voor fotografen en videomakers", hero: { eyebrow: "Voor fotografen en videomakers", titleLead: "AI-bestandsnamen voor fotografie:", titleAccent: "orden shoots op project, scène en take", subtitle: "Zush is een desktop AI-bestandshernoemer voor fotografen en videomakers. Het combineert beschikbare metadata en beeldinhoud om RAW, JPEG en ondersteunde clips te benoemen; catalogus, editor en montagesoftware blijven uw creatieve gereedschap." },
      comparison: { eyebrow: "Waarom Zush", title: "Waarom foto- en videoprofessionals Zush gebruiken voor bestandsnamen", description: "Zush combineert beeldcontext, datum, camerametadata, reeksen en studioregels tot overdraagbare namen.", ariaLabel: "Voordelen van Zush voor professionele medianamen", columns: ["Behoefte", "Zush-aanpak", "Voordeel"], items: [{ need: "Beschrijven wat elk bestand toont", zushWorkflow: "Zush kan onderwerp, scène, locatie, shot, take en eigen visuele velden voorstellen.", benefit: "De map wordt doorzoekbaar zonder elk bestand te openen." }, { need: "AI en stabiele metadata combineren", zushWorkflow: "Maak een sjabloon met datum, EXIF, camera, reeks, project en AI-context.", benefit: "Namen blijven voorspelbaar en beschrijvend." }, { need: "Eén conventie voor camera’s", zushWorkflow: "Pas dezelfde volgorde, scheiding, datum en regels toe op gemengde bulk.", benefit: "Bestanden van verschillende camera’s, kaarten en makers volgen één systeem." }, { need: "Controleren vóór import", zushWorkflow: "Vergelijk elke originele en voorgestelde naam vóór toepassen.", benefit: "Corrigeer dubbelzinnige onderwerpen, scènes en takes." }, { need: "Ongedaan maken", zushWorkflow: "Zush bewaart de koppeling tussen oude en nieuwe naam.", benefit: "De volledige bulkactie kan worden hersteld." }], boundaryTitle: "Wat hernoemen wijzigt — en wat u controleert", boundaryItems: ["Zush wijzigt naam en pad, niet pixels, video of ingesloten metadata.", "Ondersteunde RAW-bestanden houden hun extensie; elke wijziging staat in de preview.", "De geschiedenis bewaart oude naam, nieuwe naam, map en tijdstip voor herstel.", "Catalogi, tijdlijnen, RAW+JPEG-paren en XMP-bestanden kunnen koppelingen hebben. Test een kopie en hernoem zo mogelijk vóór import."] },
      namingRecipes: { title: "Herbruikbare naamrecepten voor professionele shoots", description: "Begin met datum, klant, camera en reeks. Voeg AI-onderwerp, scène, locatie of shot toe als dat zoeken verbetert.", items: [{ title: "Klantshoot met camerareeks", description: "Gebruik datum en project als basis; behoud camera of reeks om botsingen te voorkomen.", example: "{JJJJMMDD}_{Klant}_{Shoot}_{Camera}_{Reeks}" }, { title: "Multicamera-videoproductie", description: "Combineer project, scène, shot, take en camera vóór de tijdlijn.", example: "{Project}_{Scène}_{Shot}_{Take}_{Camera}" }, { title: "Doorzoekbaar portret- of evenementenarchief", description: "Zet klant en datum eerst, daarna onderwerp, locatie of moment.", example: "{Klant}_{Opnamedatum}_{Onderwerp}_{Locatie}" }] }, workflowDescription: "Behoud catalogus, editor, montagesoftware en opslag. Voeg een herbruikbare Zush-naamgevingsstap toe aan de mappen waar media al binnenkomen.", boundaryFaqQuestion: "Vervangt Zush een fotocatalogus, editor of montagesoftware?", boundaryFaqAnswer: "Nee. Zush beheert de bestandsnaamlaag rond uw workflow. Het hernoemt vóór import, bij overdracht of in het archief; het vervangt geen selectie, kleur, montage, catalogi, tijdlijnen of assetbeheer.", metadataFaqQuestion: "Wijzigt hernoemen foto-metadata of video-inhoud?", metadataFaqAnswer: "Nee. Zush wijzigt naam en pad, niet pixels, video of ingesloten metadata; ondersteunde RAW-bestanden houden hun extensie. Test een kopie wanneer catalogi, tijdlijnen, RAW+JPEG-paren of XMP eigen koppelingen bewaren.",
    },
  },
  tr: {
    accountants: {
      seo: { title: "Muhasebeciler için yapay zekâ dosya yeniden adlandırıcı", description: "Fatura, makbuz, ekstre, vergi formu ve taramaları tedarikçi, tarih, numara, tutar ve müşteriye göre toplu yeniden adlandırın. Mac ve Windows." }, pageTitle: "Muhasebeciler için yapay zekâ dosya yeniden adlandırıcı", hero: { eyebrow: "Muhasebeciler ve mali müşavirler için", titleLead: "Muhasebe belgelerini şu alanlarla adlandırın:", titleAccent: "tedarikçi, tarih ve numara", subtitle: "Zush, muhasebe belgeleri için bir adlandırma katmanıdır; belge yönetimi ya da defter sistemi değildir. Fatura, makbuz, ekstre, vergi formu ve taramaları müşteri kuralına göre adlandırır; toplu önizleme ve geri alma Mac ile Windows’ta çalışır." },
      comparison: { eyebrow: "Neden Zush", title: "Muhasebe ekipleri dosya adları için neden Zush kullanıyor", description: "Zush belgeleri mevcut klasörlerinde tutarak yeniden kullanılabilir bir adlandırma kuralı uygular.", ariaLabel: "Muhasebe dosyası adlandırmada Zush avantajları", columns: ["İhtiyaç", "Zush çözümü", "Operasyonel fayda"], items: [{ need: "Müşteriye özel kurallar", zushWorkflow: "Müşteri, kuruluş veya belge türü için bir Zush şablonu kaydedin.", benefit: "Kural ekip genelinde tutarlı kalır." }, { need: "İçerikten muhasebe alanları", zushWorkflow: "Zush tedarikçi, tarih, numara, tutar, para birimi, dönem ve özel alanlar önerebilir.", benefit: "Genel indirme ve taramalar aranabilir olur." }, { need: "Değişiklik öncesi kontrol", zushWorkflow: "Özgün ve önerilen adları toplu önizlemede karşılaştırın.", benefit: "Belirsiz verileri uygulamadan önce düzeltin." }, { need: "Özel işleme seçenekleri", zushWorkflow: "Yönetilen bulut, kendi sağlayıcı anahtarınız veya Ollama ile yerel yapay zekâ seçin.", benefit: "İşleme modu veri politikanıza uyar." }, { need: "Mevcut klasörler", zushWorkflow: "Zush belgeleri başka depoya taşımadan yerinde adlandırır.", benefit: "Adlar mevcut akışta taşınabilir kalır." }, { need: "Geri yükleme", zushWorkflow: "Geçmiş eski ad, yeni ad, klasör ve zamanı saklar.", benefit: "Toplu işlem incelenip geri alınabilir." }], note: "Zush adlandırma katmanıdır; belge deposu veya muhasebe defteri değildir. Yapay zekâ adları çalışma etiketleridir; belirsiz alanları kaynak belgede doğrulayın." }, editorialReview: { label: "Bağımsız editoryal inceleme", ratingAria: "5 üzerinden 4,5 puan", readLabel: "Softpedia incelemesinin tamamını okuyun" }, dmsFaqAnswer: "Hayır. Zush muhasebe ortamınızın çevresindeki adlandırma katmanıdır. Belgeleri yerinde yeniden adlandırır; müşteri dosyalarını saklamaz, erişim veya onay yönetmez ve belge yönetimi, muhasebe platformu ya da müşteri portalının yerini almaz.", scanFaqAnswer: "Evet. Zush görüntü tabanlı PDF ve desteklenen resimleri yapay zekâ görüsüyle okur. Tarama kalitesi önemlidir; uygulamadan önce tedarikçi, tarih, numara, tutar ve para birimini kontrol edin.", softwareFaqQuestion: "Zush muhasebe yazılımına bağlanır mı?", softwareFaqAnswer: "Zush muhasebe yazılımınızın çevresindeki dosyaları düzenler: indirmeler, ekler, taramalar, dışa aktarımlar ve belgeler. İşlem kaydetmez veya muhasebe kayıtlarını değiştirmez.", guidesDescription: "Fatura, makbuz, vergi formu ve muhasebe dosyaları için Zush adlandırma kuralları ve giriş akışları.",
    },
    photographers: {
      seo: { title: "Fotoğrafçı ve videograflar için yapay zekâ yeniden adlandırıcı", description: "RAW, JPEG ve videoları proje, tarih, konu, sahne ve çekime göre toplu adlandırın. Mac ve Windows." }, pageTitle: "Fotoğrafçı ve videograflar için yapay zekâ dosya yeniden adlandırıcı", hero: { eyebrow: "Fotoğrafçı ve videograflar için", titleLead: "Fotoğrafçılar için yapay zekâ dosya adları:", titleAccent: "çekimleri proje, sahne ve çekime göre düzenleyin", subtitle: "Zush, fotoğrafçı ve videograflar için masaüstü yapay zekâ dosya yeniden adlandırıcısıdır. RAW, JPEG ve desteklenen klipleri adlandırmak için meta veriyle görsel içeriği birleştirir; katalog, düzenleyici ve kurgu yazılımınız yaratıcı araç olarak kalır." },
      comparison: { eyebrow: "Neden Zush", title: "Fotoğraf ve video ekipleri dosya adları için neden Zush kullanıyor", description: "Zush görsel bağlam, tarih, kamera meta verisi, sıra ve stüdyo kurallarını taşınabilir adlarda birleştirir.", ariaLabel: "Profesyonel medya adlandırmada Zush avantajları", columns: ["İhtiyaç", "Zush çözümü", "Fayda"], items: [{ need: "Her dosyayı açıklamak", zushWorkflow: "Zush konu, sahne, konum, çekim türü, take ve özel görsel alanlar önerebilir.", benefit: "Her dosyayı açmadan klasörde arama yapılır." }, { need: "Yapay zekâ ve meta veriyi birleştirmek", zushWorkflow: "Tarih, EXIF, kamera, sıra, proje ve yapay zekâ bağlamıyla şablon oluşturun.", benefit: "Adlar öngörülebilir ve açıklayıcı olur." }, { need: "Tüm kameralarda tek kural", zushWorkflow: "Aynı sıra, ayırıcı, tarih ve stüdyo kuralını karma gruba uygulayın.", benefit: "Farklı kamera ve kartlar tek sistemi izler." }, { need: "İçe aktarmadan önce kontrol", zushWorkflow: "Uygulamadan önce eski ve önerilen her adı karşılaştırın.", benefit: "Belirsiz konu, sahne ve çekimleri düzeltin." }, { need: "Geri alma", zushWorkflow: "Zush eski ve yeni ad eşleşmesini geçmişte saklar.", benefit: "Tüm toplu işlem geri yüklenebilir." }], boundaryTitle: "Yeniden adlandırma neyi değiştirir — neyi kontrol etmelisiniz", boundaryItems: ["Zush ad ve yolu değiştirir; piksel, video içeriği veya gömülü meta veriyi değiştirmez.", "Desteklenen RAW dosyaları uzantısını korur ve her değişiklik önizlemede görünür.", "Geçmiş geri alma için eski ad, yeni ad, klasör ve zamanı saklar.", "Kataloglar, zaman çizelgeleri, RAW+JPEG çiftleri ve XMP dosyaları bağlantı tutabilir. Bir kopyayı test edin ve mümkünse içe aktarmadan önce adlandırın."] }, namingRecipes: { title: "Profesyonel çekimler için yeniden kullanılabilir ad şablonları", description: "Tarih, müşteri, kamera ve sıra gibi sabit meta verilerle başlayın. Aramayı iyileştiriyorsa yapay zekâ konusu, sahnesi, konumu veya çekim türünü ekleyin.", items: [{ title: "Kamera sıralı müşteri çekimi", description: "Tarih ve projeyi temel alın; çakışmayı önlemek için kamera veya sırayı koruyun.", example: "{YYYYAAGG}_{Müşteri}_{Çekim}_{Kamera}_{Sıra}" }, { title: "Çok kameralı video", description: "Zaman çizelgesinden önce proje, sahne, çekim, take ve kamerayı birleştirin.", example: "{Proje}_{Sahne}_{Çekim}_{Take}_{Kamera}" }, { title: "Aranabilir arşiv", description: "Önce müşteri ve tarih, sonra konu, konum veya anı kullanın.", example: "{Müşteri}_{ÇekimTarihi}_{Konu}_{Konum}" }] }, workflowDescription: "Katalog, düzenleyici, kurgu yazılımı ve depolamanızı koruyun. Medyanın geldiği klasörlere yeniden kullanılabilir bir Zush adlandırma adımı ekleyin.", boundaryFaqQuestion: "Zush katalog, düzenleyici veya kurgu yazılımının yerini alır mı?", boundaryFaqAnswer: "Hayır. Zush mevcut akışın çevresindeki dosya adı katmanını yönetir. İçe aktarmadan önce, teslim sırasında veya arşivde adlandırır; seçim, renk, kurgu, katalog, zaman çizelgesi veya varlık yönetiminin yerini almaz.", metadataFaqQuestion: "Yeniden adlandırma fotoğraf meta verisini veya videoyu değiştirir mi?", metadataFaqAnswer: "Hayır. Zush ad ve yolu değiştirir; pikseli, videoyu veya gömülü meta veriyi değiştirmez ve desteklenen RAW uzantıları korunur. Katalog, zaman çizelgesi, RAW+JPEG veya XMP bağlantıları için bir kopyayı test edin.",
    },
  },
  ja: {
    accountants: {
      seo: { title: "会計担当者向けAIファイル名変更ツール", description: "請求書、領収書、明細書、税務書類、スキャンを取引先、日付、番号、金額、顧客別に一括改名。MacとWindowsで事前確認できます。" }, pageTitle: "会計担当者向けAIファイル名変更ツール", hero: { eyebrow: "会計担当者・会計事務所向けAIファイル名変更", titleLead: "会計書類を整理できる名前へ：", titleAccent: "取引先・日付・番号", subtitle: "Zushは会計書類のファイル名を整えるレイヤーであり、文書管理や総勘定元帳ではありません。請求書、領収書、明細書、税務書類、スキャンを顧客ごとの規則で命名し、MacとWindowsで一括プレビューと取り消しができます。" },
      comparison: { eyebrow: "Zushを選ぶ理由", title: "会計チームがファイル名にZushを使う理由", description: "Zushは、書類を既存フォルダーに置いたまま、再利用できる命名規則を適用します。", ariaLabel: "会計ファイル命名におけるZushの利点", columns: ["会計業務の要件", "Zushの対応", "業務上の利点"], items: [{ need: "顧客別の規則", zushWorkflow: "顧客、法人、書類種別ごとにZushテンプレートを保存します。", benefit: "担当者の記憶に頼らず規則を統一できます。" }, { need: "内容に基づく会計項目", zushWorkflow: "取引先、日付、番号、金額、通貨、期間、独自項目を提案できます。", benefit: "曖昧なダウンロードやスキャンを検索可能にします。" }, { need: "変更前の確認", zushWorkflow: "一括プレビューで元の名前と提案名を比較します。", benefit: "曖昧な値を適用前に修正できます。" }, { need: "プライバシーに応じた処理", zushWorkflow: "管理クラウドAI、独自APIキー、OllamaによるローカルAIから選べます。", benefit: "事務所のデータ方針に合わせられます。" }, { need: "既存フォルダーの維持", zushWorkflow: "別の保管庫へ移さず、その場で名前を変更します。", benefit: "現在の業務フローを変えません。" }, { need: "変更の復元", zushWorkflow: "履歴に旧名、新名、フォルダー、日時を保存します。", benefit: "一括変更を確認して元に戻せます。" }], note: "Zushは命名レイヤーであり、文書保管庫や総勘定元帳ではありません。AI生成名は作業用ラベルです。曖昧な項目は原本で確認してください。" }, editorialReview: { label: "独立した編集レビュー", ratingAria: "5点中4.5点", readLabel: "Softpediaでレビュー全文を読む" }, dmsFaqAnswer: "いいえ。Zushは会計環境を取り巻くファイル命名レイヤーです。書類をその場で改名しますが、顧客ファイルの保管、アクセスや承認の管理は行わず、文書管理、会計基盤、顧客ポータルの代わりにはなりません。", scanFaqAnswer: "はい。ZushはAI画像認識で画像PDFと対応画像を読み取ります。スキャン品質は重要です。一括適用前に取引先、日付、番号、金額、通貨を確認してください。", softwareFaqQuestion: "Zushは会計ソフトと連携しますか？", softwareFaqAnswer: "Zushは会計ソフト周辺のダウンロード、添付、スキャン、書き出し、証憑のファイル名を整理します。取引を記帳したり会計記録を変更したりはしません。", guidesDescription: "請求書、領収書、税務書類、会計ファイル向けのZush命名規則と受け入れフロー。",
    },
    photographers: {
      seo: { title: "写真家・映像制作者向けAIファイル名変更", description: "RAW、JPEG、動画をプロジェクト、日付、被写体、シーン、テイク別に一括改名。MacとWindows対応。" }, pageTitle: "写真家・映像制作者向けAIファイル名変更ツール", hero: { eyebrow: "写真家・映像制作者向け", titleLead: "写真向けAIファイル命名：", titleAccent: "撮影をプロジェクト・シーン・テイクで整理", subtitle: "Zushは写真家と映像制作者向けのデスクトップAIファイル名変更ツールです。利用可能なメタデータと視覚的内容を組み合わせてRAW、JPEG、対応動画を命名し、カタログ、編集、映像制作のツールはそのまま使えます。" },
      comparison: { eyebrow: "Zushを選ぶ理由", title: "写真・映像のプロがファイル名にZushを使う理由", description: "視覚的文脈、日付、カメラ情報、連番、スタジオ規則を組み合わせ、移行しやすい名前を作ります。", ariaLabel: "プロ向けメディア命名におけるZushの利点", columns: ["要件", "Zushの対応", "利点"], items: [{ need: "各ファイルの内容を表す", zushWorkflow: "被写体、シーン、場所、ショット、テイク、独自の視覚項目を提案できます。", benefit: "ファイルを開かずフォルダーを検索できます。" }, { need: "AIと安定した情報の併用", zushWorkflow: "日付、EXIF、カメラ、連番、案件、AI文脈でテンプレートを作ります。", benefit: "予測しやすく内容も分かる名前になります。" }, { need: "複数カメラで同じ規則", zushWorkflow: "項目順、区切り、日付形式、スタジオ規則を混在バッチに適用します。", benefit: "機材や担当者が違っても同じ体系になります。" }, { need: "取り込み前の確認", zushWorkflow: "適用前に元の名前と提案名を並べて確認します。", benefit: "曖昧な被写体、シーン、テイクを修正できます。" }, { need: "取り消し", zushWorkflow: "旧名と新名の対応を履歴に保存します。", benefit: "一括変更全体を復元できます。" }], boundaryTitle: "ファイル名変更で変わるもの・確認するもの", boundaryItems: ["Zushが変えるのは名前とパスで、画素、動画内容、埋め込みメタデータではありません。", "対応RAWは拡張子を保持し、変更内容は適用前に表示されます。", "履歴に旧名、新名、フォルダー、日時を保存し、取り消しに使えます。", "カタログ、タイムライン、RAW+JPEGの組、XMPにはリンクがある場合があります。コピーで試し、可能なら取り込み前に改名してください。"] }, namingRecipes: { title: "プロ撮影向けの再利用可能な命名テンプレート", description: "日付、顧客、カメラ、連番など安定した情報から始め、検索に役立つ場合だけAIの被写体、シーン、場所、ショットを加えます。", items: [{ title: "顧客撮影とカメラ連番", description: "日付と案件を基準にし、カメラまたは連番で重複を防ぎます。", example: "{YYYYMMDD}_{顧客}_{撮影}_{カメラ}_{連番}" }, { title: "マルチカメラ映像制作", description: "タイムライン前に案件、シーン、ショット、テイク、カメラを組み合わせます。", example: "{案件}_{シーン}_{ショット}_{テイク}_{カメラ}" }, { title: "検索できる人物・イベント保管", description: "顧客と日付を先に、被写体、場所、特徴的な瞬間を後に置きます。", example: "{顧客}_{撮影日}_{被写体}_{場所}" }] }, workflowDescription: "カタログ、編集、映像制作、保存環境は維持したまま、素材が届くフォルダーに再利用可能なZush命名ステップを追加します。", boundaryFaqQuestion: "Zushは写真カタログ、編集、映像制作ソフトの代わりですか？", boundaryFaqAnswer: "いいえ。Zushは既存フローのファイル名レイヤーです。取り込み前、受け渡し中、保管時に素材を改名しますが、選別、色調整、編集、カタログ、タイムライン、素材管理の代わりにはなりません。", metadataFaqQuestion: "改名で写真メタデータや動画内容は変わりますか？", metadataFaqAnswer: "いいえ。Zushが変更するのは名前とパスで、画素、動画内容、埋め込みメタデータではありません。対応RAWは拡張子を保持します。カタログ、タイムライン、RAW+JPEG、XMPのリンクがある場合はコピーで試してください。",
    },
  },
  ko: {
    accountants: {
      seo: { title: "회계사를 위한 AI 파일 이름 변경 도구", description: "청구서, 영수증, 명세서, 세금 서류와 스캔을 공급업체, 날짜, 번호, 금액, 고객별로 일괄 변경하세요. Mac과 Windows 지원." }, pageTitle: "회계사를 위한 AI 파일 이름 변경 도구", hero: { eyebrow: "회계사와 회계 사무소를 위한 AI 파일 이름 변경", titleLead: "회계 문서를 다음 기준으로 정리하세요:", titleAccent: "공급업체, 날짜, 번호", subtitle: "Zush는 회계 문서의 이름 지정 계층이며 문서 관리 시스템이나 원장이 아닙니다. 고객별 규칙에 따라 청구서, 영수증, 명세서, 세금 서류와 스캔의 이름을 지정하고 Mac과 Windows에서 일괄 미리보기와 실행 취소를 제공합니다." },
      comparison: { eyebrow: "Zush를 선택하는 이유", title: "회계팀이 파일 이름에 Zush를 사용하는 이유", description: "문서를 기존 폴더에 둔 채 재사용 가능한 이름 규칙을 적용합니다.", ariaLabel: "회계 파일 이름 지정에서 Zush의 장점", columns: ["회계 요구", "Zush 방식", "업무 이점"], items: [{ need: "고객별 규칙", zushWorkflow: "고객, 법인 또는 문서 유형별 Zush 템플릿을 저장합니다.", benefit: "팀 전체에서 규칙이 일관됩니다." }, { need: "내용 기반 회계 필드", zushWorkflow: "공급업체, 날짜, 번호, 금액, 통화, 기간과 사용자 필드를 제안합니다.", benefit: "일반 다운로드와 스캔을 검색할 수 있습니다." }, { need: "변경 전 검토", zushWorkflow: "일괄 미리보기에서 원래 이름과 제안 이름을 비교합니다.", benefit: "모호한 값을 적용 전에 수정합니다." }, { need: "개인정보 처리 선택", zushWorkflow: "관리형 클라우드 AI, 자체 공급자 키 또는 Ollama 로컬 AI를 선택합니다.", benefit: "사무소의 데이터 정책에 맞출 수 있습니다." }, { need: "기존 폴더 유지", zushWorkflow: "다른 저장소로 옮기지 않고 현재 위치에서 이름을 바꿉니다.", benefit: "현재 업무 흐름이 유지됩니다." }, { need: "복원", zushWorkflow: "기록에 이전 이름, 새 이름, 폴더와 시간을 저장합니다.", benefit: "일괄 변경을 검토하고 되돌릴 수 있습니다." }], note: "Zush는 이름 지정 계층이며 문서 저장소나 원장이 아닙니다. AI 이름은 작업용 라벨이므로 모호한 필드는 원본 문서에서 확인하세요." }, editorialReview: { label: "독립 편집 리뷰", ratingAria: "5점 만점에 4.5점", readLabel: "Softpedia에서 전체 리뷰 보기" }, dmsFaqAnswer: "아니요. Zush는 회계 환경 주변의 파일 이름 지정 계층입니다. 문서를 현재 위치에서 바꾸지만 고객 파일을 보관하거나 접근과 승인을 관리하지 않으며 문서 관리, 회계 플랫폼 또는 고객 포털을 대체하지 않습니다.", scanFaqAnswer: "예. Zush는 AI 비전으로 이미지 PDF와 지원 이미지 형식을 읽습니다. 스캔 품질이 중요하므로 적용 전에 공급업체, 날짜, 번호, 금액과 통화를 확인하세요.", softwareFaqQuestion: "Zush는 회계 소프트웨어와 연결되나요?", softwareFaqAnswer: "Zush는 회계 소프트웨어 주변의 다운로드, 첨부, 스캔, 내보내기와 증빙 파일을 정리합니다. 거래를 기장하거나 회계 기록을 수정하지 않습니다.", guidesDescription: "청구서, 영수증, 세금 서류와 회계 파일을 위한 Zush 이름 규칙과 수집 흐름.",
    },
    photographers: {
      seo: { title: "사진가·영상 제작자를 위한 AI 파일 이름 변경", description: "RAW, JPEG와 영상을 프로젝트, 날짜, 피사체, 장면과 테이크별로 일괄 변경하세요. Mac과 Windows 지원." }, pageTitle: "사진가·영상 제작자를 위한 AI 파일 이름 변경 도구", hero: { eyebrow: "사진가와 영상 제작자를 위해", titleLead: "사진 작업을 위한 AI 파일 이름:", titleAccent: "프로젝트, 장면, 테이크별로 촬영 정리", subtitle: "Zush는 사진가와 영상 제작자를 위한 데스크톱 AI 파일 이름 변경 도구입니다. 사용 가능한 메타데이터와 시각 정보를 결합해 RAW, JPEG와 지원 영상을 이름 짓고, 카탈로그·편집·영상 제작 도구는 그대로 유지합니다." },
      comparison: { eyebrow: "Zush를 선택하는 이유", title: "사진·영상 전문가가 파일 이름에 Zush를 사용하는 이유", description: "시각적 맥락, 날짜, 카메라 메타데이터, 순번과 스튜디오 규칙을 이동 가능한 이름으로 결합합니다.", ariaLabel: "전문 미디어 이름 지정에서 Zush의 장점", columns: ["요구", "Zush 방식", "이점"], items: [{ need: "각 파일의 내용 설명", zushWorkflow: "피사체, 장면, 위치, 숏, 테이크와 사용자 시각 필드를 제안합니다.", benefit: "파일을 열지 않고 폴더를 검색할 수 있습니다." }, { need: "AI와 안정적 메타데이터 결합", zushWorkflow: "날짜, EXIF, 카메라, 순번, 프로젝트와 AI 맥락으로 템플릿을 만듭니다.", benefit: "예측 가능하면서 설명적인 이름을 만듭니다." }, { need: "여러 카메라에 한 규칙", zushWorkflow: "같은 순서, 구분자, 날짜와 스튜디오 규칙을 혼합 묶음에 적용합니다.", benefit: "장비와 촬영자가 달라도 한 체계를 따릅니다." }, { need: "가져오기 전 검토", zushWorkflow: "적용 전 모든 원래 이름과 제안 이름을 비교합니다.", benefit: "모호한 피사체, 장면과 테이크를 수정합니다." }, { need: "실행 취소", zushWorkflow: "이전 이름과 새 이름의 대응을 기록에 저장합니다.", benefit: "전체 일괄 변경을 복원할 수 있습니다." }], boundaryTitle: "이름 변경이 바꾸는 것과 확인할 것", boundaryItems: ["Zush는 이름과 경로만 바꾸며 픽셀, 영상 내용과 내장 메타데이터는 바꾸지 않습니다.", "지원 RAW는 확장자를 유지하고 모든 변경은 적용 전에 표시됩니다.", "기록에 이전 이름, 새 이름, 폴더와 시간을 저장해 되돌릴 수 있습니다.", "카탈로그, 타임라인, RAW+JPEG 쌍과 XMP 파일에는 연결이 있을 수 있습니다. 복사본으로 시험하고 가능하면 가져오기 전에 이름을 바꾸세요."] }, namingRecipes: { title: "전문 촬영을 위한 재사용 이름 템플릿", description: "날짜, 고객, 카메라, 순번처럼 안정적인 정보로 시작하고 검색에 도움이 될 때 AI 피사체, 장면, 위치 또는 숏을 추가합니다.", items: [{ title: "고객 촬영과 카메라 순번", description: "날짜와 프로젝트를 기준으로 하고 카메라나 순번으로 중복을 방지합니다.", example: "{YYYYMMDD}_{고객}_{촬영}_{카메라}_{순번}" }, { title: "다중 카메라 영상 제작", description: "타임라인 전에 프로젝트, 장면, 숏, 테이크와 카메라를 결합합니다.", example: "{프로젝트}_{장면}_{숏}_{테이크}_{카메라}" }, { title: "검색 가능한 인물·행사 보관", description: "고객과 날짜를 먼저, 피사체, 위치 또는 순간을 뒤에 둡니다.", example: "{고객}_{촬영일}_{피사체}_{위치}" }] }, workflowDescription: "카탈로그, 편집, 영상 제작과 저장 환경은 유지하고 미디어가 들어오는 폴더에 재사용 가능한 Zush 이름 지정 단계를 추가합니다.", boundaryFaqQuestion: "Zush가 사진 카탈로그, 편집 또는 영상 제작 도구를 대체하나요?", boundaryFaqAnswer: "아니요. Zush는 기존 흐름 주변의 파일 이름 계층을 담당합니다. 가져오기 전, 전달 중 또는 보관 시 이름을 바꾸지만 선별, 색보정, 편집, 카탈로그, 타임라인과 자산 관리를 대체하지 않습니다.", metadataFaqQuestion: "이름 변경이 사진 메타데이터나 영상 내용을 바꾸나요?", metadataFaqAnswer: "아니요. Zush는 이름과 경로만 바꾸며 픽셀, 영상 내용과 내장 메타데이터는 바꾸지 않습니다. 지원 RAW는 확장자를 유지합니다. 카탈로그, 타임라인, RAW+JPEG 또는 XMP 연결이 있다면 복사본으로 시험하세요.",
    },
  },
  'zh-cn': {
    accountants: {
      seo: { title: "面向会计人员的 AI 文件重命名工具", description: "按供应商、日期、编号、金额和客户批量重命名发票、收据、对账单、税务表格与扫描件。支持 Mac 和 Windows 预览。" }, pageTitle: "面向会计人员的 AI 文件重命名工具", hero: { eyebrow: "面向会计人员与事务所的 AI 文件重命名", titleLead: "按以下字段命名会计文档：", titleAccent: "供应商、日期与编号", subtitle: "Zush 是会计文档的命名层，不是文档管理系统或总账。它按每位客户的规则命名发票、收据、对账单、税务表格和扫描件，并在 Mac 与 Windows 上提供批量预览和撤销。" },
      comparison: { eyebrow: "为何选择 Zush", title: "会计团队为何使用 Zush 命名文件", description: "Zush 在保留现有文件夹的同时，为会计文档应用可复用的命名规则。", ariaLabel: "Zush 在会计文件命名中的优势", columns: ["会计需求", "Zush 的处理方式", "业务收益"], items: [{ need: "按客户设置规则", zushWorkflow: "为客户、实体或文档类型保存 Zush 模板。", benefit: "规则不依赖个人记忆，团队始终一致。" }, { need: "从内容提取会计字段", zushWorkflow: "可建议供应商、日期、编号、金额、币种、期间和自定义字段。", benefit: "通用下载和扫描件变得可搜索。" }, { need: "修改前审核", zushWorkflow: "在批量预览中比较原名和建议名称。", benefit: "应用前即可修正含糊数据。" }, { need: "隐私处理选项", zushWorkflow: "可选托管云 AI、自有供应商密钥或 Ollama 本地 AI。", benefit: "事务所可配合自身数据政策。" }, { need: "保留现有文件夹", zushWorkflow: "Zush 就地重命名，不把文档移入新仓库。", benefit: "现有工作流保持不变。" }, { need: "恢复操作", zushWorkflow: "历史记录保存旧名称、新名称、文件夹与时间。", benefit: "批量操作可审核并撤销。" }], note: "Zush 是命名层，不是文档仓库或总账。AI 生成名称是工作标签；请根据原始文档核对含糊字段。" }, editorialReview: { label: "独立编辑评测", ratingAria: "5 分中 4.5 分", readLabel: "在 Softpedia 阅读完整评测" }, dmsFaqAnswer: "不是。Zush 是会计环境周围的文件命名层。它就地重命名文档，但不存储客户档案、不管理访问或审批，也不替代文档管理、会计平台或事务所门户。", scanFaqAnswer: "可以。Zush 使用 AI 视觉读取图片型 PDF 和支持的图片格式。扫描质量仍很重要；应用批次前请核对供应商、日期、编号、金额和币种。", softwareFaqQuestion: "Zush 会连接会计软件吗？", softwareFaqAnswer: "Zush 整理会计软件周围的下载、附件、扫描件、导出与凭证文件。它不记账，也不修改会计记录。", guidesDescription: "适用于发票、收据、税务表格和会计文件的 Zush 命名规则与收件流程。",
    },
    photographers: {
      seo: { title: "面向摄影师与视频创作者的 AI 文件重命名", description: "按项目、日期、主体、场景和镜次批量重命名 RAW、JPEG 与视频。支持 Mac 和 Windows。" }, pageTitle: "面向摄影师与视频创作者的 AI 文件重命名工具", hero: { eyebrow: "面向摄影师与视频创作者", titleLead: "摄影工作流的 AI 文件命名：", titleAccent: "按项目、场景和镜次整理拍摄素材", subtitle: "Zush 是面向摄影师与视频创作者的桌面 AI 文件重命名工具。它结合可用元数据与视觉内容为 RAW、JPEG 和支持的视频命名，而目录、编辑与剪辑工具仍用于创作。" },
      comparison: { eyebrow: "为何选择 Zush", title: "摄影与视频专业人士为何使用 Zush 命名文件", description: "Zush 将视觉语境、日期、相机元数据、序号和工作室规则组合为可迁移的名称。", ariaLabel: "Zush 在专业媒体命名中的优势", columns: ["需求", "Zush 的处理方式", "收益"], items: [{ need: "描述每个文件内容", zushWorkflow: "可建议主体、场景、地点、景别、镜次和自定义视觉字段。", benefit: "无需逐个打开文件即可搜索文件夹。" }, { need: "结合 AI 与稳定元数据", zushWorkflow: "用日期、EXIF、相机、序号、项目和 AI 语境创建模板。", benefit: "名称既可预测又能描述内容。" }, { need: "跨相机使用统一规则", zushWorkflow: "把相同字段顺序、分隔符、日期和工作室规则应用于混合批次。", benefit: "不同机身、存储卡和人员都遵循一个体系。" }, { need: "导入前审核", zushWorkflow: "应用前逐项比较原名称和建议名称。", benefit: "提前修正含糊的主体、场景和镜次。" }, { need: "撤销", zushWorkflow: "历史记录保存旧名称与新名称的对应关系。", benefit: "整个批次都可以恢复。" }], boundaryTitle: "重命名会改变什么，以及需要核对什么", boundaryItems: ["Zush 只更改名称和路径，不改像素、视频内容或嵌入元数据。", "支持的 RAW 保留扩展名，每项更改都会在应用前显示。", "历史记录保存旧名称、新名称、文件夹和时间，以便撤销。", "目录、时间线、RAW+JPEG 组合和 XMP 文件可能维护链接。请先测试副本，并尽可能在导入前重命名。"] }, namingRecipes: { title: "适用于专业拍摄的可复用命名模板", description: "先使用日期、客户、相机和序号等稳定元数据；仅在有助搜索时加入 AI 识别的主体、场景、地点或景别。", items: [{ title: "客户拍摄与相机序号", description: "以日期和项目为基础，用相机或序号避免重名。", example: "{YYYYMMDD}_{客户}_{拍摄}_{相机}_{序号}" }, { title: "多机位视频制作", description: "进入时间线前组合项目、场景、景别、镜次和相机。", example: "{项目}_{场景}_{景别}_{镜次}_{相机}" }, { title: "可搜索的人像或活动归档", description: "先放客户和日期，再放主体、地点或关键时刻。", example: "{客户}_{拍摄日期}_{主体}_{地点}" }] }, workflowDescription: "保留现有目录、编辑、剪辑和存储工具，在素材进入的文件夹周围加入可复用的 Zush 命名步骤。", boundaryFaqQuestion: "Zush 会替代照片目录、编辑或剪辑工具吗？", boundaryFaqAnswer: "不会。Zush 负责现有流程周围的文件命名层，在导入前、交付中或归档时重命名；它不替代筛选、调色、编辑、目录、时间线或数字资产管理。", metadataFaqQuestion: "重命名会修改照片元数据或视频内容吗？", metadataFaqAnswer: "不会。Zush 只更改名称和路径，不改像素、视频内容或嵌入元数据；支持的 RAW 保留扩展名。如目录、时间线、RAW+JPEG 或 XMP 维护自己的链接，请先测试副本。",
    },
  },
  ar: {
    accountants: {
      seo: { title: "أداة ذكاء اصطناعي لإعادة تسمية ملفات المحاسبين", description: "أعد تسمية الفواتير والإيصالات والكشوف والنماذج الضريبية والمسح الضوئي دفعة واحدة حسب المورد والتاريخ والرقم والمبلغ والعميل على Mac وWindows." }, pageTitle: "أداة ذكاء اصطناعي لإعادة تسمية ملفات المحاسبين", hero: { eyebrow: "للمحاسبين ومكاتب المحاسبة", titleLead: "سمِّ المستندات المحاسبية حسب", titleAccent: "المورد والتاريخ والرقم", subtitle: "Zush هو طبقة تسمية للمستندات المحاسبية، وليس نظام إدارة مستندات أو دفتر أستاذ. يسمّي الفواتير والإيصالات والكشوف والنماذج الضريبية وملفات المسح وفق قاعدة كل عميل، مع معاينة جماعية وتراجع على Mac وWindows." },
      comparison: { eyebrow: "لماذا Zush", title: "لماذا تستخدم فرق المحاسبة Zush لتسمية الملفات", description: "يطبق Zush قاعدة قابلة لإعادة الاستخدام مع إبقاء المستندات في مجلداتها الحالية.", ariaLabel: "مزايا Zush لتسمية ملفات المحاسبة", columns: ["احتياج المحاسبة", "طريقة Zush", "الفائدة"], items: [{ need: "قواعد لكل عميل", zushWorkflow: "احفظ قالب Zush لكل عميل أو كيان أو نوع مستند.", benefit: "تبقى القاعدة موحدة في الفريق." }, { need: "حقول من محتوى المستند", zushWorkflow: "يمكنه اقتراح المورد والتاريخ والرقم والمبلغ والعملة والفترة وحقول مخصصة.", benefit: "تصبح التنزيلات وملفات المسح قابلة للبحث." }, { need: "مراجعة قبل التغيير", zushWorkflow: "قارن الاسم الأصلي والمقترح في معاينة الدفعة.", benefit: "صحح البيانات الملتبسة قبل التطبيق." }, { need: "خيارات معالجة خاصة", zushWorkflow: "اختر ذكاءً سحابياً مُداراً أو مفتاح مزودك أو ذكاءً محلياً عبر Ollama.", benefit: "تتوافق المعالجة مع سياسة بيانات المكتب." }, { need: "المجلدات الحالية", zushWorkflow: "يعيد Zush التسمية في مكان الملف دون نقله إلى مستودع جديد.", benefit: "يبقى سير العمل الحالي كما هو." }, { need: "الاستعادة", zushWorkflow: "يحفظ السجل الاسم القديم والجديد والمجلد والوقت.", benefit: "يمكن مراجعة الدفعة والتراجع عنها." }], note: "Zush طبقة تسمية وليس مستودع مستندات أو دفتر أستاذ. الأسماء المولدة بالذكاء الاصطناعي ملصقات عمل؛ تحقق من الحقول الملتبسة في المستند الأصلي." }, editorialReview: { label: "مراجعة تحريرية مستقلة", ratingAria: "تقييم 4.5 من 5", readLabel: "اقرأ المراجعة الكاملة على Softpedia" }, dmsFaqAnswer: "لا. Zush طبقة تسمية حول بيئة المحاسبة. يعيد تسمية المستندات في مكانها، لكنه لا يخزن ملفات العملاء أو يدير الوصول والموافقات، ولا يحل محل إدارة المستندات أو منصة المحاسبة أو بوابة المكتب.", scanFaqAnswer: "نعم. يستخدم Zush الرؤية بالذكاء الاصطناعي لقراءة ملفات PDF المصورة والصور المدعومة. تظل جودة المسح مهمة؛ راجع المورد والتواريخ والأرقام والمبالغ والعملات قبل التطبيق.", softwareFaqQuestion: "هل يتصل Zush ببرامج المحاسبة؟", softwareFaqAnswer: "ينظم Zush طبقة الملفات حول برنامج المحاسبة: التنزيلات والمرفقات والمسح والتصدير والمستندات الداعمة. لا يسجل معاملات ولا يغير القيود المحاسبية.", guidesDescription: "قواعد تسمية Zush ومسارات الاستلام للفواتير والإيصالات والنماذج الضريبية وملفات المحاسبة.",
    },
    photographers: {
      seo: { title: "إعادة تسمية الملفات بالذكاء الاصطناعي للمصورين وصناع الفيديو", description: "أعد تسمية RAW وJPEG والفيديو حسب المشروع والتاريخ والموضوع والمشهد واللقطة، دفعة واحدة على Mac وWindows." }, pageTitle: "أداة إعادة تسمية الملفات بالذكاء الاصطناعي للمصورين وصناع الفيديو", hero: { eyebrow: "للمصورين وصناع الفيديو", titleLead: "تسمية ملفات التصوير بالذكاء الاصطناعي:", titleAccent: "نظّم الجلسات حسب المشروع والمشهد واللقطة", subtitle: "Zush أداة سطح مكتب لإعادة تسمية الملفات بالذكاء الاصطناعي للمصورين وصناع الفيديو. تجمع البيانات الوصفية والمحتوى المرئي لتسمية RAW وJPEG والمقاطع المدعومة، بينما تبقى أدوات الفهرسة والتحرير والمونتاج للإبداع." },
      comparison: { eyebrow: "لماذا Zush", title: "لماذا يستخدم محترفو الصور والفيديو Zush لتسمية الملفات", description: "يجمع Zush السياق المرئي والتاريخ وبيانات الكاميرا والتسلسل وقواعد الاستوديو في أسماء قابلة للنقل.", ariaLabel: "مزايا Zush لتسمية الوسائط الاحترافية", columns: ["الاحتياج", "طريقة Zush", "الفائدة"], items: [{ need: "وصف محتوى كل ملف", zushWorkflow: "يمكنه اقتراح الموضوع والمشهد والموقع ونوع اللقطة ورقمها وحقول مرئية مخصصة.", benefit: "يمكن البحث في المجلد دون فتح كل ملف." }, { need: "دمج الذكاء الاصطناعي والبيانات الثابتة", zushWorkflow: "أنشئ قالباً من التاريخ وEXIF والكاميرا والتسلسل والمشروع والسياق المرئي.", benefit: "تبقى الأسماء متوقعة ووصفية." }, { need: "قاعدة واحدة لكل الكاميرات", zushWorkflow: "طبق ترتيب الحقول والفاصل والتاريخ وقواعد الاستوديو على دفعة مختلطة.", benefit: "تتبع الملفات من أجهزة وبطاقات مختلفة نظاماً واحداً." }, { need: "المراجعة قبل الاستيراد", zushWorkflow: "قارن كل اسم أصلي ومقترح قبل التطبيق.", benefit: "صحح الموضوعات والمشاهد واللقطات الملتبسة." }, { need: "التراجع", zushWorkflow: "يحفظ Zush علاقة الاسم القديم بالجديد في السجل.", benefit: "يمكن استعادة الدفعة كاملة." }], boundaryTitle: "ما الذي تغيره إعادة التسمية وما الذي يجب مراجعته", boundaryItems: ["يغير Zush الاسم والمسار، لا البكسلات أو محتوى الفيديو أو البيانات الوصفية المضمنة.", "تحافظ ملفات RAW المدعومة على امتدادها وتظهر كل التغييرات قبل التطبيق.", "يحفظ السجل الاسم القديم والجديد والمجلد والوقت للتراجع.", "قد تحتفظ الفهارس والخطوط الزمنية وأزواج RAW+JPEG وملفات XMP بروابط. اختبر نسخة وأعد التسمية قبل الاستيراد قدر الإمكان."] }, namingRecipes: { title: "قوالب أسماء قابلة لإعادة الاستخدام للجلسات الاحترافية", description: "ابدأ بالتاريخ والعميل والكاميرا والتسلسل، ثم أضف الموضوع أو المشهد أو الموقع أو نوع اللقطة عند تحسين البحث.", items: [{ title: "جلسة عميل مع تسلسل الكاميرا", description: "استخدم التاريخ والمشروع كأساس واحتفظ بالكاميرا أو التسلسل لمنع التكرار.", example: "{YYYYMMDD}_{العميل}_{الجلسة}_{الكاميرا}_{التسلسل}" }, { title: "إنتاج فيديو متعدد الكاميرات", description: "اجمع المشروع والمشهد ونوع اللقطة ورقمها والكاميرا قبل الخط الزمني.", example: "{المشروع}_{المشهد}_{نوعاللقطة}_{اللقطة}_{الكاميرا}" }, { title: "أرشيف صور أو فعاليات قابل للبحث", description: "ضع العميل والتاريخ أولاً ثم الموضوع أو الموقع أو اللحظة.", example: "{العميل}_{تاريخالتصوير}_{الموضوع}_{الموقع}" }] }, workflowDescription: "احتفظ بأدوات الفهرسة والتحرير والمونتاج والتخزين، وأضف خطوة تسمية Zush قابلة لإعادة الاستخدام حول المجلدات التي تصل إليها الوسائط.", boundaryFaqQuestion: "هل يستبدل Zush فهرس الصور أو المحرر أو برنامج المونتاج؟", boundaryFaqAnswer: "لا. يدير Zush طبقة اسم الملف حول سير العمل الحالي. يعيد التسمية قبل الاستيراد أو أثناء التسليم أو في الأرشيف؛ ولا يستبدل الفرز أو الألوان أو التحرير أو الفهارس أو الخطوط الزمنية أو إدارة الأصول.", metadataFaqQuestion: "هل تغير إعادة التسمية بيانات الصورة أو محتوى الفيديو؟", metadataFaqAnswer: "لا. يغير Zush الاسم والمسار فقط، لا البكسلات أو الفيديو أو البيانات الوصفية المضمنة، وتحافظ ملفات RAW المدعومة على امتدادها. اختبر نسخة إذا كانت الفهارس أو الخطوط الزمنية أو RAW+JPEG أو XMP تحتفظ بروابط خاصة.",
    },
  },
  // Locale-owned copy is kept here so the same structural SEO/GEO additions
  // render consistently across all profession hreflang pages.
} as Record<NonEnglishLocale, LocaleEnhancement>;

export function enhanceLocalizedProfessionPage(
  page: ProfessionPageCopy,
  locale: NonEnglishLocale,
  profession: ProfessionKey,
): ProfessionPageCopy {
  if (profession !== 'accountants' && profession !== 'photographers') return page;

  const enhancement = ENHANCEMENTS[locale][profession];

  if (profession === 'accountants') {
    const accountant = enhancement as AccountantEnhancement;
    return {
      ...page,
      seo: accountant.seo,
      pageTitle: accountant.pageTitle,
      hero: { ...page.hero, ...accountant.hero },
      comparison: accountant.comparison,
      editorialReview: accountant.editorialReview,
      faq: {
        ...page.faq,
        items: page.faq.items.map((item, index) => {
          if (index === 0) return { ...item, answer: accountant.dmsFaqAnswer };
          if (index === 4) return { ...item, answer: accountant.scanFaqAnswer };
          if (index === 6) {
            return {
              question: accountant.softwareFaqQuestion,
              answer: accountant.softwareFaqAnswer,
            };
          }
          return item;
        }),
      },
      guides: page.guides
        ? {
            ...page.guides,
            description: accountant.guidesDescription,
            slugs: [
              'invoice-file-naming-convention',
              'automatically-rename-invoices-ai',
              'how-to-organize-invoices-and-receipts',
              'how-to-organize-tax-documents',
            ],
          }
        : page.guides,
    };
  }

  const photographer = enhancement as PhotographerEnhancement;
  return {
    ...page,
    seo: photographer.seo,
    pageTitle: photographer.pageTitle,
    hero: { ...page.hero, ...photographer.hero },
    workflow: { ...page.workflow, description: photographer.workflowDescription },
    comparison: photographer.comparison,
    namingRecipes: photographer.namingRecipes,
    faq: {
      ...page.faq,
      items: [
        ...page.faq.items.map((item, index) => (
          index === 4
            ? {
                question: photographer.boundaryFaqQuestion,
                answer: photographer.boundaryFaqAnswer,
              }
            : item
        )),
        {
          question: photographer.metadataFaqQuestion,
          answer: photographer.metadataFaqAnswer,
        },
      ],
    },
  };
}
