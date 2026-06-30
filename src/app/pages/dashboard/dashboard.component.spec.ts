import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../core/api/api.config';
import { createDashboardOverviewResponse } from '../../core/api/mocks/dashboard.mocks';
import { createProjectsCollectionResponse } from '../../core/api/mocks/projects.mocks';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TranslationService } from '../../core/translation/translation.service';
import { DashboardComponent } from './dashboard.component';

const DASHBOARD_REQUEST_URLS = {
  overview: buildApiUrl('/dashboard'),
  projects: buildApiUrl(
    '/projects?page=1&pageSize=100&sortBy=sortOrder&sortDirection=asc',
  ),
} as const;

const flushDashboardRequests = (
  httpTestingController: HttpTestingController,
  overview = createDashboardOverviewResponse(),
  projects = createProjectsCollectionResponse(),
): void => {
  httpTestingController.expectOne(DASHBOARD_REQUEST_URLS.overview).flush(overview);
  httpTestingController.expectOne(DASHBOARD_REQUEST_URLS.projects).flush(projects);
};

describe('DashboardComponent', () => {
  beforeAll(() => {
    const elementNames = ['hans-chart', 'hans-icon', 'hans-select-option'];

    for (const elementName of elementNames) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
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

  it('should expose empty view-models before the dashboard requests resolve', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    const component = fixture.componentInstance as unknown as {
      summaryCards: () => readonly unknown[];
      stackRows: () => readonly unknown[];
      stackChart: () => unknown;
      technologyLevelChart: () => unknown;
      projectEnvironmentChart: () => unknown;
      technologyUsageChart: () => unknown;
      technologyTypeOptions: () => readonly unknown[];
      projectTechnologyChart: () => unknown;
    };

    expect(component.summaryCards()).toEqual([]);
    expect(component.stackRows()).toEqual([]);
    expect(component.stackChart()).toBeNull();
    expect(component.technologyLevelChart()).toBeNull();
    expect(component.projectEnvironmentChart()).toBeNull();
    expect(component.technologyUsageChart()).toBeNull();
    expect(component.technologyTypeOptions()).toEqual([]);
    expect(component.projectTechnologyChart()).toBeNull();
    expect(httpTestingController.match(() => true).length).toBe(2);
  });

  it('should render the dashboard sections when the API data is available', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    flushDashboardRequests(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Portfolio analytics dashboard');
    expect(compiled.querySelectorAll('app-dashboard-summary-strip').length).toBe(1);
    expect(compiled.querySelectorAll('app-dashboard-analytics-grid').length).toBe(1);
    expect(compiled.querySelectorAll('app-dashboard-project-technology-panel').length).toBe(1);
  });

  it('should render localized dashboard copy in Portuguese and Spanish', () => {
    const translationService = TestBed.inject(TranslationService);

    translationService.setLocale('pt-br');
    const ptFixture = TestBed.createComponent(DashboardComponent);
    ptFixture.detectChanges();
    flushDashboardRequests(TestBed.inject(HttpTestingController));
    ptFixture.detectChanges();

    expect(ptFixture.nativeElement.textContent).toContain('Dashboard analítico');
    expect(ptFixture.nativeElement.textContent).toContain(
      'Projetos por tipo de tecnologia',
    );
    ptFixture.destroy();

    translationService.setLocale('es-es');
    const esFixture = TestBed.createComponent(DashboardComponent);
    esFixture.detectChanges();
    flushDashboardRequests(TestBed.inject(HttpTestingController));
    esFixture.detectChanges();

    expect(esFixture.nativeElement.textContent).toContain('Dashboard analítico');
    expect(esFixture.nativeElement.textContent).toContain(
      'Proyectos por tipo de tecnología',
    );
  });

  it('should render an API error state when the dashboard overview request fails', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    httpTestingController.expectOne(DASHBOARD_REQUEST_URLS.overview).flush(null, {
      status: 500,
      statusText: 'Server Error',
    });

    const cancelledProjectsRequest = httpTestingController.match(
      DASHBOARD_REQUEST_URLS.projects,
    );

    fixture.detectChanges();

    expect(cancelledProjectsRequest.length).toBe(1);
    expect(cancelledProjectsRequest[0].cancelled).toBeTrue();
    expect(compiled.textContent).toContain(
      'The dashboard aggregate endpoints are unavailable right now.',
    );
  });

  it('should update the project technology chart when the selected type changes', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    flushDashboardRequests(TestBed.inject(HttpTestingController));
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      selectTechnologyType: (value: string) => void;
      selectedTechnologyType: () => string;
      activeTechnologyType: () => string;
      projectTechnologyChart: () => { categories: readonly string[] } | null;
    };

    component.selectTechnologyType('FRAMEWORKS');
    fixture.detectChanges();

    expect(component.selectedTechnologyType()).toBe('FRAMEWORKS');
    expect(component.projectTechnologyChart()?.categories).toEqual(['Angular']);

    component.selectTechnologyType('LIBRARIES');
    fixture.detectChanges();

    expect(component.selectedTechnologyType()).toBe('LIBRARIES');
    expect(component.projectTechnologyChart()?.categories).toEqual([
      'React',
      'Tailwind CSS',
    ]);

    component.selectTechnologyType('PROGRAMMING_LANGUAGES');
    fixture.detectChanges();

    expect(component.selectedTechnologyType()).toBe('PROGRAMMING_LANGUAGES');
    expect(component.projectTechnologyChart()?.categories).toEqual([
      'Node.js',
      'PHP',
      'TypeScript',
    ]);
  });

  it('should keep the selected technology when the available options list is empty', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    flushDashboardRequests(
      TestBed.inject(HttpTestingController),
      createDashboardOverviewResponse(),
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
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      activeTechnologyType: () => string;
      selectedTechnologyType: () => string;
      projectTechnologyChart: () => unknown;
    };

    expect(component.selectedTechnologyType()).toBe('PROGRAMMING_LANGUAGES');
    expect(component.activeTechnologyType()).toBe('PROGRAMMING_LANGUAGES');
    expect(component.projectTechnologyChart()).toBeNull();
  });
});
