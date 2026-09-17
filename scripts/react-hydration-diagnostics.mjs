import { fileURLToPath } from 'node:url';

// Scope the adapter to Astro's renderer; application and vendor imports stay native.
export function reactHydrationDiagnostics() {
  return {
    name: 'zush-react-hydration-diagnostics',
    enforce: 'pre',
    resolveId(source, importer) {
      if (source !== 'react-dom/client' || !importer?.replaceAll('\\', '/').endsWith('/@astrojs/react/dist/client.js')) {
        return null;
      }
      return fileURLToPath(new URL('../src/utils/reactHydrationClient.ts', import.meta.url));
    },
  };
}
