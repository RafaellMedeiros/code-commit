import { useState, type FormEvent } from 'react';
import type { RegisterFieldErrors, RegisterFormValues, SocialAuthProvider } from '../../types/auth';

const MIN_PASSWORD_LENGTH = 6;
const SIMULATED_AUTH_DELAY_MS = 600;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_REGISTER_VALUES: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
  isRememberMeChecked: true
};

const PROVIDER_DISPLAY_NAMES: Record<SocialAuthProvider, string> = {
  github: 'Github',
  gmail: 'Gmail'
};

function validateName(name: string): string | undefined {
  if (!name.trim()) return 'Informe seu nome completo.';

  return undefined;
}

function validateEmail(email: string): string | undefined {
  const normalizedEmail = email.trim();
  if (!normalizedEmail) return 'Informe seu email.';
  if (!EMAIL_PATTERN.test(normalizedEmail)) return 'Informe um email válido.';

  return undefined;
}

function validatePassword(password: string): string | undefined {
  if (!password) return 'Informe sua senha.';
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }

  return undefined;
}

function validateRegisterFields(values: RegisterFormValues): RegisterFieldErrors {
  return {
    name: validateName(values.name),
    email: validateEmail(values.email),
    password: validatePassword(values.password)
  };
}

function hasAnyFieldError(errors: RegisterFieldErrors): boolean {
  return Boolean(errors.name || errors.email || errors.password);
}

function waitSimulatedAuth(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, SIMULATED_AUTH_DELAY_MS);
  });
}

export function useRegisterForm() {
  const [values, setValues] = useState<RegisterFormValues>(INITIAL_REGISTER_VALUES);
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [hasSubmissionError, setHasSubmissionError] = useState(false);

  const updateName = (name: string) => {
    setValues((previous) => ({ ...previous, name }));
    setFieldErrors((previous) => ({ ...previous, name: undefined }));
  };

  const updateEmail = (email: string) => {
    setValues((previous) => ({ ...previous, email }));
    setFieldErrors((previous) => ({ ...previous, email: undefined }));
  };

  const updatePassword = (password: string) => {
    setValues((previous) => ({ ...previous, password }));
    setFieldErrors((previous) => ({ ...previous, password: undefined }));
  };

  const toggleRememberMe = () => {
    setValues((previous) => ({ ...previous, isRememberMeChecked: !previous.isRememberMeChecked }));
  };

  const triggerSocialRegister = (provider: SocialAuthProvider) => {
    setHasSubmissionError(false);
    setFeedbackMessage(`Cadastro com ${PROVIDER_DISPLAY_NAMES[provider]} estará disponível em breve.`);
  };

  const submitRegisterForm = async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    setFeedbackMessage(null);

    const validationErrors = validateRegisterFields(values);
    setFieldErrors(validationErrors);
    if (hasAnyFieldError(validationErrors)) return;

    setIsSubmitting(true);
    try {
      await waitSimulatedAuth();
      setHasSubmissionError(false);
      setFeedbackMessage(`Cadastro realizado com sucesso! Boas-vindas, ${values.name.trim()}!`);
    } catch {
      setHasSubmissionError(true);
      setFeedbackMessage('Não foi possível realizar o cadastro. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    fieldErrors,
    isSubmitting,
    feedbackMessage,
    hasSubmissionError,
    updateName,
    updateEmail,
    updatePassword,
    toggleRememberMe,
    triggerSocialRegister,
    submitRegisterForm
  };
}
