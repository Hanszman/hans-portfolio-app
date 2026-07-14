import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { OperationsModalComponent } from './operations-modal.component';

describe('OperationsModalComponent', () => {
  let fixture: ComponentFixture<OperationsModalComponent>;
  let component: OperationsModalComponent;

  beforeAll(() => {
    for (const elementName of ['hans-modal']) {
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

  it('should expose modal footer props, pagination props and output emitters', () => {
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

    const modalElement = fixture.nativeElement.querySelector('hans-modal') as
      | (HTMLElement & {
          cancelLabel?: string;
          confirmLabel?: string;
          closeOnConfirm?: boolean;
          paginationCurrentPage?: number;
          paginationTotalPages?: number;
          paginationPageLabel?: string;
        })
      | null;

    expect(modalElement?.cancelLabel).toBe('Close');
    expect(modalElement?.confirmLabel).toBe('Save');
    expect(modalElement?.closeOnConfirm).toBeFalse();
    expect(modalElement?.paginationCurrentPage).toBe(2);
    expect(modalElement?.paginationTotalPages).toBe(3);
    expect(modalElement?.paginationPageLabel).toBe('Page');

    (
      component as unknown as {
        requestClose(): void;
        submit(): void;
        selectPage(event: Event | number): void;
      }
    ).selectPage(3);
    (
      component as unknown as {
        requestClose(): void;
        submit(): void;
        selectPage(event: Event | number): void;
      }
    ).selectPage(
      new CustomEvent('pagechange', {
        detail: 6,
      }),
    );
    (
      component as unknown as {
        requestClose(): void;
        submit(): void;
        selectPage(event: Event | number): void;
      }
    ).selectPage(
      new CustomEvent('pagechange', {
        detail: {
          page: 4,
        },
      }),
    );
    (
      component as unknown as {
        requestClose(): void;
        submit(): void;
        selectPage(event: Event | number): void;
      }
    ).selectPage(
      {
        target: {
          page: 5,
        },
      } as unknown as Event,
    );
    (
      component as unknown as {
        requestClose(): void;
        submit(): void;
        selectPage(event: Event | number): void;
      }
    ).selectPage(new Event('pagechange'));
    (
      component as unknown as {
        requestClose(): void;
        submit(): void;
        selectPage(event: Event | number): void;
      }
    ).submit();
    (
      component as unknown as {
        requestClose(): void;
        submit(): void;
        selectPage(event: Event | number): void;
      }
    ).requestClose();

    expect(pageSpy).toHaveBeenCalledWith(3);
    expect(pageSpy).toHaveBeenCalledWith(6);
    expect(pageSpy).toHaveBeenCalledWith(4);
    expect(pageSpy).toHaveBeenCalledWith(5);
    expect(pageSpy).toHaveBeenCalledTimes(4);
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

    const modalElement = fixture.nativeElement.querySelector('hans-modal') as
      | (HTMLElement & {
          paginationCurrentPage?: number;
          confirmLabel?: string;
          dismissible?: boolean;
          cancelDisabled?: boolean;
          confirmDisabled?: boolean;
        })
      | null;

    expect(modalElement?.paginationCurrentPage).toBe(0);
    expect(modalElement?.confirmLabel).toBe('');
    expect(modalElement?.dismissible).toBeFalse();
    expect(modalElement?.cancelDisabled).toBeTrue();
    expect(modalElement?.confirmDisabled).toBeTrue();
  });
});
