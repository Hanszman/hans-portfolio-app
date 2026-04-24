import { HttpErrorResponse } from '@angular/common/http';
import { NEVER, Observable, of, throwError } from 'rxjs';
import { apiConfig } from '../api.config';
import { SystemService } from '../system/service';
import { HealthResponse, SystemOverviewResponse } from '../system/types';

export const createHealthResponse = (
  overrides: Partial<HealthResponse> = {},
): HealthResponse => ({
  status: 'healthy',
  checks: {
    database: 'up',
  },
  checkedAtUtc: '2026-04-14T13:00:00.000Z',
  ...overrides,
});

export const createSystemOverviewResponse = (
  overrides: Partial<SystemOverviewResponse> = {},
): SystemOverviewResponse => ({
  name: 'Hans Portfolio API',
  module: 'system',
  status: 'operational',
  routes: ['/system/ping'],
  ...overrides,
});

export const createSystemServiceMock = (
  mode: 'success' | 'blocked' | 'generic-error' | 'loading' = 'success',
): Pick<SystemService, 'apiBaseUrl' | 'getHealth'> => ({
  apiBaseUrl: apiConfig.baseUrl,
  getHealth: (): Observable<HealthResponse> =>
    mode === 'success'
      ? of(createHealthResponse())
      : mode === 'blocked'
        ? throwError(
            () =>
              new HttpErrorResponse({
                status: 0,
                statusText: 'Unknown Error',
              }),
          )
        : mode === 'loading'
          ? NEVER
          : throwError(() => new Error('health failed')),
});
