import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { TagModalComponent } from '../tag-modal/tag-modal.component';
import { TagModalDetail } from '../tag-modal/tag-modal.types';
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

    return [
      {
        labelKey: 'pages.experiences.technology.category',
        value: technology.category,
      },
      {
        labelKey: 'pages.experiences.technology.level',
        value: technology.level,
      },
      {
        labelKey: 'pages.experiences.technology.frequency',
        value: technology.frequency,
      },
      {
        labelKey: 'pages.experiences.technology.projects',
        value: technology.projectCount,
      },
    ];
  });

  protected requestClose(): void {
    this.closed.emit();
  }
}
