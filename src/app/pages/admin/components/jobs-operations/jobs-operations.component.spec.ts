import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ImageAssetsOperationsService } from '../../../../core/api/admin/image-assets/image-assets-operations.service';
import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { JobsOperationsService } from '../../../../core/api/admin/jobs/jobs-operations.service';
import { JobRecord } from '../../../../core/api/admin/jobs/jobs-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ExperiencesService } from '../../../../core/api/experiences/experiences.service';
import {
  ExperienceCollectionItemResponse,
  ExperiencesCollectionResponse,
} from '../../../../core/api/experiences/experiences.types';
import { ToastService } from '../../../../core/toast/toast.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { createAdminEntityEndpointLabel } from '../../admin.types';
import { JobsOperationsComponent } from './jobs-operations.component';

const createJob = (overrides: Partial<JobRecord> = {}): JobRecord => ({
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
  experiences: [],
  imageAssets: [],
  ...overrides,
});

const createExperience = (
  overrides: Partial<ExperienceCollectionItemResponse> = {},
): ExperienceCollectionItemResponse => ({
  id: 'experience-1',
  slug: 'ford-account',
  companyName: 'Ford',
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
  ...overrides,
});

const createImageAsset = (overrides: Partial<ImageAssetRecord> = {}): ImageAssetRecord => ({
  id: 'image-asset-1',
  fileName: 'ford.svg',
  filePath: '/assets/img/jobs/ford.svg',
  folder: 'jobs',
  kind: 'ICON',
  altPt: 'Logo da Ford',
  altEn: 'Ford logo',
  captionPt: 'Cargo Ford',
  captionEn: 'Ford role',
  mimeType: 'image/svg+xml',
  width: 128,
  height: 128,
  sortOrder: 1,
  projectIds: [],
  experienceIds: [],
  technologyIds: [],
  formationIds: [],
  spokenLanguageIds: [],
  customerIds: [],
  jobIds: ['job-1'],
  ...overrides,
});

