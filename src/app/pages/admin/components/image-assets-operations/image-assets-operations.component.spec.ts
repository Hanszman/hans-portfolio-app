import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ImageAssetsOperationsService } from '../../../../core/api/admin/image-assets/image-assets-operations.service';
import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ExperiencesService } from '../../../../core/api/experiences/experiences.service';
import { ExperienceCollectionItemResponse } from '../../../../core/api/experiences/experiences.types';
import { ProjectsService } from '../../../../core/api/projects/projects.service';
import { ProjectCollectionItemResponse } from '../../../../core/api/projects/projects.types';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import { TechnologyCollectionItemResponse } from '../../../../core/api/technologies/technologies.types';
import { ToastService } from '../../../../core/toast/toast.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { createAdminEntityEndpointLabel } from '../../admin.types';
import { ImageAssetsOperationsComponent } from './image-assets-operations.component';

const createImageAsset = (overrides: Partial<ImageAssetRecord> = {}): ImageAssetRecord => ({
  id: 'image-asset-1',
  fileName: 'vh_logo_blue.svg',
  filePath: '/assets/img/logo/vh_logo_blue.svg',
  folder: 'logo',
  kind: 'ICON',
  altPt: 'Logo azul da Hans',
  altEn: 'Hans blue logo',
  captionPt: 'Versao azul da marca.',
  captionEn: 'Blue brand version.',
  mimeType: 'image/svg+xml',
  width: 240,
  height: 96,
  sortOrder: 1,
  isPublished: true,
  projectIds: ['project-1'],
  experienceIds: ['experience-1'],
  technologyIds: ['technology-1'],
  formationIds: [],
  spokenLanguageIds: [],
  customerIds: [],
  jobIds: [],
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

const createCollectionResponse = (
  data: ImageAssetRecord[] = [createImageAsset()],
  page = 1,
) => ({
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

describe('ImageAssetsOperationsComponent', () => {
  let fixture: ComponentFixture<ImageAssetsOperationsComponent>;
  let imageAssetsOperationsService: jasmine.SpyObj<ImageAssetsOperationsService>;
  let projectsService: jasmine.SpyObj<ProjectsService>;
  let experiencesService: jasmine.SpyObj<ExperiencesService>;
  let technologiesService: jasmine.SpyObj<TechnologiesService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let adminSessionServiceMock: {
    accessToken: jasmine.Spy<() => string | null>;
  };

  const settleWorkspace = async (
    currentFixture: ComponentFixture<ImageAssetsOperationsComponent>,
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
      'hans-select-option',
      'hans-toggle',
    ]) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    imageAssetsOperationsService = jasmine.createSpyObj<ImageAssetsOperationsService>(
      'ImageAssetsOperationsService',
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
    adminSessionServiceMock = {
      accessToken: jasmine.createSpy<() => string | null>('accessToken').and.returnValue(
        'token-123',
      ),
    };

    imageAssetsOperationsService.getAll.and.returnValue(of(createCollectionResponse()));
    imageAssetsOperationsService.create.and.returnValue(of(createImageAsset()));
    imageAssetsOperationsService.update.and.returnValue(of(createImageAsset()));
    imageAssetsOperationsService.delete.and.returnValue(of(void 0));
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
      imports: [ImageAssetsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: ImageAssetsOperationsService, useValue: imageAssetsOperationsService },
        { provide: ProjectsService, useValue: projectsService },
        { provide: ExperiencesService, useValue: experiencesService },
        { provide: TechnologiesService, useValue: technologiesService },
        { provide: AdminSessionService, useValue: adminSessionServiceMock },
        { provide: ToastService, useValue: toastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageAssetsOperationsComponent);
  });

  it('should load and render the protected image-assets workspace', async () => {
    await settleWorkspace(fixture);

    const compiled = fixture.nativeElement as HTMLElement;

    expect(imageAssetsOperationsService.getAll).toHaveBeenCalledWith(1, 5, '');
    expect(compiled.textContent).toContain('Image assets');
    expect(compiled.textContent).toContain(
      createAdminEntityEndpointLabel('/image-assets'),
    );
    expect(compiled.textContent).toContain('Create');
    expect(compiled.textContent).toContain('Read');
    expect(compiled.textContent).not.toContain('vh_logo_blue.svg');
  });

  it('should create, update and delete a protected image asset from the modal workflows', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openUpdateModal(imageAssetId: string): void;
      openDeleteModal(imageAssetId: string): void;
      updateFileName(value: string): void;
      updateFilePath(value: string): void;
      updateFolder(value: string): void;
      updateKind(value: string): void;
      updateAltPt(value: string): void;
      updateAltEn(value: string): void;
      updateCaptionPt(value: string): void;
      updateCaptionEn(value: string): void;
      updateMimeType(value: string): void;
      updateWidth(value: string): void;
      updateHeight(value: string): void;
      updateSortOrder(value: string): void;
      updatePublication(value: boolean): void;
      toggleProject(projectId: string): void;
      toggleExperience(experienceId: string): void;
      toggleTechnology(technologyId: string): void;
      submitModal(): Promise<void>;
    };

    component.openCreateModal();
    component.updateFileName('brand-light.svg');
    component.updateFilePath('/assets/img/logo/brand-light.svg');
    component.updateFolder('logo');
    component.updateKind('icon');
    component.updateAltPt('Logo claro');
    component.updateAltEn('Light logo');
    component.updateCaptionPt('Marca clara');
    component.updateCaptionEn('Light brand');
    component.updateMimeType('image/svg+xml');
    component.updateWidth('180');
    component.updateHeight('72');
    component.updateSortOrder('3');
    component.updatePublication(false);
    component.toggleProject('project-1');
    component.toggleExperience('experience-1');
    component.toggleTechnology('technology-1');
    await component.submitModal();

    expect(imageAssetsOperationsService.create).toHaveBeenCalledWith('token-123', {
      fileName: 'brand-light.svg',
      filePath: '/assets/img/logo/brand-light.svg',
      folder: 'logo',
      kind: 'ICON',
      altPt: 'Logo claro',
      altEn: 'Light logo',
      captionPt: 'Marca clara',
      captionEn: 'Light brand',
      mimeType: 'image/svg+xml',
      width: 180,
      height: 72,
      sortOrder: 3,
      isPublished: false,
      projectIds: ['project-1'],
      experienceIds: ['experience-1'],
      technologyIds: ['technology-1'],
      formationIds: [],
      spokenLanguageIds: [],
      customerIds: [],
      jobIds: [],
    });

    component.openUpdateModal('image-asset-1');
    component.updateAltPt('Logo azul atualizado');
    await component.submitModal();

    expect(imageAssetsOperationsService.update).toHaveBeenCalledWith(
      'token-123',
      'image-asset-1',
      jasmine.objectContaining({
        altPt: 'Logo azul atualizado',
        kind: 'ICON',
      }),
    );

    component.openDeleteModal('image-asset-1');
    await component.submitModal();

    expect(imageAssetsOperationsService.delete).toHaveBeenCalledWith(
      'token-123',
      'image-asset-1',
    );
  });

  it('should validate modal input and block unavailable sessions', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      updateFileName(value: string): void;
      updateFilePath(value: string): void;
      updateFolder(value: string): void;
      updateKind(value: string): void;
      updateMimeType(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    component.openCreateModal();
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.imageAssets.feedback.requiredFileName',
    );

    component.updateFileName('vh_logo_blue.svg');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.imageAssets.feedback.requiredFilePath',
    );

    component.updateFilePath('/assets/img/logo/vh_logo_blue.svg');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.imageAssets.feedback.requiredFolder',
    );

    component.updateFolder('logo');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.imageAssets.feedback.requiredKind',
    );

    component.updateKind('INVALID');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.imageAssets.feedback.invalidKind',
    );

    component.updateKind('ICON');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.imageAssets.feedback.requiredMimeType',
    );

    component.updateMimeType('image/svg+xml');
    component.updateSortOrder('abc');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.imageAssets.feedback.invalidSortOrder',
    );
  });

  it('should expose load, save and delete failures', async () => {
    await settleWorkspace(fixture);

    imageAssetsOperationsService.create.and.returnValue(
      throwError(() => new Error('Unable to create image asset')),
    );
    imageAssetsOperationsService.delete.and.returnValue(
      throwError(() => new Error('Unable to delete image asset')),
    );

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openDeleteModal(imageAssetId: string): void;
      updateFileName(value: string): void;
      updateFilePath(value: string): void;
      updateFolder(value: string): void;
      updateKind(value: string): void;
      updateMimeType(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
      modalModeSignal: { set(value: string): void };
    };

    component.modalModeSignal.set('delete');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.imageAssets.feedback.selectionRequired',
    );

    component.openCreateModal();
    component.updateFileName('brand-light.svg');
    component.updateFilePath('/assets/img/logo/brand-light.svg');
    component.updateFolder('logo');
    component.updateKind('ICON');
    component.updateMimeType('image/svg+xml');
    component.updateSortOrder('2');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.imageAssets.feedback.saveError',
    );

    component.openDeleteModal('image-asset-1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.imageAssets.feedback.deleteError',
    );
  });

  it('should navigate between modal flows, refresh pages and reset the selection state', async () => {
    imageAssetsOperationsService.getAll.and.callFake((page = 1) =>
      of(createCollectionResponse([createImageAsset()], page)),
    );
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openReadModal(): void;
      openUpdatePickerModal(): void;
      openDeletePickerModal(): void;
      openUpdateModal(imageAssetId: string): void;
      openDeleteModal(imageAssetId: string): void;
      closeModal(): void;
      goToPage(page: number): Promise<void>;
      updateSearchQuery(value: string): Promise<void>;
      modalMode(): string | null;
      modalTitleKey(): string;
      isModalOpen(): boolean;
      hasImageAssets(): boolean;
      selectedImageAsset(): ImageAssetRecord | null;
      form(): {
        fileName: string;
        projectIds: readonly string[];
        experienceIds: readonly string[];
        technologyIds: readonly string[];
      };
      trackById(index: number, item: { id: string }): string;
    };

    expect(component.hasImageAssets()).toBeTrue();

    component.openCreateModal();
    expect(component.modalMode()).toBe('create');
    expect(component.modalTitleKey()).toBe('pages.admin.imageAssets.modal.create.title');

    component.openReadModal();
    expect(component.modalMode()).toBe('read');
    expect(component.modalTitleKey()).toBe('pages.admin.imageAssets.modal.read.title');

    component.openUpdatePickerModal();
    expect(component.modalMode()).toBe('pick-update');
    expect(component.modalTitleKey()).toBe(
      'pages.admin.imageAssets.modal.pickUpdate.title',
    );

    component.openDeletePickerModal();
    expect(component.modalMode()).toBe('pick-delete');
    expect(component.modalTitleKey()).toBe(
      'pages.admin.imageAssets.modal.pickDelete.title',
    );

    component.openUpdateModal('image-asset-1');
    expect(component.modalMode()).toBe('update');
    expect(component.modalTitleKey()).toBe('pages.admin.imageAssets.modal.update.title');
    expect(component.selectedImageAsset()?.id).toBe('image-asset-1');
    expect(component.form().fileName).toBe('vh_logo_blue.svg');

    component.openDeleteModal('image-asset-1');
    expect(component.modalMode()).toBe('delete');
    expect(component.modalTitleKey()).toBe('pages.admin.imageAssets.modal.delete.title');
    expect(component.selectedImageAsset()?.id).toBe('image-asset-1');

    component.closeModal();
    expect(component.modalMode()).toBeNull();
    expect(component.isModalOpen()).toBeFalse();
    expect(component.selectedImageAsset()).toBeNull();

    await component.goToPage(2);
    expect(imageAssetsOperationsService.getAll).toHaveBeenCalledWith(2, 5, '');

    await component.updateSearchQuery('logo');
    await component.updateSearchQuery('logo');
    expect(imageAssetsOperationsService.getAll).toHaveBeenCalledWith(1, 5, 'logo');

    await component.goToPage(2);
    const callsAfterValidPageChange = imageAssetsOperationsService.getAll.calls.count();
    await component.goToPage(0);
    await component.goToPage(99);

    expect(imageAssetsOperationsService.getAll.calls.count()).toBe(
      callsAfterValidPageChange,
    );
    expect(component.trackById(0, { id: 'image-asset-1' })).toBe('image-asset-1');
  });

  it('should ignore unavailable records and read requests when no protected image asset exists', async () => {
    imageAssetsOperationsService.getAll.and.returnValue(
      of(
        createCollectionResponse([], 1) as ReturnType<typeof createCollectionResponse>,
      ),
    );

    const emptyFixture = TestBed.createComponent(ImageAssetsOperationsComponent);
    await settleWorkspace(emptyFixture);

    const component = emptyFixture.componentInstance as unknown as {
      openReadModal(): void;
      openUpdateModal(imageAssetId: string): void;
      openDeleteModal(imageAssetId: string): void;
      modalMode(): string | null;
      hasImageAssets(): boolean;
      selectedImageAsset(): ImageAssetRecord | null;
    };

    expect(component.hasImageAssets()).toBeFalse();

    component.openReadModal();
    component.openUpdateModal('missing-image-asset');
    component.openDeleteModal('missing-image-asset');

    expect(component.modalMode()).toBeNull();
    expect(component.selectedImageAsset()).toBeNull();
  });

  it('should expose missing-session, selection and load failure states', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      updateFileName(value: string): void;
      updateFilePath(value: string): void;
      updateFolder(value: string): void;
      updateKind(value: string): void;
      updateMimeType(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
      modalModeSignal: { set(value: string | null): void };
      openUpdateModal(imageAssetId: string): void;
      toggleProject(projectId: string): void;
      toggleExperience(experienceId: string): void;
      toggleTechnology(technologyId: string): void;
      form(): {
        projectIds: readonly string[];
        experienceIds: readonly string[];
        technologyIds: readonly string[];
      };
    };

    adminSessionServiceMock.accessToken.and.returnValue(null);
    component.openCreateModal();
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.imageAssets.feedback.missingSession',
    );

    adminSessionServiceMock.accessToken.and.returnValue('token-123');
    component.openCreateModal();
    component.updateFileName('vh_logo_blue.svg');
    component.updateFilePath('/assets/img/logo/vh_logo_blue.svg');
    component.updateFolder('logo');
    component.updateKind('ICON');
    component.updateMimeType('image/svg+xml');
    component.updateSortOrder('1');
    component.modalModeSignal.set('update');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.imageAssets.feedback.selectionRequired',
    );

    component.openUpdateModal('image-asset-1');
    component.toggleProject('project-1');
    component.toggleExperience('experience-1');
    component.toggleTechnology('technology-1');

    expect(component.form().projectIds).toEqual([]);
    expect(component.form().experienceIds).toEqual([]);
    expect(component.form().technologyIds).toEqual([]);

    imageAssetsOperationsService.getAll.and.returnValue(
      throwError(() => new Error('Unable to load image assets')),
    );
    const errorFixture = TestBed.createComponent(ImageAssetsOperationsComponent);
    await settleWorkspace(errorFixture);

    const errorComponent = errorFixture.componentInstance as unknown as {
      loadErrorKey(): string | null;
      isLoading(): boolean;
    };

    expect(errorComponent.loadErrorKey()).toBe(
      'pages.admin.imageAssets.feedback.loadError',
    );
    expect(errorComponent.isLoading()).toBeFalse();
    expect(toastService.showError).toHaveBeenCalledWith(
      'pages.admin.imageAssets.feedback.loadError',
    );
  });

  it('should go back one page after deleting the only protected record from a later page', async () => {
    imageAssetsOperationsService.getAll.and.callFake((page = 1) =>
      of(createCollectionResponse([createImageAsset()], page)),
    );

    const pagedFixture = TestBed.createComponent(ImageAssetsOperationsComponent);
    await settleWorkspace(pagedFixture);

    const component = pagedFixture.componentInstance as unknown as {
      goToPage(page: number): Promise<void>;
      openDeleteModal(imageAssetId: string): void;
      submitModal(): Promise<void>;
    };

    await component.goToPage(2);
    component.openDeleteModal('image-asset-1');
    await component.submitModal();

    expect(imageAssetsOperationsService.delete).toHaveBeenCalledWith(
      'token-123',
      'image-asset-1',
    );
    expect(imageAssetsOperationsService.getAll).toHaveBeenCalledWith(1, 5, '');
  });

  it('should ignore submit requests when no modal mode is active', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      submitModal(): Promise<void>;
      modalMode(): string | null;
    };

    expect(component.modalMode()).toBeNull();

    await component.submitModal();

    expect(imageAssetsOperationsService.create).not.toHaveBeenCalled();
    expect(imageAssetsOperationsService.update).not.toHaveBeenCalled();
    expect(imageAssetsOperationsService.delete).not.toHaveBeenCalled();
  });
});
