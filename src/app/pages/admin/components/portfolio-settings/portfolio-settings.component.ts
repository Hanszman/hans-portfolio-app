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
import { PortfolioSettingsApiService } from '../../../../core/api/admin/portfolio-settings/portfolio-settings-api.service';
import {
  PortfolioSettingMutationPayload,
  PortfolioSettingRecord,
} from '../../../../core/api/admin/portfolio-settings/portfolio-settings-api.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { InfoStateComponent } from '../../../../shared/info-state/info-state.component';
import { PortfolioSettingsModalComponent } from './components/portfolio-settings-modal/portfolio-settings-modal.component';
import {
  buildPortfolioSettingsFormValue,
  buildPortfolioSettingsViewModels,
  parsePortfolioSettingsJsonValue,
} from './helpers/portfolio-settings.helper';
import {
  PortfolioSettingsFormValue,
  PortfolioSettingsModalMode,
  createEmptyPortfolioSettingsFormValue,
} from './portfolio-settings.types';

@Component({
  selector: 'app-portfolio-settings',
  standalone: true,
  imports: [
    TranslatePipe,
    InfoStateComponent,
    PortfolioSettingsModalComponent,
  ],
  templateUrl: './portfolio-settings.component.html',
  styleUrl: './portfolio-settings.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioSettingsComponent implements OnInit {
  private readonly portfolioSettingsApiService = inject(PortfolioSettingsApiService);
  private readonly adminSessionService = inject(AdminSessionService);

  private readonly settingsSignal = signal<readonly PortfolioSettingRecord[]>([]);
  private readonly isLoadingSignal = signal(true);
  private readonly isSubmittingSignal = signal(false);
  private readonly loadErrorKeySignal = signal<AppTranslationKey | null>(null);
  private readonly feedbackKeySignal = signal<AppTranslationKey | null>(null);
  private readonly feedbackToneSignal = signal<'success' | 'error' | null>(null);
  private readonly modalModeSignal = signal<PortfolioSettingsModalMode | null>(null);
  private readonly selectedSettingSignal = signal<PortfolioSettingRecord | null>(null);
  private readonly isReadVisibleSignal = signal(false);
  private readonly formSignal = signal<PortfolioSettingsFormValue>(
    createEmptyPortfolioSettingsFormValue(),
  );

  protected readonly settings = computed(() =>
    buildPortfolioSettingsViewModels(this.settingsSignal()),
  );
  protected readonly isLoading = this.isLoadingSignal.asReadonly();
  protected readonly isSubmitting = this.isSubmittingSignal.asReadonly();
  protected readonly loadErrorKey = this.loadErrorKeySignal.asReadonly();
  protected readonly feedbackKey = this.feedbackKeySignal.asReadonly();
  protected readonly feedbackTone = this.feedbackToneSignal.asReadonly();
  protected readonly modalMode = this.modalModeSignal.asReadonly();
  protected readonly hasSettings = computed(() => this.settings().length > 0);
  protected readonly selectedSetting = this.selectedSettingSignal.asReadonly();
  protected readonly form = this.formSignal.asReadonly();
  protected readonly isModalOpen = computed(() => this.modalMode() !== null);
  protected readonly isReadVisible = this.isReadVisibleSignal.asReadonly();
  protected readonly modalTitleKey = computed<AppTranslationKey>(() => {
    switch (this.modalMode()) {
      case 'create':
        return 'pages.admin.portfolioSettings.modal.create.title';
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
    this.formSignal.set(createEmptyPortfolioSettingsFormValue());
    this.feedbackKeySignal.set(null);
    this.feedbackToneSignal.set(null);
    this.modalModeSignal.set('create');
  }

  openUpdatePickerModal(): void {
    this.feedbackKeySignal.set(null);
    this.feedbackToneSignal.set(null);
    this.modalModeSignal.set('pick-update');
  }

  openDeletePickerModal(): void {
    this.feedbackKeySignal.set(null);
    this.feedbackToneSignal.set(null);
    this.modalModeSignal.set('pick-delete');
  }

  openUpdateModal(settingId: string): void {
    const setting = this.settingsSignal().find((item) => item.id === settingId);

    if (!setting) {
      return;
    }

    this.selectedSettingSignal.set(setting);
    this.formSignal.set(buildPortfolioSettingsFormValue(setting));
    this.modalModeSignal.set('update');
  }

  openDeleteModal(settingId: string): void {
    const setting = this.settingsSignal().find((item) => item.id === settingId);

    if (!setting) {
      return;
    }

    this.selectedSettingSignal.set(setting);
    this.modalModeSignal.set('delete');
  }

  closeModal(): void {
    this.modalModeSignal.set(null);
    this.selectedSettingSignal.set(null);
  }

  toggleReadVisibility(): void {
    if (!this.hasSettings()) {
      return;
    }

    this.isReadVisibleSignal.update((currentValue) => !currentValue);
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
      this.setErrorFeedback('pages.admin.portfolioSettings.feedback.missingSession');
      return;
    }

    switch (this.modalMode()) {
      case 'create':
      case 'update': {
        const payload = this.buildMutationPayload();

        if (!payload) {
          return;
        }

        await this.submitUpsert(accessToken, payload);
        return;
      }
      case 'delete':
        await this.submitDelete(accessToken);
        return;
      default:
        return;
    }
  }

  protected trackSettingById(index: number, setting: { id: string }): string {
    return setting.id;
  }

  private async loadSettings(): Promise<void> {
    this.isLoadingSignal.set(true);
    this.loadErrorKeySignal.set(null);

    try {
      const response = await firstValueFrom(this.portfolioSettingsApiService.getAll());
      this.settingsSignal.set(response.data);
    } catch {
      this.loadErrorKeySignal.set('pages.admin.portfolioSettings.feedback.loadError');
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  private buildMutationPayload(): PortfolioSettingMutationPayload | null {
    const formValue = this.form();

    if (!formValue.key.trim()) {
      this.setErrorFeedback('pages.admin.portfolioSettings.feedback.requiredKey');
      return null;
    }

    const parsedValue = parsePortfolioSettingsJsonValue(formValue.valueText);

    if (!parsedValue.isValid) {
      this.setErrorFeedback(parsedValue.errorKey);
      return null;
    }

    return {
      key: formValue.key.trim(),
      value: parsedValue.value,
      description: formValue.description.trim(),
    };
  }

  private async submitUpsert(
    accessToken: string,
    payload: PortfolioSettingMutationPayload,
  ): Promise<void> {
    this.isSubmittingSignal.set(true);

    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(
          this.portfolioSettingsApiService.create(accessToken, payload),
        );

        this.setSuccessFeedback('pages.admin.portfolioSettings.feedback.created');
      } else {
        const selectedSetting = this.selectedSetting();

        if (!selectedSetting) {
          this.setErrorFeedback(
            'pages.admin.portfolioSettings.feedback.selectionRequired',
          );
          return;
        }

        await firstValueFrom(
          this.portfolioSettingsApiService.update(
            accessToken,
            selectedSetting.id,
            payload,
          ),
        );

        this.setSuccessFeedback('pages.admin.portfolioSettings.feedback.updated');
      }

      this.closeModal();
      await this.loadSettings();
    } catch {
      this.setErrorFeedback('pages.admin.portfolioSettings.feedback.saveError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private async submitDelete(accessToken: string): Promise<void> {
    const selectedSetting = this.selectedSetting();

    if (!selectedSetting) {
      this.setErrorFeedback('pages.admin.portfolioSettings.feedback.selectionRequired');
      return;
    }

    this.isSubmittingSignal.set(true);

    try {
      await firstValueFrom(
        this.portfolioSettingsApiService.delete(accessToken, selectedSetting.id),
      );

      this.closeModal();
      this.setSuccessFeedback('pages.admin.portfolioSettings.feedback.deleted');
      await this.loadSettings();
    } catch {
      this.setErrorFeedback('pages.admin.portfolioSettings.feedback.deleteError');
    } finally {
      this.isSubmittingSignal.set(false);
    }
  }

  private patchForm(patch: Partial<PortfolioSettingsFormValue>): void {
    this.formSignal.update((formValue) => ({
      ...formValue,
      ...patch,
    }));
  }

  private setSuccessFeedback(feedbackKey: AppTranslationKey): void {
    this.feedbackKeySignal.set(feedbackKey);
    this.feedbackToneSignal.set('success');
  }

  private setErrorFeedback(feedbackKey: AppTranslationKey): void {
    this.feedbackKeySignal.set(feedbackKey);
    this.feedbackToneSignal.set('error');
  }
}
