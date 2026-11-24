import githubLogoUrl from '../../../assets/github.svg';
import gmailLogoUrl from '../../../assets/gmail.svg';
import type { SocialAuthProvider } from '../../../types/auth';

export interface SocialLoginButtonsProps {
  onSelectProvider: (provider: SocialAuthProvider) => void;
}

interface SocialProviderOption {
  id: SocialAuthProvider;
  label: string;
  iconUrl: string;
}

const SOCIAL_PROVIDER_OPTIONS: readonly SocialProviderOption[] = [
  { id: 'github', label: 'Github', iconUrl: githubLogoUrl },
  { id: 'gmail', label: 'Gmail', iconUrl: gmailLogoUrl }
];

export function SocialLoginButtons({ onSelectProvider }: SocialLoginButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      {SOCIAL_PROVIDER_OPTIONS.map((provider) => (
        <button
          key={provider.id}
          type="button"
          aria-label={`Entrar com ${provider.label}`}
          onClick={() => onSelectProvider(provider.id)}
          className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-md px-2 py-1 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight-green"
        >
          <span className="flex h-8 w-8 items-center justify-center">
            <img src={provider.iconUrl} alt="" aria-hidden="true" className="max-h-8 max-w-8 object-contain" />
          </span>
          <span className="text-[13px] text-offwhite transition-colors group-hover:text-highlight-green">
            {provider.label}
          </span>
        </button>
      ))}
    </div>
  );
}
