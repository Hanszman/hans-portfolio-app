import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../api/api.config';
import { adminSessionAuthInterceptor } from './admin-session-auth.interceptor';
import {
  ADMIN_SESSION_STORAGE_KEY,
  createAdminSessionState,
} from './admin-session.types';

describe('adminSessionAuthInterceptor', () => {
  beforeEach(() => {
    sessionStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptors([adminSessionAuthInterceptor])),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
    sessionStorage.clear();
  });

  it('should attach the admin authorization header to api requests when a session token exists', () => {
    sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, 'token-123');

    const httpClient = TestBed.inject(HttpClient);
    const httpTestingController = TestBed.inject(HttpTestingController);

    httpClient.get(buildApiUrl('/customers')).subscribe();

    const request = httpTestingController.expectOne(buildApiUrl('/customers'));

    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');

    request.flush({ data: [] });
  });

  it('should skip the authorization header when there is no stored session token', () => {
    const httpClient = TestBed.inject(HttpClient);
    const httpTestingController = TestBed.inject(HttpTestingController);

    httpClient.get(buildApiUrl('/customers')).subscribe();

    const request = httpTestingController.expectOne(buildApiUrl('/customers'));

    expect(request.request.headers.has('Authorization')).toBeFalse();

    request.flush({ data: [] });
  });

  it('should not attach the authorization header to the login endpoint', () => {
    sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, 'token-123');

    const httpClient = TestBed.inject(HttpClient);
    const httpTestingController = TestBed.inject(HttpTestingController);

    httpClient.post(buildApiUrl('/auth/login'), {}).subscribe();

    const request = httpTestingController.expectOne(buildApiUrl('/auth/login'));

    expect(request.request.headers.has('Authorization')).toBeFalse();

    request.flush({});
  });

  it('should preserve an authorization header that was already defined', () => {
    sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, 'token-123');

    const httpClient = TestBed.inject(HttpClient);
    const httpTestingController = TestBed.inject(HttpTestingController);

    httpClient
      .get(buildApiUrl('/admin/session'), {
        headers: {
          Authorization: 'Bearer token-456',
        },
      })
      .subscribe();

    const request = httpTestingController.expectOne(buildApiUrl('/admin/session'));

    expect(request.request.headers.get('Authorization')).toBe('Bearer token-456');

    request.flush({});
  });

  it('should keep the session state factory stable for persisted sessions', () => {
    expect(createAdminSessionState('token-123')).toEqual({
      accessToken: 'token-123',
      user: null,
      isSubmittingLogin: false,
      isRestoringSession: false,
      loginErrorKey: null,
    });
  });
});
