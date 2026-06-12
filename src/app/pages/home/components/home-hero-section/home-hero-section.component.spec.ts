import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { HomeHeroSectionComponent } from './home-hero-section.component';
import { PORTFOLIO_SOCIAL_LINKS } from '../../../../shared/social-links/social-links.types';

describe('HomeHeroSectionComponent', () => {
  beforeAll(() => {
    for (const elementName of [
      'hans-button',
      'hans-avatar',
      'hans-icon',
      'hans-card',
    ]) {
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
      socialLinks: PORTFOLIO_SOCIAL_LINKS,
      imageSrc: '/assets/img/profile/vh_profile.png',
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain("Hi, I'm");
    expect(compiled.textContent).toContain('Victor Hanszman');
    expect(compiled.textContent).toContain('Full Stack Software Engineer');
    expect(compiled.querySelectorAll('hans-button')).toHaveSize(6);
    expect(compiled.querySelectorAll('.home-hero-social hans-button.social-links-button')).toHaveSize(4);

    const socialButtons = Array.from(
      compiled.querySelectorAll('.home-hero-social hans-button.social-links-button'),
    ) as HTMLElement[];

    socialButtons[0].click();
    socialButtons[1].click();
    socialButtons[2].click();
    socialButtons[3].click();

    expect(openSpy.calls.allArgs()).toEqual([
      ['https://github.com/Hanszman', '_blank', 'noopener,noreferrer'],
      ['https://www.linkedin.com/in/victor-hanszman/', '_blank', 'noopener,noreferrer'],
      ['https://wa.me/5531994533811', '_blank', 'noopener,noreferrer'],
      ['mailto:victor.hanszman@hotmail.com', '_blank', 'noopener,noreferrer'],
    ]);
  });
});
