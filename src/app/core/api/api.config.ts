import { environment } from '../../../environments/environment';

const normalizeBaseUrl = (baseUrl: string): string => baseUrl.replace(/\/+$/, '');
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

export const appConfig = {
  baseUrl: normalizeBaseUrl(environment.appBaseUrl),
} as const;

export const apiConfig = {
  baseUrl: normalizeBaseUrl(environment.apiBaseUrl),
} as const;

export const buildApiUrl = (path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${apiConfig.baseUrl}${normalizedPath}`;
};

export const buildAssetUrl = (assetPath: string | null | undefined): string => {
  if (!assetPath) {
    return '';
  }

  if (ABSOLUTE_URL_PATTERN.test(assetPath)) {
    return assetPath;
  }

  const normalizedPath = assetPath.replace(/^\/+/, '');
  const assetsPath = normalizedPath.startsWith('assets/')
    ? normalizedPath
    : `assets/${normalizedPath}`;

  return `${appConfig.baseUrl}/${assetsPath}`;
};
