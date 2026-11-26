import { useState, type FormEvent } from 'react';
import type { LoginFieldErrors, LoginFormValues, SocialAuthProvider } from '../../types/auth';
import {
  SOCIAL_PROVIDER_DISPLAY_NAMES,
  validateIdentifier,
  validatePassword,
  waitSimulatedAuth
} from '../../utils/authValidation';

const INITIAL_LOGIN_VALUES: LoginFormValues = {
  identifier: '',
  password: '',
  isRememberMeChecked: true
};

function validateLoginFields(values: LoginFormValues): LoginFieldErrors {
  return {
    identifier: validateIdentifier(values.identifier),
    password: validatePassword(values.password)
  };
}

function focusFirstInvalidLoginField(errors: LoginFieldErrors): void {
  const firstInvalidFieldId = errors.identifier ? 'login-identifier' : 'login-password';
  document.getElementById(firstInvalidFieldId)?.focus();
}

function hasAnyFieldError(errors: LoginFieldErrors): boolean {
  return Boolean(errors.identifier || errors.password);
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
    if (isSubmitting) return;

    setHasSubmissionError(false);
    setFeedbackMessage('A recuperação de senha estará disponível em breve.');
  };

  const triggerSocialLogin = (provider: SocialAuthProvider) => {
    if (isSubmitting) return;

    setHasSubmissionError(false);
    setFeedbackMessage(`Autenticação com ${SOCIAL_PROVIDER_DISPLAY_NAMES[provider]} estará disponível em breve.`);
  };

  const submitLoginForm = async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    if (isSubmitting) return;

    setFeedbackMessage(null);

    const validationErrors = validateLoginFields(values);
    setFieldErrors(validationErrors);
    if (hasAnyFieldError(validationErrors)) {
      requestAnimationFrame(() => focusFirstInvalidLoginField(validationErrors));
      return;
    }

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
