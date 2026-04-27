import { environment } from '../../../environments/environment';

const normalizeBaseUrl = (baseUrl: string): string => baseUrl.replace(/\/+$/, '');
const normalizeRelativePathSegment = (pathSegment: string): string =>
  pathSegment.replace(/^\/+|\/+$/g, '');
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

export const ASSETS_ROOT_PATH = 'assets';
export const IMAGE_ASSETS_ROOT_PATH = `${ASSETS_ROOT_PATH}/img`;
export const SKILLS_IMAGE_ASSETS_ROOT_PATH = `${IMAGE_ASSETS_ROOT_PATH}/skills`;

export const appConfig = {
  baseUrl: normalizeBaseUrl(environment.appBaseUrl),
} as const;

export const apiConfig = {
  baseUrl: normalizeBaseUrl(environment.apiBaseUrl),
} as const;

export const buildRelativeAssetPath = (...pathSegments: string[]): string => {
  const normalizedPath = pathSegments
    .map(normalizeRelativePathSegment)
    .filter(Boolean)
    .join('/');

  return normalizedPath ? `/${normalizedPath}` : '';
};

export const buildRelativeImageAssetPath = (assetPath: string): string =>
  buildRelativeAssetPath(IMAGE_ASSETS_ROOT_PATH, assetPath);

export const buildRelativeSkillImageAssetPath = (fileName: string): string =>
  buildRelativeAssetPath(SKILLS_IMAGE_ASSETS_ROOT_PATH, fileName);

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
  const assetsPath = normalizedPath.startsWith(`${ASSETS_ROOT_PATH}/`)
    ? normalizedPath
    : `${ASSETS_ROOT_PATH}/${normalizedPath}`;

  return `${appConfig.baseUrl}/${assetsPath}`;
};
