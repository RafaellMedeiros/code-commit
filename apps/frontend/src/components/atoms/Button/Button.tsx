import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';

export type ButtonVariant = 'primary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  rightIcon?: ReactNode;
}

const BASE_BUTTON_CLASSES =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-[8px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-green focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card disabled:cursor-not-allowed disabled:opacity-60';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'h-12 w-full bg-highlight-green px-6 text-lg text-petrol hover:bg-highlight-green-hover',
  ghost: 'min-h-10 bg-transparent px-3 py-2 text-sm text-offwhite hover:text-highlight-green'
};

export function Button({
  variant = 'primary',
  isLoading = false,
  rightIcon,
  disabled = false,
  className = '',
  children,
  ...buttonAttributes
}: ButtonProps) {
  const isButtonDisabled = disabled || isLoading;

  return (
    <button
      disabled={isButtonDisabled}
      aria-busy={isLoading}
      className={`${BASE_BUTTON_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`.trim()}
      {...buttonAttributes}
    >
      {isLoading ? (
        <>
          <Icon name="spinner" className="h-5 w-5" />
          <span className="sr-only">Carregando...</span>
        </>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon ? rightIcon : null}
    </button>
  );
}
