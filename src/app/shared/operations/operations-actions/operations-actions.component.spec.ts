import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../core/translation/translation.providers';
import { OperationsActionsComponent } from './operations-actions.component';

describe('OperationsActionsComponent', () => {
  let fixture: ComponentFixture<OperationsActionsComponent>;
  let component: OperationsActionsComponent;

  beforeAll(() => {
    if (!customElements.get('hans-button')) {
      customElements.define('hans-button', class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationsActionsComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the four default CRUD actions with translated labels', () => {
    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('hans-button'),
    ) as (
      HTMLElement & {
        ariaLabel?: string;
        disabled?: boolean;
      }
    )[];

    expect(buttons).toHaveSize(4);
    expect(fixture.nativeElement.textContent).toContain('Create');
    expect(fixture.nativeElement.textContent).toContain('Read');
    expect(fixture.nativeElement.textContent).toContain('Update');
    expect(fixture.nativeElement.textContent).toContain('Delete');
    expect(buttons.every((button) => button.disabled !== true)).toBeTrue();
  });

  it('should expose disabled states and emit each action output', () => {
    const createSpy = jasmine.createSpy('createClicked');
    const readSpy = jasmine.createSpy('readClicked');
    const updateSpy = jasmine.createSpy('updateClicked');
    const deleteSpy = jasmine.createSpy('deleteClicked');
    const componentView = component as unknown as {
      actions(): { key: string; labelKey: string; disabled: boolean }[];
      emitAction(actionKey: 'create' | 'read' | 'update' | 'delete'): void;
    };

    component.createClicked.subscribe(createSpy);
    component.readClicked.subscribe(readSpy);
    component.updateClicked.subscribe(updateSpy);
    component.deleteClicked.subscribe(deleteSpy);

    fixture.componentRef.setInput('readDisabled', true);
    fixture.componentRef.setInput('updateDisabled', true);
    fixture.componentRef.setInput('deleteDisabled', true);
    fixture.detectChanges();

    expect(componentView.actions().map(({ key, disabled }) => ({ key, disabled }))).toEqual([
      { key: 'create', disabled: false },
      { key: 'read', disabled: true },
      { key: 'update', disabled: true },
      { key: 'delete', disabled: true },
    ]);

    componentView.emitAction('create');
    componentView.emitAction('read');
    componentView.emitAction('update');
    componentView.emitAction('delete');

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(readSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });
});
