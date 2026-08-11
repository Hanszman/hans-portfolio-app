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
import { FormationsService } from '../../core/api/formations/formations.service';
import { FormationRecord } from '../../core/api/formations/formations.types';
import { SpokenLanguagesService } from '../../core/api/spoken-languages/spoken-languages.service';
import { SpokenLanguageRecord } from '../../core/api/spoken-languages/spoken-languages.types';
import { EducationModalComponent } from '../../shared/education-modal/education-modal.component';
import { EducationModalItem } from '../../shared/education-modal/education-modal.types';
import { SpokenLanguageModalComponent } from '../../shared/spoken-language-modal/spoken-language-modal.component';
import { SpokenLanguageModalItem } from '../../shared/spoken-language-modal/spoken-language-modal.types';
import { WrapperComponent } from '../../layout/wrapper/wrapper.component';
import { InfoStateComponent } from '../../shared/info-state/info-state.component';
import { SectionHeaderComponent } from '../../shared/section-header/section-header.component';
import { TechnologyModalComponent } from '../../shared/technology-modal/technology-modal.component';
import { TechnologyModalItem } from '../../shared/technology-modal/technology-modal.types';
import {
  HIGHLIGHT_FILTERS,
  HighlightFilterValue,
} from '../../shared/filters/highlight-filter.types';
import {
  calculateTotalPages,
  paginateItems,
  resolvePaginationPage,
} from '../../shared/pagination/pagination.helper';
import { SkillCardComponent } from './components/skill-card/skill-card.component';
import {
  buildEducationSkillCards,
  buildLanguageSkillCards,
  mapTechnologyToSkillCard,
  mapFormationToEducationModal,
  mapSpokenLanguageToModal,
} from './helpers/skills.helper';
import {
  SKILL_LEVEL_FILTERS,
  SKILL_STACK_FILTERS,
  SKILL_TYPE_FILTERS,
  SkillFilterOption,
  SkillFilterChipViewModel,
  SkillCardViewModel,
  SkillLevelFilterValue,
  SkillStackFilterValue,
  SkillTypeFilterValue,
} from './skills.types';

