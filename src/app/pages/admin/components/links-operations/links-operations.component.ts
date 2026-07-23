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
import { LinksOperationsService } from '../../../../core/api/admin/links/links-operations.service';
import {
  LinkMutationPayload,
  LinkRecord,
} from '../../../../core/api/admin/links/links-operations.types';
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
import { OperationsActionsComponent } from '../../../../shared/operations/operations-actions/operations-actions.component';
import {
  ADMIN_MODAL_PAGE_SIZE,
  AdminCollectionPagination,
  createAdminEntityEndpointLabel,
  createAdminCollectionPagination,
} from '../../admin.types';
import { LinksOperationsModalComponent } from './components/links-operations-modal/links-operations-modal.component';
import {
  buildLinkCatalogOptions,
  buildLinksFormValue,
  buildLinksMutationPayload,
  buildLinksViewModels,
} from './helpers/links-operations.helper';
import {
  LinksOperationsFormValue,
  LinksOperationsModalMode,
  createEmptyLinksOperationsFormValue,
  createLinkTypeOptions,
} from './links-operations.types';

@Component({
  selector: 'app-links-operations',
  standalone: true,
  imports: [
    TranslatePipe,
    InfoStateComponent,
    OperationsActionsComponent,
    LinksOperationsModalComponent,
  ],
  templateUrl: './links-operations.component.html',
  styleUrl: './links-operations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksOperationsComponent implements OnInit {
  private readonly linksOperationsService = inject(LinksOperationsService);
  private readonly projectsService = inject(ProjectsService);
  private readonly experiencesService = inject(ExperiencesService);
  private readonly technologiesService = inject(TechnologiesService);
  private readonly adminSessionService = inject(AdminSessionService);
  private readonly toastService = inject(ToastService);

  private readonly linksSignal = signal<readonly LinkRecord[]>([]);
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
  private readonly feedbackKeySignal = signal<AppTranslationKey | null>(null);
  private readonly feedbackToneSignal = signal<'success' | 'error' | null>(null);
  private readonly modalFeedbackKeySignal = signal<AppTranslationKey | null>(null);
  private readonly modalFeedbackToneSignal = signal<'success' | 'error' | null>(null);
  private readonly modalModeSignal = signal<LinksOperationsModalMode | null>(null);
  private readonly selectedLinkSignal = signal<LinkRecord | null>(null);
  private readonly searchQuerySignal = signal('');
  private readonly formSignal = signal<LinksOperationsFormValue>(
    createEmptyLinksOperationsFormValue(),
  );

  protected readonly links = computed(() =>
    buildLinksViewModels(
      this.linksSignal(),
      this.projectsSignal(),
      this.experiencesSignal(),
      this.technologiesSignal(),
    ),
  );
  protected readonly projectOptions = computed(() =>
    buildLinkCatalogOptions(this.projectsSignal()),
  );
  protected readonly experienceOptions = computed(() =>
    buildLinkCatalogOptions(this.experiencesSignal()),
  );
  protected readonly technologyOptions = computed(() =>
    buildLinkCatalogOptions(this.technologiesSignal()),
  );
  protected readonly formationOptions = computed(() => []);
  protected readonly linkTypeOptions = createLinkTypeOptions();
  protected readonly isLoading = this.isLoadingSignal.asReadonly();
  protected readonly isSubmitting = this.isSubmittingSignal.asReadonly();
  protected readonly loadErrorKey = this.loadErrorKeySignal.asReadonly();
  protected readonly feedbackKey = this.feedbackKeySignal.asReadonly();
  protected readonly feedbackTone = this.feedbackToneSignal.asReadonly();
  protected readonly modalFeedbackKey = this.modalFeedbackKeySignal.asReadonly();
  protected readonly modalFeedbackTone = this.modalFeedbackToneSignal.asReadonly();
  protected readonly modalMode = this.modalModeSignal.asReadonly();
  protected readonly endpointLabel = createAdminEntityEndpointLabel('/links');
  protected readonly selectedLink = this.selectedLinkSignal.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly pagination = this.paginationSignal.asReadonly();
  protected readonly searchQuery = this.searchQuerySignal.asReadonly();
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly hasLinks = computed(
    () => this.pagination().totalItems > 0 && this.links().length > 0,
  );
  protected readonly modalTitleKey = computed<AppTranslationKey>(() => {
    switch (this.modalMode()) {
      case 'create':
        return 'pages.admin.links.modal.create.title';
      case 'read':
        return 'pages.admin.links.modal.read.title';
      case 'pick-update':
        return 'pages.admin.links.modal.pickUpdate.title';
      case 'pick-delete':
        return 'pages.admin.links.modal.pickDelete.title';
      case 'update':
        return 'pages.admin.links.modal.update.title';
      case 'delete':
        return 'pages.admin.links.modal.delete.title';
      default:
        return 'pages.admin.links.modal.create.title';
    }
  });

  ngOnInit(): void {
    void this.loadWorkspace();
  }

  openCreateModal(): void {
    this.selectedLinkSignal.set(null);
    this.formSignal.set(createEmptyLinksOperationsFormValue());
    this.clearModalFeedback();
    this.modalModeSignal.set('create');
  }

  openReadModal(): void {
    if (!this.hasLinks()) {
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

  openUpdateModal(linkId: string): void {
    const link = this.linksSignal().find((item) => item.id === linkId);

    if (!link) {
      return;
    }

    this.selectedLinkSignal.set(link);
    this.formSignal.set(buildLinksFormValue(link, this.projectsSignal()));
    this.clearModalFeedback();
    this.modalModeSignal.set('update');
  }

  openDeleteModal(linkId: string): void {
    const link = this.linksSignal().find((item) => item.id === linkId);

    if (!link) {
      return;
    }

    this.selectedLinkSignal.set(link);
    this.clearModalFeedback();
    this.modalModeSignal.set('delete');
  }

  closeModal(): void {
    this.modalModeSignal.set(null);
    this.selectedLinkSignal.set(null);
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

  updateUrl(value: string): void {
    this.patchForm({ url: value });
  }

  updateLabelPt(value: string): void {
    this.patchForm({ labelPt: value });
  }

  updateLabelEn(value: string): void {
    this.patchForm({ labelEn: value });
  }

  updateDescriptionPt(value: string): void {
    this.patchForm({ descriptionPt: value });
  }

  updateDescriptionEn(value: string): void {
    this.patchForm({ descriptionEn: value });
  }

  updateType(value: string): void {
    this.patchForm({ type: value });
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

  toggleFormation(formationId: string): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      formationIds: this.toggleSelection(formValue.formationIds, formationId),
    }));
  }

  async submitModal(): Promise<void> {
    const accessToken = this.adminSessionService.accessToken();

    if (!accessToken) {
      this.setModalErrorFeedback('pages.admin.links.feedback.missingSession');
      return;
    }

    switch (this.modalMode()) {
      case 'create':
      case 'update': {
        const buildResult = buildLinksMutationPayload(this.form());

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
      const [linksResponse, projectsResponse, experiencesResponse, technologiesResponse] =
        await Promise.all([
          firstValueFrom(
            this.linksOperationsService.getAll(page, this.pagination().pageSize, search),
          ),
          firstValueFrom(this.projectsService.getProjects()),
          firstValueFrom(this.experiencesService.getExperiences()),
          firstValueFrom(this.technologiesService.getTechnologies()),
        ]);

      this.linksSignal.set(linksResponse.data);
      this.paginationSignal.set(linksResponse.pagination);
      this.projectsSignal.set(projectsResponse.data);
      this.experiencesSignal.set(experiencesResponse.data);
      this.technologiesSignal.set(technologiesResponse.data);
    } catch {
      this.loadErrorKeySignal.set('pages.admin.links.feedback.loadError');
      this.toastService.showError('pages.admin.links.feedback.loadError');
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  private async submitUpsert(payload: LinkMutationPayload): Promise<void> {
    this.isSubmittingSignal.set(true);

    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(this.linksOperationsService.create(payload));
        this.setSuccessFeedback('pages.admin.links.feedback.created');
      } else {
        const selectedLink = this.selectedLink();

        if (!selectedLink) {
          this.setModalErrorFeedback('pages.admin.links.feedback.selectionRequired');
          return;
        }

        await firstValueFrom(
          this.linksOperationsService.update(selectedLink.id, payload),
        );
        this.setSuccessFeedback('pages.admin.links.feedback.updated');
      }

      this.closeModal();
      await this.loadWorkspace(this.pagination().page, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.links.feedback.saveError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private async submitDelete(): Promise<void> {
    const selectedLink = this.selectedLink();

    if (!selectedLink) {
      this.setModalErrorFeedback('pages.admin.links.feedback.selectionRequired');
      return;
    }

    this.isSubmittingSignal.set(true);

    try {
      await firstValueFrom(this.linksOperationsService.delete(selectedLink.id));

      const nextPage =
        this.links().length === 1 && this.pagination().page > 1
          ? this.pagination().page - 1
          : this.pagination().page;

      this.closeModal();
      this.setSuccessFeedback('pages.admin.links.feedback.deleted');
      await this.loadWorkspace(nextPage, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.links.feedback.deleteError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private patchForm(patch: Partial<LinksOperationsFormValue>): void {
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
