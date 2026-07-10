import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { PortfolioSettingViewModel } from '../../portfolio-settings.types';
import { PortfolioSettingsModalComponent } from './portfolio-settings-modal.component';

const SETTINGS: readonly PortfolioSettingViewModel[] = [
  {
    id: 'setting-1',
    key: 'branding',
    description: 'Branding assets.',
    formattedValue: '{\n  "logo": "vh"\n}',
  },
];

describe('PortfolioSettingsModalComponent', () => {
  let fixture: ComponentFixture<PortfolioSettingsModalComponent>;

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
      imports: [PortfolioSettingsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioSettingsModalComponent);
  });

  it('should render the create form and emit the form workflow events', () => {
    const component = fixture.componentInstance;
    const keySpy = jasmine.createSpy('keyChanged');
    const descriptionSpy = jasmine.createSpy('descriptionChanged');
    const valueSpy = jasmine.createSpy('valueTextChanged');
    const submitSpy = jasmine.createSpy('submitted');
    const closeSpy = jasmine.createSpy('closed');

    component.keyChanged.subscribe(keySpy);
    component.descriptionChanged.subscribe(descriptionSpy);
    component.valueTextChanged.subscribe(valueSpy);
    component.submitted.subscribe(submitSpy);
    component.closed.subscribe(closeSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'create');
    fixture.componentRef.setInput('form', {
      key: 'branding',
      description: 'Branding assets.',
      valueText: '{ "logo": "vh" }',
    });
    fixture.detectChanges();

    const componentAccess = component as unknown as {
      emitKeyChange(value: string): void;
      emitDescriptionChange(value: string): void;
      emitValueTextChange(value: string): void;
      submit(): void;
      requestClose(): void;
    };

    componentAccess.emitKeyChange('profile');
    componentAccess.emitDescriptionChange('Profile assets.');
    componentAccess.emitValueTextChange('{ "avatar": true }');
    componentAccess.submit();
    componentAccess.requestClose();

    expect(fixture.nativeElement.textContent).toContain('Save setting');
    expect(keySpy).toHaveBeenCalledOnceWith('profile');
    expect(descriptionSpy).toHaveBeenCalledOnceWith('Profile assets.');
    expect(valueSpy).toHaveBeenCalledOnceWith('{ "avatar": true }');
    expect(submitSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should render the picker flows and emit selection events', () => {
    const component = fixture.componentInstance;
    const updateSpy = jasmine.createSpy('updateSelected');
    const deleteSpy = jasmine.createSpy('deleteSelected');

    component.updateSelected.subscribe(updateSpy);
    component.deleteSelected.subscribe(deleteSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('settings', SETTINGS);
    fixture.componentRef.setInput('modalMode', 'pick-update');
    fixture.detectChanges();

    const componentAccess = component as unknown as {
      selectSettingForUpdate(settingId: string): void;
      selectSettingForDelete(settingId: string): void;
      trackSettingById(index: number, setting: { id: string }): string;
    };

    componentAccess.selectSettingForUpdate('setting-1');

    expect(updateSpy).toHaveBeenCalledOnceWith('setting-1');
    expect(componentAccess.trackSettingById(0, { id: 'setting-1' })).toBe('setting-1');
    expect(fixture.nativeElement.textContent).toContain(
      'Choose one of the current protected settings to open its update form.',
    );

    fixture.componentRef.setInput('modalMode', 'pick-delete');
    fixture.detectChanges();

    componentAccess.selectSettingForDelete('setting-1');

    expect(deleteSpy).toHaveBeenCalledOnceWith('setting-1');
    expect(fixture.nativeElement.textContent).toContain(
      'Choose one of the current protected settings to confirm its removal.',
    );
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
    fixture.componentRef.setInput('isSubmitting', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'This action permanently removes the selected protected setting from the portfolio configuration.',
    );
    expect(fixture.nativeElement.textContent).toContain('Branding assets.');
  });
});
