import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../core/api/api.config';
import { createProjectsCollectionResponse } from '../../core/api/mocks/projects.mocks';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TranslationService } from '../../core/translation/translation.service';
import { ProjectCaseViewModel, ProjectContextFilterValue } from './projects.types';
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
      'hans-card',
      'hans-icon',
      'hans-input',
      'hans-tag',
      'hans-modal',
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

  it('should render the projects showcase with live cards', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    expect(compiled.textContent).toContain('Projects');
    expect(compiled.textContent).toContain('Building project case studies...');

    flushProjectsRequest(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain('// PROJECTS_SHOWCASE');
    expect(compiled.textContent).toContain('A collection of real-world applications');
    expect(compiled.textContent).toContain("Github's API Consumer");
    expect(compiled.textContent).toContain('Public Diagnostics');
    expect(compiled.textContent).toContain('HardWorker');
    expect(compiled.querySelectorAll('app-project-case-card').length).toBe(4);
    expect(compiled.querySelectorAll('hans-tag').length).toBeGreaterThan(6);
  });

  it('should render localized labels in Portuguese', () => {
    TestBed.inject(TranslationService).setLocale('pt-br');

    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    flushProjectsRequest(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Projetos');
    expect(compiled.textContent).toContain('Uma coleção de aplicações reais');
    expect(compiled.querySelector('hans-tag[label="Formação"]')).toBeTruthy();
  });

  it('should render localized labels in Spanish', () => {
    TestBed.inject(TranslationService).setLocale('es-es');

    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    flushProjectsRequest(httpTestingController);
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Proyectos');
    expect(compiled.textContent).toContain('Una colección de aplicaciones reales');
    expect(compiled.querySelector('hans-tag[label="Formación"]')).toBeTruthy();
  });

  it('should filter project cards by context and search term', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);

    flushProjectsRequest(httpTestingController);
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      selectContext: (value: ProjectContextFilterValue) => void;
      updateSearchTerm: (searchTerm: string) => void;
      visibleProjectCases: () => readonly ProjectCaseViewModel[];
    };

    component.selectContext('PERSONAL');
    fixture.detectChanges();

    expect(component.visibleProjectCases().map((project) => project.title)).toEqual([
      "Github's API Consumer",
      'Portfolio',
    ]);

    component.updateSearchTerm('portfolio');
    fixture.detectChanges();

    expect(component.visibleProjectCases().map((project) => project.title)).toEqual([
      'Portfolio',
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

  it('should open and close the project detail modal state', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    flushProjectsRequest(httpTestingController);
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      projectCases: () => readonly ProjectCaseViewModel[];
      openProjectDetails: (project: ProjectCaseViewModel) => void;
      closeProjectDetails: () => void;
      openTechnologyDetails: (technology: { slug: string; name: string }) => void;
      closeTechnologyDetails: () => void;
      selectedProject: () => ProjectCaseViewModel | null;
      selectedTechnology: () => { slug: string; name: string } | null;
      isDetailOpen: () => boolean;
      isTechnologyModalOpen: () => boolean;
    };

    const project = component.projectCases()[0];
    component.openProjectDetails(project);

    expect(component.selectedProject()).toEqual(project);
    expect(component.isDetailOpen()).toBeTrue();

    component.closeProjectDetails();

    expect(component.selectedProject()).toBeNull();
    expect(component.isDetailOpen()).toBeFalse();

    component.openTechnologyDetails({ slug: 'angular', name: 'Angular' });

    expect(component.selectedTechnology()?.name).toBe('Angular');
    expect(component.isTechnologyModalOpen()).toBeTrue();

    component.closeTechnologyDetails();

    expect(component.selectedTechnology()).toBeNull();
    expect(component.isTechnologyModalOpen()).toBeFalse();
  });

  it('should update project search from hans-input value events', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    flushProjectsRequest(httpTestingController);
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      updateSearchTerm: (searchTerm: string) => void;
      visibleProjectCases: () => readonly ProjectCaseViewModel[];
    };

    component.updateSearchTerm('github');

    expect(component.visibleProjectCases().map((project) => project.title)).toEqual([
      "Github's API Consumer",
    ]);

    component.updateSearchTerm('public');

    expect(component.visibleProjectCases().map((project) => project.title)).toContain(
      'Public Diagnostics',
    );

    component.updateSearchTerm('hard');

    expect(component.visibleProjectCases().map((project) => project.title)).toEqual([
      'HardWorker',
    ]);

    component.updateSearchTerm('');

    expect(component.visibleProjectCases().length).toBeGreaterThan(1);
  });

  it('should update project search from the bound hans-input host events', () => {
    const fixture = TestBed.createComponent(ProjectsComponent);
    fixture.detectChanges();

    flushProjectsRequest(TestBed.inject(HttpTestingController));
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('hans-input') as HTMLElement & {
      value?: string;
    };
    const component = fixture.componentInstance as unknown as {
      searchTerm: () => string;
      visibleProjectCases: () => readonly ProjectCaseViewModel[];
    };

    input.value = 'github';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    fixture.detectChanges();

    expect(component.searchTerm()).toBe('github');
    expect(component.visibleProjectCases().map((project) => project.title)).toEqual([
      "Github's API Consumer",
    ]);
  });

});
