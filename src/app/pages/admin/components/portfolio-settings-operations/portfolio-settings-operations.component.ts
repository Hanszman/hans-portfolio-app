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
import { PortfolioSettingsOperationsService } from '../../../../core/api/admin/portfolio-settings/portfolio-settings-operations.service';
import {
  PortfolioSettingMutationPayload,
  PortfolioSettingRecord,
} from '../../../../core/api/admin/portfolio-settings/portfolio-settings-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { InfoStateComponent } from '../../../../shared/info-state/info-state.component';
import {
  ADMIN_MODAL_PAGE_SIZE,
  AdminCollectionPagination,
  createAdminEntityEndpointLabel,
  createAdminCollectionPagination,
} from '../../admin.types';
import { PortfolioSettingsOperationsModalComponent } from './components/portfolio-settings-operations-modal/portfolio-settings-operations-modal.component';
import {
  buildPortfolioSettingsFormValue,
  buildPortfolioSettingsViewModels,
  parsePortfolioSettingsJsonValue,
} from './helpers/portfolio-settings-operations.helper';
import {
  PortfolioSettingsOperationsFormValue,
  PortfolioSettingsOperationsModalMode,
  createEmptyPortfolioSettingsOperationsFormValue,
} from './portfolio-settings-operations.types';

