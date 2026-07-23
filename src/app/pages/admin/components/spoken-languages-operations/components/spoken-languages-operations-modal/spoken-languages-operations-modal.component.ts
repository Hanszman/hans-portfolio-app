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
import { SpokenLanguageRecord } from '../../../../../../core/api/admin/spoken-languages/spoken-languages-operations.types';
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import { TranslationService } from '../../../../../../core/translation/translation.service';
import { OperationsModalComponent } from '../../../../../../shared/operations/operations-modal/operations-modal.component';
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
  SPOKEN_LANGUAGES_OPERATIONS_FIELDS,
  SpokenLanguageImageAssetOptionViewModel,
  SpokenLanguageOperationsViewModel,
  SpokenLanguageProficiencyOptionViewModel,
  SpokenLanguagesOperationsFormValue,
  SpokenLanguagesOperationsModalMode,
} from '../../spoken-languages-operations.types';

@Component({
  selector: 'app-spoken-languages-operations-modal',
  standalone: true,
  imports: [TranslatePipe, OperationsModalComponent],
  templateUrl: './spoken-languages-operations-modal.component.html',
  styleUrl: './spoken-languages-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpokenLanguagesOperationsModalComponent {
  private readonly translation = inject(TranslationService);

  readonly isOpen = input(false);
  readonly modalTitleKey = input<AppTranslationKey>(
    'pages.admin.spokenLanguages.modal.create.title',
  );
  readonly modalMode = input<SpokenLanguagesOperationsModalMode | null>(null);
  readonly spokenLanguages = input<readonly SpokenLanguageOperationsViewModel[]>([]);
  readonly selectedSpokenLanguage = input<SpokenLanguageRecord | null>(null);
  readonly form = input<SpokenLanguagesOperationsFormValue>({
    code: '',
    namePt: '',
    nameEn: '',
    proficiency: '',
    highlight: true,
    sortOrder: '0',
    imageAssetIds: [],
  });
  readonly imageAssetOptions = input<readonly SpokenLanguageImageAssetOptionViewModel[]>(
    [],
  );
  readonly proficiencyOptions = input<
    readonly SpokenLanguageProficiencyOptionViewModel[]
  >([]);
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
  readonly codeChanged = output<string>();
  readonly namePtChanged = output<string>();
  readonly nameEnChanged = output<string>();
  readonly proficiencyChanged = output<string>();
  readonly highlightChanged = output<boolean>();
  readonly sortOrderChanged = output<string>();
  readonly imageAssetToggled = output<string>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();

  protected readonly fields = SPOKEN_LANGUAGES_OPERATIONS_FIELDS;
  protected readonly trackById = trackAdminItemById;
  protected readonly resolveSelectValue = resolveAdminSelectValue;
  protected readonly resolveFieldLabel = createAdminFieldLabelResolver(
    this.fields,
    this.translation.instant.bind(this.translation),
  );

  protected readonly descriptionKey = computed<AppTranslationKey | null>(() => {
    switch (this.modalMode()) {
      case 'read':
        return 'pages.admin.spokenLanguages.modal.read.description';
      case 'pick-update':
        return 'pages.admin.spokenLanguages.modal.pickUpdate.description';
      case 'pick-delete':
        return 'pages.admin.spokenLanguages.modal.pickDelete.description';
      case 'delete':
        return 'pages.admin.spokenLanguages.modal.delete.description';
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

  protected emitCodeChange(value: string): void {
    this.codeChanged.emit(value);
  }

  protected emitNamePtChange(value: string): void {
    this.namePtChanged.emit(value);
  }

  protected emitNameEnChange(value: string): void {
    this.nameEnChanged.emit(value);
  }

  protected emitProficiencyChange(value: string): void {
    this.proficiencyChanged.emit(value);
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

  protected toggleImageAsset(imageAssetId: string): void {
    this.imageAssetToggled.emit(imageAssetId);
  }

  protected selectSpokenLanguageForUpdate(spokenLanguageId: string): void {
    this.updateSelected.emit(spokenLanguageId);
  }

  protected selectSpokenLanguageForDelete(spokenLanguageId: string): void {
    this.deleteSelected.emit(spokenLanguageId);
  }

  protected selectPage(page: number): void {
    this.pageSelected.emit(page);
  }

  protected isImageAssetSelected(imageAssetId: string): boolean {
    return this.form().imageAssetIds.includes(imageAssetId);
  }
}
