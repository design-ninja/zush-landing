import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  integrations: [react()],
  adapter: vercel(),
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
