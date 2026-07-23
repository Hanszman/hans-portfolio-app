import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';
import { AdminAuthenticationService } from './core/api/admin/admin-auth/admin-auth.service';
import { CustomersOperationsService } from './core/api/admin/customers/customers-operations.service';
import { FormationsOperationsService } from './core/api/admin/formations/formations-operations.service';
import { ImageAssetsOperationsService } from './core/api/admin/image-assets/image-assets-operations.service';
import { JobsOperationsService } from './core/api/admin/jobs/jobs-operations.service';
import { LinksOperationsService } from './core/api/admin/links/links-operations.service';
import { PortfolioSettingsOperationsService } from './core/api/admin/portfolio-settings/portfolio-settings-operations.service';
import { SpokenLanguagesOperationsService } from './core/api/admin/spoken-languages/spoken-languages-operations.service';
import { TagsOperationsService } from './core/api/admin/tags/tags-operations.service';
import { ADMIN_SESSION_STORAGE_KEY } from './core/admin-session/admin-session.types';
import { createDashboardServiceMock } from './core/api/mocks/dashboard.mocks';
import { createExperiencesServiceMock } from './core/api/mocks/experiences.mocks';
import { createProjectsServiceMock } from './core/api/mocks/projects.mocks';
import { createSystemServiceMock } from './core/api/mocks/system.mocks';
import { createTechnologiesServiceMock } from './core/api/mocks/technologies.mocks';
import { DashboardService } from './core/api/dashboard/dashboard.service';
import { ExperiencesService } from './core/api/experiences/experiences.service';
import { ProjectsService } from './core/api/projects/projects.service';
import { SystemService } from './core/api/system/system.service';
import { TechnologiesService } from './core/api/technologies/technologies.service';
import { provideAppTranslations } from './core/translation/translation.providers';
import { routes } from './app.routes';

