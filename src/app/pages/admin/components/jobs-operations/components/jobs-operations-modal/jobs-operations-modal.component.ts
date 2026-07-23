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
import { JobRecord } from '../../../../../../core/api/admin/jobs/jobs-operations.types';
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
  JOBS_OPERATIONS_FIELDS,
  JobExperienceOptionViewModel,
  JobImageAssetOptionViewModel,
  JobOperationsViewModel,
  JobsOperationsFormValue,
  JobsOperationsModalMode,
  createEmptyJobsOperationsFormValue,
} from '../../jobs-operations.types';

@Component({
  selector: 'app-jobs-operations-modal',
  standalone: true,
  imports: [TranslatePipe, OperationsModalComponent],
  templateUrl: './jobs-operations-modal.component.html',
  styleUrl: './jobs-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsOperationsModalComponent {
  private readonly translation = inject(TranslationService);

  readonly isOpen = input(false);
  readonly modalTitleKey = input<AppTranslationKey>(
    'pages.admin.jobs.modal.create.title',
  );
  readonly modalMode = input<JobsOperationsModalMode | null>(null);
  readonly jobs = input<readonly JobOperationsViewModel[]>([]);
  readonly selectedJob = input<JobRecord | null>(null);
  readonly form = input<JobsOperationsFormValue>(createEmptyJobsOperationsFormValue());
  readonly experienceOptions = input<readonly JobExperienceOptionViewModel[]>([]);
  readonly imageAssetOptions = input<readonly JobImageAssetOptionViewModel[]>([]);
  readonly pagination = input<AdminCollectionPagination>(createAdminCollectionPagination());
  readonly searchValue = input('');
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly feedbackTone = input<'success' | 'error' | null>(null);
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);

  readonly closed = output<void>();
  readonly searchChanged = output<string>();
  readonly slugChanged = output<string>();
  readonly namePtChanged = output<string>();
  readonly nameEnChanged = output<string>();
  readonly summaryPtChanged = output<string>();
  readonly summaryEnChanged = output<string>();
  readonly highlightChanged = output<boolean>();
  readonly sortOrderChanged = output<string>();
  readonly experienceToggled = output<string>();
  readonly imageAssetToggled = output<string>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();

  protected readonly fields = JOBS_OPERATIONS_FIELDS;
  protected readonly trackById = trackAdminItemById;
  protected readonly resolveFieldLabel = createAdminFieldLabelResolver(
    this.fields,
    this.translation.instant.bind(this.translation),
  );

  protected readonly descriptionKey = computed<AppTranslationKey | null>(() => {
    switch (this.modalMode()) {
      case 'read':
        return 'pages.admin.jobs.modal.read.description';
      case 'pick-update':
        return 'pages.admin.jobs.modal.pickUpdate.description';
      case 'pick-delete':
        return 'pages.admin.jobs.modal.pickDelete.description';
      case 'delete':
        return 'pages.admin.jobs.modal.delete.description';
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

  protected emitSlugChange(value: string): void {
    this.slugChanged.emit(value);
  }

  protected emitNamePtChange(value: string): void {
    this.namePtChanged.emit(value);
  }

  protected emitNameEnChange(value: string): void {
    this.nameEnChanged.emit(value);
  }

  protected emitSummaryPtChange(value: string): void {
    this.summaryPtChanged.emit(value);
  }

  protected emitSummaryEnChange(value: string): void {
    this.summaryEnChanged.emit(value);
  }

  protected emitSortOrderChange(value: string): void {
    this.sortOrderChanged.emit(value);
  }

  protected emitHighlightChange(event: Event): void {
    const customEvent = event as Event & {
      detail?: boolean;
      target: (EventTarget & { checked?: boolean }) | null;
    };

    if (typeof customEvent.detail === 'boolean') {
      this.highlightChanged.emit(customEvent.detail);
      return;
    }

    this.highlightChanged.emit(Boolean(customEvent.target?.checked));
  }

  protected toggleExperience(experienceId: string): void {
    this.experienceToggled.emit(experienceId);
  }

  protected toggleImageAsset(imageAssetId: string): void {
    this.imageAssetToggled.emit(imageAssetId);
  }

  protected selectJobForUpdate(jobId: string): void {
    this.updateSelected.emit(jobId);
  }

  protected selectJobForDelete(jobId: string): void {
    this.deleteSelected.emit(jobId);
  }

  protected selectPage(page: number): void {
    this.pageSelected.emit(page);
  }

  protected isExperienceSelected(experienceId: string): boolean {
    return this.form().experienceIds.includes(experienceId);
  }

  protected isImageAssetSelected(imageAssetId: string): boolean {
    return this.form().imageAssetIds.includes(imageAssetId);
  }
}
