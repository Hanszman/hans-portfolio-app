import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TagsOperationsService } from '../../../../core/api/admin/tags/tags-operations.service';
import { TagRecord } from '../../../../core/api/admin/tags/tags-api.types';
import { ProjectsService } from '../../../../core/api/projects/projects.service';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { TagsOperationsComponent } from './tags-operations.component';

const createTag = (overrides: Partial<TagRecord> = {}): TagRecord => ({
  id: 'tag-1',
  slug: 'frontend',
  namePt: 'Front-end',
  nameEn: 'Front-end',
  type: 'STACK',
  sortOrder: 1,
  projectIds: ['project-1'],
  technologyIds: ['technology-1'],
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

const createCollectionResponse = (
  data: TagRecord[] = [createTag()],
  page = 1,
) => ({
  data,
  pagination: {
    page,
    pageSize: 6,
    totalItems: data.length,
    totalPages: data.length === 0 ? 0 : 2,
    hasPreviousPage: page > 1,
    hasNextPage: data.length > 0 && page < 2,
  },
});

describe('TagsOperationsComponent', () => {
  let fixture: ComponentFixture<TagsOperationsComponent>;
  let tagsOperationsService: jasmine.SpyObj<TagsOperationsService>;
  let projectsService: jasmine.SpyObj<ProjectsService>;
  let technologiesService: jasmine.SpyObj<TechnologiesService>;

  const settleWorkspace = async (
    currentFixture: ComponentFixture<TagsOperationsComponent>,
  ): Promise<void> => {
    currentFixture.detectChanges();
    await currentFixture.whenStable();
    currentFixture.detectChanges();
  };

  beforeAll(() => {
    for (const elementName of [
      'hans-button',
      'hans-icon',
      'hans-input',
      'hans-loading',
      'hans-modal',
      'hans-select-option',
    ]) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    tagsOperationsService = jasmine.createSpyObj<TagsOperationsService>(
      'TagsOperationsService',
      ['getAll', 'create', 'update', 'delete'],
    );
    projectsService = jasmine.createSpyObj<ProjectsService>('ProjectsService', [
      'getProjects',
    ]);
    technologiesService = jasmine.createSpyObj<TechnologiesService>(
      'TechnologiesService',
      ['getTechnologies'],
    );

    tagsOperationsService.getAll.and.returnValue(of(createCollectionResponse()));
    tagsOperationsService.create.and.returnValue(of(createTag()));
    tagsOperationsService.update.and.returnValue(of(createTag()));
    tagsOperationsService.delete.and.returnValue(of(void 0));
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
      imports: [TagsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: TagsOperationsService,
          useValue: tagsOperationsService,
        },
        {
          provide: ProjectsService,
          useValue: projectsService,
        },
        {
          provide: TechnologiesService,
          useValue: technologiesService,
        },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsOperationsComponent);
  });

  it('should load and render the protected tags workspace', async () => {
    await settleWorkspace(fixture);

    const compiled = fixture.nativeElement as HTMLElement;

    expect(tagsOperationsService.getAll).toHaveBeenCalledWith(1, 6);
    expect(projectsService.getProjects).toHaveBeenCalled();
    expect(technologiesService.getTechnologies).toHaveBeenCalled();
    expect(compiled.textContent).toContain('Tags');
    expect(compiled.textContent).toContain('GET/POST/PATCH/DELETE /tags');
    expect(compiled.textContent).toContain('Create');
    expect(compiled.textContent).toContain('Read');
    expect(compiled.textContent).toContain('Update');
    expect(compiled.textContent).toContain('Delete');
    expect(compiled.textContent).not.toContain('frontend');
  });

  it('should create, update and delete a protected tag from the modal workflows', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openUpdateModal(tagId: string): void;
      openDeleteModal(tagId: string): void;
      updateSlug(value: string): void;
      updateNamePt(value: string): void;
      updateNameEn(value: string): void;
      updateType(value: string): void;
      updateSortOrder(value: string): void;
      toggleProject(projectId: string): void;
      toggleTechnology(technologyId: string): void;
      submitModal(): Promise<void>;
    };

    component.openCreateModal();
    component.updateSlug('backend');
    component.updateNamePt('Back-end');
    component.updateNameEn('Back-end');
    component.updateType('STACK');
    component.updateSortOrder('3');
    component.toggleProject('project-1');
    component.toggleTechnology('technology-1');
    await component.submitModal();

    expect(tagsOperationsService.create).toHaveBeenCalledWith('token-123', {
      slug: 'backend',
      namePt: 'Back-end',
      nameEn: 'Back-end',
      type: 'STACK',
      sortOrder: 3,
      projectIds: ['project-1'],
      technologyIds: ['technology-1'],
    });

    component.openUpdateModal('tag-1');
    component.updateNamePt('Front-end atualizado');
    await component.submitModal();

    expect(tagsOperationsService.update).toHaveBeenCalledWith('token-123', 'tag-1', {
      slug: 'frontend',
      namePt: 'Front-end atualizado',
      nameEn: 'Front-end',
      type: 'STACK',
      sortOrder: 1,
      projectIds: ['project-1'],
      technologyIds: ['technology-1'],
    });

    component.openDeleteModal('tag-1');
    await component.submitModal();
    expect(tagsOperationsService.delete).toHaveBeenCalledWith('token-123', 'tag-1');
  });

  it('should expose the modal titles for every workflow and open the read modal', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openReadModal(): void;
      openUpdatePickerModal(): void;
      openDeletePickerModal(): void;
      openUpdateModal(tagId: string): void;
      openDeleteModal(tagId: string): void;
      closeModal(): void;
      modalTitleKey(): string;
      modalMode(): string | null;
    };

    component.openCreateModal();
    expect(component.modalTitleKey()).toBe('pages.admin.tags.modal.create.title');

    component.openReadModal();
    fixture.detectChanges();
    expect(component.modalTitleKey()).toBe('pages.admin.tags.modal.read.title');
    expect(fixture.nativeElement.textContent).toContain('frontend');
    expect(fixture.nativeElement.textContent).toContain('Portfolio remake');
    expect(fixture.nativeElement.textContent).toContain('Angular');

    component.openUpdatePickerModal();
    expect(component.modalTitleKey()).toBe('pages.admin.tags.modal.pickUpdate.title');

    component.openDeletePickerModal();
    expect(component.modalTitleKey()).toBe('pages.admin.tags.modal.pickDelete.title');

    component.openUpdateModal('tag-1');
    expect(component.modalTitleKey()).toBe('pages.admin.tags.modal.update.title');

    component.openDeleteModal('tag-1');
    expect(component.modalTitleKey()).toBe('pages.admin.tags.modal.delete.title');

    component.closeModal();
    component.openUpdateModal('missing-tag');
    expect(component.modalMode()).toBeNull();

    component.openDeleteModal('missing-tag');
    expect(component.modalMode()).toBeNull();
  });

  it('should support paging and relation deselection inside the modal workflows', async () => {
    tagsOperationsService.getAll.and.returnValues(
      of(createCollectionResponse()),
      of(createCollectionResponse([createTag({ id: 'tag-2', slug: 'zeta' })], 2)),
    );

    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      goToPage(page: number): Promise<void>;
      openCreateModal(): void;
      toggleProject(projectId: string): void;
      toggleTechnology(technologyId: string): void;
      form(): {
        projectIds: readonly string[];
        technologyIds: readonly string[];
      };
    };

    await component.goToPage(2);
    await component.goToPage(2);
    await component.goToPage(99);

    expect(tagsOperationsService.getAll).toHaveBeenCalledTimes(2);
    expect(tagsOperationsService.getAll).toHaveBeenCalledWith(2, 6);

    component.openCreateModal();
    component.toggleProject('project-1');
    component.toggleProject('project-1');
    component.toggleTechnology('technology-1');
    component.toggleTechnology('technology-1');

    expect(component.form().projectIds).toEqual([]);
    expect(component.form().technologyIds).toEqual([]);
  });

  it('should validate modal input and block unavailable sessions', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      updateSlug(value: string): void;
      updateNamePt(value: string): void;
      updateNameEn(value: string): void;
      updateType(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    component.openCreateModal();
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.tags.feedback.requiredSlug');

    component.updateSlug('frontend');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.tags.feedback.requiredNamePt');

    component.updateNamePt('Front-end');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.tags.feedback.requiredNameEn');

    component.updateNameEn('Front-end');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.tags.feedback.requiredType');

    component.updateType('INVALID');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.tags.feedback.invalidType');

    component.updateType('STACK');
    component.updateSortOrder('abc');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.tags.feedback.invalidSortOrder',
    );

    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [TagsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: TagsOperationsService, useValue: tagsOperationsService },
        { provide: ProjectsService, useValue: projectsService },
        { provide: TechnologiesService, useValue: technologiesService },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => null,
          },
        },
      ],
    }).compileComponents();

    const missingSessionFixture = TestBed.createComponent(TagsOperationsComponent);
    await settleWorkspace(missingSessionFixture);

    const missingSessionComponent = missingSessionFixture.componentInstance as unknown as {
      openCreateModal(): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    missingSessionComponent.openCreateModal();
    await missingSessionComponent.submitModal();

    expect(missingSessionComponent.modalFeedbackKey()).toBe(
      'pages.admin.tags.feedback.missingSession',
    );
  });

  it('should expose modal feedback for selection, save and delete failures', async () => {
    await settleWorkspace(fixture);

    tagsOperationsService.create.and.returnValue(
      throwError(() => new Error('Unable to create tag')),
    );
    tagsOperationsService.update.and.returnValue(
      throwError(() => new Error('Unable to update tag')),
    );
    tagsOperationsService.delete.and.returnValue(
      throwError(() => new Error('Unable to delete tag')),
    );

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openDeleteModal(tagId: string): void;
      updateSlug(value: string): void;
      updateNamePt(value: string): void;
      updateNameEn(value: string): void;
      updateType(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
      modalModeSignal: { set(value: string): void };
    };

    component.modalModeSignal.set('update');
    component.updateSlug('frontend');
    component.updateNamePt('Front-end');
    component.updateNameEn('Front-end');
    component.updateType('STACK');
    component.updateSortOrder('1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.tags.feedback.selectionRequired',
    );

    component.modalModeSignal.set('delete');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.tags.feedback.selectionRequired',
    );

    component.openCreateModal();
    component.updateSlug('backend');
    component.updateNamePt('Back-end');
    component.updateNameEn('Back-end');
    component.updateType('STACK');
    component.updateSortOrder('2');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.tags.feedback.saveError');

    component.openDeleteModal('tag-1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.tags.feedback.deleteError');
  });

  it('should expose trackBy and move deletion reload to the previous page when removing the last item', async () => {
    TestBed.resetTestingModule();
    tagsOperationsService.getAll.and.returnValues(
      of(createCollectionResponse([createTag()], 2)),
      of(createCollectionResponse([], 1)),
    );

    await TestBed.configureTestingModule({
      imports: [TagsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: TagsOperationsService, useValue: tagsOperationsService },
        { provide: ProjectsService, useValue: projectsService },
        { provide: TechnologiesService, useValue: technologiesService },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    const pagedFixture = TestBed.createComponent(TagsOperationsComponent);
    await settleWorkspace(pagedFixture);

    const pagedComponent = pagedFixture.componentInstance as unknown as {
      openDeleteModal(tagId: string): void;
      submitModal(): Promise<void>;
      trackById(index: number, item: { id: string }): string;
    };

    expect(pagedComponent.trackById(0, { id: 'tag-1' })).toBe('tag-1');

    pagedComponent.openDeleteModal('tag-1');
    await pagedComponent.submitModal();

    expect(tagsOperationsService.getAll).toHaveBeenCalledWith(1, 6);
  });

  it('should render empty and load error states and keep read disabled without tags', async () => {
    TestBed.resetTestingModule();
    tagsOperationsService.getAll.and.returnValue(of(createCollectionResponse([])));

    await TestBed.configureTestingModule({
      imports: [TagsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: TagsOperationsService, useValue: tagsOperationsService },
        { provide: ProjectsService, useValue: projectsService },
        { provide: TechnologiesService, useValue: technologiesService },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    const emptyFixture = TestBed.createComponent(TagsOperationsComponent);
    await settleWorkspace(emptyFixture);

    const emptyComponent = emptyFixture.componentInstance as unknown as {
      openReadModal(): void;
      modalMode(): string | null;
      hasTags(): boolean;
      loadErrorKey(): string | null;
    };

    expect(emptyComponent.hasTags()).toBeFalse();
    expect(emptyComponent.loadErrorKey()).toBeNull();

    emptyComponent.openReadModal();
    expect(emptyComponent.modalMode()).toBeNull();

    TestBed.resetTestingModule();
    tagsOperationsService.getAll.and.returnValue(
      throwError(() => new Error('Unable to load tags')),
    );

    await TestBed.configureTestingModule({
      imports: [TagsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: TagsOperationsService, useValue: tagsOperationsService },
        { provide: ProjectsService, useValue: projectsService },
        { provide: TechnologiesService, useValue: technologiesService },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    const errorFixture = TestBed.createComponent(TagsOperationsComponent);
    await settleWorkspace(errorFixture);

    const errorComponent = errorFixture.componentInstance as unknown as {
      loadErrorKey(): string | null;
    };

    expect(errorComponent.loadErrorKey()).toBe('pages.admin.tags.feedback.loadError');
  });

  it('should ignore submit requests when no modal workflow is active', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      submitModal(): Promise<void>;
    };

    await component.submitModal();

    expect(tagsOperationsService.create).not.toHaveBeenCalled();
    expect(tagsOperationsService.update).not.toHaveBeenCalled();
    expect(tagsOperationsService.delete).not.toHaveBeenCalled();
  });
});
