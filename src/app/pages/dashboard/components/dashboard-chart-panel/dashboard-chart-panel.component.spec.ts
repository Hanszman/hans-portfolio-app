import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { DashboardChartViewModel } from '../../dashboard.types';
import { DashboardChartPanelComponent } from './dashboard-chart-panel.component';

const createChart = (): DashboardChartViewModel => ({
  chartType: 'doughnut',
  categories: ['A', 'B'],
  seriesName: 'Stack distribution',
  series: [
    {
      name: 'Stack distribution',
      type: 'doughnut',
      data: [8, 5],
    },
  ],
  colors: ['primary', 'secondary'],
  height: 320,
  showLegend: true,
});

describe('DashboardChartPanelComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardChartPanelComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should render the chart container when data is available', () => {
    const fixture = TestBed.createComponent(DashboardChartPanelComponent);
    fixture.componentRef.setInput('labelKey', 'pages.dashboard.stacks.label');
    fixture.componentRef.setInput('titleKey', 'pages.dashboard.stacks.title');
    fixture.componentRef.setInput('descriptionKey', 'pages.dashboard.stacks.description');
    fixture.componentRef.setInput('emptyMessageKey', 'pages.dashboard.stacks.empty');
    fixture.componentRef.setInput('chart', createChart());
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Stack distribution');
    expect(compiled.querySelector('hans-chart')).toBeTruthy();
    expect(compiled.querySelector('.dashboard-chart-scrollable')).toBeTruthy();
  });

  it('should render the empty state when no chart is available', () => {
    const fixture = TestBed.createComponent(DashboardChartPanelComponent);
    fixture.componentRef.setInput('labelKey', 'pages.dashboard.stacks.label');
    fixture.componentRef.setInput('titleKey', 'pages.dashboard.stacks.title');
    fixture.componentRef.setInput('descriptionKey', 'pages.dashboard.stacks.description');
    fixture.componentRef.setInput('emptyMessageKey', 'pages.dashboard.stacks.empty');
    fixture.componentRef.setInput('chart', null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('No stack distribution was returned yet.');
    expect(compiled.querySelector('app-info-state')).toBeTruthy();
  });
});
