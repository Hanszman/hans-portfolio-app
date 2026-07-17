import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { TagOperationsViewModel } from '../../tags-operations.types';
import { TagsOperationsModalComponent } from './tags-operations-modal.component';

const TAGS: readonly TagOperationsViewModel[] = [
  {
    id: 'tag-1',
    slug: 'frontend',
    namePt: 'Front-end',
    nameEn: 'Front-end',
    type: 'STACK',
    sortOrderLabel: '1',
    projectLabels: ['Portfolio remake'],
    technologyLabels: ['Angular'],
    projectIds: ['project-1'],
    technologyIds: ['technology-1'],
  },
];

describe('TagsOperationsModalComponent', () => {
  let fixture: ComponentFixture<TagsOperationsModalComponent>;

  beforeAll(() => {
    for (const elementName of [
      'hans-button',
      'hans-input',
      'hans-loading',
      'hans-modal',
      'hans-select-option',
    ]) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsOperationsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsOperationsModalComponent);
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
    const pageSpy = jasmine.createSpy('pageSelected');
    const submitSpy = jasmine.createSpy('submitted');
    const closeSpy = jasmine.createSpy('closed');

    component.slugChanged.subscribe(slugSpy);
    component.namePtChanged.subscribe(namePtSpy);
    component.nameEnChanged.subscribe(nameEnSpy);
    component.typeChanged.subscribe(typeSpy);
    component.sortOrderChanged.subscribe(sortOrderSpy);
    component.projectToggled.subscribe(projectSpy);
    component.technologyToggled.subscribe(technologySpy);
    component.pageSelected.subscribe(pageSpy);
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
    fixture.componentRef.setInput('tagTypeOptions', [
      { id: 'STACK', label: 'STACK', value: 'STACK' },
    ]);
    fixture.componentRef.setInput('pagination', {
      page: 1,
      pageSize: 5,
      totalItems: 2,
      totalPages: 2,
      hasPreviousPage: false,
      hasNextPage: true,
    });
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
      resolveSelectValue(event: Event): string;
      selectPage(page: number): void;
    };

    componentAccess.emitSlugChange('backend');
    componentAccess.emitNamePtChange('Back-end');
    componentAccess.emitNameEnChange('Back-end');
    componentAccess.emitTypeChange('STACK');
    componentAccess.emitSortOrderChange('7');
    componentAccess.toggleProject('project-1');
    componentAccess.toggleTechnology('technology-1');
    componentAccess.selectPage(2);
    componentAccess.submit();
    componentAccess.requestClose();

    const modalElement = fixture.nativeElement.querySelector('hans-modal') as
      | (HTMLElement & {
          confirmLabel?: string;
          paginationCurrentPage?: number;
        })
      | null;
    const inputElements = Array.from(
      fixture.nativeElement.querySelectorAll('hans-input'),
    ) as (HTMLElement & { label?: string })[];

    expect(inputElements.map((element) => element.label)).toEqual([
      'Tag slug *',
      'Portuguese name *',
      'English name *',
      'Sort order *',
    ]);
    expect(modalElement?.confirmLabel).toBe('Save');
    expect(modalElement?.paginationCurrentPage).toBe(0);
    expect(slugSpy).toHaveBeenCalledOnceWith('backend');
    expect(namePtSpy).toHaveBeenCalledOnceWith('Back-end');
    expect(nameEnSpy).toHaveBeenCalledOnceWith('Back-end');
    expect(typeSpy).toHaveBeenCalledOnceWith('STACK');
    expect(sortOrderSpy).toHaveBeenCalledOnceWith('7');
    expect(projectSpy).toHaveBeenCalledOnceWith('project-1');
    expect(technologySpy).toHaveBeenCalledOnceWith('technology-1');
    expect(pageSpy).toHaveBeenCalledOnceWith(2);
    expect(submitSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(componentAccess.isProjectSelected('project-1')).toBeFalse();
    expect(componentAccess.isTechnologySelected('technology-1')).toBeFalse();
    expect(
      componentAccess.resolveSelectValue(
        new CustomEvent('valueChange', { detail: { value: 'STACK' } }),
      ),
    ).toBe('STACK');
    expect(
      componentAccess.resolveSelectValue(
        new CustomEvent('valueChange', { detail: 'DOMAIN' }),
      ),
    ).toBe('DOMAIN');
    expect(componentAccess.resolveSelectValue(new Event('valueChange'))).toBe('');
    expect(
      componentAccess.resolveSelectValue({
        target: {
          value: 'PLATFORM',
        },
      } as unknown as Event),
    ).toBe('PLATFORM');
  });

  it('should render the picker and read flows and emit selection events', () => {
    const component = fixture.componentInstance;
    const updateSpy = jasmine.createSpy('updateSelected');
    const deleteSpy = jasmine.createSpy('deleteSelected');

    component.updateSelected.subscribe(updateSpy);
    component.deleteSelected.subscribe(deleteSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('tags', TAGS);
    fixture.componentRef.setInput('modalMode', 'read');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('frontend');
    expect(fixture.nativeElement.textContent).toContain('Portfolio remake');

    fixture.componentRef.setInput('modalMode', 'pick-update');
    fixture.detectChanges();

    (
      component as unknown as {
        selectTagForUpdate(tagId: string): void;
        selectTagForDelete(tagId: string): void;
        trackById(index: number, item: { id: string }): string;
      }
    ).selectTagForUpdate('tag-1');

    expect(updateSpy).toHaveBeenCalledOnceWith('tag-1');

    fixture.componentRef.setInput('modalMode', 'pick-delete');
    fixture.detectChanges();

    (
      component as unknown as {
        selectTagForDelete(tagId: string): void;
        trackById(index: number, item: { id: string }): string;
      }
    ).selectTagForDelete('tag-1');

    expect(deleteSpy).toHaveBeenCalledOnceWith('tag-1');
    expect(
      (
        component as unknown as {
          trackById(index: number, item: { id: string }): string;
        }
      ).trackById(0, { id: 'tag-1' }),
    ).toBe('tag-1');
  });

  it('should render the delete confirmation summary and selected relation states', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'delete');
    fixture.componentRef.setInput('selectedTag', {
      id: 'tag-1',
      slug: 'frontend',
      namePt: 'Front-end',
      nameEn: 'Front-end',
      type: 'STACK',
      sortOrder: 1,
    });
    fixture.componentRef.setInput('form', {
      slug: 'frontend',
      namePt: 'Front-end',
      nameEn: 'Front-end',
      type: 'STACK',
      sortOrder: '1',
      projectIds: ['project-1'],
      technologyIds: ['technology-1'],
    });
    fixture.componentRef.setInput('feedbackKey', 'pages.admin.tags.feedback.saveError');
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      isProjectSelected(projectId: string): boolean;
      isTechnologySelected(technologyId: string): boolean;
    };
    const modalElement = fixture.nativeElement.querySelector('hans-modal') as
      | (HTMLElement & {
          confirmLabel?: string;
        })
      | null;

    expect(fixture.nativeElement.textContent).toContain(
      'This action permanently removes the selected protected tag and its current relations from the portfolio.',
    );
    expect(component.isProjectSelected('project-1')).toBeTrue();
    expect(component.isTechnologySelected('technology-1')).toBeTrue();
    expect(modalElement?.confirmLabel).toBe('Delete');
  });

  it('should not render any fallback form content when the modal mode is cleared', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('hans-input').length).toBe(0);
  });
});
