import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants/routes';
import type { RegisterFieldErrors, RegisterFormValues, SocialAuthProvider } from '../../../types/auth';
import { Button } from '../../atoms/Button';
import { Checkbox } from '../../atoms/Checkbox';
import { FeedbackMessage } from '../../atoms/FeedbackMessage';
import { Icon } from '../../atoms/Icon';
import { AuthFormHeader } from '../../molecules/AuthFormHeader';
import { DividerWithLabel } from '../../molecules/DividerWithLabel';
import { FormField } from '../../molecules/FormField';
import { SocialLoginButtons } from '../../molecules/SocialLoginButtons';

export interface RegisterFormProps {
  values: RegisterFormValues;
  fieldErrors: RegisterFieldErrors;
  isSubmitting: boolean;
  feedbackMessage: string | null;
  hasSubmissionError: boolean;
  onNameChange: (nextName: string) => void;
  onEmailChange: (nextEmail: string) => void;
  onPasswordChange: (nextPassword: string) => void;
  onToggleRememberMe: () => void;
  onSocialRegisterClick: (provider: SocialAuthProvider) => void;
  onSubmitForm: (formEvent: FormEvent<HTMLFormElement>) => void;
}

function RegisterFieldsForm(props: RegisterFormProps) {
  return (
    <form onSubmit={props.onSubmitForm} noValidate className="flex flex-col gap-4">
      <FormField
        id="register-name"
        label="Nome"
        placeholder="Nome completo"
        autoComplete="name"
        value={props.values.name}
        errorMessage={props.fieldErrors.name}
        onValueChange={props.onNameChange}
      />
      <FormField
        id="register-email"
        label="Email"
        type="email"
        placeholder="Digite seu email"
        autoComplete="email"
        value={props.values.email}
        errorMessage={props.fieldErrors.email}
        onValueChange={props.onEmailChange}
      />
      <FormField
        id="register-password"
        label="Senha"
        type="password"
        placeholder="••••••"
        autoComplete="new-password"
        value={props.values.password}
        errorMessage={props.fieldErrors.password}
        onValueChange={props.onPasswordChange}
      />
      <div className="pt-0.5">
        <Checkbox
          id="register-remember-me"
          label="Lembrar-me"
          isChecked={props.values.isRememberMeChecked}
          onToggle={props.onToggleRememberMe}
        />
      </div>
      <FeedbackMessage
        message={props.feedbackMessage}
        tone={props.hasSubmissionError ? 'error' : 'success'}
      />
      <div className="pt-3">
        <Button type="submit" isLoading={props.isSubmitting} rightIcon={<Icon name="arrow-right" className="h-5 w-5" />}>
          Cadastrar
        </Button>
      </div>
    </form>
  );
}

function LoginCallToAction() {
  return (
    <footer className="mt-7 flex flex-wrap items-center justify-center gap-2 text-center">
      <p className="text-base text-offwhite">Já tem conta?</p>
      <Link
        to={APP_ROUTES.LOGIN}
        className="inline-flex items-center gap-2 text-lg font-normal text-highlight-green transition-colors hover:text-highlight-green-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-green"
      >
        <span>Faça seu login!</span>
        <Icon name="login" className="h-5 w-5" />
      </Link>
    </footer>
  );
}

export function RegisterForm(props: RegisterFormProps) {
  return (
    <section aria-label="Formulário de cadastro" className="mx-auto w-full max-w-[390px]">
      <AuthFormHeader title="Cadastro" subtitle="Olá! Preencha seus dados." />
      <RegisterFieldsForm {...props} />
      <div className="mt-8 flex flex-col gap-3">
        <DividerWithLabel label="ou entre com outras contas" />
        <SocialLoginButtons onSelectProvider={props.onSocialRegisterClick} />
      </div>
      <LoginCallToAction />
    </section>
  );
}
