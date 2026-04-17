import { Component, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { APP_THEME_STORAGE_KEY } from '../../core/theme/theme.config';
import { APP_LOCALE_STORAGE_KEY } from '../../core/translation/translation.config';
import { provideAppTranslations } from '../../core/translation/translation.providers';
import { HeaderComponent } from './header.component';

@Component({
  template: '',
})
class TestRouteComponent {}

describe('HeaderComponent', () => {
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

  it('should render the brand, shell message, and navigation', () => {
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

    expect(compiled.textContent).toContain('Victor Hanszman');
    expect(compiled.textContent).toContain(
      'A shell specific to the portfolio, already connected to real backend data.',
    );
    expect(compiled.querySelectorAll('hans-tag')).toHaveSize(3);
    expect(compiled.querySelector('hans-toggle')).toBeTruthy();
    expect(compiled.querySelector('hans-dropdown')).toBeTruthy();
    expect(compiled.querySelector('hans-button[label="Home"]')).toBeTruthy();
    expect(compiled.querySelector('hans-button[label="Projects"]')).toBeTruthy();
  });

  it('should expose theme and language handlers for design-lib controls', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.componentRef.setInput('navigationItems', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector('hans-toggle') as HTMLElement;
    const dropdown = compiled.querySelector('hans-dropdown') as HTMLElement & {
      options: readonly {
        label: string;
        value: 'en-us' | 'pt-BR';
        action?: () => void;
      }[];
    };

    toggle.dispatchEvent(new CustomEvent('change', { detail: true }));
    dropdown.options[1].action?.();
    fixture.detectChanges();

    expect(document.documentElement.getAttribute('data-app-theme')).toBe('dark');
    expect(document.documentElement.lang).toBe('pt-BR');
    expect((toggle as HTMLElement & { checked: boolean }).checked).toBeTrue();
    expect(dropdown.options.map((option) => option.value)).toEqual([
      'en-us',
      'pt-BR',
    ]);

    dropdown.dispatchEvent(
      new CustomEvent('select', { detail: dropdown.options[0] }),
    );
    toggle.dispatchEvent(new CustomEvent('change', { detail: false }));
    fixture.detectChanges();

    expect(document.documentElement.lang).toBe('en-us');
    expect(document.documentElement.getAttribute('data-app-theme')).toBe('light');
    expect((toggle as HTMLElement & { checked: boolean }).checked).toBeFalse();
  });
});
