import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { DashboardChartViewModel } from '../../dashboard.types';
import { DashboardAnalyticsGridComponent } from './dashboard-analytics-grid.component';

const createChart = (title: string, chartType: DashboardChartViewModel['chartType']): DashboardChartViewModel => ({
  chartType,
  categories: ['A', 'B'],
  seriesName: title,
  series: [
    {
      name: title,
      type: chartType,
      data: [10, 20],
    },
  ],
  colors: ['primary', 'secondary'],
  height: 320,
  showLegend: chartType === 'doughnut',
});

describe('DashboardAnalyticsGridComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAnalyticsGridComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should render the four dashboard chart panels', () => {
    const fixture = TestBed.createComponent(DashboardAnalyticsGridComponent);
    fixture.componentRef.setInput('stackChart', createChart('Stacks', 'doughnut'));
    fixture.componentRef.setInput('technologyLevelChart', createChart('Levels', 'doughnut'));
    fixture.componentRef.setInput('projectEnvironmentChart', createChart('Projects', 'doughnut'));
    fixture.componentRef.setInput('technologyUsageChart', createChart('Usage', 'bar'));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('app-dashboard-chart-panel').length).toBe(4);
    expect(compiled.textContent).toContain('Stack distribution');
    expect(compiled.textContent).toContain('Technology usage');
    expect(compiled.textContent).toContain('Project footprint');
  });
});
