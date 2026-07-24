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
import { TagsOperationsService } from '../../../../core/api/admin/tags/tags-operations.service';
import {
  TagMutationPayload,
  TagRecord,
} from '../../../../core/api/admin/tags/tags-operations.types';
import { ProjectsService } from '../../../../core/api/projects/projects.service';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { TranslationService } from '../../../../core/translation/translation.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { InfoStateComponent } from '../../../../shared/info-state/info-state.component';
import { OperationsActionsComponent } from '../../../../shared/operations/operations-actions/operations-actions.component';
import {
  ADMIN_MODAL_PAGE_SIZE,
  AdminCollectionPagination,
  createAdminEntityEndpointLabel,
  createAdminCollectionPagination,
} from '../../admin.types';
import { TagsOperationsModalComponent } from './components/tags-operations-modal/tags-operations-modal.component';
import {
  buildTagCatalogOptions,
  buildTagsFormValue,
  buildTagsMutationPayload,
  buildTagsViewModels,
} from './helpers/tags-operations.helper';
import {
  TagTypeValue,
  TagsOperationsFormValue,
  TagsOperationsModalMode,
  createEmptyTagsOperationsFormValue,
  createTagTypeOptions,
} from './tags-operations.types';
import { translateAdminSelectOptions } from '../../helpers/admin.helper';

