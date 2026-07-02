import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AdminAuthApiService } from '../api/auth-admin/auth-admin.service';
import {
  AdminLoginResponse,
  AdminSessionResponse,
} from '../api/auth-admin/auth-admin.types';
import {
  AdminAuthService,
  ADMIN_AUTH_STORAGE_KEY,
} from './auth-admin.service';

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

describe('AdminAuthService', () => {
  beforeEach(() => {
    sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
  });

  afterEach(() => {
    sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
  });

  it('should authenticate and persist the admin session on successful login', async () => {
    const login = jasmine.createSpy().and.returnValue(of(createAdminLoginResponse()));

    TestBed.configureTestingModule({
      providers: [
        AdminAuthService,
        provideZonelessChangeDetection(),
        {
          provide: AdminAuthApiService,
          useValue: {
            login,
            getSession: jasmine.createSpy(),
          },
        },
      ],
    });

    const service = TestBed.inject(AdminAuthService);
    const success = await service.login({
      email: 'victor@example.com',
      password: 'ChangeMe!123',
    });

    expect(success).toBeTrue();
    expect(login).toHaveBeenCalledWith({
      email: 'victor@example.com',
      password: 'ChangeMe!123',
    });
    expect(service.accessToken()).toBe('token-123');
    expect(service.user()).toEqual(createAdminUserResponse());
    expect(service.isAuthenticated()).toBeTrue();
    expect(service.loginErrorKey()).toBeNull();
    expect(sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY)).toBe('token-123');
  });

  it('should expose the translated error key and clear session data when login fails', async () => {
    TestBed.configureTestingModule({
      providers: [
        AdminAuthService,
        provideZonelessChangeDetection(),
        {
          provide: AdminAuthApiService,
          useValue: {
            login: jasmine
              .createSpy()
              .and.returnValue(throwError(() => new Error('Unauthorized'))),
            getSession: jasmine.createSpy(),
          },
        },
      ],
    });

    const service = TestBed.inject(AdminAuthService);
    const success = await service.login({
      email: 'victor@example.com',
      password: 'WrongPassword!123',
    });

    expect(success).toBeFalse();
    expect(service.accessToken()).toBeNull();
    expect(service.user()).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.loginErrorKey()).toBe(
      'pages.adminLogin.feedback.invalidCredentials',
    );
    expect(sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY)).toBeNull();
  });

  it('should restore the admin session from the persisted token', async () => {
    sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, 'token-123');
    const getSession = jasmine
      .createSpy()
      .and.returnValue(of(createAdminUserResponse()));

    TestBed.configureTestingModule({
      providers: [
        AdminAuthService,
        provideZonelessChangeDetection(),
        {
          provide: AdminAuthApiService,
          useValue: {
            login: jasmine.createSpy(),
            getSession,
          },
        },
      ],
    });

    const service = TestBed.inject(AdminAuthService);
    const user = await service.restoreSession();

    expect(getSession).toHaveBeenCalledWith('token-123');
    expect(user).toEqual(createAdminUserResponse());
    expect(service.user()).toEqual(createAdminUserResponse());
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should clear the persisted token when session validation fails', async () => {
    sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, 'token-123');

    TestBed.configureTestingModule({
      providers: [
        AdminAuthService,
        provideZonelessChangeDetection(),
        {
          provide: AdminAuthApiService,
          useValue: {
            login: jasmine.createSpy(),
            getSession: jasmine
              .createSpy()
              .and.returnValue(throwError(() => new Error('Unauthorized'))),
          },
        },
      ],
    });

    const service = TestBed.inject(AdminAuthService);
    const user = await service.restoreSession();

    expect(user).toBeNull();
    expect(service.accessToken()).toBeNull();
    expect(service.user()).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
    expect(sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY)).toBeNull();
  });

  it('should return the current user immediately when the session is already hydrated', async () => {
    sessionStorage.setItem(ADMIN_AUTH_STORAGE_KEY, 'token-123');
    const getSession = jasmine
      .createSpy()
      .and.returnValue(of(createAdminUserResponse()));

    TestBed.configureTestingModule({
      providers: [
        AdminAuthService,
        provideZonelessChangeDetection(),
        {
          provide: AdminAuthApiService,
          useValue: {
            login: jasmine.createSpy(),
            getSession,
          },
        },
      ],
    });

    const service = TestBed.inject(AdminAuthService);

    await service.restoreSession();
    const user = await service.restoreSession();

    expect(user).toEqual(createAdminUserResponse());
    expect(getSession).toHaveBeenCalledTimes(1);
  });

  it('should clear the current admin session on logout', async () => {
    const login = jasmine.createSpy().and.returnValue(of(createAdminLoginResponse()));

    TestBed.configureTestingModule({
      providers: [
        AdminAuthService,
        provideZonelessChangeDetection(),
        {
          provide: AdminAuthApiService,
          useValue: {
            login,
            getSession: jasmine.createSpy(),
          },
        },
      ],
    });

    const service = TestBed.inject(AdminAuthService);

    await service.login({
      email: 'victor@example.com',
      password: 'ChangeMe!123',
    });
    service.logout();

    expect(service.accessToken()).toBeNull();
    expect(service.user()).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
    expect(sessionStorage.getItem(ADMIN_AUTH_STORAGE_KEY)).toBeNull();
  });
});
