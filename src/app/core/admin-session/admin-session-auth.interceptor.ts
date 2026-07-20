import { HttpInterceptorFn } from '@angular/common/http';
import { apiConfig, buildApiUrl } from '../api/api.config';
import {
  ADMIN_SESSION_AUTH_EXCLUDED_PATHS,
  ADMIN_SESSION_STORAGE_KEY,
} from './admin-session.types';

const isApiRequest = (url: string): boolean => url.startsWith(apiConfig.baseUrl);

const isExcludedRequest = (url: string): boolean =>
  ADMIN_SESSION_AUTH_EXCLUDED_PATHS.some((path) =>
    url.startsWith(buildApiUrl(path)),
  );

export const adminSessionAuthInterceptor: HttpInterceptorFn = (request, next) => {
  if (
    !isApiRequest(request.url) ||
    isExcludedRequest(request.url) ||
    request.headers.has('Authorization')
  ) {
    return next(request);
  }

  const accessToken = sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY);

  if (!accessToken) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  );
};
