import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { PortfolioCardComponent } from './portfolio-card.component';

describe('PortfolioCardComponent', () => {
  beforeAll(() => {
    for (const elementName of ['hans-card', 'hans-icon']) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioCardComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations(), provideRouter([])],
    }).compileComponents();
  });

  it('should render a navigation card', () => {
    const fixture = TestBed.createComponent(PortfolioCardComponent);

    fixture.componentRef.setInput('card', {
      variant: 'navigation',
      route: '/projects',
      eyebrowKey: 'pages.home.navigation.projects.eyebrow',
      titleKey: 'pages.home.navigation.projects.title',
      descriptionKey: 'pages.home.navigation.projects.description',
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Projects');
    expect(compiled.querySelector('a')).not.toBeNull();
    expect(compiled.querySelector('hans-card')).not.toBeNull();
  });

  it('should render a metric card with adornments', () => {
    const fixture = TestBed.createComponent(PortfolioCardComponent);

    fixture.componentRef.setInput('card', {
      variant: 'metric',
      iconName: 'LuSparkles',
      value: '12+',
      labelKey: 'pages.home.metrics.projects.label',
      descriptionKey: 'pages.home.metrics.projects.description',
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('12+');
    expect(compiled.textContent).toContain('Projects');
    expect(compiled.querySelector('hans-icon')).not.toBeNull();
  });

  it('should render a metric card without optional adornments', () => {
    const fixture = TestBed.createComponent(PortfolioCardComponent);

    fixture.componentRef.setInput('card', {
      variant: 'metric',
      descriptionKey: 'pages.home.metrics.description',
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('hans-icon')).toBeNull();
    expect(compiled.querySelector('.portfolio-card-value')).toBeNull();
    expect(compiled.querySelector('.portfolio-card-label')).toBeNull();
    expect(compiled.textContent).toContain('pages.home.metrics.description');
  });
});
