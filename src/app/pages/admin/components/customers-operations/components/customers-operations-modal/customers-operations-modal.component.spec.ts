import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { CustomerOperationsViewModel } from '../../customers-operations.types';
import { CustomersOperationsModalComponent } from './customers-operations-modal.component';

const CUSTOMERS: readonly CustomerOperationsViewModel[] = [
  {
    id: 'customer-1',
    slug: 'enterprise-client',
    name: 'Enterprise Client',
    summaryPt: 'Cliente corporativo',
    summaryEn: 'Corporate client',
    highlight: true,
    isPublished: true,
    sortOrderLabel: '1',
    experienceLabels: ['Analista (Ford)'],
    imageAssetLabels: ['ford.svg (ICON)'],
    experienceIds: ['experience-1'],
    imageAssetIds: ['image-asset-1'],
  },
];

describe('CustomersOperationsModalComponent', () => {
  let fixture: ComponentFixture<CustomersOperationsModalComponent>;

  beforeAll(() => {
    for (const elementName of [
      'hans-button',
      'hans-input',
      'hans-loading',
      'hans-modal',
      'hans-toggle',
    ]) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersOperationsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersOperationsModalComponent);
  });

  it('should render the create form and emit the form workflow events', () => {
    const component = fixture.componentInstance;
    const slugSpy = jasmine.createSpy('slugChanged');
    const nameSpy = jasmine.createSpy('nameChanged');
    const summaryPtSpy = jasmine.createSpy('summaryPtChanged');
    const summaryEnSpy = jasmine.createSpy('summaryEnChanged');
    const highlightSpy = jasmine.createSpy('highlightChanged');
    const publicationSpy = jasmine.createSpy('publicationChanged');
    const sortOrderSpy = jasmine.createSpy('sortOrderChanged');
    const experienceSpy = jasmine.createSpy('experienceToggled');
    const imageAssetSpy = jasmine.createSpy('imageAssetToggled');
    const pageSpy = jasmine.createSpy('pageSelected');
    const submitSpy = jasmine.createSpy('submitted');
    const closeSpy = jasmine.createSpy('closed');

    component.slugChanged.subscribe(slugSpy);
    component.nameChanged.subscribe(nameSpy);
    component.summaryPtChanged.subscribe(summaryPtSpy);
    component.summaryEnChanged.subscribe(summaryEnSpy);
    component.highlightChanged.subscribe(highlightSpy);
    component.publicationChanged.subscribe(publicationSpy);
    component.sortOrderChanged.subscribe(sortOrderSpy);
    component.experienceToggled.subscribe(experienceSpy);
    component.imageAssetToggled.subscribe(imageAssetSpy);
    component.pageSelected.subscribe(pageSpy);
    component.submitted.subscribe(submitSpy);
    component.closed.subscribe(closeSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'create');
    fixture.componentRef.setInput('experienceOptions', [
      {
        id: 'experience-1',
        title: 'Analista',
        subtitle: 'Ford',
      },
    ]);
    fixture.componentRef.setInput('imageAssetOptions', [
      {
        id: 'image-asset-1',
        title: 'ford.svg',
        subtitle: '/assets/img/customers/ford.svg',
      },
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
      emitNameChange(value: string): void;
      emitSummaryPtChange(value: string): void;
      emitSummaryEnChange(value: string): void;
      emitHighlightChange(event: Event): void;
      emitPublicationChange(event: Event): void;
      emitSortOrderChange(value: string): void;
      toggleExperience(experienceId: string): void;
      toggleImageAsset(imageAssetId: string): void;
      selectPage(page: number): void;
      submit(): void;
      requestClose(): void;
      isExperienceSelected(experienceId: string): boolean;
      isImageAssetSelected(imageAssetId: string): boolean;
    };

    componentAccess.emitSlugChange('enterprise-client');
    componentAccess.emitNameChange('Enterprise Client');
    componentAccess.emitSummaryPtChange('Cliente corporativo');
    componentAccess.emitSummaryEnChange('Corporate client');
    componentAccess.emitHighlightChange(new CustomEvent('change', { detail: true }));
    componentAccess.emitHighlightChange({ target: { checked: false } } as never);
    componentAccess.emitPublicationChange(new CustomEvent('change', { detail: true }));
    componentAccess.emitPublicationChange({ target: { checked: false } } as never);
    componentAccess.emitSortOrderChange('7');
    componentAccess.toggleExperience('experience-1');
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

    expect(inputElements.map((element) => element.label)).toEqual([
      'Slug *',
      'Name *',
      'Portuguese summary *',
      'English summary *',
      'Sort order *',
    ]);
    expect(modalElement?.confirmLabel).toBe('Save');
    expect(modalElement?.paginationCurrentPage).toBe(0);
    expect(slugSpy).toHaveBeenCalledOnceWith('enterprise-client');
    expect(nameSpy).toHaveBeenCalledOnceWith('Enterprise Client');
    expect(summaryPtSpy).toHaveBeenCalledOnceWith('Cliente corporativo');
    expect(summaryEnSpy).toHaveBeenCalledOnceWith('Corporate client');
    expect(highlightSpy).toHaveBeenCalledWith(true);
    expect(highlightSpy).toHaveBeenCalledWith(false);
    expect(publicationSpy).toHaveBeenCalledWith(true);
    expect(publicationSpy).toHaveBeenCalledWith(false);
    expect(sortOrderSpy).toHaveBeenCalledOnceWith('7');
    expect(experienceSpy).toHaveBeenCalledOnceWith('experience-1');
    expect(imageAssetSpy).toHaveBeenCalledOnceWith('image-asset-1');
    expect(pageSpy).toHaveBeenCalledOnceWith(2);
    expect(submitSpy).toHaveBeenCalledTimes(1);
    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(componentAccess.isExperienceSelected('experience-1')).toBeFalse();
    expect(componentAccess.isImageAssetSelected('image-asset-1')).toBeFalse();
  });

  it('should render the picker and read flows and emit selection events', () => {
    const component = fixture.componentInstance;
    const updateSpy = jasmine.createSpy('updateSelected');
    const deleteSpy = jasmine.createSpy('deleteSelected');

    component.updateSelected.subscribe(updateSpy);
    component.deleteSelected.subscribe(deleteSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('customers', CUSTOMERS);
    fixture.componentRef.setInput('modalMode', 'read');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Enterprise Client');
    expect(fixture.nativeElement.textContent).toContain('Corporate client');
    expect(fixture.nativeElement.textContent).toContain('ford.svg (ICON)');

    fixture.componentRef.setInput('modalMode', 'pick-update');
    fixture.detectChanges();

    (
      component as unknown as {
        selectCustomerForUpdate(customerId: string): void;
      }
    ).selectCustomerForUpdate('customer-1');

    expect(updateSpy).toHaveBeenCalledOnceWith('customer-1');

    fixture.componentRef.setInput('modalMode', 'pick-delete');
    fixture.detectChanges();

    (
      component as unknown as {
        selectCustomerForDelete(customerId: string): void;
        trackById(index: number, item: { id: string }): string;
      }
    ).selectCustomerForDelete('customer-1');

    expect(deleteSpy).toHaveBeenCalledOnceWith('customer-1');
    expect(
      (
        component as unknown as {
          trackById(index: number, item: { id: string }): string;
        }
      ).trackById(0, { id: 'customer-1' }),
    ).toBe('customer-1');
  });

  it('should render the delete confirmation summary and selected relation states', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'delete');
    fixture.componentRef.setInput('selectedCustomer', {
      id: 'customer-1',
      slug: 'enterprise-client',
      name: 'Enterprise Client',
      summaryPt: 'Cliente corporativo',
      summaryEn: 'Corporate client',
      highlight: true,
      sortOrder: 1,
      isPublished: true,
      experienceIds: ['experience-1'],
      imageAssetIds: ['image-asset-1'],
    });
    fixture.componentRef.setInput('form', {
      slug: 'enterprise-client',
      name: 'Enterprise Client',
      summaryPt: 'Cliente corporativo',
      summaryEn: 'Corporate client',
      highlight: true,
      sortOrder: '1',
      isPublished: true,
      experienceIds: ['experience-1'],
      imageAssetIds: ['image-asset-1'],
    });
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      isExperienceSelected(experienceId: string): boolean;
      isImageAssetSelected(imageAssetId: string): boolean;
    };
    const modalElement = fixture.nativeElement.querySelector('hans-modal') as
      | (HTMLElement & {
          confirmLabel?: string;
        })
      | null;

    expect(fixture.nativeElement.textContent).toContain(
      'This action permanently removes the selected protected customer from the portfolio.',
    );
    expect(component.isExperienceSelected('experience-1')).toBeTrue();
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
