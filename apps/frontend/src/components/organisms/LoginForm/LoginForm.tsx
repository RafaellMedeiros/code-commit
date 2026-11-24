import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants/routes';
import type { LoginFieldErrors, LoginFormValues, SocialAuthProvider } from '../../../types/auth';
import { Button } from '../../atoms/Button';
import { Checkbox } from '../../atoms/Checkbox';
import { Icon } from '../../atoms/Icon';
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

function LoginHeader() {
  return (
    <header className="mb-7">
      <h1 className="text-[31px] leading-tight font-semibold text-white">Login</h1>
      <p className="mt-3 text-[20px] leading-snug font-normal text-offwhite">Boas-vindas! Faça seu login.</p>
    </header>
  );
}

function FeedbackBanner({ message, hasError }: { message: string | null; hasError: boolean }) {
  if (!message) return null;

  const toneClasses = hasError
    ? 'border-error/40 bg-error/10 text-error'
    : 'border-highlight-green/40 bg-highlight-green/10 text-highlight-green';

  return (
    <p role="status" className={`rounded-md border px-3 py-2 text-sm ${toneClasses}`}>
      {message}
    </p>
  );
}

function LoginOptionsRow({
  isRememberMeChecked,
  onToggleRememberMe,
  onForgotPasswordClick
}: {
  isRememberMeChecked: boolean;
  onToggleRememberMe: () => void;
  onForgotPasswordClick: () => void;
}) {
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
        onClick={onForgotPasswordClick}
        className="cursor-pointer text-[15px] text-offwhite underline transition-colors hover:text-highlight-green"
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
        value={props.values.password}
        errorMessage={props.fieldErrors.password}
        onValueChange={props.onPasswordChange}
      />
      <LoginOptionsRow
        isRememberMeChecked={props.values.isRememberMeChecked}
        onToggleRememberMe={props.onToggleRememberMe}
        onForgotPasswordClick={props.onForgotPasswordClick}
      />
      <FeedbackBanner message={props.feedbackMessage} hasError={props.hasSubmissionError} />
      <div className="pt-3">
        <Button type="submit" isLoading={props.isSubmitting} rightIcon={<Icon name="arrow-right" className="h-5 w-5" />}>
          Login
        </Button>
      </div>
    </form>
  );
}

function RegisterCallToAction() {
  return (
    <footer className="mt-7 flex flex-col items-center gap-1.5 text-center">
      <p className="text-[15px] text-offwhite">Ainda não tem conta?</p>
      <Link
        to={APP_ROUTES.REGISTER}
        className="inline-flex items-center gap-2 text-lg font-normal text-highlight-green transition-colors hover:text-highlight-green-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-green"
      >
        <span>Crie seu cadastro!</span>
        <Icon name="assignment" className="h-5 w-5" />
      </Link>
    </footer>
  );
}

export function LoginForm(props: LoginFormProps) {
  return (
    <section aria-label="Formulário de login" className="mx-auto w-full max-w-[390px]">
      <LoginHeader />
      <CredentialsForm {...props} />
      <div className="mt-8 flex flex-col gap-3">
        <DividerWithLabel label="ou entre com outras contas" />
        <SocialLoginButtons onSelectProvider={props.onSocialLoginClick} />
      </div>
      <RegisterCallToAction />
    </section>
  );
}
