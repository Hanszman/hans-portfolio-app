import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AdminAuthenticationService } from '../api/admin/admin-auth/admin-auth.service';
import {
  AdminLoginResult,
  AdminSessionSnapshot,
} from '../api/admin/admin-auth/admin-auth.types';
import {
  AdminSessionService,
} from './admin-session.service';
import {
  ADMIN_SESSION_STORAGE_KEY,
} from './admin-session.types';

const createAdminUserResponse = (): AdminSessionSnapshot => ({
  id: '5f8e1e74-2d49-4b5c-9724-2e8c9c8b0e11',
  email: 'victor@example.com',
  name: 'Victor Hanszman',
  role: 'ADMIN',
});

const createAdminLoginResponse = (): AdminLoginResult => ({
  accessToken: 'token-123',
  tokenType: 'Bearer',
  expiresIn: '1d',
  user: createAdminUserResponse(),
});

describe('AdminSessionService', () => {
  beforeEach(() => {
    sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  });

  afterEach(() => {
    sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  });

  it('should authenticate and persist the admin session on successful login', async () => {
    const login = jasmine.createSpy().and.returnValue(of(createAdminLoginResponse()));

    TestBed.configureTestingModule({
      providers: [
        AdminSessionService,
        provideZonelessChangeDetection(),
        {
          provide: AdminAuthenticationService,
          useValue: {
            login,
            getSession: jasmine.createSpy(),
          },
        },
      ],
    });

    const service = TestBed.inject(AdminSessionService);
    const success = await service.login({
      email: 'victor@example.com',
      password: 'ChangeMe!123',
    });

    expect(success).toBeTrue();
    expect(service.isRestoringSession()).toBeFalse();
    expect(login).toHaveBeenCalledWith({
      email: 'victor@example.com',
      password: 'ChangeMe!123',
    });
    expect(service.accessToken()).toBe('token-123');
    expect(service.user()).toEqual(createAdminUserResponse());
    expect(service.isAuthenticated()).toBeTrue();
    expect(service.loginErrorKey()).toBeNull();
    expect(sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY)).toBe('token-123');
  });

  it('should expose the translated error key and clear session data when login fails', async () => {
    TestBed.configureTestingModule({
      providers: [
        AdminSessionService,
        provideZonelessChangeDetection(),
        {
          provide: AdminAuthenticationService,
          useValue: {
            login: jasmine
              .createSpy()
              .and.returnValue(throwError(() => new Error('Unauthorized'))),
            getSession: jasmine.createSpy(),
          },
        },
      ],
    });

    const service = TestBed.inject(AdminSessionService);
    const success = await service.login({
      email: 'victor@example.com',
      password: 'WrongPassword!123',
    });

    expect(success).toBeFalse();
    expect(service.accessToken()).toBeNull();
    expect(service.user()).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.loginErrorKey()).toBe('pages.login.feedback.invalidCredentials');
    expect(sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY)).toBeNull();
  });

  it('should restore the admin session from the persisted token', async () => {
    sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, 'token-123');
    const getSession = jasmine
      .createSpy()
      .and.returnValue(of(createAdminUserResponse()));

    TestBed.configureTestingModule({
      providers: [
        AdminSessionService,
        provideZonelessChangeDetection(),
        {
          provide: AdminAuthenticationService,
          useValue: {
            login: jasmine.createSpy(),
            getSession,
          },
        },
      ],
    });

    const service = TestBed.inject(AdminSessionService);
    const user = await service.restoreSession();

    expect(getSession).toHaveBeenCalledWith('token-123');
    expect(user).toEqual(createAdminUserResponse());
    expect(service.user()).toEqual(createAdminUserResponse());
    expect(service.isAuthenticated()).toBeTrue();
    expect(service.isRestoringSession()).toBeFalse();
  });

  it('should clear the persisted token when session validation fails', async () => {
    sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, 'token-123');

    TestBed.configureTestingModule({
      providers: [
        AdminSessionService,
        provideZonelessChangeDetection(),
        {
          provide: AdminAuthenticationService,
          useValue: {
            login: jasmine.createSpy(),
            getSession: jasmine
              .createSpy()
              .and.returnValue(throwError(() => new Error('Unauthorized'))),
          },
        },
      ],
    });

    const service = TestBed.inject(AdminSessionService);
    const user = await service.restoreSession();

    expect(user).toBeNull();
    expect(service.accessToken()).toBeNull();
    expect(service.user()).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
    expect(sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY)).toBeNull();
  });

  it('should return the current user immediately when the session is already hydrated', async () => {
    sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, 'token-123');
    const getSession = jasmine
      .createSpy()
      .and.returnValue(of(createAdminUserResponse()));

    TestBed.configureTestingModule({
      providers: [
        AdminSessionService,
        provideZonelessChangeDetection(),
        {
          provide: AdminAuthenticationService,
          useValue: {
            login: jasmine.createSpy(),
            getSession,
          },
        },
      ],
    });

    const service = TestBed.inject(AdminSessionService);

    await service.restoreSession();
    const user = await service.restoreSession();

    expect(user).toEqual(createAdminUserResponse());
    expect(getSession).toHaveBeenCalledTimes(1);
  });

  it('should clear the current admin session on logout', async () => {
    const login = jasmine.createSpy().and.returnValue(of(createAdminLoginResponse()));

    TestBed.configureTestingModule({
      providers: [
        AdminSessionService,
        provideZonelessChangeDetection(),
        {
          provide: AdminAuthenticationService,
          useValue: {
            login,
            getSession: jasmine.createSpy(),
          },
        },
      ],
    });

    const service = TestBed.inject(AdminSessionService);

    await service.login({
      email: 'victor@example.com',
      password: 'ChangeMe!123',
    });
    service.logout();

    expect(service.accessToken()).toBeNull();
    expect(service.user()).toBeNull();
    expect(service.isAuthenticated()).toBeFalse();
    expect(sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY)).toBeNull();
  });

  it('should clear the login error when logging out after a failed login attempt', async () => {
    TestBed.configureTestingModule({
      providers: [
        AdminSessionService,
        provideZonelessChangeDetection(),
        {
          provide: AdminAuthenticationService,
          useValue: {
            login: jasmine
              .createSpy()
              .and.returnValue(throwError(() => new Error('Unauthorized'))),
            getSession: jasmine.createSpy(),
          },
        },
      ],
    });

    const service = TestBed.inject(AdminSessionService);

    await service.login({
      email: 'victor@example.com',
      password: 'WrongPassword!123',
    });
    service.logout();

    expect(service.loginErrorKey()).toBeNull();
  });
});
