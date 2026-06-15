import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterEveryRender,
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
import { applySkillsSelectOptionScrollPatch } from './helpers/skills-select-option.helper';
import {
  SKILL_LEVEL_FILTERS,
  SKILL_STACK_FILTERS,
  SKILL_TYPE_FILTERS,
  SkillFilterOption,
  SkillFilterChipViewModel,
  SkillCardViewModel,
  SkillLevelFilterValue,
  SkillsSelectEvent,
  SkillStackFilterValue,
  SkillTypeFilterValue,
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
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly technologiesService = inject(TechnologiesService);
  private readonly translationService = inject(TranslationService);
  private readonly technologiesSignal = signal<TechnologyCollectionItemResponse[]>([]);
  private readonly selectedSkillSignal = signal<TechnologyModalItem | null>(null);
  private readonly searchTermSignal = signal('');
  private readonly selectedStackSignal = signal<SkillStackFilterValue>('ALL');
  private readonly selectedLevelSignal = signal<SkillLevelFilterValue>('ALL');
  private readonly selectedTypeSignal = signal<SkillTypeFilterValue>('ALL');

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly selectedSkill = this.selectedSkillSignal.asReadonly();
  protected readonly searchTerm = this.searchTermSignal.asReadonly();
  protected readonly selectedStack = this.selectedStackSignal.asReadonly();
  protected readonly selectedLevel = this.selectedLevelSignal.asReadonly();
  protected readonly selectedType = this.selectedTypeSignal.asReadonly();
  protected readonly stackFilters = SKILL_STACK_FILTERS;
  protected readonly levelFilters = SKILL_LEVEL_FILTERS;
  protected readonly typeFilters = SKILL_TYPE_FILTERS;
  protected readonly stackFilterOptions = computed(() =>
    this.buildFilterOptions(this.stackFilters),
  );
  protected readonly levelFilterOptions = computed(() =>
    this.buildFilterOptions(this.levelFilters),
  );
  protected readonly typeFilterOptions = computed(() =>
    this.buildFilterOptions(this.typeFilters),
  );

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
      .sort((left, right) => left.name.localeCompare(right.name)),
  );

  protected readonly filteredTechnologyCards = computed(() => {
    const searchTerm = this.searchTerm().trim().toLowerCase();
    const selectedStack = this.selectedStack();
    const selectedLevel = this.selectedLevel();
    const selectedType = this.selectedType();

    return this.technologyCards().filter((card) => {
      const matchesSearch =
        !searchTerm ||
        card.name.toLowerCase().includes(searchTerm) ||
        card.categoryLabel.toLowerCase().includes(searchTerm);
      const matchesStack = selectedStack === 'ALL' || card.stackKey === selectedStack;
      const matchesLevel = selectedLevel === 'ALL' || card.levelKey === selectedLevel;
      const matchesType = selectedType === 'ALL' || card.typeKey === selectedType;

      return matchesSearch && matchesStack && matchesLevel && matchesType;
    });
  });

  protected readonly technologyCount = computed(() =>
    String(this.technologyCards().length),
  );

  protected readonly isSkillModalOpen = computed(() => this.selectedSkill() !== null);

  constructor() {
    afterEveryRender(() => {
      applySkillsSelectOptionScrollPatch(this.host.nativeElement);
    });

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

  protected selectStackFilterFromEvent(event: Event): void {
    this.selectStackFilter((event as SkillsSelectEvent<SkillStackFilterValue>).detail);
  }

  protected selectLevelFilter(value: SkillLevelFilterValue): void {
    this.selectedLevelSignal.set(value);
  }

  protected selectLevelFilterFromEvent(event: Event): void {
    this.selectLevelFilter((event as SkillsSelectEvent<SkillLevelFilterValue>).detail);
  }

  protected selectTypeFilter(value: SkillTypeFilterValue): void {
    this.selectedTypeSignal.set(value);
  }

  protected selectTypeFilterFromEvent(event: Event): void {
    this.selectTypeFilter((event as SkillsSelectEvent<SkillTypeFilterValue>).detail);
  }

  protected openSkillDetails(skill: SkillCardViewModel): void {
    this.selectedSkillSignal.set(skill.modal);
  }

  protected closeSkillDetails(): void {
    this.selectedSkillSignal.set(null);
  }

  private buildFilterOptions(
    filters: readonly SkillFilterChipViewModel[],
  ): readonly SkillFilterOption[] {
    this.translationService.locale();

    return filters.map((filter) => ({
      id: filter.value,
      label: this.translationService.instant(filter.labelKey),
      value: filter.value,
    }));
  }
}