@Component({
  selector: 'app-portfolio-settings-operations',
  standalone: true,
  imports: [
    TranslatePipe,
    InfoStateComponent,
    PortfolioSettingsOperationsModalComponent,
  ],
  templateUrl: './portfolio-settings-operations.component.html',
  styleUrl: './portfolio-settings-operations.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioSettingsOperationsComponent implements OnInit {
  private readonly portfolioSettingsOperationsService = inject(
    PortfolioSettingsOperationsService,
  );
  private readonly adminSessionService = inject(AdminSessionService);
  private readonly toastService = inject(ToastService);

  private readonly settingsSignal = signal<readonly PortfolioSettingRecord[]>([]);
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
  private readonly modalModeSignal =
    signal<PortfolioSettingsOperationsModalMode | null>(null);
  private readonly selectedSettingSignal = signal<PortfolioSettingRecord | null>(null);
  private readonly searchQuerySignal = signal('');
  private readonly formSignal = signal<PortfolioSettingsOperationsFormValue>(
    createEmptyPortfolioSettingsOperationsFormValue(),
  );

  protected readonly settings = computed(() =>
    buildPortfolioSettingsViewModels(this.settingsSignal()),
  );
  protected readonly isLoading = this.isLoadingSignal.asReadonly();
  protected readonly isSubmitting = this.isSubmittingSignal.asReadonly();
  protected readonly loadErrorKey = this.loadErrorKeySignal.asReadonly();
  protected readonly feedbackKey = this.feedbackKeySignal.asReadonly();
  protected readonly feedbackTone = this.feedbackToneSignal.asReadonly();
  protected readonly modalFeedbackKey = this.modalFeedbackKeySignal.asReadonly();
  protected readonly modalFeedbackTone = this.modalFeedbackToneSignal.asReadonly();
  protected readonly modalMode = this.modalModeSignal.asReadonly();
  protected readonly endpointLabel = createAdminEntityEndpointLabel('/portfolio-settings');
  protected readonly hasSettings = computed(
    () => this.pagination().totalItems > 0 && this.settings().length > 0,
  );
  protected readonly selectedSetting = this.selectedSettingSignal.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly pagination = this.paginationSignal.asReadonly();
  protected readonly searchQuery = this.searchQuerySignal.asReadonly();
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly modalTitleKey = computed<AppTranslationKey>(() => {
    switch (this.modalMode()) {
      case 'create':
        return 'pages.admin.portfolioSettings.modal.create.title';
      case 'read':
        return 'pages.admin.portfolioSettings.modal.read.title';
      case 'pick-update':
        return 'pages.admin.portfolioSettings.modal.pickUpdate.title';
      case 'pick-delete':
        return 'pages.admin.portfolioSettings.modal.pickDelete.title';
      case 'update':
        return 'pages.admin.portfolioSettings.modal.update.title';
      case 'delete':
        return 'pages.admin.portfolioSettings.modal.delete.title';
      default:
        return 'pages.admin.portfolioSettings.modal.create.title';
    }
  });

  ngOnInit(): void {
    void this.loadSettings();
  }

  openCreateModal(): void {
    this.selectedSettingSignal.set(null);
    this.formSignal.set(createEmptyPortfolioSettingsOperationsFormValue());
    this.clearModalFeedback();
    this.modalModeSignal.set('create');
  }

  openReadModal(): void {
    if (!this.hasSettings()) {
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

  openUpdateModal(settingId: string): void {
    const setting = this.settingsSignal().find((item) => item.id === settingId);

    if (!setting) {
      return;
    }

    this.selectedSettingSignal.set(setting);
    this.formSignal.set(buildPortfolioSettingsFormValue(setting));
    this.clearModalFeedback();
    this.modalModeSignal.set('update');
  }

  openDeleteModal(settingId: string): void {
    const setting = this.settingsSignal().find((item) => item.id === settingId);

    if (!setting) {
      return;
    }

    this.selectedSettingSignal.set(setting);
    this.clearModalFeedback();
    this.modalModeSignal.set('delete');
  }

  closeModal(): void {
    this.modalModeSignal.set(null);
    this.selectedSettingSignal.set(null);
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

    await this.loadSettings(page, this.searchQuery());
  }

  async updateSearchQuery(value: string): Promise<void> {
    const normalizedValue = value.trim();

    if (normalizedValue === this.searchQuery()) {
      return;
    }

    this.searchQuerySignal.set(normalizedValue);
    await this.loadSettings(1, normalizedValue);
  }

  updateKey(value: string): void {
    this.patchForm({
      key: value,
    });
  }

  updateValueText(value: string): void {
    this.patchForm({
      valueText: value,
    });
  }

  updateDescription(value: string): void {
    this.patchForm({
      description: value,
    });
  }

  async submitModal(): Promise<void> {
    const accessToken = this.adminSessionService.accessToken();

    if (!accessToken) {
      this.setModalErrorFeedback('pages.admin.portfolioSettings.feedback.missingSession');
      return;
    }

    switch (this.modalMode()) {
      case 'create':
      case 'update': {
        const payload = this.buildMutationPayload();

        if (!payload) {
          return;
        }

        await this.submitUpsert(payload);
        return;
      }
      case 'delete':
        await this.submitDelete();
        return;
      default:
        return;
    }
  }

  protected trackSettingById(index: number, setting: { id: string }): string {
    return setting.id;
  }

  private async loadSettings(
    page = this.pagination().page,
    search = this.searchQuery(),
  ): Promise<void> {
    this.isLoadingSignal.set(true);
    this.loadErrorKeySignal.set(null);

    try {
      const response = await firstValueFrom(
        this.portfolioSettingsOperationsService.getAll(
          page,
          this.pagination().pageSize,
          search,
        ),
      );
      this.settingsSignal.set(response.data);
      this.paginationSignal.set(response.pagination);
    } catch {
      this.loadErrorKeySignal.set('pages.admin.portfolioSettings.feedback.loadError');
      this.toastService.showError('pages.admin.portfolioSettings.feedback.loadError');
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  private buildMutationPayload(): PortfolioSettingMutationPayload | null {
    const formValue = this.form();

    if (!formValue.key.trim()) {
      this.setModalErrorFeedback('pages.admin.portfolioSettings.feedback.requiredKey');
      return null;
    }

    const parsedValue = parsePortfolioSettingsJsonValue(formValue.valueText);

    if (!parsedValue.isValid) {
      this.setModalErrorFeedback(parsedValue.errorKey);
      return null;
    }

    return {
      key: formValue.key.trim(),
      value: parsedValue.value,
      description: formValue.description.trim(),
    };
  }

  private async submitUpsert(
    payload: PortfolioSettingMutationPayload,
  ): Promise<void> {
    this.isSubmittingSignal.set(true);

    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(
          this.portfolioSettingsOperationsService.create(payload),
        );

        this.setSuccessFeedback('pages.admin.portfolioSettings.feedback.created');
      } else {
        const selectedSetting = this.selectedSetting();

        if (!selectedSetting) {
          this.setModalErrorFeedback(
            'pages.admin.portfolioSettings.feedback.selectionRequired',
          );
          return;
        }

        await firstValueFrom(
          this.portfolioSettingsOperationsService.update(selectedSetting.id, payload),
        );

        this.setSuccessFeedback('pages.admin.portfolioSettings.feedback.updated');
      }

      this.closeModal();
      await this.loadSettings(this.pagination().page, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.portfolioSettings.feedback.saveError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private async submitDelete(): Promise<void> {
    const selectedSetting = this.selectedSetting();

    if (!selectedSetting) {
      this.setModalErrorFeedback(
        'pages.admin.portfolioSettings.feedback.selectionRequired',
      );
      return;
    }

    this.isSubmittingSignal.set(true);

    try {
      await firstValueFrom(
        this.portfolioSettingsOperationsService.delete(selectedSetting.id),
      );

      const nextPage =
        this.settings().length === 1 && this.pagination().page > 1
          ? this.pagination().page - 1
          : this.pagination().page;

      this.closeModal();
      this.setSuccessFeedback('pages.admin.portfolioSettings.feedback.deleted');
      await this.loadSettings(nextPage, this.searchQuery());
    } catch {
      this.setModalErrorFeedback('pages.admin.portfolioSettings.feedback.deleteError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private patchForm(patch: Partial<PortfolioSettingsOperationsFormValue>): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      ...patch,
    }));
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
