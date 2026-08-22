import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { buildApiUrl } from '../../core/api/api.config';
import { DashboardOverviewResponse } from '../../core/api/dashboard/dashboard.types';
import { createDashboardOverviewResponse } from '../../core/api/mocks/dashboard.mocks';
import { createProjectsCollectionResponse } from '../../core/api/mocks/projects.mocks';
import { createTechnologiesCollectionResponse } from '../../core/api/mocks/technologies.mocks';
import { ProjectsCollectionResponse } from '../../core/api/projects/projects.types';
import { TechnologiesCollectionResponse } from '../../core/api/technologies/technologies.types';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TranslationService } from '../../core/translation/translation.service';
import { HomeComponent } from './home.component';

interface HomeComponentTestHook {
  dashboardSignal: { set(value: DashboardOverviewResponse | null): void };
  topTechnologyChips(): readonly unknown[];
  highlightedProjects(): readonly { project: { id: string; title: string } }[];
  openTechnologyDetails(technology: { slug: string; name: string }): void;
  closeTechnologyDetails(): void;
  selectedTechnology(): { slug: string; name: string } | null;
  openProjectDetails(project: { id: string; title: string }): void;
  closeProjectDetails(): void;
  selectedProject(): { id: string; title: string } | null;
  calculateCareerYears(referenceDate?: Date): number;
}

