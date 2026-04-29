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
import { TranslationService } from '../../core/translation/translation.service';
import { ContainerComponent } from '../../layout/container/container.component';
import { PageIntroComponent } from '../../layout/page-intro/page-intro.component';
import { PageWrapperComponent } from '../../layout/page-wrapper/page-wrapper.component';
import { PortfolioStateComponent } from '../../shared/portfolio-state/portfolio-state.component';
import { DashboardPageData } from './dashboard.types';
import {
  buildDashboardProjectDistribution,
  buildDashboardSummaryCards,
  buildDashboardTechnologyBreakdowns,
  buildDashboardTechnologyLeaders,
  mapDashboardHighlightCards,
  mapDashboardStackRows,
  mapDashboardTimelineCards,
} from './helpers/dashboard.helper';

@Component({
  selector: 'app-dashboard',
  imports: [
    PageIntroComponent,
    PageWrapperComponent,
    ContainerComponent,
    PortfolioStateComponent,
    TranslatePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);
  private readonly translationService = inject(TranslationService);
  private readonly dashboardDataSignal = signal<DashboardPageData | null>(null);

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly dashboardData = this.dashboardDataSignal.asReadonly();

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
    const stackDistribution = this.dashboardData()?.stackDistribution;

    return stackDistribution
      ? mapDashboardStackRows(
          stackDistribution,
          this.translationService.locale(),
        )
      : [];
  });

  protected readonly maxStackConnections = computed(() =>
    Math.max(
      ...this.stackRows().map((stack) => stack.totalConnections),
      1,
    ),
  );

  protected readonly projectDistribution = computed(() => {
    const projectContexts = this.dashboardData()?.projectContexts;

    return projectContexts
      ? buildDashboardProjectDistribution(
          projectContexts,
          this.translationService.locale(),
        )
      : null;
  });

  protected readonly technologyLeaders = computed(() => {
    const technologyUsage = this.dashboardData()?.technologyUsage;

    return technologyUsage ? buildDashboardTechnologyLeaders(technologyUsage) : [];
  });

  protected readonly technologyBreakdowns = computed(() => {
    const technologyUsage = this.dashboardData()?.technologyUsage;

    return technologyUsage
      ? buildDashboardTechnologyBreakdowns(
          technologyUsage,
          this.translationService.locale(),
        )
      : [];
  });

  protected readonly timelineCards = computed(() => {
    const professionalTimeline = this.dashboardData()?.professionalTimeline;

    return professionalTimeline
      ? mapDashboardTimelineCards(
          professionalTimeline,
          this.translationService.locale(),
        )
      : [];
  });

  protected readonly highlightCards = computed(() => {
    const highlights = this.dashboardData()?.highlights;

    return highlights
      ? mapDashboardHighlightCards(highlights, this.translationService.locale())
      : [];
  });

  constructor() {
    forkJoin({
      overview: this.dashboardService.getOverview(),
      stackDistribution: this.dashboardService.getStackDistribution(),
      projectContexts: this.dashboardService.getProjectContexts(),
      technologyUsage: this.dashboardService.getTechnologyUsage(),
      professionalTimeline: this.dashboardService.getProfessionalTimeline(),
      highlights: this.dashboardService.getHighlights(),
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

  protected resolveBarWidth(value: number, maxValue: number): string {
    if (maxValue <= 0) {
      return '0%';
    }

    return `${Math.max((value / maxValue) * 100, 12)}%`;
  }
}
