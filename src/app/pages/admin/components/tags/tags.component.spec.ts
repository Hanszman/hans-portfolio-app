import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TagsApiService } from '../../../../core/api/admin/tags/tags-api.service';
import { TagRecord } from '../../../../core/api/admin/tags/tags-api.types';
import { ProjectsService } from '../../../../core/api/projects/projects.service';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { TagsComponent } from './tags.component';

const createTag = (overrides: Partial<TagRecord> = {}): TagRecord => ({
  id: 'tag-1',
  slug: 'frontend',
  namePt: 'Front-end',
  nameEn: 'Front-end',
  type: 'stack',
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

const createCollectionResponse = (data: TagRecord[] = [createTag()]) => ({
  data,
  pagination: {
    page: 1,
    pageSize: 100,
    totalItems: data.length,
    totalPages: data.length === 0 ? 0 : 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
});

describe('TagsComponent', () => {
  let fixture: ComponentFixture<TagsComponent>;
  let tagsApiService: jasmine.SpyObj<TagsApiService>;
  let projectsService: jasmine.SpyObj<ProjectsService>;
  let technologiesService: jasmine.SpyObj<TechnologiesService>;

  const settleWorkspace = async (
    currentFixture: ComponentFixture<TagsComponent>,
  ): Promise<void> => {
    currentFixture.detectChanges();
    await (
      currentFixture.componentInstance as unknown as {
        loadWorkspace(): Promise<void>;
      }
    ).loadWorkspace();
    currentFixture.detectChanges();
  };

  beforeAll(() => {
    for (const elementName of [
      'hans-button',
      'hans-icon',
      'hans-input',
      'hans-loading',
      'hans-modal',
    ]) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    tagsApiService = jasmine.createSpyObj<TagsApiService>('TagsApiService', [
      'getAll',
      'create',
      'update',
      'delete',
    ]);
    projectsService = jasmine.createSpyObj<ProjectsService>('ProjectsService', [
      'getProjects',
    ]);
    technologiesService = jasmine.createSpyObj<TechnologiesService>(
      'TechnologiesService',
      ['getTechnologies'],
    );

    tagsApiService.getAll.and.returnValue(of(createCollectionResponse()));
    tagsApiService.create.and.returnValue(of(createTag()));
    tagsApiService.update.and.returnValue(of(createTag()));
    tagsApiService.delete.and.returnValue(of(void 0));
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
      imports: [TagsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: TagsApiService,
          useValue: tagsApiService,
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

    fixture = TestBed.createComponent(TagsComponent);
  });

  it('should load and render the protected tags workspace', async () => {
    await settleWorkspace(fixture);

    const compiled = fixture.nativeElement as HTMLElement;

    expect(tagsApiService.getAll).toHaveBeenCalled();
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

  it('should create a protected tag from the modal form', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
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
    component.updateType('stack');
    component.updateSortOrder('3');
    component.toggleProject('project-1');
    component.toggleTechnology('technology-1');

    await component.submitModal();
    fixture.detectChanges();

    expect(tagsApiService.create).toHaveBeenCalledWith('token-123', {
      slug: 'backend',
      namePt: 'Back-end',
      nameEn: 'Back-end',
      type: 'stack',
      sortOrder: 3,
      projectIds: ['project-1'],
      technologyIds: ['technology-1'],
    });
    expect(fixture.nativeElement.textContent).toContain(
      'Protected tag created successfully.',
    );
  });

  it('should update a selected protected tag', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openUpdateModal(tagId: string): void;
      updateNamePt(value: string): void;
      submitModal(): Promise<void>;
    };

    component.openUpdateModal('tag-1');
    component.updateNamePt('Front-end atualizado');

    await component.submitModal();

    expect(tagsApiService.update).toHaveBeenCalledWith('token-123', 'tag-1', {
      slug: 'frontend',
      namePt: 'Front-end atualizado',
      nameEn: 'Front-end',
      type: 'stack',
      sortOrder: 1,
      projectIds: ['project-1'],
      technologyIds: ['technology-1'],
    });
  });

  it('should delete a selected protected tag', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openDeleteModal(tagId: string): void;
      submitModal(): Promise<void>;
    };

    component.openDeleteModal('tag-1');
    await component.submitModal();

    expect(tagsApiService.delete).toHaveBeenCalledWith('token-123', 'tag-1');
  });

  it('should open the picker workflows and expose the expected modal titles', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openUpdatePickerModal(): void;
      openDeletePickerModal(): void;
      openUpdateModal(tagId: string): void;
      openDeleteModal(tagId: string): void;
      closeModal(): void;
      modalTitleKey(): string;
      modalMode(): string | null;
    };

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

  it('should require the mandatory fields before saving', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      updateSlug(value: string): void;
      updateNamePt(value: string): void;
      updateNameEn(value: string): void;
      updateType(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
    };

    component.openCreateModal();
    await component.submitModal();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'The tag slug is required before submitting.',
    );

    component.updateSlug('frontend');
    await component.submitModal();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'The Portuguese tag name is required before submitting.',
    );

    component.updateNamePt('Front-end');
    await component.submitModal();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'The English tag name is required before submitting.',
    );

    component.updateNameEn('Front-end');
    await component.submitModal();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'The tag type is required before submitting.',
    );

    component.updateType('stack');
    component.updateSortOrder('abc');
    await component.submitModal();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'The sort order must be a valid integer number.',
    );
    expect(tagsApiService.create).not.toHaveBeenCalled();
  });

  it('should ignore submit requests when no modal workflow is active', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      submitModal(): Promise<void>;
    };

    await component.submitModal();

    expect(tagsApiService.create).not.toHaveBeenCalled();
    expect(tagsApiService.update).not.toHaveBeenCalled();
    expect(tagsApiService.delete).not.toHaveBeenCalled();
  });

  it('should render the empty state when no protected tags are registered yet', async () => {
    TestBed.resetTestingModule();
    tagsApiService.getAll.and.returnValue(of(createCollectionResponse([])));

    await TestBed.configureTestingModule({
      imports: [TagsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: TagsApiService, useValue: tagsApiService },
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

    const emptyFixture = TestBed.createComponent(TagsComponent);
    await settleWorkspace(emptyFixture);

    expect(emptyFixture.nativeElement.textContent).toContain(
      'No protected tag has been registered yet.',
    );
  });

  it('should block submit when the authenticated admin session is unavailable', async () => {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [TagsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: TagsApiService, useValue: tagsApiService },
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

    const missingSessionFixture = TestBed.createComponent(TagsComponent);
    await settleWorkspace(missingSessionFixture);

    const component = missingSessionFixture.componentInstance as unknown as {
      openCreateModal(): void;
      submitModal(): Promise<void>;
    };

    component.openCreateModal();
    await component.submitModal();
    missingSessionFixture.detectChanges();

    expect(missingSessionFixture.nativeElement.textContent).toContain(
      'The authenticated admin session is unavailable. Log in again to continue.',
    );
  });

  it('should render the load error state when one of the workspace requests fails', async () => {
    tagsApiService.getAll.and.returnValue(
      throwError(() => new Error('Unable to load tags')),
    );

    await settleWorkspace(fixture);

    expect(fixture.nativeElement.textContent).toContain(
      'The protected tags collection could not be loaded right now.',
    );
  });

  it('should expose the selection-required feedback when update or delete flows have no selected tag', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      updateSlug(value: string): void;
      updateNamePt(value: string): void;
      updateNameEn(value: string): void;
      updateType(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      feedbackKey(): string | null;
      modalModeSignal: { set(value: string): void };
    };

    component.modalModeSignal.set('update');
    component.updateSlug('frontend');
    component.updateNamePt('Front-end');
    component.updateNameEn('Front-end');
    component.updateType('stack');
    component.updateSortOrder('1');

    await component.submitModal();

    expect(component.feedbackKey()).toBe(
      'pages.admin.tags.feedback.selectionRequired',
    );

    component.modalModeSignal.set('delete');
    await component.submitModal();

    expect(component.feedbackKey()).toBe(
      'pages.admin.tags.feedback.selectionRequired',
    );
  });

  it('should expose the save error feedback when create or update requests fail', async () => {
    await settleWorkspace(fixture);

    tagsApiService.create.and.returnValue(
      throwError(() => new Error('Unable to create tag')),
    );
    tagsApiService.update.and.returnValue(
      throwError(() => new Error('Unable to update tag')),
    );

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openUpdateModal(tagId: string): void;
      updateSlug(value: string): void;
      updateNamePt(value: string): void;
      updateNameEn(value: string): void;
      updateType(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      feedbackKey(): string | null;
    };

    component.openCreateModal();
    component.updateSlug('backend');
    component.updateNamePt('Back-end');
    component.updateNameEn('Back-end');
    component.updateType('stack');
    component.updateSortOrder('2');
    await component.submitModal();

    expect(component.feedbackKey()).toBe('pages.admin.tags.feedback.saveError');

    component.openUpdateModal('tag-1');
    await component.submitModal();

    expect(component.feedbackKey()).toBe('pages.admin.tags.feedback.saveError');
  });

  it('should expose the delete error feedback when the delete request fails', async () => {
    await settleWorkspace(fixture);

    tagsApiService.delete.and.returnValue(
      throwError(() => new Error('Unable to delete tag')),
    );

    const component = fixture.componentInstance as unknown as {
      openDeleteModal(tagId: string): void;
      submitModal(): Promise<void>;
      feedbackKey(): string | null;
    };

    component.openDeleteModal('tag-1');
    await component.submitModal();

    expect(component.feedbackKey()).toBe('pages.admin.tags.feedback.deleteError');
  });

  it('should toggle the read view only when protected tags exist', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      toggleReadVisibility(): void;
      isReadVisible(): boolean;
    };

    expect(fixture.nativeElement.textContent).not.toContain('frontend');

    component.toggleReadVisibility();
    fixture.detectChanges();

    expect(component.isReadVisible()).toBeTrue();
    expect(fixture.nativeElement.textContent).toContain('frontend');
    expect(fixture.nativeElement.textContent).toContain('Portfolio remake');
    expect(fixture.nativeElement.textContent).toContain('Angular');

    component.toggleReadVisibility();
    fixture.detectChanges();

    expect(component.isReadVisible()).toBeFalse();
    expect(fixture.nativeElement.textContent).not.toContain('frontend');
  });

  it('should keep the read view disabled when there are no tags to display and allow relation toggles to deselect items', async () => {
    TestBed.resetTestingModule();
    tagsApiService.getAll.and.returnValue(of(createCollectionResponse([])));

    await TestBed.configureTestingModule({
      imports: [TagsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: TagsApiService, useValue: tagsApiService },
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

    const emptyFixture = TestBed.createComponent(TagsComponent);
    await settleWorkspace(emptyFixture);

    const component = emptyFixture.componentInstance as unknown as {
      toggleReadVisibility(): void;
      isReadVisible(): boolean;
      openCreateModal(): void;
      toggleProject(projectId: string): void;
      toggleTechnology(technologyId: string): void;
      form(): {
        projectIds: readonly string[];
        technologyIds: readonly string[];
      };
    };

    component.toggleReadVisibility();
    expect(component.isReadVisible()).toBeFalse();

    component.openCreateModal();
    component.toggleProject('project-1');
    component.toggleProject('project-1');
    component.toggleTechnology('technology-1');
    component.toggleTechnology('technology-1');

    expect(component.form().projectIds).toEqual([]);
    expect(component.form().technologyIds).toEqual([]);
  });
});
