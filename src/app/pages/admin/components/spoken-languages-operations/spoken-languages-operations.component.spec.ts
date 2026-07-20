import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ImageAssetsOperationsService } from '../../../../core/api/admin/image-assets/image-assets-operations.service';
import { ImageAssetRecord } from '../../../../core/api/admin/image-assets/image-assets-operations.types';
import { SpokenLanguagesOperationsService } from '../../../../core/api/admin/spoken-languages/spoken-languages-operations.service';
import { SpokenLanguageRecord } from '../../../../core/api/admin/spoken-languages/spoken-languages-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { createAdminEntityEndpointLabel } from '../../admin.types';
import { SpokenLanguagesOperationsComponent } from './spoken-languages-operations.component';

const createSpokenLanguage = (
  overrides: Partial<SpokenLanguageRecord> = {},
): SpokenLanguageRecord => ({
  id: 'spoken-language-1',
  code: 'en',
  namePt: 'Ingles',
  nameEn: 'English',
  proficiency: 'FLUENT',
  highlight: true,
  sortOrder: 1,
  imageAssetIds: ['image-asset-1'],
  imageAssets: [],
  ...overrides,
});

const createImageAsset = (
  overrides: Partial<ImageAssetRecord> = {},
): ImageAssetRecord => ({
  id: 'image-asset-1',
  fileName: 'english-flag.svg',
  filePath: '/assets/img/languages/english-flag.svg',
  folder: 'languages',
  kind: 'ICON',
  altPt: 'Bandeira da Inglaterra',
  altEn: 'English flag',
  captionPt: 'Bandeira do idioma ingles.',
  captionEn: 'English language flag.',
  mimeType: 'image/svg+xml',
  width: 128,
  height: 128,
  sortOrder: 1,
  isPublished: true,
  projectIds: [],
  experienceIds: [],
  technologyIds: [],
  formationIds: [],
  spokenLanguageIds: ['spoken-language-1'],
  customerIds: [],
  jobIds: [],
  ...overrides,
});