describe('app routes', () => {
  beforeAll(() => {
    for (const elementName of [
      'hans-input',
      'hans-button',
      'hans-icon',
      'hans-loading',
      'hans-modal',
      'hans-select-option',
      'hans-toggle',
      'hans-dropdown',
    ]) {
      if (!customElements.get(elementName)) {
        customElements.define(
          elementName,
          class extends HTMLElement {
            checked?: boolean;
            options?: readonly unknown[];
          },
        );
      }
    }
  });

  beforeEach(() => {
    sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        provideRouter(routes),
        {
          provide: SystemService,
          useValue: createSystemServiceMock(),
        },
        {
          provide: DashboardService,
          useValue: createDashboardServiceMock(),
        },
        {
          provide: ExperiencesService,
          useValue: createExperiencesServiceMock(),
        },
        {
          provide: TechnologiesService,
          useValue: createTechnologiesServiceMock(),
        },
        {
          provide: ProjectsService,
          useValue: createProjectsServiceMock(),
        },
        {
          provide: AdminAuthenticationService,
          useValue: {
            login: jasmine.createSpy(),
            getSession: jasmine.createSpy(),
          },
        },
        {
          provide: FormationsOperationsService,
          useValue: {
            getAll: jasmine
              .createSpy()
              .and.returnValue(
                of({
                  data: [
                    {
                      id: 'formation-1',
                      slug: 'systems-analysis',
                      institution: 'PUC Minas',
                      titlePt: 'Analise e Desenvolvimento de Sistemas',
                      titleEn: 'Systems Analysis and Development',
                      degreeType: 'BACHELOR',
                      summaryPt: 'Resumo PT',
                      summaryEn: 'Summary EN',
                      startDate: '2020-01-01',
                      endDate: '2023-12-01',
                      highlight: true,
                      sortOrder: 1,
                      technologyRelations: [],
                      linkIds: ['link-1'],
                      imageAssetIds: ['image-asset-1'],
                    },
                  ],
                  pagination: {
                    page: 1,
                    pageSize: 5,
                    totalItems: 1,
                    totalPages: 1,
                    hasPreviousPage: false,
                    hasNextPage: false,
                  },
                }),
              ),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: CustomersOperationsService,
          useValue: {
            getAll: jasmine
              .createSpy()
              .and.returnValue(
                of({
                  data: [
                    {
                      id: 'customer-1',
                      slug: 'enterprise-client',
                      name: 'Enterprise Client',
                      summaryPt: 'Cliente corporativo',
                      summaryEn: 'Corporate client',
                      highlight: true,
                      sortOrder: 1,
                      experienceIds: ['experience-1'],
                      imageAssetIds: ['image-asset-1'],
                    },
                  ],
                  pagination: {
                    page: 1,
                    pageSize: 5,
                    totalItems: 1,
                    totalPages: 1,
                    hasPreviousPage: false,
                    hasNextPage: false,
                  },
                }),
              ),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: JobsOperationsService,
          useValue: {
            getAll: jasmine
              .createSpy()
              .and.returnValue(
                of({
                  data: [
                    {
                      id: 'job-1',
                      slug: 'frontend-engineer',
                      namePt: 'Engenheiro Front-End',
                      nameEn: 'Front-End Engineer',
                      summaryPt: 'Interfaces publicas e privadas.',
                      summaryEn: 'Public and private interfaces.',
                      highlight: true,
                      sortOrder: 1,
                      experienceIds: ['experience-1'],
                      imageAssetIds: ['image-asset-1'],
                    },
                  ],
                  pagination: {
                    page: 1,
                    pageSize: 5,
                    totalItems: 1,
                    totalPages: 1,
                    hasPreviousPage: false,
                    hasNextPage: false,
                  },
                }),
              ),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: LinksOperationsService,
          useValue: {
            getAll: jasmine
              .createSpy()
              .and.returnValue(
                of({
                  data: [
                    {
                      id: 'link-1',
                      url: 'https://github.com/vh/portfolio',
                      labelPt: 'Repositorio',
                      labelEn: 'Repository',
                      descriptionPt: 'Codigo fonte',
                      descriptionEn: 'Source code',
                      type: 'GITHUB',
                      sortOrder: 1,
                      projectIds: ['project-1'],
                      experienceIds: ['experience-1'],
                      technologyIds: ['technology-1'],
                      formationIds: ['formation-1'],
                    },
                  ],
                  pagination: {
                    page: 1,
                    pageSize: 5,
                    totalItems: 1,
                    totalPages: 1,
                    hasPreviousPage: false,
                    hasNextPage: false,
                  },
                }),
              ),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: ImageAssetsOperationsService,
          useValue: {
            getAll: jasmine
              .createSpy()
              .and.returnValue(
                of({
                  data: [
                    {
                      id: 'image-asset-1',
                      fileName: 'vh_logo_blue.svg',
                      filePath: '/assets/img/logo/vh_logo_blue.svg',
                      folder: 'logo',
                      kind: 'ICON',
                      altPt: 'Logo azul',
                      altEn: 'Blue logo',
                      captionPt: 'Marca azul',
                      captionEn: 'Blue brand',
                      mimeType: 'image/svg+xml',
                      width: 240,
                      height: 96,
                      sortOrder: 1,
                      projectIds: ['project-1'],
                      experienceIds: ['experience-1'],
                      technologyIds: ['technology-1'],
                      formationIds: [],
                      spokenLanguageIds: [],
                      customerIds: [],
                      jobIds: [],
                    },
                  ],
                  pagination: {
                    page: 1,
                    pageSize: 5,
                    totalItems: 1,
                    totalPages: 1,
                    hasPreviousPage: false,
                    hasNextPage: false,
                  },
                }),
              ),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: PortfolioSettingsOperationsService,
          useValue: {
            getAll: jasmine
              .createSpy()
              .and.returnValue(
                of({
                  data: [
                    {
                      id: 'setting-1',
                      key: 'hero.metrics',
                      value: {
                        projects: 12,
                      },
                      description: 'Controls the highlighted portfolio metrics.',
                    },
                  ],
                  pagination: {
                    page: 1,
                    pageSize: 5,
                    totalItems: 1,
                    totalPages: 1,
                    hasPreviousPage: false,
                    hasNextPage: false,
                  },
                }),
              ),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: SpokenLanguagesOperationsService,
          useValue: {
            getAll: jasmine
              .createSpy()
              .and.returnValue(
                of({
                  data: [
                    {
                      id: 'spoken-language-1',
                      code: 'en',
                      namePt: 'Ingles',
                      nameEn: 'English',
                      proficiency: 'FLUENT',
                      highlight: true,
                      sortOrder: 1,
                      imageAssetIds: ['image-asset-1'],
                      imageAssets: [],
                    },
                  ],
                  pagination: {
                    page: 1,
                    pageSize: 5,
                    totalItems: 1,
                    totalPages: 1,
                    hasPreviousPage: false,
                    hasNextPage: false,
                  },
                }),
              ),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: TagsOperationsService,
          useValue: {
            getAll: jasmine
              .createSpy()
              .and.returnValue(
                of({
                  data: [
                    {
                      id: 'tag-1',
                      slug: 'frontend',
                      namePt: 'Front-end',
                      nameEn: 'Front-end',
                      type: 'STACK',
                      sortOrder: 1,
                      projectIds: ['project-1'],
                      technologyIds: ['technology-1'],
                    },
                  ],
                  pagination: {
                    page: 1,
                    pageSize: 5,
                    totalItems: 1,
                    totalPages: 1,
                    hasPreviousPage: false,
                    hasNextPage: false,
                  },
                }),
              ),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  });

  it('should redirect the empty path to the strategic home route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/');

    expect(harness.routeNativeElement?.textContent).toContain(
      "Hi, I'm",
    );
  });

  it('should load the dashboard foundation route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/dashboard');

    expect(harness.routeNativeElement?.textContent).toContain(
      'Portfolio analytics dashboard',
    );
  });

  it('should load the professional experiences route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/experiences');

    expect(harness.routeNativeElement?.textContent).toContain(
      'Professional Experience',
    );
  });

  it('should load the skills technology route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/skills');

    expect(harness.routeNativeElement?.textContent).toContain(
      'Skills & Technologies',
    );
  });

  it('should load the projects case-study route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/projects');

    expect(harness.routeNativeElement?.textContent).toContain('Projects');
  });

  it('should load the hidden login route outside the public shell', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/login');

    expect(harness.routeNativeElement?.textContent).toContain('Admin access');
  });

  it('should redirect unauthenticated access from the admin route to the login route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/admin');

    expect(harness.routeNativeElement?.textContent).toContain('Admin access');
  });

  it('should load the protected admin route when a persisted session is valid', async () => {
    sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, 'token-123');
    const adminAuthenticationApiService = TestBed.inject(
      AdminAuthenticationService,
    ) as unknown as {
      getSession: jasmine.Spy;
    };
    adminAuthenticationApiService.getSession.and.returnValue(
      of({
        id: '5f8e1e74-2d49-4b5c-9724-2e8c9c8b0e11',
        email: 'victor@example.com',
        name: 'Victor Hanszman',
        role: 'ADMIN',
      }),
    );

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/admin');

    expect(harness.routeNativeElement?.textContent).toContain('Admin workspace');
    expect(harness.routeNativeElement?.textContent).toContain(
      '12 entity workflows',
    );
  });

  it('should redirect authenticated access from the login route to the protected admin route', async () => {
    sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, 'token-123');
    const adminAuthenticationApiService = TestBed.inject(
      AdminAuthenticationService,
    ) as unknown as {
      getSession: jasmine.Spy;
    };
    adminAuthenticationApiService.getSession.and.returnValue(
      of({
        id: '5f8e1e74-2d49-4b5c-9724-2e8c9c8b0e11',
        email: 'victor@example.com',
        name: 'Victor Hanszman',
        role: 'ADMIN',
      }),
    );

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/login');

    expect(harness.routeNativeElement?.textContent).toContain('Admin workspace');
    expect(harness.routeNativeElement?.textContent).toContain(
      '12 entity workflows',
    );
  });

  it('should redirect unknown routes to the strategic home route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/not-found');

    expect(harness.routeNativeElement?.textContent).toContain(
      "Hi, I'm",
    );
  });
});
