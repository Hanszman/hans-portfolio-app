import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectsService } from '../../core/api/projects/projects.service';
import { ProjectCollectionItemResponse } from '../../core/api/projects/projects.types';
import { TranslationService } from '../../core/translation/translation.service';
import { WrapperComponent } from '../../layout/wrapper/wrapper.component';
import { getHansInputEventValue } from '../../shared/helpers/hans-input-event.helper';
import { InfoStateComponent } from '../../shared/info-state/info-state.component';
import { ProjectCaseCardComponent } from './components/project-case-card/project-case-card.component';
import { ProjectDetailModalComponent } from './components/project-detail-modal/project-detail-modal.component';
import { mapProjectToCaseCard } from './helpers/projects.helper';
import {
  PROJECT_CONTEXT_FILTERS,
  ProjectCaseViewModel,
  ProjectContextFilterValue,
} from './projects.types';

@Component({
  selector: 'app-projects',
  imports: [
    WrapperComponent,
    InfoStateComponent,
    ProjectCaseCardComponent,
    ProjectDetailModalComponent,
    TranslatePipe,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  private readonly projectsService = inject(ProjectsService);
  private readonly translationService = inject(TranslationService);
  private readonly projectsSignal = signal<ProjectCollectionItemResponse[]>([]);
  private readonly selectedProjectSignal = signal<ProjectCaseViewModel | null>(null);
  private readonly selectedContextSignal = signal<ProjectContextFilterValue>('ALL');
  private readonly searchTermSignal = signal('');

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly projects = this.projectsSignal.asReadonly();
  protected readonly selectedProject = this.selectedProjectSignal.asReadonly();
  protected readonly selectedContext = this.selectedContextSignal.asReadonly();
  protected readonly searchTerm = this.searchTermSignal.asReadonly();
  protected readonly contextFilters = PROJECT_CONTEXT_FILTERS;

  protected readonly projectCases = computed(() =>
    this.projects().map((project) =>
      mapProjectToCaseCard(project, this.translationService.locale()),
    ),
  );

  protected readonly visibleProjectCases = computed(() => {
    const selectedContext = this.selectedContext();
    const searchTerm = this.searchTerm().trim().toLowerCase();

    return this.projectCases().filter((project) => {
      const matchesContext =
        selectedContext === 'ALL' || project.filterContext === selectedContext;
      const matchesSearch =
        !searchTerm ||
        project.title.toLowerCase().includes(searchTerm) ||
        project.summary.toLowerCase().includes(searchTerm);

      return matchesContext && matchesSearch;
    });
  });

  protected readonly filteredCountLabel = computed(() =>
    String(this.visibleProjectCases().length),
  );

  protected readonly isDetailOpen = computed(() => this.selectedProject() !== null);

  constructor() {
    this.projectsService
      .getProjects()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (response) => {
          this.projectsSignal.set(response.data);
          this.hasError.set(false);
          this.isLoading.set(false);
        },
        error: () => {
          this.projectsSignal.set([]);
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
  }

  protected updateSearchTerm(event: Event): void {
    this.searchTermSignal.set(getHansInputEventValue(event));
  }

  protected selectContext(value: ProjectContextFilterValue): void {
    this.selectedContextSignal.set(value);
  }

  protected openProjectDetails(project: ProjectCaseViewModel): void {
    this.selectedProjectSignal.set(project);
  }

  protected closeProjectDetails(): void {
    this.selectedProjectSignal.set(null);
  }
}
