import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AppTranslationKey } from '../../core/translation/translation.types';
import { createAdminCollectionPagination } from '../../pages/admin/admin.types';

@Component({
  selector: 'app-operations-modal',
  standalone: true,
  imports: [TranslatePipe],
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
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);
  readonly showSubmit = input(false);
  readonly submitLabelKey = input<AppTranslationKey>('common.actions.save');

  readonly closed = output<void>();
  readonly submitted = output<void>();
  readonly pageSelected = output<number>();

  protected readonly isInteractionDisabled = computed(
    () => this.isLoading() || this.isSubmitting(),
  );

  protected requestClose(): void {
    this.closed.emit();
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
