import { AdminAuthenticatedUser } from '../../../core/api/admin-auth/admin-auth-api.types';

export const formatAdminIdentity = (
  user: AdminAuthenticatedUser | null,
): string => (user ? `${user.name} · ${user.role}` : '');
