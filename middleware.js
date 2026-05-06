const TRACKING_PARAMS_TO_STRIP = ['ref'];

export const config = {
  matcher: '/',
};

export default function middleware(request) {
  const url = new URL(request.url);
  if (url.pathname !== '/') return undefined;

  let changed = false;

  for (const param of TRACKING_PARAMS_TO_STRIP) {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      changed = true;
    }
  }

  if (!changed) return undefined;

  return Response.redirect(url, 308);
}
