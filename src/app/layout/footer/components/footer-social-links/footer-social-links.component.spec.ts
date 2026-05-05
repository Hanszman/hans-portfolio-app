import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { FooterSocialLinksComponent } from './footer-social-links.component';

describe('FooterSocialLinksComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSocialLinksComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should render the expected social links from the old portfolio', () => {
    const fixture = TestBed.createComponent(FooterSocialLinksComponent);
    fixture.detectChanges();

    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('a'),
    ).map((anchor) => anchor.getAttribute('href'));

    expect(links).toEqual([
      'https://github.com/Hanszman',
      'https://www.linkedin.com/in/victor-hanszman-b1362215b/',
      'https://wa.me/5531994533811',
    ]);
  });
});
