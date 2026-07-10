import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { PortfolioSettingsApiService } from '../../core/api/admin/portfolio-settings/portfolio-settings-api.service';
import { AdminSessionService } from '../../core/admin-session/admin-session.service';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  beforeAll(() => {
    for (const elementName of [
      'hans-button',
      'hans-icon',
      'hans-input',
      'hans-loading',
      'hans-modal',
      'hans-toggle',
      'hans-dropdown',
    ]) {
      if (!customElements.get(elementName)) {
        customElements.define(
          elementName,
          class extends HTMLElement {
            checked?: boolean;
            options?: readonly unknown[];
          },
        );
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideAppTranslations(),
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
            user: () => ({
              id: '5f8e1e74-2d49-4b5c-9724-2e8c9c8b0e11',
              email: 'victor@example.com',
              name: 'Victor Hanszman',
              role: 'ADMIN',
            }),
            logout: jasmine.createSpy(),
          },
        },
        {
          provide: PortfolioSettingsApiService,
          useValue: {
            getAll: () =>
              of({
                data: [
                  {
                    id: 'setting-1',
                    key: 'hero.metrics',
                    value: {
                      projects: 12,
                    },
                    description: 'Controls the highlighted portfolio metrics.',
                  },
                ],
                pagination: {
                  page: 1,
                  pageSize: 100,
                  totalItems: 1,
                  totalPages: 1,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();
  });

  it('should render the protected admin page with app chrome and the projected logout action', () => {
    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
    expect(compiled.textContent).toContain('Admin workspace');
    expect(compiled.textContent).toContain('Victor Hanszman');
    expect(compiled.textContent).toContain('12 entity workflows');
    expect(compiled.textContent).toContain('Portfolio settings');
    expect(compiled.textContent).toContain('Technology contexts');
    expect(
      compiled.querySelector('.app-section-header-actions hans-button'),
    ).toBeTruthy();
    expect(compiled.querySelectorAll('.admin-page-entity-card')).toHaveSize(11);
  });

  it('should clear the session and navigate back to the login route on logout', async () => {
    const fixture = TestBed.createComponent(AdminComponent);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.resolveTo(true);
    const adminSessionService = TestBed.inject(
      AdminSessionService,
    ) as jasmine.SpyObj<AdminSessionService>;
    const component = fixture.componentInstance as unknown as {
      logout(): Promise<void>;
    };

    await component.logout();

    expect(adminSessionService.logout).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should expose an empty admin email when the authenticated user is unavailable', () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideAppTranslations(),
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => null,
            user: () => null,
            logout: jasmine.createSpy(),
          },
        },
        {
          provide: PortfolioSettingsApiService,
          useValue: {
            getAll: () =>
              of({
                data: [],
                pagination: {
                  page: 1,
                  pageSize: 100,
                  totalItems: 0,
                  totalPages: 0,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      adminUserEmail(): string;
    };

    expect(component.adminUserEmail()).toBe('');
  });
});
