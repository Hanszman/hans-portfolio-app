import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { PortfolioSettingsOperationsService } from '../../core/api/admin/portfolio-settings/portfolio-settings-operations.service';
import { TagsOperationsService } from '../../core/api/admin/tags/tags-operations.service';
import { AdminSessionService } from '../../core/admin-session/admin-session.service';
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
                  pageSize: 6,
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
                  pageSize: 6,
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
                    isPublished: true,
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

  it('should render the protected admin page with app chrome and the projected logout action', () => {
    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-header')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
    expect(compiled.textContent).toContain('Admin workspace');
    expect(compiled.textContent).toContain('Victor Hanszman');
    expect(compiled.textContent).toContain('12 entity workflows');
    expect(compiled.textContent).toContain('Portfolio settings');
    expect(compiled.textContent).toContain('Tags');
    expect(compiled.textContent).toContain('Technology contexts');
    expect(
      compiled.querySelector('.app-section-header-actions hans-button'),
    ).toBeTruthy();
    expect(compiled.querySelectorAll('.admin-page-entity-card')).toHaveSize(10);
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
          provide: PortfolioSettingsOperationsService,
          useValue: {
            getAll: () =>
              of({
                data: [],
                pagination: {
                  page: 1,
                  pageSize: 6,
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
                  pageSize: 6,
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
