import { useState, type FormEvent } from 'react';
import type { RegisterFieldErrors, RegisterFormValues, SocialAuthProvider } from '../../types/auth';
import {
  SOCIAL_PROVIDER_DISPLAY_NAMES,
  validateEmail,
  validateName,
  validatePassword,
  waitSimulatedAuth
} from '../../utils/authValidation';

const INITIAL_REGISTER_VALUES: RegisterFormValues = {
  name: '',
  email: '',
  password: ''
};

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

  const triggerSocialRegister = (provider: SocialAuthProvider) => {
    if (isSubmitting) return;

    setHasSubmissionError(false);
    setFeedbackMessage(`Cadastro com ${SOCIAL_PROVIDER_DISPLAY_NAMES[provider]} estará disponível em breve.`);
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
    triggerSocialRegister,
    submitRegisterForm
  };
}
