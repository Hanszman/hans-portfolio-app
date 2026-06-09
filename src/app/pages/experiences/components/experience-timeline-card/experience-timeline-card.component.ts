import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TimelineMarkerComponent } from '../../../../shared/timeline-marker/timeline-marker.component';
import {
  ExperienceTechnologyViewModel,
  ExperienceTimelineItemViewModel,
} from '../../experiences.types';

@Component({
  selector: 'app-experience-timeline-card',
  standalone: true,
  imports: [TimelineMarkerComponent, TranslatePipe],
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
  readonly openTechnology = output<ExperienceTechnologyViewModel>();

  protected requestDetails(): void {
    this.openDetails.emit(this.item());
  }

  protected requestTechnologyDetails(
    technology: ExperienceTechnologyViewModel,
  ): void {
    this.openTechnology.emit(technology);
  }
}
