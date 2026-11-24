import registerBannerUrl from '../../assets/register-banner.webp';
import { AuthBanner } from '../../components/molecules/AuthBanner';
import { RegisterForm } from '../../components/organisms/RegisterForm';
import { AuthTemplate } from '../../components/templates/AuthTemplate';
import { useRegisterForm } from './useRegisterForm';

const REGISTER_BANNER_ALT = 'Pessoa desenvolvedora conectada em ambiente digital';

export function RegisterPage() {
  const registerState = useRegisterForm();

  return (
    <AuthTemplate bannerSlot={<AuthBanner imageSrc={registerBannerUrl} imageAlt={REGISTER_BANNER_ALT} />}>
      <RegisterForm
        values={registerState.values}
        fieldErrors={registerState.fieldErrors}
        isSubmitting={registerState.isSubmitting}
        feedbackMessage={registerState.feedbackMessage}
        hasSubmissionError={registerState.hasSubmissionError}
        onNameChange={registerState.updateName}
        onEmailChange={registerState.updateEmail}
        onPasswordChange={registerState.updatePassword}
        onSocialRegisterClick={registerState.triggerSocialRegister}
        onSubmitForm={registerState.submitRegisterForm}
      />
    </AuthTemplate>
  );
}
