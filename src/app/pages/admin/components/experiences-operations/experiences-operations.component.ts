import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { ExperiencesOperationsService } from '../../../../core/api/admin/experiences/experiences-operations.service';
import { ExperienceRecord } from '../../../../core/api/admin/experiences/experiences-operations.types';
import { ImageAssetsOperationsService } from '../../../../core/api/admin/image-assets/image-assets-operations.service';
import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { JobsOperationsService } from '../../../../core/api/admin/jobs/jobs-operations.service';
import { JobRecord } from '../../../../core/api/admin/jobs/jobs-operations.types';
import { LinksOperationsService } from '../../../../core/api/admin/links/links-operations.service';
import { LinkRecord } from '../../../../core/api/admin/links/links-operations.types';
import { CustomersOperationsService } from '../../../../core/api/admin/customers/customers-operations.service';
import { CustomerRecord } from '../../../../core/api/admin/customers/customers-operations.types';
import { ProjectsService } from '../../../../core/api/projects/projects.service';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { ToastService } from '../../../../core/toast/toast.service';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { OperationsActionsComponent } from '../../../../shared/operations/operations-actions/operations-actions.component';
import {
  ADMIN_MODAL_PAGE_SIZE,
  AdminCollectionPagination,
  createAdminCollectionPagination,
  createAdminEntityEndpointLabel,
} from '../../admin.types';
import { ExperiencesOperationsModalComponent } from './components/experiences-operations-modal/experiences-operations-modal.component';
import {
  ExperienceOption,
  ExperiencesOperationsFormValue,
  ExperiencesOperationsModalMode,
  createEmptyExperiencesOperationsFormValue,
  buildExperiencesFormValue,
  buildExperiencesMutationPayload,
} from './experiences-operations.types';

