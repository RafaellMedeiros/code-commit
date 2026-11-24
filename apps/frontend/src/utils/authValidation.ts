import type { SocialAuthProvider } from '../types/auth';

export const MIN_PASSWORD_LENGTH = 6;
export const SIMULATED_AUTH_DELAY_MS = 600;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SOCIAL_PROVIDER_DISPLAY_NAMES: Record<SocialAuthProvider, string> = {
  github: 'Github',
  gmail: 'Gmail'
};

export function validateIdentifier(identifier: string): string | undefined {
  if (!identifier.trim()) return 'Informe seu email ou nome de usuário.';

  return undefined;
}

export function validateName(name: string): string | undefined {
  if (!name.trim()) return 'Informe seu nome completo.';

  return undefined;
}

export function validateEmail(email: string): string | undefined {
  const normalizedEmail = email.trim();
  if (!normalizedEmail) return 'Informe seu email.';
  if (!EMAIL_PATTERN.test(normalizedEmail)) return 'Informe um email válido.';

  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) return 'Informe sua senha.';
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }

  return undefined;
}

export function waitSimulatedAuth(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, SIMULATED_AUTH_DELAY_MS);
  });
}
