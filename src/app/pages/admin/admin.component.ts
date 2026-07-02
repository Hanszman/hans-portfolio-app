import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AdminAuthService } from '../../core/auth-admin/auth-admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  private readonly adminAuthService = inject(AdminAuthService);
  private readonly router = inject(Router);

  protected readonly adminUser = this.adminAuthService.user;
  protected readonly adminIdentity = computed(() => {
    const currentUser = this.adminUser();

    return currentUser ? `${currentUser.name} · ${currentUser.role}` : '';
  });

  protected async logout(): Promise<void> {
    this.adminAuthService.logout();
    await this.router.navigateByUrl('/admin/login');
  }
}
