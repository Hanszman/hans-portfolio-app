import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { TagModalComponent } from '../tag-modal/tag-modal.component';
import { TagModalDetail } from '../tag-modal/tag-modal.types';
import { buildTechnologyModalDetail } from './helpers/technology-modal.helper';
import { TechnologyModalItem } from './technology-modal.types';

@Component({
  selector: 'app-technology-modal',
  standalone: true,
  imports: [TagModalComponent],
  templateUrl: './technology-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyModalComponent {
  readonly technology = input<TechnologyModalItem | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();

  protected readonly details = computed<readonly TagModalDetail[]>(() => {
    const technology = this.technology();

    if (!technology) {
      return [];
    }

    const details = [
      buildTechnologyModalDetail('pages.skills.detail.totalExperience', technology.experience),
      buildTechnologyModalDetail('pages.experiences.technology.type', technology.category),
      buildTechnologyModalDetail('pages.experiences.technology.stack', technology.stack),
      buildTechnologyModalDetail('pages.experiences.technology.level', technology.level),
      buildTechnologyModalDetail('pages.experiences.technology.frequency', technology.frequency),
      buildTechnologyModalDetail('pages.experiences.technology.projects', technology.projectCount),
    ] satisfies readonly (TagModalDetail | null)[];

    return details.filter((detail): detail is TagModalDetail => detail !== null);
  });

  protected requestClose(): void {
    this.closed.emit();
  }
}
