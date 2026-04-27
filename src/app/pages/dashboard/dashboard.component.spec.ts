import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../core/api/api.config';
import { createDashboardOverviewResponse } from '../../core/api/mocks/dashboard.mocks';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TranslationService } from '../../core/translation/translation.service';
import { DashboardComponent } from './dashboard.component';

const DASHBOARD_REQUEST_URLS = {
  overview: buildApiUrl('/dashboard'),
  stackDistribution: buildApiUrl('/dashboard/stack-distribution'),
  projectContexts: buildApiUrl('/dashboard/project-contexts'),
  technologyUsage: buildApiUrl('/dashboard/technology-usage'),
  professionalTimeline: buildApiUrl('/dashboard/professional-timeline'),
  highlights: buildApiUrl('/dashboard/highlights'),
} as const;

const flushDashboardRequests = (
  httpTestingController: HttpTestingController,
  response = createDashboardOverviewResponse(),
): void => {
  httpTestingController.expectOne(DASHBOARD_REQUEST_URLS.overview).flush(response);
  httpTestingController
    .expectOne(DASHBOARD_REQUEST_URLS.stackDistribution)
    .flush(response.stackDistribution);
  httpTestingController
    .expectOne(DASHBOARD_REQUEST_URLS.projectContexts)
    .flush(response.projectContexts);
  httpTestingController
    .expectOne(DASHBOARD_REQUEST_URLS.technologyUsage)
    .flush(response.technologyUsage);
  httpTestingController
    .expectOne(DASHBOARD_REQUEST_URLS.professionalTimeline)
    .flush(response.professionalTimeline);
  httpTestingController
    .expectOne(DASHBOARD_REQUEST_URLS.highlights)
    .flush(response.highlights);
};

describe('DashboardComponent', () => {
  beforeAll(() => {
    const elementNames = ['hans-icon', 'hans-tag'];

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

  it('should render the analytics dashboard with live aggregated sections', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    expect(compiled.textContent).toContain('Portfolio analytics dashboard');
    expect(compiled.textContent).toContain('Loading dashboard aggregates...');

    flushDashboardRequests(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain(
      'Aggregate signals across projects, stack, and career',
    );
    expect(compiled.textContent).toContain('Stack distribution');
    expect(compiled.textContent).toContain('Project footprint');
    expect(compiled.textContent).toContain('Technology usage signals');
    expect(compiled.textContent).toContain('Career focus timeline');
    expect(compiled.textContent).toContain('Portfolio highlights');
    expect(compiled.textContent).toContain('Stefanini Group');
    expect(compiled.textContent).toContain('GitHub Consumer');
    expect(compiled.querySelectorAll('hans-tag').length).toBeGreaterThan(1);
  });

  it('should expose safe empty view-models before any dashboard request resolves', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const httpTestingController = TestBed.inject(HttpTestingController);

    const component = fixture.componentInstance as unknown as {
      summaryCards: () => readonly unknown[];
      stackRows: () => readonly unknown[];
      projectDistribution: () => unknown;
      technologyLeaders: () => readonly unknown[];
      technologyBreakdowns: () => readonly unknown[];
      timelineCards: () => readonly unknown[];
      highlightCards: () => readonly unknown[];
    };

    expect(component.summaryCards()).toEqual([]);
    expect(component.stackRows()).toEqual([]);
    expect(component.projectDistribution()).toBeNull();
    expect(component.technologyLeaders()).toEqual([]);
    expect(component.technologyBreakdowns()).toEqual([]);
    expect(component.timelineCards()).toEqual([]);
    expect(component.highlightCards()).toEqual([]);
    expect(httpTestingController.match(() => true).length).toBe(6);
  });

  it('should render localized dashboard copy in Portuguese', () => {
    TestBed.inject(TranslationService).setLocale('pt-BR');

    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    flushDashboardRequests(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Dashboard analitico');
    expect(compiled.textContent).toContain(
      'Sinais agregados entre projetos, stack e carreira',
    );
    expect(compiled.querySelector('hans-tag[label="Atual"]')).toBeTruthy();
  });

  it('should render localized dashboard copy in Spanish', () => {
    TestBed.inject(TranslationService).setLocale('es-es');

    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    flushDashboardRequests(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Dashboard analitico');
    expect(compiled.textContent).toContain(
      'Senales agregadas entre proyectos, stack y carrera',
    );
    expect(compiled.querySelector('hans-tag[label="Actual"]')).toBeTruthy();
  });

  it('should render empty states for every analytic block when the aggregates return no items', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    flushDashboardRequests(
      httpTestingController,
      createDashboardOverviewResponse({
        stackDistribution: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          stacks: [],
        },
        projectContexts: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          totalProjects: 0,
          featuredProjects: 0,
          highlightedProjects: 0,
          contexts: [],
          environments: [],
        },
        technologyUsage: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          totalUsageLinks: 0,
          levels: [],
          frequencies: [],
          contexts: [],
          sources: [],
          topTechnologies: [],
        },
        professionalTimeline: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          totalItems: 0,
          items: [],
        },
        highlights: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          totalItems: 0,
          items: [],
        },
      }),
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain('No stack distribution was returned yet.');
    expect(compiled.textContent).toContain(
      'No project distribution data was returned yet.',
    );
    expect(compiled.textContent).toContain(
      'No technology usage aggregates were returned yet.',
    );
    expect(compiled.textContent).toContain(
      'No professional timeline items were returned yet.',
    );
    expect(compiled.textContent).toContain(
      'No highlighted portfolio items were returned yet.',
    );
  });

  it('should render an API error state when the dashboard aggregate requests fail', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    httpTestingController.expectOne(DASHBOARD_REQUEST_URLS.overview).flush(null, {
      status: 500,
      statusText: 'Server Error',
    });

    const cancelledRequests = httpTestingController.match(
      (request) => request.url !== DASHBOARD_REQUEST_URLS.overview,
    );

    fixture.detectChanges();

    expect(cancelledRequests.length).toBe(5);
    expect(cancelledRequests.every((request) => request.cancelled)).toBeTrue();
    expect(compiled.textContent).toContain(
      'The dashboard aggregate endpoints are unavailable right now.',
    );
  });

  it('should compute a minimum bar width and guard zero totals', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    flushDashboardRequests(httpTestingController);

    const component = fixture.componentInstance as unknown as {
      resolveBarWidth: (value: number, maxValue: number) => string;
    };

    expect(component.resolveBarWidth(0, 0)).toBe('0%');
    expect(component.resolveBarWidth(1, 100)).toBe('12%');
    expect(component.resolveBarWidth(50, 100)).toBe('50%');
  });
});
