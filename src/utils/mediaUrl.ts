// Heavy media (demo recordings, the press kit) lives in the public
// `landing-media` bucket of the Zush Supabase project instead of `public/`,
// so every Vercel deployment does not carry another copy of it. The source
// files are kept in `media/` and synced with `pnpm media:upload`.
//
// Code keeps referring to these files by their site path (`/videos/x.mp4`),
// which stays the lookup key for showcase data; `mediaUrl` turns that path into
// the public bucket URL at the point where it is rendered. Old site paths
// redirect to the bucket in vercel.json for links outside the site.
//
// The origin is Storage's own hostname, not the project API host: browsers
// share one HTTP/2 connection per host, so a demo video streaming over the API
// host queues the checkout Edge Function request behind it on slow networks.
export const MEDIA_ORIGIN =
  'https://sjzrgmvinyxjzvshfvjy.storage.supabase.co/storage/v1/object/public/landing-media';

const BUCKET_PATH = /^\/(?:videos\/.+\.mp4|press\/.+\.zip)$/;

export function isBucketMediaPath(path: string): boolean {
  return BUCKET_PATH.test(path);
}

export function mediaUrl(path: string): string {
  return isBucketMediaPath(path) ? `${MEDIA_ORIGIN}${path}` : path;
}
