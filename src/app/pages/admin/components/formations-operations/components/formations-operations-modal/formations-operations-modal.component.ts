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
import { FormationRecord } from '../../../../../../core/api/admin/formations/formations-operations.types';
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import { TranslationService } from '../../../../../../core/translation/translation.service';
import { OperationsModalComponent } from '../../../../../../shared/operations/operations-modal/operations-modal.component';
import { TruncatedTextComponent } from '../../../../../../shared/truncated-text/truncated-text.component';
import {
  createAdminFieldLabelResolver,
  resolveAdminSelectValue,
  trackAdminItemById,
} from '../../../../helpers/admin.helper';
import {
  AdminCollectionPagination,
  createAdminCollectionPagination,
} from '../../../../admin.types';
import {
  FORMATIONS_OPERATIONS_FIELDS,
  FormationDegreeTypeOptionViewModel,
  FormationImageAssetOptionViewModel,
  FormationLinkOptionViewModel,
  FormationOperationsViewModel,
  FormationTechnologyOptionViewModel,
  FormationsOperationsFormValue,
  FormationsOperationsModalMode,
  createEmptyFormationsOperationsFormValue,
} from '../../formations-operations.types';

@Component({
  selector: 'app-formations-operations-modal',
  standalone: true,
  imports: [TranslatePipe, OperationsModalComponent, TruncatedTextComponent],
  templateUrl: './formations-operations-modal.component.html',
  styleUrl: './formations-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormationsOperationsModalComponent {
  private readonly translation = inject(TranslationService);

  readonly isOpen = input(false);
  readonly modalTitleKey = input<AppTranslationKey>(
    'pages.admin.formations.modal.create.title',
  );
  readonly modalMode = input<FormationsOperationsModalMode | null>(null);
  readonly formations = input<readonly FormationOperationsViewModel[]>([]);
  readonly selectedFormation = input<FormationRecord | null>(null);
  readonly form = input<FormationsOperationsFormValue>(
    createEmptyFormationsOperationsFormValue(),
  );
  readonly technologyOptions = input<readonly FormationTechnologyOptionViewModel[]>([]);
  readonly linkOptions = input<readonly FormationLinkOptionViewModel[]>([]);
  readonly imageAssetOptions = input<readonly FormationImageAssetOptionViewModel[]>([]);
  readonly degreeTypeOptions = input<readonly FormationDegreeTypeOptionViewModel[]>([]);
  readonly pagination = input<AdminCollectionPagination>(createAdminCollectionPagination());
  readonly searchValue = input('');
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly feedbackTone = input<'success' | 'error' | null>(null);
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);

  readonly closed = output<void>();
  readonly searchChanged = output<string>();
  readonly slugChanged = output<string>();
  readonly institutionChanged = output<string>();
  readonly titlePtChanged = output<string>();
  readonly titleEnChanged = output<string>();
  readonly degreeTypeChanged = output<string>();
  readonly summaryPtChanged = output<string>();
  readonly summaryEnChanged = output<string>();
  readonly startDateChanged = output<string>();
  readonly endDateChanged = output<string>();
  readonly highlightChanged = output<boolean>();
  readonly sortOrderChanged = output<string>();
  readonly technologyToggled = output<string>();
  readonly linkToggled = output<string>();
  readonly imageAssetToggled = output<string>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();

  protected readonly fields = FORMATIONS_OPERATIONS_FIELDS;
  protected readonly trackById = trackAdminItemById;
  protected readonly resolveSelectValue = resolveAdminSelectValue;
  protected readonly resolveFieldLabel = createAdminFieldLabelResolver(
    this.fields,
    this.translation.instant.bind(this.translation),
  );

  protected readonly descriptionKey = computed<AppTranslationKey | null>(() => {
    switch (this.modalMode()) {
      case 'read':
        return 'pages.admin.formations.modal.read.description';
      case 'pick-update':
        return 'pages.admin.formations.modal.pickUpdate.description';
      case 'pick-delete':
        return 'pages.admin.formations.modal.pickDelete.description';
      case 'delete':
        return 'pages.admin.formations.modal.delete.description';
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

  protected emitInstitutionChange(value: string): void {
    this.institutionChanged.emit(value);
  }

  protected emitTitlePtChange(value: string): void {
    this.titlePtChanged.emit(value);
  }

  protected emitTitleEnChange(value: string): void {
    this.titleEnChanged.emit(value);
  }

  protected emitDegreeTypeChange(value: string): void {
    this.degreeTypeChanged.emit(value);
  }

  protected emitSummaryPtChange(value: string): void {
    this.summaryPtChanged.emit(value);
  }

  protected emitSummaryEnChange(value: string): void {
    this.summaryEnChanged.emit(value);
  }

  protected emitStartDateChange(value: string): void {
    this.startDateChanged.emit(value);
  }

  protected emitEndDateChange(value: string): void {
    this.endDateChanged.emit(value);
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

  protected emitSortOrderChange(value: string): void {
    this.sortOrderChanged.emit(value);
  }

  protected toggleTechnology(technologyId: string): void {
    this.technologyToggled.emit(technologyId);
  }

  protected toggleLink(linkId: string): void {
    this.linkToggled.emit(linkId);
  }

  protected toggleImageAsset(imageAssetId: string): void {
    this.imageAssetToggled.emit(imageAssetId);
  }

  protected selectFormationForUpdate(formationId: string): void {
    this.updateSelected.emit(formationId);
  }

  protected selectFormationForDelete(formationId: string): void {
    this.deleteSelected.emit(formationId);
  }

  protected selectPage(page: number): void {
    this.pageSelected.emit(page);
  }

  protected isTechnologySelected(technologyId: string): boolean {
    return this.form().technologyIds.includes(technologyId);
  }

  protected isLinkSelected(linkId: string): boolean {
    return this.form().linkIds.includes(linkId);
  }

  protected isImageAssetSelected(imageAssetId: string): boolean {
    return this.form().imageAssetIds.includes(imageAssetId);
  }
}
