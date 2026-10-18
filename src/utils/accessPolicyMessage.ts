const messages: Record<string, [string, string]> = {
  "en": [
    "Service is unavailable for your region or email. If you already paid, contact support@zushapp.com for help or a refund.",
    "We could not verify service availability. Please try again."
  ],
  "de": [
    "Der Dienst ist für deine Region oder E-Mail-Adresse nicht verfügbar. Wenn du bereits bezahlt hast, wende dich für Hilfe oder eine Rückerstattung an support@zushapp.com.",
    "Die Verfügbarkeit des Dienstes konnte nicht geprüft werden. Bitte versuche es erneut."
  ],
  "es": [
    "El servicio no está disponible para tu región o correo electrónico. Si ya pagaste, escribe a support@zushapp.com para obtener ayuda o un reembolso.",
    "No pudimos comprobar la disponibilidad del servicio. Inténtalo de nuevo."
  ],
  "fr": [
    "Le service est indisponible pour votre région ou votre adresse e-mail. Si vous avez déjà payé, contactez support@zushapp.com pour obtenir de l’aide ou un remboursement.",
    "Nous n’avons pas pu vérifier la disponibilité du service. Veuillez réessayer."
  ],
  "it": [
    "Il servizio non è disponibile per la tua regione o il tuo indirizzo email. Se hai già pagato, contatta support@zushapp.com per assistenza o un rimborso.",
    "Non è stato possibile verificare la disponibilità del servizio. Riprova."
  ],
  "ja": [
    "お住まいの地域またはメールアドレスではサービスをご利用いただけません。お支払い済みの場合は、サポートまたは返金について support@zushapp.com までお問い合わせください。",
    "サービスの利用可否を確認できませんでした。もう一度お試しください。"
  ],
  "ko": [
    "해당 지역 또는 이메일 주소에서는 서비스를 이용할 수 없습니다. 이미 결제하셨다면 도움이나 환불을 위해 support@zushapp.com으로 문의해 주세요.",
    "서비스 이용 가능 여부를 확인하지 못했습니다. 다시 시도해 주세요."
  ],
  "nl": [
    "De dienst is niet beschikbaar voor je regio of e-mailadres. Heb je al betaald? Neem contact op met support@zushapp.com voor hulp of een terugbetaling.",
    "We konden de beschikbaarheid van de dienst niet controleren. Probeer het opnieuw."
  ],
  "pt": [
    "O serviço não está disponível para sua região ou seu e-mail. Se você já pagou, entre em contato com support@zushapp.com para obter ajuda ou um reembolso.",
    "Não foi possível verificar a disponibilidade do serviço. Tente novamente."
  ],
  "zh": [
    "你所在的地区或使用的电子邮箱无法使用此服务。如果你已付款，请联系 support@zushapp.com 获取帮助或申请退款。",
    "无法确认服务是否可用。请重试。"
  ]
};

export function accessPolicyMessage(code?: string): string {
  const locale = document.documentElement.lang.toLowerCase().split('-')[0];
  const values = messages[locale] ?? messages.en;
  return values[code === 'blocked_country' || code === 'blocked_email' ? 0 : 1];
}
