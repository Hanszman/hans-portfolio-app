import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { DashboardHeroComponent } from './dashboard-hero.component';

describe('DashboardHeroComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHeroComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should render the dashboard hero copy', () => {
    const fixture = TestBed.createComponent(DashboardHeroComponent);
    fixture.componentRef.setInput('sectionLabelKey', 'pages.dashboard.sectionLabel');
    fixture.componentRef.setInput('titleKey', 'pages.dashboard.title');
    fixture.componentRef.setInput('descriptionKey', 'pages.dashboard.description');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('// DASHBOARD');
    expect(compiled.textContent).toContain('Analytics Dashboard');
    expect(compiled.textContent).toContain(
      'Aggregated analysis of career stacks, tools and projects, presented on a dashboard with informative charts.',
    );
  });
});
