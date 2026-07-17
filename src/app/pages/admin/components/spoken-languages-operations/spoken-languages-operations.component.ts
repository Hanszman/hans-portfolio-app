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
import { SpokenLanguagesOperationsService } from '../../../../core/api/admin/spoken-languages/spoken-languages-operations.service';
import {
  SpokenLanguageMutationPayload,
  SpokenLanguageRecord,
} from '../../../../core/api/admin/spoken-languages/spoken-languages-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { InfoStateComponent } from '../../../../shared/info-state/info-state.component';
import {
  ADMIN_MODAL_PAGE_SIZE,
  AdminCollectionPagination,
  createAdminCollectionPagination,
  createAdminEntityEndpointLabel,
} from '../../admin.types';
import { SpokenLanguagesOperationsModalComponent } from './components/spoken-languages-operations-modal/spoken-languages-operations-modal.component';
import {
  buildSpokenLanguageImageAssetOptions,
  buildSpokenLanguagesFormValue,
  buildSpokenLanguagesMutationPayload,
  buildSpokenLanguagesViewModels,
} from './helpers/spoken-languages-operations.helper';
import {
  SpokenLanguageProficiencyValue,
  SpokenLanguagesOperationsFormValue,
  SpokenLanguagesOperationsModalMode,
  createEmptySpokenLanguagesOperationsFormValue,
  createSpokenLanguageProficiencyOptions,
} from './spoken-languages-operations.types';

