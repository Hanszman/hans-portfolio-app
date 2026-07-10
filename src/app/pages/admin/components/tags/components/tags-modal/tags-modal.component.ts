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
import {
  TagCatalogOptionViewModel,
  TagsFormValue,
  TagsModalMode,
  TagViewModel,
} from '../../tags.types';

@Component({
  selector: 'app-tags-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './tags-modal.component.html',
  styleUrl: './tags-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsModalComponent {
  readonly isOpen = input(false);
  readonly modalTitleKey = input<AppTranslationKey>(
    'pages.admin.tags.modal.create.title',
  );
  readonly modalMode = input<TagsModalMode | null>(null);
  readonly tags = input<readonly TagViewModel[]>([]);
  readonly selectedTag = input<TagRecord | null>(null);
  readonly form = input<TagsFormValue>({
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

  protected isProjectSelected(projectId: string): boolean {
    return this.form().projectIds.includes(projectId);
  }

  protected isTechnologySelected(technologyId: string): boolean {
    return this.form().technologyIds.includes(technologyId);
  }

  protected trackById(index: number, item: { id: string }): string {
    return item.id;
  }
}