@Component({
  selector: 'app-tags-operations',
  standalone: true,
  imports: [
    TranslatePipe,
    InfoStateComponent,
    OperationsActionsComponent,
    TagsOperationsModalComponent,
  ],
  templateUrl: './tags-operations.component.html',
  styleUrl: './tags-operations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsOperationsComponent implements OnInit {
  private readonly tagsOperationsService = inject(TagsOperationsService);
  private readonly projectsService = inject(ProjectsService);
  private readonly technologiesService = inject(TechnologiesService);
  private readonly adminSessionService = inject(AdminSessionService);
  private readonly toastService = inject(ToastService);
  private readonly translation = inject(TranslationService);

  private readonly tagsSignal = signal<readonly TagRecord[]>([]);
  private readonly projectsSignal = signal<readonly ProjectCollectionItemResponse[]>([]);
  private readonly technologiesSignal = signal<
    readonly TechnologyCollectionItemResponse[]
  >([]);
  private readonly paginationSignal = signal<AdminCollectionPagination>(
    createAdminCollectionPagination(ADMIN_MODAL_PAGE_SIZE),
  );
  private readonly isLoadingSignal = signal(true);
  private readonly isSubmittingSignal = signal(false);
  private readonly loadErrorKeySignal = signal<AppTranslationKey | null>(null);
  private readonly feedbackKeySignal = signal<AppTranslationKey | null>(null);
  private readonly feedbackToneSignal = signal<'success' | 'error' | null>(null);
  private readonly modalFeedbackKeySignal = signal<AppTranslationKey | null>(null);
  private readonly modalFeedbackToneSignal = signal<'success' | 'error' | null>(null);
  private readonly modalModeSignal = signal<TagsOperationsModalMode | null>(null);
  private readonly selectedTagSignal = signal<TagRecord | null>(null);
  private readonly searchQuerySignal = signal('');
  private readonly formSignal = signal<TagsOperationsFormValue>(
    createEmptyTagsOperationsFormValue(),
  );

  protected readonly tags = computed(() =>
    buildTagsViewModels(
      this.tagsSignal(),
      this.projectsSignal(),
      this.technologiesSignal(),
    ),
  );
  protected readonly projectOptions = computed(() =>
    buildTagCatalogOptions(this.projectsSignal()),
  );
  protected readonly technologyOptions = computed(() =>
    buildTagCatalogOptions(this.technologiesSignal()),
  );
  protected readonly tagTypeOptions = computed(() => {
    this.translation.locale();

    return translateAdminSelectOptions(
      createTagTypeOptions(),
      this.translation.instant.bind(this.translation),
    );
  });
  protected readonly isLoading = this.isLoadingSignal.asReadonly();
  protected readonly isSubmitting = this.isSubmittingSignal.asReadonly();
  protected readonly loadErrorKey = this.loadErrorKeySignal.asReadonly();
  protected readonly feedbackKey = this.feedbackKeySignal.asReadonly();
  protected readonly feedbackTone = this.feedbackToneSignal.asReadonly();
  protected readonly modalFeedbackKey = this.modalFeedbackKeySignal.asReadonly();
  protected readonly modalFeedbackTone = this.modalFeedbackToneSignal.asReadonly();
  protected readonly modalMode = this.modalModeSignal.asReadonly();
  protected readonly endpointLabel = createAdminEntityEndpointLabel('/tags');
  protected readonly selectedTag = this.selectedTagSignal.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly pagination = this.paginationSignal.asReadonly();
  protected readonly searchQuery = this.searchQuerySignal.asReadonly();
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly hasTags = computed(
    () => this.pagination().totalItems > 0 && this.tags().length > 0,
  );
  protected readonly modalTitleKey = computed<AppTranslationKey>(() => {
    switch (this.modalMode()) {
      case 'create':
        return 'pages.admin.tags.modal.create.title';
      case 'read':
        return 'pages.admin.tags.modal.read.title';
      case 'pick-update':
        return 'pages.admin.tags.modal.pickUpdate.title';
      case 'pick-delete':
        return 'pages.admin.tags.modal.pickDelete.title';
      case 'update':
        return 'pages.admin.tags.modal.update.title';
      case 'delete':
        return 'pages.admin.tags.modal.delete.title';
      default:
        return 'pages.admin.tags.modal.create.title';
    }
  });

  ngOnInit(): void {
    void this.loadWorkspace();
  }

  openCreateModal(): void {
    this.selectedTagSignal.set(null);
    this.formSignal.set(createEmptyTagsOperationsFormValue());
    this.clearModalFeedback();
    this.modalModeSignal.set('create');
  }

  openReadModal(): void {
    if (!this.hasTags()) {
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

  openUpdateModal(tagId: string): void {
    const tag = this.tagsSignal().find((item) => item.id === tagId);

    if (!tag) {
      return;
    }

    this.selectedTagSignal.set(tag);
    this.formSignal.set(buildTagsFormValue(tag, this.projectsSignal()));
    this.clearModalFeedback();
    this.modalModeSignal.set('update');
  }

  openDeleteModal(tagId: string): void {
    const tag = this.tagsSignal().find((item) => item.id === tagId);

    if (!tag) {
      return;
    }

    this.selectedTagSignal.set(tag);
    this.clearModalFeedback();
    this.modalModeSignal.set('delete');
  }

  closeModal(): void {
    this.modalModeSignal.set(null);
    this.selectedTagSignal.set(null);
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

  updateType(value: string): void {
    this.patchForm({ type: value as TagTypeValue | '' });
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

  toggleTechnology(technologyId: string): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      technologyIds: this.toggleSelection(formValue.technologyIds, technologyId),
    }));
  }

  async submitModal(): Promise<void> {
    const accessToken = this.adminSessionService.accessToken();

    if (!accessToken) {
      this.setModalErrorFeedback('pages.admin.tags.feedback.missingSession');
      return;
    }

    switch (this.modalMode()) {
      case 'create':
      case 'update': {
        const buildResult = buildTagsMutationPayload(this.form());

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
      const [tagsResponse, projectsResponse, technologiesResponse] = await Promise.all([
        firstValueFrom(
          this.tagsOperationsService.getAll(page, this.pagination().pageSize, search),
        ),
        firstValueFrom(this.projectsService.getProjects()),
        firstValueFrom(this.technologiesService.getTechnologies()),
      ]);

      this.tagsSignal.set(tagsResponse.data);
      this.paginationSignal.set(tagsResponse.pagination);
      this.projectsSignal.set(projectsResponse.data);
      this.technologiesSignal.set(technologiesResponse.data);
    } catch {
      this.loadErrorKeySignal.set('pages.admin.tags.feedback.loadError');
      this.toastService.showError('pages.admin.tags.feedback.loadError');
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  private async submitUpsert(payload: TagMutationPayload): Promise<void> {
    this.isSubmittingSignal.set(true);

    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(this.tagsOperationsService.create(payload));
        this.setSuccessFeedback('pages.admin.tags.feedback.created');
      } else {
        const selectedTag = this.selectedTag();

        if (!selectedTag) {
          this.setModalErrorFeedback('pages.admin.tags.feedback.selectionRequired');
          return;
        }

        await firstValueFrom(
          this.tagsOperationsService.update(selectedTag.id, payload),
        );
        this.setSuccessFeedback('pages.admin.tags.feedback.updated');
      }

      this.closeModal();
      await this.loadWorkspace(this.pagination().page, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.tags.feedback.saveError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private async submitDelete(): Promise<void> {
    const selectedTag = this.selectedTag();

    if (!selectedTag) {
      this.setModalErrorFeedback('pages.admin.tags.feedback.selectionRequired');
      return;
    }

    this.isSubmittingSignal.set(true);

    try {
      await firstValueFrom(this.tagsOperationsService.delete(selectedTag.id));

      const nextPage =
        this.tags().length === 1 && this.pagination().page > 1
          ? this.pagination().page - 1
          : this.pagination().page;

      this.closeModal();
      this.setSuccessFeedback('pages.admin.tags.feedback.deleted');
      await this.loadWorkspace(nextPage, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.tags.feedback.deleteError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private patchForm(patch: Partial<TagsOperationsFormValue>): void {
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

  private setSuccessFeedback(feedbackKey: AppTranslationKey): void {
    this.feedbackKeySignal.set(feedbackKey);
    this.feedbackToneSignal.set('success');
    this.toastService.showSuccess(feedbackKey);
  }

  private setModalErrorFeedback(feedbackKey: AppTranslationKey): void {
    this.modalFeedbackKeySignal.set(feedbackKey);
    this.modalFeedbackToneSignal.set('error');
    this.toastService.showError(feedbackKey);
  }
}
