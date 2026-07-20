import { appConfig } from '../../../../../../core/api/api.config';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { SpokenLanguageOperationsViewModel } from '../../spoken-languages-operations.types';
import { SpokenLanguagesOperationsModalComponent } from './spoken-languages-operations-modal.component';

const SPOKEN_LANGUAGES: readonly SpokenLanguageOperationsViewModel[] = [
  {
    id: 'spoken-language-1',
    code: 'en',
    namePt: 'Ingles',
    nameEn: 'English',
    proficiency: 'FLUENT',
    highlight: true,
    sortOrderLabel: '1',
    imageAssetLabels: ['english-flag.svg (ICON)'],
    imageAssetIds: ['image-asset-1'],
  },
];

describe('SpokenLanguagesOperationsModalComponent', () => {
  let fixture: ComponentFixture<SpokenLanguagesOperationsModalComponent>;

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
      imports: [SpokenLanguagesOperationsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpokenLanguagesOperationsModalComponent);
  });

  it('should render the create form and emit the form workflow events', () => {
    const component = fixture.componentInstance;
    const codeSpy = jasmine.createSpy('codeChanged');
    const namePtSpy = jasmine.createSpy('namePtChanged');
    const nameEnSpy = jasmine.createSpy('nameEnChanged');
    const proficiencySpy = jasmine.createSpy('proficiencyChanged');
    const highlightSpy = jasmine.createSpy('highlightChanged');
    const sortOrderSpy = jasmine.createSpy('sortOrderChanged');
    const imageAssetSpy = jasmine.createSpy('imageAssetToggled');
    const pageSpy = jasmine.createSpy('pageSelected');
    const submitSpy = jasmine.createSpy('submitted');
    const closeSpy = jasmine.createSpy('closed');

    component.codeChanged.subscribe(codeSpy);
    component.namePtChanged.subscribe(namePtSpy);
    component.nameEnChanged.subscribe(nameEnSpy);
    component.proficiencyChanged.subscribe(proficiencySpy);
    component.highlightChanged.subscribe(highlightSpy);
    component.sortOrderChanged.subscribe(sortOrderSpy);
    component.imageAssetToggled.subscribe(imageAssetSpy);
    component.pageSelected.subscribe(pageSpy);
    component.submitted.subscribe(submitSpy);
    component.closed.subscribe(closeSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'create');
    fixture.componentRef.setInput('imageAssetOptions', [
      {
        id: 'image-asset-1',
        title: 'english-flag.svg',
        subtitle: '/assets/img/languages/english-flag.svg',
        imageUrl: `${appConfig.baseUrl}/assets/img/languages/english-flag.svg`,
      },
    ]);
    fixture.componentRef.setInput('proficiencyOptions', [
      { id: 'FLUENT', label: 'FLUENT', value: 'FLUENT' },
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
      emitCodeChange(value: string): void;
      emitNamePtChange(value: string): void;
      emitNameEnChange(value: string): void;
      emitProficiencyChange(value: string): void;
      emitHighlightChange(event: Event): void;
      emitSortOrderChange(value: string): void;
      toggleImageAsset(imageAssetId: string): void;
      submit(): void;
      requestClose(): void;
      isImageAssetSelected(imageAssetId: string): boolean;
      resolveSelectValue(event: Event): string;
      selectPage(page: number): void;
    };

    componentAccess.emitCodeChange('pt');
    componentAccess.emitNamePtChange('Portugues');
    componentAccess.emitNameEnChange('Portuguese');
    componentAccess.emitProficiencyChange('NATIVE');
    componentAccess.emitHighlightChange(new CustomEvent('change', { detail: true }));
    componentAccess.emitHighlightChange({ target: { checked: false } } as never);
    componentAccess.emitSortOrderChange('7');
    componentAccess.toggleImageAsset('image-asset-1');
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
      'Code *',
      'Portuguese name *',
      'English name *',
      'Sort order *',
    ]);
    expect(selectElement?.label).toBe('Proficiency *');
    expect(modalElement?.confirmLabel).toBe('Save');
    expect(modalElement?.paginationCurrentPage).toBe(0);
    expect(codeSpy).toHaveBeenCalledOnceWith('pt');
    expect(namePtSpy).toHaveBeenCalledOnceWith('Portugues');
    expect(nameEnSpy).toHaveBeenCalledOnceWith('Portuguese');
    expect(proficiencySpy).toHaveBeenCalledOnceWith('NATIVE');
    expect(highlightSpy).toHaveBeenCalledWith(true);
    expect(highlightSpy).toHaveBeenCalledWith(false);
    expect(sortOrderSpy).toHaveBeenCalledOnceWith('7');
    expect(imageAssetSpy).toHaveBeenCalledOnceWith('image-asset-1');
    expect(pageSpy).toHaveBeenCalledOnceWith(2);
    expect(submitSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(componentAccess.isImageAssetSelected('image-asset-1')).toBeFalse();
    expect(
      componentAccess.resolveSelectValue(
        new CustomEvent('valueChange', { detail: { value: 'FLUENT' } }),
      ),
    ).toBe('FLUENT');
    expect(
      componentAccess.resolveSelectValue(new CustomEvent('valueChange', { detail: 'ADVANCED' })),
    ).toBe('ADVANCED');
    expect(componentAccess.resolveSelectValue(new Event('valueChange'))).toBe('');
    expect(
      componentAccess.resolveSelectValue({
        target: {
          value: 'BASIC',
        },
      } as unknown as Event),
    ).toBe('BASIC');
  });

  it('should render the picker and read flows and emit selection events', () => {
    const component = fixture.componentInstance;
    const updateSpy = jasmine.createSpy('updateSelected');
    const deleteSpy = jasmine.createSpy('deleteSelected');

    component.updateSelected.subscribe(updateSpy);
    component.deleteSelected.subscribe(deleteSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('spokenLanguages', SPOKEN_LANGUAGES);
    fixture.componentRef.setInput('modalMode', 'read');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Ingles');
    expect(fixture.nativeElement.textContent).toContain('english-flag.svg (ICON)');

    fixture.componentRef.setInput('modalMode', 'pick-update');
    fixture.detectChanges();

    (
      component as unknown as {
        selectSpokenLanguageForUpdate(spokenLanguageId: string): void;
      }
    ).selectSpokenLanguageForUpdate('spoken-language-1');

    expect(updateSpy).toHaveBeenCalledOnceWith('spoken-language-1');

    fixture.componentRef.setInput('modalMode', 'pick-delete');
    fixture.detectChanges();

    (
      component as unknown as {
        selectSpokenLanguageForDelete(spokenLanguageId: string): void;
        trackById(index: number, item: { id: string }): string;
      }
    ).selectSpokenLanguageForDelete('spoken-language-1');

    expect(deleteSpy).toHaveBeenCalledOnceWith('spoken-language-1');
    expect(
      (
        component as unknown as {
          trackById(index: number, item: { id: string }): string;
        }
      ).trackById(0, { id: 'spoken-language-1' }),
    ).toBe('spoken-language-1');
  });

  it('should render the delete confirmation summary and selected image-asset state', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'delete');
    fixture.componentRef.setInput('selectedSpokenLanguage', {
      id: 'spoken-language-1',
      code: 'en',
      namePt: 'Ingles',
      nameEn: 'English',
      proficiency: 'FLUENT',
      highlight: true,
      sortOrder: 1,
      imageAssetIds: ['image-asset-1'],
    });
    fixture.componentRef.setInput('form', {
      code: 'en',
      namePt: 'Ingles',
      nameEn: 'English',
      proficiency: 'FLUENT',
      highlight: true,
      sortOrder: '1',
      imageAssetIds: ['image-asset-1'],
    });
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      isImageAssetSelected(imageAssetId: string): boolean;
    };
    const modalElement = fixture.nativeElement.querySelector('hans-modal') as
      | (HTMLElement & {
          confirmLabel?: string;
        })
      | null;

    expect(fixture.nativeElement.textContent).toContain(
      'This action permanently removes the selected protected language entry from the portfolio.',
    );
    expect(component.isImageAssetSelected('image-asset-1')).toBeTrue();
    expect(modalElement?.confirmLabel).toBe('Delete');
  });

  it('should not render any fallback form content when the modal mode is cleared', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('hans-input').length).toBe(0);
  });
});
