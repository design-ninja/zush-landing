// Imported from BaseLayout.astro inline script; static import graph tools can miss it.
// fallow-ignore-file unused-file
const FLOATING_SELECTOR = '[data-floating-download]';
const HERO_SELECTOR = '[data-hero-root]';
const FOOTER_SELECTOR = '[data-site-footer]';
const VISIBILITY_THRESHOLD = 60;
// Margin between footer top and the CTA — when the footer starts approaching the
// CTA's resting position (roughly button height + bottom offset), hide it to avoid overlap.
const FOOTER_HIDE_MARGIN = 96;

function syncFocusableState(node: HTMLElement, isVisible: boolean): void {
  node.querySelectorAll<HTMLElement>('a, button, input, select, textarea, [tabindex]').forEach((element) => {
    if (isVisible) {
      if ('floatingOriginalTabindex' in element.dataset) {
        const original = element.dataset.floatingOriginalTabindex || '';

        if (original) {
          element.setAttribute('tabindex', original);
        } else {
          element.removeAttribute('tabindex');
        }

        delete element.dataset.floatingOriginalTabindex;
      }

      return;
    }

    if (!('floatingOriginalTabindex' in element.dataset)) {
      element.dataset.floatingOriginalTabindex = element.getAttribute('tabindex') || '';
    }

    element.setAttribute('tabindex', '-1');
  });
}

function syncFloatingDownloadState(): void {
  const node = document.querySelector(FLOATING_SELECTOR);
  if (!(node instanceof HTMLElement)) return;

  const hero = document.querySelector(HERO_SELECTOR);
  if (!hero) {
    node.dataset.active = 'false';
    node.dataset.visible = 'false';
    node.setAttribute('aria-hidden', 'true');
    syncFocusableState(node, false);
    return;
  }

  node.dataset.active = 'true';
  const heroRect = hero.getBoundingClientRect();
  const pastHero = heroRect.bottom <= VISIBILITY_THRESHOLD;

  const footer = document.querySelector(FOOTER_SELECTOR);
  const footerEncroaching = footer instanceof HTMLElement
    ? footer.getBoundingClientRect().top < window.innerHeight - FOOTER_HIDE_MARGIN
    : false;

  const shouldShow = pastHero && !footerEncroaching;
  node.dataset.visible = shouldShow ? 'true' : 'false';
  node.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
  syncFocusableState(node, shouldShow);
}

export function bindFloatingDownload(): void {
  const node = document.querySelector(FLOATING_SELECTOR);
  if (!(node instanceof HTMLElement)) return;

  syncFloatingDownloadState();

  if (node.dataset.bound === 'true') return;
  node.dataset.bound = 'true';

  let frame = 0;
  const requestSync = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      syncFloatingDownloadState();
    });
  };

  window.addEventListener('scroll', requestSync, { passive: true });
  window.addEventListener('resize', requestSync, { passive: true });
}
