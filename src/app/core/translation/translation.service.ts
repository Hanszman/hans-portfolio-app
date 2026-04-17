import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import {
  APP_LOCALE_STORAGE_KEY,
  APP_TRANSLATIONS,
  DEFAULT_APP_LOCALE,
} from './translation.config';
import {
  AppLocale,
  AppTranslationKey,
  AppTranslationParams,
} from './translation.types';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly document = inject(DOCUMENT);
  private readonly localeSignal = signal<AppLocale>(this.readStoredLocale());

  readonly locale = this.localeSignal.asReadonly();
  readonly nextLocale = computed<AppLocale>(() =>
    this.locale() === 'en' ? 'pt-BR' : 'en',
  );

  constructor() {
    this.applyLocale(this.locale());
  }

  setLocale(locale: AppLocale): void {
    this.localeSignal.set(locale);
    this.applyLocale(locale);
  }

  toggleLocale(): void {
    this.setLocale(this.nextLocale());
  }

  t(key: AppTranslationKey, params: AppTranslationParams = {}): string {
    const translation =
      APP_TRANSLATIONS[this.locale()][key] ??
      APP_TRANSLATIONS[DEFAULT_APP_LOCALE][key] ??
      key;

    return Object.entries(params).reduce<string>(
      (text, [paramKey, paramValue]) =>
        text.replaceAll(`{${paramKey}}`, paramValue),
      translation,
    );
  }

  private applyLocale(locale: AppLocale): void {
    this.document.documentElement.lang = locale;
    localStorage.setItem(APP_LOCALE_STORAGE_KEY, locale);
  }

  private readStoredLocale(): AppLocale {
    const storedLocale = localStorage.getItem(APP_LOCALE_STORAGE_KEY);

    return this.isAppLocale(storedLocale) ? storedLocale : DEFAULT_APP_LOCALE;
  }

  private isAppLocale(locale: string | null): locale is AppLocale {
    return locale === 'en' || locale === 'pt-BR';
  }
}
