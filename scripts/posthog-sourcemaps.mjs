import posthog from '@posthog/rollup-plugin';

export function posthogSourcemaps(env = process.env) {
  const personalApiKey = env.POSTHOG_PERSONAL_API_KEY;
  if (!personalApiKey) {
    if (env.VERCEL_ENV === 'production') {
      throw new Error('Production source map upload requires POSTHOG_PERSONAL_API_KEY.');
    }
    return false;
  }

  return {
    ...posthog({
      personalApiKey,
      projectId: '455666',
      host: 'https://us.posthog.com',
      sourcemaps: {
        enabled: true,
        releaseName: 'zush-landing',
        releaseVersion: env.VERCEL_GIT_COMMIT_SHA,
        deleteAfterUpload: true,
      },
    }),
    apply: 'build',
    // Astro builds client and SSR bundles in separate Vite environments.
    applyToEnvironment: (environment) => environment.name === 'client',
    config: () => ({
      // Astro otherwise inlines small scripts and leaves their maps unuploaded.
      build: { assetsInlineLimit: (filePath) => filePath.endsWith('.js') ? false : undefined },
      environments: { client: { build: { sourcemap: 'hidden' } } },
    }),
  };
}
