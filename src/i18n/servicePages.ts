import type { Locale, LocalizedRoute } from '@/i18n/config';

export const SERVICE_LOCALIZED_ROUTES = [
  '/activate',
  '/recover',
  '/thank-you',
  '/manage-subscription',
  '/manage-subscription/confirm',
  '/404',
] as const;

export type ServiceLocalizedRoute = (typeof SERVICE_LOCALIZED_ROUTES)[number];

export interface ServiceSeoCopy {
  title: string;
  description: string;
}

export interface ActivateCopy {
  preparingTitle: string;
  preparingText: string;
  invalidTitle: string;
  invalidText: string;
  requestNewLink: string;
  openingTitle: string;
  openingText: string;
  appDidNotOpen: string;
  installHint: string;
  openApp: string;
  notInstalled: string;
  download: string;
}

export interface RecoverCopy {
  successTitle: string;
  successTextBeforeEmail: string;
  successTextAfterEmail: string;
  title: string;
  subtitle: string;
  send: string;
  sending: string;
}

export interface ManageSubscriptionCopy {
  title: string;
  subtitle: string;
  send: string;
  sending: string;
  success: string;
  noteLabel: string;
  noteText: string;
}

export interface ManageSubscriptionConfirmCopy {
  title: string;
  redirecting: string;
  missingToken: string;
  invalidLink: string;
}

export interface ThankYouCopy {
  checkingTitle: string;
  successTitle: string;
  checkingText: string;
  activatedText: string;
  activationReadyText: string;
  expiredText: string;
  expiredNoticeBeforeAction: string;
  expiredNoticeAction: string;
  expiredNoticeAfterAction: string;
  emailText: string;
  emailNoticeBeforeAction: string;
  emailNoticeAction: string;
  emailNoticeAfterAction: string;
  openZush: string;
  downloadZush: string;
}

export interface NotFoundCopy {
  title: string;
  text: string;
}

export interface ServicePageCopy {
  backToHome: string;
  emailPlaceholder: string;
  emailRequired: string;
  genericError: string;
  connectionError: string;
  activate: ActivateCopy;
  recover: RecoverCopy;
  manageSubscription: ManageSubscriptionCopy;
  manageSubscriptionConfirm: ManageSubscriptionConfirmCopy;
  thankYou: ThankYouCopy;
  notFound: NotFoundCopy;
  seo: Record<ServiceLocalizedRoute, ServiceSeoCopy>;
}

export function isServiceLocalizedRoute(route: LocalizedRoute): route is ServiceLocalizedRoute {
  return (SERVICE_LOCALIZED_ROUTES as readonly string[]).includes(route);
}

const en: ServicePageCopy = {
  backToHome: '← Back to Home',
  emailPlaceholder: 'your@email.com',
  emailRequired: 'Please enter your email address',
  genericError: 'Something went wrong. Please try again.',
  connectionError: 'Connection error. Please check your internet and try again.',
  activate: {
    preparingTitle: 'Opening Zush...',
    preparingText: "We're preparing your activation link.",
    invalidTitle: 'Invalid Activation Link',
    invalidText: 'This activation link appears to be invalid or expired. Please request a new activation link.',
    requestNewLink: 'Request New Link',
    openingTitle: 'Opening Zush...',
    openingText: "We're trying to open the Zush app to complete activation.",
    appDidNotOpen: "App didn't open?",
    installHint: 'Make sure Zush is installed on your Mac, then click the button below.',
    openApp: 'Open Zush App',
    notInstalled: "Don't have Zush installed?",
    download: 'Download Zush for Mac',
  },
  recover: {
    successTitle: 'Check your inbox!',
    successTextBeforeEmail: 'If a purchase exists for',
    successTextAfterEmail: "we've sent a one-time activation link. Check your spam folder if you don't see it.",
    title: 'Request Activation Link',
    subtitle: "Enter the email address you used when purchasing Zush PRO. We'll send you a new one-time activation link.",
    send: 'Send Activation Link',
    sending: 'Sending...',
  },
  manageSubscription: {
    title: 'Manage Subscription',
    subtitle: 'Enter the email address associated with your Zush PRO subscription. We will send a one-time link to manage billing, payment methods, or cancellation.',
    send: 'Send Management Link',
    sending: 'Sending...',
    success: 'Check your email for a one-time subscription management link.',
    noteLabel: 'Note:',
    noteText: 'For security, the link expires quickly and can only be used once.',
  },
  manageSubscriptionConfirm: {
    title: 'Opening Subscription Portal',
    redirecting: 'Redirecting to Paddle...',
    missingToken: 'Subscription management link is missing or invalid.',
    invalidLink: 'This subscription management link is invalid or expired.',
  },
  thankYou: {
    checkingTitle: 'Finalizing your purchase...',
    successTitle: 'Thank you for your purchase!',
    checkingText: "We're confirming your payment. This usually takes a few seconds.",
    activatedText: 'Your Zush PRO is active. Enjoy 10,000 credits, BYOK, and Offline AI mode.',
    activationReadyText: "We're opening Zush to activate PRO on this device.",
    expiredText: "We couldn't finish automatic activation from this browser session. We've sent an activation email to you.",
    expiredNoticeBeforeAction: 'Open the email and click the',
    expiredNoticeAction: 'Activate PRO',
    expiredNoticeAfterAction: 'button to unlock PRO features in Zush.',
    emailText: 'Your PRO purchase is ready. We sent the activation link to the email address you used at checkout.',
    emailNoticeBeforeAction: 'Open that email and click',
    emailNoticeAction: 'Activate PRO',
    emailNoticeAfterAction: 'to unlock PRO in Zush. If you do not see the email, please check your spam folder.',
    openZush: 'Open Zush',
    downloadZush: 'Download Zush',
  },
  notFound: {
    title: 'Scan Error',
    text: "Our AI couldn't find the page you're looking for. It might have been moved, renamed, or never existed in the first place.",
  },
  seo: {
    '/activate': { title: 'Activate Zush PRO — Zush', description: 'Open Zush and activate your PRO purchase.' },
    '/recover': { title: 'Recover Activation Link — Zush', description: 'Request a new Zush PRO activation link.' },
    '/thank-you': { title: 'Thank You — Zush', description: 'Complete your Zush PRO purchase and activation.' },
    '/manage-subscription': { title: 'Manage Subscription — Zush', description: 'Request a secure link to manage your Zush subscription.' },
    '/manage-subscription/confirm': { title: 'Opening Subscription Portal — Zush', description: 'Open the secure Paddle customer portal for Zush.' },
    '/404': { title: 'Page Not Found — Zush', description: 'This page does not exist.' },
  },
};

