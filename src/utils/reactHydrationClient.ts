import { hydrateRoot as reactHydrateRoot } from 'react-dom/client';

export { createRoot } from 'react-dom/client';

const getTranslationHints = (document: Document) => ({
  document_lang: document.documentElement.lang,
  google_translate_marker: document.documentElement.classList.contains('translated-ltr') ||
    document.documentElement.classList.contains('translated-rtl'),
  microsoft_translate_marker: document.querySelector('[_msttexthash], [_msthash]') !== null,
});

export const hydrateRoot: typeof reactHydrateRoot = (container, children, options) => {
  const island = container instanceof Element ? container.closest('astro-island') : null;
  const document = container.ownerDocument ?? window.document;
  const initialTranslationHints = getTranslationHints(document);
  return reactHydrateRoot(container, children, {
    ...options,
    onRecoverableError(error, errorInfo) {
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
            hydration_google_translate_marker: initialTranslationHints.google_translate_marker,
            hydration_microsoft_translate_marker: initialTranslationHints.microsoft_translate_marker,
            ...getTranslationHints(document),
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
