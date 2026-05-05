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
    '/bulk-rename-files': { status: 301, destination: '/batch-rename-files' },
    '/download/mac': { status: 301, destination: '/mac' },
    '/download/windows': { status: 301, destination: '/windows' },
  },
  integrations: [mdx(), react()],
  adapter: vercel(),
  markdown: {
    remarkPlugins: [remarkGfm],
    gfm: true,
    smartypants: true,
  },
  vite: {
    optimizeDeps: {
      include: ['heic-to/csp', 'jszip', 'xlsx'],
    },
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
