import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ExperienceTechnologyViewModel } from '../../experiences.types';

@Component({
  selector: 'app-experience-technology-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './experience-technology-modal.component.html',
  styleUrl: './experience-technology-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceTechnologyModalComponent {
  readonly technology = input<ExperienceTechnologyViewModel | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();

  protected requestClose(): void {
    this.closed.emit();
  }
}
