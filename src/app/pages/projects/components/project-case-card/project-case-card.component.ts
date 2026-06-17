import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TechnologyModalItem } from '../../../../shared/technology-modal/technology-modal.types';
import { TagButtonComponent } from '../../../../shared/tag/tag-button/tag-button.component';
import { ProjectCaseViewModel } from '../../projects.types';

@Component({
  selector: 'app-project-case-card',
  standalone: true,
  imports: [TagButtonComponent, TranslatePipe],
  templateUrl: './project-case-card.component.html',
  styleUrl: './project-case-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCaseCardComponent {
  readonly project = input.required<ProjectCaseViewModel>();
  readonly openDetails = output<ProjectCaseViewModel>();
  readonly openTechnology = output<TechnologyModalItem>();

  protected requestDetails(): void {
    this.openDetails.emit(this.project());
  }

  protected requestDetailsFromKeyboard(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this.requestDetails();
  }

  protected requestTechnologyDetails(technology: TechnologyModalItem): void {
    this.openTechnology.emit(technology);
  }
}
