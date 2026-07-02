import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { AdminAuthService } from './auth-admin.service';
import { adminAuthGuard, adminLoginGuard } from './auth-admin.guard';

describe('admin auth guards', () => {
  it('should allow the protected admin route when the session is valid', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: AdminAuthService,
          useValue: {
            restoreSession: jasmine.createSpy().and.resolveTo({
              id: '5f8e1e74-2d49-4b5c-9724-2e8c9c8b0e11',
              email: 'victor@example.com',
              name: 'Victor Hanszman',
              role: 'ADMIN',
            }),
          },
        },
      ],
    });

    const result = await TestBed.runInInjectionContext(() =>
      adminAuthGuard({} as never, {} as never),
    );

    expect(result).toBeTrue();
  });

  it('should redirect unauthenticated users away from the protected admin route', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: AdminAuthService,
          useValue: {
            restoreSession: jasmine.createSpy().and.resolveTo(null),
          },
        },
      ],
    });

    const result = await TestBed.runInInjectionContext(() =>
      adminAuthGuard({} as never, {} as never),
    );
    const router = TestBed.inject(Router);

    expect(result instanceof UrlTree).toBeTrue();
    expect(router.serializeUrl(result as UrlTree)).toBe('/admin/login');
  });

  it('should redirect authenticated users away from the login route', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: AdminAuthService,
          useValue: {
            restoreSession: jasmine.createSpy().and.resolveTo({
              id: '5f8e1e74-2d49-4b5c-9724-2e8c9c8b0e11',
              email: 'victor@example.com',
              name: 'Victor Hanszman',
              role: 'ADMIN',
            }),
          },
        },
      ],
    });

    const result = await TestBed.runInInjectionContext(() =>
      adminLoginGuard({} as never, {} as never),
    );
    const router = TestBed.inject(Router);

    expect(result instanceof UrlTree).toBeTrue();
    expect(router.serializeUrl(result as UrlTree)).toBe('/admin');
  });

  it('should allow unauthenticated users to access the login route', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        {
          provide: AdminAuthService,
          useValue: {
            restoreSession: jasmine.createSpy().and.resolveTo(null),
          },
        },
      ],
    });

    const result = await TestBed.runInInjectionContext(() =>
      adminLoginGuard({} as never, {} as never),
    );

    expect(result).toBeTrue();
  });
});
