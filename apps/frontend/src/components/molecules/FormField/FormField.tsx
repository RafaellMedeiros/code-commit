import type { ChangeEvent } from 'react';
import { Input } from '../../atoms/Input';

export interface FormFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  errorMessage?: string;
  autoComplete?: string;
  onValueChange: (nextValue: string) => void;
}

export function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  errorMessage,
  autoComplete,
  onValueChange
}: FormFieldProps) {
  const errorElementId = `${id}-error`;
  const hasValidationError = Boolean(errorMessage);
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
        hasError={hasValidationError}
        aria-describedby={hasValidationError ? errorElementId : undefined}
        onChange={handleInputChange}
      />
      {errorMessage ? (
        <p id={errorElementId} role="alert" className="mt-1 text-xs text-error">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
