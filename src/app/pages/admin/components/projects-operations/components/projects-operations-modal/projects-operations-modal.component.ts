import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import { ProjectRecord } from '../../../../../../core/api/admin/projects/projects-operations.types';
import { OperationsModalComponent } from '../../../../../../shared/operations/operations-modal/operations-modal.component';
import {
  AdminCollectionPagination,
  createAdminCollectionPagination,
} from '../../../../admin.types';
import {
  ProjectOption,
  ProjectsOperationsFormValue,
  ProjectsOperationsModalMode,
  PROJECT_CONTEXT_VALUES,
  PROJECT_ENVIRONMENT_VALUES,
  PROJECT_STATUS_VALUES,
} from '../../projects-operations.types';

@Component({
  selector: 'app-projects-operations-modal',
  standalone: true,
  imports: [OperationsModalComponent],
  templateUrl: './projects-operations-modal.component.html',
  styleUrl: './projects-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsOperationsModalComponent {
  readonly isOpen = input(false);
  readonly modalMode = input<ProjectsOperationsModalMode | null>(null);
  readonly modalTitleKey = input<AppTranslationKey>('pages.admin.projects.modal.create.title');
  readonly projects = input<readonly ProjectRecord[]>([]);
  readonly selectedProject = input<ProjectRecord | null>(null);
  readonly form = input<ProjectsOperationsFormValue>();
  readonly technologyOptions = input<readonly ProjectOption[]>([]);
  readonly experienceOptions = input<readonly ProjectOption[]>([]);
  readonly tagOptions = input<readonly ProjectOption[]>([]);
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
  readonly booleanChanged = output<{ field: 'featured' | 'highlight'; value: boolean }>();
  readonly relationToggled = output<{
    field: 'technologyIds' | 'experienceIds' | 'tagIds' | 'linkIds' | 'imageAssetIds';
    id: string;
  }>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();
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
  protected readonly contextOptions = PROJECT_CONTEXT_VALUES.map((value) => ({
    value,
    label: value,
  }));
  protected readonly statusOptions = PROJECT_STATUS_VALUES.map((value) => ({
    value,
    label: value,
  }));
  protected readonly environmentOptions = PROJECT_ENVIRONMENT_VALUES.map((value) => ({
    value,
    label: value,
  }));
  protected emit(field: keyof ProjectsOperationsFormValue, event: Event): void {
    this.fieldChanged.emit({
      field,
      value:
        (event.target as HTMLInputElement)?.value ?? (event as CustomEvent<string>).detail ?? '',
    });
  }
  protected select(field: keyof ProjectsOperationsFormValue, event: Event): void {
    this.fieldChanged.emit({
      field,
      value: String(
        (event as CustomEvent<string>).detail ?? (event.target as HTMLInputElement)?.value ?? '',
      ),
    });
  }
  protected toggle(field: 'featured' | 'highlight', event: Event): void {
    this.booleanChanged.emit({
      field,
      value: Boolean(
        (event as CustomEvent<boolean>).detail ?? (event.target as HTMLInputElement)?.checked,
      ),
    });
  }
  protected relation(
    field: 'technologyIds' | 'experienceIds' | 'tagIds' | 'linkIds' | 'imageAssetIds',
    id: string,
  ): void {
    this.relationToggled.emit({ field, id });
  }
  protected selected(
    field: 'technologyIds' | 'experienceIds' | 'tagIds' | 'linkIds' | 'imageAssetIds',
    id: string,
  ): boolean {
    return this.form()?.[field].includes(id) ?? false;
  }
}
