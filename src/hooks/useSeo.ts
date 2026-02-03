import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_ORIGIN = 'https://zushapp.com';

const INDEXABLE_PATHS = new Set([
  '/',
  '/changelog',
  '/byok-setup',
  '/privacy-policy',
  '/terms-of-service',
  '/refund-policy',
]);

const NOINDEX_PATHS = new Set([
  '/thank-you',
  '/recover',
  '/activate',
  '/manage-subscription',
]);

const normalizePath = (pathname: string) => {
  let path = pathname || '/';
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  return path;
};

const ensureCanonical = () => {
  let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  return link;
};

const ensureRobots = () => {
  let meta = document.querySelector("meta[name='robots']") as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'robots';
    document.head.appendChild(meta);
  }
  return meta;
};

const getRobotsContent = (path: string) => {
  if (NOINDEX_PATHS.has(path)) {
    return 'noindex, nofollow';
  }
  if (INDEXABLE_PATHS.has(path)) {
    return 'index, follow';
  }
  return 'noindex, nofollow';
};

export const useSeo = () => {
  const location = useLocation();

  useEffect(() => {
    const path = normalizePath(location.pathname);
    const canonicalUrl = `${SITE_ORIGIN}${path === '/' ? '/' : path}`;

    const canonical = ensureCanonical();
    canonical.href = canonicalUrl;

    const robots = ensureRobots();
    robots.content = getRobotsContent(path);
  }, [location.pathname]);
};
