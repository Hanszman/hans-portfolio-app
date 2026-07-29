import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { ProjectRecord } from '../../../../../../core/api/admin/projects/projects-operations.types';
import { ProjectsOperationsFormValue } from '../../projects-operations.types';
import { ProjectsOperationsModalComponent } from './projects-operations-modal.component';

const FORM: ProjectsOperationsFormValue = {
  slug: 'project',
  titlePt: 'Projeto',
  titleEn: 'Project',
  shortDescriptionPt: 'Resumo PT',
  shortDescriptionEn: 'Summary EN',
  fullDescriptionPt: 'Descricao PT',
  fullDescriptionEn: 'Description EN',
  context: 'CLIENT',
  status: 'COMPLETED',
  environment: 'WEB',
  featured: true,
  highlight: true,
  startDate: '2020-01-01',
  endDate: '',
  sortOrder: '1',
  technologyIds: ['technology-1'],
  experienceIds: ['experience-1'],
  tagIds: ['tag-1'],
  linkIds: ['link-1'],
  imageAssetIds: ['image-1'],
};

const RECORD: ProjectRecord = {
  id: 'project-1',
  slug: 'project',
  titlePt: 'Projeto',
  titleEn: 'Project',
  shortDescriptionPt: 'Resumo PT',
  shortDescriptionEn: 'Summary EN',
  fullDescriptionPt: 'Descricao PT',
  fullDescriptionEn: 'Description EN',
  context: 'CLIENT',
  status: 'COMPLETED',
  environment: 'WEB',
  featured: true,
  highlight: true,
  startDate: '2020-01-01',
  endDate: null,
  sortOrder: 1,
  technologyRelations: [{ technologyId: 'technology-1' }],
  experiences: [{ experienceId: 'experience-1' }],
  tags: [{ tagId: 'tag-1' }],
  links: [{ linkId: 'link-1' }],
  imageAssets: [{ imageAssetId: 'image-1' }],
};

describe('ProjectsOperationsModalComponent', () => {
  let fixture: ComponentFixture<ProjectsOperationsModalComponent>;

  beforeAll(() => {
    for (const name of [
      'hans-button',
      'hans-date-picker',
      'hans-input',
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
      imports: [ProjectsOperationsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectsOperationsModalComponent);
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('form', FORM);
    fixture.componentRef.setInput('projects', [RECORD]);
    fixture.detectChanges();
  });

  it('should expose computed state and translated option contracts', () => {
    const component = fixture.componentInstance as unknown as {
      showPagination(): boolean;
      showSubmit(): boolean;
      descriptionKey(): string | null;
      submitLabelKey(): string;
      contextOptions: () => readonly { value: string; label: string }[];
      statusOptions: () => readonly { value: string; label: string }[];
      environmentOptions: () => readonly { value: string; label: string }[];
    };
    for (const mode of ['read', 'pick-update', 'pick-delete'] as const) {
      fixture.componentRef.setInput('modalMode', mode);
      fixture.detectChanges();
      expect(component.descriptionKey()).toContain('description');
    }
    fixture.componentRef.setInput('modalMode', 'read');
    fixture.detectChanges();
    expect(component.showPagination()).toBeTrue();
    expect(component.descriptionKey()).toContain('description');
    fixture.componentRef.setInput('modalMode', 'delete');
    fixture.detectChanges();
    expect(component.showSubmit()).toBeTrue();
    expect(component.submitLabelKey()).toBe('pages.admin.operations.delete');
    expect(component.contextOptions().length).toBeGreaterThan(0);
    expect(component.statusOptions().length).toBeGreaterThan(0);
    expect(component.environmentOptions().length).toBeGreaterThan(0);
    fixture.componentRef.setInput('modalMode', null);
    fixture.detectChanges();
    expect(component.showPagination()).toBeFalse();
    expect(component.showSubmit()).toBeFalse();
    expect(component.descriptionKey()).toBeNull();
  });

  it('should emit form and relation events and resolve selected values', () => {
    const component = fixture.componentInstance as unknown as {
      emit(field: keyof ProjectsOperationsFormValue, event: Event): void;
      select(field: keyof ProjectsOperationsFormValue, event: Event): void;
      toggle(field: 'featured' | 'highlight', event: Event): void;
      relation(
        field: 'technologyIds' | 'experienceIds' | 'tagIds' | 'linkIds' | 'imageAssetIds',
        id: string,
      ): void;
      selected(
        field: 'technologyIds' | 'experienceIds' | 'tagIds' | 'linkIds' | 'imageAssetIds',
        id: string,
      ): boolean;
    };
    const fieldSpy = jasmine.createSpy('field');
    const booleanSpy = jasmine.createSpy('boolean');
    const relationSpy = jasmine.createSpy('relation');
    fixture.componentInstance.fieldChanged.subscribe(fieldSpy);
    fixture.componentInstance.booleanChanged.subscribe(booleanSpy);
    fixture.componentInstance.relationToggled.subscribe(relationSpy);
    component.emit('slug', { target: { value: 'updated' } } as unknown as Event);
    component.emit('titlePt', new CustomEvent('valueChange', { detail: 'Titulo' }));
    component.select('context', new CustomEvent('valueChange', { detail: 'PERSONAL' }));
    component.select('status', { target: { value: 'PLANNED' } } as unknown as Event);
    component.toggle('featured', new CustomEvent('change', { detail: false }));
    component.toggle('highlight', { target: { checked: true } } as unknown as Event);
    component.emit('slug', { target: {} } as unknown as Event);
    component.select('context', { target: {} } as unknown as Event);
    component.toggle('featured', { target: {} } as unknown as Event);
    component.relation('technologyIds', 'technology-1');
    expect(component.selected('technologyIds', 'technology-1')).toBeTrue();
    expect(component.selected('technologyIds', 'missing')).toBeFalse();
    expect(fieldSpy).toHaveBeenCalledWith({ field: 'slug', value: 'updated' });
    expect(fieldSpy).toHaveBeenCalledWith({ field: 'titlePt', value: 'Titulo' });
    expect(fieldSpy).toHaveBeenCalledWith({ field: 'context', value: 'PERSONAL' });
    expect(fieldSpy).toHaveBeenCalledWith({ field: 'status', value: 'PLANNED' });
    expect(booleanSpy).toHaveBeenCalledTimes(3);
    expect(relationSpy).toHaveBeenCalledWith({ field: 'technologyIds', id: 'technology-1' });
    fixture.componentRef.setInput('form', undefined);
    fixture.detectChanges();
    expect(component.selected('technologyIds', 'technology-1')).toBeFalse();
  });
});
