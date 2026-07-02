import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AdminAuthService } from '../../core/auth-admin/auth-admin.service';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  beforeAll(() => {
    if (!customElements.get('hans-button')) {
      customElements.define('hans-button', class extends HTMLElement {});
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
          provide: AdminAuthService,
          useValue: {
            user: () => ({
              id: '5f8e1e74-2d49-4b5c-9724-2e8c9c8b0e11',
              email: 'victor@example.com',
              name: 'Victor Hanszman',
              role: 'ADMIN',
            }),
            logout: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();
  });

  it('should render the temporary protected admin destination', () => {
    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Admin route unlocked');
    expect(compiled.textContent).toContain('Victor Hanszman');
    expect(compiled.querySelector('hans-button')).toBeTruthy();
  });

  it('should clear the session and navigate back to the login route on logout', async () => {
    const fixture = TestBed.createComponent(AdminComponent);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.resolveTo(true);
    const adminAuthService = TestBed.inject(
      AdminAuthService,
    ) as jasmine.SpyObj<AdminAuthService>;
    const component = fixture.componentInstance as unknown as {
      logout(): Promise<void>;
    };

    await component.logout();

    expect(adminAuthService.logout).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/admin/login');
  });
});
