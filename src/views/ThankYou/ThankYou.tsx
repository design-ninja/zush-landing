import { useEffect, useState } from "react";
import { CheckCircle, ExternalLink, LoaderCircle, Mail } from "lucide-react";
import Button from "@/components/Button";
import BackToHome from "@/components/BackToHome";
import DownloadButton from "@/components/DownloadButton";
import PageLayout from "@/components/PageLayout";
import PageIcon from "@/components/PageIcon";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import { DEFAULT_LOCALE, getLocalizedPath, type Locale } from "@/i18n/config";
import { getServicePageCopy, type ThankYouCopy } from "@/i18n/servicePages";
import { SUPABASE_URL } from "@/utils/supabase";
import styles from "./ThankYou.module.scss";

type ActivationState =
  | "checking"
  | "pending"
  | "activated"
  | "activation_ready"
  | "email"
  | "expired";

interface CheckoutSessionStatus {
  success?: boolean;
  status?: ActivationState | "failed";
  completed?: boolean;
  device_activated?: boolean;
  app_url?: string;
}

interface ThankYouProps {
  locale?: Locale;
  copy?: ThankYouCopy;
  backToHomeLabel?: string;
  homeHref?: string;
}

const defaultServiceCopy = getServicePageCopy(DEFAULT_LOCALE);

const ThankYou = ({
  locale = DEFAULT_LOCALE,
  copy = defaultServiceCopy.thankYou,
  backToHomeLabel = defaultServiceCopy.backToHome,
  homeHref,
}: ThankYouProps) => {
  const [activationState, setActivationState] =
    useState<ActivationState>("checking");
  const [appUrl, setAppUrl] = useState<string | null>(null);
  const resolvedHomeHref = homeHref ?? getLocalizedPath('/', locale);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkoutSession =
      params.get("checkout_session") ||
      sessionStorage.getItem("zush_checkout_session");
    const deviceId = sessionStorage.getItem("zush_checkout_device_id");

    sessionStorage.removeItem("zush_checkout_session");
    sessionStorage.removeItem("zush_checkout_device_id");

    if (!checkoutSession) {
      setActivationState(deviceId ? "activated" : "email");
      if (deviceId) {
        setAppUrl("zush://refresh-status");
      }
      return;
    }

    let cancelled = false;

    const pollCheckoutSession = async () => {
      for (let attempt = 0; attempt < 12; attempt += 1) {
        try {
          const response = await fetch(
            `${SUPABASE_URL}/functions/v1/checkout-session-status`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ checkout_session: checkoutSession }),
            },
          );
          const result = (await response.json()) as CheckoutSessionStatus;

          if (cancelled) return;

          if (response.ok && result.completed && result.app_url) {
            setActivationState(
              result.device_activated ? "activated" : "activation_ready",
            );
            setAppUrl(result.app_url);
            return;
          }

          if (response.ok && result.completed) {
            setActivationState(result.status === "expired" ? "expired" : "email");
            return;
          }

          if (response.ok && result.status === "expired") {
            setActivationState("expired");
            return;
          }
        } catch (error) {
          console.error("[ThankYou] Checkout session status failed:", error);
        }

        await new Promise((resolve) => window.setTimeout(resolve, 1000));
      }

      if (!cancelled) {
        setActivationState("pending");
      }
    };

    pollCheckoutSession();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (
      appUrl &&
      (activationState === "activated" ||
        activationState === "activation_ready")
    ) {
      window.location.href = appUrl;
    }
  }, [activationState, appUrl]);

  const isChecking =
    activationState === "checking" || activationState === "pending";

  return (
    <PageLayout maxWidth="lg">
      <PageIcon
        className={isChecking
          ? styles.ThankYou__LoadingIcon
          : styles.ThankYou__SuccessIcon}
      >
        {isChecking ? <LoaderCircle size={64} /> : <CheckCircle size={64} />}
      </PageIcon>

      <Heading as="h1" className={styles.ThankYou__Title}>
        {isChecking ? copy.checkingTitle : copy.successTitle}
      </Heading>

      {isChecking ? (
        <>
          <Text as="p" className={styles.ThankYou__Subtitle} color="subtle">
            {copy.checkingText}
          </Text>
        </>
      ) : activationState === "activated" ? (
        <>
          <Text as="p" className={styles.ThankYou__Subtitle} color="subtle">
            {copy.activatedText}
          </Text>
        </>
      ) : activationState === "activation_ready" ? (
        <>
          <Text as="p" className={styles.ThankYou__Subtitle} color="subtle">
            {copy.activationReadyText}
          </Text>
        </>
      ) : activationState === "expired" ? (
        <>
          <Text as="p" className={styles.ThankYou__Subtitle} color="subtle">
            {copy.expiredText}
          </Text>
          <div className={styles.ThankYou__EmailNotice}>
            <Mail size={24} />
            <Text as="p">
              {copy.expiredNoticeBeforeAction} <strong>"{copy.expiredNoticeAction}"</strong>{' '}
              {copy.expiredNoticeAfterAction}
            </Text>
          </div>
        </>
      ) : (
        <>
          <Text as="p" className={styles.ThankYou__Subtitle} color="subtle">
            {copy.emailText}
          </Text>
          <div className={styles.ThankYou__EmailNotice}>
            <Mail size={24} />
            <Text as="p">
              {copy.emailNoticeBeforeAction} <strong>"{copy.emailNoticeAction}"</strong>{' '}
              {copy.emailNoticeAfterAction}
            </Text>
          </div>
        </>
      )}

      {!isChecking && (
        <div className={styles.ThankYou__Actions}>
          {appUrl && (
            <Button as="a" href={appUrl}>
              <ExternalLink size={18} />
              {copy.openZush}
            </Button>
          )}
          {activationState === "email" && (
            <DownloadButton
              source="thank-you"
              variant="black"
              label={copy.downloadZush}
              showDropdown={false}
            />
          )}
          <BackToHome href={resolvedHomeHref} label={backToHomeLabel} />
        </div>
      )}
    </PageLayout>
  );
};

export default ThankYou;
