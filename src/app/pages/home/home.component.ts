import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { DashboardApiService } from '../../core/api/dashboard-api.service';
import { DashboardOverviewResponse } from '../../core/api/dashboard-api.types';
import { TranslationService } from '../../core/translation/translation.service';
import { PageIntroComponent } from '../../layout/page-intro/page-intro.component';
import { PageWrapperComponent } from '../../layout/page-wrapper/page-wrapper.component';
import { SurfaceComponent } from '../../layout/surface/surface.component';
import {
  HomeCareerFocusViewModel,
  HomeHighlightViewModel,
  HomeMetricViewModel,
  HomeStackViewModel,
  HOME_SENIORITY_PILLARS,
} from './home.types';

@Component({
  selector: 'app-home',
  imports: [
    PageIntroComponent,
    PageWrapperComponent,
    RouterLink,
    SurfaceComponent,
    TranslatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly dashboardApiService = inject(DashboardApiService);
  private readonly translationService = inject(TranslationService);
  private readonly dashboardSignal = signal<DashboardOverviewResponse | null>(
    null,
  );

  protected readonly seniorityPillars = HOME_SENIORITY_PILLARS;
  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly dashboard = this.dashboardSignal.asReadonly();

  protected readonly heroMetrics = computed<readonly HomeMetricViewModel[]>(
    () => {
      const summary = this.dashboard()?.summary;

      return [
        {
          value: '7+',
          labelKey: 'pages.home.metrics.years.label',
          descriptionKey: 'pages.home.metrics.years.description',
        },
        {
          value: this.formatCount(summary?.projects, '0'),
          labelKey: 'pages.home.metrics.projects.label',
          descriptionKey: 'pages.home.metrics.projects.description',
        },
        {
          value: this.formatCount(summary?.technologies, '0'),
          labelKey: 'pages.home.metrics.technologies.label',
          descriptionKey: 'pages.home.metrics.technologies.description',
        },
        {
          value: this.formatCount(summary?.experiences, '0'),
          labelKey: 'pages.home.metrics.experiences.label',
          descriptionKey: 'pages.home.metrics.experiences.description',
        },
      ];
    },
  );

  protected readonly stackHighlights = computed<readonly HomeStackViewModel[]>(
    () => {
      const locale = this.translationService.locale();
      const stacks = this.dashboard()?.stackDistribution.stacks ?? [];

      return stacks.slice(0, 3).map((stack) => ({
        slug: stack.slug,
        name: locale === 'pt-BR' ? stack.namePt : stack.nameEn,
        projectCount: stack.projectCount,
        technologyCount: stack.technologyCount,
      }));
    },
  );

  protected readonly selectedHighlights = computed<
    readonly HomeHighlightViewModel[]
  >(() => {
    const locale = this.translationService.locale();
    const highlights = this.dashboard()?.highlights.items ?? [];

    return highlights.slice(0, 3).map((highlight) => ({
      entity: highlight.entity,
      slug: highlight.slug,
      title: locale === 'pt-BR' ? highlight.titlePt : highlight.titleEn,
      subtitle:
        (locale === 'pt-BR' ? highlight.subtitlePt : highlight.subtitleEn) ??
        '',
      featured: highlight.featured === true,
    }));
  });

  protected readonly topTechnologies = computed<readonly string[]>(() =>
    (this.dashboard()?.technologyUsage.topTechnologies ?? [])
      .slice(0, 6)
      .map((technology) => technology.name),
  );

  protected readonly careerFocus = computed<HomeCareerFocusViewModel | null>(
    () => {
      const locale = this.translationService.locale();
      const timeline = this.dashboard()?.professionalTimeline.items ?? [];
      const focus =
        timeline.find((item) => item.isCurrent) ??
        timeline.find((item) => item.highlight) ??
        timeline[0];

      if (!focus) {
        return null;
      }

      return {
        companyName: focus.companyName,
        title: locale === 'pt-BR' ? focus.titlePt : focus.titleEn,
        technologies: focus.technologies.slice(0, 4),
      };
    },
  );

  protected readonly apiSnapshotMetrics = computed(() => {
    const dashboard = this.dashboard();

    return {
      featuredProjects: this.formatCount(
        dashboard?.projectContexts.featuredProjects,
        '0',
      ),
      highlightedProjects: this.formatCount(
        dashboard?.projectContexts.highlightedProjects,
        '0',
      ),
      usageLinks: this.formatCount(
        dashboard?.technologyUsage.totalUsageLinks,
        '0',
      ),
    };
  });

  constructor() {
    this.dashboardApiService
      .getOverview()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (dashboard) => {
          this.dashboardSignal.set(dashboard);
          this.hasError.set(false);
          this.isLoading.set(false);
        },
        error: () => {
          this.dashboardSignal.set(null);
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
  }

  private formatCount(value: number | undefined, fallback: string): string {
    return typeof value === 'number' ? String(value) : fallback;
  }
}
