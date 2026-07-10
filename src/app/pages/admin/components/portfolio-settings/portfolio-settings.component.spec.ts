import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PortfolioSettingsApiService } from '../../../../core/api/admin/portfolio-settings/portfolio-settings-api.service';
import { PortfolioSettingRecord } from '../../../../core/api/admin/portfolio-settings/portfolio-settings-api.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { PortfolioSettingsComponent } from './portfolio-settings.component';

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
) => ({
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

describe('PortfolioSettingsComponent', () => {
  let fixture: ComponentFixture<PortfolioSettingsComponent>;
  let apiService: jasmine.SpyObj<PortfolioSettingsApiService>;

  beforeAll(() => {
    for (const elementName of [
      'hans-button',
      'hans-icon',
      'hans-input',
      'hans-loading',
      'hans-modal',
    ]) {
      if (!customElements.get(elementName)) {
        customElements.define(
          elementName,
          class extends HTMLElement {},
        );
      }
    }
  });

  beforeEach(async () => {
    apiService = jasmine.createSpyObj<PortfolioSettingsApiService>(
      'PortfolioSettingsApiService',
      ['getAll', 'create', 'update', 'delete'],
    );
    apiService.getAll.and.returnValue(of(createCollectionResponse()));
    apiService.create.and.returnValue(of(createSetting()));
    apiService.update.and.returnValue(of(createSetting()));
    apiService.delete.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      imports: [PortfolioSettingsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: PortfolioSettingsApiService,
          useValue: apiService,
        },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioSettingsComponent);
  });

  it('should load and render the protected portfolio settings workspace', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(apiService.getAll).toHaveBeenCalled();
    expect(compiled.textContent).toContain('Portfolio settings');
    expect(compiled.textContent).toContain('GET/POST/PATCH/DELETE /portfolio-settings');
    expect(compiled.textContent).toContain('Create');
    expect(compiled.textContent).toContain('Read');
    expect(compiled.textContent).toContain('Update');
    expect(compiled.textContent).toContain('Delete');
    expect(compiled.textContent).not.toContain('Create setting');
    expect(compiled.textContent).not.toContain('hero.metrics');
  });

  it('should create a portfolio setting from the modal form', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

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

    expect(apiService.create).toHaveBeenCalledWith('token-123', {
      key: 'hero.banner',
      description: 'Controls the hero banner payload.',
      value: {
        headline: 'Hello',
      },
    });
    expect(apiService.getAll).toHaveBeenCalledTimes(2);
    expect(fixture.nativeElement.textContent).toContain(
      'Portfolio setting created successfully.',
    );
  });

  it('should update a selected portfolio setting', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance as unknown as {
      openUpdateModal(settingId: string): void;
      updateDescription(value: string): void;
      submitModal(): Promise<void>;
    };

    component.openUpdateModal('setting-1');
    component.updateDescription('Updated description');

    await component.submitModal();

    expect(apiService.update).toHaveBeenCalledWith('token-123', 'setting-1', {
      key: 'hero.metrics',
      description: 'Updated description',
      value: {
        projects: 12,
      },
    });
  });

  it('should delete a selected portfolio setting', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance as unknown as {
      openDeleteModal(settingId: string): void;
      submitModal(): Promise<void>;
    };

    component.openDeleteModal('setting-1');

    await component.submitModal();

    expect(apiService.delete).toHaveBeenCalledWith('token-123', 'setting-1');
  });

  it('should open the picker modals and expose the expected modal titles', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance as unknown as {
      openUpdatePickerModal(): void;
      openDeletePickerModal(): void;
      openUpdateModal(settingId: string): void;
      openDeleteModal(settingId: string): void;
      closeModal(): void;
      modalTitleKey(): string;
      modalMode(): string | null;
    };

    component.openUpdatePickerModal();
    expect(component.modalTitleKey()).toBe(
      'pages.admin.portfolioSettings.modal.pickUpdate.title',
    );

    component.openDeletePickerModal();
    expect(component.modalTitleKey()).toBe(
      'pages.admin.portfolioSettings.modal.pickDelete.title',
    );

    component.openUpdateModal('setting-1');
    expect(component.modalTitleKey()).toBe(
      'pages.admin.portfolioSettings.modal.update.title',
    );

    component.openDeleteModal('setting-1');
    expect(component.modalTitleKey()).toBe(
      'pages.admin.portfolioSettings.modal.delete.title',
    );

    component.closeModal();
    component.openUpdateModal('missing-setting');
    expect(component.modalMode()).toBeNull();

    component.openDeleteModal('missing-setting');
    expect(component.modalMode()).toBeNull();
  });

  it('should prevent save when the JSON payload is invalid', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      updateKey(value: string): void;
      updateValueText(value: string): void;
      submitModal(): Promise<void>;
    };

    component.openCreateModal();
    component.updateKey('hero.banner');
    component.updateValueText('{ invalid }');

    await component.submitModal();
    fixture.detectChanges();

    expect(apiService.create).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain(
      'The JSON value is invalid. Review the structure before submitting.',
    );
  });

  it('should require a setting key before saving', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      submitModal(): Promise<void>;
    };

    component.openCreateModal();
    await component.submitModal();
    fixture.detectChanges();

    expect(apiService.create).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain(
      'The setting key is required before submitting.',
    );
  });

  it('should ignore submit requests when no modal workflow is active', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance as unknown as {
      submitModal(): Promise<void>;
    };

    await component.submitModal();

    expect(apiService.create).not.toHaveBeenCalled();
    expect(apiService.update).not.toHaveBeenCalled();
    expect(apiService.delete).not.toHaveBeenCalled();
  });

  it('should render the empty state when the protected collection has no settings yet', async () => {
    TestBed.resetTestingModule();
    apiService.getAll.and.returnValue(of(createCollectionResponse([])));

    await TestBed.configureTestingModule({
      imports: [PortfolioSettingsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: PortfolioSettingsApiService,
          useValue: apiService,
        },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    const missingSessionFixture = TestBed.createComponent(
      PortfolioSettingsComponent,
    );
    missingSessionFixture.detectChanges();
    await missingSessionFixture.whenStable();
    missingSessionFixture.detectChanges();

    expect(missingSessionFixture.nativeElement.textContent).toContain(
      'No protected portfolio setting has been registered yet.',
    );
  });

  it('should block submit when the authenticated session is unavailable', async () => {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [PortfolioSettingsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: PortfolioSettingsApiService,
          useValue: apiService,
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
      PortfolioSettingsComponent,
    );
    missingSessionFixture.detectChanges();
    await missingSessionFixture.whenStable();

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

  it('should render the load error state when the API request fails', async () => {
    apiService.getAll.and.returnValue(
      throwError(() => new Error('Unable to load settings')),
    );

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'The protected portfolio settings collection could not be loaded right now.',
    );
  });

  it('should expose the selection-required feedback when update or delete flows have no selected setting', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const component = fixture.componentInstance as unknown as {
      updateKey(value: string): void;
      updateValueText(value: string): void;
      submitModal(): Promise<void>;
      feedbackKey(): string | null;
      modalModeSignal: { set(value: string): void };
    };

    component.modalModeSignal.set('update');
    component.updateKey('hero.metrics');
    component.updateValueText('{ "projects": 12 }');

    await component.submitModal();

    expect(component.feedbackKey()).toBe(
      'pages.admin.portfolioSettings.feedback.selectionRequired',
    );

    component.modalModeSignal.set('delete');

    await component.submitModal();

    expect(component.feedbackKey()).toBe(
      'pages.admin.portfolioSettings.feedback.selectionRequired',
    );
  });

  it('should expose the save error feedback when create or update requests fail', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    apiService.create.and.returnValue(
      throwError(() => new Error('Unable to create setting')),
    );
    apiService.update.and.returnValue(
      throwError(() => new Error('Unable to update setting')),
    );

    const component = fixture.componentInstance as unknown as {
      openCreateModal(): void;
      openUpdateModal(settingId: string): void;
      updateKey(value: string): void;
      updateValueText(value: string): void;
      submitModal(): Promise<void>;
      feedbackKey(): string | null;
    };

    component.openCreateModal();
    component.updateKey('hero.banner');
    component.updateValueText('{ "headline": "Hello" }');
    await component.submitModal();

    expect(component.feedbackKey()).toBe(
      'pages.admin.portfolioSettings.feedback.saveError',
    );

    component.openUpdateModal('setting-1');
    await component.submitModal();

    expect(component.feedbackKey()).toBe(
      'pages.admin.portfolioSettings.feedback.saveError',
    );
  });

  it('should expose the delete error feedback when the delete request fails', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    apiService.delete.and.returnValue(
      throwError(() => new Error('Unable to delete setting')),
    );

    const component = fixture.componentInstance as unknown as {
      openDeleteModal(settingId: string): void;
      submitModal(): Promise<void>;
      feedbackKey(): string | null;
    };

    component.openDeleteModal('setting-1');
    await component.submitModal();

    expect(component.feedbackKey()).toBe(
      'pages.admin.portfolioSettings.feedback.deleteError',
    );
  });

  it('should toggle the read view only when protected settings exist', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      toggleReadVisibility(): void;
      isReadVisible(): boolean;
    };

    expect(fixture.nativeElement.textContent).not.toContain('hero.metrics');

    component.toggleReadVisibility();
    fixture.detectChanges();

    expect(component.isReadVisible()).toBeTrue();
    expect(fixture.nativeElement.textContent).toContain('hero.metrics');

    component.toggleReadVisibility();
    fixture.detectChanges();

    expect(component.isReadVisible()).toBeFalse();
    expect(fixture.nativeElement.textContent).not.toContain('hero.metrics');
  });

  it('should keep the read view disabled when there are no settings to display', async () => {
    TestBed.resetTestingModule();
    apiService.getAll.and.returnValue(of(createCollectionResponse([])));

    await TestBed.configureTestingModule({
      imports: [PortfolioSettingsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: PortfolioSettingsApiService,
          useValue: apiService,
        },
        {
          provide: AdminSessionService,
          useValue: {
            accessToken: () => 'token-123',
          },
        },
      ],
    }).compileComponents();

    const emptyFixture = TestBed.createComponent(PortfolioSettingsComponent);
    emptyFixture.detectChanges();
    await emptyFixture.whenStable();

    const component = emptyFixture.componentInstance as unknown as {
      toggleReadVisibility(): void;
      isReadVisible(): boolean;
    };

    component.toggleReadVisibility();

    expect(component.isReadVisible()).toBeFalse();
  });
});
