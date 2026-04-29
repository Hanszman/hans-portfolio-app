import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ExperienceTimelineItemViewModel } from '../../experiences.types';

@Component({
  selector: 'app-experience-timeline-card',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './experience-timeline-card.component.html',
  styleUrl: './experience-timeline-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceTimelineCardComponent {
  readonly item = input.required<ExperienceTimelineItemViewModel>();
  readonly openDetails = output<ExperienceTimelineItemViewModel>();

  protected requestDetails(): void {
    this.openDetails.emit(this.item());
  }
}

