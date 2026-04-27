import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectsService } from '../../core/api/projects/projects.service';
import { ProjectCollectionItemResponse } from '../../core/api/projects/projects.types';
import { TranslationService } from '../../core/translation/translation.service';
import { ContainerComponent } from '../../layout/container/container.component';
import { PageIntroComponent } from '../../layout/page-intro/page-intro.component';
import { PageWrapperComponent } from '../../layout/page-wrapper/page-wrapper.component';
import {
  buildProjectsSummaryMetrics,
  extractProjectFilterValues,
  mapProjectToCaseCard,
} from './helpers/projects.helper';
import {
  PROJECT_CONTEXT_LABEL_KEYS,
  PROJECT_ENVIRONMENT_LABEL_KEYS,
  PROJECT_FILTER_ALL_LABEL_KEYS,
  PROJECT_SORT_LABEL_KEYS,
  PROJECT_STATUS_LABEL_KEYS,
  ProjectFilterOption,
  ProjectSortKey,
  ProjectsDropdownElement,
  ProjectsSelectEvent,
} from './projects.types';

@Component({
  selector: 'app-projects',
  imports: [
    PageIntroComponent,
    PageWrapperComponent,
    ContainerComponent,
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
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly contextDropdown =
    viewChild<ElementRef<ProjectsDropdownElement>>('contextDropdown');
  private readonly environmentDropdown =
    viewChild<ElementRef<ProjectsDropdownElement>>('environmentDropdown');
  private readonly statusDropdown =
    viewChild<ElementRef<ProjectsDropdownElement>>('statusDropdown');
  private readonly sortDropdown =
    viewChild<ElementRef<ProjectsDropdownElement>>('sortDropdown');
  private readonly projectsSignal = signal<ProjectCollectionItemResponse[]>([]);
  private readonly selectedContextSignal = signal('ALL');
  private readonly selectedEnvironmentSignal = signal('ALL');
  private readonly selectedStatusSignal = signal('ALL');
  private readonly selectedSortSignal = signal<ProjectSortKey>('FEATURED');

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly projects = this.projectsSignal.asReadonly();
  protected readonly selectedContext = this.selectedContextSignal.asReadonly();
  protected readonly selectedEnvironment =
    this.selectedEnvironmentSignal.asReadonly();
  protected readonly selectedStatus = this.selectedStatusSignal.asReadonly();
  protected readonly selectedSort = this.selectedSortSignal.asReadonly();

  protected readonly summaryMetrics = computed(() =>
    buildProjectsSummaryMetrics(
      this.projects(),
      this.translationService.locale(),
    ),
  );

  protected readonly filterValues = computed(() =>
    extractProjectFilterValues({
      data: this.projects(),
      pagination: {
        page: 1,
        pageSize: this.projects().length,
        totalItems: this.projects().length,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    }),
  );

  protected readonly contextOptions = computed(() =>
    this.buildContextOptions(this.filterValues().contexts),
  );

  protected readonly environmentOptions = computed(() =>
    this.buildEnvironmentOptions(this.filterValues().environments),
  );

  protected readonly statusOptions = computed(() =>
    this.buildStatusOptions(this.filterValues().statuses),
  );

  protected readonly sortOptions = computed(() => this.buildSortOptions());

  protected readonly filteredProjects = computed(() =>
    this.projects().filter((project) => {
      const matchesContext =
        this.selectedContext() === 'ALL' || project.context === this.selectedContext();
      const matchesEnvironment =
        this.selectedEnvironment() === 'ALL' ||
        project.environment === this.selectedEnvironment();
      const matchesStatus =
        this.selectedStatus() === 'ALL' || project.status === this.selectedStatus();

      return matchesContext && matchesEnvironment && matchesStatus;
    }),
  );

  protected readonly sortedProjects = computed(() =>
    [...this.filteredProjects()].sort((left, right) => {
      switch (this.selectedSort()) {
        case 'RECENT':
          return (
            new Date(right.startDate).getTime() - new Date(left.startDate).getTime() ||
            left.sortOrder - right.sortOrder
          );
        case 'STACK':
          return (
            right.technologies.length - left.technologies.length ||
            left.sortOrder - right.sortOrder
          );
        case 'LINKS':
          return (
            right.links.length +
              right.imageAssets.length -
              (left.links.length + left.imageAssets.length) ||
            left.sortOrder - right.sortOrder
          );
        case 'FEATURED':
        default:
          return (
            Number(right.featured) - Number(left.featured) ||
            Number(right.highlight) - Number(left.highlight) ||
            left.sortOrder - right.sortOrder
          );
      }
    }),
  );

  protected readonly projectCases = computed(() =>
    this.sortedProjects().map((project) =>
      mapProjectToCaseCard(project, this.translationService.locale()),
    ),
  );

  protected readonly filteredCountLabel = computed(() =>
    String(this.filteredProjects().length),
  );

  constructor() {
    effect((onCleanup) => {
      this.bindDropdownOptions(
        this.contextDropdown()?.nativeElement,
        this.contextOptions(),
        onCleanup,
      );
    });

    effect((onCleanup) => {
      this.bindDropdownOptions(
        this.environmentDropdown()?.nativeElement,
        this.environmentOptions(),
        onCleanup,
      );
    });

    effect((onCleanup) => {
      this.bindDropdownOptions(
        this.statusDropdown()?.nativeElement,
        this.statusOptions(),
        onCleanup,
      );
    });

    effect((onCleanup) => {
      this.bindDropdownOptions(
        this.sortDropdown()?.nativeElement,
        this.sortOptions(),
        onCleanup,
      );
    });

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

  protected selectContext(event: Event): void {
    this.selectedContextSignal.set((event as ProjectsSelectEvent).detail.value);
    this.changeDetectorRef.markForCheck();
  }

  protected selectEnvironment(event: Event): void {
    this.selectedEnvironmentSignal.set((event as ProjectsSelectEvent).detail.value);
    this.changeDetectorRef.markForCheck();
  }

  protected selectStatus(event: Event): void {
    this.selectedStatusSignal.set((event as ProjectsSelectEvent).detail.value);
    this.changeDetectorRef.markForCheck();
  }

  protected selectSort(event: Event): void {
    this.selectedSortSignal.set(
      (event as ProjectsSelectEvent).detail.value as ProjectSortKey,
    );
    this.changeDetectorRef.markForCheck();
  }

  private bindDropdownOptions(
    dropdown: ProjectsDropdownElement | undefined,
    options: readonly ProjectFilterOption[],
    onCleanup: (cleanupFn: () => void) => void,
  ): void {
    if (!dropdown) {
      return;
    }

    let isCleanedUp = false;
    const applyOptions = (): void => {
      if (!isCleanedUp) {
        dropdown.options = options;
      }
    };

    if (customElements.get('hans-dropdown')) {
      applyOptions();
    } else {
      void customElements.whenDefined('hans-dropdown').then(applyOptions);
    }

    onCleanup(() => {
      isCleanedUp = true;
    });
  }

  private buildContextOptions(values: readonly string[]): readonly ProjectFilterOption[] {
    return [
      {
        label: this.translationService.instant(PROJECT_FILTER_ALL_LABEL_KEYS.contexts),
        value: 'ALL',
      },
      ...values.map((value) => ({
        label: PROJECT_CONTEXT_LABEL_KEYS[value]
          ? this.translationService.instant(PROJECT_CONTEXT_LABEL_KEYS[value])
          : value,
        value,
      })),
    ];
  }

  private buildEnvironmentOptions(
    values: readonly string[],
  ): readonly ProjectFilterOption[] {
    return [
      {
        label: this.translationService.instant(
          PROJECT_FILTER_ALL_LABEL_KEYS.environments,
        ),
        value: 'ALL',
      },
      ...values.map((value) => ({
        label: PROJECT_ENVIRONMENT_LABEL_KEYS[value]
          ? this.translationService.instant(PROJECT_ENVIRONMENT_LABEL_KEYS[value])
          : value,
        value,
      })),
    ];
  }

  private buildStatusOptions(values: readonly string[]): readonly ProjectFilterOption[] {
    return [
      {
        label: this.translationService.instant(PROJECT_FILTER_ALL_LABEL_KEYS.statuses),
        value: 'ALL',
      },
      ...values.map((value) => ({
        label: PROJECT_STATUS_LABEL_KEYS[value]
          ? this.translationService.instant(PROJECT_STATUS_LABEL_KEYS[value])
          : value,
        value,
      })),
    ];
  }

  private buildSortOptions(): readonly ProjectFilterOption[] {
    return (Object.entries(PROJECT_SORT_LABEL_KEYS) as [
      ProjectSortKey,
      (typeof PROJECT_SORT_LABEL_KEYS)[ProjectSortKey],
    ][]).map(([value, key]) => ({
      label: this.translationService.instant(key),
      value,
    }));
  }
}
