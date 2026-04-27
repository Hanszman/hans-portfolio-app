import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_LOCALE_STORAGE_KEY } from './translation.config';
import { provideAppTranslations } from './translation.providers';
import {
  resolveLocalizedText,
  translateStaticKey,
  TranslationService,
} from './translation.service';
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
    expect(service.instant('header.controls.english')).toBe('Ingles');
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
      {
        id: 'es-es',
        value: 'es-es',
        label: 'Spanish',
      },
    ]);

    service.setLocale('pt-BR');

    expect(service.languageOptions()).toEqual([
      {
        id: 'en-us',
        value: 'en-us',
        label: 'Ingles',
      },
      {
        id: 'pt-BR',
        value: 'pt-BR',
        label: 'Portugues',
      },
      {
        id: 'es-es',
        value: 'es-es',
        label: 'Espanhol',
      },
    ]);
  });

  it('should translate localized TypeScript-side labels through the service helper', () => {
    expect(translateStaticKey('en-us', 'taxonomy.skills.filters.allLevels')).toBe(
      'All levels',
    );
    expect(translateStaticKey('es-es', 'taxonomy.skills.filters.allLevels')).toBe(
      'Todos los niveles',
    );
  });

  it('should translate localized API/domain content through translateContent', () => {
    const service = TestBed.inject(TranslationService);

    service.setLocale('es-es');

    expect(
      service.translateContent({
        'en-us': 'All levels',
        'pt-BR': 'Todos os niveis',
        'es-es': 'Todos los niveles',
      }),
    ).toBe('Todos los niveles');
  });

  it('should resolve localized text from any available locale when the active and default locales are missing', () => {
    expect(
      resolveLocalizedText(
        'es-es',
        {
          'pt-BR': 'Somente portugues',
        },
        'fallback',
      ),
    ).toBe('Somente portugues');
  });

  it('should return the empty fallback when localized content has no available values', () => {
    expect(resolveLocalizedText('es-es', {})).toBe('');
  });

  it('should fall back to the key when a translation is missing from every locale', () => {
    const service = TestBed.inject(TranslationService);
    const missingKey = 'missing.translation' as AppTranslationKey;

    expect(service.instant(missingKey)).toBe(missingKey);
    expect(translateStaticKey('fr-fr' as never, missingKey)).toBe(missingKey);
  });
});
