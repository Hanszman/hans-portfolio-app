import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DashboardPageComponent } from './dashboard-page.component';

describe('DashboardPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPageComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should render the dashboard foundation content', () => {
    const fixture = TestBed.createComponent(DashboardPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Dashboard foundation');
    expect(compiled.textContent).toContain(
      'Operational metrics and aggregate portfolio data',
    );
    expect(compiled.textContent).toContain('Charts and portfolio health');
  });
});
