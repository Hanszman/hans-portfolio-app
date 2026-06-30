import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import {
  DashboardSummaryCardViewModel,
  DASHBOARD_SUMMARY_LABEL_KEYS,
} from '../../dashboard.types';
import { DashboardSummaryStripComponent } from './dashboard-summary-strip.component';

describe('DashboardSummaryStripComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSummaryStripComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should render the summary cards using the shared card component', () => {
    const fixture = TestBed.createComponent(DashboardSummaryStripComponent);
    const cards: readonly DashboardSummaryCardViewModel[] = [
      {
        labelKey: DASHBOARD_SUMMARY_LABEL_KEYS.projects,
        value: '21',
        iconName: 'LuFolderKanban',
      },
      {
        labelKey: DASHBOARD_SUMMARY_LABEL_KEYS.technologies,
        value: '60',
        iconName: 'LuCpu',
      },
    ];

    fixture.componentRef.setInput('cards', cards);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('app-card').length).toBe(2);
    expect(compiled.textContent).toContain('21');
    expect(compiled.textContent).toContain('60');
    expect(compiled.textContent).toContain('Projects');
    expect(compiled.textContent).toContain('Technologies');
  });
});
