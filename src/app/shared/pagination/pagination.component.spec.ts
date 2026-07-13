import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationComponent>;
  let component: PaginationComponent;

  beforeAll(() => {
    if (!customElements.get('hans-button')) {
      customElements.define('hans-button', class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('currentPage', 2);
    fixture.componentRef.setInput('totalPages', 3);
    fixture.detectChanges();
  });

  it('should render the navigation only when multiple pages exist', () => {
    expect(fixture.nativeElement.textContent).toContain('Previous');
    expect(fixture.nativeElement.textContent).toContain('Next');
    expect(fixture.nativeElement.textContent).toContain('1');
    expect(fixture.nativeElement.textContent).toContain('2');
    expect(fixture.nativeElement.textContent).toContain('3');

    fixture.componentRef.setInput('totalPages', 1);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('Previous');
  });

  it('should emit page changes only for valid navigation targets', () => {
    const emittedPages: number[] = [];

    component.pageSelected.subscribe((page) => emittedPages.push(page));

    (
      component as unknown as {
        selectPage(page: number): void;
      }
    ).selectPage(1);
    (
      component as unknown as {
        selectPage(page: number): void;
      }
    ).selectPage(2);
    (
      component as unknown as {
        selectPage(page: number): void;
      }
    ).selectPage(4);

    expect(emittedPages).toEqual([1]);
  });

  it('should block navigation when the control is disabled', () => {
    const emittedPages: number[] = [];

    component.pageSelected.subscribe((page) => emittedPages.push(page));
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    (
      component as unknown as {
        selectPage(page: number): void;
      }
    ).selectPage(1);

    expect(emittedPages).toEqual([]);
  });
});
