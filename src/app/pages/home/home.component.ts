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
import { forkJoin } from 'rxjs';
import { DashboardService } from '../../core/api/dashboard/dashboard.service';
import { DashboardOverviewResponse } from '../../core/api/dashboard/dashboard.types';
import { ProjectsService } from '../../core/api/projects/projects.service';
import { ProjectCollectionItemResponse } from '../../core/api/projects/projects.types';
import { TechnologiesService } from '../../core/api/technologies/technologies.service';
import { TranslationService, translateStaticKey } from '../../core/translation/translation.service';
import { InfoStateComponent } from '../../shared/info-state/info-state.component';
import { ProjectModalComponent } from '../../shared/project-modal/project-modal.component';
import { ProjectModalItem } from '../../shared/project-modal/project-modal.types';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { TechnologyModalComponent } from '../../shared/technology-modal/technology-modal.component';
import { TechnologyModalItem } from '../../shared/technology-modal/technology-modal.types';
import { sortTagItems } from '../../shared/tag/helpers/tag-order.helper';
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
  HomePrimaryCardViewModel,
  HomeStackChipViewModel,
} from './home.types';
import { formatCountInFiveStep, mapHighlightedProjects } from './helpers/home.helper';
import { HomeHeroSectionComponent } from './components/home-hero-section/home-hero-section.component';
import { HomePrimaryCardsComponent } from './components/home-primary-cards/home-primary-cards.component';
import { HomeSecondaryCardsComponent } from './components/home-secondary-cards/home-secondary-cards.component';
import { HomeStackChipsComponent } from './components/home-stack-chips/home-stack-chips.component';

@Component({
  selector: 'app-home',
  imports: [
    HomeHeroSectionComponent,
    HomePrimaryCardsComponent,
    HomeSecondaryCardsComponent,
    HomeStackChipsComponent,
    ProjectModalComponent,
    RouterLink,
    SectionHeaderComponent,
    TechnologyModalComponent,
    WrapperComponent,
    InfoStateComponent,
    TranslatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly dashboardService = inject(DashboardService);
  private readonly projectsService = inject(ProjectsService);
  private readonly technologiesService = inject(TechnologiesService);
  private readonly translationService = inject(TranslationService);
  private readonly dashboardSignal = signal<DashboardOverviewResponse | null>(null);
  private readonly projectsSignal = signal<ProjectCollectionItemResponse[]>([]);
  private readonly projectCountSignal = signal(0);
  private readonly technologyCountSignal = signal(0);
  private readonly selectedProjectSignal = signal<ProjectModalItem | null>(null);
  private readonly selectedTechnologySignal = signal<TechnologyModalItem | null>(null);

  protected readonly hero = HOME_HERO;
  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly dashboard = this.dashboardSignal.asReadonly();
  protected readonly selectedTechnology = this.selectedTechnologySignal.asReadonly();
  protected readonly selectedProject = this.selectedProjectSignal.asReadonly();
  protected readonly highlightedProjects = computed(() =>
    mapHighlightedProjects(this.projectsSignal(), this.translationService.locale()),
  );
  protected readonly primaryCards = computed<readonly HomePrimaryCardViewModel[]>(() => {
    return [
      {
        value: `${this.calculateCareerYears()}+`,
        labelKey: 'pages.home.metrics.years.label',
        descriptionKey: 'pages.home.metrics.years.description',
        iconName: 'LuBadgeCheck',
      },
      {
        value: formatCountInFiveStep(this.technologyCountSignal()),
        labelKey: 'common.entities.technologies',
        descriptionKey: 'pages.home.metrics.technologies.description',
        iconName: 'LuCpu',
      },
      {
        value: formatCountInFiveStep(this.projectCountSignal()),
        labelKey: 'pages.home.metrics.projects.label',
        descriptionKey: 'pages.home.metrics.projects.description',
        iconName: 'LuFolderKanban',
      },
    ];
  });

  protected readonly topTechnologyChips = computed<readonly HomeStackChipViewModel[]>(() =>
    sortTagItems(
      this.dashboard()?.technologyUsage.topTechnologies ?? [],
      ({ name }) => name,
      this.translationService.locale(),
    ).map((technology) => {
      const imageSrc = resolveSkillVisualUrl(technology.slug);
      const stackKey = resolveSkillStackKey(technology);
      const typeKey = resolveSkillTypeKey(technology);
      const locale = this.translationService.locale();

      return {
        slug: technology.slug,
        label: technology.name,
        image: imageSrc
          ? {
              src: imageSrc,
              alt: `${technology.name} icon`,
            }
          : null,
        value: {
          slug: technology.slug,
          name: technology.name,
          type: translateStaticKey(locale, SKILL_TYPE_LABEL_KEYS[typeKey]),
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
    forkJoin({
      dashboard: this.dashboardService.getOverview(),
      projects: this.projectsService.getProjects(),
      technologies: this.technologiesService.getTechnologies(),
    })
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: ({ dashboard, projects, technologies }) => {
          this.dashboardSignal.set(dashboard);
          this.projectsSignal.set(projects.data);
          this.projectCountSignal.set(projects.pagination.totalItems);
          this.technologyCountSignal.set(technologies.pagination.totalItems);
          this.hasError.set(false);
          this.isLoading.set(false);
        },
        error: () => {
          this.dashboardSignal.set(null);
          this.projectsSignal.set([]);
          this.projectCountSignal.set(0);
          this.technologyCountSignal.set(0);
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
  }

  private calculateCareerYears(referenceDate = new Date()): number {
    const yearDiff = referenceDate.getUTCFullYear() - CAREER_START_DATE.getUTCFullYear();
    const monthDiff = referenceDate.getUTCMonth() - CAREER_START_DATE.getUTCMonth();
    const dayDiff = referenceDate.getUTCDate() - CAREER_START_DATE.getUTCDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      return yearDiff - 1;
    }

    return yearDiff;
  }

  protected openTechnologyDetails(technology: TechnologyModalItem): void {
    this.selectedProjectSignal.set(null);
    this.selectedTechnologySignal.set(technology);
  }

  protected closeTechnologyDetails(): void {
    this.selectedTechnologySignal.set(null);
  }

  protected openProjectDetails(project: ProjectModalItem): void {
    this.selectedTechnologySignal.set(null);
    this.selectedProjectSignal.set(project);
  }

  protected closeProjectDetails(): void {
    this.selectedProjectSignal.set(null);
  }
}
