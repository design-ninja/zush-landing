// fallow-ignore-file unused-file
const SCROLL_TO_TOP_SELECTOR = '[data-scroll-to-top]';

function shouldShowScrollToTop(): boolean {
  return window.scrollY > Math.max(280, window.innerHeight * 0.75);
}

function setButtonVisible(button: HTMLButtonElement, isVisible: boolean): void {
  button.dataset.visible = isVisible ? 'true' : 'false';
  button.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
  button.tabIndex = isVisible ? 0 : -1;
}

export function bindScrollToTopButton(): void {
  const button = document.querySelector(SCROLL_TO_TOP_SELECTOR);
  if (!(button instanceof HTMLButtonElement)) return;

  setButtonVisible(button, shouldShowScrollToTop());

  if (button.dataset.bound === 'true') return;
  button.dataset.bound = 'true';

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let frame = 0;
  const syncVisibility = () => {
    frame = 0;
    if (!button.isConnected) return;
    setButtonVisible(button, shouldShowScrollToTop());
  };

  const requestSync = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(syncVisibility);
  };

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  });

  window.addEventListener('scroll', requestSync, { passive: true });
  window.addEventListener('resize', requestSync, { passive: true });
}
