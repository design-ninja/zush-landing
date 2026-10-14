// Headless renderer shared by the cover and Open Graph generators: the locally
// installed Chrome through playwright-core (no browser download), at 2× so
// downscaled output keeps crisp edges.
import { chromium } from 'playwright-core';

export async function openRenderer({ width, height, reducedMotion = 'no-preference' }) {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2, reducedMotion });
  return {
    /** PNG of `html`; `ready` is an optional selector to wait for first. */
    async shoot(html, ready) {
      await page.setContent(html, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      if (ready) {
        // `ready` is set by the page itself (e.g. hero-wave.ts once WebGL draws),
        // so a missing marker means the page failed, not that it is slow.
        await page.waitForSelector(ready, { state: 'attached', timeout: 10_000 }).catch(() => {
          throw new Error(`Render never reached ${ready} (WebGL unavailable or a page script failed)`);
        });
      }
      // Two animation frames so the capture is never taken before paint.
      await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
      return page.screenshot({ type: 'png' });
    },
    close: () => browser.close(),
  };
}