const createCollectionResponse = (data: JobRecord[] = [createJob()], page = 1) => ({
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

const createExperiencesCollectionResponse = (
  data: ExperienceCollectionItemResponse[] = [createExperience()],
): ExperiencesCollectionResponse => ({
  data,
  pagination: {
    page: 1,
    pageSize: 5,
    totalItems: data.length,
    totalPages: data.length === 0 ? 0 : 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
});

describe('JobsOperationsComponent', () => {
  let fixture: ComponentFixture<JobsOperationsComponent>;
  let jobsOperationsService: jasmine.SpyObj<JobsOperationsService>;
  let experiencesService: jasmine.SpyObj<ExperiencesService>;
  let imageAssetsOperationsService: jasmine.SpyObj<ImageAssetsOperationsService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let adminSessionServiceMock: {
    accessToken: jasmine.Spy<() => string | null>;
  };

  const settleWorkspace = async (
    currentFixture: ComponentFixture<JobsOperationsComponent>,
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
    jobsOperationsService = jasmine.createSpyObj<JobsOperationsService>(
      'JobsOperationsService',
      ['getAll', 'create', 'update', 'delete'],
    );
    experiencesService = jasmine.createSpyObj<ExperiencesService>('ExperiencesService', [
      'getExperiences',
    ]);
    imageAssetsOperationsService = jasmine.createSpyObj<ImageAssetsOperationsService>(
      'ImageAssetsOperationsService',
      ['getAll'],
    );
    toastService = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);
    adminSessionServiceMock = {
      accessToken: jasmine
        .createSpy<() => string | null>('accessToken')
        .and.returnValue('token-123'),
    };

    jobsOperationsService.getAll.and.returnValue(of(createCollectionResponse()));
    jobsOperationsService.create.and.returnValue(of(createJob()));
    jobsOperationsService.update.and.returnValue(of(createJob()));
    jobsOperationsService.delete.and.returnValue(of(void 0));
    experiencesService.getExperiences.and.returnValue(of(createExperiencesCollectionResponse()));
    imageAssetsOperationsService.getAll.and.returnValue(
      of({
        data: [createImageAsset()],
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
      imports: [JobsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: JobsOperationsService,
          useValue: jobsOperationsService,
        },
        {
          provide: ExperiencesService,
          useValue: experiencesService,
        },
        {
          provide: ImageAssetsOperationsService,
          useValue: imageAssetsOperationsService,
        },
        {
          provide: AdminSessionService,
          useValue: adminSessionServiceMock,
        },
        {
          provide: ToastService,
          useValue: toastService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JobsOperationsComponent);
  });

  it('should load and render the protected jobs workspace', async () => {
    await settleWorkspace(fixture);

    const compiled = fixture.nativeElement as HTMLElement;

    expect(jobsOperationsService.getAll).toHaveBeenCalledWith(1, 5, '');
    expect(experiencesService.getExperiences).toHaveBeenCalledTimes(1);
    expect(imageAssetsOperationsService.getAll).toHaveBeenCalledWith(1, 100);
    expect(compiled.textContent).toContain('Jobs');
    expect(compiled.textContent).toContain(createAdminEntityEndpointLabel('/jobs'));
    expect(compiled.textContent).toContain('Create');
    expect(compiled.textContent).toContain('Read');
    expect(compiled.textContent).toContain('Update');
    expect(compiled.textContent).toContain('Delete');
    expect(compiled.textContent).not.toContain('Engenheiro Front-End');
  });

  it('should create, update and delete a protected job from the modal workflows', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openUpdateModal(jobId: string): void;
      openDeleteModal(jobId: string): void;
      updateSlug(value: string): void;
      updateNamePt(value: string): void;
      updateNameEn(value: string): void;
      updateSummaryPt(value: string): void;
      updateSummaryEn(value: string): void;
      updateHighlight(value: boolean): void;
      updateSortOrder(value: string): void;
      toggleExperience(experienceId: string): void;
      toggleImageAsset(imageAssetId: string): void;
      submitModal(): Promise<void>;
    };

    component.openCreateModal();
    component.updateSlug('backend-engineer');
    component.updateNamePt('Engenheiro Back-End');
    component.updateNameEn('Back-End Engineer');
    component.updateSummaryPt('APIs publicas e privadas.');
    component.updateSummaryEn('Public and private APIs.');
    component.updateHighlight(false);
    component.updateSortOrder('2');
    component.toggleExperience('experience-1');
    component.toggleImageAsset('image-asset-1');
    await component.submitModal();

    expect(jobsOperationsService.create).toHaveBeenCalledWith({
      slug: 'backend-engineer',
      namePt: 'Engenheiro Back-End',
      nameEn: 'Back-End Engineer',
      summaryPt: 'APIs publicas e privadas.',
      summaryEn: 'Public and private APIs.',
      highlight: false,
      sortOrder: 2,
      experienceIds: ['experience-1'],
      imageAssetIds: ['image-asset-1'],
    });

    component.openUpdateModal('job-1');
    component.updateNamePt('Engenheiro Front-End Senior');
    await component.submitModal();

    expect(jobsOperationsService.update).toHaveBeenCalledWith('job-1', {
      slug: 'frontend-engineer',
      namePt: 'Engenheiro Front-End Senior',
      nameEn: 'Front-End Engineer',
      summaryPt: 'Interfaces publicas e privadas.',
      summaryEn: 'Public and private interfaces.',
      highlight: true,
      sortOrder: 1,
      experienceIds: ['experience-1'],
      imageAssetIds: ['image-asset-1'],
    });

    component.openDeleteModal('job-1');
    await component.submitModal();

    expect(jobsOperationsService.delete).toHaveBeenCalledWith('job-1');
  });

  it('should expose the modal titles for every workflow and open the read modal', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openReadModal(): void;
      openUpdatePickerModal(): void;
      openDeletePickerModal(): void;
      openUpdateModal(jobId: string): void;
      openDeleteModal(jobId: string): void;
      closeModal(): void;
      modalTitleKey(): string;
      modalMode(): string | null;
    };

    component.openCreateModal();
    expect(component.modalTitleKey()).toBe('pages.admin.jobs.modal.create.title');

    component.openReadModal();
    fixture.detectChanges();
    expect(component.modalTitleKey()).toBe('pages.admin.jobs.modal.read.title');
    expect(fixture.nativeElement.textContent).toContain('Engenheiro Front-End');
    expect(fixture.nativeElement.textContent).toContain('Public and private interfaces.');
    expect(fixture.nativeElement.textContent).toContain('ford.svg (ICON)');

    component.openUpdatePickerModal();
    expect(component.modalTitleKey()).toBe('pages.admin.jobs.modal.pickUpdate.title');

    component.openDeletePickerModal();
    expect(component.modalTitleKey()).toBe('pages.admin.jobs.modal.pickDelete.title');

    component.openUpdateModal('job-1');
    expect(component.modalTitleKey()).toBe('pages.admin.jobs.modal.update.title');

    component.openDeleteModal('job-1');
    expect(component.modalTitleKey()).toBe('pages.admin.jobs.modal.delete.title');

    component.closeModal();
    component.openUpdateModal('missing-job');
    expect(component.modalMode()).toBeNull();

    component.openDeleteModal('missing-job');
    expect(component.modalMode()).toBeNull();
  });

  it('should support paging and relation deselection inside the modal workflows', async () => {
    jobsOperationsService.getAll.and.returnValues(
      of(createCollectionResponse()),
      of(createCollectionResponse([createJob({ id: 'job-search', slug: 'search-hit' })], 1)),
      of(createCollectionResponse([createJob({ id: 'job-2', slug: 'page-2-hit' })], 2)),
    );

    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      goToPage(page: number): Promise<void>;
      updateSearchQuery(value: string): Promise<void>;
      openCreateModal(): void;
      toggleExperience(experienceId: string): void;
      toggleImageAsset(imageAssetId: string): void;
      form(): {
        experienceIds: readonly string[];
        imageAssetIds: readonly string[];
      };
    };

    await component.goToPage(2);
    await component.updateSearchQuery('search');
    await component.updateSearchQuery('search');
    await component.goToPage(2);
    await component.goToPage(99);

    expect(jobsOperationsService.getAll).toHaveBeenCalledTimes(3);
    expect(jobsOperationsService.getAll).toHaveBeenCalledWith(2, 5, '');
    expect(jobsOperationsService.getAll).toHaveBeenCalledWith(1, 5, 'search');

    component.openCreateModal();
    component.toggleExperience('experience-1');
    component.toggleExperience('experience-1');
    component.toggleImageAsset('image-asset-1');
    component.toggleImageAsset('image-asset-1');

    expect(component.form().experienceIds).toEqual([]);
    expect(component.form().imageAssetIds).toEqual([]);
  });

  it('should validate modal input and block unavailable sessions', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      updateSlug(value: string): void;
      updateNamePt(value: string): void;
      updateNameEn(value: string): void;
      updateSummaryPt(value: string): void;
      updateSummaryEn(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    component.openCreateModal();
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.jobs.feedback.requiredSlug');

    component.updateSlug('frontend-engineer');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.jobs.feedback.requiredNamePt');

    component.updateNamePt('Engenheiro Front-End');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.jobs.feedback.requiredNameEn');

    component.updateNameEn('Front-End Engineer');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.jobs.feedback.requiredSummaryPt');

    component.updateSummaryPt('Interfaces publicas e privadas.');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.jobs.feedback.requiredSummaryEn');

    component.updateSummaryEn('Public and private interfaces.');
    component.updateSortOrder('abc');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.jobs.feedback.invalidSortOrder');

    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [JobsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: JobsOperationsService,
          useValue: jobsOperationsService,
        },
        {
          provide: ExperiencesService,
          useValue: experiencesService,
        },
        {
          provide: ImageAssetsOperationsService,
          useValue: imageAssetsOperationsService,
        },
        {
          provide: ToastService,
          useValue: toastService,
        },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => null,
          },
        },
      ],
    }).compileComponents();

    const missingSessionFixture = TestBed.createComponent(JobsOperationsComponent);
    await settleWorkspace(missingSessionFixture);

    const missingSessionComponent = missingSessionFixture.componentInstance as unknown as {
      openCreateModal(): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    missingSessionComponent.openCreateModal();
    await missingSessionComponent.submitModal();

    expect(missingSessionComponent.modalFeedbackKey()).toBe(
      'pages.admin.jobs.feedback.missingSession',
    );
  });

  it('should expose modal feedback for selection, save and delete failures', async () => {
    await settleWorkspace(fixture);

    jobsOperationsService.create.and.returnValue(
      throwError(() => new Error('Unable to create job')),
    );
    jobsOperationsService.update.and.returnValue(
      throwError(() => new Error('Unable to update job')),
    );
    jobsOperationsService.delete.and.returnValue(
      throwError(() => new Error('Unable to delete job')),
    );

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openDeleteModal(jobId: string): void;
      updateSlug(value: string): void;
      updateNamePt(value: string): void;
      updateNameEn(value: string): void;
      updateSummaryPt(value: string): void;
      updateSummaryEn(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
      modalModeSignal: { set(value: string): void };
    };

    component.modalModeSignal.set('update');
    component.updateSlug('frontend-engineer');
    component.updateNamePt('Engenheiro Front-End');
    component.updateNameEn('Front-End Engineer');
    component.updateSummaryPt('Interfaces publicas e privadas.');
    component.updateSummaryEn('Public and private interfaces.');
    component.updateSortOrder('1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.jobs.feedback.selectionRequired');

    component.modalModeSignal.set('delete');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.jobs.feedback.selectionRequired');

    component.openCreateModal();
    component.updateSlug('backend-engineer');
    component.updateNamePt('Engenheiro Back-End');
    component.updateNameEn('Back-End Engineer');
    component.updateSummaryPt('APIs publicas e privadas.');
    component.updateSummaryEn('Public and private APIs.');
    component.updateSortOrder('2');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.jobs.feedback.saveError');

    component.openDeleteModal('job-1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.jobs.feedback.deleteError');
  });

  it('should expose trackBy and move deletion reload to the previous page when removing the last item', async () => {
    TestBed.resetTestingModule();
    jobsOperationsService.getAll.and.returnValues(
      of(createCollectionResponse([createJob()], 2)),
      of(createCollectionResponse([], 1)),
    );

    await TestBed.configureTestingModule({
      imports: [JobsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: JobsOperationsService,
          useValue: jobsOperationsService,
        },
        {
          provide: ExperiencesService,
          useValue: experiencesService,
        },
        {
          provide: ImageAssetsOperationsService,
          useValue: imageAssetsOperationsService,
        },
        {
          provide: ToastService,
          useValue: toastService,
        },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    const pagedFixture = TestBed.createComponent(JobsOperationsComponent);
    await settleWorkspace(pagedFixture);

    const pagedComponent = pagedFixture.componentInstance as unknown as {
      openDeleteModal(jobId: string): void;
      submitModal(): Promise<void>;
      trackById(index: number, item: { id: string }): string;
    };

    expect(pagedComponent.trackById(0, { id: 'job-1' })).toBe('job-1');

    pagedComponent.openDeleteModal('job-1');
    await pagedComponent.submitModal();

    expect(jobsOperationsService.getAll).toHaveBeenCalledWith(1, 5, '');
  });

  it('should render empty and load error states and keep read disabled without jobs', async () => {
    TestBed.resetTestingModule();
    jobsOperationsService.getAll.and.returnValue(of(createCollectionResponse([])));

    await TestBed.configureTestingModule({
      imports: [JobsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: JobsOperationsService,
          useValue: jobsOperationsService,
        },
        {
          provide: ExperiencesService,
          useValue: experiencesService,
        },
        {
          provide: ImageAssetsOperationsService,
          useValue: imageAssetsOperationsService,
        },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    const emptyFixture = TestBed.createComponent(JobsOperationsComponent);
    await settleWorkspace(emptyFixture);

    const emptyComponent = emptyFixture.componentInstance as unknown as {
      openReadModal(): void;
      modalMode(): string | null;
      hasJobs(): boolean;
      loadErrorKey(): string | null;
    };

    expect(emptyComponent.hasJobs()).toBeFalse();
    expect(emptyComponent.loadErrorKey()).toBeNull();

    emptyComponent.openReadModal();
    expect(emptyComponent.modalMode()).toBeNull();

    TestBed.resetTestingModule();
    jobsOperationsService.getAll.and.returnValue(
      throwError(() => new Error('Unable to load jobs')),
    );

    await TestBed.configureTestingModule({
      imports: [JobsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: JobsOperationsService,
          useValue: jobsOperationsService,
        },
        {
          provide: ExperiencesService,
          useValue: experiencesService,
        },
        {
          provide: ImageAssetsOperationsService,
          useValue: imageAssetsOperationsService,
        },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
        {
          provide: ToastService,
          useValue: toastService,
        },
      ],
    }).compileComponents();

    const errorFixture = TestBed.createComponent(JobsOperationsComponent);
    await settleWorkspace(errorFixture);

    const errorComponent = errorFixture.componentInstance as unknown as {
      loadErrorKey(): string | null;
    };

    expect(errorComponent.loadErrorKey()).toBe('pages.admin.jobs.feedback.loadError');
  });

  it('should ignore submit requests when no modal workflow is active', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      submitModal(): Promise<void>;
    };

    await component.submitModal();

    expect(jobsOperationsService.create).not.toHaveBeenCalled();
    expect(jobsOperationsService.update).not.toHaveBeenCalled();
    expect(jobsOperationsService.delete).not.toHaveBeenCalled();
  });
});
