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
import { WrapperComponent } from '../../layout/wrapper/wrapper.component';
import { InfoStateComponent } from '../../shared/info-state/info-state.component';
import { ExperienceDetailModalComponent } from './components/experience-detail-modal/experience-detail-modal.component';
import { ExperienceTimelineCardComponent } from './components/experience-timeline-card/experience-timeline-card.component';
import { ExperienceTechnologyModalComponent } from './components/experience-technology-modal/experience-technology-modal.component';
import { mapExperienceToTimelineItem } from './helpers/experiences.helper';
import { ExperienceTechnologyViewModel } from './experiences.types';

@Component({
  selector: 'app-experiences',
  imports: [
    WrapperComponent,
    InfoStateComponent,
    ExperienceTimelineCardComponent,
    ExperienceDetailModalComponent,
    ExperienceTechnologyModalComponent,
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
  private readonly selectedExperienceSignal =
    signal<ReturnType<typeof mapExperienceToTimelineItem> | null>(null);
  private readonly selectedTechnologySignal =
    signal<ExperienceTechnologyViewModel | null>(null);

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly experiences = this.experiencesSignal.asReadonly();
  protected readonly selectedExperience = this.selectedExperienceSignal.asReadonly();
  protected readonly selectedTechnology = this.selectedTechnologySignal.asReadonly();

  protected readonly timelineItems = computed(() =>
    this.experiences().map((experience) =>
      mapExperienceToTimelineItem(experience, this.translationService.locale()),
    ),
  );

  protected readonly isDetailOpen = computed(
    () => this.selectedExperience() !== null,
  );
  protected readonly isTechnologyDetailOpen = computed(
    () => this.selectedTechnology() !== null,
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

  protected isSelectedExperience(experienceId: string): boolean {
    return this.selectedExperience()?.id === experienceId;
  }

  protected closeExperienceDetails(): void {
    this.selectedExperienceSignal.set(null);
  }

  protected openTechnologyDetails(technology: ExperienceTechnologyViewModel): void {
    this.selectedTechnologySignal.set(technology);
  }

  protected closeTechnologyDetails(): void {
    this.selectedTechnologySignal.set(null);
  }
}
