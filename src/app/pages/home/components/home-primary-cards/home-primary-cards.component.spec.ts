import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { HomePrimaryCardsComponent } from './home-primary-cards.component';

describe('HomePrimaryCardsComponent', () => {
  beforeAll(() => {
    for (const elementName of ['hans-icon', 'hans-card']) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePrimaryCardsComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should render the provided primary cards', () => {
    const fixture = TestBed.createComponent(HomePrimaryCardsComponent);
    fixture.componentRef.setInput('ariaLabelKey', 'pages.home.metrics.ariaLabel');
    fixture.componentRef.setInput('cards', [
      {
        value: '7+',
        labelKey: 'pages.home.metrics.years.label',
        descriptionKey: 'pages.home.metrics.years.description',
        iconName: 'LuBadgeCheck',
      },
      {
        value: '60+',
        labelKey: 'common.entities.technologies',
        descriptionKey: 'pages.home.metrics.technologies.description',
        iconName: 'LuCpu',
      },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('7+');
    expect(compiled.textContent).toContain('60+');
    expect(compiled.querySelectorAll('hans-card')).toHaveSize(2);
  });
});
