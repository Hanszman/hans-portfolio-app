import { environment } from '../../../environments/environment';

const normalizeApiBaseUrl = (apiBaseUrl: string): string => apiBaseUrl.replace(/\/+$/, '');
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

export const apiConfig = {
  baseUrl: normalizeApiBaseUrl(environment.apiBaseUrl),
} as const;

export const buildApiUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${apiConfig.baseUrl}${normalizedPath}`;
};

export const buildApiAssetUrl = (
  assetPath: string | null | undefined,
): string => {
  if (!assetPath) {
    return '';
  }

  if (ABSOLUTE_URL_PATTERN.test(assetPath)) {
    return assetPath;
  }

  const normalizedPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;

  return `${apiConfig.baseUrl}${normalizedPath}`;
};
