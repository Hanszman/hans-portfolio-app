import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LinksOperationsService } from '../../../../core/api/admin/links/links-operations.service';
import { LinkRecord } from '../../../../core/api/admin/links/links-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ExperiencesService } from '../../../../core/api/experiences/experiences.service';
import { ExperienceCollectionItemResponse } from '../../../../core/api/experiences/experiences.types';
import { ProjectsService } from '../../../../core/api/projects/projects.service';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { ToastService } from '../../../../core/toast/toast.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { LinksOperationsComponent } from './links-operations.component';

const createLink = (overrides: Partial<LinkRecord> = {}): LinkRecord => ({
  id: 'link-1',
  url: 'https://github.com/vh/portfolio',
  labelPt: 'Repositorio',
  labelEn: 'Repository',
  descriptionPt: 'Codigo fonte',
  descriptionEn: 'Source code',
  type: 'GITHUB',
  sortOrder: 1,
  isPublished: true,
  projectIds: ['project-1'],
  experienceIds: ['experience-1'],
  technologyIds: ['technology-1'],
  formationIds: ['formation-1'],
  ...overrides,
});

const createProject = (
  overrides: Partial<ProjectCollectionItemResponse> = {},
): ProjectCollectionItemResponse => ({
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
  ...overrides,
});

const createExperience = (
  overrides: Partial<ExperienceCollectionItemResponse> = {},
): ExperienceCollectionItemResponse => ({
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
  isPublished: true,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  technologies: [],
  projects: [],
  customers: [],
  jobs: [],
  links: [],
  imageAssets: [],
  ...overrides,
});

const createTechnology = (
  overrides: Partial<TechnologyCollectionItemResponse> = {},
): TechnologyCollectionItemResponse => ({
  id: 'technology-1',
  slug: 'angular',
  name: 'Angular',
  category: 'framework',
  level: 'advanced',
  frequency: 'frequent',
  highlight: true,
  ...overrides,
});

const createCollectionResponse = (data: LinkRecord[] = [createLink()], page = 1) => ({
  data,
  pagination: {
    page,
    pageSize: 5,
    totalItems: data.length,
    totalPages: data.length === 0 ? 0 : 2,
    hasPreviousPage: page > 1,
    hasNextPage: data.length > 0 && page < 2,
  },
});

