export type AdminAuthRole = 'ADMIN' | 'EDITOR';

export interface AdminAuthUserResponse {
  id: string;
  email: string;
  name: string;
  role: AdminAuthRole;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: string;
  user: AdminAuthUserResponse;
}

export type AdminSessionResponse = AdminAuthUserResponse;
