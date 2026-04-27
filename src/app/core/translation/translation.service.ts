import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  APP_TRANSLATIONS,
  APP_LOCALES,
  APP_LOCALE_STORAGE_KEY,
  DEFAULT_APP_LOCALE,
} from './translation.config';
import {
  AppLanguageOption,
  AppLocalizedText,
  AppLocale,
  AppTranslationKey,
  AppTranslationParams,
} from './translation.types';

const LANGUAGE_LABEL_KEYS: Record<AppLocale, AppTranslationKey> = {
  'en-us': 'header.controls.english',
  'pt-BR': 'header.controls.portuguese',
  'es-es': 'header.controls.spanish',
};

const interpolateParams = (
  template: string,
  params: AppTranslationParams,
): string =>
  Object.entries(params).reduce(
    (content, [key, value]) =>
      content
        .replaceAll(`{{ ${key} }}`, value)
        .replaceAll(`{{${key}}}`, value),
    template,
  );

export const resolveLocalizedText = (
  locale: AppLocale,
  translations: AppLocalizedText,
  fallback = '',
): string =>
  translations[locale] ??
  translations[DEFAULT_APP_LOCALE] ??
  Object.values(translations).find(
    (translation): translation is string => typeof translation === 'string',
  ) ??
  fallback;

export const translateStaticKey = (
  locale: AppLocale,
  key: AppTranslationKey,
  params: AppTranslationParams = {},
): string => {
  const template =
    APP_TRANSLATIONS[locale]?.[key] ??
    APP_TRANSLATIONS[DEFAULT_APP_LOCALE][key] ??
    key;

  return interpolateParams(template, params);
};

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly document = inject(DOCUMENT);
  private readonly translateService = inject(TranslateService);
  private readonly localeSignal = signal<AppLocale>(this.readStoredLocale());

  readonly locale = this.localeSignal.asReadonly();
  readonly languageOptions = computed<readonly AppLanguageOption[]>(() => {
    this.locale();

    return APP_LOCALES.map((locale) => ({
      id: locale,
      value: locale,
      label: this.instant(LANGUAGE_LABEL_KEYS[locale]),
    }));
  });

  constructor() {
    this.translateService.addLangs(APP_LOCALES);
    this.translateService.setFallbackLang(DEFAULT_APP_LOCALE);
    this.applyLocale(this.locale());
  }

  setLocale(locale: AppLocale): void {
    this.localeSignal.set(locale);
    this.applyLocale(locale);
  }

  instant(
    key: AppTranslationKey,
    params: AppTranslationParams = {},
  ): string {
    return this.translateService.instant(key, params) as string;
  }

  translateContent(translations: AppLocalizedText, fallback = ''): string {
    return resolveLocalizedText(this.locale(), translations, fallback);
  }

  private applyLocale(locale: AppLocale): void {
    this.document.documentElement.lang = locale;
    localStorage.setItem(APP_LOCALE_STORAGE_KEY, locale);
    this.translateService.use(locale).subscribe();
  }

  private readStoredLocale(): AppLocale {
    const storedLocale = localStorage.getItem(APP_LOCALE_STORAGE_KEY);

    return this.isAppLocale(storedLocale) ? storedLocale : DEFAULT_APP_LOCALE;
  }

  private isAppLocale(locale: string | null): locale is AppLocale {
    return locale === 'en-us' || locale === 'pt-BR' || locale === 'es-es';
  }
}
