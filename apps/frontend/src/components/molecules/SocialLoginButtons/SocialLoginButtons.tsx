import githubLogoUrl from '../../../assets/github.svg';
import gmailLogoUrl from '../../../assets/gmail.svg';
import type { SocialAuthProvider } from '../../../types/auth';

export interface SocialLoginButtonsProps {
  isDisabled?: boolean;
  actionPrefix?: string;
  onSelectProvider: (provider: SocialAuthProvider) => void;
}

interface SocialProviderOption {
  id: SocialAuthProvider;
  label: string;
  iconUrl: string;
}

const DEFAULT_ACTION_PREFIX = 'Entrar com';

const SOCIAL_PROVIDER_OPTIONS: readonly SocialProviderOption[] = [
  { id: 'github', label: 'Github', iconUrl: githubLogoUrl },
  { id: 'gmail', label: 'Gmail', iconUrl: gmailLogoUrl }
];

const SOCIAL_BUTTON_CLASSES =
  'group flex min-h-11 min-w-11 cursor-pointer flex-col items-center gap-1.5 rounded-md px-2 py-1 transition-transform enabled:hover:scale-105 motion-reduce:transition-none motion-reduce:enabled:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-green focus-visible:ring-offset-2 focus-visible:ring-offset-surface-card disabled:cursor-not-allowed disabled:opacity-60';

export function SocialLoginButtons({
  isDisabled = false,
  actionPrefix = DEFAULT_ACTION_PREFIX,
  onSelectProvider
}: SocialLoginButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      {SOCIAL_PROVIDER_OPTIONS.map((provider) => (
        <button
          key={provider.id}
          type="button"
          disabled={isDisabled}
          aria-label={`${actionPrefix} ${provider.label}`}
          onClick={() => onSelectProvider(provider.id)}
          className={SOCIAL_BUTTON_CLASSES}
        >
          <span className="flex h-8 w-8 items-center justify-center">
            <img src={provider.iconUrl} alt="" aria-hidden="true" className="max-h-8 max-w-8 object-contain" />
          </span>
          <span className="text-[13px] text-offwhite transition-colors group-enabled:group-hover:text-highlight-green">
            {provider.label}
          </span>
        </button>
      ))}
    </div>
  );
}
