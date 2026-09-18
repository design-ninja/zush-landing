import { detectFromUA, readPreferredOS } from '@/utils/detectOS';

const SLIDE_MS = 6500;
const FADE_MS = 480;
const WIDTHS = [640, 960, 1280, 1600, 1920, 2560];

// Only state/visibility and image URLs change. Text nodes stay owned by the
// server HTML (and the browser translator), with no React hydration boundary.
export function bindTour(root: HTMLElement): () => void {
  const abort = new AbortController();
  const { signal } = abort;
  const os = root.dataset.forceOs ?? (readPreferredOS() ?? detectFromUA());
  const platform = os === 'windows' ? 'windows' : 'mac';
  const groups = Array.from(root.querySelectorAll<HTMLElement>('[data-tour-platform]'));
  const group = groups.find(node => node.dataset.tourPlatform === platform) ?? groups[0];
  if (!group) return () => abort.abort();
  groups.forEach(node => { node.hidden = node !== group; });
  const images = Array.from(group.querySelectorAll<HTMLImageElement>('[data-tour-image]'));
  const captions = Array.from(group.querySelectorAll<HTMLElement>('[data-tour-description]'));
  const tabs = Array.from(group.querySelectorAll<HTMLButtonElement>('[data-tour-tab]'));
  const tabList = group.querySelector<HTMLElement>('[data-tour-tabs]')!;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let visible = 0;
  let inView = false;
  let hovered = false;
  let focused = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let fadeTimer: ReturnType<typeof setTimeout> | undefined;
  let started = 0;
  let remaining = SLIDE_MS;
  let request = 0;

  const prepareImage = (index: number) => {
    const image = images[index];
    const path = document.documentElement.dataset.theme === 'dark' ? image.dataset.dark! : image.dataset.light!;
    const pathAt = (width: number) => path.replace(/\.webp$/i, `-${width}.webp`);
    const src = pathAt(1280);
    if (image.getAttribute('src') !== src) {
      image.srcset = WIDTHS.map(width => `${pathAt(width)} ${width}w`).join(', ');
      image.src = src;
    }
    image.loading = 'eager';
    return image;
  };

  const stop = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
      remaining = Math.max(0, remaining - (performance.now() - started));
    }
  };
  const syncPlayback = () => {
    stop();
    const paused = !inView || hovered || focused || document.hidden || motion.matches;
    root.dataset.paused = String(paused);
    if (paused || tabs.length < 2) return;
    started = performance.now();
    timer = setTimeout(() => { timer = undefined; select((active + 1) % tabs.length); }, remaining);
  };
  const showImage = async (index: number) => {
    const currentRequest = ++request;
    const image = prepareImage(index);
    try { await image.decode(); } catch { /* Let the browser display its image fallback. */ }
    if (signal.aborted || currentRequest !== request) return;
    clearTimeout(fadeTimer);
    const previous = visible;
    visible = index;
    images.forEach((node, i) => {
      node.hidden = i !== index && (motion.matches || i !== previous);
      node.toggleAttribute('data-active', i === index);
      node.setAttribute('aria-hidden', String(i !== index));
    });
    fadeTimer = setTimeout(() => {
      images.forEach((node, i) => { node.hidden = i !== visible; });
    }, motion.matches ? 0 : FADE_MS);
    if (!motion.matches) prepareImage((index + 1) % images.length);
  };
  const select = (index: number) => {
    stop();
    active = index;
    remaining = SLIDE_MS;
    tabs.forEach((tab, i) => {
      if (i === index) tab.setAttribute('aria-current', 'true');
      else tab.removeAttribute('aria-current');
    });
    captions.forEach((caption, i) => { caption.hidden = i !== index; });
    void showImage(index);
    syncPlayback();
  };

  tabs.forEach((tab, index) => tab.addEventListener('click', () => select(index), { signal }));
  tabList.addEventListener('mouseenter', () => { hovered = true; syncPlayback(); }, { signal });
  tabList.addEventListener('mouseleave', () => { hovered = false; syncPlayback(); }, { signal });
  tabList.addEventListener('focusin', () => { focused = true; syncPlayback(); }, { signal });
  tabList.addEventListener('focusout', event => {
    focused = event.relatedTarget instanceof Node && tabList.contains(event.relatedTarget);
    syncPlayback();
  }, { signal });
  document.addEventListener('visibilitychange', syncPlayback, { signal });
  motion.addEventListener('change', syncPlayback, { signal });
  const themeObserver = new MutationObserver(() => { void showImage(active); });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const observer = new IntersectionObserver(entries => {
    inView = entries.some(entry => entry.isIntersecting);
    if (inView) void showImage(active);
    syncPlayback();
  });
  observer.observe(root);
  root.dataset.ready = '';
  syncPlayback();
  return () => {
    abort.abort();
    stop();
    clearTimeout(fadeTimer);
    observer.disconnect();
    themeObserver.disconnect();
    delete root.dataset.ready;
  };
}
