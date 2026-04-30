// fallow-ignore-file unused-file
const REVEAL_SELECTOR = 'section:not([data-scroll-reveal-skip])';
const REVEAL_STATE_VISIBLE = 'visible';

let revealObserver: IntersectionObserver | null = null;

const markVisible = (section: HTMLElement): void => {
  section.dataset.scrollRevealState = REVEAL_STATE_VISIBLE;
  revealObserver?.unobserve(section);
};

const getRevealSections = (): HTMLElement[] => {
  const main = document.getElementById('main-content');
  if (!main) {
    return [];
  }

  const sections = Array.from(
    main.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
  ).filter((section) => {
    const parentSection = section.parentElement?.closest('section');
    return !parentSection || !main.contains(parentSection);
  });
  const firstSection = sections[0];

  return sections.filter(
    (section) =>
      section !== firstSection || section.hasAttribute('data-scroll-reveal-force'),
  );
};

export function bindScrollReveal(): void {
  if (typeof document === 'undefined') {
    return;
  }

  const sections = getRevealSections().filter(
    (section) => section.dataset.scrollRevealBound !== 'true',
  );

  if (sections.length === 0) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    sections.forEach((section) => {
      section.dataset.scrollReveal = '';
      markVisible(section);
    });
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markVisible(entry.target as HTMLElement);
          }
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      },
    );
  }

  sections.forEach((section) => {
    section.dataset.scrollReveal = '';
    section.dataset.scrollRevealBound = 'true';
    revealObserver?.observe(section);
  });
}
