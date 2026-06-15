import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { DashboardService } from '../../core/api/dashboard/dashboard.service';
import { DashboardOverviewResponse } from '../../core/api/dashboard/dashboard.types';
import { TranslationService, translateStaticKey } from '../../core/translation/translation.service';
import { InfoStateComponent } from '../../shared/info-state/info-state.component';
import { TechnologyModalComponent } from '../../shared/technology-modal/technology-modal.component';
import { TechnologyModalItem } from '../../shared/technology-modal/technology-modal.types';
import { WrapperComponent } from '../../layout/wrapper/wrapper.component';
import {
  resolveSkillStackKey,
  resolveSkillTypeKey,
  resolveSkillVisualUrl,
} from '../skills/helpers/skills.helper';
import { SKILL_STACK_LABEL_KEYS, SKILL_TYPE_LABEL_KEYS } from '../skills/skills.types';
import {
  CAREER_START_DATE,
  HOME_HERO,
  HOME_NAVIGATION_CARDS,
  HomeMetricViewModel,
  HomeStackChipViewModel,
} from './home.types';
import { HomeHeroSectionComponent } from './components/home-hero-section/home-hero-section.component';
import { HomeMetricsStripComponent } from './components/home-metrics-strip/home-metrics-strip.component';
import { HomeNavigationCardsComponent } from './components/home-navigation-cards/home-navigation-cards.component';
import { HomeStackChipsComponent } from './components/home-stack-chips/home-stack-chips.component';

@Component({
  selector: 'app-home',
  imports: [
    HomeHeroSectionComponent,
    HomeMetricsStripComponent,
    HomeNavigationCardsComponent,
    HomeStackChipsComponent,
    TechnologyModalComponent,
    WrapperComponent,
    InfoStateComponent,
    TranslatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly dashboardService = inject(DashboardService);
  private readonly translationService = inject(TranslationService);
  private readonly dashboardSignal = signal<DashboardOverviewResponse | null>(
    null,
  );
  private readonly selectedTechnologySignal = signal<TechnologyModalItem | null>(null);

  protected readonly hero = HOME_HERO;
  protected readonly navigationCards = HOME_NAVIGATION_CARDS;
  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly dashboard = this.dashboardSignal.asReadonly();
  protected readonly selectedTechnology = this.selectedTechnologySignal.asReadonly();
  protected readonly isTechnologyModalOpen = computed(
    () => this.selectedTechnology() !== null,
  );

  protected readonly heroMetrics = computed<readonly HomeMetricViewModel[]>(
    () => {
      const summary = this.dashboard()?.summary;

      return [
        {
          value: `${this.calculateCareerYears()}+`,
          labelKey: 'pages.home.metrics.years.label',
          descriptionKey: 'pages.home.metrics.years.description',
          iconName: 'LuBadgeCheck',
        },
        {
          value: this.formatCount(summary?.technologies, '60+'),
          labelKey: 'pages.home.metrics.technologies.label',
          descriptionKey: 'pages.home.metrics.technologies.description',
          iconName: 'LuCpu',
        },
        {
          value: this.formatCount(summary?.projects, '13+'),
          labelKey: 'pages.home.metrics.projects.label',
          descriptionKey: 'pages.home.metrics.projects.description',
          iconName: 'LuFolderKanban',
        },
      ];
    },
  );

  protected readonly topTechnologyChips = computed<
    readonly HomeStackChipViewModel[]
  >(() =>
    (this.dashboard()?.technologyUsage.topTechnologies ?? [])
      .slice(0, 8)
      .map((technology) => {
        const imageSrc = resolveSkillVisualUrl(technology.slug);
        const stackKey = resolveSkillStackKey(technology);
        const typeKey = resolveSkillTypeKey(technology);
        const locale = this.translationService.locale();

        return {
          slug: technology.slug,
          label: technology.name,
          modal: {
            name: technology.name,
            category: translateStaticKey(locale, SKILL_TYPE_LABEL_KEYS[typeKey]),
            stack: translateStaticKey(locale, SKILL_STACK_LABEL_KEYS[stackKey]),
            projectCount: technology.usageCount,
            image: imageSrc
              ? {
                  src: imageSrc,
                  alt: `${technology.name} icon`,
                }
              : null,
          },
        };
      }),
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
    return typeof value === 'number' ? `${value}+` : fallback;
  }

  private calculateCareerYears(referenceDate = new Date()): number {
    const yearDiff =
      referenceDate.getUTCFullYear() - CAREER_START_DATE.getUTCFullYear();
    const monthDiff =
      referenceDate.getUTCMonth() - CAREER_START_DATE.getUTCMonth();
    const dayDiff = referenceDate.getUTCDate() - CAREER_START_DATE.getUTCDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return yearDiff - 1;
    }

    return yearDiff;
  }

  protected openTechnologyDetails(technology: HomeStackChipViewModel): void {
    this.selectedTechnologySignal.set(technology.modal);
  }

  protected closeTechnologyDetails(): void {
    this.selectedTechnologySignal.set(null);
  }
}
