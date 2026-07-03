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
import { HeaderComponent } from '../../layout/header/header.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { buildShellNavigationItems } from '../../layout/shell/helpers/shell-navigation.helper';
import { NAVIGATION_LABEL_KEY_BY_PATH } from '../../layout/shell/shell.types';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { TranslationService } from '../../core/translation/translation.service';
import { AdminSessionService } from '../../core/admin-session/admin-session.service';
import {
  LOGIN_FIELD_IDS,
  PASSWORD_VISIBILITY_ICON_BY_STATE,
} from './login.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslatePipe, HeaderComponent, FooterComponent, SectionHeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly adminSessionService = inject(AdminSessionService);
  private readonly router = inject(Router);
  private readonly translation = inject(TranslationService);
  private readonly emailSignal = signal('');
  private readonly passwordSignal = signal('');
  private readonly isPasswordVisibleSignal = signal(false);

  protected readonly fieldIds = LOGIN_FIELD_IDS;
  protected readonly email = this.emailSignal.asReadonly();
  protected readonly password = this.passwordSignal.asReadonly();
  protected readonly isPasswordVisible = this.isPasswordVisibleSignal.asReadonly();
  protected readonly isSubmitting = this.adminSessionService.isSubmittingLogin;
  protected readonly loginErrorKey = this.adminSessionService.loginErrorKey;
  protected readonly navigationItems = computed(() => {
    this.translation.locale();

    return buildShellNavigationItems(
      this.router.config,
      (key) => this.translation.instant(key),
      NAVIGATION_LABEL_KEY_BY_PATH,
    );
  });
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
