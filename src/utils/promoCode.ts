// fallow-ignore-file unused-file
const copyResetTimers = new WeakMap<HTMLButtonElement, number>();

async function copyText(value: string): Promise<void> {
  if (!navigator.clipboard?.writeText) {
    throw new Error('Clipboard copy is unavailable');
  }

  await navigator.clipboard.writeText(value);
}

function setCopyState(button: HTMLButtonElement, state: 'idle' | 'copied' | 'error'): void {
  button.dataset.copyState = state;
  const label = button.querySelector<HTMLElement>('[data-promo-copy-label]');
  if (label) {
    label.textContent = state === 'copied' ? 'Copied!' : state === 'error' ? 'Try again' : 'Copy';
  }
}

export function bindPromoCodeCopy(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-promo-copy]').forEach((button) => {
    if (button.dataset.promoCopyBound === 'true') return;

    button.dataset.promoCopyBound = 'true';
    button.addEventListener('click', async () => {
      const code = button.dataset.promoCode;
      if (!code) return;

      const previousTimer = copyResetTimers.get(button);
      if (previousTimer) window.clearTimeout(previousTimer);

      try {
        await copyText(code);
        setCopyState(button, 'copied');
      } catch {
        setCopyState(button, 'error');
      }

      const timer = window.setTimeout(() => {
        setCopyState(button, 'idle');
        copyResetTimers.delete(button);
      }, 2200);
      copyResetTimers.set(button, timer);
    });
  });
}
