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
import { FormationsOperationsService } from '../../../../core/api/admin/formations/formations-operations.service';
import {
  FormationMutationPayload,
  FormationRecord,
} from '../../../../core/api/admin/formations/formations-operations.types';
import { ImageAssetsOperationsService } from '../../../../core/api/admin/image-assets/image-assets-operations.service';
import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { LinksOperationsService } from '../../../../core/api/admin/links/links-operations.service';
import { LinkRecord } from '../../../../core/api/admin/links/links-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { ToastService } from '../../../../core/toast/toast.service';
import { TranslationService } from '../../../../core/translation/translation.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { InfoStateComponent } from '../../../../shared/info-state/info-state.component';
import { OperationsActionsComponent } from '../../../../shared/operations/operations-actions/operations-actions.component';
import {
  ADMIN_MODAL_PAGE_SIZE,
  AdminCollectionPagination,
  createAdminCollectionPagination,
  createAdminEntityEndpointLabel,
} from '../../admin.types';
import { FormationsOperationsModalComponent } from './components/formations-operations-modal/formations-operations-modal.component';
import {
  buildFormationImageAssetOptions,
  buildFormationLinkOptions,
  buildFormationsFormValue,
  buildFormationsMutationPayload,
  buildFormationsViewModels,
  buildFormationTechnologyOptions,
} from './helpers/formations-operations.helper';
import {
  FormationsOperationsFormValue,
  FormationsOperationsModalMode,
  createEmptyFormationsOperationsFormValue,
  createFormationDegreeTypeOptions,
} from './formations-operations.types';
import { translateAdminSelectOptions } from '../../helpers/admin.helper';

