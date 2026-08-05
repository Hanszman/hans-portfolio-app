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
import { ModalMediaLoadingTracker } from '../../modal-skeleton/helpers/modal-media-loading.helper';
import { ModalSkeletonComponent } from '../../modal-skeleton/modal-skeleton.component';
import { TagModalDetail, TagModalImage } from './tag-modal.types';

@Component({
  selector: 'app-tag-modal',
  standalone: true,
  imports: [ModalSkeletonComponent, TranslatePipe],
  templateUrl: './tag-modal.component.html',
  styleUrl: './tag-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagModalComponent {
  private readonly mediaTracker = new ModalMediaLoadingTracker();
  readonly isOpen = input(false);
  readonly title = input('');
  readonly subtitle = input('');
  readonly image = input<TagModalImage | null>(null);
  readonly details = input<readonly TagModalDetail[]>([]);
  readonly closed = output<void>();
  protected readonly mediaLoading = this.mediaTracker.isLoading;
  protected readonly mediaSources = computed(() => (this.image()?.src ? [this.image()!.src] : []));

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
