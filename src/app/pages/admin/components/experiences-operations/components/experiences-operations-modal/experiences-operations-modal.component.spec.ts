import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { ExperienceRecord } from '../../../../../../core/api/experiences/experiences.types';
import { ExperiencesOperationsFormValue } from '../../experiences-operations.types';
import { ExperiencesOperationsModalComponent } from './experiences-operations-modal.component';

const FORM: ExperiencesOperationsFormValue = {
  slug: 'stevanini',
  companyName: 'Stefanini',
  titlePt: 'Titulo PT',
  titleEn: 'Title EN',
  titleEs: 'Title EN',
  summaryPt: 'Resumo PT',
  summaryEn: 'Summary EN',
  summaryEs: 'Summary EN',
  descriptionPt: 'Descricao PT',
  descriptionEn: 'Description EN',
  descriptionEs: 'Description EN',
  startDate: '2020-01-01',
  endDate: '',
  isCurrent: true,
  highlight: true,
  sortOrder: '1',
  technologyIds: ['technology-1'],
  projectIds: ['project-1'],
  customerIds: ['customer-1'],
  jobIds: ['job-1'],
  imageAssetIds: ['image-1'],
};

const RECORD: ExperienceRecord = {
  id: 'experience-1',
  slug: 'stefanini',
  companyName: 'Stefanini',
  titlePt: 'Titulo PT',
  titleEn: 'Title EN',
  titleEs: 'Title EN',
  summaryPt: 'Resumo PT',
  summaryEn: 'Summary EN',
  summaryEs: 'Summary EN',
  descriptionPt: 'Descricao PT',
  descriptionEn: 'Description EN',
  descriptionEs: 'Description EN',
  startDate: '2020-01-01',
  endDate: null,
  isCurrent: true,
  highlight: true,
  sortOrder: 1,
  technologyRelations: [{ technologyId: 'technology-1' }],
  projectIds: ['project-1'],
  customerIds: ['customer-1'],
  jobIds: ['job-1'],
  imageAssetIds: ['image-1'],
};

describe('ExperiencesOperationsModalComponent', () => {
  let fixture: ComponentFixture<ExperiencesOperationsModalComponent>;

  beforeAll(() => {
    for (const name of [
      'hans-button',
      'hans-date-picker',
      'hans-input',
      'hans-textarea',
      'hans-loading',
      'hans-modal',
      'hans-select-option',
      'hans-toggle',
    ]) {
      if (!customElements.get(name)) customElements.define(name, class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperiencesOperationsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
    fixture = TestBed.createComponent(ExperiencesOperationsModalComponent);
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('form', FORM);
    fixture.componentRef.setInput('experiences', [
      RECORD,
      { ...RECORD, id: 'experience-with-default-order', sortOrder: undefined },
    ]);
    fixture.componentRef.setInput('selectedExperience', RECORD);
    fixture.detectChanges();
  });

  it('should expose computed state for every modal mode', () => {
    const component = fixture.componentInstance as unknown as {
      showPagination(): boolean;
      showSubmit(): boolean;
      descriptionKey(): string | null;
      submitLabelKey(): string;
    };
    for (const mode of ['read', 'pick-update', 'pick-delete'] as const) {
      fixture.componentRef.setInput('modalMode', mode);
      fixture.detectChanges();
      expect(component.showPagination()).toBeTrue();
      expect(component.showSubmit()).toBeFalse();
      expect(component.descriptionKey()).toContain('description');
    }
    for (const mode of ['create', 'update'] as const) {
      fixture.componentRef.setInput('modalMode', mode);
      fixture.detectChanges();
      expect(component.showPagination()).toBeFalse();
      expect(component.showSubmit()).toBeTrue();
      expect(component.submitLabelKey()).toBe('common.actions.save');
    }
    fixture.componentRef.setInput('modalMode', 'delete');
    fixture.detectChanges();
    expect(component.showSubmit()).toBeTrue();
    expect(component.submitLabelKey()).toBe('pages.admin.operations.delete');
    fixture.componentRef.setInput('modalMode', null);
    fixture.detectChanges();
    expect(component.showPagination()).toBeFalse();
    expect(component.showSubmit()).toBeFalse();
    expect(component.descriptionKey()).toBeNull();
  });

  it('should emit field, boolean, relation, selection, pagination and submit events', () => {
    const component = fixture.componentInstance as unknown as {
      emit(field: keyof ExperiencesOperationsFormValue, event: Event): void;
      toggle(field: 'isCurrent' | 'highlight', event: Event): void;
      relation(
        field:
          | 'technologyIds'
          | 'projectIds'
          | 'customerIds'
          | 'jobIds'
          | 'imageAssetIds',
        id: string,
      ): void;
      optionSelected(id: string): void;
      deleteOption(id: string): void;
      selected(
        field:
          | 'technologyIds'
          | 'projectIds'
          | 'customerIds'
          | 'jobIds'
          | 'imageAssetIds',
        id: string,
      ): boolean;
    };
    const fieldSpy = jasmine.createSpy('field');
    const booleanSpy = jasmine.createSpy('boolean');
    const relationSpy = jasmine.createSpy('relation');
    const updateSpy = jasmine.createSpy('update');
    const deleteSpy = jasmine.createSpy('delete');
    const pageSpy = jasmine.createSpy('page');
    const submitSpy = jasmine.createSpy('submit');
    const closeSpy = jasmine.createSpy('close');
    fixture.componentInstance.fieldChanged.subscribe(fieldSpy);
    fixture.componentInstance.booleanChanged.subscribe(booleanSpy);
    fixture.componentInstance.relationToggled.subscribe(relationSpy);
    fixture.componentInstance.updateSelected.subscribe(updateSpy);
    fixture.componentInstance.deleteSelected.subscribe(deleteSpy);
    fixture.componentInstance.pageSelected.subscribe(pageSpy);
    fixture.componentInstance.submitted.subscribe(submitSpy);
    fixture.componentInstance.closed.subscribe(closeSpy);
    component.emit('slug', { target: { value: 'new-slug' } } as unknown as Event);
    component.emit('slug', {} as Event);
    component.toggle('highlight', new CustomEvent('change', { detail: false }));
    component.toggle('isCurrent', { target: { checked: true } } as unknown as Event);
    component.toggle('isCurrent', { target: {} } as unknown as Event);
    component.toggle('isCurrent', {} as Event);
    component.relation('technologyIds', 'technology-1');
    component.optionSelected('experience-1');
    component.deleteOption('experience-1');
    expect(component.selected('technologyIds', 'technology-1')).toBeTrue();
    expect(component.selected('technologyIds', 'missing')).toBeFalse();
    fixture.componentInstance.searchChanged.emit('search');
    fixture.componentInstance.pageSelected.emit(2);
    fixture.componentInstance.submitted.emit();
    fixture.componentInstance.closed.emit();
    expect(fieldSpy).toHaveBeenCalledWith({ field: 'slug', value: 'new-slug' });
    expect(fieldSpy).toHaveBeenCalledWith({ field: 'slug', value: '' });
    expect(booleanSpy).toHaveBeenCalledTimes(4);
    expect(relationSpy).toHaveBeenCalledWith({ field: 'technologyIds', id: 'technology-1' });
    expect(updateSpy).toHaveBeenCalledWith('experience-1');
    expect(deleteSpy).toHaveBeenCalledWith('experience-1');
    expect(pageSpy).toHaveBeenCalledWith(2);
    expect(submitSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
    fixture.componentRef.setInput('form', undefined);
    fixture.detectChanges();
    expect(component.selected('technologyIds', 'technology-1')).toBeFalse();
  });
});
