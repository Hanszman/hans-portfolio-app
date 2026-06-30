import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { SkillTypeFilterValue } from '../../../skills/skills.types';
import { DashboardChartViewModel } from '../../dashboard.types';
import { DashboardProjectTechnologyPanelComponent } from './dashboard-project-technology-panel.component';

const createChart = (): DashboardChartViewModel => ({
  chartType: 'bar',
  categories: ['React', 'Angular'],
  seriesName: 'Projects by type of technologies',
  series: [
    {
      name: 'Projects by type of technologies',
      type: 'bar',
      data: [2, 4],
      label: {
        position: 'inside',
        formatter: '{c}',
      },
    },
  ],
  colors: ['primary', 'secondary'],
  height: 360,
  showLegend: false,
});

describe('DashboardProjectTechnologyPanelComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardProjectTechnologyPanelComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should render the selector and chart when data is available', () => {
    const fixture = TestBed.createComponent(DashboardProjectTechnologyPanelComponent);
    fixture.componentRef.setInput('labelKey', 'pages.dashboard.projectsByType.label');
    fixture.componentRef.setInput('titleKey', 'pages.dashboard.projectsByType.title');
    fixture.componentRef.setInput('descriptionKey', 'pages.dashboard.projectsByType.description');
    fixture.componentRef.setInput('selectLabelKey', 'pages.dashboard.projectsByType.selectLabel');
    fixture.componentRef.setInput('emptyMessageKey', 'pages.dashboard.projectsByType.empty');
    fixture.componentRef.setInput('options', [
      { label: 'Programming Languages', value: 'PROGRAMMING_LANGUAGES' },
    ]);
    fixture.componentRef.setInput('selectedTechnologyType', 'PROGRAMMING_LANGUAGES');
    fixture.componentRef.setInput('chart', createChart());
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Projects by technology type');
    expect(compiled.querySelector('hans-select-option')).toBeTruthy();
    expect(compiled.querySelector('hans-chart')).toBeTruthy();
  });

  it('should resolve select values and render the empty state when chart data is missing', () => {
    const fixture = TestBed.createComponent(DashboardProjectTechnologyPanelComponent);
    fixture.componentRef.setInput('labelKey', 'pages.dashboard.projectsByType.label');
    fixture.componentRef.setInput('titleKey', 'pages.dashboard.projectsByType.title');
    fixture.componentRef.setInput('descriptionKey', 'pages.dashboard.projectsByType.description');
    fixture.componentRef.setInput('selectLabelKey', 'pages.dashboard.projectsByType.selectLabel');
    fixture.componentRef.setInput('emptyMessageKey', 'pages.dashboard.projectsByType.empty');
    fixture.componentRef.setInput('chart', null);
    fixture.detectChanges();

    const component = fixture.componentInstance as unknown as {
      resolveSelectValue: (event: Event) => SkillTypeFilterValue;
    };

    expect(component.resolveSelectValue({ detail: 'LIBRARIES' } as unknown as Event)).toBe(
      'LIBRARIES',
    );
    expect(
      component.resolveSelectValue({ detail: { value: 'FRAMEWORKS' } } as unknown as Event),
    ).toBe(
      'FRAMEWORKS',
    );
    expect(
      component.resolveSelectValue({
        target: { value: 'PROGRAMMING_LANGUAGES' },
      } as unknown as Event),
    ).toBe('PROGRAMMING_LANGUAGES');
    expect(component.resolveSelectValue(new Event('change'))).toBe('');

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('No project technology breakdown was returned yet.');
    expect(compiled.querySelector('app-info-state')).toBeTruthy();
  });
});
