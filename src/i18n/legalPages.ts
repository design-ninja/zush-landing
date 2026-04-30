import type { Locale } from '@/i18n/config';

type InternalLocale = Exclude<Locale, 'en'>;
export type LegalRoute = '/privacy-policy' | '/terms-of-service' | '/refund-policy';

type LegalMarkdownByRoute = Record<LegalRoute, string>;

const LEGAL_MARKDOWN: Record<InternalLocale, LegalMarkdownByRoute> = {
  de: {
    '/privacy-policy': `Diese Datenschutzerklärung erklärt, wie Zush ("Kirill Isachenko", "wir", "uns" oder "unser") deine Informationen erfasst, nutzt und schützt, wenn du unsere macOS-App und zugehörige Dienste verwendest.

Zuletzt aktualisiert: 27. April 2026

### 1. Informationen, die wir erfassen

**1.1 Datei-Inhaltsdaten**
Um KI-gestützte Organisations- und Umbenennungsfunktionen bereitzustellen, verarbeitet Zush die Dateien, die du auswählst oder überwachst:

- **Visuelle Dateien** wie Bilder, RAW-Vorschauen, SVGs und einige PDFs können vor der Analyse in ein komprimiertes Vorschaubild umgewandelt werden.
- **Unterstützte Dokumente** wie Textdateien, E-Mails, Tabellen, Präsentationen und einige PDFs können mit extrahiertem Text oder einer kompakten Inhaltszusammenfassung analysiert werden, die auf deinem Gerät erstellt wird, bevor die Anfrage gesendet wird.

Deine originalen Dateien in voller Auflösung verlassen dein Gerät im normalen Cloud-Betrieb nicht. Wenn du den Offline-KI-Modus aktivierst, läuft die unterstützte Dateianalyse über private lokale Modelle via Ollama statt über Zush Cloud oder Drittanbieter-KI.

**1.2 Prompt- und Anweisungsdaten**
Wenn du den KI-Prompt-Editor oder andere Anpassungsfunktionen verwendest, werden der eingegebene benutzerdefinierte Umbenennungs-Prompt und Tagging-Prompt mit der Analyseanfrage gesendet, damit der KI-Anbieter deinen Anweisungen folgen kann.

**1.3 Gerätekennung**
Eine anonyme Gerätekennung (Machine UUID) wird mit jeder Analyseanfrage für Nutzungsverfolgung, Rate Limiting und Lizenzdurchsetzung gesendet. Diese Kennung enthält keine personenbezogenen Informationen.

**1.4 Lizenz- und Nutzungsdaten**
Wir erfassen Informationen, die für die Verwaltung deiner Lizenz und die Durchsetzung von Nutzungslimits erforderlich sind:

- E-Mail-Adresse: Wird beim Kauf angegeben.
- Lizenzstatus: Informationen über deine PRO-Lizenz (Einmalkauf).
- Nutzungszähler: Wir erfassen die Anzahl KI-verarbeiteter Dateien, um Nutzungslimits zu verwalten.

**1.5 Zahlungsinformationen**
Wir speichern oder verarbeiten deine Kreditkartendaten nicht. Alle Zahlungen werden sicher von unseren Zahlungsdienstleistern abgewickelt: [Paddle.com](https://www.paddle.com) (für Direktkäufe) und [Apple](https://www.apple.com/legal/privacy/) (für App-Store-Käufe). Bitte lies deren Datenschutzerklärungen für Details.

Bei App-Store-Käufen sendet Zush StoreKit-Produkt- und Transaktionskennungen an das Zush-Backend, um PRO-Berechtigungen zu verifizieren, Käufe wiederherzustellen, Missbrauch zu verhindern und den Kontostatus zu pflegen.

### 2. Wie wir deine Informationen verwenden

Wir verwenden die erfassten Informationen, um:

- den Dienst bereitzustellen und zu betreiben.
- deine PRO-Lizenz zu verarbeiten und zu verifizieren.
- Dateien mit KI zu analysieren und beschreibende Dateinamen, Tags und Metadaten zu erzeugen.
- benutzerdefinierte Umbenennungs- oder Tagging-Anweisungen anzuwenden, die du bereitstellst.
- technische Hinweise, Updates und Support-Nachrichten zu senden.

### 3. Datenverarbeitung und KI

Zush sendet Datei-Analyse-Payloads zur Analyse an Drittanbieter-KI-Dienste:

- **Standardablauf:** Datei-Analyseanfragen werden über Zush-Server an Groq (primär) und Google Gemini (Fallback) gesendet.
- **Bring Your Own Key (BYOK):** PRO-Nutzer können eigene API-Schlüssel für Groq, Google Gemini, OpenAI oder Anthropic Claude konfigurieren. BYOK-Schlüssel werden lokal im macOS-Schlüsselbund gespeichert. Im BYOK-Modus wird der Schlüssel nur zur Validierung und Verarbeitung von KI-Anfragen an das Zush-Backend und den ausgewählten KI-Anbieter gesendet. Das Zush-Backend speichert BYOK-API-Schlüssel nicht dauerhaft.
- **Offline-KI-Modus:** PRO-Nutzer können unterstützte Dateien mit privaten lokalen Modellen via Ollama verarbeiten. Im Offline-KI-Modus werden Datei-Inhalte auf dem Gerät des Nutzers verarbeitet und nicht zur Analyse an Zush-Server oder Drittanbieter-KI gesendet. Zush kann weiterhin Backend-Dienste für Lizenzierung, Updates, Support oder nicht-inhaltliche Betriebsprüfungen kontaktieren.

**Was in Cloud- und BYOK-Modi gesendet wird:** Je nach Dateityp kann dies ein komprimiertes Vorschaubild, extrahierter Dokumenttext oder eine kompakte Inhaltszusammenfassung sein, zusammen mit MIME-Typ, Dateierweiterung, Spracheinstellung, Regenerate- und BYOK-Einstellungen, einer anonymen Gerätekennung und benutzerdefinierten Umbenennungs- oder Tagging-Prompts, die du übermittelst. Einige Anfragen können auch grundlegende Dateimetadaten wie den Dateinamen enthalten, um bessere Umbenennungsvorschläge zu erzeugen.

**Was nicht automatisch gesendet wird:** Originale Datei-Inhalte in voller Auflösung und lokale Ordnerpfade werden nicht als separate Felder gesendet. Wenn jedoch personenbezogene Informationen in einer Dateivorschau, extrahiertem Text oder einem von dir eingegebenen Prompt enthalten sind, können diese Informationen als Teil der Anfrage verarbeitet werden.

**Datenspeicherung:** Dateivorschauen, extrahierter Text, Zusammenfassungen und benutzerdefinierte Prompt-Texte werden für Echtzeit-Analysen verarbeitet. Zush speichert Datei-Inhalte im normalen Betrieb nach der Verarbeitung nicht und speichert benutzerdefinierte Prompt-Texte nicht absichtlich als App-Funktion. Übermittelte Daten können dennoch von Drittanbieter-KI gemäß deren Bedingungen verarbeitet oder gespeichert werden. Deine Datei-Inhalte und Prompt-Texte werden von Zush nicht zum Trainieren eigener Modelle verwendet.

### 4. Drittanbieter-Dienste

Wir teilen Daten mit folgenden Dienstleistern:

- **KI-Anbieter:** Groq (primär), Google Gemini (Fallback). Mit BYOK optional OpenAI oder Anthropic Claude.
- **Lokale KI-Laufzeit:** Ollama, wenn du den Offline-KI-Modus installierst und aktivierst. Ollama läuft auf deinem Gerät und wird von deiner lokalen Ollama-Installation verwaltet.
- **Cloud-Infrastruktur:** Supabase (Backend-Datenbank, Lizenzierung und API-Relay).
- **Zahlungsdienstleister:** [Paddle.com](https://www.paddle.com) (Direktkäufe), [Apple](https://www.apple.com/legal/privacy/) (App-Store-Käufe).
- **Fehlertracking:** Sentry (anonyme Absturz- und Fehlerberichte).
- **Nutzungsanalyse:** TelemetryDeck (datenschutzorientierte Produktanalyse).

Jeder Drittanbieter verarbeitet Daten gemäß seiner eigenen Datenschutzerklärung. Wir empfehlen dir, diese Richtlinien zu prüfen.

### 5. Datensicherheit

Wir setzen angemessene Sicherheitsmaßnahmen ein, um deine Informationen vor unbefugtem Zugriff, Offenlegung oder Zerstörung zu schützen. BYOK-API-Schlüssel werden lokal im macOS-Schlüsselbund gespeichert und nicht dauerhaft im Zush-Backend gespeichert. Wenn BYOK verwendet wird, wird der Schlüssel nur übertragen, wenn es zur Validierung und zur Ausführung der ausgewählten Provider-Anfrage erforderlich ist. Keine Internetübertragung oder elektronische Speicherung ist jedoch zu 100% sicher.

### 6. Deine Rechte

Je nach Standort hast du möglicherweise Rechte nach Datenschutzgesetzen wie DSGVO oder CCPA, einschließlich des Rechts auf Zugriff, Berichtigung oder Löschung deiner personenbezogenen Daten. Um diese Rechte auszuüben, kontaktiere uns bitte.

### 7. Änderungen an dieser Richtlinie

Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Das Datum "Zuletzt aktualisiert" zeigt die neuesten Änderungen.

### 8. Kontakt

Wenn du Fragen zu dieser Datenschutzerklärung hast, kontaktiere uns bitte unter: [support@zushapp.com](mailto:support@zushapp.com)`,
    '/terms-of-service': `Willkommen bei Zush. Diese Nutzungsbedingungen ("Bedingungen") regeln deine Nutzung der Zush-Anwendung für macOS und Windows ("Dienst"), bereitgestellt von Kirill Isachenko ("wir", "uns" oder "unser"). Durch Herunterladen, Installieren oder Verwenden von Zush stimmst du diesen Bedingungen zu.

Zuletzt aktualisiert: 26. April 2026

### 1. Beschreibung des Dienstes

Zush ist ein Desktop-Dienstprogramm für macOS und Windows, das Nutzern hilft, Dateien mithilfe künstlicher Intelligenz (KI) zu organisieren, umzubenennen und Metadaten zu verwalten. Zu den Funktionen gehören automatische Umbenennung für Bilder und unterstützte Dokumente einschließlich PDFs, smarte Metadaten-Tags (Finder-Tags auf macOS, Dateieigenschaften auf Windows und Spotlight-Metadaten), Ordnerüberwachung, optionale benutzerdefinierte KI-Prompt-Steuerung für Umbenennung und Tagging, BYOK-Cloud-Verarbeitung und Offline-KI-Modus mit privaten lokalen Modellen via Ollama.

### 2. Softwarelizenz

Wir gewähren dir eine persönliche, nicht ausschließliche, nicht übertragbare, eingeschränkte Lizenz zur Nutzung von Zush auf macOS- oder Windows-Geräten, die dir gehören oder von dir kontrolliert werden, vorbehaltlich dieser Bedingungen.

### 3. Käufe und Zahlungen

**3.1 🌟 PRO-Version**
Zush bietet ein "🌟 PRO"-Upgrade, das kreditbasierten Zugriff auf KI-Umbenennungen, Überwachung mehrerer Ordner und erweiterte Metadatenfunktionen bietet. Ein Credit entspricht einer Umbenennung. Aktuelle Preise werden in der App und auf der Website angezeigt.

**3.2 Preispläne**
Wir bieten ein Einmalkauf-Modell:

- **Zush Free**: 50 Credits enthalten. Ein Credit entspricht einer Umbenennung.
- **Zush PRO**: Einmalkauf für $10. Enthält 10.000 Credits und Zugriff auf BYOK (Bring Your Own Key) für unbegrenzte Cloud-Umbenennungen sowie Offline-KI-Modus mit privaten lokalen Modellen via Ollama.

Credits sind einmalig und werden nicht zurückgesetzt. Wenn Credits aufgebraucht sind, können PRO-Nutzer BYOK aktivieren, um mit eigenem API-Schlüssel unbegrenzte Cloud-Umbenennungen fortzusetzen, oder den Offline-KI-Modus verwenden, wo unterstützt.

**3.3 Nutzungslimits**
Sowohl kostenlose als auch PRO-Versionen haben Nutzungslimits für KI-gestützte Cloud-Funktionen. Aktuelle Limits werden in der Anwendung angezeigt. PRO-Nutzer, deren Credits aufgebraucht sind, können BYOK für unbegrenzte Cloud-Umbenennungen oder den Offline-KI-Modus verwenden, wo unterstützt.

**3.5 Merchant of Record**
Unser Bestellprozess wird von unserem Online-Reseller [Paddle.com](https://www.paddle.com) durchgeführt. Paddle ist Merchant of Record für alle Bestellungen. Paddle stellt Kundenservice bereit und bearbeitet Rückgaben.

**3.6 Rückerstattungen**
Rückerstattungsanfragen werden von Paddle gemäß unserer [Rückerstattungsrichtlinie](/refund-policy) bearbeitet.

### 4. KI-gestützte Funktionen und Genauigkeit

Zush verwendet künstliche Intelligenz, um Dateien zu analysieren und Vorschläge für Namen und Metadaten zu erzeugen.

- Verantwortung des Nutzers: Da KI gelegentlich falsche oder unerwartete Ergebnisse erzeugen kann, bist du dafür verantwortlich, Änderungen zu prüfen und zu verifizieren, die der Dienst an deinen Dateien vornimmt.
- Nutzerbereitgestellte Anweisungen: Wenn du benutzerdefinierte Umbenennungs-Prompts, Tagging-Prompts oder andere Prompt-Anpassungstexte eingibst, werden diese Anweisungen mit der Analyseanfrage verarbeitet. In Cloud- oder BYOK-Modi bedeutet dies, dass sie über die Zush-Backend-Infrastruktur an den jeweiligen KI-Anbieter gesendet werden. Im Offline-KI-Modus werden sie von deinem lokalen Modell verarbeitet.
- Lokale KI: Wenn du den Offline-KI-Modus aktivierst, bist du für Installation, Betrieb, Aktualisierung und Auswahl deiner lokalen Ollama-Modelle verantwortlich. Qualität, Geschwindigkeit, Speicherbedarf und Verfügbarkeit lokaler Modelle hängen von deinem Gerät und deiner Ollama-Installation ab.
- Keine Garantie: Wir garantieren nicht die absolute Genauigkeit, Vollständigkeit oder Zuverlässigkeit von Informationen, die durch KI-Funktionen erzeugt werden.

### 5. Nutzungslimits und faire Nutzung

Die kostenlose Version von Zush enthält Nutzungslimits (z. B. eine begrenzte Anzahl KI-verarbeiteter Dateien). Wir behalten uns das Recht vor, Nutzung zu überwachen und Konten zu sperren, die versuchen, diese Limits zu umgehen oder missbräuchliches Verhalten zeigen.

### 6. Geistiges Eigentum

Alle Rechte, Titel und Interessen an Zush (ausgenommen nutzerbereitgestellte Inhalte) bleiben ausschließliches Eigentum von Kirill Isachenko. "Zush" und zugehörige Logos sind Marken von Kirill Isachenko.

### 7. Nutzerverhalten

Du verpflichtest dich, Folgendes nicht zu tun:

- die Anwendung rückzuentwickeln, zu dekompilieren oder zu disassemblieren.
- den Dienst für rechtswidrige Zwecke zu verwenden.
- unbefugten Zugriff auf unsere Backend-Dienste oder Lizenzsysteme zu versuchen.

### 8. Haftungsbeschränkung

SOWEIT GESETZLICH ZULÄSSIG, HAFTET KIRILL ISACHENKO NICHT FÜR INDIREKTE, ZUFÄLLIGE, BESONDERE, FOLGE- ODER STRAFSCHÄDEN, GEWINN- ODER UMSATZVERLUSTE ODER DATENVERLUSTE (EINSCHLIESSLICH DATEIVERLUST ODER -BESCHÄDIGUNG), DIE AUS DEINER NUTZUNG DES DIENSTES ENTSTEHEN.

### 9. Gewährleistungsausschluss

DER DIENST WIRD "WIE BESEHEN" UND "WIE VERFÜGBAR" OHNE GEWÄHRLEISTUNGEN JEGLICHER ART, WEDER AUSDRÜCKLICH NOCH STILLSCHWEIGEND, BEREITGESTELLT.

### 10. Anwendbares Recht

Diese Bedingungen unterliegen den Gesetzen von Thailand, Phuket, ohne Berücksichtigung kollisionsrechtlicher Grundsätze.

### 11. Änderungen der Bedingungen

Wir können diese Bedingungen von Zeit zu Zeit aktualisieren. Wir informieren dich über Änderungen, indem wir das Datum "Zuletzt aktualisiert" oben in diesem Dokument ändern oder eine In-App-Mitteilung anzeigen.

### 12. Kontaktinformationen

Wenn du Fragen zu diesen Bedingungen hast, kontaktiere uns bitte unter: [support@zushapp.com](mailto:support@zushapp.com)`,
    '/refund-policy': `Wir möchten, dass du mit Zush zufrieden bist. Wenn du nicht zufrieden bist, helfen wir dir gern weiter.

### Einmalkauf

Zush PRO ist ein Einmalkauf mit lebenslangem Zugriff. Wir bieten eine 14-tägige Geld-zurück-Garantie ab Kaufdatum.

### So beantragst du eine Rückerstattung

Um eine Rückerstattung zu beantragen, kontaktiere uns bitte unter [refund@zushapp.com](mailto:refund@zushapp.com) mit deiner Bestellnummer und der E-Mail-Adresse, die du beim Kauf verwendet hast.

### Bearbeitung von Rückerstattungen

Sobald deine Rückerstattungsanfrage eingegangen und genehmigt ist, bearbeiten wir sie. Eine Gutschrift wird automatisch innerhalb einer bestimmten Anzahl von Tagen auf deine ursprüngliche Zahlungsmethode angewendet, abhängig von den Richtlinien deines Kartenanbieters.

### Änderungen an dieser Richtlinie

Wir behalten uns das Recht vor, diese Rückerstattungsrichtlinie jederzeit zu ändern. Änderungen werden auf dieser Seite mit einem aktualisierten Datum "Zuletzt aktualisiert" veröffentlicht.`,
  },
  fr: {
    '/privacy-policy': `Cette Politique de confidentialité explique comment Zush ("Kirill Isachenko", "nous", "notre" ou "nos") collecte, utilise et protège vos informations lorsque vous utilisez notre application macOS et les services associés.

Dernière mise à jour : 27 avril 2026

### 1. Informations que nous collectons

**1.1 Données de contenu des fichiers**
Pour fournir les fonctions d’organisation et de renommage assistées par IA, Zush traite les fichiers que vous sélectionnez ou surveillez :

- **Fichiers visuels** comme les images, aperçus RAW, SVG et certains PDF peuvent être convertis en image d’aperçu compressée avant analyse.
- **Documents pris en charge** comme les fichiers texte, e-mails, feuilles de calcul, présentations et certains PDF peuvent être analysés à partir de texte extrait ou d’un résumé compact généré sur votre appareil avant l’envoi de la requête.

Vos fichiers originaux en pleine résolution ne quittent pas votre appareil dans le fonctionnement cloud normal. Si vous activez le mode IA hors ligne, l’analyse des fichiers pris en charge s’exécute via des modèles locaux privés avec Ollama plutôt que via le cloud Zush ou des fournisseurs IA tiers.

**1.2 Données de prompts et d’instructions**
Si vous utilisez l’éditeur de prompt IA ou d’autres fonctions de personnalisation, le texte de prompt de renommage et de tagging personnalisé que vous saisissez est envoyé avec la requête d’analyse afin que le fournisseur IA puisse suivre vos instructions.

**1.3 Identifiant de l’appareil**
Un identifiant anonyme de l’appareil (UUID machine) est envoyé avec chaque requête d’analyse pour le suivi d’usage, la limitation de débit et l’application de la licence. Cet identifiant ne contient pas d’informations personnelles.

**1.4 Données de licence et d’usage**
Nous collectons les informations nécessaires pour gérer votre licence et appliquer les limites d’usage :

- Adresse e-mail : fournie pendant le processus d’achat.
- Statut de licence : informations sur votre licence PRO (achat unique).
- Compteurs d’usage : nous suivons le nombre de fichiers traités par IA pour gérer les limites.

**1.5 Informations de paiement**
Nous ne stockons ni ne traitons vos données de carte bancaire. Tous les paiements sont traités de manière sécurisée par nos prestataires de paiement : [Paddle.com](https://www.paddle.com) (achats directs) et [Apple](https://www.apple.com/legal/privacy/) (achats App Store). Consultez leurs politiques de confidentialité respectives pour plus de détails.

Pour les achats App Store, Zush envoie les identifiants de produit et de transaction StoreKit au backend Zush afin de vérifier l’accès PRO, restaurer les achats, prévenir les abus et maintenir l’état du compte.

### 2. Comment nous utilisons vos informations

Nous utilisons les informations collectées pour :

- fournir et maintenir le Service.
- traiter et vérifier votre licence PRO.
- analyser les fichiers avec l’IA afin de générer des noms descriptifs, tags et métadonnées.
- appliquer les instructions personnalisées de renommage ou de tagging que vous choisissez de fournir.
- vous envoyer des avis techniques, mises à jour et messages de support.

### 3. Traitement des données et IA

Zush envoie des charges utiles d’analyse de fichiers à des services IA tiers :

- **Flux par défaut :** les requêtes d’analyse sont envoyées via les serveurs Zush à Groq (principal) et Google Gemini (secours).
- **Bring Your Own Key (BYOK) :** les utilisateurs PRO peuvent configurer leurs propres clés API pour Groq, Google Gemini, OpenAI ou Anthropic Claude. Les clés BYOK sont stockées localement dans le trousseau macOS. En mode BYOK, la clé est envoyée au backend Zush et au fournisseur IA sélectionné uniquement pour valider la clé et traiter les requêtes IA. Le backend Zush ne stocke pas durablement les clés API BYOK.
- **Mode IA hors ligne :** les utilisateurs PRO peuvent traiter les fichiers pris en charge avec des modèles locaux privés via Ollama. En mode IA hors ligne, le contenu d’analyse est traité sur l’appareil de l’utilisateur et n’est pas envoyé aux serveurs Zush ni aux fournisseurs IA tiers pour analyse. Zush peut encore contacter des services backend pour la licence, les mises à jour, le support ou des contrôles opérationnels ne portant pas sur le contenu.

**Ce qui est envoyé en modes Cloud et BYOK :** selon le type de fichier, cela peut inclure une image d’aperçu compressée, du texte extrait, ou un résumé compact du contenu, avec le type MIME, l’extension, la préférence de langue, les paramètres de régénération et BYOK, un identifiant d’appareil anonyme, et tout prompt personnalisé de renommage ou de tagging soumis. Certaines requêtes peuvent aussi inclure des métadonnées de base comme le nom du fichier afin de générer de meilleures suggestions.

**Ce qui n’est pas envoyé automatiquement :** les contenus originaux en pleine résolution et les chemins de dossiers locaux ne sont pas envoyés comme champs séparés. Toutefois, si des informations personnelles apparaissent dans un aperçu, du texte extrait, ou un prompt personnalisé, elles peuvent être traitées dans le cadre de la requête.

**Conservation des données :** les aperçus, textes extraits, résumés et prompts personnalisés sont traités pour l’analyse en temps réel. Zush ne stocke pas le contenu des fichiers après traitement dans le fonctionnement normal et ne stocke pas intentionnellement les prompts personnalisés comme fonctionnalité de l’application. Les données envoyées peuvent toutefois être traitées ou conservées par les fournisseurs IA tiers selon leurs propres conditions. Vos contenus de fichiers et prompts ne sont pas utilisés par Zush pour entraîner nos propres modèles.

### 4. Services tiers

Nous partageons des données avec les prestataires suivants :

- **Fournisseurs IA :** Groq (principal), Google Gemini (secours). Avec BYOK : éventuellement OpenAI ou Anthropic Claude.
- **Runtime IA local :** Ollama, si vous installez et activez le mode IA hors ligne. Ollama fonctionne sur votre appareil et est géré par votre installation locale d’Ollama.
- **Infrastructure cloud :** Supabase (base de données backend, licence et relais API).
- **Prestataires de paiement :** [Paddle.com](https://www.paddle.com) (achats directs), [Apple](https://www.apple.com/legal/privacy/) (achats App Store).
- **Suivi d’erreurs :** Sentry (rapports anonymes de crash et d’erreur).
- **Analyse d’usage :** TelemetryDeck (analytics produit axés sur la confidentialité).

Chaque fournisseur tiers traite les données selon sa propre politique de confidentialité. Nous vous encourageons à les consulter.

### 5. Sécurité des données

Nous mettons en œuvre des mesures de sécurité raisonnables pour protéger vos informations contre l’accès, la divulgation ou la destruction non autorisés. Les clés API BYOK sont stockées localement dans le trousseau macOS et ne sont pas stockées durablement dans le backend Zush. Lorsqu’une clé BYOK est utilisée, elle est transmise uniquement lorsque nécessaire pour valider la clé et exécuter la requête du fournisseur sélectionné. Toutefois, aucune méthode de transmission sur Internet ni de stockage électronique n’est sûre à 100%.

### 6. Vos droits

Selon votre lieu de résidence, vous pouvez disposer de droits en vertu des lois sur la protection des données (comme le RGPD ou le CCPA), notamment le droit d’accéder, corriger ou supprimer vos données personnelles. Pour exercer ces droits, veuillez nous contacter.

### 7. Modifications de cette politique

Nous pouvons mettre à jour cette Politique de confidentialité de temps à autre. La date "Dernière mise à jour" reflétera les modifications les plus récentes.

### 8. Nous contacter

Pour toute question concernant cette Politique de confidentialité, contactez-nous à : [support@zushapp.com](mailto:support@zushapp.com)`,
    '/terms-of-service': `Bienvenue sur Zush. Ces Conditions de service ("Conditions") régissent votre utilisation de l’application Zush pour macOS et Windows ("Service"), fournie par Kirill Isachenko ("nous", "notre" ou "nos"). En téléchargeant, installant ou utilisant Zush, vous acceptez d’être lié par ces Conditions.

Dernière mise à jour : 26 avril 2026

### 1. Description du Service

Zush est un utilitaire desktop pour macOS et Windows conçu pour aider les utilisateurs à organiser, renommer et gérer les métadonnées de fichiers avec l’intelligence artificielle (IA). Les fonctions incluent le renommage automatique d’images et de documents pris en charge, y compris les PDF, le tagging intelligent des métadonnées (tags Finder sur macOS, propriétés de fichiers sur Windows et métadonnées Spotlight), la surveillance de dossiers, des contrôles optionnels de prompts IA personnalisés pour le renommage et le tagging, le traitement cloud BYOK et le mode IA hors ligne avec des modèles locaux privés via Ollama.

### 2. Licence logicielle

Nous vous accordons une licence personnelle, non exclusive, non transférable et limitée pour utiliser Zush sur des appareils macOS ou Windows que vous possédez ou contrôlez, sous réserve de ces Conditions.

### 3. Achats et paiements

**3.1 Version 🌟 PRO**
Zush propose une mise à niveau "🌟 PRO" donnant accès, sur la base de crédits, aux renommages IA, à la surveillance de plusieurs dossiers et aux fonctions avancées de métadonnées. Un crédit équivaut à un renommage. Les prix actuels sont affichés dans l’application et sur le site.

**3.2 Offres tarifaires**
Nous proposons un modèle d’achat unique :

- **Zush Free** : 50 crédits inclus. Un crédit équivaut à un renommage.
- **Zush PRO** : achat unique de $10. Inclut 10 000 crédits et l’accès à BYOK (Bring Your Own Key) pour des renommages cloud illimités et au mode IA hors ligne avec des modèles locaux privés via Ollama.

Les crédits sont uniques et ne se réinitialisent pas. Une fois les crédits épuisés, les utilisateurs PRO peuvent activer BYOK pour continuer avec leur propre clé API pour des renommages cloud illimités ou utiliser le mode IA hors ligne lorsque pris en charge.

**3.3 Limites d’usage**
Les versions gratuite et PRO comportent des limites d’usage pour les fonctions cloud assistées par IA. Les limites actuelles sont affichées dans l’application. Les utilisateurs PRO qui épuisent leurs crédits peuvent utiliser BYOK pour des renommages cloud illimités ou le mode IA hors ligne lorsque pris en charge.

**3.5 Marchand officiel**
Notre processus de commande est assuré par notre revendeur en ligne [Paddle.com](https://www.paddle.com). Paddle est le marchand officiel de toutes nos commandes. Paddle fournit le service client et gère les retours.

**3.6 Remboursements**
Les demandes de remboursement sont traitées par Paddle conformément à notre [politique de remboursement](/refund-policy).

### 4. Fonctions IA et précision

Zush utilise l’intelligence artificielle pour analyser les fichiers et générer des suggestions de noms et de métadonnées.

- Responsabilité de l’utilisateur : puisque l’IA peut parfois produire des résultats incorrects ou inattendus, vous êtes responsable de vérifier toute modification apportée par le Service à vos fichiers.
- Instructions fournies par l’utilisateur : si vous saisissez des prompts de renommage, de tagging ou tout autre texte de personnalisation, ces instructions sont traitées avec la requête d’analyse. En modes Cloud ou BYOK, cela signifie qu’elles sont envoyées via l’infrastructure backend de Zush au fournisseur IA concerné. En mode IA hors ligne, elles sont traitées par votre modèle local.
- IA locale : si vous activez le mode IA hors ligne, vous êtes responsable de l’installation, de l’exécution, de la mise à jour et du choix de vos modèles Ollama locaux. La qualité, la vitesse, l’espace de stockage utilisé et la disponibilité des modèles locaux dépendent de votre appareil et de votre installation Ollama.
- Absence de garantie : nous ne garantissons pas l’exactitude, l’exhaustivité ou la fiabilité absolue des informations générées par les fonctions IA.

### 5. Limites d’usage et utilisation équitable

La version gratuite de Zush inclut des limites d’usage (par exemple un nombre limité de fichiers traités par IA). Nous nous réservons le droit de surveiller l’usage et de suspendre les comptes qui tentent de contourner ces limites ou adoptent un comportement abusif.

### 6. Propriété intellectuelle

Tous les droits, titres et intérêts relatifs à Zush (hors contenu fourni par l’utilisateur) restent la propriété exclusive de Kirill Isachenko. "Zush" et ses logos associés sont des marques de Kirill Isachenko.

### 7. Conduite de l’utilisateur

Vous acceptez de ne pas :

- faire de l’ingénierie inverse, décompiler ou désassembler l’application.
- utiliser le Service à des fins illégales.
- tenter d’obtenir un accès non autorisé à nos services backend ou systèmes de licence.

### 8. Limitation de responsabilité

DANS LA MESURE MAXIMALE AUTORISÉE PAR LA LOI, KIRILL ISACHENKO NE SERA PAS RESPONSABLE DES DOMMAGES INDIRECTS, ACCESSOIRES, SPÉCIAUX, CONSÉCUTIFS OU PUNITIFS, NI DES PERTES DE PROFITS OU DE REVENUS, NI DES PERTES DE DONNÉES (Y COMPRIS PERTE OU CORRUPTION DE FICHIERS), RÉSULTANT DE VOTRE UTILISATION DU SERVICE.

### 9. Exclusion de garanties

LE SERVICE EST FOURNI "TEL QUEL" ET "SELON DISPONIBILITÉ", SANS GARANTIE D’AUCUNE SORTE, EXPRESSE OU IMPLICITE.

### 10. Droit applicable

Ces Conditions sont régies et interprétées conformément aux lois de Thaïlande, Phuket, sans égard aux principes de conflit de lois.

### 11. Modifications des Conditions

Nous pouvons mettre à jour ces Conditions de temps à autre. Nous vous informerons des changements en mettant à jour la date "Dernière mise à jour" en haut de ce document ou via une notification dans l’application.

### 12. Coordonnées

Pour toute question concernant ces Conditions, contactez-nous à : [support@zushapp.com](mailto:support@zushapp.com)`,
    '/refund-policy': `Nous voulons que vous soyez satisfait de Zush. Si ce n’est pas le cas, nous sommes là pour vous aider.

### Achat unique

Zush PRO est un achat unique avec accès à vie. Nous offrons une garantie de remboursement de 14 jours à compter de la date d’achat.

### Comment demander un remboursement

Pour demander un remboursement, contactez-nous à [refund@zushapp.com](mailto:refund@zushapp.com) avec votre numéro de commande et l’adresse e-mail utilisée pour l’achat.

### Traitement des remboursements

Une fois votre demande reçue et approuvée, nous la traiterons et un crédit sera automatiquement appliqué à votre moyen de paiement initial dans un certain nombre de jours, selon les politiques de l’émetteur de votre carte.

### Modifications de cette politique

Nous nous réservons le droit de modifier cette politique de remboursement à tout moment. Toute modification sera publiée sur cette page avec une date "Dernière mise à jour" actualisée.`,
  },
  'pt-br': {
    '/privacy-policy': `Esta Política de Privacidade explica como o Zush ("Kirill Isachenko", "nós", "nos" ou "nosso") coleta, usa e protege suas informações quando você usa nosso aplicativo para macOS e serviços relacionados.

Última atualização: 27 de abril de 2026

### 1. Informações que coletamos

**1.1 Dados de conteúdo de arquivos**
Para oferecer recursos de organização e renomeação com IA, o Zush processa os arquivos que você seleciona ou monitora:

- **Arquivos visuais** como imagens, prévias RAW, SVGs e alguns PDFs podem ser convertidos em uma imagem de prévia compactada antes da análise.
- **Documentos compatíveis** como arquivos de texto, e-mails, planilhas, apresentações e alguns PDFs podem ser analisados usando texto extraído ou um resumo compacto gerado no seu dispositivo antes do envio da solicitação.

Seus arquivos originais em resolução completa não saem do seu dispositivo durante a operação normal na nuvem. Se você ativar o modo IA offline, a análise de arquivos compatíveis é executada por modelos locais privados via Ollama em vez da nuvem do Zush ou provedores de IA de terceiros.

**1.2 Dados de prompts e instruções**
Se você usar o editor de prompts de IA ou outros recursos de personalização, o texto do prompt personalizado de renomeação e de tags que você inserir será enviado com a solicitação de análise para que o provedor de IA siga suas instruções.

**1.3 Identificador do dispositivo**
Um identificador anônimo do dispositivo (UUID da máquina) é enviado com cada solicitação de análise para controle de uso, limitação de taxa e aplicação da licença. Esse identificador não contém informações pessoais.

**1.4 Dados de licença e uso**
Coletamos as informações necessárias para gerenciar sua licença e aplicar limites de uso:

- Endereço de e-mail: fornecido durante o processo de compra.
- Status da licença: informações sobre sua licença PRO (compra única).
- Contagens de uso: acompanhamos o número de arquivos processados por IA para gerenciar limites de uso.

**1.5 Informações de pagamento**
Não armazenamos nem processamos os dados do seu cartão de crédito. Todos os pagamentos são processados com segurança pelos nossos processadores: [Paddle.com](https://www.paddle.com) (compras diretas) e [Apple](https://www.apple.com/legal/privacy/) (compras na App Store). Consulte as políticas de privacidade deles para mais detalhes.

Para compras na App Store, o Zush envia identificadores de produto e transação do StoreKit ao backend do Zush para verificar o direito ao PRO, restaurar compras, prevenir abuso e manter o status da conta.

### 2. Como usamos suas informações

Usamos as informações coletadas para:

- fornecer e manter o Serviço.
- processar e verificar sua licença PRO.
- analisar arquivos com IA para gerar nomes descritivos, tags e metadados.
- aplicar instruções personalizadas de renomeação ou tags que você escolha fornecer.
- enviar avisos técnicos, atualizações e mensagens de suporte.

### 3. Processamento de dados e IA

O Zush envia cargas de análise de arquivos a serviços de IA de terceiros:

- **Fluxo padrão:** solicitações de análise são enviadas pelos servidores do Zush para Groq (principal) e Google Gemini (fallback).
- **Bring Your Own Key (BYOK):** usuários PRO podem configurar suas próprias chaves de API para Groq, Google Gemini, OpenAI ou Anthropic Claude. As chaves BYOK são armazenadas localmente no macOS Keychain. No modo BYOK, a chave é enviada ao backend do Zush e ao provedor selecionado apenas para validar a chave e processar solicitações de IA. O backend do Zush não armazena chaves BYOK permanentemente.
- **Modo IA offline:** usuários PRO podem processar arquivos compatíveis com modelos locais privados via Ollama. No modo IA offline, o conteúdo de análise é processado no dispositivo do usuário e não é enviado aos servidores do Zush nem a provedores de IA de terceiros para análise. O Zush ainda pode contatar serviços de backend para licenciamento, atualizações, suporte ou verificações operacionais sem conteúdo.

**O que é enviado nos modos Cloud e BYOK:** dependendo do tipo de arquivo, isso pode incluir uma imagem de prévia compactada, texto extraído do documento ou um resumo compacto do conteúdo, além de tipo MIME, extensão, preferência de idioma, configurações de regeneração e BYOK, identificador anônimo do dispositivo e qualquer prompt personalizado de renomeação ou tags enviado. Algumas solicitações também podem incluir metadados básicos, como o nome do arquivo, para gerar sugestões melhores.

**O que não é enviado automaticamente:** conteúdos originais em resolução completa e caminhos de pastas locais não são enviados como campos separados. Porém, se informações pessoais aparecerem em uma prévia, texto extraído ou prompt personalizado, essas informações podem ser processadas como parte da solicitação.

**Retenção de dados:** prévias, textos extraídos, resumos e prompts personalizados são processados para análise em tempo real. O Zush não armazena conteúdo de arquivos após o processamento como parte da operação normal e não armazena intencionalmente prompts personalizados como recurso do aplicativo. Dados enviados ainda podem ser processados ou retidos por provedores de IA de terceiros conforme seus próprios termos. O conteúdo dos seus arquivos e prompts não é usado pelo Zush para treinar nossos próprios modelos.

### 4. Serviços de terceiros

Compartilhamos dados com os seguintes provedores:

- **Provedores de IA:** Groq (principal), Google Gemini (fallback). Com BYOK: opcionalmente OpenAI ou Anthropic Claude.
- **Runtime local de IA:** Ollama, se você instalar e ativar o modo IA offline. O Ollama roda no seu dispositivo e é gerenciado pela sua instalação local.
- **Infraestrutura em nuvem:** Supabase (banco de dados backend, licenciamento e relay de API).
- **Processadores de pagamento:** [Paddle.com](https://www.paddle.com) (compras diretas), [Apple](https://www.apple.com/legal/privacy/) (compras na App Store).
- **Rastreamento de erros:** Sentry (relatórios anônimos de falhas e erros).
- **Análise de uso:** TelemetryDeck (analytics de produto com foco em privacidade).

Cada provedor terceirizado processa dados de acordo com suas próprias políticas de privacidade. Recomendamos que você as revise.

### 5. Segurança dos dados

Implementamos medidas de segurança razoáveis para proteger suas informações contra acesso, divulgação ou destruição não autorizados. Chaves de API BYOK são armazenadas localmente no macOS Keychain e não são armazenadas permanentemente no backend do Zush. Quando BYOK é usado, a chave é transmitida apenas quando necessário para validar a chave e concluir a solicitação do provedor selecionado. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro.

### 6. Seus direitos

Dependendo da sua localização, você pode ter direitos sob leis de proteção de dados (como GDPR ou CCPA), incluindo o direito de acessar, corrigir ou excluir seus dados pessoais. Para exercer esses direitos, entre em contato conosco.

### 7. Alterações nesta política

Podemos atualizar esta Política de Privacidade de tempos em tempos. A data "Última atualização" refletirá as mudanças mais recentes.

### 8. Fale conosco

Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato: [support@zushapp.com](mailto:support@zushapp.com)`,
    '/terms-of-service': `Bem-vindo ao Zush. Estes Termos de Serviço ("Termos") regem o uso do aplicativo Zush para macOS e Windows ("Serviço"), fornecido por Kirill Isachenko ("nós", "nos" ou "nosso"). Ao baixar, instalar ou usar o Zush, você concorda com estes Termos.

Última atualização: 26 de abril de 2026

### 1. Descrição do Serviço

Zush é um utilitário desktop para macOS e Windows criado para ajudar usuários a organizar, renomear e gerenciar metadados de arquivos usando inteligência artificial (IA). Os recursos incluem renomeação automática para imagens e documentos compatíveis, incluindo PDFs, tags inteligentes de metadados (tags do Finder no macOS, propriedades de arquivo no Windows e metadados do Spotlight), monitoramento de pastas, controles opcionais de prompts personalizados para renomeação e tags, processamento cloud BYOK e modo IA offline com modelos locais privados via Ollama.

### 2. Licença de software

Concedemos a você uma licença pessoal, não exclusiva, intransferível e limitada para usar o Zush em dispositivos macOS ou Windows que você possua ou controle, sujeita a estes Termos.

### 3. Compras e pagamentos

**3.1 Versão 🌟 PRO**
O Zush oferece um upgrade "🌟 PRO" que fornece acesso baseado em créditos a renomeações com IA, monitoramento de várias pastas e recursos avançados de metadados. Um crédito equivale a uma renomeação. Os preços atuais são exibidos no aplicativo e no site.

**3.2 Planos de preço**
Oferecemos um modelo de compra única:

- **Zush Free**: 50 créditos incluídos. Um crédito equivale a uma renomeação.
- **Zush PRO**: compra única de $10. Inclui 10.000 créditos e acesso a BYOK (Bring Your Own Key) para renomeações cloud ilimitadas e modo IA offline com modelos locais privados via Ollama.

Os créditos são únicos e não são redefinidos. Quando os créditos acabam, usuários PRO podem ativar BYOK para continuar usando sua própria chave de API para renomeações cloud ilimitadas ou usar o modo IA offline quando compatível.

**3.3 Limites de uso**
As versões gratuita e PRO têm limites de uso para recursos cloud com IA. Os limites atuais são exibidos no aplicativo. Usuários PRO que esgotarem seus créditos podem usar BYOK para renomeações cloud ilimitadas ou o modo IA offline quando compatível.

**3.5 Comerciante responsável**
Nosso processo de pedido é conduzido por nosso revendedor online [Paddle.com](https://www.paddle.com). A Paddle é a Merchant of Record de todos os nossos pedidos. A Paddle fornece atendimento ao cliente e lida com devoluções.

**3.6 Reembolsos**
Pedidos de reembolso são tratados pela Paddle de acordo com nossa [política de reembolso](/refund-policy).

### 4. Recursos com IA e precisão

O Zush usa inteligência artificial para analisar arquivos e gerar sugestões de nomes e metadados.

- Responsabilidade do usuário: como a IA pode ocasionalmente produzir resultados incorretos ou inesperados, você é responsável por revisar e verificar qualquer alteração feita pelo Serviço nos seus arquivos.
- Instruções fornecidas pelo usuário: se você inserir prompts personalizados de renomeação, prompts de tags ou outro texto de personalização, essas instruções serão processadas com a solicitação de análise. Nos modos Cloud ou BYOK, isso significa enviá-las pela infraestrutura backend do Zush ao provedor de IA relevante. No modo IA offline, elas são processadas pelo seu modelo local.
- IA local: se você ativar o modo IA offline, você é responsável por instalar, executar, atualizar e escolher seus modelos locais do Ollama. Qualidade, velocidade, uso de armazenamento e disponibilidade dependem do seu dispositivo e da sua instalação do Ollama.
- Sem garantia: não garantimos a precisão, integridade ou confiabilidade absoluta de qualquer informação gerada pelos recursos de IA.

### 5. Limites de uso e uso justo

A versão gratuita do Zush inclui limites de uso (por exemplo, um número limitado de arquivos processados por IA). Reservamo-nos o direito de monitorar o uso e suspender contas que tentem contornar esses limites ou pratiquem comportamento abusivo.

### 6. Propriedade intelectual

Todos os direitos, títulos e interesses sobre o Zush (excluindo conteúdo fornecido pelo usuário) permanecerão propriedade exclusiva de Kirill Isachenko. "Zush" e seus logotipos associados são marcas de Kirill Isachenko.

### 7. Conduta do usuário

Você concorda em não:

- fazer engenharia reversa, descompilar ou desmontar o aplicativo.
- usar o Serviço para qualquer finalidade ilegal.
- tentar obter acesso não autorizado aos nossos serviços backend ou sistemas de licenciamento.

### 8. Limitação de responsabilidade

NA EXTENSÃO MÁXIMA PERMITIDA POR LEI, KIRILL ISACHENKO NÃO SERÁ RESPONSÁVEL POR DANOS INDIRETOS, INCIDENTAIS, ESPECIAIS, CONSEQUENCIAIS OU PUNITIVOS, OU POR PERDA DE LUCROS OU RECEITAS, OU PERDA DE DADOS (INCLUINDO PERDA OU CORRUPÇÃO DE ARQUIVOS), DECORRENTES DO USO DO SERVIÇO.

### 9. Isenção de garantias

O SERVIÇO É FORNECIDO "NO ESTADO EM QUE SE ENCONTRA" E "CONFORME DISPONÍVEL", SEM GARANTIAS DE QUALQUER TIPO, EXPRESSAS OU IMPLÍCITAS.

### 10. Lei aplicável

Estes Termos serão regidos e interpretados de acordo com as leis da Tailândia, Phuket, sem considerar seus princípios de conflito de leis.

### 11. Alterações nos Termos

Podemos atualizar estes Termos de tempos em tempos. Notificaremos você sobre mudanças atualizando a data "Última atualização" no topo deste documento ou por uma notificação no aplicativo.

### 12. Informações de contato

Se você tiver dúvidas sobre estes Termos, entre em contato: [support@zushapp.com](mailto:support@zushapp.com)`,
    '/refund-policy': `Queremos que você fique satisfeito com o Zush. Se não estiver satisfeito, estamos aqui para ajudar.

### Compra única

Zush PRO é uma compra única com acesso vitalício. Oferecemos garantia de reembolso de 14 dias a partir da data da compra.

### Como solicitar um reembolso

Para solicitar um reembolso, entre em contato em [refund@zushapp.com](mailto:refund@zushapp.com) com o número do pedido e o e-mail usado na compra.

### Processamento de reembolsos

Assim que sua solicitação de reembolso for recebida e aprovada, nós a processaremos e um crédito será aplicado automaticamente ao método de pagamento original dentro de alguns dias, dependendo das políticas da emissora do cartão.

### Alterações nesta política

Reservamo-nos o direito de modificar esta política de reembolso a qualquer momento. Qualquer alteração será publicada nesta página com uma data "Última atualização" atualizada.`,
  },
  es: {
    '/privacy-policy': `Esta Política de privacidad explica cómo Zush ("Kirill Isachenko", "nosotros" o "nuestro") recopila, usa y protege tu información cuando usas nuestra aplicación para macOS y los servicios relacionados.

Última actualización: 27 de abril de 2026

### 1. Información que recopilamos

**1.1 Datos de contenido de archivos**
Para ofrecer funciones de organización y renombrado con IA, Zush procesa los archivos que seleccionas o monitoreas:

- **Archivos visuales** como imágenes, vistas previas RAW, SVG y algunos PDF pueden convertirse en una imagen de vista previa comprimida antes del análisis.
- **Documentos compatibles** como archivos de texto, correos, hojas de cálculo, presentaciones y algunos PDF pueden analizarse usando texto extraído o un resumen compacto generado en tu dispositivo antes de enviar la solicitud.

Tus archivos originales en resolución completa no salen de tu dispositivo durante la operación normal en la nube. Si activas el modo IA offline, el análisis de archivos compatibles se ejecuta con modelos locales privados mediante Ollama en lugar de la nube de Zush o proveedores de IA externos.

**1.2 Datos de prompts e instrucciones**
Si usas el editor de prompts de IA u otras funciones de personalización, el texto de prompt personalizado para renombrado y etiquetado que ingreses se envía con la solicitud de análisis para que el proveedor de IA pueda seguir tus instrucciones.

**1.3 Identificador del dispositivo**
Se envía un identificador anónimo del dispositivo (UUID de máquina) con cada solicitud de análisis para seguimiento de uso, limitación de tasa y aplicación de licencia. Este identificador no contiene información personal.

**1.4 Datos de licencia y uso**
Recopilamos información necesaria para gestionar tu licencia y aplicar límites de uso:

- Dirección de correo: proporcionada durante el proceso de compra.
- Estado de licencia: información sobre tu licencia PRO (compra única).
- Conteos de uso: registramos la cantidad de archivos procesados por IA para gestionar límites de uso.

**1.5 Información de pago**
No almacenamos ni procesamos los datos de tu tarjeta de crédito. Todos los pagos son procesados de forma segura por nuestros procesadores: [Paddle.com](https://www.paddle.com) (compras directas) y [Apple](https://www.apple.com/legal/privacy/) (compras en App Store). Consulta sus políticas de privacidad para más detalles.

Para compras en App Store, Zush envía identificadores de producto y transacción de StoreKit al backend de Zush para verificar el derecho PRO, restaurar compras, prevenir abuso y mantener el estado de cuenta.

### 2. Cómo usamos tu información

Usamos la información recopilada para:

- proporcionar y mantener el Servicio.
- procesar y verificar tu licencia PRO.
- analizar archivos con IA para generar nombres descriptivos, etiquetas y metadatos.
- aplicar instrucciones personalizadas de renombrado o etiquetado que decidas proporcionar.
- enviarte avisos técnicos, actualizaciones y mensajes de soporte.

### 3. Procesamiento de datos e IA

Zush envía payloads de análisis de archivos a servicios de IA de terceros:

- **Flujo predeterminado:** las solicitudes de análisis se envían mediante servidores de Zush a Groq (principal) y Google Gemini (respaldo).
- **Bring Your Own Key (BYOK):** usuarios PRO pueden configurar sus propias claves API para Groq, Google Gemini, OpenAI o Anthropic Claude. Las claves BYOK se almacenan localmente en macOS Keychain. En modo BYOK, la clave se envía al backend de Zush y al proveedor seleccionado solo para validar la clave y procesar solicitudes de IA. El backend de Zush no almacena permanentemente claves API BYOK.
- **Modo IA offline:** usuarios PRO pueden procesar archivos compatibles con modelos locales privados mediante Ollama. En modo IA offline, el contenido de análisis se procesa en el dispositivo del usuario y no se envía a servidores de Zush ni a proveedores de IA externos para análisis. Zush puede seguir contactando servicios backend para licencias, actualizaciones, soporte o comprobaciones operativas sin contenido.

**Qué se envía en modos Cloud y BYOK:** según el tipo de archivo, puede incluir una imagen de vista previa comprimida, texto extraído del documento o un resumen compacto del contenido, junto con tipo MIME, extensión, preferencia de idioma, ajustes de regeneración y BYOK, identificador anónimo del dispositivo y cualquier prompt personalizado de renombrado o etiquetado que envíes. Algunas solicitudes también pueden incluir metadatos básicos como el nombre de archivo para generar mejores sugerencias.

**Qué no se envía automáticamente:** el contenido original en resolución completa y las rutas locales de carpetas no se envían como campos separados. Sin embargo, si aparece información personal en una vista previa, texto extraído o prompt personalizado, esa información puede procesarse como parte de la solicitud.

**Retención de datos:** las vistas previas, textos extraídos, resúmenes y prompts personalizados se procesan para análisis en tiempo real. Zush no almacena contenido de archivos después del procesamiento como parte de la operación normal y no almacena intencionalmente prompts personalizados como función de la app. Los datos enviados aún pueden ser procesados o retenidos por proveedores de IA externos según sus propios términos. El contenido de tus archivos y prompts no es usado por Zush para entrenar nuestros propios modelos.

### 4. Servicios de terceros

Compartimos datos con los siguientes proveedores:

- **Proveedores de IA:** Groq (principal), Google Gemini (respaldo). Con BYOK: opcionalmente OpenAI o Anthropic Claude.
- **Runtime local de IA:** Ollama, si instalas y activas el modo IA offline. Ollama se ejecuta en tu dispositivo y es gestionado por tu instalación local.
- **Infraestructura cloud:** Supabase (base de datos backend, licencias y relay API).
- **Procesadores de pago:** [Paddle.com](https://www.paddle.com) (compras directas), [Apple](https://www.apple.com/legal/privacy/) (compras App Store).
- **Seguimiento de errores:** Sentry (informes anónimos de fallos y errores).
- **Analítica de uso:** TelemetryDeck (analítica de producto centrada en privacidad).

Cada proveedor tercero procesa datos según sus propias políticas de privacidad. Te recomendamos revisarlas.

### 5. Seguridad de datos

Implementamos medidas de seguridad razonables para proteger tu información contra acceso, divulgación o destrucción no autorizados. Las claves API BYOK se almacenan localmente en macOS Keychain y no se almacenan permanentemente en el backend de Zush. Cuando se usa BYOK, la clave se transmite solo cuando es necesario para validar la clave y completar la solicitud del proveedor seleccionado. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.

### 6. Tus derechos

Según tu ubicación, puedes tener derechos bajo leyes de protección de datos (como GDPR o CCPA), incluido el derecho a acceder, corregir o eliminar tus datos personales. Para ejercer estos derechos, contáctanos.

### 7. Cambios a esta política

Podemos actualizar esta Política de privacidad de vez en cuando. La fecha "Última actualización" reflejará los cambios más recientes.

### 8. Contacto

Si tienes preguntas sobre esta Política de privacidad, contáctanos en: [support@zushapp.com](mailto:support@zushapp.com)`,
    '/terms-of-service': `Bienvenido a Zush. Estos Términos de servicio ("Términos") rigen tu uso de la aplicación Zush para macOS y Windows ("Servicio"), proporcionada por Kirill Isachenko ("nosotros" o "nuestro"). Al descargar, instalar o usar Zush, aceptas estos Términos.

Última actualización: 26 de abril de 2026

### 1. Descripción del Servicio

Zush es una utilidad de escritorio para macOS y Windows diseñada para ayudar a organizar, renombrar y gestionar metadatos de archivos con inteligencia artificial (IA). Las funciones incluyen renombrado automático para imágenes y documentos compatibles, incluidos PDF, etiquetado inteligente de metadatos (tags de Finder en macOS, propiedades de archivo en Windows y metadatos Spotlight), monitoreo de carpetas, controles opcionales de prompts personalizados para renombrado y etiquetado, procesamiento cloud BYOK y modo IA offline con modelos locales privados mediante Ollama.

### 2. Licencia de software

Te otorgamos una licencia personal, no exclusiva, intransferible y limitada para usar Zush en dispositivos macOS o Windows que poseas o controles, sujeta a estos Términos.

### 3. Compras y pagos

**3.1 Versión 🌟 PRO**
Zush ofrece una actualización "🌟 PRO" que proporciona acceso basado en créditos a renombrados con IA, monitoreo de múltiples carpetas y funciones avanzadas de metadatos. Un crédito equivale a un renombrado. Los precios actuales se muestran en la app y en el sitio web.

**3.2 Planes de precios**
Ofrecemos un modelo de compra única:

- **Zush Free**: 50 créditos incluidos. Un crédito equivale a un renombrado.
- **Zush PRO**: compra única de $10. Incluye 10.000 créditos y acceso a BYOK (Bring Your Own Key) para renombrados cloud ilimitados y modo IA offline con modelos locales privados mediante Ollama.

Los créditos son de un solo uso y no se reinician. Cuando se agotan, los usuarios PRO pueden activar BYOK para continuar usando su propia clave API para renombrados cloud ilimitados o usar el modo IA offline donde esté disponible.

**3.3 Límites de uso**
Las versiones gratuita y PRO tienen límites de uso para funciones cloud con IA. Los límites actuales se muestran en la aplicación. Los usuarios PRO que agoten sus créditos pueden usar BYOK para renombrados cloud ilimitados o modo IA offline donde esté disponible.

**3.5 Comerciante oficial**
Nuestro proceso de pedido lo realiza nuestro revendedor online [Paddle.com](https://www.paddle.com). Paddle es el Merchant of Record de todos nuestros pedidos. Paddle proporciona atención al cliente y gestiona devoluciones.

**3.6 Reembolsos**
Las solicitudes de reembolso son gestionadas por Paddle de acuerdo con nuestra [política de reembolso](/refund-policy).

### 4. Funciones con IA y precisión

Zush usa inteligencia artificial para analizar archivos y generar sugerencias de nombres y metadatos.

- Responsabilidad del usuario: como la IA puede producir ocasionalmente resultados incorrectos o inesperados, eres responsable de revisar y verificar cualquier cambio realizado por el Servicio en tus archivos.
- Instrucciones proporcionadas por el usuario: si introduces prompts personalizados de renombrado, etiquetado u otro texto de personalización, esas instrucciones se procesan con la solicitud de análisis. En modos Cloud o BYOK, esto significa enviarlas mediante la infraestructura backend de Zush al proveedor de IA correspondiente. En modo IA offline, las procesa tu modelo local.
- IA local: si activas el modo IA offline, eres responsable de instalar, ejecutar, actualizar y elegir tus modelos locales de Ollama. La calidad, velocidad, uso de almacenamiento y disponibilidad dependen de tu dispositivo y de tu instalación de Ollama.
- Sin garantía: no garantizamos la precisión, integridad o fiabilidad absoluta de la información generada por las funciones de IA.

### 5. Límites de uso y uso justo

La versión gratuita de Zush incluye límites de uso (por ejemplo, un número limitado de archivos procesados por IA). Nos reservamos el derecho de monitorear el uso y suspender cuentas que intenten eludir estos límites o tengan comportamiento abusivo.

### 6. Propiedad intelectual

Todos los derechos, títulos e intereses sobre Zush (excluido el contenido proporcionado por usuarios) seguirán siendo propiedad exclusiva de Kirill Isachenko. "Zush" y sus logotipos asociados son marcas comerciales de Kirill Isachenko.

### 7. Conducta del usuario

Aceptas no:

- aplicar ingeniería inversa, descompilar o desensamblar la aplicación.
- usar el Servicio para cualquier propósito ilegal.
- intentar obtener acceso no autorizado a nuestros servicios backend o sistemas de licencias.

### 8. Limitación de responsabilidad

EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, KIRILL ISACHENKO NO SERÁ RESPONSABLE DE DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENTES O PUNITIVOS, NI DE PÉRDIDAS DE BENEFICIOS O INGRESOS, NI DE PÉRDIDA DE DATOS (INCLUIDA PÉRDIDA O CORRUPCIÓN DE ARCHIVOS), DERIVADOS DE TU USO DEL SERVICIO.

### 9. Exclusión de garantías

EL SERVICIO SE PROPORCIONA "TAL CUAL" Y "SEGÚN DISPONIBILIDAD", SIN GARANTÍAS DE NINGÚN TIPO, EXPRESAS O IMPLÍCITAS.

### 10. Ley aplicable

Estos Términos se regirán e interpretarán de acuerdo con las leyes de Tailandia, Phuket, sin tener en cuenta sus principios de conflicto de leyes.

### 11. Cambios en los Términos

Podemos actualizar estos Términos de vez en cuando. Te notificaremos cualquier cambio actualizando la fecha "Última actualización" en la parte superior de este documento o mediante una notificación dentro de la app.

### 12. Información de contacto

Si tienes preguntas sobre estos Términos, contáctanos en: [support@zushapp.com](mailto:support@zushapp.com)`,
    '/refund-policy': `Queremos que estés satisfecho con Zush. Si no lo estás, estamos aquí para ayudar.

### Compra única

Zush PRO es una compra única con acceso de por vida. Ofrecemos una garantía de devolución de dinero de 14 días desde la fecha de compra.

### Cómo solicitar un reembolso

Para solicitar un reembolso, contáctanos en [refund@zushapp.com](mailto:refund@zushapp.com) con tu número de pedido y el correo usado para la compra.

### Procesamiento de reembolsos

Una vez recibida y aprobada tu solicitud, la procesaremos y el crédito se aplicará automáticamente a tu método de pago original dentro de cierta cantidad de días, según las políticas del emisor de tu tarjeta.

### Cambios a esta política

Nos reservamos el derecho de modificar esta política de reembolso en cualquier momento. Cualquier cambio se publicará en esta página con una fecha "Última actualización" actualizada.`,
  },
  nl: {
    '/privacy-policy': `Dit privacybeleid legt uit hoe Zush ("Kirill Isachenko", "wij", "ons" of "onze") je informatie verzamelt, gebruikt en beschermt wanneer je onze macOS-app en gerelateerde diensten gebruikt.

Laatst bijgewerkt: 27 april 2026

### 1. Informatie die we verzamelen

**1.1 Bestandsinhoudgegevens**
Om AI-gestuurde organisatie- en hernoemfuncties te bieden, verwerkt Zush de bestanden die je selecteert of bewaakt:

- **Visuele bestanden** zoals afbeeldingen, RAW-previews, SVG's en sommige PDF's kunnen vóór analyse worden omgezet naar een gecomprimeerde preview-afbeelding.
- **Ondersteunde documenten** zoals tekstbestanden, e-mails, spreadsheets, presentaties en sommige PDF's kunnen worden geanalyseerd met geëxtraheerde tekst of een compacte inhoudssamenvatting die op je apparaat wordt gegenereerd voordat het verzoek wordt verzonden.

Je originele bestanden in volledige resolutie verlaten je apparaat niet bij normale cloudwerking. Als je Offline AI inschakelt, wordt ondersteunde bestandsanalyse uitgevoerd via private lokale modellen met Ollama in plaats van Zush cloud of externe AI-providers.

**1.2 Prompt- en instructiegegevens**
Als je de AI-prompteditor of andere promptaanpassingen gebruikt, worden de aangepaste hernoem- en taggingprompts die je invoert meegestuurd met het analyseverzoek zodat de AI-provider je instructies kan volgen.

**1.3 Apparaat-ID**
Een anonieme apparaat-ID (machine UUID) wordt met elk analyseverzoek verzonden voor gebruiksregistratie, rate limiting en licentiehandhaving. Deze ID bevat geen persoonlijke informatie.

**1.4 Licentie- en gebruiksgegevens**
We verzamelen informatie die nodig is om je licentie te beheren en gebruikslimieten te handhaven:

- E-mailadres: opgegeven tijdens het aankoopproces.
- Licentiestatus: informatie over je PRO-licentie (eenmalige aankoop).
- Gebruiksstatistieken: we volgen het aantal AI-verwerkte bestanden om gebruikslimieten te beheren.

**1.5 Betalingsinformatie**
We slaan je creditcardgegevens niet op en verwerken ze niet. Alle betalingen worden veilig afgehandeld door onze betalingsverwerkers: [Paddle.com](https://www.paddle.com) (directe aankopen) en [Apple](https://www.apple.com/legal/privacy/) (App Store-aankopen). Raadpleeg hun privacybeleid voor details.

Voor App Store-aankopen stuurt Zush StoreKit-product- en transactie-ID's naar de Zush-backend om PRO-rechten te verifiëren, aankopen te herstellen, misbruik te voorkomen en accountstatus te onderhouden.

### 2. Hoe we je informatie gebruiken

We gebruiken de verzamelde informatie om:

- de Dienst te leveren en te onderhouden.
- je PRO-licentie te verwerken en te verifiëren.
- bestanden met AI te analyseren om beschrijvende bestandsnamen, tags en metadata te genereren.
- aangepaste hernoem- of tagginginstructies toe te passen die je kiest te verstrekken.
- technische meldingen, updates en supportberichten te sturen.

### 3. Gegevensverwerking en AI

Zush stuurt bestandsanalyse-payloads naar externe AI-diensten voor analyse:

- **Standaardflow:** bestandsanalyseverzoeken worden via Zush-servers verzonden naar Groq (primair) en Google Gemini (fallback).
- **Bring Your Own Key (BYOK):** PRO-gebruikers kunnen eigen API-sleutels configureren voor Groq, Google Gemini, OpenAI of Anthropic Claude. BYOK-sleutels worden lokaal opgeslagen in macOS Keychain. In BYOK-modus wordt de sleutel alleen naar de Zush-backend en de gekozen AI-provider verzonden om de sleutel te valideren en AI-verzoeken te verwerken. De Zush-backend slaat BYOK API-sleutels niet permanent op.
- **Offline AI-modus:** PRO-gebruikers kunnen ondersteunde bestanden verwerken met private lokale modellen via Ollama. In Offline AI wordt bestandsanalyse-inhoud verwerkt op het apparaat van de gebruiker en niet naar Zush-servers of externe AI-providers gestuurd voor analyse. Zush kan nog steeds backenddiensten contacteren voor licenties, updates, support of operationele controles zonder inhoud.

**Wat wordt verzonden in Cloud- en BYOK-modi:** afhankelijk van het bestandstype kan dit een gecomprimeerde preview-afbeelding, geëxtraheerde documenttekst of compacte inhoudssamenvatting omvatten, samen met MIME-type, bestandsextensie, taalvoorkeur, regenerate- en BYOK-instellingen, een anonieme apparaat-ID en aangepaste hernoem- of taggingprompts die je indient. Sommige verzoeken kunnen ook basale bestandsmetadata bevatten, zoals de bestandsnaam, om betere suggesties te genereren.

**Wat niet automatisch wordt verzonden:** originele inhoud in volledige resolutie en lokale maplocaties worden niet als aparte velden verzonden. Als persoonlijke informatie echter voorkomt in een preview, geëxtraheerde tekst of aangepaste prompt, kan die informatie als onderdeel van het verzoek worden verwerkt.

**Gegevensbewaring:** previews, geëxtraheerde tekst, samenvattingen en aangepaste prompts worden verwerkt voor realtime analyse. Zush slaat bestandsinhoud na verwerking niet op als onderdeel van normale werking en slaat aangepaste prompts niet bewust op als appfunctie. Ingezonden gegevens kunnen nog wel door externe AI-providers worden verwerkt of bewaard volgens hun eigen voorwaarden. Je bestandsinhoud en prompttekst worden niet door Zush gebruikt om onze eigen modellen te trainen.

### 4. Derde partijen

We delen gegevens met de volgende dienstverleners:

- **AI-providers:** Groq (primair), Google Gemini (fallback). Met BYOK: optioneel OpenAI of Anthropic Claude.
- **Lokale AI-runtime:** Ollama, als je Offline AI installeert en inschakelt. Ollama draait op je apparaat en wordt beheerd door je lokale Ollama-installatie.
- **Cloudinfrastructuur:** Supabase (backenddatabase, licenties en API-relay).
- **Betalingsverwerkers:** [Paddle.com](https://www.paddle.com) (directe aankopen), [Apple](https://www.apple.com/legal/privacy/) (App Store-aankopen).
- **Fouttracking:** Sentry (anonieme crash- en foutrapporten).
- **Gebruiksanalyse:** TelemetryDeck (privacygerichte productanalytics).

Elke derde partij verwerkt gegevens volgens haar eigen privacybeleid. We raden je aan die te bekijken.

### 5. Gegevensbeveiliging

We nemen redelijke beveiligingsmaatregelen om je informatie te beschermen tegen ongeautoriseerde toegang, openbaarmaking of vernietiging. BYOK API-sleutels worden lokaal opgeslagen in macOS Keychain en niet permanent in de Zush-backend. Wanneer BYOK wordt gebruikt, wordt de sleutel alleen verzonden wanneer nodig om de sleutel te valideren en het verzoek bij de gekozen provider te voltooien. Geen enkele methode voor internetoverdracht of elektronische opslag is echter 100% veilig.

### 6. Je rechten

Afhankelijk van je locatie kun je rechten hebben onder gegevensbeschermingswetten (zoals AVG/GDPR of CCPA), waaronder het recht op inzage, correctie of verwijdering van je persoonsgegevens. Neem contact met ons op om deze rechten uit te oefenen.

### 7. Wijzigingen in dit beleid

We kunnen dit privacybeleid van tijd tot tijd bijwerken. De datum "Laatst bijgewerkt" geeft de meest recente wijzigingen weer.

### 8. Contact

Als je vragen hebt over dit privacybeleid, neem contact op via: [support@zushapp.com](mailto:support@zushapp.com)`,
    '/terms-of-service': `Welkom bij Zush. Deze Servicevoorwaarden ("Voorwaarden") regelen je gebruik van de Zush-applicatie voor macOS en Windows ("Dienst"), geleverd door Kirill Isachenko ("wij", "ons" of "onze"). Door Zush te downloaden, installeren of gebruiken, ga je akkoord met deze Voorwaarden.

Laatst bijgewerkt: 26 april 2026

### 1. Beschrijving van de Dienst

Zush is een desktoptool voor macOS en Windows die gebruikers helpt bestanden te organiseren, hernoemen en metadata te beheren met kunstmatige intelligentie (AI). Functies omvatten automatische hernoeming voor afbeeldingen en ondersteunde documenten inclusief PDF's, slimme metadatatags (Finder-tags op macOS, bestandseigenschappen op Windows en Spotlight-metadata), mapbewaking, optionele aangepaste AI-promptinstellingen voor hernoeming en tagging, BYOK-cloudverwerking en Offline AI met private lokale modellen via Ollama.

### 2. Softwarelicentie

We verlenen je een persoonlijke, niet-exclusieve, niet-overdraagbare, beperkte licentie om Zush te gebruiken op macOS- of Windows-apparaten die je bezit of beheert, onder deze Voorwaarden.

### 3. Aankopen en betalingen

**3.1 🌟 PRO-versie**
Zush biedt een "🌟 PRO"-upgrade met kredietgebaseerde toegang tot AI-hernoemingen, bewaking van meerdere mappen en geavanceerde metadatafuncties. Eén credit is gelijk aan één hernoeming. Actuele prijzen worden in de app en op de website getoond.

**3.2 Prijsplannen**
We bieden een eenmalig aankoopmodel:

- **Zush Free**: 50 credits inbegrepen. Eén credit is gelijk aan één hernoeming.
- **Zush PRO**: eenmalige aankoop van $10. Bevat 10.000 credits en toegang tot BYOK (Bring Your Own Key) voor onbeperkte cloudhernoemingen en Offline AI met private lokale modellen via Ollama.

Credits zijn eenmalig en worden niet gereset. Zodra credits op zijn, kunnen PRO-gebruikers BYOK inschakelen om met hun eigen API-sleutel onbeperkt cloudhernoemingen te doen of Offline AI gebruiken waar ondersteund.

**3.3 Gebruikslimieten**
Zowel gratis als PRO-versies hebben gebruikslimieten voor AI-gestuurde cloudfuncties. Actuele limieten worden in de applicatie getoond. PRO-gebruikers die hun credits opgebruiken, kunnen BYOK gebruiken voor onbeperkte cloudhernoemingen of Offline AI waar ondersteund.

**3.5 Merchant of Record**
Ons bestelproces wordt uitgevoerd door onze online reseller [Paddle.com](https://www.paddle.com). Paddle is de Merchant of Record voor al onze bestellingen. Paddle verzorgt klantenservice en retouren.

**3.6 Terugbetalingen**
Terugbetalingsverzoeken worden door Paddle behandeld volgens ons [terugbetalingsbeleid](/refund-policy).

### 4. AI-functies en nauwkeurigheid

Zush gebruikt kunstmatige intelligentie om bestanden te analyseren en suggesties voor namen en metadata te genereren.

- Verantwoordelijkheid van de gebruiker: omdat AI soms incorrecte of onverwachte resultaten kan produceren, ben jij verantwoordelijk voor het controleren en verifiëren van wijzigingen die de Dienst aan je bestanden aanbrengt.
- Door gebruiker verstrekte instructies: als je aangepaste hernoemprompts, taggingprompts of andere prompttekst invoert, worden die instructies verwerkt met het analyseverzoek. In Cloud- of BYOK-modi betekent dit dat ze via Zush-backend naar de relevante AI-provider worden gestuurd. In Offline AI worden ze door je lokale model verwerkt.
- Lokale AI: als je Offline AI inschakelt, ben jij verantwoordelijk voor het installeren, uitvoeren, bijwerken en kiezen van lokale Ollama-modellen. Kwaliteit, snelheid, opslaggebruik en beschikbaarheid hangen af van je apparaat en Ollama-installatie.
- Geen garantie: we garanderen niet de absolute nauwkeurigheid, volledigheid of betrouwbaarheid van informatie die door AI-functies wordt gegenereerd.

### 5. Gebruikslimieten en fair use

De gratis versie van Zush bevat gebruikslimieten (bijv. een beperkt aantal AI-verwerkte bestanden). We behouden ons het recht voor gebruik te monitoren en accounts te schorsen die proberen deze limieten te omzeilen of misbruik vertonen.

### 6. Intellectueel eigendom

Alle rechten, titels en belangen in Zush (met uitzondering van door gebruikers verstrekte inhoud) blijven exclusief eigendom van Kirill Isachenko. "Zush" en bijbehorende logo's zijn handelsmerken van Kirill Isachenko.

### 7. Gebruikersgedrag

Je stemt ermee in om niet:

- de applicatie te reverse engineeren, decompileren of disassembleren.
- de Dienst voor illegale doeleinden te gebruiken.
- ongeautoriseerde toegang te proberen tot onze backenddiensten of licentiesystemen.

### 8. Beperking van aansprakelijkheid

VOOR ZOVER WETTELIJK TOEGESTAAN IS KIRILL ISACHENKO NIET AANSPRAKELIJK VOOR INDIRECTE, INCIDENTELE, SPECIALE, GEVOLG- OF PUNITIEVE SCHADE, WINST- OF OMZETVERLIES, OF GEGEVENSVERLIES (INCLUSIEF BESTANDSVERLIES OF -CORRUPTIE) ALS GEVOLG VAN JE GEBRUIK VAN DE DIENST.

### 9. Afwijzing van garanties

DE DIENST WORDT GELEVERD "AS IS" EN "AS AVAILABLE" ZONDER GARANTIES VAN WELKE AARD DAN OOK, UITDRUKKELIJK OF IMPLICIET.

### 10. Toepasselijk recht

Deze Voorwaarden worden beheerst door en geïnterpreteerd volgens de wetten van Thailand, Phuket, zonder rekening te houden met conflictenrechtelijke beginselen.

### 11. Wijzigingen in de Voorwaarden

We kunnen deze Voorwaarden van tijd tot tijd bijwerken. We informeren je over wijzigingen door de datum "Laatst bijgewerkt" bovenaan dit document te wijzigen of via een melding in de app.

### 12. Contactgegevens

Als je vragen hebt over deze Voorwaarden, neem contact op via: [support@zushapp.com](mailto:support@zushapp.com)`,
    '/refund-policy': `We willen dat je tevreden bent met Zush. Als je niet tevreden bent, helpen we je graag.

### Eenmalige aankoop

Zush PRO is een eenmalige aankoop met levenslange toegang. We bieden een geld-terug-garantie van 14 dagen vanaf je aankoopdatum.

### Hoe vraag je een terugbetaling aan

Vraag een terugbetaling aan via [refund@zushapp.com](mailto:refund@zushapp.com) met je ordernummer en het e-mailadres dat je voor de aankoop hebt gebruikt.

### Verwerking van terugbetalingen

Zodra je terugbetalingsverzoek is ontvangen en goedgekeurd, verwerken we het en wordt er automatisch een bedrag teruggestort op je oorspronkelijke betaalmethode binnen een aantal dagen, afhankelijk van het beleid van je kaartuitgever.

### Wijzigingen in dit beleid

We behouden ons het recht voor dit terugbetalingsbeleid op elk moment te wijzigen. Wijzigingen worden op deze pagina geplaatst met een bijgewerkte datum "Laatst bijgewerkt".`,
  },
  it: {
    '/privacy-policy': `Questa Informativa sulla privacy spiega come Zush ("Kirill Isachenko", "noi" o "nostro") raccoglie, usa e protegge le tue informazioni quando usi la nostra applicazione macOS e i servizi correlati.

Ultimo aggiornamento: 27 aprile 2026

### 1. Informazioni che raccogliamo

**1.1 Dati del contenuto dei file**
Per fornire funzioni di organizzazione e rinomina basate su IA, Zush elabora i file che selezioni o monitori:

- **File visivi** come immagini, anteprime RAW, SVG e alcuni PDF possono essere convertiti in un’immagine di anteprima compressa prima dell’analisi.
- **Documenti supportati** come file di testo, email, fogli di calcolo, presentazioni e alcuni PDF possono essere analizzati usando testo estratto o un riepilogo compatto generato sul tuo dispositivo prima dell’invio della richiesta.

I file originali a piena risoluzione non lasciano il tuo dispositivo durante il normale funzionamento cloud. Se abiliti la modalità IA offline, l’analisi dei file supportati avviene tramite modelli locali privati via Ollama invece che tramite cloud Zush o provider IA di terze parti.

**1.2 Dati di prompt e istruzioni**
Se usi l’editor di prompt IA o altre funzioni di personalizzazione, il testo dei prompt personalizzati per rinomina e tagging che inserisci viene inviato con la richiesta di analisi affinché il provider IA possa seguire le tue istruzioni.

**1.3 Identificatore del dispositivo**
Un identificatore anonimo del dispositivo (UUID macchina) viene inviato con ogni richiesta di analisi per tracciamento dell’uso, rate limiting e applicazione della licenza. Questo identificatore non contiene informazioni personali.

**1.4 Dati di licenza e uso**
Raccogliamo le informazioni necessarie per gestire la licenza e applicare i limiti d’uso:

- Indirizzo email: fornito durante il processo di acquisto.
- Stato licenza: informazioni sulla licenza PRO (acquisto una tantum).
- Conteggi d’uso: tracciamo il numero di file elaborati con IA per gestire i limiti.

**1.5 Informazioni di pagamento**
Non memorizziamo né elaboriamo i dati della tua carta di credito. Tutti i pagamenti sono gestiti in modo sicuro dai nostri processori: [Paddle.com](https://www.paddle.com) (acquisti diretti) e [Apple](https://www.apple.com/legal/privacy/) (acquisti App Store). Consulta le rispettive informative privacy per dettagli.

Per gli acquisti App Store, Zush invia identificatori di prodotto e transazione StoreKit al backend Zush per verificare il diritto PRO, ripristinare acquisti, prevenire abusi e mantenere lo stato dell’account.

### 2. Come usiamo le tue informazioni

Usiamo le informazioni raccolte per:

- fornire e mantenere il Servizio.
- elaborare e verificare la tua licenza PRO.
- analizzare file con IA per generare nomi descrittivi, tag e metadati.
- applicare istruzioni personalizzate di rinomina o tagging che scegli di fornire.
- inviarti avvisi tecnici, aggiornamenti e messaggi di supporto.

### 3. Elaborazione dati e IA

Zush invia payload di analisi dei file a servizi IA di terze parti:

- **Flusso predefinito:** le richieste di analisi vengono inviate tramite server Zush a Groq (primario) e Google Gemini (fallback).
- **Bring Your Own Key (BYOK):** gli utenti PRO possono configurare le proprie chiavi API per Groq, Google Gemini, OpenAI o Anthropic Claude. Le chiavi BYOK sono archiviate localmente nel Portachiavi macOS. In modalità BYOK, la chiave viene inviata al backend Zush e al provider IA selezionato solo per validare la chiave ed elaborare le richieste IA. Il backend Zush non memorizza permanentemente le chiavi API BYOK.
- **Modalità IA offline:** gli utenti PRO possono elaborare file supportati con modelli locali privati via Ollama. In modalità IA offline, il contenuto di analisi viene elaborato sul dispositivo dell’utente e non viene inviato ai server Zush o a provider IA di terze parti per l’analisi. Zush può comunque contattare servizi backend per licenze, aggiornamenti, supporto o controlli operativi non legati al contenuto.

**Cosa viene inviato nelle modalità Cloud e BYOK:** a seconda del tipo di file, può includere un’immagine di anteprima compressa, testo estratto dal documento o un riepilogo compatto del contenuto, insieme a tipo MIME, estensione, preferenza lingua, impostazioni regenerate e BYOK, identificatore anonimo del dispositivo e qualsiasi prompt personalizzato di rinomina o tagging inviato. Alcune richieste possono includere anche metadati di base come il nome del file per generare suggerimenti migliori.

**Cosa non viene inviato automaticamente:** contenuti originali a piena risoluzione e percorsi locali delle cartelle non vengono inviati come campi separati. Tuttavia, se informazioni personali appaiono in un’anteprima, nel testo estratto o in un prompt personalizzato, tali informazioni possono essere elaborate come parte della richiesta.

**Conservazione dati:** anteprime, testi estratti, riepiloghi e prompt personalizzati sono elaborati per analisi in tempo reale. Zush non memorizza il contenuto dei file dopo l’elaborazione nel normale funzionamento e non memorizza intenzionalmente i prompt personalizzati come funzione dell’app. I dati inviati possono comunque essere elaborati o conservati da provider IA di terze parti secondo i loro termini. Il contenuto dei file e dei prompt non viene usato da Zush per addestrare i nostri modelli.

### 4. Servizi di terze parti

Condividiamo dati con i seguenti fornitori:

- **Provider IA:** Groq (primario), Google Gemini (fallback). Con BYOK: opzionalmente OpenAI o Anthropic Claude.
- **Runtime IA locale:** Ollama, se installi e abiliti la modalità IA offline. Ollama gira sul tuo dispositivo ed è gestito dalla tua installazione locale.
- **Infrastruttura cloud:** Supabase (database backend, licenze e relay API).
- **Processori di pagamento:** [Paddle.com](https://www.paddle.com) (acquisti diretti), [Apple](https://www.apple.com/legal/privacy/) (acquisti App Store).
- **Tracciamento errori:** Sentry (report anonimi di crash ed errori).
- **Analytics d’uso:** TelemetryDeck (analytics prodotto orientate alla privacy).

Ogni fornitore terzo elabora i dati secondo la propria informativa privacy. Ti invitiamo a consultarle.

### 5. Sicurezza dei dati

Implementiamo misure di sicurezza ragionevoli per proteggere le tue informazioni da accesso, divulgazione o distruzione non autorizzati. Le chiavi API BYOK sono archiviate localmente nel Portachiavi macOS e non sono memorizzate permanentemente nel backend Zush. Quando si usa BYOK, la chiave viene trasmessa solo quando necessario per validarla e completare la richiesta al provider selezionato. Tuttavia, nessun metodo di trasmissione via Internet o archiviazione elettronica è sicuro al 100%.

### 6. I tuoi diritti

A seconda della tua posizione, potresti avere diritti ai sensi delle leggi sulla protezione dati (come GDPR o CCPA), incluso il diritto di accedere, correggere o eliminare i tuoi dati personali. Per esercitare questi diritti, contattaci.

### 7. Modifiche a questa informativa

Possiamo aggiornare questa Informativa sulla privacy di tanto in tanto. La data "Ultimo aggiornamento" rifletterà le modifiche più recenti.

### 8. Contattaci

Se hai domande su questa Informativa sulla privacy, contattaci a: [support@zushapp.com](mailto:support@zushapp.com)`,
    '/terms-of-service': `Benvenuto in Zush. Questi Termini di servizio ("Termini") regolano l’uso dell’applicazione Zush per macOS e Windows ("Servizio"), fornita da Kirill Isachenko ("noi" o "nostro"). Scaricando, installando o usando Zush, accetti questi Termini.

Ultimo aggiornamento: 26 aprile 2026

### 1. Descrizione del Servizio

Zush è un’utilità desktop per macOS e Windows progettata per aiutare gli utenti a organizzare, rinominare e gestire metadati dei file usando intelligenza artificiale (IA). Le funzioni includono rinomina automatica per immagini e documenti supportati, inclusi PDF, tagging intelligente dei metadati (tag Finder su macOS, proprietà file su Windows e metadati Spotlight), monitoraggio cartelle, controlli opzionali di prompt IA personalizzati per rinomina e tagging, elaborazione cloud BYOK e modalità IA offline con modelli locali privati via Ollama.

### 2. Licenza software

Ti concediamo una licenza personale, non esclusiva, non trasferibile e limitata per usare Zush su dispositivi macOS o Windows che possiedi o controlli, soggetta a questi Termini.

### 3. Acquisti e pagamenti

**3.1 Versione 🌟 PRO**
Zush offre un upgrade "🌟 PRO" che fornisce accesso basato su crediti a rinomine IA, monitoraggio di più cartelle e funzioni avanzate di metadati. Un credito equivale a una rinomina. I prezzi correnti sono mostrati nell’app e sul sito.

**3.2 Piani tariffari**
Offriamo un modello di acquisto una tantum:

- **Zush Free**: 50 crediti inclusi. Un credito equivale a una rinomina.
- **Zush PRO**: acquisto una tantum di $10. Include 10.000 crediti e accesso a BYOK (Bring Your Own Key) per rinomine cloud illimitate e modalità IA offline con modelli locali privati via Ollama.

I crediti sono una tantum e non si azzerano. Una volta esauriti, gli utenti PRO possono abilitare BYOK per continuare con la propria chiave API per rinomine cloud illimitate o usare la modalità IA offline dove supportata.

**3.3 Limiti d’uso**
Le versioni gratuita e PRO hanno limiti d’uso per le funzioni cloud con IA. I limiti correnti sono mostrati nell’applicazione. Gli utenti PRO che esauriscono i crediti possono usare BYOK per rinomine cloud illimitate o la modalità IA offline dove supportata.

**3.5 Merchant of Record**
Il processo d’ordine è gestito dal nostro rivenditore online [Paddle.com](https://www.paddle.com). Paddle è il Merchant of Record per tutti gli ordini. Paddle fornisce assistenza clienti e gestisce i resi.

**3.6 Rimborsi**
Le richieste di rimborso sono gestite da Paddle in conformità alla nostra [politica di rimborso](/refund-policy).

### 4. Funzioni IA e accuratezza

Zush usa intelligenza artificiale per analizzare file e generare suggerimenti per nomi e metadati.

- Responsabilità dell’utente: poiché l’IA può occasionalmente produrre risultati errati o inattesi, sei responsabile di revisionare e verificare qualsiasi modifica apportata dal Servizio ai tuoi file.
- Istruzioni fornite dall’utente: se inserisci prompt personalizzati di rinomina, tagging o altro testo di personalizzazione, tali istruzioni sono elaborate con la richiesta di analisi. In modalità Cloud o BYOK, ciò significa inviarle tramite l’infrastruttura backend Zush al provider IA rilevante. In modalità IA offline, sono elaborate dal tuo modello locale.
- IA locale: se abiliti la modalità IA offline, sei responsabile di installare, eseguire, aggiornare e scegliere i tuoi modelli locali Ollama. Qualità, velocità, uso dello spazio e disponibilità dipendono dal tuo dispositivo e dalla tua installazione Ollama.
- Nessuna garanzia: non garantiamo l’accuratezza, completezza o affidabilità assoluta delle informazioni generate dalle funzioni IA.

### 5. Limiti d’uso e fair use

La versione gratuita di Zush include limiti d’uso (ad esempio un numero limitato di file elaborati con IA). Ci riserviamo il diritto di monitorare l’uso e sospendere account che tentano di aggirare questi limiti o adottano comportamenti abusivi.

### 6. Proprietà intellettuale

Tutti i diritti, titoli e interessi su Zush (esclusi i contenuti forniti dagli utenti) rimarranno proprietà esclusiva di Kirill Isachenko. "Zush" e i loghi associati sono marchi di Kirill Isachenko.

### 7. Condotta dell’utente

Accetti di non:

- effettuare reverse engineering, decompilare o disassemblare l’applicazione.
- usare il Servizio per scopi illegali.
- tentare di ottenere accesso non autorizzato ai nostri servizi backend o sistemi di licenza.

### 8. Limitazione di responsabilità

NELLA MASSIMA MISURA CONSENTITA DALLA LEGGE, KIRILL ISACHENKO NON SARÀ RESPONSABILE PER DANNI INDIRETTI, INCIDENTALI, SPECIALI, CONSEQUENZIALI O PUNITIVI, O PER PERDITA DI PROFITTI O RICAVI, O PER PERDITA DI DATI (INCLUSA PERDITA O CORRUZIONE DI FILE), DERIVANTI DALL’USO DEL SERVIZIO.

### 9. Esclusione di garanzie

IL SERVIZIO È FORNITO "COSÌ COM’È" E "COME DISPONIBILE" SENZA GARANZIE DI ALCUN TIPO, ESPRESSE O IMPLICITE.

### 10. Legge applicabile

Questi Termini saranno regolati e interpretati secondo le leggi della Thailandia, Phuket, senza riguardo ai principi di conflitto di leggi.

### 11. Modifiche ai Termini

Possiamo aggiornare questi Termini di tanto in tanto. Ti informeremo di eventuali modifiche aggiornando la data "Ultimo aggiornamento" in cima a questo documento o tramite notifica in-app.

### 12. Informazioni di contatto

Se hai domande su questi Termini, contattaci a: [support@zushapp.com](mailto:support@zushapp.com)`,
    '/refund-policy': `Vogliamo che tu sia soddisfatto di Zush. Se non lo sei, siamo qui per aiutarti.

### Acquisto una tantum

Zush PRO è un acquisto una tantum con accesso a vita. Offriamo una garanzia di rimborso di 14 giorni dalla data di acquisto.

### Come richiedere un rimborso

Per richiedere un rimborso, contattaci a [refund@zushapp.com](mailto:refund@zushapp.com) con il numero d’ordine e l’indirizzo email usato per l’acquisto.

### Elaborazione dei rimborsi

Una volta ricevuta e approvata la richiesta, la elaboreremo e un credito sarà applicato automaticamente al metodo di pagamento originale entro un certo numero di giorni, in base alle politiche dell’emittente della carta.

### Modifiche a questa politica

Ci riserviamo il diritto di modificare questa politica di rimborso in qualsiasi momento. Ogni modifica sarà pubblicata su questa pagina con una data "Ultimo aggiornamento" aggiornata.`,
  },
  ja: {
    '/privacy-policy': `このプライバシーポリシーは、Zush（"Kirill Isachenko"、"当社"、"私たち"）が、macOS アプリケーションおよび関連サービスの利用時に、どのように情報を収集、使用、保護するかを説明します。

最終更新日: 2026年4月27日

### 1. 収集する情報

**1.1 ファイル内容データ**
AI による整理・リネーム機能を提供するため、Zush はユーザーが選択または監視するファイルを処理します。

- **画像、RAW プレビュー、SVG、一部の PDF などの視覚ファイル**は、分析前に圧縮されたプレビュー画像へ変換される場合があります。
- **テキストファイル、メール、スプレッドシート、プレゼンテーション、一部の PDF などの対応ドキュメント**は、リクエスト送信前にデバイス上で生成される抽出テキストまたはコンパクトな内容要約を使って分析される場合があります。

通常のクラウド動作では、元のフル解像度ファイルがデバイス外へ送信されることはありません。オフライン AI モードを有効にした場合、対応ファイルの分析は Zush クラウドや第三者 AI プロバイダーではなく、Ollama 経由のプライベートなローカルモデルで実行されます。

**1.2 プロンプトおよび指示データ**
AI プロンプトエディタやその他のプロンプトカスタマイズ機能を使用する場合、入力したカスタムリネームプロンプトおよびタグ付けプロンプトは、AI プロバイダーが指示に従えるよう分析リクエストとともに送信されます。

**1.3 デバイス識別子**
匿名のデバイス識別子（machine UUID）が、利用状況の追跡、レート制限、ライセンス適用のために各分析リクエストとともに送信されます。この識別子には個人情報は含まれません。

**1.4 ライセンスおよび利用データ**
ライセンス管理と利用制限の適用に必要な情報を収集します。

- メールアドレス: 購入時に提供されます。
- ライセンス状態: PRO ライセンス（買い切り）に関する情報。
- 利用回数: 利用制限を管理するため、AI で処理されたファイル数を追跡します。

**1.5 支払い情報**
当社はクレジットカード情報を保存または処理しません。すべての支払いは、決済処理業者である [Paddle.com](https://www.paddle.com)（直接購入）および [Apple](https://www.apple.com/legal/privacy/)（App Store 購入）によって安全に処理されます。詳細は各社のプライバシーポリシーをご確認ください。

App Store 購入の場合、Zush は PRO 権限の確認、購入復元、不正防止、アカウント状態の維持のため、StoreKit の製品および取引識別子を Zush バックエンドに送信します。

### 2. 情報の利用方法

収集した情報は次の目的で使用します。

- サービスの提供および維持。
- PRO ライセンスの処理および確認。
- AI でファイルを分析し、説明的なファイル名、タグ、メタデータを生成すること。
- ユーザーが提供するカスタムリネームまたはタグ付け指示の適用。
- 技術通知、更新、サポートメッセージの送信。

### 3. データ処理と AI

Zush はファイル分析ペイロードを第三者 AI サービスへ送信します。

- **デフォルトフロー:** ファイル分析リクエストは Zush サーバー経由で Groq（主）および Google Gemini（フォールバック）へ送信されます。
- **Bring Your Own Key (BYOK):** PRO ユーザーは Groq、Google Gemini、OpenAI、Anthropic Claude 用の独自 API キーを設定できます。BYOK キーは macOS Keychain にローカル保存されます。BYOK モードでは、キーの検証と AI リクエスト処理に必要な場合にのみ、Zush バックエンドおよび選択された AI プロバイダーへ送信されます。Zush バックエンドは BYOK API キーを永続保存しません。
- **オフライン AI モード:** PRO ユーザーは Ollama 経由のプライベートなローカルモデルで対応ファイルを処理できます。オフライン AI モードでは、ファイル分析内容はユーザーのデバイス上で処理され、分析のために Zush サーバーや第三者 AI プロバイダーへ送信されません。Zush はライセンス、更新、サポート、内容を伴わない運用確認のためにバックエンドサービスへ接続する場合があります。

**Cloud および BYOK モードで送信される内容:** ファイル種別に応じて、圧縮プレビュー画像、抽出されたドキュメントテキスト、またはコンパクトな内容要約、MIME タイプ、拡張子、言語設定、再生成および BYOK 設定、匿名デバイス識別子、送信したカスタムリネームまたはタグ付けプロンプトが含まれる場合があります。より良い候補生成のため、ファイル名などの基本メタデータが含まれる場合もあります。

**自動的に送信されない内容:** 元のフル解像度ファイル内容およびローカルフォルダパスは個別フィールドとして送信されません。ただし、個人情報がプレビュー、抽出テキスト、またはカスタムプロンプト内に含まれる場合、その情報はリクエストの一部として処理される可能性があります。

**データ保持:** プレビュー、抽出テキスト、要約、カスタムプロンプトはリアルタイム分析のために処理されます。Zush は通常動作の一部として処理後のファイル内容を保存せず、カスタムプロンプトをアプリ機能として意図的に保存しません。送信データは第三者 AI プロバイダーの条件に従って処理または保持される場合があります。ファイル内容およびプロンプトテキストは、Zush が自社モデルの学習に使用することはありません。

### 4. 第三者サービス

当社は以下のサービス提供者とデータを共有します。

- **AI プロバイダー:** Groq（主）、Google Gemini（フォールバック）。BYOK では任意で OpenAI または Anthropic Claude。
- **ローカル AI ランタイム:** オフライン AI モードをインストールして有効にした場合の Ollama。Ollama はユーザーのデバイス上で動作し、ローカルの Ollama インストールにより管理されます。
- **クラウドインフラ:** Supabase（バックエンドデータベース、ライセンス、API リレー）。
- **決済処理業者:** [Paddle.com](https://www.paddle.com)（直接購入）、[Apple](https://www.apple.com/legal/privacy/)（App Store 購入）。
- **エラートラッキング:** Sentry（匿名のクラッシュおよびエラーレポート）。
- **利用分析:** TelemetryDeck（プライバシー重視のプロダクト分析）。

各第三者プロバイダーは、それぞれのプライバシーポリシーに従ってデータを処理します。各ポリシーの確認を推奨します。

### 5. データセキュリティ

当社は、不正アクセス、開示、破壊から情報を保護するために合理的なセキュリティ対策を実施します。BYOK API キーは macOS Keychain にローカル保存され、Zush バックエンドには永続保存されません。BYOK 使用時、キーは検証および選択されたプロバイダーへのリクエスト完了に必要な場合にのみ送信されます。ただし、インターネット送信または電子保存の方法が 100% 安全であるとは限りません。

### 6. ユーザーの権利

所在地によっては、GDPR や CCPA などのデータ保護法に基づき、個人データへのアクセス、訂正、削除などの権利を有する場合があります。これらの権利を行使するには当社までご連絡ください。

### 7. 本ポリシーの変更

当社はこのプライバシーポリシーを随時更新する場合があります。"最終更新日" は最新の変更を反映します。

### 8. お問い合わせ

このプライバシーポリシーに関する質問は、[support@zushapp.com](mailto:support@zushapp.com) までご連絡ください。`,
    '/terms-of-service': `Zush へようこそ。本利用規約（"規約"）は、Kirill Isachenko（"当社"、"私たち"）が提供する macOS および Windows 向け Zush アプリケーション（"サービス"）の利用を規定します。Zush をダウンロード、インストール、または使用することで、本規約に同意したものとみなされます。

最終更新日: 2026年4月26日

### 1. サービスの説明

Zush は、人工知能（AI）を使ってファイルの整理、リネーム、メタデータ管理を支援する macOS および Windows 向けデスクトップユーティリティです。機能には、画像および PDF を含む対応ドキュメントの自動リネーム、スマートメタデータタグ付け（macOS の Finder タグ、Windows のファイルプロパティ、Spotlight メタデータ）、フォルダ監視、リネームおよびタグ付け動作のための任意のカスタム AI プロンプト制御、BYOK クラウド処理、Ollama 経由のプライベートなローカルモデルによるオフライン AI モードが含まれます。

### 2. ソフトウェアライセンス

当社は、本規約に従い、ユーザーが所有または管理する macOS または Windows デバイス上で Zush を使用するための、個人的、非独占的、譲渡不可、限定的なライセンスを付与します。

### 3. 購入と支払い

**3.1 🌟 PRO バージョン**
Zush は、AI リネーム、複数フォルダの監視、高度なメタデータ機能へのクレジットベースのアクセスを提供する "🌟 PRO" アップグレードを提供します。1 クレジットは 1 リネームに相当します。現在の価格はアプリおよびウェブサイトに表示されます。

**3.2 料金プラン**
当社は買い切りモデルを提供します。

- **Zush Free**: 50 クレジットを含みます。1 クレジットは 1 リネームです。
- **Zush PRO**: $10 の買い切り。10,000 クレジット、および無制限のクラウドリネーム用 BYOK（Bring Your Own Key）と Ollama 経由のプライベートなローカルモデルによるオフライン AI モードへのアクセスを含みます。

クレジットは一回限りでリセットされません。クレジットを使い切った場合、PRO ユーザーは BYOK を有効にして自身の API キーで無制限のクラウドリネームを継続するか、対応している場合はオフライン AI モードを使用できます。

**3.3 利用制限**
無料版および PRO 版には、AI クラウド機能の利用制限があります。現在の制限はアプリ内に表示されます。クレジットを使い切った PRO ユーザーは、BYOK による無制限のクラウドリネーム、または対応している場合はオフライン AI モードを利用できます。

**3.5 Merchant of Record**
注文処理はオンラインリセラー [Paddle.com](https://www.paddle.com) によって行われます。Paddle はすべての注文の Merchant of Record です。Paddle はカスタマーサービス問い合わせおよび返品を処理します。

**3.6 返金**
返金リクエストは、当社の [返金ポリシー](/refund-policy) に従い Paddle によって処理されます。

### 4. AI 機能と正確性

Zush は人工知能を使ってファイルを分析し、名前およびメタデータの候補を生成します。

- ユーザーの責任: AI は時に不正確または予期しない結果を生成する可能性があるため、サービスがファイルに加える変更を確認・検証する責任はユーザーにあります。
- ユーザー提供の指示: カスタムリネームプロンプト、タグ付けプロンプト、その他のカスタマイズテキストを入力した場合、それらの指示は分析リクエストとともに処理されます。Cloud または BYOK モードでは、Zush バックエンド経由で該当 AI プロバイダーに送信されます。オフライン AI モードではローカルモデルで処理されます。
- ローカル AI: オフライン AI モードを有効にする場合、ローカル Ollama モデルのインストール、実行、更新、選択はユーザーの責任です。ローカルモデルの品質、速度、ストレージ使用量、可用性はデバイスと Ollama インストールに依存します。
- 無保証: AI 機能によって生成される情報の絶対的な正確性、完全性、信頼性を保証しません。

### 5. 利用制限とフェアユース

Zush の無料版には利用制限（例: AI 処理ファイル数の制限）が含まれます。当社は利用状況を監視し、制限を回避しようとする、または不正利用を行うアカウントを停止する権利を留保します。

### 6. 知的財産

Zush に関するすべての権利、権原、利益（ユーザー提供コンテンツを除く）は Kirill Isachenko の独占的財産として残ります。"Zush" および関連ロゴは Kirill Isachenko の商標です。

### 7. ユーザーの行為

ユーザーは以下を行わないことに同意します。

- アプリケーションのリバースエンジニアリング、逆コンパイル、逆アセンブル。
- 違法な目的でサービスを使用すること。
- バックエンドサービスまたはライセンスシステムへ不正アクセスを試みること。

### 8. 責任の制限

法律で認められる最大限の範囲において、KIRILL ISACHENKO は、サービス利用に起因する間接的、偶発的、特別、結果的、懲罰的損害、利益または収益の損失、データ損失（ファイルの喪失または破損を含む）について責任を負いません。

### 9. 保証の否認

サービスは、明示または黙示を問わず、いかなる保証もなく、"現状有姿" および "提供可能な範囲" で提供されます。

### 10. 準拠法

本規約は、抵触法の原則にかかわらず、タイ王国プーケットの法律に準拠し、解釈されます。

### 11. 規約の変更

当社は本規約を随時更新する場合があります。変更は、この文書上部の "最終更新日" を更新するか、アプリ内通知によって知らせます。

### 12. 連絡先

本規約に関する質問は、[support@zushapp.com](mailto:support@zushapp.com) までご連絡ください。`,
    '/refund-policy': `Zush に満足していただきたいと考えています。満足いただけない場合はサポートします。

### 買い切り購入

Zush PRO は生涯アクセス付きの買い切り購入です。購入日から 14 日間の返金保証を提供します。

### 返金の申請方法

返金を希望する場合は、注文番号と購入時に使用したメールアドレスを添えて [refund@zushapp.com](mailto:refund@zushapp.com) までご連絡ください。

### 返金処理

返金リクエストを受領し承認した後、処理を行います。カード発行会社のポリシーに応じて、一定の日数内に元の支払い方法へ自動的に返金されます。

### 本ポリシーの変更

当社はこの返金ポリシーをいつでも変更する権利を留保します。変更は、このページに更新された "最終更新日" とともに掲載されます。`,
  },
  ko: {
    '/privacy-policy': `이 개인정보 처리방침은 Zush("Kirill Isachenko", "당사", "우리")가 macOS 애플리케이션 및 관련 서비스를 사용할 때 정보를 수집, 사용, 보호하는 방식을 설명합니다.

최종 업데이트: 2026년 4월 27일

### 1. 수집하는 정보

**1.1 파일 콘텐츠 데이터**
AI 기반 정리 및 이름 변경 기능을 제공하기 위해 Zush는 사용자가 선택하거나 모니터링하는 파일을 처리합니다.

- **이미지, RAW 미리보기, SVG, 일부 PDF 같은 시각 파일**은 분석 전에 압축된 미리보기 이미지로 변환될 수 있습니다.
- **텍스트 파일, 이메일, 스프레드시트, 프레젠테이션, 일부 PDF 같은 지원 문서**는 요청 전송 전에 기기에서 생성된 추출 텍스트 또는 간결한 콘텐츠 요약을 사용해 분석될 수 있습니다.

일반적인 클라우드 작업에서 원본 전체 해상도 파일은 기기를 떠나지 않습니다. 오프라인 AI 모드를 활성화하면 지원 파일 분석은 Zush 클라우드나 타사 AI 제공자가 아니라 Ollama를 통한 개인 로컬 모델에서 실행됩니다.

**1.2 프롬프트 및 지시 데이터**
AI 프롬프트 편집기 또는 기타 프롬프트 사용자 지정 기능을 사용하는 경우, 입력한 사용자 지정 이름 변경 프롬프트와 태그 프롬프트가 분석 요청과 함께 전송되어 AI 제공자가 지시를 따를 수 있습니다.

**1.3 기기 식별자**
익명 기기 식별자(machine UUID)가 사용 추적, 속도 제한, 라이선스 적용을 위해 각 분석 요청과 함께 전송됩니다. 이 식별자에는 개인 정보가 포함되지 않습니다.

**1.4 라이선스 및 사용 데이터**
라이선스를 관리하고 사용 제한을 적용하는 데 필요한 정보를 수집합니다.

- 이메일 주소: 구매 과정에서 제공됩니다.
- 라이선스 상태: PRO 라이선스(일회성 구매)에 대한 정보.
- 사용 횟수: 사용 제한 관리를 위해 AI 처리 파일 수를 추적합니다.

**1.5 결제 정보**
당사는 신용카드 정보를 저장하거나 처리하지 않습니다. 모든 결제는 결제 처리자인 [Paddle.com](https://www.paddle.com)(직접 구매) 및 [Apple](https://www.apple.com/legal/privacy/)(App Store 구매)을 통해 안전하게 처리됩니다. 자세한 내용은 각 개인정보 처리방침을 참고하세요.

App Store 구매의 경우 Zush는 PRO 권한 확인, 구매 복원, 남용 방지, 계정 상태 유지를 위해 StoreKit 제품 및 거래 식별자를 Zush 백엔드로 전송합니다.

### 2. 정보 사용 방법

수집한 정보는 다음 목적으로 사용됩니다.

- 서비스를 제공하고 유지합니다.
- PRO 라이선스를 처리하고 확인합니다.
- AI로 파일을 분석해 설명적인 파일 이름, 태그, 메타데이터를 생성합니다.
- 사용자가 제공하기로 선택한 사용자 지정 이름 변경 또는 태그 지시를 적용합니다.
- 기술 공지, 업데이트, 지원 메시지를 보냅니다.

### 3. 데이터 처리 및 AI

Zush는 파일 분석 payload를 타사 AI 서비스로 전송합니다.

- **기본 흐름:** 파일 분석 요청은 Zush 서버를 통해 Groq(기본) 및 Google Gemini(대체)로 전송됩니다.
- **Bring Your Own Key (BYOK):** PRO 사용자는 Groq, Google Gemini, OpenAI, Anthropic Claude용 자체 API 키를 구성할 수 있습니다. BYOK 키는 macOS Keychain에 로컬 저장됩니다. BYOK 모드에서 키는 키 검증 및 AI 요청 처리에 필요한 경우에만 Zush 백엔드와 선택한 AI 제공자에게 전송됩니다. Zush 백엔드는 BYOK API 키를 영구 저장하지 않습니다.
- **오프라인 AI 모드:** PRO 사용자는 Ollama를 통한 개인 로컬 모델로 지원 파일을 처리할 수 있습니다. 오프라인 AI 모드에서는 파일 분석 콘텐츠가 사용자의 기기에서 처리되며 분석을 위해 Zush 서버나 타사 AI 제공자에게 전송되지 않습니다. Zush는 라이선스, 업데이트, 지원 또는 콘텐츠가 아닌 운영 점검을 위해 백엔드 서비스에 계속 접속할 수 있습니다.

**Cloud 및 BYOK 모드에서 전송되는 항목:** 파일 유형에 따라 압축 미리보기 이미지, 추출된 문서 텍스트 또는 간결한 콘텐츠 요약, MIME 타입, 파일 확장자, 언어 설정, 재생성 및 BYOK 설정, 익명 기기 식별자, 제출한 사용자 지정 이름 변경 또는 태그 프롬프트가 포함될 수 있습니다. 더 나은 이름 제안을 생성하기 위해 파일 이름 같은 기본 파일 메타데이터가 포함될 수도 있습니다.

**자동으로 전송되지 않는 항목:** 원본 전체 해상도 파일 콘텐츠와 로컬 폴더 경로는 별도 필드로 전송되지 않습니다. 다만 개인 정보가 파일 미리보기, 추출 텍스트 또는 사용자 지정 프롬프트에 포함된 경우 해당 정보는 요청의 일부로 처리될 수 있습니다.

**데이터 보관:** 파일 미리보기, 추출 텍스트, 요약, 사용자 지정 프롬프트는 실시간 분석을 위해 처리됩니다. Zush는 일반 작업의 일부로 처리 후 파일 콘텐츠를 저장하지 않으며, 사용자 지정 프롬프트를 애플리케이션 기능으로 의도적으로 저장하지 않습니다. 제출된 데이터는 타사 AI 제공자의 자체 약관에 따라 처리 또는 보관될 수 있습니다. 파일 콘텐츠와 프롬프트 텍스트는 Zush가 자체 모델 학습에 사용하지 않습니다.

### 4. 타사 서비스

당사는 다음 서비스 제공자와 데이터를 공유합니다.

- **AI 제공자:** Groq(기본), Google Gemini(대체). BYOK 사용 시 선택적으로 OpenAI 또는 Anthropic Claude.
- **로컬 AI 런타임:** 오프라인 AI 모드를 설치하고 활성화한 경우 Ollama. Ollama는 사용자의 기기에서 실행되며 로컬 Ollama 설치에 의해 관리됩니다.
- **클라우드 인프라:** Supabase(백엔드 데이터베이스, 라이선스, API relay).
- **결제 처리자:** [Paddle.com](https://www.paddle.com)(직접 구매), [Apple](https://www.apple.com/legal/privacy/)(App Store 구매).
- **오류 추적:** Sentry(익명 크래시 및 오류 보고서).
- **사용 분석:** TelemetryDeck(개인정보 보호 중심 제품 분석).

각 타사 제공자는 자체 개인정보 처리방침에 따라 데이터를 처리합니다. 해당 정책을 검토하시기를 권장합니다.

### 5. 데이터 보안

당사는 무단 접근, 공개 또는 파괴로부터 정보를 보호하기 위해 합리적인 보안 조치를 시행합니다. BYOK API 키는 macOS Keychain에 로컬 저장되며 Zush 백엔드에 영구 저장되지 않습니다. BYOK 사용 시 키는 선택한 제공자 요청을 검증하고 완료하는 데 필요한 경우에만 전송됩니다. 그러나 인터넷 전송 또는 전자 저장 방식은 100% 안전하지 않습니다.

### 6. 귀하의 권리

위치에 따라 GDPR 또는 CCPA 같은 데이터 보호법에 따라 개인 데이터 접근, 수정, 삭제 권리 등을 가질 수 있습니다. 이러한 권리를 행사하려면 당사에 문의하세요.

### 7. 본 정책의 변경

당사는 이 개인정보 처리방침을 수시로 업데이트할 수 있습니다. "최종 업데이트" 날짜는 가장 최근 변경 사항을 반영합니다.

### 8. 문의

이 개인정보 처리방침에 대한 질문은 [support@zushapp.com](mailto:support@zushapp.com) 으로 문의하세요.`,
    '/terms-of-service': `Zush에 오신 것을 환영합니다. 본 서비스 약관("약관")은 Kirill Isachenko("당사", "우리")가 제공하는 macOS 및 Windows용 Zush 애플리케이션("서비스") 사용에 적용됩니다. Zush를 다운로드, 설치 또는 사용하면 본 약관에 동의하는 것입니다.

최종 업데이트: 2026년 4월 26일

### 1. 서비스 설명

Zush는 인공지능(AI)을 사용해 사용자가 파일을 정리, 이름 변경, 메타데이터 관리할 수 있도록 설계된 macOS 및 Windows용 데스크톱 유틸리티입니다. 기능에는 PDF를 포함한 이미지 및 지원 문서 자동 이름 변경, 스마트 메타데이터 태그(Finder 태그, Windows 파일 속성, Spotlight 메타데이터), 폴더 모니터링, 이름 변경 및 태그 동작을 위한 선택적 사용자 지정 AI 프롬프트 제어, BYOK 클라우드 처리, Ollama를 통한 개인 로컬 모델 기반 오프라인 AI 모드가 포함됩니다.

### 2. 소프트웨어 라이선스

당사는 본 약관에 따라 사용자가 소유하거나 제어하는 macOS 또는 Windows 기기에서 Zush를 사용할 수 있는 개인적, 비독점적, 양도 불가능한 제한 라이선스를 부여합니다.

### 3. 구매 및 결제

**3.1 🌟 PRO 버전**
Zush는 AI 이름 변경, 여러 폴더 모니터링, 고급 메타데이터 기능에 대한 크레딧 기반 접근을 제공하는 "🌟 PRO" 업그레이드를 제공합니다. 1 크레딧은 1회 이름 변경입니다. 현재 가격은 앱과 웹사이트에 표시됩니다.

**3.2 가격 플랜**
당사는 일회성 구매 모델을 제공합니다.

- **Zush Free**: 50 크레딧 포함. 1 크레딧은 1회 이름 변경입니다.
- **Zush PRO**: $10 일회성 구매. 10,000 크레딧과 무제한 클라우드 이름 변경을 위한 BYOK(Bring Your Own Key), Ollama를 통한 개인 로컬 모델 기반 오프라인 AI 모드를 포함합니다.

크레딧은 일회성이며 초기화되지 않습니다. 크레딧을 모두 사용하면 PRO 사용자는 BYOK를 활성화해 자체 API 키로 무제한 클라우드 이름 변경을 계속하거나 지원되는 경우 오프라인 AI 모드를 사용할 수 있습니다.

**3.3 사용 제한**
무료 및 PRO 버전 모두 AI 기반 클라우드 기능에 사용 제한이 있습니다. 현재 제한은 애플리케이션에 표시됩니다. 크레딧을 모두 사용한 PRO 사용자는 BYOK로 무제한 클라우드 이름 변경을 하거나 지원되는 경우 오프라인 AI 모드를 사용할 수 있습니다.

**3.5 Merchant of Record**
주문 절차는 온라인 리셀러 [Paddle.com](https://www.paddle.com)이 수행합니다. Paddle은 모든 주문의 Merchant of Record입니다. Paddle은 고객 서비스 문의와 반품을 처리합니다.

**3.6 환불**
환불 요청은 당사의 [환불 정책](/refund-policy)에 따라 Paddle이 처리합니다.

### 4. AI 기능 및 정확성

Zush는 인공지능을 사용해 파일을 분석하고 이름 및 메타데이터 제안을 생성합니다.

- 사용자 책임: AI는 때때로 부정확하거나 예상치 못한 결과를 생성할 수 있으므로, 서비스가 파일에 적용한 변경 사항을 검토하고 확인할 책임은 사용자에게 있습니다.
- 사용자 제공 지시: 사용자 지정 이름 변경 프롬프트, 태그 프롬프트 또는 기타 프롬프트 사용자 지정 텍스트를 입력하면 해당 지시가 분석 요청과 함께 처리됩니다. Cloud 또는 BYOK 모드에서는 Zush 백엔드 인프라를 통해 관련 AI 제공자에게 전송됩니다. 오프라인 AI 모드에서는 로컬 모델이 처리합니다.
- 로컬 AI: 오프라인 AI 모드를 활성화하면 로컬 Ollama 모델의 설치, 실행, 업데이트 및 선택은 사용자의 책임입니다. 로컬 모델 품질, 속도, 저장 공간 사용량, 가용성은 기기와 Ollama 설치에 따라 달라집니다.
- 보증 없음: AI 기능으로 생성된 정보의 절대적 정확성, 완전성 또는 신뢰성을 보장하지 않습니다.

### 5. 사용 제한 및 공정 사용

Zush 무료 버전에는 사용 제한(예: 제한된 AI 처리 파일 수)이 포함됩니다. 당사는 사용량을 모니터링하고 이러한 제한을 우회하려 하거나 남용 행위를 하는 계정을 정지할 권리를 보유합니다.

### 6. 지적 재산권

Zush에 대한 모든 권리, 소유권 및 이익(사용자 제공 콘텐츠 제외)은 Kirill Isachenko의 독점 재산으로 유지됩니다. "Zush" 및 관련 로고는 Kirill Isachenko의 상표입니다.

### 7. 사용자 행동

사용자는 다음을 하지 않기로 동의합니다.

- 애플리케이션을 리버스 엔지니어링, 디컴파일 또는 디스어셈블하지 않습니다.
- 불법적인 목적으로 서비스를 사용하지 않습니다.
- 당사의 백엔드 서비스 또는 라이선스 시스템에 무단 접근을 시도하지 않습니다.

### 8. 책임 제한

법률이 허용하는 최대 범위 내에서, KIRILL ISACHENKO는 서비스 사용으로 인해 발생하는 간접적, 우발적, 특별, 결과적 또는 징벌적 손해, 이익 또는 수익 손실, 데이터 손실(파일 손실 또는 손상 포함)에 대해 책임지지 않습니다.

### 9. 보증 부인

서비스는 명시적 또는 묵시적 보증 없이 "있는 그대로" 및 "사용 가능한 상태"로 제공됩니다.

### 10. 준거법

본 약관은 법률 충돌 원칙과 관계없이 태국 푸켓의 법률에 따라 규율되고 해석됩니다.

### 11. 약관 변경

당사는 본 약관을 수시로 업데이트할 수 있습니다. 변경 사항은 문서 상단의 "최종 업데이트" 날짜를 갱신하거나 앱 내 알림을 통해 고지합니다.

### 12. 연락처

본 약관에 대한 질문은 [support@zushapp.com](mailto:support@zushapp.com) 으로 문의하세요.`,
    '/refund-policy': `Zush에 만족하시기를 바랍니다. 만족스럽지 않은 경우 도움을 드리겠습니다.

### 일회성 구매

Zush PRO는 평생 접근이 포함된 일회성 구매입니다. 구매일로부터 14일 환불 보장을 제공합니다.

### 환불 요청 방법

환불을 요청하려면 주문 번호와 구매에 사용한 이메일 주소를 포함해 [refund@zushapp.com](mailto:refund@zushapp.com) 으로 연락해 주세요.

### 환불 처리

환불 요청이 접수되고 승인되면 처리되며, 카드 발급사의 정책에 따라 일정 기간 내 원래 결제 수단으로 자동 환불됩니다.

### 본 정책의 변경

당사는 언제든지 이 환불 정책을 수정할 권리를 보유합니다. 변경 사항은 업데이트된 "최종 업데이트" 날짜와 함께 이 페이지에 게시됩니다.`,
  },
  'zh-cn': {
    '/privacy-policy': `本隐私政策说明 Zush（"Kirill Isachenko"、"我们"或"我们的"）在你使用我们的 macOS 应用及相关服务时，如何收集、使用和保护你的信息。

最后更新：2026 年 4 月 27 日

### 1. 我们收集的信息

**1.1 文件内容数据**
为了提供 AI 驱动的整理和重命名功能，Zush 会处理你选择或监控的文件：

- **视觉文件**，例如图片、RAW 预览、SVG 和部分 PDF，可能会在分析前转换为压缩预览图。
- **支持的文档**，例如文本文件、邮件、表格、演示文稿和部分 PDF，可能会使用提取文本或在你的设备上生成的紧凑内容摘要进行分析，然后再发送请求。

在正常云端操作中，你的原始全分辨率文件不会离开你的设备。如果你启用离线 AI 模式，支持文件的分析会通过 Ollama 的私有本地模型运行，而不是通过 Zush 云端或第三方 AI 提供商。

**1.2 提示词和指令数据**
如果你使用 AI 提示词编辑器或其他提示词自定义功能，你输入的自定义重命名提示词和自定义标签提示词会随分析请求一起发送，以便 AI 提供商遵循你的指令。

**1.3 设备标识符**
每次分析请求都会发送匿名设备标识符（machine UUID），用于使用量跟踪、速率限制和许可证执行。该标识符不包含个人信息。

**1.4 许可证和使用数据**
我们会收集管理许可证和执行使用限制所需的信息：

- 电子邮件地址：在购买过程中提供。
- 许可证状态：关于你的 PRO 许可证（一次性购买）的信息。
- 使用计数：我们跟踪 AI 处理文件数量以管理使用限制。

**1.5 支付信息**
我们不存储或处理你的信用卡详细信息。所有付款均由我们的支付处理方安全处理：[Paddle.com](https://www.paddle.com)（直接购买）和 [Apple](https://www.apple.com/legal/privacy/)（App Store 购买）。详情请参阅它们各自的隐私政策。

对于 App Store 购买，Zush 会将 StoreKit 产品和交易标识符发送到 Zush 后端，用于验证 PRO 权益、恢复购买、防止滥用并维护账户状态。

### 2. 我们如何使用你的信息

我们使用收集的信息来：

- 提供和维护服务。
- 处理并验证你的 PRO 许可证。
- 使用 AI 分析文件，以生成描述性文件名、标签和元数据。
- 应用你选择提供的任何自定义重命名或标签指令。
- 向你发送技术通知、更新和支持消息。

### 3. 数据处理和 AI

Zush 会将文件分析 payload 发送给第三方 AI 服务进行分析：

- **默认流程：** 文件分析请求会通过 Zush 服务器发送给 Groq（主要）和 Google Gemini（备用）。
- **Bring Your Own Key (BYOK)：** PRO 用户可以为 Groq、Google Gemini、OpenAI 或 Anthropic Claude 配置自己的 API 密钥。BYOK 密钥会存储在 macOS Keychain 本地。BYOK 模式下，密钥只会在验证密钥和处理 AI 请求时发送给 Zush 后端和所选 AI 提供商。Zush 后端不会永久存储 BYOK API 密钥。
- **离线 AI 模式：** PRO 用户可以通过 Ollama 的私有本地模型处理支持的文件。在离线 AI 模式下，文件分析内容会在用户设备上处理，不会发送给 Zush 服务器或第三方 AI 提供商进行分析。Zush 仍可能为许可证、更新、支持或非内容类运营检查而联系后端服务。

**Cloud 和 BYOK 模式下会发送的内容：** 根据文件类型，这可能包括压缩预览图、提取的文档文本或紧凑内容摘要，以及 MIME 类型、文件扩展名、语言偏好、重新生成和 BYOK 设置、匿名设备标识符，以及你提交的任何自定义重命名或标签提示词。某些请求还可能包含基本文件元数据，例如用于生成更好重命名建议的文件名。

**不会自动发送的内容：** 原始全分辨率文件内容和本地文件夹路径不会作为单独字段发送。但是，如果个人信息出现在文件预览、提取文本或你输入的自定义提示词中，该信息可能会作为请求的一部分被处理。

**数据保留：** 文件预览、提取文本、摘要和自定义提示词文本会用于实时分析。Zush 在正常操作中不会在处理后存储文件内容，也不会故意将自定义提示词文本作为应用功能进行存储。提交的数据仍可能根据第三方 AI 提供商自己的条款被处理或保留。Zush 不会使用你的文件内容和提示词文本训练我们自己的模型。

### 4. 第三方服务

我们会与以下服务提供商共享数据：

- **AI 提供商：** Groq（主要）、Google Gemini（备用）。使用 BYOK 时，可选 OpenAI 或 Anthropic Claude。
- **本地 AI 运行时：** 如果你安装并启用离线 AI 模式，则为 Ollama。Ollama 在你的设备上运行，并由你的本地 Ollama 安装管理。
- **云基础设施：** Supabase（后端数据库、许可证和 API relay）。
- **支付处理方：** [Paddle.com](https://www.paddle.com)（直接购买）、[Apple](https://www.apple.com/legal/privacy/)（App Store 购买）。
- **错误跟踪：** Sentry（匿名崩溃和错误报告）。
- **使用分析：** TelemetryDeck（注重隐私的产品分析）。

每个第三方提供商都会根据其自己的隐私政策处理数据。我们建议你查看这些政策。

### 5. 数据安全

我们实施合理的安全措施，以保护你的信息免受未经授权的访问、披露或破坏。BYOK API 密钥会存储在 macOS Keychain 本地，不会永久存储在 Zush 后端。使用 BYOK 时，密钥只会在验证密钥和完成所选提供商请求所需时传输。然而，任何互联网传输或电子存储方式都不是 100% 安全的。

### 6. 你的权利

根据你的所在地，你可能根据数据保护法律（如 GDPR 或 CCPA）享有相关权利，包括访问、更正或删除个人数据的权利。若要行使这些权利，请联系我们。

### 7. 本政策的变更

我们可能会不时更新本隐私政策。"最后更新"日期将反映最近的变更。

### 8. 联系我们

如果你对本隐私政策有任何问题，请通过以下方式联系我们：[support@zushapp.com](mailto:support@zushapp.com)`,
    '/terms-of-service': `欢迎使用 Zush。本服务条款（"条款"）约束你对 Kirill Isachenko（"我们"或"我们的"）提供的 macOS 和 Windows 版 Zush 应用（"服务"）的使用。下载、安装或使用 Zush 即表示你同意受本条款约束。

最后更新：2026 年 4 月 26 日

### 1. 服务说明

Zush 是一款适用于 macOS 和 Windows 的桌面工具，旨在帮助用户使用人工智能（AI）整理、重命名和管理文件元数据。功能包括对图片和支持的文档（包括 PDF）进行自动重命名、智能元数据标签（macOS 上的 Finder 标签、Windows 上的文件属性以及 Spotlight 元数据）、文件夹监控、用于重命名和标签行为的可选自定义 AI 提示词控制、BYOK 云端处理，以及通过 Ollama 的私有本地模型实现的离线 AI 模式。

### 2. 软件许可

在遵守本条款的前提下，我们授予你个人、非独占、不可转让、有限的许可，允许你在你拥有或控制的 macOS 或 Windows 设备上使用 Zush。

### 3. 购买和付款

**3.1 🌟 PRO 版本**
Zush 提供 "🌟 PRO" 升级，可基于额度访问 AI 重命名、多文件夹监控和高级元数据功能。1 个额度等于 1 次重命名。当前价格会显示在应用和网站上。

**3.2 价格计划**
我们提供一次性购买模式：

- **Zush Free**：包含 50 个额度。1 个额度等于 1 次重命名。
- **Zush PRO**：一次性购买 $10。包含 10,000 个额度，并可使用 BYOK（Bring Your Own Key）进行无限云端重命名，以及通过 Ollama 的私有本地模型使用离线 AI 模式。

额度为一次性额度，不会重置。额度用完后，PRO 用户可以启用 BYOK，使用自己的 API 密钥继续进行无限云端重命名，或在支持的情况下使用离线 AI 模式。

**3.3 使用限制**
免费版和 PRO 版对 AI 云端功能都有使用限制。当前限制会显示在应用中。额度用完的 PRO 用户可以使用 BYOK 进行无限云端重命名，或在支持的情况下使用离线 AI 模式。

**3.5 Merchant of Record**
我们的订单流程由在线经销商 [Paddle.com](https://www.paddle.com) 执行。Paddle 是我们所有订单的 Merchant of Record。Paddle 提供所有客户服务咨询并处理退货。

**3.6 退款**
退款请求由 Paddle 按照我们的 [退款政策](/refund-policy) 处理。

### 4. AI 功能和准确性

Zush 使用人工智能分析文件并生成名称和元数据建议。

- 用户责任：由于 AI 偶尔可能产生错误或意外结果，你有责任审核并验证服务对文件所做的任何更改。
- 用户提供的指令：如果你输入自定义重命名提示词、标签提示词或其他提示词自定义文本，这些指令会随分析请求一起处理。在 Cloud 或 BYOK 模式下，这意味着它们会通过 Zush 后端基础设施发送给相关 AI 提供商。在离线 AI 模式下，它们由你的本地模型处理。
- 本地 AI：如果你启用离线 AI 模式，你需要负责安装、运行、更新和选择本地 Ollama 模型。本地模型的质量、速度、存储占用和可用性取决于你的设备和 Ollama 安装。
- 无保证：我们不保证 AI 功能生成的信息具有绝对准确性、完整性或可靠性。

### 5. 使用限制和公平使用

Zush 免费版包含使用限制（例如有限数量的 AI 处理文件）。我们保留监控使用情况并暂停试图绕过这些限制或进行滥用行为的账户的权利。

### 6. 知识产权

Zush 的所有权利、所有权和权益（不包括用户提供的内容）均仍为 Kirill Isachenko 的专有财产。"Zush" 及其相关徽标是 Kirill Isachenko 的商标。

### 7. 用户行为

你同意不：

- 对应用进行逆向工程、反编译或反汇编。
- 将服务用于任何非法目的。
- 试图未经授权访问我们的后端服务或许可证系统。

### 8. 责任限制

在法律允许的最大范围内，KIRILL ISACHENKO 不对因你使用服务而产生的任何间接、偶然、特殊、后果性或惩罚性损害，或任何利润或收入损失，或任何数据损失（包括文件丢失或损坏）承担责任。

### 9. 保证免责声明

服务按"现状"和"可用状态"提供，不提供任何明示或默示的保证。

### 10. 适用法律

本条款应受泰国普吉府法律管辖并据其解释，不考虑其法律冲突原则。

### 11. 条款变更

我们可能会不时更新本条款。我们会通过更新本文档顶部的"最后更新"日期或通过应用内通知告知你任何变更。

### 12. 联系信息

如果你对本条款有任何问题，请通过以下方式联系我们：[support@zushapp.com](mailto:support@zushapp.com)`,
    '/refund-policy': `我们希望你喜欢 Zush。如果你不满意，我们会帮助你。

### 一次性购买

Zush PRO 是一次性购买，并提供终身访问。我们自购买日起提供 14 天退款保证。

### 如何申请退款

要申请退款，请通过 [refund@zushapp.com](mailto:refund@zushapp.com) 联系我们，并提供你的订单号和购买时使用的电子邮件地址。

### 退款处理

收到并批准你的退款请求后，我们会处理退款，款项将在一定天数内自动退回到你的原始付款方式，具体取决于你的发卡机构政策。

### 本政策的变更

我们保留随时修改本退款政策的权利。任何变更都会发布在本页面，并附带更新后的"最后更新"日期。`,
  },
};

export function getLegalMarkdown(locale: InternalLocale, route: LegalRoute): string {
  return LEGAL_MARKDOWN[locale][route];
}
