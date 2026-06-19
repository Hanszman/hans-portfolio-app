import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectsService } from '../../core/api/projects/projects.service';
import { ProjectCollectionItemResponse } from '../../core/api/projects/projects.types';
import { TechnologiesService } from '../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../core/api/technologies/technologies.types';
import { TranslationService } from '../../core/translation/translation.service';
import { TagModalComponent } from '../tag/tag-modal/tag-modal.component';
import { TagModalDetail } from '../tag/tag-modal/tag-modal.types';
import {
  buildTechnologyModalDetails,
  resolveTechnologyModalItem,
} from './helpers/technology-modal.helper';
import { TechnologyModalItem } from './technology-modal.types';

@Component({
  selector: 'app-technology-modal',
  standalone: true,
  imports: [TagModalComponent],
  templateUrl: './technology-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechnologyModalComponent {
  private readonly technologiesService = inject(TechnologiesService);
  private readonly projectsService = inject(ProjectsService);
  private readonly translationService = inject(TranslationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly technologiesSignal = signal<TechnologyCollectionItemResponse[]>([]);
  private readonly projectsSignal = signal<ProjectCollectionItemResponse[]>([]);
  private readonly hasRequestedTechnologiesSignal = signal(false);
  private readonly hasRequestedProjectsSignal = signal(false);

  readonly technology = input<TechnologyModalItem | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();

  protected readonly resolvedTechnology = computed(() =>
    resolveTechnologyModalItem(
      this.technology(),
      this.technologiesSignal(),
      this.projectsSignal(),
      this.translationService.locale(),
    ),
  );

  protected readonly details = computed<readonly TagModalDetail[]>(() => {
    const technology = this.resolvedTechnology();

    return technology ? buildTechnologyModalDetails(technology) : [];
  });

  constructor() {
    effect(() => {
      if (!this.isOpen() || !this.technology()) {
        return;
      }

      this.requestTechnologyCatalog();
      this.requestProjectCatalog();
    });
  }

  protected requestClose(): void {
    this.closed.emit();
  }

  private requestTechnologyCatalog(): void {
    if (this.hasRequestedTechnologiesSignal()) {
      return;
    }

    this.hasRequestedTechnologiesSignal.set(true);
    this.technologiesService
      .getTechnologies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.technologiesSignal.set(response.data);
        },
        error: () => {
          this.technologiesSignal.set([]);
        },
      });
  }

  private requestProjectCatalog(): void {
    if (this.hasRequestedProjectsSignal()) {
      return;
    }

    this.hasRequestedProjectsSignal.set(true);
    this.projectsService
      .getProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.projectsSignal.set(response.data);
        },
        error: () => {
          this.projectsSignal.set([]);
        },
      });
  }
}
