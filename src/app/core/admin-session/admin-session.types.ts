import { AppTranslationKey } from '../translation/translation.types';
import {
  AdminAuthenticatedUser,
  AdminLoginPayload,
} from '../api/admin-auth/admin-auth-api.types';

export type AdminLoginCredentials = AdminLoginPayload;

export interface AdminSessionState {
  accessToken: string | null;
  user: AdminAuthenticatedUser | null;
  isSubmittingLogin: boolean;
  isRestoringSession: boolean;
  loginErrorKey: AppTranslationKey | null;
}

export const ADMIN_SESSION_STORAGE_KEY = 'hans-admin-access-token';

export const createAdminSessionState = (
  accessToken: string | null,
): AdminSessionState => ({
  accessToken,
  user: null,
  isSubmittingLogin: false,
  isRestoringSession: false,
  loginErrorKey: null,
});
