import { useEffect, useState } from "react";
import { CheckCircle, ExternalLink, LoaderCircle, Mail } from "lucide-react";
import Button from "@/components/Button";
import BackToHome from "@/components/BackToHome";
import DownloadButton from "@/components/DownloadButton";
import PageLayout from "@/components/PageLayout";
import PageIcon from "@/components/PageIcon";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
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

const ThankYou = () => {
  const [activationState, setActivationState] =
    useState<ActivationState>("checking");
  const [appUrl, setAppUrl] = useState<string | null>(null);

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
        {isChecking ? "Finalizing your purchase..." : "Thank you for your purchase!"}
      </Heading>

      {isChecking ? (
        <>
          <Text as="p" className={styles.ThankYou__Subtitle} color="subtle">
            We're confirming your payment. This usually takes a few seconds.
          </Text>
        </>
      ) : activationState === "activated" ? (
        <>
          <Text as="p" className={styles.ThankYou__Subtitle} color="subtle">
            Your Zush PRO is active. Enjoy 10,000 credits, BYOK, and Offline AI
            mode.
          </Text>
        </>
      ) : activationState === "activation_ready" ? (
        <>
          <Text as="p" className={styles.ThankYou__Subtitle} color="subtle">
            We're opening Zush to activate PRO on this device.
          </Text>
        </>
      ) : activationState === "expired" ? (
        <>
          <Text as="p" className={styles.ThankYou__Subtitle} color="subtle">
            We couldn't finish automatic activation from this browser session.
            We've sent an activation email to you.
          </Text>
          <div className={styles.ThankYou__EmailNotice}>
            <Mail size={24} />
            <Text as="p">
              Open the email and click the <strong>"Activate PRO"</strong>{" "}
              button to unlock PRO features in Zush.
            </Text>
          </div>
        </>
      ) : (
        <>
          <Text as="p" className={styles.ThankYou__Subtitle} color="subtle">
            Your PRO purchase is ready. We sent the activation link to the
            email address you used at checkout.
          </Text>
          <div className={styles.ThankYou__EmailNotice}>
            <Mail size={24} />
            <Text as="p">
              Open that email and click <strong>"Activate PRO"</strong> to
              unlock PRO in Zush. If you do not see the email, please check
              your spam folder.
            </Text>
          </div>
        </>
      )}

      {!isChecking && (
        <div className={styles.ThankYou__Actions}>
          {appUrl && (
            <Button as="a" href={appUrl}>
              <ExternalLink size={18} />
              Open Zush
            </Button>
          )}
          {activationState === "email" && (
            <DownloadButton
              source="thank-you"
              variant="black"
              label="Download Zush"
              showDropdown={false}
            />
          )}
          <BackToHome />
        </div>
      )}
    </PageLayout>
  );
};

export default ThankYou;
