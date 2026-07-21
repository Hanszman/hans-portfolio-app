import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { CustomersOperationsService } from '../../core/api/admin/customers/customers-operations.service';
import { ImageAssetsOperationsService } from '../../core/api/admin/image-assets/image-assets-operations.service';
import { LinksOperationsService } from '../../core/api/admin/links/links-operations.service';
import { PortfolioSettingsOperationsService } from '../../core/api/admin/portfolio-settings/portfolio-settings-operations.service';
import { SpokenLanguagesOperationsService } from '../../core/api/admin/spoken-languages/spoken-languages-operations.service';
import { TagsOperationsService } from '../../core/api/admin/tags/tags-operations.service';
import { AdminSessionService } from '../../core/admin-session/admin-session.service';
import { ExperiencesService } from '../../core/api/experiences/experiences.service';
import { ProjectsService } from '../../core/api/projects/projects.service';
import { TechnologiesService } from '../../core/api/technologies/technologies.service';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  beforeAll(() => {
    for (const elementName of [
      'hans-button',
      'hans-icon',
      'hans-input',
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideAppTranslations(),
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
            user: () => ({
              id: '5f8e1e74-2d49-4b5c-9724-2e8c9c8b0e11',
              email: 'victor@example.com',
              name: 'Victor Hanszman',
              role: 'ADMIN',
            }),
            logout: jasmine.createSpy(),
          },
        },
        {
          provide: CustomersOperationsService,
          useValue: {
            getAll: () =>
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
                    experiences: [],
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
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: PortfolioSettingsOperationsService,
          useValue: {
            getAll: () =>
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
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: ImageAssetsOperationsService,
          useValue: {
            getAll: () =>
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
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: SpokenLanguagesOperationsService,
          useValue: {
            getAll: () =>
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
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: LinksOperationsService,
          useValue: {
            getAll: () =>
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
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: TagsOperationsService,
          useValue: {
            getAll: () =>
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
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: ProjectsService,
          useValue: {
            getProjects: () =>
              of({
                data: [
                  {
                    id: 'project-1',
                    slug: 'portfolio-remake',
                    titlePt: 'Portfolio remake',
                    titleEn: 'Portfolio remake',
                    shortDescriptionPt: 'Resumo',
                    shortDescriptionEn: 'Summary',
                    fullDescriptionPt: 'Descricao',
                    fullDescriptionEn: 'Description',
                    context: 'personal',
                    status: 'in-progress',
                    environment: 'fullstack',
                    featured: true,
                    highlight: true,
                    startDate: '2024-01-01',
                    endDate: null,
                    sortOrder: 1,
                    createdAt: '2024-01-01T00:00:00.000Z',
                    updatedAt: '2024-01-01T00:00:00.000Z',
                    technologies: [],
                    experiences: [],
                    tags: [],
                    links: [],
                    imageAssets: [],
                  },
                ],
                pagination: {
                  page: 1,
                  pageSize: 100,
                  totalItems: 1,
                  totalPages: 1,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
          },
        },
        {
          provide: ExperiencesService,
          useValue: {
            getExperiences: () =>
              of({
                data: [
                  {
                    id: 'experience-1',
                    slug: 'stefanini-ford',
                    companyName: 'Stefanini Ford',
                    titlePt: 'Analista',
                    titleEn: 'Analyst',
                    summaryPt: 'Resumo',
                    summaryEn: 'Summary',
                    descriptionPt: 'Descricao',
                    descriptionEn: 'Description',
                    startDate: '2024-01-01',
                    endDate: null,
                    isCurrent: true,
                    highlight: true,
                    sortOrder: 1,
                    createdAt: '2024-01-01T00:00:00.000Z',
                    updatedAt: '2024-01-01T00:00:00.000Z',
                    technologies: [],
                    projects: [],
                    customers: [],
                    jobs: [],
                    links: [],
                    imageAssets: [],
                  },
                ],
                pagination: {
                  page: 1,
                  pageSize: 20,
                  totalItems: 1,
                  totalPages: 1,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
          },
        },
        {
          provide: TechnologiesService,
          useValue: {
            getTechnologies: () =>
              of({
                data: [
                  {
                    id: 'technology-1',
                    slug: 'angular',
                    name: 'Angular',
                    category: 'framework',
                    level: 'advanced',
                    frequency: 'frequent',
                    highlight: true,
                  },
                ],
                pagination: {
                  page: 1,
                  pageSize: 100,
                  totalItems: 1,
                  totalPages: 1,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
          },
        },
      ],
    }).compileComponents();
  });

  it('should render the protected admin page content and the projected logout action', () => {
    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Admin workspace');
    expect(compiled.textContent).toContain('Victor Hanszman');
    expect(compiled.textContent).toContain('12 entity workflows');
    expect(compiled.textContent).toContain('Portfolio settings');
    expect(compiled.textContent).toContain('Tags');
    expect(compiled.textContent).toContain('Links');
    expect(compiled.textContent).toContain('Image assets');
    expect(compiled.textContent).toContain('Spoken languages');
    expect(compiled.textContent).toContain('Customers');
    expect(compiled.textContent).toContain('Technology contexts');
    expect(
      compiled.querySelector('.app-section-header-actions hans-button'),
    ).toBeTruthy();
    expect(compiled.querySelectorAll('.admin-page-entity-card')).toHaveSize(6);
  });

  it('should clear the session and navigate back to the login route on logout', async () => {
    const fixture = TestBed.createComponent(AdminComponent);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.resolveTo(true);
    const adminSessionService = TestBed.inject(
      AdminSessionService,
    ) as jasmine.SpyObj<AdminSessionService>;
    const component = fixture.componentInstance as unknown as {
      logout(): Promise<void>;
    };

    await component.logout();

    expect(adminSessionService.logout).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should expose an empty admin email when the authenticated user is unavailable', () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideAppTranslations(),
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => null,
            user: () => null,
            logout: jasmine.createSpy(),
          },
        },
        {
          provide: CustomersOperationsService,
          useValue: {
            getAll: () =>
              of({
                data: [],
                pagination: {
                  page: 1,
                  pageSize: 5,
                  totalItems: 0,
                  totalPages: 0,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: PortfolioSettingsOperationsService,
          useValue: {
            getAll: () =>
              of({
                data: [],
                pagination: {
                  page: 1,
                  pageSize: 5,
                  totalItems: 0,
                  totalPages: 0,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: ImageAssetsOperationsService,
          useValue: {
            getAll: () =>
              of({
                data: [],
                pagination: {
                  page: 1,
                  pageSize: 5,
                  totalItems: 0,
                  totalPages: 0,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: SpokenLanguagesOperationsService,
          useValue: {
            getAll: () =>
              of({
                data: [],
                pagination: {
                  page: 1,
                  pageSize: 5,
                  totalItems: 0,
                  totalPages: 0,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: LinksOperationsService,
          useValue: {
            getAll: () =>
              of({
                data: [],
                pagination: {
                  page: 1,
                  pageSize: 5,
                  totalItems: 0,
                  totalPages: 0,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: TagsOperationsService,
          useValue: {
            getAll: () =>
              of({
                data: [],
                pagination: {
                  page: 1,
                  pageSize: 5,
                  totalItems: 0,
                  totalPages: 0,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
            create: jasmine.createSpy(),
            update: jasmine.createSpy(),
            delete: jasmine.createSpy(),
          },
        },
        {
          provide: ProjectsService,
          useValue: {
            getProjects: () =>
              of({
                data: [],
                pagination: {
                  page: 1,
                  pageSize: 100,
                  totalItems: 0,
                  totalPages: 0,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
          },
        },
        {
          provide: ExperiencesService,
          useValue: {
            getExperiences: () =>
              of({
                data: [],
                pagination: {
                  page: 1,
                  pageSize: 20,
                  totalItems: 0,
                  totalPages: 0,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
          },
        },
        {
          provide: TechnologiesService,
          useValue: {
            getTechnologies: () =>
              of({
                data: [],
                pagination: {
                  page: 1,
                  pageSize: 100,
                  totalItems: 0,
                  totalPages: 0,
                  hasPreviousPage: false,
                  hasNextPage: false,
                },
              }),
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      adminUserEmail(): string;
    };

    expect(component.adminUserEmail()).toBe('');
  });
});