const serviceCopies: Partial<Record<Locale, ServicePageCopy>> = {
  en,
  de: {
    backToHome: '← Zur Startseite',
    emailPlaceholder: 'deine@email.com',
    emailRequired: 'Bitte gib deine E-Mail-Adresse ein',
    genericError: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.',
    connectionError: 'Verbindungsfehler. Bitte prüfe deine Internetverbindung und versuche es erneut.',
    activate: {
      preparingTitle: 'Zush wird geöffnet...',
      preparingText: 'Wir bereiten deinen Aktivierungslink vor.',
      invalidTitle: 'Ungültiger Aktivierungslink',
      invalidText: 'Dieser Aktivierungslink ist offenbar ungültig oder abgelaufen. Bitte fordere einen neuen Link an.',
      requestNewLink: 'Neuen Link anfordern',
      openingTitle: 'Zush wird geöffnet...',
      openingText: 'Wir versuchen, Zush zu öffnen, um die Aktivierung abzuschließen.',
      appDidNotOpen: 'App nicht geöffnet?',
      installHint: 'Stelle sicher, dass Zush auf deinem Mac installiert ist, und klicke dann auf die Schaltfläche unten.',
      openApp: 'Zush öffnen',
      notInstalled: 'Zush noch nicht installiert?',
      download: 'Zush für Mac laden',
    },
    recover: {
      successTitle: 'Prüfe deinen Posteingang!',
      successTextBeforeEmail: 'Wenn es einen Kauf für',
      successTextAfterEmail: 'gibt, haben wir einen einmaligen Aktivierungslink gesendet. Prüfe auch deinen Spam-Ordner.',
      title: 'Aktivierungslink anfordern',
      subtitle: 'Gib die E-Mail-Adresse ein, mit der du Zush PRO gekauft hast. Wir senden dir einen neuen einmaligen Aktivierungslink.',
      send: 'Aktivierungslink senden',
      sending: 'Wird gesendet...',
    },
    manageSubscription: {
      title: 'Abo verwalten',
      subtitle: 'Gib die E-Mail-Adresse deines Zush-PRO-Abos ein. Wir senden dir einen einmaligen Link zum Verwalten von Abrechnung, Zahlungsmethoden oder Kündigung.',
      send: 'Verwaltungslink senden',
      sending: 'Wird gesendet...',
      success: 'Prüfe deine E-Mails auf den einmaligen Verwaltungslink.',
      noteLabel: 'Hinweis:',
      noteText: 'Aus Sicherheitsgründen läuft der Link schnell ab und kann nur einmal verwendet werden.',
    },
    manageSubscriptionConfirm: {
      title: 'Abo-Portal wird geöffnet',
      redirecting: 'Weiterleitung zu Paddle...',
      missingToken: 'Der Link zur Abo-Verwaltung fehlt oder ist ungültig.',
      invalidLink: 'Dieser Link zur Abo-Verwaltung ist ungültig oder abgelaufen.',
    },
    thankYou: {
      checkingTitle: 'Kauf wird abgeschlossen...',
      successTitle: 'Danke für deinen Kauf!',
      checkingText: 'Wir bestätigen deine Zahlung. Das dauert normalerweise nur ein paar Sekunden.',
      activatedText: 'Zush PRO ist aktiv. Du kannst 10.000 Credits, BYOK und Offline-KI nutzen.',
      activationReadyText: 'Wir öffnen Zush, um PRO auf diesem Gerät zu aktivieren.',
      expiredText: 'Die automatische Aktivierung konnte in dieser Browser-Sitzung nicht abgeschlossen werden. Wir haben dir eine Aktivierungs-E-Mail gesendet.',
      expiredNoticeBeforeAction: 'Öffne die E-Mail und klicke auf',
      expiredNoticeAction: 'PRO aktivieren',
      expiredNoticeAfterAction: 'um PRO-Funktionen in Zush freizuschalten.',
      emailText: 'Dein PRO-Kauf ist bereit. Wir haben den Aktivierungslink an die beim Checkout verwendete E-Mail-Adresse gesendet.',
      emailNoticeBeforeAction: 'Öffne diese E-Mail und klicke auf',
      emailNoticeAction: 'PRO aktivieren',
      emailNoticeAfterAction: 'um PRO in Zush freizuschalten. Wenn du die E-Mail nicht siehst, prüfe bitte den Spam-Ordner.',
      openZush: 'Zush öffnen',
      downloadZush: 'Zush laden',
    },
    notFound: {
      title: 'Scan-Fehler',
      text: 'Unsere KI konnte die gesuchte Seite nicht finden. Sie wurde möglicherweise verschoben, umbenannt oder hat nie existiert.',
    },
    seo: {
      '/activate': { title: 'Zush PRO aktivieren — Zush', description: 'Öffne Zush und aktiviere deinen PRO-Kauf.' },
      '/recover': { title: 'Aktivierungslink wiederherstellen — Zush', description: 'Fordere einen neuen Aktivierungslink für Zush PRO an.' },
      '/thank-you': { title: 'Danke — Zush', description: 'Schließe Kauf und Aktivierung von Zush PRO ab.' },
      '/manage-subscription': { title: 'Abo verwalten — Zush', description: 'Fordere einen sicheren Link zur Verwaltung deines Zush-Abos an.' },
      '/manage-subscription/confirm': { title: 'Abo-Portal wird geöffnet — Zush', description: 'Öffne das sichere Paddle-Kundenportal für Zush.' },
      '/404': { title: 'Seite nicht gefunden — Zush', description: 'Diese Seite existiert nicht.' },
    },
  },
  fr: {
    backToHome: '← Retour à l’accueil',
    emailPlaceholder: 'votre@email.com',
    emailRequired: 'Veuillez saisir votre adresse email',
    genericError: 'Une erreur est survenue. Veuillez réessayer.',
    connectionError: 'Erreur de connexion. Vérifiez votre connexion Internet et réessayez.',
    activate: {
      preparingTitle: 'Ouverture de Zush...',
      preparingText: 'Nous préparons votre lien d’activation.',
      invalidTitle: 'Lien d’activation invalide',
      invalidText: 'Ce lien d’activation semble invalide ou expiré. Veuillez demander un nouveau lien.',
      requestNewLink: 'Demander un nouveau lien',
      openingTitle: 'Ouverture de Zush...',
      openingText: 'Nous essayons d’ouvrir Zush pour terminer l’activation.',
      appDidNotOpen: 'L’app ne s’est pas ouverte ?',
      installHint: 'Assurez-vous que Zush est installé sur votre Mac, puis cliquez sur le bouton ci-dessous.',
      openApp: 'Ouvrir Zush',
      notInstalled: 'Zush n’est pas installé ?',
      download: 'Télécharger Zush pour Mac',
    },
    recover: {
      successTitle: 'Vérifiez votre boîte mail !',
      successTextBeforeEmail: 'Si un achat existe pour',
      successTextAfterEmail: 'nous avons envoyé un lien d’activation à usage unique. Vérifiez aussi le dossier spam.',
      title: 'Demander un lien d’activation',
      subtitle: 'Saisissez l’adresse email utilisée pour acheter Zush PRO. Nous vous enverrons un nouveau lien d’activation à usage unique.',
      send: 'Envoyer le lien d’activation',
      sending: 'Envoi...',
    },
    manageSubscription: {
      title: 'Gérer l’abonnement',
      subtitle: 'Saisissez l’adresse email associée à votre abonnement Zush PRO. Nous enverrons un lien unique pour gérer la facturation, les moyens de paiement ou l’annulation.',
      send: 'Envoyer le lien de gestion',
      sending: 'Envoi...',
      success: 'Vérifiez votre email pour le lien de gestion à usage unique.',
      noteLabel: 'Note :',
      noteText: 'Pour des raisons de sécurité, le lien expire rapidement et ne peut être utilisé qu’une seule fois.',
    },
    manageSubscriptionConfirm: {
      title: 'Ouverture du portail d’abonnement',
      redirecting: 'Redirection vers Paddle...',
      missingToken: 'Le lien de gestion de l’abonnement est manquant ou invalide.',
      invalidLink: 'Ce lien de gestion de l’abonnement est invalide ou expiré.',
    },
    thankYou: {
      checkingTitle: 'Finalisation de votre achat...',
      successTitle: 'Merci pour votre achat !',
      checkingText: 'Nous confirmons votre paiement. Cela prend généralement quelques secondes.',
      activatedText: 'Zush PRO est actif. Profitez de 10 000 crédits, de BYOK et du mode IA hors ligne.',
      activationReadyText: 'Nous ouvrons Zush pour activer PRO sur cet appareil.',
      expiredText: 'Nous n’avons pas pu terminer l’activation automatique depuis cette session. Nous vous avons envoyé un email d’activation.',
      expiredNoticeBeforeAction: 'Ouvrez l’email et cliquez sur',
      expiredNoticeAction: 'Activer PRO',
      expiredNoticeAfterAction: 'pour déverrouiller les fonctionnalités PRO dans Zush.',
      emailText: 'Votre achat PRO est prêt. Nous avons envoyé le lien d’activation à l’adresse email utilisée lors du paiement.',
      emailNoticeBeforeAction: 'Ouvrez cet email et cliquez sur',
      emailNoticeAction: 'Activer PRO',
      emailNoticeAfterAction: 'pour déverrouiller PRO dans Zush. Si vous ne voyez pas l’email, vérifiez le dossier spam.',
      openZush: 'Ouvrir Zush',
      downloadZush: 'Télécharger Zush',
    },
    notFound: {
      title: 'Erreur de scan',
      text: 'Notre IA n’a pas trouvé la page recherchée. Elle a peut-être été déplacée, renommée ou n’a jamais existé.',
    },
    seo: {
      '/activate': { title: 'Activer Zush PRO — Zush', description: 'Ouvrez Zush et activez votre achat PRO.' },
      '/recover': { title: 'Récupérer le lien d’activation — Zush', description: 'Demandez un nouveau lien d’activation Zush PRO.' },
      '/thank-you': { title: 'Merci — Zush', description: 'Terminez votre achat et l’activation de Zush PRO.' },
      '/manage-subscription': { title: 'Gérer l’abonnement — Zush', description: 'Demandez un lien sécurisé pour gérer votre abonnement Zush.' },
      '/manage-subscription/confirm': { title: 'Ouverture du portail d’abonnement — Zush', description: 'Ouvrez le portail client Paddle sécurisé pour Zush.' },
      '/404': { title: 'Page introuvable — Zush', description: 'Cette page n’existe pas.' },
    },
  },
  'pt-br': {
    backToHome: '← Voltar ao início',
    emailPlaceholder: 'seu@email.com',
    emailRequired: 'Digite seu email',
    genericError: 'Algo deu errado. Tente novamente.',
    connectionError: 'Erro de conexão. Verifique sua internet e tente novamente.',
    activate: {
      preparingTitle: 'Abrindo o Zush...',
      preparingText: 'Estamos preparando seu link de ativação.',
      invalidTitle: 'Link de ativação inválido',
      invalidText: 'Este link de ativação parece inválido ou expirado. Solicite um novo link.',
      requestNewLink: 'Solicitar novo link',
      openingTitle: 'Abrindo o Zush...',
      openingText: 'Estamos tentando abrir o Zush para concluir a ativação.',
      appDidNotOpen: 'O app não abriu?',
      installHint: 'Confira se o Zush está instalado no seu Mac e clique no botão abaixo.',
      openApp: 'Abrir Zush',
      notInstalled: 'Ainda não tem o Zush?',
      download: 'Baixar Zush para Mac',
    },
    recover: {
      successTitle: 'Verifique sua caixa de entrada!',
      successTextBeforeEmail: 'Se existir uma compra para',
      successTextAfterEmail: 'enviamos um link de ativação único. Verifique também a pasta de spam.',
      title: 'Solicitar link de ativação',
      subtitle: 'Digite o email usado na compra do Zush PRO. Enviaremos um novo link de ativação único.',
      send: 'Enviar link de ativação',
      sending: 'Enviando...',
    },
    manageSubscription: {
      title: 'Gerenciar assinatura',
      subtitle: 'Digite o email associado à sua assinatura Zush PRO. Enviaremos um link único para gerenciar cobrança, métodos de pagamento ou cancelamento.',
      send: 'Enviar link de gerenciamento',
      sending: 'Enviando...',
      success: 'Verifique seu email para acessar o link único de gerenciamento.',
      noteLabel: 'Observação:',
      noteText: 'Por segurança, o link expira rapidamente e só pode ser usado uma vez.',
    },
    manageSubscriptionConfirm: {
      title: 'Abrindo portal da assinatura',
      redirecting: 'Redirecionando para a Paddle...',
      missingToken: 'O link de gerenciamento da assinatura está ausente ou inválido.',
      invalidLink: 'Este link de gerenciamento da assinatura é inválido ou expirou.',
    },
    thankYou: {
      checkingTitle: 'Finalizando sua compra...',
      successTitle: 'Obrigado pela compra!',
      checkingText: 'Estamos confirmando seu pagamento. Normalmente leva alguns segundos.',
      activatedText: 'Seu Zush PRO está ativo. Aproveite 10.000 créditos, BYOK e modo IA offline.',
      activationReadyText: 'Estamos abrindo o Zush para ativar o PRO neste dispositivo.',
      expiredText: 'Não conseguimos concluir a ativação automática nesta sessão do navegador. Enviamos um email de ativação.',
      expiredNoticeBeforeAction: 'Abra o email e clique em',
      expiredNoticeAction: 'Ativar PRO',
      expiredNoticeAfterAction: 'para liberar os recursos PRO no Zush.',
      emailText: 'Sua compra PRO está pronta. Enviamos o link de ativação para o email usado no checkout.',
      emailNoticeBeforeAction: 'Abra esse email e clique em',
      emailNoticeAction: 'Ativar PRO',
      emailNoticeAfterAction: 'para liberar o PRO no Zush. Se não encontrar o email, verifique a pasta de spam.',
      openZush: 'Abrir Zush',
      downloadZush: 'Baixar Zush',
    },
    notFound: {
      title: 'Erro de varredura',
      text: 'Nossa IA não encontrou a página que você procura. Ela pode ter sido movida, renomeada ou nunca ter existido.',
    },
    seo: {
      '/activate': { title: 'Ativar Zush PRO — Zush', description: 'Abra o Zush e ative sua compra PRO.' },
      '/recover': { title: 'Recuperar link de ativação — Zush', description: 'Solicite um novo link de ativação do Zush PRO.' },
      '/thank-you': { title: 'Obrigado — Zush', description: 'Conclua sua compra e ativação do Zush PRO.' },
      '/manage-subscription': { title: 'Gerenciar assinatura — Zush', description: 'Solicite um link seguro para gerenciar sua assinatura Zush.' },
      '/manage-subscription/confirm': { title: 'Abrindo portal da assinatura — Zush', description: 'Abra o portal seguro da Paddle para o Zush.' },
      '/404': { title: 'Página não encontrada — Zush', description: 'Esta página não existe.' },
    },
  },
  es: {
    backToHome: '← Volver al inicio',
    emailPlaceholder: 'tu@email.com',
    emailRequired: 'Introduce tu email',
    genericError: 'Algo salió mal. Inténtalo de nuevo.',
    connectionError: 'Error de conexión. Revisa tu conexión e inténtalo de nuevo.',
    activate: {
      preparingTitle: 'Abriendo Zush...',
      preparingText: 'Estamos preparando tu enlace de activación.',
      invalidTitle: 'Enlace de activación inválido',
      invalidText: 'Este enlace de activación parece inválido o caducado. Solicita un nuevo enlace.',
      requestNewLink: 'Solicitar nuevo enlace',
      openingTitle: 'Abriendo Zush...',
      openingText: 'Estamos intentando abrir Zush para completar la activación.',
      appDidNotOpen: '¿La app no se abrió?',
      installHint: 'Asegúrate de que Zush esté instalado en tu Mac y haz clic en el botón de abajo.',
      openApp: 'Abrir Zush',
      notInstalled: '¿No tienes Zush instalado?',
      download: 'Descargar Zush para Mac',
    },
    recover: {
      successTitle: 'Revisa tu bandeja de entrada',
      successTextBeforeEmail: 'Si existe una compra para',
      successTextAfterEmail: 'hemos enviado un enlace de activación de un solo uso. Revisa también la carpeta de spam.',
      title: 'Solicitar enlace de activación',
      subtitle: 'Introduce el email que usaste al comprar Zush PRO. Te enviaremos un nuevo enlace de activación de un solo uso.',
      send: 'Enviar enlace de activación',
      sending: 'Enviando...',
    },
    manageSubscription: {
      title: 'Gestionar suscripción',
      subtitle: 'Introduce el email asociado a tu suscripción de Zush PRO. Enviaremos un enlace de un solo uso para gestionar facturación, métodos de pago o cancelación.',
      send: 'Enviar enlace de gestión',
      sending: 'Enviando...',
      success: 'Revisa tu email para acceder al enlace de gestión de un solo uso.',
      noteLabel: 'Nota:',
      noteText: 'Por seguridad, el enlace caduca rápido y solo puede usarse una vez.',
    },
    manageSubscriptionConfirm: {
      title: 'Abriendo portal de suscripción',
      redirecting: 'Redirigiendo a Paddle...',
      missingToken: 'Falta el enlace de gestión de la suscripción o no es válido.',
      invalidLink: 'Este enlace de gestión de la suscripción no es válido o ha caducado.',
    },
    thankYou: {
      checkingTitle: 'Finalizando tu compra...',
      successTitle: 'Gracias por tu compra',
      checkingText: 'Estamos confirmando tu pago. Normalmente tarda unos segundos.',
      activatedText: 'Tu Zush PRO está activo. Disfruta de 10.000 créditos, BYOK y modo IA offline.',
      activationReadyText: 'Estamos abriendo Zush para activar PRO en este dispositivo.',
      expiredText: 'No pudimos completar la activación automática desde esta sesión. Te hemos enviado un email de activación.',
      expiredNoticeBeforeAction: 'Abre el email y haz clic en',
      expiredNoticeAction: 'Activar PRO',
      expiredNoticeAfterAction: 'para desbloquear las funciones PRO en Zush.',
      emailText: 'Tu compra PRO está lista. Enviamos el enlace de activación al email usado en el checkout.',
      emailNoticeBeforeAction: 'Abre ese email y haz clic en',
      emailNoticeAction: 'Activar PRO',
      emailNoticeAfterAction: 'para desbloquear PRO en Zush. Si no ves el email, revisa la carpeta de spam.',
      openZush: 'Abrir Zush',
      downloadZush: 'Descargar Zush',
    },
    notFound: {
      title: 'Error de escaneo',
      text: 'Nuestra IA no encontró la página que buscas. Puede haberse movido, renombrado o quizá nunca existió.',
    },
    seo: {
      '/activate': { title: 'Activar Zush PRO — Zush', description: 'Abre Zush y activa tu compra PRO.' },
      '/recover': { title: 'Recuperar enlace de activación — Zush', description: 'Solicita un nuevo enlace de activación de Zush PRO.' },
      '/thank-you': { title: 'Gracias — Zush', description: 'Completa tu compra y activación de Zush PRO.' },
      '/manage-subscription': { title: 'Gestionar suscripción — Zush', description: 'Solicita un enlace seguro para gestionar tu suscripción de Zush.' },
      '/manage-subscription/confirm': { title: 'Abriendo portal de suscripción — Zush', description: 'Abre el portal seguro de Paddle para Zush.' },
      '/404': { title: 'Página no encontrada — Zush', description: 'Esta página no existe.' },
    },
  },
  nl: {
    backToHome: '← Terug naar home',
    emailPlaceholder: 'jij@email.com',
    emailRequired: 'Vul je e-mailadres in',
    genericError: 'Er ging iets mis. Probeer het opnieuw.',
    connectionError: 'Verbindingsfout. Controleer je internet en probeer opnieuw.',
    activate: {
      preparingTitle: 'Zush wordt geopend...',
      preparingText: 'We bereiden je activatielink voor.',
      invalidTitle: 'Ongeldige activatielink',
      invalidText: 'Deze activatielink lijkt ongeldig of verlopen. Vraag een nieuwe link aan.',
      requestNewLink: 'Nieuwe link aanvragen',
      openingTitle: 'Zush wordt geopend...',
      openingText: 'We proberen Zush te openen om de activatie af te ronden.',
      appDidNotOpen: 'App niet geopend?',
      installHint: 'Controleer of Zush op je Mac is geïnstalleerd en klik daarna op de knop hieronder.',
      openApp: 'Zush openen',
      notInstalled: 'Zush nog niet geïnstalleerd?',
      download: 'Zush voor Mac downloaden',
    },
    recover: {
      successTitle: 'Controleer je inbox',
      successTextBeforeEmail: 'Als er een aankoop bestaat voor',
      successTextAfterEmail: 'hebben we een eenmalige activatielink gestuurd. Controleer ook je spammap.',
      title: 'Activatielink aanvragen',
      subtitle: 'Vul het e-mailadres in waarmee je Zush PRO hebt gekocht. We sturen je een nieuwe eenmalige activatielink.',
      send: 'Activatielink versturen',
      sending: 'Versturen...',
    },
    manageSubscription: {
      title: 'Abonnement beheren',
      subtitle: 'Vul het e-mailadres in dat hoort bij je Zush PRO-abonnement. We sturen een eenmalige link om facturatie, betaalmethoden of annulering te beheren.',
      send: 'Beheerlink versturen',
      sending: 'Versturen...',
      success: 'Controleer je e-mail voor de eenmalige beheerlink.',
      noteLabel: 'Let op:',
      noteText: 'Om veiligheidsredenen verloopt de link snel en kan hij maar één keer worden gebruikt.',
    },
    manageSubscriptionConfirm: {
      title: 'Abonnementsportaal openen',
      redirecting: 'Doorsturen naar Paddle...',
      missingToken: 'De beheerlink voor het abonnement ontbreekt of is ongeldig.',
      invalidLink: 'Deze beheerlink voor het abonnement is ongeldig of verlopen.',
    },
    thankYou: {
      checkingTitle: 'Je aankoop afronden...',
      successTitle: 'Bedankt voor je aankoop',
      checkingText: 'We bevestigen je betaling. Dit duurt meestal een paar seconden.',
      activatedText: 'Zush PRO is actief. Je kunt 10.000 credits, BYOK en Offline AI gebruiken.',
      activationReadyText: 'We openen Zush om PRO op dit apparaat te activeren.',
      expiredText: 'We konden automatische activatie niet afronden vanuit deze browsersessie. We hebben je een activatie-e-mail gestuurd.',
      expiredNoticeBeforeAction: 'Open de e-mail en klik op',
      expiredNoticeAction: 'PRO activeren',
      expiredNoticeAfterAction: 'om PRO-functies in Zush te ontgrendelen.',
      emailText: 'Je PRO-aankoop is klaar. We hebben de activatielink gestuurd naar het e-mailadres dat je bij checkout gebruikte.',
      emailNoticeBeforeAction: 'Open die e-mail en klik op',
      emailNoticeAction: 'PRO activeren',
      emailNoticeAfterAction: 'om PRO in Zush te ontgrendelen. Zie je de e-mail niet, controleer dan je spammap.',
      openZush: 'Zush openen',
      downloadZush: 'Zush downloaden',
    },
    notFound: {
      title: 'Scanfout',
      text: 'Onze AI kon de pagina die je zoekt niet vinden. De pagina is mogelijk verplaatst, hernoemd of heeft nooit bestaan.',
    },
    seo: {
      '/activate': { title: 'Zush PRO activeren — Zush', description: 'Open Zush en activeer je PRO-aankoop.' },
      '/recover': { title: 'Activatielink herstellen — Zush', description: 'Vraag een nieuwe activatielink voor Zush PRO aan.' },
      '/thank-you': { title: 'Bedankt — Zush', description: 'Rond je aankoop en activatie van Zush PRO af.' },
      '/manage-subscription': { title: 'Abonnement beheren — Zush', description: 'Vraag een veilige link aan om je Zush-abonnement te beheren.' },
      '/manage-subscription/confirm': { title: 'Abonnementsportaal openen — Zush', description: 'Open het veilige Paddle-klantportaal voor Zush.' },
      '/404': { title: 'Pagina niet gevonden — Zush', description: 'Deze pagina bestaat niet.' },
    },
  },
  it: {
    backToHome: '← Torna alla home',
    emailPlaceholder: 'tuo@email.com',
    emailRequired: 'Inserisci il tuo indirizzo email',
    genericError: 'Qualcosa è andato storto. Riprova.',
    connectionError: 'Errore di connessione. Controlla Internet e riprova.',
    activate: {
      preparingTitle: 'Apertura di Zush...',
      preparingText: 'Stiamo preparando il link di attivazione.',
      invalidTitle: 'Link di attivazione non valido',
      invalidText: 'Questo link di attivazione sembra non valido o scaduto. Richiedi un nuovo link.',
      requestNewLink: 'Richiedi nuovo link',
      openingTitle: 'Apertura di Zush...',
      openingText: 'Stiamo provando ad aprire Zush per completare l’attivazione.',
      appDidNotOpen: 'L’app non si è aperta?',
      installHint: 'Assicurati che Zush sia installato sul Mac, poi fai clic sul pulsante qui sotto.',
      openApp: 'Apri Zush',
      notInstalled: 'Zush non è installato?',
      download: 'Scarica Zush per Mac',
    },
    recover: {
      successTitle: 'Controlla la posta',
      successTextBeforeEmail: 'Se esiste un acquisto per',
      successTextAfterEmail: 'abbiamo inviato un link di attivazione monouso. Controlla anche lo spam.',
      title: 'Richiedi link di attivazione',
      subtitle: 'Inserisci l’email usata per acquistare Zush PRO. Ti invieremo un nuovo link di attivazione monouso.',
      send: 'Invia link di attivazione',
      sending: 'Invio...',
    },
    manageSubscription: {
      title: 'Gestisci abbonamento',
      subtitle: 'Inserisci l’email associata al tuo abbonamento Zush PRO. Invieremo un link monouso per gestire fatturazione, metodi di pagamento o cancellazione.',
      send: 'Invia link di gestione',
      sending: 'Invio...',
      success: 'Controlla l’email per il link di gestione monouso.',
      noteLabel: 'Nota:',
      noteText: 'Per sicurezza, il link scade rapidamente e può essere usato una sola volta.',
    },
    manageSubscriptionConfirm: {
      title: 'Apertura portale abbonamento',
      redirecting: 'Reindirizzamento a Paddle...',
      missingToken: 'Il link di gestione dell’abbonamento manca o non è valido.',
      invalidLink: 'Questo link di gestione dell’abbonamento non è valido o è scaduto.',
    },
    thankYou: {
      checkingTitle: 'Finalizzazione dell’acquisto...',
      successTitle: 'Grazie per l’acquisto',
      checkingText: 'Stiamo confermando il pagamento. Di solito richiede pochi secondi.',
      activatedText: 'Zush PRO è attivo. Usa 10.000 crediti, BYOK e la modalità IA offline.',
      activationReadyText: 'Stiamo aprendo Zush per attivare PRO su questo dispositivo.',
      expiredText: 'Non siamo riusciti a completare l’attivazione automatica da questa sessione del browser. Ti abbiamo inviato un’email di attivazione.',
      expiredNoticeBeforeAction: 'Apri l’email e fai clic su',
      expiredNoticeAction: 'Attiva PRO',
      expiredNoticeAfterAction: 'per sbloccare le funzioni PRO in Zush.',
      emailText: 'Il tuo acquisto PRO è pronto. Abbiamo inviato il link di attivazione all’email usata al checkout.',
      emailNoticeBeforeAction: 'Apri quell’email e fai clic su',
      emailNoticeAction: 'Attiva PRO',
      emailNoticeAfterAction: 'per sbloccare PRO in Zush. Se non vedi l’email, controlla lo spam.',
      openZush: 'Apri Zush',
      downloadZush: 'Scarica Zush',
    },
    notFound: {
      title: 'Errore di scansione',
      text: 'La nostra IA non ha trovato la pagina che cerchi. Potrebbe essere stata spostata, rinominata o non essere mai esistita.',
    },
    seo: {
      '/activate': { title: 'Attiva Zush PRO — Zush', description: 'Apri Zush e attiva il tuo acquisto PRO.' },
      '/recover': { title: 'Recupera link di attivazione — Zush', description: 'Richiedi un nuovo link di attivazione per Zush PRO.' },
      '/thank-you': { title: 'Grazie — Zush', description: 'Completa acquisto e attivazione di Zush PRO.' },
      '/manage-subscription': { title: 'Gestisci abbonamento — Zush', description: 'Richiedi un link sicuro per gestire il tuo abbonamento Zush.' },
      '/manage-subscription/confirm': { title: 'Apertura portale abbonamento — Zush', description: 'Apri il portale clienti Paddle sicuro per Zush.' },
      '/404': { title: 'Pagina non trovata — Zush', description: 'Questa pagina non esiste.' },
    },
  },
  ja: {
    backToHome: '← ホームへ戻る',
    emailPlaceholder: 'your@email.com',
    emailRequired: 'メールアドレスを入力してください',
    genericError: '問題が発生しました。もう一度お試しください。',
    connectionError: '接続エラーです。インターネット接続を確認してもう一度お試しください。',
    activate: {
      preparingTitle: 'Zush を開いています...',
      preparingText: 'アクティベーションリンクを準備しています。',
      invalidTitle: '無効なアクティベーションリンク',
      invalidText: 'このアクティベーションリンクは無効または期限切れのようです。新しいリンクをリクエストしてください。',
      requestNewLink: '新しいリンクをリクエスト',
      openingTitle: 'Zush を開いています...',
      openingText: 'アクティベーションを完了するために Zush を開こうとしています。',
      appDidNotOpen: 'アプリが開きませんか？',
      installHint: 'Zush が Mac にインストールされていることを確認し、下のボタンをクリックしてください。',
      openApp: 'Zush を開く',
      notInstalled: 'Zush がインストールされていませんか？',
      download: 'Mac 版 Zush をダウンロード',
    },
    recover: {
      successTitle: '受信トレイを確認してください',
      successTextBeforeEmail: '購入情報が',
      successTextAfterEmail: 'に存在する場合、1 回限りのアクティベーションリンクを送信しました。見つからない場合は迷惑メールも確認してください。',
      title: 'アクティベーションリンクをリクエスト',
      subtitle: 'Zush PRO の購入時に使用したメールアドレスを入力してください。新しい 1 回限りのアクティベーションリンクを送信します。',
      send: 'アクティベーションリンクを送信',
      sending: '送信中...',
    },
    manageSubscription: {
      title: 'サブスクリプションを管理',
      subtitle: 'Zush PRO サブスクリプションに紐づくメールアドレスを入力してください。請求、支払い方法、キャンセルを管理するための 1 回限りのリンクを送信します。',
      send: '管理リンクを送信',
      sending: '送信中...',
      success: '1 回限りの管理リンクをメールで確認してください。',
      noteLabel: '注意:',
      noteText: 'セキュリティのため、リンクは短時間で期限切れになり、1 回だけ使用できます。',
    },
    manageSubscriptionConfirm: {
      title: 'サブスクリプションポータルを開いています',
      redirecting: 'Paddle にリダイレクトしています...',
      missingToken: 'サブスクリプション管理リンクがないか、無効です。',
      invalidLink: 'このサブスクリプション管理リンクは無効または期限切れです。',
    },
    thankYou: {
      checkingTitle: '購入を完了しています...',
      successTitle: 'ご購入ありがとうございます',
      checkingText: 'お支払いを確認しています。通常は数秒で完了します。',
      activatedText: 'Zush PRO が有効になりました。10,000 クレジット、BYOK、オフライン AI モードを利用できます。',
      activationReadyText: 'このデバイスで PRO を有効化するために Zush を開いています。',
      expiredText: 'このブラウザセッションでは自動アクティベーションを完了できませんでした。アクティベーションメールを送信しました。',
      expiredNoticeBeforeAction: 'メールを開き、',
      expiredNoticeAction: 'PRO を有効化',
      expiredNoticeAfterAction: 'をクリックして Zush の PRO 機能を有効にしてください。',
      emailText: 'PRO の購入準備ができました。チェックアウト時に使用したメールアドレスへアクティベーションリンクを送信しました。',
      emailNoticeBeforeAction: 'そのメールを開き、',
      emailNoticeAction: 'PRO を有効化',
      emailNoticeAfterAction: 'をクリックして Zush の PRO を有効にしてください。メールが見つからない場合は迷惑メールを確認してください。',
      openZush: 'Zush を開く',
      downloadZush: 'Zush をダウンロード',
    },
    notFound: {
      title: 'スキャンエラー',
      text: 'AI はお探しのページを見つけられませんでした。移動、名前変更、または存在しないページの可能性があります。',
    },
    seo: {
      '/activate': { title: 'Zush PRO を有効化 — Zush', description: 'Zush を開いて PRO 購入を有効化します。' },
      '/recover': { title: 'アクティベーションリンクを再取得 — Zush', description: 'Zush PRO の新しいアクティベーションリンクをリクエストします。' },
      '/thank-you': { title: 'ありがとうございます — Zush', description: 'Zush PRO の購入とアクティベーションを完了します。' },
      '/manage-subscription': { title: 'サブスクリプション管理 — Zush', description: 'Zush サブスクリプションを管理する安全なリンクをリクエストします。' },
      '/manage-subscription/confirm': { title: 'サブスクリプションポータルを開く — Zush', description: 'Zush の安全な Paddle 顧客ポータルを開きます。' },
      '/404': { title: 'ページが見つかりません — Zush', description: 'このページは存在しません。' },
    },
  },
  ko: {
    backToHome: '← 홈으로 돌아가기',
    emailPlaceholder: 'your@email.com',
    emailRequired: '이메일 주소를 입력해 주세요',
    genericError: '문제가 발생했습니다. 다시 시도해 주세요.',
    connectionError: '연결 오류입니다. 인터넷 연결을 확인하고 다시 시도해 주세요.',
    activate: {
      preparingTitle: 'Zush를 여는 중...',
      preparingText: '활성화 링크를 준비하고 있습니다.',
      invalidTitle: '잘못된 활성화 링크',
      invalidText: '이 활성화 링크는 잘못되었거나 만료된 것 같습니다. 새 링크를 요청해 주세요.',
      requestNewLink: '새 링크 요청',
      openingTitle: 'Zush를 여는 중...',
      openingText: '활성화를 완료하기 위해 Zush 앱을 열고 있습니다.',
      appDidNotOpen: '앱이 열리지 않았나요?',
      installHint: 'Mac에 Zush가 설치되어 있는지 확인한 뒤 아래 버튼을 클릭하세요.',
      openApp: 'Zush 열기',
      notInstalled: 'Zush가 설치되어 있지 않나요?',
      download: 'Mac용 Zush 다운로드',
    },
    recover: {
      successTitle: '받은편지함을 확인하세요',
      successTextBeforeEmail: '구매 내역이',
      successTextAfterEmail: '에 있으면 1회용 활성화 링크를 보냈습니다. 보이지 않으면 스팸함도 확인하세요.',
      title: '활성화 링크 요청',
      subtitle: 'Zush PRO 구매 시 사용한 이메일 주소를 입력하세요. 새 1회용 활성화 링크를 보내드립니다.',
      send: '활성화 링크 보내기',
      sending: '보내는 중...',
    },
    manageSubscription: {
      title: '구독 관리',
      subtitle: 'Zush PRO 구독에 연결된 이메일 주소를 입력하세요. 청구, 결제 수단 또는 취소를 관리할 수 있는 1회용 링크를 보내드립니다.',
      send: '관리 링크 보내기',
      sending: '보내는 중...',
      success: '1회용 구독 관리 링크를 이메일에서 확인하세요.',
      noteLabel: '참고:',
      noteText: '보안을 위해 링크는 빠르게 만료되며 한 번만 사용할 수 있습니다.',
    },
    manageSubscriptionConfirm: {
      title: '구독 포털 여는 중',
      redirecting: 'Paddle로 이동 중...',
      missingToken: '구독 관리 링크가 없거나 잘못되었습니다.',
      invalidLink: '이 구독 관리 링크는 잘못되었거나 만료되었습니다.',
    },
    thankYou: {
      checkingTitle: '구매를 완료하는 중...',
      successTitle: '구매해 주셔서 감사합니다',
      checkingText: '결제를 확인하고 있습니다. 보통 몇 초 안에 완료됩니다.',
      activatedText: 'Zush PRO가 활성화되었습니다. 10,000 크레딧, BYOK, 오프라인 AI 모드를 사용할 수 있습니다.',
      activationReadyText: '이 기기에서 PRO를 활성화하기 위해 Zush를 열고 있습니다.',
      expiredText: '이 브라우저 세션에서 자동 활성화를 완료하지 못했습니다. 활성화 이메일을 보냈습니다.',
      expiredNoticeBeforeAction: '이메일을 열고',
      expiredNoticeAction: 'PRO 활성화',
      expiredNoticeAfterAction: '버튼을 클릭해 Zush의 PRO 기능을 잠금 해제하세요.',
      emailText: 'PRO 구매가 준비되었습니다. 결제 시 사용한 이메일 주소로 활성화 링크를 보냈습니다.',
      emailNoticeBeforeAction: '해당 이메일을 열고',
      emailNoticeAction: 'PRO 활성화',
      emailNoticeAfterAction: '를 클릭해 Zush PRO를 잠금 해제하세요. 이메일이 보이지 않으면 스팸함을 확인하세요.',
      openZush: 'Zush 열기',
      downloadZush: 'Zush 다운로드',
    },
    notFound: {
      title: '스캔 오류',
      text: 'AI가 찾으려는 페이지를 찾지 못했습니다. 이동되었거나 이름이 바뀌었거나 처음부터 없던 페이지일 수 있습니다.',
    },
    seo: {
      '/activate': { title: 'Zush PRO 활성화 — Zush', description: 'Zush를 열고 PRO 구매를 활성화하세요.' },
      '/recover': { title: '활성화 링크 복구 — Zush', description: 'Zush PRO의 새 활성화 링크를 요청하세요.' },
      '/thank-you': { title: '감사합니다 — Zush', description: 'Zush PRO 구매와 활성화를 완료하세요.' },
      '/manage-subscription': { title: '구독 관리 — Zush', description: 'Zush 구독을 관리할 안전한 링크를 요청하세요.' },
      '/manage-subscription/confirm': { title: '구독 포털 여는 중 — Zush', description: 'Zush용 보안 Paddle 고객 포털을 엽니다.' },
      '/404': { title: '페이지를 찾을 수 없음 — Zush', description: '이 페이지는 존재하지 않습니다.' },
    },
  },
  'zh-cn': {
    backToHome: '← 返回首页',
    emailPlaceholder: 'your@email.com',
    emailRequired: '请输入邮箱地址',
    genericError: '出现问题，请重试。',
    connectionError: '连接错误。请检查网络后重试。',
    activate: {
      preparingTitle: '正在打开 Zush...',
      preparingText: '正在准备你的激活链接。',
      invalidTitle: '激活链接无效',
      invalidText: '此激活链接似乎无效或已过期。请申请新的激活链接。',
      requestNewLink: '申请新链接',
      openingTitle: '正在打开 Zush...',
      openingText: '正在尝试打开 Zush 以完成激活。',
      appDidNotOpen: '应用没有打开？',
      installHint: '请确认你的 Mac 已安装 Zush，然后点击下面的按钮。',
      openApp: '打开 Zush',
      notInstalled: '还没有安装 Zush？',
      download: '下载 Mac 版 Zush',
    },
    recover: {
      successTitle: '请查看收件箱',
      successTextBeforeEmail: '如果',
      successTextAfterEmail: '存在购买记录，我们已发送一次性激活链接。没有看到邮件时，请检查垃圾邮件文件夹。',
      title: '申请激活链接',
      subtitle: '请输入购买 Zush PRO 时使用的邮箱地址。我们会发送新的“一次性”激活链接。',
      send: '发送激活链接',
      sending: '发送中...',
    },
    manageSubscription: {
      title: '管理订阅',
      subtitle: '请输入与你的 Zush PRO 订阅关联的邮箱地址。我们会发送一次性链接，用于管理账单、支付方式或取消订阅。',
      send: '发送管理链接',
      sending: '发送中...',
      success: '请在邮箱中查看一次性订阅管理链接。',
      noteLabel: '注意：',
      noteText: '出于安全考虑，该链接会很快过期，并且只能使用一次。',
    },
    manageSubscriptionConfirm: {
      title: '正在打开订阅门户',
      redirecting: '正在跳转到 Paddle...',
      missingToken: '订阅管理链接缺失或无效。',
      invalidLink: '此订阅管理链接无效或已过期。',
    },
    thankYou: {
      checkingTitle: '正在完成购买...',
      successTitle: '感谢购买',
      checkingText: '正在确认付款，通常只需几秒钟。',
      activatedText: 'Zush PRO 已激活。你可以使用 10,000 个额度、BYOK 和离线 AI 模式。',
      activationReadyText: '正在打开 Zush，以便在此设备上激活 PRO。',
      expiredText: '无法在此浏览器会话中完成自动激活。我们已向你发送激活邮件。',
      expiredNoticeBeforeAction: '打开邮件并点击',
      expiredNoticeAction: '激活 PRO',
      expiredNoticeAfterAction: '按钮，即可解锁 Zush 的 PRO 功能。',
      emailText: '你的 PRO 购买已准备好。我们已将激活链接发送到结账时使用的邮箱地址。',
      emailNoticeBeforeAction: '打开该邮件并点击',
      emailNoticeAction: '激活 PRO',
      emailNoticeAfterAction: '即可解锁 Zush PRO。如果没有看到邮件，请检查垃圾邮件文件夹。',
      openZush: '打开 Zush',
      downloadZush: '下载 Zush',
    },
    notFound: {
      title: '扫描错误',
      text: 'AI 找不到你要访问的页面。它可能已被移动、重命名，或从未存在。',
    },
    seo: {
      '/activate': { title: '激活 Zush PRO — Zush', description: '打开 Zush 并激活你的 PRO 购买。' },
      '/recover': { title: '找回激活链接 — Zush', description: '申请新的 Zush PRO 激活链接。' },
      '/thank-you': { title: '感谢购买 — Zush', description: '完成 Zush PRO 的购买和激活。' },
      '/manage-subscription': { title: '管理订阅 — Zush', description: '申请安全链接以管理你的 Zush 订阅。' },
      '/manage-subscription/confirm': { title: '正在打开订阅门户 — Zush', description: '打开 Zush 的安全 Paddle 客户门户。' },
      '/404': { title: '页面未找到 — Zush', description: '此页面不存在。' },
    },
  },
};

export function getServicePageCopy(locale: Locale): ServicePageCopy {
  return serviceCopies[locale] ?? en;
}
