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
import { AdminAuthService } from '../../core/auth-admin/auth-admin.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginComponent {
  private readonly adminAuthService = inject(AdminAuthService);
  private readonly router = inject(Router);
  private readonly emailSignal = signal('');
  private readonly passwordSignal = signal('');

  protected readonly email = this.emailSignal.asReadonly();
  protected readonly password = this.passwordSignal.asReadonly();
  protected readonly isSubmitting = this.adminAuthService.isSubmittingLogin;
  protected readonly loginErrorKey = this.adminAuthService.loginErrorKey;
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

  protected async submit(): Promise<void> {
    if (!this.canSubmit()) {
      return;
    }

    const success = await this.adminAuthService.login({
      email: this.email().trim(),
      password: this.password(),
    });

    if (success) {
      await this.router.navigateByUrl('/admin');
    }
  }

  protected async submitFromForm(event: Event): Promise<void> {
    event.preventDefault();
    await this.submit();
  }
}
