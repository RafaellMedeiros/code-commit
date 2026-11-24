import type { ReactNode } from 'react';

export type IconName = 'arrow-right' | 'assignment' | 'check' | 'login' | 'spinner';

export interface IconProps {
  name: IconName;
  className?: string;
}

const ASSIGNMENT_PATH =
  'M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z';

const LOGIN_PATH =
  'M11 7 9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z';

function renderArrowRight(className: string): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-5-5m5 5-5 5" />
    </svg>
  );
}

function renderAssignment(className: string): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={ASSIGNMENT_PATH} />
    </svg>
  );
}

function renderCheck(className: string): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function renderLogin(className: string): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={LOGIN_PATH} />
    </svg>
  );
}

function renderSpinner(className: string): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={3} className="opacity-25" />
      <path fill="currentColor" d="M12 3a9 9 0 0 1 9 9h-3a6 6 0 0 0-6-6V3z" />
    </svg>
  );
}

const ICON_RENDERERS: Record<IconName, (className: string) => ReactNode> = {
  'arrow-right': renderArrowRight,
  assignment: renderAssignment,
  check: renderCheck,
  login: renderLogin,
  spinner: renderSpinner
};

export function Icon({ name, className = 'w-5 h-5' }: IconProps) {
  return <>{ICON_RENDERERS[name](className)}</>;
}
