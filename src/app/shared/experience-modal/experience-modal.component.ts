import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TagButtonComponent } from '../tag/tag-button/tag-button.component';
import { TagButtonViewModel } from '../tag/tag-button/tag-button.types';
import { TechnologyModalItem } from '../technology-modal/technology-modal.types';
import { ExperienceModalItem, ExperienceTechnologyTag } from './experience-modal.types';

@Component({
  selector: 'app-experience-modal',
  standalone: true,
  imports: [TagButtonComponent, TranslatePipe],
  templateUrl: './experience-modal.component.html',
  styleUrl: './experience-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceModalComponent {
  readonly item = input<ExperienceModalItem | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();
  readonly openTechnology = output<TechnologyModalItem>();

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
}
