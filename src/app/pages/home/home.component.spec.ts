import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { buildApiUrl } from '../../core/api/api.config';
import { createDashboardOverviewResponse } from '../../core/api/mocks/dashboard.mocks';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TranslationService } from '../../core/translation/translation.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeAll(() => {
    const elementNames = ['hans-button', 'hans-tag', 'hans-avatar', 'hans-icon'];

    for (const elementName of elementNames) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAppTranslations(),
        provideRouter([]),
      ],
    }).compileComponents();
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);
  });

  it('should render the strategic home and hydrate it with dashboard data', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    expect(compiled.textContent).toContain('Strategic portfolio home');
    expect(compiled.textContent).toContain('Connecting live portfolio data...');

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(createDashboardOverviewResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Real data from the first screen');
    expect(compiled.textContent).toContain('GitHub Consumer');
    expect(compiled.textContent).toContain('Stefanini Group');
    expect(compiled.textContent).toContain('Front-End Specialist');
    expect(compiled.querySelectorAll('hans-avatar').length).toBeGreaterThan(2);
    expect(compiled.querySelectorAll('hans-icon').length).toBeGreaterThan(6);
  });

  it('should render localized dashboard fields in Portuguese', () => {
    TestBed.inject(TranslationService).setLocale('pt-BR');

    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(createDashboardOverviewResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Home');
    expect(compiled.textContent).toContain('Especialista Front-End');
    expect(compiled.querySelector('hans-button[label="Ver projetos"]')).toBeTruthy();
  });

  it('should render shell and home copy in Spanish when the locale changes', () => {
    TestBed.inject(TranslationService).setLocale('es-es');

    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(createDashboardOverviewResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Home estrategica del portfolio');
    expect(compiled.textContent).toContain('Datos reales desde la primera pantalla');
    expect(compiled.querySelector('hans-button[label="Ver proyectos"]')).toBeTruthy();
  });

  it('should render empty states when dashboard sections return no items', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(
      createDashboardOverviewResponse({
        stackDistribution: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          stacks: [],
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

    expect(compiled.textContent).toContain(
      'No highlighted portfolio items were returned yet.',
    );
    expect(compiled.textContent).toContain(
      'No stack distribution was returned yet.',
    );
    expect(compiled.textContent).toContain(
      'No professional timeline items were returned yet.',
    );
    expect(compiled.textContent).toContain(
      'No technology usage data was returned yet.',
    );
  });

  it('should fallback to highlighted or first timeline item and optional highlight fields', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(
      createDashboardOverviewResponse({
        professionalTimeline: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          totalItems: 2,
          items: [
            {
              slug: 'first-company',
              companyName: 'First Company',
              titlePt: 'Desenvolvedor Front-End',
              titleEn: 'Front-End Developer',
              startDate: '2020-01-01',
              endDate: '2021-01-01',
              isCurrent: false,
              highlight: false,
              jobs: [],
              customers: [],
              projects: [],
              technologies: ['React'],
              imagePath: null,
            },
            {
              slug: 'highlight-company',
              companyName: 'Highlight Company',
              titlePt: 'Especialista Front-End',
              titleEn: 'Front-End Specialist',
              startDate: '2021-01-01',
              endDate: '2022-01-01',
              isCurrent: false,
              highlight: true,
              jobs: [],
              customers: ['Client Alpha'],
              projects: ['highlight-project'],
              technologies: ['Angular'],
              imagePath: null,
            },
          ],
        },
        highlights: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          totalItems: 1,
          items: [
            {
              entity: 'technology',
              slug: 'angular',
              titlePt: 'Angular',
              titleEn: 'Angular',
            },
          ],
        },
      }),
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Highlight Company');
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.textContent).toContain('Client Alpha');
    expect(compiled.textContent).not.toContain(
      'Full stack project connected to a real API.',
    );
  });

  it('should fallback to the first timeline item when no current or highlighted item exists', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(
      createDashboardOverviewResponse({
        professionalTimeline: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          totalItems: 1,
          items: [
            {
              slug: 'first-company',
              companyName: 'First Company',
              titlePt: 'Desenvolvedor Front-End',
              titleEn: 'Front-End Developer',
              startDate: '2020-01-01',
              endDate: '2021-01-01',
              isCurrent: false,
              highlight: false,
              jobs: [],
              customers: [],
              projects: ['legacy-rewrite'],
              technologies: ['React'],
              imagePath: null,
            },
          ],
        },
      }),
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain('First Company');
    expect(compiled.textContent).toContain('Front-End Developer');
    expect(compiled.textContent).toContain('legacy-rewrite');
  });

  it('should fallback to generic icon mappings for unknown entities stack groups and technology categories', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(
      createDashboardOverviewResponse({
        stackDistribution: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          stacks: [
            {
              slug: 'custom-stack',
              namePt: 'Stack customizada',
              nameEn: 'Custom stack',
              projectCount: 2,
              technologyCount: 5,
            },
          ],
        },
        technologyUsage: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          totalUsageLinks: 1,
          levels: [],
          frequencies: [],
          contexts: [],
          sources: [],
          topTechnologies: [
            {
              slug: 'custom-tech',
              name: 'Custom Tech',
              category: 'UNKNOWN',
              usageCount: 1,
            },
          ],
        },
        highlights: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          totalItems: 1,
          items: [
            {
              entity: 'unknown',
              slug: 'mystery-item',
              titlePt: 'Item misterioso',
              titleEn: 'Mystery item',
            },
          ],
        },
      }),
    );
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Mystery item');
    expect(compiled.textContent).toContain('Custom stack');
    expect(compiled.textContent).toContain('Custom Tech');
    expect(compiled.querySelectorAll('hans-icon').length).toBeGreaterThan(8);
  });

  it('should render an API error state when the dashboard request fails', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(buildApiUrl('/dashboard'));
    request.flush(null, {
      status: 500,
      statusText: 'Server Error',
    });
    fixture.detectChanges();

    expect(compiled.textContent).toContain(
      'The dashboard endpoint is unavailable right now',
    );
    expect(compiled.textContent).toContain(
      'No highlighted portfolio items were returned yet.',
    );
    expect(compiled.textContent).toContain(
      'No stack distribution was returned yet.',
    );
  });
});
