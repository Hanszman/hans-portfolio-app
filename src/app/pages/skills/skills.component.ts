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
import { TechnologiesService } from '../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../core/api/technologies/technologies.types';
import { TranslationService } from '../../core/translation/translation.service';
import { WrapperComponent } from '../../layout/wrapper/wrapper.component';
import { InfoStateComponent } from '../../shared/info-state/info-state.component';
import { TechnologyModalComponent } from '../../shared/technology-modal/technology-modal.component';
import { TechnologyModalItem } from '../../shared/technology-modal/technology-modal.types';
import { SkillCardComponent } from './components/skill-card/skill-card.component';
import {
  buildEducationSkillCards,
  buildLanguageSkillCards,
  mapTechnologyToSkillCard,
} from './helpers/skills.helper';
import {
  SKILL_LEVEL_FILTERS,
  SKILL_STACK_FILTERS,
  SkillCardViewModel,
  SkillLevelFilterValue,
  SkillStackFilterValue,
} from './skills.types';

@Component({
  selector: 'app-skills',
  imports: [
    WrapperComponent,
    InfoStateComponent,
    SkillCardComponent,
    TechnologyModalComponent,
    TranslatePipe,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  private readonly technologiesService = inject(TechnologiesService);
  private readonly translationService = inject(TranslationService);
  private readonly technologiesSignal = signal<TechnologyCollectionItemResponse[]>([]);
  private readonly selectedSkillSignal = signal<TechnologyModalItem | null>(null);
  private readonly searchTermSignal = signal('');
  private readonly selectedStackSignal = signal<SkillStackFilterValue>('ALL');
  private readonly selectedLevelSignal = signal<SkillLevelFilterValue>('ALL');

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly selectedSkill = this.selectedSkillSignal.asReadonly();
  protected readonly searchTerm = this.searchTermSignal.asReadonly();
  protected readonly selectedStack = this.selectedStackSignal.asReadonly();
  protected readonly selectedLevel = this.selectedLevelSignal.asReadonly();
  protected readonly stackFilters = SKILL_STACK_FILTERS;
  protected readonly levelFilters = SKILL_LEVEL_FILTERS;

  protected readonly educationCards = computed(() =>
    buildEducationSkillCards(this.translationService.locale()),
  );

  protected readonly languageCards = computed(() =>
    buildLanguageSkillCards(this.translationService.locale()),
  );

  protected readonly technologyCards = computed(() =>
    this.technologiesSignal()
      .map((technology) =>
        mapTechnologyToSkillCard(technology, this.translationService.locale()),
      )
      .sort(
        (left, right) =>
          (right.contexts[0]?.totalMonths ?? 0) - (left.contexts[0]?.totalMonths ?? 0),
      ),
  );

  protected readonly filteredTechnologyCards = computed(() => {
    const searchTerm = this.searchTerm().trim().toLowerCase();
    const selectedStack = this.selectedStack();
    const selectedLevel = this.selectedLevel();

    return this.technologyCards().filter((card) => {
      const matchesSearch =
        !searchTerm ||
        card.name.toLowerCase().includes(searchTerm) ||
        card.categoryLabel.toLowerCase().includes(searchTerm);
      const matchesStack = selectedStack === 'ALL' || card.stackKey === selectedStack;
      const matchesLevel = selectedLevel === 'ALL' || card.levelKey === selectedLevel;

      return matchesSearch && matchesStack && matchesLevel;
    });
  });

  protected readonly technologyCount = computed(() =>
    String(this.technologyCards().length),
  );

  protected readonly isSkillModalOpen = computed(() => this.selectedSkill() !== null);

  constructor() {
    this.technologiesService
      .getTechnologies()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (response) => {
          this.technologiesSignal.set(response.data);
          this.hasError.set(false);
          this.isLoading.set(false);
        },
        error: () => {
          this.technologiesSignal.set([]);
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });
  }

  protected updateSearchTerm(event: Event): void {
    this.searchTermSignal.set((event.target as HTMLInputElement).value);
  }

  protected selectStackFilter(value: SkillStackFilterValue): void {
    this.selectedStackSignal.set(value);
  }

  protected selectLevelFilter(value: SkillLevelFilterValue): void {
    this.selectedLevelSignal.set(value);
  }

  protected openSkillDetails(skill: SkillCardViewModel): void {
    this.selectedSkillSignal.set(skill.modal);
  }

  protected closeSkillDetails(): void {
    this.selectedSkillSignal.set(null);
  }
}
