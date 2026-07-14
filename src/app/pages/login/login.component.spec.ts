import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AdminSessionService } from '../../core/admin-session/admin-session.service';
import { ToastService } from '../../core/toast/toast.service';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  beforeAll(() => {
    for (const elementName of [
      'hans-input',
      'hans-button',
      'hans-icon',
      'hans-loading',
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
      imports: [LoginComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideAppTranslations(),
        {
          provide: AdminSessionService,
          useValue: {
            isSubmittingLogin: () => false,
            loginErrorKey: () => null,
            login: jasmine.createSpy().and.resolveTo(true),
          },
        },
      ],
    }).compileComponents();
  });

  it('should render the login page content and form controls', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Admin access');
    expect(compiled.textContent).toContain('Protected route');
    expect(compiled.querySelectorAll('hans-input')).toHaveSize(2);
    expect(compiled.querySelector('hans-button')).toBeTruthy();
  });

  it('should update the credential signals from the web component input events', () => {
    const fixture = TestBed.createComponent(LoginComponent);
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

  it('should toggle password visibility and update the input type', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance as unknown as {
      passwordInputType(): string;
      passwordVisibilityIconName(): string;
      togglePasswordVisibility(): void;
    };

    expect(component.passwordInputType()).toBe('password');
    expect(component.passwordVisibilityIconName()).toBe('LuEye');

    component.togglePasswordVisibility();

    expect(component.passwordInputType()).toBe('text');
    expect(component.passwordVisibilityIconName()).toBe('LuEyeOff');
  });

  it('should react to the custom right icon click event from hans-input', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();

    const passwordInput = fixture.nativeElement.querySelectorAll(
      'hans-input',
    )[1] as HTMLElement;
    const component = fixture.componentInstance as unknown as {
      isPasswordVisible(): boolean;
    };

    expect(component.isPasswordVisible()).toBeFalse();

    passwordInput.dispatchEvent(
      new CustomEvent('righticonclick', {
        bubbles: true,
        composed: true,
      }),
    );

    fixture.detectChanges();

    expect(component.isPasswordVisible()).toBeTrue();
  });

  it('should authenticate and navigate to the protected admin route on success', async () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.resolveTo(true);
    const adminSessionService = TestBed.inject(
      AdminSessionService,
    ) as jasmine.SpyObj<AdminSessionService>;
    const component = fixture.componentInstance as unknown as {
      updateEmail(value: string): void;
      updatePassword(value: string): void;
      submit(): Promise<void>;
    };

    component.updateEmail('victor@example.com');
    component.updatePassword('ChangeMe!123');

    await component.submit();

    expect(adminSessionService.login).toHaveBeenCalledWith({
      email: 'victor@example.com',
      password: 'ChangeMe!123',
    });
    expect(router.navigateByUrl).toHaveBeenCalledWith('/admin');
  });

  it('should not navigate when the login attempt fails', async () => {
    const router = TestBed.inject(Router);
    const toastService = TestBed.inject(ToastService);
    const adminSessionService = TestBed.inject(
      AdminSessionService,
    ) as jasmine.SpyObj<AdminSessionService>;

    adminSessionService.login.and.resolveTo(false);
    (
      adminSessionService as unknown as {
        loginErrorKey: () => string;
      }
    ).loginErrorKey = () => 'pages.login.feedback.invalidCredentials';

    const fixture = TestBed.createComponent(LoginComponent);
    spyOn(router, 'navigateByUrl').and.resolveTo(true);
    spyOn(toastService, 'showError');
    const component = fixture.componentInstance as unknown as {
      updateEmail(value: string): void;
      updatePassword(value: string): void;
      submit(): Promise<void>;
    };

    component.updateEmail('victor@example.com');
    component.updatePassword('WrongPassword!123');

    await component.submit();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(toastService.showError).toHaveBeenCalledWith(
      'pages.login.feedback.invalidCredentials',
    );
  });

  it('should not submit when the form is incomplete', async () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const adminSessionService = TestBed.inject(
      AdminSessionService,
    ) as jasmine.SpyObj<AdminSessionService>;
    const component = fixture.componentInstance as unknown as {
      updateEmail(value: string): void;
      submit(): Promise<void>;
    };

    component.updateEmail('victor@example.com');

    await component.submit();

    expect(adminSessionService.login).not.toHaveBeenCalled();
  });

  it('should keep submit disabled while the login request is in progress', () => {
    const adminSessionService = TestBed.inject(AdminSessionService) as {
      isSubmittingLogin: () => boolean;
    };
    adminSessionService.isSubmittingLogin = () => true;

    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance as unknown as {
      updateEmail(value: string): void;
      updatePassword(value: string): void;
      canSubmit(): boolean;
    };

    component.updateEmail('victor@example.com');
    component.updatePassword('ChangeMe!123');

    expect(component.canSubmit()).toBeFalse();
  });

  it('should submit from the keyboard when the enter key is pressed', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance as unknown as {
      updateEmail(value: string): void;
      updatePassword(value: string): void;
      submitOnEnter(event: KeyboardEvent): void;
      submit: jasmine.Spy;
    };
    spyOn(component, 'submit').and.resolveTo();

    component.updateEmail('victor@example.com');
    component.updatePassword('ChangeMe!123');

    component.submitOnEnter(
      new KeyboardEvent('keydown', {
        key: 'Enter',
      }),
    );

    expect(component.submit).toHaveBeenCalled();
  });

  it('should submit from the native form event', async () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance as unknown as {
      submitFromForm(event: Event): Promise<void>;
      submit: jasmine.Spy;
    };
    const event = new Event('submit');
    spyOn(event, 'preventDefault');
    spyOn(component, 'submit').and.resolveTo();

    await component.submitFromForm(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.submit).toHaveBeenCalled();
  });

  it('should ignore non-enter keyboard events', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance as unknown as {
      submitOnEnter(event: KeyboardEvent): void;
      submit: jasmine.Spy;
    };
    spyOn(component, 'submit').and.resolveTo();

    component.submitOnEnter(
      new KeyboardEvent('keydown', {
        key: 'Escape',
      }),
    );

    expect(component.submit).not.toHaveBeenCalled();
  });
});
