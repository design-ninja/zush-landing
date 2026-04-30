// fallow-ignore-file unused-file
import { SUPABASE_URL } from "@/utils/supabase";

interface PaddleCheckoutOptions {
  items?: { priceId: string; quantity: number }[];
  transactionId?: string;
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
          window.location.href = params.toString()
            ? `/thank-you?${params}`
            : "/thank-you";
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

  const checkoutSession = await createCheckoutSession(deviceId, priceId);
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

  const ready = await ensurePaddleReady();
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

  console.log("[Paddle] Opening checkout with options:", checkoutOptions);
  window.Paddle.Checkout.open(checkoutOptions);
  return true;
}
