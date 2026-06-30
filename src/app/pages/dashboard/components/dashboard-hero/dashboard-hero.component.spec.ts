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

    expect(compiled.textContent).toContain('Foundation');
    expect(compiled.textContent).toContain('Portfolio analytics dashboard');
    expect(compiled.textContent).toContain(
      'Aggregate signals across projects, stack and career now live in their own route, fed by the public dashboard endpoints.',
    );
  });
});
