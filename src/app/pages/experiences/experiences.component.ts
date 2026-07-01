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
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { TagModalComponent } from '../../shared/tag/tag-modal/tag-modal.component';
import { TagModalDetail } from '../../shared/tag/tag-modal/tag-modal.types';
import { TechnologyModalComponent } from '../../shared/technology-modal/technology-modal.component';
import { TechnologyModalItem } from '../../shared/technology-modal/technology-modal.types';
import { ExperienceDetailModalComponent } from './components/experience-detail-modal/experience-detail-modal.component';
import { ExperienceTimelineCardComponent } from './components/experience-timeline-card/experience-timeline-card.component';
import { mapExperienceToTimelineItem } from './helpers/experiences.helper';
import { ExperienceCustomerViewModel } from './experiences.types';

@Component({
  selector: 'app-experiences',
  imports: [
    WrapperComponent,
    InfoStateComponent,
    ExperienceTimelineCardComponent,
    ExperienceDetailModalComponent,
    SectionHeaderComponent,
    TechnologyModalComponent,
    TagModalComponent,
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
  private readonly selectedTechnologySignal = signal<TechnologyModalItem | null>(null);
  private readonly selectedCustomerSignal =
    signal<ExperienceCustomerViewModel | null>(null);

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly experiences = this.experiencesSignal.asReadonly();
  protected readonly selectedExperience = this.selectedExperienceSignal.asReadonly();
  protected readonly selectedTechnology = this.selectedTechnologySignal.asReadonly();
  protected readonly selectedCustomer = this.selectedCustomerSignal.asReadonly();

  protected readonly timelineItems = computed(() =>
    this.experiences().map((experience) =>
      mapExperienceToTimelineItem(experience, this.translationService.locale()),
    ),
  );

  protected readonly isDetailOpen = computed(
    () => this.selectedExperience() !== null,
  );
  protected readonly isTechnologyModalOpen = computed(
    () => this.selectedTechnology() !== null,
  );
  protected readonly isCustomerDetailOpen = computed(
    () => this.selectedCustomer() !== null,
  );
  protected readonly selectedCustomerDetails = computed<readonly TagModalDetail[]>(() => {
    const customer = this.selectedCustomer();

    if (!customer) {
      return [];
    }

    return [
      {
        labelKey: 'pages.experiences.customer.company',
        value: customer.companyName,
      },
      {
        labelKey: 'pages.experiences.customer.projects',
        value: customer.projectCount,
      },
    ];
  });

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

  protected openTechnologyDetails(technology: TechnologyModalItem): void {
    this.selectedTechnologySignal.set(technology);
  }

  protected closeTechnologyDetails(): void {
    this.selectedTechnologySignal.set(null);
  }

  protected openCustomerDetails(customer: ExperienceCustomerViewModel): void {
    this.selectedCustomerSignal.set(customer);
  }

  protected closeCustomerDetails(): void {
    this.selectedCustomerSignal.set(null);
  }
}
