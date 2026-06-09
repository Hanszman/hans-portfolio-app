import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TimelineMarkerComponent } from '../timeline-marker/timeline-marker.component';

@Component({
  selector: 'app-timeline-card',
  standalone: true,
  imports: [TimelineMarkerComponent],
  templateUrl: './timeline-card.component.html',
  styleUrl: './timeline-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineCardComponent {
  readonly isActive = input(false);
  readonly isLast = input(false);
}
