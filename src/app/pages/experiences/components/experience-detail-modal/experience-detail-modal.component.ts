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
  selector: 'app-experience-detail-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './experience-detail-modal.component.html',
  styleUrl: './experience-detail-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceDetailModalComponent {
  readonly item = input<ExperienceTimelineItemViewModel | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();

  protected requestClose(): void {
    this.closed.emit();
  }
}
