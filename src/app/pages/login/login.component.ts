import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { AdminSessionService } from '../../core/admin-session/admin-session.service';
import { ToastService } from '../../core/toast/toast.service';
import {
  LOGIN_FIELD_IDS,
  PASSWORD_VISIBILITY_ICON_BY_STATE,
} from './login.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslatePipe, SectionHeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly adminSessionService = inject(AdminSessionService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly emailSignal = signal('');
  private readonly passwordSignal = signal('');
  private readonly isPasswordVisibleSignal = signal(false);

  protected readonly fieldIds = LOGIN_FIELD_IDS;
  protected readonly email = this.emailSignal.asReadonly();
  protected readonly password = this.passwordSignal.asReadonly();
  protected readonly isPasswordVisible = this.isPasswordVisibleSignal.asReadonly();
  protected readonly isSubmitting = this.adminSessionService.isSubmittingLogin;
  protected readonly loginErrorKey = this.adminSessionService.loginErrorKey;
  protected readonly passwordInputType = computed(() =>
    this.isPasswordVisibleSignal() ? 'text' : 'password',
  );
  protected readonly passwordVisibilityIconName = computed(() =>
    this.isPasswordVisible()
      ? PASSWORD_VISIBILITY_ICON_BY_STATE.visible
      : PASSWORD_VISIBILITY_ICON_BY_STATE.hidden,
  );
  protected readonly canSubmit = computed(
    () =>
      this.email().trim().length > 0 &&
      this.password().trim().length > 0 &&
      !this.isSubmitting(),
  );

  protected updateEmail(value: string): void {
    this.emailSignal.set(value);
  }

  protected updatePassword(value: string): void {
    this.passwordSignal.set(value);
  }

  protected togglePasswordVisibility(): void {
    this.isPasswordVisibleSignal.update((isVisible) => !isVisible);
  }

  protected async submit(): Promise<void> {
    if (!this.canSubmit()) {
      return;
    }

    const success = await this.adminSessionService.login({
      email: this.email().trim(),
      password: this.password(),
    });

    if (success) {
      await this.router.navigateByUrl('/admin');
      return;
    }

    if (this.loginErrorKey()) {
      this.toastService.showError(this.loginErrorKey()!);
    }
  }

  protected async submitFromForm(event: Event): Promise<void> {
    event.preventDefault();
    await this.submit();
  }

  protected submitOnEnter(event: KeyboardEvent): void {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    void this.submit();
  }
}
