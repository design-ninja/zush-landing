import { hydrateRoot as reactHydrateRoot } from 'react-dom/client';

export { createRoot } from 'react-dom/client';

const HYDRATION_MISMATCH = /\b418\b|Hydration failed|didn't match the client/;

const getTranslationHints = (document: Document) => {
  const root = document.documentElement;
  // BaseLayout stamps the rendered locale here; translators rewrite `lang` but not data attributes.
  const sourceLang = root.getAttribute('data-source-lang') ?? '';
  return {
    document_lang: root.lang,
    document_lang_changed: sourceLang !== '' && root.lang !== sourceLang,
    google_translate_marker: root.classList.contains('translated-ltr') ||
      root.classList.contains('translated-rtl'),
    microsoft_translate_marker: document.querySelector('[_msttexthash], [_msthash]') !== null,
  };
};

type TranslationHints = ReturnType<typeof getTranslationHints>;

const isTranslated = (hints: TranslationHints) =>
  hints.document_lang_changed || hints.google_translate_marker || hints.microsoft_translate_marker;

export const hydrateRoot: typeof reactHydrateRoot = (container, children, options) => {
  const island = container instanceof Element ? container.closest('astro-island') : null;
  const document = container.ownerDocument ?? window.document;
  const initialTranslationHints = getTranslationHints(document);
  // Google Translate wraps translated text nodes in <font>; other translators leave no marker,
  // so a short text sample lets an unexplained mismatch be read against the page locale.
  const islandFontMarker = container instanceof Element && container.querySelector('font') !== null;
  const islandTextSample = (container.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 160);
  return reactHydrateRoot(container, children, {
    ...options,
    onRecoverableError(error, errorInfo) {
      const translationHints = getTranslationHints(document);
      const message = error instanceof Error ? error.message : String(error);
      const translatedBeforeHydration = HYDRATION_MISMATCH.test(message) && (
        islandFontMarker || isTranslated(initialTranslationHints) || isTranslated(translationHints)
      );
      if (translatedBeforeHydration) {
        // React already re-rendered the island on the client; the translator's DOM edits are
        // expected here and are not a site defect, so they are not reported.
        options?.onRecoverableError?.(error, errorInfo);
        return;
      }
      const event = new CustomEvent('zush:react-recoverable-error', {
        cancelable: true,
        detail: {
          error,
          properties: {
            react_error_source: 'onRecoverableError',
            react_component_stack: errorInfo.componentStack?.slice(0, 8000) ?? '',
            astro_component_url: island?.getAttribute('component-url'),
            astro_component_export: island?.getAttribute('component-export'),
            astro_client_directive: island?.getAttribute('client'),
            hydration_document_lang: initialTranslationHints.document_lang,
            hydration_document_lang_changed: initialTranslationHints.document_lang_changed,
            hydration_google_translate_marker: initialTranslationHints.google_translate_marker,
            hydration_microsoft_translate_marker: initialTranslationHints.microsoft_translate_marker,
            hydration_island_font_marker: islandFontMarker,
            hydration_island_text_sample: islandTextSample,
            ...translationHints,
          },
        },
      });
      const unhandled = window.dispatchEvent(event);
      if (options?.onRecoverableError) {
        options.onRecoverableError(error, errorInfo);
      } else if (unhandled) {
        // Retain React's default reporting when analytics is absent or opted out.
        if (typeof window.reportError === 'function') window.reportError(error);
        else console.error(error);
      }
    },
  });
};
