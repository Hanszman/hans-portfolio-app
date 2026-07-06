import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AdminPortfolioSettingsApiService } from '../../../../core/api/admin-portfolio-settings/admin-portfolio-settings-api.service';
import { AdminPortfolioSettingRecord } from '../../../../core/api/admin-portfolio-settings/admin-portfolio-settings-api.types';
import { AdminSessionService } from '../../../../core/admin-session/admin-session.service';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { AdminPortfolioSettingsWorkspaceComponent } from './admin-portfolio-settings-workspace.component';

const createSetting = (
  overrides: Partial<AdminPortfolioSettingRecord> = {},
): AdminPortfolioSettingRecord => ({
  id: 'setting-1',
  key: 'hero.metrics',
  value: {
    projects: 12,
  },
  description: 'Controls the highlighted portfolio metrics.',
  ...overrides,
});

describe('AdminPortfolioSettingsWorkspaceComponent', () => {
  let fixture: ComponentFixture<AdminPortfolioSettingsWorkspaceComponent>;
  let apiService: jasmine.SpyObj<AdminPortfolioSettingsApiService>;

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
    apiService = jasmine.createSpyObj<AdminPortfolioSettingsApiService>(
      'AdminPortfolioSettingsApiService',
      ['getAll', 'create', 'update', 'delete'],
    );
    apiService.getAll.and.returnValue(of([createSetting()]));
    apiService.create.and.returnValue(of(createSetting()));
    apiService.update.and.returnValue(of(createSetting()));
    apiService.delete.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      imports: [AdminPortfolioSettingsWorkspaceComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: AdminPortfolioSettingsApiService,
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

    fixture = TestBed.createComponent(AdminPortfolioSettingsWorkspaceComponent);
  });

  it('should load and render the protected portfolio settings workspace', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(apiService.getAll).toHaveBeenCalledWith('token-123');
    expect(compiled.textContent).toContain('Portfolio settings operations');
    expect(compiled.textContent).toContain('hero.metrics');
    expect(compiled.textContent).toContain('Controls the highlighted portfolio metrics.');
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

  it('should expose the missing-session feedback when the access token is unavailable', async () => {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [AdminPortfolioSettingsWorkspaceComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: AdminPortfolioSettingsApiService,
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
      AdminPortfolioSettingsWorkspaceComponent,
    );
    missingSessionFixture.detectChanges();
    await missingSessionFixture.whenStable();
    missingSessionFixture.detectChanges();

    expect(missingSessionFixture.nativeElement.textContent).toContain(
      'The authenticated admin session is unavailable. Log in again to continue.',
    );
  });

  it('should block submit when the authenticated session is unavailable', async () => {
    TestBed.resetTestingModule();

    await TestBed.configureTestingModule({
      imports: [AdminPortfolioSettingsWorkspaceComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        {
          provide: AdminPortfolioSettingsApiService,
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
      AdminPortfolioSettingsWorkspaceComponent,
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
});