@Component({
  selector: 'app-experiences-operations',
  standalone: true,
  imports: [TranslatePipe, OperationsActionsComponent, ExperiencesOperationsModalComponent],
  templateUrl: './experiences-operations.component.html',
  styleUrl: './experiences-operations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperiencesOperationsComponent implements OnInit {
  private readonly api = inject(ExperiencesOperationsService);
  private readonly technologies = inject(TechnologiesService);
  private readonly projects = inject(ProjectsService);
  private readonly customers = inject(CustomersOperationsService);
  private readonly jobs = inject(JobsOperationsService);
  private readonly links = inject(LinksOperationsService);
  private readonly images = inject(ImageAssetsOperationsService);
  private readonly session = inject(AdminSessionService);
  private readonly toast = inject(ToastService);
  private readonly records = signal<readonly ExperienceRecord[]>([]);
  private readonly paginationSignal = signal<AdminCollectionPagination>(
    createAdminCollectionPagination(ADMIN_MODAL_PAGE_SIZE),
  );
  private readonly loading = signal(true);
  private readonly error = signal<AppTranslationKey | null>(null);
  private readonly feedback = signal<AppTranslationKey | null>(null);
  private readonly modeSignal = signal<ExperiencesOperationsModalMode | null>(null);
  private readonly selected = signal<ExperienceRecord | null>(null);
  private readonly formSignal = signal<ExperiencesOperationsFormValue>(
    createEmptyExperiencesOperationsFormValue(),
  );
  private readonly search = signal('');
  private readonly submitting = signal(false);
  protected readonly modalMode = this.modeSignal.asReadonly();
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly experiences = this.records.asReadonly();
  protected readonly pagination = this.paginationSignal.asReadonly();
  protected readonly isLoading = this.loading.asReadonly();
  protected readonly loadErrorKey = this.error.asReadonly();
  protected readonly modalFeedbackKey = this.feedback.asReadonly();
  protected readonly isSubmitting = this.submitting.asReadonly();
  protected readonly selectedExperience = this.selected.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly searchQuery = this.search.asReadonly();
  protected readonly endpointLabel = createAdminEntityEndpointLabel('/experiences');
  protected readonly technologyOptions = signal<readonly ExperienceOption[]>([]);
  protected readonly projectOptions = signal<readonly ExperienceOption[]>([]);
  protected readonly customerOptions = signal<readonly ExperienceOption[]>([]);
  protected readonly jobOptions = signal<readonly ExperienceOption[]>([]);
  protected readonly linkOptions = signal<readonly ExperienceOption[]>([]);
  protected readonly imageAssetOptions = signal<
    readonly { id: string; title: string; subtitle: string; imageUrl: string }[]
  >([]);
  protected readonly hasExperiences = computed(() => this.records().length > 0 && !this.error());
  protected readonly modalTitleKey = computed<AppTranslationKey>(() => {
    const mode = this.modalMode();
    const translationMode =
      mode === 'pick-update' ? 'pickUpdate' : mode === 'pick-delete' ? 'pickDelete' : mode ?? 'create';

    return `pages.admin.experiences.modal.${translationMode}.title` as AppTranslationKey;
  });

  ngOnInit(): void {
    void this.loadWorkspace();
  }

  openCreateModal(): void {
    void this.refreshCatalogs();
    this.selected.set(null);
    this.formSignal.set(createEmptyExperiencesOperationsFormValue());
    this.modeSignal.set('create');
  }

  openReadModal(): void {
    if (this.hasExperiences()) this.modeSignal.set('read');
  }

  openUpdatePickerModal(): void {
    void this.refreshCatalogs();
    this.modeSignal.set('pick-update');
  }

  openDeletePickerModal(): void {
    void this.refreshCatalogs();
    this.modeSignal.set('pick-delete');
  }

  openUpdateModal(id: string): void {
    const record = this.records().find((item) => item.id === id);
    if (record) {
      this.selected.set(record);
      this.formSignal.set(buildExperiencesFormValue(record));
      this.modeSignal.set('update');
    }
  }

  openDeleteModal(id: string): void {
    const record = this.records().find((item) => item.id === id);
    if (record) {
      this.selected.set(record);
      this.modeSignal.set('delete');
    }
  }

  closeModal(): void {
    this.modeSignal.set(null);
    this.selected.set(null);
    this.feedback.set(null);
  }

  async goToPage(page: number): Promise<void> {
    if (
      page !== this.pagination().page &&
      page > 0 &&
      page <= Math.max(this.pagination().totalPages, 1)
    )
      await this.loadWorkspace(page, this.search());
  }

  async updateSearchQuery(value: string): Promise<void> {
    const normalized = value.trim();
    if (normalized !== this.search()) {
      this.search.set(normalized);
      await this.loadWorkspace(1, normalized);
    }
  }

  updateField(field: keyof ExperiencesOperationsFormValue, value: string): void {
    if (Array.isArray(this.form()[field])) return;
    this.formSignal.update((form) => ({ ...form, [field]: value }));
  }

  updateBoolean(field: 'isCurrent' | 'highlight', value: boolean): void {
    this.formSignal.update((form) => ({ ...form, [field]: value }));
  }

  toggle(
    field: 'technologyIds' | 'projectIds' | 'customerIds' | 'jobIds' | 'linkIds' | 'imageAssetIds',
    id: string,
  ): void {
    this.formSignal.update((form) => ({
      ...form,
      [field]: form[field].includes(id)
        ? form[field].filter((item) => item !== id)
        : [...form[field], id],
    }));
  }

  async submitModal(): Promise<void> {
    if (!this.session.accessToken()) {
      this.feedback.set('pages.admin.experiences.feedback.missingSession');
      return;
    }
    if (this.modalMode() === 'delete') {
      await this.submitDelete();
      return;
    }
    if (this.modalMode() !== 'create' && this.modalMode() !== 'update') return;
    const result = buildExperiencesMutationPayload(this.form());
    if (!result.isValid) {
      this.feedback.set(result.errorKey);
      return;
    }
    this.submitting.set(true);
    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(this.api.create(result.payload));
        this.toast.showSuccess('pages.admin.experiences.feedback.created');
      } else {
        const item = this.selected();
        if (!item) return;
        await firstValueFrom(this.api.update(item.id, result.payload));
        this.toast.showSuccess('pages.admin.experiences.feedback.updated');
      }
      this.closeModal();
      await this.loadWorkspace();
    } catch (error) {
      console.error('Failed to save the protected experience.', error);
      this.feedback.set('pages.admin.experiences.feedback.saveError');
    } finally {
      this.submitting.set(false);
    }
  }

  private async submitDelete(): Promise<void> {
    const item = this.selected();
    if (!item) return;
    this.submitting.set(true);
    try {
      await firstValueFrom(this.api.delete(item.id));
      this.toast.showSuccess('pages.admin.experiences.feedback.deleted');
      this.closeModal();
      await this.loadWorkspace();
    } catch (error) {
      console.error('Failed to delete the protected experience.', error);
      this.feedback.set('pages.admin.experiences.feedback.deleteError');
    } finally {
      this.submitting.set(false);
    }
  }

  private async loadWorkspace(
    page = this.pagination().page,
    search = this.search(),
  ): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await firstValueFrom(
        this.api.getAll(page, this.pagination().pageSize, search),
      );
      this.records.set(response.data);
      this.paginationSignal.set(response.pagination);
      await this.refreshCatalogs();
    } catch (error) {
      console.error('Failed to load protected experiences.', error);
      this.error.set('pages.admin.experiences.feedback.loadError');
      this.toast.showError('pages.admin.experiences.feedback.loadError');
    } finally {
      this.loading.set(false);
    }
  }

  private async refreshCatalogs(): Promise<void> {
    try {
      const [tech, projects, customers, jobs, links, images] = await Promise.all([
        firstValueFrom(this.technologies.getTechnologies()),
        firstValueFrom(this.projects.getProjects()),
        firstValueFrom(this.customers.getAll(1, 100)),
        firstValueFrom(this.jobs.getAll(1, 100)),
        firstValueFrom(this.links.getAll(1, 100)),
        firstValueFrom(this.images.getAll(1, 100)),
      ]);
      this.technologyOptions.set(
        tech.data.map((x: TechnologyCollectionItemResponse) => ({
          id: x.id,
          title: x.name,
          subtitle: x.slug,
        })),
      );
      this.projectOptions.set(
        projects.data.map((x: ProjectCollectionItemResponse) => ({
          id: x.id,
          title: x.titlePt,
          subtitle: x.slug,
        })),
      );
      this.customerOptions.set(
        customers.data.map((x: CustomerRecord) => ({ id: x.id, title: x.name, subtitle: x.slug })),
      );
      this.jobOptions.set(
        jobs.data.map((x: JobRecord) => ({ id: x.id, title: x.namePt, subtitle: x.slug })),
      );
      this.linkOptions.set(
        links.data.map((x: LinkRecord) => ({
          id: x.id,
          title: x.labelPt ?? x.labelEn ?? x.url,
          subtitle: x.url,
        })),
      );
      this.imageAssetOptions.set(
        images.data.map((x: ImageAssetRecord) => ({
          id: x.id,
          title: x.fileName,
          subtitle: x.filePath,
          imageUrl: x.filePath,
        })),
      );
    } catch (error) {
      console.error('Failed to refresh experience relation catalogs.', error);
    }
  }
}
