import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { PortfolioSocialLinksComponent } from './social-links.component';
import { PORTFOLIO_SOCIAL_LINKS } from './social-links.types';

describe('PortfolioSocialLinksComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioSocialLinksComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should render the social actions and location text', () => {
    const fixture = TestBed.createComponent(PortfolioSocialLinksComponent);
    const openSpy = spyOn(window, 'open');

    fixture.componentRef.setInput('ariaLabelKey', 'footer.social.navigation');
    fixture.componentRef.setInput('locationKey', 'footer.location');
    fixture.componentRef.setInput('links', PORTFOLIO_SOCIAL_LINKS);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(
      compiled.querySelectorAll('hans-button'),
    ) as HTMLElement[];

    expect(buttons).toHaveSize(4);
    expect(compiled.textContent).toContain('Belo Horizonte, Brazil');

    buttons.forEach((button) => button.click());

    expect(openSpy.calls.allArgs()).toEqual([
      ['https://github.com/Hanszman', '_blank', 'noopener,noreferrer'],
      ['https://www.linkedin.com/in/victor-hanszman/', '_blank', 'noopener,noreferrer'],
      ['https://wa.me/5531994533811', '_blank', 'noopener,noreferrer'],
      ['mailto:victor.hanszman@hotmail.com', '_blank', 'noopener,noreferrer'],
    ]);
  });

  it('should render only the location when there are no links', () => {
    const fixture = TestBed.createComponent(PortfolioSocialLinksComponent);

    fixture.componentRef.setInput('ariaLabelKey', 'footer.social.navigation');
    fixture.componentRef.setInput('locationKey', 'footer.location');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('hans-button')).toHaveSize(0);
    expect(compiled.textContent).toContain('Belo Horizonte, Brazil');
  });
});
