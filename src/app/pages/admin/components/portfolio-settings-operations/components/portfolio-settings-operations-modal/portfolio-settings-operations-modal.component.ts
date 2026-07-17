import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { PortfolioSettingRecord } from '../../../../../../core/api/admin/portfolio-settings/portfolio-settings-operations.types';
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import { TranslationService } from '../../../../../../core/translation/translation.service';
import { OperationsModalComponent } from '../../../../../../shared/operations-modal/operations-modal.component';
import {
  createAdminFieldLabelResolver,
  trackAdminItemById,
} from '../../../../helpers/admin.helper';
import {
  AdminCollectionPagination,
  createAdminCollectionPagination,
} from '../../../../admin.types';
import {
  PORTFOLIO_SETTINGS_OPERATIONS_FIELDS,
  PortfolioSettingsOperationsFormValue,
  PortfolioSettingsOperationsModalMode,
  PortfolioSettingOperationsViewModel,
} from '../../portfolio-settings-operations.types';

@Component({
  selector: 'app-portfolio-settings-operations-modal',
  standalone: true,
  imports: [TranslatePipe, OperationsModalComponent],
  templateUrl: './portfolio-settings-operations-modal.component.html',
  styleUrl: './portfolio-settings-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioSettingsOperationsModalComponent {
  private readonly translation = inject(TranslationService);

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
  readonly pagination = input<AdminCollectionPagination>(
    createAdminCollectionPagination(),
  );
  readonly searchValue = input('');
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly feedbackTone = input<'success' | 'error' | null>(null);
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);

  readonly closed = output<void>();
  readonly searchChanged = output<string>();
  readonly keyChanged = output<string>();
  readonly descriptionChanged = output<string>();
  readonly valueTextChanged = output<string>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();

  protected readonly fields = PORTFOLIO_SETTINGS_OPERATIONS_FIELDS;
  protected readonly trackSettingById = trackAdminItemById;
  protected readonly resolveFieldLabel = createAdminFieldLabelResolver(
    this.fields,
    this.translation.instant.bind(this.translation),
  );

  protected readonly descriptionKey = computed<AppTranslationKey | null>(() => {
    switch (this.modalMode()) {
      case 'read':
        return 'pages.admin.portfolioSettings.modal.read.description';
      case 'pick-update':
        return 'pages.admin.portfolioSettings.modal.pickUpdate.description';
      case 'pick-delete':
        return 'pages.admin.portfolioSettings.modal.pickDelete.description';
      case 'delete':
        return 'pages.admin.portfolioSettings.modal.delete.description';
      default:
        return null;
    }
  });

  protected readonly showPagination = computed(() => {
    const mode = this.modalMode();
    return mode === 'read' || mode === 'pick-update' || mode === 'pick-delete';
  });

  protected readonly showSubmit = computed(() => {
    const mode = this.modalMode();
    return mode === 'create' || mode === 'update' || mode === 'delete';
  });

  protected readonly submitLabelKey = computed<AppTranslationKey>(() =>
    this.modalMode() === 'delete'
      ? 'pages.admin.operations.delete'
      : 'common.actions.save',
  );

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

}
