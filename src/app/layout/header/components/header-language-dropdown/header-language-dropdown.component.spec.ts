import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_LOCALE_STORAGE_KEY } from '../../../../core/translation/translation.config';
import { provideAppTranslations } from '../../../../core/translation/translation.providers';
import { HeaderLanguageDropdownComponent } from './header-language-dropdown.component';

describe('HeaderLanguageDropdownComponent', () => {
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

    await TestBed.configureTestingModule({
      imports: [HeaderLanguageDropdownComponent],
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);
    document.documentElement.lang = '';
  });

  it('should configure language options with flag assets and react to selection', () => {
    const fixture = TestBed.createComponent(HeaderLanguageDropdownComponent);
    fixture.detectChanges();

    const dropdown = fixture.nativeElement.querySelector('hans-dropdown') as HTMLElement & {
      options: readonly {
        label: string;
        value: 'en-us' | 'pt-BR' | 'es-es';
        imageSrc: string;
      }[];
    };

    expect(dropdown.options.map((option) => option.label)).toEqual([
      'English',
      'Portuguese',
      'Spanish',
    ]);
    expect(dropdown.options.map((option) => option.imageSrc)).toEqual([
      'assets/flags/4x3/us.svg',
      'assets/flags/4x3/br.svg',
      'assets/flags/4x3/es.svg',
    ]);

    dropdown.dispatchEvent(new CustomEvent('select', { detail: dropdown.options[1] }));
    fixture.detectChanges();

    expect(document.documentElement.lang).toBe('pt-BR');
  });
});
