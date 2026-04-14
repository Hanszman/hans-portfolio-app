import { environment } from '../../../environments/environment';

const normalizeApiBaseUrl = (apiBaseUrl: string): string => apiBaseUrl.replace(/\/+$/, '');

export const apiConfig = {
  baseUrl: normalizeApiBaseUrl(environment.apiBaseUrl),
} as const;

export const buildApiUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${apiConfig.baseUrl}${normalizedPath}`;
};
