import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { APP_THEME_STORAGE_KEY } from '../../core/theme/theme.config';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { HeaderComponent } from './header.component';

@Component({
  template: '',
})
class TestRouteComponent {}

describe('HeaderComponent', () => {
  beforeAll(() => {
    if (!customElements.get('hans-dropdown')) {
      customElements.define(
        'hans-dropdown',
        class extends HTMLElement {
          options?: readonly unknown[];
        },
      );
    }
  });

  beforeEach(async () => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);
    localStorage.removeItem(APP_THEME_STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideAppTranslations(),
        provideRouter([
          {
            path: 'home',
            component: TestRouteComponent,
          },
          {
            path: 'projects',
            component: TestRouteComponent,
          },
        ]),
      ],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);
    localStorage.removeItem(APP_THEME_STORAGE_KEY);
    document.documentElement.lang = '';
    document.documentElement.removeAttribute('data-app-theme');
    document.body.removeAttribute('data-app-theme');
  });

  it('should render the old-style shell navigation with logo and controls', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentRef.setInput('navigationItems', [
      {
        path: '/home',
        label: 'Home',
      },
      {
        path: '/projects',
        label: 'Projects',
      },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const brandImage = compiled.querySelector('.header-brand-image') as HTMLImageElement;
    const navigationButtons = Array.from(
      compiled.querySelectorAll('.header-navigation hans-button'),
    ) as (HTMLElement & { label?: string })[];
    const dropdowns = compiled.querySelectorAll('hans-dropdown');

    expect(brandImage.getAttribute('src')).toContain('assets/img/logo/vh_logo_blue.png');
    expect(compiled.querySelector('hans-toggle')).toBeTruthy();
    expect(dropdowns).toHaveSize(2);
    expect(compiled.querySelector('.header-menu-dropdown')).toBeTruthy();
    expect(navigationButtons.map((button) => button.label)).toEqual(['Home', 'Projects']);
  });

  it('should expose theme, language and mobile menu handlers for design-lib controls', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigateByUrl').and.resolveTo(true);
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentRef.setInput('navigationItems', [
      {
        path: '/home',
        label: 'Home',
      },
      {
        path: '/projects',
        label: 'Projects',
      },
    ]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector('hans-toggle') as HTMLElement;
    const languageDropdown = compiled.querySelector(
      'app-header-language-dropdown hans-dropdown',
    ) as HTMLElement & {
      options: readonly {
        label: string;
        value: 'en-us' | 'pt-br' | 'es-es';
        action?: () => void;
      }[];
    };
    const mobileDropdown = compiled.querySelector('.header-menu-dropdown') as HTMLElement & {
      options: readonly {
        label: string;
        value: string;
      }[];
    };

    toggle.dispatchEvent(new CustomEvent('change', { detail: true }));
    languageDropdown.options[1].action?.();
    fixture.detectChanges();

    expect(document.documentElement.getAttribute('data-app-theme')).toBe('dark');
    expect(document.documentElement.lang).toBe('pt-br');
    expect(compiled.querySelector('.header-theme-icon')).toBeTruthy();
    expect((toggle as HTMLElement & { checked: boolean }).checked).toBeTrue();
    expect(languageDropdown.options.map((option) => option.value)).toEqual([
      'en-us',
      'pt-br',
      'es-es',
    ]);

    languageDropdown.dispatchEvent(
      new CustomEvent('select', { detail: languageDropdown.options[0] }),
    );
    toggle.dispatchEvent(new CustomEvent('change', { detail: false }));
    fixture.detectChanges();

    expect(document.documentElement.lang).toBe('en-us');
    expect(document.documentElement.getAttribute('data-app-theme')).toBe('light');
    expect((toggle as HTMLElement & { checked: boolean }).checked).toBeFalse();

    languageDropdown.dispatchEvent(
      new CustomEvent('select', { detail: languageDropdown.options[2] }),
    );
    fixture.detectChanges();

    expect(document.documentElement.lang).toBe('es-es');
    expect(mobileDropdown.options.map((option) => option.label)).toEqual(['Home', 'Projects']);

    mobileDropdown.dispatchEvent(new CustomEvent('select', { detail: mobileDropdown.options[1] }));
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith('/projects');
  });
});
