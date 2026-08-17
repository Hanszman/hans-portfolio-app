import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { buildApiUrl } from '../../core/api/api.config';
import { createExperiencesCollectionResponse } from '../../core/api/mocks/experiences.mocks';
import { createProjectsCollectionResponse } from '../../core/api/mocks/projects.mocks';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TranslationService } from '../../core/translation/translation.service';
import { ExperiencesComponent } from './experiences.component';

describe('ExperiencesComponent', () => {
  beforeAll(() => {
    const elementNames = ['hans-icon', 'hans-tag', 'hans-button', 'hans-modal'];

    for (const elementName of elementNames) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [ExperiencesComponent],
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

  it('should render the redesigned experience timeline with live API data', () => {
    const fixture = TestBed.createComponent(ExperiencesComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    expect(compiled.textContent).toContain('Professional Experience');
    expect(compiled.textContent).toContain(
      'A chronological journey through my career building impactful software solutions.',
    );
    expect(compiled.querySelector('hans-loading')).toBeTruthy();
    expect(compiled.textContent).not.toContain('Loading live experience relationships...');

    const request = httpTestingController.expectOne(
      buildApiUrl('/experiences?page=1&pageSize=20&sortBy=startDate&sortDirection=desc'),
    );
    request.flush(createExperiencesCollectionResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Stefanini Group');
    expect(compiled.textContent).toContain('Full Stack Developer');
    expect(compiled.textContent).toContain('View details');
    expect(compiled.querySelector('img[src="/assets/img/experiences/stefanini.jpg"]')).toBeTruthy();

    const component = fixture.componentInstance as unknown as {
      timelineItems: () => readonly [{ id: string }];
      openExperienceDetails: (item: { id: string }) => void;
      selectedExperience: () => { projects: readonly [{ title: string }] } | null;
    };

    component.openExperienceDetails(component.timelineItems()[0]);
    fixture.detectChanges();

    expect(component.selectedExperience()?.projects[0]?.title).toBe(
      'Customer & Dealer Transformation App',
    );
  });

  it('should render localized experience labels in Portuguese', () => {
    TestBed.inject(TranslationService).setLocale('pt-br');

    const fixture = TestBed.createComponent(ExperiencesComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(
      buildApiUrl('/experiences?page=1&pageSize=20&sortBy=startDate&sortDirection=desc'),
    );
    request.flush(createExperiencesCollectionResponse());
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Experiência Profissional');
    expect(compiled.textContent).toContain(
      'Uma jornada cronológica pela minha carreira construindo soluções de software de impacto.',
    );
    expect(compiled.textContent).toContain('Desenvolvedor Full Stack');
  });

  it('should render empty and error states for the experiences page', () => {
    const fixture = TestBed.createComponent(ExperiencesComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const httpTestingController = TestBed.inject(HttpTestingController);

    const request = httpTestingController.expectOne(
      buildApiUrl('/experiences?page=1&pageSize=20&sortBy=startDate&sortDirection=desc'),
    );
    request.flush(
      createExperiencesCollectionResponse({
        data: [],
        pagination: {
          page: 1,
          pageSize: 20,
          totalItems: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      }),
    );
    fixture.detectChanges();

    const emptyMessage = compiled.querySelector('hans-message') as HTMLElement & {
      message: string;
    };
    expect(emptyMessage.message).toBe('No published experience chapters were returned yet.');

    fixture.destroy();

    const errorFixture = TestBed.createComponent(ExperiencesComponent);
    errorFixture.detectChanges();

    const errorCompiled = errorFixture.nativeElement as HTMLElement;
    const errorRequest = httpTestingController.expectOne(
      buildApiUrl('/experiences?page=1&pageSize=20&sortBy=startDate&sortDirection=desc'),
    );
    errorRequest.flush(null, {
      status: 500,
      statusText: 'Server Error',
    });
    errorFixture.detectChanges();

    const errorMessage = errorCompiled.querySelector('hans-message') as HTMLElement & {
      message: string;
    };
    expect(errorMessage.message).toBe('The experiences endpoint is unavailable right now.');
  });

  it('should open and close the experience detail drawer state', async () => {
    const fixture = TestBed.createComponent(ExperiencesComponent);
    fixture.detectChanges();

    const httpTestingController = TestBed.inject(HttpTestingController);
    const request = httpTestingController.expectOne(
      buildApiUrl('/experiences?page=1&pageSize=20&sortBy=startDate&sortDirection=desc'),
    );
    request.flush(createExperiencesCollectionResponse());
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      timelineItems: () => readonly [{ id: string }];
      openExperienceDetails: (item: { id: string }) => void;
      closeExperienceDetails: () => void;
      selectedExperience: () => { id: string } | null;
      isSelectedExperience: (experienceId: string) => boolean;
      openTechnologyDetails: (technology: { slug: string; name: string }) => void;
      closeTechnologyDetails: () => void;
      selectedTechnology: () => { slug: string } | null;
      openCustomerDetails: (customer: {
        name: string;
        companyName: string;
        projectCount: number;
        summary?: string;
      }) => void;
      closeCustomerDetails: () => void;
      selectedCustomer: () => { name: string } | null;
      selectedCustomerDetails: () => readonly {
        labelKey: string;
        value: string | number;
      }[];
      openProjectDetails: (projectSlug: string) => Promise<void>;
      closeProjectDetails: () => void;
      selectedProject: () => { slug: string } | null;
    };

    const item = component.timelineItems()[0];
    component.openExperienceDetails(item);
    fixture.detectChanges();

    expect(component.selectedExperience()).toEqual(item);
    expect(component.isSelectedExperience(item.id)).toBeTrue();
    expect(fixture.nativeElement.querySelectorAll('app-experience-modal').length).toBe(1);

    component.closeExperienceDetails();
    fixture.detectChanges();

    expect(component.selectedExperience()).toBeNull();
    expect(component.isSelectedExperience(item.id)).toBeFalse();
    expect(fixture.nativeElement.querySelector('app-experience-modal')).toBeNull();

    component.openTechnologyDetails({ slug: 'angular', name: 'Angular' });

    expect(component.selectedTechnology()?.slug).toBe('angular');

    component.closeTechnologyDetails();

    expect(component.selectedTechnology()).toBeNull();

    component.openCustomerDetails({
      name: 'Ford',
      companyName: 'Stefanini Group',
      projectCount: 2,
      summary: 'Automotive customer',
    });

    expect(component.selectedCustomer()?.name).toBe('Ford');
    expect(component.selectedCustomerDetails()[0].value).toBe('Stefanini Group');
    expect(component.selectedCustomerDetails().map(({ value }) => value)).toContain(
      'Automotive customer',
    );

    component.openCustomerDetails({
      name: 'Ford',
      companyName: 'Stefanini Group',
      projectCount: 2,
    });
    expect(component.selectedCustomerDetails()).toEqual([
      {
        labelKey: 'pages.experiences.customer.company',
        value: 'Stefanini Group',
      },
      {
        labelKey: 'pages.experiences.customer.projects',
        value: 2,
      },
    ]);

    component.closeCustomerDetails();

    expect(component.selectedCustomer()).toBeNull();
    expect(component.selectedCustomerDetails()).toEqual([]);

    component.openExperienceDetails(item);
    const projectPromise = component.openProjectDetails('github-consumer');
    const projectRequest = httpTestingController.expectOne(
      buildApiUrl('/projects/github-consumer'),
    );
    projectRequest.flush(createProjectsCollectionResponse().data[0]);
    await projectPromise;
    fixture.detectChanges();

    expect(component.selectedExperience()).toBeNull();
    expect(component.selectedProject()?.slug).toBe('github-consumer');
    expect(fixture.nativeElement.querySelector('app-project-modal')).toBeTruthy();

    component.closeProjectDetails();
    expect(component.selectedProject()).toBeNull();
  });
});
