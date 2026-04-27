import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { TechnologiesService } from '../../core/api/technologies/technologies.service';
import {
  TechnologyCollectionItemResponse,
  TechnologyContextKey,
} from '../../core/api/technologies/technologies.types';
import { TranslationService } from '../../core/translation/translation.service';
import { ContainerComponent } from '../../layout/container/container.component';
import { PageIntroComponent } from '../../layout/page-intro/page-intro.component';
import { PageWrapperComponent } from '../../layout/page-wrapper/page-wrapper.component';
import {
  buildSkillsGroups,
  buildSkillsSummaryMetrics,
  extractSkillFilterValues,
} from './helpers/skills.helper';
import {
  SKILL_CATEGORY_LABELS,
  SKILL_CONTEXT_LABELS,
  SKILL_FILTER_ALL_LABELS,
  SKILL_LEVEL_LABELS,
  SkillFilterOption,
  SkillsDropdownElement,
  SkillsSelectEvent,
} from './skills.types';

@Component({
  selector: 'app-skills',
  imports: [
    PageIntroComponent,
    PageWrapperComponent,
    ContainerComponent,
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
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly categoryDropdown =
    viewChild<ElementRef<SkillsDropdownElement>>('categoryDropdown');
  private readonly levelDropdown =
    viewChild<ElementRef<SkillsDropdownElement>>('levelDropdown');
  private readonly contextDropdown =
    viewChild<ElementRef<SkillsDropdownElement>>('contextDropdown');
  private readonly technologiesSignal = signal<TechnologyCollectionItemResponse[]>(
    [],
  );
  private readonly selectedCategorySignal = signal('ALL');
  private readonly selectedLevelSignal = signal('ALL');
  private readonly selectedContextSignal = signal<string>('ALL');

  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly technologies = this.technologiesSignal.asReadonly();
  protected readonly selectedCategory = this.selectedCategorySignal.asReadonly();
  protected readonly selectedLevel = this.selectedLevelSignal.asReadonly();
  protected readonly selectedContext = this.selectedContextSignal.asReadonly();

  protected readonly summaryMetrics = computed(() =>
    buildSkillsSummaryMetrics(
      this.technologies(),
      this.translationService.locale(),
    ),
  );

  protected readonly filterValues = computed(() =>
    extractSkillFilterValues({
      data: this.technologies(),
      pagination: {
        page: 1,
        pageSize: this.technologies().length,
        totalItems: this.technologies().length,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    }),
  );

  protected readonly categoryOptions = computed(() =>
    this.buildCategoryOptions(this.filterValues().categories),
  );

  protected readonly levelOptions = computed(() =>
    this.buildLevelOptions(this.filterValues().levels),
  );

  protected readonly contextOptions = computed(() => this.buildContextOptions());

  protected readonly filteredTechnologies = computed(() =>
    this.technologies().filter((technology) => {
      const matchesCategory =
        this.selectedCategory() === 'ALL' ||
        technology.category === this.selectedCategory();
      const matchesLevel =
        this.selectedLevel() === 'ALL' || technology.level === this.selectedLevel();
      const matchesContext =
        this.selectedContext() === 'ALL' ||
        (technology.experienceMetrics?.byContext[
          this.selectedContext() as TechnologyContextKey
        ]?.totalMonths ?? 0) > 0;

      return matchesCategory && matchesLevel && matchesContext;
    }),
  );

  protected readonly groupedTechnologies = computed(() =>
    buildSkillsGroups(
      this.filteredTechnologies(),
      this.translationService.locale(),
    ),
  );

  protected readonly filteredCountLabel = computed(() =>
    String(this.filteredTechnologies().length),
  );

  constructor() {
    effect((onCleanup) => {
      this.bindDropdownOptions(
        this.categoryDropdown()?.nativeElement,
        this.categoryOptions(),
        onCleanup,
      );
    });

    effect((onCleanup) => {
      this.bindDropdownOptions(
        this.levelDropdown()?.nativeElement,
        this.levelOptions(),
        onCleanup,
      );
    });

    effect((onCleanup) => {
      this.bindDropdownOptions(
        this.contextDropdown()?.nativeElement,
        this.contextOptions(),
        onCleanup,
      );
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

  protected selectCategory(event: Event): void {
    const option = (event as SkillsSelectEvent).detail;
    this.selectedCategorySignal.set(option.value);
    this.changeDetectorRef.markForCheck();
  }

  protected selectLevel(event: Event): void {
    const option = (event as SkillsSelectEvent).detail;
    this.selectedLevelSignal.set(option.value);
    this.changeDetectorRef.markForCheck();
  }

  protected selectContext(event: Event): void {
    const option = (event as SkillsSelectEvent).detail;
    this.selectedContextSignal.set(option.value);
    this.changeDetectorRef.markForCheck();
  }

  private bindDropdownOptions(
    dropdown: SkillsDropdownElement | undefined,
    options: readonly SkillFilterOption[],
    onCleanup: (cleanupFn: () => void) => void,
  ): void {
    if (!dropdown) {
      return;
    }

    let isCleanedUp = false;
    const applyOptions = (): void => {
      if (!isCleanedUp) {
        dropdown.options = options;
      }
    };

    if (customElements.get('hans-dropdown')) {
      applyOptions();
    } else {
      void customElements.whenDefined('hans-dropdown').then(applyOptions);
    }

    onCleanup(() => {
      isCleanedUp = true;
    });
  }

  private buildCategoryOptions(values: readonly string[]): readonly SkillFilterOption[] {
    return [
      {
        label: this.translationService.translateContent(
          SKILL_FILTER_ALL_LABELS.categories,
        ),
        value: 'ALL',
      },
      ...values.map((value) => ({
        label: this.translationService.translateContent(
          SKILL_CATEGORY_LABELS[value] ?? { 'en-us': value },
          value,
        ),
        value,
      })),
    ];
  }

  private buildLevelOptions(values: readonly string[]): readonly SkillFilterOption[] {
    return [
      {
        label: this.translationService.translateContent(
          SKILL_FILTER_ALL_LABELS.levels,
        ),
        value: 'ALL',
      },
      ...values.map((value) => ({
        label: this.translationService.translateContent(
          SKILL_LEVEL_LABELS[value] ?? { 'en-us': value },
          value,
        ),
        value,
      })),
    ];
  }

  private buildContextOptions(): readonly SkillFilterOption[] {
    return [
      {
        label: this.translationService.translateContent(
          SKILL_FILTER_ALL_LABELS.contexts,
        ),
        value: 'ALL',
      },
      ...(['PROFESSIONAL', 'PERSONAL', 'ACADEMIC', 'STUDY'] as const).map(
        (value) => ({
          label: this.translationService.translateContent(
            SKILL_CONTEXT_LABELS[value],
          ),
          value,
        }),
      ),
    ];
  }
}
