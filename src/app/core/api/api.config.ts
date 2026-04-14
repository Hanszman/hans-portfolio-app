import { environment } from '../../../environments/environment.generated';

const normalizeApiBaseUrl = (apiBaseUrl: string): string => apiBaseUrl.replace(/\/+$/, '');

export const apiConfig = {
  baseUrl: normalizeApiBaseUrl(environment.PORTFOLIO_API_BASE_URL),
} as const;

export const buildApiUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${apiConfig.baseUrl}${normalizedPath}`;
};
