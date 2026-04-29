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
import { ExperiencesService } from '../../core/api/experiences/experiences.service';
import { ExperienceCollectionItemResponse } from '../../core/api/experiences/experiences.types';
import { TranslationService } from '../../core/translation/translation.service';
import { ContainerComponent } from '../../layout/container/container.component';
import { PageIntroComponent } from '../../layout/page-intro/page-intro.component';
import { PageWrapperComponent } from '../../layout/page-wrapper/page-wrapper.component';
import { PortfolioStateComponent } from '../../shared/portfolio-state/portfolio-state.component';
import { ExperienceDetailModalComponent } from './components/experience-detail-modal/experience-detail-modal.component';
import { ExperienceTimelineCardComponent } from './components/experience-timeline-card/experience-timeline-card.component';
import {
  buildExperiencePortfolioSummary,
  mapExperienceToTimelineItem,
} from './helpers/experiences.helper';

@Component({
  selector: 'app-experiences',
  imports: [
    PageIntroComponent,
    PageWrapperComponent,
    ContainerComponent,
    PortfolioStateComponent,
    ExperienceTimelineCardComponent,
    ExperienceDetailModalComponent,
    TranslatePipe,
  ],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperiencesComponent {
  private readonly experiencesService = inject(ExperiencesService);
  private readonly translationService = inject(TranslationService);
  private readonly experiencesSignal = signal<ExperienceCollectionItemResponse[]>([]);
  private readonly selectedExperienceSignal = signal<ReturnType<typeof mapExperienceToTimelineItem> | null>(
    null,
  );

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly experiences = this.experiencesSignal.asReadonly();
  protected readonly selectedExperience = this.selectedExperienceSignal.asReadonly();

  protected readonly experienceSummary = computed(() =>
    buildExperiencePortfolioSummary(
      this.experiences(),
      this.translationService.locale(),
    ),
  );

  protected readonly timelineItems = computed(() =>
    this.experiences().map((experience) =>
      mapExperienceToTimelineItem(
        experience,
        this.translationService.locale(),
      ),
    ),
  );

  protected readonly isDetailOpen = computed(
    () => this.selectedExperience() !== null,
  );

  constructor() {
    this.experiencesService
      .getExperiences()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (response) => {
          this.experiencesSignal.set(response.data);
          this.hasError.set(false);
          this.isLoading.set(false);
        },
        error: () => {
          this.experiencesSignal.set([]);
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
  }

  protected openExperienceDetails(
    item: ReturnType<typeof mapExperienceToTimelineItem>,
  ): void {
    this.selectedExperienceSignal.set(item);
  }

  protected closeExperienceDetails(): void {
    this.selectedExperienceSignal.set(null);
  }
}
