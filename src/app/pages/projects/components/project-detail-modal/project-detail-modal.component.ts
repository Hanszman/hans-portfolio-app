import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectCaseViewModel } from '../../projects.types';

@Component({
  selector: 'app-project-detail-modal',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './project-detail-modal.component.html',
  styleUrl: './project-detail-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailModalComponent {
  readonly project = input<ProjectCaseViewModel | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();

  protected requestClose(): void {
    this.closed.emit();
  }
}
