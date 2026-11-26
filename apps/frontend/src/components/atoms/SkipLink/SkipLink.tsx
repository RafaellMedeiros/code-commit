export interface SkipLinkProps {
  targetId: string;
  label?: string;
}

const DEFAULT_SKIP_LABEL = 'Pular para o conteúdo principal';

const SKIP_LINK_CLASSES =
  'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-highlight-green focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-petrol focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-graphite';

export function SkipLink({ targetId, label = DEFAULT_SKIP_LABEL }: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className={SKIP_LINK_CLASSES}>
      {label}
    </a>
  );
}
