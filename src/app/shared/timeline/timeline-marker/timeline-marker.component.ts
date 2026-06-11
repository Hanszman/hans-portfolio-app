import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-timeline-marker',
  standalone: true,
  templateUrl: './timeline-marker.component.html',
  styleUrl: './timeline-marker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineMarkerComponent {
  readonly isLast = input(false);
}
