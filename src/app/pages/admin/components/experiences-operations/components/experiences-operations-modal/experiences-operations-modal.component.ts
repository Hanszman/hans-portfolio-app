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
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import { ExperienceRecord } from '../../../../../../core/api/admin/experiences/experiences-operations.types';
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
import { resolveAdminSelectValue } from '../../../../helpers/admin.helper';
import {
  ExperienceOption,
  ExperiencesOperationsFormValue,
  ExperiencesOperationsModalMode,
  EXPERIENCES_OPERATIONS_FIELDS,
  EXPERIENCES_OPERATIONS_FORM_FIELDS,
} from '../../experiences-operations.types';

@Component({
  selector: 'app-experiences-operations-modal',
  standalone: true,
  imports: [OperationsModalComponent, OperationsRelationPickerComponent, TranslatePipe],
  templateUrl: './experiences-operations-modal.component.html',
  styleUrl: './experiences-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperiencesOperationsModalComponent {
  private readonly translation = inject(TranslationService);
  readonly isOpen = input(false);
  readonly modalMode = input<ExperiencesOperationsModalMode | null>(null);
  readonly modalTitleKey = input<AppTranslationKey>('pages.admin.experiences.modal.create.title');
  readonly experiences = input<readonly ExperienceRecord[]>([]);
  readonly selectedExperience = input<ExperienceRecord | null>(null);
  readonly form = input<ExperiencesOperationsFormValue>();
  readonly technologyOptions = input<readonly ExperienceOption[]>([]);
  readonly projectOptions = input<readonly ExperienceOption[]>([]);
  readonly customerOptions = input<readonly ExperienceOption[]>([]);
  readonly jobOptions = input<readonly ExperienceOption[]>([]);
  readonly linkOptions = input<readonly ExperienceOption[]>([]);
  readonly imageAssetOptions = input<readonly (ExperienceOption & { imageUrl: string })[]>([]);
  readonly pagination = input<AdminCollectionPagination>(createAdminCollectionPagination());
  readonly searchValue = input('');
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);
  readonly closed = output<void>();
  readonly searchChanged = output<string>();
  readonly fieldChanged = output<{ field: keyof ExperiencesOperationsFormValue; value: string }>();
  readonly booleanChanged = output<{ field: 'isCurrent' | 'highlight'; value: boolean }>();
  readonly relationToggled = output<{
    field: 'technologyIds' | 'projectIds' | 'customerIds' | 'jobIds' | 'linkIds' | 'imageAssetIds';
    id: string;
  }>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();
  protected readonly formFields = EXPERIENCES_OPERATIONS_FORM_FIELDS;
  protected readonly fieldDefinitions = EXPERIENCES_OPERATIONS_FIELDS;
  protected readonly showPagination = computed(() =>
    ['read', 'pick-update', 'pick-delete'].includes(this.modalMode() ?? ''),
  );
  protected readonly showSubmit = computed(() =>
    ['create', 'update', 'delete'].includes(this.modalMode() ?? ''),
  );
  protected readonly descriptionKey = computed<AppTranslationKey | null>(() => {
    const mode = this.modalMode();
    return mode === 'read'
      ? 'pages.admin.experiences.modal.read.description'
      : mode === 'pick-update'
        ? 'pages.admin.experiences.modal.pickUpdate.description'
        : mode === 'pick-delete'
          ? 'pages.admin.experiences.modal.pickDelete.description'
          : mode === 'delete'
            ? 'pages.admin.experiences.modal.delete.description'
            : null;
  });
  protected readonly submitLabelKey = computed<AppTranslationKey>(() =>
    this.modalMode() === 'delete' ? 'pages.admin.operations.delete' : 'common.actions.save',
  );
  protected readonly operationItems = computed<readonly OperationsItemViewModel[]>(() =>
    this.experiences().map((experience) => this.toOperationsItem(experience)),
  );
  protected readonly detailedOperationItems = computed<readonly OperationsDetailedItemViewModel[]>(
    () =>
      this.experiences().map((experience) => ({
        ...this.toOperationsItem(experience),
        fields: [
          {
            labelKey: 'pages.admin.experiences.fields.slug.label',
            value: experience.slug,
          },
          {
            labelKey: 'pages.admin.experiences.fields.companyName.label',
            value: experience.companyName,
          },
          {
            labelKey: 'pages.admin.experiences.fields.titlePt.label',
            value: experience.titlePt,
          },
          {
            labelKey: 'pages.admin.experiences.fields.titleEn.label',
            value: experience.titleEn,
          },
          {
            labelKey: 'pages.admin.experiences.fields.startDate.label',
            value: experience.startDate,
          },
          {
            labelKey: 'pages.admin.experiences.fields.endDate.label',
            value: experience.endDate ?? '',
          },
        ],
      })),
  );
  protected readonly selectedOperationItem = computed<OperationsItemViewModel | null>(() => {
    const experience = this.selectedExperience();
    return experience ? this.toOperationsItem(experience) : null;
  });
  protected resolveFieldLabel(field: keyof typeof EXPERIENCES_OPERATIONS_FIELDS): string {
    this.translation.locale();
    return this.translation.instant(EXPERIENCES_OPERATIONS_FIELDS[field].labelKey);
  }
  protected resolveFieldPlaceholder(field: keyof typeof EXPERIENCES_OPERATIONS_FIELDS): string {
    this.translation.locale();
    return this.translation.instant(EXPERIENCES_OPERATIONS_FIELDS[field].placeholderKey);
  }
  protected emit(field: keyof ExperiencesOperationsFormValue, event: Event): void {
    this.fieldChanged.emit({ field, value: resolveAdminSelectValue(event) });
  }
  protected toggle(field: 'isCurrent' | 'highlight', event: Event): void {
    this.booleanChanged.emit({
      field,
      value: Boolean(
        (event as CustomEvent<boolean>).detail ?? (event.target as HTMLInputElement)?.checked,
      ),
    });
  }
  protected relation(
    field: 'technologyIds' | 'projectIds' | 'customerIds' | 'jobIds' | 'linkIds' | 'imageAssetIds',
    id: string,
  ): void {
    this.relationToggled.emit({ field, id });
  }
  protected optionSelected(id: string): void {
    this.updateSelected.emit(id);
  }
  protected deleteOption(id: string): void {
    this.deleteSelected.emit(id);
  }
  protected selected(
    field: 'technologyIds' | 'projectIds' | 'customerIds' | 'jobIds' | 'linkIds' | 'imageAssetIds',
    id: string,
  ): boolean {
    return this.form()?.[field].includes(id) ?? false;
  }

  private toOperationsItem(experience: ExperienceRecord): OperationsItemViewModel {
    return {
      id: experience.id,
      title: `${experience.companyName} (${experience.slug})`,
      subtitle: experience.titleEn,
    };
  }
}
