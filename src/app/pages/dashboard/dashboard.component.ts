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
import { forkJoin } from 'rxjs';
import { DashboardService } from '../../core/api/dashboard/dashboard.service';
import { ProjectsService } from '../../core/api/projects/projects.service';
import { TranslationService } from '../../core/translation/translation.service';
import { ContainerComponent } from '../../layout/container/container.component';
import { InfoStateComponent } from '../../shared/info-state/info-state.component';
import { WrapperComponent } from '../../layout/wrapper/wrapper.component';
import { DashboardPageData } from './dashboard.types';
import {
  buildDashboardProjectTechnologyChart,
  buildDashboardTechnologyLevelChart,
  buildDashboardTechnologyTypeOptions,
  buildDashboardTechnologyUsageChart,
  buildDashboardStackChart,
  buildDashboardProjectEnvironmentChart,
  buildDashboardSummaryCards,
  buildDashboardTechnologyLeaders,
  mapDashboardStackRows,
} from './helpers/dashboard.helper';
import { SkillTypeFilterValue } from '../skills/skills.types';

@Component({
  selector: 'app-dashboard',
  imports: [
    ContainerComponent,
    InfoStateComponent,
    TranslatePipe,
    WrapperComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);
  private readonly projectsService = inject(ProjectsService);
  private readonly translationService = inject(TranslationService);
  private readonly dashboardDataSignal = signal<DashboardPageData | null>(null);
  private readonly selectedTechnologyTypeSignal =
    signal<SkillTypeFilterValue>('PROGRAMMING_LANGUAGES');

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly dashboardData = this.dashboardDataSignal.asReadonly();
  protected readonly selectedTechnologyType =
    this.selectedTechnologyTypeSignal.asReadonly();

  protected readonly summaryCards = computed(() => {
    const overview = this.dashboardData()?.overview;

    return overview
      ? buildDashboardSummaryCards(
          overview.summary,
          this.translationService.locale(),
        )
      : [];
  });

  protected readonly stackRows = computed(() => {
    const stackDistribution = this.dashboardData()?.overview.stackDistribution;

    return stackDistribution
      ? mapDashboardStackRows(
          stackDistribution,
          this.translationService.locale(),
        )
      : [];
  });

  protected readonly stackChart = computed(() => {
    const rows = this.stackRows();
    const locale = this.translationService.locale();

    return rows.length > 0
      ? buildDashboardStackChart(rows, locale)
      : null;
  });

  protected readonly technologyLevelChart = computed(() => {
    const technologyUsage = this.dashboardData()?.overview.technologyUsage;

    return technologyUsage && technologyUsage.levels.length > 0
      ? buildDashboardTechnologyLevelChart(
          technologyUsage,
          this.translationService.locale(),
        )
      : null;
  });

  protected readonly projectEnvironmentChart = computed(() => {
    const projectContexts = this.dashboardData()?.overview.projectContexts;

    return projectContexts && projectContexts.environments.length > 0
      ? buildDashboardProjectEnvironmentChart(
          projectContexts,
          this.translationService.locale(),
        )
      : null;
  });

  protected readonly technologyLeaders = computed(() => {
    const technologyUsage = this.dashboardData()?.overview.technologyUsage;

    return technologyUsage ? buildDashboardTechnologyLeaders(technologyUsage) : [];
  });

  protected readonly technologyUsageChart = computed(() => {
    const technologyUsage = this.dashboardData()?.overview.technologyUsage;

    return technologyUsage && technologyUsage.topTechnologies.length > 0
      ? buildDashboardTechnologyUsageChart(
          technologyUsage,
          this.translationService.locale(),
        )
      : null;
  });

  protected readonly technologyTypeOptions = computed(() => {
    const projects = this.dashboardData()?.projects;

    return projects
      ? buildDashboardTechnologyTypeOptions(
          projects,
          this.translationService.locale(),
        )
      : [];
  });

  protected readonly activeTechnologyType = computed<SkillTypeFilterValue>(() => {
    const selectedType = this.selectedTechnologyType();
    const availableTypes = this.technologyTypeOptions();

    return availableTypes.some((option) => option.value === selectedType)
      ? selectedType
      : availableTypes[0]?.value ?? selectedType;
  });

  protected readonly projectTechnologyChart = computed(() => {
    const projects = this.dashboardData()?.projects;
    const availableTypes = this.technologyTypeOptions();

    return projects && availableTypes.length > 0
      ? buildDashboardProjectTechnologyChart(
          projects,
          this.activeTechnologyType(),
          this.translationService.locale(),
        )
      : null;
  });

  constructor() {
    this.loadDashboardData();
  }

  protected selectTechnologyTypeFromEvent(event: Event): void {
    this.selectedTechnologyTypeSignal.set(
      this.resolveSelectValue(event) as SkillTypeFilterValue,
    );
  }

  private loadDashboardData(): void {
    this.isLoading.set(true);

    forkJoin({
      overview: this.dashboardService.getOverview(),
      projects: this.projectsService.getProjects(),
    })
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (dashboardData) => {
          this.dashboardDataSignal.set(dashboardData);
          this.hasError.set(false);
          this.isLoading.set(false);
        },
        error: () => {
          this.dashboardDataSignal.set(null);
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
  }

  private resolveSelectValue(event: Event): string {
    const customEvent = event as Event & {
      detail?: string | { value?: string };
      target: (EventTarget & { value?: string }) | null;
    };

    if (typeof customEvent.detail === 'string') {
      return customEvent.detail;
    }

    return customEvent.detail?.value ?? customEvent.target?.value ?? '';
  }
}
