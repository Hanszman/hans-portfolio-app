import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { HomeMetricsStripComponent } from './home-metrics-strip.component';

describe('HomeMetricsStripComponent', () => {
  beforeAll(() => {
    if (!customElements.get('hans-icon')) {
      customElements.define('hans-icon', class extends HTMLElement {});
    }
    if (!customElements.get('hans-card')) {
      customElements.define('hans-card', class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMetricsStripComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should render the provided metrics cards', () => {
    const fixture = TestBed.createComponent(HomeMetricsStripComponent);

    fixture.componentRef.setInput('ariaLabelKey', 'pages.home.metrics.ariaLabel');
    fixture.componentRef.setInput('metrics', [
      {
        value: '7+',
        labelKey: 'pages.home.metrics.years.label',
        descriptionKey: 'pages.home.metrics.years.description',
        iconName: 'LuBadgeCheck',
      },
      {
        value: '60+',
        labelKey: 'pages.home.metrics.technologies.label',
        descriptionKey: 'pages.home.metrics.technologies.description',
        iconName: 'LuCpu',
      },
      {
        value: '13+',
        labelKey: 'pages.home.metrics.projects.label',
        descriptionKey: 'pages.home.metrics.projects.description',
        iconName: 'LuFolderKanban',
      },
    ]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('7+');
    expect(compiled.textContent).toContain('60+');
    expect(compiled.textContent).toContain('13+');
    expect(compiled.querySelectorAll('hans-card')).toHaveSize(3);
  });
});
