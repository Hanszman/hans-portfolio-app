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
import { PaginationControlsComponent } from '../../../../../../shared/pagination-controls/pagination-controls.component';
import { AdminCollectionPagination } from '../../../../admin.types';
import {
  PortfolioSettingsOperationsFormValue,
  PortfolioSettingsOperationsModalMode,
  PortfolioSettingOperationsViewModel,
} from '../../portfolio-settings-operations.types';

@Component({
  selector: 'app-portfolio-settings-operations-modal',
  standalone: true,
  imports: [TranslatePipe, PaginationControlsComponent],
  templateUrl: './portfolio-settings-operations-modal.component.html',
  styleUrl: './portfolio-settings-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioSettingsOperationsModalComponent {
  readonly isOpen = input(false);
  readonly modalTitleKey = input<AppTranslationKey>(
    'pages.admin.portfolioSettings.modal.create.title',
  );
  readonly modalMode = input<PortfolioSettingsOperationsModalMode | null>(null);
  readonly settings = input<readonly PortfolioSettingOperationsViewModel[]>([]);
  readonly selectedSetting = input<PortfolioSettingRecord | null>(null);
  readonly form = input<PortfolioSettingsOperationsFormValue>({
    key: '',
    description: '',
    valueText: '',
  });
  readonly pagination = input<AdminCollectionPagination>({
    page: 1,
    pageSize: 6,
    totalItems: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly feedbackTone = input<'success' | 'error' | null>(null);
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);

  readonly closed = output<void>();
  readonly keyChanged = output<string>();
  readonly descriptionChanged = output<string>();
  readonly valueTextChanged = output<string>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();

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

  protected selectPage(page: number): void {
    this.pageSelected.emit(page);
  }

  protected trackSettingById(index: number, setting: { id: string }): string {
    return setting.id;
  }
}
