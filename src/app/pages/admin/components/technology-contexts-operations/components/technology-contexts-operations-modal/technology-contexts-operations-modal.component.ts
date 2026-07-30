import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import { TranslationService } from '../../../../../../core/translation/translation.service';
import { OperationsModalComponent } from '../../../../../../shared/operations/operations-modal/operations-modal.component';
import {
  OperationsDetailedItemViewModel,
  OperationsItemViewModel,
} from '../../../../../../shared/operations/operations.types';
import {
  createAdminFieldLabelResolver,
  resolveAdminSelectValue,
  trackAdminItemById,
} from '../../../../helpers/admin.helper';
import {
  AdminCollectionPagination,
  createAdminCollectionPagination,
} from '../../../../admin.types';
import { TechnologyContextRecord } from '../../../../../../core/api/technology-contexts/technology-contexts-operations.types';
import {
  TECHNOLOGY_CONTEXT_FIELDS,
  TechnologyContextFormValue,
  TechnologyContextTechnologyOption,
  TechnologyContextViewModel,
  TechnologyContextsOperationsModalMode,
  createEmptyTechnologyContextFormValue,
} from '../../technology-contexts-operations.types';
import { buildTechnologyContextViewModels } from '../../helpers/technology-contexts-operations.helper';

@Component({
  selector: 'app-technology-contexts-operations-modal',
  standalone: true,
  imports: [OperationsModalComponent],
  templateUrl: './technology-contexts-operations-modal.component.html',
  styleUrl: './technology-contexts-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyContextsOperationsModalComponent {
  private readonly translation = inject(TranslationService);
  readonly isOpen = input(false);
  readonly modalTitleKey = input<AppTranslationKey>(
    'pages.admin.technologyContexts.modal.create.title',
  );
  readonly modalMode = input<TechnologyContextsOperationsModalMode | null>(null);
  readonly records = input<readonly TechnologyContextViewModel[]>([]);
  readonly selectedRecord = input<TechnologyContextRecord | null>(null);
  readonly form = input<TechnologyContextFormValue>(createEmptyTechnologyContextFormValue());
  readonly technologyOptions = input<readonly TechnologyContextTechnologyOption[]>([]);
  readonly contextOptions = input<readonly { value: string; label: string }[]>([]);
  readonly pagination = input<AdminCollectionPagination>(createAdminCollectionPagination());
  readonly searchValue = input('');
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly feedbackTone = input<'success' | 'error' | null>(null);
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);
  readonly closed = output<void>();
  readonly searchChanged = output<string>();
  readonly submitted = output<void>();
  readonly pageSelected = output<number>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly fieldChanged = output<{ field: keyof TechnologyContextFormValue; value: string }>();
  protected readonly fields = TECHNOLOGY_CONTEXT_FIELDS;
  protected readonly trackById = trackAdminItemById;
  protected readonly resolveFieldLabel = createAdminFieldLabelResolver(
    this.fields,
    this.translation.instant.bind(this.translation),
  );
  protected readonly resolveSelectValue = resolveAdminSelectValue;
  protected readonly selectedRecordViewModel = computed(() => {
    const record = this.selectedRecord();
    return record ? buildTechnologyContextViewModels([record], this.translation)[0] : null;
  });
  protected readonly descriptionKey = computed<AppTranslationKey | null>(() => {
    switch (this.modalMode()) {
      case 'read':
        return 'pages.admin.technologyContexts.modal.read.description';
      case 'pick-update':
        return 'pages.admin.technologyContexts.modal.pickUpdate.description';
      case 'pick-delete':
        return 'pages.admin.technologyContexts.modal.pickDelete.description';
      case 'delete':
        return 'pages.admin.technologyContexts.modal.delete.description';
      default:
        return null;
    }
  });
  protected readonly showPagination = computed(() =>
    ['read', 'pick-update', 'pick-delete'].includes(this.modalMode() ?? ''),
  );
  protected readonly showSubmit = computed(() =>
    ['create', 'update', 'delete'].includes(this.modalMode() ?? ''),
  );
  protected readonly submitLabelKey = computed<AppTranslationKey>(() =>
    this.modalMode() === 'delete' ? 'pages.admin.operations.delete' : 'common.actions.save',
  );
  protected readonly operationItems = computed<readonly OperationsItemViewModel[]>(() =>
    this.records().map((record) => ({
      id: record.id,
      title: `${record.technologyName} (${record.contextLabel})`,
      subtitle: record.dateRangeLabel,
    })),
  );
  protected readonly detailedOperationItems = computed<readonly OperationsDetailedItemViewModel[]>(
    () =>
      this.records().map((record) => ({
        id: record.id,
        title: record.technologyName,
        subtitle: record.contextLabel,
        fields: [
          {
            labelKey: 'pages.admin.technologyContexts.card.technology',
            value: record.technologyName,
          },
          {
            labelKey: 'pages.admin.technologyContexts.fields.context.label',
            value: record.contextLabel,
          },
          {
            labelKey: 'pages.admin.operations.date',
            value: record.dateRangeLabel,
          },
        ],
      })),
  );
  protected readonly selectedOperationItem = computed<OperationsItemViewModel | null>(() => {
    const record = this.selectedRecordViewModel();
    return record
      ? {
          id: record.id,
          title: `${record.technologyName} (${record.contextLabel})`,
          subtitle: record.dateRangeLabel,
        }
      : null;
  });
  protected change(field: keyof TechnologyContextFormValue, event: Event): void {
    this.fieldChanged.emit({
      field,
      value:
        resolveAdminSelectValue(event) || (event.target as HTMLInputElement | null)?.value || '',
    });
  }
  protected submit(): void {
    this.submitted.emit();
  }
}
