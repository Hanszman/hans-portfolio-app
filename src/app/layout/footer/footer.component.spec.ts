import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { FooterComponent } from './footer.component';

@Component({
  template: '',
})
class TestRouteComponent {}

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        provideRouter([
          {
            path: 'home',
            component: TestRouteComponent,
          },
          {
            path: 'dashboard',
            component: TestRouteComponent,
          },
        ]),
      ],
    }).compileComponents();
  });

  it('should render the legacy-inspired social footer and copyright', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const copyButton = compiled.querySelector('.footer-copy-button') as
      | (HTMLElement & { label?: string })
      | null;

    expect(compiled.querySelectorAll('app-portfolio-social-links hans-button')).toHaveSize(4);
    expect(compiled.textContent).toContain('Belo Horizonte, Brazil');
    expect(copyButton?.label).toBe('Victor Hanszman');
    expect(compiled.textContent).toContain(String(new Date().getFullYear()));
  });

  it('should navigate home when the copyright button is clicked', async () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl').and.resolveTo(true);
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();

    const copyButton = (fixture.nativeElement as HTMLElement).querySelector(
      '.footer-copy-button',
    ) as HTMLElement;

    copyButton.click();
    await fixture.whenStable();

    expect(navigateSpy).toHaveBeenCalledWith('/home');
  });
});
