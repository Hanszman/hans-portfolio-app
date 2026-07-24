import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { LinkOperationsViewModel } from '../../links-operations.types';
import { LinksOperationsModalComponent } from './links-operations-modal.component';

const LINKS: readonly LinkOperationsViewModel[] = [
  {
    id: 'link-1',
    url: 'https://github.com/vh/portfolio',
    labelPt: 'Repositorio',
    labelEn: 'Repository',
    descriptionPt: 'Codigo fonte',
    descriptionEn: 'Source code',
    type: 'GITHUB',
    sortOrderLabel: '1',
    projectLabels: ['Portfolio remake'],
    experienceLabels: ['Analista (Stefanini Ford)'],
    technologyLabels: ['Angular'],
    formationLabels: ['formation-1'],
  },
];

describe('LinksOperationsModalComponent', () => {
  let fixture: ComponentFixture<LinksOperationsModalComponent>;

  beforeAll(() => {
    for (const elementName of [
      'hans-button',
      'hans-input',
      'hans-loading',
      'hans-modal',
      'hans-select-option',
      'hans-toggle',
    ]) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinksOperationsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(LinksOperationsModalComponent);
  });

  it('should render the create form and emit the form workflow events', () => {
    const component = fixture.componentInstance;
    const urlSpy = jasmine.createSpy('urlChanged');
    const labelPtSpy = jasmine.createSpy('labelPtChanged');
    const labelEnSpy = jasmine.createSpy('labelEnChanged');
    const descriptionPtSpy = jasmine.createSpy('descriptionPtChanged');
    const descriptionEnSpy = jasmine.createSpy('descriptionEnChanged');
    const typeSpy = jasmine.createSpy('typeChanged');
    const sortOrderSpy = jasmine.createSpy('sortOrderChanged');
    const projectSpy = jasmine.createSpy('projectToggled');
    const experienceSpy = jasmine.createSpy('experienceToggled');
    const technologySpy = jasmine.createSpy('technologyToggled');
    const formationSpy = jasmine.createSpy('formationToggled');
    const pageSpy = jasmine.createSpy('pageSelected');
    const submitSpy = jasmine.createSpy('submitted');
    const closeSpy = jasmine.createSpy('closed');

    component.urlChanged.subscribe(urlSpy);
    component.labelPtChanged.subscribe(labelPtSpy);
    component.labelEnChanged.subscribe(labelEnSpy);
    component.descriptionPtChanged.subscribe(descriptionPtSpy);
    component.descriptionEnChanged.subscribe(descriptionEnSpy);
    component.typeChanged.subscribe(typeSpy);
    component.sortOrderChanged.subscribe(sortOrderSpy);
    component.projectToggled.subscribe(projectSpy);
    component.experienceToggled.subscribe(experienceSpy);
    component.technologyToggled.subscribe(technologySpy);
    component.formationToggled.subscribe(formationSpy);
    component.pageSelected.subscribe(pageSpy);
    component.submitted.subscribe(submitSpy);
    component.closed.subscribe(closeSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'create');
    fixture.componentRef.setInput('projectOptions', [
      { id: 'project-1', title: 'Portfolio remake', subtitle: 'portfolio-remake' },
    ]);
    fixture.componentRef.setInput('experienceOptions', [
      { id: 'experience-1', title: 'Analista', subtitle: 'Stefanini Ford' },
    ]);
    fixture.componentRef.setInput('technologyOptions', [
      { id: 'technology-1', title: 'Angular', subtitle: 'angular' },
    ]);
    fixture.componentRef.setInput('linkTypeOptions', [
      { id: 'GITHUB', label: 'GitHub', value: 'GITHUB' },
      { id: 'DEPLOY', label: 'Deploy', value: 'DEPLOY' },
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
      emitUrlChange(value: string): void;
      emitLabelPtChange(value: string): void;
      emitLabelEnChange(value: string): void;
      emitDescriptionPtChange(value: string): void;
      emitDescriptionEnChange(value: string): void;
      emitTypeChange(value: string): void;
      emitSortOrderChange(value: string): void;
      toggleProject(projectId: string): void;
      toggleExperience(experienceId: string): void;
      toggleTechnology(technologyId: string): void;
      toggleFormation(formationId: string): void;
      submit(): void;
      requestClose(): void;
      isProjectSelected(projectId: string): boolean;
      isExperienceSelected(experienceId: string): boolean;
      isTechnologySelected(technologyId: string): boolean;
      isFormationSelected(formationId: string): boolean;
      selectPage(page: number): void;
    };

    componentAccess.emitUrlChange('https://example.com');
    componentAccess.emitLabelPtChange('Demo');
    componentAccess.emitLabelEnChange('Demo');
    componentAccess.emitDescriptionPtChange('Descricao');
    componentAccess.emitDescriptionEnChange('Description');
    componentAccess.emitTypeChange('DEPLOY');
    componentAccess.emitSortOrderChange('7');
    componentAccess.toggleProject('project-1');
    componentAccess.toggleExperience('experience-1');
    componentAccess.toggleTechnology('technology-1');
    componentAccess.toggleFormation('formation-1');
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
    const selectElement = fixture.nativeElement.querySelector('hans-select-option') as
      | (HTMLElement & { label?: string })
      | null;

    expect(inputElements.map((element) => element.label)).toEqual([
      'URL *',
      'Portuguese label',
      'English label',
      'Portuguese description',
      'English description',
      'Sort order *',
    ]);
    expect(selectElement?.label).toBe('Type *');
    expect(modalElement?.confirmLabel).toBe('Save');
    expect(modalElement?.paginationCurrentPage).toBe(0);
    expect(urlSpy).toHaveBeenCalledOnceWith('https://example.com');
    expect(labelPtSpy).toHaveBeenCalledOnceWith('Demo');
    expect(labelEnSpy).toHaveBeenCalledOnceWith('Demo');
    expect(descriptionPtSpy).toHaveBeenCalledOnceWith('Descricao');
    expect(descriptionEnSpy).toHaveBeenCalledOnceWith('Description');
    expect(typeSpy).toHaveBeenCalledOnceWith('DEPLOY');
    expect(sortOrderSpy).toHaveBeenCalledOnceWith('7');
    expect(projectSpy).toHaveBeenCalledOnceWith('project-1');
    expect(experienceSpy).toHaveBeenCalledOnceWith('experience-1');
    expect(technologySpy).toHaveBeenCalledOnceWith('technology-1');
    expect(formationSpy).toHaveBeenCalledOnceWith('formation-1');
    expect(pageSpy).toHaveBeenCalledOnceWith(2);
    expect(submitSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(componentAccess.isProjectSelected('project-1')).toBeFalse();
    expect(componentAccess.isExperienceSelected('experience-1')).toBeFalse();
    expect(componentAccess.isTechnologySelected('technology-1')).toBeFalse();
    expect(componentAccess.isFormationSelected('formation-1')).toBeFalse();
  });

  it('should resolve select-option payloads for the type field', () => {
    const componentAccess = fixture.componentInstance as unknown as {
      resolveSelectValue(event: Event): string;
    };

    expect(
      componentAccess.resolveSelectValue(
        new CustomEvent('valueChange', { detail: 'DEPLOY' }),
      ),
    ).toBe('DEPLOY');
    expect(
      componentAccess.resolveSelectValue(
        new CustomEvent('valueChange', { detail: { value: 'GITHUB' } }),
      ),
    ).toBe('GITHUB');
    expect(
      componentAccess.resolveSelectValue({ target: { value: 'DOCS' } } as unknown as Event),
    ).toBe('DOCS');
    expect(componentAccess.resolveSelectValue({ target: null } as unknown as Event)).toBe('');
  });

  it('should render the picker and read flows and emit selection events', () => {
    const component = fixture.componentInstance;
    const updateSpy = jasmine.createSpy('updateSelected');
    const deleteSpy = jasmine.createSpy('deleteSelected');

    component.updateSelected.subscribe(updateSpy);
    component.deleteSelected.subscribe(deleteSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('links', LINKS);
    fixture.componentRef.setInput('modalMode', 'read');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('https://github.com/vh/portfolio');
    expect(fixture.nativeElement.textContent).toContain('Portfolio remake');

    fixture.componentRef.setInput('modalMode', 'pick-update');
    fixture.detectChanges();

    (
      component as unknown as {
        selectLinkForUpdate(linkId: string): void;
        selectLinkForDelete(linkId: string): void;
        trackById(index: number, item: { id: string }): string;
      }
    ).selectLinkForUpdate('link-1');

    expect(updateSpy).toHaveBeenCalledOnceWith('link-1');

    fixture.componentRef.setInput('modalMode', 'pick-delete');
    fixture.detectChanges();

    (
      component as unknown as {
        selectLinkForDelete(linkId: string): void;
        trackById(index: number, item: { id: string }): string;
      }
    ).selectLinkForDelete('link-1');

    expect(deleteSpy).toHaveBeenCalledOnceWith('link-1');
    expect(
      (
        component as unknown as {
          trackById(index: number, item: { id: string }): string;
        }
      ).trackById(0, { id: 'link-1' }),
    ).toBe('link-1');
  });

  it('should render the delete confirmation summary and selected relation states', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'delete');
    fixture.componentRef.setInput('selectedLink', {
      id: 'link-1',
      url: 'https://github.com/vh/portfolio',
      labelPt: 'Repositorio',
      labelEn: 'Repository',
      descriptionPt: 'Codigo fonte',
      descriptionEn: 'Source code',
      type: 'GITHUB',
      sortOrder: 1,
    });
    fixture.componentRef.setInput('form', {
      url: 'https://github.com/vh/portfolio',
      labelPt: 'Repositorio',
      labelEn: 'Repository',
      descriptionPt: 'Codigo fonte',
      descriptionEn: 'Source code',
      type: 'GITHUB',
      sortOrder: '1',
      projectIds: ['project-1'],
      experienceIds: ['experience-1'],
      technologyIds: ['technology-1'],
      formationIds: ['formation-1'],
    });
    fixture.componentRef.setInput('feedbackKey', 'pages.admin.links.feedback.saveError');
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      isProjectSelected(projectId: string): boolean;
      isExperienceSelected(experienceId: string): boolean;
      isTechnologySelected(technologyId: string): boolean;
      isFormationSelected(formationId: string): boolean;
    };
    const modalElement = fixture.nativeElement.querySelector('hans-modal') as
      | (HTMLElement & {
          confirmLabel?: string;
        })
      | null;

    expect(fixture.nativeElement.textContent).toContain(
      'This action permanently removes the selected protected link from the portfolio.',
    );
    expect(component.isProjectSelected('project-1')).toBeTrue();
    expect(component.isExperienceSelected('experience-1')).toBeTrue();
    expect(component.isTechnologySelected('technology-1')).toBeTrue();
    expect(component.isFormationSelected('formation-1')).toBeTrue();
    expect(modalElement?.confirmLabel).toBe('Delete');
  });

  it('should not render any fallback form content when the modal mode is cleared', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('hans-input').length).toBe(0);
  });
});
