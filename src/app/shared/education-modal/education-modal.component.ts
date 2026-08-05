import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  ModalMediaLoadingTracker,
  uniqueModalMediaSources,
} from '../modal-skeleton/helpers/modal-media-loading.helper';
import { ModalSkeletonComponent } from '../modal-skeleton/modal-skeleton.component';
import { EducationModalItem } from './education-modal.types';

@Component({
  selector: 'app-education-modal',
  standalone: true,
  imports: [ModalSkeletonComponent, TranslatePipe],
  templateUrl: './education-modal.component.html',
  styleUrl: './education-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationModalComponent {
  private readonly mediaTracker = new ModalMediaLoadingTracker();
  readonly item = input<EducationModalItem | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();
  protected readonly modalSize = computed(() =>
    (this.item()?.galleryItems.length ?? 0) > 0 ? 'large' : 'small',
  );
  protected readonly mediaLoading = this.mediaTracker.isLoading;
  protected readonly mediaSources = computed(() => {
    const item = this.item();
    if (!item) return [];

    return uniqueModalMediaSources([
      ...(item.image?.src ? [item.image.src] : []),
      ...item.galleryItems.map(({ imageSrc }) => imageSrc),
    ]);
  });

  constructor() {
    effect(() => this.mediaTracker.reset(this.mediaSources(), this.isOpen()));
  }
  protected requestClose(): void {
    this.closed.emit();
  }

  protected settleMedia(source: string): void {
    this.mediaTracker.settle(source);
  }
}
