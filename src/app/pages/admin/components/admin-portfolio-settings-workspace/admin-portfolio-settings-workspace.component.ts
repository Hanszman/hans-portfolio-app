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
import { AdminPortfolioSettingsApiService } from '../../../../core/api/admin-portfolio-settings/admin-portfolio-settings-api.service';
import {
  AdminPortfolioSettingMutationPayload,
  AdminPortfolioSettingRecord,
} from '../../../../core/api/admin-portfolio-settings/admin-portfolio-settings-api.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { AppTranslationKey } from '../../../../core/translation/translation.types';
import { InfoStateComponent } from '../../../../shared/info-state/info-state.component';
import { SectionHeaderComponent } from '../../../../shared/section-header/section-header.component';
import {
  buildAdminPortfolioSettingsFormValue,
  buildAdminPortfolioSettingsViewModels,
  parseAdminPortfolioSettingsJsonValue,
} from '../../helpers/admin-portfolio-settings.helper';
import {
  AdminPortfolioSettingsFormValue,
  AdminPortfolioSettingsModalMode,
  createEmptyAdminPortfolioSettingsFormValue,
} from './admin-portfolio-settings-workspace.types';

@Component({
  selector: 'app-admin-portfolio-settings-workspace',
  standalone: true,
  imports: [TranslatePipe, SectionHeaderComponent, InfoStateComponent],
  templateUrl: './admin-portfolio-settings-workspace.component.html',
  styleUrl: './admin-portfolio-settings-workspace.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPortfolioSettingsWorkspaceComponent implements OnInit {
  private readonly adminPortfolioSettingsApiService = inject(
    AdminPortfolioSettingsApiService,
  );
  private readonly adminSessionService = inject(AdminSessionService);

  private readonly settingsSignal = signal<readonly AdminPortfolioSettingRecord[]>([]);
  private readonly isLoadingSignal = signal(true);
  private readonly isSubmittingSignal = signal(false);
  private readonly loadErrorKeySignal = signal<AppTranslationKey | null>(null);
  private readonly feedbackKeySignal = signal<AppTranslationKey | null>(null);
  private readonly feedbackToneSignal = signal<'success' | 'error' | null>(null);
  private readonly modalModeSignal =
    signal<AdminPortfolioSettingsModalMode | null>(null);
  private readonly selectedSettingSignal =
    signal<AdminPortfolioSettingRecord | null>(null);
  private readonly formSignal = signal<AdminPortfolioSettingsFormValue>(
    createEmptyAdminPortfolioSettingsFormValue(),
  );

  protected readonly settings = computed(() =>
    buildAdminPortfolioSettingsViewModels(this.settingsSignal()),
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
    this.formSignal.set(createEmptyAdminPortfolioSettingsFormValue());
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
    this.formSignal.set(buildAdminPortfolioSettingsFormValue(setting));
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
    const accessToken = this.adminSessionService.accessToken();

    if (!accessToken) {
      this.isLoadingSignal.set(false);
      this.loadErrorKeySignal.set(
        'pages.admin.portfolioSettings.feedback.missingSession',
      );
      return;
    }

    this.isLoadingSignal.set(true);
    this.loadErrorKeySignal.set(null);

    try {
      const settings = await firstValueFrom(
        this.adminPortfolioSettingsApiService.getAll(accessToken),
      );

      this.settingsSignal.set(settings);
    } catch {
      this.loadErrorKeySignal.set('pages.admin.portfolioSettings.feedback.loadError');
    } finally {
      this.isLoadingSignal.set(false);
    }
  }

  private buildMutationPayload(): AdminPortfolioSettingMutationPayload | null {
    const formValue = this.form();

    if (!formValue.key.trim()) {
      this.setErrorFeedback('pages.admin.portfolioSettings.feedback.requiredKey');
      return null;
    }

    const parsedValue = parseAdminPortfolioSettingsJsonValue(formValue.valueText);

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
    payload: AdminPortfolioSettingMutationPayload,
  ): Promise<void> {
    this.isSubmittingSignal.set(true);

    try {
      if (this.modalMode() === 'create') {
        await firstValueFrom(
          this.adminPortfolioSettingsApiService.create(accessToken, payload),
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
          this.adminPortfolioSettingsApiService.update(
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
        this.adminPortfolioSettingsApiService.delete(accessToken, selectedSetting.id),
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

  private patchForm(patch: Partial<AdminPortfolioSettingsFormValue>): void {
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
