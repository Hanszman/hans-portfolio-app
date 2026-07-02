import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { TranslationService } from '../../core/translation/translation.service';
import { ShellComponent } from './shell.component';

@Component({
  template: '',
})
class TestRouteComponent {}

describe('ShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        provideRouter([
          {
            path: '',
            children: [
              {
                path: 'home',
                component: TestRouteComponent,
              },
              {
                path: 'projects',
                component: TestRouteComponent,
              },
              {
                path: 'admin',
                component: TestRouteComponent,
              },
              {
                path: 'admin/login',
                component: TestRouteComponent,
              },
            ],
          },
        ]),
      ],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.removeItem('hans-portfolio-locale');
    document.documentElement.lang = '';
  });

  it('should render the shell header, routed content and footer', async () => {
    const fixture = TestBed.createComponent(ShellComponent);
    const translation = TestBed.inject(TranslationService);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const footerCopyButton = compiled.querySelector('.footer-copyright-button') as
      | (HTMLElement & { label?: string })
      | null;
    const getNavigationLabels = (): string[] =>
      Array.from(compiled.querySelectorAll('.header-navigation hans-button')).map(
        (button) => (button as HTMLElement & { label?: string }).label ?? '',
      );

    expect(footerCopyButton?.label).toBe('Victor Hanszman');
    expect(getNavigationLabels()).toContain('Projects');
    expect(getNavigationLabels()).not.toContain('Admin');

    translation.setLocale('pt-br');
    fixture.detectChanges();

    expect(getNavigationLabels()).toEqual(['Home', 'Projetos']);

    translation.setLocale('en-us');
  });

  it('should navigate home when the footer name is clicked', async () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl').and.resolveTo(true);
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();

    const copyButton = (fixture.nativeElement as HTMLElement).querySelector(
      '.footer-copyright-button',
    ) as HTMLElement;

    copyButton.click();
    await fixture.whenStable();

    expect(navigateSpy).toHaveBeenCalledWith('/home');
  });
});
