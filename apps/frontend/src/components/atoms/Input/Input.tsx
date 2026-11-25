import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const BASE_INPUT_CLASSES =
  'h-10 w-full rounded-[4px] bg-input-surface px-4 text-[15px] text-input-text placeholder:text-input-placeholder transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-card';

const VALID_INPUT_CLASSES = 'focus:ring-highlight-green';
const INVALID_INPUT_CLASSES = 'ring-1 ring-error focus:ring-highlight-green';

export function Input({ hasError = false, className = '', ...inputAttributes }: InputProps) {
  const validationClasses = hasError ? INVALID_INPUT_CLASSES : VALID_INPUT_CLASSES;

  return (
    <input
      className={`${BASE_INPUT_CLASSES} ${validationClasses} ${className}`.trim()}
      aria-invalid={hasError || undefined}
      {...inputAttributes}
    />
  );
}
