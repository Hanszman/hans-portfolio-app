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
import { TranslationService } from '../../../../../../core/translation/translation.service';
import { OperationsModalComponent } from '../../../../../../shared/operations/operations-modal/operations-modal.component';
import { RelationPickerComponent } from '../../../../../../shared/operations/relation-picker/relation-picker.component';
import {
  AdminCollectionPagination,
  createAdminCollectionPagination,
} from '../../../../admin.types';
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import {
  TECHNOLOGIES_OPERATIONS_FIELDS,
  TechnologyImageAssetOptionViewModel,
  TechnologyOperationsViewModel,
  TechnologiesOperationsFormValue,
  TechnologiesOperationsModalMode,
  createEmptyTechnologiesOperationsFormValue,
} from '../../technologies-operations.types';
import { TechnologyAdminRecord } from '../../../../../../core/api/technologies/technologies.types';
import {
  createAdminFieldLabelResolver,
  createAdminSelectOptionDefinitions,
  resolveAdminSelectValue,
  translateAdminSelectOptions,
} from '../../../../helpers/admin.helper';
import { AdminSelectOptionViewModel } from '../../../../helpers/admin.helper';
import {
  TECHNOLOGY_CATEGORY_VALUES,
  TECHNOLOGY_FREQUENCY_VALUES,
  TECHNOLOGY_LEVEL_VALUES,
} from '../../technologies-operations.types';

@Component({
  selector: 'app-technologies-operations-modal',
  standalone: true,
  imports: [TranslatePipe, OperationsModalComponent, RelationPickerComponent],
  templateUrl: './technologies-operations-modal.component.html',
  styleUrl: './technologies-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologiesOperationsModalComponent {
  private readonly translation = inject(TranslationService);
  readonly isOpen = input(false);
  readonly modalTitleKey = input<AppTranslationKey>('pages.admin.technologies.modal.create.title');
  readonly modalMode = input<TechnologiesOperationsModalMode | null>(null);
  readonly technologies = input<readonly TechnologyOperationsViewModel[]>([]);
  readonly selectedTechnology = input<TechnologyAdminRecord | null>(null);
  readonly form = input<TechnologiesOperationsFormValue>(
    createEmptyTechnologiesOperationsFormValue(),
  );
  readonly imageOptions = input<readonly TechnologyImageAssetOptionViewModel[]>([]);
  readonly pagination = input<AdminCollectionPagination>(createAdminCollectionPagination());
  readonly searchValue = input('');
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly feedbackTone = input<'success' | 'error' | null>(null);
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);
  readonly closed = output<void>();
  readonly searchChanged = output<string>();
  readonly fieldChanged = output<{
    field: keyof TechnologiesOperationsFormValue;
    value: string | boolean;
  }>();
  readonly imageAssetToggled = output<string>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();

  protected readonly fields = TECHNOLOGIES_OPERATIONS_FIELDS;
  protected readonly showPagination = computed(() =>
    ['read', 'pick-update', 'pick-delete'].includes(this.modalMode() ?? ''),
  );
  protected readonly showSubmit = computed(() =>
    ['create', 'update', 'delete'].includes(this.modalMode() ?? ''),
  );
  protected readonly submitLabelKey = computed<AppTranslationKey>(() =>
    this.modalMode() === 'delete' ? 'pages.admin.operations.delete' : 'common.actions.save',
  );
  protected readonly resolveFieldLabel = createAdminFieldLabelResolver(
    this.fields,
    this.translation.instant.bind(this.translation),
  );
  protected readonly resolveSelectValue = resolveAdminSelectValue;
  protected readonly descriptionKey = computed<AppTranslationKey | null>(() => {
    switch (this.modalMode()) {
      case 'read': return 'pages.admin.technologies.modal.read.description';
      case 'pick-update': return 'pages.admin.technologies.modal.pickUpdate.description';
      case 'pick-delete': return 'pages.admin.technologies.modal.pickDelete.description';
      case 'delete': return 'pages.admin.technologies.modal.delete.description';
      default: return null;
    }
  });
  protected readonly categoryOptions = computed(() => this.getOptions(TECHNOLOGY_CATEGORY_VALUES));
  protected readonly levelOptions = computed(() => this.getOptions(TECHNOLOGY_LEVEL_VALUES));
  protected readonly frequencyOptions = computed(() =>
    this.getOptions(TECHNOLOGY_FREQUENCY_VALUES),
  );

  private getOptions<TValue extends string>(
    values: readonly TValue[],
  ): readonly AdminSelectOptionViewModel<TValue>[] {
    this.translation.locale();
    return translateAdminSelectOptions(
      createAdminSelectOptionDefinitions(
        values,
        (value) => `pages.admin.technologies.options.${value}` as AppTranslationKey,
      ),
      this.translation.instant.bind(this.translation),
    );
  }

  protected change(field: keyof TechnologiesOperationsFormValue, event: Event): void {
    this.fieldChanged.emit({
      field,
      value:
        resolveAdminSelectValue(event) || ((event.target as HTMLInputElement | null)?.value ?? ''),
    });
  }

  protected toggleHighlight(event: Event): void {
    const custom = event as Event & { detail?: boolean };
    this.fieldChanged.emit({
      field: 'highlight',
      value:
        typeof custom.detail === 'boolean'
          ? custom.detail
          : Boolean((event.target as HTMLInputElement | null)?.checked),
    });
  }

  protected submit(): void {
    this.submitted.emit();
  }
}
