interface PaddleCheckoutOptions {
  items: { priceId: string; quantity: number }[];
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

async function loadPaddleScript(): Promise<void> {
  if (paddleLoaded) return;

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.async = true;
    script.onload = () => {
      paddleLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load Paddle.js'));
    document.head.appendChild(script);
  });
}

function initializePaddle(): void {
  if (paddleInitialized || !window.Paddle) return;

  const paddleEnv = import.meta.env.VITE_PADDLE_ENVIRONMENT || 'sandbox';
  const paddleToken = import.meta.env.VITE_PADDLE_TOKEN;

  if (paddleEnv === 'sandbox') {
    window.Paddle.Environment.set('sandbox');
  }

  const urlParams = new URLSearchParams(window.location.search);
  const customerEmail = urlParams.get('email');

  const paddleConfig: PaddleConfig = {
    token: paddleToken,
    eventCallback: (event: PaddleEvent) => {
      if (event.name === 'checkout.completed') {
        const email = event.data?.customer?.email || '';
        setTimeout(() => {
          window.location.href = `/thank-you?email=${encodeURIComponent(email)}`;
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

export async function ensurePaddleReady(): Promise<boolean> {
  try {
    await loadPaddleScript();
    initializePaddle();
    return true;
  } catch (error) {
    console.error('[Paddle] Failed to load:', error);
    return false;
  }
}

export async function openPaddleCheckout(
  deviceId?: string | null,
  priceId?: string | null
): Promise<boolean> {
  console.log('[Paddle] openPaddleCheckout called:', { deviceId, priceId });

  if (!priceId) {
    console.error('[Paddle] Price ID not provided');
    return false;
  }

  const ready = await ensurePaddleReady();
  if (!ready || !window.Paddle) {
    console.error('[Paddle] Paddle.js not ready');
    return false;
  }

  const checkoutOptions: PaddleCheckoutOptions = {
    items: [{ priceId, quantity: 1 }],
  };

  if (deviceId) {
    checkoutOptions.customData = {
      device_id: deviceId,
    };
    sessionStorage.setItem('zush_checkout_device_id', deviceId);
  } else {
    sessionStorage.removeItem('zush_checkout_device_id');
  }

  console.log('[Paddle] Opening checkout with options:', checkoutOptions);
  window.Paddle.Checkout.open(checkoutOptions);
  return true;
}
