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
import { ProjectsService } from '../../../../core/api/projects/projects.service';
import { ProjectRecord } from '../../../../core/api/projects/projects.types';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { ExperiencesService } from '../../../../core/api/experiences/experiences.service';
import { LinksService } from '../../../../core/api/links/links.service';
import { ImageAssetsService } from '../../../../core/api/image-assets/image-assets.service';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { OperationsComponent } from '../../../../shared/operations/operations/operations.component';
import {
  AdminCollectionPagination,
  ADMIN_MODAL_PAGE_SIZE,
  createAdminCollectionPagination,
  createAdminEntityEndpointLabel,
} from '../../admin.types';
import { loadAllAdminCatalogItems } from '../../helpers/admin.helper';
import { ProjectsOperationsModalComponent } from './components/projects-operations-modal/projects-operations-modal.component';
import {
  ProjectsOperationsFormValue,
  ProjectsOperationsModalMode,
  ProjectOption,
  buildProjectsFormValue,
  buildProjectsMutationPayload,
  createEmptyProjectsOperationsFormValue,
} from './projects-operations.types';

@Component({
  selector: 'app-projects-operations',
  standalone: true,
  imports: [OperationsComponent, ProjectsOperationsModalComponent],
  templateUrl: './projects-operations.component.html',
  styleUrl: './projects-operations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsOperationsComponent implements OnInit {
  private readonly api = inject(ProjectsService);
  private readonly technologies = inject(TechnologiesService);
  private readonly experiences = inject(ExperiencesService);
  private readonly links = inject(LinksService);
  private readonly images = inject(ImageAssetsService);
  private readonly session = inject(AdminSessionService);
  private readonly toast = inject(ToastService);
  private readonly records = signal<readonly ProjectRecord[]>([]);
  private readonly pageSignal = signal<AdminCollectionPagination>(
    createAdminCollectionPagination(ADMIN_MODAL_PAGE_SIZE),
  );
  private readonly loading = signal(true);
  private readonly feedback = signal<AppTranslationKey | null>(null);
  private readonly error = signal<AppTranslationKey | null>(null);
  private readonly modeSignal = signal<ProjectsOperationsModalMode | null>(null);
  private readonly selected = signal<ProjectRecord | null>(null);
  private readonly formSignal = signal<ProjectsOperationsFormValue>(
    createEmptyProjectsOperationsFormValue(),
  );
  private readonly search = signal('');
  private readonly submitting = signal(false);
  protected readonly projects = this.records.asReadonly();
  protected readonly pagination = this.pageSignal.asReadonly();
  protected readonly isLoading = this.loading.asReadonly();
  protected readonly modalFeedbackKey = this.feedback.asReadonly();
  protected readonly loadErrorKey = this.error.asReadonly();
  protected readonly isSubmitting = this.submitting.asReadonly();
  protected readonly modalMode = this.modeSignal.asReadonly();
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly selectedProject = this.selected.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly searchQuery = this.search.asReadonly();
  protected readonly endpointLabel = createAdminEntityEndpointLabel('/projects');
  protected readonly hasProjects = computed(() => this.records().length > 0 && !this.error());
  protected readonly modalTitleKey = computed<AppTranslationKey>(() => {
    const mode = this.modalMode();
    const translationMode =
      mode === 'pick-update'
        ? 'pickUpdate'
        : mode === 'pick-delete'
          ? 'pickDelete'
          : (mode ?? 'create');

    return `pages.admin.projects.modal.${translationMode}.title` as AppTranslationKey;
  });
  protected readonly technologyOptions = signal<readonly ProjectOption[]>([]);
  protected readonly experienceOptions = signal<readonly ProjectOption[]>([]);
  protected readonly linkOptions = signal<readonly ProjectOption[]>([]);
  protected readonly imageAssetOptions = signal<readonly (ProjectOption & { imageUrl: string })[]>(
    [],
  );

  ngOnInit(): void {
    void this.loadWorkspace();
  }

  openCreateModal(): void {
    void this.refreshCatalogs();
    this.selected.set(null);
    this.formSignal.set(createEmptyProjectsOperationsFormValue());
    this.modeSignal.set('create');
  }

  openReadModal(): void {
    if (this.hasProjects()) {
      this.modeSignal.set('read');
      void this.loadWorkspace();
    }
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
    const item = this.records().find((x) => x.id === id);
    if (item) {
      this.selected.set(item);
      this.formSignal.set(buildProjectsFormValue(item));
      this.modeSignal.set('update');
    }
  }

  openDeleteModal(id: string): void {
    const item = this.records().find((x) => x.id === id);
    if (item) {
      this.selected.set(item);
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
    const valueTrimmed = value.trim();
    if (valueTrimmed !== this.search()) {
      this.search.set(valueTrimmed);
      await this.loadWorkspace(1, valueTrimmed);
    }
  }

  updateField(field: keyof ProjectsOperationsFormValue, value: string): void {
    if (Array.isArray(this.form()[field])) return;
    this.formSignal.update((form) => ({ ...form, [field]: value }));
  }

  updateBoolean(field: 'featured' | 'highlight', value: boolean): void {
    this.formSignal.update((form) => ({ ...form, [field]: value }));
  }

  toggle(
    field: 'technologyIds' | 'experienceIds' | 'linkIds' | 'imageAssetIds',
    id: string,
  ): void {
    this.formSignal.update((form) => ({
      ...form,
      [field]: form[field].includes(id)
        ? form[field].filter((x) => x !== id)
        : [...form[field], id],
    }));
  }

  async submitModal(): Promise<void> {
    if (!this.session.accessToken()) {
      this.feedback.set('common.feedback.missingAdminSessionShort');
      this.toast.showError('common.feedback.missingAdminSessionShort');
      return;
    }
    if (this.modalMode() === 'delete') {
      const item = this.selected();
      if (!item) return;
      this.submitting.set(true);
      try {
        await firstValueFrom(this.api.delete(item.id));
        this.toast.showSuccess('pages.admin.projects.feedback.deleted');
        this.closeModal();
        await this.loadWorkspace();
      } catch (error) {
        console.error('Failed to refresh project relation catalogs after deletion.', error);
        this.feedback.set('pages.admin.projects.feedback.deleteError');
        this.toast.showError('pages.admin.projects.feedback.deleteError');
      } finally {
        this.submitting.set(false);
      }
      return;
    }

    if (this.modalMode() !== 'create' && this.modalMode() !== 'update') return;
    const result = buildProjectsMutationPayload(this.form());

    if (!result.isValid) {
      this.feedback.set(result.errorKey);
      this.toast.showError(result.errorKey);
      return;
    }
    this.submitting.set(true);

    try {
      const item = this.selected();
      if (this.modalMode() === 'create') {
        await firstValueFrom(this.api.create(result.payload));
        this.toast.showSuccess('pages.admin.projects.feedback.created');
      } else if (item) {
        await firstValueFrom(this.api.update(item.id, result.payload));
        this.toast.showSuccess('pages.admin.projects.feedback.updated');
      }
      this.closeModal();
      await this.loadWorkspace();
    } catch (error) {
      console.error('Failed to save the protected project.', error);
      this.feedback.set('pages.admin.projects.feedback.saveError');
      this.toast.showError('pages.admin.projects.feedback.saveError');
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
      this.pageSignal.set(response.pagination);
      await this.refreshCatalogs();
    } catch (error) {
      console.error('Failed to load protected projects.', error);
      this.error.set('pages.admin.projects.feedback.loadError');
      this.toast.showError('pages.admin.projects.feedback.loadError');
    } finally {
      this.loading.set(false);
    }
  }

  private async refreshCatalogs(): Promise<void> {
    try {
      const [tech, experiences, links, images] = await Promise.all([
        loadAllAdminCatalogItems((page, pageSize) =>
          this.technologies.getTechnologies(page, pageSize),
        ),
        loadAllAdminCatalogItems((page, pageSize) =>
          this.experiences.getExperiences(page, pageSize),
        ),
        loadAllAdminCatalogItems((page, pageSize) => this.links.getAll(page, pageSize)),
        loadAllAdminCatalogItems((page, pageSize) => this.images.getAll(page, pageSize)),
      ]);
      this.technologyOptions.set(
        tech.map((x) => ({ id: x.id, title: x.name, subtitle: x.slug })),
      );
      this.experienceOptions.set(
        experiences.map((x) => ({ id: x.id, title: x.companyName, subtitle: x.slug })),
      );
      this.linkOptions.set(
        links.map((x) => ({
          id: x.id,
          title: x.labelPt ?? x.labelEn ?? x.url,
          subtitle: x.url,
        })),
      );
      this.imageAssetOptions.set(
        images.map((x) => ({
          id: x.id,
          title: x.fileName,
          subtitle: x.filePath,
          imageUrl: x.filePath,
        })),
      );
    } catch (error) {
      console.error('Failed to refresh project relation catalogs.', error);
    }
  }
}
