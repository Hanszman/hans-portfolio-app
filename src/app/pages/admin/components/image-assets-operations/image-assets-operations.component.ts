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
import {
  ImageAssetMutationPayload,
  ImageAssetRecord,
} from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ExperiencesService } from '../../../../core/api/experiences/experiences.service';
import { ExperienceCollectionItemResponse } from '../../../../core/api/experiences/experiences.types';
import { ProjectsService } from '../../../../core/api/projects/projects.service';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { ToastService } from '../../../../core/toast/toast.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { InfoStateComponent } from '../../../../shared/info-state/info-state.component';
import {
  ADMIN_MODAL_PAGE_SIZE,
  AdminCollectionPagination,
  createAdminCollectionPagination,
  createAdminEntityEndpointLabel,
} from '../../admin.types';
import { ImageAssetsOperationsModalComponent } from './components/image-assets-operations-modal/image-assets-operations-modal.component';
import {
  buildImageAssetCatalogOptions,
  buildImageAssetsFormValue,
  buildImageAssetsMutationPayload,
  buildImageAssetsViewModels,
} from './helpers/image-assets-operations.helper';
import {
  ImageAssetsOperationsFormValue,
  ImageAssetsOperationsModalMode,
  createEmptyImageAssetsOperationsFormValue,
  createImageAssetKindOptions,
} from './image-assets-operations.types';

