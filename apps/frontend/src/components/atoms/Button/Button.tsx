import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { Icon } from '../Icon';

export type ButtonVariant = 'primary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  rightIcon?: ReactNode;
}

const BASE_BUTTON_CLASSES =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-[8px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-green focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card aria-disabled:cursor-not-allowed aria-disabled:opacity-60';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'h-12 w-full bg-highlight-green px-6 text-lg text-petrol [&:not([aria-disabled=true])]:hover:bg-highlight-green-hover',
  ghost: 'min-h-10 bg-transparent px-3 py-2 text-sm text-offwhite [&:not([aria-disabled=true])]:hover:text-highlight-green'
};

export function Button({
  variant = 'primary',
  isLoading = false,
  rightIcon,
  disabled = false,
  className = '',
  onClick,
  children,
  ...buttonAttributes
}: ButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  const handleButtonClick = (clickEvent: MouseEvent<HTMLButtonElement>) => {
    if (isButtonDisabled) {
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
      return;
    }

    onClick?.(clickEvent);
  };

  return (
    <>
      <button
        aria-disabled={isButtonDisabled || undefined}
        aria-busy={isLoading || undefined}
        onClick={handleButtonClick}
        className={`${BASE_BUTTON_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`.trim()}
        {...buttonAttributes}
      >
        {isLoading ? <Icon name="spinner" className="h-5 w-5" /> : null}
        <span>{children}</span>
        {!isLoading && rightIcon ? rightIcon : null}
      </button>
      <span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {isLoading ? 'Carregando...' : ''}
      </span>
    </>
  );
}
