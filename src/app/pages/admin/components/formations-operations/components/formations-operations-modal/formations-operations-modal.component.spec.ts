import { appConfig } from '../../../../../../core/api/api.config';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { FormationOperationsViewModel } from '../../formations-operations.types';
import { FormationsOperationsModalComponent } from './formations-operations-modal.component';

const FORMATIONS: readonly FormationOperationsViewModel[] = [
  {
    id: 'formation-1',
    slug: 'systems-analysis',
    institution: 'PUC Minas',
    titlePt: 'Analise e Desenvolvimento de Sistemas',
    titleEn: 'Systems Analysis and Development',
    degreeType: 'BACHELOR',
    summaryPt: 'Resumo PT',
    summaryEn: 'Summary EN',
    startDate: '2020-01-01',
    endDateLabel: '2023-12-01',
    highlight: true,
    sortOrderLabel: '1',
    technologyLabels: ['Angular (angular)'],
    linkLabels: ['Details'],
    imageAssetLabels: ['puc.svg (ICON)'],
    technologyIds: ['technology-1'],
    linkIds: ['link-1'],
    imageAssetIds: ['image-asset-1'],
  },
];

describe('FormationsOperationsModalComponent', () => {
  let fixture: ComponentFixture<FormationsOperationsModalComponent>;

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
      imports: [FormationsOperationsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormationsOperationsModalComponent);
  });

  it('should render the create form and emit the workflow events', () => {
    const component = fixture.componentInstance;
    const slugSpy = jasmine.createSpy('slugChanged');
    const institutionSpy = jasmine.createSpy('institutionChanged');
    const titlePtSpy = jasmine.createSpy('titlePtChanged');
    const titleEnSpy = jasmine.createSpy('titleEnChanged');
    const degreeTypeSpy = jasmine.createSpy('degreeTypeChanged');
    const summaryPtSpy = jasmine.createSpy('summaryPtChanged');
    const summaryEnSpy = jasmine.createSpy('summaryEnChanged');
    const startDateSpy = jasmine.createSpy('startDateChanged');
    const endDateSpy = jasmine.createSpy('endDateChanged');
    const highlightSpy = jasmine.createSpy('highlightChanged');
    const sortOrderSpy = jasmine.createSpy('sortOrderChanged');
    const technologySpy = jasmine.createSpy('technologyToggled');
    const linkSpy = jasmine.createSpy('linkToggled');
    const imageAssetSpy = jasmine.createSpy('imageAssetToggled');
    const pageSpy = jasmine.createSpy('pageSelected');
    const submitSpy = jasmine.createSpy('submitted');
    const closeSpy = jasmine.createSpy('closed');

    component.slugChanged.subscribe(slugSpy);
    component.institutionChanged.subscribe(institutionSpy);
    component.titlePtChanged.subscribe(titlePtSpy);
    component.titleEnChanged.subscribe(titleEnSpy);
    component.degreeTypeChanged.subscribe(degreeTypeSpy);
    component.summaryPtChanged.subscribe(summaryPtSpy);
    component.summaryEnChanged.subscribe(summaryEnSpy);
    component.startDateChanged.subscribe(startDateSpy);
    component.endDateChanged.subscribe(endDateSpy);
    component.highlightChanged.subscribe(highlightSpy);
    component.sortOrderChanged.subscribe(sortOrderSpy);
    component.technologyToggled.subscribe(technologySpy);
    component.linkToggled.subscribe(linkSpy);
    component.imageAssetToggled.subscribe(imageAssetSpy);
    component.pageSelected.subscribe(pageSpy);
    component.submitted.subscribe(submitSpy);
    component.closed.subscribe(closeSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'create');
    fixture.componentRef.setInput('technologyOptions', [
      { id: 'technology-1', title: 'Angular', subtitle: 'angular' },
    ]);
    fixture.componentRef.setInput('linkOptions', [
      { id: 'link-1', title: 'Details', subtitle: 'https://example.com' },
    ]);
    fixture.componentRef.setInput('imageAssetOptions', [
      {
        id: 'image-asset-1',
        title: 'puc.svg',
        subtitle: '/assets/img/formations/puc.svg',
        imageUrl: `${appConfig.baseUrl}/assets/img/formations/puc.svg`,
      },
    ]);
    fixture.componentRef.setInput('degreeTypeOptions', [
      { id: 'BACHELOR', label: 'BACHELOR', value: 'BACHELOR' },
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
      emitInstitutionChange(value: string): void;
      emitTitlePtChange(value: string): void;
      emitTitleEnChange(value: string): void;
      emitDegreeTypeChange(value: string): void;
      emitSummaryPtChange(value: string): void;
      emitSummaryEnChange(value: string): void;
      emitStartDateChange(value: string): void;
      emitEndDateChange(value: string): void;
      emitHighlightChange(event: Event): void;
      emitSortOrderChange(value: string): void;
      toggleTechnology(technologyId: string): void;
      toggleLink(linkId: string): void;
      toggleImageAsset(imageAssetId: string): void;
      submit(): void;
      requestClose(): void;
      isTechnologySelected(technologyId: string): boolean;
      isLinkSelected(linkId: string): boolean;
      isImageAssetSelected(imageAssetId: string): boolean;
      resolveSelectValue(event: Event): string;
      selectPage(page: number): void;
    };

    componentAccess.emitSlugChange('systems-analysis');
    componentAccess.emitInstitutionChange('PUC Minas');
    componentAccess.emitTitlePtChange('ADS');
    componentAccess.emitTitleEnChange('Systems Analysis');
    componentAccess.emitDegreeTypeChange('BACHELOR');
    componentAccess.emitSummaryPtChange('Resumo PT');
    componentAccess.emitSummaryEnChange('Summary EN');
    componentAccess.emitStartDateChange('2020-01-01');
    componentAccess.emitEndDateChange('2023-12-01');
    componentAccess.emitHighlightChange(new CustomEvent('change', { detail: true }));
    componentAccess.emitHighlightChange({ target: { checked: false } } as never);
    componentAccess.emitSortOrderChange('7');
    componentAccess.toggleTechnology('technology-1');
    componentAccess.toggleLink('link-1');
    componentAccess.toggleImageAsset('image-asset-1');
    componentAccess.selectPage(2);
    componentAccess.submit();
    componentAccess.requestClose();

    const inputElements = Array.from(
      fixture.nativeElement.querySelectorAll('hans-input'),
    ) as (HTMLElement & { label?: string })[];
    const selectElement = fixture.nativeElement.querySelector('hans-select-option') as
      | (HTMLElement & { label?: string })
      | null;

    expect(inputElements.map((element) => element.label)).toEqual([
      'Slug *',
      'Institution *',
      'Portuguese title *',
      'English title *',
      'Portuguese summary *',
      'English summary *',
      'Start date *',
      'End date',
      'Sort order *',
    ]);
    expect(selectElement?.label).toBe('Degree type *');
    expect(slugSpy).toHaveBeenCalledOnceWith('systems-analysis');
    expect(institutionSpy).toHaveBeenCalledOnceWith('PUC Minas');
    expect(titlePtSpy).toHaveBeenCalledOnceWith('ADS');
    expect(titleEnSpy).toHaveBeenCalledOnceWith('Systems Analysis');
    expect(degreeTypeSpy).toHaveBeenCalledOnceWith('BACHELOR');
    expect(summaryPtSpy).toHaveBeenCalledOnceWith('Resumo PT');
    expect(summaryEnSpy).toHaveBeenCalledOnceWith('Summary EN');
    expect(startDateSpy).toHaveBeenCalledOnceWith('2020-01-01');
    expect(endDateSpy).toHaveBeenCalledOnceWith('2023-12-01');
    expect(highlightSpy).toHaveBeenCalledWith(true);
    expect(highlightSpy).toHaveBeenCalledWith(false);
    expect(sortOrderSpy).toHaveBeenCalledOnceWith('7');
    expect(technologySpy).toHaveBeenCalledOnceWith('technology-1');
    expect(linkSpy).toHaveBeenCalledOnceWith('link-1');
    expect(imageAssetSpy).toHaveBeenCalledOnceWith('image-asset-1');
    expect(pageSpy).toHaveBeenCalledOnceWith(2);
    expect(submitSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(componentAccess.isTechnologySelected('technology-1')).toBeFalse();
    expect(componentAccess.isLinkSelected('link-1')).toBeFalse();
    expect(componentAccess.isImageAssetSelected('image-asset-1')).toBeFalse();
    expect(
      componentAccess.resolveSelectValue(
        new CustomEvent('valueChange', { detail: { value: 'BACHELOR' } }),
      ),
    ).toBe('BACHELOR');
    expect(
      componentAccess.resolveSelectValue(
        new CustomEvent('valueChange', { detail: 'TECHNICAL' }),
      ),
    ).toBe('TECHNICAL');
    expect(componentAccess.resolveSelectValue(new Event('valueChange'))).toBe('');
    expect(
      componentAccess.resolveSelectValue({
        target: {
          value: 'COURSE',
        },
      } as unknown as Event),
    ).toBe('COURSE');
  });

  it('should render the read and picker flows and emit selection events', () => {
    const component = fixture.componentInstance;
    const updateSpy = jasmine.createSpy('updateSelected');
    const deleteSpy = jasmine.createSpy('deleteSelected');

    component.updateSelected.subscribe(updateSpy);
    component.deleteSelected.subscribe(deleteSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('formations', FORMATIONS);
    fixture.componentRef.setInput('modalMode', 'read');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('PUC Minas');
    expect(fixture.nativeElement.textContent).toContain('Angular (angular)');

    fixture.componentRef.setInput('modalMode', 'pick-update');
    fixture.detectChanges();

    (
      component as unknown as {
        selectFormationForUpdate(formationId: string): void;
      }
    ).selectFormationForUpdate('formation-1');

    expect(updateSpy).toHaveBeenCalledOnceWith('formation-1');

    fixture.componentRef.setInput('modalMode', 'pick-delete');
    fixture.detectChanges();

    (
      component as unknown as {
        selectFormationForDelete(formationId: string): void;
        trackById(index: number, item: { id: string }): string;
      }
    ).selectFormationForDelete('formation-1');

    expect(deleteSpy).toHaveBeenCalledOnceWith('formation-1');
    expect(
      (
        component as unknown as {
          trackById(index: number, item: { id: string }): string;
        }
      ).trackById(0, { id: 'formation-1' }),
    ).toBe('formation-1');
  });

  it('should render the delete confirmation summary and selected relation states', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'delete');
    fixture.componentRef.setInput('selectedFormation', {
      id: 'formation-1',
      slug: 'systems-analysis',
      institution: 'PUC Minas',
      titlePt: 'ADS',
      titleEn: 'Systems Analysis',
    degreeType: 'BACHELOR',
    summaryPt: 'Resumo PT',
    summaryEn: 'Summary EN',
    startDate: '2020-01-01',
    endDateLabel: '2023-12-01',
    highlight: true,
      sortOrder: 1,
      technologyRelations: [],
      linkIds: ['link-1'],
      imageAssetIds: ['image-asset-1'],
    });
    fixture.componentRef.setInput('form', {
      slug: 'systems-analysis',
      institution: 'PUC Minas',
      titlePt: 'ADS',
      titleEn: 'Systems Analysis',
      degreeType: 'BACHELOR',
      summaryPt: 'Resumo PT',
      summaryEn: 'Summary EN',
      startDate: '2020-01-01',
      endDate: '2023-12-01',
      highlight: true,
      sortOrder: '1',
      technologyIds: ['technology-1'],
      linkIds: ['link-1'],
      imageAssetIds: ['image-asset-1'],
    });
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      isTechnologySelected(technologyId: string): boolean;
      isLinkSelected(linkId: string): boolean;
      isImageAssetSelected(imageAssetId: string): boolean;
    };

    expect(fixture.nativeElement.textContent).toContain(
      'This action permanently removes the selected protected formation from the portfolio.',
    );
    expect(component.isTechnologySelected('technology-1')).toBeTrue();
    expect(component.isLinkSelected('link-1')).toBeTrue();
    expect(component.isImageAssetSelected('image-asset-1')).toBeTrue();
  });

  it('should not render fallback form content when the modal mode is cleared', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('hans-input').length).toBe(0);
  });
});
