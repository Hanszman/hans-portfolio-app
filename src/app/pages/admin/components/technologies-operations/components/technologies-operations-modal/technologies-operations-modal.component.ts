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
import { OperationsRelationPickerComponent } from '../../../../../../shared/operations/operations-relation-picker/operations-relation-picker.component';
import {
  OperationsDetailedItemViewModel,
  OperationsItemViewModel,
} from '../../../../../../shared/operations/operations.types';
import {
  AdminCollectionPagination,
  createAdminCollectionPagination,
} from '../../../../admin.types';
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import {
  TECHNOLOGIES_OPERATIONS_FIELDS,
  TechnologyImageAssetOptionViewModel,
  TechnologyRelationOptionViewModel,
  TechnologyOperationsViewModel,
  TechnologiesOperationsFormValue,
  TechnologiesOperationsModalMode,
  createEmptyTechnologiesOperationsFormValue,
} from '../../technologies-operations.types';
import { TechnologyAdminRecord } from '../../../../../../core/api/technologies/technologies.types';
import {
  createAdminFieldLabelResolver,
  createAdminSelectOptionDefinitions,
  formatAdminDateRangeForDisplay,
  resolveAdminSelectValue,
  translateAdminSelectOptions,
} from '../../../../helpers/admin.helper';
import { AdminSelectOptionViewModel } from '../../../../helpers/admin.helper';
import { TECHNOLOGY_CONTEXT_LABEL_KEYS } from '../../../technology-contexts-operations/technology-contexts-operations.types';
import {
  TECHNOLOGY_FREQUENCY_VALUES,
  TECHNOLOGY_LEVEL_VALUES,
  TECHNOLOGY_OPTION_LABEL_KEYS,
  TECHNOLOGY_STACK_VALUES,
  TECHNOLOGY_TYPE_VALUES,
  TechnologyOptionValue,
} from '../../technologies-operations.types';

@Component({
  selector: 'app-technologies-operations-modal',
  standalone: true,
  imports: [TranslatePipe, OperationsModalComponent, OperationsRelationPickerComponent],
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
  readonly projectOptions = input<readonly TechnologyRelationOptionViewModel[]>([]);
  readonly experienceOptions = input<readonly TechnologyRelationOptionViewModel[]>([]);
  readonly formationOptions = input<readonly TechnologyRelationOptionViewModel[]>([]);
  readonly linkOptions = input<readonly TechnologyRelationOptionViewModel[]>([]);
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
  readonly projectToggled = output<string>();
  readonly experienceToggled = output<string>();
  readonly formationToggled = output<string>();
  readonly linkToggled = output<string>();
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
  protected readonly operationItems = computed<readonly OperationsItemViewModel[]>(() =>
    this.technologies().map((technology) => ({
      id: technology.id,
      title: `${technology.name} (${technology.slug})`,
      subtitle: technology.type,
    })),
  );
  protected readonly detailedOperationItems = computed<readonly OperationsDetailedItemViewModel[]>(
    () => {
      this.translation.locale();
      const emptyRelations = this.translation.instant(
        'pages.admin.technologies.card.emptyRelations',
      );
      const relationValue = (labels?: readonly string[]): string =>
        labels?.join(', ') || emptyRelations;

      return this.technologies().map((technology) => ({
        id: technology.id,
        title: technology.slug,
        subtitle: technology.name,
        fields: [
          { labelKey: 'common.fields.slug', value: technology.slug },
          { labelKey: 'common.fields.name', value: technology.name },
          { labelKey: 'common.fields.stack', value: technology.stack ? this.translation.instant(TECHNOLOGY_OPTION_LABEL_KEYS[technology.stack]) : '-' },
          { labelKey: 'common.fields.type', value: technology.type ? this.translation.instant(TECHNOLOGY_OPTION_LABEL_KEYS[technology.type]) : '-' },
          { labelKey: 'common.fields.level', value: technology.level || '-' },
          {
            labelKey: 'common.fields.frequency',
            value: technology.frequency || '-',
          },
          {
            labelKey: 'pages.admin.technologies.card.highlight',
            value: this.translation.instant(
              technology.highlight
                ? 'pages.admin.technologies.fields.highlight.enabled'
                : 'pages.admin.technologies.fields.highlight.disabled',
            ),
          },
          {
            labelKey: 'pages.admin.technologies.card.technologyContexts',
            value:
              (technology.technologyContexts ?? [])
                .map(
                  (context) =>
                    `${this.translation.instant(
                      TECHNOLOGY_CONTEXT_LABEL_KEYS[context.context],
                    )}: ${formatAdminDateRangeForDisplay(
                      context.startedAt,
                      context.endedAt,
                      this.translation.locale(),
                    )}`,
                )
                .join(', ') || emptyRelations,
          },
          {
            labelKey: 'common.entities.projects',
            value: relationValue(technology.projectLabels),
          },
          {
            labelKey: 'common.entities.experiences',
            value: relationValue(technology.experienceLabels),
          },
          {
            labelKey: 'common.entities.formations',
            value: relationValue(technology.formationLabels),
          },
          {
            labelKey: 'common.entities.links',
            value: relationValue(technology.linkLabels),
          },
          {
            labelKey: 'common.entities.imageAssets',
            value: relationValue(technology.imageAssetLabels),
          },
        ],
      }));
    },
  );
  protected readonly selectedOperationItem = computed<OperationsItemViewModel | null>(() => {
    const technology = this.selectedTechnology();
    return technology
      ? {
          id: technology.id,
          title: `${technology.name} (${technology.slug})`,
          subtitle: technology.type,
        }
      : null;
  });
  protected readonly resolveFieldLabel = createAdminFieldLabelResolver(
    this.fields,
    this.translation.instant.bind(this.translation),
  );
  protected readonly resolveSelectValue = resolveAdminSelectValue;
  protected readonly descriptionKey = computed<AppTranslationKey | null>(() => {
    switch (this.modalMode()) {
      case 'read':
        return 'pages.admin.technologies.modal.read.description';
      case 'pick-update':
        return 'pages.admin.technologies.modal.pickUpdate.description';
      case 'pick-delete':
        return 'pages.admin.technologies.modal.pickDelete.description';
      case 'delete':
        return 'pages.admin.technologies.modal.delete.description';
      default:
        return null;
    }
  });
  protected readonly stackOptions = computed(() => this.getOptions(TECHNOLOGY_STACK_VALUES));
  protected readonly typeOptions = computed(() => this.getOptions(TECHNOLOGY_TYPE_VALUES));
  protected readonly levelOptions = computed(() => this.getOptions(TECHNOLOGY_LEVEL_VALUES));
  protected readonly frequencyOptions = computed(() =>
    this.getOptions(TECHNOLOGY_FREQUENCY_VALUES),
  );

  private getOptions<TValue extends TechnologyOptionValue>(
    values: readonly TValue[],
  ): readonly AdminSelectOptionViewModel<TValue>[] {
    this.translation.locale();
    return translateAdminSelectOptions(
      createAdminSelectOptionDefinitions(
        values,
        (value) => TECHNOLOGY_OPTION_LABEL_KEYS[value],
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
