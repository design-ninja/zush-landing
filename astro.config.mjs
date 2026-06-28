import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import react from '@astrojs/react';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel';
import { fileURLToPath } from 'node:url';
import remarkGfm from 'remark-gfm';

export default defineConfig({
  site: 'https://zushapp.com',
  output: 'static',
  // Vercel handles slash canonicalization so the PostHog proxy path can be excluded.
  trailingSlash: 'ignore',
  redirects: {
    '/download/windows': { status: 301, destination: '/windows' },
  },
  integrations: [
    starlight({
      title: 'Zush Docs',
      description: 'Documentation for Zush AI file renaming on Windows and Mac.',
      favicon: '/favicon/favicon.ico',
      customCss: ['./src/styles/starlight.css'],
      lastUpdated: true,
      pagefind: true,
      credits: false,
      disable404Route: true,
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      sidebar: [
        {
          label: 'Zush Docs',
          items: [{ autogenerate: { directory: 'docs' } }],
        },
        {
          label: 'Product pages',
          items: [
            { label: 'Zush for Windows', link: '/windows' },
            { label: 'Zush for Mac', link: '/mac' },
            { label: 'Pricing', link: '/#pricing' },
          ],
        },
      ],
    }),
    mdx(),
    react(),
  ],
  adapter: vercel({
    // Analytics is injected explicitly in BaseLayout.
    // Keep adapter-level Vercel Web Analytics off so it is not added accidentally.
    webAnalytics: {
      enabled: false,
    },
  }),
  markdown: {
    processor: unified({
      remarkPlugins: [remarkGfm],
      gfm: true,
      smartypants: true,
    }),
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
