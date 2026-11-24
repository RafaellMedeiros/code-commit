import type { ChangeEvent } from 'react';
import { Input } from '../../atoms/Input';

export interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  hint?: string;
  value: string;
  errorMessage?: string;
  autoComplete?: string;
  isRequired?: boolean;
  onValueChange: (nextValue: string) => void;
}

function buildDescribedBy(hintId: string | undefined, errorId: string | undefined): string | undefined {
  const ids = [hintId, errorId].filter(Boolean);
  if (ids.length === 0) return undefined;

  return ids.join(' ');
}

export function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  hint,
  value,
  errorMessage,
  autoComplete,
  isRequired = false,
  onValueChange
}: FormFieldProps) {
  const hintElementId = hint ? `${id}-hint` : undefined;
  const errorElementId = errorMessage ? `${id}-error` : undefined;
  const describedByIds = buildDescribedBy(hintElementId, errorElementId);
  const handleInputChange = (changeEvent: ChangeEvent<HTMLInputElement>) => onValueChange(changeEvent.target.value);

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1.5 text-base font-normal text-offwhite">
        {label}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        required={isRequired}
        aria-required={isRequired || undefined}
        hasError={Boolean(errorMessage)}
        aria-describedby={describedByIds}
        onChange={handleInputChange}
      />
      {hint ? (
        <p id={hintElementId} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {errorMessage ? (
        <p id={errorElementId} role="alert" className="mt-1 text-xs text-error">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
