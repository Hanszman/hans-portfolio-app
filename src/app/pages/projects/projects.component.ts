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
import { InfoStateComponent } from '../../shared/info-state/info-state.component';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { ProjectModalComponent } from '../../shared/project-modal/project-modal.component';
import { TechnologyModalComponent } from '../../shared/technology-modal/technology-modal.component';
import { TechnologyModalItem } from '../../shared/technology-modal/technology-modal.types';
import {
  HIGHLIGHT_FILTERS,
  HighlightFilterValue,
} from '../../shared/filters/highlight-filter.types';
import {
  calculateTotalPages,
  paginateItems,
  resolvePaginationPage,
} from '../../shared/pagination/pagination.helper';
import { ProjectCaseCardComponent } from './components/project-case-card/project-case-card.component';
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
    ProjectModalComponent,
    SectionHeaderComponent,
    TechnologyModalComponent,
    TranslatePipe,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  private static readonly PROJECTS_PAGE_SIZE = 9;
  private readonly projectsService = inject(ProjectsService);
  private readonly translationService = inject(TranslationService);
  private readonly projectsSignal = signal<ProjectCollectionItemResponse[]>([]);
  private readonly selectedProjectSignal = signal<ProjectCaseViewModel | null>(null);
  private readonly selectedTechnologySignal = signal<TechnologyModalItem | null>(null);
  private readonly selectedContextSignal = signal<ProjectContextFilterValue>('ALL');
  private readonly selectedHighlightSignal = signal<HighlightFilterValue>('ALL');
  private readonly searchTermSignal = signal('');
  private readonly projectPageSignal = signal(1);

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly projects = this.projectsSignal.asReadonly();
  protected readonly selectedProject = this.selectedProjectSignal.asReadonly();
  protected readonly selectedTechnology = this.selectedTechnologySignal.asReadonly();
  protected readonly selectedContext = this.selectedContextSignal.asReadonly();
  protected readonly selectedHighlight = this.selectedHighlightSignal.asReadonly();
  protected readonly searchTerm = this.searchTermSignal.asReadonly();
  protected readonly projectPage = this.projectPageSignal.asReadonly();
  protected readonly contextFilters = PROJECT_CONTEXT_FILTERS;
  protected readonly highlightFilters = HIGHLIGHT_FILTERS;

  protected readonly projectCases = computed(() =>
    this.projects().map((project) =>
      mapProjectToCaseCard(project, this.translationService.locale()),
    ),
  );

  protected readonly visibleProjectCases = computed(() => {
    const selectedContext = this.selectedContext();
    const selectedHighlight = this.selectedHighlight();
    const searchTerm = this.searchTerm().trim().toLowerCase();

    return this.projectCases().filter((project) => {
      const matchesContext = selectedContext === 'ALL' || project.filterContext === selectedContext;
      const matchesHighlight =
        selectedHighlight === 'ALL' ||
        (selectedHighlight === 'HIGHLIGHTED' ? project.isHighlight : !project.isHighlight);
      const matchesSearch =
        !searchTerm ||
        project.title.toLowerCase().includes(searchTerm) ||
        project.summary.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.contextLabel.toLowerCase().includes(searchTerm) ||
        project.companyNames.some((company) => company.toLowerCase().includes(searchTerm)) ||
        project.technologies.some((technology) =>
          technology.label.toLowerCase().includes(searchTerm),
        );

      return matchesContext && matchesHighlight && matchesSearch;
    });
  });

  protected readonly filteredCountLabel = computed(() => String(this.visibleProjectCases().length));
  protected readonly projectTotalPages = computed(() =>
    calculateTotalPages(this.visibleProjectCases().length, ProjectsComponent.PROJECTS_PAGE_SIZE),
  );
  protected readonly paginatedProjectCases = computed(() =>
    paginateItems(
      this.visibleProjectCases(),
      this.projectPage(),
      ProjectsComponent.PROJECTS_PAGE_SIZE,
    ),
  );

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

  protected updateSearchTerm(searchTerm: string): void {
    this.searchTermSignal.set(searchTerm);
    this.resetProjectPage();
  }

  protected selectContext(value: ProjectContextFilterValue): void {
    this.selectedContextSignal.set(value);
    this.resetProjectPage();
  }

  protected selectHighlightFilter(value: HighlightFilterValue): void {
    this.selectedHighlightSignal.set(value);
    this.resetProjectPage();
  }

  protected selectProjectPage(event: Event | number): void {
    const page = resolvePaginationPage(event);

    if (page !== null) {
      this.projectPageSignal.set(page);
    }
  }

  protected openProjectDetails(project: ProjectCaseViewModel): void {
    this.selectedProjectSignal.set(project);
  }

  protected closeProjectDetails(): void {
    this.selectedProjectSignal.set(null);
  }

  protected openTechnologyDetails(technology: TechnologyModalItem): void {
    this.selectedProjectSignal.set(null);
    this.selectedTechnologySignal.set(technology);
  }

  protected closeTechnologyDetails(): void {
    this.selectedTechnologySignal.set(null);
  }

  private resetProjectPage(): void {
    this.projectPageSignal.set(1);
  }
}
