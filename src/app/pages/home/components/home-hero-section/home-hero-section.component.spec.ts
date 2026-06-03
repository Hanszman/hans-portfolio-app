import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { HomeHeroSectionComponent } from './home-hero-section.component';

describe('HomeHeroSectionComponent', () => {
  beforeAll(() => {
    for (const elementName of ['hans-button', 'hans-avatar', 'hans-icon']) {
      if (!customElements.get(elementName)) {
        customElements.define(elementName, class extends HTMLElement {});
      }
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHeroSectionComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations(), provideRouter([])],
    }).compileComponents();
  });

  it('should render the hero copy and social buttons', () => {
    const fixture = TestBed.createComponent(HomeHeroSectionComponent);
    const openSpy = spyOn(window, 'open');

    fixture.componentRef.setInput('hero', {
      availabilityKey: 'pages.home.hero.availability',
      greetingKey: 'pages.home.hero.greeting',
      name: 'Victor Hanszman',
      subtitleKey: 'pages.home.hero.subtitle',
      descriptionKey: 'pages.home.hero.description',
      locationKey: 'pages.home.hero.location',
      primaryActionLabelKey: 'pages.home.hero.cta.projects',
      primaryActionRoute: '/projects',
      secondaryActionLabelKey: 'pages.home.hero.cta.experiences',
      secondaryActionRoute: '/experiences',
      socialLinks: [
        {
          labelKey: 'pages.home.hero.social.github',
          href: 'https://github.com/Hanszman',
          iconName: 'LuGithub',
        },
        {
          labelKey: 'pages.home.hero.social.linkedin',
          href: 'https://www.linkedin.com/in/victor-hanszman/',
          iconName: 'LuLinkedin',
        },
        {
          labelKey: 'pages.home.hero.social.email',
          href: 'mailto:victor.hanszman@hotmail.com',
          iconName: 'LuMail',
        },
      ],
      imageSrc: '/assets/profile.png',
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain("Hi, I'm");
    expect(compiled.textContent).toContain('Victor Hanszman');
    expect(compiled.textContent).toContain('Full Stack Web Developer');
    expect(compiled.querySelectorAll('hans-button')).toHaveSize(5);

    const socialButtons = Array.from(
      compiled.querySelectorAll('.home-hero-links hans-button'),
    ) as HTMLElement[];

    socialButtons[0].click();
    socialButtons[1].click();
    socialButtons[2].click();

    expect(openSpy.calls.allArgs()).toEqual([
      ['https://github.com/Hanszman', '_blank', 'noopener,noreferrer'],
      ['https://www.linkedin.com/in/victor-hanszman/', '_blank', 'noopener,noreferrer'],
      ['mailto:victor.hanszman@hotmail.com', '_blank', 'noopener,noreferrer'],
    ]);
  });
});
