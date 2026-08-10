import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AppTranslationKey } from '../../../core/translation/translation.types';
import { createAdminCollectionPagination } from '../../../pages/admin/admin.types';
import { ModalSkeletonComponent } from '../../modal-skeleton/modal-skeleton.component';
import { OperationsDetailedItemComponent } from '../operations-detailed-item/operations-detailed-item.component';
import { OperationsItemComponent } from '../operations-item/operations-item.component';
import {
  OperationsDetailedItemViewModel,
  OperationsItemViewModel,
  OperationsModalMode,
} from '../operations.types';

@Component({
  selector: 'app-operations-modal',
  standalone: true,
  imports: [
    TranslatePipe,
    ModalSkeletonComponent,
    OperationsDetailedItemComponent,
    OperationsItemComponent,
  ],
  templateUrl: './operations-modal.component.html',
  styleUrl: './operations-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationsModalComponent {
  readonly isOpen = input(false);
  readonly titleKey = input<AppTranslationKey>('common.actions.close');
  readonly descriptionKey = input<AppTranslationKey | null>(null);
  readonly feedbackKey = input<AppTranslationKey | null>(null);
  readonly feedbackTone = input<'success' | 'error' | null>(null);
  readonly pagination = input(createAdminCollectionPagination());
  readonly showPagination = input(false);
  readonly showSearch = input(false);
  readonly searchValue = input('');
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);
  readonly showSubmit = input(false);
  readonly submitLabelKey = input<AppTranslationKey>('common.actions.save');
  readonly mode = input<OperationsModalMode | null>(null);
  readonly items = input<readonly OperationsItemViewModel[]>([]);
  readonly detailedItems = input<readonly OperationsDetailedItemViewModel[]>([]);
  readonly selectedItem = input<OperationsItemViewModel | null>(null);

  readonly closed = output<void>();
  readonly searchChanged = output<string>();
  readonly submitted = output<void>();
  readonly pageSelected = output<number>();
  readonly updateSelected = output<string>();
  readonly deleteSelected = output<string>();

  protected readonly searchDraft = linkedSignal(() => this.searchValue());

  protected readonly isInteractionDisabled = computed(
    () => this.isLoading() || this.isSubmitting(),
  );
  protected readonly rendersSharedContent = computed(() => {
    const mode = this.mode();
    return mode === 'read' || mode === 'pick-update' || mode === 'pick-delete' || mode === 'delete';
  });

  protected requestClose(): void {
    this.closed.emit();
  }

  protected updateSearchDraft(value: string): void {
    this.searchDraft.set(value);
  }

  protected submitSearch(): void {
    this.searchChanged.emit(this.searchDraft().trim());
  }

  protected handleSearchKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter') return;

    event.preventDefault();
    this.submitSearch();
  }

  protected submit(): void {
    this.submitted.emit();
  }

  protected selectPage(event: Event | number): void {
    if (typeof event === 'number') {
      this.pageSelected.emit(event);
      return;
    }

    const customEvent = event as Event & {
      detail?: number | { page?: number };
      target: (EventTarget & { page?: number }) | null;
    };

    if (typeof customEvent.detail === 'number') {
      this.pageSelected.emit(customEvent.detail);
      return;
    }

    if (
      customEvent.detail &&
      typeof customEvent.detail === 'object' &&
      typeof customEvent.detail.page === 'number'
    ) {
      this.pageSelected.emit(customEvent.detail.page);
      return;
    }

    if (customEvent.target && typeof customEvent.target.page === 'number') {
      this.pageSelected.emit(customEvent.target.page);
    }
  }
}
