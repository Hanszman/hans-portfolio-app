import {
  CUSTOM_ELEMENTS_SCHEMA,
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
import { TranslatePipe } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectsService } from '../../core/api/projects/projects.service';
import { ProjectCollectionItemResponse } from '../../core/api/projects/projects.types';
import { TechnologiesService } from '../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../core/api/technologies/technologies.types';
import { TranslationService } from '../../core/translation/translation.service';
import { TagModalDetail } from '../tag/tag-modal/tag-modal.types';
import { ModalSkeletonComponent } from '../modal-skeleton/modal-skeleton.component';
import {
  buildTechnologyModalDetails,
  buildTechnologyFrequencyProgress,
  buildTechnologyLevelProgress,
  resolveRadarMaximum,
  resolveTechnologyModalItem,
} from './helpers/technology-modal.helper';
import { TechnologyModalItem } from './technology-modal.types';

@Component({
  selector: 'app-technology-modal',
  standalone: true,
  imports: [ModalSkeletonComponent, TranslatePipe],
  templateUrl: './technology-modal.component.html',
  styleUrl: './technology-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
  private readonly technologiesLoadingSignal = signal(false);
  private readonly projectsLoadingSignal = signal(false);

  readonly technology = input<TechnologyModalItem | null>(null);
  readonly isOpen = input(false);
  readonly closed = output<void>();

  protected readonly isContentLoading = computed(
    () =>
      this.isOpen() &&
      !!this.technology() &&
      (this.technologiesLoadingSignal() || this.projectsLoadingSignal()),
  );

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

  protected readonly levelProgress = computed(() => {
    const technology = this.resolvedTechnology();
    return technology
      ? buildTechnologyLevelProgress(technology, this.translationService.locale())
      : null;
  });

  protected readonly frequencyProgress = computed(() => {
    const technology = this.resolvedTechnology();
    return technology
      ? buildTechnologyFrequencyProgress(technology, this.translationService.locale())
      : null;
  });

  protected readonly radarIndicators = computed(() => {
    const metrics = this.resolvedTechnology()?.contextMetrics ?? [];
    const max = resolveRadarMaximum(metrics);
    return metrics.map(({ label }) => ({ name: label, max }));
  });

  protected readonly radarSeries = computed(() => {
    const technology = this.resolvedTechnology();
    return technology
      ? [
          {
            name: technology.name,
            type: 'radar',
            data: [
              {
                name: technology.name,
                value: (technology.contextMetrics ?? []).map(({ totalMonths }) => totalMonths),
              },
            ],
          },
        ]
      : [];
  });

  protected readonly radarSummary = computed(() =>
    (this.resolvedTechnology()?.contextMetrics ?? [])
      .map(({ label, totalMonths }) => `${label}: ${this.formatMonths(totalMonths)}`)
      .join(', '),
  );

  protected readonly formatRadarValue = (value: number): string => this.formatMonths(value);

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

  private formatMonths(value: number): string {
    return this.translationService.instant(
      value === 1 ? 'common.time.month' : 'common.time.months',
      { count: String(value) },
    );
  }

  private requestTechnologyCatalog(): void {
    if (this.hasRequestedTechnologiesSignal()) {
      return;
    }

    this.hasRequestedTechnologiesSignal.set(true);
    this.technologiesLoadingSignal.set(true);
    this.technologiesService
      .getTechnologies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.technologiesSignal.set(response.data);
          this.technologiesLoadingSignal.set(false);
        },
        error: () => {
          this.technologiesSignal.set([]);
          this.technologiesLoadingSignal.set(false);
        },
      });
  }

  private requestProjectCatalog(): void {
    if (this.hasRequestedProjectsSignal()) {
      return;
    }

    this.hasRequestedProjectsSignal.set(true);
    this.projectsLoadingSignal.set(true);
    this.projectsService
      .getProjects()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.projectsSignal.set(response.data);
          this.projectsLoadingSignal.set(false);
        },
        error: () => {
          this.projectsSignal.set([]);
          this.projectsLoadingSignal.set(false);
        },
      });
  }
}
