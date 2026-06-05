import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  beforeAll(() => {
    for (const elementName of ['hans-card', 'hans-icon']) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations(), provideRouter([])],
    }).compileComponents();
  });

  it('should render a navigation card', () => {
    const fixture = TestBed.createComponent(CardComponent);

    fixture.componentRef.setInput('card', {
      alignment: 'start',
      route: '/projects',
      eyebrowKey: 'pages.home.navigation.projects.eyebrow',
      titleKey: 'pages.home.navigation.projects.title',
      descriptionKey: 'pages.home.navigation.projects.description',
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Projects');
    expect(compiled.querySelector('.card-action')).not.toBeNull();
    const hansCard = compiled.querySelector('hans-card') as HTMLElement & {
      cardLayout: string;
      cardSize: string;
    };

    expect(hansCard).not.toBeNull();
    expect(hansCard.cardLayout).toBe('custom');
    expect(hansCard.cardSize).toBe('large');
    expect(compiled.querySelectorAll('hans-card')).toHaveSize(1);
  });

  it('should render a metric card with adornments', () => {
    const fixture = TestBed.createComponent(CardComponent);

    fixture.componentRef.setInput('card', {
      alignment: 'center',
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
    const fixture = TestBed.createComponent(CardComponent);

    fixture.componentRef.setInput('card', {
      alignment: 'center',
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('hans-icon')).toBeNull();
    expect(compiled.querySelector('.card-value')).toBeNull();
    expect(compiled.querySelector('.card-label')).toBeNull();
    expect(compiled.querySelector('.card-description')).toBeNull();
  });
});
