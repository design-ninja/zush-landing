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
    '/docs/windows-batch-rename-files': { status: 301, destination: '/docs/batch-rename-files/' },
    '/docs/windows-folder-monitoring': { status: 301, destination: '/docs/folder-monitoring/' },
    '/docs/search-files-by-content-windows': { status: 301, destination: '/docs/file-search/' },
    '/docs/windows-offline-ai': { status: 301, destination: '/docs/offline-ai/' },
    '/docs/windows-undo-rename-history': { status: 301, destination: '/docs/undo-history/' },
  },
  integrations: [
    starlight({
      title: 'Zush Docs',
      description: 'Documentation for Zush AI file renaming on Mac and Windows.',
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
          label: 'Start here',
          items: [
            { label: 'Overview', link: '/docs/' },
            { label: 'Get started', link: '/docs/get-started/' },
            { label: 'Install and update', link: '/docs/install-update/' },
            { label: 'Pricing and limits', link: '/docs/pricing-limits/' },
          ],
        },
        {
          label: 'Rename workflows',
          items: [
            { label: 'Batch rename files', link: '/docs/batch-rename-files/' },
            { label: 'Folder monitoring', link: '/docs/folder-monitoring/' },
            { label: 'Find files later', link: '/docs/file-search/' },
            { label: 'Undo history', link: '/docs/undo-history/' },
          ],
        },
        {
          label: 'Naming control',
          items: [
            { label: 'Templates', link: '/docs/templates/' },
            { label: 'Naming Blocks', link: '/docs/naming-blocks/' },
            { label: 'Custom prompts', link: '/docs/custom-prompts/' },
            { label: 'Metadata and tags', link: '/docs/metadata-tags/' },
          ],
        },
        {
          label: 'AI and privacy',
          items: [
            { label: 'AI modes', link: '/docs/ai-modes/' },
            { label: 'BYOK', link: '/docs/byok/' },
            { label: 'Offline AI', link: '/docs/offline-ai/' },
            { label: 'Privacy and security', link: '/docs/privacy-security/' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Supported file types', link: '/docs/supported-file-types/' },
          ],
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
