import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { ImageAssetOperationsViewModel } from '../../image-assets-operations.types';
import { ImageAssetsOperationsModalComponent } from './image-assets-operations-modal.component';

const IMAGE_ASSETS: readonly ImageAssetOperationsViewModel[] = [
  {
    id: 'image-asset-1',
    fileName: 'vh_logo_blue.svg',
    filePath: '/assets/img/logo/vh_logo_blue.svg',
    kind: 'ICON',
    altPt: 'Logo azul da Hans',
    altEn: 'Hans blue logo',
    altEs: 'Hans blue logo',
    dimensionsLabel: '240 x 96',
    sortOrderLabel: '1',
    projectLabels: ['Portfolio remake'],
    experienceLabels: ['Analista (Stefanini Ford)'],
    technologyLabels: ['Angular'],
    formationLabels: [],
    spokenLanguageLabels: [],
    customerLabels: [],
  },
  {
    id: 'image-asset-2',
    fileName: 'empty.svg',
    filePath: '/assets/img/empty.svg',
    kind: 'ICON',
    altPt: '',
    altEn: '',
    altEs: '',
    dimensionsLabel: '-',
    sortOrderLabel: '2',
    projectLabels: [],
    experienceLabels: [],
    technologyLabels: [],
    formationLabels: [],
    spokenLanguageLabels: [],
    customerLabels: [],
  },
];

