import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AdminAuthService } from '../../core/auth-admin/auth-admin.service';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { AdminLoginComponent } from './admin-login.component';

describe('AdminLoginComponent', () => {
  beforeAll(() => {
    for (const elementName of [
      'hans-input',
      'hans-button',
      'hans-icon',
      'hans-loading',
    ]) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLoginComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideAppTranslations(),
        {
          provide: AdminAuthService,
          useValue: {
            isSubmittingLogin: () => false,
            loginErrorKey: () => null,
            login: jasmine.createSpy().and.resolveTo(true),
          },
        },
      ],
    }).compileComponents();
  });

  it('should render the hidden admin login copy and form controls', () => {
    const fixture = TestBed.createComponent(AdminLoginComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Admin access');
    expect(compiled.textContent).toContain('Protected route');
    expect(compiled.querySelectorAll('hans-input')).toHaveSize(2);
    expect(compiled.querySelector('hans-button')).toBeTruthy();
  });

  it('should update the credential signals from the web component input events', () => {
    const fixture = TestBed.createComponent(AdminLoginComponent);
    const component = fixture.componentInstance as unknown as {
      updateEmail(value: string): void;
      updatePassword(value: string): void;
      email(): string;
      password(): string;
      canSubmit(): boolean;
    };

    component.updateEmail('victor@example.com');
    component.updatePassword('ChangeMe!123');

    expect(component.email()).toBe('victor@example.com');
    expect(component.password()).toBe('ChangeMe!123');
    expect(component.canSubmit()).toBeTrue();
  });

  it('should authenticate and navigate to the protected admin route on success', async () => {
    const fixture = TestBed.createComponent(AdminLoginComponent);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.resolveTo(true);
    const adminAuthService = TestBed.inject(
      AdminAuthService,
    ) as jasmine.SpyObj<AdminAuthService>;
    const component = fixture.componentInstance as unknown as {
      updateEmail(value: string): void;
      updatePassword(value: string): void;
      submit(): Promise<void>;
    };

    component.updateEmail('victor@example.com');
    component.updatePassword('ChangeMe!123');

    await component.submit();

    expect(adminAuthService.login).toHaveBeenCalledWith({
      email: 'victor@example.com',
      password: 'ChangeMe!123',
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/admin');
  });

  it('should not navigate when the login attempt fails', async () => {
    const fixture = TestBed.createComponent(AdminLoginComponent);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.resolveTo(true);
    const adminAuthService = TestBed.inject(
      AdminAuthService,
    ) as jasmine.SpyObj<AdminAuthService>;
    adminAuthService.login.and.resolveTo(false);
    const component = fixture.componentInstance as unknown as {
      updateEmail(value: string): void;
      updatePassword(value: string): void;
      submit(): Promise<void>;
    };

    component.updateEmail('victor@example.com');
    component.updatePassword('WrongPassword!123');

    await component.submit();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should not submit when the form is incomplete', async () => {
    const fixture = TestBed.createComponent(AdminLoginComponent);
    const adminAuthService = TestBed.inject(
      AdminAuthService,
    ) as jasmine.SpyObj<AdminAuthService>;
    const component = fixture.componentInstance as unknown as {
      updateEmail(value: string): void;
      submit(): Promise<void>;
    };

    component.updateEmail('victor@example.com');

    await component.submit();

    expect(adminAuthService.login).not.toHaveBeenCalled();
  });
});
