import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FormationsOperationsService } from '../../../../core/api/admin/formations/formations-operations.service';
import { FormationRecord } from '../../../../core/api/admin/formations/formations-operations.types';
import { ImageAssetsOperationsService } from '../../../../core/api/admin/image-assets/image-assets-operations.service';
import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { LinksOperationsService } from '../../../../core/api/admin/links/links-operations.service';
import { LinkRecord } from '../../../../core/api/admin/links/links-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { TechnologiesService } from '../../../../core/api/technologies/technologies.service';
import {
  TechnologiesCollectionResponse,
  TechnologyCollectionItemResponse,
} from '../../../../core/api/technologies/technologies.types';
import { ToastService } from '../../../../core/toast/toast.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { createAdminEntityEndpointLabel } from '../../admin.types';
import { FormationsOperationsComponent } from './formations-operations.component';

const createFormation = (overrides: Partial<FormationRecord> = {}): FormationRecord => ({
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
  technologyRelations: [{ technologyId: 'technology-1', sortOrder: 0 }],
  linkIds: ['link-1'],
  imageAssetIds: ['image-asset-1'],
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

const createLink = (overrides: Partial<LinkRecord> = {}): LinkRecord => ({
  id: 'link-1',
  url: 'https://example.com/formation',
  labelPt: 'Detalhes',
  labelEn: 'Details',
  descriptionPt: 'Descricao',
  descriptionEn: 'Description',
  type: 'DOCS',
  sortOrder: 1,
  formationIds: ['formation-1'],
  ...overrides,
});

const createImageAsset = (overrides: Partial<ImageAssetRecord> = {}): ImageAssetRecord => ({
  id: 'image-asset-1',
  fileName: 'puc.svg',
  filePath: '/assets/img/formations/puc.svg',
  folder: 'formations',
  kind: 'ICON',
  altPt: 'Campus',
  altEn: 'Campus',
  captionPt: 'Campus',
  captionEn: 'Campus',
  mimeType: 'image/svg+xml',
  width: 128,
  height: 128,
  sortOrder: 1,
  projectIds: [],
  experienceIds: [],
  technologyIds: [],
  formationIds: ['formation-1'],
  spokenLanguageIds: [],
  customerIds: [],
  jobIds: [],
  ...overrides,
});

const createCollectionResponse = (data: FormationRecord[] = [createFormation()], page = 1) => ({
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

const createTechnologiesCollectionResponse = (
  data: TechnologyCollectionItemResponse[] = [createTechnology()],
): TechnologiesCollectionResponse => ({
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

describe('FormationsOperationsComponent', () => {
  let fixture: ComponentFixture<FormationsOperationsComponent>;
  let formationsOperationsService: jasmine.SpyObj<FormationsOperationsService>;
  let technologiesService: jasmine.SpyObj<TechnologiesService>;
  let linksOperationsService: jasmine.SpyObj<LinksOperationsService>;
  let imageAssetsOperationsService: jasmine.SpyObj<ImageAssetsOperationsService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let adminSessionServiceMock: {
    accessToken: jasmine.Spy<() => string | null>;
  };

  const settleWorkspace = async (
    currentFixture: ComponentFixture<FormationsOperationsComponent>,
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
    formationsOperationsService = jasmine.createSpyObj<FormationsOperationsService>(
      'FormationsOperationsService',
      ['getAll', 'create', 'update', 'delete'],
    );
    technologiesService = jasmine.createSpyObj<TechnologiesService>('TechnologiesService', [
      'getTechnologies',
    ]);
    linksOperationsService = jasmine.createSpyObj<LinksOperationsService>(
      'LinksOperationsService',
      ['getAll'],
    );
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

    formationsOperationsService.getAll.and.returnValue(of(createCollectionResponse()));
    formationsOperationsService.create.and.returnValue(of(createFormation()));
    formationsOperationsService.update.and.returnValue(of(createFormation()));
    formationsOperationsService.delete.and.returnValue(of(void 0));
    technologiesService.getTechnologies.and.returnValue(of(createTechnologiesCollectionResponse()));
    linksOperationsService.getAll.and.returnValue(
      of({
        data: [createLink()],
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
      imports: [FormationsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: FormationsOperationsService,
          useValue: formationsOperationsService,
        },
        {
          provide: TechnologiesService,
          useValue: technologiesService,
        },
        {
          provide: LinksOperationsService,
          useValue: linksOperationsService,
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

    fixture = TestBed.createComponent(FormationsOperationsComponent);
  });

  it('should load and render the protected formations workspace', async () => {
    await settleWorkspace(fixture);

    const compiled = fixture.nativeElement as HTMLElement;

    expect(formationsOperationsService.getAll).toHaveBeenCalledWith(1, 5, '');
    expect(technologiesService.getTechnologies).toHaveBeenCalledTimes(1);
    expect(linksOperationsService.getAll).toHaveBeenCalledWith(1, 100);
    expect(imageAssetsOperationsService.getAll).toHaveBeenCalledWith(1, 100);
    expect(compiled.textContent).toContain('Formations');
    expect(compiled.textContent).toContain(createAdminEntityEndpointLabel('/formations'));
    expect(compiled.textContent).toContain('Create');
    expect(compiled.textContent).toContain('Read');
    expect(compiled.textContent).toContain('Update');
    expect(compiled.textContent).toContain('Delete');
    expect(compiled.textContent).not.toContain('Analise e Desenvolvimento de Sistemas');
  });

  it('should create, update and delete a protected formation', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openUpdateModal(formationId: string): void;
      openDeleteModal(formationId: string): void;
      updateSlug(value: string): void;
      updateInstitution(value: string): void;
      updateTitlePt(value: string): void;
      updateTitleEn(value: string): void;
      updateDegreeType(value: string): void;
      updateSummaryPt(value: string): void;
      updateSummaryEn(value: string): void;
      updateStartDate(value: string): void;
      updateEndDate(value: string): void;
      updateHighlight(value: boolean): void;
      updateSortOrder(value: string): void;
      toggleTechnology(technologyId: string): void;
      toggleLink(linkId: string): void;
      toggleImageAsset(imageAssetId: string): void;
      submitModal(): Promise<void>;
    };

    component.openCreateModal();
    component.updateSlug('software-engineering');
    component.updateInstitution('UFMG');
    component.updateTitlePt('Engenharia de Software');
    component.updateTitleEn('Software Engineering');
    component.updateDegreeType('MBA');
    component.updateSummaryPt('Resumo PT');
    component.updateSummaryEn('Summary EN');
    component.updateStartDate('2024-01-01');
    component.updateEndDate('2025-01-01');
    component.updateHighlight(false);
    component.updateSortOrder('2');
    component.toggleTechnology('technology-1');
    component.toggleLink('link-1');
    component.toggleImageAsset('image-asset-1');
    await component.submitModal();

    expect(formationsOperationsService.create).toHaveBeenCalledWith({
      slug: 'software-engineering',
      institution: 'UFMG',
      titlePt: 'Engenharia de Software',
      titleEn: 'Software Engineering',
      degreeType: 'MBA',
      summaryPt: 'Resumo PT',
      summaryEn: 'Summary EN',
      startDate: '2024-01-01T00:00:00.000Z',
      endDate: '2025-01-01T00:00:00.000Z',
      highlight: false,
      sortOrder: 2,
      technologyRelations: [{ technologyId: 'technology-1' }],
      linkIds: ['link-1'],
      imageAssetIds: ['image-asset-1'],
    });

    component.openUpdateModal('formation-1');
    component.updateTitlePt('ADS Atualizado');
    await component.submitModal();

    expect(formationsOperationsService.update).toHaveBeenCalledWith('formation-1', {
      slug: 'systems-analysis',
      institution: 'PUC Minas',
      titlePt: 'ADS Atualizado',
      titleEn: 'Systems Analysis and Development',
      degreeType: 'BACHELOR',
      summaryPt: 'Resumo PT',
      summaryEn: 'Summary EN',
      startDate: '2020-01-01T00:00:00.000Z',
      endDate: '2023-12-01T00:00:00.000Z',
      highlight: true,
      sortOrder: 1,
      technologyRelations: [{ technologyId: 'technology-1' }],
      linkIds: ['link-1'],
      imageAssetIds: ['image-asset-1'],
    });

    component.openDeleteModal('formation-1');
    await component.submitModal();

    expect(formationsOperationsService.delete).toHaveBeenCalledWith('formation-1');
  });

  it('should expose modal titles, paging and relation deselection workflows', async () => {
    formationsOperationsService.getAll.and.returnValues(
      of(createCollectionResponse()),
      of(createCollectionResponse([createFormation({ id: 'formation-search' })], 1)),
      of(createCollectionResponse([createFormation({ id: 'formation-2', slug: 'page-2-hit' })], 2)),
    );

    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openReadModal(): void;
      openUpdatePickerModal(): void;
      openDeletePickerModal(): void;
      openUpdateModal(formationId: string): void;
      openDeleteModal(formationId: string): void;
      closeModal(): void;
      modalTitleKey(): string;
      modalMode(): string | null;
      goToPage(page: number): Promise<void>;
      updateSearchQuery(value: string): Promise<void>;
      toggleTechnology(technologyId: string): void;
      toggleLink(linkId: string): void;
      toggleImageAsset(imageAssetId: string): void;
      form(): {
        technologyIds: readonly string[];
        linkIds: readonly string[];
        imageAssetIds: readonly string[];
      };
    };

    component.openCreateModal();
    expect(component.modalTitleKey()).toBe('pages.admin.formations.modal.create.title');

    component.openReadModal();
    fixture.detectChanges();
    expect(component.modalTitleKey()).toBe('pages.admin.formations.modal.read.title');
    expect(fixture.nativeElement.textContent).toContain('PUC Minas');
    expect(fixture.nativeElement.textContent).toContain('Angular (angular)');

    component.openUpdatePickerModal();
    expect(component.modalTitleKey()).toBe('pages.admin.formations.modal.pickUpdate.title');

    component.openDeletePickerModal();
    expect(component.modalTitleKey()).toBe('pages.admin.formations.modal.pickDelete.title');

    component.openUpdateModal('formation-1');
    expect(component.modalTitleKey()).toBe('pages.admin.formations.modal.update.title');

    component.openDeleteModal('formation-1');
    expect(component.modalTitleKey()).toBe('pages.admin.formations.modal.delete.title');

    component.closeModal();
    component.openUpdateModal('missing-formation');
    expect(component.modalMode()).toBeNull();

    component.openDeleteModal('missing-formation');
    expect(component.modalMode()).toBeNull();

    await component.goToPage(2);
    await component.updateSearchQuery('systems');
    await component.updateSearchQuery('systems');
    await component.goToPage(2);
    await component.goToPage(99);

    expect(formationsOperationsService.getAll).toHaveBeenCalledTimes(3);
    expect(formationsOperationsService.getAll).toHaveBeenCalledWith(2, 5, '');
    expect(formationsOperationsService.getAll).toHaveBeenCalledWith(1, 5, 'systems');

    component.openCreateModal();
    component.toggleTechnology('technology-1');
    component.toggleTechnology('technology-1');
    component.toggleLink('link-1');
    component.toggleLink('link-1');
    component.toggleImageAsset('image-asset-1');
    component.toggleImageAsset('image-asset-1');

    expect(component.form().technologyIds).toEqual([]);
    expect(component.form().linkIds).toEqual([]);
    expect(component.form().imageAssetIds).toEqual([]);
  });

  it('should validate modal input and block unavailable sessions', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      updateSlug(value: string): void;
      updateInstitution(value: string): void;
      updateTitlePt(value: string): void;
      updateTitleEn(value: string): void;
      updateDegreeType(value: string): void;
      updateSummaryPt(value: string): void;
      updateSummaryEn(value: string): void;
      updateStartDate(value: string): void;
      updateEndDate(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    component.openCreateModal();
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.formations.feedback.requiredSlug');

    component.updateSlug('systems-analysis');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.formations.feedback.requiredInstitution',
    );

    component.updateInstitution('PUC Minas');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.formations.feedback.requiredTitlePt');

    component.updateTitlePt('ADS');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.formations.feedback.requiredTitleEn');

    component.updateTitleEn('Systems Analysis');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.formations.feedback.requiredDegreeType',
    );

    component.updateDegreeType('BACHELOR');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.formations.feedback.requiredSummaryPt',
    );

    component.updateSummaryPt('Resumo PT');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.formations.feedback.requiredSummaryEn',
    );

    component.updateSummaryEn('Summary EN');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.formations.feedback.requiredStartDate',
    );

    component.updateStartDate('2020-01-01');
    component.updateEndDate('2019-12-31');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.formations.feedback.invalidDateRange',
    );

    component.updateEndDate('2020-01-02');
    component.updateSortOrder('abc');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.formations.feedback.invalidSortOrder',
    );

    TestBed.resetTestingModule();
    adminSessionServiceMock.accessToken.and.returnValue(null);

    await TestBed.configureTestingModule({
      imports: [FormationsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: FormationsOperationsService,
          useValue: formationsOperationsService,
        },
        {
          provide: TechnologiesService,
          useValue: technologiesService,
        },
        {
          provide: LinksOperationsService,
          useValue: linksOperationsService,
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
          useValue: adminSessionServiceMock,
        },
      ],
    }).compileComponents();

    const missingSessionFixture = TestBed.createComponent(FormationsOperationsComponent);
    await settleWorkspace(missingSessionFixture);

    const missingSessionComponent = missingSessionFixture.componentInstance as unknown as {
      openCreateModal(): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    missingSessionComponent.openCreateModal();
    await missingSessionComponent.submitModal();

    expect(missingSessionComponent.modalFeedbackKey()).toBe(
      'pages.admin.formations.feedback.missingSession',
    );
  });

  it('should expose modal feedback for selection, save and delete failures', async () => {
    await settleWorkspace(fixture);

    formationsOperationsService.create.and.returnValue(
      throwError(() => new Error('Unable to create formation')),
    );
    formationsOperationsService.update.and.returnValue(
      throwError(() => new Error('Unable to update formation')),
    );
    formationsOperationsService.delete.and.returnValue(
      throwError(() => new Error('Unable to delete formation')),
    );

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openDeleteModal(formationId: string): void;
      updateSlug(value: string): void;
      updateInstitution(value: string): void;
      updateTitlePt(value: string): void;
      updateTitleEn(value: string): void;
      updateDegreeType(value: string): void;
      updateSummaryPt(value: string): void;
      updateSummaryEn(value: string): void;
      updateStartDate(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
      modalModeSignal: { set(value: string): void };
    };

    component.modalModeSignal.set('update');
    component.updateSlug('systems-analysis');
    component.updateInstitution('PUC Minas');
    component.updateTitlePt('ADS');
    component.updateTitleEn('Systems Analysis');
    component.updateDegreeType('BACHELOR');
    component.updateSummaryPt('Resumo PT');
    component.updateSummaryEn('Summary EN');
    component.updateStartDate('2020-01-01');
    component.updateSortOrder('1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.formations.feedback.selectionRequired',
    );

    component.modalModeSignal.set('delete');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.formations.feedback.selectionRequired',
    );

    component.openCreateModal();
    component.updateSlug('software-engineering');
    component.updateInstitution('UFMG');
    component.updateTitlePt('Engenharia de Software');
    component.updateTitleEn('Software Engineering');
    component.updateDegreeType('MBA');
    component.updateSummaryPt('Resumo PT');
    component.updateSummaryEn('Summary EN');
    component.updateStartDate('2024-01-01');
    component.updateSortOrder('2');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.formations.feedback.saveError');

    component.openDeleteModal('formation-1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.formations.feedback.deleteError');
  });

  it('should expose trackBy and move deletion reload to the previous page when needed', async () => {
    TestBed.resetTestingModule();
    formationsOperationsService.getAll.and.returnValues(
      of(createCollectionResponse([createFormation()], 2)),
      of(createCollectionResponse([], 1)),
    );

    await TestBed.configureTestingModule({
      imports: [FormationsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: FormationsOperationsService,
          useValue: formationsOperationsService,
        },
        {
          provide: TechnologiesService,
          useValue: technologiesService,
        },
        {
          provide: LinksOperationsService,
          useValue: linksOperationsService,
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
          useValue: adminSessionServiceMock,
        },
      ],
    }).compileComponents();

    const pagedFixture = TestBed.createComponent(FormationsOperationsComponent);
    await settleWorkspace(pagedFixture);

    const pagedComponent = pagedFixture.componentInstance as unknown as {
      openDeleteModal(formationId: string): void;
      submitModal(): Promise<void>;
      trackById(index: number, item: { id: string }): string;
    };

    expect(pagedComponent.trackById(0, { id: 'formation-1' })).toBe('formation-1');

    pagedComponent.openDeleteModal('formation-1');
    await pagedComponent.submitModal();

    expect(formationsOperationsService.getAll).toHaveBeenCalledWith(1, 5, '');
  });

  it('should render empty and load error states and ignore submit without modal', async () => {
    TestBed.resetTestingModule();
    formationsOperationsService.getAll.and.returnValue(of(createCollectionResponse([])));

    await TestBed.configureTestingModule({
      imports: [FormationsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: FormationsOperationsService,
          useValue: formationsOperationsService,
        },
        {
          provide: TechnologiesService,
          useValue: technologiesService,
        },
        {
          provide: LinksOperationsService,
          useValue: linksOperationsService,
        },
        {
          provide: ImageAssetsOperationsService,
          useValue: imageAssetsOperationsService,
        },
        {
          provide: AdminSessionService,
          useValue: adminSessionServiceMock,
        },
      ],
    }).compileComponents();

    const emptyFixture = TestBed.createComponent(FormationsOperationsComponent);
    await settleWorkspace(emptyFixture);

    const emptyComponent = emptyFixture.componentInstance as unknown as {
      openReadModal(): void;
      modalMode(): string | null;
      hasFormations(): boolean;
      loadErrorKey(): string | null;
      submitModal(): Promise<void>;
    };

    expect(emptyComponent.hasFormations()).toBeFalse();
    expect(emptyComponent.loadErrorKey()).toBeNull();

    emptyComponent.openReadModal();
    expect(emptyComponent.modalMode()).toBeNull();
    await emptyComponent.submitModal();
    expect(formationsOperationsService.create).not.toHaveBeenCalled();

    TestBed.resetTestingModule();
    formationsOperationsService.getAll.and.returnValue(
      throwError(() => new Error('Unable to load formations')),
    );

    await TestBed.configureTestingModule({
      imports: [FormationsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: FormationsOperationsService,
          useValue: formationsOperationsService,
        },
        {
          provide: TechnologiesService,
          useValue: technologiesService,
        },
        {
          provide: LinksOperationsService,
          useValue: linksOperationsService,
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

    const errorFixture = TestBed.createComponent(FormationsOperationsComponent);
    await settleWorkspace(errorFixture);

    const errorComponent = errorFixture.componentInstance as unknown as {
      loadErrorKey(): string | null;
    };

    expect(errorComponent.loadErrorKey()).toBe('pages.admin.formations.feedback.loadError');
  });

  it('should ignore submit requests when no modal workflow is active', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      submitModal(): Promise<void>;
    };

    await component.submitModal();

    expect(formationsOperationsService.create).not.toHaveBeenCalled();
    expect(formationsOperationsService.update).not.toHaveBeenCalled();
    expect(formationsOperationsService.delete).not.toHaveBeenCalled();
  });
});