@Component({
  selector: 'app-image-assets-operations',
  standalone: true,
  imports: [TranslatePipe, InfoStateComponent, ImageAssetsOperationsModalComponent],
  templateUrl: './image-assets-operations.component.html',
  styleUrl: './image-assets-operations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageAssetsOperationsComponent implements OnInit {
  private readonly imageAssetsOperationsService = inject(ImageAssetsOperationsService);
  private readonly projectsService = inject(ProjectsService);
  private readonly experiencesService = inject(ExperiencesService);
  private readonly technologiesService = inject(TechnologiesService);
  private readonly adminSessionService = inject(AdminSessionService);
  private readonly toastService = inject(ToastService);

  private readonly imageAssetsSignal = signal<readonly ImageAssetRecord[]>([]);
  private readonly projectsSignal = signal<readonly ProjectCollectionItemResponse[]>([]);
  private readonly experiencesSignal = signal<
    readonly ExperienceCollectionItemResponse[]
  >([]);
  private readonly technologiesSignal = signal<
    readonly TechnologyCollectionItemResponse[]
  >([]);
  private readonly paginationSignal = signal<AdminCollectionPagination>(
    createAdminCollectionPagination(ADMIN_MODAL_PAGE_SIZE),
  );
  private readonly isLoadingSignal = signal(true);
  private readonly isSubmittingSignal = signal(false);
  private readonly loadErrorKeySignal = signal<AppTranslationKey | null>(null);
  private readonly modalFeedbackKeySignal = signal<AppTranslationKey | null>(null);
  private readonly modalFeedbackToneSignal = signal<'success' | 'error' | null>(null);
  readonly modalModeSignal = signal<ImageAssetsOperationsModalMode | null>(null);
  private readonly selectedImageAssetSignal = signal<ImageAssetRecord | null>(null);
  private readonly searchQuerySignal = signal('');
  private readonly formSignal = signal<ImageAssetsOperationsFormValue>(
    createEmptyImageAssetsOperationsFormValue(),
  );

  protected readonly imageAssets = computed(() =>
    buildImageAssetsViewModels(
      this.imageAssetsSignal(),
      this.projectsSignal(),
      this.experiencesSignal(),
      this.technologiesSignal(),
    ),
  );
  protected readonly projectOptions = computed(() =>
    buildImageAssetCatalogOptions(this.projectsSignal()),
  );
  protected readonly experienceOptions = computed(() =>
    buildImageAssetCatalogOptions(this.experiencesSignal()),
  );
  protected readonly technologyOptions = computed(() =>
    buildImageAssetCatalogOptions(this.technologiesSignal()),
  );
  protected readonly imageAssetKindOptions = createImageAssetKindOptions();
  protected readonly isLoading = this.isLoadingSignal.asReadonly();
  protected readonly isSubmitting = this.isSubmittingSignal.asReadonly();
  protected readonly loadErrorKey = this.loadErrorKeySignal.asReadonly();
  protected readonly modalFeedbackKey = this.modalFeedbackKeySignal.asReadonly();
  protected readonly modalFeedbackTone = this.modalFeedbackToneSignal.asReadonly();
  protected readonly modalMode = this.modalModeSignal.asReadonly();
  protected readonly endpointLabel = createAdminEntityEndpointLabel('/image-assets');
  protected readonly selectedImageAsset = this.selectedImageAssetSignal.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly pagination = this.paginationSignal.asReadonly();
  protected readonly searchQuery = this.searchQuerySignal.asReadonly();
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly hasImageAssets = computed(
    () => this.pagination().totalItems > 0 && this.imageAssets().length > 0,
  );
  protected readonly modalTitleKey = computed<AppTranslationKey>(() => {
    switch (this.modalMode()) {
      case 'create':
        return 'pages.admin.imageAssets.modal.create.title';
      case 'read':
        return 'pages.admin.imageAssets.modal.read.title';
      case 'pick-update':
        return 'pages.admin.imageAssets.modal.pickUpdate.title';
      case 'pick-delete':
        return 'pages.admin.imageAssets.modal.pickDelete.title';
      case 'update':
        return 'pages.admin.imageAssets.modal.update.title';
      case 'delete':
        return 'pages.admin.imageAssets.modal.delete.title';
      default:
        return 'pages.admin.imageAssets.modal.create.title';
    }
  });

  ngOnInit(): void {
    void this.loadWorkspace();
  }

  openCreateModal(): void {
    this.selectedImageAssetSignal.set(null);
    this.formSignal.set(createEmptyImageAssetsOperationsFormValue());
    this.clearModalFeedback();
    this.modalModeSignal.set('create');
  }

  openReadModal(): void {
    if (!this.hasImageAssets()) {
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

  openUpdateModal(imageAssetId: string): void {
    const imageAsset = this.imageAssetsSignal().find((item) => item.id === imageAssetId);

    if (!imageAsset) {
      return;
    }

    this.selectedImageAssetSignal.set(imageAsset);
    this.formSignal.set(
      buildImageAssetsFormValue(
        imageAsset,
        this.projectsSignal(),
        this.experiencesSignal(),
        this.technologiesSignal(),
      ),
    );
    this.clearModalFeedback();
    this.modalModeSignal.set('update');
  }

  openDeleteModal(imageAssetId: string): void {
    const imageAsset = this.imageAssetsSignal().find((item) => item.id === imageAssetId);

    if (!imageAsset) {
      return;
    }

    this.selectedImageAssetSignal.set(imageAsset);
    this.clearModalFeedback();
    this.modalModeSignal.set('delete');
  }

  closeModal(): void {
    this.modalModeSignal.set(null);
    this.selectedImageAssetSignal.set(null);
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

  updateFileName(value: string): void {
    this.patchForm({ fileName: value });
  }

  updateFilePath(value: string): void {
    this.patchForm({ filePath: value });
  }

  updateFolder(value: string): void {
    this.patchForm({ folder: value });
  }

  updateKind(value: string): void {
    this.patchForm({ kind: value });
  }

  updateAltPt(value: string): void {
    this.patchForm({ altPt: value });
  }

  updateAltEn(value: string): void {
    this.patchForm({ altEn: value });
  }

  updateCaptionPt(value: string): void {
    this.patchForm({ captionPt: value });
  }

  updateCaptionEn(value: string): void {
    this.patchForm({ captionEn: value });
  }

  updateMimeType(value: string): void {
    this.patchForm({ mimeType: value });
  }

  updateWidth(value: string): void {
    this.patchForm({ width: value });
  }

  updateHeight(value: string): void {
    this.patchForm({ height: value });
  }

  updateSortOrder(value: string): void {
    this.patchForm({ sortOrder: value });
  }

  toggleProject(projectId: string): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      projectIds: this.toggleSelection(formValue.projectIds, projectId),
    }));
  }

  toggleExperience(experienceId: string): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      experienceIds: this.toggleSelection(formValue.experienceIds, experienceId),
    }));
  }

  toggleTechnology(technologyId: string): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      technologyIds: this.toggleSelection(formValue.technologyIds, technologyId),
    }));
  }

  async submitModal(): Promise<void> {
    const accessToken = this.adminSessionService.accessToken();

    if (!accessToken) {
      this.setModalErrorFeedback('pages.admin.imageAssets.feedback.missingSession');
      return;
    }

    switch (this.modalMode()) {
      case 'create':
      case 'update': {
        const buildResult = buildImageAssetsMutationPayload(this.form());

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
      const [
        imageAssetsResponse,
        projectsResponse,
        experiencesResponse,
        technologiesResponse,
      ] = await Promise.all([
        firstValueFrom(
          this.imageAssetsOperationsService.getAll(page, this.pagination().pageSize, search),
        ),
        firstValueFrom(this.projectsService.getProjects()),
        firstValueFrom(this.experiencesService.getExperiences()),
        firstValueFrom(this.technologiesService.getTechnologies()),
      ]);

      this.imageAssetsSignal.set(imageAssetsResponse.data);
      this.paginationSignal.set(imageAssetsResponse.pagination);
      this.projectsSignal.set(projectsResponse.data);
      this.experiencesSignal.set(experiencesResponse.data);
      this.technologiesSignal.set(technologiesResponse.data);
    } catch {
      this.loadErrorKeySignal.set('pages.admin.imageAssets.feedback.loadError');
      this.toastService.showError('pages.admin.imageAssets.feedback.loadError');
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  private async submitUpsert(
    payload: ImageAssetMutationPayload,
  ): Promise<void> {
    this.isSubmittingSignal.set(true);

    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(this.imageAssetsOperationsService.create(payload));
        this.toastService.showSuccess('pages.admin.imageAssets.feedback.created');
      } else {
        const selectedImageAsset = this.selectedImageAsset();

        if (!selectedImageAsset) {
          this.setModalErrorFeedback(
            'pages.admin.imageAssets.feedback.selectionRequired',
          );
          return;
        }

        await firstValueFrom(
          this.imageAssetsOperationsService.update(selectedImageAsset.id, payload),
        );
        this.toastService.showSuccess('pages.admin.imageAssets.feedback.updated');
      }

      this.closeModal();
      await this.loadWorkspace(this.pagination().page, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.imageAssets.feedback.saveError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private async submitDelete(): Promise<void> {
    const selectedImageAsset = this.selectedImageAsset();

    if (!selectedImageAsset) {
      this.setModalErrorFeedback('pages.admin.imageAssets.feedback.selectionRequired');
      return;
    }

    this.isSubmittingSignal.set(true);

    try {
      await firstValueFrom(
        this.imageAssetsOperationsService.delete(selectedImageAsset.id),
      );

      const nextPage =
        this.imageAssets().length === 1 && this.pagination().page > 1
          ? this.pagination().page - 1
          : this.pagination().page;

      this.closeModal();
      this.toastService.showSuccess('pages.admin.imageAssets.feedback.deleted');
      await this.loadWorkspace(nextPage, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.imageAssets.feedback.deleteError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private patchForm(patch: Partial<ImageAssetsOperationsFormValue>): void {
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
