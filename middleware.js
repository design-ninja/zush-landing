const TRACKING_PARAMS_TO_STRIP = ['ref'];
const REF_TO_UTM_SOURCE_PARAM = 'ref';
const UTM_SOURCE_PARAM = 'utm_source';

export const config = {
  matcher: '/',
};

export default function middleware(request) {
  const url = new URL(request.url);
  if (url.pathname !== '/') return undefined;

  let changed = false;

  const ref = url.searchParams.get(REF_TO_UTM_SOURCE_PARAM);
  if (ref && !url.searchParams.has(UTM_SOURCE_PARAM)) {
    url.searchParams.set(UTM_SOURCE_PARAM, ref);
    changed = true;
  }

  for (const param of TRACKING_PARAMS_TO_STRIP) {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      changed = true;
    }
  }

  if (!changed) return undefined;

  return Response.redirect(url, 308);
}
