import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAppTranslations } from '../../../core/translation/translation.providers';
import { OperationsActionsComponent } from '../operations-actions/operations-actions.component';
import { OperationsComponent } from './operations.component';

describe('OperationsComponent', () => {
  let fixture: ComponentFixture<OperationsComponent>;
  let component: OperationsComponent;

  beforeAll(() => {
    for (const elementName of ['hans-button', 'hans-loading', 'hans-message']) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationsComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('kickerKey', 'pages.admin.tags.sectionLabel');
    fixture.componentRef.setInput('titleKey', 'common.entities.tags');
    fixture.componentRef.setInput('endpointLabel', 'GET /tags');
    fixture.componentRef.setInput('loadingKey', 'pages.admin.tags.states.loading');
    fixture.componentRef.setInput('emptyKey', 'pages.admin.tags.states.empty');
  });

  it('composes the workspace and forwards all actions', () => {
    const createSpy = jasmine.createSpy('create');
    const readSpy = jasmine.createSpy('read');
    const updateSpy = jasmine.createSpy('update');
    const deleteSpy = jasmine.createSpy('delete');
    component.createClicked.subscribe(createSpy);
    component.readClicked.subscribe(readSpy);
    component.updateClicked.subscribe(updateSpy);
    component.deleteClicked.subscribe(deleteSpy);
    fixture.componentRef.setInput('hasRecords', true);
    fixture.componentRef.setInput('descriptionKeys', ['pages.admin.entities.tags.description']);
    fixture.detectChanges();

    const actions = fixture.debugElement.query(By.directive(OperationsActionsComponent))
      .componentInstance as OperationsActionsComponent;
    actions.createClicked.emit();
    actions.readClicked.emit();
    actions.updateClicked.emit();
    actions.deleteClicked.emit();

    expect(createSpy).toHaveBeenCalled();
    expect(readSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
    expect(deleteSpy).toHaveBeenCalled();
  });

  it('renders loading, error and empty states', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('hans-loading')).toBeTruthy();
    expect(fixture.nativeElement.textContent).not.toContain('Loading');

    fixture.componentRef.setInput('isLoading', false);
    fixture.componentRef.setInput('errorKey', 'pages.admin.tags.feedback.loadError');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('hans-message').message).toContain('could not');

    fixture.componentRef.setInput('errorKey', null);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('hans-message').message).toBe(
      'No protected tag has been registered yet.',
    );
  });
});
