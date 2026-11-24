import type { FormEvent } from 'react';
import { APP_ROUTES } from '../../../constants/routes';
import type { LoginFieldErrors, LoginFormValues, SocialAuthProvider } from '../../../types/auth';
import { Button } from '../../atoms/Button';
import { Checkbox } from '../../atoms/Checkbox';
import { FeedbackMessage } from '../../atoms/FeedbackMessage';
import { Icon } from '../../atoms/Icon';
import { AuthCallToAction } from '../../molecules/AuthCallToAction';
import { AuthFormHeader } from '../../molecules/AuthFormHeader';
import { DividerWithLabel } from '../../molecules/DividerWithLabel';
import { FormField } from '../../molecules/FormField';
import { SocialLoginButtons } from '../../molecules/SocialLoginButtons';

export interface LoginFormProps {
  values: LoginFormValues;
  fieldErrors: LoginFieldErrors;
  isSubmitting: boolean;
  feedbackMessage: string | null;
  hasSubmissionError: boolean;
  onIdentifierChange: (nextIdentifier: string) => void;
  onPasswordChange: (nextPassword: string) => void;
  onToggleRememberMe: () => void;
  onForgotPasswordClick: () => void;
  onSocialLoginClick: (provider: SocialAuthProvider) => void;
  onSubmitForm: (formEvent: FormEvent<HTMLFormElement>) => void;
}

interface LoginOptionsRowProps {
  isRememberMeChecked: boolean;
  isSubmitting: boolean;
  onToggleRememberMe: () => void;
  onForgotPasswordClick: () => void;
}

const LOGIN_HEADING_ID = 'login-heading';

const FORGOT_PASSWORD_BUTTON_CLASSES =
  'min-h-7 cursor-pointer rounded px-1 py-1 text-[15px] text-offwhite underline transition-colors enabled:hover:text-highlight-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-green focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card disabled:cursor-not-allowed disabled:opacity-60';

function LoginOptionsRow({
  isRememberMeChecked,
  isSubmitting,
  onToggleRememberMe,
  onForgotPasswordClick
}: LoginOptionsRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 pt-0.5">
      <Checkbox
        id="login-remember-me"
        label="Lembrar-me"
        isChecked={isRememberMeChecked}
        onToggle={onToggleRememberMe}
      />
      <button
        type="button"
        disabled={isSubmitting}
        onClick={onForgotPasswordClick}
        className={FORGOT_PASSWORD_BUTTON_CLASSES}
      >
        Esqueci a senha
      </button>
    </div>
  );
}

function CredentialsForm(props: LoginFormProps) {
  return (
    <form onSubmit={props.onSubmitForm} noValidate className="flex flex-col gap-4">
      <FormField
        id="login-identifier"
        label="Email ou usuário"
        placeholder="usuario123"
        autoComplete="username"
        isRequired
        value={props.values.identifier}
        errorMessage={props.fieldErrors.identifier}
        onValueChange={props.onIdentifierChange}
      />
      <FormField
        id="login-password"
        label="Senha"
        type="password"
        placeholder="••••••"
        autoComplete="current-password"
        isRequired
        value={props.values.password}
        errorMessage={props.fieldErrors.password}
        onValueChange={props.onPasswordChange}
      />
      <LoginOptionsRow
        isRememberMeChecked={props.values.isRememberMeChecked}
        isSubmitting={props.isSubmitting}
        onToggleRememberMe={props.onToggleRememberMe}
        onForgotPasswordClick={props.onForgotPasswordClick}
      />
      <FeedbackMessage
        message={props.feedbackMessage}
        tone={props.hasSubmissionError ? 'error' : 'success'}
      />
      <div className="pt-3">
        <Button type="submit" isLoading={props.isSubmitting} rightIcon={<Icon name="arrow-right" className="h-5 w-5" />}>
          Login
        </Button>
      </div>
    </form>
  );
}

export function LoginForm(props: LoginFormProps) {
  return (
    <section aria-labelledby={LOGIN_HEADING_ID} className="mx-auto w-full max-w-[390px]">
      <AuthFormHeader headingId={LOGIN_HEADING_ID} title="Login" subtitle="Boas-vindas! Faça seu login." />
      <CredentialsForm {...props} />
      <div className="mt-8 flex flex-col gap-3">
        <DividerWithLabel label="ou entre com outras contas" />
        <SocialLoginButtons isDisabled={props.isSubmitting} onSelectProvider={props.onSocialLoginClick} />
      </div>
      <AuthCallToAction
        promptText="Ainda não tem conta?"
        actionLabel="Crie seu cadastro!"
        to={APP_ROUTES.REGISTER}
        iconName="assignment"
      />
    </section>
  );
}
