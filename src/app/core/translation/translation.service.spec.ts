import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_LOCALE_STORAGE_KEY } from './translation.config';
import { provideAppTranslations } from './translation.providers';
import { TranslationService } from './translation.service';
import { AppTranslationKey } from './translation.types';

describe('TranslationService', () => {
  beforeEach(() => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);
    document.documentElement.lang = '';
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideAppTranslations()],
    });
  });

  afterEach(() => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);
    document.documentElement.lang = '';
  });

  it('should start with the default English locale', () => {
    const service = TestBed.inject(TranslationService);

    expect(service.locale()).toBe('en-us');
    expect(document.documentElement.lang).toBe('en-us');
    expect(localStorage.getItem(APP_LOCALE_STORAGE_KEY)).toBe('en-us');
    expect(service.instant('header.controls.english')).toBe('English');
  });

  it('should restore a persisted Portuguese locale', () => {
    localStorage.setItem(APP_LOCALE_STORAGE_KEY, 'pt-BR');

    const service = TestBed.inject(TranslationService);

    expect(service.locale()).toBe('pt-BR');
    expect(service.instant('header.controls.english')).toBe('Inglês');
  });

  it('should ignore invalid persisted locales', () => {
    localStorage.setItem(APP_LOCALE_STORAGE_KEY, 'es');

    const service = TestBed.inject(TranslationService);

    expect(service.locale()).toBe('en-us');
  });

  it('should set locales and interpolate translation params', () => {
    const service = TestBed.inject(TranslationService);

    service.setLocale('pt-BR');

    expect(service.locale()).toBe('pt-BR');
    expect(
      service.instant('shell.api.connected.description', {
        checkedAtUtc: '2026-04-14T13:00:00.000Z',
      }),
    ).toContain('2026-04-14T13:00:00.000Z');
    expect(localStorage.getItem(APP_LOCALE_STORAGE_KEY)).toBe('pt-BR');
  });

  it('should expose language options translated in the active locale', () => {
    const service = TestBed.inject(TranslationService);

    expect(service.languageOptions()).toEqual([
      {
        id: 'en-us',
        value: 'en-us',
        label: 'English',
      },
      {
        id: 'pt-BR',
        value: 'pt-BR',
        label: 'Portuguese',
      },
    ]);

    service.setLocale('pt-BR');

    expect(service.languageOptions()).toEqual([
      {
        id: 'en-us',
        value: 'en-us',
        label: 'Inglês',
      },
      {
        id: 'pt-BR',
        value: 'pt-BR',
        label: 'Português',
      },
    ]);
  });

  it('should fall back to the key when a translation is missing from every locale', () => {
    const service = TestBed.inject(TranslationService);
    const missingKey = 'missing.translation' as AppTranslationKey;

    expect(service.instant(missingKey)).toBe(missingKey);
  });
});
