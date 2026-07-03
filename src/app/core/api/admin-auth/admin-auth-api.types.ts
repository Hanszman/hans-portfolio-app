export type AdminRole = 'ADMIN' | 'EDITOR';

export interface AdminAuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminLoginResult {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: string;
  user: AdminAuthenticatedUser;
}

export type AdminSessionSnapshot = AdminAuthenticatedUser;
