import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  APP_LOCALES,
  APP_LOCALE_STORAGE_KEY,
  DEFAULT_APP_LOCALE,
} from './translation.config';
import {
  AppLanguageOption,
  AppLocale,
  AppTranslationKey,
  AppTranslationParams,
} from './translation.types';

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
      label: this.instant(
        locale === 'en-us'
          ? 'header.controls.english'
          : 'header.controls.portuguese',
      ),
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
    return locale === 'en-us' || locale === 'pt-BR';
  }
}
