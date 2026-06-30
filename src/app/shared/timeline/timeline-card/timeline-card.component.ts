import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SurfaceCardComponent } from '../../surface-card/surface-card.component';
import { TimelineMarkerComponent } from '../timeline-marker/timeline-marker.component';

@Component({
  selector: 'app-timeline-card',
  standalone: true,
  imports: [SurfaceCardComponent, TimelineMarkerComponent],
  templateUrl: './timeline-card.component.html',
  styleUrl: './timeline-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineCardComponent {
  readonly isActive = input(false);
  readonly isLast = input(false);
}
