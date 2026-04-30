// fallow-ignore-file unused-file
import { SUPABASE_URL } from "@/utils/supabase";

interface PaddleCheckoutOptions {
  items?: { priceId: string; quantity: number }[];
  transactionId?: string;
  settings?: {
    locale?: string;
  };
  customData?: {
    device_id?: string;
  };
}

interface PaddleConfig {
  token: string;
  eventCallback?: (event: PaddleEvent) => void;
  pwCustomer?: { email: string };
}

interface PaddleEvent {
  name: string;
  data?: {
    customer?: {
      email?: string;
    };
  };
}

interface CheckoutSessionResponse {
  success: boolean;
  checkout_session: string;
  transaction_id: string;
  checkout_url?: string | null;
}

declare global {
  interface Window {
    Paddle?: {
      Environment: {
        set: (env: string) => void;
      };
      Initialize: (config: PaddleConfig) => void;
      Checkout: {
        open: (options: PaddleCheckoutOptions) => void;
      };
    };
  }
}

let paddleLoaded = false;
let paddleInitialized = false;
let activeCheckoutSession: string | null = null;

const PADDLE_LOCALES: Record<string, string> = {
  en: "en",
  de: "de",
  fr: "fr",
  "pt-br": "pt-BR",
  pt: "pt",
  es: "es",
  nl: "nl",
  it: "it",
  ja: "ja",
  ko: "ko",
  "zh-cn": "zh-Hans",
  zh: "zh-Hans",
};
const LOCALIZED_PATH_PREFIXES = new Set([
  "de",
  "fr",
  "pt-br",
  "es",
  "nl",
  "it",
  "ja",
  "ko",
  "zh-cn",
]);

function getPaddleConfig() {
  const paddleEnv =
    import.meta.env.PUBLIC_PADDLE_ENVIRONMENT ||
    import.meta.env.VITE_PADDLE_ENVIRONMENT ||
    "sandbox";
  const paddleToken =
    import.meta.env.PUBLIC_PADDLE_TOKEN || import.meta.env.VITE_PADDLE_TOKEN;

  if (!paddleToken) {
    throw new Error(
      "Missing PUBLIC_PADDLE_TOKEN. Astro exposes only PUBLIC_* env vars to client code.",
    );
  }

  return { paddleEnv, paddleToken };
}

async function loadPaddleScript(): Promise<void> {
  if (paddleLoaded) return;

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => {
      paddleLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load Paddle.js"));
    document.head.appendChild(script);
  });
}

function initializePaddle(): void {
  if (paddleInitialized || !window.Paddle) return;

  const { paddleEnv, paddleToken } = getPaddleConfig();

  if (paddleEnv === "sandbox") {
    window.Paddle.Environment.set("sandbox");
  }

  const urlParams = new URLSearchParams(window.location.search);
  const customerEmail = urlParams.get("email");

  const paddleConfig: PaddleConfig = {
    token: paddleToken,
    eventCallback: (event: PaddleEvent) => {
      if (event.name === "checkout.completed") {
        const email = event.data?.customer?.email || "";
        const params = new URLSearchParams();
        if (activeCheckoutSession) {
          params.set("checkout_session", activeCheckoutSession);
        }
        if (email) {
          params.set("email", email);
        }
        setTimeout(() => {
          const thankYouPath = getLocalizedThankYouPath();
          window.location.href = params.toString()
            ? `${thankYouPath}?${params}`
            : thankYouPath;
        }, 2500);
      }
    },
  };

  if (customerEmail) {
    paddleConfig.pwCustomer = { email: customerEmail };
  }

  window.Paddle.Initialize(paddleConfig);
  paddleInitialized = true;
}

function normalizeLanguage(value: string): string {
  return value.trim().toLowerCase().replace(/_/g, "-");
}

function getCurrentPaddleLocale(): string | undefined {
  const pageLanguage = normalizeLanguage(document.documentElement.lang || "");
  const browserLanguage = normalizeLanguage(navigator.language || "");
  const language = pageLanguage || browserLanguage;
  if (!language) return undefined;

  if (language.startsWith("zh")) return PADDLE_LOCALES.zh;
  if (language.startsWith("pt-br")) return PADDLE_LOCALES["pt-br"];

  const exactLocale = PADDLE_LOCALES[language];
  if (exactLocale) return exactLocale;

  return PADDLE_LOCALES[language.split("-")[0]];
}

function getLocalizedThankYouPath(): string {
  const path = window.location.pathname;
  const [, maybeLocale] = path.split("/");
  return LOCALIZED_PATH_PREFIXES.has(maybeLocale)
    ? `/${maybeLocale}/thank-you`
    : "/thank-you";
}

async function ensurePaddleReady(): Promise<boolean> {
  try {
    await loadPaddleScript();
    initializePaddle();
    return true;
  } catch (error) {
    console.error("[Paddle] Failed to load:", error);
    return false;
  }
}

// fallow-ignore-next-line unused-export
export function preloadPaddleCheckout(): Promise<boolean> {
  return ensurePaddleReady();
}

async function createCheckoutSession(
  deviceId: string | null | undefined,
  priceId: string,
): Promise<CheckoutSessionResponse | null> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/create-paddle-checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price_id: priceId,
          device_id: deviceId || undefined,
          source: deviceId ? "app" : "landing",
        }),
      },
    );

    if (!response.ok) {
      console.error("[Paddle] Checkout session failed:", await response.text());
      return null;
    }

    const data = (await response.json()) as CheckoutSessionResponse;
    return data.success && data.checkout_session && data.transaction_id
      ? data
      : null;
  } catch (error) {
    console.error("[Paddle] Failed to create checkout session:", error);
    return null;
  }
}

// fallow-ignore-next-line unused-export
export async function openPaddleCheckout(
  deviceId?: string | null,
  priceId?: string | null,
): Promise<boolean> {
  console.log("[Paddle] openPaddleCheckout called:", { deviceId, priceId });

  if (!priceId) {
    console.error("[Paddle] Price ID not provided");
    return false;
  }

  const checkoutSessionPromise = createCheckoutSession(deviceId, priceId);
  const readyPromise = ensurePaddleReady();

  const checkoutSession = await checkoutSessionPromise;
  if (!checkoutSession) {
    console.error("[Paddle] Checkout session was not created");
    return false;
  }

  activeCheckoutSession = checkoutSession.checkout_session;
  sessionStorage.setItem(
    "zush_checkout_session",
    checkoutSession.checkout_session,
  );

  if (deviceId) {
    sessionStorage.setItem("zush_checkout_device_id", deviceId);
  } else {
    sessionStorage.removeItem("zush_checkout_device_id");
  }

  const ready = await readyPromise;
  if (!ready || !window.Paddle) {
    if (checkoutSession.checkout_url) {
      window.location.href = checkoutSession.checkout_url;
      return true;
    }

    console.error("[Paddle] Paddle.js not ready");
    return false;
  }

  const checkoutOptions: PaddleCheckoutOptions = {
    transactionId: checkoutSession.transaction_id,
  };
  const paddleLocale = getCurrentPaddleLocale();
  if (paddleLocale) {
    checkoutOptions.settings = { locale: paddleLocale };
  }

  console.log("[Paddle] Opening checkout with options:", checkoutOptions);
  window.Paddle.Checkout.open(checkoutOptions);
  return true;
}
