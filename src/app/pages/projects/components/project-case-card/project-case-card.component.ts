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
  selector: 'app-project-case-card',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './project-case-card.component.html',
  styleUrl: './project-case-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCaseCardComponent {
  readonly project = input.required<ProjectCaseViewModel>();
  readonly openDetails = output<ProjectCaseViewModel>();

  protected requestDetails(): void {
    this.openDetails.emit(this.project());
  }
}

