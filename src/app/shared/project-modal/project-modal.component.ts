import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  ModalMediaLoadingTracker,
  uniqueModalMediaSources,
} from '../modal-skeleton/helpers/modal-media-loading.helper';
import { ModalSkeletonComponent } from '../modal-skeleton/modal-skeleton.component';
import { TagButtonComponent } from '../tag/tag-button/tag-button.component';
import { TechnologyModalItem } from '../technology-modal/technology-modal.types';
import { ProjectModalItem } from './project-modal.types';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [ModalSkeletonComponent, TagButtonComponent, TranslatePipe],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectModalComponent {
  private readonly mediaTracker = new ModalMediaLoadingTracker();
  readonly project = input<ProjectModalItem | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();
  readonly openTechnology = output<TechnologyModalItem>();
  protected readonly modalSize = computed(() =>
    (this.project()?.galleryItems.length ?? 0) > 0 ? 'large' : 'medium',
  );
  protected readonly mediaSources = computed(() =>
    uniqueModalMediaSources((this.project()?.galleryItems ?? []).map(({ imageSrc }) => imageSrc)),
  );
  protected readonly mediaLoading = computed(() =>
    this.mediaTracker.isLoading(this.mediaSources(), this.isOpen()),
  );

  protected requestClose(): void {
    this.closed.emit();
  }
  protected requestTechnologyDetails(technology: TechnologyModalItem): void {
    this.openTechnology.emit(technology);
  }

  protected settleMedia(source: string): void {
    this.mediaTracker.settle(source);
  }
}
