import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { OperationsModalComponent } from './operations-modal.component';

describe('OperationsModalComponent', () => {
  let fixture: ComponentFixture<OperationsModalComponent>;
  let component: OperationsModalComponent;

  beforeAll(() => {
    for (const elementName of ['hans-button', 'hans-loading', 'hans-modal']) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationsModalComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationsModalComponent);
    component = fixture.componentInstance;
  });

  it('should render description, pagination and submit action when configured', () => {
    const closedSpy = jasmine.createSpy('closed');
    const submittedSpy = jasmine.createSpy('submitted');
    const pageSpy = jasmine.createSpy('pageSelected');

    component.closed.subscribe(closedSpy);
    component.submitted.subscribe(submittedSpy);
    component.pageSelected.subscribe(pageSpy);

    fixture.componentRef.setInput('isOpen', true);
    fixture.componentRef.setInput('titleKey', 'pages.admin.tags.modal.read.title');
    fixture.componentRef.setInput(
      'descriptionKey',
      'pages.admin.tags.modal.read.description',
    );
    fixture.componentRef.setInput('showPagination', true);
    fixture.componentRef.setInput('showSubmit', true);
    fixture.componentRef.setInput('pagination', {
      page: 2,
      pageSize: 5,
      totalItems: 10,
      totalPages: 3,
      hasPreviousPage: true,
      hasNextPage: true,
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Review the current protected tags');

    (
      component as unknown as {
        requestClose(): void;
        submit(): void;
        selectPage(page: number): void;
      }
    ).selectPage(3);
    (
      component as unknown as {
        requestClose(): void;
        submit(): void;
        selectPage(page: number): void;
      }
    ).submit();
    (
      component as unknown as {
        requestClose(): void;
        submit(): void;
        selectPage(page: number): void;
      }
    ).requestClose();

    expect(pageSpy).toHaveBeenCalledOnceWith(3);
    expect(submittedSpy).toHaveBeenCalledTimes(1);
    expect(closedSpy).toHaveBeenCalledTimes(1);
  });

  it('should expose disabled interactions while loading or submitting and hide optional areas by default', () => {
    expect(
      (
        component as unknown as {
          isInteractionDisabled(): boolean;
        }
      ).isInteractionDisabled(),
    ).toBeFalse();

    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();
    expect(
      (
        component as unknown as {
          isInteractionDisabled(): boolean;
        }
      ).isInteractionDisabled(),
    ).toBeTrue();

    fixture.componentRef.setInput('isLoading', false);
    fixture.componentRef.setInput('isSubmitting', true);
    fixture.detectChanges();
    expect(
      (
        component as unknown as {
          isInteractionDisabled(): boolean;
        }
      ).isInteractionDisabled(),
    ).toBeTrue();

    expect(fixture.nativeElement.textContent).not.toContain('Previous');
    expect(fixture.nativeElement.textContent).not.toContain('Save');
  });
});