describe('LinksOperationsComponent', () => {
  let fixture: ComponentFixture<LinksOperationsComponent>;
  let linksOperationsService: jasmine.SpyObj<LinksOperationsService>;
  let projectsService: jasmine.SpyObj<ProjectsService>;
  let experiencesService: jasmine.SpyObj<ExperiencesService>;
  let technologiesService: jasmine.SpyObj<TechnologiesService>;
  let toastService: jasmine.SpyObj<ToastService>;

  const settleWorkspace = async (
    currentFixture: ComponentFixture<LinksOperationsComponent>,
  ): Promise<void> => {
    currentFixture.detectChanges();
    await currentFixture.whenStable();
    currentFixture.detectChanges();
  };

  beforeAll(() => {
    for (const elementName of [
      'hans-button',
      'hans-input',
      'hans-loading',
      'hans-modal',
      'hans-toggle',
    ]) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    linksOperationsService = jasmine.createSpyObj<LinksOperationsService>(
      'LinksOperationsService',
      ['getAll', 'create', 'update', 'delete'],
    );
    projectsService = jasmine.createSpyObj<ProjectsService>('ProjectsService', ['getProjects']);
    experiencesService = jasmine.createSpyObj<ExperiencesService>('ExperiencesService', [
      'getExperiences',
    ]);
    technologiesService = jasmine.createSpyObj<TechnologiesService>('TechnologiesService', [
      'getTechnologies',
    ]);
    toastService = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);

    linksOperationsService.getAll.and.returnValue(of(createCollectionResponse()));
    linksOperationsService.create.and.returnValue(of(createLink()));
    linksOperationsService.update.and.returnValue(of(createLink()));
    linksOperationsService.delete.and.returnValue(of(void 0));
    projectsService.getProjects.and.returnValue(
      of({
        data: [createProject()],
        pagination: {
          page: 1,
          pageSize: 100,
          totalItems: 1,
          totalPages: 1,
          hasPreviousPage: false,
          hasNextPage: false,
        },
      }),
    );
    experiencesService.getExperiences.and.returnValue(
      of({
        data: [createExperience()],
        pagination: {
          page: 1,
          pageSize: 20,
          totalItems: 1,
          totalPages: 1,
          hasPreviousPage: false,
          hasNextPage: false,
        },
      }),
    );
    technologiesService.getTechnologies.and.returnValue(
      of({
        data: [createTechnology()],
        pagination: {
          page: 1,
          pageSize: 100,
          totalItems: 1,
          totalPages: 1,
          hasPreviousPage: false,
          hasNextPage: false,
        },
      }),
    );

    await TestBed.configureTestingModule({
      imports: [LinksOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: LinksOperationsService, useValue: linksOperationsService },
        { provide: ProjectsService, useValue: projectsService },
        { provide: ExperiencesService, useValue: experiencesService },
        { provide: TechnologiesService, useValue: technologiesService },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
        { provide: ToastService, useValue: toastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LinksOperationsComponent);
  });

  it('should load and render the protected links workspace', async () => {
    await settleWorkspace(fixture);

    const compiled = fixture.nativeElement as HTMLElement;

    expect(linksOperationsService.getAll).toHaveBeenCalledWith(1, 5);
    expect(projectsService.getProjects).toHaveBeenCalled();
    expect(experiencesService.getExperiences).toHaveBeenCalled();
    expect(technologiesService.getTechnologies).toHaveBeenCalled();
    expect(compiled.textContent).toContain('Links');
    expect(compiled.textContent).toContain('POST/GET/PUT/DELETE /links');
    expect(compiled.textContent).toContain('Create');
    expect(compiled.textContent).toContain('Read');
    expect(compiled.textContent).toContain('Update');
    expect(compiled.textContent).toContain('Delete');
    expect(compiled.textContent).not.toContain('https://github.com/vh/portfolio');
  });

  it('should create, update and delete a protected link from the modal workflows', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openUpdateModal(linkId: string): void;
      openDeleteModal(linkId: string): void;
      updateUrl(value: string): void;
      updateLabelPt(value: string): void;
      updateLabelEn(value: string): void;
      updateDescriptionPt(value: string): void;
      updateDescriptionEn(value: string): void;
      updateType(value: string): void;
      updateSortOrder(value: string): void;
      updatePublication(value: boolean): void;
      toggleProject(projectId: string): void;
      toggleExperience(experienceId: string): void;
      toggleTechnology(technologyId: string): void;
      toggleFormation(formationId: string): void;
      submitModal(): Promise<void>;
    };

    component.openCreateModal();
    component.updateUrl('https://example.com/demo');
    component.updateLabelPt('Demo');
    component.updateLabelEn('Demo');
    component.updateDescriptionPt('Descricao');
    component.updateDescriptionEn('Description');
    component.updateType('deploy');
    component.updateSortOrder('3');
    component.updatePublication(false);
    component.toggleProject('project-1');
    component.toggleExperience('experience-1');
    component.toggleTechnology('technology-1');
    component.toggleFormation('formation-1');
    await component.submitModal();

    expect(linksOperationsService.create).toHaveBeenCalledWith('token-123', {
      url: 'https://example.com/demo',
      labelPt: 'Demo',
      labelEn: 'Demo',
      descriptionPt: 'Descricao',
      descriptionEn: 'Description',
      type: 'DEPLOY',
      sortOrder: 3,
      isPublished: false,
      projectIds: ['project-1'],
      experienceIds: ['experience-1'],
      technologyIds: ['technology-1'],
      formationIds: ['formation-1'],
    });

    component.openUpdateModal('link-1');
    component.updateLabelPt('Repositorio atualizado');
    await component.submitModal();

    expect(linksOperationsService.update).toHaveBeenCalledWith('token-123', 'link-1', {
      url: 'https://github.com/vh/portfolio',
      labelPt: 'Repositorio atualizado',
      labelEn: 'Repository',
      descriptionPt: 'Codigo fonte',
      descriptionEn: 'Source code',
      type: 'GITHUB',
      sortOrder: 1,
      isPublished: true,
      projectIds: ['project-1'],
      experienceIds: ['experience-1'],
      technologyIds: ['technology-1'],
      formationIds: ['formation-1'],
    });

    component.openDeleteModal('link-1');
    await component.submitModal();

    expect(linksOperationsService.delete).toHaveBeenCalledWith('token-123', 'link-1');
  });

  it('should expose the modal titles for every workflow and open the read modal', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openReadModal(): void;
      openUpdatePickerModal(): void;
      openDeletePickerModal(): void;
      openUpdateModal(linkId: string): void;
      openDeleteModal(linkId: string): void;
      closeModal(): void;
      modalTitleKey(): string;
      modalMode(): string | null;
    };

    component.openCreateModal();
    expect(component.modalTitleKey()).toBe('pages.admin.links.modal.create.title');

    component.openReadModal();
    fixture.detectChanges();
    expect(component.modalTitleKey()).toBe('pages.admin.links.modal.read.title');
    expect(fixture.nativeElement.textContent).toContain('https://github.com/vh/portfolio');
    expect(fixture.nativeElement.textContent).toContain('Portfolio remake');
    expect(fixture.nativeElement.textContent).toContain('Analista');
    expect(fixture.nativeElement.textContent).toContain('Angular');

    component.openUpdatePickerModal();
    expect(component.modalTitleKey()).toBe('pages.admin.links.modal.pickUpdate.title');

    component.openDeletePickerModal();
    expect(component.modalTitleKey()).toBe('pages.admin.links.modal.pickDelete.title');

    component.openUpdateModal('link-1');
    expect(component.modalTitleKey()).toBe('pages.admin.links.modal.update.title');

    component.openDeleteModal('link-1');
    expect(component.modalTitleKey()).toBe('pages.admin.links.modal.delete.title');

    component.closeModal();
    component.openUpdateModal('missing-link');
    expect(component.modalMode()).toBeNull();

    component.openDeleteModal('missing-link');
    expect(component.modalMode()).toBeNull();
  });

  it('should support paging and relation deselection inside the modal workflows', async () => {
    linksOperationsService.getAll.and.returnValues(
      of(createCollectionResponse()),
      of(createCollectionResponse([createLink({ id: 'link-2', url: 'https://zeta.dev' })], 2)),
    );

    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      goToPage(page: number): Promise<void>;
      openCreateModal(): void;
      toggleProject(projectId: string): void;
      toggleExperience(experienceId: string): void;
      toggleTechnology(technologyId: string): void;
      toggleFormation(formationId: string): void;
      form(): {
        projectIds: readonly string[];
        experienceIds: readonly string[];
        technologyIds: readonly string[];
        formationIds: readonly string[];
      };
    };

    await component.goToPage(2);
    await component.goToPage(2);
    await component.goToPage(99);

    expect(linksOperationsService.getAll).toHaveBeenCalledTimes(2);
    expect(linksOperationsService.getAll).toHaveBeenCalledWith(2, 5);

    component.openCreateModal();
    component.toggleProject('project-1');
    component.toggleProject('project-1');
    component.toggleExperience('experience-1');
    component.toggleExperience('experience-1');
    component.toggleTechnology('technology-1');
    component.toggleTechnology('technology-1');
    component.toggleFormation('formation-1');
    component.toggleFormation('formation-1');

    expect(component.form().projectIds).toEqual([]);
    expect(component.form().experienceIds).toEqual([]);
    expect(component.form().technologyIds).toEqual([]);
    expect(component.form().formationIds).toEqual([]);
  });

  it('should validate modal input and block unavailable sessions', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      updateUrl(value: string): void;
      updateType(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    component.openCreateModal();
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.links.feedback.requiredUrl');

    component.updateUrl('https://github.com/vh/portfolio');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.links.feedback.requiredType');

    component.updateType('GITHUB');
    component.updateSortOrder('abc');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.links.feedback.invalidSortOrder');

    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [LinksOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: LinksOperationsService, useValue: linksOperationsService },
        { provide: ProjectsService, useValue: projectsService },
        { provide: ExperiencesService, useValue: experiencesService },
        { provide: TechnologiesService, useValue: technologiesService },
        { provide: ToastService, useValue: toastService },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => null,
          },
        },
      ],
    }).compileComponents();

    const missingSessionFixture = TestBed.createComponent(LinksOperationsComponent);
    await settleWorkspace(missingSessionFixture);

    const missingSessionComponent = missingSessionFixture.componentInstance as unknown as {
      openCreateModal(): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    missingSessionComponent.openCreateModal();
    await missingSessionComponent.submitModal();

    expect(missingSessionComponent.modalFeedbackKey()).toBe(
      'pages.admin.links.feedback.missingSession',
    );
  });

  it('should expose modal feedback for selection, save and delete failures', async () => {
    await settleWorkspace(fixture);

    linksOperationsService.create.and.returnValue(
      throwError(() => new Error('Unable to create link')),
    );
    linksOperationsService.update.and.returnValue(
      throwError(() => new Error('Unable to update link')),
    );
    linksOperationsService.delete.and.returnValue(
      throwError(() => new Error('Unable to delete link')),
    );

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openDeleteModal(linkId: string): void;
      updateUrl(value: string): void;
      updateType(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
      modalModeSignal: { set(value: string): void };
    };

    component.modalModeSignal.set('update');
    component.updateUrl('https://github.com/vh/portfolio');
    component.updateType('GITHUB');
    component.updateSortOrder('1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.links.feedback.selectionRequired');

    component.modalModeSignal.set('delete');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.links.feedback.selectionRequired');

    component.openCreateModal();
    component.updateUrl('https://example.com');
    component.updateType('DEPLOY');
    component.updateSortOrder('2');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.links.feedback.saveError');

    component.openDeleteModal('link-1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.links.feedback.deleteError');
  });

  it('should expose trackBy and move deletion reload to the previous page when removing the last item', async () => {
    TestBed.resetTestingModule();
    linksOperationsService.getAll.and.returnValues(
      of(createCollectionResponse([createLink()], 2)),
      of(createCollectionResponse([], 1)),
    );

    await TestBed.configureTestingModule({
      imports: [LinksOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: LinksOperationsService, useValue: linksOperationsService },
        { provide: ProjectsService, useValue: projectsService },
        { provide: ExperiencesService, useValue: experiencesService },
        { provide: TechnologiesService, useValue: technologiesService },
        { provide: ToastService, useValue: toastService },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    const pagedFixture = TestBed.createComponent(LinksOperationsComponent);
    await settleWorkspace(pagedFixture);

    const pagedComponent = pagedFixture.componentInstance as unknown as {
      openDeleteModal(linkId: string): void;
      submitModal(): Promise<void>;
      trackById(index: number, item: { id: string }): string;
    };

    expect(pagedComponent.trackById(0, { id: 'link-1' })).toBe('link-1');

    pagedComponent.openDeleteModal('link-1');
    await pagedComponent.submitModal();

    expect(linksOperationsService.getAll).toHaveBeenCalledWith(1, 5);
  });

  it('should render empty and load error states and keep read disabled without links', async () => {
    TestBed.resetTestingModule();
    linksOperationsService.getAll.and.returnValue(of(createCollectionResponse([])));

    await TestBed.configureTestingModule({
      imports: [LinksOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: LinksOperationsService, useValue: linksOperationsService },
        { provide: ProjectsService, useValue: projectsService },
        { provide: ExperiencesService, useValue: experiencesService },
        { provide: TechnologiesService, useValue: technologiesService },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    const emptyFixture = TestBed.createComponent(LinksOperationsComponent);
    await settleWorkspace(emptyFixture);

    const emptyComponent = emptyFixture.componentInstance as unknown as {
      openReadModal(): void;
      modalMode(): string | null;
      hasLinks(): boolean;
      loadErrorKey(): string | null;
    };

    expect(emptyComponent.hasLinks()).toBeFalse();
    expect(emptyComponent.loadErrorKey()).toBeNull();

    emptyComponent.openReadModal();
    expect(emptyComponent.modalMode()).toBeNull();

    TestBed.resetTestingModule();
    linksOperationsService.getAll.and.returnValue(
      throwError(() => new Error('Unable to load links')),
    );

    await TestBed.configureTestingModule({
      imports: [LinksOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: LinksOperationsService, useValue: linksOperationsService },
        { provide: ProjectsService, useValue: projectsService },
        { provide: ExperiencesService, useValue: experiencesService },
        { provide: TechnologiesService, useValue: technologiesService },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    const errorFixture = TestBed.createComponent(LinksOperationsComponent);
    await settleWorkspace(errorFixture);

    const errorComponent = errorFixture.componentInstance as unknown as {
      loadErrorKey(): string | null;
    };

    expect(errorComponent.loadErrorKey()).toBe('pages.admin.links.feedback.loadError');
  });

  it('should ignore submit requests when no modal workflow is active', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      submitModal(): Promise<void>;
    };

    await component.submitModal();

    expect(linksOperationsService.create).not.toHaveBeenCalled();
    expect(linksOperationsService.update).not.toHaveBeenCalled();
    expect(linksOperationsService.delete).not.toHaveBeenCalled();
  });
});
