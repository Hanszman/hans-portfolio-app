import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { ImageAssetsOperationsService } from '../../../../core/api/admin/image-assets/image-assets-operations.service';
import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { JobsOperationsService } from '../../../../core/api/admin/jobs/jobs-operations.service';
import {
  JobMutationPayload,
  JobRecord,
} from '../../../../core/api/admin/jobs/jobs-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ExperiencesService } from '../../../../core/api/experiences/experiences.service';
import { ExperienceCollectionItemResponse } from '../../../../core/api/experiences/experiences.types';
import { ToastService } from '../../../../core/toast/toast.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { InfoStateComponent } from '../../../../shared/info-state/info-state.component';
import {
  ADMIN_MODAL_PAGE_SIZE,
  AdminCollectionPagination,
  createAdminCollectionPagination,
  createAdminEntityEndpointLabel,
} from '../../admin.types';
import { JobsOperationsModalComponent } from './components/jobs-operations-modal/jobs-operations-modal.component';
import {
  buildJobExperienceOptions,
  buildJobImageAssetOptions,
  buildJobsFormValue,
  buildJobsMutationPayload,
  buildJobsViewModels,
} from './helpers/jobs-operations.helper';
import {
  JobsOperationsFormValue,
  JobsOperationsModalMode,
  createEmptyJobsOperationsFormValue,
} from './jobs-operations.types';

