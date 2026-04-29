import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioStateComponent } from './portfolio-state.component';

describe('PortfolioStateComponent', () => {
  let fixture: ComponentFixture<PortfolioStateComponent>;

  beforeAll(() => {
    if (!customElements.get('hans-loading')) {
      customElements.define('hans-loading', class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioStateComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioStateComponent);
  });

  it('renders loading state with hans loading', () => {
    fixture.componentRef.setInput('mode', 'loading');
    fixture.componentRef.setInput('message', 'Loading...');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('hans-loading')).toBeTruthy();
    expect(compiled.textContent).toContain('Loading...');
  });

  it('renders non-loading states without spinner', () => {
    fixture.componentRef.setInput('mode', 'error');
    fixture.componentRef.setInput('message', 'Something went wrong.');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('hans-loading')).toBeFalsy();
    expect(compiled.textContent).toContain('Something went wrong.');
    expect(compiled.querySelector('[data-mode="error"]')).toBeTruthy();
  });
});
