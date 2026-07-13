import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TagRecord } from '../../../../../../core/api/admin/tags/tags-api.types';
import { AppTranslationKey } from '../../../../../../core/translation/translation.types';
import { PaginationControlsComponent } from '../../../../../../shared/pagination-controls/pagination-controls.component';
import { AdminCollectionPagination } from '../../../../admin.types';
import {
  TagCatalogOptionViewModel,
  TagOperationsViewModel,
  TagTypeOptionViewModel,
  TagsOperationsFormValue,
  TagsOperationsModalMode,
} from '../../tags-operations.types';

@Component({
  selector: 'app-tags-operations-modal',
  standalone: true,
  imports: [TranslatePipe, PaginationControlsComponent],
  templateUrl: './tags-operations-modal.component.html',
  styleUrl: './tags-operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsOperationsModalComponent {
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
  readonly pagination = input<AdminCollectionPagination>({
    page: 1,
    pageSize: 6,
    totalItems: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly feedbackTone = input<'success' | 'error' | null>(null);
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);

  readonly closed = output<void>();
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

  protected resolveSelectValue(event: Event): string {
    const customEvent = event as Event & {
      detail?: string | { value?: string };
      target: (EventTarget & { value?: string }) | null;
    };

    if (typeof customEvent.detail === 'string') {
      return customEvent.detail;
    }

    if (
      customEvent.detail &&
      typeof customEvent.detail === 'object' &&
      typeof customEvent.detail.value === 'string'
    ) {
      return customEvent.detail.value;
    }

    if (customEvent.target && typeof customEvent.target.value === 'string') {
      return customEvent.target.value;
    }

    return '';
  }

  protected trackById(index: number, item: { id: string }): string {
    return item.id;
  }
}