const defaultProjects = (): ProjectsCollectionResponse =>
  createProjectsCollectionResponse({
    pagination: {
      page: 1,
      pageSize: 100,
      totalItems: 28,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  });

const defaultTechnologies = (): TechnologiesCollectionResponse =>
  createTechnologiesCollectionResponse({
    pagination: {
      page: 1,
      pageSize: 100,
      totalItems: 64,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  });

const flushHomeRequests = (
  httpTestingController: HttpTestingController,
  dashboard = createDashboardOverviewResponse(),
  projects = defaultProjects(),
  technologies = defaultTechnologies(),
): void => {
  httpTestingController.expectOne(buildApiUrl('/dashboard')).flush(dashboard);
  httpTestingController
    .expectOne((request) => request.url.startsWith(buildApiUrl('/projects?')))
    .flush(projects);
  httpTestingController
    .expectOne((request) => request.url.startsWith(buildApiUrl('/technologies?')))
    .flush(technologies);
};

describe('HomeComponent', () => {
  beforeAll(() => {
    for (const elementName of [
      'hans-button',
      'hans-tag',
      'hans-avatar',
      'hans-icon',
      'hans-card',
      'hans-loading',
      'hans-modal',
      'hans-carousel',
      'hans-chart',
      'hans-progress-bar',
    ]) {
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

  it('should render the hero and loading state while all home resources load', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    expect(compiled.textContent).toContain("Hi, I'm");
    expect(compiled.textContent).toContain('Victor Hanszman');
    expect(compiled.querySelector('hans-loading')).toBeTruthy();
    expect(compiled.querySelectorAll('hans-button.social-links-button')).toHaveSize(4);

    flushHomeRequests(httpTestingController);
  });

  it('should render rounded API totals, skill CTA and highlighted project cards', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    flushHomeRequests(TestBed.inject(HttpTestingController));
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('7+');
    expect(compiled.textContent).toContain('60+');
    expect(compiled.textContent).toContain('25+');
    expect(compiled.textContent).toContain('Main Technologies');
    expect(compiled.textContent).toContain('Highlighted Projects');
    expect(
      Array.from(compiled.querySelectorAll('.home-page-action hans-button')).map(
        (button) => (button as HTMLElement & { label: string }).label,
      ),
    ).toEqual(['Check out more skills', 'Check out more projects']);
    expect(compiled.querySelectorAll('hans-tag').length).toBeGreaterThan(3);
    expect(compiled.querySelectorAll('app-home-secondary-cards hans-card').length).toBeGreaterThan(0);
    expect(compiled.querySelectorAll('.card-action')).toHaveSize(0);
  });

  it('should reactively localize highlighted project content in Portuguese and Spanish', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const translation = TestBed.inject(TranslationService);
    translation.setLocale('pt-br');
    fixture.detectChanges();
    flushHomeRequests(TestBed.inject(HttpTestingController));
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Projetos em Destaque');

    translation.setLocale('es-es');
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Proyectos Destacados');
  });

  it('should render an empty technology state when dashboard stack data is absent', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    flushHomeRequests(
      TestBed.inject(HttpTestingController),
      createDashboardOverviewResponse({
        technologyUsage: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          totalUsageLinks: 0,
          levels: [],
          types: [],
          frequencies: [],
          contexts: [],
          sources: [],
          topTechnologies: [],
        },
      }),
    );
    fixture.detectChanges();

    const message = (fixture.nativeElement as HTMLElement).querySelector('hans-message') as
      | (HTMLElement & { message: string })
      | null;
    expect(message?.message).toBe('No stack distribution was returned yet.');
  });

  it('should render an API error when one of the required home resources fails', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const httpTestingController = TestBed.inject(HttpTestingController);

    httpTestingController
      .expectOne((request) => request.url.startsWith(buildApiUrl('/projects?')))
      .flush(defaultProjects());
    httpTestingController
      .expectOne((request) => request.url.startsWith(buildApiUrl('/technologies?')))
      .flush(defaultTechnologies());
    httpTestingController.expectOne(buildApiUrl('/dashboard')).flush(null, {
      status: 500,
      statusText: 'Server Error',
    });
    fixture.detectChanges();

    const message = (fixture.nativeElement as HTMLElement).querySelector('hans-message') as
      | (HTMLElement & { message: string })
      | null;
    expect(message?.message).toContain('The live home data is unavailable right now');
  });

  it('should calculate career years around the anniversary boundary', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance as unknown as HomeComponentTestHook;
    flushHomeRequests(TestBed.inject(HttpTestingController));

    expect(component.calculateCareerYears(new Date('2026-09-03T00:00:00.000Z'))).toBe(8);
    expect(component.calculateCareerYears(new Date('2026-09-02T00:00:00.000Z'))).toBe(7);
  });

  it('should expose empty derived collections when dashboard and projects are absent', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance as unknown as HomeComponentTestHook;
    flushHomeRequests(
      TestBed.inject(HttpTestingController),
      createDashboardOverviewResponse(),
      createProjectsCollectionResponse({
        data: [],
        pagination: {
          page: 1,
          pageSize: 100,
          totalItems: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      }),
    );

    component.dashboardSignal.set(null);

    expect(component.topTechnologyChips()).toEqual([]);
    expect(component.highlightedProjects()).toEqual([]);
  });

  it('should resolve a slug-derived technology modal image when a dashboard slug has no mapped visual', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance as unknown as HomeComponentTestHook;
    flushHomeRequests(
      TestBed.inject(HttpTestingController),
      createDashboardOverviewResponse({
        technologyUsage: {
          generatedAtUtc: '2026-04-18T12:00:00.000Z',
          totalUsageLinks: 1,
          levels: [],
          types: [],
          frequencies: [],
          contexts: [],
          sources: [],
          topTechnologies: [
            { slug: 'unknown-stack', name: 'Unknown Stack', type: 'OTHERS', usageCount: 1 },
          ],
        },
      }),
    );

    const [chip] = component.topTechnologyChips() as readonly {
      value: { image: { src: string } | null };
    }[];
    expect(chip.value.image?.src).toContain('/assets/img/skills/unknownstack.png');
  });

  it('should open and close technology and highlighted project details without stale modals', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance as unknown as HomeComponentTestHook;
    flushHomeRequests(TestBed.inject(HttpTestingController));

    const chip = component.topTechnologyChips()[0] as { value: { slug: string; name: string } };
    component.openTechnologyDetails(chip.value);
    expect(component.selectedTechnology()?.name).toBe(chip.value.name);
    component.closeTechnologyDetails();
    expect(component.selectedTechnology()).toBeNull();

    const project = component.highlightedProjects()[0].project;
    component.openProjectDetails(project);
    expect(component.selectedProject()?.id).toBe(project.id);

    component.openTechnologyDetails(chip.value);
    expect(component.selectedProject()).toBeNull();
    expect(component.selectedTechnology()?.name).toBe(chip.value.name);

    component.closeProjectDetails();
    expect(component.selectedProject()).toBeNull();
  });
});
