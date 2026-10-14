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
      if (ready) await page.waitForSelector(ready, { state: 'attached' });
      // Two animation frames so the capture is never taken before paint.
      await page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
      return page.screenshot({ type: 'png' });
    },
    close: () => browser.close(),
  };
}