@Component({
  selector: 'app-skills',
  imports: [
    WrapperComponent,
    InfoStateComponent,
    SkillCardComponent,
    SectionHeaderComponent,
    TechnologyModalComponent,
    EducationModalComponent,
    SpokenLanguageModalComponent,
    TranslatePipe,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  private static readonly TECHNOLOGIES_PAGE_SIZE = 15;
  private readonly technologiesService = inject(TechnologiesService);
  private readonly formationsService = inject(FormationsService);
  private readonly spokenLanguagesService = inject(SpokenLanguagesService);
  private readonly translationService = inject(TranslationService);
  private readonly technologiesSignal = signal<TechnologyCollectionItemResponse[]>([]);
  private readonly formationsSignal = signal<FormationRecord[]>([]);
  private readonly spokenLanguagesSignal = signal<SpokenLanguageRecord[]>([]);
  private readonly selectedTechnologySignal = signal<TechnologyModalItem | null>(null);
  private readonly selectedEducationSignal = signal<EducationModalItem | null>(null);
  private readonly selectedLanguageSignal = signal<SpokenLanguageModalItem | null>(null);
  private readonly searchTermSignal = signal('');
  private readonly selectedStackSignal = signal<SkillStackFilterValue>('ALL');
  private readonly selectedLevelSignal = signal<SkillLevelFilterValue>('ALL');
  private readonly selectedTypeSignal = signal<SkillTypeFilterValue>('ALL');
  private readonly selectedHighlightSignal = signal<HighlightFilterValue>('ALL');
  private readonly technologyPageSignal = signal(1);

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly selectedTechnology = this.selectedTechnologySignal.asReadonly();
  protected readonly selectedEducation = this.selectedEducationSignal.asReadonly();
  protected readonly selectedLanguage = this.selectedLanguageSignal.asReadonly();
  protected readonly searchTerm = this.searchTermSignal.asReadonly();
  protected readonly selectedStack = this.selectedStackSignal.asReadonly();
  protected readonly selectedLevel = this.selectedLevelSignal.asReadonly();
  protected readonly selectedType = this.selectedTypeSignal.asReadonly();
  protected readonly selectedHighlight = this.selectedHighlightSignal.asReadonly();
  protected readonly technologyPage = this.technologyPageSignal.asReadonly();
  protected readonly stackFilters = SKILL_STACK_FILTERS;
  protected readonly levelFilters = SKILL_LEVEL_FILTERS;
  protected readonly typeFilters = SKILL_TYPE_FILTERS;
  protected readonly highlightFilters = HIGHLIGHT_FILTERS;
  protected readonly stackFilterOptions = computed(() =>
    this.buildFilterOptions(this.stackFilters),
  );
  protected readonly levelFilterOptions = computed(() =>
    this.buildFilterOptions(this.levelFilters),
  );
  protected readonly typeFilterOptions = computed(() => this.buildFilterOptions(this.typeFilters));

  protected readonly educationCards = computed(() =>
    buildEducationSkillCards(this.formationsSignal(), this.translationService.locale()),
  );

  protected readonly languageCards = computed(() =>
    buildLanguageSkillCards(this.spokenLanguagesSignal(), this.translationService.locale()),
  );

  protected readonly technologyCards = computed(() =>
    this.technologiesSignal()
      .map((technology) => mapTechnologyToSkillCard(technology, this.translationService.locale()))
      .sort((left, right) => left.name.localeCompare(right.name)),
  );

  protected readonly filteredTechnologyCards = computed(() => {
    const searchTerm = this.searchTerm().trim().toLowerCase();
    const selectedStack = this.selectedStack();
    const selectedLevel = this.selectedLevel();
    const selectedType = this.selectedType();
    const selectedHighlight = this.selectedHighlight();

    return this.technologyCards().filter((card) => {
      const matchesSearch =
        !searchTerm ||
        card.name.toLowerCase().includes(searchTerm) ||
        card.categoryLabel.toLowerCase().includes(searchTerm) ||
        card.levelLabel.toLowerCase().includes(searchTerm) ||
        card.frequencyLabel.toLowerCase().includes(searchTerm);
      const matchesStack = selectedStack === 'ALL' || card.stackKey === selectedStack;
      const matchesLevel = selectedLevel === 'ALL' || card.levelKey === selectedLevel;
      const matchesType = selectedType === 'ALL' || card.typeKey === selectedType;
      const matchesHighlight =
        selectedHighlight === 'ALL' ||
        (selectedHighlight === 'HIGHLIGHTED' ? card.isHighlight : !card.isHighlight);

      return matchesSearch && matchesStack && matchesLevel && matchesType && matchesHighlight;
    });
  });

  protected readonly technologyCount = computed(() => String(this.technologyCards().length));
  protected readonly technologyTotalPages = computed(() =>
    calculateTotalPages(
      this.filteredTechnologyCards().length,
      SkillsComponent.TECHNOLOGIES_PAGE_SIZE,
    ),
  );
  protected readonly paginatedTechnologyCards = computed(() =>
    paginateItems(
      this.filteredTechnologyCards(),
      this.technologyPage(),
      SkillsComponent.TECHNOLOGIES_PAGE_SIZE,
    ),
  );

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

    this.formationsService
      .getAll(1, 100)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (response) => this.formationsSignal.set(response.data),
        error: () => this.formationsSignal.set([]),
      });

    this.spokenLanguagesService
      .getAll(1, 100)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (response) => this.spokenLanguagesSignal.set(response.data),
        error: () => this.spokenLanguagesSignal.set([]),
      });
  }

  protected updateSearchTerm(searchTerm: string): void {
    this.searchTermSignal.set(searchTerm);
    this.resetTechnologyPage();
  }

  protected selectStackFilter(value: SkillStackFilterValue): void {
    this.selectedStackSignal.set(value);
    this.resetTechnologyPage();
  }

  protected selectStackFilterFromEvent(event: Event): void {
    this.selectStackFilter(this.resolveSelectValue(event) as SkillStackFilterValue);
  }

  protected selectLevelFilter(value: SkillLevelFilterValue): void {
    this.selectedLevelSignal.set(value);
    this.resetTechnologyPage();
  }

  protected selectLevelFilterFromEvent(event: Event): void {
    this.selectLevelFilter(this.resolveSelectValue(event) as SkillLevelFilterValue);
  }

  protected selectTypeFilter(value: SkillTypeFilterValue): void {
    this.selectedTypeSignal.set(value);
    this.resetTechnologyPage();
  }

  protected selectTypeFilterFromEvent(event: Event): void {
    this.selectTypeFilter(this.resolveSelectValue(event) as SkillTypeFilterValue);
  }

  protected selectHighlightFilter(value: HighlightFilterValue): void {
    this.selectedHighlightSignal.set(value);
    this.resetTechnologyPage();
  }

  protected selectTechnologyPage(event: Event | number): void {
    const page = resolvePaginationPage(event);

    if (page !== null) {
      this.technologyPageSignal.set(page);
    }
  }

  protected openSkillDetails(skill: SkillCardViewModel): void {
    this.closeSkillDetails();

    if (skill.kind === 'technology') {
      this.selectedTechnologySignal.set(skill.modal);
      return;
    }

    if (skill.kind === 'education') {
      const formation = this.formationsSignal().find(({ slug }) => slug === skill.slug);
      this.selectedEducationSignal.set(
        mapFormationToEducationModal(formation, skill, this.translationService.locale()),
      );
      return;
    }

    const language = this.spokenLanguagesSignal().find(
      ({ code, nameEn }) =>
        code.toLowerCase() === skill.slug.toLowerCase() ||
        nameEn.toLowerCase() === skill.name.toLowerCase(),
    );
    this.selectedLanguageSignal.set(
      mapSpokenLanguageToModal(language, skill, this.translationService.locale()),
    );
  }

  protected closeSkillDetails(): void {
    this.selectedTechnologySignal.set(null);
    this.selectedEducationSignal.set(null);
    this.selectedLanguageSignal.set(null);
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

  private resetTechnologyPage(): void {
    this.technologyPageSignal.set(1);
  }

  private resolveSelectValue(event: Event): string {
    const customEvent = event as Event & {
      detail?: string | { value?: string };
      target: (EventTarget & { value?: string }) | null;
    };
    const detail = customEvent.detail;
    const target = customEvent.target;

    if (typeof detail === 'string') {
      return detail;
    }

    if (detail && typeof detail === 'object' && typeof detail.value === 'string') {
      return detail.value;
    }

    if (target && typeof target.value === 'string') {
      return target.value;
    }

    return '';
  }
}
