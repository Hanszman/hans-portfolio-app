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
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { CustomersOperationsComponent } from './components/customers-operations/customers-operations.component';
import { FormationsOperationsComponent } from './components/formations-operations/formations-operations.component';
import { TechnologiesOperationsComponent } from './components/technologies-operations/technologies-operations.component';
import { TechnologyContextsOperationsComponent } from './components/technology-contexts-operations/technology-contexts-operations.component';
import { ExperiencesOperationsComponent } from './components/experiences-operations/experiences-operations.component';
import { ProjectsOperationsComponent } from './components/projects-operations/projects-operations.component';
import { ImageAssetsOperationsComponent } from './components/image-assets-operations/image-assets-operations.component';
import { JobsOperationsComponent } from './components/jobs-operations/jobs-operations.component';
import { LinksOperationsComponent } from './components/links-operations/links-operations.component';
import { SpokenLanguagesOperationsComponent } from './components/spoken-languages-operations/spoken-languages-operations.component';
import { formatAdminIdentity } from './helpers/admin.helper';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    TranslatePipe,
    SectionHeaderComponent,
    LinksOperationsComponent,
    ImageAssetsOperationsComponent,
    SpokenLanguagesOperationsComponent,
    CustomersOperationsComponent,
    JobsOperationsComponent,
    FormationsOperationsComponent,
    TechnologiesOperationsComponent,
    TechnologyContextsOperationsComponent,
    ExperiencesOperationsComponent,
    ProjectsOperationsComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  private readonly adminSessionService = inject(AdminSessionService);
  private readonly router = inject(Router);

  protected readonly adminUser = this.adminSessionService.user;
  protected readonly adminIdentity = computed(() => formatAdminIdentity(this.adminUser()));
  protected readonly adminUserEmail = computed(() => this.adminUser()?.email ?? '');

  protected async logout(): Promise<void> {
    this.adminSessionService.logout();
    await this.router.navigateByUrl('/login');
  }
}
