import { useEffect } from 'react';

const APP_TITLE_SUFFIX = 'Code Connect';

export function useDocumentTitle(pageTitle: string): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${pageTitle} | ${APP_TITLE_SUFFIX}`;

    return () => {
      document.title = previousTitle;
    };
  }, [pageTitle]);
}