const createCollectionResponse = (
  data: SpokenLanguageRecord[] = [createSpokenLanguage()],
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

describe('SpokenLanguagesOperationsComponent', () => {
  let fixture: ComponentFixture<SpokenLanguagesOperationsComponent>;
  let spokenLanguagesOperationsService: jasmine.SpyObj<SpokenLanguagesOperationsService>;
  let imageAssetsOperationsService: jasmine.SpyObj<ImageAssetsOperationsService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let adminSessionServiceMock: {
    accessToken: jasmine.Spy<() => string | null>;
  };

  const settleWorkspace = async (
    currentFixture: ComponentFixture<SpokenLanguagesOperationsComponent>,
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
    spokenLanguagesOperationsService =
      jasmine.createSpyObj<SpokenLanguagesOperationsService>(
        'SpokenLanguagesOperationsService',
        ['getAll', 'create', 'update', 'delete'],
      );
    imageAssetsOperationsService =
      jasmine.createSpyObj<ImageAssetsOperationsService>(
        'ImageAssetsOperationsService',
        ['getAll'],
      );
    toastService = jasmine.createSpyObj<ToastService>('ToastService', [
      'showSuccess',
      'showError',
    ]);
    adminSessionServiceMock = {
      accessToken: jasmine.createSpy<() => string | null>('accessToken').and.returnValue(
        'token-123',
      ),
    };

    spokenLanguagesOperationsService.getAll.and.returnValue(
      of(createCollectionResponse()),
    );
    spokenLanguagesOperationsService.create.and.returnValue(
      of(createSpokenLanguage()),
    );
    spokenLanguagesOperationsService.update.and.returnValue(
      of(createSpokenLanguage()),
    );
    spokenLanguagesOperationsService.delete.and.returnValue(of(void 0));
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
      imports: [SpokenLanguagesOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: SpokenLanguagesOperationsService,
          useValue: spokenLanguagesOperationsService,
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

    fixture = TestBed.createComponent(SpokenLanguagesOperationsComponent);
  });

  it('should load and render the protected spoken-languages workspace', async () => {
    await settleWorkspace(fixture);

    const compiled = fixture.nativeElement as HTMLElement;

    expect(spokenLanguagesOperationsService.getAll).toHaveBeenCalledWith(1, 5, '');
    expect(imageAssetsOperationsService.getAll).toHaveBeenCalledWith(1, 100);
    expect(compiled.textContent).toContain('Spoken languages');
    expect(compiled.textContent).toContain(
      createAdminEntityEndpointLabel('/spoken-languages'),
    );
    expect(compiled.textContent).toContain('Create');
    expect(compiled.textContent).toContain('Read');
    expect(compiled.textContent).toContain('Update');
    expect(compiled.textContent).toContain('Delete');
    expect(compiled.textContent).not.toContain('English');
  });

  it('should create, update and delete a protected spoken language from the modal workflows', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openUpdateModal(spokenLanguageId: string): void;
      openDeleteModal(spokenLanguageId: string): void;
      updateCode(value: string): void;
      updateNamePt(value: string): void;
      updateNameEn(value: string): void;
      updateProficiency(value: string): void;
      updateHighlight(value: boolean): void;
      updateSortOrder(value: string): void;
      toggleImageAsset(imageAssetId: string): void;
      submitModal(): Promise<void>;
    };

    component.openCreateModal();
    component.updateCode('pt');
    component.updateNamePt('Portugues');
    component.updateNameEn('Portuguese');
    component.updateProficiency('NATIVE');
    component.updateHighlight(false);
    component.updateSortOrder('2');
    component.toggleImageAsset('image-asset-1');
    await component.submitModal();

    expect(spokenLanguagesOperationsService.create).toHaveBeenCalledWith(
      'token-123',
      {
        code: 'pt',
        namePt: 'Portugues',
        nameEn: 'Portuguese',
        proficiency: 'NATIVE',
        highlight: false,
        sortOrder: 2,
        imageAssetIds: ['image-asset-1'],
      },
    );

    component.openUpdateModal('spoken-language-1');
    component.updateNamePt('Ingles atualizado');
    await component.submitModal();

    expect(spokenLanguagesOperationsService.update).toHaveBeenCalledWith(
      'token-123',
      'spoken-language-1',
      {
        code: 'en',
        namePt: 'Ingles atualizado',
        nameEn: 'English',
        proficiency: 'FLUENT',
        highlight: true,
        sortOrder: 1,
        imageAssetIds: ['image-asset-1'],
      },
    );

    component.openDeleteModal('spoken-language-1');
    await component.submitModal();

    expect(spokenLanguagesOperationsService.delete).toHaveBeenCalledWith(
      'token-123',
      'spoken-language-1',
    );
  });

  it('should expose the modal titles for every workflow and open the read modal', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openReadModal(): void;
      openUpdatePickerModal(): void;
      openDeletePickerModal(): void;
      openUpdateModal(spokenLanguageId: string): void;
      openDeleteModal(spokenLanguageId: string): void;
      closeModal(): void;
      modalTitleKey(): string;
      modalMode(): string | null;
    };

    component.openCreateModal();
    expect(component.modalTitleKey()).toBe(
      'pages.admin.spokenLanguages.modal.create.title',
    );

    component.openReadModal();
    fixture.detectChanges();
    expect(component.modalTitleKey()).toBe(
      'pages.admin.spokenLanguages.modal.read.title',
    );
    expect(fixture.nativeElement.textContent).toContain('English');
    expect(fixture.nativeElement.textContent).toContain('FLUENT');
    expect(fixture.nativeElement.textContent).toContain('english-flag.svg');

    component.openUpdatePickerModal();
    expect(component.modalTitleKey()).toBe(
      'pages.admin.spokenLanguages.modal.pickUpdate.title',
    );

    component.openDeletePickerModal();
    expect(component.modalTitleKey()).toBe(
      'pages.admin.spokenLanguages.modal.pickDelete.title',
    );

    component.openUpdateModal('spoken-language-1');
    expect(component.modalTitleKey()).toBe(
      'pages.admin.spokenLanguages.modal.update.title',
    );

    component.openDeleteModal('spoken-language-1');
    expect(component.modalTitleKey()).toBe(
      'pages.admin.spokenLanguages.modal.delete.title',
    );

    component.closeModal();
    component.openUpdateModal('missing-spoken-language');
    expect(component.modalMode()).toBeNull();

    component.openDeleteModal('missing-spoken-language');
    expect(component.modalMode()).toBeNull();
  });

  it('should support paging and image-asset deselection inside the modal workflows', async () => {
    spokenLanguagesOperationsService.getAll.and.returnValues(
      of(createCollectionResponse()),
      of(
        createCollectionResponse(
          [createSpokenLanguage({ id: 'spoken-language-search', code: 'es' })],
          1,
        ),
      ),
      of(
        createCollectionResponse(
          [createSpokenLanguage({ id: 'spoken-language-2', code: 'pt' })],
          2,
        ),
      ),
    );

    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      goToPage(page: number): Promise<void>;
      updateSearchQuery(value: string): Promise<void>;
      openCreateModal(): void;
      toggleImageAsset(imageAssetId: string): void;
      form(): {
        imageAssetIds: readonly string[];
      };
    };

    await component.goToPage(2);
    await component.updateSearchQuery('es');
    await component.updateSearchQuery('es');
    await component.goToPage(2);
    await component.goToPage(99);

    expect(spokenLanguagesOperationsService.getAll).toHaveBeenCalledTimes(3);
    expect(spokenLanguagesOperationsService.getAll).toHaveBeenCalledWith(
      2,
      5,
      '',
    );
    expect(spokenLanguagesOperationsService.getAll).toHaveBeenCalledWith(
      1,
      5,
      'es',
    );

    component.openCreateModal();
    component.toggleImageAsset('image-asset-1');
    component.toggleImageAsset('image-asset-1');

    expect(component.form().imageAssetIds).toEqual([]);
  });

  it('should validate modal input and block unavailable sessions', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      updateCode(value: string): void;
      updateNamePt(value: string): void;
      updateNameEn(value: string): void;
      updateProficiency(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    component.openCreateModal();
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.spokenLanguages.feedback.requiredCode',
    );

    component.updateCode('en');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.spokenLanguages.feedback.requiredNamePt',
    );

    component.updateNamePt('Ingles');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.spokenLanguages.feedback.requiredNameEn',
    );

    component.updateNameEn('English');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.spokenLanguages.feedback.requiredProficiency',
    );

    component.updateProficiency('INVALID');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.spokenLanguages.feedback.invalidProficiency',
    );

    component.updateProficiency('FLUENT');
    component.updateSortOrder('abc');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.spokenLanguages.feedback.invalidSortOrder',
    );

    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [SpokenLanguagesOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: SpokenLanguagesOperationsService,
          useValue: spokenLanguagesOperationsService,
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

    const missingSessionFixture = TestBed.createComponent(
      SpokenLanguagesOperationsComponent,
    );
    await settleWorkspace(missingSessionFixture);

    const missingSessionComponent =
      missingSessionFixture.componentInstance as unknown as {
        openCreateModal(): void;
        submitModal(): Promise<void>;
        modalFeedbackKey(): string | null;
      };

    missingSessionComponent.openCreateModal();
    await missingSessionComponent.submitModal();

    expect(missingSessionComponent.modalFeedbackKey()).toBe(
      'pages.admin.spokenLanguages.feedback.missingSession',
    );
  });

  it('should expose modal feedback for selection, save and delete failures', async () => {
    await settleWorkspace(fixture);

    spokenLanguagesOperationsService.create.and.returnValue(
      throwError(() => new Error('Unable to create spoken language')),
    );
    spokenLanguagesOperationsService.update.and.returnValue(
      throwError(() => new Error('Unable to update spoken language')),
    );
    spokenLanguagesOperationsService.delete.and.returnValue(
      throwError(() => new Error('Unable to delete spoken language')),
    );

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openDeleteModal(spokenLanguageId: string): void;
      updateCode(value: string): void;
      updateNamePt(value: string): void;
      updateNameEn(value: string): void;
      updateProficiency(value: string): void;
      updateSortOrder(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
      modalModeSignal: { set(value: string): void };
    };

    component.modalModeSignal.set('update');
    component.updateCode('en');
    component.updateNamePt('Ingles');
    component.updateNameEn('English');
    component.updateProficiency('FLUENT');
    component.updateSortOrder('1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.spokenLanguages.feedback.selectionRequired',
    );

    component.modalModeSignal.set('delete');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.spokenLanguages.feedback.selectionRequired',
    );

    component.openCreateModal();
    component.updateCode('pt');
    component.updateNamePt('Portugues');
    component.updateNameEn('Portuguese');
    component.updateProficiency('NATIVE');
    component.updateSortOrder('2');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.spokenLanguages.feedback.saveError',
    );

    component.openDeleteModal('spoken-language-1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.spokenLanguages.feedback.deleteError',
    );
  });

  it('should expose trackBy and move deletion reload to the previous page when removing the last item', async () => {
    TestBed.resetTestingModule();
    spokenLanguagesOperationsService.getAll.and.returnValues(
      of(createCollectionResponse([createSpokenLanguage()], 2)),
      of(createCollectionResponse([], 1)),
    );

    await TestBed.configureTestingModule({
      imports: [SpokenLanguagesOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: SpokenLanguagesOperationsService,
          useValue: spokenLanguagesOperationsService,
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

    const pagedFixture = TestBed.createComponent(SpokenLanguagesOperationsComponent);
    await settleWorkspace(pagedFixture);

    const pagedComponent = pagedFixture.componentInstance as unknown as {
      openDeleteModal(spokenLanguageId: string): void;
      submitModal(): Promise<void>;
      trackById(index: number, item: { id: string }): string;
    };

    expect(pagedComponent.trackById(0, { id: 'spoken-language-1' })).toBe(
      'spoken-language-1',
    );

    pagedComponent.openDeleteModal('spoken-language-1');
    await pagedComponent.submitModal();

    expect(spokenLanguagesOperationsService.getAll).toHaveBeenCalledWith(
      1,
      5,
      '',
    );
  });

  it('should render empty and load error states and keep read disabled without spoken languages', async () => {
    TestBed.resetTestingModule();
    spokenLanguagesOperationsService.getAll.and.returnValue(
      of(createCollectionResponse([])),
    );

    await TestBed.configureTestingModule({
      imports: [SpokenLanguagesOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: SpokenLanguagesOperationsService,
          useValue: spokenLanguagesOperationsService,
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

    const emptyFixture = TestBed.createComponent(SpokenLanguagesOperationsComponent);
    await settleWorkspace(emptyFixture);

    const emptyComponent = emptyFixture.componentInstance as unknown as {
      openReadModal(): void;
      modalMode(): string | null;
      hasSpokenLanguages(): boolean;
      loadErrorKey(): string | null;
    };

    expect(emptyComponent.hasSpokenLanguages()).toBeFalse();
    expect(emptyComponent.loadErrorKey()).toBeNull();

    emptyComponent.openReadModal();
    expect(emptyComponent.modalMode()).toBeNull();

    TestBed.resetTestingModule();
    spokenLanguagesOperationsService.getAll.and.returnValue(
      throwError(() => new Error('Unable to load spoken languages')),
    );

    await TestBed.configureTestingModule({
      imports: [SpokenLanguagesOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: SpokenLanguagesOperationsService,
          useValue: spokenLanguagesOperationsService,
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

    const errorFixture = TestBed.createComponent(SpokenLanguagesOperationsComponent);
    await settleWorkspace(errorFixture);

    const errorComponent = errorFixture.componentInstance as unknown as {
      loadErrorKey(): string | null;
    };

    expect(errorComponent.loadErrorKey()).toBe(
      'pages.admin.spokenLanguages.feedback.loadError',
    );
  });

  it('should ignore submit requests when no modal workflow is active', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      submitModal(): Promise<void>;
    };

    await component.submitModal();

    expect(spokenLanguagesOperationsService.create).not.toHaveBeenCalled();
    expect(spokenLanguagesOperationsService.update).not.toHaveBeenCalled();
    expect(spokenLanguagesOperationsService.delete).not.toHaveBeenCalled();
  });
});
