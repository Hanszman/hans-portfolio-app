import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ExpandableListToggleComponent } from '../../../../shared/expandable-list-toggle/expandable-list-toggle.component';
import { TechnologyModalItem } from '../../../../shared/technology-modal/technology-modal.types';
import { TagButtonComponent } from '../../../../shared/tag/tag-button/tag-button.component';
import {
  PROJECT_VISIBLE_TECHNOLOGY_COUNT,
  ProjectCaseViewModel,
} from '../../projects.types';

@Component({
  selector: 'app-project-case-card',
  standalone: true,
  imports: [ExpandableListToggleComponent, TagButtonComponent, TranslatePipe],
  templateUrl: './project-case-card.component.html',
  styleUrl: './project-case-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCaseCardComponent {
  readonly project = input.required<ProjectCaseViewModel>();
  readonly openDetails = output<ProjectCaseViewModel>();
  readonly openTechnology = output<TechnologyModalItem>();
  protected readonly isTechnologyListExpanded = signal(false);
  protected readonly visibleTechnologies = computed(() =>
    this.isTechnologyListExpanded()
      ? this.project().technologies
      : this.project().technologies.slice(0, PROJECT_VISIBLE_TECHNOLOGY_COUNT),
  );
  protected readonly hiddenTechnologyCount = computed(() =>
    Math.max(0, this.project().technologies.length - PROJECT_VISIBLE_TECHNOLOGY_COUNT),
  );

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

  protected toggleTechnologyList(): void {
    this.isTechnologyListExpanded.update((isExpanded) => !isExpanded);
  }
}
