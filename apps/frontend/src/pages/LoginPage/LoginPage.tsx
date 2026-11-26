import { AuthBanner } from '../../components/molecules/AuthBanner';
import { LoginForm } from '../../components/organisms/LoginForm';
import { AuthTemplate } from '../../components/templates/AuthTemplate';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useLoginForm } from './useLoginForm';

const LOGIN_PAGE_TITLE = 'Login';
const LOGIN_PAGE_DESCRIPTION =
  'Acesse sua conta no Code Connect para compartilhar projetos, códigos e colaborar com a comunidade dev.';

export function LoginPage() {
  useDocumentTitle(LOGIN_PAGE_TITLE, LOGIN_PAGE_DESCRIPTION);
  const loginState = useLoginForm();

  return (
    <AuthTemplate bannerSlot={<AuthBanner />}>
      <LoginForm
        values={loginState.values}
        fieldErrors={loginState.fieldErrors}
        isSubmitting={loginState.isSubmitting}
        feedbackMessage={loginState.feedbackMessage}
        hasSubmissionError={loginState.hasSubmissionError}
        onIdentifierChange={loginState.updateIdentifier}
        onPasswordChange={loginState.updatePassword}
        onToggleRememberMe={loginState.toggleRememberMe}
        onForgotPasswordClick={loginState.notifyForgotPassword}
        onSocialLoginClick={loginState.triggerSocialLogin}
        onSubmitForm={loginState.submitLoginForm}
      />
    </AuthTemplate>
  );
}
