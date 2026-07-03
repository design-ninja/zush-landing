// Imported from BaseLayout.astro inline script; static import graph tools can miss it.
// fallow-ignore-file unused-file
const FLOATING_SELECTOR = '[data-floating-download]';
const HERO_SELECTOR = '[data-hero-root]';
const FOOTER_SELECTOR = '[data-site-footer]';
const VISIBILITY_THRESHOLD = 60;
// Margin between footer top and the CTA — when the footer starts approaching the
// CTA's resting position (roughly button height + bottom offset), hide it to avoid overlap.
const FOOTER_HIDE_MARGIN = 96;

// Toggle `inert` on the wrapper instead of mutating tabindex on descendants:
// the wrapper is static Astro HTML, while the descendants belong to a React
// island — touching them before hydration causes hydration mismatches.
function syncFocusableState(node: HTMLElement, isVisible: boolean): void {
  if (isVisible) {
    node.removeAttribute('inert');
  } else {
    node.setAttribute('inert', '');
  }
}

function syncFloatingDownloadState(): void {
  const node = document.querySelector(FLOATING_SELECTOR);
  if (!(node instanceof HTMLElement)) return;

  const footer = document.querySelector(FOOTER_SELECTOR);
  const footerEncroaching = footer instanceof HTMLElement
    ? footer.getBoundingClientRect().top < window.innerHeight - FOOTER_HIDE_MARGIN
    : false;
  const hero = document.querySelector(HERO_SELECTOR);
  if (!hero) {
    const canActivateWithoutHero = node.dataset.activateWithoutHero === 'true';
    const shouldShow = canActivateWithoutHero
      && window.scrollY > VISIBILITY_THRESHOLD
      && !footerEncroaching;

    node.dataset.active = canActivateWithoutHero ? 'true' : 'false';
    node.dataset.visible = shouldShow ? 'true' : 'false';
    node.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
    syncFocusableState(node, shouldShow);
    return;
  }

  node.dataset.active = 'true';
  const heroRect = hero.getBoundingClientRect();
  const pastHero = heroRect.bottom <= VISIBILITY_THRESHOLD;

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
