import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../core/api/api.config';
import { createTechnologiesCollectionResponse } from '../../core/api/mocks/technologies.mocks';
import { TechnologyCollectionItemResponse } from '../../core/api/technologies/technologies.types';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TranslationService } from '../../core/translation/translation.service';
import { SkillFilterOption } from './skills.types';
import { SkillsComponent } from './skills.component';

const TECHNOLOGIES_REQUEST_URL = buildApiUrl(
  '/technologies?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc',
);

const flushTechnologiesRequest = (
  httpTestingController: HttpTestingController,
  response = createTechnologiesCollectionResponse(),
): void => {
  httpTestingController.expectOne(TECHNOLOGIES_REQUEST_URL).flush(response);
};

describe('SkillsComponent', () => {
  beforeAll(() => {
    const elementNames = ['hans-avatar', 'hans-icon', 'hans-tag', 'hans-dropdown'];

    for (const elementName of elementNames) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAppTranslations(),
      ],
    }).compileComponents();
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);
  });

  it('should render the technologies page with live experience metrics', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    expect(compiled.textContent).toContain('Technology depth');
    expect(compiled.textContent).toContain('Loading technology experience metrics...');

    flushTechnologiesRequest(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Technology clarity from live API metrics');
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).toContain('TypeScript');
    expect(compiled.textContent).toContain('6 years 2 months');
    expect(compiled.querySelectorAll('hans-dropdown').length).toBe(3);
    expect(compiled.querySelectorAll('hans-tag').length).toBeGreaterThan(6);
  });

  it('should render localized labels in Portuguese', () => {
    TestBed.inject(TranslationService).setLocale('pt-BR');

    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    flushTechnologiesRequest(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Profundidade tecnica');
    expect(compiled.textContent).toContain(
      'Tecnologias com metricao real por contexto',
    );
    expect(compiled.textContent).toContain('Profissional');
    expect(compiled.querySelector('hans-tag[label="Avancado"]')).toBeTruthy();
  });

  it('should render localized labels in Spanish', () => {
    TestBed.inject(TranslationService).setLocale('es-es');

    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    flushTechnologiesRequest(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Profundidad tecnica');
    expect(compiled.textContent).toContain('Tecnologias con metricas reales por contexto');
    expect(compiled.querySelector('hans-tag[label="Avanzado"]')).toBeTruthy();
  });

  it('should filter the catalog through category, level, and context selections', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    flushTechnologiesRequest(httpTestingController);
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      selectCategory: (event: Event) => void;
      selectLevel: (event: Event) => void;
      selectContext: (event: Event) => void;
    };

    component.selectCategory(
      new CustomEvent('select', {
        detail: {
          label: 'Framework',
          value: 'FRAMEWORK',
        },
      }),
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).not.toContain('TypeScript');

    component.selectLevel(
      new CustomEvent('select', {
        detail: {
          label: 'Intermediate',
          value: 'INTERMEDIATE',
        },
      }),
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain(
      'No published technologies matched the current filters.',
    );

    component.selectCategory(
      new CustomEvent('select', {
        detail: {
          label: 'All categories',
          value: 'ALL',
        },
      }),
    );
    component.selectContext(
      new CustomEvent('select', {
        detail: {
          label: 'Study',
          value: 'STUDY',
        },
      }),
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Docker');
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).not.toContain('TypeScript');
    expect(compiled.textContent).not.toContain('SQL');
  });

  it('should build dropdown options with localized fallbacks for unknown category and level values', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    const unknownTechnology: TechnologyCollectionItemResponse = {
      id: 'tech-custom',
      slug: 'custom-tool',
      name: 'Custom Tool',
      category: 'CUSTOM_STACK',
      level: 'EXPERT_PLUS',
      frequency: 'FREQUENT',
      highlight: false,
      experienceMetrics: {
        total: {
          totalMonths: 2,
          years: 0,
          months: 2,
          label: '2 months',
          startedAt: '2026-01-01',
          endedAt: '2026-03-01',
        },
        byContext: {
          PROFESSIONAL: {
            totalMonths: 2,
            years: 0,
            months: 2,
            label: '2 months',
            startedAt: '2026-01-01',
            endedAt: '2026-03-01',
          },
          PERSONAL: {
            totalMonths: 0,
            years: 0,
            months: 0,
            label: '0 months',
            startedAt: null,
            endedAt: null,
          },
          ACADEMIC: {
            totalMonths: 0,
            years: 0,
            months: 0,
            label: '0 months',
            startedAt: null,
            endedAt: null,
          },
          STUDY: {
            totalMonths: 0,
            years: 0,
            months: 0,
            label: '0 months',
            startedAt: null,
            endedAt: null,
          },
        },
      },
    };

    flushTechnologiesRequest(
      httpTestingController,
      createTechnologiesCollectionResponse({
        data: [...createTechnologiesCollectionResponse().data, unknownTechnology],
      }),
    );
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      buildCategoryOptions: (values: readonly string[]) => readonly SkillFilterOption[];
      buildLevelOptions: (values: readonly string[]) => readonly SkillFilterOption[];
    };

    expect(component.buildCategoryOptions(['CUSTOM_STACK'])).toEqual([
      { label: 'All categories', value: 'ALL' },
      { label: 'CUSTOM_STACK', value: 'CUSTOM_STACK' },
    ]);
    expect(component.buildLevelOptions(['EXPERT_PLUS'])).toEqual([
      { label: 'All levels', value: 'ALL' },
      { label: 'EXPERT_PLUS', value: 'EXPERT_PLUS' },
    ]);
  });

  it('should render empty and error states from the technologies request', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);

    const emptyFixture = TestBed.createComponent(SkillsComponent);
    emptyFixture.detectChanges();

    const emptyCompiled = emptyFixture.nativeElement as HTMLElement;
    flushTechnologiesRequest(
      httpTestingController,
      createTechnologiesCollectionResponse({
        data: [],
        pagination: {
          page: 1,
          pageSize: 100,
          totalItems: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      }),
    );
    emptyFixture.detectChanges();

    expect(emptyCompiled.textContent).toContain(
      'No published technologies matched the current filters.',
    );

    emptyFixture.destroy();

    const errorFixture = TestBed.createComponent(SkillsComponent);
    errorFixture.detectChanges();

    const errorCompiled = errorFixture.nativeElement as HTMLElement;
    httpTestingController.expectOne(TECHNOLOGIES_REQUEST_URL).flush(null, {
      status: 500,
      statusText: 'Server Error',
    });
    errorFixture.detectChanges();

    expect(errorCompiled.textContent).toContain(
      'The technologies endpoint is unavailable right now.',
    );
  });

  it('should treat missing context metrics as zero when filtering by context', () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    flushTechnologiesRequest(
      httpTestingController,
      createTechnologiesCollectionResponse({
        data: [
          {
            id: 'tech-no-metrics',
            slug: 'no-metrics',
            name: 'No Metrics',
            category: 'LIBRARY',
            level: 'BEGINNER',
            frequency: 'RARE',
            highlight: false,
          },
        ],
      }),
    );
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      selectContext: (event: Event) => void;
    };

    component.selectContext(
      new CustomEvent('select', {
        detail: {
          label: 'Professional',
          value: 'PROFESSIONAL',
        },
      }),
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'No published technologies matched the current filters.',
    );
  });

  it('should safely handle dropdown option binding branches', async () => {
    const fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    flushTechnologiesRequest(httpTestingController);

    const component = fixture.componentInstance as unknown as {
      bindDropdownOptions: (
        dropdown: { options?: readonly SkillFilterOption[] } | undefined,
        options: readonly SkillFilterOption[],
        onCleanup: (cleanupFn: () => void) => void,
      ) => void;
    };

    expect(() =>
      component.bindDropdownOptions(undefined, [], () => undefined),
    ).not.toThrow();

    const dropdown: { options?: readonly SkillFilterOption[] } = {};
    const options = [{ label: 'Queued option', value: 'QUEUED' }];

    spyOn(customElements, 'get').and.returnValue(undefined);
    spyOn(customElements, 'whenDefined').and.returnValue(
      Promise.resolve(class extends HTMLElement {}),
    );

    component.bindDropdownOptions(dropdown, options, () => undefined);
    await Promise.resolve();

    expect(customElements.whenDefined).toHaveBeenCalledWith('hans-dropdown');
    expect(dropdown.options).toEqual(options);
  });
});
