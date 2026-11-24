export type SocialAuthProvider = 'github' | 'gmail';

export interface LoginFormValues {
  identifier: string;
  password: string;
  isRememberMeChecked: boolean;
}

export interface LoginFieldErrors {
  identifier?: string;
  password?: string;
}