@Component({
  selector: 'app-spoken-languages-operations',
  standalone: true,
  imports: [TranslatePipe, InfoStateComponent, SpokenLanguagesOperationsModalComponent],
  templateUrl: './spoken-languages-operations.component.html',
  styleUrl: './spoken-languages-operations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpokenLanguagesOperationsComponent implements OnInit {
  private readonly spokenLanguagesOperationsService = inject(
    SpokenLanguagesOperationsService,
  );
  private readonly imageAssetsOperationsService = inject(ImageAssetsOperationsService);
  private readonly adminSessionService = inject(AdminSessionService);
  private readonly toastService = inject(ToastService);

  private readonly spokenLanguagesSignal = signal<readonly SpokenLanguageRecord[]>([]);
  private readonly imageAssetsSignal = signal<readonly ImageAssetRecord[]>([]);
  private readonly paginationSignal = signal<AdminCollectionPagination>(
    createAdminCollectionPagination(ADMIN_MODAL_PAGE_SIZE),
  );
  private readonly isLoadingSignal = signal(true);
  private readonly isSubmittingSignal = signal(false);
  private readonly loadErrorKeySignal = signal<AppTranslationKey | null>(null);
  private readonly modalFeedbackKeySignal = signal<AppTranslationKey | null>(null);
  private readonly modalFeedbackToneSignal = signal<'success' | 'error' | null>(null);
  readonly modalModeSignal = signal<SpokenLanguagesOperationsModalMode | null>(null);
  private readonly selectedSpokenLanguageSignal = signal<SpokenLanguageRecord | null>(
    null,
  );
  private readonly searchQuerySignal = signal('');
  private readonly formSignal = signal<SpokenLanguagesOperationsFormValue>(
    createEmptySpokenLanguagesOperationsFormValue(),
  );

  protected readonly spokenLanguages = computed(() =>
    buildSpokenLanguagesViewModels(
      this.spokenLanguagesSignal(),
      this.imageAssetsSignal(),
    ),
  );
  protected readonly imageAssetOptions = computed(() =>
    buildSpokenLanguageImageAssetOptions(this.imageAssetsSignal()),
  );
  protected readonly proficiencyOptions = createSpokenLanguageProficiencyOptions();
  protected readonly isLoading = this.isLoadingSignal.asReadonly();
  protected readonly isSubmitting = this.isSubmittingSignal.asReadonly();
  protected readonly loadErrorKey = this.loadErrorKeySignal.asReadonly();
  protected readonly modalFeedbackKey = this.modalFeedbackKeySignal.asReadonly();
  protected readonly modalFeedbackTone = this.modalFeedbackToneSignal.asReadonly();
  protected readonly modalMode = this.modalModeSignal.asReadonly();
  protected readonly endpointLabel = createAdminEntityEndpointLabel('/spoken-languages');
  protected readonly selectedSpokenLanguage =
    this.selectedSpokenLanguageSignal.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly pagination = this.paginationSignal.asReadonly();
  protected readonly searchQuery = this.searchQuerySignal.asReadonly();
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly hasSpokenLanguages = computed(
    () => this.pagination().totalItems > 0 && this.spokenLanguages().length > 0,
  );
  protected readonly modalTitleKey = computed<AppTranslationKey>(() => {
    switch (this.modalMode()) {
      case 'create':
        return 'pages.admin.spokenLanguages.modal.create.title';
      case 'read':
        return 'pages.admin.spokenLanguages.modal.read.title';
      case 'pick-update':
        return 'pages.admin.spokenLanguages.modal.pickUpdate.title';
      case 'pick-delete':
        return 'pages.admin.spokenLanguages.modal.pickDelete.title';
      case 'update':
        return 'pages.admin.spokenLanguages.modal.update.title';
      case 'delete':
        return 'pages.admin.spokenLanguages.modal.delete.title';
      default:
        return 'pages.admin.spokenLanguages.modal.create.title';
    }
  });

  ngOnInit(): void {
    void this.loadWorkspace();
  }

  openCreateModal(): void {
    this.selectedSpokenLanguageSignal.set(null);
    this.formSignal.set(createEmptySpokenLanguagesOperationsFormValue());
    this.clearModalFeedback();
    this.modalModeSignal.set('create');
  }

  openReadModal(): void {
    if (!this.hasSpokenLanguages()) {
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

  openUpdateModal(spokenLanguageId: string): void {
    const spokenLanguage = this.spokenLanguagesSignal().find(
      (item) => item.id === spokenLanguageId,
    );

    if (!spokenLanguage) {
      return;
    }

    this.selectedSpokenLanguageSignal.set(spokenLanguage);
    this.formSignal.set(
      buildSpokenLanguagesFormValue(spokenLanguage, this.imageAssetsSignal()),
    );
    this.clearModalFeedback();
    this.modalModeSignal.set('update');
  }

  openDeleteModal(spokenLanguageId: string): void {
    const spokenLanguage = this.spokenLanguagesSignal().find(
      (item) => item.id === spokenLanguageId,
    );

    if (!spokenLanguage) {
      return;
    }

    this.selectedSpokenLanguageSignal.set(spokenLanguage);
    this.clearModalFeedback();
    this.modalModeSignal.set('delete');
  }

  closeModal(): void {
    this.modalModeSignal.set(null);
    this.selectedSpokenLanguageSignal.set(null);
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

  updateCode(value: string): void {
    this.patchForm({ code: value });
  }

  updateNamePt(value: string): void {
    this.patchForm({ namePt: value });
  }

  updateNameEn(value: string): void {
    this.patchForm({ nameEn: value });
  }

  updateProficiency(value: string): void {
    this.patchForm({ proficiency: value as SpokenLanguageProficiencyValue | '' });
  }

  updateHighlight(value: boolean): void {
    this.patchForm({ highlight: value });
  }

  updateSortOrder(value: string): void {
    this.patchForm({ sortOrder: value });
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
      this.setModalErrorFeedback(
        'pages.admin.spokenLanguages.feedback.missingSession',
      );
      return;
    }

    switch (this.modalMode()) {
      case 'create':
      case 'update': {
        const buildResult = buildSpokenLanguagesMutationPayload(this.form());

        if (!buildResult.isValid) {
          this.setModalErrorFeedback(buildResult.errorKey);
          return;
        }

        await this.submitUpsert(accessToken, buildResult.payload);
        return;
      }
      case 'delete':
        await this.submitDelete(accessToken);
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
      const [spokenLanguagesResponse, imageAssetsResponse] = await Promise.all([
        firstValueFrom(
          this.spokenLanguagesOperationsService.getAll(
            page,
            this.pagination().pageSize,
            search,
          ),
        ),
        firstValueFrom(this.imageAssetsOperationsService.getAll(1, 100)),
      ]);

      this.spokenLanguagesSignal.set(spokenLanguagesResponse.data);
      this.paginationSignal.set(spokenLanguagesResponse.pagination);
      this.imageAssetsSignal.set(imageAssetsResponse.data);
    } catch {
      this.loadErrorKeySignal.set('pages.admin.spokenLanguages.feedback.loadError');
      this.toastService.showError('pages.admin.spokenLanguages.feedback.loadError');
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  private async submitUpsert(
    accessToken: string,
    payload: SpokenLanguageMutationPayload,
  ): Promise<void> {
    this.isSubmittingSignal.set(true);

    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(
          this.spokenLanguagesOperationsService.create(accessToken, payload),
        );
        this.toastService.showSuccess('pages.admin.spokenLanguages.feedback.created');
      } else {
        const selectedSpokenLanguage = this.selectedSpokenLanguage();

        if (!selectedSpokenLanguage) {
          this.setModalErrorFeedback(
            'pages.admin.spokenLanguages.feedback.selectionRequired',
          );
          return;
        }

        await firstValueFrom(
          this.spokenLanguagesOperationsService.update(
            accessToken,
            selectedSpokenLanguage.id,
            payload,
          ),
        );
        this.toastService.showSuccess('pages.admin.spokenLanguages.feedback.updated');
      }

      this.closeModal();
      await this.loadWorkspace(this.pagination().page, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.spokenLanguages.feedback.saveError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private async submitDelete(accessToken: string): Promise<void> {
    const selectedSpokenLanguage = this.selectedSpokenLanguage();

    if (!selectedSpokenLanguage) {
      this.setModalErrorFeedback(
        'pages.admin.spokenLanguages.feedback.selectionRequired',
      );
      return;
    }

    this.isSubmittingSignal.set(true);

    try {
      await firstValueFrom(
        this.spokenLanguagesOperationsService.delete(
          accessToken,
          selectedSpokenLanguage.id,
        ),
      );

      const nextPage =
        this.spokenLanguages().length === 1 && this.pagination().page > 1
          ? this.pagination().page - 1
          : this.pagination().page;

      this.closeModal();
      this.toastService.showSuccess('pages.admin.spokenLanguages.feedback.deleted');
      await this.loadWorkspace(nextPage, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.spokenLanguages.feedback.deleteError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private patchForm(patch: Partial<SpokenLanguagesOperationsFormValue>): void {
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
