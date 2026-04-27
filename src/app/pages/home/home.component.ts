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
import { buildAssetUrl } from '../../core/api/api.config';
import { DashboardService } from '../../core/api/dashboard/dashboard.service';
import { DashboardOverviewResponse } from '../../core/api/dashboard/dashboard.types';
import {
  resolveLocalizedText,
  TranslationService,
} from '../../core/translation/translation.service';
import { ContainerComponent } from '../../layout/container/container.component';
import { PageIntroComponent } from '../../layout/page-intro/page-intro.component';
import { PageWrapperComponent } from '../../layout/page-wrapper/page-wrapper.component';
import {
  HomeApiSnapshotMetricViewModel,
  HomeCareerFocusViewModel,
  HomeHighlightViewModel,
  HomeMetricViewModel,
  HomeStackViewModel,
  HomeTechnologyViewModel,
  HomeVisualViewModel,
  HOME_PROFILE_IMAGE_SRC,
  HOME_SENIORITY_PILLARS,
  resolveHomeEntityIconName,
  resolveHomeStackIconName,
  resolveHomeTechnologyIconName,
  resolveHomeTechnologyVisualUrl,
} from './home.types';

@Component({
  selector: 'app-home',
  imports: [
    ContainerComponent,
    PageIntroComponent,
    PageWrapperComponent,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly dashboardService = inject(DashboardService);
  private readonly translationService = inject(TranslationService);
  private readonly dashboardSignal = signal<DashboardOverviewResponse | null>(
    null,
  );

  protected readonly seniorityPillars = HOME_SENIORITY_PILLARS;
  protected readonly profileImageSrc = buildAssetUrl(HOME_PROFILE_IMAGE_SRC);
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
          iconName: 'LuBadgeCheck',
        },
        {
          value: this.formatCount(summary?.projects, '0'),
          labelKey: 'pages.home.metrics.projects.label',
          descriptionKey: 'pages.home.metrics.projects.description',
          iconName: 'LuFolderKanban',
        },
        {
          value: this.formatCount(summary?.technologies, '0'),
          labelKey: 'pages.home.metrics.technologies.label',
          descriptionKey: 'pages.home.metrics.technologies.description',
          iconName: 'LuCpu',
        },
        {
          value: this.formatCount(summary?.experiences, '0'),
          labelKey: 'pages.home.metrics.experiences.label',
          descriptionKey: 'pages.home.metrics.experiences.description',
          iconName: 'LuBriefcaseBusiness',
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
        name: this.resolveApiText(locale, stack.namePt, stack.nameEn),
        projectCount: stack.projectCount,
        technologyCount: stack.technologyCount,
        iconName: resolveHomeStackIconName(stack.slug),
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
      title: this.resolveApiText(locale, highlight.titlePt, highlight.titleEn),
      subtitle: this.resolveApiText(
        locale,
        highlight.subtitlePt ?? '',
        highlight.subtitleEn ?? '',
      ),
      featured: highlight.featured === true,
      visualUrl: buildAssetUrl(highlight.imagePath ?? highlight.icon),
      iconName: resolveHomeEntityIconName(highlight.entity),
    }));
  });

  protected readonly topTechnologies = computed<readonly HomeTechnologyViewModel[]>(
    () =>
      (this.dashboard()?.technologyUsage.topTechnologies ?? [])
        .slice(0, 6)
        .map((technology) => ({
          slug: technology.slug,
          name: technology.name,
          usageCount: technology.usageCount,
          iconName: resolveHomeTechnologyIconName(technology.category),
          visualUrl: buildAssetUrl(
            resolveHomeTechnologyVisualUrl(technology.slug),
          ),
        })),
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
        title: this.resolveApiText(locale, focus.titlePt, focus.titleEn),
        technologies: focus.technologies.slice(0, 4),
        customers: focus.customers.slice(0, 3),
        projects: focus.projects.slice(0, 3),
        imageUrl: buildAssetUrl(focus.imagePath),
      };
    },
  );

  protected readonly apiSnapshotMetrics = computed<
    readonly HomeApiSnapshotMetricViewModel[]
  >(() => {
    const dashboard = this.dashboard();

    return [
      {
        labelKey: 'pages.home.api.featuredProjects',
        value: this.formatCount(dashboard?.projectContexts.featuredProjects, '0'),
        iconName: 'LuSparkles',
      },
      {
        labelKey: 'pages.home.api.highlightedProjects',
        value: this.formatCount(
          dashboard?.projectContexts.highlightedProjects,
          '0',
        ),
        iconName: 'LuStar',
      },
      {
        labelKey: 'pages.home.api.usageLinks',
        value: this.formatCount(dashboard?.technologyUsage.totalUsageLinks, '0'),
        iconName: 'LuNetwork',
      },
    ];
  });

  protected readonly showcaseVisuals = computed<readonly HomeVisualViewModel[]>(
    () => {
      const visuals: HomeVisualViewModel[] = [];
      const career = this.careerFocus();

      if (career?.imageUrl) {
        visuals.push({
          id: `career-${career.companyName}`,
          alt: career.companyName,
          src: career.imageUrl,
        });
      }

      for (const highlight of this.selectedHighlights()) {
        if (highlight.visualUrl) {
          visuals.push({
            id: `${highlight.entity}-${highlight.slug}`,
            alt: highlight.title,
            src: highlight.visualUrl,
          });
        }
      }

      return visuals.filter(
        (visual, index, allVisuals) =>
          allVisuals.findIndex((item) => item.src === visual.src) === index,
      );
    },
  );

  constructor() {
    this.dashboardService
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

  private resolveApiText(
    locale: ReturnType<TranslationService['locale']>,
    portuguese: string,
    english: string,
  ): string {
    return resolveLocalizedText(
      locale,
      {
        'pt-BR': portuguese,
        'en-us': english,
      },
      english,
    );
  }
}
