import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../core/api/api.config';
import { createProjectsCollectionResponse } from '../../core/api/mocks/projects.mocks';
import { ProjectCollectionItemResponse } from '../../core/api/projects/projects.types';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TranslationService } from '../../core/translation/translation.service';
import { ProjectFilterOption } from './projects.types';
import { ProjectsComponent } from './projects.component';

const PROJECTS_REQUEST_URL = buildApiUrl(
  '/projects?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc',
);

const flushProjectsRequest = (
  httpTestingController: HttpTestingController,
  response = createProjectsCollectionResponse(),
): void => {
  httpTestingController.expectOne(PROJECTS_REQUEST_URL).flush(response);
};

describe('ProjectsComponent', () => {
  beforeAll(() => {
    const elementNames = [
      'hans-icon',
      'hans-tag',
      'hans-dropdown',
      'hans-button',
      'hans-modal',
      'hans-carousel',
      'hans-chart',
      'hans-loading',
    ];

    for (const elementName of elementNames) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
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

  it('should render the projects page with live case-study data', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    expect(compiled.textContent).toContain('Project case studies');
    expect(compiled.textContent).toContain('Loading live project cases...');

    flushProjectsRequest(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Projects as cases, not just entries');
    expect(compiled.textContent).toContain('Portfolio');
    expect(compiled.textContent).toContain('Public Diagnostics');
    expect(compiled.textContent).toContain('HardWorker');
    expect(compiled.querySelectorAll('hans-dropdown').length).toBe(4);
    expect(compiled.querySelectorAll('hans-tag').length).toBeGreaterThan(6);
    expect(compiled.querySelectorAll('hans-button').length).toBeGreaterThan(1);

    const component = fixture.componentInstance as unknown as {
      projectCases: () => readonly { title: string }[];
    };

    expect(component.projectCases().map((project) => project.title)).toContain(
      "Github's API Consumer",
    );
  });

  it('should render localized labels in Portuguese', () => {
    TestBed.inject(TranslationService).setLocale('pt-BR');

    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    flushProjectsRequest(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Cases de projeto');
    expect(compiled.textContent).toContain('Projetos como cases, nao apenas listagens');
    expect(compiled.querySelector('hans-tag[label="Em andamento"]')).toBeTruthy();
  });

  it('should render localized labels in Spanish', () => {
    TestBed.inject(TranslationService).setLocale('es-es');

    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    flushProjectsRequest(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Casos de proyecto');
    expect(compiled.textContent).toContain('Proyectos como casos, no solo entradas');
    expect(compiled.querySelector('hans-tag[label="En progreso"]')).toBeTruthy();
  });

  it('should filter and sort project cases through dropdown selections', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    flushProjectsRequest(httpTestingController);
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      selectContext: (event: Event) => void;
      selectEnvironment: (event: Event) => void;
      selectStatus: (event: Event) => void;
      selectSort: (event: Event) => void;
      projectCases: () => readonly { title: string }[];
    };

    component.selectContext(
      new CustomEvent('select', {
        detail: {
          label: 'Personal',
          value: 'PERSONAL',
        },
      }),
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain("Github's API Consumer");
    expect(compiled.textContent).toContain('Portfolio');
    expect(compiled.textContent).not.toContain('HardWorker');

    component.selectEnvironment(
      new CustomEvent('select', {
        detail: {
          label: 'Front-end',
          value: 'FRONTEND',
        },
      }),
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Portfolio');
    expect(compiled.textContent).not.toContain("Github's API Consumer");

    component.selectStatus(
      new CustomEvent('select', {
        detail: {
          label: 'Completed',
          value: 'COMPLETED',
        },
      }),
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain(
      'No published projects matched the current filters.',
    );

    component.selectEnvironment(
      new CustomEvent('select', {
        detail: {
          label: 'All environments',
          value: 'ALL',
        },
      }),
    );
    component.selectStatus(
      new CustomEvent('select', {
        detail: {
          label: 'All statuses',
          value: 'ALL',
        },
      }),
    );
    component.selectSort(
      new CustomEvent('select', {
        detail: {
          label: 'Most linked assets',
          value: 'LINKS',
        },
      }),
    );
    fixture.detectChanges();

    expect(component.projectCases()[0].title).toBe("Github's API Consumer");
  });

  it('should sort project cases by recent start and largest stack', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);

    flushProjectsRequest(httpTestingController);
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      selectSort: (event: Event) => void;
      projectCases: () => readonly { title: string }[];
    };

    component.selectSort(
      new CustomEvent('select', {
        detail: {
          label: 'Most recent start',
          value: 'RECENT',
        },
      }),
    );
    fixture.detectChanges();

    expect(component.projectCases()[0].title).toBe('Portfolio');

    component.selectSort(
      new CustomEvent('select', {
        detail: {
          label: 'Largest stack',
          value: 'STACK',
        },
      }),
    );
    fixture.detectChanges();

    expect(component.projectCases()[0].title).toBe('Portfolio');
  });

  it('should break recent-start sorting ties with sortOrder', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    flushProjectsRequest(
      httpTestingController,
      createProjectsCollectionResponse({
        data: [
          {
            ...createProjectsCollectionResponse().data[0],
            id: 'project-recent-b',
            slug: 'project-recent-b',
            titlePt: 'Recent B',
            titleEn: 'Recent B',
            startDate: '2026-01-01T00:00:00.000Z',
            sortOrder: 20,
          },
          {
            ...createProjectsCollectionResponse().data[1],
            id: 'project-recent-a',
            slug: 'project-recent-a',
            titlePt: 'Recent A',
            titleEn: 'Recent A',
            startDate: '2026-01-01T00:00:00.000Z',
            sortOrder: 10,
          },
        ],
      }),
    );
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      selectSort: (event: Event) => void;
      projectCases: () => readonly { title: string }[];
    };

    component.selectSort(
      new CustomEvent('select', {
        detail: {
          label: 'Most recent start',
          value: 'RECENT',
        },
      }),
    );
    fixture.detectChanges();

    expect(component.projectCases()[0].title).toBe('Recent A');
  });

  it('should build dropdown options with localized fallbacks for unknown values', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    const unknownProject: ProjectCollectionItemResponse = {
      ...createProjectsCollectionResponse().data[0],
      id: 'project-unknown',
      slug: 'project-unknown',
      context: 'OPEN_SOURCE',
      environment: 'MOBILE_APP',
      status: 'QA_REVIEW',
    };

    flushProjectsRequest(
      httpTestingController,
      createProjectsCollectionResponse({
        data: [...createProjectsCollectionResponse().data, unknownProject],
      }),
    );
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      buildContextOptions: (values: readonly string[]) => readonly ProjectFilterOption[];
      buildEnvironmentOptions: (
        values: readonly string[],
      ) => readonly ProjectFilterOption[];
      buildStatusOptions: (values: readonly string[]) => readonly ProjectFilterOption[];
    };

    expect(component.buildContextOptions(['OPEN_SOURCE'])).toEqual([
      { label: 'All contexts', value: 'ALL' },
      { label: 'OPEN_SOURCE', value: 'OPEN_SOURCE' },
    ]);
    expect(component.buildEnvironmentOptions(['MOBILE_APP'])).toEqual([
      { label: 'All environments', value: 'ALL' },
      { label: 'MOBILE_APP', value: 'MOBILE_APP' },
    ]);
    expect(component.buildStatusOptions(['QA_REVIEW'])).toEqual([
      { label: 'All statuses', value: 'ALL' },
      { label: 'QA_REVIEW', value: 'QA_REVIEW' },
    ]);
  });

  it('should render empty and error states from the projects request', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);

    const emptyFixture = TestBed.createComponent(ProjectsComponent);
    emptyFixture.detectChanges();

    const emptyCompiled = emptyFixture.nativeElement as HTMLElement;
    flushProjectsRequest(
      httpTestingController,
      createProjectsCollectionResponse({
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
      'No published projects matched the current filters.',
    );

    emptyFixture.destroy();

    const errorFixture = TestBed.createComponent(ProjectsComponent);
    errorFixture.detectChanges();

    const errorCompiled = errorFixture.nativeElement as HTMLElement;
    httpTestingController.expectOne(PROJECTS_REQUEST_URL).flush(null, {
      status: 500,
      statusText: 'Server Error',
    });
    errorFixture.detectChanges();

    expect(errorCompiled.textContent).toContain(
      'The projects endpoint is unavailable right now.',
    );
  });

  it('should break link-based sorting ties with sortOrder', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    flushProjectsRequest(
      httpTestingController,
      createProjectsCollectionResponse({
        data: [
          {
            ...createProjectsCollectionResponse().data[0],
            id: 'project-tie-b',
            slug: 'project-tie-b',
            titlePt: 'Tie B',
            titleEn: 'Tie B',
            links: [],
            imageAssets: [
              {
                ...createProjectsCollectionResponse().data[0].imageAssets[0],
              },
            ],
            sortOrder: 20,
          },
          {
            ...createProjectsCollectionResponse().data[1],
            id: 'project-tie-a',
            slug: 'project-tie-a',
            titlePt: 'Tie A',
            titleEn: 'Tie A',
            links: [
              {
                ...createProjectsCollectionResponse().data[0].links[0],
              },
            ],
            imageAssets: [],
            sortOrder: 10,
          },
        ],
      }),
    );
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      selectSort: (event: Event) => void;
      projectCases: () => readonly { title: string }[];
    };

    component.selectSort(
      new CustomEvent('select', {
        detail: {
          label: 'Most linked assets',
          value: 'LINKS',
        },
      }),
    );
    fixture.detectChanges();

    expect(component.projectCases()[0].title).toBe('Tie A');
  });

  it('should safely handle dropdown option binding branches', async () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    flushProjectsRequest(httpTestingController);

    const component = fixture.componentInstance as unknown as {
      bindDropdownOptions: (
        dropdown: { options?: readonly ProjectFilterOption[] } | undefined,
        options: readonly ProjectFilterOption[],
        onCleanup: (cleanupFn: () => void) => void,
      ) => void;
    };

    expect(() =>
      component.bindDropdownOptions(undefined, [], () => undefined),
    ).not.toThrow();

    const dropdown: { options?: readonly ProjectFilterOption[] } = {};
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
