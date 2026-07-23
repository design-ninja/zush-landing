import type { APIRoute } from 'astro';
import manifest from '@/data/releasesManifest.json';

export const prerender = false;

const RELEASES_BASE = 'https://github.com/design-ninja/zush-releases/releases/download';

// Release binaries (DMGs and Sparkle deltas) live as GitHub release assets;
// this route keeps every historical zushapp.com/releases/* URL working —
// the Sparkle appcast enclosures and the Homebrew cask both point here.
export const GET: APIRoute = ({ params }) => {
  const file = params.file ?? '';
  const entry = (manifest as Record<string, { tag: string; asset: string }>)[file];

  if (!entry) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: `${RELEASES_BASE}/${entry.tag}/${entry.asset}`,
      'Cache-Control': 'public, max-age=300',
    },
  });
};
