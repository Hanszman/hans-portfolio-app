import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_LOCALE_STORAGE_KEY } from './translation.config';
import { TranslationService } from './translation.service';
import { AppTranslationKey } from './translation.types';

describe('TranslationService', () => {
  beforeEach(() => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);
    document.documentElement.lang = '';
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
  });

  afterEach(() => {
    localStorage.removeItem(APP_LOCALE_STORAGE_KEY);
    document.documentElement.lang = '';
  });

  it('should start with the default English locale', () => {
    const service = TestBed.inject(TranslationService);

    expect(service.locale()).toBe('en');
    expect(service.nextLocale()).toBe('pt-BR');
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem(APP_LOCALE_STORAGE_KEY)).toBe('en');
  });

  it('should restore a persisted Portuguese locale', () => {
    localStorage.setItem(APP_LOCALE_STORAGE_KEY, 'pt-BR');

    const service = TestBed.inject(TranslationService);

    expect(service.locale()).toBe('pt-BR');
    expect(service.nextLocale()).toBe('en');
    expect(service.t('header.controls.english')).toBe('Ingles');
  });

  it('should ignore invalid persisted locales', () => {
    localStorage.setItem(APP_LOCALE_STORAGE_KEY, 'es');

    const service = TestBed.inject(TranslationService);

    expect(service.locale()).toBe('en');
  });

  it('should toggle locales and interpolate translation params', () => {
    const service = TestBed.inject(TranslationService);

    service.toggleLocale();

    expect(service.locale()).toBe('pt-BR');
    expect(service.t('shell.api.connected.description', {
      checkedAtUtc: '2026-04-14T13:00:00.000Z',
    })).toContain('2026-04-14T13:00:00.000Z');
    expect(localStorage.getItem(APP_LOCALE_STORAGE_KEY)).toBe('pt-BR');
  });

  it('should fall back to the key when a translation is missing from every locale', () => {
    const service = TestBed.inject(TranslationService);
    const missingKey = 'missing.translation' as AppTranslationKey;

    expect(service.t(missingKey)).toBe(missingKey);
  });
});
