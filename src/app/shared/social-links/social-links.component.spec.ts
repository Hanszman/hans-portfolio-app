import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { SocialLinksComponent } from './social-links.component';
import { PORTFOLIO_SOCIAL_LINKS } from './social-links.types';

describe('SocialLinksComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialLinksComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  it('should render and open the social actions', () => {
    const fixture = TestBed.createComponent(SocialLinksComponent);
    const openSpy = spyOn(window, 'open');

    fixture.componentRef.setInput('ariaLabelKey', 'footer.social.navigation');
    fixture.componentRef.setInput('links', PORTFOLIO_SOCIAL_LINKS);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(
      compiled.querySelectorAll('hans-button'),
    ) as HTMLElement[];

    expect(buttons).toHaveSize(4);

    buttons.forEach((button) => button.click());

    expect(openSpy.calls.allArgs()).toEqual([
      ['https://github.com/Hanszman', '_blank', 'noopener,noreferrer'],
      ['https://www.linkedin.com/in/victor-hanszman/', '_blank', 'noopener,noreferrer'],
      ['https://wa.me/5531994533811', '_blank', 'noopener,noreferrer'],
      ['mailto:victor.hanszman@hotmail.com', '_blank', 'noopener,noreferrer'],
    ]);
  });

  it('should render no actions when there are no links', () => {
    const fixture = TestBed.createComponent(SocialLinksComponent);

    fixture.componentRef.setInput('ariaLabelKey', 'footer.social.navigation');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('hans-button')).toHaveSize(0);
  });
});
