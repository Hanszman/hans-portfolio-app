import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AdminSessionService } from '../../core/admin-session/admin-session.service';
import { TranslationService } from '../../core/translation/translation.service';
import { FooterComponent } from '../../layout/footer/footer.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { buildShellNavigationItems } from '../../layout/shell/helpers/shell-navigation.helper';
import { NAVIGATION_LABEL_KEY_BY_PATH } from '../../layout/shell/shell.types';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { PortfolioSettingsComponent } from './components/portfolio-settings/portfolio-settings.component';
import { TagsComponent } from './components/tags/tags.component';
import {
  ADMIN_ENTITY_DEFINITIONS,
  ADMIN_ENTITY_OPERATIONS,
  ADMIN_SESSION_FACT_DEFINITIONS,
} from './admin.types';
import {
  buildAdminEntityViewModels,
  buildAdminSessionFactViewModels,
  formatAdminIdentity,
} from './helpers/admin.helper';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    SectionHeaderComponent,
    PortfolioSettingsComponent,
    TagsComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  private readonly adminSessionService = inject(AdminSessionService);
  private readonly router = inject(Router);
  private readonly translation = inject(TranslationService);

  protected readonly adminUser = this.adminSessionService.user;
  protected readonly navigationItems = computed(() => {
    this.translation.locale();

    return buildShellNavigationItems(
      this.router.config,
      (key) => this.translation.instant(key),
      NAVIGATION_LABEL_KEY_BY_PATH,
    );
  });
  protected readonly adminIdentity = computed(() =>
    formatAdminIdentity(this.adminUser()),
  );
  protected readonly adminEntities = computed(() => {
    this.translation.locale();

    return buildAdminEntityViewModels(
      ADMIN_ENTITY_DEFINITIONS,
      (key) => this.translation.instant(key),
      ADMIN_ENTITY_OPERATIONS,
    );
  });
  protected readonly secondaryAdminEntities = computed(() =>
    this.adminEntities().filter((entity) => !this.isWorkspaceEntity(entity.id)),
  );
  protected readonly adminFacts = computed(() => {
    this.translation.locale();

    return buildAdminSessionFactViewModels(
      ADMIN_SESSION_FACT_DEFINITIONS,
      (key) => this.translation.instant(key),
    );
  });
  protected readonly adminEntityCount = computed(() => this.adminEntities().length);
  protected readonly adminUserEmail = computed(() => this.adminUser()?.email ?? '');

  protected isWorkspaceEntity(entityId: string): boolean {
    return entityId === 'portfolio-settings' || entityId === 'tags';
  }

  protected async logout(): Promise<void> {
    this.adminSessionService.logout();
    await this.router.navigateByUrl('/login');
  }
}
