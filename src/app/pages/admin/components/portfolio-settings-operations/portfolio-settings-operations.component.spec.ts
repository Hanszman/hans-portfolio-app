import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PortfolioSettingsOperationsService } from '../../../../core/api/admin/portfolio-settings/portfolio-settings-operations.service';
import { PortfolioSettingRecord } from '../../../../core/api/admin/portfolio-settings/portfolio-settings-operations.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { ToastService } from '../../../../core/toast/toast.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { createAdminEntityEndpointLabel } from '../../admin.types';
import { PortfolioSettingsOperationsComponent } from './portfolio-settings-operations.component';

const createSetting = (
  overrides: Partial<PortfolioSettingRecord> = {},
): PortfolioSettingRecord => ({
  id: 'setting-1',
  key: 'hero.metrics',
  value: {
    projects: 12,
  },
  description: 'Controls the highlighted portfolio metrics.',
  ...overrides,
});

const createCollectionResponse = (
  data: PortfolioSettingRecord[] = [createSetting()],
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

describe('PortfolioSettingsOperationsComponent', () => {
  let fixture: ComponentFixture<PortfolioSettingsOperationsComponent>;
  let operationsService: jasmine.SpyObj<PortfolioSettingsOperationsService>;
  let toastService: jasmine.SpyObj<ToastService>;

  const settleWorkspace = async (
    currentFixture: ComponentFixture<PortfolioSettingsOperationsComponent>,
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
    ]) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    operationsService = jasmine.createSpyObj<PortfolioSettingsOperationsService>(
      'PortfolioSettingsOperationsService',
      ['getAll', 'create', 'update', 'delete'],
    );
    toastService = jasmine.createSpyObj<ToastService>('ToastService', ['showSuccess', 'showError']);
    operationsService.getAll.and.returnValue(of(createCollectionResponse()));
    operationsService.create.and.returnValue(of(createSetting()));
    operationsService.update.and.returnValue(of(createSetting()));
    operationsService.delete.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      imports: [PortfolioSettingsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: PortfolioSettingsOperationsService,
          useValue: operationsService,
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

    fixture = TestBed.createComponent(PortfolioSettingsOperationsComponent);
  });

  it('should load and render the protected portfolio settings workspace', async () => {
    await settleWorkspace(fixture);

    const compiled = fixture.nativeElement as HTMLElement;

    expect(operationsService.getAll).toHaveBeenCalledWith(1, 5);
    expect(compiled.textContent).toContain('Portfolio settings');
    expect(compiled.textContent).toContain(
      createAdminEntityEndpointLabel('/portfolio-settings'),
    );
    expect(compiled.textContent).toContain('Create');
    expect(compiled.textContent).toContain('Read');
    expect(compiled.textContent).toContain('Update');
    expect(compiled.textContent).toContain('Delete');
    expect(compiled.textContent).not.toContain('hero.metrics');
  });

  it('should create a portfolio setting from the modal form', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      updateKey(value: string): void;
      updateDescription(value: string): void;
      updateValueText(value: string): void;
      submitModal(): Promise<void>;
    };

    component.openCreateModal();
    component.updateKey('hero.banner');
    component.updateDescription('Controls the hero banner payload.');
    component.updateValueText('{ "headline": "Hello" }');

    await component.submitModal();
    fixture.detectChanges();

    expect(operationsService.create).toHaveBeenCalledWith('token-123', {
      key: 'hero.banner',
      description: 'Controls the hero banner payload.',
      value: {
        headline: 'Hello',
      },
    });
    expect(toastService.showSuccess).toHaveBeenCalledWith(
      'pages.admin.portfolioSettings.feedback.created',
    );
  });

  it('should update and delete selected portfolio settings', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openUpdateModal(settingId: string): void;
      updateDescription(value: string): void;
      openDeleteModal(settingId: string): void;
      submitModal(): Promise<void>;
    };

    component.openUpdateModal('setting-1');
    component.updateDescription('Updated description');
    await component.submitModal();

    expect(operationsService.update).toHaveBeenCalledWith('token-123', 'setting-1', {
      key: 'hero.metrics',
      description: 'Updated description',
      value: {
        projects: 12,
      },
    });

    component.openDeleteModal('setting-1');
    await component.submitModal();

    expect(operationsService.delete).toHaveBeenCalledWith('token-123', 'setting-1');
  });

  it('should expose the modal titles for every workflow and open the read modal', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openReadModal(): void;
      openUpdatePickerModal(): void;
      openDeletePickerModal(): void;
      openUpdateModal(settingId: string): void;
      openDeleteModal(settingId: string): void;
      closeModal(): void;
      modalTitleKey(): string;
      modalMode(): string | null;
    };

    component.openCreateModal();
    expect(component.modalTitleKey()).toBe('pages.admin.portfolioSettings.modal.create.title');

    component.openReadModal();
    fixture.detectChanges();
    expect(component.modalTitleKey()).toBe('pages.admin.portfolioSettings.modal.read.title');
    expect(fixture.nativeElement.textContent).toContain('hero.metrics');

    component.openUpdatePickerModal();
    expect(component.modalTitleKey()).toBe('pages.admin.portfolioSettings.modal.pickUpdate.title');

    component.openDeletePickerModal();
    expect(component.modalTitleKey()).toBe('pages.admin.portfolioSettings.modal.pickDelete.title');

    component.openUpdateModal('setting-1');
    expect(component.modalTitleKey()).toBe('pages.admin.portfolioSettings.modal.update.title');

    component.openDeleteModal('setting-1');
    expect(component.modalTitleKey()).toBe('pages.admin.portfolioSettings.modal.delete.title');

    component.closeModal();
    component.openUpdateModal('missing-setting');
    expect(component.modalMode()).toBeNull();

    component.openDeleteModal('missing-setting');
    expect(component.modalMode()).toBeNull();
  });

  it('should support modal paging and block invalid paging requests', async () => {
    operationsService.getAll.and.returnValues(
      of(createCollectionResponse()),
      of(createCollectionResponse([createSetting({ id: 'setting-2', key: 'zeta' })], 2)),
    );

    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      goToPage(page: number): Promise<void>;
    };

    await component.goToPage(2);
    await component.goToPage(2);
    await component.goToPage(99);

    expect(operationsService.getAll).toHaveBeenCalledTimes(2);
    expect(operationsService.getAll).toHaveBeenCalledWith(2, 5);
  });

  it('should prevent save when validation fails or the admin session is unavailable', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      updateKey(value: string): void;
      updateValueText(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    component.openCreateModal();
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.portfolioSettings.feedback.requiredKey');

    component.updateKey('hero.banner');
    component.updateValueText('{ invalid }');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.portfolioSettings.feedback.invalidJson');

    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [PortfolioSettingsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: PortfolioSettingsOperationsService, useValue: operationsService },
        { provide: ToastService, useValue: toastService },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => null,
          },
        },
      ],
    }).compileComponents();

    const missingSessionFixture = TestBed.createComponent(PortfolioSettingsOperationsComponent);
    await settleWorkspace(missingSessionFixture);

    const missingSessionComponent = missingSessionFixture.componentInstance as unknown as {
      openCreateModal(): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
    };

    missingSessionComponent.openCreateModal();
    await missingSessionComponent.submitModal();

    expect(missingSessionComponent.modalFeedbackKey()).toBe(
      'pages.admin.portfolioSettings.feedback.missingSession',
    );
  });

  it('should expose modal feedback for selection, save and delete failures', async () => {
    await settleWorkspace(fixture);

    operationsService.create.and.returnValue(
      throwError(() => new Error('Unable to create setting')),
    );
    operationsService.update.and.returnValue(
      throwError(() => new Error('Unable to update setting')),
    );
    operationsService.delete.and.returnValue(
      throwError(() => new Error('Unable to delete setting')),
    );

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openDeleteModal(settingId: string): void;
      updateKey(value: string): void;
      updateValueText(value: string): void;
      submitModal(): Promise<void>;
      modalFeedbackKey(): string | null;
      modalModeSignal: { set(value: string): void };
    };

    component.modalModeSignal.set('update');
    component.updateKey('hero.metrics');
    component.updateValueText('{ "projects": 12 }');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.portfolioSettings.feedback.selectionRequired',
    );

    component.modalModeSignal.set('delete');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe(
      'pages.admin.portfolioSettings.feedback.selectionRequired',
    );

    component.openCreateModal();
    component.updateKey('hero.banner');
    component.updateValueText('{ "headline": "Hello" }');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.portfolioSettings.feedback.saveError');

    component.openDeleteModal('setting-1');
    await component.submitModal();
    expect(component.modalFeedbackKey()).toBe('pages.admin.portfolioSettings.feedback.deleteError');
  });

  it('should expose trackBy and move deletion reload to the previous page when removing the last item', async () => {
    TestBed.resetTestingModule();
    operationsService.getAll.and.returnValues(
      of(createCollectionResponse([createSetting()], 2)),
      of(createCollectionResponse([], 1)),
    );

    await TestBed.configureTestingModule({
      imports: [PortfolioSettingsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: PortfolioSettingsOperationsService, useValue: operationsService },
        { provide: ToastService, useValue: toastService },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    const pagedFixture = TestBed.createComponent(PortfolioSettingsOperationsComponent);
    await settleWorkspace(pagedFixture);

    const pagedComponent = pagedFixture.componentInstance as unknown as {
      openDeleteModal(settingId: string): void;
      submitModal(): Promise<void>;
      trackSettingById(index: number, setting: { id: string }): string;
    };

    expect(pagedComponent.trackSettingById(0, { id: 'setting-1' })).toBe('setting-1');

    pagedComponent.openDeleteModal('setting-1');
    await pagedComponent.submitModal();

    expect(operationsService.getAll).toHaveBeenCalledWith(1, 5);
  });

  it('should render empty and load error states and keep read disabled without data', async () => {
    TestBed.resetTestingModule();
    operationsService.getAll.and.returnValue(of(createCollectionResponse([])));

    await TestBed.configureTestingModule({
      imports: [PortfolioSettingsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: PortfolioSettingsOperationsService, useValue: operationsService },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    const emptyFixture = TestBed.createComponent(PortfolioSettingsOperationsComponent);
    await settleWorkspace(emptyFixture);
    expect(emptyFixture.nativeElement.textContent).toContain(
      'No protected portfolio setting has been registered yet.',
    );

    const emptyComponent = emptyFixture.componentInstance as unknown as {
      openReadModal(): void;
      modalMode(): string | null;
    };

    emptyComponent.openReadModal();
    expect(emptyComponent.modalMode()).toBeNull();

    TestBed.resetTestingModule();
    operationsService.getAll.and.returnValue(
      throwError(() => new Error('Unable to load settings')),
    );

    await TestBed.configureTestingModule({
      imports: [PortfolioSettingsOperationsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        { provide: PortfolioSettingsOperationsService, useValue: operationsService },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    const errorFixture = TestBed.createComponent(PortfolioSettingsOperationsComponent);
    await settleWorkspace(errorFixture);

    expect(errorFixture.nativeElement.textContent).toContain(
      'The protected portfolio settings collection could not be loaded right now.',
    );
  });

  it('should ignore submit requests when no modal workflow is active', async () => {
    await settleWorkspace(fixture);

    const component = fixture.componentInstance as unknown as {
      submitModal(): Promise<void>;
    };

    await component.submitModal();

    expect(operationsService.create).not.toHaveBeenCalled();
    expect(operationsService.update).not.toHaveBeenCalled();
    expect(operationsService.delete).not.toHaveBeenCalled();
  });
});
