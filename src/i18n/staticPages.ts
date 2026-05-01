import type { Locale, LocalizedRoute } from '@/i18n/config';

export type StaticLocalizedRoute =
  | '/methodology'
  | '/byok-setup'
  | '/ollama-setup'
  | '/privacy-policy'
  | '/terms-of-service'
  | '/refund-policy';

export interface StaticPageSection {
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
}

export interface StaticPageCopy {
  title: string;
  description: string;
  updated?: string;
  sections: StaticPageSection[];
}

export const STATIC_LOCALIZED_ROUTES = [
  '/methodology',
  '/byok-setup',
  '/ollama-setup',
  '/privacy-policy',
  '/terms-of-service',
  '/refund-policy',
] as const satisfies readonly StaticLocalizedRoute[];

export function isStaticLocalizedRoute(route: LocalizedRoute): route is StaticLocalizedRoute {
  return (STATIC_LOCALIZED_ROUTES as readonly string[]).includes(route);
}

const staticPages: Partial<Record<Exclude<Locale, 'en'>, Record<StaticLocalizedRoute, StaticPageCopy>>> = {
  de: {
    '/methodology': {
      title: 'Methodik & Benchmarks',
      description: 'So bewertet Zush die Qualität von KI-Dateinamen: Kriterien, Testablauf, Prüfstandards und Aktualisierungen.',
      sections: [
        { eyebrow: 'Verantwortung', title: 'Redaktionelle Prüfung', body: 'Zush bewertet Empfehlungen nach einem festen Prozess. Kriterien werden monatlich geprüft, technische Änderungen werden vom Produktteam kontrolliert und wichtige Aktualisierungen im Changelog dokumentiert.' },
        { eyebrow: 'Bewertung', title: 'Scoring-Modell', body: 'Jeder Testlauf wird nach semantischer Genauigkeit, Konsistenz in Stapeln, Automatisierungstiefe, Sicherheitsfunktionen und Alltagstauglichkeit bewertet.', bullets: ['Aussagekräftige Namen statt generischer Muster', 'Stabile Ergebnisse in gemischten Stapeln', 'Vorschau, Verlauf und Wiederherstellung vor der Empfehlung'] },
        { eyebrow: 'Validierung', title: 'Benchmark-Protokoll', body: 'Wir testen Screenshots, Fotos, PDFs und Office-Dokumente mit gleichen Prompts und prüfen danach Ergebnisse, Fehlgriffe und Wiederherstellung.' },
      ],
    },
    '/byok-setup': {
      title: 'BYOK-Einrichtung',
      description: 'Verbinde deinen eigenen KI-Anbieter und nutze unbegrenzte Cloud-Umbenennungen mit Gemini, Groq, OpenAI oder Claude.',
      sections: [
        { eyebrow: 'Überblick', title: 'Was ist BYOK?', body: 'BYOK bedeutet Bring Your Own Key. PRO-Nutzer können eigene API-Schlüssel verbinden, statt Zush-Credits für Cloud-Analysen zu nutzen.', bullets: ['Unbegrenzte Cloud-Umbenennungen zum Anbieterpreis', 'Gemini, Groq, OpenAI und Claude werden unterstützt', 'Schlüssel bleiben lokal sicher gespeichert'] },
        { eyebrow: 'Schritte', title: 'So richtest du es ein', body: 'Erstelle einen API-Schlüssel im Dashboard deines Anbieters, öffne Zush, gehe zu Settings > Preferences > BYOK, wähle den Anbieter, füge den Schlüssel ein und aktiviere BYOK.' },
        { eyebrow: 'Sicherheit', title: 'Datenkontrolle', body: 'In BYOK werden Analyseanfragen über die Zush-Infrastruktur an deinen Anbieter weitergeleitet. Zush speichert deine Dateiinhalte im normalen Betrieb nicht dauerhaft.' },
      ],
    },
    '/ollama-setup': {
      title: 'Ollama-Einrichtung',
      description: 'Nutze den Offline-KI-Modus mit privaten lokalen Modellen über Ollama.',
      sections: [
        { eyebrow: 'Privat', title: 'Was Offline-KI bedeutet', body: 'Wenn Offline-KI aktiv ist, laufen unterstützte Datei-Analysen über deinen lokalen Ollama-Server statt über Cloud-Anbieter.' },
        { eyebrow: 'Installation', title: 'Einrichtungsschritte', body: 'Installiere Ollama, starte die App einmal, lade ein Vision-Modell und aktiviere danach Offline AI mode in Zush.', bullets: ['Schnell: qwen2.5vl:3b', 'Ausgewogen: gemma3:4b', 'Dokumente: granite3.2-vision:2b'] },
        { eyebrow: 'Hilfe', title: 'Fehlerbehebung', body: 'Wenn Zush keine Modelle sieht, prüfe `ollama list`. Wenn die Verbindung fehlschlägt, stelle sicher, dass Ollama unter http://127.0.0.1:11434 läuft.' },
      ],
    },
    '/privacy-policy': {
      title: 'Datenschutz',
      description: 'Wie Zush Dateiinhalt, Lizenzdaten, Zahlungen, Analysen und Drittanbieter verarbeitet.',
      updated: 'Zuletzt aktualisiert: 27. April 2026',
      sections: [
        { eyebrow: 'Daten', title: 'Welche Informationen verarbeitet werden', body: 'Zush verarbeitet ausgewählte oder überwachte Dateien, um KI-gestützte Namen, Tags und Metadaten zu erzeugen. Je nach Dateityp werden Vorschauen, extrahierter Text oder kompakte Zusammenfassungen verwendet.' },
        { eyebrow: 'KI', title: 'Cloud, BYOK und Offline-Modus', body: 'Im Standardmodus laufen Analysen über Zush-Server zu KI-Anbietern. Mit BYOK verwendest du deinen eigenen Anbieter. Im Offline-KI-Modus werden unterstützte Inhalte lokal über Ollama verarbeitet.' },
        { eyebrow: 'Rechte', title: 'Sicherheit und Kontakt', body: 'Originaldateien verlassen dein Gerät im normalen Cloud-Betrieb nicht als vollständige Dateien. Für Datenschutzanfragen kontaktiere support@zushapp.com.' },
      ],
    },
    '/terms-of-service': {
      title: 'Nutzungsbedingungen',
      description: 'Bedingungen für die Nutzung von Zush auf macOS und Windows.',
      updated: 'Zuletzt aktualisiert: 26. April 2026',
      sections: [
        { eyebrow: 'Service', title: 'Beschreibung', body: 'Zush ist ein Desktop-Werkzeug zum Organisieren, Umbenennen und Verwalten von Dateimetadaten mit KI. Dazu gehören Stapel-Umbenennung, Ordnerüberwachung, eigene Prompts, BYOK und Offline-KI.' },
        { eyebrow: 'Lizenz', title: 'Nutzung und Zahlungen', body: 'Du erhältst eine persönliche, nicht übertragbare Lizenz. Zush PRO ist ein Einmalkauf mit Credits sowie Zugriff auf BYOK und Offline-KI. Zahlungen werden über Paddle oder Store-Plattformen abgewickelt.' },
        { eyebrow: 'Haftung', title: 'KI-Ergebnisse und Verantwortung', body: 'KI kann falsche oder unerwartete Namen erzeugen. Du bist dafür verantwortlich, Änderungen vor dem Anwenden zu prüfen. Der Dienst wird ohne Gewährleistung bereitgestellt.' },
      ],
    },
    '/refund-policy': {
      title: 'Rückerstattungsrichtlinie',
      description: 'Informationen zur 14-Tage-Geld-zurück-Garantie für Zush PRO.',
      updated: 'Zuletzt aktualisiert: 19. März 2026',
      sections: [
        { eyebrow: 'Einmalkauf', title: '14 Tage Geld zurück', body: 'Zush PRO ist ein Einmalkauf. Wenn du nicht zufrieden bist, kannst du innerhalb von 14 Tagen ab Kaufdatum eine Rückerstattung anfragen.' },
        { eyebrow: 'Anfrage', title: 'So beantragst du eine Rückerstattung', body: 'Schreibe an refund@zushapp.com mit Bestellnummer und der E-Mail-Adresse, die du beim Kauf verwendet hast.' },
        { eyebrow: 'Bearbeitung', title: 'Auszahlung', body: 'Nach Genehmigung wird die Rückerstattung auf die ursprüngliche Zahlungsmethode gebucht. Die Dauer hängt vom Kartenanbieter ab.' },
      ],
    },
  },
  fr: {
    '/methodology': {
      title: 'Méthodologie et benchmarks',
      description: 'Comment Zush évalue la qualité du renommage IA: critères, protocole, standards et mises à jour.',
      sections: [
        { eyebrow: 'Responsabilité', title: 'Contrôle éditorial', body: 'Zush suit un processus d’évaluation stable. Les critères sont revus chaque mois, les changements techniques sont contrôlés par l’équipe produit et les mises à jour importantes sont consignées.' },
        { eyebrow: 'Notation', title: 'Modèle de score', body: 'Chaque test est évalué selon la précision sémantique, la cohérence par lot, l’automatisation, les garde-fous et l’adéquation au travail quotidien.', bullets: ['Noms descriptifs plutôt que modèles génériques', 'Résultats stables sur des lots mixtes', 'Aperçu, historique et restauration avant recommandation'] },
        { eyebrow: 'Validation', title: 'Protocole de benchmark', body: 'Nous testons captures, photos, PDF et documents avec les mêmes prompts, puis nous analysons les résultats, erreurs et possibilités de retour arrière.' },
      ],
    },
    '/byok-setup': {
      title: 'Guide de configuration BYOK',
      description: 'Connectez votre propre fournisseur IA pour des renommages cloud illimités avec Gemini, Groq, OpenAI ou Claude.',
      sections: [
        { eyebrow: 'Aperçu', title: 'Qu’est-ce que BYOK ?', body: 'BYOK signifie Bring Your Own Key. Les utilisateurs PRO peuvent connecter leurs propres clés API au lieu d’utiliser les crédits Zush.', bullets: ['Renommages cloud illimités au coût du fournisseur', 'Gemini, Groq, OpenAI et Claude pris en charge', 'Les clés restent stockées localement'] },
        { eyebrow: 'Étapes', title: 'Configuration', body: 'Créez une clé API dans le tableau de bord du fournisseur, ouvrez Zush, allez dans Settings > Preferences > BYOK, choisissez le fournisseur, collez la clé et activez BYOK.' },
        { eyebrow: 'Sécurité', title: 'Contrôle des données', body: 'En mode BYOK, les demandes sont relayées par l’infrastructure Zush vers votre fournisseur. Zush ne conserve pas durablement le contenu des fichiers dans le fonctionnement normal.' },
      ],
    },
    '/ollama-setup': {
      title: 'Guide Ollama',
      description: 'Utilisez le mode IA hors ligne avec des modèles locaux privés via Ollama.',
      sections: [
        { eyebrow: 'Privé', title: 'Ce que signifie l’IA hors ligne', body: 'Lorsque le mode IA hors ligne est activé, l’analyse des fichiers pris en charge passe par votre serveur Ollama local au lieu de fournisseurs cloud.' },
        { eyebrow: 'Installation', title: 'Étapes de configuration', body: 'Installez Ollama, ouvrez l’app une fois, téléchargez un modèle vision, puis activez Offline AI mode dans Zush.', bullets: ['Rapide: qwen2.5vl:3b', 'Équilibré: gemma3:4b', 'Documents: granite3.2-vision:2b'] },
        { eyebrow: 'Aide', title: 'Dépannage', body: 'Si Zush ne voit aucun modèle, vérifiez `ollama list`. Si la connexion échoue, assurez-vous qu’Ollama fonctionne sur http://127.0.0.1:11434.' },
      ],
    },
    '/privacy-policy': {
      title: 'Politique de confidentialité',
      description: 'Comment Zush traite les fichiers, licences, paiements, analyses et services tiers.',
      updated: 'Dernière mise à jour: 27 avril 2026',
      sections: [
        { eyebrow: 'Données', title: 'Informations traitées', body: 'Zush traite les fichiers que vous sélectionnez ou surveillez pour générer des noms, tags et métadonnées avec l’IA. Selon le type, cela peut utiliser des aperçus, du texte extrait ou des résumés compacts.' },
        { eyebrow: 'IA', title: 'Cloud, BYOK et hors ligne', body: 'Par défaut, l’analyse passe par les serveurs Zush vers des fournisseurs IA. Avec BYOK, vous utilisez votre propre fournisseur. En mode hors ligne, les contenus pris en charge sont traités localement via Ollama.' },
        { eyebrow: 'Droits', title: 'Sécurité et contact', body: 'Les fichiers originaux complets ne quittent pas votre appareil dans le fonctionnement cloud normal. Pour toute demande de confidentialité, contactez support@zushapp.com.' },
      ],
    },
    '/terms-of-service': {
      title: 'Conditions d’utilisation',
      description: 'Conditions d’utilisation de Zush sur macOS et Windows.',
      updated: 'Dernière mise à jour: 26 avril 2026',
      sections: [
        { eyebrow: 'Service', title: 'Description', body: 'Zush est un utilitaire desktop pour organiser, renommer et gérer les métadonnées de fichiers avec l’IA: lots, surveillance, prompts personnalisés, BYOK et IA hors ligne.' },
        { eyebrow: 'Licence', title: 'Utilisation et paiements', body: 'Vous recevez une licence personnelle non transférable. Zush PRO est un achat unique avec crédits et accès à BYOK et à l’IA hors ligne. Les paiements sont traités par Paddle ou les stores.' },
        { eyebrow: 'Responsabilité', title: 'Résultats IA', body: 'L’IA peut produire des noms incorrects ou inattendus. Vous devez vérifier les changements avant de les appliquer. Le service est fourni sans garantie.' },
      ],
    },
    '/refund-policy': {
      title: 'Politique de remboursement',
      description: 'Détails de la garantie de remboursement de 14 jours pour Zush PRO.',
      updated: 'Dernière mise à jour: 19 mars 2026',
      sections: [
        { eyebrow: 'Achat unique', title: '14 jours pour changer d’avis', body: 'Zush PRO est un achat unique. Si cela ne vous convient pas, vous pouvez demander un remboursement sous 14 jours après l’achat.' },
        { eyebrow: 'Demande', title: 'Comment demander un remboursement', body: 'Écrivez à refund@zushapp.com avec votre numéro de commande et l’adresse email utilisée pour l’achat.' },
        { eyebrow: 'Traitement', title: 'Versement', body: 'Après approbation, le remboursement est appliqué au moyen de paiement initial. Le délai dépend de l’émetteur de votre carte.' },
      ],
    },
  },
  'pt-br': {
    '/methodology': {
      title: 'Metodologia e benchmarks',
      description: 'Como o Zush avalia qualidade de nomes com IA: critérios, protocolo, revisão e atualizações.',
      sections: [
        { eyebrow: 'Responsabilidade', title: 'Revisão editorial', body: 'O Zush segue um processo de avaliação consistente. Os critérios são revisados mensalmente, mudanças técnicas passam pelo time de produto e atualizações importantes entram no changelog.' },
        { eyebrow: 'Pontuação', title: 'Modelo de avaliação', body: 'Cada teste mede precisão semântica, consistência em lote, automação, controles de segurança e adequação ao uso diário.', bullets: ['Nomes descritivos em vez de padrões genéricos', 'Resultados estáveis em lotes mistos', 'Prévia, histórico e restauração antes da recomendação'] },
        { eyebrow: 'Validação', title: 'Protocolo de benchmark', body: 'Testamos screenshots, fotos, PDFs e documentos com os mesmos prompts, depois avaliamos resultados, erros e reversão.' },
      ],
    },
    '/byok-setup': {
      title: 'Guia de configuração BYOK',
      description: 'Conecte seu próprio provedor de IA para renomeações cloud ilimitadas com Gemini, Groq, OpenAI ou Claude.',
      sections: [
        { eyebrow: 'Visão geral', title: 'O que é BYOK?', body: 'BYOK significa Bring Your Own Key. Usuários PRO podem conectar suas próprias chaves API em vez de usar créditos do Zush.', bullets: ['Renomeações cloud ilimitadas pelo custo do provedor', 'Gemini, Groq, OpenAI e Claude', 'Chaves armazenadas localmente'] },
        { eyebrow: 'Passos', title: 'Como configurar', body: 'Crie uma chave API no painel do provedor, abra o Zush, vá para Settings > Preferences > BYOK, escolha o provedor, cole a chave e ative BYOK.' },
        { eyebrow: 'Segurança', title: 'Controle dos dados', body: 'No BYOK, as solicitações passam pela infraestrutura do Zush até seu provedor. O Zush não armazena conteúdo de arquivos de forma permanente na operação normal.' },
      ],
    },
    '/ollama-setup': {
      title: 'Guia Ollama',
      description: 'Use o modo IA offline com modelos locais privados via Ollama.',
      sections: [
        { eyebrow: 'Privado', title: 'O que significa IA offline', body: 'Com IA offline ativa, a análise de arquivos compatíveis roda pelo servidor Ollama local em vez de provedores cloud.' },
        { eyebrow: 'Instalação', title: 'Passos de configuração', body: 'Instale o Ollama, abra o app uma vez, baixe um modelo de visão e ative Offline AI mode no Zush.', bullets: ['Rápido: qwen2.5vl:3b', 'Equilibrado: gemma3:4b', 'Documentos: granite3.2-vision:2b'] },
        { eyebrow: 'Ajuda', title: 'Solução de problemas', body: 'Se o Zush não vê modelos, rode `ollama list`. Se a conexão falhar, confirme que o Ollama está em http://127.0.0.1:11434.' },
      ],
    },
    '/privacy-policy': {
      title: 'Política de privacidade',
      description: 'Como o Zush lida com arquivos, licença, pagamentos, análises e serviços terceiros.',
      updated: 'Última atualização: 27 de abril de 2026',
      sections: [
        { eyebrow: 'Dados', title: 'Informações processadas', body: 'O Zush processa arquivos selecionados ou monitorados para gerar nomes, tags e metadados com IA. Dependendo do tipo, usa prévias, texto extraído ou resumos compactos.' },
        { eyebrow: 'IA', title: 'Cloud, BYOK e offline', body: 'Por padrão, análises passam pelos servidores do Zush para provedores de IA. Com BYOK, você usa seu próprio provedor. No offline, conteúdos compatíveis são processados localmente via Ollama.' },
        { eyebrow: 'Direitos', title: 'Segurança e contato', body: 'Arquivos originais completos não saem do dispositivo na operação cloud normal. Para privacidade, fale com support@zushapp.com.' },
      ],
    },
    '/terms-of-service': {
      title: 'Termos de serviço',
      description: 'Termos de uso do Zush no macOS e Windows.',
      updated: 'Última atualização: 26 de abril de 2026',
      sections: [
        { eyebrow: 'Serviço', title: 'Descrição', body: 'Zush é um utilitário desktop para organizar, renomear e gerenciar metadados de arquivos com IA: lotes, monitoramento, prompts personalizados, BYOK e IA offline.' },
        { eyebrow: 'Licença', title: 'Uso e pagamentos', body: 'Você recebe uma licença pessoal e intransferível. Zush PRO é uma compra única com créditos e acesso a BYOK e IA offline. Pagamentos são processados por Paddle ou lojas.' },
        { eyebrow: 'Responsabilidade', title: 'Resultados da IA', body: 'A IA pode gerar nomes incorretos ou inesperados. Você deve revisar alterações antes de aplicar. O serviço é fornecido sem garantias.' },
      ],
    },
    '/refund-policy': {
      title: 'Política de reembolso',
      description: 'Detalhes da garantia de reembolso de 14 dias para Zush PRO.',
      updated: 'Última atualização: 19 de março de 2026',
      sections: [
        { eyebrow: 'Compra única', title: '14 dias de garantia', body: 'Zush PRO é uma compra única. Se não ficar satisfeito, você pode pedir reembolso em até 14 dias após a compra.' },
        { eyebrow: 'Solicitação', title: 'Como pedir reembolso', body: 'Envie email para refund@zushapp.com com o número do pedido e o email usado na compra.' },
        { eyebrow: 'Processamento', title: 'Pagamento', body: 'Após aprovação, o reembolso é aplicado ao método de pagamento original. O prazo depende do emissor do cartão.' },
      ],
    },
  },
  es: {
    '/methodology': {
      title: 'Metodología y benchmarks',
      description: 'Cómo Zush evalúa la calidad del renombrado con IA: criterios, protocolo, revisión y actualizaciones.',
      sections: [
        { eyebrow: 'Responsabilidad', title: 'Revisión editorial', body: 'Zush usa un proceso de evaluación estable. Los criterios se revisan cada mes, los cambios técnicos pasan por el equipo de producto y las actualizaciones importantes quedan registradas.' },
        { eyebrow: 'Puntuación', title: 'Modelo de evaluación', body: 'Cada prueba mide precisión semántica, consistencia por lotes, automatización, controles de seguridad y encaje en el uso diario.', bullets: ['Nombres descriptivos, no patrones genéricos', 'Resultados estables en lotes mixtos', 'Vista previa, historial y restauración antes de recomendar'] },
        { eyebrow: 'Validación', title: 'Protocolo de benchmark', body: 'Probamos capturas, fotos, PDFs y documentos con los mismos prompts, y revisamos resultados, errores y reversión.' },
      ],
    },
    '/byok-setup': {
      title: 'Guía de configuración BYOK',
      description: 'Conecta tu propio proveedor de IA para renombrados cloud ilimitados con Gemini, Groq, OpenAI o Claude.',
      sections: [
        { eyebrow: 'Resumen', title: '¿Qué es BYOK?', body: 'BYOK significa Bring Your Own Key. Los usuarios PRO pueden conectar sus propias claves API en lugar de usar créditos de Zush.', bullets: ['Renombrados cloud ilimitados al coste del proveedor', 'Gemini, Groq, OpenAI y Claude', 'Claves guardadas localmente'] },
        { eyebrow: 'Pasos', title: 'Cómo configurarlo', body: 'Crea una clave API en el panel del proveedor, abre Zush, entra en Settings > Preferences > BYOK, elige proveedor, pega la clave y activa BYOK.' },
        { eyebrow: 'Seguridad', title: 'Control de datos', body: 'En BYOK, las solicitudes pasan por infraestructura de Zush hacia tu proveedor. Zush no almacena contenido de archivos de forma permanente durante la operación normal.' },
      ],
    },
    '/ollama-setup': {
      title: 'Guía de Ollama',
      description: 'Usa el modo IA offline con modelos locales privados mediante Ollama.',
      sections: [
        { eyebrow: 'Privado', title: 'Qué significa IA offline', body: 'Con IA offline activa, el análisis de archivos compatibles se ejecuta en tu servidor local de Ollama en lugar de proveedores cloud.' },
        { eyebrow: 'Instalación', title: 'Pasos de configuración', body: 'Instala Ollama, abre la app una vez, descarga un modelo de visión y activa Offline AI mode en Zush.', bullets: ['Rápido: qwen2.5vl:3b', 'Equilibrado: gemma3:4b', 'Documentos: granite3.2-vision:2b'] },
        { eyebrow: 'Ayuda', title: 'Solución de problemas', body: 'Si Zush no ve modelos, ejecuta `ollama list`. Si falla la conexión, confirma que Ollama esté en http://127.0.0.1:11434.' },
      ],
    },
    '/privacy-policy': {
      title: 'Política de privacidad',
      description: 'Cómo Zush trata archivos, licencia, pagos, analítica y servicios de terceros.',
      updated: 'Última actualización: 27 de abril de 2026',
      sections: [
        { eyebrow: 'Datos', title: 'Información procesada', body: 'Zush procesa archivos seleccionados o vigilados para generar nombres, etiquetas y metadatos con IA. Según el tipo, usa vistas previas, texto extraído o resúmenes compactos.' },
        { eyebrow: 'IA', title: 'Cloud, BYOK y offline', body: 'Por defecto, los análisis pasan por servidores de Zush hacia proveedores de IA. Con BYOK usas tu propio proveedor. En offline, el contenido compatible se procesa localmente con Ollama.' },
        { eyebrow: 'Derechos', title: 'Seguridad y contacto', body: 'Los archivos originales completos no salen de tu dispositivo en la operación cloud normal. Para privacidad, escribe a support@zushapp.com.' },
      ],
    },
    '/terms-of-service': {
      title: 'Términos de servicio',
      description: 'Términos para usar Zush en macOS y Windows.',
      updated: 'Última actualización: 26 de abril de 2026',
      sections: [
        { eyebrow: 'Servicio', title: 'Descripción', body: 'Zush es una utilidad de escritorio para organizar, renombrar y gestionar metadatos con IA: lotes, monitoreo, prompts personalizados, BYOK e IA offline.' },
        { eyebrow: 'Licencia', title: 'Uso y pagos', body: 'Recibes una licencia personal e intransferible. Zush PRO es una compra única con créditos y acceso a BYOK e IA offline. Los pagos se procesan mediante Paddle o tiendas.' },
        { eyebrow: 'Responsabilidad', title: 'Resultados de IA', body: 'La IA puede producir nombres incorrectos o inesperados. Debes revisar los cambios antes de aplicarlos. El servicio se ofrece sin garantías.' },
      ],
    },
    '/refund-policy': {
      title: 'Política de reembolso',
      description: 'Detalles de la garantía de devolución de 14 días para Zush PRO.',
      updated: 'Última actualización: 19 de marzo de 2026',
      sections: [
        { eyebrow: 'Compra única', title: '14 días de garantía', body: 'Zush PRO es una compra única. Si no estás satisfecho, puedes pedir reembolso dentro de los 14 días posteriores a la compra.' },
        { eyebrow: 'Solicitud', title: 'Cómo pedir reembolso', body: 'Escribe a refund@zushapp.com con el número de pedido y el email usado en la compra.' },
        { eyebrow: 'Procesamiento', title: 'Pago', body: 'Tras aprobación, el reembolso se aplica al método de pago original. El plazo depende del emisor de la tarjeta.' },
      ],
    },
  },
  nl: {
    '/methodology': {
      title: 'Methode en benchmarks',
      description: 'Hoe Zush AI-bestandsnamen beoordeelt: criteria, protocol, reviewstandaarden en updates.',
      sections: [
        { eyebrow: 'Verantwoording', title: 'Redactionele controle', body: 'Zush gebruikt een vast beoordelingsproces. Criteria worden maandelijks herzien, technische wijzigingen worden door het productteam gecontroleerd en belangrijke updates worden vastgelegd.' },
        { eyebrow: 'Score', title: 'Beoordelingsmodel', body: 'Elke test meet semantische nauwkeurigheid, consistentie in bulk, automatisering, veiligheidscontroles en praktische bruikbaarheid.', bullets: ['Beschrijvende namen in plaats van generieke patronen', 'Stabiele resultaten in gemengde batches', 'Preview, geschiedenis en herstel vóór aanbeveling'] },
        { eyebrow: 'Validatie', title: 'Benchmarkprotocol', body: 'We testen screenshots, foto’s, PDFs en documenten met dezelfde prompts en beoordelen daarna resultaten, fouten en herstel.' },
      ],
    },
    '/byok-setup': {
      title: 'BYOK-handleiding',
      description: 'Koppel je eigen AI-provider voor onbeperkt cloudhernoemen met Gemini, Groq, OpenAI of Claude.',
      sections: [
        { eyebrow: 'Overzicht', title: 'Wat is BYOK?', body: 'BYOK betekent Bring Your Own Key. PRO-gebruikers kunnen eigen API-sleutels koppelen in plaats van Zush-credits te gebruiken.', bullets: ['Onbeperkt cloudhernoemen tegen providerkosten', 'Gemini, Groq, OpenAI en Claude', 'Sleutels blijven lokaal opgeslagen'] },
        { eyebrow: 'Stappen', title: 'Instellen', body: 'Maak een API-sleutel in het providerdashboard, open Zush, ga naar Settings > Preferences > BYOK, kies de provider, plak de sleutel en activeer BYOK.' },
        { eyebrow: 'Veiligheid', title: 'Datacontrole', body: 'In BYOK worden analyseverzoeken via Zush-infrastructuur naar je provider gestuurd. Zush bewaart bestandsinhoud normaal niet permanent.' },
      ],
    },
    '/ollama-setup': {
      title: 'Ollama-handleiding',
      description: 'Gebruik offline AI met private lokale modellen via Ollama.',
      sections: [
        { eyebrow: 'Privé', title: 'Wat offline AI betekent', body: 'Wanneer offline AI actief is, loopt analyse van ondersteunde bestanden via je lokale Ollama-server in plaats van cloudproviders.' },
        { eyebrow: 'Installatie', title: 'Instappen', body: 'Installeer Ollama, open de app één keer, download een vision-model en activeer Offline AI mode in Zush.', bullets: ['Snel: qwen2.5vl:3b', 'Gebalanceerd: gemma3:4b', 'Documenten: granite3.2-vision:2b'] },
        { eyebrow: 'Hulp', title: 'Problemen oplossen', body: 'Als Zush geen modellen ziet, voer `ollama list` uit. Mislukt de verbinding, controleer dan http://127.0.0.1:11434.' },
      ],
    },
    '/privacy-policy': {
      title: 'Privacybeleid',
      description: 'Hoe Zush omgaat met bestanden, licenties, betalingen, analyse en externe services.',
      updated: 'Laatst bijgewerkt: 27 april 2026',
      sections: [
        { eyebrow: 'Data', title: 'Welke informatie wordt verwerkt', body: 'Zush verwerkt geselecteerde of bewaakte bestanden om AI-namen, tags en metadata te maken. Afhankelijk van het type gebruikt Zush previews, geëxtraheerde tekst of compacte samenvattingen.' },
        { eyebrow: 'AI', title: 'Cloud, BYOK en offline', body: 'Standaard lopen analyses via Zush-servers naar AI-providers. Met BYOK gebruik je je eigen provider. Offline wordt ondersteunde inhoud lokaal via Ollama verwerkt.' },
        { eyebrow: 'Rechten', title: 'Veiligheid en contact', body: 'Volledige originele bestanden verlaten je apparaat normaal niet in cloudmodus. Voor privacyvragen: support@zushapp.com.' },
      ],
    },
    '/terms-of-service': {
      title: 'Servicevoorwaarden',
      description: 'Voorwaarden voor het gebruik van Zush op macOS en Windows.',
      updated: 'Laatst bijgewerkt: 26 april 2026',
      sections: [
        { eyebrow: 'Service', title: 'Beschrijving', body: 'Zush is een desktoptool om bestanden met AI te organiseren, hernoemen en van metadata te voorzien: batches, mapbewaking, eigen prompts, BYOK en offline AI.' },
        { eyebrow: 'Licentie', title: 'Gebruik en betalingen', body: 'Je krijgt een persoonlijke, niet-overdraagbare licentie. Zush PRO is een eenmalige aankoop met credits en toegang tot BYOK en offline AI. Betalingen lopen via Paddle of stores.' },
        { eyebrow: 'Verantwoordelijkheid', title: 'AI-resultaten', body: 'AI kan onjuiste of onverwachte namen maken. Controleer wijzigingen voor toepassing. De service wordt zonder garantie geleverd.' },
      ],
    },
    '/refund-policy': {
      title: 'Terugbetalingsbeleid',
      description: 'Details van de 14 dagen geld-terug-garantie voor Zush PRO.',
      updated: 'Laatst bijgewerkt: 19 maart 2026',
      sections: [
        { eyebrow: 'Eenmalige aankoop', title: '14 dagen garantie', body: 'Zush PRO is een eenmalige aankoop. Ben je niet tevreden, dan kun je binnen 14 dagen na aankoop terugbetaling aanvragen.' },
        { eyebrow: 'Aanvraag', title: 'Terugbetaling aanvragen', body: 'Mail refund@zushapp.com met je bestelnummer en het e-mailadres van de aankoop.' },
        { eyebrow: 'Verwerking', title: 'Uitbetaling', body: 'Na goedkeuring wordt het bedrag teruggestort naar de oorspronkelijke betaalmethode. De duur hangt af van je kaartuitgever.' },
      ],
    },
  },
  it: {
    '/methodology': {
      title: 'Metodologia e benchmark',
      description: 'Come Zush valuta la qualità della rinomina IA: criteri, protocollo, revisioni e aggiornamenti.',
      sections: [
        { eyebrow: 'Responsabilità', title: 'Controllo editoriale', body: 'Zush usa un processo di valutazione stabile. I criteri sono rivisti ogni mese, le modifiche tecniche sono controllate dal team prodotto e gli aggiornamenti importanti sono registrati.' },
        { eyebrow: 'Punteggio', title: 'Modello di valutazione', body: 'Ogni test misura accuratezza semantica, coerenza nei batch, automazione, controlli di sicurezza e utilità quotidiana.', bullets: ['Nomi descrittivi invece di pattern generici', 'Risultati stabili in batch misti', 'Anteprima, cronologia e ripristino prima della raccomandazione'] },
        { eyebrow: 'Validazione', title: 'Protocollo benchmark', body: 'Testiamo screenshot, foto, PDF e documenti con gli stessi prompt, poi analizziamo risultati, errori e ripristino.' },
      ],
    },
    '/byok-setup': {
      title: 'Guida BYOK',
      description: 'Collega il tuo provider IA per rinomine cloud illimitate con Gemini, Groq, OpenAI o Claude.',
      sections: [
        { eyebrow: 'Panoramica', title: 'Cos’è BYOK?', body: 'BYOK significa Bring Your Own Key. Gli utenti PRO possono collegare le proprie chiavi API invece di usare i crediti Zush.', bullets: ['Rinomine cloud illimitate al costo del provider', 'Gemini, Groq, OpenAI e Claude', 'Chiavi salvate localmente'] },
        { eyebrow: 'Passaggi', title: 'Configurazione', body: 'Crea una chiave API nel pannello del provider, apri Zush, vai in Settings > Preferences > BYOK, scegli il provider, incolla la chiave e abilita BYOK.' },
        { eyebrow: 'Sicurezza', title: 'Controllo dati', body: 'In BYOK le richieste passano dall’infrastruttura Zush al tuo provider. Zush non conserva permanentemente il contenuto dei file durante l’uso normale.' },
      ],
    },
    '/ollama-setup': {
      title: 'Guida Ollama',
      description: 'Usa la modalità IA offline con modelli locali privati tramite Ollama.',
      sections: [
        { eyebrow: 'Privato', title: 'Cosa significa IA offline', body: 'Con IA offline attiva, l’analisi dei file supportati passa dal server Ollama locale invece che da provider cloud.' },
        { eyebrow: 'Installazione', title: 'Passaggi', body: 'Installa Ollama, apri l’app una volta, scarica un modello vision e abilita Offline AI mode in Zush.', bullets: ['Veloce: qwen2.5vl:3b', 'Bilanciato: gemma3:4b', 'Documenti: granite3.2-vision:2b'] },
        { eyebrow: 'Aiuto', title: 'Risoluzione problemi', body: 'Se Zush non vede modelli, esegui `ollama list`. Se la connessione fallisce, verifica http://127.0.0.1:11434.' },
      ],
    },
    '/privacy-policy': {
      title: 'Informativa sulla privacy',
      description: 'Come Zush gestisce file, licenze, pagamenti, analisi e servizi di terze parti.',
      updated: 'Ultimo aggiornamento: 27 aprile 2026',
      sections: [
        { eyebrow: 'Dati', title: 'Informazioni elaborate', body: 'Zush elabora file selezionati o monitorati per generare nomi, tag e metadati con IA. In base al tipo usa anteprime, testo estratto o riassunti compatti.' },
        { eyebrow: 'IA', title: 'Cloud, BYOK e offline', body: 'Di default le analisi passano dai server Zush a provider IA. Con BYOK usi il tuo provider. Offline elabora contenuti supportati localmente via Ollama.' },
        { eyebrow: 'Diritti', title: 'Sicurezza e contatto', body: 'I file originali completi non lasciano il dispositivo nel normale uso cloud. Per richieste privacy: support@zushapp.com.' },
      ],
    },
    '/terms-of-service': {
      title: 'Termini di servizio',
      description: 'Condizioni per usare Zush su macOS e Windows.',
      updated: 'Ultimo aggiornamento: 26 aprile 2026',
      sections: [
        { eyebrow: 'Servizio', title: 'Descrizione', body: 'Zush è un utility desktop per organizzare, rinominare e gestire metadati con IA: batch, monitoraggio cartelle, prompt personalizzati, BYOK e IA offline.' },
        { eyebrow: 'Licenza', title: 'Uso e pagamenti', body: 'Ricevi una licenza personale non trasferibile. Zush PRO è un acquisto unico con crediti e accesso a BYOK e IA offline. I pagamenti sono gestiti da Paddle o dagli store.' },
        { eyebrow: 'Responsabilità', title: 'Risultati IA', body: 'L’IA può produrre nomi errati o inattesi. Devi controllare le modifiche prima di applicarle. Il servizio è fornito senza garanzie.' },
      ],
    },
    '/refund-policy': {
      title: 'Politica di rimborso',
      description: 'Dettagli della garanzia di rimborso di 14 giorni per Zush PRO.',
      updated: 'Ultimo aggiornamento: 19 marzo 2026',
      sections: [
        { eyebrow: 'Acquisto unico', title: 'Garanzia di 14 giorni', body: 'Zush PRO è un acquisto unico. Se non sei soddisfatto, puoi chiedere il rimborso entro 14 giorni dall’acquisto.' },
        { eyebrow: 'Richiesta', title: 'Come chiedere rimborso', body: 'Scrivi a refund@zushapp.com con numero ordine e indirizzo email usato per l’acquisto.' },
        { eyebrow: 'Elaborazione', title: 'Pagamento', body: 'Dopo l’approvazione, il rimborso viene applicato al metodo di pagamento originale. I tempi dipendono dall’emittente della carta.' },
      ],
    },
  },
  ja: {
    '/methodology': {
      title: '方法とベンチマーク',
      description: 'Zush が AI ファイル名の品質を評価する基準、検証手順、更新方針。',
      sections: [
        { eyebrow: '責任', title: '編集レビュー', body: 'Zush は一貫した評価プロセスを使います。基準は毎月見直し、技術的な変更はプロダクトチームが確認し、重要な更新は記録します。' },
        { eyebrow: '評価', title: 'スコアリングモデル', body: '各テストでは意味の正確さ、一括処理での一貫性、自動化、復元性、日常作業での使いやすさを評価します。', bullets: ['汎用パターンではなく内容が分かる名前', '混在ファイルの一括処理でも安定', '推奨前にプレビュー、履歴、復元を確認'] },
        { eyebrow: '検証', title: 'ベンチマーク手順', body: 'スクリーンショット、写真、PDF、文書を同じプロンプトでテストし、結果、誤り、復元動作を確認します。' },
      ],
    },
    '/byok-setup': {
      title: 'BYOK 設定ガイド',
      description: 'Gemini、Groq、OpenAI、Claude の自分のキーで無制限のクラウドリネームを使う方法。',
      sections: [
        { eyebrow: '概要', title: 'BYOK とは？', body: 'BYOK は Bring Your Own Key の略です。PRO ユーザーは Zush クレジットの代わりに自分の API キーを接続できます。', bullets: ['プロバイダー料金で無制限クラウドリネーム', 'Gemini、Groq、OpenAI、Claude に対応', 'キーはローカルに保存'] },
        { eyebrow: '手順', title: '設定方法', body: 'プロバイダーのダッシュボードで API キーを作成し、Zush の Settings > Preferences > BYOK でプロバイダーを選択、キーを貼り付けて有効化します。' },
        { eyebrow: '安全性', title: 'データ管理', body: 'BYOK では分析リクエストが Zush のインフラ経由で選択したプロバイダーに送られます。通常運用で Zush がファイル内容を永続保存することはありません。' },
      ],
    },
    '/ollama-setup': {
      title: 'Ollama 設定ガイド',
      description: 'Ollama のローカルモデルで Offline AI モードを使う方法。',
      sections: [
        { eyebrow: 'プライベート', title: 'Offline AI の意味', body: 'Offline AI が有効な場合、対応ファイルの分析はクラウドではなくローカルの Ollama サーバーで実行されます。' },
        { eyebrow: 'インストール', title: '設定手順', body: 'Ollama をインストールして一度起動し、vision モデルをダウンロードして Zush で Offline AI mode を有効にします。', bullets: ['高速: qwen2.5vl:3b', 'バランス: gemma3:4b', '文書向け: granite3.2-vision:2b'] },
        { eyebrow: 'ヘルプ', title: 'トラブルシューティング', body: 'モデルが見えない場合は `ollama list` を確認します。接続できない場合は http://127.0.0.1:11434 で Ollama が動作しているか確認してください。' },
      ],
    },
    '/privacy-policy': {
      title: 'プライバシーポリシー',
      description: 'Zush がファイル、ライセンス、支払い、分析、外部サービスを扱う方法。',
      updated: '最終更新: 2026年4月27日',
      sections: [
        { eyebrow: 'データ', title: '処理される情報', body: 'Zush は選択または監視されたファイルを処理し、AI による名前、タグ、メタデータを生成します。種類によりプレビュー、抽出テキスト、要約を使います。' },
        { eyebrow: 'AI', title: 'クラウド、BYOK、オフライン', body: '標準では Zush サーバー経由で AI プロバイダーに分析を送ります。BYOK では自分のプロバイダーを使い、オフラインでは Ollama でローカル処理します。' },
        { eyebrow: '権利', title: '安全性と連絡先', body: '通常のクラウド処理で元の完全なファイルがそのまま送信されることはありません。問い合わせは support@zushapp.com へ。' },
      ],
    },
    '/terms-of-service': {
      title: '利用規約',
      description: 'macOS と Windows で Zush を利用するための条件。',
      updated: '最終更新: 2026年4月26日',
      sections: [
        { eyebrow: 'サービス', title: '説明', body: 'Zush は AI でファイル名とメタデータを整理するデスクトップツールです。一括リネーム、フォルダ監視、カスタムプロンプト、BYOK、Offline AI を含みます。' },
        { eyebrow: 'ライセンス', title: '利用と支払い', body: '個人用で譲渡不可のライセンスが付与されます。Zush PRO は買い切りで、クレジット、BYOK、Offline AI が含まれます。支払いは Paddle またはストア経由です。' },
        { eyebrow: '責任', title: 'AI の結果', body: 'AI は誤った名前や予期しない名前を生成する場合があります。適用前に確認してください。サービスは保証なしで提供されます。' },
      ],
    },
    '/refund-policy': {
      title: '返金ポリシー',
      description: 'Zush PRO の14日間返金保証について。',
      updated: '最終更新: 2026年3月19日',
      sections: [
        { eyebrow: '買い切り', title: '14日間保証', body: 'Zush PRO は買い切りです。満足できない場合、購入日から14日以内に返金を申請できます。' },
        { eyebrow: '申請', title: '返金の依頼方法', body: '注文番号と購入時のメールアドレスを添えて refund@zushapp.com へ連絡してください。' },
        { eyebrow: '処理', title: '返金処理', body: '承認後、元の支払い方法に返金されます。所要時間はカード発行会社により異なります。' },
      ],
    },
  },
  ko: {
    '/methodology': {
      title: '방법론 및 벤치마크',
      description: 'Zush가 AI 파일 이름 품질을 평가하는 기준, 검증 절차, 리뷰 기준과 업데이트 방식.',
      sections: [
        { eyebrow: '책임', title: '편집 검토', body: 'Zush는 일관된 평가 절차를 사용합니다. 기준은 매월 검토하고, 기술 변경은 제품팀이 확인하며, 중요한 업데이트는 기록합니다.' },
        { eyebrow: '평가', title: '점수 모델', body: '각 테스트는 의미 정확도, 일괄 처리 일관성, 자동화, 안전 장치, 실제 업무 적합성을 평가합니다.', bullets: ['일반 패턴이 아닌 설명적인 이름', '혼합 파일 일괄 처리에서도 안정적인 결과', '추천 전 미리보기, 기록, 복원 확인'] },
        { eyebrow: '검증', title: '벤치마크 절차', body: '스크린샷, 사진, PDF, 문서를 같은 프롬프트로 테스트한 뒤 결과, 오류, 복원 동작을 확인합니다.' },
      ],
    },
    '/byok-setup': {
      title: 'BYOK 설정 가이드',
      description: 'Gemini, Groq, OpenAI, Claude 키로 무제한 클라우드 이름 변경을 사용하는 방법.',
      sections: [
        { eyebrow: '개요', title: 'BYOK란?', body: 'BYOK는 Bring Your Own Key의 약자입니다. PRO 사용자는 Zush 크레딧 대신 자신의 API 키를 연결할 수 있습니다.', bullets: ['제공자 비용으로 무제한 클라우드 이름 변경', 'Gemini, Groq, OpenAI, Claude 지원', '키는 로컬에 저장'] },
        { eyebrow: '단계', title: '설정 방법', body: '제공자 대시보드에서 API 키를 만들고 Zush의 Settings > Preferences > BYOK에서 제공자를 선택한 뒤 키를 붙여넣고 BYOK를 활성화합니다.' },
        { eyebrow: '보안', title: '데이터 제어', body: 'BYOK에서는 분석 요청이 Zush 인프라를 통해 선택한 제공자로 전달됩니다. Zush는 일반 운영에서 파일 내용을 영구 저장하지 않습니다.' },
      ],
    },
    '/ollama-setup': {
      title: 'Ollama 설정 가이드',
      description: 'Ollama의 개인 로컬 모델로 오프라인 AI 모드를 사용하는 방법.',
      sections: [
        { eyebrow: '개인 처리', title: '오프라인 AI의 의미', body: '오프라인 AI가 활성화되면 지원 파일 분석이 클라우드 제공자가 아닌 로컬 Ollama 서버에서 실행됩니다.' },
        { eyebrow: '설치', title: '설정 단계', body: 'Ollama를 설치하고 한 번 실행한 뒤 vision 모델을 다운로드하고 Zush에서 Offline AI mode를 켭니다.', bullets: ['빠름: qwen2.5vl:3b', '균형: gemma3:4b', '문서: granite3.2-vision:2b'] },
        { eyebrow: '도움말', title: '문제 해결', body: 'Zush가 모델을 찾지 못하면 `ollama list`를 확인하세요. 연결 실패 시 http://127.0.0.1:11434 에서 Ollama가 실행 중인지 확인하세요.' },
      ],
    },
    '/privacy-policy': {
      title: '개인정보 처리방침',
      description: 'Zush가 파일, 라이선스, 결제, 분석, 타사 서비스를 처리하는 방식.',
      updated: '마지막 업데이트: 2026년 4월 27일',
      sections: [
        { eyebrow: '데이터', title: '처리되는 정보', body: 'Zush는 선택하거나 모니터링하는 파일을 처리해 AI 이름, 태그, 메타데이터를 생성합니다. 파일 유형에 따라 미리보기, 추출 텍스트, 요약을 사용합니다.' },
        { eyebrow: 'AI', title: '클라우드, BYOK, 오프라인', body: '기본적으로 분석은 Zush 서버를 거쳐 AI 제공자로 전달됩니다. BYOK는 자신의 제공자를 사용하고, 오프라인은 Ollama로 로컬 처리합니다.' },
        { eyebrow: '권리', title: '보안 및 문의', body: '일반 클라우드 운영에서 원본 전체 파일은 그대로 전송되지 않습니다. 개인정보 문의는 support@zushapp.com 으로 보내세요.' },
      ],
    },
    '/terms-of-service': {
      title: '이용 약관',
      description: 'macOS 및 Windows에서 Zush를 사용하기 위한 조건.',
      updated: '마지막 업데이트: 2026년 4월 26일',
      sections: [
        { eyebrow: '서비스', title: '설명', body: 'Zush는 AI로 파일 이름과 메타데이터를 정리하는 데스크톱 도구입니다. 일괄 이름 변경, 폴더 모니터링, 사용자 프롬프트, BYOK, 오프라인 AI를 포함합니다.' },
        { eyebrow: '라이선스', title: '사용 및 결제', body: '개인적이고 양도할 수 없는 라이선스가 제공됩니다. Zush PRO는 크레딧, BYOK, 오프라인 AI가 포함된 일회성 구매입니다. 결제는 Paddle 또는 스토어에서 처리됩니다.' },
        { eyebrow: '책임', title: 'AI 결과', body: 'AI는 잘못되거나 예상치 못한 이름을 만들 수 있습니다. 적용 전 변경을 검토해야 합니다. 서비스는 보증 없이 제공됩니다.' },
      ],
    },
    '/refund-policy': {
      title: '환불 정책',
      description: 'Zush PRO 14일 환불 보장 안내.',
      updated: '마지막 업데이트: 2026년 3월 19일',
      sections: [
        { eyebrow: '일회성 구매', title: '14일 보장', body: 'Zush PRO는 일회성 구매입니다. 만족하지 않으면 구매일로부터 14일 이내 환불을 요청할 수 있습니다.' },
        { eyebrow: '요청', title: '환불 요청 방법', body: '주문 번호와 구매에 사용한 이메일 주소를 refund@zushapp.com 으로 보내세요.' },
        { eyebrow: '처리', title: '환불 처리', body: '승인 후 원래 결제 수단으로 환불됩니다. 처리 시간은 카드 발급사에 따라 다릅니다.' },
      ],
    },
  },
  'zh-cn': {
    '/methodology': {
      title: '方法说明与基准测试',
      description: 'Zush 如何评估 AI 文件命名质量：评分标准、测试流程、审核标准与更新节奏。',
      sections: [
        { eyebrow: '责任', title: '编辑审核', body: 'Zush 使用稳定的评估流程。标准每月复查，技术变更由产品团队确认，重要更新会记录在更新日志中。' },
        { eyebrow: '评分', title: '评分模型', body: '每次测试都会衡量语义准确性、批量一致性、自动化能力、安全控制和日常工作适配度。', bullets: ['生成描述性名称，而不是通用模板', '混合文件批量处理中保持稳定', '推荐前检查预览、历史和恢复能力'] },
        { eyebrow: '验证', title: '基准测试流程', body: '我们用相同提示词测试截图、照片、PDF 和文档，然后检查结果、错误和回滚能力。' },
      ],
    },
    '/byok-setup': {
      title: 'BYOK 设置指南',
      description: '连接自己的 AI provider key，通过 Gemini、Groq、OpenAI 或 Claude 使用无限云端重命名。',
      sections: [
        { eyebrow: '概览', title: '什么是 BYOK？', body: 'BYOK 是 Bring Your Own Key。PRO 用户可以连接自己的 API key，而不是消耗 Zush credits。', bullets: ['按 provider 成本进行无限云端重命名', '支持 Gemini、Groq、OpenAI 和 Claude', '密钥保存在本地'] },
        { eyebrow: '步骤', title: '如何设置', body: '在 provider 控制台创建 API key，打开 Zush，进入 Settings > Preferences > BYOK，选择 provider，粘贴密钥并启用 BYOK。' },
        { eyebrow: '安全', title: '数据控制', body: 'BYOK 模式下，分析请求会通过 Zush 基础设施转发到你选择的 provider。正常运行中 Zush 不会永久保存文件内容。' },
      ],
    },
    '/ollama-setup': {
      title: 'Ollama 设置指南',
      description: '通过 Ollama 的私有本地模型使用离线 AI 模式。',
      sections: [
        { eyebrow: '私有', title: '离线 AI 的含义', body: '启用离线 AI 后，支持文件的分析会通过你的本地 Ollama server 运行，而不是发送到云端 provider。' },
        { eyebrow: '安装', title: '设置步骤', body: '安装 Ollama，首次打开应用，下载视觉模型，然后在 Zush 中启用 Offline AI mode。', bullets: ['速度优先：qwen2.5vl:3b', '平衡：gemma3:4b', '文档：granite3.2-vision:2b'] },
        { eyebrow: '帮助', title: '故障排查', body: '如果 Zush 看不到模型，请运行 `ollama list`。如果连接失败，请确认 Ollama 运行在 http://127.0.0.1:11434。' },
      ],
    },
    '/privacy-policy': {
      title: '隐私政策',
      description: 'Zush 如何处理文件、许可证、支付、分析和第三方服务。',
      updated: '最后更新：2026 年 4 月 27 日',
      sections: [
        { eyebrow: '数据', title: '处理哪些信息', body: 'Zush 会处理你选择或监控的文件，用 AI 生成名称、标签和元数据。根据文件类型，可能使用预览图、提取文本或压缩摘要。' },
        { eyebrow: 'AI', title: '云端、BYOK 与离线', body: '默认情况下，分析会通过 Zush 服务器发送给 AI provider。BYOK 使用你自己的 provider。离线模式会通过 Ollama 在本地处理支持的内容。' },
        { eyebrow: '权利', title: '安全与联系', body: '正常云端运行中，完整原始文件不会作为完整文件离开你的设备。如有隐私问题，请联系 support@zushapp.com。' },
      ],
    },
    '/terms-of-service': {
      title: '服务条款',
      description: '在 macOS 和 Windows 上使用 Zush 的条款。',
      updated: '最后更新：2026 年 4 月 26 日',
      sections: [
        { eyebrow: '服务', title: '说明', body: 'Zush 是用 AI 整理、重命名并管理文件元数据的桌面工具，包括批量重命名、文件夹监控、自定义提示词、BYOK 和离线 AI。' },
        { eyebrow: '许可', title: '使用与付款', body: '你获得个人、不可转让的使用许可。Zush PRO 是一次性购买，包含 credits、BYOK 和离线 AI。付款由 Paddle 或应用商店处理。' },
        { eyebrow: '责任', title: 'AI 结果', body: 'AI 可能生成错误或意外的名称。应用前你需要检查变更。服务按现状提供，不作担保。' },
      ],
    },
    '/refund-policy': {
      title: '退款政策',
      description: 'Zush PRO 14 天退款保证说明。',
      updated: '最后更新：2026 年 3 月 19 日',
      sections: [
        { eyebrow: '一次性购买', title: '14 天保证', body: 'Zush PRO 是一次性购买。如果不满意，你可以在购买日起 14 天内申请退款。' },
        { eyebrow: '申请', title: '如何申请退款', body: '请将订单号和购买时使用的邮箱发送到 refund@zushapp.com。' },
        { eyebrow: '处理', title: '退款到账', body: '批准后，退款会退回原支付方式。到账时间取决于发卡机构。' },
      ],
    },
  },
};

export function getStaticPageCopy(locale: Exclude<Locale, 'en'>, route: StaticLocalizedRoute): StaticPageCopy {
  return staticPages[locale]?.[route] ?? staticPages.de![route];
}
