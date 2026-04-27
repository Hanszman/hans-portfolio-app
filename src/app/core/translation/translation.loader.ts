import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import {
  APP_TRANSLATIONS,
  DEFAULT_APP_LOCALE,
} from './translation.config';
import {
  AppLocale,
  AppTranslationKey,
  AppTranslationLanguage,
} from './translation.types';

interface AppNestedTranslation {
  [key: string]: string | AppNestedTranslation;
}

@Injectable()
export class AppTranslationLoader extends TranslateLoader {
  override getTranslation(lang: string): Observable<AppNestedTranslation> {
    return of(toNestedTranslation(readTranslationLanguage(lang)));
  }
}

export const readTranslationLanguage = (
  lang: string,
): AppTranslationLanguage =>
  APP_TRANSLATIONS[isAppLocale(lang) ? lang : DEFAULT_APP_LOCALE];

export const toNestedTranslation = (
  translations: AppTranslationLanguage,
): AppNestedTranslation =>
  Object.entries(translations).reduce<AppNestedTranslation>(
    (nestedTranslations, [translationKey, translationValue]) =>
      setNestedTranslationValue(
        nestedTranslations,
        translationKey as AppTranslationKey,
        translationValue,
      ),
    {},
  );

const setNestedTranslationValue = (
  nestedTranslations: AppNestedTranslation,
  translationKey: AppTranslationKey,
  translationValue: string,
): AppNestedTranslation => {
  const keyParts = translationKey.split('.');
  const lastKeyPart = keyParts.pop() as string;

  const target = keyParts.reduce<AppNestedTranslation>((current, keyPart) => {
    const nextValue = current[keyPart];

    if (typeof nextValue === 'object' && nextValue !== null) {
      return nextValue;
    }

    const nextTranslationLevel: AppNestedTranslation = {};
    current[keyPart] = nextTranslationLevel;
    return nextTranslationLevel;
  }, nestedTranslations);

  target[lastKeyPart] = translationValue;
  return nestedTranslations;
};

const isAppLocale = (lang: string): lang is AppLocale =>
  lang === 'en-us' || lang === 'pt-BR' || lang === 'es-es';
