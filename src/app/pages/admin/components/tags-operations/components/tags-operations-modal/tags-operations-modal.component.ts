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
import { TagRecord } from '../../../../../../core/api/admin/tags/tags-operations.types';
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
  TAGS_OPERATIONS_FIELDS,
  TagCatalogOptionViewModel,
  TagOperationsViewModel,
  TagTypeOptionViewModel,
  TagsOperationsFormValue,
  TagsOperationsModalMode,
} from '../../tags-operations.types';

@Component({
  selector: 'app-tags-operations-modal',
  standalone: true,
  imports: [TranslatePipe, OperationsModalComponent, TruncatedTextComponent],
  templateUrl: './tags-operations-modal.component.html',
  styleUrl: './tags-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsOperationsModalComponent {
  private readonly translation = inject(TranslationService);

  readonly isOpen = input(false);
  readonly modalTitleKey = input<AppTranslationKey>(
    'pages.admin.tags.modal.create.title',
  );
  readonly modalMode = input<TagsOperationsModalMode | null>(null);
  readonly tags = input<readonly TagOperationsViewModel[]>([]);
  readonly selectedTag = input<TagRecord | null>(null);
  readonly form = input<TagsOperationsFormValue>({
    slug: '',
    namePt: '',
    nameEn: '',
    type: '',
    sortOrder: '0',
    projectIds: [],
    technologyIds: [],
  });
  readonly projectOptions = input<readonly TagCatalogOptionViewModel[]>([]);
  readonly technologyOptions = input<readonly TagCatalogOptionViewModel[]>([]);
  readonly tagTypeOptions = input<readonly TagTypeOptionViewModel[]>([]);
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
  readonly slugChanged = output<string>();
  readonly namePtChanged = output<string>();
  readonly nameEnChanged = output<string>();
  readonly typeChanged = output<string>();
  readonly sortOrderChanged = output<string>();
  readonly projectToggled = output<string>();
  readonly technologyToggled = output<string>();
  readonly submitted = output<void>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();
  readonly pageSelected = output<number>();

  protected readonly fields = TAGS_OPERATIONS_FIELDS;
  protected readonly trackById = trackAdminItemById;
  protected readonly resolveSelectValue = resolveAdminSelectValue;
  protected readonly resolveFieldLabel = createAdminFieldLabelResolver(
    this.fields,
    this.translation.instant.bind(this.translation),
  );

  protected readonly descriptionKey = computed<AppTranslationKey | null>(() => {
    switch (this.modalMode()) {
      case 'read':
        return 'pages.admin.tags.modal.read.description';
      case 'pick-update':
        return 'pages.admin.tags.modal.pickUpdate.description';
      case 'pick-delete':
        return 'pages.admin.tags.modal.pickDelete.description';
      case 'delete':
        return 'pages.admin.tags.modal.delete.description';
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

  protected emitTypeChange(value: string): void {
    this.typeChanged.emit(value);
  }

  protected emitSortOrderChange(value: string): void {
    this.sortOrderChanged.emit(value);
  }

  protected toggleProject(projectId: string): void {
    this.projectToggled.emit(projectId);
  }

  protected toggleTechnology(technologyId: string): void {
    this.technologyToggled.emit(technologyId);
  }

  protected selectTagForUpdate(tagId: string): void {
    this.updateSelected.emit(tagId);
  }

  protected selectTagForDelete(tagId: string): void {
    this.deleteSelected.emit(tagId);
  }

  protected selectPage(page: number): void {
    this.pageSelected.emit(page);
  }

  protected isProjectSelected(projectId: string): boolean {
    return this.form().projectIds.includes(projectId);
  }

  protected isTechnologySelected(technologyId: string): boolean {
    return this.form().technologyIds.includes(technologyId);
  }

}
