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
import { resolveDatePickerFormat } from '../../../../../../core/date/app-date.helper';
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import { ProjectRecord } from '../../../../../../core/api/projects/projects.types';
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
import {
  formatAdminDateRangeForDisplay,
  resolveAdminFieldLabel,
  resolveAdminLocalizedValue,
  resolveAdminRelationLabels,
  resolveAdminSelectValue,
} from '../../../../helpers/admin.helper';
import {
  ProjectOption,
  ProjectsOperationsFormValue,
  ProjectsOperationsModalMode,
  PROJECT_CONTEXT_VALUES,
  PROJECT_ENVIRONMENT_VALUES,
  PROJECT_OPTION_LABEL_KEYS,
  PROJECT_STATUS_VALUES,
  PROJECTS_OPERATIONS_FIELDS,
  PROJECTS_OPERATIONS_FORM_FIELDS,
} from '../../projects-operations.types';

@Component({
  selector: 'app-projects-operations-modal',
  standalone: true,
  imports: [OperationsModalComponent, OperationsRelationPickerComponent, TranslatePipe],
  templateUrl: './projects-operations-modal.component.html',
  styleUrl: './projects-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsOperationsModalComponent {
  private readonly translation = inject(TranslationService);
  readonly isOpen = input(false);
  readonly modalMode = input<ProjectsOperationsModalMode | null>(null);
  readonly modalTitleKey = input<AppTranslationKey>('pages.admin.projects.modal.create.title');
  readonly projects = input<readonly ProjectRecord[]>([]);
  readonly selectedProject = input<ProjectRecord | null>(null);
  readonly form = input<ProjectsOperationsFormValue>();
  readonly technologyOptions = input<readonly ProjectOption[]>([]);
  readonly experienceOptions = input<readonly ProjectOption[]>([]);
  readonly linkOptions = input<readonly ProjectOption[]>([]);
  readonly imageAssetOptions = input<readonly (ProjectOption & { imageUrl: string })[]>([]);
  readonly pagination = input<AdminCollectionPagination>(createAdminCollectionPagination());
  readonly searchValue = input('');
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);
  readonly closed = output<void>();
  readonly searchChanged = output<string>();
  readonly fieldChanged = output<{ field: keyof ProjectsOperationsFormValue; value: string }>();
  readonly booleanChanged = output<{ field: 'highlight'; value: boolean }>();
  readonly relationToggled = output<{
    field: 'technologyIds' | 'experienceIds' | 'linkIds' | 'imageAssetIds';
    id: string;
  }>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();
  protected readonly formFields = PROJECTS_OPERATIONS_FORM_FIELDS;
  protected readonly datePickerFormat = computed(() =>
    resolveDatePickerFormat(this.translation.locale()),
  );
  protected readonly datePickerLocale = computed(() => this.translation.locale());
  protected readonly fieldDefinitions = PROJECTS_OPERATIONS_FIELDS;

  protected readonly showPagination = computed(() =>
    ['read', 'pick-update', 'pick-delete'].includes(this.modalMode() ?? ''),
  );

  protected readonly showSubmit = computed(() =>
    ['create', 'update', 'delete'].includes(this.modalMode() ?? ''),
  );

  protected readonly descriptionKey = computed<AppTranslationKey | null>(() => {
    const mode = this.modalMode();
    return mode === 'read'
      ? 'pages.admin.projects.modal.read.description'
      : mode === 'pick-update'
        ? 'pages.admin.projects.modal.pickUpdate.description'
        : mode === 'pick-delete'
          ? 'pages.admin.projects.modal.pickDelete.description'
          : mode === 'delete'
            ? 'pages.admin.projects.modal.delete.description'
            : null;
  });

  protected readonly submitLabelKey = computed<AppTranslationKey>(() =>
    this.modalMode() === 'delete' ? 'pages.admin.operations.delete' : 'common.actions.save',
  );

  protected readonly contextOptions = computed(() =>
    this.translateOptions(PROJECT_CONTEXT_VALUES, 'context'),
  );

  protected readonly statusOptions = computed(() =>
    this.translateOptions(PROJECT_STATUS_VALUES, 'status'),
  );

  protected readonly environmentOptions = computed(() =>
    this.translateOptions(PROJECT_ENVIRONMENT_VALUES, 'environment'),
  );

  protected readonly operationItems = computed<readonly OperationsItemViewModel[]>(() =>
    this.projects().map((project) => this.toOperationsItem(project)),
  );

  protected readonly detailedOperationItems = computed<readonly OperationsDetailedItemViewModel[]>(
    () => {
      this.translation.locale();
      const emptyRelations = this.translation.instant('pages.admin.operations.emptyRelations');
      const booleanLabel = (value: boolean | null | undefined): string =>
        this.translation.instant(
          value ? 'pages.admin.operations.yes' : 'pages.admin.operations.no',
        );
      const relationValue = (
        relations: readonly unknown[] | null | undefined,
        nestedKey: string,
      ): string =>
        resolveAdminRelationLabels(relations, nestedKey, this.translation.locale()).join(', ') ||
        emptyRelations;

      return this.projects().map((project) => ({
        ...this.toOperationsItem(project),
        fields: [
          { labelKey: 'common.fields.slug', value: project.slug },
          {
            labelKey: 'pages.admin.operations.localized.title',
            value: resolveAdminLocalizedValue(
              this.translation.locale(),
              project.titlePt,
              project.titleEn,
              project.titleEs,
            ),
          },
          {
            labelKey: 'common.fields.summary',
            value: resolveAdminLocalizedValue(
              this.translation.locale(),
              project.summaryPt,
              project.summaryEn,
              project.summaryEs,
            ),
          },
          {
            labelKey: 'common.fields.description',
            value: resolveAdminLocalizedValue(
              this.translation.locale(),
              project.descriptionPt,
              project.descriptionEn,
              project.descriptionEs,
            ),
          },
          {
            labelKey: 'pages.admin.projects.fields.context.label',
            value: this.translation.instant(
              `pages.admin.projects.fields.context.options.${project.context}` as AppTranslationKey,
            ),
          },
          {
            labelKey: 'pages.admin.projects.fields.status.label',
            value: this.translation.instant(
              `pages.admin.projects.fields.status.options.${project.status}` as AppTranslationKey,
            ),
          },
          {
            labelKey: 'common.fields.environment',
            value: this.translation.instant(
              `pages.admin.projects.fields.environment.options.${project.environment}` as AppTranslationKey,
            ),
          },
          {
            labelKey: 'common.fields.date',
            value: formatAdminDateRangeForDisplay(
              project.startDate,
              project.endDate,
              this.translation.locale(),
            ),
          },
          {
            labelKey: 'common.fields.highlightStatus',
            value: booleanLabel(project.highlight),
          },
          {
            labelKey: 'common.fields.sortOrder',
            value: String(project.sortOrder ?? 0),
          },
          {
            labelKey: 'common.relations.technologies',
            value: relationValue(project.technologies, 'technology'),
          },
          {
            labelKey: 'pages.admin.links.fields.experiences.label',
            value: relationValue(project.experiences, 'experience'),
          },
          {
            labelKey: 'common.relations.links',
            value: relationValue(project.links, 'link'),
          },
          {
            labelKey: 'common.relations.imageAssets',
            value: relationValue(project.imageAssets, 'imageAsset'),
          },
        ],
      }));
    },
  );

  protected readonly selectedOperationItem = computed<OperationsItemViewModel | null>(() => {
    const project = this.selectedProject();
    return project ? this.toOperationsItem(project) : null;
  });

  protected isMultilineField(field: (typeof PROJECTS_OPERATIONS_FORM_FIELDS)[number]): boolean {
    return (
      'multiline' in this.fieldDefinitions[field] && this.fieldDefinitions[field].multiline === true
    );
  }

  protected resolveFieldLabel(field: keyof typeof PROJECTS_OPERATIONS_FIELDS): string {
    this.translation.locale();
    return resolveAdminFieldLabel(PROJECTS_OPERATIONS_FIELDS[field], (key) =>
      this.translation.instant(key),
    );
  }

  protected resolveFieldPlaceholder(field: keyof typeof PROJECTS_OPERATIONS_FIELDS): string {
    this.translation.locale();
    return this.translation.instant(PROJECTS_OPERATIONS_FIELDS[field].placeholderKey);
  }

  private translateOptions(values: readonly string[], field: 'context' | 'status' | 'environment') {
    this.translation.locale();
    return values.map((value) => ({
      id: value,
      value,
      label: this.translation.instant(
        PROJECT_OPTION_LABEL_KEYS[field][
          value as keyof (typeof PROJECT_OPTION_LABEL_KEYS)[typeof field]
        ],
      ),
    }));
  }

  protected emit(field: keyof ProjectsOperationsFormValue, event: Event): void {
    this.fieldChanged.emit({
      field,
      value: resolveAdminSelectValue(event),
    });
  }

  protected select(field: keyof ProjectsOperationsFormValue, event: Event): void {
    this.fieldChanged.emit({
      field,
      value: resolveAdminSelectValue(event),
    });
  }

  protected toggle(field: 'highlight', event: Event): void {
    this.booleanChanged.emit({
      field,
      value: Boolean(
        (event as CustomEvent<boolean>).detail ?? (event.target as HTMLInputElement)?.checked,
      ),
    });
  }

  protected relation(
    field: 'technologyIds' | 'experienceIds' | 'linkIds' | 'imageAssetIds',
    id: string,
  ): void {
    this.relationToggled.emit({ field, id });
  }

  protected selected(
    field: 'technologyIds' | 'experienceIds' | 'linkIds' | 'imageAssetIds',
    id: string,
  ): boolean {
    return this.form()?.[field].includes(id) ?? false;
  }

  private toOperationsItem(project: ProjectRecord): OperationsItemViewModel {
    return {
      id: project.id,
      title: `${resolveAdminLocalizedValue(
        this.translation.locale(),
        project.titlePt,
        project.titleEn,
        project.titleEs,
      )} (${project.slug})`,
      subtitle: project.slug,
    };
  }
}
