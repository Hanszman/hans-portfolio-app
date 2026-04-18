import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardOverviewResponse } from '../../core/api/dashboard-api.types';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TranslationService } from '../../core/translation/translation.service';
import { HomeComponent } from './home.component';

const createDashboardResponse = (
  overrides: Partial<DashboardOverviewResponse> = {},
): DashboardOverviewResponse => ({
  generatedAtUtc: '2026-04-18T12:00:00.000Z',
  summary: {
    projects: 12,
    experiences: 4,
    technologies: 35,
    formations: 3,
    customers: 6,
    jobs: 5,
    spokenLanguages: 2,
  },
  stackDistribution: {
    generatedAtUtc: '2026-04-18T12:00:00.000Z',
    stacks: [
      {
        slug: 'front-end',
        namePt: 'Front-End',
        nameEn: 'Front-End',
        projectCount: 8,
        technologyCount: 18,
      },
      {
        slug: 'backend',
        namePt: 'Back-End',
        nameEn: 'Back-End',
        projectCount: 5,
        technologyCount: 9,
      },
      {
        slug: 'devops',
        namePt: 'DevOps',
        nameEn: 'DevOps',
        projectCount: 3,
        technologyCount: 6,
      },
      {
        slug: 'extra',
        namePt: 'Extra',
        nameEn: 'Extra',
        projectCount: 1,
        technologyCount: 1,
      },
    ],
  },
  projectContexts: {
    generatedAtUtc: '2026-04-18T12:00:00.000Z',
    totalProjects: 12,
    featuredProjects: 3,
    highlightedProjects: 5,
  },
  technologyUsage: {
    generatedAtUtc: '2026-04-18T12:00:00.000Z',
    totalUsageLinks: 48,
    topTechnologies: [
      {
        slug: 'angular',
        name: 'Angular',
        category: 'FRAMEWORK',
        usageCount: 10,
      },
      {
        slug: 'typescript',
        name: 'TypeScript',
        category: 'LANGUAGE',
        usageCount: 9,
      },
      {
        slug: 'rxjs',
        name: 'RxJS',
        category: 'LIBRARY',
        usageCount: 7,
      },
      {
        slug: 'nestjs',
        name: 'NestJS',
        category: 'FRAMEWORK',
        usageCount: 6,
      },
      {
        slug: 'prisma',
        name: 'Prisma',
        category: 'ORM',
        usageCount: 5,
      },
      {
        slug: 'postgres',
        name: 'PostgreSQL',
        category: 'DATABASE',
        usageCount: 4,
      },
      {
        slug: 'docker',
        name: 'Docker',
        category: 'DEVOPS',
        usageCount: 3,
      },
    ],
  },
  professionalTimeline: {
    generatedAtUtc: '2026-04-18T12:00:00.000Z',
    totalItems: 1,
    items: [
      {
        slug: 'pagbank',
        companyName: 'PagBank',
        titlePt: 'Engenheiro de Software',
        titleEn: 'Software Engineer',
        startDate: '2023-01-01',
        endDate: null,
        isCurrent: true,
        highlight: true,
        jobs: ['Frontend Engineer'],
        customers: ['PagBank'],
        projects: ['portfolio-remake'],
        technologies: ['Angular', 'TypeScript', 'Design Systems', 'NestJS', 'Prisma'],
        imagePath: null,
      },
    ],
  },
  highlights: {
    generatedAtUtc: '2026-04-18T12:00:00.000Z',
    totalItems: 1,
    items: [
      {
        entity: 'project',
        slug: 'portfolio-remake',
        titlePt: 'Remake do Portfólio',
        titleEn: 'Portfolio Remake',
        subtitlePt: 'Projeto full stack conectado a API real.',
        subtitleEn: 'Full stack project connected to a real API.',
        featured: true,
      },
    ],
  },
  ...overrides,
});

describe('HomeComponent', () => {
  beforeAll(() => {
    if (!customElements.get('hans-button')) {
      customElements.define('hans-button', class extends HTMLElement {});
    }

    if (!customElements.get('hans-tag')) {
      customElements.define('hans-tag', class extends HTMLElement {});
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
    expect(compiled.querySelector('hans-button[label="View projects"]')).toBeTruthy();

    const request = httpTestingController.expectOne(
      'http://localhost:3000/dashboard',
    );
    request.flush(createDashboardResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Real data from the first screen');
    expect(compiled.textContent).toContain('12');
    expect(compiled.textContent).toContain('35');
    expect(compiled.textContent).toContain('Portfolio Remake');
    expect(compiled.textContent).toContain('Software Engineer');
    expect(compiled.textContent).toContain('Angular');
    expect(compiled.querySelectorAll('hans-tag').length).toBeGreaterThan(6);
  });

  it('should render localized dashboard fields in Portuguese', () => {
    TestBed.inject(TranslationService).setLocale('pt-BR');

    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(
      'http://localhost:3000/dashboard',
    );
    request.flush(createDashboardResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Home estratégica do portfólio');
    expect(compiled.textContent).toContain('Remake do Portfólio');
    expect(compiled.textContent).toContain('Engenheiro de Software');
    expect(compiled.querySelector('hans-button[label="Ver projetos"]')).toBeTruthy();
  });

  it('should render empty states when dashboard sections return no items', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(
      'http://localhost:3000/dashboard',
    );
    request.flush(
      createDashboardResponse({
        stackDistribution: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          stacks: [],
        },
        technologyUsage: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          totalUsageLinks: 0,
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

    expect(compiled.textContent).toContain('No highlighted portfolio items were returned yet.');
    expect(compiled.textContent).toContain('No stack distribution was returned yet.');
    expect(compiled.textContent).toContain('No professional timeline items were returned yet.');
    expect(compiled.textContent).toContain('No technology usage data was returned yet.');
  });

  it('should fallback to highlighted or first timeline item and optional highlight fields', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(
      'http://localhost:3000/dashboard',
    );
    request.flush(
      createDashboardResponse({
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
              customers: [],
              projects: [],
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
    expect(compiled.textContent).not.toContain('Full stack project connected to a real API.');
    expect(compiled.textContent).not.toContain('FeaturedFeatured');
  });

  it('should fallback to the first timeline item when no current or highlighted item exists', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(
      'http://localhost:3000/dashboard',
    );
    request.flush(
      createDashboardResponse({
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
              projects: [],
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
  });

  it('should render an API error state when the dashboard request fails', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(
      'http://localhost:3000/dashboard',
    );
    request.flush(null, {
      status: 500,
      statusText: 'Server Error',
    });
    fixture.detectChanges();

    expect(compiled.textContent).toContain('The dashboard endpoint is unavailable right now');
    expect(compiled.textContent).toContain('No highlighted portfolio items were returned yet.');
    expect(compiled.textContent).toContain('No stack distribution was returned yet.');
  });
});
