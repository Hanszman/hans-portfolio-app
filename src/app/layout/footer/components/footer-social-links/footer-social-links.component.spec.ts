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

  it('should render social action buttons and open the expected links', () => {
    const fixture = TestBed.createComponent(FooterSocialLinksComponent);
    const openSpy = spyOn(window, 'open');
    fixture.detectChanges();

    const buttons = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('hans-button'),
    ) as HTMLElement[];

    expect(buttons).toHaveSize(3);

    buttons[0].click();
    buttons[1].click();
    buttons[2].click();

    expect(openSpy.calls.allArgs()).toEqual([
      ['https://github.com/Hanszman', '_blank', 'noopener,noreferrer'],
      ['https://www.linkedin.com/in/victor-hanszman/', '_blank', 'noopener,noreferrer'],
      ['https://wa.me/5531994533811', '_blank', 'noopener,noreferrer'],
    ]);
  });
});
