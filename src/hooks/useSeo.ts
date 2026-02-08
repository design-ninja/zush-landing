import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_ORIGIN = 'https://zushapp.com';

interface RouteMeta {
  title: string;
  description: string;
  robots: string;
}

const DEFAULT_META: RouteMeta = {
  title: 'Zush — AI-Powered Image Organization for macOS',
  description:
    'Zush monitors your folders and automatically renames images using advanced AI. Smart metadata, custom naming patterns, and native macOS performance.',
  robots: 'noindex, nofollow',
};

const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    ...DEFAULT_META,
    robots: 'index, follow',
  },
  '/changelog': {
    title: 'Changelog — Zush',
    description:
      'Track all updates, new features, and improvements to Zush, the AI-powered image organizer for macOS.',
    robots: 'index, follow',
  },
  '/byok-setup': {
    title: 'BYOK Setup Guide — Zush',
    description:
      'Learn how to set up Bring Your Own Key (BYOK) in Zush with Gemini, Groq, OpenAI, or Claude for unlimited AI image processing.',
    robots: 'index, follow',
  },
  '/privacy-policy': {
    title: 'Privacy Policy — Zush',
    description:
      "Read Zush's privacy policy. Learn how we handle your data, images, and personal information.",
    robots: 'index, follow',
  },
  '/terms-of-service': {
    title: 'Terms of Service — Zush',
    description:
      "Read Zush's terms of service for using our AI-powered image organization app for macOS.",
    robots: 'index, follow',
  },
  '/refund-policy': {
    title: 'Refund Policy — Zush',
    description:
      "Zush's refund policy. Money-back guarantee details for our AI image organizer.",
    robots: 'index, follow',
  },
};

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

const ensureMetaTag = (attr: string, value: string, isProperty = false) => {
  const selector = isProperty
    ? `meta[property='${attr}']`
    : `meta[name='${attr}']`;
  let meta = document.querySelector(selector) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    if (isProperty) {
      meta.setAttribute('property', attr);
    } else {
      meta.name = attr;
    }
    document.head.appendChild(meta);
  }
  meta.content = value;
};

export const useSeo = () => {
  const location = useLocation();

  useEffect(() => {
    const path = normalizePath(location.pathname);
    const meta = ROUTE_META[path] || DEFAULT_META;
    const canonicalUrl = `${SITE_ORIGIN}${path === '/' ? '/' : path}`;

    // Title
    document.title = meta.title;

    // Canonical
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Standard meta
    ensureMetaTag('description', meta.description);
    ensureMetaTag('robots', meta.robots);

    // Open Graph
    ensureMetaTag('og:title', meta.title, true);
    ensureMetaTag('og:description', meta.description, true);
    ensureMetaTag('og:url', canonicalUrl, true);

    // Twitter
    ensureMetaTag('twitter:title', meta.title);
    ensureMetaTag('twitter:description', meta.description);
  }, [location.pathname]);
};
