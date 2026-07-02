import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../api.config';
import { AdminAuthApiService } from './auth-admin.service';
import {
  AdminLoginResponse,
  AdminSessionResponse,
} from './auth-admin.types';

const createAdminUserResponse = (): AdminSessionResponse => ({
  id: '5f8e1e74-2d49-4b5c-9724-2e8c9c8b0e11',
  email: 'victor@example.com',
  name: 'Victor Hanszman',
  role: 'ADMIN',
});

const createAdminLoginResponse = (): AdminLoginResponse => ({
  accessToken: 'token-123',
  tokenType: 'Bearer',
  expiresIn: '1d',
  user: createAdminUserResponse(),
});

describe('AdminAuthApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminAuthApiService,
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should authenticate the admin user through the login endpoint', () => {
    const service = TestBed.inject(AdminAuthApiService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service
      .login({
        email: 'victor@example.com',
        password: 'ChangeMe!123',
      })
      .subscribe((response) => {
        expect(response).toEqual(createAdminLoginResponse());
      });

    const request = httpTestingController.expectOne(buildApiUrl('/auth/login'));

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      email: 'victor@example.com',
      password: 'ChangeMe!123',
    });

    request.flush(createAdminLoginResponse());
  });

  it('should validate the current admin session with a bearer token', () => {
    const service = TestBed.inject(AdminAuthApiService);
    const httpTestingController = TestBed.inject(HttpTestingController);

    service.getSession('token-123').subscribe((response) => {
      expect(response).toEqual(createAdminUserResponse());
    });

    const request = httpTestingController.expectOne(
      buildApiUrl('/admin/session'),
    );

    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('Authorization')).toBe('Bearer token-123');

    request.flush(createAdminUserResponse());
  });
});
