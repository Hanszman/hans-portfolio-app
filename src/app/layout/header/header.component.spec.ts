import { Component, provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { APP_THEME_STORAGE_KEY } from '../../core/theme/theme.config';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { NavigationComponent } from '../navigation/navigation.component';
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

    expect(brandImage.getAttribute('src')).toContain('assets/img/logo/vh_logo_blue.png');
    expect(compiled.querySelector('hans-toggle')).toBeTruthy();
    expect(compiled.querySelector('hans-dropdown')).toBeTruthy();
    expect(compiled.querySelector('.header-menu-button')).toBeTruthy();
    expect(compiled.querySelector('hans-button[label="Home"]')).toBeTruthy();
    expect(compiled.querySelector('hans-button[label="Projects"]')).toBeTruthy();
  });

  it('should expose theme, language, and mobile menu handlers for design-lib controls', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentRef.setInput('navigationItems', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector('hans-toggle') as HTMLElement;
    const dropdown = compiled.querySelector('hans-dropdown') as HTMLElement & {
      options: readonly {
        label: string;
        value: 'en-us' | 'pt-BR' | 'es-es';
        action?: () => void;
      }[];
    };

    toggle.dispatchEvent(new CustomEvent('change', { detail: true }));
    dropdown.options[1].action?.();
    fixture.detectChanges();

    expect(document.documentElement.getAttribute('data-app-theme')).toBe('dark');
    expect(document.documentElement.lang).toBe('pt-BR');
    expect(compiled.querySelector('.header-theme-icon')).toBeTruthy();
    expect((toggle as HTMLElement & { checked: boolean }).checked).toBeTrue();
    expect(dropdown.options.map((option) => option.value)).toEqual([
      'en-us',
      'pt-BR',
      'es-es',
    ]);

    dropdown.dispatchEvent(
      new CustomEvent('select', { detail: dropdown.options[0] }),
    );
    toggle.dispatchEvent(new CustomEvent('change', { detail: false }));
    fixture.detectChanges();

    expect(document.documentElement.lang).toBe('en-us');
    expect(document.documentElement.getAttribute('data-app-theme')).toBe('light');
    expect((toggle as HTMLElement & { checked: boolean }).checked).toBeFalse();

    dropdown.dispatchEvent(
      new CustomEvent('select', { detail: dropdown.options[2] }),
    );
    fixture.detectChanges();

    expect(document.documentElement.lang).toBe('es-es');

    const menuButton = compiled.querySelector('.header-menu-button') as HTMLElement;
    menuButton.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.navigation-open')).toBeTruthy();

    const navigation = fixture.debugElement.query(
      By.directive(NavigationComponent),
    ).componentInstance as NavigationComponent;

    navigation.itemSelected.emit();
    fixture.detectChanges();

    expect(compiled.querySelector('.navigation-open')).toBeFalsy();
  });
});