@Component({
  selector: 'app-jobs-operations',
  standalone: true,
  imports: [TranslatePipe, InfoStateComponent, JobsOperationsModalComponent],
  templateUrl: './jobs-operations.component.html',
  styleUrl: './jobs-operations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsOperationsComponent implements OnInit {
  private readonly jobsOperationsService = inject(JobsOperationsService);
  private readonly experiencesService = inject(ExperiencesService);
  private readonly imageAssetsOperationsService = inject(ImageAssetsOperationsService);
  private readonly adminSessionService = inject(AdminSessionService);
  private readonly toastService = inject(ToastService);

  private readonly jobsSignal = signal<readonly JobRecord[]>([]);
  private readonly experiencesSignal = signal<readonly ExperienceCollectionItemResponse[]>([]);
  private readonly imageAssetsSignal = signal<readonly ImageAssetRecord[]>([]);
  private readonly paginationSignal = signal<AdminCollectionPagination>(
    createAdminCollectionPagination(ADMIN_MODAL_PAGE_SIZE),
  );
  private readonly isLoadingSignal = signal(true);
  private readonly isSubmittingSignal = signal(false);
  private readonly loadErrorKeySignal = signal<AppTranslationKey | null>(null);
  private readonly modalFeedbackKeySignal = signal<AppTranslationKey | null>(null);
  private readonly modalFeedbackToneSignal = signal<'success' | 'error' | null>(null);
  readonly modalModeSignal = signal<JobsOperationsModalMode | null>(null);
  private readonly selectedJobSignal = signal<JobRecord | null>(null);
  private readonly searchQuerySignal = signal('');
  private readonly formSignal = signal<JobsOperationsFormValue>(
    createEmptyJobsOperationsFormValue(),
  );

  protected readonly jobs = computed(() =>
    buildJobsViewModels(this.jobsSignal(), this.experiencesSignal(), this.imageAssetsSignal()),
  );
  protected readonly experienceOptions = computed(() =>
    buildJobExperienceOptions(this.experiencesSignal()),
  );
  protected readonly imageAssetOptions = computed(() =>
    buildJobImageAssetOptions(this.imageAssetsSignal()),
  );
  protected readonly isLoading = this.isLoadingSignal.asReadonly();
  protected readonly isSubmitting = this.isSubmittingSignal.asReadonly();
  protected readonly loadErrorKey = this.loadErrorKeySignal.asReadonly();
  protected readonly modalFeedbackKey = this.modalFeedbackKeySignal.asReadonly();
  protected readonly modalFeedbackTone = this.modalFeedbackToneSignal.asReadonly();
  protected readonly modalMode = this.modalModeSignal.asReadonly();
  protected readonly endpointLabel = createAdminEntityEndpointLabel('/jobs');
  protected readonly selectedJob = this.selectedJobSignal.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly pagination = this.paginationSignal.asReadonly();
  protected readonly searchQuery = this.searchQuerySignal.asReadonly();
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly hasJobs = computed(
    () => this.pagination().totalItems > 0 && this.jobs().length > 0,
  );
  protected readonly modalTitleKey = computed<AppTranslationKey>(() => {
    switch (this.modalMode()) {
      case 'create':
        return 'pages.admin.jobs.modal.create.title';
      case 'read':
        return 'pages.admin.jobs.modal.read.title';
      case 'pick-update':
        return 'pages.admin.jobs.modal.pickUpdate.title';
      case 'pick-delete':
        return 'pages.admin.jobs.modal.pickDelete.title';
      case 'update':
        return 'pages.admin.jobs.modal.update.title';
      case 'delete':
        return 'pages.admin.jobs.modal.delete.title';
      default:
        return 'pages.admin.jobs.modal.create.title';
    }
  });

  ngOnInit(): void {
    void this.loadWorkspace();
  }

  openCreateModal(): void {
    this.selectedJobSignal.set(null);
    this.formSignal.set(createEmptyJobsOperationsFormValue());
    this.clearModalFeedback();
    this.modalModeSignal.set('create');
  }

  openReadModal(): void {
    if (!this.hasJobs()) {
      return;
    }

    this.clearModalFeedback();
    this.modalModeSignal.set('read');
  }

  openUpdatePickerModal(): void {
    this.clearModalFeedback();
    this.modalModeSignal.set('pick-update');
  }

  openDeletePickerModal(): void {
    this.clearModalFeedback();
    this.modalModeSignal.set('pick-delete');
  }

  openUpdateModal(jobId: string): void {
    const job = this.jobsSignal().find((item) => item.id === jobId);

    if (!job) {
      return;
    }

    this.selectedJobSignal.set(job);
    this.formSignal.set(
      buildJobsFormValue(job, this.experiencesSignal(), this.imageAssetsSignal()),
    );
    this.clearModalFeedback();
    this.modalModeSignal.set('update');
  }

  openDeleteModal(jobId: string): void {
    const job = this.jobsSignal().find((item) => item.id === jobId);

    if (!job) {
      return;
    }

    this.selectedJobSignal.set(job);
    this.clearModalFeedback();
    this.modalModeSignal.set('delete');
  }

  closeModal(): void {
    this.modalModeSignal.set(null);
    this.selectedJobSignal.set(null);
    this.clearModalFeedback();
  }

  async goToPage(page: number): Promise<void> {
    if (
      page === this.pagination().page ||
      page < 1 ||
      page > Math.max(this.pagination().totalPages, 1)
    ) {
      return;
    }

    await this.loadWorkspace(page, this.searchQuery());
  }

  async updateSearchQuery(value: string): Promise<void> {
    const normalizedValue = value.trim();

    if (normalizedValue === this.searchQuery()) {
      return;
    }

    this.searchQuerySignal.set(normalizedValue);
    await this.loadWorkspace(1, normalizedValue);
  }

  updateSlug(value: string): void {
    this.patchForm({ slug: value });
  }

  updateNamePt(value: string): void {
    this.patchForm({ namePt: value });
  }

  updateNameEn(value: string): void {
    this.patchForm({ nameEn: value });
  }

  updateSummaryPt(value: string): void {
    this.patchForm({ summaryPt: value });
  }

  updateSummaryEn(value: string): void {
    this.patchForm({ summaryEn: value });
  }

  updateHighlight(value: boolean): void {
    this.patchForm({ highlight: value });
  }

  updateSortOrder(value: string): void {
    this.patchForm({ sortOrder: value });
  }

  toggleExperience(experienceId: string): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      experienceIds: this.toggleSelection(formValue.experienceIds, experienceId),
    }));
  }

  toggleImageAsset(imageAssetId: string): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      imageAssetIds: this.toggleSelection(formValue.imageAssetIds, imageAssetId),
    }));
  }

  async submitModal(): Promise<void> {
    const accessToken = this.adminSessionService.accessToken();

    if (!accessToken) {
      this.setModalErrorFeedback('pages.admin.jobs.feedback.missingSession');
      return;
    }

    switch (this.modalMode()) {
      case 'create':
      case 'update': {
        const buildResult = buildJobsMutationPayload(this.form());

        if (!buildResult.isValid) {
          this.setModalErrorFeedback(buildResult.errorKey);
          return;
        }

        await this.submitUpsert(buildResult.payload);
        return;
      }
      case 'delete':
        await this.submitDelete();
        return;
      default:
        return;
    }
  }

  protected trackById(index: number, item: { id: string }): string {
    return item.id;
  }

  private async loadWorkspace(
    page = this.pagination().page,
    search = this.searchQuery(),
  ): Promise<void> {
    this.isLoadingSignal.set(true);
    this.loadErrorKeySignal.set(null);

    try {
      const [jobsResponse, experiencesResponse, imageAssetsResponse] = await Promise.all([
        firstValueFrom(this.jobsOperationsService.getAll(page, this.pagination().pageSize, search)),
        firstValueFrom(this.experiencesService.getExperiences()),
        firstValueFrom(this.imageAssetsOperationsService.getAll(1, 100)),
      ]);

      this.jobsSignal.set(jobsResponse.data);
      this.paginationSignal.set(jobsResponse.pagination);
      this.experiencesSignal.set(experiencesResponse.data);
      this.imageAssetsSignal.set(imageAssetsResponse.data);
    } catch {
      this.loadErrorKeySignal.set('pages.admin.jobs.feedback.loadError');
      this.toastService.showError('pages.admin.jobs.feedback.loadError');
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  private async submitUpsert(payload: JobMutationPayload): Promise<void> {
    this.isSubmittingSignal.set(true);

    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(this.jobsOperationsService.create(payload));
        this.toastService.showSuccess('pages.admin.jobs.feedback.created');
      } else {
        const selectedJob = this.selectedJob();

        if (!selectedJob) {
          this.setModalErrorFeedback('pages.admin.jobs.feedback.selectionRequired');
          return;
        }

        await firstValueFrom(this.jobsOperationsService.update(selectedJob.id, payload));
        this.toastService.showSuccess('pages.admin.jobs.feedback.updated');
      }

      this.closeModal();
      await this.loadWorkspace(this.pagination().page, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.jobs.feedback.saveError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private async submitDelete(): Promise<void> {
    const selectedJob = this.selectedJob();

    if (!selectedJob) {
      this.setModalErrorFeedback('pages.admin.jobs.feedback.selectionRequired');
      return;
    }

    this.isSubmittingSignal.set(true);

    try {
      await firstValueFrom(this.jobsOperationsService.delete(selectedJob.id));

      const nextPage =
        this.jobs().length === 1 && this.pagination().page > 1
          ? this.pagination().page - 1
          : this.pagination().page;

      this.closeModal();
      this.toastService.showSuccess('pages.admin.jobs.feedback.deleted');
      await this.loadWorkspace(nextPage, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.jobs.feedback.deleteError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private patchForm(patch: Partial<JobsOperationsFormValue>): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      ...patch,
    }));
  }

  private toggleSelection(
    selectedIds: readonly string[],
    targetId: string,
  ): readonly string[] {
    return selectedIds.includes(targetId)
      ? selectedIds.filter((selectedId) => selectedId !== targetId)
      : [...selectedIds, targetId];
  }

  private clearModalFeedback(): void {
    this.modalFeedbackKeySignal.set(null);
    this.modalFeedbackToneSignal.set(null);
  }

  private setModalErrorFeedback(feedbackKey: AppTranslationKey): void {
    this.modalFeedbackKeySignal.set(feedbackKey);
    this.modalFeedbackToneSignal.set('error');
    this.toastService.showError(feedbackKey);
  }
}
