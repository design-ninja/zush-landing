import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import { fileURLToPath } from 'node:url';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  site: 'https://zushapp.com',
  output: 'static',
  trailingSlash: 'never',
  redirects: {
    '/download/mac': { status: 301, destination: '/mac' },
    '/download/windows': { status: 301, destination: '/windows' },
  },
  integrations: [mdx(), react()],
  adapter: vercel({
    // Analytics is injected explicitly via @vercel/analytics/astro in BaseLayout.
    // Keep adapter-level injection off so Vercel Web Analytics is not added twice.
    webAnalytics: {
      enabled: false,
    },
  }),
  markdown: {
    remarkPlugins: [remarkGfm],
    gfm: true,
    smartypants: true,
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: [
            fileURLToPath(new URL('./', import.meta.url)),
            fileURLToPath(new URL('./src', import.meta.url)),
          ],
        },
      },
    },
  },
});
