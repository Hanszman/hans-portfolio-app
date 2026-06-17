import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TagButtonComponent } from '../../../../shared/tag-button/tag-button.component';
import { TechnologyModalItem } from '../../../../shared/technology-modal/technology-modal.types';
import { ProjectCaseViewModel } from '../../projects.types';

@Component({
  selector: 'app-project-detail-modal',
  standalone: true,
  imports: [TagButtonComponent, TranslatePipe],
  templateUrl: './project-detail-modal.component.html',
  styleUrl: './project-detail-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailModalComponent {
  readonly project = input<ProjectCaseViewModel | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();
  readonly openTechnology = output<TechnologyModalItem>();

  protected requestClose(): void {
    this.closed.emit();
  }

  protected requestTechnologyDetails(technology: TechnologyModalItem): void {
    this.openTechnology.emit(technology);
  }
}