@Component({
  selector: 'app-formations-operations',
  standalone: true,
  imports: [
    TranslatePipe,
    InfoStateComponent,
    OperationsActionsComponent,
    FormationsOperationsModalComponent,
  ],
  templateUrl: './formations-operations.component.html',
  styleUrl: './formations-operations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormationsOperationsComponent implements OnInit {
  private readonly formationsOperationsService = inject(FormationsOperationsService);
  private readonly technologiesService = inject(TechnologiesService);
  private readonly linksOperationsService = inject(LinksOperationsService);
  private readonly imageAssetsOperationsService = inject(ImageAssetsOperationsService);
  private readonly adminSessionService = inject(AdminSessionService);
  private readonly toastService = inject(ToastService);
  private readonly translation = inject(TranslationService);

  private readonly formationsSignal = signal<readonly FormationRecord[]>([]);
  private readonly technologiesSignal = signal<readonly TechnologyCollectionItemResponse[]>([]);
  private readonly linksSignal = signal<readonly LinkRecord[]>([]);
  private readonly imageAssetsSignal = signal<readonly ImageAssetRecord[]>([]);
  private readonly paginationSignal = signal<AdminCollectionPagination>(
    createAdminCollectionPagination(ADMIN_MODAL_PAGE_SIZE),
  );
  private readonly isLoadingSignal = signal(true);
  private readonly isSubmittingSignal = signal(false);
  private readonly loadErrorKeySignal = signal<AppTranslationKey | null>(null);
  private readonly modalFeedbackKeySignal = signal<AppTranslationKey | null>(null);
  private readonly modalFeedbackToneSignal = signal<'success' | 'error' | null>(null);
  readonly modalModeSignal = signal<FormationsOperationsModalMode | null>(null);
  private readonly selectedFormationSignal = signal<FormationRecord | null>(null);
  private readonly searchQuerySignal = signal('');
  private readonly formSignal = signal<FormationsOperationsFormValue>(
    createEmptyFormationsOperationsFormValue(),
  );

  protected readonly formations = computed(() =>
    buildFormationsViewModels(
      this.formationsSignal(),
      this.technologiesSignal(),
      this.linksSignal(),
      this.imageAssetsSignal(),
    ),
  );
  protected readonly technologyOptions = computed(() =>
    buildFormationTechnologyOptions(this.technologiesSignal()),
  );
  protected readonly linkOptions = computed(() =>
    buildFormationLinkOptions(this.linksSignal()),
  );
  protected readonly imageAssetOptions = computed(() =>
    buildFormationImageAssetOptions(this.imageAssetsSignal()),
  );
  protected readonly degreeTypeOptions = computed(() =>
    translateAdminSelectOptions(
      createFormationDegreeTypeOptions(),
      this.translation.instant.bind(this.translation),
    ),
  );
  protected readonly isLoading = this.isLoadingSignal.asReadonly();
  protected readonly isSubmitting = this.isSubmittingSignal.asReadonly();
  protected readonly loadErrorKey = this.loadErrorKeySignal.asReadonly();
  protected readonly modalFeedbackKey = this.modalFeedbackKeySignal.asReadonly();
  protected readonly modalFeedbackTone = this.modalFeedbackToneSignal.asReadonly();
  protected readonly modalMode = this.modalModeSignal.asReadonly();
  protected readonly endpointLabel = createAdminEntityEndpointLabel('/formations');
  protected readonly selectedFormation = this.selectedFormationSignal.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly pagination = this.paginationSignal.asReadonly();
  protected readonly searchQuery = this.searchQuerySignal.asReadonly();
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly hasFormations = computed(
    () => this.pagination().totalItems > 0 && this.formations().length > 0,
  );
  protected readonly modalTitleKey = computed<AppTranslationKey>(() => {
    switch (this.modalMode()) {
      case 'create':
        return 'pages.admin.formations.modal.create.title';
      case 'read':
        return 'pages.admin.formations.modal.read.title';
      case 'pick-update':
        return 'pages.admin.formations.modal.pickUpdate.title';
      case 'pick-delete':
        return 'pages.admin.formations.modal.pickDelete.title';
      case 'update':
        return 'pages.admin.formations.modal.update.title';
      case 'delete':
        return 'pages.admin.formations.modal.delete.title';
      default:
        return 'pages.admin.formations.modal.create.title';
    }
  });

  ngOnInit(): void {
    void this.loadWorkspace();
  }

  openCreateModal(): void {
    this.selectedFormationSignal.set(null);
    this.formSignal.set(createEmptyFormationsOperationsFormValue());
    this.clearModalFeedback();
    this.modalModeSignal.set('create');
  }

  openReadModal(): void {
    if (!this.hasFormations()) {
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

  openUpdateModal(formationId: string): void {
    const formation = this.formationsSignal().find((item) => item.id === formationId);

    if (!formation) {
      return;
    }

    this.selectedFormationSignal.set(formation);
    this.formSignal.set(buildFormationsFormValue(formation));
    this.clearModalFeedback();
    this.modalModeSignal.set('update');
  }

  openDeleteModal(formationId: string): void {
    const formation = this.formationsSignal().find((item) => item.id === formationId);

    if (!formation) {
      return;
    }

    this.selectedFormationSignal.set(formation);
    this.clearModalFeedback();
    this.modalModeSignal.set('delete');
  }

  closeModal(): void {
    this.modalModeSignal.set(null);
    this.selectedFormationSignal.set(null);
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

  updateInstitution(value: string): void {
    this.patchForm({ institution: value });
  }

  updateTitlePt(value: string): void {
    this.patchForm({ titlePt: value });
  }

  updateTitleEn(value: string): void {
    this.patchForm({ titleEn: value });
  }

  updateDegreeType(value: string): void {
    this.patchForm({ degreeType: value });
  }

  updateSummaryPt(value: string): void {
    this.patchForm({ summaryPt: value });
  }

  updateSummaryEn(value: string): void {
    this.patchForm({ summaryEn: value });
  }

  updateStartDate(value: string): void {
    this.patchForm({ startDate: value });
  }

  updateEndDate(value: string): void {
    this.patchForm({ endDate: value });
  }

  updateHighlight(value: boolean): void {
    this.patchForm({ highlight: value });
  }

  updateSortOrder(value: string): void {
    this.patchForm({ sortOrder: value });
  }

  toggleTechnology(technologyId: string): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      technologyIds: this.toggleSelection(formValue.technologyIds, technologyId),
    }));
  }

  toggleLink(linkId: string): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      linkIds: this.toggleSelection(formValue.linkIds, linkId),
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
      this.setModalErrorFeedback('pages.admin.formations.feedback.missingSession');
      return;
    }

    switch (this.modalMode()) {
      case 'create':
      case 'update': {
        const buildResult = buildFormationsMutationPayload(this.form());

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
      const [formationsResponse, technologiesResponse, linksResponse, imageAssetsResponse] =
        await Promise.all([
          firstValueFrom(
            this.formationsOperationsService.getAll(page, this.pagination().pageSize, search),
          ),
          firstValueFrom(this.technologiesService.getTechnologies()),
          firstValueFrom(this.linksOperationsService.getAll(1, 100)),
          firstValueFrom(this.imageAssetsOperationsService.getAll(1, 100)),
        ]);

      this.formationsSignal.set(formationsResponse.data);
      this.paginationSignal.set(formationsResponse.pagination);
      this.technologiesSignal.set(technologiesResponse.data);
      this.linksSignal.set(linksResponse.data);
      this.imageAssetsSignal.set(imageAssetsResponse.data);
    } catch {
      this.loadErrorKeySignal.set('pages.admin.formations.feedback.loadError');
      this.toastService.showError('pages.admin.formations.feedback.loadError');
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  private async submitUpsert(payload: FormationMutationPayload): Promise<void> {
    this.isSubmittingSignal.set(true);

    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(this.formationsOperationsService.create(payload));
        this.toastService.showSuccess('pages.admin.formations.feedback.created');
      } else {
        const selectedFormation = this.selectedFormation();

        if (!selectedFormation) {
          this.setModalErrorFeedback('pages.admin.formations.feedback.selectionRequired');
          return;
        }

        await firstValueFrom(
          this.formationsOperationsService.update(selectedFormation.id, payload),
        );
        this.toastService.showSuccess('pages.admin.formations.feedback.updated');
      }

      this.closeModal();
      await this.loadWorkspace(this.pagination().page, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.formations.feedback.saveError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private async submitDelete(): Promise<void> {
    const selectedFormation = this.selectedFormation();

    if (!selectedFormation) {
      this.setModalErrorFeedback('pages.admin.formations.feedback.selectionRequired');
      return;
    }

    this.isSubmittingSignal.set(true);

    try {
      await firstValueFrom(this.formationsOperationsService.delete(selectedFormation.id));

      const nextPage =
        this.formations().length === 1 && this.pagination().page > 1
          ? this.pagination().page - 1
          : this.pagination().page;

      this.closeModal();
      this.toastService.showSuccess('pages.admin.formations.feedback.deleted');
      await this.loadWorkspace(nextPage, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.formations.feedback.deleteError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private patchForm(patch: Partial<FormationsOperationsFormValue>): void {
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
