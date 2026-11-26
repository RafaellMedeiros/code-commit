import { useEffect } from 'react';

const APP_TITLE_SUFFIX = 'Code Connect';
const META_DESCRIPTION_SELECTOR = 'meta[name="description"]';

function updateDocumentDescription(description?: string): (() => void) | undefined {
  if (!description) return undefined;

  const metaElement = document.querySelector<HTMLMetaElement>(META_DESCRIPTION_SELECTOR);
  if (!metaElement) return undefined;

  const previousDescription = metaElement.content;
  metaElement.content = description;

  return () => {
    metaElement.content = previousDescription;
  };
}

export function useDocumentTitle(pageTitle: string, pageDescription?: string): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${pageTitle} | ${APP_TITLE_SUFFIX}`;
    const restoreDescription = updateDocumentDescription(pageDescription);

    return () => {
      document.title = previousTitle;
      restoreDescription?.();
    };
  }, [pageTitle, pageDescription]);
}