describe('ImageAssetsOperationsModalComponent', () => {
  let fixture: ComponentFixture<ImageAssetsOperationsModalComponent>;

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
      imports: [ImageAssetsOperationsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageAssetsOperationsModalComponent);
  });

  it('should render the create form and emit the workflow events', () => {
    const component = fixture.componentInstance;
    const fileNameSpy = jasmine.createSpy('fileNameChanged');
    const filePathSpy = jasmine.createSpy('filePathChanged');
    const kindSpy = jasmine.createSpy('kindChanged');
    const altPtSpy = jasmine.createSpy('altPtChanged');
    const altEnSpy = jasmine.createSpy('altEnChanged');
    const altEsSpy = jasmine.createSpy('altEsChanged');
    const widthSpy = jasmine.createSpy('widthChanged');
    const heightSpy = jasmine.createSpy('heightChanged');
    const sortOrderSpy = jasmine.createSpy('sortOrderChanged');
    const projectSpy = jasmine.createSpy('projectToggled');
    const experienceSpy = jasmine.createSpy('experienceToggled');
    const technologySpy = jasmine.createSpy('technologyToggled');
    const formationSpy = jasmine.createSpy('formationToggled');
    const spokenLanguageSpy = jasmine.createSpy('spokenLanguageToggled');
    const customerSpy = jasmine.createSpy('customerToggled');
    const pageSpy = jasmine.createSpy('pageSelected');
    const submitSpy = jasmine.createSpy('submitted');
    const closeSpy = jasmine.createSpy('closed');

    component.fileNameChanged.subscribe(fileNameSpy);
    component.filePathChanged.subscribe(filePathSpy);
    component.kindChanged.subscribe(kindSpy);
    component.altPtChanged.subscribe(altPtSpy);
    component.altEnChanged.subscribe(altEnSpy);
    component.altEsChanged.subscribe(altEsSpy);
    component.widthChanged.subscribe(widthSpy);
    component.heightChanged.subscribe(heightSpy);
    component.sortOrderChanged.subscribe(sortOrderSpy);
    component.projectToggled.subscribe(projectSpy);
    component.experienceToggled.subscribe(experienceSpy);
    component.technologyToggled.subscribe(technologySpy);
    component.formationToggled.subscribe(formationSpy);
    component.spokenLanguageToggled.subscribe(spokenLanguageSpy);
    component.customerToggled.subscribe(customerSpy);
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
    fixture.componentRef.setInput('imageAssetKindOptions', [
      { id: 'ICON', label: 'Icon', value: 'ICON' },
      { id: 'SCREENSHOT', label: 'Screenshot', value: 'SCREENSHOT' },
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
      emitFileNameChange(value: string): void;
      emitFilePathChange(value: string): void;
      emitKindChange(value: string): void;
      emitAltPtChange(value: string): void;
      emitAltEnChange(value: string): void;
      emitAltEsChange(value: string): void;
      emitWidthChange(value: string): void;
      emitHeightChange(value: string): void;
      emitSortOrderChange(value: string): void;
      toggleProject(projectId: string): void;
      toggleExperience(experienceId: string): void;
      toggleTechnology(technologyId: string): void;
      toggleFormation(formationId: string): void;
      toggleSpokenLanguage(spokenLanguageId: string): void;
      toggleCustomer(customerId: string): void;
      submit(): void;
      requestClose(): void;
      isProjectSelected(projectId: string): boolean;
      isExperienceSelected(experienceId: string): boolean;
      isTechnologySelected(technologyId: string): boolean;
      selectPage(page: number): void;
    };

    componentAccess.emitFileNameChange('vh_logo_blue.svg');
    componentAccess.emitFilePathChange('/assets/img/logo/vh_logo_blue.svg');
    componentAccess.emitKindChange('ICON');
    componentAccess.emitAltPtChange('Logo');
    componentAccess.emitAltEnChange('Logo');
    componentAccess.emitAltEsChange('Logotipo');
    componentAccess.emitWidthChange('240');
    componentAccess.emitHeightChange('96');
    componentAccess.emitSortOrderChange('7');
    componentAccess.toggleProject('project-1');
    componentAccess.toggleExperience('experience-1');
    componentAccess.toggleTechnology('technology-1');
    componentAccess.toggleFormation('formation-1');
    componentAccess.toggleSpokenLanguage('spoken-language-1');
    componentAccess.toggleCustomer('customer-1');
    componentAccess.selectPage(2);
    componentAccess.submit();
    componentAccess.requestClose();

    const inputElements = Array.from(
      fixture.nativeElement.querySelectorAll('hans-input'),
    ) as (HTMLElement & { label?: string; required?: boolean })[];
    const selectElement = fixture.nativeElement.querySelector('hans-select-option') as
      | (HTMLElement & { label?: string; required?: boolean })
      | null;

    expect(inputElements.map((element) => element.label)).toEqual([
      'File name',
      'File path',
      'Portuguese alt text',
      'English alt text',
      'Spanish alternative text',
      'Width',
      'Height',
      'Sort order',
    ]);
    expect(inputElements.map((element) => element.required)).toEqual([
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      true,
    ]);
    expect(selectElement?.label).toBe('Kind');
    expect(selectElement?.required).toBeTrue();
    expect(fileNameSpy).toHaveBeenCalledOnceWith('vh_logo_blue.svg');
    expect(filePathSpy).toHaveBeenCalledOnceWith('/assets/img/logo/vh_logo_blue.svg');
    expect(kindSpy).toHaveBeenCalledOnceWith('ICON');
    expect(altPtSpy).toHaveBeenCalledOnceWith('Logo');
    expect(altEnSpy).toHaveBeenCalledOnceWith('Logo');
    expect(altEsSpy).toHaveBeenCalledOnceWith('Logotipo');
    expect(widthSpy).toHaveBeenCalledOnceWith('240');
    expect(heightSpy).toHaveBeenCalledOnceWith('96');
    expect(sortOrderSpy).toHaveBeenCalledOnceWith('7');
    expect(projectSpy).toHaveBeenCalledOnceWith('project-1');
    expect(experienceSpy).toHaveBeenCalledOnceWith('experience-1');
    expect(technologySpy).toHaveBeenCalledOnceWith('technology-1');
    expect(formationSpy).toHaveBeenCalledOnceWith('formation-1');
    expect(spokenLanguageSpy).toHaveBeenCalledOnceWith('spoken-language-1');
    expect(customerSpy).toHaveBeenCalledOnceWith('customer-1');
    expect(pageSpy).toHaveBeenCalledOnceWith(2);
    expect(submitSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(componentAccess.isProjectSelected('project-1')).toBeFalse();
    expect(componentAccess.isExperienceSelected('experience-1')).toBeFalse();
    expect(componentAccess.isTechnologySelected('technology-1')).toBeFalse();
  });

  it('should resolve select-option payloads for the kind field', () => {
    const componentAccess = fixture.componentInstance as unknown as {
      resolveSelectValue(event: Event): string;
    };

    expect(
      componentAccess.resolveSelectValue(new CustomEvent('valueChange', { detail: 'ICON' })),
    ).toBe('ICON');
    expect(
      componentAccess.resolveSelectValue(
        new CustomEvent('valueChange', { detail: { value: 'SCREENSHOT' } }),
      ),
    ).toBe('SCREENSHOT');
    expect(componentAccess.resolveSelectValue({ target: { value: 'ICON' } } as never)).toBe('ICON');
    expect(componentAccess.resolveSelectValue({ target: null } as never)).toBe('');
  });

  it('should render the read and picker flows and emit selection events', () => {
    const component = fixture.componentInstance;
    const updateSpy = jasmine.createSpy('updateSelected');
    const deleteSpy = jasmine.createSpy('deleteSelected');

    component.updateSelected.subscribe(updateSpy);
    component.deleteSelected.subscribe(deleteSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('imageAssets', IMAGE_ASSETS);
    fixture.componentRef.setInput('modalMode', 'read');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('vh_logo_blue.svg');
    expect(fixture.nativeElement.textContent).toContain('Portfolio remake');

    fixture.componentRef.setInput('modalMode', 'pick-update');
    fixture.detectChanges();

    (
      component as unknown as {
        selectImageAssetForUpdate(imageAssetId: string): void;
        selectImageAssetForDelete(imageAssetId: string): void;
        trackById(index: number, item: { id: string }): string;
      }
    ).selectImageAssetForUpdate('image-asset-1');

    expect(updateSpy).toHaveBeenCalledOnceWith('image-asset-1');

    fixture.componentRef.setInput('modalMode', 'pick-delete');
    fixture.detectChanges();

    (
      component as unknown as {
        selectImageAssetForDelete(imageAssetId: string): void;
        trackById(index: number, item: { id: string }): string;
      }
    ).selectImageAssetForDelete('image-asset-1');

    expect(deleteSpy).toHaveBeenCalledOnceWith('image-asset-1');
    expect(
      (
        component as unknown as {
          trackById(index: number, item: { id: string }): string;
        }
      ).trackById(0, { id: 'image-asset-1' }),
    ).toBe('image-asset-1');
  });

  it('should render the delete confirmation summary and selected relation states', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'delete');
    fixture.componentRef.setInput('selectedImageAsset', {
      id: 'image-asset-1',
      fileName: 'vh_logo_blue.svg',
      filePath: '/assets/img/logo/vh_logo_blue.svg',
    });
    fixture.componentRef.setInput('form', {
      fileName: 'vh_logo_blue.svg',
      filePath: '/assets/img/logo/vh_logo_blue.svg',
      kind: 'ICON',
      altPt: '',
      altEn: '',
      altEs: '',
      width: '240',
      height: '96',
      sortOrder: '1',
      projectIds: ['project-1'],
      experienceIds: ['experience-1'],
      technologyIds: ['technology-1'],
      formationIds: [],
      spokenLanguageIds: [],
      customerIds: [],
    });
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      isProjectSelected(projectId: string): boolean;
      isExperienceSelected(experienceId: string): boolean;
      isTechnologySelected(technologyId: string): boolean;
    };

    expect(fixture.nativeElement.textContent).toContain(
      'This action permanently removes the selected protected image asset from the portfolio.',
    );
    expect(component.isProjectSelected('project-1')).toBeTrue();
    expect(component.isExperienceSelected('experience-1')).toBeTrue();
    expect(component.isTechnologySelected('technology-1')).toBeTrue();
  });

  it('should not render any fallback form content when the modal mode is cleared', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('hans-input').length).toBe(0);
  });
});
