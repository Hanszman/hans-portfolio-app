import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { PortfolioSettingOperationsViewModel } from '../../portfolio-settings-operations.types';
import { PortfolioSettingsOperationsModalComponent } from './portfolio-settings-operations-modal.component';

const SETTINGS: readonly PortfolioSettingOperationsViewModel[] = [
  {
    id: 'setting-1',
    key: 'branding',
    description: 'Branding assets.',
    formattedValue: '{\n  "logo": "vh"\n}',
  },
];

describe('PortfolioSettingsOperationsModalComponent', () => {
  let fixture: ComponentFixture<PortfolioSettingsOperationsModalComponent>;

  beforeAll(() => {
    for (const elementName of [
      'hans-button',
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
    await TestBed.configureTestingModule({
      imports: [PortfolioSettingsOperationsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioSettingsOperationsModalComponent);
  });

  it('should render the create form and emit the form workflow events', () => {
    const component = fixture.componentInstance;
    const keySpy = jasmine.createSpy('keyChanged');
    const descriptionSpy = jasmine.createSpy('descriptionChanged');
    const valueSpy = jasmine.createSpy('valueTextChanged');
    const pageSpy = jasmine.createSpy('pageSelected');
    const submitSpy = jasmine.createSpy('submitted');
    const closeSpy = jasmine.createSpy('closed');

    component.keyChanged.subscribe(keySpy);
    component.descriptionChanged.subscribe(descriptionSpy);
    component.valueTextChanged.subscribe(valueSpy);
    component.pageSelected.subscribe(pageSpy);
    component.submitted.subscribe(submitSpy);
    component.closed.subscribe(closeSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'create');
    fixture.componentRef.setInput('pagination', {
      page: 1,
      pageSize: 6,
      totalItems: 2,
      totalPages: 2,
      hasPreviousPage: false,
      hasNextPage: true,
    });
    fixture.detectChanges();

    const componentAccess = component as unknown as {
      emitKeyChange(value: string): void;
      emitDescriptionChange(value: string): void;
      emitValueTextChange(value: string): void;
      selectPage(page: number): void;
      submit(): void;
      requestClose(): void;
    };

    componentAccess.emitKeyChange('profile');
    componentAccess.emitDescriptionChange('Profile assets.');
    componentAccess.emitValueTextChange('{ "avatar": true }');
    componentAccess.selectPage(2);
    componentAccess.submit();
    componentAccess.requestClose();

    expect(fixture.nativeElement.textContent).toContain('Save');
    expect(keySpy).toHaveBeenCalledOnceWith('profile');
    expect(descriptionSpy).toHaveBeenCalledOnceWith('Profile assets.');
    expect(valueSpy).toHaveBeenCalledOnceWith('{ "avatar": true }');
    expect(pageSpy).toHaveBeenCalledOnceWith(2);
    expect(submitSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the picker and read flows and emit selection events', () => {
    const component = fixture.componentInstance;
    const updateSpy = jasmine.createSpy('updateSelected');
    const deleteSpy = jasmine.createSpy('deleteSelected');

    component.updateSelected.subscribe(updateSpy);
    component.deleteSelected.subscribe(deleteSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('settings', SETTINGS);
    fixture.componentRef.setInput('modalMode', 'read');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('branding');

    fixture.componentRef.setInput('modalMode', 'pick-update');
    fixture.detectChanges();

    (
      component as unknown as {
        selectSettingForUpdate(settingId: string): void;
        selectSettingForDelete(settingId: string): void;
        trackSettingById(index: number, setting: { id: string }): string;
      }
    ).selectSettingForUpdate('setting-1');

    expect(updateSpy).toHaveBeenCalledOnceWith('setting-1');

    fixture.componentRef.setInput('modalMode', 'pick-delete');
    fixture.detectChanges();

    (
      component as unknown as {
        selectSettingForDelete(settingId: string): void;
        trackSettingById(index: number, setting: { id: string }): string;
      }
    ).selectSettingForDelete('setting-1');

    expect(deleteSpy).toHaveBeenCalledOnceWith('setting-1');
    expect(
      (
        component as unknown as {
          trackSettingById(index: number, setting: { id: string }): string;
        }
      ).trackSettingById(0, { id: 'setting-1' }),
    ).toBe('setting-1');
  });

  it('should render the delete confirmation summary', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'delete');
    fixture.componentRef.setInput('selectedSetting', {
      id: 'setting-1',
      key: 'branding',
      description: 'Branding assets.',
      value: {
        logo: 'vh',
      },
    });
    fixture.componentRef.setInput(
      'feedbackKey',
      'pages.admin.portfolioSettings.feedback.saveError',
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'This action permanently removes the selected protected setting from the portfolio configuration.',
    );
    expect(fixture.nativeElement.textContent).toContain('Branding assets.');
  });
});
