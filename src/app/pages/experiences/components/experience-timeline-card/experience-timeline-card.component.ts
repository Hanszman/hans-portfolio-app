import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ExpandableListToggleComponent } from '../../../../shared/expandable-list-toggle/expandable-list-toggle.component';
import { TagButtonComponent } from '../../../../shared/tag/tag-button/tag-button.component';
import { TimelineCardComponent } from '../../../../shared/timeline/timeline-card/timeline-card.component';
import type { TagButtonViewModel } from '../../../../shared/tag/tag-button/tag-button.types';
import {
  ExperienceCustomerViewModel,
  ExperienceTechnologyViewModel,
  ExperienceTimelineItemViewModel,
  INITIAL_VISIBLE_TECHNOLOGY_COUNT,
} from '../../experiences.types';

@Component({
  selector: 'app-experience-timeline-card',
  standalone: true,
  imports: [
    ExpandableListToggleComponent,
    TagButtonComponent,
    TimelineCardComponent,
    TranslatePipe,
  ],
  templateUrl: './experience-timeline-card.component.html',
  styleUrl: './experience-timeline-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceTimelineCardComponent {
  readonly item = input.required<ExperienceTimelineItemViewModel>();
  readonly isActive = input(false);
  readonly isLast = input(false);
  readonly openDetails = output<ExperienceTimelineItemViewModel>();
  readonly openCustomer = output<ExperienceCustomerViewModel>();
  readonly openTechnology = output<ExperienceTechnologyViewModel>();

  protected readonly isTechnologyListExpanded = signal(false);
  protected readonly visibleTechnologies = computed(() =>
    this.isTechnologyListExpanded()
      ? this.item().technologies
      : this.item().technologies.slice(0, INITIAL_VISIBLE_TECHNOLOGY_COUNT),
  );
  protected readonly customerTags = computed(() =>
    this.item().customers.map(
      (customer): TagButtonViewModel<ExperienceCustomerViewModel> => ({
        label: customer.name,
        image: customer.image,
        value: customer,
      }),
    ),
  );
  protected readonly visibleTechnologyTags = computed(() =>
    this.visibleTechnologies().map(
      (technology): TagButtonViewModel<ExperienceTechnologyViewModel> => ({
        label: technology.name,
        image: technology.image,
        value: technology,
      }),
    ),
  );
  protected readonly hiddenTechnologyCount = computed(() =>
    Math.max(0, this.item().technologies.length - INITIAL_VISIBLE_TECHNOLOGY_COUNT),
  );

  protected requestDetails(): void {
    this.openDetails.emit(this.item());
  }

  protected requestCustomerDetails(customer: ExperienceCustomerViewModel): void {
    this.openCustomer.emit(customer);
  }

  protected requestTechnologyDetails(
    technology: ExperienceTechnologyViewModel,
  ): void {
    this.openTechnology.emit(technology);
  }

  protected toggleTechnologyList(): void {
    this.isTechnologyListExpanded.update((isExpanded) => !isExpanded);
  }
}
