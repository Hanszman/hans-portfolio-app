import { environment } from '../../../environments/environment.generated';
const normalizeApiBaseUrl = (apiBaseUrl: string): string =>
  apiBaseUrl.replace(/\/+$/, '');

export const appEnvironment = {
  apiBaseUrl: normalizeApiBaseUrl(environment.PORTFOLIO_API_BASE_URL),
} as const;
