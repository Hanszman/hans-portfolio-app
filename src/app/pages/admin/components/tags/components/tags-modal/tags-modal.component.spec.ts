import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { TagViewModel } from '../../tags.types';
import { TagsModalComponent } from './tags-modal.component';

const TAGS: readonly TagViewModel[] = [
  {
    id: 'tag-1',
    slug: 'frontend',
    namePt: 'Front-end',
    nameEn: 'Front-end',
    type: 'stack',
    sortOrderLabel: '1',
    projectLabels: ['Portfolio remake'],
    technologyLabels: ['Angular'],
    projectIds: ['project-1'],
    technologyIds: ['technology-1'],
  },
];

describe('TagsModalComponent', () => {
  let fixture: ComponentFixture<TagsModalComponent>;

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
      imports: [TagsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsModalComponent);
  });

  it('should render the create form and emit the form workflow events', () => {
    const component = fixture.componentInstance;
    const slugSpy = jasmine.createSpy('slugChanged');
    const namePtSpy = jasmine.createSpy('namePtChanged');
    const nameEnSpy = jasmine.createSpy('nameEnChanged');
    const typeSpy = jasmine.createSpy('typeChanged');
    const sortOrderSpy = jasmine.createSpy('sortOrderChanged');
    const projectSpy = jasmine.createSpy('projectToggled');
    const technologySpy = jasmine.createSpy('technologyToggled');
    const submitSpy = jasmine.createSpy('submitted');
    const closeSpy = jasmine.createSpy('closed');

    component.slugChanged.subscribe(slugSpy);
    component.namePtChanged.subscribe(namePtSpy);
    component.nameEnChanged.subscribe(nameEnSpy);
    component.typeChanged.subscribe(typeSpy);
    component.sortOrderChanged.subscribe(sortOrderSpy);
    component.projectToggled.subscribe(projectSpy);
    component.technologyToggled.subscribe(technologySpy);
    component.submitted.subscribe(submitSpy);
    component.closed.subscribe(closeSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'create');
    fixture.componentRef.setInput('projectOptions', [
      { id: 'project-1', title: 'Portfolio remake', subtitle: 'portfolio-remake' },
    ]);
    fixture.componentRef.setInput('technologyOptions', [
      { id: 'technology-1', title: 'Angular', subtitle: 'angular' },
    ]);
    fixture.detectChanges();

    const componentAccess = component as unknown as {
      emitSlugChange(value: string): void;
      emitNamePtChange(value: string): void;
      emitNameEnChange(value: string): void;
      emitTypeChange(value: string): void;
      emitSortOrderChange(value: string): void;
      toggleProject(projectId: string): void;
      toggleTechnology(technologyId: string): void;
      submit(): void;
      requestClose(): void;
      isProjectSelected(projectId: string): boolean;
      isTechnologySelected(technologyId: string): boolean;
      trackById(index: number, item: { id: string }): string;
    };

    componentAccess.emitSlugChange('backend');
    componentAccess.emitNamePtChange('Back-end');
    componentAccess.emitNameEnChange('Back-end');
    componentAccess.emitTypeChange('stack');
    componentAccess.emitSortOrderChange('4');
    componentAccess.toggleProject('project-1');
    componentAccess.toggleTechnology('technology-1');
    componentAccess.submit();
    componentAccess.requestClose();

    expect(fixture.nativeElement.textContent).toContain('Save tag');
    expect(slugSpy).toHaveBeenCalledOnceWith('backend');
    expect(namePtSpy).toHaveBeenCalledOnceWith('Back-end');
    expect(nameEnSpy).toHaveBeenCalledOnceWith('Back-end');
    expect(typeSpy).toHaveBeenCalledOnceWith('stack');
    expect(sortOrderSpy).toHaveBeenCalledOnceWith('4');
    expect(projectSpy).toHaveBeenCalledOnceWith('project-1');
    expect(technologySpy).toHaveBeenCalledOnceWith('technology-1');
    expect(submitSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
    expect(componentAccess.isProjectSelected('project-1')).toBeFalse();
    expect(componentAccess.isTechnologySelected('technology-1')).toBeFalse();
    expect(componentAccess.trackById(0, { id: 'tag-1' })).toBe('tag-1');
  });

  it('should render the picker flows and emit selection events', () => {
    const component = fixture.componentInstance;
    const updateSpy = jasmine.createSpy('updateSelected');
    const deleteSpy = jasmine.createSpy('deleteSelected');

    component.updateSelected.subscribe(updateSpy);
    component.deleteSelected.subscribe(deleteSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('tags', TAGS);
    fixture.componentRef.setInput('modalMode', 'pick-update');
    fixture.detectChanges();

    const componentAccess = component as unknown as {
      selectTagForUpdate(tagId: string): void;
      selectTagForDelete(tagId: string): void;
    };

    componentAccess.selectTagForUpdate('tag-1');

    expect(updateSpy).toHaveBeenCalledOnceWith('tag-1');
    expect(fixture.nativeElement.textContent).toContain(
      'Choose one of the current protected tags to open its update form.',
    );

    fixture.componentRef.setInput('modalMode', 'pick-delete');
    fixture.detectChanges();

    componentAccess.selectTagForDelete('tag-1');

    expect(deleteSpy).toHaveBeenCalledOnceWith('tag-1');
    expect(fixture.nativeElement.textContent).toContain(
      'Choose one of the current protected tags to confirm its removal.',
    );
  });

  it('should render the delete confirmation summary and selected relation states', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'delete');
    fixture.componentRef.setInput('selectedTag', {
      id: 'tag-1',
      slug: 'frontend',
      namePt: 'Front-end',
      nameEn: 'Front-end',
      type: 'stack',
      sortOrder: 1,
    });
    fixture.componentRef.setInput('form', {
      slug: 'frontend',
      namePt: 'Front-end',
      nameEn: 'Front-end',
      type: 'stack',
      sortOrder: '1',
      projectIds: ['project-1'],
      technologyIds: ['technology-1'],
    });
    fixture.componentRef.setInput('isSubmitting', true);
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      isProjectSelected(projectId: string): boolean;
      isTechnologySelected(technologyId: string): boolean;
    };

    expect(fixture.nativeElement.textContent).toContain(
      'This action permanently removes the selected protected tag and its current relations from the portfolio.',
    );
    expect(fixture.nativeElement.textContent).toContain('Front-end');
    expect(component.isProjectSelected('project-1')).toBeTrue();
    expect(component.isTechnologySelected('technology-1')).toBeTrue();
  });
});
