import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioSettingRecord } from '../../../../../../core/api/admin/portfolio-settings/portfolio-settings-api.types';
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import {
  PortfolioSettingsFormValue,
  PortfolioSettingsModalMode,
  PortfolioSettingViewModel,
} from '../../portfolio-settings.types';

@Component({
  selector: 'app-portfolio-settings-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './portfolio-settings-modal.component.html',
  styleUrl: './portfolio-settings-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioSettingsModalComponent {
  readonly isOpen = input(false);
  readonly modalTitleKey = input<AppTranslationKey>(
    'pages.admin.portfolioSettings.modal.create.title',
  );
  readonly modalMode = input<PortfolioSettingsModalMode | null>(null);
  readonly settings = input<readonly PortfolioSettingViewModel[]>([]);
  readonly selectedSetting = input<PortfolioSettingRecord | null>(null);
  readonly form = input<PortfolioSettingsFormValue>({
    key: '',
    description: '',
    valueText: '',
  });
  readonly isSubmitting = input(false);

  readonly closed = output<void>();
  readonly keyChanged = output<string>();
  readonly descriptionChanged = output<string>();
  readonly valueTextChanged = output<string>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();

  protected requestClose(): void {
    this.closed.emit();
  }

  protected submit(): void {
    this.submitted.emit();
  }

  protected emitKeyChange(value: string): void {
    this.keyChanged.emit(value);
  }

  protected emitDescriptionChange(value: string): void {
    this.descriptionChanged.emit(value);
  }

  protected emitValueTextChange(value: string): void {
    this.valueTextChanged.emit(value);
  }

  protected selectSettingForUpdate(settingId: string): void {
    this.updateSelected.emit(settingId);
  }

  protected selectSettingForDelete(settingId: string): void {
    this.deleteSelected.emit(settingId);
  }

  protected trackSettingById(index: number, setting: { id: string }): string {
    return setting.id;
  }
}
