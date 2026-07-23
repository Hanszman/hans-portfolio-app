import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { appConfig } from '../../../../../../core/api/api.config';
import { provideAppTranslations } from '../../../../../../core/translation/translation.providers';
import { JobOperationsViewModel } from '../../jobs-operations.types';
import { JobsOperationsModalComponent } from './jobs-operations-modal.component';

const JOBS: readonly JobOperationsViewModel[] = [
  {
    id: 'job-1',
    slug: 'frontend-engineer',
    namePt: 'Engenheiro Front-End',
    nameEn: 'Front-End Engineer',
    summaryPt: 'Interfaces publicas e privadas.',
    summaryEn: 'Public and private interfaces.',
    highlight: true,
    sortOrderLabel: '1',
    experienceLabels: ['Analista (Ford)'],
    imageAssetLabels: ['ford.svg (ICON)'],
    experienceIds: ['experience-1'],
    imageAssetIds: ['image-asset-1'],
  },
];

describe('JobsOperationsModalComponent', () => {
  let fixture: ComponentFixture<JobsOperationsModalComponent>;

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
      imports: [JobsOperationsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(JobsOperationsModalComponent);
  });

  it('should render the create form and emit the form workflow events', () => {
    const component = fixture.componentInstance;
    const slugSpy = jasmine.createSpy('slugChanged');
    const namePtSpy = jasmine.createSpy('namePtChanged');
    const nameEnSpy = jasmine.createSpy('nameEnChanged');
    const summaryPtSpy = jasmine.createSpy('summaryPtChanged');
    const summaryEnSpy = jasmine.createSpy('summaryEnChanged');
    const highlightSpy = jasmine.createSpy('highlightChanged');
    const sortOrderSpy = jasmine.createSpy('sortOrderChanged');
    const experienceSpy = jasmine.createSpy('experienceToggled');
    const imageAssetSpy = jasmine.createSpy('imageAssetToggled');
    const pageSpy = jasmine.createSpy('pageSelected');
    const submitSpy = jasmine.createSpy('submitted');
    const closeSpy = jasmine.createSpy('closed');

    component.slugChanged.subscribe(slugSpy);
    component.namePtChanged.subscribe(namePtSpy);
    component.nameEnChanged.subscribe(nameEnSpy);
    component.summaryPtChanged.subscribe(summaryPtSpy);
    component.summaryEnChanged.subscribe(summaryEnSpy);
    component.highlightChanged.subscribe(highlightSpy);
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
        subtitle: '/assets/img/jobs/ford.svg',
        imageUrl: `${appConfig.baseUrl}/assets/img/jobs/ford.svg`,
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
      emitNamePtChange(value: string): void;
      emitNameEnChange(value: string): void;
      emitSummaryPtChange(value: string): void;
      emitSummaryEnChange(value: string): void;
      emitHighlightChange(event: Event): void;
      emitSortOrderChange(value: string): void;
      toggleExperience(experienceId: string): void;
      toggleImageAsset(imageAssetId: string): void;
      selectPage(page: number): void;
      submit(): void;
      requestClose(): void;
      isExperienceSelected(experienceId: string): boolean;
      isImageAssetSelected(imageAssetId: string): boolean;
    };

    componentAccess.emitSlugChange('frontend-engineer');
    componentAccess.emitNamePtChange('Engenheiro Front-End');
    componentAccess.emitNameEnChange('Front-End Engineer');
    componentAccess.emitSummaryPtChange('Interfaces publicas e privadas.');
    componentAccess.emitSummaryEnChange('Public and private interfaces.');
    componentAccess.emitHighlightChange(new CustomEvent('change', { detail: true }));
    componentAccess.emitHighlightChange({ target: { checked: false } } as never);
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
      'Portuguese name *',
      'English name *',
      'Portuguese summary *',
      'English summary *',
      'Sort order *',
    ]);
    expect(modalElement?.confirmLabel).toBe('Save');
    expect(modalElement?.paginationCurrentPage).toBe(0);
    expect(slugSpy).toHaveBeenCalledOnceWith('frontend-engineer');
    expect(namePtSpy).toHaveBeenCalledOnceWith('Engenheiro Front-End');
    expect(nameEnSpy).toHaveBeenCalledOnceWith('Front-End Engineer');
    expect(summaryPtSpy).toHaveBeenCalledOnceWith('Interfaces publicas e privadas.');
    expect(summaryEnSpy).toHaveBeenCalledOnceWith('Public and private interfaces.');
    expect(highlightSpy).toHaveBeenCalledWith(true);
    expect(highlightSpy).toHaveBeenCalledWith(false);
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
    fixture.componentRef.setInput('jobs', JOBS);
    fixture.componentRef.setInput('modalMode', 'read');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Engenheiro Front-End');
    expect(fixture.nativeElement.textContent).toContain('Front-End Engineer');
    expect(fixture.nativeElement.textContent).toContain('ford.svg (ICON)');

    fixture.componentRef.setInput('modalMode', 'pick-update');
    fixture.detectChanges();

    (
      component as unknown as {
        selectJobForUpdate(jobId: string): void;
      }
    ).selectJobForUpdate('job-1');

    expect(updateSpy).toHaveBeenCalledOnceWith('job-1');

    fixture.componentRef.setInput('modalMode', 'pick-delete');
    fixture.detectChanges();

    (
      component as unknown as {
        selectJobForDelete(jobId: string): void;
        trackById(index: number, item: { id: string }): string;
      }
    ).selectJobForDelete('job-1');

    expect(deleteSpy).toHaveBeenCalledOnceWith('job-1');
    expect(
      (
        component as unknown as {
          trackById(index: number, item: { id: string }): string;
        }
      ).trackById(0, { id: 'job-1' }),
    ).toBe('job-1');
  });

  it('should render the delete confirmation summary and selected relation states', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('modalMode', 'delete');
    fixture.componentRef.setInput('selectedJob', {
      id: 'job-1',
      slug: 'frontend-engineer',
      namePt: 'Engenheiro Front-End',
      nameEn: 'Front-End Engineer',
      summaryPt: 'Interfaces publicas e privadas.',
      summaryEn: 'Public and private interfaces.',
      highlight: true,
      sortOrder: 1,
      experienceIds: ['experience-1'],
      imageAssetIds: ['image-asset-1'],
    });
    fixture.componentRef.setInput('form', {
      slug: 'frontend-engineer',
      namePt: 'Engenheiro Front-End',
      nameEn: 'Front-End Engineer',
      summaryPt: 'Interfaces publicas e privadas.',
      summaryEn: 'Public and private interfaces.',
      highlight: true,
      sortOrder: '1',
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
      'This action permanently removes the selected protected job from the portfolio.',
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
