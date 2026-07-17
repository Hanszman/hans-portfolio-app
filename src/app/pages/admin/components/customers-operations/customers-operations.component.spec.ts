import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CustomersOperationsService } from '../../../../core/api/admin/customers/customers-operations.service';
import { CustomerRecord } from '../../../../core/api/admin/customers/customers-operations.types';
import { ImageAssetsOperationsService } from '../../../../core/api/admin/image-assets/image-assets-operations.service';
import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ExperiencesService } from '../../../../core/api/experiences/experiences.service';
import { ExperienceCollectionItemResponse } from '../../../../core/api/experiences/experiences.types';
import { ToastService } from '../../../../core/toast/toast.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { createAdminEntityEndpointLabel } from '../../admin.types';
import { CustomersOperationsComponent } from './customers-operations.component';

const createCustomer = (overrides: Partial<CustomerRecord> = {}): CustomerRecord => ({
  id: 'customer-1',
  slug: 'enterprise-client',
  name: 'Enterprise Client',
  summaryPt: 'Cliente corporativo',
  summaryEn: 'Corporate client',
  highlight: true,
  sortOrder: 1,
  isPublished: true,
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

const createImageAsset = (overrides: Partial<ImageAssetRecord> = {}): ImageAssetRecord => ({
  id: 'image-asset-1',
  fileName: 'ford.svg',
  filePath: '/assets/img/customers/ford.svg',
  folder: 'customers',
  kind: 'ICON',
  altPt: 'Logo da Ford',
  altEn: 'Ford logo',
  captionPt: 'Cliente Ford',
  captionEn: 'Ford customer',
  mimeType: 'image/svg+xml',
  width: 128,
  height: 128,
  sortOrder: 1,
  isPublished: true,
  projectIds: [],
  experienceIds: [],
  technologyIds: [],
  formationIds: [],
  spokenLanguageIds: [],
  customerIds: ['customer-1'],
  jobIds: [],
  ...overrides,
});

const createCollectionResponse = (data: CustomerRecord[] = [createCustomer()], page = 1) => ({
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

describe('CustomersOperationsComponent', () => {
  let fixture: ComponentFixture<CustomersOperationsComponent>;
  let customersOperationsService: jasmine.SpyObj<CustomersOperationsService>;
  let experiencesService: jasmine.SpyObj<ExperiencesService>;
  let imageAssetsOperationsService: jasmine.SpyObj<ImageAssetsOperationsService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let adminSessionServiceMock: {
    accessToken: jasmine.Spy<() => string | null>;
  };

  const settleWorkspace = async (
    currentFixture: ComponentFixture<CustomersOperationsComponent>,
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
    customersOperationsService = jasmine.createSpyObj<CustomersOperationsService>(
      'CustomersOperationsService',
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

    customersOperationsService.getAll.and.returnValue(of(createCollectionResponse()));
    customersOperationsService.create.and.returnValue(of(createCustomer()));
    customersOperationsService.update.and.returnValue(of(createCustomer()));
    customersOperationsService.delete.and.returnValue(of(void 0));
    experiencesService.getExperiences.and.returnValue(of({ data: [createExperience()] }));
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
      imports: [CustomersOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: CustomersOperationsService,
          useValue: customersOperationsService,
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

    fixture = TestBed.createComponent(CustomersOperationsComponent);
  });

  it('should load and render the protected customers workspace', async () => {
    await settleWorkspace(fixture);

    const compiled = fixture.nativeElement as HTMLElement;

    expect(customersOperationsService.getAll).toHaveBeenCalledWith(1, 5, '');
    expect(experiencesService.getExperiences).toHaveBeenCalledTimes(1);
    expect(imageAssetsOperationsService.getAll).toHaveBeenCalledWith(1, 100);
    expect(compiled.textContent).toContain('Customers');
    expect(compiled.textContent).toContain(createAdminEntityEndpointLabel('/customers'));
    expect(compiled.textContent).toContain('Create');
    expect(compiled.textContent).toContain('Read');
    expect(compiled.textContent).toContain('Update');
    expect(compiled.textContent).toContain('Delete');
    expect(compiled.textContent).not.toContain('Enterprise Client');
  });

  it('should create, update and delete a protected customer from the modal workflows', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openUpdateModal(customerId: string): void;
      openDeleteModal(customerId: string): void;
      updateSlug(value: string): void;
      updateName(value: string): void;
      updateSummaryPt(value: string): void;
      updateSummaryEn(value: string): void;
      updateHighlight(value: boolean): void;
      updateSortOrder(value: string): void;
      updatePublication(value: boolean): void;
      toggleExperience(experienceId: string): void;
      toggleImageAsset(imageAssetId: string): void;
      submitModal(): Promise<void>;
    };

    component.openCreateModal();
    component.updateSlug('startup-client');
    component.updateName('Startup Client');
    component.updateSummaryPt('Cliente startup');
    component.updateSummaryEn('Startup client');
    component.updateHighlight(false);
    component.updateSortOrder('2');
    component.updatePublication(false);
    component.toggleExperience('experience-1');
    component.toggleImageAsset('image-asset-1');
    await component.submitModal();

    expect(customersOperationsService.create).toHaveBeenCalledWith('token-123', {
      slug: 'startup-client',
      name: 'Startup Client',
      summaryPt: 'Cliente startup',
      summaryEn: 'Startup client',
      highlight: false,
      sortOrder: 2,
      isPublished: false,
      experienceIds: ['experience-1'],
      imageAssetIds: ['image-asset-1'],
    });

    component.openUpdateModal('customer-1');
    component.updateName('Enterprise Client Updated');
    await component.submitModal();

    expect(customersOperationsService.update).toHaveBeenCalledWith('token-123', 'customer-1', {
      slug: 'enterprise-client',
      name: 'Enterprise Client Updated',
      summaryPt: 'Cliente corporativo',
      summaryEn: 'Corporate client',
      highlight: true,
      sortOrder: 1,
      isPublished: true,
      experienceIds: ['experience-1'],
      imageAssetIds: ['image-asset-1'],
    });

    component.openDeleteModal('customer-1');
    await component.submitModal();

    expect(customersOperationsService.delete).toHaveBeenCalledWith('token-123', 'customer-1');
  });

  it('should expose the modal titles for every workflow and open the read modal', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openReadModal(): void;
      openUpdatePickerModal(): void;
      openDeletePickerModal(): void;
      openUpdateModal(customerId: string): void;
      openDeleteModal(customerId: string): void;
      closeModal(): void;
      modalTitleKey(): string;
      modalMode(): string | null;
    };

    component.openCreateModal();
    expect(component.modalTitleKey()).toBe('pages.admin.customers.modal.create.title');

    component.openReadModal();
    fixture.detectChanges();
    expect(component.modalTitleKey()).toBe('pages.admin.customers.modal.read.title');
    expect(fixture.nativeElement.textContent).toContain('Enterprise Client');
    expect(fixture.nativeElement.textContent).toContain('Corporate client');
    expect(fixture.nativeElement.textContent).toContain('ford.svg (ICON)');

    component.openUpdatePickerModal();
    expect(component.modalTitleKey()).toBe('pages.admin.customers.modal.pickUpdate.title');

    component.openDeletePickerModal();
    expect(component.modalTitleKey()).toBe('pages.admin.customers.modal.pickDelete.title');

    component.openUpdateModal('customer-1');
    expect(component.modalTitleKey()).toBe('pages.admin.customers.modal.update.title');

    component.openDeleteModal('customer-1');
    expect(component.modalTitleKey()).toBe('pages.admin.customers.modal.delete.title');

    component.closeModal();
    component.openUpdateModal('missing-customer');
    expect(component.modalMode()).toBeNull();

    component.openDeleteModal('missing-customer');
    expect(component.modalMode()).toBeNull();
  });

  it('should support paging and relation deselection inside the modal workflows', async () => {
    customersOperationsService.getAll.and.returnValues(
      of(createCollectionResponse()),
      of(
        createCollectionResponse(
          [createCustomer({ id: 'customer-search', slug: 'search-hit' })],
          1,
        ),
      ),
      of(createCollectionResponse([createCustomer({ id: 'customer-2', slug: 'page-2-hit' })], 2)),
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

    expect(customersOperationsService.getAll).toHaveBeenCalledTimes(3);
    expect(customersOperationsService.getAll).toHaveBeenCalledWith(2, 5, '');
    expect(customersOperationsService.getAll).toHaveBeenCalledWith(1, 5, 'search');

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
      updateName(value: string): void;
      updateSummaryPt(value: string): void;
      updateSummaryEn(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    component.openCreateModal();
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.customers.feedback.requiredSlug');

    component.updateSlug('enterprise-client');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.customers.feedback.requiredName');

    component.updateName('Enterprise Client');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.customers.feedback.requiredSummaryPt');

    component.updateSummaryPt('Cliente corporativo');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.customers.feedback.requiredSummaryEn');

    component.updateSummaryEn('Corporate client');
    component.updateSortOrder('abc');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.customers.feedback.invalidSortOrder');

    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [CustomersOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: CustomersOperationsService,
          useValue: customersOperationsService,
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

    const missingSessionFixture = TestBed.createComponent(CustomersOperationsComponent);
    await settleWorkspace(missingSessionFixture);

    const missingSessionComponent = missingSessionFixture.componentInstance as unknown as {
      openCreateModal(): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    missingSessionComponent.openCreateModal();
    await missingSessionComponent.submitModal();

    expect(missingSessionComponent.modalFeedbackKey()).toBe(
      'pages.admin.customers.feedback.missingSession',
    );
  });

  it('should expose modal feedback for selection, save and delete failures', async () => {
    await settleWorkspace(fixture);

    customersOperationsService.create.and.returnValue(
      throwError(() => new Error('Unable to create customer')),
    );
    customersOperationsService.update.and.returnValue(
      throwError(() => new Error('Unable to update customer')),
    );
    customersOperationsService.delete.and.returnValue(
      throwError(() => new Error('Unable to delete customer')),
    );

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openDeleteModal(customerId: string): void;
      updateSlug(value: string): void;
      updateName(value: string): void;
      updateSummaryPt(value: string): void;
      updateSummaryEn(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
      modalModeSignal: { set(value: string): void };
    };

    component.modalModeSignal.set('update');
    component.updateSlug('enterprise-client');
    component.updateName('Enterprise Client');
    component.updateSummaryPt('Cliente corporativo');
    component.updateSummaryEn('Corporate client');
    component.updateSortOrder('1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.customers.feedback.selectionRequired');

    component.modalModeSignal.set('delete');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.customers.feedback.selectionRequired');

    component.openCreateModal();
    component.updateSlug('startup-client');
    component.updateName('Startup Client');
    component.updateSummaryPt('Cliente startup');
    component.updateSummaryEn('Startup client');
    component.updateSortOrder('2');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.customers.feedback.saveError');

    component.openDeleteModal('customer-1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.customers.feedback.deleteError');
  });

  it('should expose trackBy and move deletion reload to the previous page when removing the last item', async () => {
    TestBed.resetTestingModule();
    customersOperationsService.getAll.and.returnValues(
      of(createCollectionResponse([createCustomer()], 2)),
      of(createCollectionResponse([], 1)),
    );

    await TestBed.configureTestingModule({
      imports: [CustomersOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: CustomersOperationsService,
          useValue: customersOperationsService,
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

    const pagedFixture = TestBed.createComponent(CustomersOperationsComponent);
    await settleWorkspace(pagedFixture);

    const pagedComponent = pagedFixture.componentInstance as unknown as {
      openDeleteModal(customerId: string): void;
      submitModal(): Promise<void>;
      trackById(index: number, item: { id: string }): string;
    };

    expect(pagedComponent.trackById(0, { id: 'customer-1' })).toBe('customer-1');

    pagedComponent.openDeleteModal('customer-1');
    await pagedComponent.submitModal();

    expect(customersOperationsService.getAll).toHaveBeenCalledWith(1, 5, '');
  });

  it('should render empty and load error states and keep read disabled without customers', async () => {
    TestBed.resetTestingModule();
    customersOperationsService.getAll.and.returnValue(of(createCollectionResponse([])));

    await TestBed.configureTestingModule({
      imports: [CustomersOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: CustomersOperationsService,
          useValue: customersOperationsService,
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

    const emptyFixture = TestBed.createComponent(CustomersOperationsComponent);
    await settleWorkspace(emptyFixture);

    const emptyComponent = emptyFixture.componentInstance as unknown as {
      openReadModal(): void;
      modalMode(): string | null;
      hasCustomers(): boolean;
      loadErrorKey(): string | null;
    };

    expect(emptyComponent.hasCustomers()).toBeFalse();
    expect(emptyComponent.loadErrorKey()).toBeNull();

    emptyComponent.openReadModal();
    expect(emptyComponent.modalMode()).toBeNull();

    TestBed.resetTestingModule();
    customersOperationsService.getAll.and.returnValue(
      throwError(() => new Error('Unable to load customers')),
    );

    await TestBed.configureTestingModule({
      imports: [CustomersOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: CustomersOperationsService,
          useValue: customersOperationsService,
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

    const errorFixture = TestBed.createComponent(CustomersOperationsComponent);
    await settleWorkspace(errorFixture);

    const errorComponent = errorFixture.componentInstance as unknown as {
      loadErrorKey(): string | null;
    };

    expect(errorComponent.loadErrorKey()).toBe('pages.admin.customers.feedback.loadError');
  });

  it('should ignore submit requests when no modal workflow is active', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      submitModal(): Promise<void>;
    };

    await component.submitModal();

    expect(customersOperationsService.create).not.toHaveBeenCalled();
    expect(customersOperationsService.update).not.toHaveBeenCalled();
    expect(customersOperationsService.delete).not.toHaveBeenCalled();
  });
});
