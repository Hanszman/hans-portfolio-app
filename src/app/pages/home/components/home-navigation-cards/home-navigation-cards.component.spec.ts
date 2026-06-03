import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { HomeNavigationCardsComponent } from './home-navigation-cards.component';

describe('HomeNavigationCardsComponent', () => {
  beforeAll(() => {
    if (!customElements.get('hans-icon')) {
      customElements.define('hans-icon', class extends HTMLElement {});
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNavigationCardsComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations(), provideRouter([])],
    }).compileComponents();
  });

  it('should render the navigation cards as links', () => {
    const fixture = TestBed.createComponent(HomeNavigationCardsComponent);

    fixture.componentRef.setInput('cards', [
      {
        eyebrowKey: 'pages.home.navigation.experiences.eyebrow',
        titleKey: 'pages.home.navigation.experiences.title',
        descriptionKey: 'pages.home.navigation.experiences.description',
        route: '/experiences',
      },
      {
        eyebrowKey: 'pages.home.navigation.skills.eyebrow',
        titleKey: 'pages.home.navigation.skills.title',
        descriptionKey: 'pages.home.navigation.skills.description',
        route: '/skills',
      },
      {
        eyebrowKey: 'pages.home.navigation.projects.eyebrow',
        titleKey: 'pages.home.navigation.projects.title',
        descriptionKey: 'pages.home.navigation.projects.description',
        route: '/projects',
      },
    ]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Experiences');
    expect(compiled.textContent).toContain('Skills');
    expect(compiled.textContent).toContain('Projects');
    expect(compiled.querySelectorAll('a')).toHaveSize(3);
    expect(compiled.querySelectorAll('hans-icon')).toHaveSize(3);
  });
});
