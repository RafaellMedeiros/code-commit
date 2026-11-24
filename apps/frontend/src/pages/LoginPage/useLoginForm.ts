import { useState, type FormEvent } from 'react';
import type { LoginFieldErrors, LoginFormValues, SocialAuthProvider } from '../../types/auth';

const MIN_PASSWORD_LENGTH = 6;
const SIMULATED_AUTH_DELAY_MS = 600;

const INITIAL_LOGIN_VALUES: LoginFormValues = {
  identifier: '',
  password: '',
  isRememberMeChecked: true
};

const PROVIDER_DISPLAY_NAMES: Record<SocialAuthProvider, string> = {
  github: 'Github',
  gmail: 'Gmail'
};

function validateIdentifier(identifier: string): string | undefined {
  if (!identifier.trim()) return 'Informe seu email ou nome de usuário.';

  return undefined;
}

function validatePassword(password: string): string | undefined {
  if (!password) return 'Informe sua senha.';
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }

  return undefined;
}

function validateLoginFields(values: LoginFormValues): LoginFieldErrors {
  return {
    identifier: validateIdentifier(values.identifier),
    password: validatePassword(values.password)
  };
}

function hasAnyFieldError(errors: LoginFieldErrors): boolean {
  return Boolean(errors.identifier || errors.password);
}

function waitSimulatedAuth(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, SIMULATED_AUTH_DELAY_MS);
  });
}

export function useLoginForm() {
  const [values, setValues] = useState<LoginFormValues>(INITIAL_LOGIN_VALUES);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [hasSubmissionError, setHasSubmissionError] = useState(false);

  const updateIdentifier = (identifier: string) => {
    setValues((previous) => ({ ...previous, identifier }));
    setFieldErrors((previous) => ({ ...previous, identifier: undefined }));
  };

  const updatePassword = (password: string) => {
    setValues((previous) => ({ ...previous, password }));
    setFieldErrors((previous) => ({ ...previous, password: undefined }));
  };

  const toggleRememberMe = () => {
    setValues((previous) => ({ ...previous, isRememberMeChecked: !previous.isRememberMeChecked }));
  };

  const notifyForgotPassword = () => {
    setHasSubmissionError(false);
    setFeedbackMessage('A recuperação de senha estará disponível em breve.');
  };

  const triggerSocialLogin = (provider: SocialAuthProvider) => {
    setHasSubmissionError(false);
    setFeedbackMessage(`Autenticação com ${PROVIDER_DISPLAY_NAMES[provider]} estará disponível em breve.`);
  };

  const submitLoginForm = async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    setFeedbackMessage(null);

    const validationErrors = validateLoginFields(values);
    setFieldErrors(validationErrors);
    if (hasAnyFieldError(validationErrors)) return;

    setIsSubmitting(true);
    try {
      await waitSimulatedAuth();
      setHasSubmissionError(false);
      setFeedbackMessage(`Bem-vindo(a), ${values.identifier.trim()}!`);
    } catch {
      setHasSubmissionError(true);
      setFeedbackMessage('Não foi possível realizar o login. Tente novamente.');
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
    updateIdentifier,
    updatePassword,
    toggleRememberMe,
    notifyForgotPassword,
    triggerSocialLogin,
    submitLoginForm
  };
}
