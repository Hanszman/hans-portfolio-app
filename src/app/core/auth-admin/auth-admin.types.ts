import { AppTranslationKey } from '../translation/translation.types';
import { AdminAuthUserResponse } from '../api/auth-admin/auth-admin.types';

export interface AdminAuthCredentials {
  email: string;
  password: string;
}

export interface AdminAuthState {
  accessToken: string | null;
  user: AdminAuthUserResponse | null;
  isSubmittingLogin: boolean;
  isRestoringSession: boolean;
  loginErrorKey: AppTranslationKey | null;
}
