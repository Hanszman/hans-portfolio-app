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
} from '../modal-skeleton/modal-media-loading.helper';
import { ModalSkeletonComponent } from '../modal-skeleton/modal-skeleton.component';
import { TagButtonComponent } from '../tag/tag-button/tag-button.component';
import { TagButtonViewModel } from '../tag/tag-button/tag-button.types';
import { TechnologyModalItem } from '../technology-modal/technology-modal.types';
import { ExperienceModalItem, ExperienceTechnologyTag } from './experience-modal.types';

@Component({
  selector: 'app-experience-modal',
  standalone: true,
  imports: [ModalSkeletonComponent, TagButtonComponent, TranslatePipe],
  templateUrl: './experience-modal.component.html',
  styleUrl: './experience-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceModalComponent {
  private readonly mediaTracker = new ModalMediaLoadingTracker();
  readonly item = input<ExperienceModalItem | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();
  readonly openTechnology = output<TechnologyModalItem>();
  protected readonly mediaLoading = this.mediaTracker.isLoading;
  protected readonly mediaSources = computed(() => {
    const item = this.item();
    if (!item) return [];

    return uniqueModalMediaSources([
      item.companyImage.src,
      ...item.customers.map(({ image }) => image.src),
      ...item.technologyGroups.flatMap(({ technologies }) =>
        technologies.flatMap(({ image }) => (image?.src ? [image.src] : [])),
      ),
    ]);
  });

  constructor() {
    effect(() => this.mediaTracker.reset(this.mediaSources(), this.isOpen()));
  }

  protected customerTag(customer: ExperienceModalItem['customers'][number]): TagButtonViewModel {
    return { label: customer.name, image: customer.image, value: customer.slug };
  }

  protected technologyTag(technology: TechnologyModalItem): ExperienceTechnologyTag {
    return { label: technology.name, image: technology.image, value: technology };
  }

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
