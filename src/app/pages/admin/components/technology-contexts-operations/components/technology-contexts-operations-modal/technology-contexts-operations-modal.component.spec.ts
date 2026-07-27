import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { TechnologyContextsOperationsModalComponent } from './technology-contexts-operations-modal.component';

const record = {
  id: 'context-1',
  technologyId: 'tech-1',
  context: 'PROFESSIONAL',
  startedAt: '2026-01-01',
  endedAt: null,
  technology: { id: 'tech-1', slug: 'angular', name: 'Angular' },
};
const viewModel = {
  id: 'context-1',
  technologyId: 'tech-1',
  context: 'PROFESSIONAL',
  startedAt: '2026-01-01',
  endedAt: '',
  technologyName: 'Angular',
  technologySlug: 'angular',
  contextLabel: 'Professional',
  dateRangeLabel: '01/01/2026 - -',
};

describe('TechnologyContextsOperationsModalComponent', () => {
  let fixture: ComponentFixture<TechnologyContextsOperationsModalComponent>;
  beforeAll(() => {
    for (const name of [
      'hans-button',
      'hans-input',
      'hans-date-picker',
      'hans-modal',
      'hans-select-option',
      'hans-loading',
    ])
      if (!customElements.get(name)) customElements.define(name, class extends HTMLElement {});
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyContextsOperationsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
    fixture = TestBed.createComponent(TechnologyContextsOperationsModalComponent);
  });

  it('renders create form and emits field, submit and close events', () => {
    const component = fixture.componentInstance;
    const fields = jasmine.createSpy('fields');
    const submitted = jasmine.createSpy('submitted');
    const closed = jasmine.createSpy('closed');
    const pages = jasmine.createSpy('pages');
    const searches = jasmine.createSpy('searches');
    component.fieldChanged.subscribe(fields);
    component.submitted.subscribe(submitted);
    component.closed.subscribe(closed);
    component.pageSelected.subscribe(pages);
    component.searchChanged.subscribe(searches);
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'create');
    fixture.componentRef.setInput('technologyOptions', [
      { id: 'tech-1', label: 'Angular (angular)', value: 'tech-1' },
    ]);
    fixture.componentRef.setInput('contextOptions', [
      { value: 'PROFESSIONAL', label: 'Professional' },
    ]);
    fixture.detectChanges();
    const access = component as unknown as {
      change(field: 'context', event: Event): void;
      submit(): void;
    };
    access.change('context', new CustomEvent('change', { detail: 'PROFESSIONAL' }));
    access.submit();
    access.change('context', new Event('change'));
    component.closed.emit();
    component.pageSelected.emit(2);
    component.searchChanged.emit('angular');
    expect(fields).toHaveBeenCalledWith({ field: 'context', value: 'PROFESSIONAL' });
    expect(fields).toHaveBeenCalledWith({ field: 'context', value: '' });
    expect(fields).toHaveBeenCalledTimes(2);
    expect(submitted).toHaveBeenCalledTimes(1);
    expect(closed).toHaveBeenCalledTimes(1);
    expect(pages).toHaveBeenCalledOnceWith(2);
    expect(searches).toHaveBeenCalledOnceWith('angular');
  });

  it('renders read and picker records with separate update and delete events', () => {
    const component = fixture.componentInstance;
    const update = jasmine.createSpy('update');
    const remove = jasmine.createSpy('remove');
    component.updateSelected.subscribe(update);
    component.deleteSelected.subscribe(remove);
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('records', [viewModel]);
    fixture.componentRef.setInput('modalMode', 'read');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Angular');
    const buttons = fixture.nativeElement.querySelectorAll(
      'hans-button',
    ) as NodeListOf<HTMLElement>;
    buttons[0]?.click();
    buttons[1]?.click();
    fixture.componentRef.setInput('modalMode', 'pick-update');
    fixture.detectChanges();
    (
      fixture.nativeElement.querySelector(
        '.technology-contexts-operations-picker-option',
      ) as HTMLElement
    )?.click();
    fixture.componentRef.setInput('modalMode', 'pick-delete');
    fixture.detectChanges();
    (
      fixture.nativeElement.querySelector(
        '.technology-contexts-operations-picker-option',
      ) as HTMLElement
    )?.click();
    expect(update).toHaveBeenCalledWith('context-1');
    expect(remove).toHaveBeenCalledWith('context-1');
  });

  it('renders delete mode and exposes mode-dependent computed values', () => {
    const component = fixture.componentInstance;
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'delete');
    fixture.componentRef.setInput('selectedRecord', record);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Angular');
    const access = component as unknown as {
      showPagination(): boolean;
      showSubmit(): boolean;
      submitLabelKey(): string;
      descriptionKey(): string | null;
    };
    expect(access.showPagination()).toBeFalse();
    expect(access.showSubmit()).toBeTrue();
    expect(access.submitLabelKey()).toBe('pages.admin.operations.delete');
    expect(access.descriptionKey()).toBe('pages.admin.technologyContexts.modal.delete.description');
    fixture.componentRef.setInput('modalMode', null);
    fixture.detectChanges();
    expect(access.showSubmit()).toBeFalse();
    expect(access.descriptionKey()).toBeNull();
  });

  it('exposes the form modes without pagination and uses the save label', () => {
    const component = fixture.componentInstance;
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'create');
    fixture.detectChanges();
    const selectedViewModel = (component as unknown as { selectedRecordViewModel(): unknown }).selectedRecordViewModel();
    expect(selectedViewModel).toBeNull();
    const access = component as unknown as {
      showPagination(): boolean;
      showSubmit(): boolean;
      submitLabelKey(): string;
      descriptionKey(): string | null;
    };
    expect(access.showPagination()).toBeFalse();
    expect(access.showSubmit()).toBeTrue();
    expect(access.submitLabelKey()).toBe('common.actions.save');
    expect(access.descriptionKey()).toBeNull();

    fixture.componentRef.setInput('modalMode', 'update');
    fixture.detectChanges();
    expect(access.showPagination()).toBeFalse();
    expect(access.showSubmit()).toBeTrue();
    expect(access.submitLabelKey()).toBe('common.actions.save');
  });
});
